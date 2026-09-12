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
