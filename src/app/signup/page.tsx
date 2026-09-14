"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-6">
        <div className="w-full max-w-sm rounded-2xl border border-line bg-bg-alt p-8 text-center">
          <h1 className="mb-2 font-display text-2xl font-bold text-fg">Check your email</h1>
          <p className="text-sm text-fg-dim">
            We sent a confirmation link to {email}. Click it to activate your account, then log in.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-bg-alt p-8">
        <h1 className="mb-1 font-display text-2xl font-bold text-fg">Create your account</h1>
        <p className="mb-6 text-sm text-fg-dim">Start turning applications into interviews.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-line bg-bg-alt2 px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus:border-accent-dim focus:outline-none"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-line bg-bg-alt2 px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus:border-accent-dim focus:outline-none"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-accent px-4 py-3 text-sm font-bold text-accent-fg disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-fg-dim">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
