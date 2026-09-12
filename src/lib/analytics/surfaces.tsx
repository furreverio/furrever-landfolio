import { useEffect, useRef, type ReactNode } from "react";
import { getAnalytics } from "./client";
import { rememberCard, rememberSurface } from "./session";

const VIEW_RATIO = 0.5;
const VIEW_MS = 800;

type ImpressionOptions = {
  onView: () => void;
  onLeave: (dwellMs: number) => void;
};

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
        if (entry.isIntersecting && entry.intersectionRatio >= VIEW_RATIO) {
          if (timer.current) window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => {
            if (viewedRef.current) return;
            viewedRef.current = true;
            enteredAt.current = Date.now();
            optionsRef.current.onView();
          }, VIEW_MS);
          return;
        }
        if (timer.current) {
          window.clearTimeout(timer.current);
          timer.current = 0;
        }
        if (viewedRef.current && enteredAt.current != null) {
          const dwell = Date.now() - enteredAt.current;
          enteredAt.current = null;
          optionsRef.current.onLeave(dwell);
        }
      },
      { threshold: [0, VIEW_RATIO, 1] },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer.current) window.clearTimeout(timer.current);
      if (viewedRef.current && enteredAt.current != null) {
        optionsRef.current.onLeave(Date.now() - enteredAt.current);
      }
    };
  }, []);

  return ref;
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
    onLeave: (dwellMs) => {
      getAnalytics().track("surface_engaged", { surface_id: id, dwell_ms: dwellMs });
    },
  });

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
