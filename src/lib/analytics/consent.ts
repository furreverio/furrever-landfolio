export type ConsentValue = "accepted" | "rejected";

const CONSENT_KEY = "furrever-analytics-consent";

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    if (value === "accepted" || value === "rejected") return value;
  } catch {
    /* ignore */
  }
  return null;
}

/** Unset means on. Only an explicit No opts out. */
export function isAnalyticsAllowed(consent: ConsentValue | null): boolean {
  return consent !== "rejected";
}

export function resolveConsent(stored: ConsentValue | null): ConsentValue {
  return stored === "rejected" ? "rejected" : "accepted";
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
}

const INTERNAL_KEY = "furrever-internal";

/** `?internal=1` marks this browser as team traffic until `?internal=0`. */
export function resolveInternalFlag(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const param = new URLSearchParams(window.location.search).get("internal");
    if (param === "1") window.localStorage.setItem(INTERNAL_KEY, "1");
    if (param === "0") window.localStorage.removeItem(INTERNAL_KEY);
    return window.localStorage.getItem(INTERNAL_KEY) === "1";
  } catch {
    return false;
  }
}
