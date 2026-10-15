"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, useInView } from "./Reveal";

export const STAGE_COLORS = ["#2b7bf6", "#4f9bff", "#f5b524", "#9ccf4a", "#22b07d"];

/* ---------------------------------------------------------------------- */
/* Hero: a job search turning into a pipeline, shown as floating cards.     */
/* ---------------------------------------------------------------------- */

const HERO_CARDS = [
  { tag: "Application #48", text: "No reply after 3 weeks", color: "#6b6c74", muted: true },
  { tag: "Hiring manager replied", text: "“Let’s talk on Thursday.”", color: "#2b7bf6" },
  { tag: "Interview booked", text: "Thu · 10:00 · Video call", color: "#f5b524" },
  { tag: "Offer received", text: "Time to negotiate", color: "#22b07d" },
];

export function HeroCards() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="animate-glow absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(43,123,246,0.35),transparent)]" />
      <div className="relative flex flex-col gap-4">
        {HERO_CARDS.map((c, i) => (
          <Reveal key={c.tag} from="right" delay={250 + i * 180}>
            <div
              className={`animate-float ${i % 2 ? "ml-6 sm:ml-10" : "mr-6 sm:mr-0"}`}
              style={{ animationDelay: `${i * 0.7}s` }}
            >
              <div
                className={`flex items-center gap-4 rounded-xl border bg-bg-alt/90 px-5 py-4 shadow-2xl backdrop-blur ${
                  c.muted ? "border-line opacity-60" : "border-line-strong"
                }`}
                style={c.muted ? undefined : { boxShadow: `0 20px 50px -20px ${c.color}66` }}
              >
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${c.color}22`, color: c.color }}
                >
                  {c.muted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold uppercase tracking-wider" style={{ color: c.muted ? undefined : c.color }}>
                    {c.tag}
                  </p>
                  <p className={`truncate text-[16px] ${c.muted ? "text-fg-faint line-through" : "text-fg"}`}>{c.text}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Pain: rotating list on the left, a bleak application tracker right.    */
/* ---------------------------------------------------------------------- */

const TRACKER = [
  { company: "SaaS company", role: "Account Executive", status: "No reply · 21 days" },
  { company: "Fintech scale-up", role: "Senior AE", status: "Auto-rejected" },
  { company: "Cybersecurity vendor", role: "Mid-Market AE", status: "No reply · 14 days" },
  { company: "HR tech startup", role: "Account Executive", status: "Viewed · no reply" },
  { company: "Data platform", role: "Enterprise AE", status: "No reply · 9 days" },
];

export function PainSection({ points }: { points: string[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActive((a) => (a + 1) % points.length), 3500);
    return () => clearInterval(id);
  }, [visible, points.length]);

  return (
    <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
      <ul className="border-l border-line">
        {points.map((p, i) => (
          <li key={p}>
            <button
              onClick={() => setActive(i)}
              className={`relative -ml-px w-full border-l-[3px] px-6 py-4 text-left text-[18px] transition-all duration-500 sm:text-[20px] ${
                active === i
                  ? "border-accent bg-bg-alt2/70 font-semibold text-fg"
                  : "border-transparent text-fg-faint hover:text-fg-dim"
              }`}
            >
              {active === i && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-accent">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 6 15 12 9 18" /></svg>
                </span>
              )}
              <span className="block pl-3">{p}</span>
            </button>
          </li>
        ))}
      </ul>

      <Reveal from="right">
        <div className="relative">
          <div className="absolute -inset-8 bg-[radial-gradient(closest-side,rgba(43,123,246,0.25),transparent)]" />
          <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-bg-alt">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
              <span className="text-[15px] font-semibold text-fg">Your applications</span>
              <span className="text-[14px] text-fg-faint">50 sent · 1 reply</span>
            </div>
            {TRACKER.map((t, i) => (
              <div
                key={t.company}
                className={`flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6 last:border-b-0 transition-colors duration-500 ${
                  i === active % TRACKER.length ? "bg-bg-alt2" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-[15px] text-fg">{t.company}</p>
                  <p className="truncate text-[13px] text-fg-faint">{t.role}</p>
                </div>
                <span className="flex-shrink-0 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[12px] font-medium text-red-300">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Goal: callback rate before vs. after, as a growing bar chart.          */
/* ---------------------------------------------------------------------- */

export function CallbackChart() {
  const rows = [
    { label: "Applying the usual way", value: 1, color: "#6b6c74" },
    { label: "Running the SalesLift system", value: 50, color: "#2b7bf6" },
  ];
  return (
    <Reveal from="scale">
      <div className="relative">
        <div className="absolute -inset-10 bg-[radial-gradient(closest-side,rgba(43,123,246,0.28),transparent)]" />
        <div className="relative rounded-2xl border border-line-strong bg-bg-alt p-7 sm:p-9">
          <p className="mb-1 text-[14px] font-semibold uppercase tracking-wider text-fg-faint">Application → interview rate</p>
          <p className="mb-8 text-[15px] text-fg-faint">My own numbers, before and after</p>
          <div className="flex flex-col gap-7">
            {rows.map((r) => (
              <div key={r.label}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-[16px] text-fg-dim">{r.label}</span>
                  <span className="text-[28px] font-extrabold tabular-nums" style={{ color: r.value > 1 ? r.color : "#a1a2aa" }}>
                    {r.value}%
                  </span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-bg-alt2">
                  <div
                    className="grow-bar h-full rounded-full"
                    style={{
                      width: `${Math.max(r.value * 2, 2)}%`,
                      background: r.value > 1 ? `linear-gradient(90deg, #1f5fc4, ${r.color} 60%, #6fb1ff)` : r.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* gridlines */}
          <div className="mt-6 flex justify-between text-[12px] text-fg-faint">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------------- */
/* Plan: five stages along a rising, color-shifting path.                */
/* ---------------------------------------------------------------------- */

export function StagePath({ stages }: { stages: { n: string; name: string; detail: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.2);
  // Points on the curve where each stage sits (viewBox 1000 x 260).
  const points = [
    [100, 220],
    [300, 180],
    [500, 150],
    [700, 95],
    [900, 40],
  ];

  return (
    <div ref={ref} className={visible ? "is-visible" : ""}>
      {/* Desktop: curve + staggered cards */}
      <div className="relative hidden lg:block">
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
            className="draw-path"
            d="M-40 245 C 120 230, 220 200, 300 180 S 450 158, 500 150 S 650 115, 700 95 S 850 52, 1040 25"
            fill="none"
            stroke="url(#stage-line)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {points.map(([x, y], i) => (
            <g
              key={i}
              style={{ transition: `opacity 0.5s ${0.6 + i * 0.3}s, transform 0.5s ${0.6 + i * 0.3}s`, opacity: visible ? 1 : 0, transformOrigin: `${x}px ${y}px`, transform: visible ? "none" : "scale(0.3)" }}
            >
              <rect x={x - 13} y={y - 13} width="26" height="26" transform={`rotate(45 ${x} ${y})`} fill={STAGE_COLORS[i]} />
              <rect x={x - 4} y={y - 4} width="8" height="8" transform={`rotate(45 ${x} ${y})`} fill="#1b1c20" />
            </g>
          ))}
        </svg>
        <div className="mt-8 grid grid-cols-5 gap-5">
          {stages.map((s, i) => (
            <Reveal key={s.n} delay={700 + i * 200}>
              <div
                className="h-full rounded-xl border bg-bg-alt p-5"
                style={{
                  borderColor: `${STAGE_COLORS[i]}55`,
                  background: `linear-gradient(160deg, ${STAGE_COLORS[i]}1f, #212226 55%)`,
                }}
              >
                <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.25em]" style={{ color: STAGE_COLORS[i] }}>
                  Stage {s.n}
                </p>
                <h3 className="mb-2 text-[20px] font-bold text-fg">{s.name}</h3>
                <p className="text-[15px] leading-relaxed text-fg-dim">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <ol className="relative ml-3 border-l-2 border-line lg:hidden">
        {stages.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 120} className="relative mb-8 pl-8 last:mb-0">
            <span
              className="absolute -left-[9px] top-1.5 h-4 w-4 rotate-45"
              style={{ background: STAGE_COLORS[i] }}
            />
            <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.25em]" style={{ color: STAGE_COLORS[i] }}>
              Stage {s.n}
            </p>
            <h3 className="mb-1 text-[20px] font-bold text-fg">{s.name}</h3>
            <p className="text-[16px] leading-relaxed text-fg-dim">{s.detail}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* What you get: stacked module cards with segmented progress bars.       */
/* ---------------------------------------------------------------------- */

export function ModuleStack({ modules }: { modules: { n: string; name: string; minutes: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const fills = [17, 9, 5, 3, 1]; // filled segments out of 22, per card

  return (
    <div ref={ref} className="relative">
      <div className="animate-glow absolute -left-10 -top-10 h-64 w-64 bg-[radial-gradient(closest-side,rgba(43,123,246,0.45),transparent)]" />
      <div className="absolute -right-6 top-24 hidden h-40 w-28 bg-white/[0.03] sm:block" />
      <div className="relative flex flex-col gap-3">
        {modules.map((m, i) => (
          <Reveal key={m.n} from="left" delay={i * 140}>
            <div
              className="border border-line-strong px-6 py-5"
              style={{
                background:
                  i === 0 ? "linear-gradient(120deg, #1f5fc4 0%, #2b7bf6 35%, #212226 85%)" : "#212226",
              }}
            >
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <span className={`text-[19px] font-semibold sm:text-[21px] ${i === 0 ? "text-white" : "text-fg"}`}>
                  {m.name}
                </span>
                <span className="text-[14px] text-fg-dim">{m.minutes} min</span>
              </div>
              <div className="flex gap-[5px]">
                {Array.from({ length: 22 }).map((_, k) => (
                  <span
                    key={k}
                    className="h-[9px] flex-1 transition-colors duration-300"
                    style={{
                      background: visible && k < fills[i] ? (i === 0 ? "#3d8bff" : "#8e8f97") : "#34353b",
                      transitionDelay: `${300 + i * 140 + k * 45}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Vision: the inbox that's waiting.                                      */
/* ---------------------------------------------------------------------- */

export function InboxMock({ items }: { items: string[] }) {
  const senders = [
    { name: "Head of Sales", color: "#2b7bf6" },
    { name: "VP Sales", color: "#f5b524" },
    { name: "Talent Partner", color: "#22b07d" },
    { name: "Hiring Manager", color: "#4f9bff" },
  ];
  const times = ["9:12", "11:40", "14:05", "16:30"];

  return (
    <div className="relative">
      <div className="absolute -inset-10 bg-[radial-gradient(closest-side,rgba(34,176,125,0.18),transparent)]" />
      <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-bg-alt">
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[14px] font-semibold text-fg">Inbox</span>
          <span className="ml-auto rounded-full bg-accent px-2.5 py-0.5 text-[12px] font-bold text-accent-fg">4 new</span>
        </div>
        {items.map((text, i) => (
          <Reveal key={text} from="up" delay={i * 160}>
            <div className="flex gap-4 border-b border-line px-5 py-4 last:border-b-0">
              <span
                className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
                style={{ background: `${senders[i % 4].color}26`, color: senders[i % 4].color }}
              >
                {senders[i % 4].name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-[15px] font-semibold text-fg">{senders[i % 4].name}</span>
                  <span className="flex-shrink-0 text-[12px] text-fg-faint">{times[i % 4]}</span>
                </div>
                <p className="text-[15px] leading-snug text-fg-dim">{text}</p>
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
