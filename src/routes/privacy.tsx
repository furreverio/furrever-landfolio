import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/landing/SiteFooter";
import logo from "@/assets/logo-white.png";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - Furrever Pet Wearable" },
      {
        name: "description",
        content:
          "How Locapaw Technologies Pvt Ltd collects, uses and protects data from the Furrever pet health collar and app.",
      },
      { property: "og:title", content: "Privacy Policy - Furrever" },
      {
        property: "og:description",
        content: "Data practices for the Furrever pet health collar and companion app.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

const sections = [
  {
    h: "Who we are",
    p: "Furrever is a pet health wearable built and operated by Locapaw Technologies Pvt Ltd. This page is maintained by Locapaw Technologies Pvt Ltd to explain how we handle information collected through the Furrever collar, app and website.",
  },
  {
    h: "Information we collect",
    p: "Account details you provide (name, email, phone), pet profile details (name, breed, age, weight), and health signals recorded by the collar such as activity, sleep, heart rate, respiration and skin temperature. We also collect basic device and app diagnostics.",
  },
  {
    h: "How we use it",
    p: "To generate your pet's sleep, recovery and effort insights, to improve sensor accuracy and algorithms, to provide support, and to send you product and order updates you have asked for.",
  },
  {
    h: "Sharing",
    p: "We do not sell personal data. We share information with service providers who help us run the product (hosting, analytics, payments, delivery) under contract, and with your vet only when you choose to export a report.",
  },
  {
    h: "Retention and deletion",
    p: "Health data stays in your account until you delete it or close your account. You can request deletion at any time and we will remove personal data unless we are required to keep records for legal or accounting reasons.",
  },
  {
    h: "Your choices",
    p: "You can access, correct, export or delete your data from the app, and you can opt out of marketing messages at any time.",
  },
  {
    h: "Contact",
    p: "For privacy questions or requests, write to privacy@furrever.io (Locapaw Technologies Pvt Ltd).",
  },
];

function Privacy() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 3 August 2026</p>
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
