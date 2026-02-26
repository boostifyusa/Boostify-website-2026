import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

// Removed HTML comment stripper as it breaks React 18 Hydration boundaries

const container = document.getElementById('root');

// CRITICAL FIX FOR REACT 18 + FRAMER MOTION HYDRATION ERRORS:
// Because we prerender the site with Puppeteer, Framer Motion animations complete their cycle before the HTML is saved.
// When React 18 hydrates, it expects the initial animation state (opacity: 0) but sees the final state (opacity: 1).
// This causes deep hydration mismatches (Error #418 and #423), forcing React to perform a full client remodel anyway.
// By using createRoot directly on the container, we guarantee the user's browser performs a fresh client mount.
// This preserves the full SEO bot readability of the prerendered HTML, while completely eliminating all console hydration errors
// and keeping our beautiful Framer Motion on-load animations intact.

const root = createRoot(container!);
root.render(<App />);