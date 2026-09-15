import mixpanel from "mixpanel-browser";
import { analyticsDebugEnabled, analyticsLog } from "../debug";
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

export function createMixpanelAdapter(token: string, options: AdapterOptions): AnalyticsClient {
  // Override Mixpanel's img/video block. "" is an invalid CSS selector and crashes matches().
  mixpanel.init(token, {
    persistence: "localStorage",
    autocapture: true,
    ip: false,
    record_sessions_percent: options.replay ? Math.round(options.replaySample * 100) : 0,
    record_heatmap_data: options.replay,
    record_mask_all_text: false,
    record_mask_all_inputs: false,
    record_block_selector: "html:not(html)",
    record_inline_images: options.replay,
    record_canvas: options.replay,
  });
  mixpanel.identify(getAnonymousId());

  if (options.replay && analyticsDebugEnabled()) {
    mixpanel.start_session_recording();
    analyticsLog("mixpanel replay forced on (debug)", mixpanel.get_session_recording_properties());
  }

  return {
    vendorIds: ["mixpanel"],
    track<K extends AnalyticsEventName>(event: K, props: AnalyticsEventProps<K>) {
      mixpanel.track(event, parseEventProps(event, props));
    },
    page(path, props) {
      mixpanel.track("page_viewed", { path, ...flatten(props) });
    },
    identify(userId, traits?: IdentifyTraits) {
      mixpanel.identify(userId);
      if (traits) mixpanel.people.set(traits);
    },
    setSuperProperties(props) {
      mixpanel.register(flatten(props));
    },
    optIn() {
      mixpanel.opt_in_tracking();
    },
    optOut() {
      mixpanel.opt_out_tracking();
    },
    reset() {
      mixpanel.reset();
    },
    captureException() {},
  };
}
