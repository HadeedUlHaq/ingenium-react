import { ContactSection } from "@/components/landing/contact-section";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Book a Construction Design Review Demo",
  description:
    "See what to expect from an Ingenium demo and share your current design workflow, delivery bottlenecks, and review priorities.",
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
      <div className="site-page-offset">
        <ContactSection />
      </div>
      <FooterSection />
    </main>
  );
}
