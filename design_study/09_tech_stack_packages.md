# Tech Stack & Packages

This document outlines the core technical packages and libraries used specifically for styling, layout, and user experience formatting across the Boostify website. When recreating this project in a different workspace or framework, ensure these fundamental tools (or their exact equivalents) are available.

## 1. Tailwind CSS
The primary styling engine. The entire design system is codified into Tailwind utility classes.
- **Configuration**: `tailwind.config.js` / `tailwind.config.ts` maintains the core theme extensions (brand colors `orange`, `dark`, `light`, typography, etc.).
- **Global CSS File**: `src/index.css` handles base imports, CSS resets, modern webkit scrollbar customizations, and `::selection` highlighted colors.
- **Plugins/Extensions**: Custom arbitrary values (e.g. `w-[85%]`, `animate-[shimmer_1s_infinite]`) are heavily utilized for complex graphics rather than relying heavily on third-party CSS files.

## 2. Framer Motion (`framer-motion`)
Used extensively for all scroll-linked animations, layout transitions, and interactive visual feedback.
- **Pattern**: Most components with fade-ins or slide-ups wrap standard HTML tags in `<motion.div>` or `<motion.section>`.
- **Properties Used**: Typically utilizes `initial`, `animate`, `whileInView`, `viewport={{ once: true }}`, and `transition` with custom durations/delays. Needs to be ported if the design calls for the responsive, fluid animations native to this design.

## 3. Lucide React (`lucide-react`)
The exclusive iconography library. 
- **Pattern**: Icons are imported directly as React components (e.g., `<ArrowRight />`, `<CheckCircle />`).
- **Styling**: Styled entirely through passing Tailwind classes into the `className` prop (e.g., `className="w-6 h-6 text-orange"`).

## 4. React Helmet Async (`react-helmet-async`)
Critical for the SEO copy structure outlined in `08_seo_copy_structure.md`.
- **Usage**: Dynamically manages the document `<head>` on a per-page basis. 
- **Assets**: It injects meta tags, title schemas, and JSON-LD structured data essential for the local marketing pages.

## 5. React Router DOM (`react-router-dom`)
Handles all frontend page navigation, ensuring active states, scroll-to-top behaviors, and single-page application (SPA) fluidity. This ensures that navigations do not refresh the standard frame, preserving the sleek "App" feel of the website.

## Additional Dependencies
- **@emotion/react**: Included in the standard app stack, sometimes leveraged for encapsulated dynamic CSS or as a transitive dependency of other components.
