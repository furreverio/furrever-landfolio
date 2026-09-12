import { createNoopAdapter } from "./adapters/noop";
import { createCompositeClient } from "./composite";
import {
  isReplayEnabled,
  isVendorRequested,
  type AnalyticsConfig,
} from "./config";
import { vendorLoaders } from "./registry";
import type { AnalyticsClient } from "./types";

export async function createAnalyticsClient(config: AnalyticsConfig): Promise<AnalyticsClient> {
  if (!config.enabled) return createNoopAdapter();

  const adapters: AnalyticsClient[] = [];

  if (isVendorRequested(config, "posthog") && config.posthogKey) {
    try {
      const { createPostHogAdapter } = await vendorLoaders.posthog();
      adapters.push(
        createPostHogAdapter(config.posthogKey, config.posthogHost, {
          replay: isReplayEnabled(config, "posthog"),
          replaySample: config.replaySample,
        }),
      );
    } catch (error) {
      console.warn("[analytics] PostHog failed to load", error);
    }
  }

  if (isVendorRequested(config, "mixpanel") && config.mixpanelToken) {
    try {
      const { createMixpanelAdapter } = await vendorLoaders.mixpanel();
      adapters.push(
        createMixpanelAdapter(config.mixpanelToken, {
          replay: isReplayEnabled(config, "mixpanel"),
          replaySample: config.replaySample,
        }),
      );
    } catch (error) {
      console.warn("[analytics] Mixpanel failed to load", error);
    }
  }

  if (isVendorRequested(config, "amplitude") && config.amplitudeApiKey) {
    try {
      const { createAmplitudeAdapter } = await vendorLoaders.amplitude();
      adapters.push(
        createAmplitudeAdapter(config.amplitudeApiKey, {
          replay: isReplayEnabled(config, "amplitude"),
          replaySample: config.replaySample,
        }),
      );
    } catch (error) {
      console.warn("[analytics] Amplitude failed to load", error);
    }
  }

  if (adapters.length === 0) return createNoopAdapter();
  if (adapters.length === 1) {
    const only = adapters[0];
    return only ?? createNoopAdapter();
  }
  return createCompositeClient(adapters);
}
