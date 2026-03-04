import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import express from 'express';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

async function prerender() {
    console.log('Starting Pre-rendering Process...');

    // 1. Parse routes from sitemap.xml
    const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
        console.error('sitemap.xml not found. Please run build first.');
        process.exit(1);
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const urls = [];
    const regex = /<loc>\s*https:\/\/boostifyusa\.com(.*?)\s*<\/loc>/gs;
    let match;
    while ((match = regex.exec(sitemapContent)) !== null) {
        let uri = match[1].trim();
        urls.push(uri || '/');
    }

    console.log(`Found ${urls.length} routes to pre-render.`);

    // 2. Start a simple static server
    const app = express();
    app.use(express.static(DIST_DIR));

    // SPA fallback
    app.use((req, res) => {
        res.sendFile(path.join(DIST_DIR, 'index.html'));
    });

    const server = app.listen(0, async () => {
        const PORT = server.address().port;
        console.log(`Static server running on port ${PORT}`);

        // 3. Launch Puppeteer
        console.log('Launching Puppeteer...');
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Speed up rendering
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            const resourceType = req.resourceType();
            if (['image', 'stylesheet', 'font'].includes(resourceType)) {
                req.continue();
            } else {
                req.continue();
            }
        });

        // 4. Visit each route and capture HTML
        for (const url of urls) {
            if (url.includes('.xml') || url.includes('.txt')) continue; // skip non-pages

            console.log(`Pre-rendering: ${url}`);

            try {
                await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle0', timeout: 60000 });

                // Wait a moment for React to finish its initial mounting and any lazy components to load
                await new Promise(resolve => setTimeout(resolve, 2000));

                let html = await page.content();

                // Clean up injected Vite dev scripts if running in Dev mode (robust check)
                html = html.replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '');
                html = html.replace(/<script type="module">import \{ injectIntoGlobalHook \}.*?<\/script>/s, '');

                // Strip data-discover attributes injected by React Router to fix Hydration mismatch
                html = html.replace(/ data-discover="true"/g, '');

                // Determine save path
                let savePath;
                if (url === '/') {
                    savePath = path.join(DIST_DIR, 'index.html'); // Overwrite main index
                } else {
                    const routeDir = path.join(DIST_DIR, url);
                    if (!fs.existsSync(routeDir)) {
                        fs.mkdirSync(routeDir, { recursive: true });
                    }
                    savePath = path.join(routeDir, 'index.html');
                }

                fs.writeFileSync(savePath, html, 'utf8');
                console.log(`Saved: ${savePath.replace(DIST_DIR, '')}`);

            } catch (err) {
                console.error(`Error pre-rendering ${url}:`, err.message);
            }
        }

        // 5. Cleanup
        console.log('Closing browser and server...');
        await browser.close();
        server.close();
        console.log('Pre-rendering complete.');
    });
}

prerender().catch(err => {
    console.error(err);
    process.exit(1);
});
