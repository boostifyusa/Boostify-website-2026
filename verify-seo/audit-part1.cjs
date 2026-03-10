const https = require('https');

async function fetchUrl(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, options, (res) => {
            let data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(data);
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: buffer
                });
            });
        });
        req.on('error', reject);
        req.end();
    });
}

async function testSitemap() {
    console.log('\n--- Testing sitemap.xml ---');
    try {
        const res = await fetchUrl('https://boostifyusa.com/sitemap.xml');
        console.log(`Status: ${res.statusCode}`);
        console.log(`Content-Type: ${res.headers['content-type']}`);
        console.log(`Content-Encoding: ${res.headers['content-encoding'] || 'NONE'}`);
        const isLikelyGzip = res.body[0] === 0x1f && res.body[1] === 0x8b;
        console.log(`Is Payload Gzip Binary?: ${isLikelyGzip}`);
        if (!isLikelyGzip) {
            console.log(`First 100 bytes (string): ${res.body.toString('utf8').substring(0, 100)}`);
        }
    } catch (e) {
        console.error('Error fetching sitemap:', e.message);
    }
}

async function testRobotsTxt() {
    console.log('\n--- Testing robots.txt ---');
    try {
        const res = await fetchUrl('https://boostifyusa.com/robots.txt');
        console.log(`Status: ${res.statusCode}`);
        console.log(`Body excerpt: \n${res.body.toString('utf8').substring(0, 200)}`);
    } catch (e) {
        console.error('Error fetching robots.txt:', e.message);
    }
}

async function testBrokenLinks() {
    console.log('\n--- Testing Reported 404 Links ---');
    const links = [
        'https://boostifyusa.com/service/lead-generation/',
        'https://boostifyusa.com/service/lead-generation-2/',
        'https://boostifyusa.com/service/web-design/',
        'https://boostifyusa.com/blog/'
    ];
    for (const link of links) {
        try {
            const res = await fetchUrl(link);
            console.log(`${link} -> Status: ${res.statusCode}`);
        } catch (e) {
            console.error(`Error fetching ${link}:`, e.message);
        }
    }
}

async function runAll() {
    await testSitemap();
    await testRobotsTxt();
    await testBrokenLinks();
}

runAll();
