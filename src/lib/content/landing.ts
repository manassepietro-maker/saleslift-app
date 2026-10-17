// Copy for the public marketing pages (home, /curriculum, /story, /faq).
// Kept in one place so the pages stay consistent with each other.

export const PRICE_LABEL = "€42";

// One color per stage, blue → amber → green (used by the stage path and /curriculum).
export const STAGE_COLORS = ["#2b7bf6", "#4f9bff", "#f5b524", "#9ccf4a", "#22b07d"];

// Roles shown in the hero so visitors can spot their own title.
export const ROLES = [
  "SDR",
  "BDR",
  "SMB AE",
  "Mid-Market AE",
  "Enterprise AE",
  "Strategic Accounts",
  "Account Manager",
  "Customer Success",
];

// Home page (version A) pain list.
export const PAIN_POINTS = [
  "You've sent fifty applications and heard back from one.",
  "You're hitting your numbers at work, but your CV gets ignored.",
  "You get rejected in minutes, by software, before a human ever reads your name.",
  "Every job-search tip you find is generic, written for people who've never had to sell anything.",
];

// /v2 (version B): the 3 biggest problems, each pointing to the stage(s) that fix it.
export const PROBLEMS = [
  { text: "Your CV gets ignored, even when you're hitting your numbers.", fixedBy: ["01 Position"] },
  { text: "You apply everywhere and hear back from almost no one.", fixedBy: ["02 Target", "05 Execute"] },
  { text: "Software rejects you before a human ever reads your name.", fixedBy: ["03 Access", "04 Leverage"] },
];

// "Who it's for": situations people can recognize themselves in.
export const ARCHETYPES = [
  { title: "Breaking into sales", text: "You're coming from another field and want your first SDR or BDR role." },
  { title: "Ready to move up", text: "You're an SDR or BDR who's ready to start closing as an AE." },
  { title: "AE aiming higher", text: "You're closing deals and want a better company, territory or paycheck." },
  { title: "Back on the market", text: "You were laid off or your startup ended, and you need interviews fast." },
];

// The five stages, in plain language: what the stage gets you to do, and
// what you walk away with. The "how" is what the course teaches.
export const STAGES = [
  {
    n: "01",
    name: "Position",
    headline: "Brand yourself for the job you want",
    detail: "Recruiters skim a CV in seconds. Learn what they need to see, and how to make them see it.",
    outcome: "An impact-first CV and LinkedIn",
  },
  {
    n: "02",
    name: "Target",
    headline: "Go after the right jobs",
    detail: "Most applications go to roles you were never going to get. Spot the ones worth your time.",
    outcome: "Your target list",
  },
  {
    n: "03",
    name: "Access",
    headline: "Find the people who actually hire",
    detail: "The person who decides is rarely the one reading applications. Find them and get in front of them.",
    outcome: "Direct contacts",
  },
  {
    n: "04",
    name: "Leverage",
    headline: "Give them a reason to pick you",
    detail: "Show up with something no other candidate brings, so you're not compared to anyone.",
    outcome: "Your High Value Product",
  },
  {
    n: "05",
    name: "Execute",
    headline: "Reach them through the right channels",
    detail: "Messages and follow-ups that get replies, on a weekly routine that fits around your job.",
    outcome: "Interviews on your calendar",
  },
];

// What each module hands you, as short deliverables (used on /curriculum).
export const MODULE_DELIVERABLES: Record<string, string[]> = {
  position: ["LinkedIn rewrite", "Impact-first CV", "Your story for the role"],
  target: ["Target company list", "Job tracker", "Company qualifier"],
  access: ["Hiring manager map", "Contact-finding toolkit", "Who to skip"],
  leverage: ["High Value Product", "Role-specific business case"],
  execute: ["Outreach scripts", "Follow-up cadence", "Weekly routine"],
};

export const INCLUDED = [
  "5 modules, about an hour of lessons",
  "4 ready-to-use templates",
  "Instant access right after you pay",
  "Lifetime access, including future updates",
];

// The full offer breakdown: every template and what it does for you.
export const TEMPLATES = [
  { name: "CV template", text: "An impact-first structure recruiters can scan in seconds." },
  { name: "Job tracker", text: "Every company, contact and follow-up in one simple spreadsheet." },
  { name: "High Value Product template", text: "A one-page business case you adapt for each role." },
  { name: "Outreach scripts", text: "First messages and follow-ups that get replies." },
];

// The inbox that's waiting: newest email first, like a real inbox.
export const INBOX = [
  {
    from: "Hiring Manager",
    subject: "Offer: let's talk numbers",
    preview: "We'd love to have you on the team. Before we send the paperwork, what base would make this an easy yes for you?",
    time: "16:30",
    color: "#22b07d",
  },
  {
    from: "Talent Partner",
    subject: "Final round: does Thursday work?",
    preview: "The panel was impressed with your territory plan. Are you free Thursday at 10:00 to meet the CRO?",
    time: "14:05",
    color: "#f5b524",
  },
  {
    from: "VP Sales",
    subject: "Re: Your business case for the mid-market team",
    preview: "Really sharp breakdown of where our next deals could come from. Can we grab 30 minutes this week?",
    time: "11:40",
    color: "#4f9bff",
  },
  {
    from: "Head of Sales",
    subject: "Quick chat about our AE opening?",
    preview: "Thanks for reaching out directly. We're hiring two AEs and your background stood out. Free for a call tomorrow?",
    time: "9:12",
    color: "#2b7bf6",
  },
];

export const FOR = [
  "You're in sales (or sales-adjacent) and know you can perform but the market just isn't giving you the shot",
  "You're applying and getting ignored, or getting first-round interviews that go nowhere",
  "You're willing to treat your search as a real project, not a background task",
];

export const NOT_FOR = [
  'You\'re looking for a "resume template" and nothing more',
  "You want a passive course you'll watch once and not apply",
  "You're not currently able to spend a few focused hours a week on your search",
];

// The first four are the buying questions, shown on the home page.
export const FAQ = [
  { q: "How do I access the course?", a: "Right after you pay, your account is created and you're logged straight in. After that, log in from any device with your email." },
  { q: "What do I need to get started?", a: "Nothing. You don't even need a CV or a LinkedIn profile yet. The course helps you build both." },
  { q: "Why does it cost €42?", a: "It's one payment for a focused course you can finish in an afternoon, not a months-long bootcamp. You keep access forever, including every update." },
  { q: "Is this a subscription?", a: "No. You pay €42 once and keep access forever, including future updates." },
  { q: "How long until I see results?", a: "Most people start getting responses within the first two weeks of running Access and Execute consistently." },
  { q: "Will this work outside SaaS/tech sales?", a: "This methodology is built for SaaS sales but the framework can be scaled to any industry." },
  { q: "What if I'm employed and searching quietly?", a: "The system works discreetly: targeting, access, and outreach are built to be low-visibility if you need them to be." },
  { q: "How long does the course take?", a: "About an hour of lessons in total, split into five short modules. The real work is applying it, and the templates make that faster." },
  { q: "I've tried job search courses before and they didn't work.", a: "Most job search content is written for generalists. It doesn't use what you already know how to do. SalesLift is built specifically around sales instincts you already have." },
  { q: "What happens if I want continued support once I book the interview?", a: "You have the option to book live 1:1 sessions for coaching if you want to master the interview process." },
];

// Version A shows these three on the home page; /v2 shows the first four of FAQ.
export const FAQ_HOME_A = FAQ.filter((f) =>
  ["How long until I see results?", "Will this work outside SaaS/tech sales?", "What if I'm employed and searching quietly?"].includes(f.q)
);
