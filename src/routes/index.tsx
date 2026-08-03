import { createFileRoute } from "@tanstack/react-router";
import { Bell, Check, Heart, Minus, Moon, PawPrint, Thermometer, Waves, Wind } from "lucide-react";
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
import { PrebookButton } from "@/components/landing/prebook-context";
import { TeardownScroll } from "@/components/landing/TeardownScroll";
import logo from "@/assets/logo-white.png";
import heroCollar from "@/assets/hero-collar.png";
import dogRunning from "@/assets/dog-running.jpg";
import catSleep from "@/assets/cat-sleep.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Furrever Smart Pet Collar | 24/7 Health Tracker for Dogs & Cats",
      },
      {
        name: "description",
        content:
          "Furrever is a screenless smart collar that tracks sleep, recovery, activity and vitals for dogs and cats, 24/7. Pre-book now. Launch price under ₹7,000.",
      },
      {
        property: "og:title",
        content:
          "Furrever Smart Pet Collar | 24/7 Health Tracker for Dogs & Cats",
      },
      {
        property: "og:description",
        content:
          "Know your pet beyond the obvious. Track sleep, recovery, activity and vitals with a screenless smart collar. Pre-book under ₹7,000.",
      },
      { property: "og:url", content: "https://furrever.io/" },
      { property: "og:site_name", content: "Furrever" },
      {
        name: "twitter:title",
        content:
          "Furrever Smart Pet Collar | 24/7 Health Tracker for Dogs & Cats",
      },
      {
        name: "twitter:description",
        content:
          "Screenless smart collar for dogs and cats. Sleep, recovery, activity and vitals, tracked 24/7. Pre-book under ₹7,000.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://furrever.io/" }],
  }),
  component: Index,
});

const science = [
  { icon: Heart, title: "Heart Rate Variability", copy: "Autonomic stress load, read overnight." },
  { icon: Moon, title: "4-Stage Sleep", copy: "Deep, light, REM and awake windows." },
  { icon: Waves, title: "Activity Zones", copy: "Walk, play, sprint and rest classified." },
  { icon: Wind, title: "Respiratory Rate", copy: "Breath counts while your pet sleeps." },
  { icon: Thermometer, title: "Skin Temperature", copy: "Baseline deviation, day over day." },
  { icon: PawPrint, title: "Behaviour Signals", copy: "Scratching, licking, pacing, shaking." },
];

const comparison = [
  { feature: "Heart rate variability", trace: true, others: false },
  { feature: "Recovery score", trace: true, others: false },
  { feature: "4-stage sleep tracking", trace: true, others: false },
  { feature: "Respiratory rate", trace: true, others: false },
  { feature: "Itch & scratch detection", trace: true, others: false },
  { feature: "Vet-ready health report", trace: true, others: false },
  { feature: "Battery life", trace: "45 days", others: "3 days" },
];

const faqs = [
  {
    q: "Which pets is Furrever built for?",
    a: "Dogs and cats above 3 kg. The pod clips onto any collar between 24 and 62 cm, and the sensor stack is calibrated across coat densities and colours.",
  },
  {
    q: "Does it work through thick fur?",
    a: "Yes. The contact plate sits against the skin at the underside of the neck, and the algorithm is trained on double-coated breeds like Huskies and Golden Retrievers.",
  },
  {
    q: "Can I share data with my vet?",
    a: "One tap exports a 30-day PDF with vitals, sleep and behaviour trends, formatted for a clinical consult.",
  },
  {
    q: "Is it safe for my pet to wear all day?",
    a: "The pod weighs 11 g, has rounded edges and no screen or speaker. It is IP68 rated, so swimming, mud and rain are all fine.",
  },
];

function Index() {
  return (
    <div className="min-h-svh overflow-x-clip bg-background">
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
              Pre-book
            </PrebookButton>
          </div>
        </div>
      </header>

      {/* Screen-wide hero */}
      <section
        id="top"
        className="relative mt-[calc(3rem+env(safe-area-inset-top))] min-h-[calc(100svh-3rem-env(safe-area-inset-top))] w-full overflow-hidden bg-black md:aspect-video md:min-h-0"
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
        </div>
      </section>

      {/* Pillars */}
      <section className="pt-12 sm:pt-16 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <h2 className="max-w-2xl font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            Better care <span className="text-muted-foreground">starts now</span>
          </h2>
        </div>
        <PillarStack />
      </section>

      <TeardownScroll />

      {/* Three scores */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-20">
        <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
          Your pet, in three scores.
        </h2>
        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          <ScoreDial
            value={86}
            label="Sleep"
            caption="Quality measured in stages, not just hours on the couch."
          />
          <ScoreDial
            value={74}
            suffix="%"
            label="Recovery"
            caption="How ready your pet is for today's walk, run or play."
          />
          <ScoreDial
            value={312}
            label="Effort"
            caption="Energy spent through the day, updated in real time."
          />
        </div>
      </section>

      {/* Lifestyle split */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 sm:py-10">
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
              <h3 className="font-display text-2xl sm:text-3xl">Insights that adapt</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Baselines are learned per pet (breed, age and temperament), so a change means
                something.
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
              <h3 className="font-display text-2xl sm:text-3xl">Quiet by design</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No screen, no beeps, no lights at night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Science carousel */}
      <ScienceCarousel items={science} />

      {/* Comparison */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-5 sm:py-20">
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
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-5 sm:py-20">
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
        className="relative overflow-hidden px-4 py-16 sm:px-5 sm:py-20 md:py-24"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[min(100vw,700px)] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[100px] sm:h-[400px]"
          style={{ background: "var(--gradient-brand)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 text-center sm:rounded-3xl sm:p-10">
          <Bell className="mx-auto h-6 w-6 text-brand" />
          <h2 className="mt-4 font-display text-3xl sm:mt-5 sm:text-4xl md:text-5xl">
            Pre-book for launch
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Final pricing is still being planned, and will stay under ₹7,000. Fully refundable.
          </p>
          <div className="mt-6 flex justify-center overflow-x-auto sm:mt-8">
            <Countdown />
          </div>
          <PrebookButton className="mt-8 inline-flex w-full max-w-xs justify-center rounded-full bg-gradient-brand px-8 py-3.5 font-medium text-primary-foreground shadow-brand sm:mt-10 sm:w-auto">
            Pre-book now
          </PrebookButton>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
