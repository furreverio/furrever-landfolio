import { useEffect, useState } from "react";

const TARGET = Date.UTC(2026, 8, 15, 10, 0, 0);

/** Inflated start for the intro fall animation. */
const INTRO_FROM_SECONDS = 90 * 86400 + 23 * 3600 + 59 * 60 + 59;
const INTRO_MS = 2800;

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function ordinal(day: number) {
  const j = day % 10;
  const k = day % 100;
  if (j === 1 && k !== 11) return `${day}st`;
  if (j === 2 && k !== 12) return `${day}nd`;
  if (j === 3 && k !== 13) return `${day}rd`;
  return `${day}th`;
}

function secondsUntilLaunch(now = Date.now()) {
  return Math.max(0, Math.floor((TARGET - now) / 1000));
}

function splitUnits(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  return [
    { v: Math.floor(s / 86400), label: "Days" },
    { v: Math.floor((s % 86400) / 3600), label: "Hours" },
    { v: Math.floor((s % 3600) / 60), label: "Mins" },
    { v: s % 60, label: "Secs" },
  ];
}

/** Fast start, long soft landing. */
function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function launchLabel() {
  const d = new Date(TARGET);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `Launching on ${ordinal(d.getUTCDate())} ${months[d.getUTCMonth()]}`;
}

export function Countdown({
  compact = false,
  variant = "default",
}: {
  compact?: boolean;
  variant?: "default" | "hero" | "compact";
}) {
  const mode = compact || variant === "compact" ? "compact" : variant;
  const [displaySeconds, setDisplaySeconds] = useState(INTRO_FROM_SECONDS);
  const [settled, setSettled] = useState(false);

  // Intro: fall fast → slow into the live countdown, then tick.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || INTRO_FROM_SECONDS <= secondsUntilLaunch()) {
      setDisplaySeconds(secondsUntilLaunch());
      setSettled(true);
      return;
    }

    const from = INTRO_FROM_SECONDS;
    const started = performance.now();
    let raf = 0;
    let lastShown = from;

    const frame = (now: number) => {
      const t = Math.min(1, (now - started) / INTRO_MS);
      const liveTo = secondsUntilLaunch();

      if (t >= 1) {
        setDisplaySeconds(liveTo);
        setSettled(true);
        return;
      }

      const eased = easeOutExpo(t);
      // Always aim at the live target so we never snap at the end.
      const next = Math.round(from + (liveTo - from) * eased);
      // Keep display monotonic while falling (no upward flicker if live clock ticks).
      const current = Math.min(lastShown, Math.max(liveTo, next));
      lastShown = current;
      setDisplaySeconds(current);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!settled) return;
    const id = setInterval(() => setDisplaySeconds(secondsUntilLaunch()), 1000);
    return () => clearInterval(id);
  }, [settled]);

  const units = splitUnits(displaySeconds);

  if (mode === "hero") {
    return (
      <div className="flip-countdown" role="timer" aria-live="polite">
        {units.map((u) => (
          <div key={u.label} className="flip-countdown__unit">
            <div className="flip-card" aria-hidden>
              <span className="flip-card__digit">{pad(u.v)}</span>
              <span className="flip-card__seam" />
            </div>
            <span className="flip-countdown__label">{u.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (mode === "compact") {
    return (
      <div className="flex items-center gap-2">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-2">
            <div className="rounded-md bg-white/10 px-2 py-1 font-display text-sm tabular-nums text-white">
              {pad(u.v)}
            </div>
            {i < units.length - 1 && <span className="text-white/40">:</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-1.5 sm:gap-2">
          <div className="text-center">
            <div className="rounded-lg bg-surface-2 px-2.5 py-1.5 font-display text-xl tabular-nums sm:px-3.5 sm:py-2 sm:text-2xl md:text-3xl">
              {pad(u.v)}
            </div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:mt-1.5 sm:text-[10px] sm:tracking-[0.2em]">
              {u.label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="text-muted-foreground sm:text-base">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
