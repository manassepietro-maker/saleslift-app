// "Interviews secured with" — companies the founder got interviews at.
// Shown as text wordmarks (not official logo files) in a slow, looping ticker.
// To use real logo images instead, put them in /public/logos/ and swap the
// <span> for <img src="/logos/<file>" alt={c.name} className="h-7 w-auto opacity-70" />.
const COMPANIES: { name: string; className: string }[] = [
  { name: "Gartner", className: "font-bold tracking-tight" },
  { name: "salesforce", className: "font-semibold tracking-tight" },
  { name: "DATADOG", className: "font-extrabold tracking-[0.08em]" },
  { name: "rossum", className: "font-bold lowercase tracking-tight" },
  { name: "1Password", className: "font-bold tracking-tight" },
  { name: "dashmote", className: "font-semibold lowercase tracking-tight" },
  { name: "Samsara", className: "font-semibold tracking-tight" },
];

export function LogoStrip() {
  // Rendered twice so the ticker loops seamlessly.
  const row = [...COMPANIES, ...COMPANIES];
  return (
    <section className="border-y border-line py-10">
      <p className="mb-7 text-center text-[13px] font-semibold uppercase tracking-[0.3em] text-fg-faint">
        Interviews secured with
      </p>
      <div className="logo-marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="logo-marquee-track flex w-max items-center">
          {row.map((c, i) => (
            <span
              key={i}
              aria-hidden={i >= COMPANIES.length}
              className={`mx-10 whitespace-nowrap text-[28px] text-fg-faint transition-colors hover:text-fg sm:mx-14 sm:text-[32px] ${c.className}`}
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
