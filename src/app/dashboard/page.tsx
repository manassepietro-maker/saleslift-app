import Link from "next/link";
import { getCourseState } from "@/lib/course-state";
import { ALL_LESSONS, stageProgress } from "@/lib/content/course";
import { CourseOutline } from "@/components/course/CourseOutline";
import { CourseMenu } from "@/components/course/CourseMenu";
import { LogoutButton } from "@/components/course/LogoutButton";
import { CoachingCard } from "@/components/course/CoachingCard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { hasAccess, completed } = await getCourseState();

  const done = new Set(completed);
  const progress = stageProgress(done);

  // "Continue" jumps to the first unfinished lesson the student can open.
  const next =
    ALL_LESSONS.find((l) => !done.has(l.slug) && (l.free || hasAccess)) ?? ALL_LESSONS[0];

  return (
    <main className="min-h-screen bg-c-bg font-inter text-c-text">
      <div className="mx-auto max-w-[1760px] px-4 pb-24 sm:px-8">
        <header className="flex items-center justify-between gap-4 rounded-b-[28px] border border-t-0 border-c-line px-5 py-6 sm:px-12 sm:py-9">
          <h1 className="text-[26px] font-extrabold tracking-tight sm:text-[44px]">SalesLift</h1>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href={next.href}
              className="flex h-12 items-center rounded-xl bg-c-blue px-5 text-[17px] sm:h-[52px] font-medium text-[#0b1730] hover:brightness-110 sm:px-7 sm:text-[22px]"
            >
              Continue
            </Link>
            <LogoutButton className="hidden h-[52px] px-5 text-[17px] sm:flex" />
            <CourseMenu hasAccess={hasAccess} />
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] sm:px-14">
          <section className="mt-8">
            <h2 className="mb-9 text-[30px] font-bold tracking-tight sm:text-[34px]">Progress</h2>
            <div className="rounded-3xl border border-c-line bg-c-card px-6 py-9 sm:px-12 sm:py-12">
              <div className="mb-5 flex items-center justify-between text-[19px] sm:text-[23px]">
                <span>
                  {progress.count}/{progress.total} stages complete
                </span>
                <span>{progress.pct}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-c-track">
                <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress.pct}%` }} />
              </div>
            </div>
          </section>

          <div className="mt-8">
            <CoachingCard />
          </div>

          {!hasAccess && (
            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl border border-c-line bg-c-card px-6 py-7 sm:flex-row sm:items-center sm:px-12">
              <p className="text-[17px] text-c-body sm:text-[19px]">
                Start Here is free. Unlock the 5-stage system for €42, one-time.
              </p>
              <Link
                href="/pricing"
                className="flex h-12 flex-shrink-0 items-center rounded-xl bg-c-blue px-6 text-[17px] font-medium text-[#0b1730] hover:brightness-110"
              >
                Unlock the course
              </Link>
            </div>
          )}

          <div className="mt-16">
            <CourseOutline completed={completed} hasAccess={hasAccess} />
          </div>

        </div>
      </div>
    </main>
  );
}
