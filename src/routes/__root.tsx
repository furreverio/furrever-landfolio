import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { PrebookProvider } from "../components/landing/prebook-context";
import {
  brandName,
  homeDescription,
  homeTitle,
  legalName,
  ogImage,
  orgDescription,
  siteUrl,
} from "../lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: brandName,
  legalName,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/favicon.png`,
  },
  image: ogImage,
  slogan: "Know your pet, beyond the obvious.",
  description: orgDescription,
  email: "kevin@furrever.com",
  telephone: "+91-9686660425",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2nd Floor, 235, Binnamangala, 13th Cross Road, Indira Nagar, 2nd Stage",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560038",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "kevin@furrever.com",
    telephone: "+91-9686660425",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  foundingLocation: {
    "@type": "Place",
    name: "Bengaluru, India",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: brandName,
  description: homeDescription,
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-IN",
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: homeTitle },
      { name: "description", content: homeDescription },
      { name: "author", content: legalName },
      { name: "theme-color", content: "#0b0f14" },
      { name: "color-scheme", content: "dark" },
      { name: "application-name", content: brandName },
      { name: "apple-mobile-web-app-title", content: brandName },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:title", content: homeTitle },
      { property: "og:description", content: homeDescription },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: brandName },
      { property: "og:url", content: `${siteUrl}/` },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: ogImage },
      { property: "og:image:secure_url", content: ogImage },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Furrever screenless smart collar for dogs and cats",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: homeTitle },
      { name: "twitter:description", content: homeDescription },
      { name: "twitter:image", content: ogImage },
      {
        name: "twitter:image:alt",
        content: "Furrever screenless smart collar for dogs and cats",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "geo.region", content: "IN-KA" },
      { name: "geo.placename", content: "Bengaluru" },
      { "script:ld+json": organizationJsonLd },
      { "script:ld+json": websiteJsonLd },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: `${siteUrl}/` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Saira:wdth,wght@50..125,400..800&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon.png`, type: "image/png" },
      { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}favicon.png` },
      { rel: "manifest", href: `${import.meta.env.BASE_URL}site.webmanifest` },
      { rel: "sitemap", type: "application/xml", href: `${siteUrl}/sitemap.xml` },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PrebookProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </PrebookProvider>
    </QueryClientProvider>
  );
}
