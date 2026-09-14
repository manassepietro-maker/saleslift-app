"use client";

import { useState } from "react";

export function BuyButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert(data.error ?? "Something went wrong — try again.");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded-lg bg-accent px-8 py-4 text-base font-bold text-accent-fg disabled:opacity-60"
    >
      {loading ? "Redirecting to checkout..." : "Get the system — €37/mo"}
    </button>
  );
}
