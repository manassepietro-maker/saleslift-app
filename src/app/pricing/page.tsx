import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";
import { BuyButton } from "@/components/BuyButton";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: purchase } = await supabase
    .from("purchases")
    .select("has_access")
    .eq("user_id", user.id)
    .single();

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="mb-3 font-display text-3xl font-bold text-fg">Get the system</h1>
        <p className="mb-10 text-fg-dim">
          Full access to all five modules, the templates, and every future update.
        </p>
        <div className="rounded-2xl border border-line-strong bg-bg-alt p-10">
          <div className="mb-6 font-display text-5xl font-bold text-fg">€47<span className="text-xl font-medium text-fg-faint"> / year</span></div>
          <ul className="mb-8 flex flex-col gap-2 text-left text-fg-dim">
            <li>— Yearly course access</li>
            <li>— Bonus: CV and Cover Letter Bot agents</li>
          </ul>
          {purchase?.has_access ? (
            <p className="font-medium text-accent">You already have access — head to the course.</p>
          ) : (
            <BuyButton />
          )}
        </div>
      </div>
    </main>
  );
}
