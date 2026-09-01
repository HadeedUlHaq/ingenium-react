import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Big_Shoulders, Libre_Franklin } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// JSX comments ({/* ... */}) are stripped at compile time and never reach
// the rendered HTML, so the direction contract is emitted as a literal
// HTML comment via dangerouslySetInnerHTML instead.
const DIRECTION_CONTRACT = `<!--
THESIS: one badge, worn by every surface. The marketing site and the
event screens are cut from the same brand object - gold bun, chrome
IRON letters, charcoal core - refusing both the dark-photo-hero
template caterers ship and the split-personality of a branded site
bolted onto unbranded tooling.
OWN-WORLD: charcoal ground (iron-black / charcoal), gold carrying the
brand (bright / gold / deep, gilded gradient faces), chrome as the
voice (engraved headlines and numerals), signal red reserved for CTAs
and heat; sesame studs where fasteners would go; one thin gold rule as
the only divider. Big Shoulders display over Libre Franklin body.
STORY: an organizer lands on the badge, reads capacity and halal proof
as gilded data plates, and books a date; the same badge then runs the
counter, the grill, and the customer's own screen on event day.
FIRST VIEWPORT: the badge full-bleed on a gold-rimmed charcoal panel,
chrome headline beneath, red CTA, three gilded trust plates.
FORM: The Gold Badge - pinned by the brand logo itself, no roll.
FINISH: unreviewed and undocumented is unfinished; this build ends
with the finish review, the verdict, and DESIGN.md carrying the token
tables and the rules that keep them accessible.
-->`;

const display = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const TITLE = "Live Smash Burger Catering in Watford | Iron Burger";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: siteConfig.legalName,
    title: TITLE,
    description: siteConfig.description,
    images: [{ url: "/iron-burger.png", width: 1254, height: 1254, alt: siteConfig.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: siteConfig.description,
    images: ["/iron-burger.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#15130f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans antialiased`}>
        <div
          style={{ display: "none" }}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }}
        />
        {children}
      </body>
    </html>
  );
}
