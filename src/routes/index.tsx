import { createFileRoute } from "@tanstack/react-router";
import { Bell, Check, Heart, Minus, Moon, PawPrint, Thermometer, Waves, Wind } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Countdown } from "@/components/landing/Countdown";
import { ScoreDial } from "@/components/landing/ScoreDial";
import { PillarStack } from "@/components/landing/PillarStack";
import { SiteFooter } from "@/components/landing/SiteFooter";
import logo from "@/assets/furrever-logo.png";
import heroCollar from "@/assets/hero-collar.jpg";
import dogRunning from "@/assets/dog-running.jpg";
import catSleep from "@/assets/cat-sleep.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Furrever Collar — 24x7 Pet Health Tracker" },
      {
        name: "description",
        content:
          "Furrever is a screenless smart collar that tracks your pet's sleep, recovery, activity and vitals 24x7. Pre-book and save ₹3,000.",
      },
      { property: "og:title", content: "Furrever Collar — 24x7 Pet Health Tracker" },
      {
        property: "og:description",
        content:
          "Screenless smart collar tracking sleep, recovery and activity for dogs and cats. Pre-book and save ₹3,000.",
      },
    ],
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
  { feature: "Price", trace: "₹7,999", others: "₹24,999" },
  { feature: "Subscription", trace: "None", others: "₹18,000 / year" },
  { feature: "Heart rate variability", trace: true, others: false },
  { feature: "Recovery score", trace: true, others: false },
  { feature: "4-stage sleep tracking", trace: true, others: false },
  { feature: "Respiratory rate", trace: true, others: false },
  { feature: "Itch & scratch detection", trace: true, others: false },
  { feature: "Vet-ready health report", trace: true, others: false },
  { feature: "Battery life", trace: "14 days", others: "3 days" },
];

const specs = [
  {
    group: "Health sensors",
    rows: [
      ["Heart rate", "Optical PPG, 24x7"],
      ["Respiration", "Derived, sleep windows"],
      ["Temperature", "Skin-contact thermistor"],
      ["Motion", "6-axis accelerometer + gyro"],
    ],
  },
  {
    group: "Physical",
    rows: [
      ["Pod weight", "11 g"],
      ["Neck size", "24 – 62 cm"],
      ["Materials", "Stainless steel + soft silicone"],
      ["Water resistance", "IP68 / 5 ATM"],
    ],
  },
  {
    group: "Connectivity",
    rows: [
      ["Bluetooth", "BLE 5.3"],
      ["Range", "Up to 120 m open air"],
      ["App", "iOS 15+ / Android 10+"],
      ["Sync", "Automatic, background"],
    ],
  },
  {
    group: "Battery",
    rows: [
      ["Battery life", "Up to 14 days"],
      ["Charging", "Magnetic pogo dock"],
      ["Full charge", "70 minutes"],
      ["Standby", "45 days"],
    ],
  },
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
    q: "Is there a monthly subscription?",
    a: "No. Every insight, trend and vet report is included for life with the device.",
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
    <div className="min-h-screen bg-background">
      {/* Sticky pre-book bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Furrever logo" className="h-7 w-7" />
            <span className="font-display text-lg tracking-tight">Furrever</span>
          </div>
          <div className="hidden md:block">
            <Countdown compact />
          </div>
          <a
            href="#prebook"
            className="rounded-full bg-gradient-brand px-5 py-2 text-sm font-medium text-primary-foreground shadow-brand"
          >
            Pre-book now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 opacity-40 blur-[120px]"
          style={{ background: "var(--gradient-brand)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            24x7 pet health tracker
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
            Know how your pet
            <br />
            <span className="text-gradient-brand">really feels.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            A screenless smart collar that reads sleep, recovery, vitals and behaviour — and tells
            you what changed, before your pet can.
          </p>
          <div className="mt-10 flex justify-center">
            <Countdown />
          </div>
          <div className="mt-10">
            <a
              href="#prebook"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-brand px-7 py-3.5 font-medium text-primary-foreground shadow-brand"
            >
              Pre-book now
              <span className="rounded-full bg-background/20 px-2 py-0.5 text-xs">₹3,000 off</span>
            </a>
          </div>
          <img
            src={heroCollar}
            alt="Furrever smart pet collar with brushed steel sensor pod"
            width={1408}
            height={1008}
            className="mx-auto mt-12 w-full max-w-3xl rounded-3xl"
          />
        </div>
      </section>

      {/* Pillars */}
      {/* Pillars — scroll-jacked stack */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">
            Better care <span className="text-muted-foreground">starts now</span>
          </h2>
        </div>
        <PillarStack />
      </section>


      {/* Three scores */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="font-display text-4xl leading-tight md:text-5xl">
          Your pet, in three scores.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={dogRunning}
              alt="Dog running at dusk wearing the Furrever collar"
              loading="lazy"
              width={1408}
              height={1008}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-8">
              <h3 className="font-display text-3xl">Insights that adapt</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Baselines are learned per pet — breed, age and temperament — so a change means
                something.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={catSleep}
              alt="Cat sleeping while wearing the Furrever collar"
              loading="lazy"
              width={1104}
              height={1104}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-8">
              <h3 className="font-display text-3xl">Quiet by design</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No screen, no beeps, no lights at night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Science grid */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="font-display text-4xl leading-tight md:text-5xl">
          Built on real animal science
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {science.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
            >
              <s.icon className="h-5 w-5 text-brand" />
              <h3 className="mt-5 text-lg">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-4xl px-5 py-20">
        <h2 className="font-display text-4xl leading-tight md:text-5xl">Better everywhere</h2>
        <div className="mt-10 overflow-hidden rounded-3xl border border-border">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-surface-2 px-5 py-4 text-sm">
            <span className="text-muted-foreground">Features</span>
            <span className="text-center font-display text-brand">Furrever</span>
            <span className="text-center text-muted-foreground">Other trackers</span>
          </div>
          {comparison.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-t border-border px-5 py-4 text-sm"
            >
              <span>{row.feature}</span>
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
      </section>

      {/* Specs */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="font-display text-4xl leading-tight md:text-5xl">
          Technical specifications
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {specs.map((s) => (
            <div key={s.group} className="rounded-3xl border border-border bg-card p-7">
              <h3 className="text-xs uppercase tracking-[0.25em] text-brand">{s.group}</h3>
              <dl className="mt-5 space-y-3">
                {s.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-border pb-3">
                    <dt className="text-sm text-muted-foreground">{k}</dt>
                    <dd className="text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="font-display text-4xl leading-tight md:text-5xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Pre-book CTA */}
      <section id="prebook" className="relative overflow-hidden px-5 py-24">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[120px]"
          style={{ background: "var(--gradient-brand)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 text-center">
          <Bell className="mx-auto h-6 w-6 text-brand" />
          <h2 className="mt-5 font-display text-4xl md:text-5xl">Get ₹3,000 off on launch</h2>
          <p className="mt-3 text-muted-foreground">
            Reserve your Furrever collar today. Fully refundable, no subscription — ever.
          </p>
          <div className="mt-8 flex justify-center">
            <Countdown />
          </div>
          <a
            href="#prebook"
            className="mt-10 inline-flex rounded-full bg-gradient-brand px-8 py-3.5 font-medium text-primary-foreground shadow-brand"
          >
            Pre-book now
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
