/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISCORD_WEBHOOK_URL?: string;
  readonly VITE_ANALYTICS_ENABLED?: string;
  readonly VITE_ANALYTICS_VENDORS?: string;
  readonly VITE_ANALYTICS_REPLAY_VENDORS?: string;
  readonly VITE_ANALYTICS_REPLAY_SAMPLE?: string;
  readonly VITE_ANALYTICS_DEBUG?: string;
  readonly VITE_POSTHOG_KEY?: string;
  readonly VITE_POSTHOG_HOST?: string;
  readonly VITE_MIXPANEL_TOKEN?: string;
  readonly VITE_AMPLITUDE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
