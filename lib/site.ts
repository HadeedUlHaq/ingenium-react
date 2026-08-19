export const siteConfig = {
  name: "Ingenium",
  legalName: "Ingenium Software",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ingeniumsoftware.ai",
  locale: "en_GB",
  email: "hello@ingeniumsoftware.ai",
  logoPath: "/ingenium-software-high-res.png",
  description:
    "Ingenium is AI construction design review software that helps contractors, consultants, and developers review drawings faster, reduce RFIs, track revisions, and catch design coordination issues before they reach site.",
} as const;
