"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";

// Email-only login/sign-up: we email a one-time login link, no passwords.
// mode "login" only works for existing accounts; "signup" creates one (free
// preview of the Start Here lessons — paying customers get theirs at checkout).
export function EmailLinkForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<React.ReactNode>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "1")
      setNotice("Payment confirmed. Your account is ready. Enter the email you paid with and we'll send your login link.");
    else if (params.get("paid") === "pending")
      setNotice("Thanks! We're still confirming your payment. Enter the email you paid with. Your login link works as soon as it's confirmed.");
    else if (params.get("error") === "link")
      setError("That login link has expired, or was opened in a different browser. Request a new one below.");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        shouldCreateUser: mode === "signup",
      },
    });
    if (error) {
      setStatus("idle");
      if (/signups? not allowed|user not found/i.test(error.message)) {
        setError(
          <>
            There&apos;s no account with that email yet.{" "}
            <Link href="/#pricing" className="font-semibold text-accent">
              Get the system
            </Link>{" "}
            to create one.
          </>
        );
      } else if (/rate limit|security purposes/i.test(error.message)) {
        setError("Too many login emails were requested. Wait a minute and try again.");
      } else {
        setError(error.message);
      }
      return;
    }
    setStatus("sent");
  }

  const title = mode === "login" ? "Welcome back" : "Join SalesLift";

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-bg px-6 pb-16 pt-24 font-inter sm:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(43,123,246,0.14),transparent)]" />
      <div className="relative w-full max-w-[480px]">
        <div className="mb-10 flex justify-center">
          <Logo size="lg" />
        </div>

        {status === "sent" ? (
          <div className="text-center">
            <h1 className="mb-4 text-[36px] font-bold tracking-tight text-fg">Check your email</h1>
            <p className="text-[18px] leading-relaxed text-fg-dim">
              We sent a login link to <span className="font-semibold text-fg">{email}</span>. Open it on this
              device to continue.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 text-[16px] font-medium text-accent hover:underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <h1 className="mb-10 text-center text-[36px] font-bold tracking-tight text-fg">{title}</h1>

            {notice && (
              <p className="mb-6 rounded-xl border border-green/40 bg-green/10 px-5 py-4 text-[16px] leading-relaxed text-fg">
                {notice}
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
                className="mb-6 w-full rounded-xl border border-fg-faint bg-bg-alt px-5 py-4 text-[18px] text-fg outline-none ring-[4px] ring-transparent transition focus:border-fg-dim focus:ring-white/10"
              />
              {error && <p className="mb-5 text-[15px] leading-relaxed text-red-300">{error}</p>}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-accent py-4 text-[19px] font-medium text-accent-fg transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : mode === "login" ? "Send login link" : "Sign up"}
              </button>
            </form>

            <p className="mt-10 text-center text-[17px] text-fg-dim">
              {mode === "login" ? (
                <>
                  New here?{" "}
                  <Link href="/#pricing" className="text-[#6fa4ff]">
                    Get the system
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#6fa4ff]">
                    Sign in
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
