// Course outline used by the dashboard and the lesson player sidebar.
// Lesson slugs match the `lesson_slug` stored in lesson_progress, so progress
// tracking keeps working exactly as before.

import { MODULES, WELCOME, INTRO } from "./modules";

export type Lesson = {
  slug: string;
  href: string;
  title: string;
  minutes: number;
  free: boolean; // readable without a purchase
  label: string; // short text shown on the thumbnail
  hue: number; // thumbnail tint
};

export type Section = { title: string; lessons: Lesson[] };

export const SECTIONS: Section[] = [
  {
    title: "Start Here",
    lessons: [
      { slug: "welcome", href: "/welcome", title: "Welcome", minutes: WELCOME.estimatedMinutes, free: true, label: "Welcome", hue: 0 },
      { slug: "intro", href: "/intro", title: "Why This Course Exists", minutes: INTRO.estimatedMinutes, free: true, label: "Intro", hue: 0 },
    ],
  },
  {
    title: "The 5-Stage System",
    lessons: MODULES.map((m, i) => ({
      slug: m.slug,
      href: `/modules/${m.slug}`,
      title: `${m.number}. ${m.title}`,
      minutes: m.estimatedMinutes,
      free: false,
      label: m.title,
      hue: [215, 260, 170, 30, 340][i % 5],
    })),
  },
];

export const ALL_LESSONS: Lesson[] = SECTIONS.flatMap((s) => s.lessons);
export const TOTAL_LESSONS = ALL_LESSONS.length;

// Progress is shown as the 5 stages (Start Here doesn't count), e.g. "2/5 · 40%".
export const STAGE_LESSONS: Lesson[] = SECTIONS[1].lessons;

export function stageProgress(completed: Set<string> | string[]) {
  const done = completed instanceof Set ? completed : new Set(completed);
  const count = STAGE_LESSONS.filter((l) => done.has(l.slug)).length;
  const total = STAGE_LESSONS.length;
  return { count, total, pct: Math.round((count / total) * 100) };
}

export function getLesson(slug: string) {
  return ALL_LESSONS.find((l) => l.slug === slug);
}
