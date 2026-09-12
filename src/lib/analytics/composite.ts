import type { AnalyticsEventName, AnalyticsEventProps } from "./events";
import type { AnalyticsClient, AnalyticsProps, IdentifyTraits, VendorId } from "./types";

function isolate(label: string, fn: () => void) {
  try {
    fn();
  } catch (error) {
    console.warn(`[analytics] ${label} failed`, error);
  }
}

export function createCompositeClient(adapters: AnalyticsClient[]): AnalyticsClient {
  const vendorIds = adapters.flatMap((adapter) => adapter.vendorIds) as VendorId[];

  return {
    vendorIds,
    track<K extends AnalyticsEventName>(event: K, props: AnalyticsEventProps<K>) {
      for (const adapter of adapters) {
        isolate(adapter.vendorIds.join(",") || "unknown", () => adapter.track(event, props));
      }
    },
    page(path, props) {
      for (const adapter of adapters) {
        isolate("page", () => adapter.page(path, props));
      }
    },
    identify(userId, traits?: IdentifyTraits) {
      for (const adapter of adapters) {
        isolate("identify", () => adapter.identify(userId, traits));
      }
    },
    setSuperProperties(props: AnalyticsProps) {
      for (const adapter of adapters) {
        isolate("super", () => adapter.setSuperProperties(props));
      }
    },
    optIn() {
      for (const adapter of adapters) isolate("optIn", () => adapter.optIn());
    },
    optOut() {
      for (const adapter of adapters) isolate("optOut", () => adapter.optOut());
    },
    reset() {
      for (const adapter of adapters) isolate("reset", () => adapter.reset());
    },
    captureException(error, context) {
      for (const adapter of adapters) {
        isolate("exception", () => adapter.captureException(error, context));
      }
    },
  };
}
