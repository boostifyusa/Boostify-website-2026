import { useState, useEffect } from 'react';
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
    ShieldCheck,
    AlertTriangle,
    MapPin,
    TrendingUp,
    BarChart3,
    Star,
    Phone,
    ArrowRight,
    Search,
    Target,
    Globe,
    Megaphone,
    MousePointerClick,
    Zap,
    Building2,
    DollarSign,
    HeartHandshake
} from 'lucide-react';

// ─── Page positioning ───────────────────────────────────────────────────────
// Retargeted from "clovis marketing agency" (no rankings) to "web design clovis"
// and "clovis web design". Moves to /clovis-web-design with a 301 from the old
// URL. Lead proof is Benchmark Pool Supply, a site we built for a business with
// a store at 811 Barstow Ave, Clovis (address from benchmarkpoolsupply.com).

// FAQ Data: Clovis-specific
const faqs = [
    {
        question: 'Why would I hire a Fresno web designer for a Clovis business?',
        answer:
            "Clovis and Fresno share a border, and most of our work is already in one city or the other. We would rather meet at your shop than ours. Benchmark Pool Supply, whose Clovis store is at 811 Barstow Ave, is one of the businesses we built a website for. Whoever you hire, ask who owns the domain after you leave, because whoever holds that login controls the site and the email that runs on it."
    },
    {
        question: 'How much does a website cost in Clovis?',
        answer:
            "A template site is $649, paid once. A custom build starts at $1,995 and goes up with the number of pages and how much of it has to be built from scratch. Care is $99 a month and optional, and hosting plus the domain run about $20 to $30 a month, which you can pay directly."
    },
    {
        question: 'How long until my site is live?',
        answer:
            "A template site takes 2 to 3 weeks and a custom build takes 3 to 5. What moves that number is how fast your photos and feedback come back, so having twenty photos of real jobs ready before the first call shortens it."
    },
    {
        question: 'Do I have to sign a contract?',
        answer:
            "There's no contract. A website is a one-time price, and care and Local SEO are month to month, so you can stop after any month. You own your website and your domain either way."
    },
    {
        question: 'I just opened in Clovis. Do I need a custom site?',
        answer:
            "Probably not yet. If most of your work comes from referrals and people look you up by name, the $649 template covers that. If you'd rather build it yourself, Squarespace and a weekend gets you something respectable and you keep the $649."
    },
    {
        question: 'My site is only a couple of years old. Do I have to start over?',
        answer:
            "Often you don't. If the platform is current and the complaint is speed or structure, fixing it costs less than replacing it, and we'll say so before quoting a rebuild. If it's an old theme carrying forty plugins, the repair costs more than the rebuild, because every fix has to be re-tested against every plugin."
    }
];

// Pricing: same two-panel pattern as WebDesignPage "THE TWO JOBS". Prices and
// timelines are the ones already published on the homepage and /web-design.
const plans = [
    {
        key: 'template',
        kicker: 'Mostly referrals',
        name: 'A template site',
        line: 'People already know your name and look you up before they call back.',
        who: [
            'Most of your work comes from referrals',
            'You need to be live before your busy season'
        ],
        does: 'Built on a ready-made layout with your own photos and wording, and the phone number is a tap-to-call button. It gets the same schema and redirect map as the custom build.',
        price: '$649',
        span: '2 to 3 weeks'
    },
    {
        key: 'custom',
        kicker: 'Mostly new customers',
        name: 'A custom site',
        line: 'You need calls from people who have never heard of you.',
        who: [
            'You sell several services and each one needs its own page',
            'You pay for ads or SEO and that traffic needs a good place to land'
        ],
        does: 'Designed and coded for your business, with the copy written after an interview with you. Every service gets its own page, and call tracking comes set up.',
        price: 'From $1,995',
        span: '3 to 5 weeks'
    }
];

// ProfessionalService JSON-LD: Clovis web design
const advertiserSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Boostify USA Web Design & SEO",
    "url": "https://boostifyusa.com/clovis-web-design",
    "description": "Web design for Clovis businesses from an office at 6362 N Figarden Dr in Fresno. Template sites are $649 and custom builds start at $1,995. You own your website and your domain.",
    "hasMap": "https://www.google.com/maps?cid=5709723330865512710",
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
        { "@type": "City", "name": "Clovis" },
        { "@type": "City", "name": "Fresno" }
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web design",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "Template website",
                "price": "649",
                "priceCurrency": "USD",
                "itemOffered": { "@type": "Service", "name": "Website design" }
            },
            {
                "@type": "Offer",
                "name": "Custom website",
                "price": "1995",
                "priceCurrency": "USD",
                "priceSpecification": { "@type": "PriceSpecification", "minPrice": "1995", "priceCurrency": "USD" },
                "itemOffered": { "@type": "Service", "name": "Website design" }
            },
            {
                "@type": "Offer",
                "name": "Local SEO",
                "price": "595",
                "priceCurrency": "USD",
                "priceSpecification": { "@type": "UnitPriceSpecification", "price": "595", "priceCurrency": "USD", "unitText": "MONTH" },
                "itemOffered": { "@type": "Service", "name": "Local SEO" }
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
        { "@type": "ListItem", "position": 3, "name": "Clovis Web Design", "item": "https://boostifyusa.com/clovis-web-design" }
    ]
};

// City cross-link data
const areaCities = [
    { city: 'Fresno', path: '/', highlight: false },
    { city: 'Clovis', path: '/clovis-web-design', highlight: true },
    { city: 'Visalia', path: '/visalia-web-design', highlight: false },
    { city: 'Madera', path: '/madera-marketing-agency', highlight: false },
    { city: 'Hanford', path: '/hanford-marketing-agency', highlight: false },
    { city: 'Merced', path: '/merced-marketing-agency', highlight: false },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
];

export function ClovisMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [ranks, setRanks] = useState<Record<number, { rank: number | string, colorClass: string }>>({});

    useEffect(() => {
        const initialRanks: Record<number, { rank: number | string, colorClass: string }> = {};
        for (let i = 0; i < 49; i++) {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const dist = Math.sqrt(Math.pow(row - 3, 2) + Math.pow(col - 3, 2));
            let rank: number | string, colorClass: string;
            if (dist < 3.5) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
            else if (dist < 5) { rank = Math.floor(Math.random() * 2) + 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
            else { rank = Math.floor(Math.random() * 3) + 3; colorClass = "bg-orange text-white shadow-orange/20"; }
            initialRanks[i] = { rank, colorClass };
        }
        setRanks(initialRanks);
    }, []);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title="Web Design Clovis, CA | Custom Websites | Boostify USA"
                description="Clovis web design from a Fresno office at 6362 N Figarden Dr. Template sites are $649, custom builds start at $1,995, and you own the domain."
                canonicalUrl="/clovis-web-design"
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
                {/* ───── HERO ───── */}
                <section className="px-6 relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.35]"
                        style={{ backgroundImage: 'url(/hero-bg-pattern.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)' }} />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                                Web Design Clovis, CA
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Clovis Web Design <span className="text-orange">From a Fresno Office</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Benchmark Pool Supply runs a store at 811 Barstow Ave in Clovis,
                                and we built their website. The office that built it is at 6362 N
                                Figarden Dr, Suite 118, in Fresno, and you can come visit it.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <a href="tel:+15597853834" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                    Call (559) 785-3834
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </a>
                                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                    Get a Quote
                                </Link>
                            </div>

                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> You Own the Domain</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> No Contracts</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Google Partner</span>
                            </div>
                        </motion.div>

                        {/* Hero Graphic: Ranking Grid (different from Fresno's Dashboard) */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -top-4 -left-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center"><HeartHandshake size={16} className="text-orange" strokeWidth={3} /></div>
                                <div>
                                    <div className="text-xs font-black text-dark leading-none">Meet in Person</div>
                                    <div className="text-[10px] text-gray font-medium">N Figarden Dr, Fresno</div>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                                className="absolute -bottom-4 -right-4 z-20 bg-dark rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><TrendingUp size={16} className="text-green-400" strokeWidth={3} /></div>
                                <div>
                                    <div className="text-xs font-black text-white leading-none">5.0 Stars</div>
                                    <div className="text-[10px] text-white/50 font-medium">On Google</div>
                                </div>
                            </motion.div>

                            {/* Ranking Grid Graphic */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-2xl border border-white shadow-2xl overflow-hidden relative z-10 aspect-[4/3] flex flex-col p-3 md:p-4">
                                <div className="bg-white border border-gray-100 rounded-full px-4 py-3 flex items-center gap-3 mb-4 shadow-sm z-20">
                                    <Search size={18} className="text-gray-400" />
                                    <span className="text-dark font-medium">marketing agency clovis ca</span>
                                    <div className="w-px h-5 bg-gray-200 ml-auto" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Local</span>
                                    </div>
                                </div>

                                <div className="flex-1 bg-white rounded-2xl relative overflow-hidden border border-gray-100 flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-[0.05] select-none pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                                    <div className="grid grid-cols-7 gap-1.5 md:gap-3 relative z-10 p-4">
                                        {Array.from({ length: 49 }).map((_, i) => {
                                            const row = Math.floor(i / 7);
                                            const col = i % 7;
                                            const dist = Math.sqrt(Math.pow(row - 3, 2) + Math.pow(col - 3, 2));
                                            let rank: number | string, colorClass: string;
                                            if (ranks[i]) {
                                                rank = ranks[i].rank;
                                                colorClass = ranks[i].colorClass;
                                            } else {
                                                if (dist < 3.5) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
                                                else if (dist < 5) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
                                                else { rank = "-"; colorClass = "bg-orange text-white shadow-orange/20"; }
                                            }
                                            if (row === 3 && col === 3) {
                                                return (
                                                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
                                                        className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 border-gray-100 shadow-xl flex items-center justify-center z-20">
                                                        <MapPin size={14} className="text-dark" fill="currentColor" />
                                                    </motion.div>
                                                );
                                            }
                                            return (
                                                <motion.div key={i} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                                                    transition={{ delay: dist * 0.05, type: "spring", stiffness: 200 }}
                                                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${colorClass} shadow-lg flex items-center justify-center text-[10px] md:text-xs font-bold border border-white/50`}>
                                                    {rank}
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    <div className="absolute bottom-4 z-30 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-xl border border-gray-100 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange/10 rounded-lg shrink-0 flex items-center justify-center"><span className="text-orange font-black text-sm">B</span></div>
                                        <div>
                                            <div className="text-xs font-black text-dark mb-0.5">Boostify USA</div>
                                            <div className="flex items-center gap-1">
                                                <div className="flex text-yellow-500 gap-0.5">{[...Array(5)].map((_, j) => (<Star key={j} size={8} fill="currentColor" />))}</div>
                                                <span className="text-[9px] text-gray-500 font-bold">5.0 (8)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-full h-full bg-orange/5 rounded-3xl -z-10 hidden lg:block" />
                        </motion.div>
                    </div>
                </section>

                <TrustBadges />

                {/* ───── PAIN POINTS (unique set for Clovis) ───── */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                                className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
                                <motion.div animate={{ rotate: [0, -8, 8, -8, 0] }} transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 4 }}>
                                    <AlertTriangle size={32} className="text-red-500" strokeWidth={2.5} />
                                </motion.div>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                I need a website for my Clovis business. <span className="text-red-500">Where do I start?</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">
                                Before you call any web designer, us included, get these done
                                yourself. They cost nothing, and they are the pieces a designer
                                has to wait on the owner for.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Find out who owns your domain', desc: "Log in to the registrar and check which email the domain is registered to, because that email is the owner no matter who paid the invoice. If your email address ends in your domain, whoever holds that login also controls your inbox.", icon: Search },
                                { title: 'Shoot twenty photos of real jobs', desc: "Your phone is good enough, and your own crew and your own shop are the subject. Stock photos of another company's crew cost you trust on the exact page where a visitor decides whether to call.", icon: Globe },
                                { title: 'Check who owns your Google listing', desc: "Your Google Business Profile has its own owner, separate from the website. If that login sits with a former employee or your last web guy, the new site can't be added to the listing until you get access back.", icon: BarChart3 },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-lg shadow-dark/5 border border-gray-light/50 hover:shadow-xl hover:shadow-dark/10 hover:-translate-y-1 hover:border-red-500/20 transition-all duration-300 group">
                                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 border border-red-100 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110 transition-all duration-300"><item.icon size={26} strokeWidth={2.5} /></div>
                                    <h3 className="text-2xl font-black text-dark mb-3 tracking-tight group-hover:text-red-500 transition-colors duration-300">{item.title}</h3>
                                    <p className="text-dark/70 font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── BENEFIT 1: Custom Web Design (leads for Clovis) ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto space-y-24">
                        {/* ───── PROOF: Benchmark Pool Supply (same two-column pattern as the
                            blocks below; the image is the /work mockup of the site we built) ───── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <img
                                    src="/Slide-4_3-1.webp"
                                    alt="Benchmark Pool Supply website built by Boostify USA"
                                    width={1024}
                                    height={768}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-auto rounded-3xl border border-gray-light"
                                />
                            </div>

                            <div className="order-1 lg:order-2">
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><MapPin size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                                    A Clovis store we built the website for
                                </h2>
                                <p className="text-lg text-gray font-medium mb-4 leading-relaxed">
                                    Benchmark Pool Supply sells pool supplies and replacement parts
                                    from two stores, one at 811 Barstow Ave in Clovis and one at 3017 W
                                    Bullard Ave in Fresno. We did the web design and the local SEO for
                                    them.
                                </p>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    If your business has more than one location, each one needs its
                                    own address and phone number on the site, because Google matches
                                    those against each location's Business Profile.
                                </p>
                                <Link to="/work" className="inline-flex items-center font-bold text-dark hover:text-orange transition-colors">
                                    See the Benchmark build and the rest of our work
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><Globe size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                                    Custom web design for Clovis businesses
                                </h2>
                                <p className="text-lg text-gray font-medium mb-4 leading-relaxed">
                                    Victor Joaquin builds it. He started building websites at 16 and
                                    spent time inside several of the bigger agencies in town before
                                    starting his own. He also did the WordPress build for Fresno
                                    State's news site and trained their staff to run it.
                                </p>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    A custom build takes 3 to 5 weeks. What moves that number is how
                                    fast your photos and feedback come back to us.
                                </p>
                                <ul className="space-y-3">
                                    {['Copy written after a one-hour interview with you', 'Tested on a mid-priced phone before launch', 'Schema and page titles set up at launch', 'Old page addresses kept alive with 301 redirects'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Web Design Mockup Graphic */}
                            <div className="bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <Globe size={20} className="text-orange" />
                                    <span className="text-white font-bold text-lg">Website Performance</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    {[
                                        { label: 'Speed Score', value: '98', color: 'text-green-400' },
                                        { label: 'Mobile Score', value: '96', color: 'text-green-400' },
                                        { label: 'SEO Score', value: '100', color: 'text-orange' },
                                    ].map((m, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                                            <div className={`font-black text-2xl leading-none mb-1 ${m.color}`}>{m.value}</div>
                                            <div className="text-white/30 text-[8px] font-bold uppercase tracking-wider">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3 flex-1">
                                    {[
                                        { label: 'Page Load Time', value: '1.2s', bar: '88%', color: 'bg-green-500' },
                                        { label: 'Bounce Rate', value: '22%', bar: '22%', color: 'bg-green-500' },
                                        { label: 'Conversion Rate', value: '8.4%', bar: '84%', color: 'bg-orange' },
                                        { label: 'Mobile Traffic', value: '74%', bar: '74%', color: 'bg-blue-500' },
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-white/50 text-xs font-medium">{item.label}</span>
                                                <span className="text-white font-bold text-xs">{item.value}</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.bar }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-xl">8.4% <span className="text-white/40 font-medium text-sm">Conversion Rate</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +3.2%</div>
                                </div>
                            </div>
                        </div>

                        {/* ───── BENEFIT 2: Local SEO ───── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <Search size={20} className="text-orange" />
                                    <span className="text-white font-bold text-lg">Local Search Visibility</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Map Pack Rank</div>
                                        <div className="text-green-400 font-black text-3xl">#1</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Search Visibility</div>
                                        <div className="text-orange font-black text-3xl">94%</div>
                                    </div>
                                </div>
                                <div className="space-y-2.5 flex-1">
                                    {[
                                        { keyword: '"plumber clovis"', rank: '#1', trend: '↑ 4', color: 'bg-green-500' },
                                        { keyword: '"hvac repair clovis ca"', rank: '#2', trend: '↑ 7', color: 'bg-green-500' },
                                        { keyword: '"roofing contractor clovis"', rank: '#1', trend: '↑ 3', color: 'bg-green-500' },
                                        { keyword: '"emergency plumber central valley"', rank: '#3', trend: '↑ 5', color: 'bg-orange' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5 flex items-center justify-between">
                                            <span className="text-white/70 text-sm font-medium truncate">{item.keyword}</span>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <span className="text-white font-bold text-sm">{item.rank}</span>
                                                <span className="text-green-400 text-xs font-bold">{item.trend}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-lg">12 Keywords <span className="text-white/40 font-medium text-sm">Page 1</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +42%</div>
                                </div>
                            </div>

                            <div className="order-1 lg:order-2">
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><BarChart3 size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                                    Will a new website get me on the Google map in Clovis?
                                </h2>
                                <p className="text-lg text-gray font-medium mb-4 leading-relaxed">
                                    The build sets up the page titles and schema Google reads first,
                                    and it connects the site to your Business Profile. Getting into the
                                    map pack after launch is monthly work on that profile and on the
                                    listings that point to it.
                                </p>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    No agency controls Google, so a promise of number one usually means
                                    someone picked a keyword nobody searches.{' '}
                                    <Link to="/local-seo" className="text-dark font-bold hover:text-orange transition-colors">Local SEO</Link>{' '}
                                    is $595 a month and Lite is $249 a month, both month to month. The{' '}
                                    <Link to="/fresno-seo" className="text-dark font-bold hover:text-orange transition-colors">Fresno SEO page</Link>{' '}
                                    lays out the first 90 days.
                                </p>
                                <ul className="space-y-3">
                                    {['Google Business Profile work', 'Citation and listing cleanup', 'A review routine your staff will use', 'A monthly report with rankings and calls'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───── ADVERTISING SECTION (different layout: full-width banner) ───── */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto"><MousePointerClick size={24} strokeWidth={2.5} /></div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                Google Ads while the <span className="text-orange">SEO catches up</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">
                                Google Ads and Local Service Ads can bring in calls while the SEO
                                builds, and both are covered on the{' '}
                                <Link to="/local-marketing" className="text-dark font-bold hover:text-orange transition-colors">local marketing page</Link>.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Target, title: 'Clovis targeting', desc: 'Ads show in Clovis and the zip codes you pick.' },
                                { icon: DollarSign, title: 'Cost per call', desc: 'Google Ads reports what each tracked call cost.' },
                                { icon: Zap, title: 'Calls before SEO', desc: 'Ads can run once Google approves them, and SEO takes months.' },
                                { icon: Phone, title: 'Call tracking', desc: 'Each call is tied to the ad or listing that produced it.' },
                                { icon: Megaphone, title: 'Local Service Ads', desc: 'The ads with the Google badge, for trades that qualify.' },
                                { icon: ShieldCheck, title: 'Google Partner', desc: 'Boostify USA holds Google Partner status.' },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-light hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 group-hover:bg-orange group-hover:text-white transition-colors">
                                        <item.icon size={26} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark mb-3 tracking-tight group-hover:text-red-500 transition-colors duration-300">{item.title}</h3>
                                    <p className="text-dark/70 font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── AREA SERVED (with cross-links) ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto"><MapPin size={24} strokeWidth={2.5} /></div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                Is a Fresno web designer close enough for my <span className="text-orange">Clovis business?</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">
                                The office is at 6362 N Figarden Dr, Suite 118, off Figarden between
                                Herndon and Bullard, and we would rather meet at your shop than ours.
                                Most of our work is already in Fresno and Clovis, and a Fresno
                                agency's homepage ranked fifth on Google for "web design clovis"
                                when we checked in September 2026.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {areaCities.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                                    {item.highlight ? (
                                        <div className="p-6 rounded-2xl border text-center bg-orange text-white border-orange shadow-lg shadow-orange/20">
                                            <Building2 size={24} className="mx-auto mb-3 text-white" strokeWidth={2.5} />
                                            <div className="text-lg font-black mb-1 text-white">{item.city}</div>
                                            <div className="text-sm font-medium text-white/80">You Are Here</div>
                                        </div>
                                    ) : (
                                        <Link to={item.path} className="block p-6 rounded-2xl border text-center bg-white border-gray-light hover:border-orange/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                            <Building2 size={24} className="mx-auto mb-3 text-orange" strokeWidth={2.5} />
                                            <div className="text-lg font-black mb-1 text-dark">{item.city}</div>
                                            <div className="text-sm font-medium text-gray">View Services →</div>
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── PRICING (same pattern as WebDesignPage "THE TWO JOBS") ───── */}
                <section className="py-20 md:py-28 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[20ch] mb-5">
                            What does a website cost in Clovis?
                        </h2>
                        <p className="text-lg text-gray font-medium leading-relaxed max-w-[64ch] mb-14">
                            The same as our <Link to="/" className="text-dark font-bold hover:text-orange transition-colors">Fresno web design</Link>. The prices are printed here because a
                            quote that only shows up after a discovery call can be priced off your
                            reaction. If most of your jobs come from referrals, the $649 template
                            does the job.
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6">
                            {plans.map((plan) => {
                                const dark = plan.key === 'custom';
                                return (
                                    <motion.div
                                        key={plan.key}
                                        initial={{ opacity: 1, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                        className={`rounded-xl p-7 md:p-9 flex flex-col ${dark ? 'bg-dark text-white' : 'bg-white border border-gray-light'}`}>

                                        <p className={`text-xs font-bold uppercase tracking-[0.13em] mb-3 ${dark ? 'text-orange' : 'text-orange-hover'}`}>
                                            {plan.kicker}
                                        </p>
                                        <h3 className={`text-2xl md:text-3xl font-black tracking-tight mb-3 ${dark ? 'text-white' : 'text-dark'}`}>
                                            {plan.name}
                                        </h3>
                                        <p className={`text-lg font-bold leading-snug mb-6 ${dark ? 'text-white/90' : 'text-dark/80'}`}>
                                            {plan.line}
                                        </p>
                                        <ul className="space-y-2.5 mb-6">
                                            {plan.who.map((w) =>
                                                <li key={w} className="flex items-start gap-2.5">
                                                    <Check size={15} strokeWidth={3} className={`mt-1 shrink-0 ${dark ? 'text-orange' : 'text-orange-hover'}`} />
                                                    <span className={`font-medium leading-relaxed ${dark ? 'text-white/70' : 'text-gray'}`}>{w}</span>
                                                </li>
                                            )}
                                        </ul>
                                        <p className={`font-medium leading-relaxed mb-7 max-w-[58ch] ${dark ? 'text-white/60' : 'text-gray'}`}>
                                            {plan.does}
                                        </p>
                                        <div className={`mt-auto flex items-baseline gap-3 pt-5 border-t ${dark ? 'border-white/15' : 'border-gray-light'}`}>
                                            <span className={`text-2xl font-black tracking-tighter ${dark ? 'text-orange' : 'text-dark'}`}>{plan.price}</span>
                                            <span className={`text-sm font-bold ${dark ? 'text-white/50' : 'text-gray'}`}>{plan.span}</span>
                                        </div>
                                    </motion.div>);
                            })}
                        </div>

                        <p className="text-gray font-medium leading-relaxed max-w-[64ch] mt-8">
                            <Link to="/maintenance" className="text-dark font-bold hover:text-orange transition-colors">Care</Link>{' '}
                            is $99 a month and optional. Hosting and the domain run about $20 to $30
                            a month, and you can pay those directly. You own your website and your
                            domain.
                        </p>
                    </div>
                </section>

                {/* ───── GUARANTEE ───── */}
                <section className="py-20 px-6 bg-dark text-white relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20"><ShieldCheck size={40} strokeWidth={2} /></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">What happens if I want to leave?</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
                            You take the site with you. You own the website and the domain, and
                            both transfer to you on request at no charge. Care and Local SEO are
                            month to month, so you can stop after any month.
                        </p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">
                            Month-to-Month • Cancel Anytime
                        </div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Questions Clovis owners ask before they call</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-light overflow-hidden">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg text-dark hover:bg-gray-50 transition-colors">
                                        {faq.question}
                                        {openFaq === i ? <ChevronUp size={20} className="text-orange shrink-0 ml-4" /> : <ChevronDown size={20} className="text-gray/40 shrink-0 ml-4" />}
                                    </button>
                                    <motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0 }} className="overflow-hidden">
                                                <div className="px-8 pb-8 text-gray font-medium leading-relaxed">{faq.answer}</div>
                                            </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
