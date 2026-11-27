export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="display text-[22px] leading-none tracking-tight">
        Snow<span className="text-yellow">/</span>School
      </span>
      <span className="eyebrow text-[9px] text-muted">Almaty</span>
    </span>
  );
}
