import { COACHING } from "@/lib/content/coaching";

// "Landed an interview? Prep with me 1:1" card for the course pages.
// `compact` is the smaller version used inside lessons.
export function CoachingCard({ compact = false }: { compact?: boolean }) {
  const button = COACHING.calendlyUrl ? (
    <a
      href={COACHING.calendlyUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex flex-shrink-0 items-center justify-center rounded-xl bg-c-blue px-6 py-3 text-[17px] font-medium text-[#0b1730] no-underline hover:brightness-110"
    >
      Book a free {COACHING.introMinutes}-min call
    </a>
  ) : (
    <span className="inline-flex flex-shrink-0 items-center justify-center rounded-xl border border-dashed border-c-line px-6 py-3 text-[16px] text-c-dim">
      Booking opens soon
    </span>
  );

  return (
    <div
      className={`flex flex-col gap-5 rounded-2xl border border-c-blue/40 bg-c-card font-inter sm:flex-row sm:items-center sm:justify-between ${
        compact ? "p-6" : "p-7 sm:p-9"
      }`}
    >
      <div>
        <p className="mb-1 text-[13px] font-semibold uppercase tracking-[0.2em] text-c-blue">1:1 interview coaching</p>
        <p className={`mb-2 font-bold text-c-text ${compact ? "text-[20px]" : "text-[24px]"}`}>
          Landed an interview? Prep for it with me.
        </p>
        <p className="max-w-xl text-[16px] leading-relaxed text-c-body">
          Book a free {COACHING.introMinutes}-minute call to see what you need and decide if we want to work together.
          Coaching after that is {COACHING.hourlyPrice}/hour.
        </p>
      </div>
      {button}
    </div>
  );
}
