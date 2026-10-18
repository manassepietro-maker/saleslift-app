// The actual course content lives here as plain data, not because it has to
// (you could just as easily write .mdx files per module), but because it
// keeps the progress bar, time estimates, and download lists driven by one
// source of truth instead of scattered across files.
//
// `body` is an array of simple content blocks so the page can render
// free-flowing text with embedded images/links/summaries without needing a
// full CMS. Swap in real screenshots by dropping files into
// /public/images/<slug>/ and pointing an "image" block at them.

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "link"; href: string; label: string };

export type Template = {
  label: string;
  // Path under /public/templates/. Replace these placeholder files with
  // your real templates before launch (see /public/templates/README.md).
  file: string;
};

export type Module = {
  slug: string;
  number: number;
  title: string;
  oneLiner: string;
  estimatedMinutes: number;
  summary: string;
  body: ContentBlock[];
  templates: Template[];
};

export const WELCOME = {
  estimatedMinutes: 3,
  body: [
    {
      type: "p",
      text: "You're not here to send more applications. You're here to get more interviews.",
    },
    {
      type: "p",
      text: "This is your navigation hub for the course, because the fastest way to get results is to follow a clear system instead of guessing. Most candidates apply, wait, and get ignored. This course shows you how to run your job search the way you already know how to run a deal: with a pipeline, qualification, and a deliberate case for yourself, not a spray of applications and hope.",
    },
    {
      type: "h3",
      text: "How to use this course",
    },
    {
      type: "list",
      items: [
        "Focus on one module at a time, in order. Each builds on the last.",
        "Apply what you learn immediately. Don't stockpile knowledge, use it on your next application.",
        "Keep your process simple. The tracker template is there to reduce your mental load, not add to it.",
        "Track what works and adjust.",
      ],
    },
    {
      type: "callout",
      text: "Consistency beats intensity.",
    },
  ] satisfies ContentBlock[],
};

export const INTRO = {
  estimatedMinutes: 6,
  videoUrl: "", // drop a hosted video URL (Mux/YouTube unlisted/Loom) here
  body: [
    { type: "h3", text: "The problem" },
    {
      type: "p",
      text: "The job market has never been harder to navigate. Mass layoffs, AI screening tools that filter you out before a human ever sees your name, and if you're applying for remote roles, you're competing against thousands of people for one role.",
    },
    { type: "h3", text: "My story" },
    {
      type: "p",
      text: "Getting an interview has become genuinely hard, even for good sellers. I know because I lived it. After nearly two years building my own startup, I had to call it quits. Despite having AE experience at Gartner, overachieving my targets, and genuinely believing in my abilities, I sent out hundreds of CVs and got two interviews. Two.",
    },
    { type: "h3", text: "What I realized" },
    {
      type: "p",
      text: "That's when I realized: the system is broken, not me. Recruiters and companies are lazy. They filter you out with ATS tools before a human ever reads your name. Hiring managers bring their own contacts in through the back door. Timing matters: apply on day one and you're competing against thousands of applicants; apply after two weeks and you're one of five.",
    },
    {
      type: "p",
      text: "Most people lose before they start. They apply, they wait, they get ghosted, they repeat, because they're treating a hiring process like a form to fill out, instead of what it actually is: a sale where you're the product.",
    },
    { type: "h3", text: "The solution" },
    {
      type: "p",
      text: "So I studied how the system actually filters people, and built a way to work with it instead of hoping to beat it, the same way you'd build a pipeline instead of hoping a cold list converts itself. That's this course.",
    },
    { type: "h3", text: "The results" },
    {
      type: "callout",
      text: "Running the full system: my application-to-interview conversion rate went from 1% to 50%, my salary conversations increased 3x, and I got interviewed for roles I only felt qualified for, not ones I expected to actually land. Your results will depend on how fully you run the system.",
    },
  ] satisfies ContentBlock[],
};

export const MODULES: Module[] = [
  {
    slug: "position",
    number: 1,
    title: "Position",
    oneLiner: "Make a strong impression before you even apply.",
    estimatedMinutes: 11,
    summary:
      "Optimize your LinkedIn profile, restructure your CV around real impact, and frame your experience to match the roles you actually want, so the first ten seconds someone spends on your application work in your favor.",
    body: [
      {
        type: "p",
        text: "Before you send a single application, the way you're positioned decides most of what happens next. This is the equivalent of the opening of a case you'd make for a deal, before anyone's agreed to listen. Get it wrong and everything downstream gets harder.",
      },
      { type: "h3", text: "Your LinkedIn profile" },
      {
        type: "p",
        text: "Most salespeople's LinkedIn reads like a job description, not a track record. Rewrite your headline and About section around outcomes: quota attainment, deal sizes, what you actually moved. Recruiters and hiring managers skim. Give them numbers to skim.",
      },
      {
        type: "image",
        src: "/images/position/linkedin-before-after.png",
        alt: "Before and after example of a LinkedIn headline rewrite",
        caption: "Replace this placeholder with a real before/after screenshot.",
      },
      { type: "h3", text: "Your CV" },
      {
        type: "list",
        items: [
          "Lead every bullet with the result, not the responsibility.",
          "Quantify: quota %, deal size, sales cycle length, retention/expansion, whatever you actually have.",
          "Cut anything that doesn't support the specific role you're applying to. A CV is not an autobiography.",
        ],
      },
      {
        type: "p",
        text: "Use the CV template below as a starting structure, not a straitjacket. The goal is impact-first, not a format to copy blindly.",
      },
    ],
    templates: [
      { label: "CV template", file: "cv-template.md" },
    ],
  },
  {
    slug: "target",
    number: 2,
    title: "Target",
    oneLiner: "Stop wasting time on the wrong opportunities.",
    estimatedMinutes: 10,
    summary:
      "Find high-quality roles across the right platforms, run a simple tracker so nothing falls through, and qualify companies the way you'd qualify a lead before you spend real time on them.",
    body: [
      {
        type: "p",
        text: "Applying broadly feels productive. It isn't. Every hour spent on a role you're not actually qualified to win, or a company that isn't actually hiring in good faith, is an hour not spent on one you could win.",
      },
      { type: "h3", text: "Where to actually look" },
      {
        type: "p",
        text: "Job boards are the last channel, not the first. By the time a role is posted publicly, it's already competing you against the widest possible pool. Prioritize company career pages you're targeting directly, warm and second-degree connections, and niche communities in your specific vertical over generic aggregators.",
      },
      { type: "h3", text: "Qualify before you apply" },
      {
        type: "list",
        items: [
          "Is the company actually growing, or is this a backfill for a role three people just left?",
          "Does the comp/level match what you're worth, or are you about to negotiate from behind?",
          "Do you have any real access into this company (a contact, a warm intro), or are you applying cold into a queue of hundreds?",
        ],
      },
      {
        type: "p",
        text: "Log every role you're seriously considering in the tracker below. It's a simple mini-CRM for your search. Same idea as a pipeline: know where every deal actually stands instead of trusting your memory.",
      },
    ],
    templates: [
      { label: "Job tracker (spreadsheet)", file: "job-tracker.csv" },
    ],
  },
  {
    slug: "access",
    number: 3,
    title: "Access",
    oneLiner: "Reach the people who actually make hiring decisions.",
    estimatedMinutes: 10,
    summary:
      "Identify hiring managers and key stakeholders, find their contact details, and learn who's actually worth reaching out to, the same way you'd prospect a real buyer instead of hoping a form gets read.",
    body: [
      {
        type: "p",
        text: "An application into an ATS is a form. A message to the actual hiring manager is access. This module is about closing that gap.",
      },
      { type: "h3", text: "Finding the right person" },
      {
        type: "list",
        items: [
          "Search LinkedIn for the team you'd be joining. The hiring manager is almost always one or two titles above the role you want, on the same team.",
          "Use company org charts, recent LinkedIn posts about the team growing, or press releases about the department to confirm who's actually building this team right now.",
          "A few contact-finding tools (email finders, LinkedIn Sales Navigator) will get you a direct line once you know the name. Worth the small cost for a role you're serious about.",
        ],
      },
      { type: "h3", text: "Not everyone is worth reaching out to" },
      {
        type: "p",
        text: "Qualify your contact the same way you'd qualify a lead: someone who just joined the company two weeks ago has no real influence yet. Someone three levels removed from the role can't move you forward. Spend your outreach on the person who actually owns the decision.",
      },
    ],
    templates: [],
  },
  {
    slug: "leverage",
    number: 4,
    title: "Leverage",
    oneLiner: "Stand out before the interview even starts.",
    estimatedMinutes: 14,
    summary:
      "Build a High Value Product: a short, role-specific business case that shows what you'd actually do in the job, so you walk into the process already holding a proposal instead of a resume.",
    body: [
      {
        type: "callout",
        text: "This is where most candidates win or lose.",
      },
      {
        type: "p",
        text: "Everyone else applying is submitting the same thing: a CV and a cover letter nobody reads closely. The single highest-leverage thing you can do is show your ability instead of describing it.",
      },
      { type: "h3", text: "The High Value Product (HVP)" },
      {
        type: "p",
        text: "A High Value Product is a short, specific business case built for the exact role and company you're targeting, not a generic writing sample. For a sales role, that might be: a 90-day territory plan, a mock account plan for one of their actual named accounts, or a breakdown of where you'd find their next 10 opportunities and why.",
      },
      {
        type: "list",
        items: [
          "Make it about their business, not a recap of your resume.",
          "Keep it short: 1-2 pages or a compact slide, not a dissertation. This proves judgment, not stamina.",
          "Reference something specific and real about the company (a product launch, a market they just entered, a competitor move) so it's obviously not a template.",
        ],
      },
      {
        type: "p",
        text: "The template below is a starting structure for your first HVP. Adapt the sections to whatever's actually relevant for the role.",
      },
    ],
    templates: [
      { label: "High Value Product template", file: "hvp-template.md" },
    ],
  },
  {
    slug: "execute",
    number: 5,
    title: "Execute",
    oneLiner: "Turn everything into consistent results.",
    estimatedMinutes: 10,
    summary:
      "Write outreach that actually gets replies, pick the right channels, follow up without being ignored, and run a simple weekly system so none of this depends on motivation.",
    body: [
      {
        type: "p",
        text: "Everything so far only pays off if you run it consistently. This module is the cadence: the part that turns a good system into actual interviews on the calendar.",
      },
      { type: "h3", text: "Outreach that gets replies" },
      {
        type: "list",
        items: [
          "Same principles as a cold sequence that actually converts: short, specific to them, and leads with something of value, not \"I'd love to learn more about opportunities.\"",
          "Reference the HVP or something specific from the Access module research in your first message.",
          "One channel almost never works alone. Pair LinkedIn with email where you can.",
        ],
      },
      { type: "h3", text: "Follow-up is not optional" },
      {
        type: "p",
        text: "Treat silence like an objection, not a no. Most replies come after the second or third touch, not the first. Space follow-ups a few days apart and add something new each time: a relevant article, a follow-up thought on the HVP, not just \"just bumping this.\"",
      },
      { type: "h3", text: "The weekly system" },
      {
        type: "p",
        text: "Block a fixed weekly time for the search. Treat it like a pipeline review, not an ad hoc task. Update the tracker, send that week's outreach, follow up on anything gone quiet. Small and consistent beats a burst of effort every few weeks.",
      },
    ],
    templates: [
      { label: "Outreach scripts", file: "outreach-scripts.md" },
    ],
  },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}

