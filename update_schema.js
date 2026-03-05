const fs = require('fs');
const path = require('path');

const newName = `"name": "Boostify USA Web Design & SEO"`;

// Notice the correct indentation based on typical Prettier/ESLint configs
const newAddress = `"address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    }`;

const newHours = `"openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" }
    ]`;

const srcDir = path.join(__dirname, 'src', 'pages');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Replace ALL instances of "name": "Boostify USA" -> "name": "Boostify USA Web Design & SEO"
    // (This applies to LocalBusiness, ProfessionalService, Article publisher, Organization, etc.)
    content = content.replace(/"name"\s*:\s*"Boostify USA"/g, newName);

    // 2. Address Update
    // Look for existing address block and replace it
    const addressRegex = /"address"\s*:\s*\{\s*"@type"\s*:\s*"PostalAddress"[\s\S]*?"addressCountry"\s*:\s*"US"\s*\}/g;

    // Some files might have it all in one line:
    const singleLineAddressRegex = /"address": \{ "@type": "PostalAddress", "streetAddress": "[^"]+", "addressLocality": "[^"]+", "addressRegion": "[^"]+", "postalCode": "[^"]+", "addressCountry": "[^"]+" \}/g;

    if (addressRegex.test(content)) {
        content = content.replace(addressRegex, newAddress);
    } else if (singleLineAddressRegex.test(content)) {
        content = content.replace(singleLineAddressRegex, `"address": { "@type": "PostalAddress", "streetAddress": "6362 N Figarden Dr. #118", "addressLocality": "Fresno", "addressRegion": "CA", "postalCode": "93722", "addressCountry": "US" }`);
    }

    // 3. Hours Update
    // Look for existing openingHoursSpecification block and replace it
    const hoursRegex = /"openingHoursSpecification"\s*:\s*\[[\s\S]*?\]/g;
    if (hoursRegex.test(content)) {
        content = content.replace(hoursRegex, newHours);
    }

    // Check if we need to insert address or hours where they are missing but should exist
    // Files that represent a local business listing should have them:
    const isLocalBusinessPage = filePath.includes('MarketingAgency') ||
        filePath.includes('WebDesign') ||
        filePath.includes('HomePage') ||
        filePath.includes('ContactPage');

    // For single line files like SangerMarketingAgencyPage, let's inject them carefully if they don't exist
    if (isLocalBusinessPage) {
        if (!content.includes('"address"')) {
            content = content.replace(newName, newName + `, "address": { "@type": "PostalAddress", "streetAddress": "6362 N Figarden Dr. #118", "addressLocality": "Fresno", "addressRegion": "CA", "postalCode": "93722", "addressCountry": "US" }`);
        }
        if (!content.includes('"openingHoursSpecification"')) {
            // inject at the end of the schema object before it closes
            content = content.replace(/("priceRange": "\$\$"(?:,\s*"telephone": "[^"]+")?(?:,\s*"email": "[^"]+")?(?:,\s*"logo": "[^"]+")?)(?=\s*\})/, `$1, "openingHoursSpecification": [ { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" } ]`);
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
