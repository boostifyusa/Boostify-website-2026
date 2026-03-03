const puppeteer = require('puppeteer');

(async () => {
    const urls = [
        '/', '/about', '/services', '/contact', '/web-design', '/local-seo',
        '/local-marketing', '/maintenance', '/work', '/privacy', '/terms',
        '/sms', '/app-development', '/ai-automation', '/seo-audit',
        '/fresno-marketing-agency', '/modesto-web-design'
    ];

    console.log("Starting hydration test against Dev server at http://localhost:5173");

    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    let totalErrors = 0;

    // Listen for hydration error logs specifically
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('Minified React error') || text.includes('Warning: Text content did not match') || text.includes('Warning: Expected server HTML to contain') || text.includes('Warning: React does not recognize')) {
            console.error(`[Hydration Error on ${page.url()}] ${text}`);
            totalErrors++;
        }
    });

    page.on('pageerror', err => {
        if (err.message.includes('Minified React error #418') || err.message.includes('Minified React error #423')) {
            console.error(`[Page Error on ${page.url()}] ${err.message}`);
            totalErrors++;
        }
    });

    for (let url of urls) {
        console.log(`Checking ${url}...`);
        await page.goto(`http://localhost:5173${url}`, { waitUntil: 'load' });
        // wait to let React hydrate
        await new Promise(r => setTimeout(r, 2000));
    }

    await browser.close();

    if (totalErrors > 0) {
        console.log(`\nTest Finished: Found ${totalErrors} hydration errors across the tested routes.`);
        process.exit(1);
    } else {
        console.log("\nTest Finished: ZERO hydration errors found.");
        process.exit(0);
    }
})();
