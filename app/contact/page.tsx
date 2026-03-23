import { Navigation } from "@/components/landing/navigation";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata = {
  title: "Contact — Ingenium",
  description: "Book a demo or get in touch with the Ingenium team.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <div className="pt-20">
        <CtaSection />
      </div>
      <FooterSection />
    </main>
  );
}
