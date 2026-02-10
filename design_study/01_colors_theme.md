# Color Palette & Theme

## Core Colors

The design relies on a high-contrast theme using a deep black/gray, a vibrant orange, and clean white.

### Primary Brand Color (Orange)
Used for calls-to-action (buttons), links, accents, and selection states.

- **Default**: `#E8590C` (Tailwind: `orange` / `bg-orange`)
- **Hover**: `#C44908` (Tailwind: `orange.hover` / `hover:bg-orange-hover`)
- **Light Accent**: `#FFF0E6` (Tailwind: `orange.light` / `bg-orange-light`)
- **Faint Accent**: `rgba(232, 89, 12, 0.1)` (Used often as `bg-orange/10`)

### Neutrals

- **Dark (Text/Backgrounds)**: `#111111` (Tailwind: `dark` / `bg-dark`, `text-dark`)
- **Gray (Body Text)**: `#666666` (Tailwind: `gray` / `text-gray`)
- **Light Gray (Borders/Backgrounds)**: `#E5E5E5` (Tailwind: `gray.light` / `border-gray-light`)
- **Off-White**: `#F5F5F5` (Tailwind: `light` / `bg-light`)
- **White**: `#FFFFFF` (Standard `bg-white`)

## Gradients & Effects

### Hero Fade
A radial gradient is used on the hero section to blend the pattern into the white background.
```css
background: radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%)
```

### Glow Orbs
Ambient glowing orbs are created using absolute positioned divs with heavy blur.
**Orange Orb:**
```tsx
<div className="absolute ... bg-orange/[0.05] rounded-full blur-[120px]" />
```

## Shadows

- **Card Shadow**: `shadow-2xl shadow-dark/10`
- **Button Shadow**: `shadow-xl shadow-orange/20` (Hover: `shadow-orange/30`)

## Scrollbar
Custom scrollbar styling in `index.css`:
- **Track**: `#FFFFFF`
- **Thumb**: `#E5E5E5` (Hover: `#E8590C`)
