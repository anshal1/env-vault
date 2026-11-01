export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
      <span className="size-1.5 rounded-full bg-emerald-400" />
      {children}
    </p>
  );
}
