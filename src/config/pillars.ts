import { Activity, Heart, MapPin, Moon, Thermometer, Utensils } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Content config for the scroll-jacked pillar stack.
 * Edit titles, copy and dial labels here - no component changes needed.
 */

/** Icons available to pillars. Add more entries to expand the palette. */
export const pillarIcons = {
  activity: Activity,
  mapPin: MapPin,
  thermometer: Thermometer,
  heart: Heart,
  utensils: Utensils,
  moon: Moon,
} satisfies Record<string, LucideIcon>;

export type PillarIconName = keyof typeof pillarIcons;

export type PillarMetric = {
  /** Small label above the value, e.g. "Activity types" */
  label: string;
  /** Highlighted value, e.g. "Walk · Play · Rest" */
  value: string;
};

export type PillarConfig = {
  /** Stable key used for React keys and the progress rail */
  id: string;
  /** Small uppercase eyebrow, e.g. "Move" */
  kicker: string;
  icon: PillarIconName;
  title: string;
  /** Optional supporting sentence under the title */
  copy?: string;
  metrics: PillarMetric[];
};

export const pillars: PillarConfig[] = [
  {
    id: "move",
    kicker: "Move",
    icon: "activity",
    title: "Every zoomie, recognized",
    copy: "Walk, play, sprint and rest - classified automatically.",
    metrics: [
      { label: "Activity types", value: "Walk · Play · Rest" },
      { label: "Active minutes", value: "94 min" },
      { label: "Intensity zones", value: "3 of 5" },
    ],
  },
  {
    id: "locate",
    kicker: "Locate",
    icon: "mapPin",
    title: "Know where they are",
    copy: "Live GPS when it matters most - escapes, walks and check-ins.",
    metrics: [
      { label: "Live location", value: "On collar" },
      { label: "Safe zones", value: "3 set up" },
      { label: "Last seen", value: "2 min ago" },
    ],
  },
  {
    id: "temperature",
    kicker: "Body",
    icon: "thermometer",
    title: "Temperature, tracked daily",
    metrics: [
      { label: "Skin temperature", value: "38.2°C" },
      { label: "Baseline deviation", value: "+0.2°C" },
      { label: "Daily trend", value: "Stable" },
    ],
  },
  {
    id: "vitals",
    kicker: "Vitals",
    icon: "heart",
    title: "Resting signals, before symptoms",
    metrics: [
      { label: "Resting heart rate", value: "72 bpm" },
      { label: "Respiratory rate", value: "18 brpm" },
      { label: "Trend vs baseline", value: "Normal" },
    ],
  },
  {
    id: "routine",
    kicker: "Routine",
    icon: "utensils",
    title: "Eating and drinking, noticed",
    metrics: [
      { label: "Meal patterns", value: "2 regular" },
      { label: "Water visits", value: "6 today" },
      { label: "Appetite shift", value: "None flagged" },
    ],
  },
  {
    id: "rest",
    kicker: "Rest",
    icon: "moon",
    title: "Sleep, when you want the detail",
    copy: "Stage tracking for a fuller picture - not where we start.",
    metrics: [
      { label: "Sleep duration", value: "11.2 hrs" },
      { label: "Rest quality", value: "Good" },
      { label: "Night activity", value: "Low" },
    ],
  },
];
