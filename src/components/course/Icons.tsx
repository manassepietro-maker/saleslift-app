// Small inline icons shared by the course pages.
type P = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const CheckIcon = ({ size = 14, className }: P) => (
  <svg {...base(size)} strokeWidth={3} className={className}><polyline points="20 6 9 17 4 12" /></svg>
);
export const LockIcon = ({ size = 14, className }: P) => (
  <svg {...base(size)} className={className}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const ChevronIcon = ({ size = 18, className }: P) => (
  <svg {...base(size)} strokeWidth={2.5} className={className}><polyline points="6 15 12 9 18 15" /></svg>
);
export const ArrowLeft = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
export const ArrowRight = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
export const SidebarIcon = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="9" y1="4" x2="9" y2="20" /><line x1="5" y1="8" x2="7" y2="8" /><line x1="5" y1="11" x2="7" y2="11" /></svg>
);
export const BookmarkIcon = ({ size = 18, className, filled }: P & { filled?: boolean }) => (
  <svg {...base(size)} fill={filled ? "currentColor" : "none"} className={className}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
);
export const DotsIcon = ({ size = 18, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></svg>
);
export const PlayIcon = ({ size = 22, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M7 4.5v15l12.5-7.5z" /></svg>
);

// White filled circle with a dark check — the "completed" mark from the design.
export function DoneDot({ size = 32 }: { size?: number }) {
  return (
    <span
      className="flex flex-shrink-0 items-center justify-center rounded-full bg-white text-[#1b1c20]"
      style={{ width: size, height: size }}
    >
      <CheckIcon size={Math.round(size * 0.45)} />
    </span>
  );
}

export function EmptyDot({ size = 32 }: { size?: number }) {
  return (
    <span
      className="flex-shrink-0 rounded-full border-2 border-c-line"
      style={{ width: size, height: size }}
    />
  );
}
