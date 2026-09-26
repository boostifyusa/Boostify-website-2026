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
        title: 'Web Design Fresno | Custom Websites & SEO | Boostify USA',
        description: 'Fresno web design studio since 2014. We build fast, SEO-ready websites that turn Central Valley visitors into paying customers.',
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
        title: 'About Victor Joaquin | Central Valley Web Design',
        description: 'Meet the team behind Boostify USA. Founded by Victor Joaquin, serving Fresno businesses with data-driven web design and SEO.',
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
    ['/clovis-web-design', {
        title: 'Web Design Clovis, CA | Custom Websites | Boostify USA',
        description: 'Clovis web design from a Fresno office at 6362 N Figarden Dr. Template sites are $649, custom builds start at $1,995, and you own the domain.',
        canonical: `${SITE_URL}/clovis-web-design`
    }],
    ['/visalia-web-design', {
        title: 'Web Design Visalia, CA | Custom Websites | Boostify USA',
        description: 'Web design for Visalia and Tulare County businesses from Boostify USA in Fresno. Custom sites from $1,995, templates from $649, and you own the domain.',
        canonical: `${SITE_URL}/visalia-web-design`
    }],
    ['/madera-marketing-agency', {
        title: 'Madera Marketing Agency: Grow Your Local Business',
        description: 'Boostify USA helps Madera businesses grow with custom web design, local SEO, and targeted Google Ads. Your gateway to digital growth in Madera County.',
        canonical: `${SITE_URL}/madera-marketing-agency`
    }],
    ['/hanford-marketing-agency', {
        title: 'Hanford SEO Company | Kings County Web Design | Boostify USA',
        description: "Hanford SEO and web design for Kings County businesses from Boostify USA's Fresno office. Local SEO from $595 a month, websites from $649, no contracts.",
        canonical: `${SITE_URL}/hanford-marketing-agency`
    }],
    ['/merced-marketing-agency', {
        title: 'Merced SEO Company & Web Design | Boostify USA',
        description: "Merced SEO and web design from Boostify USA's Fresno office, an hour from Merced. Local SEO from $595 a month, websites from $649, no contracts.",
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
        title: 'Website Design Modesto & Modesto SEO | Boostify USA',
        description: 'Web design and Modesto SEO from Boostify USA, a Fresno shop that works remotely. Templates from $649, custom from $1,995, and you own the domain.',
        canonical: `${SITE_URL}/modesto-web-design`
    }],
]);

export default ssrMeta;
