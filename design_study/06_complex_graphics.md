# Complex Graphics (Code-Generated)

The website uses advanced React/Tailwind compositions to create "mockup" graphics. **These are NOT images.** They are built using standard HTML/CSS elements, allowing them to be crisp at any zoom level and easily editable (e.g., changing text/colors without a design tool).

## 1. PageSpeed Insights Mock
**Location**: `src/pages/WebDesignPage.tsx`
**Structure**:
1.  **Score Circle**: An SVG (`viewBox="0 0 120 120"`) with two `<circle>` elements. The second circle uses `strokeDasharray` to create the "percentage" fill effect.
    ```tsx
    <circle r="52" strokeDasharray="327" strokeDashoffset="3" ... />
    ```
2.  **Metrics Grid**: A standard CSS Grid (`grid-cols-2`) displaying FCP, LCP, etc.
3.  **Comparison Bars**: Flex containers using percentage-based widths for bars (e.g., `width: '25%'`).

## 2. Mac/Safari Browser Frame
**Location**: `src/components/HeroSection.tsx` & `src/pages/WebDesignPage.tsx`
**Structure**:
-   **Window Chrome**: A `div` with `border-bottom`.
-   **Buttons**: Three small colored divs (`rounded-full`) representing Mac window controls (Red, Yellow, Green).
-   **Address Bar**: A flexbox container centered in the chrome with a light gray border.
-   **Usage**: Wraps an `img` tag (the actual screenshot) to make it look like it's inside a browser.

## 3. SEO / Metrics Dashboards
**Location**: `src/pages/LocalSEOPage.tsx` & `src/pages/MaintenancePage.tsx`

### A. Ranking Graph (LocalSEOPage)
-   **Path**: Created using a simple SVG `<path>` element with manual coordinate points (`d="M0 35 C 20 35 ..."`).
-   **Gradient**: An absolute positioned `div` with `clip-path` matching the curve to create the "fill" under the line.

### B. Activity Feed & Uptime Bar (MaintenancePage)
-   **Uptime Bar**: A flex row of 30 small `div` elements (representing days), colored green or yellow based on status.
-   **Activity Feed**: A vertical list (`space-y-4`) of items using small colored dots (`rounded-full`) to indicate status categories.

### C. Google Search Result Mock (WebDesignPage)
-   **Container**: `bg-dark` to contrast with the "white" search result.
-   **Text**: Carefully standardized font sizes (`text-xs`, `text-xl`) to mimic Google's SERP layout.
-   **Stars**: SVG icons looped using `map` to create the 5-star rating visual.

## 4. App Development Interface Mocks
**Location**: `src/pages/AppDevelopmentPage.tsx`

### A. VS Code / Terminal Editor
-   **Window**: Dark theme (`bg-[#1e1e1e]`) with standard Mac window controls.
-   **Syntax Highlighting**: text colors (`text-purple-400`, `text-yellow-300`) applied to `span` elements to mimic code.
-   **Progress Bar**: A nested div with `w-[87%]` and an inner absolute div using `animate-[shimmer_1s_infinite]` for the loading effect.

### B. Process Timeline
-   **Connecting Line**: An absolute positioned div with `bg-gradient-to-r` spanning the container.
-   **Step Nodes**: Circular `div`s with `border` and centered icons.

## 5. Marketing & Ad Mocks
**Location**: `src/pages/LocalMarketingPage.tsx`

### A. Google Ads Dashboard
-   **Composition**: A main dashboard container holding multiple widgets.
-   **Bar Chart**: A flex container where each bar is a `div` with a specific percentage height (`style={{ height: '${h}%' }}`).
-   **Funnel**: Stacked bars representing the drop-off from Impressions to Customers.

### B. Local Service Ads (LSA) Card
-   **Google Guaranteed**: Uses the checkmark icon in a green circle to mimic the official Google badge.
-   **Competitor Ghost**: A duplicate card with `opacity-40` and gray blocks (`bg-gray-200`) to represent a "skeleton" or unverified competitor.

## 6. Abstract Backgrounds
**Location**: `src/components/ProcessSection.tsx` & `src/pages/*.tsx`

### A. Concentric Arches (ProcessSection)
-   **SVG**: A large `<svg viewBox="0 0 1200 1200">` positioned absolutely.
-   **Gradient Stroke**: Defines a `<linearGradient>` in `<defs>` to fade the stroke from visible to transparent (`stopColor="rgba(255,255,255,0)"`).
-   **Loop**: Uses `Array.from({ length: 24 })` to generate concentric circles with increasing radii.

## 7. Abstract Service Abstractions
**Location**: `src/pages/ServicesPage.tsx`

### A. Abstract Browser UI
-   **Skeleton UI**: Uses `bg-gray-200` blocks to represent text and images, creating a "low-fidelity" wireframe look.
-   **Layering**: Floating elements with `shadow-lg` to simulate depth within the abstract window.

### B. Mobile App Frame
-   **Notch**: A `div` with `rounded-b-xl` positioned absolutely at the top center.
-   **Tab Bar**: A row of square `div`s (`rounded-lg`) to represent selectable tabs.

### C. Abstract Growth Graph
-   **Bar Heights**: Percentage-based heights (`h-[30%]`, `h-[90%]`) with distinct colors for the "current" month (`bg-orange`) vs past months (`bg-white/10`).
-   **Pop-out Label**: An absolute positioned badge (`-top-10`) showing specific growth stats.

## Key Technique
All these graphics share a common pattern:
1.  **Tailwind Shapes**: `rounded-full`, `rounded-xl`, `border`.
2.  **Absolute Positioning**: Used for "floating" badges or background blobs.
3.  **SVG for Data**: Simple SVGs are used for charts or circular progress, rather than importing chart libraries.
