# Iron Burger — Design System

<!-- impeccable:design-doc 1 -->

The whole product wears one badge. The marketing site and the event
screens (`/order`, `/kds`, `/status`, `/staff`, `/inquiries`) are cut from the
same brand object: **gold bun, chrome IRON letterforms, charcoal core, one
signal red**. There is no second look.

Everything lives in [app/globals.css](app/globals.css) — tokens in `:root`,
Tailwind bindings in `@theme inline`, materials and motion in
`@layer utilities`. Change a value there and it changes everywhere.

---

## 1. Palette

Every value is OKLCH so lightness is perceptual and contrast is predictable.

### Ground — the badge's charcoal core

| Token | Value | Role |
|---|---|---|
| `--iron-black` | `oklch(0.15 0.012 60)` | Page ground, deepest wells, text on gold |
| `--charcoal` | `oklch(0.21 0.01 60)` | Panel face (`.badge-face`) |
| `--charcoal-hi` | `oklch(0.30 0.01 60)` | Top edge of the panel's raked gradient |

### Gold — carries the brand

| Token | Value | Role |
|---|---|---|
| `--gold-bright` | `oklch(0.85 0.13 88)` | Gradient top, highlights, seed caps |
| `--gold` | `oklch(0.74 0.145 84)` | The brand gold. Text on dark, rims, active states |
| `--gold-deep` | `oklch(0.52 0.11 72)` | **Non-text only** — deep gradient end, borders, scrollbar |
| `--gold-soft` | `gold / 0.18` | Panel rims, hairlines, low-alpha fills |

### Chrome — the voice

| Token | Value | Role |
|---|---|---|
| `--chrome` | `oklch(0.90 0.006 250)` | Headlines, primary body, ticket numerals |
| `--chrome-mid` | `oklch(0.66 0.008 250)` | Secondary body, labels, meta |

### Signal red — CTAs and heat only

| Token | Value | Role |
|---|---|---|
| `--signal-red` | `oklch(0.54 0.19 28)` | CTA fills. L is pinned at 0.54 so white text clears 4.5:1 |
| `--signal-red-bright` | `oklch(0.68 0.19 30)` | Icons and red text **on dark only** |
| `--signal-red-soft` | `red / 0.16` | LATE flash ground |

Red is never decorative. If something is red it is either an action or a
warning.

### Functional status — meaning outranks brand

These say something to a customer or a cook, so the brand never overrides
them.

| Token | Value | Role |
|---|---|---|
| `--cooking-yellow` / `-deep` | `oklch(0.84 0.16 88)` / `oklch(0.26 0.07 60)` | Customer status: PREPARING |
| `--pass-green` / `-bright` / `-deep` | `oklch(0.6 0.16 150)` / `oklch(0.74 0.19 148)` / `oklch(0.24 0.08 150)` | READY, pass actions |

### Semantic aliases

The event screens were written against an older vocabulary. Those names are
re-pointed here rather than rewritten in markup, which is what let the whole
app re-skin without touching its layouts:

`--paper` → charcoal · `--paper-dim` → iron-black · `--ink` → chrome ·
`--ink-soft` → chrome-mid · `--carbon-blue` → gold · `--stamp-red` → signal-red-bright

---

## 2. The rules that keep it accessible

Measured, not estimated. Every pair below was computed before it shipped.

**Verified pairs** (WCAG AA, 4.5:1 for text):

| Pair | Ratio |
|---|---|
| chrome on iron-black | 14.62:1 |
| chrome on charcoal | 13.17:1 |
| chrome-mid on charcoal (secondary body) | 5.71:1 |
| gold on charcoal | 7.61:1 |
| iron-black on gold (worst gradient stop) | 8.44:1 |
| white on signal-red (CTA) | 5.57:1 |
| signal-red-bright on charcoal | 5.66:1 |
| iron-black on pass-green | 5.35:1 |
| cooking-deep on cooking-yellow | 9.58:1 |

**Three hard bans**, each from a measured failure:

1. **Never gold text on red** — 2.39:1.
2. **Never `--gold-deep` behind text** — 3.15:1 on charcoal. It is a
   border/gradient-end colour only. This is why `.gilded` stops at `--gold`
   and the deeper ramp lives in `.gilded-deep`, which carries no text.
3. **Never gradient text.** Besides being a decorative tell, a gold gradient's
   dark end fails. Brand lettering is solid `--gold` (`.brand-gold`); the
   logo image carries the real bevel.

**When adding a colour pair, compute it.** Two live bugs were caught this way
that no visual check would have surfaced: a selected Ready tab at **1.11:1**
(dark green on charcoal — invisible), and gold buttons failing along the
bottom of their own gradient.

---

## 3. Type

Two faces, loaded in [app/layout.tsx](app/layout.tsx).

| Face | Variable | Use |
|---|---|---|
| **Big Shoulders** | `--font-display` (aliases: `--font-stamp`, `--font-plate`) | Headlines, ticket numerals, buttons, tabs. Condensed and machined, matching the logo's letterforms |
| **Libre Franklin** | `--font-body` (alias: `--font-dotmatrix`) | Body, labels, form fields |

Labels and meta use `uppercase` with `tracking-[0.14em]`–`[0.16em]` at
`text-[0.68rem]`. Headlines run `text-3xl` → `text-7xl` with
`leading-[0.92]`–`[0.95]`.

---

## 4. Materials

| Class | What it is |
|---|---|
| `.badge-face` | Charcoal panel with a raked sheen — the badge's centre behind the IRON letters |
| `.badge-panel` | The gold rim: hairline gold border, inner bevel, seated drop shadow |
| `.gilded` | Gold gradient for surfaces **carrying dark text** (bright → gold) |
| `.gilded-deep` | The full bun ramp (bright → gold-deep) — **no text** |
| `.engraved` | Chrome headline cut into the surface, not printed on it |
| `.stamp-digits` | Ticket numerals: same chrome cut, tabular |
| `.brand-gold` | Solid gold brand lettering |
| `.gold-seam` / `.perf-seam` | A thin gold rule — the **only** section divider anywhere |
| `.ticket-shadow` | Legacy alias for the panel's seated shadow |

**Components** ([components/site/plate.tsx](components/site/plate.tsx)):
`Plate` (gold-rimmed panel), `Sesame` (a bun seed doing a fastener's job —
tilt varies per corner so four read as scattered, not stamped), `DataPlate`
(spec numbers on gold with dark text), `Seam`, `SectionHeading`.

---

## 5. Motion

Gold is polished, so **this world eases** — there is no stepped or bouncing
motion. Everything decelerates.

- Standard curve: `cubic-bezier(0.16, 1, 0.3, 1)` (exponential ease-out).
- `.press` / `.plate-press` — controls seat 2px into the panel on `:active`.
- `.shine-sweep` — **the one authored moment**: light travels across the hero
  badge once on load. A translated band, not an animated `background-position`
  (that leaves a permanent cast on the panel).
- `.animate-flash-late` — LATE tickets pulse red on the kitchen display.
- Bounce/elastic easing is banned; it contradicts the material.

Everything is disabled under `prefers-reduced-motion: reduce`.

---

## 6. Browser surfaces

Themed rather than left at defaults: text selection (gold on iron-black),
focus rings (2px gold, 2px offset), and scrollbars (gold-deep thumb on an
iron-black track).

---

## 7. Assets

`public/iron-burger.png` — 1254×1254 RGBA badge, the single brand image.
Always give `Image` a `sizes` attribute: without one Next fetches the 3840px
variant (~535KB) for a 64px logo.

Favicons are generated from that badge, matted onto `#15130f` because
maskable icons get cropped and a transparent PNG shows the OS wallpaper
through. `favicon.ico` holds 16/32/48 only — the generator silently adds a
256px entry that costs 264KB of a 285KB file.

---

## 8. Adding to this system

1. Reuse a token. Add one only when no existing role fits.
2. Compute the contrast of any new pair before using it.
3. Section dividers are `.gold-seam`, never whitespace or a grey rule.
4. Panels are `Plate`, never a generic card.
5. Red = action or warning. Gold = brand. Chrome = voice. Green/yellow =
   order status, and those meanings are not available for decoration.
