import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";
import { ContentBlocks } from "@/components/ContentBlocks";
import { LessonCheckbox } from "@/components/LessonCheckbox";
import { INTRO } from "@/lib/content/modules";

export const dynamic = "force-dynamic";

export default async function IntroPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: row } = await supabase
    .from("lesson_progress")
    .select("lesson_slug")
    .eq("user_id", user.id)
    .eq("lesson_slug", "intro")
    .maybeSingle();

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="mx-auto max-w-2xl px-6 py-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          {INTRO.estimatedMinutes} min {INTRO.videoUrl ? "· includes a short video" : "read"}
        </span>
        <h1 className="mb-6 mt-2 font-display text-4xl font-bold text-fg">
          Why this course exists
        </h1>

        {INTRO.videoUrl ? (
          <div className="mb-8 aspect-video overflow-hidden rounded-xl border border-line bg-bg-alt">
            <iframe src={INTRO.videoUrl} className="h-full w-full" allowFullScreen />
          </div>
        ) : (
          <div className="mb-8 flex aspect-video items-center justify-center rounded-xl border border-dashed border-line-strong bg-bg-alt text-sm text-fg-faint">
            Intro video goes here — set INTRO.videoUrl in src/lib/content/modules.ts
          </div>
        )}

        <ContentBlocks blocks={INTRO.body} />

        <div className="mt-10 flex items-center justify-between">
          <LessonCheckbox userId={user.id} lessonSlug="intro" initiallyComplete={!!row} />
          <Link href="/dashboard" className="text-sm font-medium text-accent hover:underline">
            Back to course →
          </Link>
        </div>
      </div>
    </main>
  );
}
