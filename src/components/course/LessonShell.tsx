"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ALL_LESSONS, SECTIONS, stageProgress } from "@/lib/content/course";
import { LessonThumb } from "./LessonThumb";
import { LogoutButton } from "./LogoutButton";
import { CoachingCard } from "./CoachingCard";
import { ArrowLeft, ArrowRight, BookmarkIcon, CheckIcon, LockIcon, SidebarIcon } from "./Icons";

// Lesson player layout: top bar, course sidebar, and the lesson itself.
// Holds the completed-lessons list so marking a lesson complete updates the
// sidebar and progress bar instantly. Writes go straight to Supabase from the
// browser — Row Level Security only lets a student touch their own rows.
export function LessonShell({
  slug,
  userId,
  hasAccess,
  initialCompleted,
  media,
  children,
}: {
  slug: string;
  userId: string;
  hasAccess: boolean;
  initialCompleted: string[];
  media?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [completed, setCompleted] = useState(() => new Set(initialCompleted));
  // Sidebar starts open on desktop and closed on phones; each has its own toggle state.
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const index = ALL_LESSONS.findIndex((l) => l.slug === slug);
  const prev = ALL_LESSONS[index - 1];
  const next = ALL_LESSONS[index + 1];
  const isDone = completed.has(slug);
  const progress = stageProgress(completed);
  const router = useRouter();

  useEffect(() => {
    try {
      setBookmarked(localStorage.getItem(`saleslift-bookmark-${slug}`) === "1");
    } catch {}
  }, [slug]);

  function toggleSidebar() {
    if (window.innerWidth < 1024) setMobileOpen((o) => !o);
    else setDesktopOpen((o) => !o);
  }

  function toggleBookmark() {
    const nextValue = !bookmarked;
    setBookmarked(nextValue);
    try {
      if (nextValue) localStorage.setItem(`saleslift-bookmark-${slug}`, "1");
      else localStorage.removeItem(`saleslift-bookmark-${slug}`);
    } catch {}
  }

  function setDone(value: boolean) {
    setCompleted((c) => {
      const copy = new Set(c);
      if (value) copy.add(slug);
      else copy.delete(slug);
      return copy;
    });
  }

  function toggleComplete() {
    const value = !isDone;
    setDone(value); // optimistic
    startTransition(async () => {
      const supabase = createClient();
      // Plain insert, not upsert: the database only allows students to insert
      // and delete their own progress rows (an upsert also needs update rights).
      // "Already completed" (duplicate row, code 23505) counts as success.
      const { error } = value
        ? await supabase.from("lesson_progress").insert({ user_id: userId, lesson_slug: slug })
        : await supabase.from("lesson_progress").delete().eq("user_id", userId).eq("lesson_slug", slug);
      if (error && error.code !== "23505") {
        setDone(!value); // revert on failure
        return;
      }
      router.refresh(); // so other course pages show the new progress straight away
    });
  }

  const iconBtn =
    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-c-line text-c-text hover:bg-c-hover";

  return (
    <div className="flex h-screen flex-col bg-c-bg font-inter text-c-text">
      {/* Top bar */}
      <header className="flex h-[64px] flex-shrink-0 items-center justify-between gap-3 border-b border-c-line px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button onClick={toggleSidebar} className={iconBtn} aria-label="Toggle course sidebar">
            <SidebarIcon />
          </button>
          <Link href="/dashboard" className="truncate text-[17px] font-medium sm:text-[19px] text-c-text hover:opacity-80">
            SalesLift
          </Link>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <button onClick={toggleBookmark} className={`${iconBtn} hidden sm:flex`} aria-label="Bookmark lesson">
            <BookmarkIcon filled={bookmarked} />
          </button>
          {prev ? (
            <Link href={prev.href} className={iconBtn} aria-label="Previous lesson">
              <ArrowLeft />
            </Link>
          ) : (
            <span className={`${iconBtn} opacity-40`}>
              <ArrowLeft />
            </span>
          )}
          {next ? (
            <Link href={next.free || hasAccess ? next.href : "/pricing"} className={iconBtn} aria-label="Next lesson">
              <ArrowRight />
            </Link>
          ) : (
            <span className={`${iconBtn} opacity-40`}>
              <ArrowRight />
            </span>
          )}
          <span className="hidden whitespace-nowrap text-[15px] tabular-nums text-c-dim md:inline">
            {progress.count}/{progress.total} · {progress.pct}%
          </span>
          <button
            onClick={toggleComplete}
            disabled={isPending}
            aria-pressed={isDone}
            className={`flex h-10 items-center gap-2.5 rounded-lg border px-3 text-[15px] font-medium transition-colors sm:px-4 sm:text-[17px] ${
              isDone
                ? "border-green/60 bg-green/15 text-green hover:bg-green/25"
                : "border-c-line text-c-text hover:border-c-dim hover:bg-c-hover"
            }`}
          >
            <span
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors ${
                isDone ? "border-green bg-green text-white" : "border-c-dim"
              }`}
            >
              {isDone && <CheckIcon size={12} />}
            </span>
            {isDone ? "Completed" : <><span className="sm:hidden">Complete</span><span className="hidden sm:inline">Mark complete</span></>}
          </button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        {/* Sidebar */}
        {mobileOpen && (
          <div className="absolute inset-0 z-10 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}
        <aside
          className={`absolute inset-y-0 left-0 z-20 w-[340px] max-w-[88vw] flex-col border-r border-c-line bg-c-bg lg:static lg:w-[400px] lg:max-w-none ${
            mobileOpen ? "flex" : "hidden"
          } ${desktopOpen ? "lg:flex" : "lg:hidden"}`}
        >
          <div className="flex items-center gap-5 px-6 py-7">
            <Link href="/dashboard" className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-c-line text-c-text hover:bg-c-hover" aria-label="Back to course">
              <ArrowLeft />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center justify-between text-[17px] text-c-body">
                <span>
                  {progress.count}/{progress.total} stages complete
                </span>
                <span>{progress.pct}%</span>
              </div>
              <div className="h-[5px] overflow-hidden rounded-full bg-c-track">
                <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress.pct}%` }} />
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-5 overflow-y-auto px-5 pb-8">
            {SECTIONS.map((section) => (
              <div key={section.title} className="overflow-hidden rounded-xl border border-c-line bg-c-card">
                <div className="px-5 pb-4 pt-5">
                  <p className="text-[17px] font-semibold text-c-text">{section.title}</p>
                  <p className="mt-1 text-[14px] text-c-body">
                    {section.lessons.length} {section.lessons.length === 1 ? "lesson" : "lessons"}
                  </p>
                </div>
                <div className="mx-5 border-t border-c-line" />
                <div className="py-2">
                  {section.lessons.map((lesson) => {
                    const locked = !lesson.free && !hasAccess;
                    const active = lesson.slug === slug;
                    return (
                      <Link
                        key={lesson.slug}
                        href={locked ? "/pricing" : lesson.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 ${active ? "bg-c-hover" : "hover:bg-c-hover/50"}`}
                      >
                        <LessonThumb lesson={lesson} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-[17px] text-c-text">{lesson.title}</p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-[14px] text-c-body">
                            {completed.has(lesson.slug) ? (
                              <>
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-c-bg">
                                  <CheckIcon size={9} />
                                </span>
                                Completed
                              </>
                            ) : locked ? (
                              <>
                                <LockIcon size={13} /> Locked
                              </>
                            ) : (
                              "Lesson"
                            )}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className="flex flex-col gap-3 border-t border-c-line px-5 py-4">
            <CoachingCard variant="mini" />
            <LogoutButton className="h-11 w-full justify-center text-[16px]" />
          </div>
        </aside>

        {/* Lesson */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          {media}
          <article className="mx-auto max-w-[980px] px-5 pb-24 pt-12 sm:px-10">{children}</article>
        </main>
      </div>
    </div>
  );
}
