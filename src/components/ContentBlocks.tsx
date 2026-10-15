import type { ContentBlock } from "@/lib/content/modules";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6 font-inter">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-[19px] leading-[1.6] text-c-body sm:text-[20px]">
                {block.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 font-inter text-[22px] font-bold text-c-text underline decoration-2 underline-offset-[5px] sm:text-[24px]">
                {block.text}
              </h3>
            );
          case "image":
            return (
              <figure key={i} className="overflow-hidden rounded-xl border border-c-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.src} alt={block.alt} className="w-full" />
                {block.caption && (
                  <figcaption className="border-t border-c-line bg-c-card px-4 py-2 text-sm text-c-dim">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "list":
            return (
              <ul key={i} className="flex flex-col gap-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4 text-[19px] leading-[1.6] text-c-body sm:text-[20px]">
                    <span className="mt-[13px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-c-dim" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <p
                key={i}
                className="rounded-2xl border border-c-line bg-c-card px-7 py-6 text-[19px] font-semibold leading-[1.5] text-c-text sm:text-[20px]"
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
                className="text-[19px] font-medium text-c-blue hover:underline"
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
