import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";
import { COACHING } from "@/lib/content/coaching";

export const dynamic = "force-dynamic";

// 1:1 interview coaching for students. Booking happens on Calendly (link in
// src/lib/content/coaching.ts); payment for paid sessions is arranged after
// the free intro call.
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
        <h1 className="mb-3 text-[40px] font-extrabold tracking-tight text-fg">1:1 interview coaching</h1>
        <p className="mb-10 text-[18px] leading-relaxed text-fg-dim">
          Landed an interview? Let&apos;s prepare for it together, one to one.
        </p>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="border border-line-strong bg-bg-alt p-7">
            <div className="mb-1 text-[32px] font-extrabold text-fg">Free</div>
            <div className="mb-1 text-[16px] font-semibold text-fg">Intro call</div>
            <div className="text-[15px] text-fg-faint">{COACHING.introMinutes} minutes to see what you need and if we&apos;re a fit</div>
          </div>
          <div className="border border-line-strong bg-bg-alt p-7">
            <div className="mb-1 text-[32px] font-extrabold text-fg">{COACHING.hourlyPrice}</div>
            <div className="mb-1 text-[16px] font-semibold text-fg">Per hour</div>
            <div className="text-[15px] text-fg-faint">Interview prep sessions after the intro call</div>
          </div>
        </div>
        {COACHING.calendlyUrl ? (
          <a
            href={COACHING.calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-accent px-7 py-4 text-[17px] font-semibold text-white no-underline hover:brightness-110"
          >
            Book your free {COACHING.introMinutes}-min call
          </a>
        ) : (
          <p className="border border-dashed border-line-strong bg-bg-alt px-6 py-5 text-[16px] text-fg-faint">
            Booking opens soon.
          </p>
        )}
      </div>
    </main>
  );
}
