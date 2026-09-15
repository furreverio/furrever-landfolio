import posthog from "posthog-js";
import { parseEventProps, type AnalyticsEventName, type AnalyticsEventProps } from "../events";
import { getAnonymousId } from "../identity";
import type { AdapterOptions, AnalyticsClient, AnalyticsProps, IdentifyTraits } from "../types";

function flatten(props?: AnalyticsProps): Record<string, string | number | boolean | null> {
  const out: Record<string, string | number | boolean | null> = {};
  if (!props) return out;
  for (const [key, value] of Object.entries(props)) {
    if (Array.isArray(value)) {
      out[key] = value.map(String).join(",");
    } else {
      out[key] = value;
    }
  }
  return out;
}

export function createPostHogAdapter(
  key: string,
  host: string,
  options: AdapterOptions,
): AnalyticsClient {
  posthog.init(key, {
    api_host: host,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    persistence: "localStorage+cookie",
    disable_session_recording: !options.replay,
    enable_heatmaps: true,
    session_recording: {
      maskAllInputs: false,
      sampleRate: options.replay ? options.replaySample : 0,
    },
    loaded(client) {
      client.register({ distinct_id: getAnonymousId() });
      if (options.replay) {
        // true = ignore SDK/project sampling so this session is actually recorded
        client.startSessionRecording(true);
      }
    },
  });

  return {
    vendorIds: ["posthog"],
    track<K extends AnalyticsEventName>(event: K, props: AnalyticsEventProps<K>) {
      posthog.capture(event, parseEventProps(event, props));
    },
    page(path, props) {
      posthog.capture("$pageview", { $current_url: path, ...flatten(props) });
    },
    identify(userId, traits?: IdentifyTraits) {
      posthog.identify(userId, traits);
    },
    setSuperProperties(props) {
      posthog.register(flatten(props));
    },
    optIn() {
      posthog.opt_in_capturing();
    },
    optOut() {
      posthog.opt_out_capturing();
    },
    reset() {
      posthog.reset();
    },
    captureException(error, context) {
      if (error instanceof Error) {
        posthog.captureException(error, flatten(context));
        return;
      }
      posthog.capture("exception", { message: String(error), ...flatten(context) });
    },
  };
}
