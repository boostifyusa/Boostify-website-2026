const fs = require('fs');

const file = process.argv[2];
let content = fs.readFileSync(file, 'utf8');

const newName = `"name": "Boostify USA Web Design & SEO"`;
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

// 1. Replace name for LocalBusiness / ProfessionalService / Organization
// We explicitly just replace the string "name": "Boostify USA" -> ...
content = content.replace(/"name"\s*:\s*"Boostify USA"/g, newName);

// 2. Replace address
// Many files have the block "address": { ... }
const addressRegex = /"address"\s*:\s*\{[^}]+\}/g;
if (addressRegex.test(content)) {
    content = content.replace(addressRegex, newAddress);
} else {
    // try to insert after name if it is a local business schema (in pages that need it)
    if (file.includes('MarketingAgency') || file.includes('WebDesign')) {
         if (!content.includes('"address":')) {
              content = content.replace(newName, newName + `,\n    ${newAddress}`);
         }
    }
}

// 3. Replace hours
const hoursRegex = /"openingHoursSpecification"\s*:\s*\[[\s\S]*?\]/g;
if (hoursRegex.test(content)) {
    content = content.replace(hoursRegex, newHours);
} else {
    if (file.includes('MarketingAgency') || file.includes('WebDesign')) {
         if (!content.includes('"openingHoursSpecification":')) {
              // try to insert before "};" that precedes faqSchema, or similar
              // simplistic fallback: insert after newAddress
              content = content.replace(newAddress, newAddress + `,\n    ${newHours}`);
         }
    }
}

fs.writeFileSync(file + '.out', content, 'utf8');
console.log('Saved to ' + file + '.out');
