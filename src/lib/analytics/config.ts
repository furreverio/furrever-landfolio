import { VENDOR_IDS, type VendorId } from "./types";

const DEFAULT_VENDORS: readonly VendorId[] = VENDOR_IDS;
const DEFAULT_SAMPLE = 1;

function envString(value: string | undefined): string {
  return value?.trim() ?? "";
}

function processEnv(name: string): string | undefined {
  try {
    if (typeof process === "undefined") return undefined;
    return process.env[name];
  } catch {
    return undefined;
  }
}

function readEnv(viteValue: string | undefined, name: string): string {
  return envString(viteValue) || envString(processEnv(name));
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

/** Full git SHAs are shortened; any other label (e.g. `v2-hero-copy`) is kept as-is. */
function parseSiteVersion(raw: string): string {
  if (!raw) return "dev";
  return /^[0-9a-f]{40}$/i.test(raw) ? raw.slice(0, 7) : raw;
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
  siteVersion: string;
};

export function readAnalyticsConfig(): AnalyticsConfig {
  const enabled = readEnv(import.meta.env.VITE_ANALYTICS_ENABLED, "VITE_ANALYTICS_ENABLED") !== "false";
  const vendors = parseVendors(
    readEnv(import.meta.env.VITE_ANALYTICS_VENDORS, "VITE_ANALYTICS_VENDORS") || undefined,
    DEFAULT_VENDORS,
  );
  const replayVendors = parseVendors(
    readEnv(import.meta.env.VITE_ANALYTICS_REPLAY_VENDORS, "VITE_ANALYTICS_REPLAY_VENDORS") || undefined,
    vendors,
  );

  return {
    enabled,
    vendors,
    replayVendors,
    replaySample: parseSample(
      readEnv(import.meta.env.VITE_ANALYTICS_REPLAY_SAMPLE, "VITE_ANALYTICS_REPLAY_SAMPLE") || undefined,
    ),
    posthogKey: readEnv(import.meta.env.VITE_POSTHOG_KEY, "VITE_POSTHOG_KEY"),
    posthogHost:
      readEnv(import.meta.env.VITE_POSTHOG_HOST, "VITE_POSTHOG_HOST") || "https://us.i.posthog.com",
    mixpanelToken: readEnv(import.meta.env.VITE_MIXPANEL_TOKEN, "VITE_MIXPANEL_TOKEN"),
    amplitudeApiKey: readEnv(import.meta.env.VITE_AMPLITUDE_API_KEY, "VITE_AMPLITUDE_API_KEY"),
    siteVersion: parseSiteVersion(readEnv(import.meta.env.VITE_SITE_VERSION, "VITE_SITE_VERSION")),
  };
}

export function isVendorRequested(config: AnalyticsConfig, id: VendorId): boolean {
  return config.enabled && config.vendors.includes(id);
}

export function isReplayEnabled(config: AnalyticsConfig, id: VendorId): boolean {
  return isVendorRequested(config, id) && config.replayVendors.includes(id);
}
