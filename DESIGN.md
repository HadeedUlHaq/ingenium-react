# Iron Burger — Design System ("The Counter")

<!-- impeccable:design-doc 1 -->

**Reference: [bleecker.co.uk](https://www.bleecker.co.uk/)**, pinned by the user on
2026-09-05 and executed straight, at that craft level. The whole product wears
it: the marketing site and the event screens (`/order`, `/kds`, `/status`,
`/staff`, `/inquiries`).

The idea is a burger counter's own graphic language. The UI is **monochrome
so that the food is the only colour on the page**. Until real photographs
land, every photo slot is a dark panel holding its exact space.

Everything lives in [app/globals.css](app/globals.css): tokens in `:root`,
Tailwind bindings in `@theme inline`, roles and surfaces in `@layer utilities`.

### Photography update — 7 October 2026

Licensed, representative photography now supplies the food colour. The hero
uses a photographed thin, ragged-edged smash burger: a portrait alongside
type on desktop, a 4:3 crop followed by the headline on mobile. Text never
covers the food. The griddle photograph shows real thin patties being pressed
onto steel. These are third-party stock images with restrained image-tool
edits, not documentation of Iron Burger's products or events.

Originals, ingredient limitations and license links are recorded in
[public/photos/SOURCES.md](public/photos/SOURCES.md). Exact edit prompts and
source-to-output mappings are in
[output/image-edits/PLAN.md](output/image-edits/PLAN.md). The selected WebP
files live under `public/photos/`; the full-resolution edited PNGs remain
under `output/image-edits/`.

UI/UX Pro Max guided the responsive image sizing, reserved aspect ratios,
descriptive alt text, lazy loading below the hero and mobile crop review.
The project's existing monochrome palette and typography remain authoritative.
`PhotoSlot` accepts `imageClassName` for focal positioning and an optional
`mobileSlot` for native `<picture>` art direction; an absent mobile asset
falls back to the primary image. All twelve visible photo areas are filled:
burger details, sauce context, steel-griddle cooking, takeaway packaging and
outdoor event atmosphere. These remain representative stock, not evidence
of the exact house-sauce recipe, every menu ingredient or actual bookings.

### Hero video update — 9 October 2026

The requested hero now uses a locally edited, silent 15-second montage from
the two videos and three dark photographic stills supplied in the desktop
folder. Desktop footage is composed to the right of a black text field;
mobile uses a separate portrait export and a lower contrast scrim. The
headline overlays the footage; the description, booking links and proof
figures retain their previous layout below it. This replaces the previous
side-by-side photo hero for this section only, following the user's request.

Assets and matching posters are in `public/videos/`. The edit plan,
source selections and reproducible local rendering script are retained in
`output/hero-video/`. White-background cutout images were not selected.
`HeroVideo` supplies a pause/play control and pauses outside the viewport or
in a hidden document; reduced-motion and data-saving preferences use the
poster without loading a video. Failed playback also retains the poster.
Impeccable guided responsive placement, readable overlays and motion control.

The original Bebas Neue, Courier Prime and Libre Franklin typography,
monochrome palette, square controls and non-hero layout remain authoritative.
The video scrim is scoped to the hero through a CSS module; global styles
are unchanged. The original headline sizing, mobile alignment, grey
description and booking-link placement were restored after review.
The exact original font assets were recovered from the build cache and are
now self-hosted through `next/font/local`, with the same weights and CSS
variables. This prevents network restrictions from replacing the site's
fonts. Font provenance is recorded in `public/fonts/SOURCES.md`.

---

## 1. Palette

| Token | Value | Role |
|---|---|---|
| `--black` | `oklch(0 0 0)` | Page ground. Pure black, like the reference. |
| `--black-2` | `oklch(0.20 0 0)` | The one raised band (packages) and every placeholder panel |
| `--black-3` | `oklch(0.30 0 0)` | Hover on black buttons; scrollbar thumb |
| `--white` | `oklch(1 0 0)` | Display type, primary buttons on black, body copy at 85% |
| `--off-white` | `oklch(0.96 0 0)` | Package cards; hover on white buttons |
| `--grey` | `oklch(0.66 0.004 20)` | Mono meta on black — 6.74:1 |
| `--grey-ink` | `oklch(0.42 0.004 20)` | Mono meta on white — 8.48:1 |
| `--line` | white at 14% | Hairline on black |
| `--line-dark` | black at 16% | Hairline on white |
| `--stone` | `oklch(0.86 0.01 160)` | Reserved. A whisper of grey-green for future tags |

There is **no brand accent colour**. The Iron Burger badge (gold and chrome)
is the single coloured object on any screen, which is exactly why it reads.

### Functional status colours — never restyled

| Token | Meaning |
|---|---|
| `--cooking-yellow` / `-deep` | Customer status: PREPARING |
| `--pass-green` / `-bright` / `-deep` | READY; the kitchen's "mark ready" |
| `--signal-red` / `-bright` / `-soft` | LATE flash on the kitchen display; destructive actions; form errors |

### Semantic aliases

The event screens and `components/ticket/*`, `components/gate/*` were written
against an older vocabulary. Those names are re-pointed here rather than
edited in markup, which is what lets the whole app re-skin in one file:

`--paper`→black · `--paper-dim`→black-2 · `--ink`→white · `--ink-soft`→grey ·
`--carbon-blue`→white · `--stamp-red`→signal-red-bright ·
`--iron-black`→black · `--charcoal`→black-2 · `--chrome`→white ·
`--chrome-mid`→grey · `--gold`/`--gold-bright`→white · `--gold-deep`→grey

Utilities carry the same aliases: `.gilded` is a white fill, `.badge-face` is
black-2, `.badge-panel` and `.ticket-shadow` are a hairline, `.engraved`,
`.brand-gold` and `.stamp-digits` are plain white type.

---

## 2. Verified contrast

Every pair was computed before it shipped. Two dips were caught and fixed in
the same pass: a de-emphasised footer link at 3.66:1 and input placeholders
at 3.83:1.

| Pair | Ratio |
|---|---|
| white on black | 21.0 |
| white/85 body on black | 14.8 |
| grey mono on black | 6.74 |
| grey mono on black-2 | 5.81 |
| black on white / off-white | 21.0 / 18.7 |
| grey-ink on white / off-white | 8.48 / 7.55 |
| signal-red error on white | 5.57 |
| white on signal-red (danger button) | 5.57 |
| black on pass-green (ready) | 5.70 |
| cooking-deep on cooking-yellow | 9.58 |

Hairlines (`--line`, `--line-dark`) measure ~1.4:1. They are decorative
dividers, not component boundaries, and are exempt; anything a user must
perceive to operate (input borders, buttons) uses solid black or white.

**Rules:** grey is for mono meta only, never for body copy. Body copy on black
is `white/85`. Nothing under 14px. No gradient text, anywhere.

---

## 3. Type

Three faces, loaded in [app/layout.tsx](app/layout.tsx). The reference uses a
custom condensed face, Neue Haas Grotesk and a daisy-wheel typewriter; these
are their free equivalents.

| Face | Variable | Role |
|---|---|---|
| **Bebas Neue** (400 only) | `--font-display` (aliases `--font-stamp`, `--font-plate`) | Every heading, button, nav link, ticket numeral. Always uppercase via `.display`. |
| **Courier Prime** 400/700 | `--font-mono` (alias `--font-dotmatrix`) | Meta lines, sublines, labels, card excerpts, FAQ answers, footer. Via `.mono`. |
| **Libre Franklin** | `--font-body` | Long-form body paragraphs only. |

Scale (desktop → mobile): hero h1 `6.75rem → 3.25rem`; section h2 `4rem →
2.75rem`; card h3 `2.25rem`; proof figures `4.5rem` (why-us) / `2.25rem` (hero);
mono meta `0.95rem`, labels `0.72rem` at `tracking-[0.14em]`.

`.display` sets `line-height: 0.95` and `letter-spacing: 0.01em`. Headings
carry their own weight: the mono subline sits **below** a heading, never above
it as an eyebrow.

---

## 4. Surfaces and components

Four primitives in [components/site/plate.tsx](components/site/plate.tsx), and
that is the whole kit: `Container` (max-w-7xl), `SectionHeading` (display h2
+ optional mono `sub`, `tone="light"` on white), `Rule` (a hairline), `Button`
(`light` white-on-black, `dark` black-on-white, `ghost` outlined).

- **Corners are square.** `--radius` is 2px; buttons use `rounded-[2px]`.
- **No cards on black.** Content sits on the ground, separated by hairlines.
  The only cards are the three package cards, and they are white on the
  raised `--black-2` band, as the reference's product cards are.
- **One white panel per page:** the booking form. It reads as a card handed
  across the counter. Inside it, `.light-panel` flips the focus ring to black.
- **Proof as figures.** Capacity, footprint and pricing are set as large
  display figures with a mono unit line, ruled into columns.

### Photo slots

[components/site/photo-slot.tsx](components/site/photo-slot.tsx) +
[lib/photos.ts](lib/photos.ts). A slot renders `public/photos/<slot>.{jpg,jpeg,png,webp,avif}`
if it exists at build time, else a `--black-2` (or `--off-white`) panel with
the shot brief and the exact filename it is waiting for. Overlaid content
(the hero headline) pushes the brief to the bottom-left corner. Slot names and
briefs are in [public/photos/README.txt](public/photos/README.txt). The
aspect ratio lives on the slot's `className`, so the placeholder is
pixel-identical to the photo that replaces it. Photos get a bottom scrim
(`scrim`) only when text sits over them.

---

## 5. Motion

This world is print. Things appear; they do not glide.

- Buttons drop 1px on `:active` (`.press`), nothing else moves on hover except
  colour.
- The FAQ plus rotates 45° in 200ms.
- The footer wordmark is passed through an SVG `feTurbulence` displacement
  (`#grit`, scale 2.2) so it reads as ink rather than a web font — the one
  authored moment on the page, and it is static.
- Kitchen display: `flash-late` pulses `--signal-red-soft`; the live badge
  blinks.
- Everything animated is disabled under `prefers-reduced-motion`.

---

## 6. Browser surfaces

Selection is white-on-black. Focus rings are 2px white with 3px offset (black
inside `.light-panel`). Scrollbars are a `--black-3` thumb on a black track.
`scroll-behavior: smooth` is on, and off under reduced motion.

---

## 7. Assets

- `public/iron-burger.png` — the badge, 1254×1254 RGBA. Nav (36–44px), footer
  wordmark (0.85em of the wordmark), event screens. Always pass `sizes`.
- Favicons and manifest icons are matted on `#15130f` (from the previous
  world; still correct — dark on dark) and can stay.
- `public/photos/` — the eleven slots. Real phone photos beat stock.

---

## 8. Extending this system

1. Reuse a token. There are two greys and two lines; that is deliberate.
2. Compute the contrast of any new pair. Grey on black-2 is the tightest pass
   at 5.81:1; do not go lighter than `--black-2` under grey text.
3. New sections get a `SectionHeading`, a hairline, and content on the ground.
   Reach for a white panel only when it is a document the visitor fills in.
4. New imagery goes through `PhotoSlot` with a real brief, never a raw `Image`.
5. Colour means status. If it is red, yellow or green it is telling a cook or
   a customer something. Do not decorate with it.
