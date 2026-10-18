import Link from "next/link";
import { Logo } from "@/components/Logo";

// Shared header, footer and small pieces for the public marketing pages.

// `home` is the landing page the in-page links point to ("/" or "/v2").
export function SiteHeader({ home = "/" }: { home?: string }) {
  const link = "text-fg-dim no-underline hover:text-fg";
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Logo />
        <nav className="flex items-center gap-6 text-[16px] sm:gap-8">
          <Link href={`${home}#how-it-works`} className={`hidden md:inline ${link}`}>How it works</Link>
          <Link href="/curriculum" className={`hidden md:inline ${link}`}>Curriculum</Link>
          <Link href="/story" className={`hidden md:inline ${link}`}>Story</Link>
          <Link href={`${home}#pricing`} className={`hidden md:inline ${link}`}>Pricing</Link>
          <Link href="/login" className="text-fg no-underline hover:opacity-80">Log in</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const link = "text-fg-faint no-underline hover:text-fg";
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo />
        <nav className="flex flex-wrap justify-center gap-6 text-[15px]">
          <Link href="/curriculum" className={link}>Curriculum</Link>
          <Link href="/story" className={link}>Story</Link>
          <Link href="/faq" className={link}>FAQ</Link>
          <Link href="/login" className={link}>Log in</Link>
        </nav>
        <p className="text-[14px] text-fg-faint">© SalesLift</p>
      </div>
    </footer>
  );
}

export function Eyebrow({ children, color = "#2b7bf6" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="mb-5 inline-block border px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.3em]"
      style={{ borderColor: `${color}88`, color }}
    >
      {children}
    </span>
  );
}

export function Check({ color = "#2b7bf6" }: { color?: string }) {
  return (
    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full" style={{ background: `${color}22`, color }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    </span>
  );
}

export function Cross() {
  return (
    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-fg-faint">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
    </span>
  );
}

// A screenshot shown inside a simple browser window frame.
export function BrowserShot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line-strong bg-bg-alt shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-[12px] text-fg-faint">saleslift-app.vercel.app</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full" loading="lazy" />
    </div>
  );
}
