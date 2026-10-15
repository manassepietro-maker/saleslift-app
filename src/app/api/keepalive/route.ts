import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Called once a day by a Vercel Cron Job (see vercel.json). Supabase pauses
// free projects after about a week without database activity; this tiny
// query counts as activity, so the project stays awake.
// If a CRON_SECRET environment variable is set, Vercel sends it automatically
// and other callers are refused.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await createAdminClient().from("profiles").select("id", { head: true, count: "exact" }).limit(1);
  if (error) {
    console.error("Supabase keep-alive failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
