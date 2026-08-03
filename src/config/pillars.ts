import { Activity, Heart, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Content config for the scroll-jacked pillar stack.
 * Edit titles, copy and dial labels here - no component changes needed.
 */

/** Icons available to pillars. Add more entries to expand the palette. */
export const pillarIcons = {
  moon: Moon,
  activity: Activity,
  heart: Heart,
} satisfies Record<string, LucideIcon>;

export type PillarIconName = keyof typeof pillarIcons;

export type PillarMetric = {
  /** Small label above the value, e.g. "Sleep stages" */
  label: string;
  /** Highlighted value, e.g. "Deep · Light · REM" */
  value: string;
};

export type PillarConfig = {
  /** Stable key used for React keys and the progress rail */
  id: string;
  /** Small uppercase eyebrow, e.g. "Rest" */
  kicker: string;
  icon: PillarIconName;
  title: string;
  /** Optional supporting sentence under the title */
  copy?: string;
  metrics: PillarMetric[];
};

export const pillars: PillarConfig[] = [
  {
    id: "rest",
    kicker: "Rest",
    icon: "moon",
    title: "Sleep that actually restores",
    metrics: [
      { label: "Sleep stages", value: "Deep · Light · REM" },
      { label: "Night restlessness", value: "-18% this week" },
      { label: "Skin temp variance", value: "+0.3°C" },
    ],
  },
  {
    id: "move",
    kicker: "Move",
    icon: "activity",
    title: "Every zoomie, counted",
    metrics: [
      { label: "Active minutes", value: "94 min" },
      { label: "Intensity zones", value: "3 of 5" },
      { label: "Daily steps", value: "12,480" },
    ],
  },
  {
    id: "watch",
    kicker: "Watch",
    icon: "heart",
    title: "Vitals, before symptoms",
    metrics: [
      { label: "Resting heart rate", value: "72 bpm" },
      { label: "Respiratory rate", value: "18 brpm" },
      { label: "Scratch & lick events", value: "6 today" },
    ],
  },
];
