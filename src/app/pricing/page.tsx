import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";
import { BuyButton } from "@/components/BuyButton";

export const dynamic = "force-dynamic";

// Public: anyone can buy. Logged-out buyers get their account at checkout.
export default async function PricingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let hasAccess = false;
  if (user) {
    const { data: purchase } = await supabase
      .from("purchases")
      .select("has_access")
      .eq("user_id", user.id)
      .single();
    hasAccess = purchase?.has_access ?? false;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg">
      <Nav />
      <div className="animate-glow pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(43,123,246,0.25),transparent)]" />
      <div className="relative mx-auto max-w-xl px-5 py-20 sm:py-28">
        <h1 className="mb-3 text-center text-[40px] font-extrabold tracking-tight text-fg sm:text-[52px]">Get the system</h1>
        <p className="mb-12 text-center text-[18px] text-fg-dim">
          Full access to all five modules, the templates, and every future update.
        </p>
        <div className="border border-accent/50 bg-bg-alt p-9 shadow-[0_40px_120px_-40px_rgba(43,123,246,0.7)] sm:p-12">
          <div className="mb-8 text-[64px] font-extrabold leading-none tracking-tight text-fg">
            €42<span className="ml-3 text-[22px] font-medium text-fg-faint">one-time</span>
          </div>
          <ul className="mb-10 flex flex-col gap-3 text-[17px] text-fg">
            <li>✓ All five modules, lifetime access</li>
            <li>✓ Templates for every stage</li>
            <li>✓ 4 ready-to-use templates</li>
            <li>✓ Pay once, including future updates</li>
          </ul>
          {hasAccess ? (
            <Link href="/dashboard" className="block bg-accent py-4 text-center text-[17px] font-semibold text-white">
              You already have access. Go to the course
            </Link>
          ) : (
            <BuyButton label="Get the system" className="w-full justify-between" />
          )}
          <p className="mt-5 text-center text-[14px] text-fg-faint">
            Secure checkout with Stripe. Your account is created right after you pay.
          </p>
        </div>
      </div>
    </main>
  );
}
