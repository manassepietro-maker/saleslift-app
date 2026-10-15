import type { Template } from "@/lib/content/modules";

export function DownloadList({ templates }: { templates: Template[] }) {
  if (templates.length === 0) return null;
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-c-line bg-c-card p-7 font-inter">
      <span className="text-[17px] font-semibold text-c-text">
        Templates for this lesson
      </span>
      <div className="flex flex-col gap-2">
        {templates.map((t) => (
          <a
            key={t.file}
            href={`/templates/${t.file}`}
            download
            className="flex items-center gap-3 text-[17px] text-c-body hover:text-c-blue"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12" />
              <polyline points="7 10 12 15 17 10" />
              <path d="M5 21h14" />
            </svg>
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}
