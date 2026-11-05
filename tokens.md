# Soviet Architecture & Constructivist Design System

## Palette Specification
The color scheme is directly extracted from Soviet Modernism, monumental precast concrete architecture (*béton brut*), weathered masonry, and constructivist terracotta brick.

### Core User Palette
- **Slate Grey**: `#7A828A` — Structural steel, panel joints, dividers, blueprint annotations, rebar guide lines.
- **Cloudy Grey**: `#A3AAAE` — Precast facade borders, secondary typography, architectural calibration ticks.
- **Dusty Concrete**: `#C2C7C5` — Primary body copy, light panel surfaces, architectural wireframe highlights.
- **Muted Khaki**: `#9C8E85` — Weathered stone, technical serial numbers, metadata callouts, warm concrete accents.
- **Faded Terracotta**: `#8A6552` — Constructivist red-terracotta focal accents, active states, stamp seals, status indicators, buttons, load-bearing stress nodes.

### Structural Grounding Neutrals
- **Void / Deep Asphalt**: `#131518` — Primary viewport background.
- **Monolith Foundation**: `#1a1d21` — Structural base plinth.
- **Precast Panel**: `#21252b` — Card and module background.
- **Elevated Plinth**: `#292f36` — Hover states and elevated cards.
- **Crisp Monolith White**: `#edf0ef` — Stark high-contrast headings and callouts.

---

## Typography Hierarchy

### Font Families
- **Display & Headings**: `Oswald` (Google Fonts: 400, 500, 600, 700) — Monumental, condensed, geometric architectural sans-serif with stark verticality.
- **Technical & Coordinates**: `Space Mono` (Google Fonts: 400, 700) — Engineering drafting font for technical serials, blueprint coordinates, Cyrillic-inspired architectural tags.
- **Body & Prose**: `Inter` (Google Fonts: 300, 400, 500, 600) — Clean, legible structural grotesque for paragraphs and case studies.

### Scale & Letter-Spacing
- `h1`: `clamp(2.6rem, 5.5vw, 4.2rem)`, `font-weight: 700`, `letter-spacing: 0.02em`, uppercase.
- `h2`: `clamp(2.2rem, 4.2vw, 3.2rem)`, `font-weight: 700`, `letter-spacing: 0.04em`, uppercase.
- `h3`: `clamp(1.4rem, 2.5vw, 1.9rem)`, `font-weight: 700`, `letter-spacing: 0.03em`, uppercase.
- `h4`: `1.15rem`, `font-weight: 600`, `letter-spacing: 0.03em`, uppercase.
- `mono`: `0.65rem – 0.72rem`, `letter-spacing: 0.14em – 0.18em`, uppercase.
- `body`: `0.95rem – 1.05rem`, `line-height: 1.7 – 1.75`.

---

## Architectural Component Language

### 1. Monolithic Precast Panels (Cards)
- Chamfered corner cuts: `clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)`.
- Structural joints: `border: 1px solid var(--slate-grey)`.
- Hard architectural drop shadows: `3px 3px 0 #0d0f11` shifting to `4px 4px 0 var(--faded-terracotta)` on hover.
- Classification stamps: `[ СЕКЦИЯ 01 // ARCH-01 ]`.

### 2. Monumental Brutalist Buttons
- **Primary**: Background in Faded Terracotta (`#8A6552`), text in Dusty Concrete (`#edf0ef`), chamfered top-right cut, solid mechanical offset hover `transform: translate(-2px, -2px)`.
- **Secondary**: Precast panel background (`#21252b`), border in Slate Grey (`#7A828A`), text in Dusty Concrete.

### 3. Drafting Reticle Cursor
- Circular drafting gauge with 4 perpendicular calibration ticks in `#8A6552`.
- Center point indicator dot in Faded Terracotta.
- Expanding precision reticle on hoverable interactives.

### 4. Interactive Canvas Engines
- **Axonometric Drafting Canvas (`#universe`)**: 3D wireframe rotating monolithic blocks, perspective blueprint grid lines, drafting crosshair coordinates (`+`), and drifting airborne concrete dust particles.
- **Card 1 — Kinetic Constructivist Tower**: Double-helical rotating wireframe, inclined structural spine, cross-truss bracing, load-bearing terracotta stress nodes, and revolving central assembly chamber.
- **Card 2 — Modular Precast Facade**: Brutalist multi-story concrete facade with deep recessed window apertures, internal illumination cycles, and horizontal expansion joints.
- **Card 3 — Modernist Observatory Rotunda**: Geodesic dome ribs, concentric azimuth calibration rings, and rotating 360° radar scanner beam.
