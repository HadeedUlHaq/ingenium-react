import { AboutSection } from "@/components/landing/about-section";
import { CtaSection } from "@/components/landing/cta-section";
import { EthosSection } from "@/components/landing/ethos-section";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Ingenium",
  description:
    "Meet the team behind Ingenium, construction design review software built at the intersection of project delivery and AI engineering.",
  path: "/about",
  keywords: [
    "about Ingenium",
    "construction AI software company",
    "construction design review software team",
  ],
});

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <div className="pt-20">
        <AboutSection />
        <EthosSection />
        <CtaSection />
      </div>
      <FooterSection />
    </main>
  );
}
