# Analytics vendor setup

Step-by-step for creating PostHog, Mixpanel, and Amplitude projects and wiring them into this repo. Architecture and the event catalog live in [analytics.md](./analytics.md).

Do this **before** expecting live events in any dashboard. Local/dev works with zero keys (noop).

---

## 1. PostHog

1. Sign up at [posthog.com](https://posthog.com). Create organization **Furrever**.
2. New project **Furrever Web**. Pick US or EU cloud and stay on it.
3. Project Settings → copy **Project API key**.
4. Host:
   - US: `https://us.i.posthog.com`
   - EU: `https://eu.i.posthog.com`
5. Session replay: On. Sample in-app or rely on `VITE_ANALYTICS_REPLAY_SAMPLE=0.2`. Mask all inputs. Block selectors for email / phone / name.
6. Heatmaps: On (`enable_heatmaps` is set in our SDK init).
7. Autocapture: On. Surveys / webhooks: Off for v1.
8. Later: Insights → Funnel `page_viewed` → `prebook_opened` → `prebook_completed`.

Env:

```bash
VITE_POSTHOG_KEY=phc_...
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

---

## 2. Mixpanel

1. Sign up at [mixpanel.com](https://mixpanel.com). Project **Furrever Web**.
2. Project Settings → copy **Project Token**.
3. Data residency: US or EU (pick one and stay on it).
4. Autocapture: On.
5. Session replay: On. Heatmaps: On. Our SDK sets `record_heatmap_data: true`.
6. Lexicon: paste event names from [analytics.md](./analytics.md) so they match PostHog and Amplitude.
7. Build the same 3-step pre-book funnel + breakdowns by `source` and `pet_type`.

Env:

```bash
VITE_MIXPANEL_TOKEN=...
```

---

## 3. Amplitude

1. Sign up at [amplitude.com](https://amplitude.com). Org + project **Furrever Web**.
2. Copy **API Key** (not the secret key - secret is server-side; we do not use it).
3. Data residency: match the others if you care about latency comparison.
4. Autocapture: On.
5. Session Replay add-on: On if available. Heatmaps need that add-on. Without it, events still flow; replay/heatmaps stay empty.
6. Tracking Plan / Govern: add the same event names and required properties.
7. Clone the same funnel + `surface_viewed` grouped by `surface_id`.

Env:

```bash
VITE_AMPLITUDE_API_KEY=...
```

---

## 4. Local `.env`

Copy [`.env.example`](../.env.example). Never commit real keys.

```bash
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_VENDORS=posthog,mixpanel,amplitude
VITE_ANALYTICS_REPLAY_VENDORS=posthog,mixpanel,amplitude
VITE_ANALYTICS_REPLAY_SAMPLE=0.2

VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=https://us.i.posthog.com
VITE_MIXPANEL_TOKEN=
VITE_AMPLITUDE_API_KEY=
```

To run only one tool locally:

```bash
VITE_ANALYTICS_VENDORS=posthog
```

Restart `bun run dev` after changing `VITE_*`.

---

## 5. GitHub Actions (production)

Repo → Settings → Secrets and variables → Actions. Add:

| Secret | Maps to |
| --- | --- |
| `POSTHOG_KEY` | `VITE_POSTHOG_KEY` |
| `POSTHOG_HOST` | `VITE_POSTHOG_HOST` |
| `MIXPANEL_TOKEN` | `VITE_MIXPANEL_TOKEN` |
| `AMPLITUDE_API_KEY` | `VITE_AMPLITUDE_API_KEY` |

These are wired in `.github/workflows/deploy-pages.yml` on `build:pages`. Changing `VITE_ANALYTICS_VENDORS` in that workflow (or a new secret) is how you drop a vendor in production.

---

## 6. Verify after deploy

1. Open furrever.com in a private window.
2. **Before** Accept: Network tab should show no PostHog / Mixpanel / Amplitude beacons.
3. Accept the consent bar.
4. Beacons should go only to hosts in `VITE_ANALYTICS_VENDORS`.
5. Each enabled Live Events stream should show `page_viewed`.
6. Open the pre-book modal and submit a test lead. Confirm `prebook_opened` → `prebook_submitted` → `prebook_completed`. Confirm name/email/phone are **absent**.
7. Scroll the landing page. Confirm `surface_viewed` / `card_viewed` for care, collar, lifestyle, science, compare, faq, prebook.

---

## 7. After the bake-off (4–6 weeks)

Score each vendor on funnel accuracy, replay usefulness, query speed, autocapture noise, cost, and team UX.

To keep one tool:

```bash
VITE_ANALYTICS_VENDORS=posthog
```

Redeploy. Do not delete adapters until you are sure. Keep the event catalog and `AnalyticsSurface`.
