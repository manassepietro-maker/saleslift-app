import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/Logo";

export async function Nav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="relative z-10 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Logo href={user ? "/dashboard" : "/"} />
        <nav className="flex items-center gap-6 text-[15px] text-fg-dim [&_a]:text-fg-dim [&_a]:no-underline">
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
