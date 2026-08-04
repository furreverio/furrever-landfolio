# Furrever

Landing site for the Furrever smart pet collar - pre-book form, product story, privacy & terms.

Live: [furrever.io](https://furrever.io)

## Development

Requires [Bun](https://bun.sh) (or Node + npm).

```sh
bun install
bun run dev
```

Other scripts:

| Command | Description |
|---|---|
| `bun run build` | Production build |
| `bun run build:pages` | Static export for GitHub Pages |
| `bun run preview` | Preview production build |
| `bun run lint` | ESLint |
| `bun run format` | Prettier |

## Pre-book → Discord

Form submissions post an embed to a Discord channel webhook.

1. Discord → channel → **Integrations → Webhooks → New Webhook** → copy URL
2. Copy env file and set the URL:

```sh
cp .env.example .env
```

```env
VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/ID/TOKEN
```

3. For production, add a GitHub Actions secret named `DISCORD_WEBHOOK_URL` (repo → **Settings → Secrets and variables → Actions**). The Pages deploy workflow injects it at build time as `VITE_DISCORD_WEBHOOK_URL`.

If the variable is missing, the form still succeeds and stores a local copy in the browser; Discord is skipped.

> The webhook URL is baked into the client bundle. Anyone who extracts it can post to that channel. Fine for a private notify channel; rotate the webhook if it leaks.

## Deploy

Pushes to `main` build and deploy to GitHub Pages via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).
