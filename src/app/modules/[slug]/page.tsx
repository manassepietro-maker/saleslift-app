import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";
import { ContentBlocks } from "@/components/ContentBlocks";
import { LessonCheckbox } from "@/components/LessonCheckbox";
import { DownloadList } from "@/components/DownloadList";
import { MODULES, getModule } from "@/lib/content/modules";

export const dynamic = "force-dynamic";

export default async function ModulePage({ params }: { params: { slug: string } }) {
  const mod = getModule(params.slug);
  if (!mod) notFound();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: purchase }, { data: row }] = await Promise.all([
    supabase.from("purchases").select("has_access").eq("user_id", user.id).single(),
    supabase
      .from("lesson_progress")
      .select("lesson_slug")
      .eq("user_id", user.id)
      .eq("lesson_slug", mod.slug)
      .maybeSingle(),
  ]);

  if (!purchase?.has_access) redirect("/pricing");

  const next = MODULES.find((m) => m.number === mod.number + 1);

  return (
    <main className="min-h-screen bg-bg">
      <Nav />
      <div className="mx-auto max-w-2xl px-6 py-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          Module {mod.number} · {mod.estimatedMinutes} min read
        </span>
        <h1 className="mb-3 mt-2 font-display text-4xl font-bold text-fg">{mod.title}</h1>
        <p className="mb-8 text-lg text-fg-dim">{mod.summary}</p>

        <ContentBlocks blocks={mod.body} />

        {mod.templates.length > 0 && (
          <div className="mt-8">
            <DownloadList templates={mod.templates} />
          </div>
        )}

        <div className="mt-10 flex items-center justify-between">
          <LessonCheckbox userId={user.id} lessonSlug={mod.slug} initiallyComplete={!!row} />
          {next ? (
            <Link href={`/modules/${next.slug}`} className="text-sm font-medium text-accent hover:underline">
              Next: {next.title} →
            </Link>
          ) : (
            <Link href="/dashboard" className="text-sm font-medium text-accent hover:underline">
              Back to course →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
