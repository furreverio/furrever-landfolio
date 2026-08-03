import { useEffect, useRef, useState } from "react";

export function ScoreDial({
  value,
  suffix = "",
  label,
  caption,
}: {
  value: number;
  suffix?: string;
  label: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / 1200);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const pct = Math.min(100, (shown / (suffix === "%" ? 100 : value || 1)) * 100);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40 sm:rounded-3xl sm:p-8"
    >
      <div className="relative h-24 w-24 sm:h-28 sm:w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--surface-2)" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 264} 264`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-xl sm:text-2xl">
          {shown}
          {suffix}
        </div>
      </div>
      <h3 className="mt-4 text-lg sm:mt-6 sm:text-xl">{label}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:mt-2">{caption}</p>
    </div>
  );
}
