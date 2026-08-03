import { useEffect, useRef, useState } from "react";
import {
  pillarIcons,
  pillars as defaultPillars,
  type PillarConfig,
} from "@/config/pillars";

/** Viewport heights per pillar — higher = slower scrub between cards. */
const SCROLL_VH_PER_PILLAR = 2.5;

export function PillarStack({
  pillars = defaultPillars,
}: {
  pillars?: PillarConfig[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const n = pillars.length;
  const pos = progress * (n - 1);
  const active = Math.round(pos);

  return (
    <div ref={ref} style={{ height: `${n * SCROLL_VH_PER_PILLAR * 100}svh` }} className="relative">
      <div className="sticky top-[calc(3rem+env(safe-area-inset-top))] flex h-[calc(100svh-3rem-env(safe-area-inset-top))] flex-col justify-center overflow-hidden py-6 sm:py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-5">
          <h2 className="max-w-2xl shrink-0 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            Better care <span className="text-muted-foreground">starts now</span>
          </h2>

          <div className="relative mt-6 sm:mt-8 md:mt-10">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[p.icon];
              const d = i - pos;
              const abs = Math.abs(d);
              const style: React.CSSProperties = {
                opacity: Math.max(0, 1 - abs * 1.4),
                transform: `translateY(${d * 28}px) scale(${1 - Math.min(abs, 1) * 0.05})`,
                filter: abs > 0.02 ? `blur(${Math.min(abs * 5, 7)}px)` : undefined,
                pointerEvents: i === active ? "auto" : "none",
              };
              return (
                <div
                  key={p.id}
                  aria-hidden={i !== active}
                  className={
                    i === 0
                      ? "relative will-change-transform"
                      : "absolute inset-0 will-change-transform"
                  }
                  style={style}
                >
                  <div className="grid gap-4 rounded-2xl border border-border bg-card p-4 sm:gap-5 sm:rounded-3xl sm:p-6 md:grid-cols-[1fr_2fr] md:gap-6 md:p-8">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 sm:h-11 sm:w-11">
                        <Icon className="h-5 w-5 text-brand" />
                      </div>
                      <div className="mt-4 text-[10px] uppercase tracking-[0.22em] text-brand sm:mt-5 sm:text-xs sm:tracking-[0.25em]">
                        {p.kicker}
                      </div>
                      <h3 className="mt-2 text-xl leading-snug sm:text-2xl md:text-3xl">
                        {p.title}
                      </h3>
                      {p.copy ? (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3">
                          {p.copy}
                        </p>
                      ) : null}
                    </div>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                      {p.metrics.map((c) => (
                        <div
                          key={c.label}
                          className="flex items-baseline justify-between gap-3 rounded-xl bg-surface-2 px-4 py-3 sm:block sm:rounded-2xl sm:p-5"
                        >
                          <div className="text-[11px] text-muted-foreground sm:text-xs">
                            {c.label}
                          </div>
                          <div className="font-display text-base sm:mt-3 sm:text-lg">
                            {c.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center gap-2 sm:mt-10">
            {pillars.map((p, i) => (
              <span
                key={p.id}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-brand sm:w-10" : "w-3 bg-surface-2 sm:w-4"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
