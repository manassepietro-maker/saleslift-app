"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, useInView, CountUp } from "./Reveal";

import { STAGE_COLORS } from "@/lib/content/landing";
export { STAGE_COLORS };

/* ---------------------------------------------------------------------- */
/* Pain: the auto-rejection email everyone has received.                 */
/* ---------------------------------------------------------------------- */

export function RejectionEmail() {
  return (
    <Reveal from="right">
      <div className="border border-line-strong bg-bg-alt">
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-[13px] font-bold text-fg-faint">
              TA
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-fg">Talent Acquisition Team</p>
              <p className="truncate text-[13px] text-fg-faint">no-reply@careers</p>
            </div>
          </div>
          <span className="flex-shrink-0 text-[13px] tabular-nums text-fg-faint">03:14</span>
        </div>
        <div className="px-6 py-5">
          <p className="mb-3 text-[17px] font-semibold text-fg">Your application for Account Executive</p>
          <p className="mb-3 text-[15px] leading-relaxed text-fg-dim">
            Thank you for your interest. After careful review, we have decided to move forward with other candidates
            whose experience more closely matches our requirements.
          </p>
          <p className="text-[15px] leading-relaxed text-fg-dim">We will keep your details on file for future opportunities.</p>
        </div>
        <div className="flex items-center gap-2 border-t border-red-500/20 bg-red-500/10 px-6 py-3 text-[14px] text-red-300">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>
          Sent 2 minutes after you applied. No human read it.
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------------- */
/* Pain: the list on the left, 50 applications → 1 reply on the right.  */
/* Uses the same segmented blocks as the course cards further down.      */
/* ---------------------------------------------------------------------- */

export function PainSection({ points }: { points: string[] }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
      <ul className="border-t border-line">
        {points.map((p, i) => (
          <Reveal as="li" key={p} delay={i * 90} className="flex gap-5 border-b border-line py-5">
            <span className="pt-1 text-[14px] font-bold tabular-nums text-fg-faint">0{i + 1}</span>
            <span className="text-[18px] leading-relaxed text-fg sm:text-[19px]">{p}</span>
          </Reveal>
        ))}
      </ul>
      <RejectionEmail />
    </div>
  );
}

// 50 applications → 1 reply, as a grid of squares (used on /story).
export function ApplicationsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const REPLY = 37; // which of the 50 squares is the single reply

  return (
    <Reveal from="right">
      <div ref={ref} className="border border-line-strong bg-bg-alt p-7 sm:p-9">
        <div className="mb-8 grid grid-cols-2 gap-6 border-b border-line pb-7">
          <div>
            <p className="text-[48px] font-extrabold leading-none tracking-tight text-fg">
              <CountUp to={50} />
            </p>
            <p className="mt-2 text-[15px] text-fg-faint">Applications sent</p>
          </div>
          <div>
            <p className="text-[48px] font-extrabold leading-none tracking-tight text-accent">
              <CountUp to={1} />
            </p>
            <p className="mt-2 text-[15px] text-fg-faint">Reply</p>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-[6px]">
          {Array.from({ length: 50 }).map((_, k) => (
            <span
              key={k}
              className="aspect-square transition-colors duration-300"
              style={{
                background: !visible ? "#2a2b30" : k === REPLY ? "#2b7bf6" : "#3a3b42",
                transitionDelay: `${200 + k * 25}ms`,
              }}
            />
          ))}
        </div>
        <p className="mt-6 text-[15px] text-fg-faint">Each square is one application. One got a reply.</p>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------------- */
/* Goal: callback rate before vs. after, as segmented bars (1 block = 1%). */
/* ---------------------------------------------------------------------- */

export function CallbackChart() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const rows = [
    { label: "Applying the usual way", value: 1, color: "#8e8f97" },
    { label: "Running the SalesLift system", value: 50, color: "#2b7bf6" },
  ];
  return (
    <Reveal from="right">
      <div ref={ref} className="border border-line-strong bg-bg-alt p-7 sm:p-9">
        <p className="mb-9 text-[13px] font-semibold uppercase tracking-[0.25em] text-fg-faint">
          Application to interview rate
        </p>
        <div className="flex flex-col gap-9">
          {rows.map((r, ri) => (
            <div key={r.label}>
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <span className="text-[17px] text-fg">{r.label}</span>
                <span className="text-[34px] font-extrabold tracking-tight" style={{ color: r.color }}>
                  <CountUp to={r.value} suffix="%" />
                </span>
              </div>
              <div className="flex gap-[3px]">
                {Array.from({ length: 50 }).map((_, k) => (
                  <span
                    key={k}
                    className="h-6 flex-1 transition-colors duration-200"
                    style={{
                      background: visible && k < r.value ? r.color : "#2a2b30",
                      transitionDelay: `${300 + ri * 400 + k * 22}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------------- */
/* Plan: five stages along a rising, color-shifting path.                */
/* ---------------------------------------------------------------------- */

// 0 → 1 as the element scrolls up through the viewport, and back to 0 when
// scrolling up again. "screen": done after ~60% of a screen of scrolling;
// "element": done when the element's bottom reaches the same line its top
// started from (good for tall lists).
function useScrollProgress(ref: React.RefObject<HTMLElement>, span: "screen" | "element" = "screen") {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const distance = span === "element" ? Math.max(rect.height, 1) : vh * 0.6;
      setProgress(Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / distance)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, span]);
  return progress;
}

export function StagePath({ stages }: { stages: { n: string; name: string; headline: string; detail: string; outcome: string }[] }) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLOListElement>(null);
  const progress = useScrollProgress(desktopRef);
  const mobileProgress = useScrollProgress(mobileRef, "element");
  // Points on the curve where each stage sits (viewBox 1000 x 260).
  const points = [
    [100, 220],
    [300, 180],
    [500, 150],
    [700, 95],
    [900, 40],
  ];
  // How far along the drawn line each stage sits (the path runs x = -40 → 1040).
  const at = (x: number) => (x + 40) / 1080;
  const shown = (i: number) => progress >= at(points[i][0]);
  const smooth = "opacity 0.45s ease, transform 0.45s ease";

  return (
    <div>
      {/* Desktop: curve + cards, drawn in step with scrolling */}
      <div ref={desktopRef} className="relative hidden lg:block">
        <svg viewBox="0 0 1000 260" className="h-auto w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="stage-line" x1="0" x2="1" y1="0" y2="0">
              {STAGE_COLORS.map((c, i) => (
                <stop key={c} offset={`${(i / (STAGE_COLORS.length - 1)) * 100}%`} stopColor={c} />
              ))}
            </linearGradient>
          </defs>
          {[0, 1, 2].map((k) => (
            <path
              key={k}
              d={`M-40 ${250 - k * 14} C 250 ${215 - k * 14}, 450 ${190 - k * 12}, 600 ${130 - k * 10} S 900 ${45 - k * 8}, 1040 ${20 - k * 6}`}
              fill="none"
              stroke="#ffffff"
              strokeOpacity={0.05}
              strokeWidth="1.5"
            />
          ))}
          <path
            d="M-40 245 C 120 230, 220 200, 300 180 S 450 158, 500 150 S 650 115, 700 95 S 850 52, 1040 25"
            fill="none"
            stroke="url(#stage-line)"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - progress}
            style={{ opacity: progress > 0.005 ? 1 : 0 }}
          />
          {/* Start/end labels so the curve reads as "ignored → interviewing". */}
          <text x="0" y="218" fill="#8e8f97" fontSize="15" fontWeight="600" style={{ transition: smooth, opacity: progress > 0 ? 1 : 0 }}>
            Ignored
          </text>
          <text x="1000" y="8" fill="#22b07d" fontSize="15" fontWeight="700" textAnchor="end" style={{ transition: smooth, opacity: progress >= 0.98 ? 1 : 0 }}>
            Interviewing
          </text>
          {/* Dashed connectors from each diamond down to its card. */}
          {points.map(([x, y], i) => (
            <line
              key={`c${i}`}
              x1={x}
              y1={y + 20}
              x2={x}
              y2={260}
              stroke={STAGE_COLORS[i]}
              strokeOpacity={0.5}
              strokeWidth="1.5"
              strokeDasharray="4 5"
              style={{ transition: smooth, opacity: shown(i) ? 1 : 0 }}
            />
          ))}
          {points.map(([x, y], i) => (
            <g
              key={i}
              style={{ transition: smooth, opacity: shown(i) ? 1 : 0, transformOrigin: `${x}px ${y}px`, transform: shown(i) ? "none" : "scale(0.3)" }}
            >
              <rect x={x - 13} y={y - 13} width="26" height="26" transform={`rotate(45 ${x} ${y})`} fill={STAGE_COLORS[i]} />
              <rect x={x - 4} y={y - 4} width="8" height="8" transform={`rotate(45 ${x} ${y})`} fill="#1b1c20" />
            </g>
          ))}
        </svg>
        {/* No grid gap: each column is exactly 20% wide, so card centers sit under the diamonds. */}
        <div className="grid grid-cols-5">
          {stages.map((s, i) => (
            <div
              key={s.n}
              className="flex flex-col px-2.5"
              style={{ transition: smooth, opacity: shown(i) ? 1 : 0, transform: shown(i) ? "none" : "translateY(24px)" }}
            >
              <span
                className="mx-auto h-8 w-px"
                style={{ background: `repeating-linear-gradient(${STAGE_COLORS[i]}80 0 4px, transparent 4px 9px)` }}
              />
              <div
                className="flex flex-1 flex-col rounded-xl border bg-bg-alt p-5"
                style={{
                  borderColor: `${STAGE_COLORS[i]}55`,
                  background: `linear-gradient(160deg, ${STAGE_COLORS[i]}1f, #212226 55%)`,
                }}
              >
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.25em]" style={{ color: STAGE_COLORS[i] }}>
                  {s.n} · {s.name}
                </p>
                <h3 className="mb-2 text-[19px] font-bold leading-snug text-fg">{s.headline}</h3>
                <p className="mb-5 flex-1 text-[15px] leading-relaxed text-fg-dim">{s.detail}</p>
                <div className="border-t border-line pt-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-faint">You walk away with</p>
                  <p className="text-[15px] font-semibold" style={{ color: STAGE_COLORS[i] }}>{s.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline whose colored line fills as you scroll */}
      <ol ref={mobileRef} className="relative ml-3 border-l-2 border-line lg:hidden">
        <span
          className="absolute -left-[2px] top-0 w-[2px] bg-gradient-to-b from-accent via-amber to-green"
          style={{ height: `${mobileProgress * 100}%` }}
          aria-hidden="true"
        />
        {stages.map((s, i) => {
          const on = mobileProgress >= i / stages.length;
          return (
            <li
              key={s.n}
              className="relative mb-8 pl-8 last:mb-0"
              style={{ transition: smooth, opacity: on ? 1 : 0.15, transform: on ? "none" : "translateX(12px)" }}
            >
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rotate-45" style={{ background: STAGE_COLORS[i] }} />
              <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.25em]" style={{ color: STAGE_COLORS[i] }}>
                {s.n} · {s.name}
              </p>
              <h3 className="mb-1 text-[20px] font-bold text-fg">{s.headline}</h3>
              <p className="mb-2 text-[16px] leading-relaxed text-fg-dim">{s.detail}</p>
              <p className="text-[15px] font-semibold" style={{ color: STAGE_COLORS[i] }}>→ {s.outcome}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Vision: the inbox that's waiting.                                      */
/* ---------------------------------------------------------------------- */

export type InboxEmail = { from: string; subject: string; preview: string; time: string; color: string };

// Emails are shown in the order given — pass newest first, like a real inbox.
export function InboxMock({ emails }: { emails: InboxEmail[] }) {
  return (
    <div className="relative">
      <div className="absolute -inset-10 bg-[radial-gradient(closest-side,rgba(34,176,125,0.18),transparent)]" />
      <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-bg-alt">
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[14px] font-semibold text-fg">Inbox</span>
          <span className="ml-auto rounded-full bg-accent px-2.5 py-0.5 text-[12px] font-bold text-accent-fg">
            {emails.length} new
          </span>
        </div>
        {emails.map((e, i) => (
          <Reveal key={e.subject} from="up" delay={i * 160}>
            <div className="flex gap-4 border-b border-line px-5 py-4 last:border-b-0">
              <span
                className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
                style={{ background: `${e.color}26`, color: e.color }}
              >
                {e.from
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" aria-label="Unread" />
                    <span className="truncate text-[15px] font-semibold text-fg">{e.from}</span>
                  </span>
                  <span className="flex-shrink-0 text-[12px] tabular-nums text-fg-faint">{e.time}</span>
                </div>
                <p className="truncate text-[15px] font-semibold text-fg">{e.subject}</p>
                <p className="line-clamp-2 text-[14px] leading-snug text-fg-faint">{e.preview}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* FAQ accordion.                                                         */
/* ---------------------------------------------------------------------- */

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-6 py-6 text-left"
            aria-expanded={open === i}
          >
            <span className="text-[18px] font-semibold text-fg sm:text-[20px]">{f.q}</span>
            <span
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line-strong text-accent transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </span>
          </button>
          <div
            className="grid transition-all duration-300 ease-out"
            style={{ gridTemplateRows: open === i ? "1fr" : "0fr", opacity: open === i ? 1 : 0 }}
          >
            <p className="overflow-hidden pb-0 text-[17px] leading-relaxed text-fg-dim">
              <span className="block pb-6">{f.a}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
