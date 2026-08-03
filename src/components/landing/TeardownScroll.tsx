import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 84;
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, "/");
const FRAME_PATH = (i: number) =>
  `${BASE}teardown-frames/frame-${String(i + 1).padStart(3, "0")}.jpg`;

/** Scroll length in viewport heights — longer = slower, more cinematic scrub. */
const SCROLL_VH = 5.5;

export function TeardownScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

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

  // Draw helpers
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

    // Cover-fit
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;

    ctx.clearRect(0, 0, w, h);
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
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${SCROLL_VH * 100}vh` }}
      aria-label="Product teardown animation"
    >
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        <div className="relative h-full w-full">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            aria-hidden={!ready}
          />

          {!ready ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black">
              <div className="h-px w-40 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-brand transition-[width] duration-200"
                  style={{ width: `${Math.round(loadProgress * 100)}%` }}
                />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
                Loading teardown
              </p>
            </div>
          ) : null}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 to-transparent"
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pr-10 pt-8 md:px-10 md:pr-16 md:pt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand md:text-xs">
              Inside the collar
            </p>
            <h2
              className="mt-3 max-w-[16ch] font-hero text-3xl font-semibold uppercase leading-[0.95] text-white md:max-w-[14ch] md:text-5xl"
              style={{ fontStretch: "72%" }}
            >
              A closer look, frame by frame
            </h2>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center px-5 md:bottom-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/50">
              Scroll to scrub
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
