import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ScienceItem = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

const SPEED_PX_PER_SEC = 28;
const LOOP_COPIES = 3;

export function ScienceCarousel({ items }: { items: ScienceItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const hoverPausedRef = useRef(false);
  const lastPointerX = useRef(0);
  const reduceMotionRef = useRef(false);
  const loopWidthRef = useRef(0);
  const rafRef = useRef(0);

  const [active, setActive] = useState(0);

  const loop = Array.from({ length: LOOP_COPIES }, () => items).flat();

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      loopWidthRef.current = track.scrollWidth / LOOP_COPIES;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  useEffect(() => {
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!draggingRef.current && !hoverPausedRef.current && !reduceMotionRef.current) {
        offsetRef.current += SPEED_PX_PER_SEC * dt;
      }

      const loopW = loopWidthRef.current;
      if (loopW > 0) {
        offsetRef.current = ((offsetRef.current % loopW) + loopW) % loopW;
      }

      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      if (track && loopW > 0) {
        const cards = track.querySelectorAll<HTMLElement>("[data-science-card]");
        const mid = window.innerWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          const c = rect.left + rect.width / 2;
          const d = Math.abs(c - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i % items.length;
          }
        });
        setActive((prev) => (prev === best ? prev : best));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items.length]);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    offsetRef.current -= dx;
  };

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    draggingRef.current = true;
    lastPointerX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: PointerEvent<HTMLElement>) => {
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // already released
    }
  };

  return (
    <section
      className="relative overflow-hidden py-24"
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={() => {
        hoverPausedRef.current = false;
        draggingRef.current = false;
      }}
      onPointerEnter={() => {
        hoverPausedRef.current = true;
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-0 h-[420px] w-[420px] rounded-full opacity-40 blur-[100px]"
        style={{ background: "var(--gradient-brand)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/5 bottom-0 h-[380px] w-[380px] rounded-full opacity-30 blur-[110px]"
        style={{ background: "color-mix(in oklab, var(--brand) 70%, var(--brand-glow))" }}
      />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Sensor stack</p>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            Built on real animal science
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Drag to explore. Each signal is read continuously, then turned into something you can
            actually act on.
          </p>
        </div>

        <div className="mt-6 flex gap-2">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show ${item.title}`}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-500",
                i === active ? "bg-brand" : "bg-border hover:bg-muted-foreground/40",
              )}
              onClick={() => {
                const loopW = loopWidthRef.current;
                if (!loopW) return;
                const cardW = loopW / items.length;
                offsetRef.current = cardW * i;
                setActive(i);
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="relative mt-8 cursor-grab py-8 active:cursor-grabbing md:mt-10 md:py-10"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <div
          ref={trackRef}
          className="flex w-max items-stretch gap-5 px-5 will-change-transform md:gap-7 md:px-10"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {loop.map((item, i) => {
            const Icon = item.icon;
            const index = i % items.length;
            const isActive = index === active;
            const label = String(index + 1).padStart(2, "0");

            return (
              <article
                key={`${item.title}-${i}`}
                data-science-card
                className={cn(
                  "group relative w-[min(78vw,320px)] shrink-0 overflow-hidden rounded-3xl border border-border bg-card/80 p-7 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-500 md:w-[360px] md:p-8",
                  isActive
                    ? "z-10 scale-[1.02] border-brand/50 shadow-brand"
                    : "scale-[0.98] hover:border-brand/30",
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-3 font-display text-[6.5rem] leading-none text-foreground/4 select-none md:right-5 md:top-4 md:text-[8rem]"
                >
                  {label}
                </span>

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2">
                  <Icon className="h-6 w-6 text-brand" />
                </div>

                <div className="relative mt-8">
                  <h3 className="font-display text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
