import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/landing/SiteFooter";
import logo from "@/assets/logo-white.png";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://furrever.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Refund & Cancellation Policy",
      item: "https://furrever.com/refunds",
    },
  ],
};

export const Route = createFileRoute("/refunds")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy | Furrever Smart Pet Collar" },
      {
        name: "description",
        content:
          "Refund and cancellation terms for Furrever pre-bookings and orders, operated by Locapaw Technologies Pvt Ltd.",
      },
      {
        property: "og:title",
        content: "Refund & Cancellation Policy | Furrever Smart Pet Collar",
      },
      {
        property: "og:description",
        content: "How to cancel or request a refund for your Furrever pre-booking or order.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://furrever.com/refunds" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
      { "script:ld+json": breadcrumbJsonLd },
    ],
    links: [{ rel: "canonical", href: "https://furrever.com/refunds" }],
  }),
  component: Refunds,
});

const sections = [
  {
    h: "Overview",
    p: "This policy explains how refunds and cancellations work for Furrever pre-bookings and orders placed through our website. Furrever is operated by Locapaw Technologies Pvt Ltd.",
  },
  {
    h: "Pre-booking refunds",
    p: "Pre-booking amounts are fully refundable until your order is shipped. If you change your mind before dispatch, contact us and we will process a full refund to your original payment method.",
  },
  {
    h: "Cancelling a pre-booking",
    p: "You may cancel your pre-booking at any time before shipment at no charge. Once cancelled, your spot is released and any amount paid will be refunded as described below.",
  },
  {
    h: "Refund processing",
    p: "Approved refunds are processed within 7–10 business days. Depending on your bank or payment provider, it may take additional time for the amount to appear in your account.",
  },
  {
    h: "After shipment",
    p: "Once your Furrever collar has shipped, standard order terms apply. Devices carry a 12-month limited warranty against manufacturing defects. For post-delivery concerns, contact us and we will help you with the appropriate next steps.",
  },
  {
    h: "How to request a refund or cancellation",
    p: "To cancel a pre-booking or request a refund, contact us at kevin@furrever.com or call 9686660425. Please include your name, email and order or pre-booking details so we can assist you quickly.",
  },
];

function Refunds() {
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

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-5 sm:py-16">
        <h1 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
          Refund &amp; Cancellation Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 6 August 2026</p>
        <div className="mt-8 space-y-7 sm:mt-10 sm:space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-lg sm:text-xl">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
