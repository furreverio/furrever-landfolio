import type { AnalyticsClient } from "../types";

export function createNoopAdapter(): AnalyticsClient {
  return {
    vendorIds: [],
    track() {},
    page() {},
    identify() {},
    setSuperProperties() {},
    optIn() {},
    optOut() {},
    reset() {},
    captureException() {},
  };
}
