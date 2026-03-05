const fs = require('fs');
const files = [
    'src/pages/ClovisMarketingAgencyPage.tsx',
    'src/pages/HanfordMarketingAgencyPage.tsx',
    'src/pages/MaderaMarketingAgencyPage.tsx',
    'src/pages/MercedMarketingAgencyPage.tsx',
    'src/pages/SangerMarketingAgencyPage.tsx',
    'src/pages/TulareMarketingAgencyPage.tsx',
    'src/pages/VisaliaMarketingAgencyPage.tsx',
    'src/pages/WebDesignFresnoPage.tsx',
    'src/pages/WebDesignModestoPage.tsx'
];

for (const file of files) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(`    ], "opens": "09:00", "closes": "19:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "17:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "12:00" }
    ]
};`, `    ]
};`);
        fs.writeFileSync(file, content);
        console.log(`Fixed ${file}`);
    } catch (e) {
        console.error(`Error fixing ${file}: ${e.message}`);
    }
}
