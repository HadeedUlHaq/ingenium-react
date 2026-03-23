"use client";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { CollapsibleListItem } from "@/components/landing/collapsible-list-item";

const faqs = [
  {
    question: "How much internal resource is required from our side?",
    answer:
      "Minimal. Ingenium connects to your existing document management environment such as Aconex, 4P, Dalux or SharePoint. Once access is provisioned, we configure the system around your project structure and priorities, with no additional administrative burden placed on your team.",
  },
  {
    question: "Are you able to keep up with design revisions?",
    answer:
      "Yes. Ingenium continuously tracks drawing updates and compares revisions, ensuring changes are identified and assessed as your design evolves. If an older revision is surfaced, it is clearly marked with a watermark to avoid confusion.",
  },
  {
    question: "What training and support do you provide?",
    answer:
      "Ingenium is designed to be intuitive, but we take a hands-on approach to onboarding. Founders lead initial setup and training, followed by ongoing engagement sessions to ensure maximum value. We provide support both in person and remotely, with rapid response to technical queries.",
  },
  {
    question: "Can other disciplines such as Operations or Commercial benefit?",
    answer:
      "Yes. While design coordination is the focal point, operations teams can instantly retrieve relevant design information and carry out structured drawing reviews aligned to site milestones, and commercial teams can track change across drawing revisions, summarise scope movement and support tender or valuation pack compilation. Design clarity benefits the entire project lifecycle.",
  },
  {
    question: "Is our data secure?",
    answer:
      "Yes. Ingenium operates within a private hosted environment using encryption in transit and at rest, with access controlled via role-based permissions. We are Cyber Essentials certified and align with enterprise security best practices.",
  },
];

export default function FaqPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16 lg:mb-24">
            <span className="inline-flex items-center gap-3 text-sm font-display text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              FAQ&apos;s
            </span>
            <h1 className="text-4xl lg:text-7xl font-display tracking-tight leading-[0.95]">
              <span className="text-gradient-heading font-bold">Common questions,</span>
              <br />
              <span className="text-muted-foreground font-normal">clear answers.</span>
            </h1>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl">
            {faqs.map((faq, i) => (
              <CollapsibleListItem
                key={i}
                title={faq.question}
                description={faq.answer}
                index={i}
                initiallyOpen={i === 0}
                animateIn
              />
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-20 pt-12 border-t border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="text-muted-foreground font-display">
              Still have questions?
            </p>
            <a
              href="https://calendly.com/ingeniumsoftware"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient inline-flex items-center justify-center gap-2 px-8 h-12 text-sm font-semibold rounded-full"
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
