import { readAnalyticsConfig } from "./config";
import type { AnalyticsClient, VendorId } from "./types";

export function analyticsDebugEnabled(): boolean {
  if (import.meta.env.VITE_ANALYTICS_DEBUG === "true") return true;
  if (import.meta.env.DEV) return true;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return true;
  }
  return false;
}

export function analyticsLog(message: string, extra?: unknown) {
  if (!analyticsDebugEnabled()) return;
  if (extra !== undefined) {
    console.log(`[analytics] ${message}`, extra);
    return;
  }
  console.log(`[analytics] ${message}`);
}

function describeKeys() {
  const config = readAnalyticsConfig();
  return {
    enabled: config.enabled,
    vendors: config.vendors.join(",") || "(none)",
    posthog: config.posthogKey ? "yes" : "NO",
    posthogHost: config.posthogHost || "(default US)",
    mixpanel: config.mixpanelToken ? "yes" : "NO",
    amplitude: config.amplitudeApiKey ? "yes" : "NO",
  };
}

if (analyticsDebugEnabled()) {
  if (typeof window === "undefined") {
    console.log(
      "[analytics] Server boot. Vendor keys and click events log in the browser: Inspect → Console.",
    );
  } else {
    const keys = describeKeys();
    console.log(
      `[analytics] env enabled=${keys.enabled} vendors=${keys.vendors} posthog=${keys.posthog} mixpanel=${keys.mixpanel} amplitude=${keys.amplitude} host=${keys.posthogHost}`,
    );
  }
}

export function wrapClientWithDebug(client: AnalyticsClient): AnalyticsClient {
  if (!analyticsDebugEnabled()) return client;

  const targets = client.vendorIds.join(", ") || "none";

  return {
    vendorIds: client.vendorIds,
    track(event, props) {
      analyticsLog(`track ${event} → ${targets}`, props);
      client.track(event, props);
    },
    page(path, props) {
      analyticsLog(`page ${path} → ${targets}`, props);
      client.page(path, props);
    },
    identify(userId, traits) {
      analyticsLog(`identify → ${targets}`, { userId, traits });
      client.identify(userId, traits);
    },
    setSuperProperties(props) {
      analyticsLog(`super → ${targets}`, props);
      client.setSuperProperties(props);
    },
    optIn() {
      analyticsLog(`optIn → ${targets}`);
      client.optIn();
    },
    optOut() {
      analyticsLog(`optOut → ${targets}`);
      client.optOut();
    },
    reset() {
      analyticsLog(`reset → ${targets}`);
      client.reset();
    },
    captureException(error, context) {
      analyticsLog(`exception → ${targets}`, context);
      client.captureException(error, context);
    },
  };
}

export type VendorStatus = {
  vendor: VendorId;
  state: "loaded" | "skipped";
  reason?: string;
  replay?: boolean;
};
