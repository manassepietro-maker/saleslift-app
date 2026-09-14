import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function Nav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-line bg-bg-alt">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="font-display text-lg font-bold text-fg">
          SalesLift
        </Link>
        <nav className="flex items-center gap-6 text-sm text-fg-dim">
          <Link href="/dashboard" className="hover:text-fg">Course</Link>
          <Link href="/coaching" className="hover:text-fg">1:1 Coaching</Link>
          {user ? (
            <form action="/api/auth/signout" method="post">
              <button className="hover:text-fg">Log out</button>
            </form>
          ) : (
            <Link href="/login" className="hover:text-fg">Log in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
