/**
 * First-touch lead attribution.
 *
 * On the first page load of a visit we record where the visitor came from
 * (UTM tags, Google Ads gclid, the landing page and an external referrer).
 * Lead forms send it with the submission so the server can pass it to the CRM.
 *
 * First touch wins: once stored, later page loads never overwrite it, except
 * when a new visit arrives with fresh UTM/gclid tags (a new paid click).
 * Storage can throw (private mode, blocked site data); every access is guarded
 * and the form still submits with whatever is available.
 */

export type Attribution = {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    gclid: string;
    landing_page: string;
    referrer: string;
};

const KEY = 'boostify_first_touch';

function read(): Attribution | null {
    for (const store of [() => window.localStorage, () => window.sessionStorage]) {
        try {
            const raw = store().getItem(KEY);
            if (raw) return JSON.parse(raw);
        } catch { /* storage unavailable */ }
    }
    return null;
}

function write(value: Attribution) {
    const raw = JSON.stringify(value);
    for (const store of [() => window.localStorage, () => window.sessionStorage]) {
        try { store().setItem(KEY, raw); } catch { /* storage unavailable */ }
    }
}

let memory: Attribution | null = null;

export function captureAttribution() {
    if (typeof window === 'undefined') return;
    try {
        const params = new URLSearchParams(window.location.search);
        const tagged = ['utm_source', 'utm_medium', 'utm_campaign', 'gclid'].some((k) => params.get(k));
        const existing = read();
        if (existing && !tagged) {
            memory = existing;
            return;
        }

        let referrer = '';
        try {
            if (document.referrer && new URL(document.referrer).hostname !== window.location.hostname) {
                referrer = document.referrer;
            }
        } catch { /* malformed referrer */ }

        memory = {
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            gclid: params.get('gclid') || '',
            landing_page: window.location.origin + window.location.pathname + window.location.search,
            referrer,
        };
        write(memory);
    } catch { /* never break the page over attribution */ }
}

export function getAttribution(): Partial<Attribution> {
    if (typeof window === 'undefined') return {};
    return memory || read() || {};
}

/** Fields every lead form adds to its POST body. */
export function leadContext(formName: string) {
    return {
        formName,
        sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
        attribution: getAttribution(),
    };
}
