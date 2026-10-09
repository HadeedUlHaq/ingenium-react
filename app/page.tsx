import { siteConfig } from "@/lib/site";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Craft } from "@/components/site/craft";
import { FeatureVideo } from "@/components/site/feature-video";
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
        <FeatureVideo />
        <PhotoSlot
          slot="griddle-wide"
          brief="A wide shot of the griddle mid-service: steam, sear and a burger press."
          alt="A black-gloved cook pressing thin patties onto a steaming steel griddle"
          imageClassName="object-[center_65%] sm:object-[center_40%]"
          className="aspect-[4/3] sm:aspect-[21/7]"
        />
        <Packages />
        <WhyUs />
        <PhotoSlot
          slot="live-experience-wide"
          mobileSlot="live-experience-dark"
          brief="A wide evening food-truck gathering under warm string lights."
          alt="Guests at outdoor picnic tables beside warmly lit food trucks under an evening sky"
          imageClassName="object-[center_65%] md:object-center"
          className="aspect-[4/3] sm:aspect-[21/7]"
        />
        <BookingForm />
        <Faq />
        <Gallery />
      </main>
      <SiteFooter />
    </div>
  );
}
