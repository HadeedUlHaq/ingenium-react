export const siteConfig = {
  name: "Hadeed Smash Burgers",
  legalName: "Hadeed Smash Burgers",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  locale: "en_GB",
  description:
    "Real-time ordering and kitchen display system for the Hadeed Smash Burgers pop-up stall.",
} as const;
