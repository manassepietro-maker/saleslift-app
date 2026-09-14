import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";
import { ProgressBar } from "@/components/ProgressBar";
import { MODULES, TOTAL_LESSONS } from "@/lib/content/modules";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: purchase }, { data: progress }] = await Promise.all([
    supabase.from("purchases").select("has_access").eq("user_id", user.id).single(),
    supabase.from("lesson_progress").select("lesson_slug").eq("user_id", user.id),
  ]);

  const hasAccess = purchase?.has_access ?? false;
  const completedSlugs = new Set((progress ?? []).map((p) => p.lesson_slug));

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="mb-2 font-display text-3xl font-bold text-fg">Your course</h1>
        <p className="mb-8 text-fg-dim">
          Five stages, one pipeline. Work through them in order.
        </p>

        <div className="mb-10">
          <ProgressBar completed={completedSlugs.size} total={TOTAL_LESSONS} />
        </div>

        {!hasAccess && (
          <div className="mb-10 rounded-xl border border-accent-dim bg-accent/10 p-6">
            <p className="mb-3 text-sm text-fg">
              You can read the Welcome and Intro for free. Unlocking the five modules
              needs the course — €47/yr.
            </p>
            <Link
              href="/pricing"
              className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-accent-fg"
            >
              Get the system
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <LessonRow href="/welcome" title="Welcome" minutes={3} locked={false} done={completedSlugs.has("welcome")} />
          <LessonRow href="/intro" title="Intro — why this exists" minutes={6} locked={false} done={completedSlugs.has("intro")} />
          {MODULES.map((m) => (
            <LessonRow
              key={m.slug}
              href={`/modules/${m.slug}`}
              title={`${m.number}. ${m.title}`}
              minutes={m.estimatedMinutes}
              locked={!hasAccess}
              done={completedSlugs.has(m.slug)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function LessonRow({
  href,
  title,
  minutes,
  locked,
  done,
}: {
  href: string;
  title: string;
  minutes: number;
  locked: boolean;
  done: boolean;
}) {
  const content = (
    <div
      className={`flex items-center justify-between rounded-xl border border-line bg-bg-alt px-6 py-4 ${
        locked ? "opacity-60" : "hover:border-line-strong"
      }`}
    >
      <div className="flex items-center gap-3">
        {done && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-fg">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
        <span className="font-medium text-fg">{title}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-fg-faint">
        <span>{minutes} min</span>
        {locked && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        )}
      </div>
    </div>
  );

  if (locked) return <div>{content}</div>;
  return <Link href={href}>{content}</Link>;
}
