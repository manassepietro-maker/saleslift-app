import type { ContentBlock } from "@/lib/content/modules";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-lg leading-relaxed text-fg-dim">
                {block.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-4 font-display text-xl font-bold text-fg">
                {block.text}
              </h3>
            );
          case "image":
            return (
              <figure key={i} className="overflow-hidden rounded-xl border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.src} alt={block.alt} className="w-full" />
                {block.caption && (
                  <figcaption className="border-t border-line bg-bg-alt px-4 py-2 text-xs text-fg-faint">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "list":
            return (
              <ul key={i} className="flex flex-col gap-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-lg leading-relaxed text-fg-dim">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fg-faint" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <p
                key={i}
                className="rounded-xl border border-accent-dim bg-accent/10 px-6 py-5 text-lg font-semibold text-fg"
              >
                {block.text}
              </p>
            );
          case "link":
            return (
              <a
                key={i}
                href={block.href}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-medium text-accent hover:underline"
              >
                {block.label} →
              </a>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
