-- SalesLift course app — Supabase schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Safe to re-run: uses "create table if not exists" / "or replace".

-- Every signed-up student gets a profile row (created automatically by the trigger below).
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- One row per (user, lesson) once they've checked it off.
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_slug text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

-- Course purchase state. One row per user; has_access flips to true once Stripe
-- confirms payment (see api/webhooks/stripe).
create table if not exists public.purchases (
  user_id uuid primary key references auth.users(id) on delete cascade,
  has_access boolean not null default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  updated_at timestamptz not null default now()
);

-- Auto-create a profile + purchases row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  insert into public.purchases (user_id, has_access) values (new.id, false);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Row Level Security: everyone can only ever read/write their own rows.
alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.purchases enable row level security;

drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "progress: read own" on public.lesson_progress;
create policy "progress: read own" on public.lesson_progress
  for select using (auth.uid() = user_id);
drop policy if exists "progress: insert own" on public.lesson_progress;
create policy "progress: insert own" on public.lesson_progress
  for insert with check (auth.uid() = user_id);
drop policy if exists "progress: delete own" on public.lesson_progress;
create policy "progress: delete own" on public.lesson_progress
  for delete using (auth.uid() = user_id);

drop policy if exists "purchases: read own" on public.purchases;
create policy "purchases: read own" on public.purchases
  for select using (auth.uid() = user_id);
-- Note: there is deliberately NO insert/update policy for purchases from the client.
-- Only the server (using the service role key, in api/webhooks/stripe) can flip has_access.
-- This is what stops a student from just editing the database to unlock the course for free.
