import type { VendorId } from "./types";

export const vendorLoaders = {
  posthog: () => import("./adapters/posthog"),
  mixpanel: () => import("./adapters/mixpanel"),
  amplitude: () => import("./adapters/amplitude"),
} as const satisfies Record<VendorId, () => Promise<unknown>>;
