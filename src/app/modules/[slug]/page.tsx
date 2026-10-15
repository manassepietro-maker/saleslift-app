import { redirect, notFound } from "next/navigation";
import { getCourseState } from "@/lib/course-state";
import { ContentBlocks } from "@/components/ContentBlocks";
import { DownloadList } from "@/components/DownloadList";
import { LessonShell } from "@/components/course/LessonShell";
import { getModule } from "@/lib/content/modules";

export const dynamic = "force-dynamic";

export default async function ModulePage({ params }: { params: { slug: string } }) {
  const mod = getModule(params.slug);
  if (!mod) notFound();

  const { userId, hasAccess, completed } = await getCourseState();
  if (!hasAccess) redirect("/pricing");

  return (
    <LessonShell slug={mod.slug} userId={userId} hasAccess={hasAccess} initialCompleted={completed}>
      <p className="mb-3 text-[16px] font-medium text-c-dim">
        Stage {mod.number} of 5 · {mod.estimatedMinutes} min read
      </p>
      <h1 className="mb-6 text-[34px] font-bold tracking-tight text-c-text sm:text-[42px]">{mod.title}</h1>
      <p className="mb-10 text-[20px] leading-[1.6] text-c-text sm:text-[21px]">{mod.summary}</p>
      <ContentBlocks blocks={mod.body} />
      {mod.templates.length > 0 && (
        <div className="mt-12">
          <DownloadList templates={mod.templates} />
        </div>
      )}
    </LessonShell>
  );
}
