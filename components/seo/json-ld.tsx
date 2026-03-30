import { absoluteUrl } from "@/lib/seo";
import { faqItems, siteConfig } from "@/lib/site";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.legalName,
        url: siteConfig.url,
        logo: absoluteUrl(siteConfig.logoPath),
        email: siteConfig.email,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteConfig.email,
            url: absoluteUrl("/contact"),
          },
        ],
      }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: siteConfig.legalName,
        applicationCategory: "BusinessApplication",
        applicationSuite: "Construction design review software",
        operatingSystem: "Web",
        description: siteConfig.description,
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.logoPath),
        featureList: [
          "Cross-discipline drawing review",
          "Drawing revision tracking",
          "Design coordination issue detection",
          "Evidence packs for workshops, tenders, and compliance reviews",
          "Workflow compatibility with existing document management systems",
        ],
        creator: {
          "@type": "Organization",
          name: siteConfig.legalName,
        },
      }}
    />
  );
}

export function FaqJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  keywords: string[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished,
        dateModified: datePublished,
        author: {
          "@type": "Organization",
          name: siteConfig.legalName,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.legalName,
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl(siteConfig.logoPath),
          },
        },
        mainEntityOfPage: absoluteUrl(path),
        keywords,
      }}
    />
  );
}
