import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import logo from "@/assets/logo-white.png";

const registeredAddress =
  "2nd Floor, 235, Binnamangala, 13th Cross Road, Indira Nagar, 2nd Stage, Bengaluru Urban, Karnataka, 560038";
const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(registeredAddress);

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://furrever.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact Us",
      item: "https://furrever.com/contact",
    },
  ],
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Furrever",
  url: "https://furrever.com/contact",
  description:
    "Email or call Locapaw Technologies about Furrever founding reservations, product questions and support in India.",
  mainEntity: {
    "@type": "Organization",
    "@id": "https://furrever.com/#organization",
    name: "Locapaw Technologies Pvt Ltd",
    email: "kevin@furrever.com",
    telephone: "+91-9686660425",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2nd Floor, 235, Binnamangala, 13th Cross Road, Indira Nagar, 2nd Stage",
      addressLocality: "Bengaluru Urban",
      addressRegion: "Karnataka",
      postalCode: "560038",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "kevin@furrever.com",
        telephone: "+91-9686660425",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
    ],
  },
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Furrever - Email & Phone (Bengaluru)" },
      {
        name: "description",
        content:
          "Reach Locapaw Technologies about Furrever: kevin@furrever.com or 9686660425. We usually reply within 1–2 business days.",
      },
      { property: "og:title", content: "Contact Furrever - Email & Phone (Bengaluru)" },
      {
        property: "og:description",
        content:
          "Founding reservations, product questions and support. kevin@furrever.com · 9686660425.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://furrever.com/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
      { "script:ld+json": breadcrumbJsonLd },
      { "script:ld+json": contactPageJsonLd },
    ],
    links: [{ rel: "canonical", href: "https://furrever.com/contact" }],
  }),
  component: Contact,
});

const topics = [
  {
    label: "Pre-booking or order",
    href: "mailto:kevin@furrever.com?subject=Pre-booking%20question",
  },
  {
    label: "Product question",
    href: "mailto:kevin@furrever.com?subject=Product%20question",
  },
  {
    label: "Refund or cancellation",
    href: "mailto:kevin@furrever.com?subject=Refund%20or%20cancellation",
  },
  {
    label: "Privacy request",
    href: "mailto:privacy@furrever.com?subject=Privacy%20request",
  },
];

const helpfulLinks = [
  { to: "/about" as const, label: "About Us" },
  { to: "/refunds" as const, label: "Refund & Cancellation" },
  { to: "/terms" as const, label: "Terms & Conditions" },
  { to: "/privacy" as const, label: "Privacy Policy" },
];

function Contact() {
  return (
    <div className="min-h-svh overflow-x-clip bg-background">
      <header className="border-b border-border pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-5">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img src={logo} alt="Furrever logo" className="h-7 w-7 shrink-0" />
            <span className="font-display text-lg tracking-tight">Furrever</span>
          </Link>
          <Link to="/" className="shrink-0 text-sm text-muted-foreground hover:text-brand">
            Back
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-3xl px-4 py-10 sm:px-5 sm:py-16">
        <div
          className="pointer-events-none absolute -top-8 left-1/2 h-56 w-[min(100vw,28rem)] -translate-x-1/2 opacity-25 blur-[90px]"
          style={{ background: "var(--gradient-brand)" }}
          aria-hidden
        />

        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">
            Locapaw Technologies Pvt Ltd
          </p>
          <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Questions about Furrever, your pre-booking, or something else?
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Reach out - we typically reply within 1–2 business days.
          </p>

          <div className="mt-10 space-y-3 sm:mt-12">
            <a
              href="mailto:kevin@furrever.com"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/80 px-4 py-4 transition-colors hover:border-brand/50 hover:bg-surface sm:gap-5 sm:px-5 sm:py-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-brand sm:h-12 sm:w-12">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                  Email
                </span>
                <span className="mt-1 block truncate font-display text-lg text-foreground group-hover:text-brand sm:text-xl">
                  kevin@furrever.com
                </span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
                aria-hidden
              />
            </a>

            <a
              href="tel:+919686660425"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/80 px-4 py-4 transition-colors hover:border-brand/50 hover:bg-surface sm:gap-5 sm:px-5 sm:py-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-brand sm:h-12 sm:w-12">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                  Phone
                </span>
                <span className="mt-1 block font-display text-lg text-foreground group-hover:text-brand sm:text-xl">
                  9686660425
                </span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
                aria-hidden
              />
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-surface/80 px-4 py-4 transition-colors hover:border-brand/50 hover:bg-surface sm:gap-5 sm:px-5 sm:py-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-brand sm:h-12 sm:w-12">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                  Registered address
                </span>
                <span className="mt-1 block font-display text-base leading-snug text-foreground group-hover:text-brand sm:text-lg">
                  {registeredAddress}
                </span>
              </span>
              <ArrowUpRight
                className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
                aria-hidden
              />
            </a>
          </div>

          <section className="mt-12 sm:mt-14">
            <h2 className="font-display text-lg sm:text-xl">What is this about?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pick a topic to open an email with the subject filled in.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <a
                  key={topic.label}
                  href={topic.href}
                  className="rounded-xl border border-border px-3.5 py-2 text-sm text-foreground transition-colors hover:border-brand/50 hover:text-brand"
                >
                  {topic.label}
                </a>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-border pt-8 sm:mt-14 sm:pt-10">
            <h2 className="font-display text-lg sm:text-xl">Helpful links</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {helpfulLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-1 py-2 text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
