import { redirect, notFound } from "next/navigation";
import { getCourseState } from "@/lib/course-state";
import { ContentBlocks } from "@/components/ContentBlocks";
import { ResourceList } from "@/components/ResourceList";
import { LessonShell } from "@/components/course/LessonShell";
import { VideoPlayer } from "@/components/course/VideoPlayer";
import { CoachingCard } from "@/components/course/CoachingCard";
import { getModule } from "@/lib/content/modules";

export const dynamic = "force-dynamic";

export default async function ModulePage({ params }: { params: { slug: string } }) {
  const mod = getModule(params.slug);
  if (!mod) notFound();

  const { userId, hasAccess, completed } = await getCourseState();
  if (!hasAccess) redirect("/pricing");

  return (
    <LessonShell
      slug={mod.slug}
      userId={userId}
      hasAccess={hasAccess}
      initialCompleted={completed}
      media={<VideoPlayer url={mod.videoUrl} title={`${mod.number}. ${mod.title}`} />}
    >
      <p className="mb-3 text-[16px] font-medium text-c-dim">
        Stage {mod.number} of 5 · {mod.estimatedMinutes} min
      </p>
      <h1 className="mb-8 text-[34px] font-bold tracking-tight text-c-text sm:text-[42px]">{mod.title}</h1>
      <ContentBlocks blocks={mod.body} />
      {mod.resources.length > 0 && (
        <div className="mt-12">
          <ResourceList resources={mod.resources} />
        </div>
      )}
      {/* Coaching offer at the end of every stage; the full version after
          Execute, when interviews start landing. */}
      <div className="mt-12">
        <CoachingCard variant={mod.slug === "execute" ? "full" : "compact"} />
      </div>
    </LessonShell>
  );
}
