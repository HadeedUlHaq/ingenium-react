import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type CreateMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  imagePath?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
  imagePath = siteConfig.logoPath,
  noIndex = false,
}: CreateMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const image = absoluteUrl(imagePath);

  return {
    title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.legalName,
      locale: siteConfig.locale,
      images: [
        {
          url: image,
          alt: `${siteConfig.legalName} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
