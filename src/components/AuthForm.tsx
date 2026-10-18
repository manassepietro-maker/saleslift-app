"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";

// Email + password login and sign-up.
// `next` is where to go after logging in (default: the course). When `next`
// is set (e.g. an access link), the form can switch between login and sign-up
// itself so the visitor never loses the page they came from.
export function AuthForm({
  mode: initialMode,
  next,
  title: titleOverride,
  intro,
}: {
  mode: "login" | "signup";
  next?: string;
  title?: string;
  intro?: string;
}) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "confirm">("idle");
  const [error, setError] = useState<React.ReactNode>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const destination = next ?? "/dashboard";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "1")
      setNotice("Payment confirmed. Your account is ready. Use \"Forgot password?\" below to create your password.");
    else if (params.get("paid") === "pending")
      setNotice("Thanks! We're still confirming your payment. Try logging in again in a minute.");
    else if (params.get("reset") === "done") setNotice("Password updated. Log in with your new password.");
    else if (params.get("error") === "link")
      setError("That link has expired, or was opened in a different browser. Request a new one.");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("working");
    setError(null);
    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus("idle");
        setError(
          /invalid login credentials/i.test(error.message) ? (
            <>
              Wrong email or password.{" "}
              <Link href="/forgot-password" className="font-semibold text-accent">
                Reset your password
              </Link>
            </>
          ) : /email not confirmed/i.test(error.message) ? (
            "Confirm your email first: open the link we sent when you signed up."
          ) : (
            error.message
          )
        );
        return;
      }
      window.location.href = destination;
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(destination)}` },
    });
    if (error) {
      setStatus("idle");
      setError(/already registered/i.test(error.message) ? "There's already an account with that email. Log in instead." : error.message);
      return;
    }
    if (data.session) {
      window.location.href = destination;
      return;
    }
    setStatus("confirm");
  }

  const title = titleOverride ?? (mode === "login" ? "Welcome back" : "Join SalesLift");
  const input =
    "mb-6 w-full rounded-xl border border-fg-faint bg-bg-alt px-5 py-4 text-[18px] text-fg outline-none ring-[4px] ring-transparent transition focus:border-fg-dim focus:ring-white/10";

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-bg px-6 pb-16 pt-24 font-inter sm:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(43,123,246,0.14),transparent)]" />
      <div className="relative w-full max-w-[480px]">
        <div className="mb-10 flex justify-center">
          <Logo size="lg" />
        </div>

        {status === "confirm" ? (
          <div className="text-center">
            <h1 className="mb-4 text-[36px] font-bold tracking-tight text-fg">Confirm your email</h1>
            <p className="text-[18px] leading-relaxed text-fg-dim">
              We sent a confirmation link to <span className="font-semibold text-fg">{email}</span>. Click it to activate
              your account.
            </p>
          </div>
        ) : (
          <>
            <h1 className="mb-10 text-center text-[36px] font-bold tracking-tight text-fg">{title}</h1>

            {(notice ?? intro) && (
              <p className="mb-6 rounded-xl border border-green/40 bg-green/10 px-5 py-4 text-[16px] leading-relaxed text-fg">
                {notice ?? intro}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="mb-3 block text-[18px] text-fg">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={input}
              />
              <div className="mb-3 flex items-baseline justify-between">
                <label htmlFor="password" className="block text-[18px] text-fg">
                  Password
                </label>
                {mode === "login" && (
                  <Link href="/forgot-password" className="text-[15px] text-[#6fa4ff]">
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                id="password"
                type="password"
                required
                minLength={mode === "signup" ? 8 : undefined}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder={mode === "signup" ? "At least 8 characters" : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${input} placeholder:text-fg-faint`}
              />
              {error && <p className="mb-5 text-[15px] leading-relaxed text-red-300">{error}</p>}
              <button
                type="submit"
                disabled={status === "working"}
                className="w-full rounded-xl bg-accent py-4 text-[19px] font-medium text-accent-fg transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "working" ? "One moment..." : mode === "login" ? "Log in" : "Create account"}
              </button>
            </form>

            <p className="mt-10 text-center text-[17px] text-fg-dim">
              {next ? (
                <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-[#6fa4ff]">
                  {mode === "login" ? "New here? Create an account" : "Already have an account? Log in"}
                </button>
              ) : mode === "login" ? (
                <>
                  New here?{" "}
                  <Link href="/#pricing" className="text-[#6fa4ff]">
                    Get the course
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#6fa4ff]">
                    Log in
                  </Link>
                </>
              )}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
