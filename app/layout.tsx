import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { StickyBookDemoButton } from "@/components/landing/sticky-book-demo-button";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Construction Design Review Software | Ingenium",
    template: `%s | ${siteConfig.legalName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  referrer: "origin-when-cross-origin",
  keywords: [...siteConfig.homepageKeywords],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Construction Design Review Software | Ingenium",
    description: siteConfig.description,
    siteName: siteConfig.legalName,
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.logoPath,
        alt: `${siteConfig.legalName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction Design Review Software | Ingenium",
    description: siteConfig.description,
    images: [siteConfig.logoPath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/cropped-site-icon.png",
    shortcut: "/cropped-site-icon.png",
    apple: "/cropped-site-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${instrumentSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <OrganizationJsonLd />
        {children}
        <StickyBookDemoButton />
      </body>
    </html>
  );
}
