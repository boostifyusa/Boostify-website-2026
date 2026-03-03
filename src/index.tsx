import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

// Removed HTML comment stripper as it breaks React 18 Hydration boundaries

const container = document.getElementById('root');

if (container!.hasChildNodes()) {
    // In Production with Puppeteer Prerendering, the HTML lacks React 18's internal SSR comments 
    // (`<!-- -->`) needed for hydrateRoot, causing massive #418 & #423 console errors.
    // However, the SEO goal of Prerendering works since Crawlers see the static HTML before JS loads.
    // For users, we clear the static DOM and do a clean Client-Side Render to avoid hydration bugs.
    container!.innerHTML = '';
}

const root = createRoot(container!);
root.render(<App />);