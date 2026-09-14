"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

// Self-contained "mark complete" checkbox. Writes straight to Supabase from
// the browser — safe because Row Level Security only lets a user touch
// their own lesson_progress rows (see supabase/schema.sql).
export function LessonCheckbox({
  userId,
  lessonSlug,
  initiallyComplete,
}: {
  userId: string;
  lessonSlug: string;
  initiallyComplete: boolean;
}) {
  const [complete, setComplete] = useState(initiallyComplete);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  function toggle() {
    const next = !complete;
    setComplete(next); // optimistic
    startTransition(async () => {
      if (next) {
        const { error } = await supabase
          .from("lesson_progress")
          .upsert({ user_id: userId, lesson_slug: lessonSlug });
        if (error) setComplete(!next); // revert on failure
      } else {
        const { error } = await supabase
          .from("lesson_progress")
          .delete()
          .eq("user_id", userId)
          .eq("lesson_slug", lessonSlug);
        if (error) setComplete(!next);
      }
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
        complete
          ? "border-accent-dim bg-accent/10 text-accent"
          : "border-line text-fg-dim hover:border-line-strong"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded border ${
          complete ? "border-accent bg-accent" : "border-line-strong"
        }`}
      >
        {complete && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-fg, #1a1512)" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {complete ? "Completed" : "Mark as complete"}
    </button>
  );
}
