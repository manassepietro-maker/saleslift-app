import type { Lesson } from "@/lib/content/course";

// Generated thumbnail tile. Lessons with hue 0 get the light "reading" tile;
// the five stages get a tinted dark tile. Swap for real images any time.
export function LessonThumb({ lesson, size = "lg" }: { lesson: Lesson; size?: "lg" | "sm" }) {
  const box = size === "lg" ? "h-[80px] w-[142px] rounded-xl" : "h-[50px] w-[89px] rounded-lg";
  const text = size === "lg" ? "text-[13px]" : "text-[9px]";

  if (lesson.hue === 0) {
    return (
      <div
        className={`${box} relative flex flex-shrink-0 items-end overflow-hidden p-2`}
        style={{
          background:
            "repeating-linear-gradient(135deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 7px), linear-gradient(135deg, #f4f4f6, #d9dadf)",
        }}
      >
        <span className={`${text} font-inter font-semibold uppercase tracking-wider text-[#55565c]`}>
          {lesson.label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${box} relative flex flex-shrink-0 flex-col justify-between overflow-hidden p-2`}
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, hsl(${lesson.hue} 70% 55% / 0.55), transparent 60%), linear-gradient(135deg, hsl(${lesson.hue} 30% 16%), #121316)`,
      }}
    >
      <span className={`${text} font-inter font-semibold uppercase tracking-wider text-white/60`}>
        SalesLift
      </span>
      <span className={`${size === "lg" ? "text-[17px]" : "text-[11px]"} font-inter font-bold leading-none text-white`}>
        {lesson.label}
      </span>
    </div>
  );
}
