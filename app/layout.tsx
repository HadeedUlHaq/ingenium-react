import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bebas_Neue, Courier_Prime, Libre_Franklin } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// JSX comments ({/* ... */}) are stripped at compile time and never reach
// the rendered HTML, so the direction contract is emitted as a literal
// HTML comment via dangerouslySetInnerHTML instead.
const DIRECTION_CONTRACT = `<!--
THESIS: a burger counter's own graphic language - the one the best
London smash-burger brands use - executed straight, at full fidelity,
across the whole product. It refuses both the badge-themed site that
preceded it and the warm-cream food-blog default: the UI is monochrome
so that the food, when the photos land, is the only colour on the page.
OWN-WORLD: pure black ground with one raised near-black band; white
condensed display caps at monumental scale (Bebas Neue); typewriter
mono meta in grey (Courier Prime); Libre Franklin body; square
corners; hairline rules as the only divider; white panels as the rare
inversion; full-bleed photo slots that hold their space until filled.
STORY: an organizer lands on a full-bleed hero, reads the offer as a
counter menu would print it, sees capacity as ruled figures, and books
on a white panel that reads like a card handed across the counter.
FIRST VIEWPORT: full-bleed photo slot, the headline set huge and
centred over it, black header with the badge and a BOOK link.
FORM: The Counter - the user pinned bleecker.co.uk as the reference;
standing-exit canon executed at its craft level, no roll.
FINISH: unreviewed and undocumented is unfinished; this build ends
with the finish review, the verdict, and DESIGN.md.
-->`;

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const mono = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
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
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable} ${body.variable} font-sans antialiased`}>
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
