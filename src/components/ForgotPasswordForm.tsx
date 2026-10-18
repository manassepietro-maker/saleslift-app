"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";

// Sends a password reset email. The link logs the student in and opens
// /set-password?reset=1 to choose a new password.
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const next = encodeURIComponent("/set-password?reset=1");
    const { error } = await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
    });
    if (error) {
      setStatus("idle");
      setError(/rate limit|security purposes/i.test(error.message) ? "Too many emails requested. Wait a minute and try again." : error.message);
      return;
    }
    setStatus("sent");
  }

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
              If there&apos;s an account for <span className="font-semibold text-fg">{email}</span>, we sent a link to set a
              new password. Open it on this device.
            </p>
          </div>
        ) : (
          <>
            <h1 className="mb-4 text-center text-[36px] font-bold tracking-tight text-fg">Reset your password</h1>
            <p className="mb-10 text-center text-[17px] text-fg-dim">We&apos;ll email you a link to choose a new one.</p>
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
              {error && <p className="mb-5 text-[15px] text-red-300">{error}</p>}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-accent py-4 text-[19px] font-medium text-accent-fg transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </>
        )}
        <p className="mt-10 text-center text-[17px] text-fg-dim">
          <Link href="/login" className="text-[#6fa4ff]">
            Back to log in
          </Link>
        </p>
      </div>
    </main>
  );
}
