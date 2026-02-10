# Graphics & Assets

## Icons
The project uses **Lucide React** (`lucide-react`) for all UI icons.
- **Props**: `strokeWidth={2.5}` is commonly used for a bolder look.
- **Size**: Typically `size={16}` for small UI elements, `size={24}` for social icons.

## Background Patterns

### Topographic Pattern
- **Source**: `/hero-bg-pattern.webp`
- **Usage**: Applied as a background image on an absolute div with `opacity-[0.4]`.
- **CSS**:
  ```css
  background-image: url(/hero-bg-pattern.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  ```

### Geometric Accents (Glow Orbs)
These are NOT images, but CSS-generated elements.
- **Technique**: Large `div` with border-radius `50%`, background color, and high blur filter.
- **Orange Orb**:
  ```tsx
  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/10 rounded-full blur-[100px]" />
  ```
- **White Orb** (on dark backgrounds):
  ```tsx
  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />
  ```

## Images
- **Format**: WebP is preferred for performance.
- **Storage**: `public/` folder.
- **Aspect Ratios**:
  - Portfolio Screenshots: `4/3` (`aspect-[4/3]`)
- **Effects**:
  - `object-cover` for fitting.
  - `transition-transform duration-700 group-hover:scale-105` for subtle zoom on hover.

## Recreating Graphics
1.  **Orbs**: Do not export these from design tools. Code them using Tailwind classes (`rounded-full`, `blur-[X]px`, `bg-opacity`).
2.  **Browser Window**: Code this using HTML/CSS borders and rounded divs.
3.  **Pattern**: Needs to be a seamless or large coverage asset like `hero-bg-pattern.webp`.
