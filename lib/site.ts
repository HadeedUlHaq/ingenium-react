export const siteConfig = {
  name: "Ingenium",
  legalName: "Ingenium Software",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ingeniumsoftware.ai",
  locale: "en_GB",
  email: "hello@ingeniumsoftware.ai",
  calendlyUrl: "https://calendly.com/ingeniumsoftware",
  logoPath: "/ingenium-software-logo.png",
  description:
    "Ingenium is AI construction design review software that helps contractors, consultants, and developers review drawings faster, reduce RFIs, track revisions, and catch design coordination issues before they reach site.",
  primaryKeyword: "construction design review software",
  homepageKeywords: [
    "construction design review software",
    "AI construction design review software",
    "AI design coordination software",
    "construction drawing review software",
    "reduce RFIs construction",
    "design coordination software for contractors",
    "drawing revision tracking software",
    "construction document review AI",
  ],
} as const;

export const faqItems = [
  {
    question: "How much internal resource is required from our side?",
    answer:
      "Minimal. Ingenium connects to your existing document management environment such as Aconex, 4P, Dalux or SharePoint. Once access is provisioned, we configure the system around your project structure and priorities, with no additional administrative burden placed on your team.",
  },
  {
    question: "Are you able to keep up with design revisions?",
    answer:
      "Yes. Ingenium continuously tracks drawing updates and compares revisions, ensuring changes are identified and assessed as your design evolves. If an older revision is surfaced, it is clearly marked with a watermark to avoid confusion.",
  },
  {
    question: "What training and support do you provide?",
    answer:
      "Ingenium is designed to be intuitive, but we take a hands-on approach to onboarding. Founders lead initial setup and training, followed by ongoing engagement sessions to ensure maximum value. We provide support both in person and remotely, with rapid response to technical queries.",
  },
  {
    question: "Can other disciplines such as Operations or Commercial benefit?",
    answer:
      "Yes. While design coordination is the focal point, operations teams can instantly retrieve relevant design information and carry out structured drawing reviews aligned to site milestones, and commercial teams can track change across drawing revisions, summarise scope movement and support tender or valuation pack compilation. Design clarity benefits the entire project lifecycle.",
  },
  {
    question: "Is our data secure?",
    answer:
      "Yes. Ingenium operates within a private hosted environment using encryption in transit and at rest, with access controlled via role-based permissions. We are Cyber Essentials certified and align with enterprise security best practices.",
  },
] as const;

export const pageKeywordMap = [
  {
    page: "/",
    primaryKeyword: "construction design review software",
    secondaryKeywords: [
      "AI construction design review software",
      "AI design coordination software",
      "construction drawing review software",
    ],
    intent: "Commercial",
  },
  {
    page: "/solution",
    primaryKeyword: "AI design coordination software",
    secondaryKeywords: [
      "construction drawing review workflow",
      "drawing revision tracking software",
      "design review automation for construction",
    ],
    intent: "Commercial",
  },
  {
    page: "/faq",
    primaryKeyword: "construction design review software FAQ",
    secondaryKeywords: [
      "construction software security FAQ",
      "AI design review implementation",
      "drawing review software questions",
    ],
    intent: "Bottom-funnel support",
  },
  {
    page: "/contact",
    primaryKeyword: "book construction design review demo",
    secondaryKeywords: [
      "AI construction software demo",
      "design coordination software demo",
      "construction drawing review consultation",
    ],
    intent: "Conversion",
  },
] as const;
