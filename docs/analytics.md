# Furrever web analytics

Product analytics for [furrever.com](https://furrever.com). One typed event catalog is sent to whichever of **PostHog**, **Mixpanel**, and **Amplitude** are enabled. Components never import a vendor SDK.

Companion docs:

- [Vendor account setup](./analytics-setup.md) - create projects, copy keys, build dashboards
- Source of *what* to measure: `Website Flow Temp.docx` in the repo root

---

## Why this exists

We are baking off three tools. The north star is founding-parent conversion:

`prebook_completed` / unique `page_viewed` on `/`

Analytics should answer:

- Which pillar card should launch messaging lead with?
- Do people finish the collar teardown and notice Battery / PCB / Sensor?
- Does “Recommended by veterinarians” get attention?
- Are cat parents engaging (first cat image)?
- Which science sensors do people stop on?
- Does reaching the competitor table raise conversion?
- Is pricing or “medical device” an objection (FAQ expand, then no CTA)?
- Which CTA position converts, and which footer links leak the session?

Do not add `track()` to every button. Surfaces and decision points only.

---

## Enable or disable a service

This is the only change you should need tomorrow.

```bash
# Master switch
VITE_ANALYTICS_ENABLED=true

# Who receives events (comma-separated). Default: all three.
VITE_ANALYTICS_VENDORS=posthog,mixpanel,amplitude

# Who records sessions. Defaults to the same list as VENDORS.
VITE_ANALYTICS_REPLAY_VENDORS=posthog,mixpanel,amplitude
VITE_ANALYTICS_REPLAY_SAMPLE=0.2
```

Examples:

| Intent | Env |
| --- | --- |
| All three (today) | `VITE_ANALYTICS_VENDORS=posthog,mixpanel,amplitude` |
| PostHog only | `VITE_ANALYTICS_VENDORS=posthog` |
| Events on all, replay on PostHog | `VITE_ANALYTICS_VENDORS=posthog,mixpanel,amplitude` and `VITE_ANALYTICS_REPLAY_VENDORS=posthog` |
| Kill analytics | `VITE_ANALYTICS_ENABLED=false` |

A vendor is constructed only when **all** of these are true:

1. `VITE_ANALYTICS_ENABLED` is not `false`
2. Its id is in `VITE_ANALYTICS_VENDORS`
3. Its API key is present
4. The visitor accepted the consent bar

Missing key ≠ crash. That vendor is skipped and its SDK is not loaded.

This is a static site. Vite bakes `VITE_*` at build time, so a vendor change needs a rebuild/deploy.

Do **not** delete adapter files to turn a tool off.

---

## Architecture

Patterns: Facade, Adapter, Abstract Factory, Plugin Registry, Composite, Null Object.

```
UI / AnalyticsSurface / useAnalytics()
        │
        ▼
  Typed event catalog     (only these names compile)
        │
        ▼
  AnalyticsClient facade
        │
        ▼
  createAnalyticsClient() ← VITE_ANALYTICS_VENDORS + consent
        │
        ├── NoopAdapter          (none enabled / rejected consent)
        ├── single adapter
        └── CompositeAnalyticsClient
                ├── PostHogAdapter     (lazy import)
                ├── MixpanelAdapter    (lazy import)
                └── AmplitudeAdapter   (lazy import)
```

Public API:

- `track(event, props)` - catalog events only
- `page(path, props)`
- `identify(userId, traits)` - hashed email, never raw PII
- `setSuperProperties(props)`
- `optIn()` / `optOut()` / `reset()`

Code lives in `src/lib/analytics/`. Adding a fourth tool = one registry row + one adapter.

---

## Consent and privacy

- SDKs load **only after** Accept on the consent bar.
- Choice is stored in `localStorage` as `furrever-analytics-consent`.
- Reject → `NoopAdapter`. Pre-book still works.
- Never send name, email, or phone to any vendor. Discord remains the PII ops channel.
- On successful pre-book: `identify(sha256(email))` and traits `{ pet_type, city, accept_contact, is_founding_parent }`.
- Session replay masks inputs.

---

## Event catalog

Same payload to every enabled vendor. TypeScript fails if a component invents a name.

### Session and hero (`#top`)

| Event | When | Properties |
| --- | --- | --- |
| `page_viewed` | Route change | `path`, `title`, `referrer` |
| `session_started` | First page of a browser session | - |
| `first_interaction` | First click, scroll, or mousemove | `type`, `ms` |
| `first_click` | First click (separate from interaction) | `ms`, `target?` |
| `session_ended` | `pagehide` / tab hidden | `last_surface_id`, `last_card_id?`, `max_scroll_depth` |
| `surface_viewed` | ~50% visible for ~800ms | `surface_id` |
| `surface_engaged` | Leave after dwell | `surface_id`, `dwell_ms` (+ `max_frame` on collar) |

### Pillars (`#care`, all 6 cards)

| Event | Properties |
| --- | --- |
| `card_viewed` | `surface_id=care`, `card_id`, `index`, `name` |
| `card_engaged` | same + `dwell_ms` |
| `card_clicked` | same (pointerdown; cards are not links) |
| `card_revisited` | same + `from_index` |

Card ids: `move`, `locate`, `temperature`, `vitals`, `routine`, `rest`.

### Teardown (`#collar`)

| Event | Properties |
| --- | --- |
| `scrub_started` | `surface_id=collar` |
| `scrub_progress` | `max_frame`, `max_pct` (25 / 50 / 75 only) |
| `scrub_completed` | `reached_pcb`, `max_frame` |
| `teardown_label_hovered` | `label` (`battery` \| `pcb` \| `sensor`) |

Transparent DOM hotspots sit over Battery / PCB / Sensor so click/hover heatmaps have an element. Those labels are painted on canvas frames otherwise.

### Trust strip and scores

| Event | Properties |
| --- | --- |
| `trust_card_hovered` | `card_id` (`vets` \| `biometrics` \| `battery`) |
| `trust_card_clicked` | same (vet line has no href; still counted) |
| `score_dial_viewed` | `dial_id` (`wellness` \| `mood` \| `heartbeat`) |
| `score_dial_engaged` | same + `dwell_ms` |

### Lifestyle (`#lifestyle`)

| Event | Properties |
| --- | --- |
| `lifestyle_card_viewed` | `card_id` (`activity` \| `find_them`), `pet_hint` (`dog` \| `cat`) |
| `lifestyle_card_engaged` | same + `dwell_ms` |
| `lifestyle_card_clicked` | same |

### Science (`#science`)

| Event | Properties |
| --- | --- |
| `science_swiped` | `swipe_count` |
| `science_panel_focused` | `panel_id`, `index` |
| `science_session_summary` | `swipe_count`, `max_cards_seen`, `last_panel` (on leave) |

### Compare (`#compare`)

`surface_viewed` / `surface_engaged` only. Row hover is a heatmap. Reach → convert is a dashboard funnel.

### FAQ (`#faq`)

| Event | Properties |
| --- | --- |
| `faq_expanded` | `question_id` (`pricing`, `medical_device`, or slug) |

### Pre-book

| Event | Properties |
| --- | --- |
| `prebook_opened` | `source` (`header` \| `hero` \| `footer` \| `about` \| `hash` \| `join_section`), `pet_type?` |
| `pet_type_selected` | `pet_type`, `source` |
| `prebook_validation_failed` | `fields[]` |
| `prebook_submitted` | `pet_type`, `city`, `accept_contact` - no PII |
| `prebook_completed` | - |
| `prebook_notify_failed` | `reason` |

Fired once inside `openPrebook`. Buttons only pass `source`.

### Footer and outbound

| Event | Properties |
| --- | --- |
| `footer_link_clicked` | `target` (`privacy`, `refunds`, `about`, `contact`, `account_deletion`, `terms`, `home`, `prebook`) |
| `outbound_clicked` | `kind` (`mailto` \| `tel` \| `maps` \| `address`), `page` |
| `legal_viewed` | `doc` |

### Reliability

| Event | Properties |
| --- | --- |
| `not_found` | `path` |
| `page_error` | `route`, `message` (PostHog also gets `captureException`) |

### Super properties

Attached to every event: `utm_*`, `referrer`, `landing_path`, `device_class`, `remembered_pet_type`, `consent`.

---

## What is shared vs vendor-specific

**Same on every enabled vendor**

- Full catalog above
- Autocapture (dashboard toggle)
- Session replay at `VITE_ANALYTICS_REPLAY_SAMPLE` (mask inputs)
- Click + scroll heatmaps

**PostHog only**

- Mouse-movement / hover heatmap
- Exception stacks
- Feature flags / surveys (unused)

Amplitude replay and heatmaps stay empty until the Session Replay add-on is purchased. Events still flow.

---

## Dashboards to build in each UI

Same definitions in PostHog, Mixpanel, and Amplitude:

1. Funnel: `page_viewed(/)` → `prebook_opened` → `prebook_completed`, broken by `source`
2. Pillars: dwell by `card_id`, last card before drop-off, revisit rate
3. FAQ: expands, then expand → `prebook_opened` (pricing and medical_device first)
4. Compare: users who `surface_viewed(compare)` vs not, then convert
5. Lifestyle: cat-card dwell vs dog-card dwell
6. Scores: dwell by dial
7. Health: `prebook_notify_failed`, `page_error`, consent accept vs reject

---

## How to add a new event

1. Add the name and Zod props in `src/lib/analytics/events.ts`.
2. Call `analytics.track("your_event", { ... })` or wrap a surface with `AnalyticsSurface`.
3. Do not import PostHog / Mixpanel / Amplitude from a component.

---

## How to add a fourth vendor

1. New adapter in `src/lib/analytics/adapters/` implementing `AnalyticsClient`.
2. One row in `src/lib/analytics/registry.ts`.
3. Env key + add the id to `VITE_ANALYTICS_VENDORS`.

No component changes.
