import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { TrustBadges } from '../components/TrustBadges';
import { TestimonialsSection } from '../components/TestimonialsSection';

import {
    Check,
    ChevronDown,
    ChevronUp,
    ArrowRight,
    ShoppingCart,
    PenTool,
    Globe2,
    ShieldCheck,
    TrendingUp,
    Zap,
    AlertTriangle,
    Clock,
    Search,
    X,
    Phone,
    ArrowUpRight
} from 'lucide-react';

// ─── Page positioning ───────────────────────────────────────────────────────
// Targets "web design modesto", "website design modesto" and "modesto seo".
// Honest framing: Boostify's only office is in Fresno, Modesto (Stanislaus
// County) is outside the GBP service area, and Modesto work runs remotely.
// There is no Modesto client, so the page never implies one. The dashboard,
// the FTS mock and its badges are illustrative art and stay as they are.

// FAQ Data
// Questions are written the way a Modesto owner would ask them. Every number
// here is already published elsewhere on the site (homepage, /web-design,
// /fresno-seo), and nothing promises a ranking.
const faqs = [
    {
        question: "You're in Fresno. Why would a Modesto business hire you?",
        answer:
            "If you want a designer who can stop by your shop every week, hire one in Modesto. If a phone call and a screen share work for you, you get the same build our Fresno clients get, with the same redirect map, schema and speed budget. Our office is at 6362 N Figarden Dr, Suite 118, and the number is (559) 785-3834."
    },
    {
        question: "Can you guarantee I'll rank first on Google in Modesto?",
        answer:
            "No, and nobody can, because no agency controls Google. The ones who guarantee number one are either picking a keyword nobody searches or planning to blame you in month four. What you get from us is the process in writing and a monthly report with rankings, calls and form fills, slow months included."
    },
    {
        question: 'Can you do SEO for my Modesto business from Fresno?',
        answer:
            "Yes. Google ranks local results on relevance, distance from the searcher and popularity, and none of those depend on where the person doing the work sits. What does matter is that your Google Business Profile uses the address where you actually work, because Google's guidelines make a virtual office ineligible for a profile."
    },
    {
        question: 'How much does a website cost in Modesto?',
        answer:
            "A template build is $649, paid once, and it's live in about a week. A custom build is $1,995 and up depending on how many pages have to be built rather than assembled, and it takes 3 to 5 weeks. The care plan is $99 a month and optional, and hosting plus the domain run roughly $20 to $30 a month."
    },
    {
        question: 'I sell products online. Can you build my store?',
        answer:
            "Yes, on Shopify or a custom build, with inventory sync, sales tax and shipping rules quoted separately. Past a few hundred products it turns into a specialty with its own experts, and we'll name two Shopify Plus partners in the Valley for you instead."
    },
    {
        question: 'Can you build my site in Spanish too?',
        answer:
            "We can build a Spanish version of the pages, each at its own address with hreflang tags, so Google shows the Spanish page to people searching in Spanish. The translation should come from you or someone on your staff who already talks to those customers, since they know what your customers call each service."
    },
    {
        question: 'Will my site work on a phone?',
        answer:
            "It's built for the phone first and tested on a mid-range Android over 4G before launch. The targets are LCP under 2.5 seconds and CLS under 0.1, and you can check any site we've built yourself at pagespeed.web.dev."
    },
    {
        question: 'Who owns the site if I stop paying you?',
        answer:
            "You do. The domain, hosting account, code, content and analytics are yours, and we transfer all of it on request, in writing, at no charge."
    }
];

// SEO timeline for the #modesto-seo section. Adapted from the process on
// /fresno-seo, with the Modesto-specific address rule added.
const seoSteps = [
    {
        when: 'Weeks 1 to 2',
        name: 'Audit, then your Google Business Profile',
        body: "We pull where you rank today for the Modesto searches in your trade and crawl the site. The profile gets fixed first, starting with its categories and the services it lists, and you keep the audit whether you stay or not."
    },
    {
        when: 'Weeks 3 to 6',
        name: 'Fixes and the first service pages',
        body: "Page titles and schema get cleaned up, and the first service pages go live, each one aimed at a search with real volume in Modesto. We don't write copies of one page with the town name swapped, because Google's spam policy calls those doorway pages."
    },
    {
        when: 'Weeks 7 to 12',
        name: 'Reviews and citations',
        body: "A review ask your staff will actually send goes live, with no discounts for stars and no asking only the happy customers, since Google's review policy bans both. Your name, address and phone get matched on every directory that lists you, including old listings still showing a number you stopped using."
    },
    {
        when: 'Every month after',
        name: 'A report and the next target',
        body: "Rankings, calls and form fills, plus what we did and what comes next. Visible movement usually takes 3 to 4 months, and if a month was slow, the report says so."
    }
];

// Published prices only. Scope lines are copied from the homepage pricing cards
// and /fresno-seo so the numbers never drift between pages.
const prices = [
    { item: 'Template build', price: '$649 once', covers: 'Up to 5 pages, your branding on a proven layout, mobile, SSL and basic schema. Live in about a week.' },
    { item: 'Custom build', price: '$1,995 and up', covers: 'Designed and coded for you, with Core Web Vitals work, full schema and Google Business Profile setup. Live in 3 to 5 weeks.' },
    { item: 'Care plan', price: '$99 a month', covers: 'Content changes on request, uptime and form monitoring, security patches and backups. Cancel any month.' },
    { item: 'Local SEO', price: '$595 a month', covers: 'Your Google Business Profile, service pages, reviews and citations, with a report every month. Month to month.' },
    { item: 'Local SEO Lite', price: '$249 a month', covers: 'Hosting, maintenance and baseline optimization on one bill. Month to month.' }
];

// JSON-LD Schema
const advertiserSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Boostify USA Web Design & SEO",
    "url": "https://boostifyusa.com/modesto-web-design",
    "description": "Website design and local SEO for Modesto businesses, built remotely from the Boostify USA office in Fresno.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 36.8250248, "longitude": -119.8684005 },
    "areaServed": [
        { "@type": "City", "name": "Modesto" }
    ],
    "founder": {
        "@type": "Person",
        "name": "Victor Joaquin",
        "url": "https://boostifyusa.com/about"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Website design and Local SEO",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Website design" },
                "priceSpecification": { "@type": "PriceSpecification", "minPrice": "649", "priceCurrency": "USD" }
            },
            {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Local SEO" },
                "priceSpecification": { "@type": "UnitPriceSpecification", "price": "595", "priceCurrency": "USD", "unitText": "MONTH" }
            }
        ]
    },
    "priceRange": "$$",
    "telephone": "+1-559-785-3834",
    "contactPoint": [
        { "@type": "ContactPoint", "telephone": "+1-559-785-3834", "contactType": "sales" },
        { "@type": "ContactPoint", "telephone": "+1-559-785-3834", "contactType": "customer service" }
    ],
    "email": "hello@boostifyusa.com",
    "logo": "https://boostifyusa.com/icon.png",
    "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://boostifyusa.com/" },
        { "@type": "ListItem", "position": 2, "name": "Web Design", "item": "https://boostifyusa.com/web-design" },
        { "@type": "ListItem", "position": 3, "name": "Modesto Web Design & SEO", "item": "https://boostifyusa.com/modesto-web-design" }
    ]
};

export function WebDesignModestoPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title="Website Design Modesto & Modesto SEO | Boostify USA"
                description="Web design and Modesto SEO from Boostify USA, a Fresno shop that works remotely. Templates from $649, custom from $1,995, and you own the domain."
                canonicalUrl="/modesto-web-design"
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(advertiserSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            </Helmet>
            <Navigation />

            <main>
                {/* 
                  ───── HERO INTRO ───── 
                */}
                <section className="px-6 relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
                    {/* Topographic Background Pattern */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.4]"
                        style={{
                            backgroundImage: 'url(/hero-bg-pattern.webp)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }} />

                    {/* Radial white fade */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.60) 40%, rgba(255,255,255,0) 100%)'
                        }} />

                    {/* Background Elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange/5 rounded-full blur-[120px] -z-10" />

                    <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8"
                        >
                            <ShieldCheck size={16} className="text-orange" />
                            Built at 6362 N Figarden Dr, Fresno
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-dark leading-[0.95] tracking-tighter mb-6">
                                Modesto Web Design and SEO,<br />
                                <span className="relative inline-block px-2 isolate">
                                    <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
                                    <span className="text-orange relative z-10">Built in Our Fresno Office.</span>
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray font-medium leading-relaxed max-w-2xl mb-10"
                        >
                            Modesto projects run over the phone and a screen share, which makes no difference to the build. If you need someone who can stop by your shop every week, hire a designer in Modesto. For everyone else a template is $649 and a custom build starts at $1,995, with the domain registered to you.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 mb-8"
                        >
                            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                Start Your Project
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link to="/work" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                View Our Work
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm sm:text-base font-bold text-dark/60 mb-16"
                        >
                            <span className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" strokeWidth={3} />
                                Fresno Office
                            </span>
                            <span className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" strokeWidth={3} />
                                Prices Published
                            </span>
                            <span className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" strokeWidth={3} />
                                No Lock-In
                            </span>
                        </motion.div>

                        {/* Polished Hero Graphic */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="w-full max-w-4xl mx-auto relative z-10"
                        >
                            <div className="bg-white rounded-2xl border border-gray-light shadow-2xl p-2 pb-0 flex flex-col overflow-hidden relative">
                                {/* Browser Chrome */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-light/50 bg-gray-50/50">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="ml-4 flex-1 h-7 bg-white border border-gray-200 rounded-md flex items-center justify-center max-w-sm mx-auto shadow-sm">
                                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium flex items-center gap-1.5">
                                            <Globe2 size={12} className="text-gray-400" />
                                            yourmodestobusiness.com
                                        </span>
                                    </div>
                                </div>

                                {/* Content area */}
                                <div className="bg-light/30 w-full h-[400px] relative overflow-hidden flex text-left">
                                    {/* Sidebar */}
                                    <div className="w-48 border-r border-gray-100 bg-white p-5 hidden sm:block shrink-0 z-10">
                                        <div className="w-24 h-5 bg-gray-200 rounded mb-8" />
                                        <div className="space-y-4">
                                            <div className="w-full h-8 bg-orange/10 rounded flex items-center px-3 gap-2">
                                                <div className="w-4 h-4 bg-orange/50 rounded" />
                                                <div className="w-16 h-2 bg-orange/60 rounded" />
                                            </div>
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="w-full h-8 flex items-center px-3 gap-2">
                                                    <div className="w-4 h-4 bg-gray-200 rounded" />
                                                    <div className="w-16 h-2 bg-gray-200 rounded" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Main view */}
                                    <div className="flex-1 p-6 sm:p-8 flex flex-col gap-6 relative z-10">
                                        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                            <div>
                                                <div className="w-48 h-6 bg-dark rounded mb-2" />
                                                <div className="w-64 h-3 bg-gray-300 rounded" />
                                            </div>
                                            <div className="hidden md:flex px-4 py-2 bg-orange text-white rounded-lg items-center justify-center text-xs font-bold shadow-md shadow-orange/20">
                                                <TrendingUp size={14} className="mr-2" />
                                                High Converting Revenue
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                { label: 'Conversion Rate', value: '8.4%', trend: '+2.1%' },
                                                { label: 'Load Time', value: '98/100', trend: 'Passed' },
                                                { label: 'Online Revenue', value: '$12,400', trend: '+14%' }
                                            ].map((stat, i) => (
                                                <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-center">
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</div>
                                                    <div className="text-2xl font-black text-dark mb-1">{stat.value}</div>
                                                    <div className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {stat.trend}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex-1 bg-white border border-gray-100 rounded-xl mt-2 overflow-hidden relative shadow-sm">
                                            {/* Decorative grid */}
                                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50/80 to-transparent" />
                                            {/* Fake chart lines */}
                                            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                <path d="M0,80 Q20,60 40,70 T80,40 T100,20" stroke="#f97316" strokeWidth="2.5" fill="none" />
                                                <path d="M0,100 L0,80 Q20,60 40,70 T80,40 T100,20 L100,100 Z" fill="url(#orange-fade)" />
                                                <defs>
                                                    <linearGradient id="orange-fade" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                                                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <TrustBadges />

                {/* 
                  ───── NEW: PAIN POINTS (Sales Context) ───── 
                */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
                                <motion.div
                                    animate={{ rotate: [0, -8, 8, -8, 0] }}
                                    transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 4 }}>
                                    <AlertTriangle size={32} className="text-red-500" strokeWidth={2.5} />
                                </motion.div>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                People find my website. Why don't they{' '}
                                <span className="text-red-500">call?</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">
                                By the time someone lands on your site, you already paid for that visit with ad money or with the years it took to earn a referral. These are the three spots where a Modesto site usually loses the call after that, and all three can be fixed from our office in Fresno.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'It loads too slowly on a phone',
                                    desc: "A paid theme with thirty or forty plugins loads code for all of them on every page, so on cell service the visitor backs out before your number draws. We test every build on a mid-range Android over 4G before launch.",
                                    icon: Clock
                                },
                                {
                                    title: "It's missing from the map results",
                                    desc: "The three map results on a 'near me' search come from Google Business Profiles, which Google ranks on relevance, distance and popularity. A website can't put you there without a profile that uses your real Modesto address.",
                                    icon: Search
                                },
                                {
                                    title: 'It looks closed',
                                    desc: "A footer that still says 2019 and stock photos of somebody else's crew read as a business that might not pick up. Twenty phone photos of your own jobs cost nothing and replace the stock shots on the pages where people decide to call.",
                                    icon: X
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-lg shadow-dark/5 border border-gray-light/50 hover:shadow-xl hover:shadow-dark/10 hover:-translate-y-1 hover:border-red-500/20 transition-all duration-300 group">
                                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 border border-red-100 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                        <item.icon size={26} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark mb-3 tracking-tight group-hover:text-red-500 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-dark/70 font-medium leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 
                  ───── VISUAL PROOF (Image Showcase) ───── 
                */}
                <section className="py-24 px-6 bg-white border-y border-gray-100 overflow-x-clip">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-center relative max-w-5xl mx-auto">
                            {/* Floating Badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, x: -20 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="absolute -left-4 sm:-left-6 md:-left-12 top-6 sm:top-10 md:top-20 z-20 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 sm:gap-4 scale-90 sm:scale-100"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 shrink-0">
                                    <TrendingUp size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-black text-dark leading-none pb-1">+45%</div>
                                    <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Conversions</div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: -20, x: 20 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="absolute -right-4 sm:-right-6 md:-right-12 bottom-6 sm:bottom-10 md:bottom-20 z-20 bg-dark/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2 sm:gap-4 scale-90 sm:scale-100"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange/20 rounded-full flex items-center justify-center text-orange shrink-0">
                                    <Zap size={20} className="sm:w-6 sm:h-6" fill="currentColor" />
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-black text-white leading-none pb-1">99/100</div>
                                    <div className="text-[10px] sm:text-xs font-bold text-white/60 uppercase tracking-widest whitespace-nowrap">Speed Score</div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-light bg-gray-50 p-2 relative z-10"
                            >
                                <img
                                    src="/FTS-Mock.webp"
                                    alt="Full Throttle Suspension website, designed and built by Boostify USA in Fresno"
                                    className="w-full h-auto rounded-2xl object-cover"
                                    fetchPriority="high"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 
                  ───── SERVICES ───── 
                */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                Do I need a regular website <br />
                                <span className="text-orange">or an online store?</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">
                                A regular website explains what you do and gets you a phone call, which is what most service businesses need. A store adds inventory, sales tax and shipping on top of that. Once a catalog passes a few hundred products we'll point you to a Shopify Plus partner, because that work is its own specialty.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Left Column (Brand Design) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-light/30 rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-light shadow-sm flex flex-col min-h-[450px] md:h-[500px] hover:bg-white hover:shadow-md transition-all"
                            >
                                <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8">
                                    <PenTool size={28} strokeWidth={2} />
                                </div>
                                <h3 className="text-3xl font-black text-dark tracking-tight mb-4">Service business websites</h3>
                                <p className="text-lg text-gray font-medium leading-relaxed mb-8 flex-1">
                                    Every service you sell gets a page with a price or an honest range next to it, and your number works as a tap-to-call button. A custom build takes 3 to 5 weeks.
                                </p>
                                <ul className="space-y-3 mt-auto">
                                    {['Photos of your real jobs', 'Schema with your address and phone', 'Forms tested on a phone'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark">
                                            <Check size={18} className="text-green-500" strokeWidth={3} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Right Column (Ecommerce / Staggered Down slightly) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="mt-8 md:mt-16 bg-light/30 rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-light shadow-sm flex flex-col min-h-[450px] md:h-[500px] hover:bg-white hover:shadow-md transition-all"
                            >
                                <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8">
                                    <ShoppingCart size={28} strokeWidth={2} />
                                </div>
                                <h3 className="text-3xl font-black text-dark tracking-tight mb-4">Online stores</h3>
                                <p className="text-lg text-gray font-medium leading-relaxed mb-8 flex-1">
                                    Product pages and a checkout on Shopify or custom code. Inventory sync, tax tables and shipping rules get quoted separately, so they never hide inside a page count.
                                </p>
                                <ul className="space-y-3 mt-auto">
                                    {['Shopify or a custom build', 'Checkout tested on a phone', 'Tax and shipping quoted up front'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark">
                                            <Check size={18} className="text-green-500" strokeWidth={3} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 
                  ───── NEW: STATIC COMPARISON (Us vs. Them) ───── 
                */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                My WordPress site is slow. Do I need <span className="text-orange">a new one?</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">Often you don't. If the install is current and speed is the only complaint, a cleanup costs less than a rebuild and we'll quote the cleanup first. If it's an abandoned theme carrying forty plugins, every fix has to be re-tested against every plugin, which is how a repair ends up costing more than the $1,995 rebuild.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
                            {/* Generic Agency (Them) */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-light shadow-sm flex flex-col"
                            >
                                <div className="inline-block px-3 py-1 bg-red-100 text-red-600 font-bold text-xs uppercase rounded mb-6 self-start">The Problem</div>
                                <h3 className="text-3xl font-black text-dark tracking-tight mb-4">A paid theme and forty plugins</h3>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {[
                                        'Code for every plugin loads on every page',
                                        'Menus built for a mouse, then squeezed onto a phone',
                                        'A layout other shops in your trade bought too',
                                        'A security patch for each plugin, every month',
                                        'Yearly renewals on the premium plugins'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 font-medium text-gray">
                                            <X size={20} className="text-red-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Boostify (Us - Dark Theme) */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-dark rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl flex flex-col relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange/10 rounded-full blur-[60px] pointer-events-none" />
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 font-bold text-xs uppercase rounded mb-6 self-start relative z-10">
                                    <Zap size={12} fill="currentColor" /> Our Solution
                                </div>
                                <h3 className="text-3xl font-black text-white tracking-tight mb-4 relative z-10">Hand-coded or lean WordPress</h3>
                                <ul className="space-y-4 mb-8 flex-1 relative z-10">
                                    {[
                                        'Only the code each page actually uses',
                                        'LCP under 2.5 seconds on a mid-range Android',
                                        'Photos of your own jobs in place of stock',
                                        'A 301 redirect for every old URL before launch',
                                        'Hours and prices you can edit yourself'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 font-medium text-white/80">
                                            <Check size={20} className="text-green-500 shrink-0 mt-0.5" strokeWidth={3} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/*
                  ───── MODESTO SEO ─────
                  Layout reused from the "What usually comes next" rows on
                  /web-design: a short sticky intro on the left, a timeline of
                  plain rows on the right. This section carries "modesto seo".
                */}
                <section id="modesto-seo" className="py-20 md:py-24 px-6 bg-white scroll-mt-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[22rem_1fr] gap-10 lg:gap-20 items-start">
                            <div className="lg:sticky lg:top-28">
                                <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">
                                    What Modesto SEO looks like in the first 90 days.
                                </h2>
                                <p className="text-gray font-medium leading-relaxed">
                                    Modesto SEO is two separate jobs. The map results at the top of the page come from your Google Business Profile. The blue links under them come from your website, so working on only one of them leaves half the page to somebody else.
                                </p>
                            </div>

                            <div>
                                <div className="divide-y divide-gray-light border-y border-gray-light">
                                    {seoSteps.map((s) =>
                                        <div key={s.when} className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-2 md:gap-10 py-6">
                                            <p className="text-sm font-bold text-orange-hover leading-relaxed md:pt-0.5">
                                                {s.when}
                                            </p>
                                            <div>
                                                <h3 className="text-lg font-black text-dark tracking-tight mb-1.5">
                                                    {s.name}
                                                </h3>
                                                <p className="text-gray font-medium leading-relaxed">{s.body}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 space-y-4 max-w-[68ch]">
                                    <p className="text-gray font-medium leading-relaxed">
                                        Your profile has to use the address where you actually work.{' '}
                                        <a href="https://support.google.com/business/answer/3038177" target="_blank" rel="noopener noreferrer" className="text-dark font-bold hover:text-orange transition-colors">Google&rsquo;s guidelines</a>{' '}
                                        make a virtual office ineligible for a Business Profile, and a profile built on one can be suspended along with the other listings its owner manages. We don&rsquo;t have a Modesto office, so we don&rsquo;t run a Modesto listing for ourselves either.
                                    </p>
                                    <p className="text-gray font-medium leading-relaxed">
                                        Local SEO is $595 a month, and Local SEO Lite is $249 a month with hosting, maintenance and baseline optimization on one bill. Both are month to month. If referrals already keep you booked for months, don&rsquo;t buy SEO from us or anyone else, because it produces calls you have no room to take.
                                    </p>
                                    <p className="text-gray font-medium leading-relaxed">
                                        The full list of what&rsquo;s included is on the{' '}
                                        <Link to="/local-seo" className="text-dark font-bold hover:text-orange transition-colors">local SEO</Link>{' '}
                                        page, and{' '}
                                        <Link to="/fresno-seo" className="text-dark font-bold hover:text-orange transition-colors">Fresno SEO</Link>{' '}
                                        runs the same process for businesses near our office.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*
                  ───── PRICING ─────
                  Table pattern reused from "Do you need WordPress?" on
                  /web-design. Published prices only.
                */}
                <section className="py-16 md:py-20 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[20ch] mb-5">
                            What does website design cost in Modesto?
                        </h2>
                        <p className="text-lg text-gray font-medium leading-relaxed max-w-[66ch] mb-12">
                            These are the same numbers we quote on the phone. They&rsquo;re printed here because a price that only shows up after a forty-minute discovery call can be shaped by how much you seem able to pay.
                        </p>

                        <div className="overflow-x-auto -mx-6 px-6">
                            <table className="w-full min-w-[46rem] border-collapse text-left">
                                <thead>
                                    <tr className="border-b-2 border-dark/15">
                                        <th className="py-3 pr-6 text-xs font-bold uppercase tracking-[0.13em] text-dark/50 w-[22%]">What you&rsquo;re buying</th>
                                        <th className="py-3 pr-6 text-xs font-bold uppercase tracking-[0.13em] text-dark/50 w-[20%]">Price</th>
                                        <th className="py-3 text-xs font-bold uppercase tracking-[0.13em] text-dark/50">What it covers</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prices.map((p) =>
                                        <tr key={p.item} className="border-b border-dark/10 align-top">
                                            <td className="py-5 pr-6 font-medium text-gray leading-relaxed">{p.item}</td>
                                            <td className="py-5 pr-6 font-black text-dark leading-snug">{p.price}</td>
                                            <td className="py-5 font-medium text-gray leading-relaxed">{p.covers}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <p className="text-gray font-medium leading-relaxed max-w-[64ch] mt-8">
                            There are no contracts on any of it. You own the domain, the hosting account and the code, and we transfer all three on request at no charge. The{' '}
                            <Link to="/" className="text-dark font-bold hover:text-orange transition-colors">Fresno web design</Link>{' '}
                            page covers which of the two builds fits your business. Hosting and the domain run roughly $20 to $30 a month, and you can pay those directly.
                        </p>
                    </div>
                </section>

                {/*
                  ───── WHO DOES THE WORK ─────
                  Pattern reused from /web-design. Every claim about Victor is
                  from the Google Business Profile description, nothing else.
                */}
                <section className="py-16 md:py-20 px-6 bg-white border-t border-gray-light">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
                            <img
                                src="/1733568683912.jpg"
                                alt="Victor Joaquin, founder of Boostify USA"
                                width={200}
                                height={200}
                                loading="lazy"
                                decoding="async"
                                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover border border-gray-light shrink-0"
                            />

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange-hover mb-3">
                                    Who does the work
                                </p>
                                <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">
                                    Victor Joaquin builds it.
                                </h2>
                                <p className="text-lg text-gray font-medium leading-relaxed max-w-[68ch] mb-4">
                                    He started building websites at 16 and spent time inside several of the bigger agencies in Fresno before starting his own. The person on your first call is the person who writes the copy and builds the pages.
                                </p>
                                <p className="text-gray font-medium leading-relaxed max-w-[68ch] mb-6">
                                    He did the WordPress build for Fresno State&rsquo;s news site and trained their staff on it, and he runs workshops for the SBA. Every site on{' '}
                                    <Link to="/work" className="text-dark font-bold hover:text-orange transition-colors">our work page</Link>{' '}
                                    is for a Fresno client, including Full Throttle Suspension, Martin Energy, Benchmark Pool Supply and Tint Headquarters.
                                </p>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                                    <Link to="/about" className="inline-flex items-center gap-1.5 font-bold text-dark hover:text-orange transition-colors">
                                        More about Victor
                                        <ArrowUpRight size={16} />
                                    </Link>
                                    <a href="tel:+15597853834" className="inline-flex items-center gap-2 font-bold text-dark hover:text-orange transition-colors">
                                        <Phone size={16} className="text-orange" strokeWidth={2.5} />
                                        (559) 785-3834
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* 
                  ───── BOTTOM: CTA & LOCAL SEO ───── 
                */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-orange text-white rounded-[2.5rem] p-10 lg:p-20 relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark/20 rounded-full font-bold text-sm tracking-wide mb-8 border border-white/20 backdrop-blur-sm">
                                        <Globe2 size={16} /> Modesto Web Design &amp; SEO
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tighter">
                                        Call before you <br /> hire anyone.
                                    </h2>
                                    <p className="text-lg font-medium text-white/90 mb-10 leading-relaxed max-w-md">
                                        Ask every shop you call who will own the domain when the job is done, and get the answer in writing before you pay a deposit. Our answer is you, and <strong>(559) 785-3834</strong> rings at our office in Fresno.
                                    </p>
                                    <a href="tel:+15597853834" className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange font-bold rounded-lg hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-1">
                                        Call (559) 785-3834
                                    </a>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { title: 'Remote builds', desc: 'Modesto projects run over the phone and a screen share, and the build is the same one Fresno clients get.' },
                                        { title: 'Prices in writing', desc: '$649 for a template, $1,995 and up for custom, and $595 a month for Local SEO.' },
                                        { title: 'No lock-in', desc: 'The domain, hosting account and code are yours, and the transfer is free.' }
                                    ].map((feature, i) => (
                                        <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-start gap-5">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange shrink-0 font-black text-xl shadow-inner">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xl mb-1">{feature.title}</h4>
                                                <p className="text-white/80 font-medium">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">
                            Modesto web design and SEO questions
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl border border-gray-light overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg text-dark hover:bg-gray-50 transition-colors">
                                        {faq.question}
                                        {openFaq === i ? (
                                            <ChevronUp size={20} className="text-orange shrink-0 ml-4" />
                                        ) : (
                                            <ChevronDown size={20} className="text-gray/40 shrink-0 ml-4" />
                                        )}
                                    </button>
                                    <motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0 }} className="overflow-hidden">
                                                <div className="px-8 pb-8 text-gray font-medium leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/*
                  ───── REFERENCES ─────
                  Appendix pattern reused from /web-design. The Google rules
                  this page leans on, so each claim can be checked.
                */}
                <section className="py-12 md:py-14 px-6 bg-light/50 border-t border-gray-light">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[15rem_1fr] gap-6 lg:gap-16">
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-[0.13em] text-dark mb-1.5">
                                    References
                                </h2>
                                <p className="text-xs text-gray font-medium leading-relaxed max-w-[30ch]">
                                    The published rules behind the claims on this page.
                                </p>
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 divide-y divide-gray-light sm:divide-y-0">
                                {[
                                    { t: 'How local results are ranked', s: 'Google Business Profile Help', h: 'https://support.google.com/business/answer/7091' },
                                    { t: 'Address rules and virtual offices', s: 'Google Business Profile Help', h: 'https://support.google.com/business/answer/3038177' },
                                    { t: 'Review incentives and gating', s: 'Google Maps content policy', h: 'https://support.google.com/contributionpolicy/answer/7400114' },
                                    { t: 'Doorway pages', s: 'Google spam policies', h: 'https://developers.google.com/search/docs/essentials/spam-policies' },
                                    { t: 'Spanish pages and hreflang', s: 'Google Search Central', h: 'https://developers.google.com/search/docs/specialty/international/localized-versions' },
                                    { t: 'Core Web Vitals thresholds', s: 'web.dev', h: 'https://web.dev/articles/vitals' },
                                    { t: 'PageSpeed Insights', s: 'Test any URL yourself', h: 'https://pagespeed.web.dev/' }
                                ].map((r) =>
                                    <li key={r.h} className="py-2.5">
                                        <a href={r.h} target="_blank" rel="noopener noreferrer" className="group flex items-baseline gap-2">
                                            <span className="text-sm font-bold text-dark group-hover:text-orange transition-colors">
                                                {r.t}
                                            </span>
                                            <span className="text-xs font-medium text-gray shrink-0">{r.s}</span>
                                            <ArrowUpRight size={12} className="text-gray/50 shrink-0 self-center group-hover:text-orange transition-colors" />
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </section>

                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
