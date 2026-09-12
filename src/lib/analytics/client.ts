import { createNoopAdapter } from "./adapters/noop";
import type { AnalyticsClient } from "./types";

let client: AnalyticsClient = createNoopAdapter();

export function getAnalytics(): AnalyticsClient {
  return client;
}

export function setAnalyticsClient(next: AnalyticsClient) {
  client = next;
}
