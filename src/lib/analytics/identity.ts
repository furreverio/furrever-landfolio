const ANON_KEY = "furrever-anon-id";

export function getAnonymousId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    const existing = window.localStorage.getItem(ANON_KEY);
    if (existing) return existing;
    const id = window.crypto.randomUUID();
    window.localStorage.setItem(ANON_KEY, id);
    return id;
  } catch {
    return "anonymous";
  }
}

export async function hashEmail(email: string): Promise<string> {
  const data = new TextEncoder().encode(email.trim().toLowerCase());
  const buf = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}
