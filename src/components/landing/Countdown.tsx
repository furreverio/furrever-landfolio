import { useEffect, useState } from "react";

const TARGET = Date.UTC(2026, 8, 15, 10, 0, 0);

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
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const update = () => setLeft(TARGET - Date.now());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const s = Math.floor(left / 1000);
  const units = [
    { v: Math.floor(s / 86400), label: "Days" },
    { v: Math.floor((s % 86400) / 3600), label: "Hours" },
    { v: Math.floor((s % 3600) / 60), label: "Mins" },
    { v: s % 60, label: "Secs" },
  ];

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
