import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

// Removed HTML comment stripper as it breaks React 18 Hydration boundaries

const container = document.getElementById('root');
if (container!.hasChildNodes()) {
  hydrateRoot(container!, <App />);
} else {
  const root = createRoot(container!);
  root.render(<App />);
}