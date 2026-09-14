import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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

const PROOF = [
  { big: "1% → 50%", small: "Application-to-interview conversion" },
  { big: "3x", small: "Salary conversations" },
  { big: "Dream roles", small: "Interviews for roles I never would have imagined" },
];

const MODULES = [
  { n: "01", name: "Positioning", detail: "Optimize your LinkedIn profile. Structure your CV to highlight real impact. Present your experience in a way that matches your target roles." },
  { n: "02", name: "Targeting", detail: "Find high-quality roles across the right platforms. Run a simple tracker — your own mini-CRM for the search. Evaluate companies properly before you spend time on them." },
  { n: "03", name: "Access", detail: "Identify hiring managers and key stakeholders. Find contact details using LinkedIn and the right tools. Learn who's worth reaching out to and who isn't." },
  { n: "04", name: "Leverage", detail: "Build a High Value Product — a mini business case made for the specific role, so you walk in already holding a proposal. Make your application about their business, not a recap of your resume.", highlight: "Where most win or lose" },
  { n: "05", name: "Execution", detail: "Write outreach that actually gets replies. Follow up without being ignored — treat silence like an objection, not a no. Run a simple weekly system so you stay consistent." },
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

export default async function LandingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="font-display text-lg font-bold text-fg">SalesLift</span>
          <nav className="flex items-center gap-6 text-sm text-fg-dim">
            <Link href="/login" className="hover:text-fg">Log in</Link>
            <Link
              href="/signup"
              className="rounded-lg bg-accent px-4 py-2 font-semibold text-accent-fg hover:opacity-90"
            >
              Get the system
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <span className="mb-4 inline-block rounded-full border border-line-strong px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          SalesLift
        </span>
        <h1 className="mb-5 font-display text-4xl font-bold leading-tight text-fg sm:text-5xl">
          The job search system that <em className="not-italic text-accent">actually</em> gets salespeople interviews.
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-fg-dim">
          Forget generic resume advice from people who&apos;ve never carried a number. This is the exact system
          that took my callback rate from 1% to 50%. Built by a salesperson, for salespeople who already know
          they&apos;re good enough.
        </p>
        <Link
          href="/signup"
          className="inline-block rounded-lg bg-accent px-6 py-3 font-bold text-accent-fg hover:opacity-90"
        >
          Get your dream job
        </Link>
      </section>

      {/* Pain */}
      <section className="border-t border-line bg-bg-alt px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-fg">Sound familiar?</h2>
          <ul className="mb-8 flex flex-col gap-3">
            {PAIN_POINTS.map((p) => (
              <li key={p} className="rounded-lg border border-line bg-bg-alt2 px-5 py-4 text-fg-dim">
                {p}
              </li>
            ))}
          </ul>
          <p className="text-center text-fg-dim">
            Somewhere in there, a quieter question creeps in: maybe the market&apos;s right about you.
          </p>
          <p className="mt-2 text-center font-semibold text-fg">
            That doubt is what a broken hiring process does to good salespeople, not a verdict on your ability.
          </p>
        </div>
      </section>

      {/* Goal / credibility */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-accent">
            The Goal
          </span>
          <h2 className="mb-6 font-display text-3xl font-bold text-fg">
            50% callback rate after you apply
          </h2>
          <p className="mb-4 text-fg-dim">
            I&apos;ve been exactly where you are. AE experience at Gartner, a track record of hitting target
            and a year where I sent hundreds of applications and got two interviews. Two.
          </p>
          <p className="text-fg-dim">
            That&apos;s when I stopped treating my search like a form to fill out and started treating it
            like a pipeline. SalesLift is the methodology, built on months of work so you don&apos;t have to
            find it the hard way.
          </p>
        </div>
      </section>

      {/* Mechanism */}
      <section className="border-t border-line bg-bg-alt px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-fg">
            Your job search is a sales process. Most people just aren&apos;t running it like one.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-bg-alt2 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fg-faint">
                The old way
              </h3>
              <ul className="flex flex-col gap-3 text-fg-dim">
                {OLD_WAY.map((x) => (
                  <li key={x}>— {x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-line-strong bg-bg-alt2 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
                What actually works
              </h3>
              <ul className="flex flex-col gap-3 text-fg">
                {NEW_WAY.map((x) => (
                  <li key={x}>— {x}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-center text-fg-dim">
            You already have the instincts to fix this. You just need a proven framework that gets you
            through the door.
          </p>
        </div>
      </section>

      {/* Plan */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-wider text-accent">
            Your Plan
          </span>
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-fg">
            Five stages. One pipeline.
          </h2>
          <div className="flex flex-col gap-4">
            {STAGES.map((s) => (
              <div key={s.n} className="flex gap-4 rounded-xl border border-line bg-bg-alt p-5">
                <span className="font-display text-2xl font-bold text-accent">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-fg">{s.name}</h3>
                  <p className="text-sm text-fg-dim">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-fg-faint">
            Each stage builds on the last. Skip one and the rest gets harder — same as any pipeline.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="border-t border-line bg-bg-alt px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-wider text-accent">
            Six Weeks From Now
          </span>
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-fg">
            Picture the inbox that&apos;s waiting.
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {VISION.map((v) => (
              <li key={v} className="rounded-lg border border-line bg-bg-alt2 px-5 py-4 text-fg-dim">
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-fg">
            What&apos;s possible when you run the full system
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {PROOF.map((p) => (
              <div key={p.small} className="rounded-xl border border-line-strong bg-bg-alt p-6 text-center">
                <div className="mb-2 font-display text-3xl font-bold text-accent">{p.big}</div>
                <div className="text-sm text-fg-dim">{p.small}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-fg-faint">
            Results depend on how fully you run the system — this is what became possible, not a guarantee
            of what will happen automatically.
          </p>
        </div>
      </section>

      {/* What's inside */}
      <section className="border-t border-line bg-bg-alt px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-fg">What you actually get</h2>
          <div className="flex flex-col gap-4">
            {MODULES.map((m) => (
              <div key={m.n} className="rounded-xl border border-line bg-bg-alt2 p-6">
                <div className="mb-1 flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-accent">{m.n}</span>
                  <h3 className="font-semibold text-fg">{m.name}</h3>
                  {m.highlight && (
                    <span className="rounded-full border border-line-strong px-2 py-0.5 text-xs text-fg-faint">
                      {m.highlight}
                    </span>
                  )}
                </div>
                <p className="text-sm text-fg-dim">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-line-strong bg-bg-alt p-6">
            <h3 className="mb-4 font-semibold text-fg">This is for you if:</h3>
            <ul className="flex flex-col gap-3 text-sm text-fg-dim">
              {FOR.map((f) => (
                <li key={f}>— {f}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-bg-alt p-6">
            <h3 className="mb-4 font-semibold text-fg">This isn&apos;t for you if:</h3>
            <ul className="flex flex-col gap-3 text-sm text-fg-faint">
              {NOT_FOR.map((f) => (
                <li key={f}>— {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-bg-alt px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-fg">Questions</h2>
          <div className="flex flex-col gap-6">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="mb-1 font-semibold text-fg">{f.q}</h3>
                <p className="text-sm text-fg-dim">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-line-strong bg-bg-alt p-10 text-center">
          <div className="mb-6 font-display text-5xl font-bold text-fg">
            €37<span className="text-xl font-medium text-fg-faint"> / month</span>
          </div>
          <ul className="mb-8 flex flex-col gap-2 text-left text-fg-dim">
            <li>— Full course access, cancel anytime</li>
            <li>— Bonus: CV and Cover Letter Bot agents</li>
          </ul>
          <Link
            href="/signup"
            className="inline-block w-full rounded-lg bg-accent px-6 py-3 font-bold text-accent-fg hover:opacity-90"
          >
            Get The System
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-line bg-bg-alt px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-5 font-display text-3xl font-bold text-fg">
            Time to build the pipeline nobody built for you.
          </h2>
          <p className="mb-3 text-fg-dim">
            You already know how to sell — you&apos;ve spent your career doing it for someone else. SalesLift
            is the plan to point it at your own search.
          </p>
          <p className="mb-8 text-fg-dim">
            Six weeks from now you could still be refreshing your inbox waiting on the same three companies,
            or already deciding between two offers.
          </p>
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-accent px-6 py-3 font-bold text-accent-fg hover:opacity-90"
          >
            Get The System
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-center text-sm text-fg-faint">
        SalesLift · © SalesLift
      </footer>
    </main>
  );
}
