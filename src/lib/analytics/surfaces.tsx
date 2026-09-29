import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { getAnalytics } from "./client";
import type { AnalyticsEventProps } from "./events";
import { rememberCard, rememberSurface } from "./session";

const VIEW_RATIO = 0.5;
const VIEW_MS = 800;
// Fine steps so sections taller than the viewport still report when they cross half the screen.
const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

type ImpressionOptions = {
  onView: () => void;
  onLeave?: (dwellMs: number) => void;
};

type LeaveReason = AnalyticsEventProps<"surface_left">["reason"];

/** Half of the element is on screen, or it fills half the screen (sticky scroll sections are several viewports tall). */
function isVisible(entry: IntersectionObserverEntry): boolean {
  if (!entry.isIntersecting) return false;
  if (entry.intersectionRatio >= VIEW_RATIO) return true;
  const viewport = entry.rootBounds?.height ?? window.innerHeight;
  return viewport > 0 && entry.intersectionRect.height / viewport >= VIEW_RATIO;
}

export function useImpression(options: ImpressionOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);
  const enteredAt = useRef<number | null>(null);
  const timer = useRef<number>(0);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (isVisible(entry)) {
          if (!viewedRef.current && !timer.current) {
            timer.current = window.setTimeout(() => {
              timer.current = 0;
              viewedRef.current = true;
              enteredAt.current = Date.now();
              optionsRef.current.onView();
            }, VIEW_MS);
          }
          return;
        }
        if (timer.current) {
          window.clearTimeout(timer.current);
          timer.current = 0;
        }
        if (viewedRef.current && enteredAt.current != null) {
          const dwell = Date.now() - enteredAt.current;
          enteredAt.current = null;
          optionsRef.current.onLeave?.(dwell);
        }
      },
      { threshold: THRESHOLDS },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer.current) window.clearTimeout(timer.current);
      if (viewedRef.current && enteredAt.current != null) {
        optionsRef.current.onLeave?.(Date.now() - enteredAt.current);
      }
    };
  }, []);

  return ref;
}

/**
 * Fires `surface_left` for every visit of at least VIEW_MS, including the section on screen when
 * the tab is hidden or closed. Time with the tab in the background is not counted.
 */
function useSurfaceLeft(ref: RefObject<HTMLDivElement | null>, surfaceId: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let inView = false;
    let startedAt: number | null = null;
    let visit = 0;
    let newVisit = false;

    const start = () => {
      if (inView && startedAt == null && document.visibilityState === "visible") {
        startedAt = performance.now();
      }
    };

    const stop = (reason: LeaveReason) => {
      if (startedAt == null) return;
      const ms = performance.now() - startedAt;
      startedAt = null;
      if (ms < VIEW_MS) return;
      // A tab switch mid-visit splits the time across events that share one visit number.
      if (newVisit) {
        visit += 1;
        newVisit = false;
      }
      getAnalytics().track("surface_left", {
        surface_id: surfaceId,
        seconds_visible: Math.round(ms / 100) / 10,
        visit,
        reason,
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const visible = isVisible(entry);
        if (visible === inView) return;
        inView = visible;
        if (visible) {
          newVisit = true;
          start();
        } else {
          stop("scrolled");
        }
      },
      { threshold: THRESHOLDS },
    );

    const onVisibility = () => {
      if (document.visibilityState === "hidden") stop("page_hidden");
      else start();
    };
    const onPageHide = () => stop("page_hidden");

    observer.observe(el);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      stop("navigated");
    };
  }, [ref, surfaceId]);
}

export function AnalyticsSurface({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useImpression({
    onView: () => {
      rememberSurface(id);
      getAnalytics().track("surface_viewed", { surface_id: id });
    },
  });
  useSurfaceLeft(ref, id);

  return (
    <div ref={ref} className={className} data-analytics-surface={id}>
      {children}
    </div>
  );
}

export function AnalyticsCard({
  surfaceId,
  cardId,
  index,
  name,
  className,
  children,
}: {
  surfaceId: string;
  cardId: string;
  index: number;
  name: string;
  className?: string;
  children: ReactNode;
}) {
  const seen = useRef(false);
  const ref = useImpression({
    onView: () => {
      rememberSurface(surfaceId);
      rememberCard(cardId);
      getAnalytics().track("card_viewed", {
        surface_id: surfaceId,
        card_id: cardId,
        index,
        name,
      });
      seen.current = true;
    },
    onLeave: (dwellMs) => {
      getAnalytics().track("card_engaged", {
        surface_id: surfaceId,
        card_id: cardId,
        index,
        name,
        dwell_ms: dwellMs,
      });
    },
  });

  return (
    <div
      ref={ref}
      className={className}
      data-analytics-card={cardId}
      onPointerDown={() => {
        getAnalytics().track("card_clicked", {
          surface_id: surfaceId,
          card_id: cardId,
          index,
          name,
        });
      }}
    >
      {children}
    </div>
  );
}
