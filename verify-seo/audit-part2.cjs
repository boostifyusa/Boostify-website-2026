const https = require('https');

async function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // follow redirect (simple)
                let redirectUrl = res.headers.location;
                if (!redirectUrl.startsWith('http')) {
                    redirectUrl = new URL(redirectUrl, url).href;
                }
                return resolve(fetchUrl(redirectUrl));
            }
            let data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => {
                const body = Buffer.concat(data).toString('utf8');
                resolve({
                    statusCode: res.statusCode,
                    body,
                    finalUrl: url
                });
            });
        });
        req.on('error', reject);
        req.end();
    });
}

function extractTag(html, regex) {
    const match = html.match(regex);
    return match ? match[1].trim() : null;
}

const pages = [
    "/", "/services", "/web-design", "/local-seo", "/local-marketing",
    "/ai-automation", "/app-development", "/maintenance", "/work", "/about",
    "/contact", "/seo-audit", "/blog/free-contractor-tools",
    "/fresno-marketing-agency", "/clovis-marketing-agency",
    "/visalia-marketing-agency", "/merced-marketing-agency",
    "/madera-marketing-agency", "/hanford-marketing-agency",
    "/tulare-marketing-agency", "/sanger-marketing-agency",
    "/blog/"
];

async function run() {
    const baseUrl = 'https://boostifyusa.com';
    const results = [];

    for (const path of pages) {
        let url = baseUrl + path;
        try {
            const res = await fetchUrl(url);
            const html = res.body;

            const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i) || 'N/A';
            const h1 = extractTag(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) || 'N/A';
            const canonical = extractTag(html, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i) || 'N/A';
            const hasSchema = html.includes('application/ld+json');

            // Link checks
            const hasAiLink = html.includes('/ai-automation');
            const hasAuditLink = html.includes('/seo-audit');
            const hasMapsShortlink = html.includes('maps.app.goo.gl');

            results.push({
                path,
                status: res.statusCode,
                title,
                h1: h1.replace(/<[^>]+>/g, ''), // strip inner tags if any
                canonical,
                hasSchema,
                hasAiLink,
                hasAuditLink,
                hasMapsShortlink
            });
        } catch (e) {
            results.push({ path, error: e.message });
        }
    }

    console.log(JSON.stringify(results, null, 2));
}

run();
