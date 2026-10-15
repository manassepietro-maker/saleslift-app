// "Interviews secured with": companies the founder got interviews at.
// Logos live in /public/logos/ as light-gray PNGs on transparent backgrounds
// (cut out from the originals). `height` is tuned per logo so wide wordmarks
// and compact marks look equally heavy in the ticker.
const COMPANIES: { name: string; logo: string; height: number }[] = [
  { name: "Gartner", logo: "/logos/gartner.png", height: 30 },
  { name: "Salesforce", logo: "/logos/salesforce.png", height: 46 },
  { name: "Datadog", logo: "/logos/datadog.png", height: 34 },
  { name: "Rossum", logo: "/logos/rossum.png", height: 26 },
  { name: "1Password", logo: "/logos/1password.png", height: 30 },
  { name: "Dashmote", logo: "/logos/dashmote.png", height: 22 },
  { name: "Samsara", logo: "/logos/samsara.png", height: 28 },
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
            <span key={i} aria-hidden={i >= COMPANIES.length} className="mx-10 flex items-center sm:mx-14">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={i >= COMPANIES.length ? "" : c.name}
                style={{ height: c.height }}
                className="w-auto opacity-60 transition-opacity hover:opacity-100"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
