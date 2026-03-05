import puppeteer from 'puppeteer';

const SITE_URL = 'https://boostifyusa.com';
const URLS_TO_TEST = [
    '/', // Home
    '/fresno-marketing-agency', // Agency local page (random logic)
    '/web-design', // Service page
];

async function runAudit() {
    console.log('🚀 Starting Deep Live SEO Audit for BoostifyUSA...\n');

    const browser = await puppeteer.launch({ headless: 'new' });

    for (const urlPath of URLS_TO_TEST) {
        const fullUrl = `${SITE_URL}${urlPath}`;
        console.log(`\n🔍 Auditing: ${fullUrl}`);
        const page = await browser.newPage();

        // Capture console errors to catch Hydration Mismatches
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                const text = msg.text() || '';
                // If it looks like a React hydration error
                if (text.includes('Minified React error #418') || text.includes('Minified React error #423') || text.includes('hydration') || text.includes('did not match')) {
                    consoleErrors.push(text);
                }
            }
        });

        try {
            // 1. Check HTTP Status
            const response = await page.goto(fullUrl, { waitUntil: 'networkidle0' });
            const status = response.status();
            console.log(`   [Status] HTTP ${status}`);

            // 2. Wait a bit for React to hydrate
            await new Promise(r => setTimeout(r, 2000));

            if (consoleErrors.length > 0) {
                console.log(`   ❌ [Hydration] Mismatch errors found! (${consoleErrors.length} errors)`);
            } else {
                console.log(`   ✅ [Hydration] No React mismatches detected.`);
            }

            // 3. Check LCP and Hero Image properties
            const heroImageMetrics = await page.evaluate(() => {
                // Find largest image in the viewport (rough heuristic for LCP)
                const images = Array.from(document.querySelectorAll('img'));
                let biggestImg = null;
                let maxArea = 0;

                for (const img of images) {
                    const rect = img.getBoundingClientRect();
                    // if in viewport roughly
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const area = rect.width * rect.height;
                        if (area > maxArea) {
                            maxArea = area;
                            biggestImg = img;
                        }
                    }
                }

                if (!biggestImg) return null;

                return {
                    src: biggestImg.src,
                    fetchPriority: biggestImg.getAttribute('fetchpriority'),
                    loading: biggestImg.getAttribute('loading'),
                    isLazy: biggestImg.getAttribute('loading') === 'lazy',
                };
            });

            if (heroImageMetrics) {
                console.log(`   [LCP] Largest image source: ${heroImageMetrics.src}`);
                if (heroImageMetrics.fetchPriority === 'high') {
                    console.log(`   ✅ [LCP] Hero image has fetchpriority="high"`);
                } else {
                    console.log(`   ⚠️ [LCP] Hero image is MISSING fetchpriority="high". Found: ${heroImageMetrics.fetchPriority}`);
                }

                if (heroImageMetrics.isLazy) {
                    console.log(`   ❌ [LCP] Hero image is lazy-loaded! This is bad for LCP.`);
                }
            } else {
                console.log(`   ⚠️ [LCP] No prominent hero image detected.`);
            }

            // 4. Check Semantic HTML + JSON-LD
            const semanticData = await page.evaluate(() => {
                const main = document.querySelector('main');
                const h1 = document.querySelectorAll('h1').length;
                const ldjsons = document.querySelectorAll('script[type="application/ld+json"]').length;

                return {
                    hasMain: !!main,
                    h1Count: h1,
                    ldjsons: ldjsons
                };
            });
            console.log(`   [Semantics] <main> present: ${semanticData.hasMain}, <h1> count: ${semanticData.h1Count}, JSON-LD scripts: ${semanticData.ldjsons}`);

        } catch (e) {
            console.log(`   ❌ Error loading page: ${e.message}`);
        }

        await page.close();
    }

    // 5. Check robots.txt
    console.log(`\n🔍 Auditing: robots.txt`);
    try {
        const robotsPage = await browser.newPage();
        const rbResp = await robotsPage.goto(`${SITE_URL}/robots.txt`);
        const rbText = await rbResp.text();
        if (rbText.includes('Google-Extended')) {
            console.log(`   ℹ️ [AI Bots] Google-Extended is mentioned in robots.txt.`);
        } else {
            console.log(`   ℹ️ [AI Bots] Google-Extended NOT explicitly mentioned.`);
        }
    } catch (e) { }

    await browser.close();
    console.log('\n🏁 Audit tools finished.');
}

runAudit();
