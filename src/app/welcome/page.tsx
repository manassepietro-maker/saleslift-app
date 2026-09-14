import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";
import { ContentBlocks } from "@/components/ContentBlocks";
import { LessonCheckbox } from "@/components/LessonCheckbox";
import { WELCOME } from "@/lib/content/modules";

export const dynamic = "force-dynamic";

export default async function WelcomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: row } = await supabase
    .from("lesson_progress")
    .select("lesson_slug")
    .eq("user_id", user.id)
    .eq("lesson_slug", "welcome")
    .maybeSingle();

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="mx-auto max-w-2xl px-6 py-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          {WELCOME.estimatedMinutes} min read
        </span>
        <h1 className="mb-8 mt-2 font-display text-4xl font-bold text-fg">Welcome</h1>
        <ContentBlocks blocks={WELCOME.body} />
        <div className="mt-10 flex items-center justify-between">
          <LessonCheckbox userId={user.id} lessonSlug="welcome" initiallyComplete={!!row} />
          <Link href="/intro" className="text-sm font-medium text-accent hover:underline">
            Next: Intro →
          </Link>
        </div>
      </div>
    </main>
  );
}
