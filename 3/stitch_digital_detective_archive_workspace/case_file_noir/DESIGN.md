---
name: Case File Noir
colors:
  surface: '#101411'
  surface-dim: '#101411'
  surface-bright: '#363a37'
  surface-container-lowest: '#0b0f0c'
  surface-container-low: '#191d19'
  surface-container: '#1d211d'
  surface-container-high: '#272b28'
  surface-container-highest: '#323632'
  on-surface: '#e0e3de'
  on-surface-variant: '#d1c5b4'
  inverse-surface: '#e0e3de'
  inverse-on-surface: '#2d312e'
  outline: '#9a8f80'
  outline-variant: '#4e4639'
  surface-tint: '#e9c176'
  primary: '#e9c176'
  on-primary: '#412d00'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#775a19'
  secondary: '#ffb3b5'
  on-secondary: '#620e1c'
  secondary-container: '#832933'
  on-secondary-container: '#ff9da2'
  tertiary: '#b7ccb2'
  on-tertiary: '#233522'
  tertiary-container: '#96ab92'
  on-tertiary-container: '#2d3f2c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#ffdada'
  secondary-fixed-dim: '#ffb3b5'
  on-secondary-fixed: '#40000c'
  on-secondary-fixed-variant: '#802631'
  tertiary-fixed: '#d3e9cd'
  tertiary-fixed-dim: '#b7ccb2'
  on-tertiary-fixed: '#0e1f0f'
  on-tertiary-fixed-variant: '#394b37'
  background: '#101411'
  on-background: '#e0e3de'
  surface-variant: '#323632'
typography:
  headline-xl:
    fontFamily: EB Garamond
    fontSize: 2.75rem
    fontWeight: '600'
    lineHeight: 3rem
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 2rem
    fontWeight: '500'
    lineHeight: 2.25rem
  headline-md:
    fontFamily: EB Garamond
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: 1.75rem
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Courier Prime
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.6rem
  body-md:
    fontFamily: Courier Prime
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.45rem
  body-sm:
    fontFamily: Courier Prime
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Courier Prime
    fontSize: 0.875rem
    fontWeight: '700'
    lineHeight: 1rem
  label-md:
    fontFamily: Courier Prime
    fontSize: 0.75rem
    fontWeight: '700'
    lineHeight: 0.875rem
  label-sm:
    fontFamily: Courier Prime
    fontSize: 0.625rem
    fontWeight: '700'
    lineHeight: 0.75rem
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the tactile gravity of mid-century forensic archives, classic literary noir, and physical evidence dockets. Built for an immersive investigative narrative, the interface casts the player as an analyst poring over declassified records under low-wattage desk lamps.

The visual style merges tactile physical skeuomorphism with disciplined archival brutalism. Interfaces reject modern digital software conventions—discarding floating pills, sterile data grids, and saturated accent badges—in favor of physical artifacts: index cards, charred telegram slips, photo plates secured by tarnished metal clips, and stark ink impressions. The tone is deliberate, historical, solemn, and intensely forensic.

## Colors

The palette reproduces the materials of an unventilated precinct archive after midnight: oxidized brass fittings, lamp-scorched manila paper, damp charcoal cardstock, and dried forensic ink.

- **Primary (`#c5a059` — Tarnished Antique Brass):** Reserved for key evidence highlights, critical interactive hotkeys, brass grommets, and dossier exhibit seals.
- **Secondary (`#8c2f39` — Dried Burgundy / Forensic Ink):** Used exclusively for urgent marginalia, redactions, contradictory testimony flags, and investigative yarn nodes.
- **Tertiary (`#4a5d48` — Weathered Moss):** Applied to verified leads, confirmed alibis, and declassified state stamps.
- **Neutral (`#161a17` — Weathered Deep Olive / Midnight Charcoal):** Forms the foundational surface backing for dossier sheets, desk surfaces, and vignette backing layers.
- **Accent Light (`#d8cfbc` / `#f3eedf` — Scorched Cardstock & Aged Ivory):** Serves as high-contrast documentary backgrounds for typed transcripts, victim logs, and photographic plate borders.

## Typography

The type system stages a dialogue between classical literary prose and clinical, mechanical documentation.

- **Headlines (`EB Garamond`):** Evokes mid-century publishing, legal indictments, and chapter openings. Retains historic elegance with natural ligatures and deliberate vertical rhythm. Set in sentence case or classical small capitals.
- **Body & Labels (`Courier Prime`):** Simulates mechanical typewriter strikes on damp archival sheets. Monospaced clarity provides rigorous rhythm across autopsy logs, field reports, evidence dockets, and interactive keyboard prompts. All critical metadata, docket references, and HUD cues appear in strict, monospaced uppercase.

## Layout & Spacing

The layout model simulates a tactile mahogany desk or cork incident board rather than an administrative viewport.

- **HUD Shell:** Freeform atmospheric framing anchored by a 2rem outer canvas safe margin. Interaction bars hug the screen extremities, keeping center sightlines clear for environmental observation and physical documents.
- **Case Board Layout:** Free-coordinate spatial placement layered over an anchored grid. Elements align along strict 1.5rem gutters when structured inside dossier jackets, but freely overlap with manual pitch angles when pinned as loose evidence cards.
- **Responsive Handling:** On compact displays, layered physical items convert into a sequential card-stack binder. Tabbed margins compress to strict 0.5rem edge gutters, with HUD commands condensed into an interactive bottom docket reel.

## Elevation & Depth

Visual depth is produced through paper stock thickness, physical overlaps, and harsh desk-lamp directional illumination rather than modern software blur filters.

- **Level 0 (Desk / Incident Surface):** Deep charcoal olive base (`#090b0a` to `#161a17`) with a dramatic radial vignette falloff toward screen corners.
- **Level 1 (Dossier Folders & Slates):** Matte parchment and heavy cardstock (`#1b201d` or `#d8cfbc`), casting hard, tight contact drop-shadows (offset Y: 4px, blur: 8px, opacity: 0.65).
- **Level 2 (Pinned Evidence & Photo Plates):** Overlaid physical artifacts casting distinct directional shadows (offset X: -2px, Y: 8px, blur: 16px, opacity: 0.8), conveying clear separation from the docket beneath.
- **Level 3 (Interactive Overlays & Inspection Loupe):** High focal priority; elements use crisp 1px antique brass borders (`#c5a059`) with wide, dense surrounding blackout shadows to isolate inspected clues from background clutter.

## Shapes

Every component utilizes razor-sharp 90-degree corners (`roundedness: 0`). Curved edges undermine the mechanical, tactile quality of stamped cardstock, guillotine-trimmed paper, sheet-metal clips, and glass photographic negatives.

Physical wear is expressed via rectilinear framing: clipped corners (using 45-degree chamfers on file tags), perforated paper tear-lines, and mechanical borders made from rules and double-rules.

## Components

### Interaction Deck & Key Prompts
- **Structure:** Monospaced keyboard bindings enclosed in crisp 1px brass boxes (`[E]`, `[TAB]`, `[SPACE]`), accompanied by uppercase typewriter labels.
- **State:** Inactive keys sit in dimmed slate carbon (`#4a5d48`); active or contextually highlighted actions glow with solid `#c5a059` fills and midnight charcoal text.

### Evidence Docket Cards & Photo Plates
- **Visuals:** Rigid rectangular boundaries with heavy 8px aged ivory photo borders. Center images feature monochrome or duotone forensic contrast.
- **Mounts:** Anchored at the top edge by a simulated brass staple, metal paperclip, or circular tack.
- **Metadata:** Lower margin contains a typewriter-set exhibit tag (`EXHIBIT #4-A · FOUND AT PERIMETER`).

### Clue Pinboard & Thread Nodes
- **Pins:** 8px solid brass squares with high-contrast central catchlights.
- **Connections:** Crisp vector lines in dried crimson (`#8c2f39`) or aged thread (`#c5a059`) running directly pin-to-pin, indicating active deductions and established motives.

### Case Dossier Folders & Exhibit Stamps
- **Folder Tabs:** Staggered rectilinear tabs across top and side edges, labeled with typewriter typography and case registry numbers.
- **Classification Stamps:** Stamped angular bounding boxes reading `CONFIDENTIAL`, `DECEASED`, or `ALIBI VERIFIED`. Stamps use semi-opaque, slightly misaligned borders in `#8c2f39` or `#4a5d48` to emulate authentic rubber ink impressions.

### Input Fields & Search Queries
- **Styling:** Underlined ruled paper lines without enclosing container boxes. Blinking solid rectangular block caret (`█`) indicating active terminal/typewriter focus.