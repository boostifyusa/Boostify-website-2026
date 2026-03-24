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
        path: '/clovis-marketing-agency',
        url: 'https://boostifyusa.com/clovis-marketing-agency',
        description: "Clovis's top-rated marketing agency for custom web design, local SEO, and Google Ads. Helping Clovis businesses dominate the digital landscape.",
        areaServed: ['Clovis', 'Fresno', 'Madera', 'Sanger'],
        faqs: [
            { question: 'Why should a Clovis business choose Boostify over a Fresno agency?', answer: "Because we treat Clovis as its own market — not a suburb of Fresno. We build hyper-local SEO campaigns targeting Clovis-specific keywords, optimize your Google Business Profile for Clovis searches, and run geo-targeted ads that reach your actual customers." },
            { question: 'What industries in Clovis do you specialize in?', answer: "We work with service-based businesses, medical practices, home services, restaurants, real estate professionals, and retail shops. If your customers are local, our strategies are built for you." },
            { question: 'How quickly can I expect leads from Google Ads?', answer: "Most clients see their first leads within the first week of campaign launch. We set up full conversion tracking from day one, so you'll know exactly which ads are driving calls and form submissions." },
            { question: "I already have a website. Can you just do SEO?", answer: "Yes — if your current site is technically sound, we can focus purely on SEO. We'll audit your site first (for free) and let you know if it needs improvements before we begin optimization." },
            { question: 'Do you require long-term contracts?', answer: "Never. We work month-to-month. Our clients stay because of results, not paperwork. If SEO or ads aren't delivering, you're free to walk away at any time." }
        ]
    },
    {
        path: '/visalia-marketing-agency',
        url: 'https://boostifyusa.com/visalia-marketing-agency',
        description: "Visalia's premier marketing agency offering custom web design, local SEO, and paid advertising for Tulare County businesses.",
        areaServed: ['Visalia', 'Tulare', 'Fresno', 'Hanford'],
        faqs: [
            { question: 'What kind of businesses in Visalia do you work with?', answer: 'We partner with service-based businesses, retail shops, medical practices, restaurants, and professional firms throughout Tulare County. If you serve local customers, our strategies are built for you.' },
            { question: 'How is Boostify different from other Visalia marketing companies?', answer: "We're not a template shop. Every website is hand-coded, every SEO campaign is custom-built, and every ad dollar is tracked to revenue. We operate on results, not promises — and we never lock you into a contract." },
            { question: 'Do I need a new website, or can you improve my current one?', answer: "Both. If your current site is structurally sound, we can optimize it for speed, SEO, and conversions. If it's outdated or template-based, a custom rebuild will deliver dramatically better results." },
            { question: 'How much should a Visalia business spend on digital marketing?', answer: 'It depends on your goals and competition. Most of our Tulare County clients invest $1,000–$3,000/month across SEO and ads. We always start with a free strategy call to find the right fit for your budget.' },
            { question: 'Can you manage our social media too?', answer: 'Yes. While our core strengths are SEO, Google Ads, and web design, we offer social media management as an add-on service. We focus on platforms that actually drive business — not just vanity likes.' }
        ]
    },
    {
        path: '/madera-marketing-agency',
        url: 'https://boostifyusa.com/madera-marketing-agency',
        description: "Madera's go-to marketing agency for custom web design, local SEO, and Google Ads. We help Madera County businesses grow with data-driven strategies.",
        areaServed: ['Madera', 'Fresno', 'Clovis', 'Chowchilla'],
        faqs: [
            { question: 'Is digital marketing worth it for a small Madera business?', answer: "Absolutely. In fact, smaller markets like Madera offer one of the best ROIs in digital marketing. Less competition means lower ad costs and faster SEO results. A $500-$1,500/month investment can generate significant returns in a market this size." },
            { question: 'How do you handle the Fresno vs Madera competition?', answer: "We make sure Google treats your Madera business as the local authority — not a Fresno afterthought. Through hyper-local SEO, Madera-specific content, and geo-targeted ads, we ensure Madera customers find YOU first." },
            { question: 'What should I expect in the first month?', answer: "In month one, we complete your full digital audit, build your custom strategy, launch Google Ads (if applicable), and begin SEO foundation work. You'll have a dedicated strategist and a live results dashboard from day one." },
            { question: 'Do you build websites for Madera businesses?', answer: "Yes — custom-coded, mobile-first websites built for speed and conversion. No templates, no page builders. Every site we build scores 95+ on Google PageSpeed and is designed to turn visitors into calls and leads." },
            { question: 'Can I cancel anytime?', answer: "Yes. We work month-to-month with no cancellation fees or long-term commitments. We believe in earning your business every month with measurable results." }
        ]
    },
    {
        path: '/hanford-marketing-agency',
        url: 'https://boostifyusa.com/hanford-marketing-agency',
        description: "Hanford's reliable marketing agency for custom web design, local SEO, and digital advertising. Serving Kings County businesses with data-driven strategies.",
        areaServed: ['Hanford', 'Lemoore', 'Visalia', 'Fresno'],
        faqs: [
            { question: 'Do you work with businesses in Kings County?', answer: 'Yes — Hanford is one of our priority markets. We also serve Lemoore, Avenal, Corcoran, and surrounding Kings County communities. Our strategies are tailored to the unique dynamics of this area.' },
            { question: 'How is working with Boostify different from a freelancer?', answer: "Freelancers juggle dozens of clients with limited resources. We're a full-service team with dedicated strategists, designers, and ad specialists. You get the depth of an agency with the attention of a local partner." },
            { question: 'What kind of ROI should I expect?', answer: 'Most clients see 3-5x return on their marketing investment within 6 months. Paid ads generate leads within the first week, while SEO compounds over time. We track every metric so you always know your ROI.' },
            { question: 'Is there a minimum contract length?', answer: "No. We work month-to-month. No long-term contracts, no cancellation penalties. We earn your business with results, not paperwork." },
            { question: 'Can you help my Hanford business rank above Visalia competitors?', answer: "Absolutely. Local SEO is about relevance and proximity. When someone in Hanford searches for your services, we make sure your business — not a Visalia or Fresno competitor — appears first." }
        ]
    },
    {
        path: '/merced-marketing-agency',
        url: 'https://boostifyusa.com/merced-marketing-agency',
        description: "Premier Merced marketing agency offering custom web design, local SEO, and Google Ads. Helping Merced County businesses thrive in a growing market.",
        areaServed: ['Merced', 'Atwater', 'Fresno', 'Madera'],
        faqs: [
            { question: 'Why should a Merced business invest in digital marketing?', answer: "Merced is booming — UC Merced's growth is bringing thousands of new residents and businesses. The companies that establish a strong digital presence now will dominate this market for years. Early movers win." },
            { question: 'Do you specialize in Merced or serve it from far away?', answer: "Our office is in Fresno, just an hour from Merced. We serve Merced County as a core market — not an afterthought. We know the area, the competition, and the customers. We're available for in-person meetings anytime." },
            { question: 'What makes your web design different from cheap website builders?', answer: "DIY builders give you generic templates that look like everyone else. We hand-code every site for speed, SEO, and conversion. Our sites consistently load in under 2 seconds, score 95+ on Google PageSpeed, and generate 3-5x more leads." },
            { question: 'How fast can you get my Google Ads running?', answer: "We can typically launch a campaign within 5-7 business days of onboarding. That includes keyword research, ad copywriting, landing page setup, and conversion tracking. You'll see leads within the first week of launch." },
            { question: 'What if I already have a website that I like?', answer: "Great — we can work with it. We'll audit your current site for speed, SEO, and conversion opportunities, then optimize what's there. Not every client needs a full redesign; sometimes strategic improvements deliver the best ROI." }
        ]
    },
    {
        path: '/tulare-marketing-agency',
        url: 'https://boostifyusa.com/tulare-marketing-agency',
        description: "Tulare's results-driven marketing agency. Custom web design, local SEO, and Google Ads built for Tulare County businesses.",
        areaServed: ['Tulare', 'Visalia', 'Fresno', 'Hanford'],
        faqs: [
            { question: 'Does Boostify work with businesses in Tulare specifically?', answer: "Yes — Tulare is a core market for us. We've built campaigns for Tulare County businesses in agriculture, retail, healthcare, and professional services. We understand the local economy and what drives customers here." },
            { question: 'What sets Boostify apart from other agencies in the Valley?', answer: "Three things: we never use templates (every site is custom-coded), we never require contracts (month-to-month only), and we track every lead back to its source (so you know exactly what's working). Most agencies can't offer all three." },
            { question: 'How do you handle businesses that serve multiple Valley cities?', answer: "Multi-location SEO is one of our specialties. We build city-specific landing pages, optimize separate Google Business Profiles where applicable, and create ad campaigns with geo-targeting for each area you serve." },
            { question: 'What should I expect in the first 30 days?', answer: "In month one, we audit your current presence, build your strategy, launch your Google Ads (if applicable), and begin SEO foundation work. You'll have a dedicated strategist, a live reporting dashboard, and your first leads from paid campaigns within weeks." },
            { question: 'Is digital marketing worth it for a small Tulare business?', answer: "Absolutely — in fact, it's where small businesses have the biggest advantage. Local SEO levels the playing field against bigger competitors. A $1,000/month investment in targeted digital marketing can generate $5,000-$10,000 in new revenue." }
        ]
    },
    {
        path: '/sanger-marketing-agency',
        url: 'https://boostifyusa.com/sanger-marketing-agency',
        description: "Sanger's dedicated marketing agency for custom web design, local SEO, and Google Ads. Helping East Valley businesses compete and win online.",
        areaServed: ['Sanger', 'Fresno', 'Reedley', 'Clovis'],
        faqs: [
            { question: 'Why does a Sanger business need a marketing agency?', answer: "Sanger may be a smaller market, but your customers are searching online just like everyone else. In fact, smaller markets offer a huge advantage — less competition means faster results and lower advertising costs. A focused digital strategy can help you dominate your local area quickly." },
            { question: 'How close is Boostify to Sanger?', answer: "We're based in Fresno — just 15 minutes from Sanger. We serve Sanger as a priority market, not a distant afterthought. We're always available for in-person meetings and local strategy sessions." },
            { question: 'What kind of budget do I need to get started?', answer: 'Sanger businesses can see meaningful results starting at $500-$1,500/month depending on services. Because competition is lower in smaller markets, your marketing dollars go further. We always recommend starting with a free strategy call to find the right fit.' },
            { question: 'Will you build my website or just do marketing?', answer: "Both. We offer complete digital solutions — from custom website design and development to ongoing SEO and Google Ads management. Most clients start with a website and SEO, then add paid advertising once their foundation is solid." },
            { question: 'How do you track results for my Sanger business?', answer: "Every client gets access to a live reporting dashboard showing rankings, traffic, leads, calls, and revenue attribution. We track every phone call and form submission back to its source — so you always know exactly what's working." }
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
