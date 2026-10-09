# Iron Burger photo edit plan

Source photos are licensed stock supplied by the research agent. Preserve each original at its source path. This folder records edits and source-to-output mapping; only selected final images go in `public/photos/`. Use the built-in imagegen **edit** workflow after viewing each local source. Never generate a burger or a cooking scene from scratch.

## Selection and acceptance

- Source must already contain the claimed subject. A double burger must visibly have two beef patties; a flat-top shot must show a real stainless-steel or Blackstone-style cooking surface. Do not create missing sauce, pickle, lettuce, cheese, hands, guests, packaging, or equipment.
- Smash-burger acceptance gate: the original photograph must visibly show a thin pressed beef patty with ragged, lacy caramelized edges. Reject thick restaurant-style patties even if all other ingredients fit. Never use an edit to make a thick patty appear thin or to fabricate a sear crust.
- Preserve the photographed burger, ingredient placement, bun shape, patty count, sear, melting cheese, crumbs, grease, and honest imperfections. Food keeps natural colour. Apply the black/white brand treatment to surroundings, clothing, packaging, and tonality only where it remains believable.
- Aim for low-key documentary food photography: dark neutral background, controlled contrast, natural highlights on food and steel. No fake stall, logo, branded wrapper, neon, fire, smoke, added steam, impossible cheese pull, plastic-looking bun, or over-sharpening.
- Check the actual crop in the consuming layout before selection. The integrated hero now uses a 4:3 crop on phones followed by a separate headline, and a portrait beside the headline on desktop. Focal position is center/65%; the food is not covered by type. Do not extend food to solve an aspect-ratio problem; adapt the layout or choose another source instead.
- A stock image cannot honestly document an Iron Burger event. Leave `craft-3`, `band-2`, and any guest-facing gallery slot unfilled unless the licensed source is explicitly approved as representative imagery and the accompanying claim remains accurate.

## Base edit prompt — burger

```text
Use case: lighting-weather
Asset type: Iron Burger website photograph; source image is the edit target.
Primary request: Give this existing real stock photograph a restrained, dark, documentary finish appropriate to a monochrome burger-counter website.
Scene/backdrop: Keep the source setting and perspective; gently darken and neutralize only the surrounding background where plausible. Preserve natural shadows and real depth.
Subject: Keep the photographed burger pixel-faithful in its structure: exact patty count, cheese, pickle, lettuce, sauce, bun, ingredient positions, irregular edges, crumbs and texture. Keep the food in realistic natural colour and preserve any genuine appetizing highlights.
Composition/framing: Keep the subject's position and scale; retain useful real background around it for both a 4:5 phone crop and the specified wide desktop crop. No invented extension of the burger.
Lighting/mood: Subtle low-key exposure and contrast correction; believable available light, not a stylized spotlight.
Constraints: Edit the colour and light treatment only. Preserve the photograph's identity and all visible food. No text, logo, watermark, wrapper branding, new toppings, new patties, new objects, synthetic steam, flames, or smoke. Avoid glossy plastic buns and exaggerated saturation.
```

## Base edit prompt — flat-top

```text
Use case: lighting-weather
Asset type: Iron Burger website cooking photograph; source image is the edit target.
Primary request: Give the existing real flat-top cooking photograph a restrained, dark, documentary finish.
Scene/backdrop: Keep the photographed steel griddle, utensils, cook's hands if present, and actual kitchen context. Neutralize distracting background colours toward charcoal and steel grey without replacing the location or inventing a branded stall.
Subject: Keep every real patty, ingredient, tool, grease mark, sear mark, and reflection in its original place and shape. Food retains natural colour; stainless steel remains recognizable.
Composition/framing: Preserve the photographed viewpoint and enough real visual margin for the intended crop.
Lighting/mood: Modest contrast and exposure shaping, natural work light and authentic griddle texture.
Constraints: Change only tonal treatment. Do not add burgers, toppings, flame, smoke, steam, people, signage, or equipment. No text or logos.
```

## Slot priorities

| Slot | Required real source | Crop |
| --- | --- | --- |
| `hero` | close smash burger with visible natural food detail and usable real margin | 4:5 phone; 16:9 and 21:9 desktop, centered type |
| `package-private` | actual double smash burger | 4:3 |
| `craft-1` | patty on a real flat-top | 4:3 |
| `band-1` | real wide griddle during cooking | 16:7 phone; 21:7 desktop |
| `craft-2` | sauce visibly applied in the source | 4:3 |
| `package-community` | real tray of boxed burgers | 4:3 |
| `package-corporate` | real boxed burger packaging, no fabricated branding | 4:3 |
| `gallery-1` to `gallery-3` | distinct real food or equipment details | 4:5 |

## Output mapping

| Slot | Original source path | License/reference | Exact edit prompt / changes | Selected output | Review |
| --- | --- | --- | --- | --- | --- |
| Representative smash detail | `public/photos/sources/smash-christopher-stites.jpg` | Christopher Stites; [source](https://unsplash.com/photos/cheeseburger-with-pickles-and-melted-cheese-served-with-fries-77265qWj-Gk); [Unsplash License](https://unsplash.com/license) | Exact prompt below; branded paper replaced with plain paper, neutral surroundings | `output/image-edits/smash-detail.png` (1086x1448); `public/photos/smash-detail.webp` (1086x1448, 150700 bytes) | Visually inspected; no visible lettuce; patty count and beef species unverified; representative stock only; unsuitable as exact menu item or wide hero crop. |
| Griddle process | `public/photos/sources/griddle-reza-tavakoli.jpg` | Reza Tavakoli; [source](https://www.pexels.com/photo/chef-pressing-burgers-on-griddle-with-burger-press-30406049/); [Pexels License](https://www.pexels.com/license/) | Exact selected second-pass prompt below; neutral steel and sleeve | `output/image-edits/griddle.png` (1536x1024); `public/photos/griddle.webp` (1536x1024, 88074 bytes) | Visually inspected; four thin raw pale-pink patties, hand and press remain. Suitable for process/craft and potentially a wide banner, with crop checked in layout. |

Both final PNGs came from the built-in imagegen **edit** tool. WebP conversion used local Sharp at quality 86; `optimize.mjs` records the conversion. No CLI/API image generation was used.

### Exact selected prompt: Christopher representative smash detail

```text
Use case: precise-object-edit. Image 1 is the sole edit target: a real Christopher Stites photograph of a rustic thin smash cheeseburger with pickle slices and ragged dark sear edges on a tabletop. Create a restrained representative food photograph for a monochrome burger website. Change ONLY the printed third-party restaurant marks, crown-like logos, and lettering on the paper wrapper and paper liners into physically believable plain unbranded off-white or charcoal parchment, matching the existing folds, creases, shadows, scale and perspective. Gently reduce yellow/green colour cast and lower brightness of non-food surroundings and tabletop toward believable dark neutral tones. Keep the photographed burger, bun, lacy beef edges, pickle slices, cheese, sauce, all food textures and positions exactly as they are; keep realistic natural food colour and its rustic imperfections. Do not add lettuce, extra patties, cheese drips, toppings, fake brand identity, text, props, smoke, steam or flames. Do not make the bun or cheese glossy, plastic, or stylized. Do not invent a clean studio set or reposition the food. Preserve the natural candid photographic look. Output one coherent edit suitable as a close smash-burger detail; it need not depict the exact Iron Burger menu recipe.
```

### Exact selected prompt: Reza griddle, second pass

```text
Use case: lighting-weather. Image 1 is the sole edit target: a genuine photograph of four very thin raw beef patties on a flat-top, with a hand holding a burger press. Make an EXTREMELY CONSERVATIVE colour-grade edit only: gently lower the exposure and saturation of the steel and back wall toward neutral charcoal, and change the red sleeve to near-black. Keep the original photographed raw patties their exact subdued pale pink-grey colour, softness, shape, count, size, ragged contours and positions. Keep the hand and press exactly as photographed. Retain the original light, shallow depth of field, grain, haze, and griddle reflections. Do not enhance, sharpen, retouch, reconstruct, or restyle the food. Do not increase red saturation or make it look fresher, cooked, or crusted. Do not add or remove anything including smoke or steam. This should look like a modest Lightroom colour correction of the same real photo, not a new photograph.
```

The first Reza pass was rejected during review because it made raw patties too red and sharpened their surface. It was never copied into the project or deployed.

## Anto complementary sauce/cheese attempt — not deployable

- Source: `public/photos/sources/smash-anto-meneghini.jpg`, Anto Meneghini; [source](https://unsplash.com/photos/hand-adding-ketchup-to-a-double-cheeseburger-and-fries-wlehgn1YeZ8); [Unsplash License](https://unsplash.com/license). The photographed food lacks lettuce; patty count and meat species are not independently verified. No exact-menu or single/double claim is valid.
- The built-in imagegen edits removed the bottle print and/or darkened the table, but every reviewed output also reconstructed the bun and cheese texture. These edits fail the source-preservation rule and were **rejected**. None was copied to `public/photos/`.
- A geometric source crop was prepared at `{ left: 150, top: 1700, width: 3000, height: 2250 }` from the 4000x5600 original as `output/image-edits/anto-edit-target.png`; the crop alone still shows the bottle label. An earlier tighter crop and ungraded WebP were moved out of `public/photos/` to `output/image-edits/anto-crop-rejected.{png,webp}`. They are not usable final brand assets.
- No `public/photos/sauce-detail.webp` is published. A local edit that can preserve the original food pixels while replacing only the bottle label and grading the plate/background would be required to finish this asset. Do not substitute one of the rejected generated versions.

### Exact Anto prompts tried with built-in imagegen edit

Initial full-source edit (rejected: food looked re-rendered):

```text
Use case: precise-object-edit. Image 1 is the sole edit target: Anto Meneghini's real overhead photograph of a rustic thin-edged cheeseburger on a white plate, with ketchup bottle tip nearby and fries in the lower tray. Create a restrained close food-detail edit for a black-and-white burger website. Crop tighter around the existing burger, melted cheese, rough pressed meat edges, plate, and actual ketchup bottle mouth, keeping the original overhead perspective. The food, bun, cheese, real sauce smear at the bottle tip, visible pickle, patty geometry, positions and textures must stay as photographed; do not modify, reconstruct, count or add any food. Keep any fries only if naturally within the crop. Exclude the readable commercial bottle label by framing, or replace only the label with plain unbranded glass colour if it cannot be fully cropped. Preserve the photographed hand only if it naturally remains in frame. Gently lower the bright white table and tray surroundings to a believable neutral grey; keep food naturally coloured and imperfect. No new ketchup stream, sauce drizzle, lettuce, toppings, extra patty, logo, text, flame, steam, smoke, dramatic spotlight, synthetic gloss or plastic bun. This is representative food photography, not an exact Iron Burger recipe photo.
```

Full-source label-only edit (rejected: food texture changed):

```text
Use case: precise-object-edit. This is a real Anto Meneghini photograph. Perform an exceptionally small photo retouch: remove ONLY the visible commercial lettering/logo on the ketchup bottle, replacing that label with a plain neutral unbranded surface that follows the existing bottle curvature and light. Leave absolutely everything else unchanged. In particular copy the food pixels and visible texture faithfully: the original soft wrinkled bun, uneven thin pressed meat edges, irregular cheese melt, existing pickle, plate, fries, hand, bottle mouth, ketchup smear, perforated table, lighting, grain, exposure, perspective and composition. Do not crop, sharpen, smooth, saturate, relight, darken, add, remove or beautify the burger or fries. Do not invent a ketchup stream, garnish or toppings. This should remain indistinguishable from the source photograph except for the bottle label; no glossy or synthetic food rendering.
```

Cropped-source dark treatment (rejected: food texture changed; plate remained light):

```text
Use case: precise-object-edit. Edit target is the supplied crop of a real Anto Meneghini food photograph. Keep the exact crop and overhead view. Replace ONLY the printed marks and lettering on the partially visible ketchup bottle label at the upper right with a plain, dark, unbranded bottle surface that follows its existing shape, transparency, lighting and reflections. Neutralize ONLY the surrounding perforated tabletop and white plate toward low-key charcoal and steel grey, preserving real shadows and detail. The burger and all food are locked to the photographed source: retain the existing slightly squashed, wrinkled bun, ragged thin meat, irregular melted cheese, visible pickle, existing ketchup on the bottle mouth, all colours, textures, shape, scale and positions exactly. Do not redraw, sharpen, smooth, increase saturation, darken, retouch, crop or otherwise alter any food pixel. Do not add a sauce stream, ingredients, garnish, hands, props, steam, smoke, flames, text or logos. This is a minimal brand-neutral photo edit, not a new food image.
```

Generated-result plate correction (rejected: further food texture change):

```text
Use case: precise-object-edit. Edit ONLY the pale disposable plate beneath the burger, turning that same plate into a dark neutral charcoal plate with the identical circular ridges, shadows and photographed perspective. Do not change anything else in the supplied image. Keep the existing unbranded bottle, dark perforated table, metal tray, burger, bun, pickle, ragged thin patties, melted cheese, sauce and every food detail unchanged in colour, geometry and texture. No new food, gloss, text, logo, steam or effects. This is a local colour replacement of the plate only.
```

Cropped-source label-only edit (rejected: food texture changed):

```text
Use case: precise-object-edit. The supplied cropped real photograph is the edit target. Remove ONLY the visible printed words and logo on the partial ketchup bottle label in the upper-right corner, using a plain unbranded label with the same label edge, bottle curvature, lighting and reflections. Preserve the precise source framing and every other photographed pixel, especially the burger: bun wrinkles and pores, ragged beef edges, uneven cheese texture and colour, pickle, plate, steel tray, perforated table, and ketchup at the bottle mouth. Absolutely no other recolouring or relighting, no generative food changes, no crop, no new elements or sauce stream. The result should look like the same photograph with only the bottle print erased.
```

## Rejected initial candidates (2026-10-07)

The following files remain untouched in `public/photos/sources/` for the research agent's records. They have thick restaurant-style patties and are not eligible for the smash-burger hero or product slots. No edit was generated or published from them.

- `single-cheeseburger-dasha.jpg`
- `double-cheeseburger-hombre-de-goma.jpg`
- `single-cheeseburger-atlantic-ambience.jpg`

## Rejected flat-top candidate (2026-10-07)

- `public/photos/sources/griddle-logan-weaver.jpg` — source supplied by research: LOGAN WEAVER, https://unsplash.com/photos/person-grilling-burgers-in-the-snow-at-night-20ZsmpsRS0U; license reference https://unsplash.com/license. The actual griddle/patty region occupies only a small central lower-right portion of the 1600x2400 portrait. Cropping out the person, drink, and branded packages leaves insufficient detailed patty area for the 21:7 banner or a strong 4:3 craft image; snow and night flash lighting also remain. No edit or deployed asset made.
