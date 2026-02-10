# Typography

## Font Family
Primary font: **Inter** (sans-serif)
Includes: `sans-serif` as fallback.

## Font Weights
- **Medium (500)**: Standard body text (`font-medium`)
- **Semibold (600)**: Navigation links, subheaders (`font-semibold`)
- **Bold (700)**: Buttons, card titles (`font-bold`)
- **Black (900)**: Main headings (`font-black`)

## Letter Spacing (Tracking)
The design uses tight tracking for headings to give a modern, impactful feel.

- **Tighter**: `-0.04em` (`tracking-tighter`) - Used on H1/Hero headings.
- **Tight**: `-0.02em` (`tracking-tight`) - Used on subheadings and navigation.
- **Wide**: `0.025em` (`tracking-wide`) - Used on small uppercase labels.
- **Widest**: `0.1em` (`tracking-widest`) - Used on tiny "kicker" labels (e.g., "CALL · TEXT").

## Sizing Scale
- **H1**: `text-5xl md:text-7xl lg:text-8xl`
- **H2**: `text-5xl md:text-7xl`
- **Body Large**: `text-xl md:text-2xl`
- **Nav Links**: Standard text size but `font-semibold`.

## Usage Examples

**Hero Heading:**
```tsx
<h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-dark leading-[0.95] tracking-tighter">
```

**Body Text:**
```tsx
<p className="text-xl md:text-2xl text-gray font-medium leading-relaxed">
```

**Badges/Labels:**
```tsx
<span className="text-sm font-bold uppercase tracking-wider">
```
