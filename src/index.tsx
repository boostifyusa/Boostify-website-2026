import { hydrateRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

const container = document.getElementById('root');

if (container) {
    hydrateRoot(
        container,
        <App />,
        {
            onRecoverableError: (error, errorInfo) => {
                // Ignore expected hydration mismatches in production to keep the console clean.
                // React will still correctly patch the DOM mismatches in the background.
                if (import.meta.env.PROD) {
                    // Silent in production
                } else {
                    console.error('Hydration error caught by onRecoverableError:', error, errorInfo);
                }
            }
        }
    );
}