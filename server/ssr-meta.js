/**
 * SSR Meta Tags for All Pages
 * 
 * These <title>, <meta description>, and <link canonical> tags are injected
 * into the HTML <head> at the server level so that crawlers see them
 * in the initial response (no JS execution needed).
 * 
 * This mirrors the exact metadata from each page's SeoHead component.
 */

const SITE_URL = 'https://boostifyusa.com';

const ssrMeta = new Map([
    // ─── Homepage ────────────────────────────────────────────────────────────
    ['/', {
        title: 'SEO & Web Design: Craftsmanship for Local Growth',
        description: 'Boostify USA builds high-converting websites and SEO strategies for local businesses in Fresno and the Central Valley. Turn your website into a 24/7 salesperson.',
        canonical: `${SITE_URL}/`
    }],

    // ─── Core Service Pages ──────────────────────────────────────────────────
    ['/services', {
        title: 'Marketing Services | Web Design, SEO & Google Ads',
        description: 'Web Design, Local SEO, and Google Ads management for Central Valley businesses. Built for speed, security, and local growth.',
        canonical: `${SITE_URL}/services`
    }],
    ['/web-design', {
        title: 'Web Design: High-Converting Custom Local Websites',
        description: 'Custom, SEO-optimized web design for Central Valley businesses. Mobile-first, fast loading, and built to convert visitors into customers.',
        canonical: `${SITE_URL}/web-design`
    }],
    ['/local-seo', {
        title: 'Local SEO: Rank Higher & Get Found by Customers',
        description: 'Dominate Google Maps and local search results in the Central Valley. Our local SEO strategies help you get found by neighbors who need your services.',
        canonical: `${SITE_URL}/local-seo`
    }],
    ['/local-marketing', {
        title: 'Local Marketing: Generate Consistent High-Quality Leads',
        description: 'Maximize your ROI with precision-targeted Google Ads and Local Service Ads. We help Central Valley businesses get more leads instantly.',
        canonical: `${SITE_URL}/local-marketing`
    }],
    ['/maintenance', {
        title: 'Care & Maintenance: Secure, Fast & Reliable Hosting',
        description: 'Keep your website secure, fast, and up-to-date with our comprehensive maintenance plans. Daily backups, security scans, and 24/7 monitoring.',
        canonical: `${SITE_URL}/maintenance`
    }],
    ['/app-development', {
        title: 'App Development: Custom Web Apps Launched in Weeks',
        description: 'Turn your app idea into a reality. We build investor-ready MVPs and custom applications for startups and businesses in the Central Valley.',
        canonical: `${SITE_URL}/app-development`
    }],
    ['/ai-automation', {
        title: 'AI Automation: Save Time & Reduce Operational Costs',
        description: 'Automate your busywork. AI Chatbots, Missed Call Text-Back, and Review Management for Central Valley businesses.',
        canonical: `${SITE_URL}/ai-automation`
    }],

    // ─── Company Pages ───────────────────────────────────────────────────────
    ['/about', {
        title: 'About Joaquin Estrada | Central Valley Web Design',
        description: 'Meet the team behind Boostify USA. Founded by Joaquin Estrada, serving Fresno businesses with data-driven web design and SEO.',
        canonical: `${SITE_URL}/about`
    }],
    ['/contact', {
        title: 'Contact Boostify USA | Schedule Your Free Consultation',
        description: 'Get in touch with Boostify USA. Web design, SEO, and marketing services in Fresno, CA. Call (559) 785-3834.',
        canonical: `${SITE_URL}/contact`
    }],
    ['/work', {
        title: 'Web Design Portfolio: Real Results & Case Studies',
        description: 'Explore our portfolio of custom websites, SEO success stories, and digital marketing campaigns for Fresno businesses.',
        canonical: `${SITE_URL}/work`
    }],

    // ─── Tools & Resources ───────────────────────────────────────────────────
    ['/seo-audit', {
        title: 'Free SEO Audit: Scan Your Fresno Website Now',
        description: 'Get a free local SEO audit and visibility report for your Fresno business. Find out why your competitors are outranking you on Google Maps.',
        canonical: `${SITE_URL}/seo-audit`
    }],
    ['/links', {
        title: 'Link Tree: Websites That Bring Your Vision To Life',
        description: 'Your one-stop gateway to Boostify USA. Explore our work, book a call, or follow us on social media.',
        canonical: `${SITE_URL}/links`
    }],
    ['/sitemap', {
        title: 'Sitemap | Boostify USA',
        description: 'Browse all pages on the Boostify USA website. Find services, city pages, resources and more.',
        canonical: `${SITE_URL}/sitemap`
    }],

    // ─── Legal Pages ─────────────────────────────────────────────────────────
    ['/privacy', {
        title: 'Privacy Policy | Boostify USA Data Security',
        description: 'Privacy Policy for Boostify USA LLC. Learn how we collect, use, and protect your data.',
        canonical: `${SITE_URL}/privacy`
    }],
    ['/terms', {
        title: 'Terms of Service | Boostify USA Agreements',
        description: 'Terms and Conditions for using Boostify USA LLC services.',
        canonical: `${SITE_URL}/terms`
    }],
    ['/sms', {
        title: 'SMS Program Terms | Boostify USA Communications',
        description: "Terms and details regarding Boostify USA LLC's SMS program.",
        canonical: `${SITE_URL}/sms`
    }],

    // ─── Partner Pages ───────────────────────────────────────────────────────
    ['/partners', {
        title: 'Agency Partner Program: High Paying Referrals',
        description: 'Partner with Boostify USA. Refer local businesses to us and earn $100 per successful sign-up. Simple, transparent, local.',
        canonical: `${SITE_URL}/partners`
    }],
    ['/partners/login', {
        title: 'Partner Login | Secure Access to Boostify USA',
        description: 'Secure login for Boostify USA partners.',
        canonical: `${SITE_URL}/partners/login`
    }],
    ['/partners/dashboard', {
        title: 'Partner Dashboard | Boostify USA Referral Portal',
        description: 'Manage your referrals and payouts.',
        canonical: `${SITE_URL}/partners/dashboard`
    }],

    // ─── City Marketing Agency Pages ─────────────────────────────────────────
    ['/clovis-marketing-agency', {
        title: 'Clovis Marketing Agency: Attract More Local Customers',
        description: 'Boostify USA is a top Clovis marketing agency specializing in custom web design, Local SEO, and Google Ads. We help Clovis businesses grow with data-driven strategies.',
        canonical: `${SITE_URL}/clovis-marketing-agency`
    }],
    ['/visalia-marketing-agency', {
        title: 'Visalia Marketing Agency: Top-Rated Web Design & SEO',
        description: 'Boostify USA is a leading Visalia marketing agency. Custom web design, local SEO, and Google Ads that drive real growth for Tulare County businesses.',
        canonical: `${SITE_URL}/visalia-marketing-agency`
    }],
    ['/madera-marketing-agency', {
        title: 'Madera Marketing Agency: Grow Your Local Business',
        description: 'Boostify USA helps Madera businesses grow with custom web design, local SEO, and targeted Google Ads. Your gateway to digital growth in Madera County.',
        canonical: `${SITE_URL}/madera-marketing-agency`
    }],
    ['/hanford-marketing-agency', {
        title: 'Hanford Marketing Agency: Proven Digital Advertising',
        description: 'Boostify USA is a trusted Hanford marketing agency offering custom web design, local SEO, and Google Ads management for Kings County businesses.',
        canonical: `${SITE_URL}/hanford-marketing-agency`
    }],
    ['/merced-marketing-agency', {
        title: 'Merced Marketing Agency: Expert Web Design & SEO',
        description: "Boostify USA is a premier Merced marketing agency. Custom websites, local SEO, and Google Ads built for Merced County's booming market.",
        canonical: `${SITE_URL}/merced-marketing-agency`
    }],
    ['/tulare-marketing-agency', {
        title: 'Tulare Marketing Agency: Turn Clicks Into Customers',
        description: "Boostify USA is Tulare's results-driven marketing agency. Custom websites, local SEO, and Google Ads that grow Tulare County businesses.",
        canonical: `${SITE_URL}/tulare-marketing-agency`
    }],
    ['/sanger-marketing-agency', {
        title: 'Sanger Marketing Agency: Custom Websites That Convert',
        description: 'Boostify USA helps Sanger businesses grow online with custom web design, local SEO, and Google Ads. Small-town pride, big results.',
        canonical: `${SITE_URL}/sanger-marketing-agency`
    }],

    // ─── City Web Design Pages ───────────────────────────────────────────────
    ['/modesto-web-design', {
        title: 'Website Design Modesto | Top Web Design Agencies | Boostify USA',
        description: 'Looking for Website Design in Modesto? We are a top web design agency specializing in Ecommerce, Brand Website Design, and Diseño Web.',
        canonical: `${SITE_URL}/modesto-web-design`
    }],
]);

export default ssrMeta;
