import { Navigation } from "@/components/landing/navigation";
import { AboutSection } from "@/components/landing/about-section";
import { EthosSection } from "@/components/landing/ethos-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata = {
  title: "About Us — Ingenium",
  description: "Ingenium is built by a team with deep roots in construction delivery and AI engineering — building the intelligence layer construction has been missing.",
};

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
