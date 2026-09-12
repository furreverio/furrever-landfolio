import { createNoopAdapter } from "./adapters/noop";
import { createCompositeClient } from "./composite";
import {
  isReplayEnabled,
  isVendorRequested,
  type AnalyticsConfig,
} from "./config";
import { analyticsLog, type VendorStatus } from "./debug";
import { vendorLoaders } from "./registry";
import type { AnalyticsClient, VendorId } from "./types";

function skipReason(config: AnalyticsConfig, id: VendorId, hasKey: boolean): string {
  if (!config.enabled) return "VITE_ANALYTICS_ENABLED is not true";
  if (!isVendorRequested(config, id)) return "not in VITE_ANALYTICS_VENDORS";
  if (!hasKey) return "missing env key";
  return "unknown";
}

export async function createAnalyticsClient(config: AnalyticsConfig): Promise<AnalyticsClient> {
  const statuses: VendorStatus[] = [];

  if (!config.enabled) {
    analyticsLog("boot skipped", { reason: "VITE_ANALYTICS_ENABLED is not true" });
    return createNoopAdapter();
  }

  const adapters: AnalyticsClient[] = [];

  if (isVendorRequested(config, "posthog") && config.posthogKey) {
    try {
      const { createPostHogAdapter } = await vendorLoaders.posthog();
      const replay = isReplayEnabled(config, "posthog");
      adapters.push(
        createPostHogAdapter(config.posthogKey, config.posthogHost, {
          replay,
          replaySample: config.replaySample,
        }),
      );
      statuses.push({ vendor: "posthog", state: "loaded", replay });
    } catch (error) {
      console.warn("[analytics] PostHog failed to load", error);
      statuses.push({ vendor: "posthog", state: "skipped", reason: "SDK failed to load" });
    }
  } else {
    statuses.push({
      vendor: "posthog",
      state: "skipped",
      reason: skipReason(config, "posthog", Boolean(config.posthogKey)),
    });
  }

  if (isVendorRequested(config, "mixpanel") && config.mixpanelToken) {
    try {
      const { createMixpanelAdapter } = await vendorLoaders.mixpanel();
      const replay = isReplayEnabled(config, "mixpanel");
      adapters.push(
        createMixpanelAdapter(config.mixpanelToken, {
          replay,
          replaySample: config.replaySample,
        }),
      );
      statuses.push({ vendor: "mixpanel", state: "loaded", replay });
    } catch (error) {
      console.warn("[analytics] Mixpanel failed to load", error);
      statuses.push({ vendor: "mixpanel", state: "skipped", reason: "SDK failed to load" });
    }
  } else {
    statuses.push({
      vendor: "mixpanel",
      state: "skipped",
      reason: skipReason(config, "mixpanel", Boolean(config.mixpanelToken)),
    });
  }

  if (isVendorRequested(config, "amplitude") && config.amplitudeApiKey) {
    try {
      const { createAmplitudeAdapter } = await vendorLoaders.amplitude();
      const replay = isReplayEnabled(config, "amplitude");
      adapters.push(
        createAmplitudeAdapter(config.amplitudeApiKey, {
          replay,
          replaySample: config.replaySample,
        }),
      );
      statuses.push({ vendor: "amplitude", state: "loaded", replay });
    } catch (error) {
      console.warn("[analytics] Amplitude failed to load", error);
      statuses.push({ vendor: "amplitude", state: "skipped", reason: "SDK failed to load" });
    }
  } else {
    statuses.push({
      vendor: "amplitude",
      state: "skipped",
      reason: skipReason(config, "amplitude", Boolean(config.amplitudeApiKey)),
    });
  }

  analyticsLog("boot", {
    enabled: config.enabled,
    vendors: config.vendors,
    keys: {
      posthog: Boolean(config.posthogKey),
      posthogHost: config.posthogHost || "(default US)",
      mixpanel: Boolean(config.mixpanelToken),
      amplitude: Boolean(config.amplitudeApiKey),
    },
    statuses,
  });

  if (adapters.length === 0) return createNoopAdapter();
  if (adapters.length === 1) {
    const only = adapters[0];
    return only ?? createNoopAdapter();
  }
  return createCompositeClient(adapters);
}
