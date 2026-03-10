# Premium Portfolio Design System

## Color Palette

### Primary Colors
- **Primary**: `#8A2BE2` (Vibrant Purple) - Used for primary actions and highlights
- **Primary Dark**: `#6A1B9A` - Used for hover states and depth
- **Secondary**: `#00D4FF` (Bright Cyan) - Used for accents and secondary highlights
- **Secondary Dark**: `#00A0C4` - Used for hover states
- **Accent**: `#FF6B6B` (Coral) - Used for notifications and important elements

### Neutrals
- **Dark**: `#0F172A` - Primary background
- **Darker**: `#0A0E1A` - Deeper background
- **Light**: `#F8FAFC` - Light text
- **Lighter**: `#FFFFFF` - White text
- **Gray**: `#94A3B8` - Secondary text
- **Gray Dark**: `#64748B` - Tertiary text

### Semantic Colors
- **Success**: `#4ECDC4` - For success messages
- **Error**: `#FF6B6B` - For error messages
- **Warning**: `#FFB347` - For warnings

## Typography System

### Font Families
- **Headings**: `Space Grotesk` - Bold geometric sans-serif for headings
- **Body**: `Inter` - Highly readable sans-serif for body text
- **Code**: `JetBrains Mono` - For code snippets and technical text

### Hierarchy
```
h1: font-size: 4rem, font-weight: 800
h2: font-size: 2.5rem, font-weight: 700
h3: font-size: 1.75rem, font-weight: 700
h4: font-size: 1.25rem, font-weight: 600
Body: font-size: 1.1rem, font-weight: 400
Small: font-size: 0.9rem, font-weight: 400
```

### Line Heights & Letter Spacing
- **Headings**: `line-height: 1.2`, `letter-spacing: -0.02em`
- **Body**: `line-height: 1.6`, `letter-spacing: 0`

## Spacing System

### Base Unit
- **1 unit** = `1rem` = `16px`

### Spacing Scale
- `0.25`: `0.25rem` (4px)
- `0.5`: `0.5rem` (8px)
- `0.75`: `0.75rem` (12px)
- `1`: `1rem` (16px)
- `1.25`: `1.25rem` (20px)
- `1.5`: `1.5rem` (24px)
- `2`: `2rem` (32px)
- `2.5`: `2.5rem` (40px)
- `3`: `3rem` (48px)
- `4`: `4rem` (64px)
- `5`: `5rem` (80px)
- `6`: `6rem` (96px)
- `8`: `8rem` (128px)
- `10`: `10rem` (160px)
- `12`: `12rem` (192px)

## Component Specifications

### Buttons
#### Primary Button
- Background: `var(--primary)`
- Text: `white`
- Border-radius: `6px`
- Padding: `0.9rem 2rem`
- Font-family: `Space Grotesk`
- Font-weight: `600`
- Box-shadow: `0 4px 6px rgba(138, 43, 226, 0.3)`
- Hover: Background `var(--primary-dark)`, transform `translateY(-3px)`

#### Secondary Button
- Background: `transparent`
- Text: `var(--light)`
- Border: `1px solid var(--gray)`
- Border-radius: `6px`
- Padding: `0.9rem 2rem`
- Font-family: `Space Grotesk`
- Font-weight: `600`
- Hover: `border-color: var(--primary), color: var(--primary)`

### Cards
- Background: `rgba(255, 255, 255, 0.03)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Border-radius: `12px`
- Overflow: `hidden`
- Transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`

### Inputs
- Background: `rgba(255, 255, 255, 0.05)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Border-radius: `6px`
- Padding: `0.9rem 1.2rem`
- Color: `var(--light)`
- Font-family: `Inter`
- Focus: `border-color: var(--primary)`, `box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.2)`

## Shadows
- **Shadow 1**: `0 4px 6px rgba(0, 0, 0, 0.07)`
- **Shadow 2**: `0 10px 15px rgba(0, 0, 0, 0.1)`
- **Shadow 3**: `0 20px 25px rgba(0, 0, 0, 0.15)`
- **Shadow 4**: `0 25px 50px rgba(0, 0, 0, 0.25)`

## Transitions & Animations

### Easing
- **Default**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Bounce**: For scroll indicators

### Duration
- **Default**: `0.4s`
- **Fast**: `0.2s`
- **Slow**: `0.8s`

### Hover Effects
- Transform: `translateY(-10px)` for cards
- Scale: `scale(1.05)` for interactive elements
- Color transitions: `all 0.4s ease`

## Responsive Breakpoints

### Breakpoints
- **Mobile**: `max-width: 480px`
- **Tablet**: `max-width: 768px`
- **Desktop**: `min-width: 1025px`

### Grid System
- **Max Width**: `1200px`
- **Columns**: `12-column grid`
- **Gutters**: `2.5rem` on desktop, `1.5rem` on mobile

## Accessibility Standards

### Contrast Ratios
- Primary text on background: `7.0:1` ratio (exceeds AAA standard)
- Secondary text on background: `4.6:1` ratio (meets AA standard)
- All UI elements meet WCAG AA standards

### Focus States
- Visible focus rings with primary color (`#8A2BE2`)
- `box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.3)` for focus

### Reduced Motion
- When `prefers-reduced-motion: reduce`, disable all nonessential animations
- Use `animation-duration: 0.01ms !important` and `transition-duration: 0.01ms !important`

## Motion Guidelines

### Scroll Animations
- Fade-in elements: `opacity 0.8s ease` and `transform 0.8s ease`
- Staggered animations for title lines with `0.1s` delays

### Hover States
- Subtle transforms for interactive elements (e.g., `translateY(-3px)` for buttons)
- Smooth transitions using the default ease function

### Loading States
- Skeleton loading for content areas
- Shimmer effect for placeholders

## Background-Merged Imagery & Video Standards

### Visual Integration Techniques
- Images/videos must blend seamlessly with background
- No frames, borders, or hard edges
- Use subtle transparency (50-70%) for background media
- Apply soft filters: `blur(1px) contrast(1.1) saturate(1.2)`
- Use gradient overlays to maintain text legibility

### Image Implementation
- Background images use `background-size: cover` and `background-position: center`
- Visual elements layered above as separate elements with `z-index: 2`
- Apply `mix-blend-mode: overlay` for texture blending
- Use `backdrop-filter: blur(5px)` on content overlays for additional depth

### Video Implementation
- Background videos should be muted, looped, and play inline
- Apply same transparency and filter techniques as images
- Include fallback images for video loading issues
- Use minimal motion to avoid distraction from content

### Content Legibility
- Apply semi-transparent overlays (`rgba(15, 23, 42, 0.7)`) to ensure readable text
- Use `z-index: 3` for text and interactive elements to position above background
- Ensure WCAG AA contrast ratios are maintained over background imagery