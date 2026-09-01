import { siteConfig } from "@/lib/site";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Craft } from "@/components/site/craft";
import { Packages } from "@/components/site/packages";
import { WhyUs } from "@/components/site/why-us";
import { BookingForm } from "@/components/site/booking-form";
import { Faq } from "@/components/site/faq";
import { FAQS } from "@/lib/faqs";
import { SiteFooter } from "@/components/site/footer";
import { Seam } from "@/components/site/plate";

// Only facts the brief actually states - no invented ratings, prices, or hours.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  additionalType: "https://schema.org/Caterer",
  name: siteConfig.legalName,
  description: siteConfig.description,
  email: siteConfig.email,
  url: siteConfig.url,
  servesCuisine: "Burgers",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Watford",
    postalCode: "WD24",
    addressCountry: "GB",
  },
  areaServed: ["Watford", "Hertfordshire", "Greater London"],
  mainEntityOfPage: {
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
};

export default function Home() {
  return (
    <div className="min-h-dvh bg-gunmetal-deep text-steel [scroll-behavior:smooth]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SiteNav />
      <main>
        <Hero />
        <Seam />
        <Craft />
        <Seam />
        <Packages />
        <Seam />
        <WhyUs />
        <Seam />
        <BookingForm />
        <Seam />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
