import { CtaSection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { FooterSection } from "@/components/landing/footer-section";
import { HeroSection } from "@/components/landing/hero-section";
import { Navigation } from "@/components/landing/navigation";
import { PilotPopup } from "@/components/landing/pilot-popup";
import { SecuritySection } from "@/components/landing/security-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { SoftwareApplicationJsonLd } from "@/components/seo/json-ld";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SoftwareApplicationJsonLd />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <SecuritySection />
      <CtaSection />
      <FooterSection />
      <PilotPopup />
    </main>
  );
}
