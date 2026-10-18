import { COACHING } from "@/lib/content/coaching";

// 1:1 interview coaching offer, shown across the course.
// variant "full": big card (course overview, Execute, Welcome)
// variant "compact": smaller card at the end of each stage lesson
// variant "mini": always-visible reminder in the lesson sidebar
export function CoachingCard({ variant = "full" }: { variant?: "full" | "compact" | "mini" }) {
  const intro = `Book a free ${COACHING.introMinutes}-min call`;

  const cta = (size: "lg" | "sm") =>
    COACHING.calendlyUrl ? (
      <a
        href={COACHING.calendlyUrl}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-c-blue font-semibold text-[#0b1730] no-underline transition hover:brightness-110 ${
          size === "lg" ? "px-7 py-4 text-[18px]" : "px-5 py-3 text-[16px]"
        }`}
      >
        <CalendarIcon />
        {intro}
      </a>
    ) : (
      <span
        className={`inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl border border-dashed border-c-blue/50 text-c-dim ${
          size === "lg" ? "px-7 py-4 text-[17px]" : "px-5 py-3 text-[15px]"
        }`}
      >
        <CalendarIcon />
        Booking opens soon
      </span>
    );

  if (variant === "mini") {
    return (
      <div className="rounded-xl border border-c-blue/40 bg-[linear-gradient(150deg,rgba(43,123,246,0.18),transparent_70%)] p-4 font-inter">
        <p className="mb-1 text-[15px] font-semibold text-c-text">Interview coming up?</p>
        <p className="mb-3 text-[13px] leading-snug text-c-body">Prep 1:1 with me. The first call is free.</p>
        {COACHING.calendlyUrl ? (
          <a href={COACHING.calendlyUrl} target="_blank" rel="noreferrer" className="text-[14px] font-semibold text-c-blue no-underline hover:underline">
            {intro} →
          </a>
        ) : (
          <span className="text-[13px] text-c-dim">Booking opens soon</span>
        )}
      </div>
    );
  }

  const steps = [
    { n: "1", title: `Free ${COACHING.introMinutes}-min call`, text: "We look at your interview and what you need." },
    { n: "2", title: "Decide together", text: "Only if it's a fit for both of us." },
    { n: "3", title: `${COACHING.hourlyPrice}/hour prep`, text: "Focused sessions for your next round." },
  ];

  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-c-blue/50 font-inter ${compact(variant) ? "p-7" : "p-8 sm:p-10"}`}
      style={{ background: "linear-gradient(135deg, rgba(43,123,246,0.22) 0%, #212226 55%)" }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-c-blue/25 blur-3xl" />
      <div className="relative">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-c-blue">1:1 interview coaching</p>
        <h2 className={`mb-3 font-bold leading-tight tracking-tight text-c-text ${compact(variant) ? "text-[24px]" : "text-[28px] sm:text-[34px]"}`}>
          Got an interview coming up?
        </h2>
        <p className={`mb-7 max-w-2xl leading-relaxed text-c-body ${compact(variant) ? "text-[16px]" : "text-[17px] sm:text-[18px]"}`}>
          You did the hard part and got in front of them. Now make it count: prep with me one to one, so you walk in ready
          for their questions and leave them wanting you on the team.
        </p>

        {!compact(variant) && (
          <ol className="mb-8 grid gap-3 sm:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-xl border border-c-line bg-c-bg/60 p-4">
                <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-c-blue/20 text-[13px] font-bold text-c-blue">
                  {s.n}
                </span>
                <p className="text-[16px] font-semibold text-c-text">{s.title}</p>
                <p className="mt-1 text-[14px] leading-snug text-c-dim">{s.text}</p>
              </li>
            ))}
          </ol>
        )}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {cta(compact(variant) ? "sm" : "lg")}
          <span className="text-[14px] text-c-dim">
            No commitment · then {COACHING.hourlyPrice}/hour if we continue
          </span>
        </div>
      </div>
    </section>
  );
}

function compact(variant: string) {
  return variant === "compact";
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="16" y1="3" x2="16" y2="7" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="3" y1="11" x2="21" y2="11" />
    </svg>
  );
}
