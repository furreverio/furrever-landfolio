import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import { parseEventProps, type AnalyticsEventName, type AnalyticsEventProps } from "../events";
import { getAnonymousId } from "../identity";
import type { AdapterOptions, AnalyticsClient, AnalyticsProps, IdentifyTraits } from "../types";

function flatten(props?: AnalyticsProps): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!props) return out;
  for (const [key, value] of Object.entries(props)) {
    out[key] = value;
  }
  return out;
}

export function createAmplitudeAdapter(apiKey: string, options: AdapterOptions): AnalyticsClient {
  if (options.replay) {
    amplitude.add(
      sessionReplayPlugin({
        sampleRate: options.replaySample,
        privacyConfig: {
          defaultMaskLevel: "light",
        },
      }),
    );
  }

  amplitude.init(apiKey, getAnonymousId(), {
    autocapture: true,
    defaultTracking: {
      pageViews: false,
      sessions: true,
      formInteractions: true,
      fileDownloads: false,
    },
  });

  return {
    vendorIds: ["amplitude"],
    track<K extends AnalyticsEventName>(event: K, props: AnalyticsEventProps<K>) {
      amplitude.track(event, parseEventProps(event, props));
    },
    page(path, props) {
      amplitude.track("page_viewed", { path, ...flatten(props) });
    },
    identify(userId, traits?: IdentifyTraits) {
      amplitude.setUserId(userId);
      if (traits) {
        const identify = new amplitude.Identify();
        for (const [key, value] of Object.entries(traits)) {
          if (value !== undefined) identify.set(key, value);
        }
        amplitude.identify(identify);
      }
    },
    setSuperProperties(props) {
      amplitude.setGroup("site", "furrever.com");
      const identify = new amplitude.Identify();
      for (const [key, value] of Object.entries(flatten(props))) {
        if (value != null) identify.set(key, value as string | number | boolean);
      }
      amplitude.identify(identify);
    },
    optIn() {
      void amplitude.setOptOut(false);
    },
    optOut() {
      void amplitude.setOptOut(true);
    },
    reset() {
      amplitude.reset();
    },
    captureException() {},
  };
}
