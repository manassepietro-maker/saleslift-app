# SalesLift — course app (Phase 1)

What's in this build: signup/login, the Welcome + Intro pages (free), the
five course modules gated behind a €47/yr purchase, per-lesson time
estimates, a checkable progress bar, downloadable templates per module, and
a `/coaching` page previewing the 1:1 pricing (booking/payment for that part
is Phase 2 — see the note on that page).

Not included yet: the coaching booking + payment flow, and real polished
template files (the CV template, tracker, HVP template, and outreach scripts
in `/public/templates` are functional placeholders — swap them for the real
thing whenever they're ready).

## 1. Supabase (you already have an account)

1. Create a new project (or use an existing one) in the Supabase dashboard.
2. Open the SQL Editor → New query → paste the entire contents of
   `supabase/schema.sql` → Run. This creates the `profiles`,
   `lesson_progress`, and `purchases` tables, the trigger that sets up a new
   row for every signup, and the Row Level Security policies that keep
   students only able to read/write their own data.
3. Go to Project Settings → API. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this one secret —
     it's only ever used server-side, in the Stripe webhook)
4. Auth → Providers → make sure Email is enabled. Auth → URL Configuration →
   set the Site URL to your real domain once you have one (localhost is fine
   for now).

## 2. Stripe (you'll need to create this one)

1. Create a free account at stripe.com. Start in **Test mode** (top-right
   toggle) — you can flip to live mode later once everything works.
2. Products → Add product → name it "SalesLift". Under pricing, choose
   **Recurring**, **Yearly**, amount **€47**. Save, then copy the price's ID
   (starts `price_...`) → `STRIPE_PRICE_ID`.
3. Developers → API keys → copy the **Secret key** → `STRIPE_SECRET_KEY`.
4. Developers → Webhooks → Add endpoint. URL:
   `https://<your-deployed-domain>/api/webhooks/stripe`. Events to send:
   `checkout.session.completed` and `customer.subscription.deleted`. After
   creating it, copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`.
   (You can't get a real webhook working against `localhost` — use the
   Stripe CLI's `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   for local testing if you need that.)
5. Use Stripe's test card `4242 4242 4242 4242`, any future expiry/CVC, to
   test a full purchase before going live.

## 3. Deploy to Vercel (you already have an account)

1. Push this folder to a GitHub repo.
2. In Vercel: New Project → import that repo.
3. Add every variable from `.env.local.example` in Project Settings →
   Environment Variables (with your real values — set
   `NEXT_PUBLIC_SITE_URL` to the Vercel URL Vercel gives you, e.g.
   `https://saleslift.vercel.app`, or your custom domain).
4. Deploy. Once it's live, go back and create the Stripe webhook (step 2.4
   above) pointing at that real URL — it can't be created until the URL
   exists.

## Local development

```
npm install
cp .env.local.example .env.local   # then fill in real values
npm run dev
```

Open http://localhost:3000 — you'll land on `/login`. Sign up with a real
email (Supabase sends a confirmation link) to test the full flow.

## Editing the course content

Everything students read lives in one file:
`src/lib/content/modules.ts` — the Welcome text, the Intro text (plus where
to drop an intro video URL), and all five modules (title, time estimate,
summary, body text/images/lists, and which templates each one links to).
Edit the text there; no other file needs to change for a content edit.

Images referenced in module bodies should be dropped into
`public/images/<module-slug>/`. Template files live in `public/templates/` —
see `public/templates/README.md`.

## What's next (not built yet)

- **Coaching booking + payment** (Phase 2): the `/coaching` page currently
  just displays your pricing (free 20-min consult, €60/30min, €100/1hr,
  €400 five-pack) with no working booking or payment. When you're ready,
  say so and I'll wire up Stripe Checkout for each tier plus a Cal.com (or
  Calendly) embed for actual scheduling once payment clears.
- **Real templates**: replace the placeholder files in `public/templates/`
  with your actual CV template, tracker, HVP template, and outreach
  scripts — happy to build these out properly (a real .docx/.xlsx) as a
  separate task.
- **Real screenshots/images** in Module 1 (Position) — currently a labeled
  placeholder.
