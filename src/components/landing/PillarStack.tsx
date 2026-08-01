import { useEffect, useRef, useState } from "react";
import {
  pillarIcons,
  pillars as defaultPillars,
  type PillarConfig,
} from "@/config/pillars";

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
    <div ref={ref} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5">
          <div className="relative">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[p.icon];
              const d = i - pos;
              const abs = Math.abs(d);
              const style: React.CSSProperties = {
                opacity: Math.max(0, 1 - abs * 1.4),
                transform: `translateY(${d * 40}px) scale(${1 - Math.min(abs, 1) * 0.06})`,
                filter: abs > 0.02 ? `blur(${Math.min(abs * 6, 8)}px)` : undefined,
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
                  <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-[1fr_2fr] md:p-8">
                    <div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2">
                        <Icon className="h-5 w-5 text-ember" />
                      </div>
                      <div className="mt-5 text-xs uppercase tracking-[0.25em] text-ember">
                        {p.kicker}
                      </div>
                      <h3 className="mt-2 text-2xl leading-snug md:text-3xl">{p.title}</h3>
                      {p.copy ? (
                        <p className="mt-3 text-sm text-muted-foreground">{p.copy}</p>
                      ) : null}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {p.metrics.map((c) => (
                        <div key={c.label} className="rounded-2xl bg-surface-2 p-5">
                          <div className="text-xs text-muted-foreground">{c.label}</div>
                          <div className="mt-3 font-display text-lg">{c.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* progress rail */}
          <div className="mt-10 flex justify-center gap-2">
            {pillars.map((p, i) => (
              <span
                key={p.id}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? "w-10 bg-ember" : "w-4 bg-surface-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
