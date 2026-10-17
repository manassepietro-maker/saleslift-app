import type { Metadata } from "next";
import { Reveal } from "@/components/landing/Reveal";
import { SiteHeader, SiteFooter, Eyebrow, BrowserShot } from "@/components/landing/Site";
import { PageCta } from "@/components/landing/PageCta";
import { MODULES, WELCOME, INTRO } from "@/lib/content/modules";
import { STAGES, MODULE_DELIVERABLES, STAGE_COLORS } from "@/lib/content/landing";

export const metadata: Metadata = { title: "Curriculum | SalesLift" };

export default function CurriculumPage() {
  const totalMinutes = WELCOME.estimatedMinutes + INTRO.estimatedMinutes + MODULES.reduce((t, m) => t + m.estimatedMinutes, 0);

  return (
    <main className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <SiteHeader />

      <section className="px-5 pb-16 pt-16 sm:px-8 lg:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 [&>*]:min-w-0">
          <Reveal>
            <Eyebrow>Curriculum</Eyebrow>
            <h1 className="mb-6 text-[40px] font-extrabold leading-[1.05] tracking-tight sm:text-[58px]">
              What&apos;s inside the course.
            </h1>
            <p className="max-w-xl text-[19px] leading-relaxed text-fg-dim">
              A short welcome, then five modules that follow the order of a real job search. About {totalMinutes} minutes
              of lessons in total, plus templates you use the same day.
            </p>
          </Reveal>
          <Reveal from="right">
            <BrowserShot src="/screenshots/course-dashboard.png" alt="The SalesLift course overview" />
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-6 flex items-center justify-between border border-line bg-bg-alt px-7 py-5">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-fg-faint">Start here</p>
                <p className="mt-1 text-[18px] font-semibold">Welcome and why this course exists</p>
              </div>
              <span className="text-[15px] text-fg-faint">{WELCOME.estimatedMinutes + INTRO.estimatedMinutes} min</span>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {MODULES.map((m, i) => {
              const stage = STAGES[i];
              const color = STAGE_COLORS[i];
              return (
                <Reveal key={m.slug} delay={i * 80}>
                  <article
                    className="border bg-bg-alt p-7 sm:p-9"
                    style={{ borderColor: `${color}55`, background: `linear-gradient(160deg, ${color}14, #212226 50%)` }}
                  >
                    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                      <p className="text-[13px] font-semibold uppercase tracking-[0.25em]" style={{ color }}>
                        Module {stage.n} · {m.title}
                      </p>
                      <span className="text-[15px] text-fg-faint">{m.estimatedMinutes} min</span>
                    </div>
                    <h2 className="mb-3 text-[26px] font-bold leading-snug tracking-tight sm:text-[30px]">{stage.headline}</h2>
                    <p className="mb-6 max-w-3xl text-[17px] leading-relaxed text-fg-dim">{m.summary}</p>
                    <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-fg-faint">You walk away with</p>
                    <ul className="flex flex-wrap gap-2">
                      {(MODULE_DELIVERABLES[m.slug] ?? []).map((d) => (
                        <li key={d} className="flex items-center gap-2 border border-line-strong bg-bg px-3 py-1.5 text-[14px] text-fg-dim">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <PageCta title={<>Start with module one <span className="text-accent">today.</span></>} />
      <SiteFooter />
    </main>
  );
}
