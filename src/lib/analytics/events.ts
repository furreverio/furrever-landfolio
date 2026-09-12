import { z } from "zod";

export const analyticsEvents = {
  page_viewed: z.object({
    path: z.string(),
    title: z.string(),
    referrer: z.string(),
  }),
  session_started: z.object({}),
  first_interaction: z.object({
    type: z.enum(["click", "scroll", "mousemove"]),
    ms: z.number(),
  }),
  first_click: z.object({
    ms: z.number(),
    target: z.string().optional(),
  }),
  session_ended: z.object({
    last_surface_id: z.string(),
    last_card_id: z.string().optional(),
    max_scroll_depth: z.number(),
  }),
  surface_viewed: z.object({
    surface_id: z.string(),
  }),
  surface_engaged: z.object({
    surface_id: z.string(),
    dwell_ms: z.number(),
    max_frame: z.number().optional(),
  }),
  card_viewed: z.object({
    surface_id: z.string(),
    card_id: z.string(),
    index: z.number(),
    name: z.string(),
  }),
  card_engaged: z.object({
    surface_id: z.string(),
    card_id: z.string(),
    index: z.number(),
    name: z.string(),
    dwell_ms: z.number(),
  }),
  card_clicked: z.object({
    surface_id: z.string(),
    card_id: z.string(),
    index: z.number(),
    name: z.string(),
  }),
  card_revisited: z.object({
    surface_id: z.string(),
    card_id: z.string(),
    index: z.number(),
    name: z.string(),
    from_index: z.number(),
  }),
  scrub_started: z.object({
    surface_id: z.literal("collar"),
  }),
  scrub_progress: z.object({
    max_frame: z.number(),
    max_pct: z.number(),
  }),
  scrub_completed: z.object({
    reached_pcb: z.boolean(),
    max_frame: z.number(),
  }),
  teardown_label_hovered: z.object({
    label: z.enum(["battery", "pcb", "sensor"]),
  }),
  trust_card_hovered: z.object({
    card_id: z.enum(["vets", "biometrics", "battery"]),
  }),
  trust_card_clicked: z.object({
    card_id: z.enum(["vets", "biometrics", "battery"]),
  }),
  score_dial_viewed: z.object({
    dial_id: z.enum(["wellness", "mood", "heartbeat"]),
  }),
  score_dial_engaged: z.object({
    dial_id: z.enum(["wellness", "mood", "heartbeat"]),
    dwell_ms: z.number(),
  }),
  lifestyle_card_viewed: z.object({
    card_id: z.enum(["activity", "find_them"]),
    pet_hint: z.enum(["dog", "cat"]),
  }),
  lifestyle_card_engaged: z.object({
    card_id: z.enum(["activity", "find_them"]),
    pet_hint: z.enum(["dog", "cat"]),
    dwell_ms: z.number(),
  }),
  lifestyle_card_clicked: z.object({
    card_id: z.enum(["activity", "find_them"]),
    pet_hint: z.enum(["dog", "cat"]),
  }),
  science_swiped: z.object({
    swipe_count: z.number(),
  }),
  science_panel_focused: z.object({
    panel_id: z.string(),
    index: z.number(),
  }),
  science_session_summary: z.object({
    swipe_count: z.number(),
    max_cards_seen: z.number(),
    last_panel: z.string(),
  }),
  faq_expanded: z.object({
    question_id: z.string(),
  }),
  prebook_opened: z.object({
    source: z.enum(["header", "hero", "footer", "about", "hash", "join_section"]),
    pet_type: z.enum(["dog", "cat"]).optional(),
  }),
  pet_type_selected: z.object({
    pet_type: z.enum(["dog", "cat"]),
    source: z.string(),
  }),
  prebook_validation_failed: z.object({
    fields: z.array(z.string()),
  }),
  prebook_submitted: z.object({
    pet_type: z.enum(["dog", "cat"]),
    city: z.string(),
    accept_contact: z.boolean(),
  }),
  prebook_completed: z.object({}),
  prebook_notify_failed: z.object({
    reason: z.string(),
  }),
  footer_link_clicked: z.object({
    target: z.enum([
      "privacy",
      "refunds",
      "about",
      "contact",
      "account_deletion",
      "terms",
      "home",
      "prebook",
    ]),
  }),
  outbound_clicked: z.object({
    kind: z.enum(["mailto", "tel", "maps", "address"]),
    page: z.string(),
  }),
  legal_viewed: z.object({
    doc: z.string(),
  }),
  not_found: z.object({
    path: z.string(),
  }),
  page_error: z.object({
    route: z.string(),
    message: z.string(),
  }),
} as const;

export type AnalyticsEventName = keyof typeof analyticsEvents;
export type AnalyticsEventProps<K extends AnalyticsEventName> = z.infer<(typeof analyticsEvents)[K]>;

export function parseEventProps<K extends AnalyticsEventName>(
  event: K,
  props: AnalyticsEventProps<K>,
): AnalyticsEventProps<K> {
  if (!import.meta.env.DEV) return props;
  const schema = analyticsEvents[event];
  return schema.parse(props) as AnalyticsEventProps<K>;
}

export const legalDocsByPath: Record<string, string> = {
  "/privacy": "privacy",
  "/terms": "terms",
  "/refunds": "refunds",
  "/account-deletion": "account_deletion",
};

export function faqQuestionId(question: string): string {
  if (question.includes("How much does Furrever cost")) return "pricing";
  if (question.includes("Is Furrever a medical device")) return "medical_device";
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}
