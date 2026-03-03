const puppeteer = require('puppeteer');
const sitemapUrls = require('./scripts/sitemap-urls.js'); // Assuming we can get URLs

(async () => {
    const urls = ['/', '/about', '/services', '/contact', '/web-design', '/local-seo'];
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    let hasError = false;

    page.on('pageerror', err => {
        console.error(`[pageerror] ${err.message}`);
        hasError = true;
    });

    for(let url of urls) {
        console.log(`Testing http://localhost:5173${url}`);
        await page.goto(`http://localhost:5173${url}`, { waitUntil: 'load' });
        await new Promise(r => setTimeout(r, 2000));
    }
    
    await browser.close();
    if(hasError) process.exit(1);
})();
