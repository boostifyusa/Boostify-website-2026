const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        page.on('console', msg => {
            console.log(`[${msg.type()}] ${msg.text()}`);
        });

        page.on('pageerror', err => {
            console.error(`[pageerror] ${err.message}`);
        });

        console.log("Navigating to preview server...");
        await page.goto('http://localhost:4177/', { waitUntil: 'load' });
        // wait for a few seconds to let any hydration finish
        await new Promise(r => setTimeout(r, 5000));
        await browser.close();
        console.log("Done checking hydration.");
    } catch (e) {
        console.error("Script failed:", e);
        process.exit(1);
    }
})();
