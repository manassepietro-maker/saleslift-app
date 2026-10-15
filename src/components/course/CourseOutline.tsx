"use client";

import Link from "next/link";
import { useState } from "react";
import { SECTIONS, TOTAL_LESSONS } from "@/lib/content/course";
import { LessonThumb } from "./LessonThumb";
import { ChevronIcon, DoneDot, EmptyDot, LockIcon } from "./Icons";

// The "Content" block on the dashboard: collapsible section cards with lesson rows.
export function CourseOutline({ completed, hasAccess }: { completed: string[]; hasAccess: boolean }) {
  const done = new Set(completed);
  const [open, setOpen] = useState<boolean[]>(() => SECTIONS.map(() => true));
  const allOpen = open.every(Boolean);

  return (
    <section>
      <h2 className="mb-4 font-inter text-[34px] font-bold tracking-tight text-c-text">Content</h2>
      <div className="mb-8 flex items-center justify-between">
        <p className="text-[19px] text-c-dim">
          {SECTIONS.length} sections <span className="mx-1 opacity-60">·</span> {TOTAL_LESSONS} lessons
        </p>
        <button
          onClick={() => setOpen(SECTIONS.map(() => !allOpen))}
          className="text-[19px] sm:mr-8 font-medium text-c-text hover:opacity-80"
        >
          {allOpen ? "Collapse" : "Expand"}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {SECTIONS.map((section, si) => (
          <div key={section.title} className="rounded-2xl border border-c-line bg-c-card px-4 sm:px-8">
            <button
              onClick={() => setOpen((o) => o.map((v, i) => (i === si ? !v : v)))}
              className="flex w-full items-center justify-between gap-4 py-7 text-left"
            >
              <span className="text-[19px] font-semibold text-c-text sm:text-[21px]">{section.title}</span>
              <span className="flex flex-shrink-0 items-center gap-6 text-[19px] text-c-dim sm:text-[21px]">
                <span className="text-c-body">
                  {section.lessons.length} {section.lessons.length === 1 ? "lesson" : "lessons"}
                </span>
                <ChevronIcon className={`text-c-text transition-transform ${open[si] ? "" : "rotate-180"}`} />
              </span>
            </button>

            {open[si] && (
              <div className="border-t border-c-line">
                {section.lessons.map((lesson) => {
                  const locked = !lesson.free && !hasAccess;
                  const row = (
                    <div
                      className={`flex items-center gap-4 py-6 sm:gap-8 sm:px-8 ${
                        locked ? "opacity-60" : "hover:bg-c-hover/40"
                      }`}
                    >
                      {done.has(lesson.slug) ? <DoneDot /> : <EmptyDot />}
                      <div className="hidden sm:block">
                        <LessonThumb lesson={lesson} />
                      </div>
                      <span className="min-w-0 flex-1 text-[18px] text-c-text sm:text-[21px]">{lesson.title}</span>
                      <span className="flex flex-shrink-0 items-center gap-2 text-[18px] tabular-nums text-c-body sm:text-[20px]">
                        {locked && <LockIcon size={16} />}
                        {lesson.minutes} min
                      </span>
                    </div>
                  );
                  return (
                    <Link
                      key={lesson.slug}
                      href={locked ? "/pricing" : lesson.href}
                      className="block border-b border-c-line last:border-b-0"
                    >
                      {row}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
