const SITE_URL = 'https://boostifyusa.com';

async function testTrailingSlash() {
    console.log('\n--- 1. Testing Trailing Slash Redirect ---');
    try {
        const res = await fetch(`${SITE_URL}/local-seo/`, { redirect: 'manual' });
        if (res.status === 301 || res.status === 308) {
            console.log(`✅ Success: /local-seo/ returned ${res.status} redirecting to ${res.headers.get('location')}`);
        } else {
            console.error(`❌ Failed: /local-seo/ returned ${res.status} instead of a redirect.`);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

async function testSoft404() {
    console.log('\n--- 2. Testing Soft 404s ---');
    try {
        const res = await fetch(`${SITE_URL}/this-page-definitely-does-not-exist-123`);
        if (res.status === 404) {
            console.log(`✅ Success: Fake URL returned 404 Not Found`);
        } else {
            console.error(`❌ Failed: Fake URL returned ${res.status}`);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

async function testHreflangAndLang() {
    console.log('\n--- 3. Testing HTML Lang & Hreflang Tags (Googlebot Simulation) ---');
    try {
        // Test as Googlebot
        const res = await fetch(`${SITE_URL}/web-design`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }
        });
        const html = await res.text();
        const hasLang = html.includes('lang="en-US"');
        const hasHreflang = html.includes('hreflang="en-US"');

        if (hasLang && hasHreflang) {
            console.log(`✅ Success: Found correct HTML lang and hreflang attributes`);
        } else {
            console.error(`❌ Failed: Missing lang attributes. hasLang: ${hasLang}, hasHreflang: ${hasHreflang}`);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

async function testFetchPriority() {
    console.log('\n--- 4. Testing Hero Image fetchPriority ---');
    try {
        const res = await fetch(`${SITE_URL}/`);
        const html = await res.text();
        // It could be fetchpriority or fetchPriority in HTML when prerendered
        if (html.toLowerCase().includes('fetchpriority="high"')) {
            console.log(`✅ Success: Found fetchPriority="high" on Hero images`);
        } else {
            console.error(`❌ Failed: Could not find fetchPriority="high"`);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

async function testSitemapAndRobots() {
    console.log('\n--- 5. Testing Sitemap & Robots.txt ---');
    try {
        const robotsRes = await fetch(`${SITE_URL}/robots.txt`);
        const robotsText = await robotsRes.text();
        if (robotsRes.status === 200 && robotsText.includes('User-agent: *')) {
            console.log(`✅ Success: robots.txt is live and accessible.`);
        } else {
            console.error(`❌ Failed: robots.txt returned ${robotsRes.status}`);
        }

        const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
        const sitemapText = await sitemapRes.text();
        if (sitemapRes.status === 200 && sitemapText.includes('<urlset')) {
            console.log(`✅ Success: sitemap.xml is live and contains URLs.`);
        } else {
            console.error(`❌ Failed: sitemap.xml returned ${sitemapRes.status}`);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

async function runTests() {
    console.log(`Starting Live SEO Audit against ${SITE_URL} ...\n`);
    await testTrailingSlash();
    await testSoft404();
    await testHreflangAndLang();
    await testFetchPriority();
    await testSitemapAndRobots();
    console.log('\nLive audit complete.');
}

runTests();
