import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Runs LAST in the build. prerender.js reads its route list from
// dist/sitemap.xml, so pages have to stay in the sitemap until prerender is
// done. This then drops the ones Google shouldn't be pointed at (noindex or
// near-empty utility pages) and strips the lastmod/changefreq/priority the
// plugin stamps identically on every URL.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITEMAP_PATH = path.resolve(__dirname, '../dist/sitemap.xml');

const EXCLUDE = new Set([
    '/privacy',          // noindex
    '/check',            // QR landing hub, event only
    '/check/consult',    // noindex
    '/check/appointment',// noindex
    '/check/audit',      // noindex
    '/links',            // link-in-bio page
    '/sms',              // SMS program terms
    '/sitemap',          // human sitemap
]);

if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('sitemap.xml not found at:', SITEMAP_PATH);
    process.exit(1);
}

const content = fs.readFileSync(SITEMAP_PATH, 'utf8');
const urls = [...content.matchAll(/<loc>\s*(.*?)\s*<\/loc>/gs)].map(m => m[1].trim());
const kept = urls.filter(u => !EXCLUDE.has(new URL(u).pathname.replace(/\/+$/, '') || '/'));

const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...kept.map(u => `  <url><loc>${u}</loc></url>`),
    '</urlset>',
    '',
].join('\n');

fs.writeFileSync(SITEMAP_PATH, xml);
console.log(`Sitemap cleaned: kept ${kept.length} of ${urls.length} URLs.`);
