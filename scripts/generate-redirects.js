import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../public');
const SITEMAP_PATH = path.join(__dirname, '../dist/sitemap.xml'); // Read from dist after initial vite build

async function generateRedirects() {
    console.log('Generating Cloudflare _redirects file...');

    if (!fs.existsSync(SITEMAP_PATH)) {
        console.error('sitemap.xml not found. Run this after vite build.');
        process.exit(1);
    }

    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
    const redirectsMap = [];
    const regex = /<loc>\s*https:\/\/boostifyusa\.com(.*?)\s*<\/loc>/gs;
    let match;

    while ((match = regex.exec(sitemapContent)) !== null) {
        let uri = match[1].trim();
        // Skip root
        if (uri && uri !== '/') {
            // Add a rule: /path/ -> /path 301
            redirectsMap.push(`${uri}/ ${uri} 301`);
        }
    }

    if (redirectsMap.length > 0) {
        const redirectsDest = path.join(PUBLIC_DIR, '_redirects');

        // Preserve existing redirects if any
        let existingContent = '';
        if (fs.existsSync(redirectsDest)) {
            existingContent = fs.readFileSync(redirectsDest, 'utf8') + '\n\n';
        }

        const finalContent = existingContent + '# Auto-generated Trailing Slash Removes\n' + redirectsMap.join('\n');
        fs.writeFileSync(redirectsDest, finalContent, 'utf8');

        // Also write to dist directly since this might run after public is copied
        const distRedirects = path.join(__dirname, '../dist/_redirects');
        fs.writeFileSync(distRedirects, finalContent, 'utf8');

        console.log(`Successfully generated ${redirectsMap.length} trailing slash redirects to _redirects.`);
    } else {
        console.log('No routes found to redirect.');
    }
}

generateRedirects().catch(console.error);
