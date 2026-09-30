---
name: Studio Aura
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#121212'
  on-primary-container: '#7e7d7d'
  inverse-primary: '#5f5e5e'
  secondary: '#e9c176'
  on-secondary: '#412d00'
  secondary-container: '#604403'
  on-secondary-container: '#dab36a'
  tertiary: '#c9c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#121212'
  on-tertiary-container: '#7f7d7d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.2em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style
The design system is anchored in "Quiet Luxury"—a philosophy of restraint, exceptional materiality, and intentionality. It targets a high-net-worth clientele seeking bespoke architectural and interior services. The UI must mirror the experience of a private art gallery or a high-end boutique hotel: silent, spacious, and impeccably curated.

The aesthetic blends **Minimalism** with **High-Contrast Editorial** flair. By prioritizing "dark space" over information density, the design system allows high-resolution photography of interiors to act as the primary visual driver. The interface serves as a sophisticated frame—never competing with the work itself.

## Colors
The palette is deeply immersive, utilizing a dark-on-dark foundation to create a sense of depth and exclusivity.

- **Primary & Tertiary:** Rich Black (#0A0A0A) is used for the base canvas, while Deep Charcoal (#121212) defines structural containers and subtle layering.
- **Accent:** Champagne Gold (#C5A059) is applied with surgical precision. It is reserved for hairline borders, critical call-to-actions, and active states to guide the eye without overwhelming the senses.
- **Neutrals:** Off-White (#F5F5F5) provides high-legibility for primary copy, while Soft Grey (#8E8E8E) is used for secondary metadata and de-emphasized labels.

## Typography
The typographic scale emphasizes the contrast between classical elegance and modern precision. 

Headlines utilize **Bodoni Moda**, a high-contrast serif that evokes luxury fashion and editorial prestige. These should be set with generous letter spacing to enhance the "breathable" quality of the layout. 

Body text utilizes **Montserrat** at lighter weights (300/400) to maintain a clean, contemporary edge. Small labels and navigational elements must be set in uppercase with significantly increased tracking (20%) to signal a curated, professional tone.

## Layout & Spacing
This design system employs a **Fixed Grid** philosophy for desktop to ensure perfect compositions, transitioning to a fluid model for smaller viewports.

- **Desktop (1440px+):** A 12-column grid with 32px gutters and 80px side margins. 
- **Section Gaps:** Vertical rhythm is intentionally slow. Large gaps (160px+) between sections are mandatory to prevent the UI from feeling "crowded" or "transactional."
- **Alignment:** Content should predominantly be center-aligned or use asymmetrical offsets to mimic architectural blueprints.

## Elevation & Depth
Depth is achieved through **Tonal Layering** and **Hairline Outlines** rather than traditional shadows.

1.  **Surfaces:** The base layer is #0A0A0A. Raised elements (cards, modals) use #121212.
2.  **Dividers:** Use 0.5px or 1px "Gold Hairlines" (#C5A059 at 40% opacity) for horizontal separators and grid definitions.
3.  **Imagery:** Photos should be treated as the highest elevation point. Use subtle inner borders on image containers to give them a "framed" appearance.
4.  **Shadows:** When necessary for functional overlays (modals), use a sharp, zero-blur black shadow to maintain the brutalist-luxury edge.

## Shapes
The design system exclusively uses **Sharp (0px)** corners. Every UI element—from buttons and input fields to image containers and modals—must maintain 90-degree angles. This architectural rigidity communicates discipline, precision, and high-end construction. Soft or rounded corners are strictly prohibited as they detract from the sophisticated, gallery-like aesthetic.

## Components
- **Buttons:** Primary buttons are ghost-style with a Champagne Gold (#C5A059) 1px border and centered uppercase text. On hover, the button fills with Gold and transitions text to Rich Black.
- **Inputs:** Minimalist bottom-border only. Labels are `label-caps` placed above the line. The border glows slightly (0.5 opacity) when focused.
- **Cards:** No background fill by default. Cards are defined by their content and a thin gold top-border. Images within cards should have a slight zoom-scale effect on hover.
- **Lists:** Clean, spanning the full width of their container, separated by 0.5px Champagne Gold dividers.
- **Navigation:** A minimal top bar with high transparency. Links use `label-caps`. The active state is indicated by a 1px gold underline that spans the width of the word.
- **Cursor:** For web implementations, a custom circular "lens" cursor that inverts colors over text or expands when hovering over images is recommended.