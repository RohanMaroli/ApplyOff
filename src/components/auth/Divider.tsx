export function Divider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-zinc-400">
      <span className="h-px flex-1 bg-zinc-200" />
      {label}
      <span className="h-px flex-1 bg-zinc-200" />
    </div>
  );
}
