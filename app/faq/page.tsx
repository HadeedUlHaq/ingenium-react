import { CollapsibleListItem } from "@/components/landing/collapsible-list-item";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/seo";
import { faqItems } from "@/lib/site";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Construction Design Review Software FAQ",
  description:
    "Answers to common questions about Ingenium, including implementation, drawing revisions, workflow compatibility, and security.",
  path: "/faq",
  keywords: [
    "construction design review software FAQ",
    "AI design review implementation",
    "construction software security FAQ",
  ],
});

export default function FaqPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <FaqJsonLd />
      <Navigation />

      <div className="site-page-offset">
        <section className="site-section relative">
          <div className="site-shell">
            <div className="site-intro">
              <span className="site-kicker">
                FAQ&apos;s
              </span>
              <h1 className="max-w-4xl text-3xl font-display leading-[1.02] tracking-tight lg:text-5xl">
                <span className="font-semibold text-gradient-heading">Common questions,</span>
                <span className="block font-medium text-muted-foreground">clear answers.</span>
              </h1>
            </div>

            <div className="w-full">
              {faqItems.map((faq, index) => (
                <CollapsibleListItem
                  key={faq.question}
                  title={faq.question}
                  description={faq.answer}
                  index={index}
                  initiallyOpen={index === 0}
                  animateIn
                />
              ))}
            </div>

            <div className="site-outro flex flex-col items-start gap-4 border-t border-foreground/10 pt-8 sm:flex-row sm:items-center">
              <p className="text-base font-medium text-muted-foreground">
                Still have questions?
              </p>
              <Link
                href="/contact"
                className="btn-gradient inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
      </div>

      <FooterSection />
    </main>
  );
}
