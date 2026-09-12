import type { AnalyticsProps } from "./types";

function rememberedPetType(): string {
  try {
    const value = window.localStorage.getItem("furrever-last-pet-type");
    if (value === "dog" || value === "cat") return value;
  } catch {
    /* ignore */
  }
  return "unknown";
}

export function collectSuperProperties(): AnalyticsProps {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
  const utm: AnalyticsProps = {};
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }

  const width = window.innerWidth;
  const device_class = width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";

  return {
    ...utm,
    referrer: document.referrer || "direct",
    landing_path: `${window.location.pathname}${window.location.hash}`,
    device_class,
    remembered_pet_type: rememberedPetType(),
    consent: "accepted",
  };
}

export function currentPath(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname || "/";
}
