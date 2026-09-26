/**
 * SSR Schema Data for City Marketing Pages
 * 
 * These JSON-LD schemas are injected into the HTML <head> at the server level
 * so that crawlers see them in the initial response (no JS execution needed).
 * 
 * Each entry: path → [advertiserSchema, faqSchema]
 */

const BASE_ADDRESS = {
    "@type": "PostalAddress",
    "streetAddress": "6362 N Figarden Dr. #118",
    "addressLocality": "Fresno",
    "addressRegion": "CA",
    "postalCode": "93722",
    "addressCountry": "US"
};

const BASE_GEO = {
    "@type": "GeoCoordinates",
    "latitude": 36.8250248,
    "longitude": -119.8684005
};

const BASE_CATALOG = {
    "@type": "OfferCatalog",
    "name": "Digital Marketing Services",
    "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads Management" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Design" } }
    ]
};

function makeAdvertiserSchema(city, url, description, areaServed) {
    return {
        "@context": "https://schema.org",
        "@type": "AdvertisingAgency",
        "name": "Boostify USA",
        "url": url,
        "description": description,
        "address": BASE_ADDRESS,
        "geo": BASE_GEO,
        "areaServed": areaServed.map(name => ({ "@type": "City", "name": name })),
        "hasOfferCatalog": BASE_CATALOG,
        "priceRange": "$$"
    };
}

function makeFaqSchema(faqs) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
    };
}

// ─── City Data ───────────────────────────────────────────────────────────────

const cityData = [
    {
        path: '/madera-marketing-agency',
        url: 'https://boostifyusa.com/madera-marketing-agency',
        description: "Web design and local SEO for Madera businesses from a Fresno office about 25 minutes south on 99. Template sites are $649 and custom builds start at $1,995.",
        areaServed: ['Madera', 'Fresno', 'Clovis', 'Chowchilla'],
        faqs: [
            { question: "Is Boostify based in Madera?", answer: "The office is in Fresno at 6362 N Figarden Dr, Suite 118, about 25 minutes south of Madera on 99. We meet Madera clients at their shop for the first meeting, and the rest of the build happens over a screen share." },
            { question: "What does a website cost in Madera?", answer: "A template build is $649, paid once, and a custom build starts at $1,995. Hosting and the domain run roughly $20 to $30 a month, which you can pay directly so the accounts stay in your name." },
            { question: "Fresno businesses show up when people in Madera search. Can I get ahead of them?", answer: "In the map results distance works for you, because Google favors listings close to the person searching. What usually holds a Madera business back is a thin Business Profile or a site that never says Madera, and both are fixable." },
            { question: "How long does SEO take for a Madera business?", answer: "No agency controls Google, so any date is a guess. A complete profile and a steady flow of reviews tend to move first, and new pages usually need a few weeks after Google recrawls them before rankings settle." },
            { question: "Can I update the site myself?", answer: "If you want to change your own hours, photos and specials, we build it in WordPress and show you how. If it rarely changes, we hand-code it, which keeps it faster, and small edits are part of the $99 a month care plan." },
            { question: "Should I start with ads or with the website?", answer: "Start with the website and the Google profile. Ads send people to the same page, and a page that doesn't turn visitors into calls wastes the ad spend, which for most local service businesses runs $1,000 to $2,500 a month." }
        ]
    },
    {
        path: '/hanford-marketing-agency',
        url: 'https://boostifyusa.com/hanford-marketing-agency',
        description: "Hanford SEO and web design for Kings County businesses from a Fresno office. Local SEO, custom websites, and Google Ads.",
        areaServed: ['Hanford', 'Lemoore', 'Visalia', 'Fresno'],
        faqs: [
            { question: "Do you work with businesses in Kings County outside Hanford?", answer: "Lemoore, Armona and Corcoran are part of the same trip, and one site can have a page for each town you actually serve. The office is at 6362 N Figarden Dr, Suite 118, in Fresno, about 45 minutes away." },
            { question: "What does SEO cost for a Hanford business?", answer: "Local SEO is $595 a month and Lite is $249 a month, both month to month, and you can stop whenever it stops bringing in calls." },
            { question: "Can my Hanford business rank above Visalia competitors?", answer: "For searches made in Hanford, distance already works in your favor, because Google weighs how close a business is to the person searching. For searches made in Visalia it is harder, and a page written for Visalia customers is the usual way in." },
            { question: "What should I expect in the first month?", answer: "The first weeks go to the Google Business Profile, your listings and the pages that are already closest to ranking. Rankings usually take weeks to move after Google recrawls a change, so judge the work on calls over a few months." },
            { question: "Is there a contract?", answer: "There is no long-term contract on SEO, ads or the care plan. Websites are paid per build, $649 for a template and $1,995 and up for custom." },
            { question: "What ROI should I expect?", answer: "It depends on your service, your area and your budget, so we don't promise a multiple. Ads can bring calls in the first week, and SEO builds over months and keeps working after you stop paying for clicks." }
        ]
    },
    {
        path: '/merced-marketing-agency',
        url: 'https://boostifyusa.com/merced-marketing-agency',
        description: "Merced SEO and web design from a Fresno office an hour away. Local SEO, custom websites, and Google Ads for Merced County businesses.",
        areaServed: ['Merced', 'Atwater', 'Fresno', 'Madera'],
        faqs: [
            { question: "Is an SEO company in Fresno a good fit for a Merced business?", answer: "The office is at 6362 N Figarden Dr, Suite 118, about an hour south on 99, and we meet Merced clients in person for the first meeting. Google ranks you on your profile, your reviews and your pages, and none of that depends on where your agency sits." },
            { question: "What does Merced SEO cost?", answer: "Local SEO is $595 a month and Lite is $249 a month, both month to month. Lite bundles hosting, maintenance and baseline optimization, and it fits a business that mostly needs to be found for its own name and one or two services." },
            { question: "What does a website cost in Merced?", answer: "A template build is $649, paid once, and a custom build starts at $1,995 and takes 3 to 5 weeks. Hosting and the domain run roughly $20 to $30 a month, and you can pay those directly." },
            { question: "I already have a website I like. Do I need a new one?", answer: "It depends on two things. If it loads fast on a phone and each service has its own page, SEO can build on what you have. If it takes five seconds to load or the whole business sits on one page, fixing it usually costs close to a rebuild." },
            { question: "How fast can Google Ads bring calls in Merced?", answer: "Ads can start showing the day the campaign is approved, so the first calls can come within days. Whether they keep coming depends on the landing page, which is why the site gets looked at before your ad budget gets spent." },
            { question: "Why don't I show up on Google Maps in Merced?", answer: "The usual reasons are a category that is too broad, a service area that leaves Merced out, or a few reviews against competitors with dozens. Check those before paying anyone, including us." }
        ]
    },
    {
        path: '/tulare-marketing-agency',
        url: 'https://boostifyusa.com/tulare-marketing-agency',
        description: "Web design and local SEO for Tulare businesses from a Fresno office about an hour up 99. Template sites are $649 and custom builds start at $1,995.",
        areaServed: ['Tulare', 'Visalia', 'Fresno', 'Hanford'],
        faqs: [
            { question: "Is an hour too far for a web designer to work with my Tulare business?", answer: "Most of the build happens over a screen share, so the drive only matters for the first meeting and the photos. We come to Tulare for both, because pictures of your actual trucks, crew and shop do more for the site than anything we could write. The office is at 6362 N Figarden Dr, Suite 118, in Fresno." },
            { question: "What does a website cost in Tulare?", answer: "A template build is $649, paid once. A custom build starts at $1,995 and depends on how many pages have to be built from scratch rather than assembled. Hosting and the domain run roughly $20 to $30 a month, and you can pay those to the provider directly." },
            { question: "I work in Tulare and Visalia. Do I need two websites?", answer: "One site is enough, with a page for each town that is written for that town and lists the work you actually do there. Two separate sites split your reviews and your links in half." },
            { question: "Why doesn't my business show up on Google Maps in Tulare?", answer: "Start with your Business Profile. A category that is too broad, a hidden address with no service area, or a handful of reviews against competitors with dozens are the usual reasons. The website helps once the profile is right, because Google checks that the two match." },
            { question: "Do I have to sign a contract for SEO?", answer: "Local SEO is $595 a month and Lite is $249 a month, and both are month to month. If it isn't producing calls, you can stop, and the pages and the profile stay yours." },
            { question: "Can you fix my current site instead of rebuilding it?", answer: "It depends on what's under it. If it is a WordPress site with a handful of plugins, a cleanup and faster hosting can be enough. If it runs thirty or forty plugins on a theme nobody has updated in years, the repair usually costs more than a rebuild, because every fix has to be retested against everything else." }
        ]
    },
    {
        path: '/sanger-marketing-agency',
        url: 'https://boostifyusa.com/sanger-marketing-agency',
        description: "Web design and local SEO for Sanger businesses from a Fresno office about half an hour away. Template sites are $649 and custom builds start at $1,995.",
        areaServed: ['Sanger', 'Fresno', 'Reedley', 'Clovis'],
        faqs: [
            { question: "Is a Fresno web designer close enough for my Sanger business?", answer: "The office is at 6362 N Figarden Dr, Suite 118, about half an hour from Sanger, and we would rather meet at your place than ours. The drive doesn't change the build. What Google looks at is the address and service area on your Business Profile and whether your site names Sanger, and we set up both." },
            { question: "What does a website cost in Sanger?", answer: "The same as it costs in Fresno. A template build is $649, paid once, and a custom build starts at $1,995 and takes 3 to 5 weeks. Hosting and the domain run roughly $20 to $30 a month, and you can pay those directly." },
            { question: "Is the $649 template enough for a small Sanger shop?", answer: "If most of your work comes from referrals and people mostly need your number, your hours and a few photos, it is. Custom makes sense when you want a page for each service or each East Valley town you work in, since each of those pages can rank on its own." },
            { question: "Can a Sanger business pick up customers searching from Fresno?", answer: "In the map results it is hard, because Google weighs how close a business is to the person searching. In the regular results a page that names the service and the Fresno area can rank, and that is the usual route for East Valley businesses." },
            { question: "Who owns the domain and my Google listing when we're done?", answer: "You do. The domain is registered in your name, or we work as a delegate inside your own GoDaddy account, and you stay the primary owner of the Business Profile. If you leave, the hosting account and the code transfer at no charge." },
            { question: "How long until my Sanger business shows up on Google Maps?", answer: "No agency controls Google, so a promised date is a guess. A complete profile with real photos and a steady flow of reviews usually moves first, and pages that name Sanger help Google match you to searches made there." }
        ]
    }
];

// ─── Build the Map ───────────────────────────────────────────────────────────

const ssrSchemas = new Map();

for (const city of cityData) {
    const advertiserSchema = makeAdvertiserSchema(
        city.path,
        city.url,
        city.description,
        city.areaServed
    );
    const faqSchema = makeFaqSchema(city.faqs);
    ssrSchemas.set(city.path, [advertiserSchema, faqSchema]);
}

export default ssrSchemas;
