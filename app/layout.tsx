import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Anton, Libre_Franklin, VT323 } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.legalName,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1a17",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${stamp.variable} ${dotMatrix.variable} ${body.variable} font-body antialiased`}
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
