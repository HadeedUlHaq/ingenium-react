import { siteConfig } from "@/lib/site";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Craft } from "@/components/site/craft";
import { Packages } from "@/components/site/packages";
import { WhyUs } from "@/components/site/why-us";
import { BookingForm } from "@/components/site/booking-form";
import { Faq } from "@/components/site/faq";
import { Gallery } from "@/components/site/gallery";
import { FAQS } from "@/lib/faqs";
import { SiteFooter } from "@/components/site/footer";
import { PhotoSlot } from "@/components/site/photo-slot";

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
    <div className="min-h-dvh bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SiteNav />
      <main>
        <Hero />
        <Craft />
        <PhotoSlot
          slot="band-1"
          brief="A wide shot of the griddle mid-service: steam, sear, tongs."
          alt="The griddle mid-service"
          className="aspect-[16/7] sm:aspect-[21/7]"
        />
        <Packages />
        <WhyUs />
        <PhotoSlot
          slot="band-2"
          brief="Guests eating at an event, evening light, the stall behind them."
          alt="Guests at an Iron Burger event"
          className="aspect-[16/7] sm:aspect-[21/7]"
        />
        <BookingForm />
        <Faq />
        <Gallery />
      </main>
      <SiteFooter />
    </div>
  );
}
