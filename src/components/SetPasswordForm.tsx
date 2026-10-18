"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";

// Lets a logged-in student choose a password: right after paying (their
// account was created at checkout), or after a "forgot password" email.
export function SetPasswordForm({ email, reset }: { email: string; reset: boolean }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("The two passwords don't match.");
      return;
    }
    setWorking(true);
    setError(null);
    const { error } = await createClient().auth.updateUser({ password, data: { password_set: true } });
    if (error) {
      setWorking(false);
      setError(error.message);
      return;
    }
    window.location.href = "/dashboard?welcome=1";
  }

  const input =
    "mb-6 w-full rounded-xl border border-fg-faint bg-bg-alt px-5 py-4 text-[18px] text-fg outline-none ring-[4px] ring-transparent transition placeholder:text-fg-faint focus:border-fg-dim focus:ring-white/10";

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-bg px-6 pb-16 pt-24 font-inter sm:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(43,123,246,0.14),transparent)]" />
      <div className="relative w-full max-w-[480px]">
        <div className="mb-10 flex justify-center">
          <Logo size="lg" />
        </div>
        <h1 className="mb-4 text-center text-[36px] font-bold tracking-tight text-fg">
          {reset ? "Choose a new password" : "Create your password"}
        </h1>
        <p className="mb-10 text-center text-[17px] leading-relaxed text-fg-dim">
          {reset ? "For " : "You're in! Set a password so you can log back in any time with "}
          <span className="font-semibold text-fg">{email}</span>.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="mb-3 block text-[18px] text-fg">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            autoFocus
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={input}
          />
          <label htmlFor="confirm" className="mb-3 block text-[18px] text-fg">
            Confirm password
          </label>
          <input
            id="confirm"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={input}
          />
          {error && <p className="mb-5 text-[15px] text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={working}
            className="w-full rounded-xl bg-accent py-4 text-[19px] font-medium text-accent-fg transition hover:brightness-110 disabled:opacity-60"
          >
            {working ? "Saving..." : reset ? "Save new password" : "Save and go to the course"}
          </button>
        </form>
      </div>
    </main>
  );
}
