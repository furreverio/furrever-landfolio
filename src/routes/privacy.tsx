import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { legalName, siteUrl } from "@/lib/seo";
import logo from "@/assets/logo-white.png";

const privacyEmail = "privacy@furrever.com";
const registeredAddress =
  "2nd Floor, 235, Binnamangala, 13th Cross Road, Indira Nagar, 2nd Stage, Bengaluru Urban, Karnataka, 560038";
const privacyUrl = `${siteUrl}/privacy`;
const deletionUrl = `${siteUrl}/account-deletion`;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Privacy Policy",
      item: privacyUrl,
    },
  ],
};

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - How Furrever Handles Pet & Account Data" },
      {
        name: "description",
        content:
          "What Locapaw Technologies collects from the Furrever app, collar and site, how it is used, and how to access or delete it. For Google Play and App Store.",
      },
      { property: "og:title", content: "Privacy Policy - How Furrever Handles Pet & Account Data" },
      {
        property: "og:description",
        content: "Clear data practices for Furrever pet parents. Questions: privacy@furrever.com.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: privacyUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
      { "script:ld+json": breadcrumbJsonLd },
    ],
    links: [{ rel: "canonical", href: privacyUrl }],
  }),
  component: Privacy,
});

const toc = [
  { id: "who-we-are", label: "1. Who we are" },
  { id: "information-we-collect", label: "2. Information we collect" },
  { id: "how-we-use", label: "3. How we use your information" },
  { id: "who-we-share", label: "4. Who we share your information with" },
  { id: "international-transfers", label: "5. International transfers" },
  { id: "retention", label: "6. How long we keep your information" },
  { id: "security", label: "7. Security" },
  { id: "choices-and-rights", label: "8. Your choices and rights" },
  { id: "children", label: "9. Children's privacy" },
  { id: "permissions", label: "10. App permissions" },
  { id: "data-safety", label: "11. Google Play Data Safety" },
  { id: "changes", label: "12. Changes to this policy" },
  { id: "contact", label: "13. Contact us" },
] as const;

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
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 30 August 2026</p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Furrever ("Furrever", "we", "us", or "our") operates the Furrever mobile application
            and the Furrever smart collar (together, the "Service"). This Privacy Policy explains
            what personal information we collect, why we collect it, who we share it with, and the
            choices and rights you have.
          </p>
          <p>
            This policy applies to the Furrever apps for Android and iOS, the Furrever website at{" "}
            <a href={siteUrl} className="text-foreground underline underline-offset-2">
              furrever.com
            </a>
            , and the Furrever backend services at <code className="text-foreground">api.furrever.io</code>
            . It is the privacy policy linked from our Google Play Store and Apple App Store
            listings.
          </p>
          <p>If you do not agree with this policy, please do not use the Service.</p>
        </div>

        <nav aria-label="On this page" className="mt-8 rounded-2xl border border-border bg-surface/60 p-4 sm:p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            On this page
          </p>
          <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-muted-foreground hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
          <section id="who-we-are">
            <h2 className="font-display text-lg sm:text-xl">1. Who we are</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {legalName} is the data controller (and, under India's Digital Personal Data
              Protection Act, 2023, the Data Fiduciary) responsible for your personal information.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              <li>
                <span className="text-foreground">Address:</span> {registeredAddress}
              </li>
              <li>
                <span className="text-foreground">Email:</span>{" "}
                <a href={`mailto:${privacyEmail}`} className="text-foreground hover:text-brand">
                  {privacyEmail}
                </a>
              </li>
              <li>
                <span className="text-foreground">Privacy contact / Grievance Officer:</span>{" "}
                <a href={`mailto:${privacyEmail}`} className="text-foreground hover:text-brand">
                  {privacyEmail}
                </a>
              </li>
            </ul>
          </section>

          <section id="information-we-collect">
            <h2 className="font-display text-lg sm:text-xl">2. Information we collect</h2>

            <h3 className="mt-5 font-display text-base sm:text-lg">2.1 Information you give us</h3>
            <p className="mt-2 text-sm font-medium text-foreground">Account and identity information</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Furrever uses your mobile phone number to create and sign in to your account. We
              collect:
            </p>
            <BulletList
              items={[
                "Your mobile phone number and country code",
                "A one-time verification code (OTP) that you enter to prove you control that number",
                "Your first and last name",
                "Your email address",
                "An optional profile photo",
              ]}
            />

            <p className="mt-4 text-sm font-medium text-foreground">Pet profile information</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              So we can personalise care recommendations for your pet, we collect the details you
              enter about each pet:
            </p>
            <BulletList
              items={[
                "Pet name, species, and breed",
                "Sex, date of birth, and age",
                "Weight, body shape, and energy level",
                "Whether the pet is spayed or neutered",
                'Your top care priority for the pet',
                'Free-text "special notes" you choose to add',
                "Photos of your pet",
              ]}
            />
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              "Special notes" is a free-text field. We do not ask you for veterinary or medical
              records, and we ask that you avoid entering sensitive health information you would
              not want stored. Any information you do enter there is stored and treated under this
              policy.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Safe zones</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              If you set up a safe zone for your pet, we collect the name you give the zone, the
              geographic coordinates of its centre, its radius, its street address, and your alert
              preferences for entering and leaving the zone.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Information about other people</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              If you invite another pet parent to your household, we collect the name, relationship,
              and mobile number you provide for that person. Please only share someone else's
              details if you have their permission to do so. We use these details solely to deliver
              the invitation and to link the accounts.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Website pre-booking</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              If you pre-book a collar on furrever.com, we collect your name, email, phone number,
              city, whether you are a dog or cat parent, and whether you agree to be contacted.
              If you pay a founding reservation or order through the website, we and our payment
              processor collect the information needed to take payment and issue refunds. The
              Furrever mobile app does not collect payment or financial information.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Support correspondence</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              If you contact us for help, we keep the messages you send us and our replies.
            </p>

            <h3 className="mt-6 font-display text-base sm:text-lg">
              2.2 Information collected from your device
            </h3>
            <p className="mt-2 text-sm font-medium text-foreground">Location information</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              With your permission, the app reads your device's approximate or precise location for
              two purposes: to centre the map when you are drawing a safe zone, and to discover
              nearby Wi-Fi networks while setting up a collar. This live device location is used on
              your device and is not transmitted to our servers or stored by us. Only the safe
              zones you deliberately save are sent to us.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The app requests location access only while you are using it. Furrever does not
              collect your phone's location in the background, and we do not use location for
              advertising.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Camera and photo library</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              With your permission, the app can open your camera or photo library so you can attach
              a photo of your pet. We only receive the specific images you choose. We do not scan
              or access the rest of your photo library.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">
              Bluetooth and collar information
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              The app uses Bluetooth to find, pair with, and configure your Furrever collar. Over
              this Bluetooth connection the app reads the collar's hardware identifier, firmware
              version, battery level and status, Wi-Fi connection status, motion sensor readings,
              and satellite positioning data, so it can show you setup progress and device health.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              To connect the collar to your home network, the app writes your Wi-Fi network name
              and password to the collar over the encrypted Bluetooth connection.{" "}
              <strong className="font-medium text-foreground">
                Your Wi-Fi password is never sent to our servers and we never store it.
              </strong>{" "}
              It passes directly from your phone to your collar.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Of this collar information, the device identifier and firmware version are sent to
              our servers so we can associate the collar with your pet.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">
              Collar sensor telemetry (uploaded by the collar)
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              When the collar is powered on and connected to Wi-Fi, it uploads wellness and
              location telemetry to Furrever servers so the app can show live location, safe-zone
              alerts, and health insights. This may include:
            </p>
            <BulletList
              items={[
                "The pet's GPS position and related location history",
                "Motion and activity classifications (for example walk, play, rest)",
                "Resting heart rate, respiratory rate, and skin temperature readings",
                "Sleep and meal or water pattern insights derived from those sensors",
                "Battery level and connectivity status",
              ]}
            />
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This is pet wellness and location data, not a record of your own health. We do not
              collect audio from the collar. Telemetry is stored with your account until you delete
              it or close the account.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">
              Technical and diagnostic information
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              When you use the app we automatically receive:
            </p>
            <BulletList
              items={[
                "Device model, operating system version, and app version",
                "Language and region settings",
                "IP address (which indicates approximate, city-level location)",
                "A randomly generated request identifier used to trace and debug individual requests",
                "Crash reports, including stack traces and the device state at the time of the crash",
                "Product interaction data, such as which screens you open and which features you use",
              ]}
            />

            <p className="mt-4 text-sm font-medium text-foreground">Notifications</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              If you allow notifications, we use them to deliver safe-zone alerts and other
              product messages you have configured. On Android 13 and later this requires the
              notifications permission. You can turn notifications off in system settings.
            </p>

            <h3 className="mt-6 font-display text-base sm:text-lg">2.3 Information we do not collect</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Furrever does not collect payment or financial information in the mobile app, does
              not use advertising identifiers, does not serve advertising, and does not sell
              personal information. We do not collect biometric data, contacts, call logs, SMS
              messages, or your browsing history. We do not collect your location in the
              background.
            </p>
          </section>

          <section id="how-we-use">
            <h2 className="font-display text-lg sm:text-xl">3. How we use your information</h2>
            <PolicyTable
              headers={["Purpose", "Information used", "Legal basis (UK/EU GDPR & India DPDP)"]}
              rows={[
                [
                  "Create your account and sign you in",
                  "Phone number, OTP, tokens",
                  "Performance of a contract / consent",
                ],
                [
                  "Provide pet care features and recommendations",
                  "Name, email, pet profile, photos, collar telemetry",
                  "Performance of a contract",
                ],
                [
                  "Set up, pair, and manage your collar",
                  "Bluetooth and collar data, Wi-Fi credentials (on-device only)",
                  "Performance of a contract",
                ],
                [
                  "Send safe-zone alerts you have configured",
                  "Safe zone coordinates, collar GPS, and preferences",
                  "Performance of a contract",
                ],
                [
                  "Process website pre-bookings and orders",
                  "Name, email, phone, city, payment details (website only)",
                  "Performance of a contract",
                ],
                [
                  "Diagnose crashes and fix defects",
                  "Diagnostic and crash data",
                  "Legitimate interests",
                ],
                [
                  "Understand which features are used, to improve the app",
                  "Product interaction data",
                  "Consent (you can refuse analytics)",
                ],
                [
                  "Respond to your support requests",
                  "Correspondence, account details",
                  "Performance of a contract",
                ],
                [
                  "Keep the Service secure and prevent abuse",
                  "Device, IP, and request data",
                  "Legitimate interests",
                ],
                ["Comply with legal obligations", "As required", "Legal obligation"],
              ]}
            />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We do not use your personal information for automated decision-making that produces
              legal effects, and we do not profile you for advertising.
            </p>
          </section>

          <section id="who-we-share">
            <h2 className="font-display text-lg sm:text-xl">4. Who we share your information with</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We do not sell your personal information and we do not share it for cross-context
              behavioural advertising. We share information only as described below.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Service providers</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              We use the following third parties to operate the Service:
            </p>
            <PolicyTable
              headers={["Provider", "Purpose", "Information shared"]}
              rows={[
                [
                  "Google - Firebase Crashlytics",
                  "Crash and stability reporting",
                  "Diagnostic data, device identifiers, crash traces",
                ],
                [
                  "Google - Firebase Analytics",
                  "Product usage analytics",
                  "App interaction events, device and coarse location data derived from IP",
                ],
                [
                  "Google - Firebase Cloud Messaging",
                  "Push notifications you have allowed",
                  "Device push token and notification payload",
                ],
                [
                  "Google - Maps Platform",
                  "Displaying maps and geocoding safe-zone addresses",
                  "Map queries and coordinates",
                ],
                [
                  "SMS / OTP delivery partner",
                  "Delivering one-time verification codes",
                  "Your phone number",
                ],
                [
                  "Cloud hosting provider",
                  "Hosting our backend and stored photos",
                  "All information you submit to us",
                ],
                [
                  "Payment processor (website only)",
                  "Founding reservations and orders on furrever.com",
                  "Payment details needed to charge and refund",
                ],
              ]}
            />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Each provider is permitted to use this information only to provide services to us.
              See Google's privacy policy at{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-foreground underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
              .
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Others in your household</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              If you accept or send a household invitation, the pet profiles in that household -
              including pet details, photos, safe zones, and collar insights - are visible to the
              other pet parents in it.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Your veterinarian</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              We share a health report with your vet only when you choose to export one.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Legal and safety disclosures</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              We may disclose information where we reasonably believe it is required by law, court
              order, or a valid request from a public authority, or where necessary to protect our
              rights, your safety, or the safety of others, or to investigate fraud or abuse.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Business transfers</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              If we are involved in a merger, acquisition, financing, or sale of assets, your
              information may be transferred as part of that transaction. We will notify you before
              your information becomes subject to a materially different privacy policy.
            </p>
          </section>

          <section id="international-transfers">
            <h2 className="font-display text-lg sm:text-xl">5. International transfers</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {legalName} is established in India. Our service providers, including Google, may
              process your information in countries other than your own, including the United
              States. Where we transfer personal information out of the UK or the European Economic
              Area, we rely on appropriate safeguards such as the European Commission's Standard
              Contractual Clauses or an adequacy decision. Transfers from India are made in
              accordance with the Digital Personal Data Protection Act, 2023. You can request a
              copy of the safeguards we use by contacting us.
            </p>
          </section>

          <section id="retention">
            <h2 className="font-display text-lg sm:text-xl">6. How long we keep your information</h2>
            <PolicyTable
              headers={["Information", "Retention"]}
              rows={[
                ["Account and pet profile data", "For as long as your account is active"],
                [
                  "Pet photos",
                  "For as long as your account is active, or until you delete them",
                ],
                ["Collar telemetry (GPS, activity, vitals)", "For as long as your account is active"],
                ["Safe zones", "Until you delete them, or your account is closed"],
                ["Crash and diagnostic data", "Up to 90 days"],
                ["Analytics data", "Up to 14 months"],
                ["Server access logs", "Up to 90 days"],
                [
                  "Support correspondence",
                  "While your account is active, and up to 24 months after the last message",
                ],
                [
                  "Website pre-booking and order records",
                  "As needed to fulfil the order, process refunds, and meet tax or accounting rules",
                ],
              ]}
            />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              When you delete your account we delete or irreversibly anonymise your personal
              information within 30 days, except where we must keep it to comply with a legal
              obligation, prevent fraud, or resolve a dispute. Freezing or deactivating an account
              is not the same as deletion.
            </p>
          </section>

          <section id="security">
            <h2 className="font-display text-lg sm:text-xl">7. Security</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We protect your information with technical and organisational measures, including:
            </p>
            <BulletList
              items={[
                "All traffic between the app and our servers is encrypted using HTTPS/TLS.",
                "Cloud backup and device-to-device transfer of the app's data are disabled on Android, so your session is not copied off your device.",
                "Your Wi-Fi credentials are sent only to your collar and are never stored by us.",
                "Access to production systems is restricted to authorised personnel.",
              ]}
            />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              No method of transmission or storage is completely secure, so we cannot guarantee
              absolute security. If we become aware of a breach affecting your personal
              information, we will notify you and the relevant regulator where the law requires it.
            </p>
          </section>

          <section id="choices-and-rights">
            <h2 className="font-display text-lg sm:text-xl">8. Your choices and rights</h2>
            <p className="mt-2 text-sm font-medium text-foreground">Device permissions</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              You can grant or revoke location, camera, photo, Bluetooth, nearby devices, and
              notification permissions at any time in your device settings. Revoking a permission
              may disable the related feature - for example, revoking Bluetooth prevents collar
              setup.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Your data protection rights</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Depending on where you live, you may have the right to:
            </p>
            <BulletList
              items={[
                "Access the personal information we hold about you",
                "Correct information that is inaccurate or incomplete",
                "Delete your personal information",
                "Restrict or object to our processing of your information",
                "Receive your information in a portable, machine-readable format",
                "Withdraw consent where we rely on consent",
                "Lodge a complaint with your data protection authority or, in India, with our Grievance Officer",
              ]}
            />
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              To exercise any of these rights, email{" "}
              <a href={`mailto:${privacyEmail}`} className="text-foreground hover:text-brand">
                {privacyEmail}
              </a>
              . We will respond within one month, or sooner where the law requires. We will not
              discriminate against you for exercising your rights.
            </p>

            <p className="mt-4 text-sm font-medium text-foreground">Deleting your account</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              If you create an account in the Furrever app, you can request deletion of that
              account and all associated data:
            </p>
            <BulletList
              items={[
                "In the Furrever app: from Settings or your account screen.",
                `On the web (no login required): ${deletionUrl}`,
                `By email: ${privacyEmail} with the subject "Account deletion request", including the phone number used to sign in.`,
              ]}
            />
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This permanently deletes the account. It is not a freeze or deactivation. See{" "}
              <Link to="/account-deletion" className="text-foreground underline underline-offset-2">
                Delete your Furrever account
              </Link>{" "}
              for what is removed and what we may retain where the law requires it.
            </p>

            <h3 className="mt-6 font-display text-base sm:text-lg">
              If you are in India
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You have the rights of a Data Principal under the Digital Personal Data Protection
              Act, 2023, including access, correction, erasure, and grievance redressal. Contact
              our Grievance Officer at{" "}
              <a href={`mailto:${privacyEmail}`} className="text-foreground hover:text-brand">
                {privacyEmail}
              </a>{" "}
              or write to us at the registered address above.
            </p>

            <h3 className="mt-6 font-display text-base sm:text-lg">
              If you are in the European Union or United Kingdom
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You may lodge a complaint with your national data protection authority. In the UK
              this is the Information Commissioner's Office (
              <a
                href="https://ico.org.uk"
                className="text-foreground underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ico.org.uk
              </a>
              ).
            </p>

            <h3 className="mt-6 font-display text-base sm:text-lg">If you are in California</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Under the CCPA/CPRA you have the rights to know, delete, and correct your personal
              information, and to opt out of its sale or sharing. We do not sell or share your
              personal information as those terms are defined by the CCPA. In the twelve months
              preceding the date of this policy, we collected the categories of information
              described in Section 2 for the purposes described in Section 3.
            </p>
          </section>

          <section id="children">
            <h2 className="font-display text-lg sm:text-xl">9. Children's privacy</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Furrever is not directed at children and is intended for users aged 18 and over. We
              do not knowingly collect personal information from anyone under 18. The Google Play
              listing is not designed for children and is not in the Designed for Families
              programme. If you believe a child has provided us with personal information, contact
              us at{" "}
              <a href={`mailto:${privacyEmail}`} className="text-foreground hover:text-brand">
                {privacyEmail}
              </a>{" "}
              and we will delete it.
            </p>
          </section>

          <section id="permissions">
            <h2 className="font-display text-lg sm:text-xl">10. App permissions (Android / iOS)</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The Furrever app requests the permissions below. None of them are used for
              advertising. You can deny a permission; the related feature will not work until you
              allow it.
            </p>
            <PolicyTable
              headers={["Permission", "When we ask", "Why we need it"]}
              rows={[
                [
                  "Location (precise / approximate), while using the app",
                  "Safe-zone setup and collar Wi-Fi setup",
                  "Centre the map and find nearby Wi-Fi. Not used in the background. Phone location is not stored on our servers.",
                ],
                [
                  "Bluetooth / nearby devices",
                  "Collar pairing and setup",
                  "Find, connect to, and configure the Furrever collar.",
                ],
                [
                  "Camera",
                  "When you add a pet or profile photo",
                  "Capture a photo you choose to upload. We do not access the camera otherwise.",
                ],
                [
                  "Photos / media",
                  "When you pick an existing image",
                  "Attach the specific photo you select. We do not scan your library.",
                ],
                [
                  "Notifications",
                  "After you enable alerts",
                  "Safe-zone and product alerts you have configured.",
                ],
                [
                  "Wi-Fi / local network",
                  "Collar setup",
                  "List nearby networks so the collar can join your home Wi-Fi. The password stays on your phone and collar.",
                ],
              ]}
            />
          </section>

          <section id="data-safety">
            <h2 className="font-display text-lg sm:text-xl">11. Google Play Data Safety summary</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This section matches the Data Safety form on our Google Play listing. Data is
              collected to provide app functionality, analytics (with consent), and crash
              diagnostics. Data is encrypted in transit. We do not sell data or use it for
              advertising.
            </p>
            <PolicyTable
              headers={["Data type (Play Console)", "Collected?", "Shared with third parties?", "Purpose"]}
              rows={[
                [
                  "Location - approximate",
                  "Yes (IP; phone location used on-device only)",
                  "Yes - Google Maps (map queries); Google Analytics (coarse IP-derived location)",
                  "App functionality, analytics",
                ],
                [
                  "Location - precise",
                  "Yes (collar GPS and saved safe zones)",
                  "Yes - Google Maps (map queries and geocoding)",
                  "App functionality",
                ],
                [
                  "Personal info - name, email, phone, address",
                  "Yes",
                  "Yes - SMS partner (phone); hosting provider",
                  "App functionality",
                ],
                [
                  "Photos and videos",
                  "Yes (pet and profile photos you upload)",
                  "Yes - hosting provider",
                  "App functionality",
                ],
                [
                  "App activity - app interactions",
                  "Yes",
                  "Yes - Firebase Analytics",
                  "Analytics",
                ],
                [
                  "App info and performance - crash logs and diagnostics",
                  "Yes",
                  "Yes - Firebase Crashlytics",
                  "App functionality / diagnostics",
                ],
                [
                  "Device or other IDs",
                  "Yes (collar ID, request IDs, crash identifiers)",
                  "Yes - Firebase Crashlytics",
                  "App functionality, diagnostics",
                ],
                [
                  "Financial info, health and fitness (your health), messages, contacts, calendar, web browsing, advertising ID",
                  "No",
                  "No",
                  "Not collected",
                ],
              ]}
            />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pet GPS, activity and vitals are stored as part of the Service. They are not the
              "Health and fitness" category in Play Console, which covers the human user's health.
            </p>
          </section>

          <section id="changes">
            <h2 className="font-display text-lg sm:text-xl">12. Changes to this policy</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We may update this policy from time to time. When we make material changes we will
              update the "Last updated" date above and notify you in the app or by email before the
              changes take effect. Please review this page periodically.
            </p>
          </section>

          <section id="contact">
            <h2 className="font-display text-lg sm:text-xl">13. Contact us</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              If you have questions about this policy or how we handle your information:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              <li>
                <span className="text-foreground">Email:</span>{" "}
                <a href={`mailto:${privacyEmail}`} className="text-foreground hover:text-brand">
                  {privacyEmail}
                </a>
              </li>
              <li>
                <span className="text-foreground">Post:</span> {legalName}, {registeredAddress}
              </li>
              <li>
                <span className="text-foreground">Delete account:</span>{" "}
                <Link to="/account-deletion" className="text-foreground hover:text-brand">
                  furrever.com/account-deletion
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PolicyTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-xl text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            {headers.map((header) => (
              <th key={header} className="px-3 py-2.5 font-medium text-foreground">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border last:border-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2.5 align-top text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
