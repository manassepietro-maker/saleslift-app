import { getCourseState } from "@/lib/course-state";
import { ContentBlocks } from "@/components/ContentBlocks";
import { LessonShell } from "@/components/course/LessonShell";
import { VideoPlayer } from "@/components/course/VideoPlayer";
import { INTRO } from "@/lib/content/modules";

export const dynamic = "force-dynamic";

export default async function IntroPage() {
  const { userId, hasAccess, completed } = await getCourseState();

  return (
    <LessonShell
      slug="intro"
      userId={userId}
      hasAccess={hasAccess}
      initialCompleted={completed}
      media={<VideoPlayer url={INTRO.videoUrl} title="Why This Course Exists" />}
    >
      <h1 className="mb-8 text-[34px] font-bold tracking-tight text-c-text sm:text-[42px]">
        Why This Course Exists
      </h1>
      <ContentBlocks blocks={INTRO.body} />
    </LessonShell>
  );
}
