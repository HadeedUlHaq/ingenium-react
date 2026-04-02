# Content Inventory

## Content Source Types

| Type | Active files | Notes |
| --- | --- | --- |
| Route-owned JSX copy | `app/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/faq/page.tsx` | Route composition and page-level headings or CTA rows |
| Section-local arrays and objects | `components/landing/*.tsx` | Problem cards, solution cards, examples, testimonial data, team data, demo expectations |
| Shared content and config | `lib/site.ts` | Site metadata, email, nav links, footer links, FAQ content |
| Metadata and structured data | `app/layout.tsx`, route page files, `lib/seo.ts`, `components/seo/json-ld.tsx` | Non-visible SEO content |
| Generated crawl config | `app/sitemap.ts`, `app/robots.ts` | Search-engine facing route inventory |
| Runtime form config | `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in `components/landing/contact-section.tsx` | Drives contact form status copy |

## Shared Global Copy

### Navigation

Sources: `lib/site.ts`, `components/landing/navigation.tsx`

- Links:
  - `About Us`
  - `FAQ's`
- Primary CTA:
  - `Book a Demo`
- Accessibility labels:
  - `Toggle menu`
  - `Close menu`

### Sticky conversion surface

Sources: `components/landing/sticky-book-demo-button.tsx`, `components/landing/book-demo-tab.tsx`

- Vertical tab label:
  - `Book Demo`
- Accessibility label:
  - `Book a demo`
- Visibility rule:
  - shown on all active routes except `/contact` and `/contact/*`

### Footer

Sources: `lib/site.ts`, `components/landing/footer-section.tsx`

- Brand line:
  - `AI Design Review for Construction Teams. Keep building simple.`
- Supporting copy:
  - `Review drawings faster, surface risk earlier, and keep design decisions grounded in source evidence.`
- Contact email:
  - `hello@ingeniumsoftware.ai`
- Column headings:
  - `Product`
  - `Company`
  - `Resources`
- Product links:
  - `Problem`
  - `Solution`
  - `Security`
- Company links:
  - `About Us`
  - `Book a Demo`
- Resource links:
  - `FAQ's`
  - `Contact`
- Legal bar:
  - `2026 Ingenium Software. All rights reserved.`
  - `Construction design review software for contractors, consultants, and developers.`

## Route: `/`

Source: `app/page.tsx`

### HeroSection

Source: `components/landing/hero-section.tsx`

- Heading:
  - `Keep building simple.`
- Subtitle:
  - `AI Design Review for Construction Teams`
- Lead copy:
  - `Free your teams from wasted time searching drawings and fixing costly site mistakes.`
- Supporting copy:
  - `Ingenium reviews your design information like an experienced project team - identifying clashes, compliance gaps and buildability risks early to reduce RFIs, change orders and construction risk.`
- CTA:
  - `Contact Us`

### FeaturesSection

Source: `components/landing/features-section.tsx`

- Eyebrow:
  - `The Problem`
- Heading:
  - `Too much time fixing problems.`
  - `Not enough time preventing them.`
- Body:
  - `Teams are expected to review impossible volumes of ever-evolving information - where a small change in one drawing can quietly affect many others.`
  - `The numbers tell the story:`
- Card 1:
  - `4+ hours / day`
  - `reviewing and coordinating technical documents, per person.`
  - `Per person, per day. Time that should be spent on the work that actually moves the project forward.`
- Card 2:
  - `10-25% of project costs`
  - `are lost annually in the UK due to building errors.`
  - `Caused by information that doesnt line up across drawings - or arrives too late to review properly.`
- Card 3:
  - `30-50% of defects`
  - `are repeat mistakes we already know how to prevent.`
  - `Because lessons from previous issues rarely get captured and shared effectively.`
- Closing line:
  - `Thats not a people problem. Its an information problem.`

### HowItWorksSection

Source: `components/landing/how-it-works-section.tsx`

- Eyebrow:
  - `The Solution`
- Heading:
  - `Clear design information,`
  - `at the right time`
- Cards:
  - `Spot issues early`
    - `Identify inconsistencies, buildability risk and compliance issues before they become problems out on-site.`
  - `Quantify change`
    - `Track and summarise design revisions so commercial and programme impacts are clear and auditable. Know exactly what changed, when, and what it means for cost and programme.`
  - `Lessons Learned`
    - `Apply lessons learned from past projects to new designs. Stop making the same mistakes twice.`
  - `Find Solutions`
    - `Proposes data-driven solutions using insights from project history, building regulations, and identifies compliant products that meet the design requirements.`
  - `Compile Evidence`
    - `View retrieved source documents to check findings and compile design packs - whether for Gateway 2, tender submissions, or technical workshops.`
  - `Share Findings`
    - `Auto-generate RFIs and export reports for design reviews, technical workshops and email communications so that verified issues can be acted upon.`

### ExamplesSection

Source: `components/landing/examples-section.tsx`

- Eyebrow:
  - `Examples`
- Heading:
  - `Real Examples`
  - `Ingenium is Designed to Prevent`
- Example 1:
  - `Fire Rated Ductwork Penetration Risk`
  - `Risk: Part B compliance failure.`
  - `Ductwork passing through protected lobbies without appropriate smoke control measures creates regulatory risk. Ingenium cross-references fire strategy, architectural and MEP drawings to surface these conflicts early.`
- Example 2:
  - `Window Height Discrepancy`
  - `Risk: Rework and coordination disputes.`
  - `Height variances between architect and specialist contractor drawings such as shims not being accounted for behind fixing brackets are identified across related documents to prevent downstream installation conflict.`
- Example 3:
  - `Incorrect Fire-Stopping Specification Intumescent Putty Pad`
  - `Risk: Fire stopping non-compliance and potential Building Regulations / fire strategy failure.`
  - `The Employers Requirements specified a fire-rated intumescent putty pad, however the electrical contractors scope referenced a different system. Neither solution had been tested for installation within the 97 mm fire-rated wall shown on the architects drawings. Ingenium identifies specification conflicts, verifies tested wall build-ups against design details, and retrieves compliant product alternatives before installation.`
- Example 4:
  - `Missing DPC at Parapet Wall`
  - `Risk: Water ingress and NHBC 6.1.21 non-compliance.`
  - `Parapet wall build-ups where a damp proof course is omitted despite the cavity being interrupted by masonry support are a recurring envelope failure. Ingenium analyses the wall build-up and flags this condition before construction.`

### TestimonialsSection

Source: `components/landing/testimonials-section.tsx`

- Eyebrow:
  - `Testimonial`
- Quote:
  - `A full design review cycle that normally took three days was completed in less than one using Ingenium. We originally set out to reduce review time by 30%, but the results far exceeded that.`
- Attribution:
  - `Joe Craven`
  - `Operations Director`
- Key result card:
  - `Key result`
  - `3 days`
  - `to <1 day`
  - `The initial target was a 30% reduction. The trial cycle finished more than 66% faster.`

### SecuritySection

Source: `components/landing/security-section.tsx`

- Eyebrow:
  - `Security & Privacy`
- Heading:
  - `Built for enterprise.`
  - `Trusted from day one.`
- Cards:
  - `Data Security`
    - `Encryption in transit and at rest, with role-based access controls aligned to Cyber Essentials standards.`
  - `Private Cloud`
    - `Securely hosted in a private environment, with deployment options aligned to your IT requirements.`
  - `Workflow Compatibility`
    - `Designed to operate alongside your existing document management and BIM workflows without disrupting how your team works.`

### CtaSection

Source: `components/landing/cta-section.tsx`

- Heading:
  - `Let's fix the design problem.`
  - `Together.`
- Body:
  - `Now onboarding live project partners. If improving design quality is a focus for your team this year, let's look at where the review effort is getting stuck.`
- CTAs:
  - `Book a Demo`
  - `Contact Us`

## Route: `/about`

Source: `app/about/page.tsx`

### AboutSection

Source: `components/landing/about-section.tsx`

- Eyebrow:
  - `Who We Are`
- Heading:
  - `Built by people whove delivered construction projects.`
  - `Engineered with the AI expertise to solve them.`
- Team cards:
  - `Joe Posnett`
  - `Founder`
  - `LinkedIn`
  - `Yusuf Khan`
  - `CTO`
  - `LinkedIn`
- Mission panel:
  - `Our team brings together 18+ years delivering construction projects and over a decade building data engineering and AI systems.`
  - `Our mission is simple: clear, reliable design information at the right time.`

### VisionSection

Source: `components/landing/vision-section.tsx`

- Eyebrow:
  - `Our Vision`
- Heading:
  - `A world where every design`
  - `is instantly buildable.`
- Body:
  - `Today, the rules that determine how buildings get built do not live in design software or documentation. They live in the experience of builders, engineers and architects, applied through manual design reviews, coordination meetings and on-site problem solving.`
  - `We are building the intelligence layer that captures this tacit knowledge and embeds it into the design review process, applying the insight of an experienced project team to every design in real time and at scale.`
  - `By combining real project outcomes, design information, regulatory requirements, designers judgement and the practical knowledge of builders, our platform ensures designs are not only compliant but truly buildable.`
  - `The result is a future where designers design, builders build, and the review in between happens automatically.`

### EthosSection

Source: `components/landing/ethos-section.tsx`

- Eyebrow:
  - `Our Ethos`
- Heading:
  - `Keep building simple.`
- Body:
  - `We have deep respect for the people who get the job done. Construction takes intelligence, creativity, and grit. But too often, that talent is buried under a lack of clear and practical design information.`
  - `Ingenium was built to change that - bringing clarity to design information so teams can focus on actually getting the job built.`

### Reused CTA

- `/about` reuses `CtaSection` with the same copy as the homepage

## Route: `/contact`

Source: `app/contact/page.tsx`

### ContactSection

Source: `components/landing/contact-section.tsx`

- Eyebrow:
  - `Contact`
- Heading:
  - `Heres what to expect`
  - `from your demo`
- Expectation bullets:
  - `Map out your current design workflows and identify delivery bottlenecks.`
  - `Identify opportunities to resolve these within the platform.`
  - `Personalised run-through of the platform from someone who understands construction first-hand.`
  - `Answer product, design, or construction-related questions`
- Direct contact CTA:
  - `hello@ingeniumsoftware.ai`

### Contact form panel

- Intro label:
  - `Tell us a little about your team`
- Field labels:
  - `NAME`
  - `EMAIL`
  - `COMPANY`
  - `HOW CAN WE HELP?`
- Placeholders:
  - `Jane Smith`
  - `jane@company.com`
  - `Company name`
  - `Tell us about your project, design workflow, or what you want to explore in the demo.`
- Privacy note:
  - `We only use the details you share here to respond to your enquiry.`
- Submit button states:
  - `Request Demo`
  - `Sending...`

### Contact form validation and system messages

- Validation:
  - `Please enter your name.`
  - `Please keep your name under 200 characters.`
  - `Please enter your email address.`
  - `Please enter a valid email address.`
  - `Please keep the company name under 200 characters.`
  - `Please tell us how we can help.`
  - `Please keep your message under 5000 characters.`
- Config and status alerts:
  - `Formspree endpoint required`
  - `Add NEXT_PUBLIC_FORMSPREE_ENDPOINT to your environment with your Formspree form endpoint before going live.`
  - `Request sent`
  - `Thanks. Your demo request has been sent and we will get back to you shortly.`
  - `Unable to send request`
  - `The contact form is not configured yet. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT before deploying.`
  - `Too many attempts were made in a short period. Please wait a moment and try again.`
  - `There was a problem sending your request. Please try again or email us directly.`
  - `There was a network problem sending your request. Please try again or email us directly.`

## Route: `/faq`

Source: `app/faq/page.tsx`

### FAQ page hero

- Eyebrow:
  - `FAQ's`
- Heading:
  - `Common questions,`
  - `clear answers.`

### FAQ items

Source: `lib/site.ts`

- `How much internal resource is required from our side?`
  - `Minimal. Ingenium connects to your existing document management environment such as Aconex, 4P, Dalux or SharePoint. Once access is provisioned, we configure the system around your project structure and priorities, with no additional administrative burden placed on your team.`
- `Are you able to keep up with design revisions?`
  - `Yes. Ingenium continuously tracks drawing updates and compares revisions, ensuring changes are identified and assessed as your design evolves. If an older revision is surfaced, it is clearly marked with a watermark to avoid confusion.`
- `What training and support do you provide?`
  - `Ingenium is designed to be intuitive, with hands-on onboarding and ongoing engagement sessions to ensure maximum value. We provide support both in person and remotely, with rapid response to technical queries.`
- `Can other disciplines such as Operations or Commercial benefit?`
  - `Yes. While design coordination is the focal point, operations teams can instantly retrieve relevant design information and carry out structured drawing reviews aligned to site milestones, and commercial teams can track change across drawing revisions, summarise scope movement and support tender or valuation pack compilation. Design clarity benefits the entire project lifecycle.`
- `Is our data secure?`
  - `Yes. Ingenium operates within a private hosted environment using encryption in transit and at rest, with access controlled via role-based permissions. We are Cyber Essentials certified and align with enterprise security best practices.`

### FAQ bottom CTA row

- `Still have questions?`
- `Book a Demo`

## Route: `/solution`

Source: `app/solution/page.tsx`

- No route-specific marketing content is rendered
- The route exists only to `redirect("/#solution")`
- Metadata still exists for compatibility:
  - Title: `AI Design Coordination Software`
  - Description: `The standalone solution page now redirects to the homepage solution section.`
- Route is `noIndex`

## Active CTA Copy

| Surface | CTA text |
| --- | --- |
| Navigation | `Book a Demo` |
| Sticky tab | `Book Demo` |
| Home hero | `Contact Us` |
| Shared CTA section | `Book a Demo`, `Contact Us` |
| Contact page | `hello@ingeniumsoftware.ai`, `Request Demo` |
| FAQ bottom row | `Book a Demo` |
| Footer company links | `Book a Demo` |

## Repeated Copy and Duplication Notes

| Copy or label | Active locations | Notes |
| --- | --- | --- |
| `Keep building simple.` | Hero, Ethos heading, footer brand line | Primary brand line |
| `AI Design Review for Construction Teams` | Hero subtitle, footer brand line | Repeated positioning statement |
| `Book a Demo` | Navigation, CTA section, FAQ CTA, footer link group | Primary route CTA |
| `Book Demo` | Sticky vertical tab only | Same intent, shorter label |
| `Contact Us` | Hero and CTA section | Secondary CTA copy |
| `FAQ's` | Navigation, footer resources, FAQ page | Spelling is consistent in code, though non-standard |

## Metadata and Structured Data Copy

### Route metadata

Sources: `app/layout.tsx`, route page files, `lib/seo.ts`

- Root title default:
  - `Construction Design Review Software | Ingenium`
- Root title template:
  - `%s | Ingenium Software`
- Root description:
  - `Ingenium is AI construction design review software that helps contractors, consultants, and developers review drawings faster, reduce RFIs, track revisions, and catch design coordination issues before they reach site.`
- About metadata:
  - `About Ingenium`
  - `Meet the team behind Ingenium, construction design review software built at the intersection of project delivery and AI engineering.`
- Contact metadata:
  - `Book a Construction Design Review Demo`
  - `See what to expect from an Ingenium demo and share your current design workflow, delivery bottlenecks, and review priorities.`
- FAQ metadata:
  - `Construction Design Review Software FAQ`
  - `Answers to common questions about Ingenium, including implementation, drawing revisions, workflow compatibility, and security.`
- Solution metadata:
  - `AI Design Coordination Software`
  - `The standalone solution page now redirects to the homepage solution section.`

### Structured data

Source: `components/seo/json-ld.tsx`

- Organization:
  - `Ingenium Software`
  - `hello@ingeniumsoftware.ai`
  - contact type `sales`
  - contact URL `/contact`
- Software application:
  - application category `BusinessApplication`
  - application suite `Construction design review software`
  - feature list:
    - `Cross-discipline drawing review`
    - `Drawing revision tracking`
    - `Design coordination issue detection`
    - `Evidence packs for workshops, tenders, and compliance reviews`
    - `Workflow compatibility with existing document management systems`
- FAQ JSON-LD:
  - mirrors the five active `faqItems` in `lib/site.ts`

### Crawl config

- `app/sitemap.ts` includes:
  - `/`
  - `/faq`
  - `/about`
  - `/contact`
- `app/robots.ts` exposes:
  - host = `siteConfig.url`
  - sitemap = `/sitemap.xml`

## Dormant or Non-Rendered Copy

These files still contain user-facing copy but are not part of the active route graph.

### `components/landing/developers-section.tsx`

- Headline:
  - `Built by devs.`
  - `For devs.`
- Supporting copy:
  - `A thoughtfully designed SDK that gets out of your way. Ship faster with intuitive APIs and exceptional documentation.`

### `components/landing/integrations-section.tsx`

- Headline:
  - `Works with everything`
  - `you already use.`
- Supporting copy:
  - `200+ pre-built integrations. Connect your entire stack in minutes.`

### `components/landing/metrics-section.tsx`

- Headline:
  - `Performance you`
  - `can measure.`
- Supporting labels:
  - `API requests today`
  - `Uptime this quarter`
  - `Average response time`
  - `Countries served`

### `components/landing/pricing-section.tsx`

- Headline:
  - `Simple, transparent`
  - `pricing`
- Product copy:
  - `Starter`
  - `Pro`
  - `Enterprise`
  - `Most Popular`
  - `Save 17%`

### Dead shared content export

Source: `lib/site.ts`

- `pageKeywordMap` still exists on disk but is not consumed by any route or helper
