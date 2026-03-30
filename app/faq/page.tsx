import { CollapsibleListItem } from "@/components/landing/collapsible-list-item";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/seo";
import { faqItems } from "@/lib/site";

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

      <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 lg:mb-24">
            <span className="mb-6 inline-flex items-center gap-3 text-sm font-display text-muted-foreground">
              <span className="h-px w-8 bg-foreground/30" />
              FAQ&apos;s
            </span>
            <h1 className="text-4xl font-display tracking-tight leading-[0.95] lg:text-7xl">
              <span className="font-bold text-gradient-heading">Common questions,</span>
              <br />
              <span className="font-normal text-muted-foreground">clear answers.</span>
            </h1>
          </div>

          <div className="max-w-4xl">
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

          <div className="mt-20 flex flex-col items-start gap-6 border-t border-foreground/10 pt-12 sm:flex-row sm:items-center">
            <p className="font-display text-muted-foreground">
              Still have questions?
            </p>
            <a
              href="https://calendly.com/ingeniumsoftware"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
