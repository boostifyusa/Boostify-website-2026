const fs = require('fs');
const path = require('path');

const newName = `"name": "Boostify USA Web Design & SEO"`;

// Address to replace or inject
const newAddress = `"address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    }`;

// 24/7 Hours string
const newHours = `"openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" }
    ]`;

const srcDir = path.join(__dirname, 'src', 'pages');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Replace name
    content = content.replace(/"name"\s*:\s*"Boostify USA"/g, newName);

    // 2. Address Update
    const addressRegex = /"address"\s*:\s*\{\s*"@type"\s*:\s*"PostalAddress"[\s\S]*?"addressCountry"\s*:\s*"US"\s*\}/g;
    const singleLineAddressRegex = /"address":\s+\{ "@type": "PostalAddress", "streetAddress": "[^"]+", "addressLocality": "[^"]+", "addressRegion": "[^"]+", "postalCode": "[^"]+", "addressCountry": "[^"]+" \}/g;

    if (addressRegex.test(content)) {
        content = content.replace(addressRegex, newAddress);
    } else if (singleLineAddressRegex.test(content)) {
        content = content.replace(singleLineAddressRegex, `"address": { "@type": "PostalAddress", "streetAddress": "6362 N Figarden Dr. #118", "addressLocality": "Fresno", "addressRegion": "CA", "postalCode": "93722", "addressCountry": "US" }`);
    }

    // 3. Hours Update
    const hoursRegex = /"openingHoursSpecification"\s*:\s*\[[\s\S]*?\]/g;
    if (hoursRegex.test(content)) {
        content = content.replace(hoursRegex, newHours);
    }

    // Insert address / hours if they are entirely missing
    const isLocalBusinessPage = filePath.includes('MarketingAgency') ||
        filePath.includes('WebDesign') ||
        filePath.includes('HomePage') ||
        filePath.includes('ContactPage');

    if (isLocalBusinessPage) {
        // If address still not present after regex replacement, means it didn't exist
        if (!content.includes('"address"')) {
            content = content.replace(/(?<=("name": "Boostify USA Web Design & SEO",\s*"url"[^,]*,?\s*))/g, (match) => {
                return `\n    ${newAddress},\n    `;
            });
            // fallback if it didn't get inserted (some files put "name" then "description")
            if (!content.includes('"address"')) {
                content = content.replace(/"name": "Boostify USA Web Design & SEO",/g, `"name": "Boostify USA Web Design & SEO",\n    ${newAddress},`);
            }
        }

        // Ensure "openingHoursSpecification" is there
        if (!content.includes('"openingHoursSpecification"')) {
            // Find end of schema object. Best heuristic: before `};` or `faqSchema` near priceRange/email
            content = content.replace(/("email":\s*"[^"]+")(?=\s*?(?:,\s*"logo":\s*"[^"]+")?\s*\})/g, `$1,\n    ${newHours}`);
            if (!content.includes('"openingHoursSpecification"')) {
                // another fallback
                content = content.replace(/("logo":\s*"[^"]+")(?=\s*\})/g, `$1,\n    ${newHours}`);
            }
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${path.basename(filePath)}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

walk(srcDir);
