import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BuyButton } from "@/components/BuyButton";
import { Reveal } from "@/components/landing/Reveal";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { PainSection, CallbackChart, StagePath, Faq } from "@/components/landing/Visuals";
import { SiteHeader, SiteFooter, Eyebrow, Check, BrowserShot } from "@/components/landing/Site";
import { MODULES } from "@/lib/content/modules";
import {
  ROLES,
  ARCHETYPES,
  PROBLEMS,
  STAGES,
  STAGE_COLORS,
  TEMPLATES,
  INCLUDED,
  FAQ,
  PRICE_LABEL,
} from "@/lib/content/landing";

export const dynamic = "force-dynamic";

// Home page, following a plain sales-page structure:
// Promise → Who it's for → Credibility → Problems → How it works → Offer → FAQ.
// The shorter earlier version lives at /v2 ("Homepage version 2").
export default async function LandingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <SiteHeader />

      {/* 1. Promise */}
      <section className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(43,123,246,0.16),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:pb-28 lg:pt-24 [&>*]:min-w-0">
          <div>
            <Reveal>
              <h1 className="mb-7 whitespace-nowrap text-[clamp(34px,10.5vw,44px)] font-extrabold leading-[1.02] tracking-tight sm:text-[64px] lg:text-[58px] xl:text-[72px]">
                Get <span className="text-accent">noticed.</span>
                <br />
                Get <span className="text-amber">interviews.</span>
                <br />
                Get <span className="text-green">hired.</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mb-9 max-w-xl text-[19px] leading-relaxed text-fg-dim sm:text-[20px]">
                The job hunt is broken. SalesLift is a{" "}
                <span className="font-semibold text-fg">self-paced course</span> that takes you from{" "}
                <span className="font-semibold text-fg">1% to 50% callbacks</span>: five short modules and ready-to-use
                templates, designed for salespeople like you.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <BuyButton label={`Get the course · ${PRICE_LABEL}`} />
                <p className="text-[15px] text-fg-faint">One payment · lifetime access · about 2 hours of lessons</p>
              </div>
            </Reveal>
            <Reveal delay={450}>
              <div className="mt-10">
                <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.25em] text-fg-faint">Built for</p>
                <ul className="flex max-w-xl flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <li key={r} className="border border-line-strong bg-bg-alt/70 px-3 py-1.5 text-[14px] font-medium text-fg-dim">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal from="right" delay={200}>
            <div className="relative">
              <div className="animate-glow absolute -inset-10 bg-[radial-gradient(closest-side,rgba(43,123,246,0.3),transparent)]" />
              <div className="animate-float relative">
                <BrowserShot src="/screenshots/course-lesson.png" alt="A SalesLift lesson with the course sidebar" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <LogoStrip />

      {/* 2. Who it's for */}
      <section className="px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 text-center">
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className="text-[36px] font-extrabold leading-tight tracking-tight sm:text-[50px]">Sound like you?</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ARCHETYPES.map((a, i) => (
              <Reveal key={a.title} delay={i * 100}>
                <div
                  className="h-full border bg-bg-alt p-7"
                  style={{ borderColor: `${STAGE_COLORS[i + 1] ?? STAGE_COLORS[0]}55` }}
                >
                  <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.25em]" style={{ color: STAGE_COLORS[i + 1] }}>
                    0{i + 1}
                  </p>
                  <h3 className="mb-2 text-[21px] font-bold">{a.title}</h3>
                  <p className="text-[16px] leading-relaxed text-fg-dim">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/faq" className="text-[16px] font-medium text-fg-faint no-underline hover:text-fg">
              Not sure? See who it&apos;s not for →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 3. Credibility */}
      <section className="border-t border-line bg-[#18191c] px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
          <Reveal>
            <Eyebrow>Why trust me</Eyebrow>
            <h2 className="mb-5 text-[34px] font-extrabold leading-tight tracking-tight sm:text-[46px]">
              I went from <span className="text-accent">1% to 50%</span> callbacks.
            </h2>
            <p className="mb-6 text-[18px] leading-relaxed text-fg-dim">
              AE experience at Gartner, a track record of overachieving on target, and a year where I sent hundreds of
              applications and got two interviews. Two. SalesLift is the system I built to fix that, and it got me
              interviews at the companies above.
            </p>
            <Link href="/story" className="text-[17px] font-medium text-accent no-underline hover:underline">
              Read my story →
            </Link>
          </Reveal>
          <CallbackChart />
        </div>
      </section>

      {/* 4. Problems */}
      <section className="px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mb-5 text-[38px] font-extrabold leading-tight tracking-tight sm:text-[54px]">
              It&apos;s not you. <span className="text-fg-faint">It&apos;s the process.</span>
            </h2>
            <p className="text-[19px] text-fg-dim">The three things that keep good salespeople from getting interviews.</p>
          </Reveal>
          <PainSection problems={PROBLEMS} />
        </div>
      </section>

      {/* 5. How it works */}
      <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-[#18191c] px-5 py-24 sm:px-8 lg:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[420px] bg-[radial-gradient(60%_60%_at_40%_50%,rgba(43,123,246,0.18),transparent)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mb-14 text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mb-5 text-[38px] font-extrabold tracking-tight sm:text-[54px]">
              From ignored to <span className="text-green">interviewing.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-[19px] text-fg-dim">
              Five stages, each one building on the last. The course shows you exactly how to do each one.
            </p>
          </Reveal>
          <StagePath stages={STAGES} />
        </div>
      </section>

      {/* 6. Offer */}
      <section id="pricing" className="relative scroll-mt-20 overflow-hidden px-5 py-24 sm:px-8 lg:py-28">
        <div className="animate-glow pointer-events-none absolute right-0 top-1/3 h-[520px] w-[720px] bg-[radial-gradient(closest-side,rgba(43,123,246,0.2),transparent)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mb-14 text-center">
            <Eyebrow>Everything you get</Eyebrow>
            <h2 className="text-[38px] font-extrabold tracking-tight sm:text-[54px]">One course. Everything included.</h2>
          </Reveal>

          <Reveal from="scale" className="mx-auto mb-16 max-w-5xl">
            <div className="relative pb-16 pr-6 sm:pb-24 sm:pr-16">
              <BrowserShot src="/screenshots/course-dashboard.png" alt="The SalesLift course overview with progress" />
              <div className="absolute bottom-0 right-0 w-[58%]">
                <BrowserShot src="/screenshots/course-lesson.png" alt="A SalesLift lesson page" />
              </div>
            </div>
          </Reveal>

          <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr] [&>*]:min-w-0">
            <div className="flex flex-col gap-12">
              <div>
                <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.25em] text-fg-faint">5 modules</h3>
                <ul className="border-t border-line">
                  {MODULES.map((m, i) => (
                    <Reveal as="li" key={m.slug} delay={i * 70} className="flex gap-5 border-b border-line py-5">
                      <span className="pt-0.5 text-[14px] font-bold tabular-nums" style={{ color: STAGE_COLORS[i] }}>
                        {STAGES[i].n}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <p className="text-[18px] font-semibold">
                            {m.title}: <span className="font-normal text-fg-dim">{STAGES[i].headline.toLowerCase()}</span>
                          </p>
                          <span className="text-[14px] text-fg-faint">{m.estimatedMinutes} min</span>
                        </div>
                        <p className="mt-1 text-[15px] text-fg-faint">You walk away with: {STAGES[i].outcome}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <Link href="/curriculum" className="mt-5 inline-block text-[16px] font-medium text-accent no-underline hover:underline">
                  See the full curriculum →
                </Link>
              </div>

              <div>
                <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.25em] text-fg-faint">Templates and tools</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {TEMPLATES.map((t, i) => (
                    <Reveal key={t.name} delay={i * 70}>
                      <div className="h-full border border-line-strong bg-bg-alt p-5">
                        <p className="mb-1 text-[17px] font-semibold">{t.name}</p>
                        <p className="text-[15px] leading-relaxed text-fg-dim">{t.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            <Reveal from="right" className="lg:sticky lg:top-28">
              <div className="border border-accent/50 bg-bg-alt p-9 shadow-[0_40px_120px_-40px_rgba(43,123,246,0.7)] sm:p-11">
                <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.3em] text-accent">The full system</p>
                <div className="mb-8 text-[64px] font-extrabold leading-none tracking-tight">
                  {PRICE_LABEL}
                  <span className="ml-3 text-[22px] font-medium text-fg-faint">one-time</span>
                </div>
                <ul className="mb-10 flex flex-col gap-4">
                  {INCLUDED.map((x) => (
                    <li key={x} className="flex gap-4 text-[17px] text-fg">
                      <Check />
                      {x}
                    </li>
                  ))}
                </ul>
                <BuyButton label="Get the course" className="w-full justify-between" />
                <p className="mt-5 text-center text-[14px] text-fg-faint">
                  Secure checkout with Stripe. Your account is created right after you pay.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="border-t border-line bg-[#18191c] px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <h2 className="text-[34px] font-extrabold tracking-tight sm:text-[46px]">Questions</h2>
            <Link href="/faq" className="mt-4 inline-block text-[17px] font-medium text-accent no-underline hover:underline">
              See all questions →
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <Faq items={FAQ.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      {/* Temporary: link to the alternative homepage for comparison. Remove before driving traffic. */}
      <section className="border-t border-line px-5 py-16 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 border border-dashed border-line-strong bg-bg-alt px-8 py-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="mb-2 text-[24px] font-bold tracking-tight">Homepage version 2</h2>
            <p className="text-[16px] text-fg-dim">A shorter take on this page, for comparison.</p>
          </div>
          <Link
            href="/v2"
            className="flex-shrink-0 border border-line-strong bg-bg px-5 py-3 text-[16px] font-medium text-fg no-underline hover:border-accent"
          >
            View version 2 →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
