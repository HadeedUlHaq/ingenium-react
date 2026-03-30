import { ContactSection } from "@/components/landing/contact-section";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Book a Construction Design Review Demo",
  description:
    "Book a demo with Ingenium to see AI construction design review software in action and discuss your current design coordination workflow.",
  path: "/contact",
  keywords: [
    "book construction design review demo",
    "AI construction software demo",
    "design coordination software demo",
  ],
});

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <div className="pt-20">
        <ContactSection />
      </div>
      <FooterSection />
    </main>
  );
}
