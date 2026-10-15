import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { EmailLinkForm } from "@/components/EmailLinkForm";
import { Logo } from "@/components/Logo";

export const dynamic = "force-dynamic";

// Private access link: /access/<code> unlocks the full course without paying.
// Valid codes live in the ACCESS_CODES environment variable on Vercel
// (comma-separated, e.g. "owner-7f3k9q,tester-2m8x4w"). Remove a code there
// to switch its link off. Codes are never stored in the code repository.
function isValidCode(code: string) {
  const codes = (process.env.ACCESS_CODES ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c.length >= 8); // ignore blank or too-short codes
  return codes.includes(code);
}

export default async function AccessPage({ params }: { params: { code: string } }) {
  const code = decodeURIComponent(params.code);

  if (!isValidCode(code)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-bg px-6 text-center font-inter">
        <Logo size="lg" />
        <div>
          <h1 className="mb-3 text-[32px] font-bold tracking-tight text-fg">This link isn&apos;t valid</h1>
          <p className="text-[17px] text-fg-dim">It may have been switched off. Ask whoever sent it for a new one.</p>
        </div>
        <Link href="/" className="text-[16px] font-medium text-accent">
          Go to SalesLift
        </Link>
      </main>
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in: sign in by email, then the emailed link brings them back here.
  if (!user) {
    return (
      <EmailLinkForm
        mode="signup"
        next={`/access/${encodeURIComponent(code)}`}
        title="Unlock SalesLift"
        intro="This link gives you full access to the course. Enter your email and we'll send you a login link."
      />
    );
  }

  const admin = createAdminClient();
  await admin
    .from("purchases")
    .upsert({ user_id: user.id, has_access: true, updated_at: new Date().toISOString() }, { onConflict: "user_id" });

  redirect("/dashboard?welcome=1");
}
