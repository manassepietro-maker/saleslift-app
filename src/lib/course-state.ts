import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Loads everything the dashboard and lesson pages need about the signed-in
// student: who they are, whether they've paid, and which lessons they've done.
// Redirects to /login if nobody is signed in.
export async function getCourseState() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: purchase }, { data: progress }] = await Promise.all([
    supabase.from("purchases").select("has_access").eq("user_id", user.id).single(),
    supabase.from("lesson_progress").select("lesson_slug").eq("user_id", user.id),
  ]);

  return {
    userId: user.id,
    hasAccess: purchase?.has_access ?? false,
    completed: (progress ?? []).map((p) => p.lesson_slug as string),
  };
}
