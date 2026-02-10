
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.resolve(__dirname, '../dist/sitemap.xml');

try {
    if (fs.existsSync(sitemapPath)) {
        let content = fs.readFileSync(sitemapPath, 'utf8');

        // Check if XSL is already present
        if (!content.includes('xml-stylesheet')) {
            console.log('Injecting XSL stylesheet into sitemap.xml...');
            // Inject after XML declaration
            content = content.replace(
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'
            );
            fs.writeFileSync(sitemapPath, content);
            console.log('Successfully injected sitemap.xsl link.');
        } else {
            console.log('sitemap.xml already contains XSL link.');
        }
    } else {
        console.error('sitemap.xml not found at:', sitemapPath);
        process.exit(1);
    }
} catch (error) {
    console.error('Error injecting sitemap XSL:', error);
    process.exit(1);
}
