import { useEffect, useState } from "react";

const TARGET = Date.UTC(2026, 8, 15, 10, 0, 0);

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function Countdown({ compact = false }: { compact?: boolean }) {
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

  return (
    <div className={compact ? "flex items-center gap-2" : "flex items-center gap-3"}>
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-2">
          <div className="text-center">
            <div
              className={`font-display tabular-nums rounded-lg bg-surface-2 px-2.5 py-1.5 ${
                compact ? "text-base" : "text-2xl md:text-3xl px-3.5 py-2"
              }`}
            >
              {pad(u.v)}
            </div>
            {!compact && (
              <div className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {u.label}
              </div>
            )}
          </div>
          {i < units.length - 1 && <span className="text-muted-foreground">:</span>}
        </div>
      ))}
    </div>
  );
}
