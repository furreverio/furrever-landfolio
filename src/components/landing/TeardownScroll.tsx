import { useEffect, useRef, useState, type ReactNode } from "react";
import { getAnalytics } from "@/lib/analytics";
import { rememberSurface } from "@/lib/analytics/session";

const FRAME_COUNT = 84;
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, "/");
const FRAME_PATH = (i: number) =>
  `${BASE}teardown-frames/frame-${String(i + 1).padStart(3, "0")}.jpg`;

/** Scroll length in viewport heights - longer = slower, more cinematic scrub. */
const SCROLL_VH = 5.5;
const PCB_FRAME = 50;
const MILESTONES = [25, 50, 75] as const;

function isNarrowViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
}

export function TeardownScroll({ children }: { children?: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const startedRef = useRef(false);
  const maxFrameRef = useRef(0);
  const milestonesRef = useRef(new Set<number>());
  const completedRef = useRef(false);
  const hoveredRef = useRef(new Set<string>());

  // Preload frames
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const bump = () => {
      loaded += 1;
      if (!cancelled) {
        setLoadProgress(loaded / FRAME_COUNT);
        if (loaded === FRAME_COUNT) {
          imagesRef.current = images;
          setReady(true);
        }
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = FRAME_PATH(i);
      img.onload = bump;
      img.onerror = bump;
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // Draw helpers - contain on mobile so the whole product stays visible;
  // cover on desktop for full-bleed cinematic scrub.
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const contain = isNarrowViewport();
    const scale = contain
      ? Math.min(w / img.naturalWidth, h / img.naturalHeight)
      : Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // Scroll → frame
  useEffect(() => {
    if (!ready) return;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = scrolled / Math.max(total, 1);
      const next = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(progress * (FRAME_COUNT - 1))),
      );

      if (next !== frameRef.current) {
        frameRef.current = next;
        drawFrame(next);
      }

      if (next > 1 && !startedRef.current) {
        startedRef.current = true;
        rememberSurface("collar");
        getAnalytics().track("scrub_started", { surface_id: "collar" });
      }
      if (next > maxFrameRef.current) {
        maxFrameRef.current = next;
        const pct = Math.round((next / (FRAME_COUNT - 1)) * 100);
        for (const mark of MILESTONES) {
          if (pct >= mark && !milestonesRef.current.has(mark)) {
            milestonesRef.current.add(mark);
            getAnalytics().track("scrub_progress", { max_frame: next, max_pct: mark });
          }
        }
        if (next >= FRAME_COUNT - 1 && !completedRef.current) {
          completedRef.current = true;
          getAnalytics().track("scrub_completed", {
            reached_pcb: maxFrameRef.current >= PCB_FRAME,
            max_frame: next,
          });
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    const onResize = () => {
      drawFrame(frameRef.current);
      update();
    };

    drawFrame(0);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [ready]);

  return (
    <section
      id="collar"
      className="relative scroll-mt-[calc(3rem+env(safe-area-inset-top))] bg-black"
      aria-label="Product teardown animation"
    >
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: `${SCROLL_VH * 100}vh` }}
      >
      <div className="sticky top-[calc(3rem+env(safe-area-inset-top))] flex h-[calc(100svh-3rem-env(safe-area-inset-top))] w-full flex-col overflow-hidden">
        {/* Mobile: title band above the frame so type never fights the crop */}
        <div className="relative z-20 shrink-0 px-5 pb-3 pt-5 md:absolute md:inset-x-0 md:top-0 md:z-10 md:px-10 md:pb-0 md:pt-12 md:pr-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-brand md:text-xs md:tracking-[0.3em]">
            Inside the collar
          </p>
          <h2
            className="mt-1.5 max-w-[18ch] font-hero text-[1.35rem] font-semibold uppercase leading-[1.05] text-white sm:text-2xl md:mt-3 md:max-w-[14ch] md:text-5xl md:leading-[0.95]"
            style={{ fontStretch: "72%" }}
          >
            A closer look, frame by frame
          </h2>
        </div>

        <div className="relative min-h-0 flex-1">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            aria-hidden={!ready}
          />

          <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
            {(
              [
                ["battery", "top-[34%]"],
                ["pcb", "top-[46%]"],
                ["sensor", "top-[58%]"],
              ] as const
            ).map(([label, top]) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                data-analytics-target={`teardown-${label}`}
                className={`pointer-events-auto absolute left-[6%] h-10 w-28 ${top}`}
                onMouseEnter={() => {
                  if (hoveredRef.current.has(label)) return;
                  hoveredRef.current.add(label);
                  getAnalytics().track("teardown_label_hovered", { label });
                }}
              />
            ))}
          </div>

          {!ready ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black">
              <div className="h-px w-32 overflow-hidden rounded-full bg-white/10 sm:w-40">
                <div
                  className="h-full bg-brand transition-[width] duration-200"
                  style={{ width: `${Math.round(loadProgress * 100)}%` }}
                />
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/45 sm:text-[11px]">
                Loading teardown
              </p>
            </div>
          ) : null}

          {/* Soft vignette - desktop only; mobile uses letterbox black */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-28 bg-gradient-to-b from-black/70 to-transparent md:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-36 bg-gradient-to-t from-black/80 to-transparent md:block"
          />
        </div>

        <div className="relative z-20 shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 md:absolute md:inset-x-0 md:bottom-12 md:z-10 md:pb-0 md:pt-0">
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white/50 md:text-[11px] md:tracking-[0.28em]">
            Scroll to scrub
          </p>
        </div>
      </div>
      </div>
      {children}
    </section>
  );
}
