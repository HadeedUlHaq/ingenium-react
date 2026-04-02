# Component Map

## Rendering Architecture

### Root layout

Source: `app/layout.tsx`

- Loads fonts:
  - `Instrument Sans`
  - `JetBrains Mono`
- Injects:
  - `OrganizationJsonLd`
  - `StickyBookDemoButton`
- Applies global metadata from `siteConfig`
- Does not render:
  - `Navigation`
  - `FooterSection`

### Shared route shell

All rendered marketing routes use:

- `main.relative.min-h-screen.overflow-x-hidden.noise-overlay`

Route-owned chrome:

- `Navigation`
- `FooterSection`

Global fixed conversion layer:

- `StickyBookDemoButton`
  - returns `null` on `/contact` and `/contact/*`
  - otherwise renders `BookDemoTab`

## Route Trees

### `/`

Source: `app/page.tsx`

- `RootLayout`
  - `OrganizationJsonLd`
  - `StickyBookDemoButton`
    - `BookDemoTab`
- `Home`
  - `SoftwareApplicationJsonLd`
  - `Navigation`
  - `HeroSection`
  - `FeaturesSection`
  - `HowItWorksSection`
  - `ExamplesSection`
    - `CollapsibleListItem` x4
  - `TestimonialsSection`
  - `SecuritySection`
  - `CtaSection`
  - `FooterSection`

### `/about`

Source: `app/about/page.tsx`

- `RootLayout`
  - `OrganizationJsonLd`
  - `StickyBookDemoButton`
    - `BookDemoTab`
- `AboutPage`
  - `Navigation`
  - wrapper: `div.site-page-offset`
    - `AboutSection`
    - `VisionSection`
    - `EthosSection`
    - `CtaSection`
  - `FooterSection`

### `/contact`

Source: `app/contact/page.tsx`

- `RootLayout`
  - `OrganizationJsonLd`
  - `StickyBookDemoButton`
    - hidden on this route
- `ContactPage`
  - `Navigation`
  - wrapper: `div.site-page-offset`
    - `ContactSection`
      - `Alert`
      - `Button`
      - `Form`
      - `FormField`
      - `FormItem`
      - `FormLabel`
      - `FormControl`
      - `FormMessage`
      - `Input`
      - `Textarea`
      - `Spinner`
  - `FooterSection`

### `/faq`

Source: `app/faq/page.tsx`

- `RootLayout`
  - `OrganizationJsonLd`
  - `StickyBookDemoButton`
    - `BookDemoTab`
- `FaqPage`
  - `FaqJsonLd`
  - `Navigation`
  - wrapper: `div.site-page-offset`
    - inline FAQ section
      - intro block
      - `CollapsibleListItem` x5
      - inline bottom CTA row
  - `FooterSection`

### `/solution`

Source: `app/solution/page.tsx`

- `SolutionPage`
  - `redirect("/#solution")`

Notes:

- This route is a compatibility redirect only
- No landing sections render for it
- Metadata is still created via `createMetadata(...)` with `noIndex: true`
- `app/sitemap.ts` omits the route

## Reuse Matrix

### Shared route components

| Component | `/` | `/about` | `/contact` | `/faq` | `/solution` |
| --- | --- | --- | --- | --- | --- |
| `Navigation` | yes | yes | yes | yes | no rendered output |
| `FooterSection` | yes | yes | yes | yes | no rendered output |
| `CtaSection` | yes | yes | no | no | no rendered output |
| `CollapsibleListItem` | yes via `ExamplesSection` | no | no | yes | no rendered output |
| `StickyBookDemoButton` | yes | yes | hidden | yes | no rendered output |
| `BookDemoTab` | yes | yes | hidden | yes | no rendered output |

### Shared SEO components

| Component | `/` | `/about` | `/contact` | `/faq` | `/solution` |
| --- | --- | --- | --- | --- | --- |
| `OrganizationJsonLd` | layout-level | layout-level | layout-level | layout-level | layout-level |
| `SoftwareApplicationJsonLd` | yes | no | no | no | no |
| `FaqJsonLd` | no | no | no | yes | no |

## Repeated Visual Systems

| Pattern | Active files |
| --- | --- |
| Page shell with `noise-overlay` | all rendered route pages |
| Fixed shrinking header | `components/landing/navigation.tsx` |
| Shared spacing utilities (`site-shell`, `site-section`, `site-page-offset`, `site-intro`, `site-copy`, `site-followup`, `site-grid`, `site-outro`) | `app/globals.css`, then consumed across active landing sections and FAQ |
| Shared section kicker and label system | `about-section.tsx`, `contact-section.tsx`, `cta-section.tsx`, `ethos-section.tsx`, `examples-section.tsx`, `features-section.tsx`, `how-it-works-section.tsx`, `security-section.tsx`, `vision-section.tsx`, `app/faq/page.tsx` |
| Split section heading pattern | same files as above, plus `app/faq/page.tsx` |
| Shared panel card surface (`site-panel`) | `about-section.tsx`, `features-section.tsx`, `how-it-works-section.tsx`, `security-section.tsx`, `testimonials-section.tsx` |
| Collapsible disclosure rows | `components/landing/collapsible-list-item.tsx`, consumed by `examples-section.tsx` and `app/faq/page.tsx` |
| Gradient CTA buttons | `navigation.tsx`, `hero-section.tsx`, `cta-section.tsx`, `contact-section.tsx`, `app/faq/page.tsx`, `book-demo-tab.tsx` |
| Conversion shell panels | `cta-section.tsx`, `contact-section.tsx` |
| Static dotted-map footer background | `footer-section.tsx` using `components/ui/dotted-map.tsx` |

## Dormant Components Not Reached by Any Route

### Landing components

- `components/landing/developers-section.tsx`
- `components/landing/integrations-section.tsx`
- `components/landing/metrics-section.tsx`
- `components/landing/pricing-section.tsx`

These files are not imported by any route or active shared component.

### Dormant or duplicate support files worth noting

- `hooks/use-mobile.ts`
- `components/ui/use-mobile.tsx`
- `hooks/use-toast.ts`
- `components/ui/use-toast.ts`

### Dormant global utilities

Defined in `app/globals.css` but not used by the active route graph:

- `text-stroke`
- `marquee`
- `marquee-reverse`
- `line-reveal`
- `hover-lift`
- `letter-spin`
- `animate-char-in`
- `border-sketch`

## Content Source Map

| Content area | Source |
| --- | --- |
| Site name, description, URL, email, logo path | `lib/site.ts -> siteConfig` |
| Primary navigation labels | `lib/site.ts -> primaryNavLinks` |
| Footer link groups | `lib/site.ts -> footerLinkGroups` |
| FAQ content | `lib/site.ts -> faqItems` |
| Home problem cards | `components/landing/features-section.tsx -> impactCards` |
| Home solution cards | `components/landing/how-it-works-section.tsx -> solutions` |
| Home example disclosures | `components/landing/examples-section.tsx -> examples` |
| Home security cards | `components/landing/security-section.tsx -> securityFeatures` |
| About team cards | `components/landing/about-section.tsx -> team` |
| Contact expectation bullets | `components/landing/contact-section.tsx -> demoExpectations` |
| Contact validation and status copy | `components/landing/contact-section.tsx -> contactFormSchema`, `onSubmit`, alert blocks |
| Route metadata | route page files via `createMetadata(...)`, plus root metadata in `app/layout.tsx` |
| Structured data | `components/seo/json-ld.tsx` |
| Sitemap route list | `app/sitemap.ts` |
| Robots settings | `app/robots.ts` |
| Dead content export | `lib/site.ts -> pageKeywordMap` |

## Accuracy Notes

- `Navigation` and `FooterSection` are route-owned, not layout-owned
- `/solution` is not a standalone rendered marketing page anymore
- There is no active `PilotPopup`, no active animated footer wave, and no active infrastructure section
- The active examples experience now lives on the homepage via `ExamplesSection`
