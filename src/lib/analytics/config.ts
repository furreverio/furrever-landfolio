import { VENDOR_IDS, type VendorId } from "./types";

const DEFAULT_VENDORS: readonly VendorId[] = VENDOR_IDS;
const DEFAULT_SAMPLE = 0.2;

function envString(value: string | undefined): string {
  return value?.trim() ?? "";
}

function parseVendors(raw: string | undefined, fallback: readonly VendorId[]): VendorId[] {
  if (raw == null || raw.trim() === "") return [...fallback];
  const seen = new Set<VendorId>();
  for (const part of raw.split(",")) {
    const id = part.trim();
    if ((VENDOR_IDS as readonly string[]).includes(id)) {
      seen.add(id as VendorId);
    }
  }
  return [...seen];
}

function parseSample(raw: string | undefined): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return DEFAULT_SAMPLE;
  return Math.min(1, Math.max(0, n));
}

export type AnalyticsConfig = {
  enabled: boolean;
  vendors: VendorId[];
  replayVendors: VendorId[];
  replaySample: number;
  posthogKey: string;
  posthogHost: string;
  mixpanelToken: string;
  amplitudeApiKey: string;
};

export function readAnalyticsConfig(): AnalyticsConfig {
  const enabled = envString(import.meta.env.VITE_ANALYTICS_ENABLED) !== "false";
  const vendors = parseVendors(import.meta.env.VITE_ANALYTICS_VENDORS, DEFAULT_VENDORS);
  const replayVendors = parseVendors(import.meta.env.VITE_ANALYTICS_REPLAY_VENDORS, vendors);

  return {
    enabled,
    vendors,
    replayVendors,
    replaySample: parseSample(import.meta.env.VITE_ANALYTICS_REPLAY_SAMPLE),
    posthogKey: envString(import.meta.env.VITE_POSTHOG_KEY),
    posthogHost: envString(import.meta.env.VITE_POSTHOG_HOST) || "https://us.i.posthog.com",
    mixpanelToken: envString(import.meta.env.VITE_MIXPANEL_TOKEN),
    amplitudeApiKey: envString(import.meta.env.VITE_AMPLITUDE_API_KEY),
  };
}

export function isVendorRequested(config: AnalyticsConfig, id: VendorId): boolean {
  return config.enabled && config.vendors.includes(id);
}

export function isReplayEnabled(config: AnalyticsConfig, id: VendorId): boolean {
  return isVendorRequested(config, id) && config.replayVendors.includes(id);
}
