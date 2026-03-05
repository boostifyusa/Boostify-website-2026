const fs = require('fs');
const path = require('path');

const newHours = `"openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" }
    ]`;

const srcDir = path.join(__dirname, 'src', 'pages');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // The broken snippet caused by lazy matching `]` where it grabbed the `dayOfWeek` array's closing bracket instead.
    // It left trailing gibberish. We can use regex to match from the start of the broken hours up to the ACTUAL closing `]` of the outer array.
    // We'll replace it with the clean newHours string.

    // It looks like:
    // "openingHoursSpecification": [ ...newHours array content... ], "opens": "09:00", "closes": "19:00" }, ... \n    ]

    const brokenHoursRegex = /"openingHoursSpecification": \[\s*\{\s*"@type":\s*"OpeningHoursSpecification"[^\]]*\]\s*,\s*"opens"[^\]]*\]/g;

    // Wait, let's use a simpler and safer multi-line replace.
    // We find "openingHoursSpecification": [ ... ], "opens": ... down to the next ]
    content = content.replace(/"openingHoursSpecification": \[\s*\{\s*"@type":\s*"OpeningHoursSpecification"[^}]*\}\s*\],\s*"opens":\s*"[^"]+",\s*"closes":\s*"[^"]+"\s*\},\s*\{\s*"@type":\s*"OpeningHoursSpecification"[^}]*\}\s*,\s*\{\s*"@type":\s*"OpeningHoursSpecification"[^}]*\}\s*\]/g, newHours);

    // Another potential broken form for 1-line schemas:
    content = content.replace(/"openingHoursSpecification": \[\s*\{\s*"@type":\s*"OpeningHoursSpecification"[^\}]+\}\s*\],\s*"opens":\s*"[^"]+",\s*"closes":\s*"[^"]+"\s*\}\s*,\s*\{\s*"@type":\s*"OpeningHoursSpecification"[^\}]+\}\s*,\s*\{\s*"@type":\s*"OpeningHoursSpecification"[^\}]+\}\s*\]/g, newHours);

    // If the above don't catch it, let's just do a greedy replacement from "openingHoursSpecification" until the next `};` or `<script` boundary ?
    // Safer:
    const re3 = /"openingHoursSpecification"\s*:\s*\[[\s\S]*?(?="priceRange"|"telephone"|"contactPoint"|"email"|"logo"|};\s*const faqSchema|};\s*const|};\s*export|<\/script>|\}\s*\})/g;
    // We only want to replace if it contains the broken `, "opens":` pattern
    if (content.includes(`], "opens":`)) {
        content = content.replace(/"openingHoursSpecification"\s*:\s*\[[\s\S]*?\],\s*"opens":[\s\S]*?\]/g, newHours);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed: ${path.basename(filePath)}`);
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
