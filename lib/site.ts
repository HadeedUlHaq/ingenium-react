export const siteConfig = {
  name: "Iron Burger",
  legalName: "Iron Burger",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  locale: "en_GB",
  email: "info@hadeedsmashburgers.co.uk",
  areaServed: "Watford, Hertfordshire, and Greater London",
  description:
    "Live-fired smash burger catering for private and community events across Watford and Hertfordshire. Fresh 80/20 grass-fed beef smashed on-site, 100% halal certified.",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu & Catering", href: "#menu" },
  { label: "Event Booking", href: "#booking" },
  { label: "FAQs", href: "#faqs" },
] as const;
