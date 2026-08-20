import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { PrebookButton } from "@/components/landing/PrebookButton";
import logo from "@/assets/logo-white.png";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://furrever.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: "https://furrever.com/about",
    },
  ],
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Furrever",
  url: "https://furrever.com/about",
  description:
    "Furrever is a screenless smart pet collar built by Locapaw Technologies Pvt Ltd to help pet parents understand sleep, recovery, activity and vitals.",
  mainEntity: { "@id": "https://furrever.com/#organization" },
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Furrever Smart Pet Collar" },
      {
        name: "description",
        content:
          "Learn about Furrever and Locapaw Technologies Pvt Ltd - builders of a screenless smart collar that tracks sleep, recovery, activity and vitals for dogs and cats.",
      },
      { property: "og:title", content: "About Us | Furrever Smart Pet Collar" },
      {
        property: "og:description",
        content:
          "Know your pet, beyond the obvious. Meet the team behind Furrever, the screenless smart pet collar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://furrever.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
      { "script:ld+json": breadcrumbJsonLd },
      { "script:ld+json": aboutPageJsonLd },
    ],
    links: [{ rel: "canonical", href: "https://furrever.com/about" }],
  }),
  component: About,
});

const sections = [
  {
    h: "Our mission",
    p: "Know your pet, beyond the obvious. Pets cannot tell you when something feels off - so we built Furrever to surface the signals that matter: sleep, recovery, activity and everyday vitals, day and night.",
  },
  {
    h: "What we build",
    p: "Furrever is a screenless smart collar for dogs and cats. The pod clips onto a collar and tracks sleep stages, recovery readiness, effort through the day, heart rate variability, respiratory rate, skin temperature and behaviour cues - quietly, without lights or beeps at night.",
  },
  {
    h: "Why Furrever",
    p: "Most pet wearables focus on steps and location. We focus on health baselines that adapt to each animal - breed, age and temperament - so a change actually means something. One tap exports a vet-ready report when you need a clinical conversation.",
  },
  {
    h: "How we work",
    p: "Furrever is designed in India by Locapaw Technologies Pvt Ltd. We care about fit, battery life and comfort as much as sensor accuracy - because a collar only helps if your pet will wear it every day.",
  },
];

function About() {
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
        <h1 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">About Us</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Locapaw Technologies Pvt Ltd · Made for pets, in India.
        </p>
        <div className="mt-8 space-y-7 sm:mt-10 sm:space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-lg sm:text-xl">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </section>
          ))}
          <section>
            <h2 className="font-display text-lg sm:text-xl">Our approach</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A stronger bond begins with better understanding. Furrever transforms everyday
              activity into meaningful wellness insights, helping you stay connected to your pet's
              unique needs and routines.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg sm:text-xl">Company</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Furrever is built and operated by Locapaw Technologies Pvt Ltd.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Registered address: 2nd Floor, 235, Binnamangala, 13th Cross Road, Indira Nagar, 2nd
              Stage, Bengaluru Urban, Karnataka, 560038.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              For questions about the product or your pre-booking, email us at:{" "}
              <a href="mailto:kevin@furrever.com" className="text-foreground hover:text-brand">
                kevin@furrever.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-border pt-8 sm:mt-12 sm:pt-10">
          <h2 className="font-display text-xl sm:text-2xl">Ready when you are</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join as a founding pet parent at the launch price. Fully refundable until we ship.
          </p>
          <PrebookButton className="mt-5 inline-flex rounded-full bg-gradient-brand px-8 py-3 font-medium text-primary-foreground shadow-brand">
            Be A Founding Pet Parent
          </PrebookButton>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
