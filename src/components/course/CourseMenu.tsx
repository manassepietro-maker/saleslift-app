"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DotsIcon } from "./Icons";

// The "···" button next to Continue: links to the other parts of the site.
export function CourseMenu({ hasAccess }: { hasAccess: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const item = "block w-full px-4 py-2.5 text-left text-[15px] text-c-text hover:bg-c-hover";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="More options"
        className="flex h-12 w-12 sm:h-[52px] sm:w-[52px] items-center justify-center rounded-xl border border-c-line text-c-text hover:bg-c-hover"
      >
        <DotsIcon size={22} />
      </button>
      {open && (
        <div className="absolute right-0 top-[60px] z-20 w-52 overflow-hidden rounded-xl border border-c-line bg-c-card py-1 shadow-2xl">
          {!hasAccess && (
            <Link href="/pricing" className={item}>
              Unlock the full course
            </Link>
          )}
          <Link href="/coaching" className={item}>
            1:1 Coaching
          </Link>
          <Link href="/" className={item}>
            SalesLift homepage
          </Link>
          <form action="/api/auth/signout" method="post">
            <button className={item}>Log out</button>
          </form>
        </div>
      )}
    </div>
  );
}
