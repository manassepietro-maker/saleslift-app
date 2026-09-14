"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client. Uses the public anon key — safe to expose,
// since Row Level Security (see supabase/schema.sql) is what actually
// enforces "you can only read/write your own rows".
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
