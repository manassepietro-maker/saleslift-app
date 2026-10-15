import Link from "next/link";

// Placeholder SalesLift logo: a rising-bars mark + wordmark.
// When the real logo arrives, drop it in /public (e.g. /public/logo.svg) and
// replace the <svg> below with <img src="/logo.svg" alt="SalesLift" />.
export function Logo({ href = "/", size = "md" }: { href?: string; size?: "md" | "lg" }) {
  const mark = size === "lg" ? 40 : 30;
  return (
    <Link href={href} className="flex items-center gap-2.5 text-fg no-underline" aria-label="SalesLift home">
      <svg width={mark} height={mark} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="3" y="18" width="6" height="11" rx="1.5" fill="#2b7bf6" opacity="0.55" />
        <rect x="13" y="11" width="6" height="18" rx="1.5" fill="#2b7bf6" opacity="0.8" />
        <rect x="23" y="4" width="6" height="25" rx="1.5" fill="#2b7bf6" />
        <path d="M4 13 L14 6 L19 9 L28 2" stroke="#f2f2f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={size === "lg" ? "text-[30px] leading-none" : "text-[22px] leading-none"}>
        <span className="font-extrabold tracking-tight">Sales</span>
        <span className="font-normal tracking-tight">Lift</span>
      </span>
    </Link>
  );
}
