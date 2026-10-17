import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BuyButton } from "@/components/BuyButton";
import { Reveal } from "@/components/landing/Reveal";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { PainSection, CallbackChart, StagePath, Faq } from "@/components/landing/Visuals";
import { SiteHeader, SiteFooter, Eyebrow, Check, BrowserShot } from "@/components/landing/Site";
import { ROLES, PAIN_POINTS, STAGES, INCLUDED, FAQ, PRICE_LABEL } from "@/lib/content/landing";

export const dynamic = "force-dynamic";

// Home page, kept short on purpose: Hero → Pain → Solution → Product + pricing.
// Details live on /curriculum, /story and /faq.
export default async function LandingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <SiteHeader />

      {/* 1. Hero */}
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
                <p className="text-[15px] text-fg-faint">One payment · lifetime access · about an hour of lessons</p>
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

      {/* 2. Pain */}
      <section className="bg-[#18191c] px-5 py-24 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mb-5 text-[38px] font-extrabold leading-tight tracking-tight sm:text-[54px]">Sound familiar?</h2>
            <p className="text-[19px] text-fg-dim">
              Somewhere in there, a quieter question creeps in: maybe the market&apos;s right about you.
            </p>
          </Reveal>
          <PainSection points={PAIN_POINTS} />
          <Reveal className="mt-14 text-center">
            <p className="mx-auto max-w-2xl text-[20px] font-semibold leading-relaxed text-fg sm:text-[22px]">
              That doubt is what a broken hiring process does to good salespeople,{" "}
              <span className="text-accent">not a verdict on your ability.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Solution */}
      <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden px-5 py-24 sm:px-8 lg:py-28">
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
          <Reveal className="mt-12 text-center">
            <Link href="/curriculum" className="text-[17px] font-medium text-accent no-underline hover:underline">
              See the full curriculum →
            </Link>
          </Reveal>
        </div>

        {/* Proof band */}
        <div className="relative mx-auto mt-24 grid max-w-6xl items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
          <Reveal>
            <Eyebrow>Why it works</Eyebrow>
            <h3 className="mb-5 text-[32px] font-extrabold leading-tight tracking-tight sm:text-[42px]">
              I went from <span className="text-accent">1% to 50%</span> callbacks.
            </h3>
            <p className="mb-6 text-[18px] leading-relaxed text-fg-dim">
              AE experience at Gartner, a track record of overachieving on target, and a year where I sent hundreds of
              applications and got two interviews. Two. SalesLift is the system I built to fix that.
            </p>
            <Link href="/story" className="text-[17px] font-medium text-accent no-underline hover:underline">
              Read my story →
            </Link>
          </Reveal>
          <CallbackChart />
        </div>
      </section>

      {/* 4. Product + pricing */}
      <section id="pricing" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-[#18191c] px-5 py-24 sm:px-8 lg:py-28">
        <div className="animate-glow pointer-events-none absolute right-0 top-1/3 h-[520px] w-[720px] bg-[radial-gradient(closest-side,rgba(43,123,246,0.2),transparent)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mb-14 text-center">
            <Eyebrow>The course</Eyebrow>
            <h2 className="text-[38px] font-extrabold tracking-tight sm:text-[54px]">Everything in one place.</h2>
          </Reveal>

          <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] [&>*]:min-w-0">
            <Reveal from="left">
              <div className="relative pb-16 pr-6 sm:pb-24 sm:pr-16">
                <BrowserShot src="/screenshots/course-dashboard.png" alt="The SalesLift course overview with progress" />
                <div className="absolute bottom-0 right-0 w-[62%]">
                  <BrowserShot src="/screenshots/course-lesson.png" alt="A SalesLift lesson page" />
                </div>
              </div>
            </Reveal>

            <Reveal from="right">
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

          <div className="mx-auto mt-24 grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr]">
            <Reveal>
              <h3 className="text-[32px] font-extrabold tracking-tight sm:text-[40px]">Questions</h3>
              <Link href="/faq" className="mt-4 inline-block text-[17px] font-medium text-accent no-underline hover:underline">
                See all questions →
              </Link>
            </Reveal>
            <Reveal delay={150}>
              <Faq items={FAQ.slice(0, 3)} />
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
