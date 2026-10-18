import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Logs the student out and sends them to the homepage.
// 303 makes the browser follow up with a normal page load (GET), not a re-POST.
export async function POST(req: Request) {
  const supabase = createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", req.url), 303);
}
