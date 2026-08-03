import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/landing/SiteFooter";
import logo from "@/assets/logo-white.png";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions - Furrever Pet Wearable" },
      {
        name: "description",
        content:
          "Terms of sale and use for the Furrever pet health collar and app, operated by Locapaw Technologies Pvt Ltd.",
      },
      { property: "og:title", content: "Terms & Conditions - Furrever" },
      {
        property: "og:description",
        content: "Terms of sale and use for the Furrever pet health collar and app.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

const sections = [
  {
    h: "Agreement",
    p: "These terms govern your use of the Furrever website, collar and app, provided by Locapaw Technologies Pvt Ltd. By pre-booking or using the product you accept these terms.",
  },
  {
    h: "Pre-booking",
    p: "A pre-booking reserves a unit at the launch price shown at the time of order. Pre-booking amounts are fully refundable until your order is shipped. Launch dates and pricing may change; we will notify you before charging any balance.",
  },
  {
    h: "Use of the device",
    p: "Furrever is a wellness and activity monitor for pets. Use it as directed, check collar fit regularly and keep the pod clean and charged.",
  },
  {
    h: "Not veterinary advice",
    p: "Furrever is not a medical device and does not diagnose, treat or prevent any condition. Insights are informational only. Always consult a licensed veterinarian for medical concerns.",
  },
  {
    h: "Warranty",
    p: "Devices carry a 12-month limited warranty against manufacturing defects. Damage from misuse, chewing, tampering or unauthorised repair is not covered.",
  },
  {
    h: "Intellectual property",
    p: "The Furrever name, logo, software, designs and content are owned by Locapaw Technologies Pvt Ltd and may not be copied or reused without written permission.",
  },
  {
    h: "Liability",
    p: "To the extent permitted by law, our total liability relating to the product is limited to the amount you paid for it.",
  },
  {
    h: "Governing law and contact",
    p: "These terms are governed by the laws of India. Questions: support@furrever.pet (Locapaw Technologies Pvt Ltd).",
  },
];

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Furrever logo" className="h-7 w-7" />
            <span className="font-display text-lg tracking-tight">Furrever</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-brand">
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-4xl md:text-5xl">Terms &amp; Conditions</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 3 August 2026</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
