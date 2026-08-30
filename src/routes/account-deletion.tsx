import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { legalName, siteUrl } from "@/lib/seo";
import logo from "@/assets/logo-white.png";

const privacyEmail = "privacy@furrever.com";
const deletionMailto = `mailto:${privacyEmail}?subject=${encodeURIComponent("Account deletion request")}&body=${encodeURIComponent(
  "Please delete my Furrever account and associated data.\n\nPhone number used to sign in:\nEmail on the account (if any):\nAny other details that help you find the account:\n",
)}`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Delete account",
      item: `${siteUrl}/account-deletion`,
    },
  ],
};

export const Route = createFileRoute("/account-deletion")({
  head: () => ({
    meta: [
      { title: "Delete your Furrever Account - Locapaw Technologies" },
      {
        name: "description",
        content:
          "Request permanent deletion of your Furrever app account and associated data. No login required. Locapaw Technologies Pvt Ltd.",
      },
      { property: "og:title", content: "Delete your Furrever Account - Locapaw Technologies" },
      {
        property: "og:description",
        content:
          "Email privacy@furrever.com to permanently delete your Furrever account. We complete deletion within 30 days.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${siteUrl}/account-deletion` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
      { "script:ld+json": breadcrumbJsonLd },
    ],
    links: [{ rel: "canonical", href: `${siteUrl}/account-deletion` }],
  }),
  component: AccountDeletion,
});

function AccountDeletion() {
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
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.25em]">
          {legalName} · Furrever app
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
          Delete your Furrever account
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Use this page to request permanent deletion of your Furrever mobile app account and the
          personal data linked to it. You do not need to be signed in, and you do not need the app
          installed.
        </p>

        <a
          href={deletionMailto}
          className="mt-8 flex items-center gap-4 rounded-2xl border border-brand/40 bg-surface/80 px-4 py-4 transition-colors hover:border-brand/70 hover:bg-surface sm:gap-5 sm:px-5 sm:py-5"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-brand sm:h-12 sm:w-12">
            <Mail className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
              Request deletion
            </span>
            <span className="mt-1 block font-display text-lg text-foreground sm:text-xl">
              Email {privacyEmail}
            </span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        </a>

        <div className="mt-10 space-y-8 sm:mt-12">
          <section>
            <h2 className="font-display text-lg sm:text-xl">How to request deletion</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                Email{" "}
                <a href={deletionMailto} className="text-foreground hover:text-brand">
                  {privacyEmail}
                </a>{" "}
                with the subject line <span className="text-foreground">Account deletion request</span>
                .
              </li>
              <li>
                Include the mobile phone number used to create the Furrever account, and the email
                on the account if you added one.
              </li>
              <li>
                We will confirm the request and permanently delete the account. This is not a
                freeze or deactivation.
              </li>
            </ol>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              You can also start deletion from inside the Furrever app under Settings, if you still
              have the app installed.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg sm:text-xl">What we delete</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Within 30 days of verifying your request we delete or irreversibly anonymise:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>Your account, name, phone number, email, and profile photo</li>
              <li>Pet profiles, photos, special notes, and household invitations you created</li>
              <li>Safe zones and collar telemetry linked to the account (GPS, activity, vitals)</li>
              <li>App analytics and crash records that identify you, where our providers allow</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg sm:text-xl">What we may keep</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We may retain limited records where we must, for example to comply with tax or
              accounting law, prevent fraud, or resolve a dispute. Those records are kept only as
              long as the law or that purpose requires, then deleted. Website pre-booking or
              purchase records may be retained separately under our{" "}
              <Link to="/refunds" className="text-foreground underline underline-offset-2">
                refund policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg sm:text-xl">Questions</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Full details are in our{" "}
              <Link to="/privacy" className="text-foreground underline underline-offset-2">
                Privacy Policy
              </Link>
              . For other privacy requests, write to{" "}
              <a href={`mailto:${privacyEmail}`} className="text-foreground hover:text-brand">
                {privacyEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
