import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/Logo";
import { BuyButton } from "@/components/BuyButton";
import { Reveal, CountUp } from "@/components/landing/Reveal";
import {
  HeroCards,
  PainSection,
  CallbackChart,
  StagePath,
  ModuleStack,
  InboxMock,
  Faq,
} from "@/components/landing/Visuals";

export const dynamic = "force-dynamic";

const PAIN_POINTS = [
  "You've sent fifty applications and heard back from one.",
  "You're hitting your numbers at work, but your CV gets ignored.",
  "You know you're good at this. The market doesn't seem to agree.",
  "Job descriptions asking for 10 years experience on a solution that's 2 years old.",
  "Every job-search tip you find online is generic, written for people who've never had to sell anything to anyone.",
];

const OLD_WAY = [
  'Type "sales jobs" on Google and randomly apply',
  "Send out the same CV to every single position",
  "Fill out the job application and wait",
  "Apply once and give up",
];

const NEW_WAY = [
  "Know which companies are an ideal match for you",
  "Tailor your application to your audience",
  "Break through the noise with your application",
  "Pursue low-noise channels to stand out",
];

const STAGES = [
  { n: "01", name: "Position", detail: "Learn how to brand your experience in a way that is unignorable." },
  { n: "02", name: "Target", detail: "Find the right company and position for you, so you won't be leaving one year later." },
  { n: "03", name: "Access", detail: "Go through the right channels, where you stand out from a sea of sameness." },
  { n: "04", name: "Leverage", detail: "Show them you are the only option for the job instead of relying on a bot scanning your CV." },
  { n: "05", name: "Execute", detail: "Use a sustainable playbook so you're not tempted to cut corners later on." },
];

const VISION = [
  "Hiring managers chasing you, not the other way around.",
  "Leading the interview process instead of being interviewed.",
  "Choosing between more options, not chasing one callback.",
  "Negotiating the salary you want from a position of power.",
];

const MODULES = [
  { n: "01", name: "Positioning", minutes: 11, detail: "Optimize your LinkedIn profile. Structure your CV to highlight real impact. Present your experience in a way that matches your target roles." },
  { n: "02", name: "Targeting", minutes: 10, detail: "Find high-quality roles across the right platforms. Run a simple tracker — your own mini-CRM for the search. Evaluate companies properly before you spend time on them." },
  { n: "03", name: "Access", minutes: 10, detail: "Identify hiring managers and key stakeholders. Find contact details using LinkedIn and the right tools. Learn who's worth reaching out to and who isn't." },
  { n: "04", name: "Leverage", minutes: 14, detail: "Build a High Value Product — a mini business case made for the specific role, so you walk in already holding a proposal. Make your application about their business, not a recap of your resume.", highlight: "Where most win or lose" },
  { n: "05", name: "Execution", minutes: 10, detail: "Write outreach that actually gets replies. Follow up without being ignored — treat silence like an objection, not a no. Run a simple weekly system so you stay consistent." },
];

const FOR = [
  "You're in sales (or sales-adjacent) and know you can perform but the market just isn't giving you the shot",
  "You're applying and getting ignored, or getting first-round interviews that go nowhere",
  "You're willing to treat your search as a real project, not a background task",
];

const NOT_FOR = [
  'You\'re looking for a "resume template" and nothing more',
  "You want a passive course you'll watch once and not apply",
  "You're not currently able to spend a few focused hours a week on your search",
];

const FAQ = [
  { q: "I've tried job search courses before and they didn't work.", a: "Most job search content is written for generalists. It doesn't use what you already know how to do. SalesLift is built specifically around sales instincts you already have." },
  { q: "Will this work outside SaaS/tech sales?", a: "This methodology is built for SaaS sales but the framework can be scaled to any industry." },
  { q: "How long until I see results?", a: "Most people start getting responses within the first two weeks of running Access + Execution consistently." },
  { q: "What if I'm employed and searching quietly?", a: "The system works discreetly: targeting, access, and outreach are built to be low-visibility if you need them to be." },
  { q: "What happens if I want continued support once I book the interview?", a: "You have the option to book live 1:1 sessions for coaching if you want to master the interview process." },
];

function Eyebrow({ children, color = "#2b7bf6" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="mb-5 inline-block border px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.3em]"
      style={{ borderColor: `${color}88`, color }}
    >
      {children}
    </span>
  );
}

function Check({ color = "#2b7bf6" }: { color?: string }) {
  return (
    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full" style={{ background: `${color}22`, color }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    </span>
  );
}

function Cross() {
  return (
    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-fg-faint">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
    </span>
  );
}

export default async function LandingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen overflow-x-hidden bg-bg text-fg">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo />
          <nav className="flex items-center gap-6 text-[16px] text-fg-dim sm:gap-9">
            <a href="#how-it-works" className="hidden text-fg-dim no-underline hover:text-fg md:inline">How it works</a>
            <a href="#inside" className="hidden text-fg-dim no-underline hover:text-fg md:inline">Inside the course</a>
            <a href="#pricing" className="hidden text-fg-dim no-underline hover:text-fg md:inline">Pricing</a>
            <Link href="/login" className="text-fg no-underline hover:opacity-80">Log in</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(43,123,246,0.16),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.25fr_1fr] [&>*]:min-w-0 lg:pb-32 lg:pt-28">
          <div>
            <Reveal>
              <h1 className="mb-8 whitespace-nowrap text-[clamp(34px,10.5vw,44px)] font-extrabold leading-[1.02] tracking-tight sm:text-[64px] lg:text-[60px] xl:text-[76px]">
                Get <span className="text-accent">noticed.</span>
                <br />
                Get <span className="text-amber">interviews.</span>
                <br />
                Get <span className="text-green">hired.</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mb-10 max-w-xl text-[19px] leading-relaxed text-fg-dim sm:text-[21px]">
                The job search system that <em className="not-italic font-semibold text-fg">actually</em> gets salespeople
                interviews. Built by a salesperson, for salespeople who already know they&apos;re good enough.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-5">
                <a
                  href="#pricing"
                  className="group inline-flex items-center gap-4 bg-accent py-2 pl-7 pr-2 text-[17px] font-semibold text-white no-underline shadow-[0_15px_40px_-12px_rgba(43,123,246,0.8)] hover:brightness-110"
                >
                  Get your dream job
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f5fc4] transition-transform group-hover:translate-x-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 6 12 12 6 18" /><polyline points="13 6 19 12 13 18" /></svg>
                  </span>
                </a>
                <a href="#how-it-works" className="text-[17px] font-medium text-fg-dim no-underline hover:text-fg">
                  See how it works →
                </a>
              </div>
            </Reveal>
          </div>
          <HeroCards />
        </div>
      </section>

      {/* Pain */}
      <section className="border-t border-line bg-[#18191c] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-5 text-[38px] font-extrabold leading-tight tracking-tight sm:text-[54px]">Sound familiar?</h2>
            <p className="text-[19px] text-fg-dim">
              Somewhere in there, a quieter question creeps in: maybe the market&apos;s right about you.
            </p>
          </Reveal>
          <PainSection points={PAIN_POINTS} />
          <Reveal className="mt-16 text-center">
            <p className="mx-auto max-w-2xl text-[20px] font-semibold leading-relaxed text-fg sm:text-[22px]">
              That doubt is what a broken hiring process does to good salespeople,{" "}
              <span className="text-accent">not a verdict on your ability.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Goal / credibility */}
      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 [&>*]:min-w-0">
          <div>
            <Reveal>
              <Eyebrow>The goal</Eyebrow>
              <h2 className="mb-7 text-[38px] font-extrabold leading-[1.05] tracking-tight sm:text-[54px]">
                <span className="text-accent">
                  <CountUp to={50} suffix="%" />
                </span>{" "}
                callback rate after you apply
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mb-5 text-[19px] leading-relaxed text-fg-dim">
                I&apos;ve been exactly where you are. AE experience at Gartner, a track record of hitting target
                and a year where I sent hundreds of applications and got two interviews. Two.
              </p>
              <p className="text-[19px] leading-relaxed text-fg-dim">
                That&apos;s when I stopped treating my search like a form to fill out and started treating it
                like a pipeline. SalesLift is the methodology, built on months of work so you don&apos;t have to
                find it the hard way.
              </p>
            </Reveal>
          </div>
          <CallbackChart />
        </div>
      </section>

      {/* Mechanism */}
      <section className="border-t border-line bg-[#18191c] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-16 max-w-4xl text-center">
            <h2 className="text-[34px] font-extrabold leading-tight tracking-tight sm:text-[50px]">
              Your job search is a sales process.{" "}
              <span className="text-fg-faint">Most people just aren&apos;t running it like one.</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal from="left">
              <div className="h-full border border-line bg-bg-alt p-8 sm:p-10">
                <h3 className="mb-7 text-[13px] font-semibold uppercase tracking-[0.3em] text-fg-faint">The old way</h3>
                <ul className="flex flex-col gap-5">
                  {OLD_WAY.map((x) => (
                    <li key={x} className="flex gap-4 text-[18px] text-fg-faint">
                      <Cross />
                      <span className="line-through decoration-white/20">{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal from="right" delay={150}>
              <div
                className="relative h-full overflow-hidden border border-accent/50 p-8 sm:p-10"
                style={{ background: "linear-gradient(150deg, rgba(43,123,246,0.22), #212226 60%)" }}
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
                <h3 className="relative mb-7 text-[13px] font-semibold uppercase tracking-[0.3em] text-accent">What actually works</h3>
                <ul className="relative flex flex-col gap-5">
                  {NEW_WAY.map((x) => (
                    <li key={x} className="flex gap-4 text-[18px] text-fg">
                      <Check />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-12 text-center">
            <p className="mx-auto max-w-2xl text-[19px] text-fg-dim">
              You already have the instincts to fix this. You just need a proven framework that gets you
              through the door.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Plan */}
      <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[420px] bg-[radial-gradient(60%_60%_at_40%_50%,rgba(43,123,246,0.18),transparent)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mb-14 text-center">
            <Eyebrow>Your plan</Eyebrow>
            <h2 className="text-[38px] font-extrabold tracking-tight sm:text-[54px]">
              Five stages. <span className="text-accent">One pipeline.</span>
            </h2>
          </Reveal>
          <StagePath stages={STAGES} />
          <Reveal className="mt-14 text-center">
            <p className="text-[17px] text-fg-faint">
              Each stage builds on the last. Skip one and the rest gets harder — same as any pipeline.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What's inside */}
      <section id="inside" className="scroll-mt-20 border-t border-line bg-[#18191c] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 [&>*]:min-w-0">
          <ModuleStack modules={MODULES} />
          <div>
            <Reveal>
              <Eyebrow>Inside the course</Eyebrow>
              <h2 className="mb-6 text-[38px] font-extrabold leading-[1.05] tracking-tight sm:text-[52px]">
                What you actually get
              </h2>
              <p className="mb-10 text-[19px] leading-relaxed text-fg-dim">
                Five short, practical modules plus templates you&apos;ll use the same day. No filler, no quizzes — just the
                system.
              </p>
            </Reveal>
            <div className="flex flex-col gap-6">
              {MODULES.map((m, i) => (
                <Reveal key={m.n} delay={i * 100}>
                  <div className="flex gap-5">
                    <span className="pt-1 text-[15px] font-bold tabular-nums text-accent">{m.n}</span>
                    <div>
                      <h3 className="mb-1 flex flex-wrap items-center gap-3 text-[19px] font-semibold">
                        {m.name}
                        {m.highlight && (
                          <span className="border border-amber/60 px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-wider text-amber">
                            {m.highlight}
                          </span>
                        )}
                      </h3>
                      <p className="text-[16px] leading-relaxed text-fg-dim">{m.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 [&>*]:min-w-0">
          <div>
            <Reveal>
              <Eyebrow color="#22b07d">Six weeks from now</Eyebrow>
              <h2 className="mb-6 text-[38px] font-extrabold leading-[1.05] tracking-tight sm:text-[54px]">
                Picture the inbox <span className="text-green">that&apos;s waiting.</span>
              </h2>
              <p className="text-[19px] leading-relaxed text-fg-dim">
                Six weeks from now you could still be refreshing your inbox waiting on the same three companies,
                or already deciding between two offers.
              </p>
            </Reveal>
          </div>
          <InboxMock items={VISION} />
        </div>
      </section>

      {/* Proof */}
      <section className="relative border-t border-line bg-[#18191c] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-14 text-center">
            <h2 className="text-[34px] font-extrabold tracking-tight sm:text-[50px]">
              What&apos;s possible when you run the full system
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { big: <>1% → <CountUp to={50} suffix="%" /></>, small: "Application-to-interview conversion", color: "#2b7bf6" },
              { big: <><CountUp to={3} />x</>, small: "Salary conversations", color: "#f5b524" },
              { big: "Dream roles", small: "Interviews for roles I never would have imagined", color: "#22b07d" },
            ].map((p, i) => (
              <Reveal key={p.small} from="scale" delay={i * 150}>
                <div
                  className="relative h-full overflow-hidden border border-line-strong bg-bg-alt p-9 text-center"
                  style={{ boxShadow: `inset 0 3px 0 ${p.color}` }}
                >
                  <div className="absolute left-1/2 top-0 h-32 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: `${p.color}55` }} />
                  <div className="relative mb-3 whitespace-nowrap text-[40px] font-extrabold tracking-tight lg:text-[44px]" style={{ color: p.color }}>
                    {p.big}
                  </div>
                  <div className="relative text-[17px] text-fg-dim">{p.small}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-[14px] text-fg-faint">
            Results depend on how fully you run the system — this is what became possible, not a guarantee
            of what will happen automatically.
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Reveal from="left">
            <div
              className="h-full border border-green/40 p-8 sm:p-10"
              style={{ background: "linear-gradient(150deg, rgba(34,176,125,0.16), #212226 60%)" }}
            >
              <h3 className="mb-7 text-[24px] font-bold">This is for you if:</h3>
              <ul className="flex flex-col gap-5">
                {FOR.map((f) => (
                  <li key={f} className="flex gap-4 text-[17px] leading-relaxed text-fg">
                    <Check color="#22b07d" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal from="right" delay={150}>
            <div className="h-full border border-line bg-bg-alt p-8 sm:p-10">
              <h3 className="mb-7 text-[24px] font-bold text-fg-dim">This isn&apos;t for you if:</h3>
              <ul className="flex flex-col gap-5">
                {NOT_FOR.map((f) => (
                  <li key={f} className="flex gap-4 text-[17px] leading-relaxed text-fg-faint">
                    <Cross />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-[#18191c] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <h2 className="text-[38px] font-extrabold tracking-tight sm:text-[54px]">Questions</h2>
            <p className="mt-4 text-[18px] text-fg-dim">Straight answers before you start.</p>
          </Reveal>
          <Reveal delay={150}>
            <Faq items={FAQ} />
          </Reveal>
        </div>
      </section>

      {/* Offer */}
      <section id="pricing" className="relative scroll-mt-20 overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
        <div className="animate-glow pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(43,123,246,0.28),transparent)]" />
        <Reveal from="scale" className="relative mx-auto max-w-xl">
          <div className="border border-accent/50 bg-bg-alt p-9 shadow-[0_40px_120px_-40px_rgba(43,123,246,0.7)] sm:p-12">
            <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.3em] text-accent">The full system</p>
            <div className="mb-8 text-[64px] font-extrabold leading-none tracking-tight">
              €37<span className="text-[22px] font-medium text-fg-faint"> / month</span>
            </div>
            <ul className="mb-10 flex flex-col gap-4">
              {[
                "All five modules: Position, Target, Access, Leverage, Execute",
                "Templates: CV, job tracker, High Value Product, outreach scripts",
                "Bonus: CV and Cover Letter Bot agents",
                "Cancel anytime",
              ].map((x) => (
                <li key={x} className="flex gap-4 text-[17px] text-fg">
                  <Check />
                  {x}
                </li>
              ))}
            </ul>
            <BuyButton label="Get the system" className="w-full justify-between" />
            <p className="mt-5 text-center text-[14px] text-fg-faint">
              Secure checkout with Stripe. Your account is created right after you pay.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-line px-5 py-28 text-center sm:px-8">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(50%_100%_at_50%_100%,rgba(43,123,246,0.3),transparent)]" />
        <Reveal className="relative mx-auto max-w-3xl">
          <h2 className="mb-6 text-[38px] font-extrabold leading-[1.05] tracking-tight sm:text-[58px]">
            Time to build the pipeline <span className="text-accent">nobody built for you.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-[19px] leading-relaxed text-fg-dim">
            You already know how to sell — you&apos;ve spent your career doing it for someone else. SalesLift
            is the plan to point it at your own search.
          </p>
          <BuyButton label="Get the system" />
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-line px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Logo />
          <p className="text-[14px] text-fg-faint">© SalesLift</p>
        </div>
      </footer>
    </main>
  );
}
