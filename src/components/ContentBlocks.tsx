import type { ContentBlock } from "@/lib/content/modules";
import { ChannelMap } from "@/components/course/ChannelMap";

// Turns "[label](https://...)" inside lesson text into real links.
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
        return m ? (
          <a key={i} href={m[2]} target="_blank" rel="noreferrer" className="font-medium text-c-blue underline-offset-4 hover:underline">
            {m[1]}
          </a>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6 font-inter">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-[19px] leading-[1.6] text-c-body sm:text-[20px]">
                <RichText text={block.text} />
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
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="flex flex-col gap-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4 text-[19px] leading-[1.6] text-c-body sm:text-[20px]">
                    <span className="mt-[3px] flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-c-line text-[14px] font-semibold text-c-text">
                      {j + 1}
                    </span>
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "example":
            return (
              <figure key={i} className="overflow-hidden rounded-2xl border border-c-line bg-c-card">
                <figcaption className="border-b border-c-line px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-c-dim">
                  {block.label}
                </figcaption>
                <p className="whitespace-pre-line px-6 py-5 text-[17px] leading-[1.65] text-c-body">{block.text}</p>
              </figure>
            );
          case "diagram":
            return block.name === "channel-map" ? <ChannelMap key={i} /> : null;
          case "callout":
            return (
              <p
                key={i}
                className="rounded-2xl border border-c-line bg-c-card px-7 py-6 text-[19px] font-semibold leading-[1.5] text-c-text sm:text-[20px]"
              >
                <RichText text={block.text} />
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
