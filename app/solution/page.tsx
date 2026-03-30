import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { Navigation } from "@/components/landing/navigation";
import { SoftwareApplicationJsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Design Coordination Software",
  description:
    "See how Ingenium reviews construction drawings, tracks revisions, applies lessons learned, and compiles evidence without replacing your current workflow.",
  path: "/solution",
  keywords: [
    "AI design coordination software",
    "construction drawing review workflow",
    "design review automation for construction",
    "drawing revision tracking software",
  ],
});

export default function SolutionPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SoftwareApplicationJsonLd />
      <Navigation />
      <div className="pt-20">
        <HowItWorksSection />
        <InfrastructureSection />
        <CtaSection />
      </div>
      <FooterSection />
    </main>
  );
}
