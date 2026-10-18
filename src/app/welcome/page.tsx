import { getCourseState } from "@/lib/course-state";
import { ContentBlocks } from "@/components/ContentBlocks";
import { LessonShell } from "@/components/course/LessonShell";
import { WELCOME } from "@/lib/content/modules";
import { CoachingCard } from "@/components/course/CoachingCard";

export const dynamic = "force-dynamic";

export default async function WelcomePage() {
  const { userId, hasAccess, completed } = await getCourseState();

  return (
    <LessonShell slug="welcome" userId={userId} hasAccess={hasAccess} initialCompleted={completed}>
      <h1 className="mb-8 text-[34px] font-bold tracking-tight text-c-text sm:text-[42px]">Welcome</h1>
      <ContentBlocks blocks={WELCOME.body} />
      <div className="mt-12">
        <CoachingCard compact />
      </div>
    </LessonShell>
  );
}
