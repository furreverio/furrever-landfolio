import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { createNoopAdapter } from "./adapters/noop";
import { setAnalyticsClient } from "./client";
import { readAnalyticsConfig } from "./config";
import { analyticsLog, wrapClientWithDebug } from "./debug";
import { isAnalyticsAllowed, readConsent, resolveConsent, writeConsent, type ConsentValue } from "./consent";
import { ConsentChip } from "./consent-bar";
import { AnalyticsContext, ConsentContext } from "./context";
import { legalDocsByPath } from "./events";
import { createAnalyticsClient } from "./factory";
import { collectSuperProperties } from "./properties";
import {
  clickTargetName,
  consumeFirstClick,
  consumeFirstInteraction,
  consumeSessionEnded,
  markSessionStarted,
  sessionSnapshot,
  updateScrollDepth,
} from "./session";
import type { AnalyticsClient } from "./types";

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<AnalyticsClient>(() => createNoopAdapter());
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const next = resolveConsent(readConsent());
    writeConsent(next);
    setConsent(next);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!isAnalyticsAllowed(consent)) {
      analyticsLog("idle", { consent, hint: "user chose No" });
      const noop = createNoopAdapter();
      setAnalyticsClient(noop);
      setClient(noop);
      setReady(true);
      return;
    }

    let cancelled = false;
    const config = readAnalyticsConfig();
    void createAnalyticsClient(config).then((next) => {
      if (cancelled) return;
      const wrapped = wrapClientWithDebug(next);
      wrapped.optIn();
      wrapped.setSuperProperties(collectSuperProperties());
      setAnalyticsClient(wrapped);
      setClient(wrapped);
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [consent, hydrated]);

  useEffect(() => {
    if (!ready || !isAnalyticsAllowed(consent)) return;

    if (markSessionStarted()) {
      client.track("session_started", {});
    }

    client.track("page_viewed", {
      path: pathname,
      title: typeof document === "undefined" ? pathname : document.title,
      referrer: typeof document === "undefined" ? "direct" : document.referrer || "direct",
    });

    const doc = legalDocsByPath[pathname];
    if (doc) client.track("legal_viewed", { doc });
  }, [ready, consent, pathname, client]);

  useEffect(() => {
    if (!ready || !isAnalyticsAllowed(consent)) return;

    const started = performance.now();

    const onFirst = (type: "click" | "scroll" | "mousemove", event?: Event) => {
      const ms = Math.round(performance.now() - started);
      if (consumeFirstInteraction()) {
        client.track("first_interaction", { type, ms });
      }
      if (type === "click" && consumeFirstClick()) {
        const target = event ? clickTargetName(event) : undefined;
        const props = target ? { ms, target } : { ms };
        client.track("first_click", props);
      }
    };

    const onClick = (event: Event) => onFirst("click", event);
    const onScroll = () => {
      updateScrollDepth();
      onFirst("scroll");
    };
    const onMove = () => onFirst("mousemove");
    const onEnd = () => {
      if (!consumeSessionEnded()) return;
      updateScrollDepth();
      client.track("session_ended", sessionSnapshot());
    };

    window.addEventListener("click", onClick, { capture: true, passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true, once: true });
    window.addEventListener("pagehide", onEnd);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") onEnd();
    });

    return () => {
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pagehide", onEnd);
    };
  }, [ready, consent, client]);

  const accept = () => {
    writeConsent("accepted");
    setConsent("accepted");
    setReady(false);
  };

  const reject = () => {
    writeConsent("rejected");
    setConsent("rejected");
    client.optOut();
    const noop = createNoopAdapter();
    setAnalyticsClient(noop);
    setClient(noop);
  };

  return (
    <AnalyticsContext.Provider value={client}>
      <ConsentContext.Provider
        value={{
          consent,
          ready: hydrated,
          accept,
          reject,
        }}
      >
        {children}
        <ConsentChip />
      </ConsentContext.Provider>
    </AnalyticsContext.Provider>
  );
}
