# Design System Audit

## Scope

- Repository: `ingenium-react`
- Audit date: `2026-04-02`
- Method: static code audit of `app/**`, `components/landing/**`, active `components/ui/**`, `lib/**`, `app/globals.css`, route metadata helpers, sitemap, and robots config
- Goal: document the live marketing site and the current design system as implemented, not historical intent

## Architecture Overview

### App Router and shared layout

- Router model: Next.js App Router only
- Shared layout file: `app/layout.tsx`
- Shared layout responsibilities:
  - loads `Instrument Sans` and `JetBrains Mono` via `next/font/google`
  - applies root metadata from `siteConfig`
  - injects `OrganizationJsonLd`
  - injects `StickyBookDemoButton`
  - imports `app/globals.css`
- Shared layout does not render navigation or footer. Both remain route-owned.
- No nested layouts, route groups, or templates are present.

### Active routes and rendered sections

| Route | Page file | Rendered route content | Notes |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | `SoftwareApplicationJsonLd`, `Navigation`, `HeroSection`, `FeaturesSection`, `HowItWorksSection`, `ExamplesSection`, `TestimonialsSection`, `SecuritySection`, `CtaSection`, `FooterSection` | Primary marketing narrative |
| `/about` | `app/about/page.tsx` | `Navigation`, `AboutSection`, `VisionSection`, `EthosSection`, `CtaSection`, `FooterSection` | Wrapped in `site-page-offset` |
| `/contact` | `app/contact/page.tsx` | `Navigation`, `ContactSection`, `FooterSection` | Wrapped in `site-page-offset`; sticky demo tab is hidden |
| `/faq` | `app/faq/page.tsx` | `FaqJsonLd`, `Navigation`, inline FAQ hero section, `CollapsibleListItem` x5, bottom CTA row, `FooterSection` | Wrapped in `site-page-offset` |
| `/solution` | `app/solution/page.tsx` | no rendered marketing sections | Compatibility route only; server redirect to `/#solution`; metadata is `noIndex` |

### Shared chrome and SEO

- Shared page shell on all rendered routes: `main.relative.min-h-screen.overflow-x-hidden.noise-overlay`
- Shared visible chrome:
  - `Navigation` on `/`, `/about`, `/contact`, `/faq`
  - `FooterSection` on `/`, `/about`, `/contact`, `/faq`
- Shared structured data:
  - `OrganizationJsonLd` in `app/layout.tsx`
  - `SoftwareApplicationJsonLd` on `/`
  - `FaqJsonLd` on `/faq`
- Compatibility and crawl behavior:
  - `/solution` redirects to `/#solution`
  - `/solution` metadata sets `robots.index = false` and `robots.follow = false`
  - `app/sitemap.ts` includes `/`, `/about`, `/contact`, `/faq`
  - `app/sitemap.ts` does not include `/solution`

## Reusable Component Inventory

### Active landing components

| Component | Role | Route usage |
| --- | --- | --- |
| `Navigation` | Fixed shrinking header with mobile overlay and primary CTA | `/`, `/about`, `/contact`, `/faq` |
| `HeroSection` | Home hero, single-column layout | `/` |
| `FeaturesSection` | Problem narrative and 3-card stat grid | `/` |
| `HowItWorksSection` | Solution narrative and 6-card grid | `/` |
| `ExamplesSection` | Full-width collapsible example stack | `/` |
| `TestimonialsSection` | Quote card plus dark metric card | `/` |
| `SecuritySection` | 3-card security/privacy grid | `/` |
| `CtaSection` | Shared conversion panel | `/`, `/about` |
| `FooterSection` | Footer grid with static dotted-map background | `/`, `/about`, `/contact`, `/faq` |
| `AboutSection` | Team cards and mission panel | `/about` |
| `VisionSection` | Vision narrative block | `/about` |
| `EthosSection` | Ethos narrative block | `/about` |
| `ContactSection` | Responsive conversion shell and form | `/contact` |
| `CollapsibleListItem` | Disclosure row pattern | `/faq`, `/` via `ExamplesSection` |
| `StickyBookDemoButton` | Global route-aware wrapper | Layout-level |
| `BookDemoTab` | Vertical fixed CTA tab | Rendered by `StickyBookDemoButton` on all non-contact routes |

### Active UI primitives and utilities

| File | Role | Active usage |
| --- | --- | --- |
| `components/ui/alert.tsx` | Status/error alert primitive | Contact form |
| `components/ui/button.tsx` | Button primitive | Contact submit button only |
| `components/ui/form.tsx` | React Hook Form wrappers | Contact form |
| `components/ui/input.tsx` | Input primitive | Contact form |
| `components/ui/textarea.tsx` | Textarea primitive | Contact form |
| `components/ui/spinner.tsx` | Loading spinner | Contact submit button |
| `components/ui/dotted-map.tsx` | SVG dotted map utility | Footer background |

### Dormant landing components

These files exist on disk but are not imported by any active route:

- `components/landing/developers-section.tsx`
- `components/landing/integrations-section.tsx`
- `components/landing/metrics-section.tsx`
- `components/landing/pricing-section.tsx`

They represent an older generic SaaS visual language and are not part of the active construction-focused site.

## Typography System

### Font families

| Token | Source | Active status | Usage |
| --- | --- | --- | --- |
| `font-sans` | `app/globals.css` | active | Body text, nav, buttons, form text |
| `font-display` | `app/globals.css` | active | Same Instrument Sans stack as body; used for headings and display copy |
| `font-mono` | `app/globals.css` | dormant in active marketing routes | Only present in dormant sections and some unused primitives |

### Active type system

- Primary family: Instrument Sans for both body and display
- Hierarchy is created by size, weight, spacing, and muted-color shifts, not by switching font families
- Shared microtype utilities:
  - `site-kicker`: `text-[0.72rem] font-semibold uppercase text-foreground/58` with `letter-spacing: 0.16em`
  - `site-label`: same scale and tracking as `site-kicker`
- Decorative dash or line eyebrows are no longer part of the active system

### Active heading patterns

| Pattern | Classes | Usage |
| --- | --- | --- |
| Standard section heading | `text-3xl font-display leading-[1.02] tracking-tight lg:text-5xl` | Problem, Solution, Examples, Security, CTA, About, Vision, Ethos, FAQ, Contact |
| Split heading treatment | first line `font-semibold text-gradient-heading`; second line `block font-medium text-muted-foreground` | Most section intros |
| Hero headline | `text-[clamp(3.35rem,6.2vw,5.8rem)] font-semibold leading-[1.02] tracking-tight` | Home hero |
| Hero subtitle | `text-[clamp(1.3rem,2.2vw,1.95rem)] font-medium leading-[1.12] tracking-tight text-foreground/70` | Home hero |
| Testimonial quote | `text-[1.65rem] leading-[1.22] lg:text-[1.85rem]` | Home testimonial |
| Testimonial metric | `text-[2.25rem] leading-[1.08] lg:text-[2.65rem]` | Home testimonial side card |

### Active text treatments

- Problem stat headings are intentionally `font-normal`
- Card titles in solution, security, and collapsible rows use `font-medium`
- Form labels use uppercase `site-label` styling with slightly darker text via `text-foreground/68`
- Footer section headings also use `site-label`
- The hero keeps a dedicated blue gradient via `text-gradient-hero`
- Other section headings use the toned-down dark tonal gradient via `text-gradient-heading`

## Spacing System

### Source-of-truth utilities

The site now relies on shared spacing utilities in `app/globals.css`:

| Utility | Value | Role |
| --- | --- | --- |
| `site-shell` | `mx-auto max-w-[1400px] px-6 lg:px-12` | Shared horizontal container |
| `site-section` | `relative py-16 lg:py-20` | Default section wrapper |
| `site-page-offset` | `pt-16 lg:pt-20` | Offset under fixed navigation |
| `site-intro` | `mb-10 lg:mb-14` | Heading block spacing |
| `site-copy` | `mt-5` | Heading-to-body spacing |
| `site-followup` | `mt-6` | Body-to-supporting-line spacing |
| `site-grid` | `gap-5` | Default card or disclosure grid gap |
| `site-outro` | `mt-8` | Grid-to-closing-line or CTA row spacing |

### Active exceptions

| Area | Exception | Reason |
| --- | --- | --- |
| Hero | inner wrapper `py-14 lg:py-[4.5rem]` | Custom hero composition |
| Problem section | `pt-12 pb-12 lg:pt-14 lg:pb-14` | Tighter handoff from hero |
| Testimonials | `pt-12 lg:pt-14` on top of `site-section` | Tighter intro after examples |
| Footer | upper grid `py-14 lg:py-16`; lower bar `py-5` | Footer-specific cadence |
| Contact shell | internal padding scales from `px-5 py-6` to `xl:px-10 xl:py-10` | Responsive panel layout |

### Active spacing rhythm

- Card padding: `px-6 py-6 lg:px-7 lg:py-7` on most cards
- Large conversion panels: `rounded-[2rem]` shells with `px-6 py-8 lg:px-10 lg:py-10`
- Inline button groups usually start at `mt-7` or `mt-9`
- Disclosure rows use `py-8`
- Footer upper grid uses `gap-10` on small screens and `lg:gap-8` on large screens

## Colour System

### Theme tokens

`app/globals.css` defines the active light theme in OKLCH variables. The site uses:

- `--background`: warm near-white page background
- `--foreground`: dark ink for text, lines, and iconography
- `--muted-foreground`: secondary copy color
- `--border` and `--input`: light neutral borders
- `--destructive`: form validation and destructive alerts

### Active brand palette

| Name | Value | Usage |
| --- | --- | --- |
| Deep ink | `#001820` | Hero gradient start, hover gradients, dark surfaces |
| Tonal dark | `#163843` | Section heading gradient end |
| Brand blue | `#019DBF` | Hero gradient end, hover gradients |
| Brand green | `#01D480` | CTA gradient start, footer dot map tint |
| Brand teal | `#48DEDC` | CTA gradient end, footer dot map tint |
| Testimonial card background | `#071820` | Key result card |
| Testimonial card border | `#0f2d37` | Key result card border |

### Active gradients and surfaces

| Gradient or surface | Value | Usage |
| --- | --- | --- |
| Section heading gradient | `linear-gradient(180deg, #001820 0%, #163843 100%)` | `text-gradient-heading` |
| Hero heading gradient | `linear-gradient(135deg, #001820 0%, #019DBF 100%)` | `text-gradient-hero` |
| Primary CTA gradient | `linear-gradient(135deg, #01D480 0%, #48DEDC 100%)` | `btn-gradient`, sticky tab |
| Primary CTA hover | `linear-gradient(135deg, #001820 0%, #019DBF 100%)` | `btn-gradient:hover` |
| Tinted section surfaces | `bg-foreground/[0.022]` to `bg-foreground/[0.03]` | About, Problem, Examples, Security, Ethos |
| Panel shells | light neutral gradients with subtle teal radial overlays | CTA and Contact |
| Footer background | white base + low-opacity green or teal tint + two static dotted maps | Footer |

### Footer treatment

- Background is no longer animated
- Footer uses:
  - white base layer
  - low-opacity green or teal tint layer
  - two oversized `DottedMap` SVG layers masked toward the right side
- Dot colors:
  - `rgba(1,212,128,0.18)`
  - `rgba(72,222,220,0.18)`

## Motion and Interaction Catalogue

### Active motion patterns

| Pattern | Implementation | Files |
| --- | --- | --- |
| Nav shrink-on-scroll | `transition-all duration-500` with position, height, blur, and shadow changes | `navigation.tsx` |
| Mobile menu reveal | full-screen overlay with staggered link delays (`index * 70ms`) | `navigation.tsx` |
| Section reveal | `IntersectionObserver` toggling `translate-y` + opacity with `duration-700` or `duration-1000` | Most landing sections |
| Hero mount reveal | immediate state flip on mount with staggered durations | `hero-section.tsx` |
| Disclosure expand/collapse | `transition-all duration-500 ease-in-out` on `max-height`, `padding`, and `opacity` | `collapsible-list-item.tsx` |
| Sticky tab hover | `transition-[opacity,transform,background] duration-300` | `book-demo-tab.tsx` |
| Button hover | gradient swap and color transition over `0.3s ease` | `.btn-gradient` |
| Security card hover | title `translate-x-1` | `security-section.tsx` |
| Collapsible title hover | gradient text on hover | `collapsible-list-item.tsx` |

### Static decorative effects

- `noise-overlay` pseudo-element applies a low-opacity grain texture to page shells
- Hero background uses static horizontal and vertical rule overlays
- Footer dotted map is static SVG, not animated

### Dormant motion utilities

Present in `app/globals.css` but not used by the active route graph:

- `text-stroke`
- `marquee`
- `marquee-reverse`
- `line-reveal`
- `hover-lift`
- `letter-spin`
- `animate-char-in`
- `border-sketch`

## Layout Pattern Library

### Dominant active layouts

| Pattern | Implementation | Active usage |
| --- | --- | --- |
| Single-column hero | left-aligned stack, max width, static grid background | Home hero |
| Standard section intro | `site-intro` + `site-kicker` + split heading + optional body copy | Most sections |
| Multi-card grid | `grid site-grid` with breakpoint-specific columns | Problem, Solution, Security, About |
| Full-width disclosure stack | border-separated rows built with `CollapsibleListItem` | Examples, FAQ |
| Conversion shell | rounded bordered gradient panel with subtle radial overlay | CTA, Contact |
| Side-by-side testimonial | quote card plus fixed-width result card at `lg` | Testimonials |
| Footer matrix | single-column stack to 4-column large-screen grid | Footer |
| Fixed vertical CTA tab | right-edge vertical writing mode | `BookDemoTab` |

### Section wrapper pattern

- Route offset: `site-page-offset`
- Section shell: `site-section`
- Shared horizontal container: `site-shell`
- Shared intro block: `site-intro`
- Shared panel card: `site-panel`

This is the current source-of-truth wrapper system used across the homepage, about page, contact page, and FAQ page.

## Responsive Pattern Library

### Breakpoints

No custom Tailwind config is present. The site relies on default Tailwind breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Active responsive behavior

| Area | Mobile / small screens | Larger screens |
| --- | --- | --- |
| Navigation | hamburger + full-screen overlay | inline nav and CTA from `md` |
| Hero | always single-column | wider copy block and `nowrap` guards only on large screens |
| Problem cards | stacked | 3 columns at `lg` |
| Solution cards | stacked | 2 columns at `md`, 3 at `xl` |
| Examples | full-width accordion stack | remains full width |
| Testimonials | stacked | split layout at `lg` with 300px result card |
| Security cards | stacked | 3 columns at `md` |
| About | stacked | 2-column team grid at `md`; mission panel spans both columns |
| Contact | single-column shell through tablet and laptop | 2 columns only at `xl`; form name and email split at `md` |
| Footer | single-column content stack | 4-column large-screen grid at `lg` |
| Sticky Book Demo tab | active on non-contact routes | same fixed right-edge tab |

### Contact page specifics

- The contact section now stays single-column until `xl`
- The email CTA is full-width on mobile and intrinsic-width above `sm`
- The privacy note wraps naturally on small screens
- The submit button is intrinsic width and left aligned across breakpoints

## Inconsistency and Drift Report

These issues remain true in the current codebase.

1. Marketing CTA styling is still manually duplicated across `navigation.tsx`, `hero-section.tsx`, `cta-section.tsx`, `contact-section.tsx`, `app/faq/page.tsx`, and `book-demo-tab.tsx` instead of being expressed as one marketing button abstraction.
2. `IntersectionObserver` reveal logic is duplicated across most client landing sections instead of being centralized in a hook or wrapper component.
3. The section intro pattern is repeated inline across most sections rather than extracted into a reusable `SectionIntro` component.
4. `Navigation` and `FooterSection` hardcode `/ingenium-software-logo.png` instead of using `siteConfig.logoPath`.
5. `FAQ's` remains the active label in navigation, footer resources, and the FAQ page heading; the typography is consistent, but the wording is still non-standard.
6. `CollapsibleListItem` duplicates accordion behavior even though `components/ui/accordion.tsx` exists.
7. Dormant generic SaaS sections remain in the repository and still reference old design patterns and unused utilities.
8. Duplicate hooks still exist:
   - `hooks/use-mobile.ts` and `components/ui/use-mobile.tsx`
   - `hooks/use-toast.ts` and `components/ui/use-toast.ts`
9. `pageKeywordMap` in `lib/site.ts` is still exported but unused anywhere in the route graph.
10. Footer copyright year is hardcoded to `2026`.

## Refactor Opportunities

### High-value cleanup

1. Create a dedicated marketing button component with variants for nav CTA, section CTA, FAQ CTA, contact submit, and sticky tab.
2. Extract a shared `SectionIntro` component for kicker, heading, optional body copy, and optional follow-up line.
3. Extract a `useRevealOnScroll` hook or small wrapper component for the repeated reveal pattern.
4. Extract a shared marketing shell component for CTA and Contact panels.
5. Centralize shared link and copy values that still live in JSX instead of shared content config.

### Medium-value cleanup

1. Retire or archive dormant SaaS sections if they are no longer part of the product narrative.
2. Remove unused CSS utilities from `app/globals.css`.
3. Align logo usage in nav and footer with `siteConfig.logoPath`.
4. Decide whether the Radix accordion primitive should replace the bespoke collapsible row.

### Lower-value cleanup

1. Standardize `FAQ's` vs `FAQs`
2. Generate the footer year automatically
3. Remove dead config such as `pageKeywordMap` if it will not be consumed

## Recommended Source of Truth

### Current effective source of truth

- Global tokens and layout utilities: `app/globals.css`
- Shared content and config:
  - `lib/site.ts` for nav links, footer link groups, FAQ content, email, URL, description
  - `lib/seo.ts` for metadata helpers
- Route composition:
  - `app/page.tsx`
  - `app/about/page.tsx`
  - `app/contact/page.tsx`
  - `app/faq/page.tsx`
  - `app/solution/page.tsx`

### Recommended future source of truth

1. Keep `app/globals.css` as the token layer for spacing, typography, color, and shared utilities.
2. Add a small `components/marketing/` primitive layer for:
   - section intro
   - marketing button
   - panel shell
   - collapsible stack item
3. Keep `lib/site.ts` for shared content objects, and move any remaining repeated CTA labels or shared microcopy there when they begin to duplicate.
