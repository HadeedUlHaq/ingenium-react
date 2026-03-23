import { Navigation } from "@/components/landing/navigation";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata = {
  title: "How It Works — Ingenium",
  description: "Ingenium spots issues early, quantifies change, applies lessons learned, and compiles evidence — embedded into your existing workflows.",
};

export default function SolutionPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
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
