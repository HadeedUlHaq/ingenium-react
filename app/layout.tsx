import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Anton, Big_Shoulders, Libre_Franklin, VT323 } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// JSX comments ({/* ... */}) are stripped at compile time and never reach
// the rendered HTML, so the direction contract is emitted as a literal
// HTML comment via dangerouslySetInnerHTML instead.
const DIRECTION_CONTRACT = `<!--
THESIS: every order is one carbon-copy docket at three scales - order
slip, kitchen card, customer copy - refusing the clean white POS-card
default this category ships.
OWN-WORLD: cream paper ground, ink black, carbon blue (cooking), stamp
red (late), pass green (ready); Anton stamped numerals, VT323
dot-matrix meta, Libre Franklin body; perforated seams, stepped
no-ease motion.
STORY: the order taker prints a ticket in seconds; the kitchen works
strict FIFO off the rail; the customer's copy flips from yellow
(cooking) to green (ready) with a stamp thunk, chime, and buzz.
FIRST VIEWPORT: a torn ticket rail - monumental stamped ticket number
top-left, name/qty below, full-width stamp action at thumb reach.
FORM: The Docket Rail, user-locked pick card, seed key 0e1cb27e.
FINISH: unreviewed and undocumented is unfinished; this build ends
with the finish review, the verdict, DESIGN.md, and every shipping
raster carrying its provenance.

PUBLIC SITE (/) - a second surface, its own world:
THESIS: the catering site is machined from the logo's own material -
Hadeed means steel - refusing the dark-photo-hero template every
caterer ships, and needing no food photography that does not exist.
OWN-WORLD: gunmetal ground, brushed-steel plates fastened with real
screw heads, engraved headlines, one seared ember accent; Big
Shoulders machined caps over Libre Franklin body; welded seams as
the only section divider.
STORY: an event organizer lands, reads capacity and halal proof as
stamped data plates, and books a date in one form.
FIRST VIEWPORT: the plate logo full-bleed on a screwed steel panel,
engraved headline beneath, ember CTA, three riveted trust badges.
FORM: The Bolted Steel Plate, delegated pick card, seed key 5e350b57.
-->`;

const stamp = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-stamp",
  display: "swap",
});

const dotMatrix = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dotmatrix",
  display: "swap",
});

const body = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plate = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-plate",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Live Smash Burger Catering in Watford | Hadeed Ul Haq",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: siteConfig.legalName,
    title: "Live Smash Burger Catering in Watford | Hadeed Ul Haq",
    description: siteConfig.description,
    images: [{ url: "/logo-plate.png", width: 2172, height: 724, alt: siteConfig.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Smash Burger Catering in Watford | Hadeed Ul Haq",
    description: siteConfig.description,
    images: ["/logo-plate.png"],
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
  themeColor: "#15171a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${stamp.variable} ${dotMatrix.variable} ${body.variable} ${plate.variable} font-body antialiased`}
      >
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
