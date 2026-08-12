import { useEffect, useId, useRef, useState, type ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

type ScoreIcon = ComponentType<LucideProps>;
type ScoreVariant = "wellness" | "mood" | "heartbeat";

const RING_C = 2 * Math.PI * 42;

const ECG_PATH =
  "M0 24 H18 L22 24 L24 8 L26 40 L28 20 L30 24 H42 L46 24 L48 10 L50 38 L52 18 L54 24 H66 L70 24 L72 12 L74 36 L76 22 L78 24 H90 L94 24 L96 14 L98 34 L100 24 H120";

const moodStates = ["Zoomies", "Playful", "Curious"] as const;

export function ScoreDial({
  value,
  max = 100,
  suffix = "",
  unit,
  label,
  subtitle,
  caption,
  icon: Icon,
  variant = "wellness",
}: {
  value: number;
  max?: number;
  suffix?: string;
  unit?: string;
  label: string;
  subtitle?: string;
  caption: string;
  icon: ScoreIcon;
  variant?: ScoreVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const gradientId = useId().replace(/:/g, "");
  const [shown, setShown] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        setInView(visible);
        if (!visible) return;

        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / 1200);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const pct = Math.min(100, (shown / (max || 1)) * 100);
  const dash = (pct / 100) * RING_C;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40 sm:rounded-3xl sm:p-6",
        variant === "heartbeat" && inView && "score-dial--heartbeat",
        variant === "wellness" && inView && "score-dial--wellness",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl",
          variant === "mood" && "bg-linear-to-br from-brand/20 to-violet/15 opacity-70",
          variant === "heartbeat" && "bg-brand/10 opacity-50",
          variant === "wellness" && "score-dial-wellness-glow bg-linear-to-br from-brand/20 via-brand-glow/15 to-violet/10",
        )}
        aria-hidden
      />

      {variant === "wellness" && inView ? (
        <>
          <span className="score-dial-wellness-spark score-dial-wellness-spark--1 pointer-events-none absolute left-6 top-8 h-1.5 w-1.5 rounded-full bg-brand-glow/80" aria-hidden />
          <span className="score-dial-wellness-spark score-dial-wellness-spark--2 pointer-events-none absolute right-8 top-14 h-1 w-1 rounded-full bg-brand/70" aria-hidden />
          <span className="score-dial-wellness-spark score-dial-wellness-spark--3 pointer-events-none absolute bottom-16 left-10 h-1 w-1 rounded-full bg-violet/60" aria-hidden />
        </>
      ) : null}

      <div className="relative flex items-center gap-2.5">
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl border bg-brand/10",
            variant === "mood" && "border-violet/30",
            variant === "wellness" && "border-brand/25 score-dial-wellness-icon",
            variant === "heartbeat" && "border-brand/20",
          )}
        >
          <Icon className="h-4 w-4 text-brand" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg sm:text-xl">{label}</h3>
          {subtitle ? (
            <p className="text-[11px] font-medium tracking-wide text-brand/90">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="relative mx-auto mt-5 h-28 w-28 sm:mt-6 sm:h-32 sm:w-32">
        {variant === "mood" ? (
          <span
            className="pointer-events-none absolute inset-2 rounded-full bg-linear-to-br from-brand/20 via-violet/15 to-brand-glow/10"
            aria-hidden
          />
        ) : null}

        {variant === "wellness" && inView ? (
          <span
            className="score-dial-wellness-halo pointer-events-none absolute inset-1 rounded-full border border-brand/15 bg-linear-to-b from-brand/10 to-transparent"
            aria-hidden
          />
        ) : null}

        <svg viewBox="0 0 100 100" className="relative h-full w-full -rotate-90" aria-hidden>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {variant === "wellness" ? (
                <>
                  <stop offset="0%" stopColor="var(--brand-glow)" stopOpacity="0.95" />
                  <stop offset="55%" stopColor="var(--brand)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--violet-accent)" stopOpacity="0.85" />
                </>
              ) : variant === "mood" ? (
                <>
                  <stop offset="0%" stopColor="var(--brand)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--violet-accent)" stopOpacity="0.95" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="var(--brand-glow)" stopOpacity="1" />
                </>
              )}
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--surface-2)" strokeWidth="7" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${RING_C}`}
            className={cn(
              "transition-[stroke-dasharray] duration-300",
              variant === "wellness" && inView && "score-dial-wellness-ring",
            )}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl leading-none tabular-nums sm:text-3xl">
            {shown}
            {suffix}
          </span>
          {unit ? (
            <span className="mt-1 text-[10px] font-medium tracking-wide text-muted-foreground">
              {unit}
            </span>
          ) : max === 100 ? (
            <span className="mt-1 text-[10px] tabular-nums text-muted-foreground">/ {max}</span>
          ) : null}
        </div>
      </div>

      {variant === "heartbeat" && inView ? (
        <div className="relative mt-4 h-10 overflow-hidden rounded-xl bg-surface-2/80 px-2 sm:mt-5">
          <svg
            viewBox="0 0 120 48"
            className="score-dial-ecg h-full w-[200%] min-w-[200%]"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={ECG_PATH}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      ) : null}

      {variant === "mood" ? (
        <div className="relative mt-4 flex flex-wrap justify-center gap-1.5 sm:mt-5" aria-hidden>
          {moodStates.map((state, i) => (
            <span
              key={state}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wide",
                i === 1
                  ? "border-brand/40 bg-brand/15 text-brand"
                  : "border-border/80 bg-surface-2/80 text-muted-foreground",
              )}
            >
              {state}
            </span>
          ))}
        </div>
      ) : null}

      <p className="relative mt-4 text-center text-sm leading-relaxed text-muted-foreground sm:mt-5">
        {caption}
      </p>
    </div>
  );
}
