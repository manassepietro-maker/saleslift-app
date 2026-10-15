"use client";

import { useState } from "react";

// Sends the visitor straight to Stripe Checkout; no account needed first.
// After paying, /checkout/success creates their account and logs them in.
export function BuyButton({
  label = "Get the system · €42",
  variant = "primary",
  className = "",
}: {
  label?: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      alert(data.error ?? "Something went wrong. Try again.");
    } catch {
      alert("Something went wrong. Try again.");
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`group inline-flex items-center justify-center gap-4 py-2 pl-7 pr-2 text-[17px] font-semibold transition-all disabled:opacity-60 ${
        variant === "primary"
          ? "bg-accent text-white shadow-[0_15px_40px_-12px_rgba(43,123,246,0.8)] hover:brightness-110"
          : "border border-line-strong bg-bg-alt2 text-fg hover:bg-bg-alt"
      } ${className}`}
    >
      <span>{loading ? "Opening secure checkout..." : label}</span>
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 ${
          variant === "primary" ? "bg-[#1f5fc4]" : "bg-accent"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 6 12 12 6 18" /><polyline points="13 6 19 12 13 18" /></svg>
      </span>
    </button>
  );
}
