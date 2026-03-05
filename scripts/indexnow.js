import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'; // using node-fetch as installed in package.json

const API_KEY = 'bf8a1e2a1b9f4a1c9a8b7c6d5e4f3a2b';
const HOST = 'boostifyusa.com';

const sitemapPath = path.resolve(process.cwd(), 'dist', 'sitemap.xml');

async function submitIndexNow() {
    try {
        if (!fs.existsSync(sitemapPath)) {
            console.error('sitemap.xml not found! Make sure you build the project first.');
            process.exit(1);
        }

        const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
        const urlRegex = /<loc>\s*(https?:\/\/[^\s]+)\s*<\/loc>/g;
        let match;
        const urlList = [];

        while ((match = urlRegex.exec(sitemapContent)) !== null) {
            urlList.push(match[1]);
        }

        if (urlList.length === 0) {
            console.error('No URLs found in sitemap.xml.');
            process.exit(1);
        }

        const payload = {
            host: HOST,
            key: API_KEY,
            keyLocation: `https://${HOST}/${API_KEY}.txt`,
            urlList: urlList
        };

        console.log(`Submitting ${urlList.length} URLs to IndexNow API for verification...`);

        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Host': 'api.indexnow.org'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok || response.status === 200 || response.status === 202) {
            console.log('✅ IndexNow submission successful!');
        } else {
            console.error('❌ IndexNow submission failed:', response.status, response.statusText);
            const text = await response.text();
            console.error('Details:', text);
        }
    } catch (err) {
        console.error('Error submitting to IndexNow:', err);
    }
}

submitIndexNow();
