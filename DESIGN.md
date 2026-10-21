---
name: Divix Web
description: A bureau-de-change rate board seen once from the pavement; dot-matrix amber numerals on off-black.
colors:
  board-black: "#0d0e0b"
  panel: "#14150f"
  panel-raised: "#1c1d15"
  line: "rgb(245 232 200 / 0.12)"
  line-strong: "rgb(245 232 200 / 0.22)"
  ink: "#f3eee2"
  muted: "#aaa491"
  amber: "#f2b134"
  amber-hi: "#ffc255"
  amber-ink: "#1a1304"
  up: "#74d69a"
  down: "#ff8374"
  off: "#8a8677"
typography:
  display:
    fontFamily: "Doto Variable, ui-monospace, monospace"
    fontSize: "clamp(2.4rem, 7.4vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    fontVariation: "'wght' 800, 'ROND' 100"
  headline:
    fontFamily: "Doto Variable, ui-monospace, monospace"
    fontSize: "clamp(1.9rem, 4.6vw, 3.1rem)"
    fontWeight: 900
    lineHeight: 1.1
    fontVariation: "'wght' 900, 'ROND' 100"
  numeral:
    fontFamily: "Doto Variable, ui-monospace, monospace"
    fontSize: "1.95rem"
    fontWeight: 900
    lineHeight: 1.05
    fontVariation: "'wght' 900, 'ROND' 100"
  title:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 650
    lineHeight: 1.1
  body:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 620
    lineHeight: 1.4
rounded:
  cell: "6px"
  panel: "12px"
  phone: "2.75rem"
  pill: "99px"
spacing:
  grid-gap: "8px"
  section: "clamp(2.5rem, 5vw, 4rem)"
  gutter: "clamp(1rem, 4vw, 2rem)"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.pill}"
    height: "3.25rem"
    padding: "0 1.6rem"
  button-primary-hover:
    backgroundColor: "{colors.amber-hi}"
  rate-cell:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.amber}"
    rounded: "{rounded.cell}"
    padding: "0.8rem 0.9rem 0.85rem"
  lightbox-header:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.amber-ink}"
    height: "3.5rem"
  lightbox-facts:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.cell}"
  converter-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
  converter-field:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.amber-hi}"
    rounded: "{rounded.cell}"
    height: "3.75rem"
  phone-frame:
    backgroundColor: "{colors.panel-raised}"
    rounded: "{rounded.phone}"
    padding: "7px"
  faq-row:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cell}"
  guide-row:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cell}"
---

# Design System: Divix Web

## Overview

**Creative North Star: "The Rate Board"**

The whole site is one bureau-de-change board seen once from the pavement. An off-black ground carries a faint dot grid; an amber lightbox strip heads the page; numbers and board headlines are dot-matrix; everything that lists things (rates, FAQ, guides) is a row of identical cells. Structure comes from the board's grammar, not from the app-landing default of a phone beside a headline over three feature cards.

The theme is dark only, on purpose (the page locks the theme and declares `color-scheme: dark`). There is one accent. LEDs are discrete dots, never glows. Density is calm and legible: large dot-matrix moments, then plain Hanken Grotesk reading text at 17px.

**Key Characteristics:**
- Dark only, single amber accent, semantic green and red reserved for rate change and status lamps.
- Dot-matrix (Doto) for numerals and headlines; Hanken Grotesk for all reading text.
- Three radii plus pills; one board-cell pattern reused for rates, FAQ and guides.
- Depth from borders, a dot grid and tonal panel steps, not light effects.

## Colors

A near-black warm ground, panels one tonal step lighter, and a single LED amber that appears only on digits, headlines, the lightbox strips and the primary button.

### Primary
- **LED Amber** (`colors.amber`): dot-matrix numerals, board headlines, lightbox header and facts strip, primary button, focus ring, selection, FAQ plus and guide arrows, link color on prose pages.
- **Hot Amber** (`colors.amber-hi`): hover state of amber buttons and the typed/converted amounts in the converter.
- **Lightbox Ink** (`colors.amber-ink`): text and borders on any amber surface; also the CTA pill inside the header.

### Neutral
- **Board Black** (`colors.board-black`): page ground, overlaid with a 14px radial dot grid at 7% ink.
- **Cell Panel** (`colors.panel`): rate cells, FAQ and guide rows, converter panel, footer.
- **Raised Panel** (`colors.panel-raised`): phone frames, converter inputs, dropdown.
- **Warm Ink** (`colors.ink`): primary text. **Dust** (`colors.muted`): secondary text, notes, placeholders.
- **Hairline / Strong Hairline** (`colors.line`, `colors.line-strong`): cream at 12% and 22% for cell borders and section rules.

### Semantic
- **Up Green** (`colors.up`), **Down Coral** (`colors.down`), **Off Grey** (`colors.off`): 30-day change text and the live / cached / offline lamps (cached uses amber).

### Named Rules
**The One Lamp Rule.** Amber is the only accent. Green and red appear only to say a rate moved or a data state; never as decoration.
**The Dark Lock Rule.** One theme. Do not add a light variant or a theme switch.

## Typography

**Display Font:** Doto Variable (ui-monospace fallback)
**Body Font:** Hanken Grotesk Variable (system-ui fallback)

**Character:** Doto is a dot-matrix face that reads as LED digits; Hanken is a neutral, friendly grotesque that keeps explanatory text calm. Doto's `wght` and `ROND` axes are always set together in `font-variation-settings` (`'wght' 800-900, 'ROND' 100`), matching `font-weight`, so dots stay round.

### Hierarchy
- **Display** (800, clamp 2.4rem to 5.25rem, 1.02): hero H1, amber, centred.
- **Headline** (800, clamp 2.25rem to 4.25rem, 1.04): band and board headings, amber (`led-h2`). Section H2s in content sections are 900, clamp 1.9rem to 3.1rem, in ink.
- **Numeral** (900, 1.95rem to 2.1rem, tabular): rate values; 2.4rem in converter fields; up to 6rem for big LED numbers.
- **Title** (650, 1.15rem): H3, FAQ and guide titles (FAQ summary 620 at 1.08rem, guide title 1.2rem).
- **Body** (400, 17px, 1.6): text-wrap pretty; prose capped at 68ch, lead at 38rem.
- **Label** (620, 0.85 to 0.95rem): codes, notes, change values, nav. Sentence case; no uppercase labels.

### Named Rules
**The Numbers Are Dots Rule.** Any rate, amount or board headline is Doto; any sentence is Hanken. Prose pages (guides, legal) set their H1 and H2 in Hanken.

## Layout

A 1200px centred wrap with fluid gutter (`clamp(1rem, 4vw, 2rem)`); prose pages use a 48rem column. Sections pad `clamp(2.5rem, 5vw, 4rem)`. Rate cells and list rows sit on an 8px gap grid: 2 columns, 3 from 600px, 6 from 1040px. At 1040px and up the hero becomes a three-column stage: three rate cells left, the 340px phone centred, three right. Below that the phone is cropped by the fold (`25rem` tall) under the board. Two-column splits (phone plus copy) engage at 900px and collapse to a stack; the header menu collapses to a details dropdown under 720px. Sections alternate phone left/right and offset paired phones vertically (`4.5rem` and `2rem` shifts) rather than using equal feature cards.

## Elevation & Depth

Mostly flat and tonal: ground, panel, raised panel, each separated by a hairline border and, on the hero, a dot grid. Shadows exist only as soft ambient drops under floating objects: the phone frame (`0 32px 60px -24px rgb(0 0 0 / 0.7)` plus a 4% inset ring) and the header dropdown (`0 18px 40px -12px rgb(0 0 0 / 0.6)`). Flags carry a 1px white 12% ring.

### Named Rules
**The No Glow Rule.** No text-shadow, no colored shadows, no blurred amber halos. LEDs are crisp dots.
**The Hairline Rule.** Cells separate by 1px borders; hover and open states strengthen the border to `line-strong`.

## Shapes

Three radii and pills: 6px for cells, fields, flags' parents, lightbox strip and focus ring (`rounded.cell`); 12px for panels (converter, dropdown, guide CTA); 2.75rem for phone frames, with the screenshot inset radius computed as the frame radius minus the 7px bezel; pills (99px) for every button, header language switch, CTA and swap button. Small exceptions in the build: 8px brand icon in the header, 3px flags, 2px square list ticks, 22px root icon.

## Components

### Buttons
- **Shape:** full pill. **Primary:** amber fill, amber-ink text, weight 680; large 3.25rem tall with 1.6rem side padding, small 2.25rem. **Hover:** amber-hi. **Active:** scale 0.98. Focus ring switches to ink on amber surfaces. The header CTA is an inverted pill (ink fill, amber text) that fades in after the hero CTA leaves view.

### Lightbox header
- Sticky 3.5rem amber strip, ink text, Doto 900 wordmark at 2rem, a tag line after a divider from 1000px, nav at weight 620, outlined pill language switch.

### Lightbox facts strip
- Amber panel, 6px radius, four equal columns from 720px, divided by 1.5px ink-at-28% rules; stacks with horizontal rules below. H3 at 720 weight, body at 84% ink.

### Board and Rate Cells
- A 6px panel cell on the dot-grid board: flag (24x18 SVG), code (680), Doto value in amber with tabular numerals, and a 30-day change in muted, green or coral with arrow. Cells switch on with a 600ms opacity fade staggered 70ms per index.

### Phone Frame
- 7px bezel in raised panel, strong hairline border, 2.75rem radius, screenshot inside on white. The hero variant is cropped at the bottom (no bottom border, top-only radius) so the phone rises out of the board.

### Converter Panel
- 12px panel, strong hairline, max 46rem. Two 3.75rem selects with flag inside, a right-aligned Doto amount field in amber-hi, a dashed-border result cell, and a round amber swap button whose icon turns 180 degrees per press (240ms). Footer in muted with the pair in ink.

### FAQ and Guide Rows
- Both are board cells: panel fill, hairline, 6px, 8px gap. FAQ uses details; plus icon turns 45 degrees (220ms) and the title goes amber on hover; answer fades in with a 4px drop. Guide rows are two-column links with an amber arrow that nudges 4px right on hover.

### Motion
- Easing is one curve, `cubic-bezier(0.16, 1, 0.3, 1)`, at 150 to 260ms for state changes. Authored moments: cell-on stagger; scroll rise (22px, opacity) on section H2s, non-hero phones and guide items, inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`; FAQ height animation inside `@supports (interpolate-size: allow-keywords)`. A reduced-motion override collapses all animation and transition durations to 0.001ms and disables smooth scrolling.

## Do's and Don'ts

### Do:
- **Do** set Doto's `wght` and `ROND` axes together; use `ROND` 100.
- **Do** build any new list as board cells: panel fill, 1px `line` border, 6px radius, 8px gap.
- **Do** reserve amber for digits, headlines, lightbox strips, the primary button and focus.
- **Do** use ink-on-amber (`amber-ink`) for anything on an amber surface.
- **Do** gate new scroll or height animation behind `@supports` and respect the reduced-motion override.
- **Do** use `tabular-nums` for any figure that can change.

### Don't:
- **Don't** add glows, colored shadows or text-shadow.
- **Don't** add a light theme or theme toggle.
- **Don't** use em or en dashes in copy.
- **Don't** add eyebrows or kicker labels above headings.
- **Don't** use green or red for anything but rate change and data-state lamps.
- **Don't** introduce a fourth radius for new components; use cell, panel, phone or pill.
- **Don't** return to the phone-beside-headline over three equal feature cards layout.
