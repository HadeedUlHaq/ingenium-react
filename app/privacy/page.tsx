import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site/footer";
import { Container } from "@/components/site/plate";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Iron Burger uses personal information for enquiries, catering bookings and website services.",
  alternates: { canonical: "/privacy" },
};

const linkClass = "underline underline-offset-4 hover:text-white";
const headingClass = "display text-3xl text-white";

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-line bg-black">
        <Container className="flex min-h-16 items-center justify-between gap-4 py-3 lg:min-h-20">
          <a href="/" aria-label="Iron Burger, home" className="flex items-center gap-3">
            <Image
              src="/iron-burger.png"
              alt=""
              width={1254}
              height={1254}
              sizes="44px"
              className="size-9 shrink-0 lg:size-11"
            />
            <span className="display text-2xl text-white lg:text-3xl">Iron Burger</span>
          </a>
          <a href="/" className="display inline-flex min-h-11 items-center text-xl text-white/85 hover:text-white">
            Back home
          </a>
        </Container>
      </header>

      <main id="main-content" className="bg-black py-12 sm:py-16">
        <Container className="max-w-3xl">
          <h1 className="display text-5xl text-white sm:text-6xl">Privacy Policy</h1>
          <p className="mono mt-4 text-sm text-grey">
            Last updated: <time dateTime="2026-10-09">9 October 2026</time>
          </p>

          <div className="mt-8 space-y-8 font-sans text-base leading-relaxed text-white/85">
            <section aria-labelledby="who-we-are">
              <h2 id="who-we-are" className={headingClass}>Who we are</h2>
              <p className="mt-3">
                Iron Burger is responsible for how your personal information is used (the data controller).
                This policy covers our website, enquiries, catering bookings and event order services.
                For privacy questions or requests, email{" "}
                <a href={`mailto:${siteConfig.email}`} className={`${linkClass} break-words`}>{siteConfig.email}</a>.
              </p>
            </section>

            <section aria-labelledby="information">
              <h2 id="information" className={headingClass}>Information we collect</h2>
              <p className="mt-3">
                Our booking form collects your name, organisation or event name, email, phone or WhatsApp
                number, event date, venue and postcode, event type, estimated burger quantity, outdoor
                space, parking or loading access, and any notes you provide. We also receive information
                you send by email. Please avoid unnecessary sensitive information in notes.
              </p>
              <p className="mt-3">
                Event orders record ticket identifiers, quantity, status and timestamps. Staff-login
                security records include IP addresses, attempt times and outcomes. Website providers
                may process technical logs, including IP addresses, browser details and requests.
              </p>
            </section>

            <section aria-labelledby="purposes">
              <h2 id="purposes" className={headingClass}>Why we use it</h2>
              <p className="mt-3">
                We use enquiry details to reply, prepare quotes and arrange catering; order details
                to prepare food and show collection status. Our lawful basis is taking steps at your
                request before a contract, or fulfilling our contract with you. For organisation
                contacts and general correspondence, we rely on our legitimate interest in responding
                and running our catering business. Security logs and staff access serve our legitimate
                interest in preventing misuse and keeping services working. Legal obligations apply
                where records must be kept by law.
              </p>
              <p className="mt-3">
                Providing enquiry details is your choice, but without the required contact fields we
                cannot process the form. We do not make automated decisions about you with legal or
                similarly significant effects.
              </p>
            </section>

            <section aria-labelledby="providers">
              <h2 id="providers" className={headingClass}>Providers and processing</h2>
              <p className="mt-3">
                The public booking form sends your details directly to Formspree, which may also
                collect hardware, IP address, browser, domain, access time and referrer information.
                Its <a href="https://formspree.io/legal/privacy-policy/" className={linkClass}>privacy policy</a>{" "}
                describes processing in the US and other countries where it operates. Vercel hosts
                the website; Supabase supports event orders and staff-access security. Email providers
                process correspondence. Information may be disclosed where legally required.
              </p>
              <p className="mt-3">
                Providers may process information outside the UK. Where UK international transfer
                rules apply, a transfer requires an applicable adequacy regulation, appropriate
                safeguards or a permitted exception. Contact us for details of the arrangements
                applicable to your information.
              </p>
            </section>

            <section aria-labelledby="cookies">
              <h2 id="cookies" className={headingClass}>Cookies</h2>
              <p className="mt-3">
                The website does not use analytics or advertising tracking. Staff sign-in sets the
                necessary <code>hsb_staff</code> cookie to authorise staff access. It is HttpOnly
                (unavailable to page scripts), expires after 12 hours and is cleared on sign-out.
                Blocking it prevents staff sign-in.
              </p>
            </section>

            <section aria-labelledby="retention">
              <h2 id="retention" className={headingClass}>How long information is kept</h2>
              <p className="mt-3">
                Retention depends on the enquiry or booking, service delivery, necessary business
                records, legal obligations and resolving disputes. We keep information only
                as long as needed for those purposes. Provider logs and backups may have separate
                retention arrangements. Contact us about a particular record or deletion request.
              </p>
            </section>

            <section aria-labelledby="rights">
              <h2 id="rights" className={headingClass}>Your rights</h2>
              <p className="mt-3">
                Under UK data protection law, you can request access, correction, deletion,
                restriction or portability of your information, and object to processing based on
                legitimate interests. Rights depend on the circumstances. If processing relies on
                consent, you can withdraw it. Email us to exercise your rights; responses are normally
                due within one month.
              </p>
              <p className="mt-3">
                You can raise concerns with us and complain to the UK Information Commissioner&apos;s
                Office (ICO) at{" "}
                <a href="https://ico.org.uk/make-a-complaint/" className={linkClass}>ico.org.uk/make-a-complaint</a>.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
