const puppeteer = require('puppeteer');

(async () => {
    console.log("Starting quick dev server hydration test...");
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    let hydrationErrorFound = false;
    
    // Capture page errors
    page.on('pageerror', error => {
        if (error.message.includes('Minified React error #418') || error.message.includes('Minified React error #423') || error.message.includes('Hydration failed')) {
            console.log('\n[Hydration Error Found]', error.message);
            hydrationErrorFound = true;
        }
    });

    page.on('console', msg => {
        if (msg.type() === 'error' && (msg.text().includes('Minified React error') || msg.text().includes('Hydration failed'))) {
            console.log('\n[Console Error Found]', msg.text());
            hydrationErrorFound = true;
        }
    });

    console.log(`Checking /...`);
    await page.goto(`http://localhost:5173/`, { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 2000));

    await browser.close();

    if (hydrationErrorFound) {
        console.log("\n❌ Hydration errors were found during testing!");
        process.exit(1);
    } else {
        console.log("\n✅ Test Finished: ZERO hydration errors found.");
        process.exit(0);
    }
})();
