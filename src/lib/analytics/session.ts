export type SessionSnapshot = {
  last_surface_id: string;
  last_card_id?: string;
  max_scroll_depth: number;
};

const SESSION_FLAG = "furrever-analytics-session";

let lastSurfaceId = "hero";
let lastCardId: string | undefined;
let maxScrollDepth = 0;
let firstInteractionFired = false;
let firstClickFired = false;
let sessionEndedFired = false;

export function markSessionStarted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.sessionStorage.getItem(SESSION_FLAG)) return false;
    window.sessionStorage.setItem(SESSION_FLAG, "1");
    return true;
  } catch {
    return true;
  }
}

export function rememberSurface(surfaceId: string) {
  lastSurfaceId = surfaceId;
}

export function rememberCard(cardId: string) {
  lastCardId = cardId;
}

export function updateScrollDepth() {
  if (typeof window === "undefined") return;
  const doc = document.documentElement;
  const total = Math.max(doc.scrollHeight - window.innerHeight, 1);
  const depth = Math.min(100, Math.round((window.scrollY / total) * 100));
  if (depth > maxScrollDepth) maxScrollDepth = depth;
}

export function consumeFirstInteraction(): boolean {
  if (firstInteractionFired) return false;
  firstInteractionFired = true;
  return true;
}

export function consumeFirstClick(): boolean {
  if (firstClickFired) return false;
  firstClickFired = true;
  return true;
}

export function consumeSessionEnded(): boolean {
  if (sessionEndedFired) return false;
  sessionEndedFired = true;
  return true;
}

export function sessionSnapshot(): SessionSnapshot {
  const snap: SessionSnapshot = {
    last_surface_id: lastSurfaceId,
    max_scroll_depth: maxScrollDepth,
  };
  if (lastCardId) snap.last_card_id = lastCardId;
  return snap;
}

export function clickTargetName(event: Event): string | undefined {
  const el = event.target;
  if (!(el instanceof Element)) return undefined;
  const named =
    el.closest("[data-analytics-target]")?.getAttribute("data-analytics-target") ??
    el.closest("button, a")?.textContent?.trim();
  if (!named) return undefined;
  return named.slice(0, 80);
}
