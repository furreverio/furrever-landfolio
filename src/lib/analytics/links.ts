import { getAnalytics } from "./client";
import { currentPath } from "./properties";
import type { AnalyticsEventProps } from "./events";

export function trackFooterLink(target: AnalyticsEventProps<"footer_link_clicked">["target"]) {
  getAnalytics().track("footer_link_clicked", { target });
}

export function trackOutbound(kind: AnalyticsEventProps<"outbound_clicked">["kind"]) {
  getAnalytics().track("outbound_clicked", { kind, page: currentPath() });
}
