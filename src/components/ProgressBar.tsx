export function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm text-fg-dim">
        <span>{completed} / {total} modules complete</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-bg-alt2 overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
