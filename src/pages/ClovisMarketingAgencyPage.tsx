import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
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
    Users,
    Zap,
    Building2,
    DollarSign,
    HeartHandshake
} from 'lucide-react';

// FAQ Data — Clovis-specific
const faqs = [
    {
        question: 'Why choose a marketing agency near Clovis instead of a national firm?',
        answer:
            'A local team knows the Clovis market — from Old Town foot traffic to the new developments along Willow and Herndon. National firms rely on generic playbooks. We build campaigns rooted in how people actually search and buy in the Central Valley.'
    },
    {
        question: 'What marketing services do you offer Clovis businesses?',
        answer:
            'We offer the full stack: custom website design, Local SEO to dominate Google Maps, Google Ads management, social media strategy, and brand identity. Every service is tailored to your specific industry and local competition.'
    },
    {
        question: 'How quickly can I expect to see results?',
        answer:
            "Paid advertising (Google Ads, Local Service Ads) generates leads within days. SEO builds momentum over 3-6 months, compounding month over month. We recommend a combined approach so you're winning now and building for later."
    },
    {
        question: 'Do you require long-term contracts?',
        answer:
            "Never. We earn your business every single month. No lock-in contracts, no cancellation fees. If we're not delivering results, you shouldn't be stuck paying us."
    },
    {
        question: 'Can you help a brand-new Clovis business get started online?',
        answer:
            'Absolutely. We specialize in launching new businesses with a complete digital presence — logo, website, Google Business Profile, SEO foundation, and initial ad campaigns. We get you visible fast.'
    }
];

// AdvertisingAgency JSON-LD Schema — Clovis
const advertiserSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Boostify USA",
    "url": "https://boostifyusa.com/clovis-marketing-agency",
    "description": "Leading Clovis marketing agency delivering custom web design, local SEO, and targeted digital advertising for Central Valley businesses.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr Ste 118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.8250248,
        "longitude": -119.8684005
    },
    "areaServed": [
        { "@type": "City", "name": "Clovis" },
        { "@type": "City", "name": "Fresno" },
        { "@type": "City", "name": "Visalia" },
        { "@type": "City", "name": "Madera" }
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Marketing Services",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Design" } }
        ]
    },
    "priceRange": "$$",
    "telephone": "+1-559-785-3834",
    "contactPoint": [
        { "@type": "ContactPoint", "telephone": "+1-559-785-3834", "contactType": "sales" },
        { "@type": "ContactPoint", "telephone": "+1-559-201-8706", "contactType": "customer service" }
    ],
    "email": "hello@boostifyusa.com",
    "logo": "https://boostifyusa.com/icon.png",
    "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"], "opens": "09:00", "closes": "19:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "17:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "12:00" }
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

// City cross-link data
const areaCities = [
    { city: 'Fresno', path: '/fresno-marketing-agency', highlight: false },
    { city: 'Clovis', path: '/clovis-marketing-agency', highlight: true },
    { city: 'Visalia', path: '/visalia-marketing-agency', highlight: false },
    { city: 'Madera', path: '/madera-marketing-agency', highlight: false },
    { city: 'Hanford', path: '/hanford-marketing-agency', highlight: false },
    { city: 'Merced', path: '/merced-marketing-agency', highlight: false },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
];

export function ClovisMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title="Clovis Marketing Agency: Attract More Local Customers"
                description="Boostify USA is a top Clovis marketing agency specializing in custom web design, Local SEO, and Google Ads. We help Clovis businesses grow with data-driven strategies."
                canonicalUrl="/clovis-marketing-agency"
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(advertiserSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
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
                                Clovis Marketing Agency
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Clovis Roots. <span className="text-orange">Real Results.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Clovis businesses deserve a marketing team that understands the
                                community, not a faceless agency across the country. Boostify USA
                                builds custom digital strategies — from web design to local
                                advertising — that drive measurable revenue.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                    Get a Free Consultation
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                                <Link to="/seo-audit" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                    Free SEO Audit
                                </Link>
                            </div>

                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Central Valley Based</span>
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
                                    <div className="text-xs font-black text-dark leading-none">Family Owned</div>
                                    <div className="text-[10px] text-gray font-medium">Community First</div>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                                className="absolute -bottom-4 -right-4 z-20 bg-dark rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><TrendingUp size={16} className="text-green-400" strokeWidth={3} /></div>
                                <div>
                                    <div className="text-xs font-black text-white leading-none">+156%</div>
                                    <div className="text-[10px] text-white/50 font-medium">Avg. Traffic Growth</div>
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
                                            let rank: number, colorClass: string;
                                            if (dist < 3.5) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
                                            else if (dist < 5) { rank = Math.floor(Math.random() * 2) + 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
                                            else { rank = Math.floor(Math.random() * 3) + 3; colorClass = "bg-orange text-white shadow-orange/20"; }
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
                                                <span className="text-[9px] text-gray-500 font-bold">5.0 (48)</span>
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
                                Clovis Businesses Are <span className="text-red-500">Losing Customers Online</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">
                                Your neighbors are searching for your services right now. If they
                                can't find you, they're finding your competitor.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Stuck Below the Fold', desc: "Your competitors rank above you on Google Maps and search results. Every position you drop is a customer you lose to the shop down the street.", icon: Search },
                                { title: "Website Doesn't Convert", desc: "Traffic means nothing if visitors leave without calling. A slow, outdated, or confusing website is silently costing you thousands in missed revenue.", icon: Globe },
                                { title: 'No Tracking, No Proof', desc: "You're spending on marketing but have no idea what's working. Without proper analytics and call tracking, you're flying blind.", icon: BarChart3 },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-light hover:shadow-md transition-all">
                                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-6"><item.icon size={24} strokeWidth={2.5} /></div>
                                    <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                                    <p className="text-gray font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── BENEFIT 1: Custom Web Design (leads for Clovis) ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><Globe size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                                    Custom Website Design Built for Clovis Businesses
                                </h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    Forget cookie-cutter templates. We hand-code every website to
                                    reflect your brand, convert your visitors, and outperform your
                                    competition. Fast, mobile-first, and designed to make you look
                                    as professional as you are.
                                </p>
                                <ul className="space-y-3">
                                    {['100% custom — no templates, ever', 'Mobile-optimized for on-the-go customers', 'Built-in SEO foundation from day one', 'Conversion-focused layouts & CTAs'].map((item, i) => (
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
                                        { keyword: '"marketing agency clovis"', rank: '#1', trend: '↑ 4', color: 'bg-green-500' },
                                        { keyword: '"web design clovis ca"', rank: '#2', trend: '↑ 7', color: 'bg-green-500' },
                                        { keyword: '"seo company clovis"', rank: '#1', trend: '↑ 3', color: 'bg-green-500' },
                                        { keyword: '"digital advertising central valley"', rank: '#3', trend: '↑ 5', color: 'bg-orange' },
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
                                    Local SEO That Puts Clovis Businesses on the Map
                                </h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    When someone in Clovis searches for your services, you need to
                                    be the first result — in the Map Pack and in organic results.
                                    Our local SEO strategies are built specifically for the Central
                                    Valley market.
                                </p>
                                <ul className="space-y-3">
                                    {['Google Business Profile optimization', 'Local citation building & cleanup', 'Review generation strategy', 'Hyper-targeted keyword campaigns'].map((item, i) => (
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
                                Google Ads & Paid Advertising <span className="text-orange">That Delivers</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">
                                Stop wasting ad budget on clicks that never convert. Our digital
                                advertising campaigns are laser-targeted to Clovis and the
                                surrounding area, with every dollar tracked and optimized for
                                maximum return.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Target, title: 'Precision Targeting', desc: 'Geo-fenced campaigns that reach customers in Clovis, Fresno, and surrounding zip codes — not wasted on irrelevant areas.' },
                                { icon: DollarSign, title: 'Transparent ROI', desc: 'Real-time dashboards showing exactly how your ad spend translates into leads and revenue. No smoke and mirrors.' },
                                { icon: Zap, title: 'Fast Results', desc: 'Leads start flowing within 48 hours of campaign launch. We optimize daily to improve performance and lower cost-per-lead.' },
                                { icon: Phone, title: 'Call Tracking', desc: 'Every phone call from your ads is recorded, attributed, and analyzed. Know exactly which campaigns drive real business.' },
                                { icon: Megaphone, title: 'Multi-Platform Reach', desc: 'Google Search Ads, Display, Local Service Ads, and remarketing — we meet your customers wherever they are online.' },
                                { icon: ShieldCheck, title: 'Google Certified Team', desc: 'Our strategists hold active Google Ads certifications. Your campaigns are managed by certified professionals, not interns.' },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-light hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 group-hover:bg-orange group-hover:text-white transition-colors">
                                        <item.icon size={24} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                                    <p className="text-gray font-medium leading-relaxed">{item.desc}</p>
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
                                Proud to Serve Clovis & the <span className="text-orange">Central Valley</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">
                                From Old Town Clovis to the new developments off Ashlan and
                                Temperance, we know this community. That local insight powers
                                smarter marketing strategies for every city we serve.
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

                {/* ───── GUARANTEE ───── */}
                <section className="py-20 px-6 bg-dark text-white relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20"><ShieldCheck size={40} strokeWidth={2} /></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Our "No Fine Print" Promise</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
                            No long-term contracts. No hidden fees. No agency jargon. If we
                            don't deliver measurable results for your Clovis business, you
                            walk away — simple as that.
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
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-light overflow-hidden">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg text-dark hover:bg-gray-50 transition-colors">
                                        {faq.question}
                                        {openFaq === i ? <ChevronUp size={20} className="text-orange shrink-0 ml-4" /> : <ChevronDown size={20} className="text-gray/40 shrink-0 ml-4" />}
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                                <div className="px-8 pb-8 text-gray font-medium leading-relaxed">{faq.answer}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
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
