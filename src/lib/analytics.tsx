import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics 4 for the SPA.
 *
 * The Measurement ID comes from VITE_GA_MEASUREMENT_ID at build time. With no
 * ID set, everything here is a no-op, so the site builds and runs unchanged.
 *
 * - gtag.js is injected at runtime, never during the puppeteer prerender
 *   (navigator.webdriver), so the tag is not baked into the static HTML twice.
 * - page_view is sent by <Analytics /> on first load and every route change
 *   (config uses send_page_view:false so the first page is not double-counted).
 * - generate_lead fires after a form submission the server accepted.
 * - click_to_call / click_email fire on any tel: / mailto: link click.
 * No PII goes to GA: no names, emails, phone numbers or messages.
 */

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
    }
}

const GA_ID: string = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();

function enabled() {
    return Boolean(GA_ID) && typeof window !== 'undefined' && !navigator.webdriver;
}

let initialized = false;
let firstView = true;

function init() {
    if (initialized || !enabled()) return;
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    // Delegated, capture phase: catches every tel:/mailto: link, present or future.
    document.addEventListener('click', (e) => {
        const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
        if (!a) return;
        const href = a.getAttribute('href') || '';
        if (href.startsWith('tel:')) {
            trackEvent('click_to_call', { page: window.location.pathname });
        } else if (href.startsWith('mailto:')) {
            trackEvent('click_email', { page: window.location.pathname });
        }
    }, true);
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
    if (!enabled()) return;
    init();
    try { window.gtag('event', name, params); } catch { /* never break the page */ }
}

export function trackLead(formName: string, serviceRequested?: string) {
    trackEvent('generate_lead', {
        form_name: formName,
        service_requested: serviceRequested || '',
        page: typeof window !== 'undefined' ? window.location.pathname : '',
    });
}

/** Mount once inside <Router>. Sends page_view on load and on each route change. */
export function Analytics() {
    const { pathname, search } = useLocation();
    useEffect(() => {
        if (!enabled()) return;
        init();
        // Lazy routes set document.title via Helmet after mount: wait for a
        // title change (max ~1.5 s) so the page_view carries the right title.
        // The first load of a prerendered page already has its real title.
        const before = firstView && document.title ? '' : document.title;
        firstView = false;
        let tries = 0;
        let t: ReturnType<typeof setTimeout>;
        const send = () => {
            if (document.title && (document.title !== before || tries >= 10)) {
                trackEvent('page_view', {
                    page_path: pathname + search,
                    page_location: window.location.href,
                    page_title: document.title,
                });
            } else if (tries++ < 10) {
                t = setTimeout(send, 150);
            } else {
                trackEvent('page_view', { page_path: pathname + search, page_location: window.location.href });
            }
        };
        t = setTimeout(send, 50);
        return () => clearTimeout(t);
    }, [pathname, search]);
    return null;
}
