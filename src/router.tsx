import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Matches Vite `base` ("/" on furrever.io; "/<repo>/" on project Pages without a custom domain)
    ...(import.meta.env.BASE_URL.replace(/\/$/, "")
      ? { basepath: import.meta.env.BASE_URL.replace(/\/$/, "") }
      : {}),
  });

  return router;
};
