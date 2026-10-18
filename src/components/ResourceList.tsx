import type { Resource } from "@/lib/content/modules";

// Resource buttons at the end of a lesson (templates, copies, downloads).
// A resource without a link yet shows as "Coming soon".
export function ResourceList({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) return null;
  return (
    <div className="rounded-2xl border border-c-line bg-c-card p-7 font-inter">
      <p className="mb-5 text-[17px] font-semibold text-c-text">Resources for this lesson</p>
      <div className="flex flex-col gap-3">
        {resources.map((r) =>
          r.href ? (
            <a
              key={r.label}
              href={r.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border border-c-line px-5 py-4 text-[17px] text-c-text no-underline hover:border-c-blue"
            >
              {r.label}
              <span className="text-c-blue">→</span>
            </a>
          ) : (
            <div
              key={r.label}
              className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-c-line px-5 py-4 text-[17px] text-c-dim"
            >
              {r.label}
              <span className="text-[13px] font-semibold uppercase tracking-[0.15em]">Coming soon</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
