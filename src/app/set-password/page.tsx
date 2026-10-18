import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SetPasswordForm } from "@/components/SetPasswordForm";

export const dynamic = "force-dynamic";

// Create a password after paying (?reset is absent), or choose a new one after
// a "forgot password" email (?reset=1). Students who already set a password
// and aren't resetting go straight to the course.
export default async function SetPasswordPage({ searchParams }: { searchParams: { reset?: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const reset = searchParams.reset === "1";
  if (!reset && user.user_metadata?.password_set) redirect("/dashboard");

  return <SetPasswordForm email={user.email ?? ""} reset={reset} />;
}
