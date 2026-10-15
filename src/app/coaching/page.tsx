import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";

export const dynamic = "force-dynamic";

// Phase 2 stub: shows the real pricing so the offer is visible, but booking
// + payment aren't wired up yet (no Stripe checkout, no scheduling). Swap
// the mailto link below for a real Cal.com/Calendly embed + Stripe checkout
// when you're ready to build that phase.
const TIERS = [
  { name: "Free consult", price: "Free", detail: "20 minutes to see if it's a fit" },
  { name: "Quick session", price: "€60", detail: "30 minutes" },
  { name: "Full session", price: "€100", detail: "60 minutes" },
  { name: "5-pack", price: "€400", detail: "Five sessions, book anytime" },
];

export default async function CoachingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="mb-3 font-display text-3xl font-bold text-fg">1:1 Coaching</h1>
        <p className="mb-10 text-fg-dim">
          Live sessions to help with interview prep once you've booked one, on top of the system.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {TIERS.map((t) => (
            <div key={t.name} className="rounded-xl border border-line bg-bg-alt p-6">
              <div className="mb-1 font-display text-2xl font-bold text-fg">{t.price}</div>
              <div className="mb-1 text-sm font-semibold text-fg">{t.name}</div>
              <div className="text-sm text-fg-faint">{t.detail}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-xl border border-dashed border-line-strong bg-bg-alt p-6 text-sm text-fg-faint">
          Booking + payment for coaching isn't wired up yet. That's Phase 2. For now this
          page shows the offer; replace this box with a real booking link (e.g. Cal.com) and
          Stripe checkout when you're ready to build that piece.
        </div>
      </div>
    </main>
  );
}
