# Layout & Structure

## Containers
The design uses a centered container strategy for main content.

- **Max Width**: `max-w-7xl` (approx 1280px) is the standard for the main wrapper.
- **Hero/Headings**: `max-w-4xl` or `max-w-5xl` for centered text blocks to ensure readability.

## Spacing (Padding/Margin)

### Section Spacing
- **Vertical Padding**: `py-20 md:py-32` (Large spacing for breathability)
- **Horizontal Padding**: `px-6` (Standard gutter)

### Element Spacing
- **Gap**: `gap-8` or `gap-16` used in grids.
- **Micro-spacing**: `mb-8` (margin bottom 2rem) is a standard vertical rhythm for headings and paragraphs.

## Grid Systems
- **Footer/Features**: `grid-cols-1 md:grid-cols-4` or `md:grid-cols-2`.
- **Responsive Strategy**: Single column on mobile (`grid-cols-1`) -> Multi-column on tablet/desktop (`md:grid-cols-X`).

## Z-Indexing & Layering
1.  **Orbs/Backgrounds**: `z-0` or negative z-index if absolute.
2.  **Content**: `relative z-10` (Essential for interaction over absolute backgrounds).
3.  **Navigation**: `z-50` (Fixed header).
4.  **Modals/Drawers**: `z-50` or higher.

## Breakpoints (Tailwind Default)
- **md**: 768px (Tablet split)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large Desktop)
