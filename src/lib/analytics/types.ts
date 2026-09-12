import type { AnalyticsEventName, AnalyticsEventProps } from "./events";

export const VENDOR_IDS = ["posthog", "mixpanel", "amplitude"] as const;
export type VendorId = (typeof VENDOR_IDS)[number];

export type AnalyticsPrimitive = string | number | boolean | null;
export type AnalyticsProps = Record<string, AnalyticsPrimitive | AnalyticsPrimitive[]>;

export type PrebookSource = "header" | "hero" | "footer" | "about" | "hash" | "join_section";

export type IdentifyTraits = {
  pet_type?: "dog" | "cat";
  city?: string;
  accept_contact?: boolean;
  is_founding_parent?: boolean;
};

export type AnalyticsClient = {
  readonly vendorIds: readonly VendorId[];
  track<K extends AnalyticsEventName>(event: K, props: AnalyticsEventProps<K>): void;
  page(path: string, props?: AnalyticsProps): void;
  identify(userId: string, traits?: IdentifyTraits): void;
  setSuperProperties(props: AnalyticsProps): void;
  optIn(): void;
  optOut(): void;
  reset(): void;
  captureException(error: unknown, context?: AnalyticsProps): void;
};

export type AdapterOptions = {
  replay: boolean;
  replaySample: number;
};
