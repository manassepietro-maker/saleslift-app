// The actual course content lives here as plain data, not because it has to
// (you could just as easily write .mdx files per module), but because it
// keeps the progress bar, time estimates, and download lists driven by one
// source of truth instead of scattered across files.
//
// `body` is an array of simple content blocks so the page can render
// free-flowing text with embedded images/links/summaries without needing a
// full CMS. Swap in real screenshots by dropping files into
// /public/images/<slug>/ and pointing an "image" block at them.

// Text in "p", "list", "ol" and "callout" blocks can contain links written
// as [label](https://example.com).
export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "example"; label: string; text: string }
  | { type: "link"; href: string; label: string };

// A downloadable or copyable resource shown as a button at the end of a
// lesson. Leave `href` empty until the real link exists: the button then
// shows "Coming soon" instead of a broken link.
export type Resource = { label: string; href: string };

export type Module = {
  slug: string;
  number: number;
  title: string;
  oneLiner: string;
  estimatedMinutes: number;
  // Marketing summary used on /curriculum (not shown inside the lesson).
  summary: string;
  // Lesson video (YouTube unlisted / Loom / Mux / Vimeo embed URL). Empty shows a placeholder.
  videoUrl: string;
  body: ContentBlock[];
  resources: Resource[];
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
        "Each lesson has a video and a written part. The video shows you a practical example, while the text holds the step-by-step plan and content.",
        "Focus on one module at a time, in order. Each builds on the last.",
        "Apply what you learn immediately. Don't stockpile knowledge, use it on your next application.",
        "Keep your process simple. The tracker template is there to reduce your mental load, not add to it.",
        "Track what works and adjust.",
      ],
    },
    {
      type: "h3",
      text: "The key mindset: relevancy",
    },
    {
      type: "p",
      text: "The key to this course is adopting a mindset of relevancy. We have to be relevant to the jobs we want and are applying to. While some guiding principles always stay true, what's even more important is recognizing the key dimensions of the organization and role you're applying to, so you can match them.",
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
    estimatedMinutes: 20,
    summary: 
      "Optimize your LinkedIn profile, restructure your CV around real impact, and frame your experience to match the roles you actually want, so the first ten seconds someone spends on your application work in your favor.",
    videoUrl: "",
    body: [
      { type: "p", text: "Before you send a single application, the way you're positioned decides most of what happens next." },
      {
        type: "p",
        text: "Positioning means controlling the first ten-second impression that you give a hiring manager or recruiter (or an ATS screening system). This is where the majority of candidates get filtered out. Important points to focus on:",
      },
      {
        type: "list",
        items: [
          "Optimize your LinkedIn profile",
          "Restructure your CV around real impact, and frame your experience to match the roles you actually want",
          "LinkedIn content (if you post)",
        ],
      },
      { type: "h3", text: "Your LinkedIn profile" },
      { type: "p", text: "Consider all the sections that make up your LinkedIn profile:" },
      {
        type: "list",
        items: [
          "Profile photo & background",
          "Headline",
          "About you section",
          "Experience",
          "Posts (bonus): see the influencers I recommend",
        ],
      },
      { type: "h3", text: "Your CV" },
      {
        type: "list",
        items: [
          "Lead every bullet with the result, not the responsibility.",
          "Quantify: quota %, deal size, sales cycle length, retention/expansion, whatever you actually have.",
          "Cut anything that doesn't support the specific role you're applying to. A CV is not an autobiography.",
          "Try to keep it to one page. Only go over if there's too much relevant information you should include.",
          "Match the keywords of the application in every section (i.e. also in the tech skills).",
        ],
      },
    ],
    resources: [
      { label: "Influencers I recommend", href: "" },
      { label: "Download skill", href: "" },
      { label: "Make a copy of the CV template (Google Docs)", href: "" },
    ],
  },
  {
    slug: "target",
    number: 2,
    title: "Target",
    oneLiner: "Stop wasting time on the wrong opportunities.",
    estimatedMinutes: 20,
    summary: 
      "Find high-quality roles across the right platforms, run a simple tracker so nothing falls through, and qualify companies the way you'd qualify a lead before you spend real time on them.",
    videoUrl: "",
    body: [
      {
        type: "p",
        text: "Now we've sorted out the first impression, we need to find the right roles. My recommendation (this falls outside the topic of this course) is that you figure out as early as possible what jobs you really want (not just because the title sounds nice or a friend is doing that job) and also the ones that align closest to your skills. This will make you more successful and save you a lot of mistakes down the line. If you don't have it figured out, that's also fine, as a lot of people don't early on.",
      },
      { type: "p", text: "Assuming you've got this covered, we want to find roles that meet all, or at least several, of these criteria:" },
      {
        type: "list",
        items: [
          "Real jobs (not fake postings on LinkedIn posted for legal reasons)",
          "Recently posted jobs",
          "Companies relevant to your experience (you have a higher chance of being accepted)",
        ],
      },
      {
        type: "p",
        text: "Applying broadly feels productive, but every hour spent on a role you're not actually qualified to win, or a company that isn't actually hiring in good faith, is an hour not spent on one you could win.",
      },
      { type: "h3", text: "Qualify before you apply" },
      { type: "p", text: "These are the questions we want to try and answer:" },
      {
        type: "list",
        items: [
          "Is the company actually growing, or is this a backfill for the role?",
          "Does the comp/level match what you're worth, or are you about to negotiate from behind?",
          "Do you have any real access into this company (a contact, a warm intro), or are you applying cold into a queue of hundreds?",
          "Do you like the culture of this company?",
          "How experienced is your future manager?",
          "How good is their product market fit?",
          "What do past and current employees say about the company?",
        ],
      },
      { type: "p", text: "Understanding this well will a) make your application more successful and b) get you the job you actually want." },
      { type: "h3", text: "Where and how to get these answers" },
      {
        type: "ol",
        items: [
          "Speak with people in the company",
          "AI",
          "[RepVue](https://www.repvue.com)",
          "[Glassdoor](https://www.glassdoor.com)",
          "[Reddit](https://www.reddit.com)",
        ],
      },
      { type: "h3", text: "Where to actually look" },
      { type: "p", text: "Each of these channels has pros and cons:" },
      {
        type: "ol",
        items: [
          "Warm connections",
          "Second-degree connections",
          "Career page / in-depth research",
          "[Otta.com](https://otta.com)",
          "LinkedIn",
        ],
      },
      { type: "h3", text: "Track every role" },
      {
        type: "p",
        text: "Log every role you're seriously considering in the tracker below. It's a simple mini-CRM for your search. Same idea as a pipeline: know where every deal actually stands instead of trusting your memory, and it can help us identify patterns later on.",
      },
    ],
    resources: [{ label: "Make a copy of the job tracker (Google Sheets)", href: "" }],
  },
  {
    slug: "access",
    number: 3,
    title: "Access",
    oneLiner: "Reach the people who actually make hiring decisions.",
    estimatedMinutes: 15,
    summary: 
      "Identify hiring managers and key stakeholders, find their contact details, and learn who's actually worth reaching out to, the same way you'd prospect a real buyer instead of hoping a form gets read.",
    videoUrl: "",
    body: [
      {
        type: "p",
        text: "We've now identified the best roles and companies to apply to. We're not taking the traditional \"Easy Apply\" route on LinkedIn, so we need to identify who will actually be interested in receiving our application: hiring managers, recruitment teams and key stakeholders.",
      },
      {
        type: "p",
        text: "The goal is to understand who's worth reaching out to and find a way to get in touch, the same way you'd prospect a real buyer instead of hoping a generic form gets read.",
      },
      { type: "h3", text: "How to spot the right person" },
      { type: "p", text: "There's no silver bullet, it depends on the company. For most, it should take you about 5 minutes." },
      { type: "p", text: "The easiest way:" },
      {
        type: "ol",
        items: [
          "Search the company on LinkedIn.",
          "Filter by keywords tied to your role. For example, for an enterprise EMEA rep position, search \"EMEA\", \"enterprise\" or both together. If the job isn't remote, you can also look for people based in the country the job is in.",
          "Look for people at manager level, heads of sales or VPs.",
          "Quickly check their recent LinkedIn posts: one of them may even have posted about the role.",
        ],
      },
      { type: "h3", text: "If that search doesn't work" },
      {
        type: "list",
        items: [
          "Big organizations: with lots of employees, the search above can be noisy. Look for company org charts online, or press releases about the department, to confirm who's actually building this team right now.",
          "Startups and smaller companies: the most relevant person is sometimes the CEO, CSO or COO.",
          "Ask a current employee: this is actually the best way to know for sure. The tradeoff is that it takes longer to get an answer, so you lose application speed. Always try it, but give it 24 hours and if there's no reply, go with your best guess. It matters most if you've already been rejected several times by the same company, or you're really passionate about the role.",
        ],
      },
      { type: "h3", text: "Recruiters" },
      {
        type: "p",
        text: "Another avenue is recruiters. Again, search for \"EMEA recruiter\", \"enterprise talent acquisition\" or whatever aligns closest to your role. Recruiters often post these signals because they want to attract candidates.",
      },
      {
        type: "p",
        text: "Of course, recruiters aren't as invested as the hiring manager in finding the perfect hire for the team; they care about making quota. They're also further from the problems of the job that we'll reference later to stand out. So ideally: hiring manager first, recruiters second.",
      },
      { type: "h3", text: "Getting their contact details" },
      {
        type: "p",
        text: "Once you know the name, a few contact-finding tools (email finders, phone finders, LinkedIn Sales Navigator) will get you a direct line. They're worth the small cost for a role you're serious about, and most have a free version:",
      },
      {
        type: "list",
        items: ["[Lusha](https://www.lusha.com)", "[Apollo](https://www.apollo.io)", "[Wiza](https://wiza.co)"],
      },
      { type: "h3", text: "Not everyone is worth reaching out to" },
      {
        type: "p",
        text: "Qualify your contact the same way you'd qualify a lead. Someone who joined the company two weeks ago has no real influence yet. Someone three levels removed from the role can't move you forward. Spend your outreach on the person who most likely owns the decision.",
      },
    ],
    resources: [],
  },
  {
    slug: "leverage",
    number: 4,
    title: "Leverage",
    oneLiner: "Stand out before the interview even starts.",
    estimatedMinutes: 45,
    summary: 
      "Build a High Value Product: a short, role-specific business case that shows what you'd actually do in the job, so you walk into the process already holding a proposal instead of a resume.",
    videoUrl: "",
    body: [
      { type: "p", text: "By this stage you have:" },
      {
        type: "ol",
        items: [
          "A strong first impression",
          "The right company and job",
          "The right person, who cares about this job being filled",
        ],
      },
      {
        type: "p",
        text: "What we need now is to give them a clear, undeniable reason to want you on their team. The big advantage: if you've made it this far in the course, you're already in the top 1% of applicants.",
      },
      { type: "callout", text: "This is where you take fate into your own hands and stop relying on an ATS to screen your CV." },
      { type: "h3", text: "The High Value Product (HVP)" },
      {
        type: "p",
        text: "What we're about to build together is called an HVP, or High Value Product: a crisp, straight-to-the-point, extremely high-quality piece of work, relevant to the job you're applying for. It should have one of three effects on the hiring manager:",
      },
      {
        type: "ol",
        items: [
          "Leave them impressed, by the quality of your HVP",
          "Leave them curious, to get to know the person behind the HVP",
          "Make them feel understood, by how well you nailed the problem",
        ],
      },
      { type: "h3", text: "Find the problem to solve" },
      {
        type: "p",
        text: "A successful HVP starts with identifying one of the top priorities or challenges the manager and their team are likely facing right now. Put yourself in their shoes, using your research so far and what the job description emphasizes. For example:",
      },
      {
        type: "list",
        items: [
          "Does the role require someone who's good at outbound?",
          "Is the manager a big fan of MEDDICC?",
          "Is the team struggling with the qualification part of the sales cycle?",
        ],
      },
      {
        type: "p",
        text: "Once you've chosen one, think about a short, role-specific business case that shows what you'd actually do to succeed in that area.",
      },
      { type: "h3", text: "HVP ideas" },
      {
        type: "ol",
        items: [
          "A cold email to a top-tier account you've identified, with a breakdown of why it would work",
          "A 90-day territory plan, as a sales manager, showing how you'd turn around team performance",
          "A QBR deck showing how you'd run customer meetings with an at-risk account",
        ],
      },
      { type: "h3", text: "What's crucial" },
      {
        type: "ol",
        items: [
          "Make it about their business, not a recap of your resume.",
          "Keep it short and relevant to the role.",
          "Reference something specific and real about the company (a product launch, a market they just entered, a competitor move) so your effort is obvious.",
        ],
      },
      { type: "h3", text: "Doing it at scale" },
      {
        type: "p",
        text: "I'd recommend building your first HVPs manually, to really get the hang of it and make sure the quality is top tier.",
      },
      {
        type: "p",
        text: "The HVP is the most time-consuming part of this application strategy, so to let you operate at a bigger scale, I've created some templates and bots that speed up the process.",
      },
    ],
    resources: [
      { label: "Download the bot", href: "" },
      { label: "Download the cold email template", href: "" },
    ],
  },
  {
    slug: "execute",
    number: 5,
    title: "Execute",
    oneLiner: "Turn everything into consistent results.",
    estimatedMinutes: 30,
    summary: 
      "Write outreach that actually gets replies, pick the right channels, follow up without being ignored, and run a simple weekly system so none of this depends on motivation.",
    videoUrl: "",
    body: [
      {
        type: "p",
        text: "You've found the right people and produced high-value content. Now you just need to pick the right channel and write a short, sweet message that grabs their attention.",
      },
      { type: "h3", text: "Pick the right channel" },
      {
        type: "p",
        text: "Think of channels on two axes: how much impact your message has (how unique it is, how much value it brings) and how noisy the medium is (how many messages like it a recruitment manager or CSO already receives). If you want to go deeper, check out this video from Steven Bartlett: [Quit your 9 to 5 job with this 90 day side hustle plan!](https://www.youtube.com/watch?v=ppp3EevzPu4)",
      },
      { type: "p", text: "High-noise channels:" },
      {
        type: "list",
        items: [
          "LinkedIn",
          "Email: works best for me because of the effort-to-timing tradeoff. The key is to write it well (apply the logic of the cold email from Leverage).",
        ],
      },
      { type: "p", text: "Less noise, more unique:" },
      {
        type: "list",
        items: [
          "A phone call is already better.",
          "Even better: a physical letter, events, or a gift (thoughtful, not sucking up).",
        ],
      },
      {
        type: "callout",
        text: "Don't be weird: no private addresses, no digging into someone's private life. Maximize for uniqueness and relevance.",
      },
      { type: "h3", text: "How to write the message" },
      { type: "p", text: "The keys:" },
      {
        type: "list",
        items: [
          "Catch their attention within 7 seconds. The noisier the channel, the more critical this is; the more unique the channel, the more attention the gesture itself earns you.",
          "Be hyper-relevant: mention the position, location, company, a case study, team-specific info. You want them to file it as important as fast as possible, so the more specific the better.",
          "Stand out: avoid boilerplate language, pre-made sentences or empty ones.",
          "Deliver value as a quick win: a 1-page PDF (e.g. the cold email), a 3-minute Loom video, a photo, etc.",
          "Use a soft call to action: don't sound desperate or cocky, but invite a next step.",
          "Experiment, vary, dare.",
          "Collect data: track how often it works and how often it doesn't.",
        ],
      },
      {
        type: "example",
        label: "Example outreach",
        text: "Subject: Enterprise AE role\n\nHi Tim,\n\nI came across the AE role in the Netherlands and spent some time digging into BeyondTrust's customer work, particularly the Investec case study.\n\nRather than over-explain my background, I thought it might be more useful to share a cold email I'd write if I were selling BeyondTrust.\n\nI picked Investec deliberately. Based on the case studies, it felt like a realistic next logo given their scale, growth trajectory, and the environment they operate in.\n\nIf this is helpful context, happy to discuss further.\n\nBest,\nPietro",
      },
      { type: "h3", text: "Referrals" },
      {
        type: "p",
        text: "Referrals are the key to success if your HVP doesn't land. They're also still useful for gathering information on the company, to build your HVP in the first place or to prepare for interviews.",
      },
      {
        type: "list",
        items: [
          "Add 5 to 10 people on LinkedIn who are in the team or in the same role.",
          "Look for those who are most active on LinkedIn and have been there at least 6 months.",
          "The same nationality, school or background helps.",
          "LinkedIn is the best channel. Keep it short and try multiple people; if they're in the same team, don't message them on the same day.",
        ],
      },
      {
        type: "example",
        label: "Example message",
        text: "Hi Maikel, I just found the open Strategic AE position at Ping Identity and came across your profile. I see you've been working as an Enterprise AE for 9 months.\n\nI have some questions about the role. Would you be available for a short call?",
      },
    ],
    resources: [],
  },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}

