import { createContext, useContext } from "react";
import { getAnalytics } from "./client";
import type { ConsentValue } from "./consent";
import type { AnalyticsClient } from "./types";

export const AnalyticsContext = createContext<AnalyticsClient | null>(null);

export type ConsentActions = {
  consent: ConsentValue | null;
  ready: boolean;
  accept: () => void;
  reject: () => void;
};

export const ConsentContext = createContext<ConsentActions | null>(null);

export function useAnalytics(): AnalyticsClient {
  return useContext(AnalyticsContext) ?? getAnalytics();
}

export function useConsent(): ConsentActions | null {
  return useContext(ConsentContext);
}
