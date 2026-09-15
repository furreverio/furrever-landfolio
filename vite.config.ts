import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { nitro } from "nitro/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] == null || process.env[key] === "") {
      process.env[key] = value;
    }
  }

  // Pages + custom domain (furrever.com) → "/". Project URL without custom domain → "/<repo>/".
  const base = process.env["BASE_PATH"] ?? "/";

  return {
    base,
    resolve: {
      dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
    },
    plugins: [
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tailwindcss(),
      tanstackStart({
        server: { entry: "server" },
        prerender: {
          enabled: process.env["STATIC_EXPORT"] === "1",
          crawlLinks: true,
          autoStaticPathsDiscovery: true,
          failOnError: true,
        },
      }),
      nitro(),
      viteReact(),
    ],
  };
});
