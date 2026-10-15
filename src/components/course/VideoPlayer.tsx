import { PlayIcon } from "./Icons";

// Full-width video area at the top of a lesson. With a URL it embeds the
// video (YouTube unlisted / Loom / Mux / Vimeo embed links all work); without
// one it shows a placeholder in the same spot so the layout stays the same.
export function VideoPlayer({ url, title }: { url?: string; title: string }) {
  return (
    <div className="bg-black">
      <div className="mx-auto aspect-video max-h-[72vh] w-full">
        {url ? (
          <iframe src={url} title={title} className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(80%_80%_at_50%_40%,#26272d,#0d0d10)]">
            <div className="text-center">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/40">SalesLift</p>
              <p className="mt-2 px-6 text-[22px] font-bold text-white/80 sm:text-[30px]">{title}</p>
              <p className="mt-3 text-[14px] text-white/40">Video coming soon</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-4 pt-10">
              <div className="mb-4 h-1 rounded-full bg-white/25" />
              <div className="flex items-center gap-5 text-white/90">
                <PlayIcon />
                <span className="text-[15px] tabular-nums">0:00 / 0:00</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
