import { createFileRoute } from "@tanstack/react-router";
import {
  Battery,
  Bell,
  Check,
  Heart,
  HeartPulse,
  MapPin,
  Minus,
  Moon,
  Smile,
  Sparkles,
  Stethoscope,
  Thermometer,
  Utensils,
  Waves,
  Wind,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Countdown, launchLabel } from "@/components/landing/Countdown";
import { ScoreDial } from "@/components/landing/ScoreDial";
import { PillarStack } from "@/components/landing/PillarStack";
import { ScienceCarousel } from "@/components/landing/ScienceCarousel";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { PrebookButton } from "@/components/landing/PrebookButton";
import { HeroPrebookCta } from "@/components/landing/HeroPrebookCta";
import { TeardownScroll } from "@/components/landing/TeardownScroll";
import { SectionNav } from "@/components/landing/SectionNav";
import logo from "@/assets/logo-white.png";
import heroCollar from "@/assets/hero-collar.png";
import dogRunning from "@/assets/dog-running.jpg";
import catSleep from "@/assets/cat-sleep.jpg";
import {
  homeDescription,
  homeTitle,
  productDescription,
  siteUrl,
} from "@/lib/seo";

const highlights = [
  {
    icon: Stethoscope,
    title: "Recommended by veterinarians",
    description:
      "Designed with vet input so the insights you see are worth sharing at the clinic.",
  },
  {
    icon: HeartPulse,
    title: "Biometric sensors",
    description:
      "Heart rate, respiration, temperature and motion - built for their health, not just activity.",
  },
  {
    icon: Battery,
    title: "Long-lasting battery",
    description:
      "Up to 45 days on a charge, in a screenless LED-first design unlike anything else on the market.",
  },
];

const science = [
  {
    icon: Waves,
    title: "Activity Recognition",
    copy: "Walk, play, sprint and rest classified automatically.",
  },
  {
    icon: MapPin,
    title: "Live GPS",
    copy: "Know where they are - escapes, walks and safe zones.",
  },
  {
    icon: Thermometer,
    title: "Skin Temperature",
    copy: "Baseline deviation tracked day over day.",
  },
  {
    icon: Heart,
    title: "Resting Heart Rate",
    copy: "Daily baseline at rest, not just overnight.",
  },
  {
    icon: Wind,
    title: "Respiratory Rate",
    copy: "Breaths per minute while your pet is calm.",
  },
  {
    icon: Utensils,
    title: "Eating & Drinking",
    copy: "Meal and water patterns over time.",
  },
  {
    icon: Moon,
    title: "Sleep Stages",
    copy: "Deep, light and REM when you want the full picture.",
  },
];

const comparison = [
  { feature: "Activity recognition", trace: true, others: false },
  { feature: "Live GPS location", trace: true, others: false },
  { feature: "Skin temperature tracking", trace: true, others: false },
  { feature: "Resting heart rate", trace: true, others: false },
  { feature: "Respiratory rate", trace: true, others: false },
  { feature: "Eating & drinking patterns", trace: true, others: false },
  { feature: "Sleep stage tracking", trace: true, others: false },
  { feature: "Vet-ready health report", trace: true, others: false },
  { feature: "Battery life", trace: "45 days", others: "3 days" },
];

const faqs = [
  {
    q: "What is Furrever?",
    a: "Furrever is a screenless smart collar for dogs and cats. A small pod clips onto a regular collar and quietly tracks live GPS, resting heart rate, temperature, activity and daily routines-so you notice changes before they become emergencies.",
  },
  {
    q: "Does Furrever include live GPS?",
    a: "Yes. Location sits on the collar for escapes, walks and safe-zone check-ins-not as a phone accessory you leave at home.",
  },
  {
    q: "Which pets can wear Furrever?",
    a: "Dogs and cats above 3 kg. The pod fits collars between 24 and 62 cm and is calibrated across coat densities, including double-coated breeds like Huskies and Golden Retrievers.",
  },
  {
    q: "How long does the battery last?",
    a: "Up to about 45 days on a charge in typical use-far longer than most GPS pet trackers that need charging every few days.",
  },
  {
    q: "How much does Furrever cost?",
    a: "Pricing stays under ₹7,000. Final launch pricing is still being set; pre-booking amounts are fully refundable until we ship.",
  },
  {
    q: "Is Furrever a medical device?",
    a: "No. Furrever is a wellness and activity monitor. Insights are informational-always talk to a licensed veterinarian for medical concerns.",
  },
  {
    q: "Can I share Furrever data with my vet?",
    a: "One tap exports a 30-day PDF with activity, vitals and behaviour trends, formatted for a clinical consult.",
  },
  {
    q: "Is it safe for my pet to wear all day?",
    a: "The pod weighs about 11 g, has rounded edges and no screen or speaker. It is IP68 rated for swimming, mud and rain.",
  },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${siteUrl}/#product`,
  name: "Furrever Smart Pet Collar",
  alternateName: ["Furrever collar", "Furrever pet wearable"],
  description: productDescription,
  image: [`${siteUrl}/og-image.jpg`],
  brand: { "@type": "Brand", name: "Furrever", url: siteUrl },
  manufacturer: { "@id": `${siteUrl}/#organization` },
  category: "Pet Health Wearable",
  material: "Screenless clip-on pod",
  countryOfOrigin: {
    "@type": "Country",
    name: "India",
  },
  url: `${siteUrl}/`,
  audience: {
    "@type": "PeopleAudience",
    suggestedMinAge: 0,
    audienceType: "Dog and cat parents",
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "GPS", value: "Live location on collar" },
    { "@type": "PropertyValue", name: "Battery life", value: "Up to 45 days" },
    { "@type": "PropertyValue", name: "Weight", value: "11 g" },
    { "@type": "PropertyValue", name: "Water resistance", value: "IP68" },
    {
      "@type": "PropertyValue",
      name: "Sensors",
      value: "Heart rate, respiration, temperature, motion",
    },
  ],
  offers: {
    "@type": "Offer",
    url: `${siteUrl}/#prebook`,
    priceCurrency: "INR",
    price: "6999",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/PreOrder",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@id": `${siteUrl}/#organization` },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "IN",
      },
    },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: homeTitle },
      { name: "description", content: homeDescription },
      { property: "og:title", content: homeTitle },
      { property: "og:description", content: homeDescription },
      { property: "og:url", content: `${siteUrl}/` },
      { property: "og:site_name", content: "Furrever" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: homeTitle },
      { name: "twitter:description", content: homeDescription },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { "script:ld+json": productJsonLd },
      { "script:ld+json": faqJsonLd },
      { "script:ld+json": breadcrumbJsonLd },
    ],
    links: [{ rel: "canonical", href: `${siteUrl}/` }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-svh overflow-x-clip bg-background">
      <SectionNav />
      {/* Sticky chrome */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between gap-3 px-5 sm:gap-4 md:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
            <img src={logo} alt="" className="h-6 w-6 shrink-0" />
            <span className="font-hero truncate text-sm font-semibold tracking-wide text-white">
              Furrever
            </span>
          </a>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-5">
            <p className="hidden text-xs text-white/70 sm:block">
              Under <span className="text-white">₹7,000</span>
            </p>
            <PrebookButton className="rounded-full border border-brand/70 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-brand hover:bg-brand/10 sm:px-4 sm:text-[11px] md:px-6 md:py-2.5 md:text-[13px]">
              Be A Founding Pet Parent
            </PrebookButton>
          </div>
        </div>
      </header>

      {/* Screen-wide hero */}
      <section
        id="top"
        className="relative mt-[calc(3rem+env(safe-area-inset-top))] min-h-[calc(100svh-3rem-env(safe-area-inset-top))] w-full scroll-mt-[calc(3rem+env(safe-area-inset-top))] overflow-hidden bg-black md:aspect-video md:min-h-0"
      >
        <img
          src={heroCollar}
          alt="Furrever smart pet collar"
          width={1446}
          height={1087}
          className="absolute inset-0 h-full w-full object-cover object-[center_42%] select-none sm:object-center"
          fetchPriority="high"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/75"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/85 to-transparent"
        />

        {/* Edge labels */}
        <div className="absolute left-4 top-4 z-20 max-w-[min(70vw,14rem)] sm:left-5 sm:top-5 md:left-8 md:top-8 md:max-w-xs">
          <p className="hero-brand text-white">Furrever</p>
          <p className="hero-kicker mt-2 sm:mt-3">Know your pet, beyond the obvious.</p>
        </div>
        <p className="hero-meta absolute right-4 top-5 z-20 hidden md:right-8 md:top-10 md:block">
          24x7 Pet Health Tracker
        </p>

        {/* Center launch + countdown */}
        <div className="absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-center gap-3 px-3 pb-2 sm:bottom-10 sm:gap-4 sm:px-4 md:bottom-[12%] md:gap-5">
          <p className="hero-launch">{launchLabel()}</p>
          <div className="flex w-full max-w-md items-center justify-center">
            <Countdown variant="hero" />
          </div>
          <p className="hero-meta text-center md:hidden">24x7 Pet Health Tracker</p>
          <HeroPrebookCta />
        </div>
      </section>

      {/* Pillars */}
      <section id="care" className="scroll-mt-[calc(3rem+env(safe-area-inset-top))]">
        <PillarStack />
      </section>

      <TeardownScroll>
        <div className="border-t border-white/10 bg-black">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-5 sm:py-14 md:grid-cols-3 md:gap-8 md:py-16">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 sm:gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 text-brand" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-lg leading-snug text-white sm:text-xl">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </TeardownScroll>

      {/* Three scores */}
      <section
        id="scores"
        className="mx-auto max-w-7xl scroll-mt-[calc(3rem+env(safe-area-inset-top))] px-4 py-14 sm:px-5 sm:py-20"
      >
        <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
          Your pet, in three scores.
        </h2>
        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          <ScoreDial
            variant="wellness"
            icon={Sparkles}
            value={86}
            label="Wellness"
            subtitle="Looking good today"
            caption="A warm daily snapshot of overall health - activity, vitals and routine in one friendly score."
          />
          <ScoreDial
            variant="mood"
            icon={Smile}
            value={78}
            label="Mood"
            subtitle="Playful and happy"
            caption="Playtime, zoomies and curiosity - picked up from movement and behaviour."
          />
          <ScoreDial
            variant="heartbeat"
            icon={HeartPulse}
            value={72}
            max={120}
            unit="bpm"
            label="Heart Beats"
            subtitle="Steady at rest"
            caption="Resting heart rate - tracked against your pet's baseline."
          />
        </div>
      </section>

      {/* Lifestyle split */}
      <section
        id="lifestyle"
        className="mx-auto max-w-7xl scroll-mt-[calc(3rem+env(safe-area-inset-top))] px-4 py-8 sm:px-5 sm:py-10"
      >
        <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[340px] sm:rounded-3xl md:min-h-0">
            <img
              src={dogRunning}
              alt="Dog running at dusk wearing the Furrever collar"
              loading="lazy"
              width={1408}
              height={1008}
              className="h-full min-h-[280px] w-full object-cover sm:min-h-[340px] md:min-h-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background to-transparent p-5 sm:p-8">
              <h3 className="font-display text-2xl sm:text-3xl">Activity that adds up</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Walks, play and rest are recognized automatically - so you see patterns, not just
                steps.
              </p>
            </div>
          </div>
          <div className="relative min-h-[240px] overflow-hidden rounded-2xl sm:min-h-[300px] sm:rounded-3xl md:min-h-0">
            <img
              src={catSleep}
              alt="Cat sleeping while wearing the Furrever collar"
              loading="lazy"
              width={1104}
              height={1104}
              className="h-full min-h-[240px] w-full object-cover sm:min-h-[300px] md:min-h-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background to-transparent p-5 sm:p-8">
              <h3 className="font-display text-2xl sm:text-3xl">Find them fast</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Live GPS on the collar when they slip the gate or wander off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Science carousel */}
      <ScienceCarousel id="science" items={science} />

      {/* Comparison */}
      <section
        id="compare"
        className="mx-auto max-w-4xl scroll-mt-[calc(3rem+env(safe-area-inset-top))] px-4 py-14 sm:px-5 sm:py-20"
      >
        <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
          Better everywhere
        </h2>
        <div className="mt-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:mt-10 sm:overflow-visible sm:px-0">
          <div className="min-w-[32rem] overflow-hidden rounded-2xl border border-border sm:min-w-0 sm:rounded-3xl">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-surface-2 px-3 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm">
              <span className="text-muted-foreground">Features</span>
              <span className="text-center font-display text-brand">Furrever</span>
              <span className="text-center text-muted-foreground">Others</span>
            </div>
            {comparison.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-[1.5fr_1fr_1fr] items-center border-t border-border px-3 py-3 text-xs sm:px-5 sm:py-4 sm:text-sm"
              >
                <span className="pr-2 leading-snug">{row.feature}</span>
                <span className="flex justify-center">
                  {row.trace === true ? (
                    <Check className="h-4 w-4 text-brand" />
                  ) : (
                    <span className="font-display">{row.trace}</span>
                  )}
                </span>
                <span className="flex justify-center text-muted-foreground">
                  {row.others === false ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <span className="font-display">{row.others}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="mx-auto max-w-3xl scroll-mt-[calc(3rem+env(safe-area-inset-top))] px-4 py-14 sm:px-5 sm:py-20"
      >
        <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-8 sm:mt-10">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="text-left text-sm sm:text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Pre-book CTA */}
      <section
        id="prebook"
        className="relative scroll-mt-[calc(3rem+env(safe-area-inset-top))] overflow-hidden px-4 py-16 sm:px-5 sm:py-20 md:py-24"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[min(100vw,700px)] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[100px] sm:h-[400px]"
          style={{ background: "var(--gradient-brand)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 text-center sm:rounded-3xl sm:p-10">
          <Bell className="mx-auto h-6 w-6 text-brand" />
          <h2 className="mt-4 font-display text-3xl sm:mt-5 sm:text-4xl md:text-5xl">
            Be a founding pet parent
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Final pricing is still being planned, and will stay under ₹7,000. Fully refundable.
          </p>
          <div className="mt-6 flex justify-center overflow-x-auto sm:mt-8">
            <Countdown />
          </div>
          <div className="mt-8 flex justify-center sm:mt-10">
            <HeroPrebookCta variant="brand" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
