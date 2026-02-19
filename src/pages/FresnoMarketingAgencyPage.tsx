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
    DollarSign
} from 'lucide-react';

// FAQ Data
const faqs = [
    {
        question: 'Why should I hire a Fresno marketing agency vs. a big-city firm?',
        answer:
            "A local agency understands the Central Valley market. We know your customers, your competitors, and the seasonal rhythms of this area. Big-city agencies charge more and treat you like a number. We treat you like a neighbor — because you are one."
    },
    {
        question: 'How much does it cost to work with Boostify USA?',
        answer:
            "Every project is different. Custom web design starts at $1,995 and template-based sites start at $649. Our Local SEO packages start at $595/mo with AI-powered tools, and we're launching a Local SEO Lite plan in March at just $249/mo that includes hosting, web design, and maintenance. We'll build a plan based on your goals and budget — never a cookie-cutter package."
    },
    {
        question: 'How long until I see results from local SEO?',
        answer:
            "SEO is a long-term investment. You'll typically see movement in 3-4 months, with significant traffic growth around months 6-9. Paid ads deliver leads within 48 hours. We recommend a combined approach for immediate and lasting results."
    },
    {
        question: 'Do you work with businesses outside of Fresno?',
        answer:
            'Yes! While we specialize in the Central Valley — Fresno, Clovis, Visalia, Madera, and beyond — we work with businesses across California and nationally. Our roots are local, but our expertise scales.'
    },
    {
        question: 'What makes Boostify different from other digital marketing companies?',
        answer:
            "We're not a template factory. Every website is custom-coded, every SEO campaign is hand-built, and every ad dollar is tracked. No fluff, no bloat, no long-term contracts. Just receipts."
    }
];

// AdvertisingAgency JSON-LD Schema
const advertiserSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Boostify USA",
    "url": "https://boostifyusa.com/fresno-marketing-agency",
    "description": "Premier Fresno marketing agency specializing in custom web design, local SEO, and digital advertising strategies.",
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
        { "@type": "City", "name": "Fresno" },
        { "@type": "City", "name": "Clovis" },
        { "@type": "City", "name": "Visalia" },
        { "@type": "City", "name": "Madera" },
        { "@type": "City", "name": "Hanford" },
        { "@type": "City", "name": "Merced" },
        { "@type": "City", "name": "Tulare" },
        { "@type": "City", "name": "Sanger" }
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
    "logo": "https://boostifyusa.com/icon.png"
};

// FAQ Schema for SEO
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

export function FresnoMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title="Marketing Agency Fresno | Digital Advertising & SEO | Boostify USA"
                description="Boostify USA is the top-rated Fresno marketing agency. We specialize in custom web design, Local SEO, and Google Ads to drive revenue for local businesses."
                canonicalUrl="/fresno-marketing-agency"
            />
            {/* AdvertisingAgency Schema */}
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
                {/* Hero Section */}
                <section className="px-6 relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
                    {/* Topographic Background Pattern */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.35]"
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
                            background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)'
                        }} />

                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 -translate-y-1/4" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange/[0.03] rounded-full blur-[80px] -z-10 translate-x-1/4 translate-y-1/4" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}>

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                                Marketing Agency Fresno
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Fresno's Growth <span className="text-orange">Starts Here.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Boostify USA is a full-service advertising agency built for local
                                businesses. From custom website design to Local SEO services and
                                Google Ads — we drive real revenue, not vanity metrics.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                    Get Your Free Strategy Call
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                                <Link
                                    to="/seo-audit"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                    Free SEO Audit
                                </Link>
                            </div>

                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2">
                                    <Check size={16} className="text-green-500" strokeWidth={3} />
                                    Google Certified
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check size={16} className="text-green-500" strokeWidth={3} />
                                    Fresno-Based
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check size={16} className="text-green-500" strokeWidth={3} />
                                    No Contracts
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative">

                            {/* Floating badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -top-4 -right-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <TrendingUp size={16} className="text-green-600" strokeWidth={3} />
                                </div>
                                <div>
                                    <div className="text-xs font-black text-dark leading-none">Central Valley</div>
                                    <div className="text-[10px] text-gray font-medium">#1 Agency</div>
                                </div>
                            </motion.div>


                            {/* Hero Graphic: Multi-Service Dashboard */}
                            <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10 p-6 aspect-[4/3] flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2">
                                        <Megaphone size={16} className="text-orange" />
                                        <span className="text-white/60 text-xs font-bold uppercase tracking-wider">
                                            Growth Dashboard
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-green-400 text-xs font-bold">LIVE</span>
                                    </div>
                                </div>

                                {/* Metrics Row */}
                                <div className="grid grid-cols-3 gap-2 mb-5">
                                    {[
                                        { label: 'Organic Traffic', value: '+127%', color: 'text-green-400' },
                                        { label: 'Leads/Month', value: '84', color: 'text-white' },
                                        { label: 'ROAS', value: '4.2x', color: 'text-orange' }
                                    ].map((metric, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                                            <div className={`font-black text-lg leading-none mb-1 ${metric.color}`}>
                                                {metric.value}
                                            </div>
                                            <div className="text-white/30 text-[8px] font-bold uppercase tracking-wider">
                                                {metric.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Channel Performance */}
                                <div className="space-y-2.5 mb-5 flex-1">
                                    {[
                                        { channel: 'Google Ads', leads: '32', trend: '+18%', bar: '75%', color: 'bg-orange' },
                                        { channel: 'Local SEO', leads: '28', trend: '+34%', bar: '65%', color: 'bg-green-500' },
                                        { channel: 'Website', leads: '24', trend: '+22%', bar: '55%', color: 'bg-blue-500' }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white/80 text-sm font-medium">{item.channel}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-white text-xs font-bold">{item.leads} leads</span>
                                                    <span className="text-green-400 text-[10px] font-bold">{item.trend}</span>
                                                </div>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.bar }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-lg">
                                        84 Leads{' '}
                                        <span className="text-white/40 font-medium text-sm">This Month</span>
                                    </div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1">
                                        <TrendingUp size={14} /> +26%
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-10 -right-10 w-full h-full bg-orange/5 rounded-3xl -z-10 hidden lg:block" />
                        </motion.div>
                    </div>
                </section>

                <TrustBadges />

                {/* Pain Points Section */}
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
                                Is Your Digital Marketing Company <br />
                                <span className="text-red-500">Actually Working?</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">
                                Most Fresno businesses are paying for marketing that doesn't
                                deliver. If any of these sound familiar, it's time for a change.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Invisible on Google',
                                    desc: "You're paying for SEO but you still can't find yourself on page one. 92% of clicks go to the first page — if you're not there, you don't exist.",
                                    icon: Search
                                },
                                {
                                    title: 'Burning Ad Budget',
                                    desc: "Your Google Ads are running but leads aren't coming. Without proper targeting and conversion tracking, you're paying for clicks that never convert.",
                                    icon: DollarSign
                                },
                                {
                                    title: 'Template Website',
                                    desc: "Your website looks like every other business in Fresno. A cookie-cutter template doesn't build trust or convert visitors into paying customers.",
                                    icon: Globe
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-light hover:shadow-md transition-all">
                                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-6">
                                        <item.icon size={24} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                                    <p className="text-gray font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefit 1: Data-Driven Advertising */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                                    <Target size={24} strokeWidth={2.5} />
                                </div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                                    Data-Driven Advertising Strategies for Local Business
                                </h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    As a full-service advertising agency, we build laser-focused Google
                                    Ads and Local Service Ads campaigns that target the exact customers
                                    searching for your services in Fresno and the Central Valley.
                                    Every dollar is tracked, optimized, and working hard.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Geo-targeted campaigns for Fresno & Clovis',
                                        'Google Guaranteed badge setup',
                                        'Full conversion tracking & reporting',
                                        'A/B tested ad copy & landing pages'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark">
                                            <Check size={18} className="text-green-500" strokeWidth={3} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="order-1 lg:order-2 bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                                {/* Campaign Performance Dashboard */}
                                <div className="flex items-center gap-2 mb-6">
                                    <MousePointerClick size={20} className="text-orange" />
                                    <span className="text-white font-bold text-lg">Campaign Performance</span>
                                </div>

                                {/* Big Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Ad Spend</div>
                                        <div className="text-white font-black text-2xl">$1,850</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Revenue</div>
                                        <div className="text-green-400 font-black text-2xl">$7,770</div>
                                    </div>
                                </div>

                                {/* Funnel */}
                                <div className="space-y-3 mb-6 flex-1">
                                    {[
                                        { label: 'Impressions', value: '18,340', bar: '100%', color: 'bg-white/15' },
                                        { label: 'Clicks', value: '1,284', bar: '60%', color: 'bg-white/25' },
                                        { label: 'Leads', value: '112', bar: '30%', color: 'bg-orange/60' },
                                        { label: 'Customers', value: '38', bar: '15%', color: 'bg-orange' }
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-white/50 text-xs font-medium">{item.label}</span>
                                                <span className="text-white font-bold text-xs">{item.value}</span>
                                            </div>
                                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.bar }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-xl">
                                        4.2x{' '}
                                        <span className="text-white/40 font-medium text-sm">Return on Ad Spend</span>
                                    </div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1">
                                        <TrendingUp size={14} /> +28%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefit 2: Local SEO & Map Pack */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl border border-white shadow-2xl overflow-hidden relative z-10 aspect-square flex flex-col p-3 md:p-4">
                                <div className="bg-white border border-gray-100 rounded-full px-4 py-3 flex items-center gap-3 mb-4 shadow-sm z-20">
                                    <Search size={18} className="text-gray-400" />
                                    <span className="text-dark font-medium">marketing agency fresno</span>
                                    <div className="w-px h-5 bg-gray-200 ml-auto" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Local</span>
                                    </div>
                                </div>

                                <div className="flex-1 bg-white rounded-2xl relative overflow-hidden border border-gray-100 flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-[0.05] select-none pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                                    <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M-10 40 Q 30 30 50 50 T 110 60" stroke="#000" strokeWidth="2" fill="none" />
                                        <path d="M40 -10 Q 50 30 50 50 T 60 110" stroke="#000" strokeWidth="2" fill="none" />
                                    </svg>

                                    <div className="grid grid-cols-7 gap-1.5 md:gap-3 relative z-10 p-4">
                                        {Array.from({ length: 49 }).map((_, i) => {
                                            const row = Math.floor(i / 7);
                                            const col = i % 7;
                                            const dist = Math.sqrt(Math.pow(row - 3, 2) + Math.pow(col - 3, 2));

                                            let rank, colorClass;

                                            if (dist < 4) {
                                                rank = Math.floor(Math.random() * 2) + 1;
                                                colorClass = "bg-green-500 text-white shadow-green-500/20";
                                            } else {
                                                rank = Math.floor(Math.random() * 3) + 2;
                                                colorClass = rank > 3
                                                    ? "bg-orange text-white shadow-orange/20"
                                                    : "bg-green-500 text-white shadow-green-500/20";
                                            }

                                            if (row === 3 && col === 3) {
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.5, type: "spring" }}
                                                        className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 border-gray-100 shadow-xl flex items-center justify-center z-20"
                                                    >
                                                        <MapPin size={14} className="text-dark" fill="currentColor" />
                                                    </motion.div>
                                                );
                                            }

                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    whileInView={{ scale: 1, opacity: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: dist * 0.05, type: "spring", stiffness: 200 }}
                                                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${colorClass} shadow-lg flex items-center justify-center text-[10px] md:text-xs font-bold border border-white/50`}
                                                >
                                                    {rank}
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    <div className="absolute bottom-4 z-30 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-xl border border-gray-100 flex items-center gap-3 transition-transform hover:scale-105 cursor-default">
                                        <div className="w-10 h-10 bg-orange/10 rounded-lg shrink-0 flex items-center justify-center">
                                            <span className="text-orange font-black text-sm">B</span>
                                        </div>
                                        <div>
                                            <div className="text-xs font-black text-dark mb-0.5">Boostify USA</div>
                                            <div className="flex items-center gap-1">
                                                <div className="flex text-yellow-500 font-black gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={8} fill="currentColor" />
                                                    ))}
                                                </div>
                                                <span className="text-[9px] text-gray-500 font-bold">5.0 (48)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
                                </div>
                            </div>

                            <div>
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                                    <BarChart3 size={24} strokeWidth={2.5} />
                                </div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                                    Local SEO & Map Pack Optimization
                                </h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    Our local SEO services put your business at the top of Google Maps
                                    and organic search results. When someone in Fresno searches for
                                    your services, you show up first — not your competitors.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Google Business Profile optimization',
                                        'Hyper-local keyword targeting',
                                        'Citation building & management',
                                        'Monthly ranking reports'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark">
                                            <Check size={18} className="text-green-500" strokeWidth={3} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Custom Web Design That Converts */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto">
                                <Globe size={24} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                Custom Web Design That <span className="text-orange">Converts</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">
                                Your custom website design isn't just a digital brochure — it's your hardest-working
                                salesperson. We build fast, mobile-first, conversion-optimized websites that turn
                                visitors into paying customers.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Zap,
                                    title: 'Lightning Fast',
                                    desc: 'Sub-2-second load times. Google rewards speed with higher rankings and visitors stay longer.'
                                },
                                {
                                    icon: Phone,
                                    title: 'Mobile-First Design',
                                    desc: '70% of your traffic comes from phones. Every pixel is designed for the device your customers actually use.'
                                },
                                {
                                    icon: Target,
                                    title: 'Built to Convert',
                                    desc: 'Strategic CTAs, trust signals, and user flows designed to turn visitors into leads and leads into customers.'
                                },
                                {
                                    icon: ShieldCheck,
                                    title: 'Secure & Maintained',
                                    desc: 'SSL certificates, daily backups, and ongoing maintenance. Your site is protected and always running.'
                                },
                                {
                                    icon: Search,
                                    title: 'SEO-Ready Foundation',
                                    desc: 'Every page is built with clean code, proper schema, and SEO best practices baked in from day one.'
                                },
                                {
                                    icon: BarChart3,
                                    title: 'Analytics & Tracking',
                                    desc: 'Know exactly where your leads come from. Full Google Analytics and conversion tracking setup included.'
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
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

                {/* Serving Fresno, Clovis, and the Central Valley */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto">
                                <MapPin size={24} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                Serving Fresno, Clovis, and the <span className="text-orange">Central Valley</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">
                                We're not some remote agency guessing about your market. We're based in Fresno,
                                and we understand the Central Valley. That local knowledge is our unfair advantage
                                as your digital marketing company.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { city: 'Fresno', path: '/fresno-marketing-agency', highlight: true },
                                { city: 'Clovis', path: '/clovis-marketing-agency', highlight: false },
                                { city: 'Visalia', path: '/visalia-marketing-agency', highlight: false },
                                { city: 'Madera', path: '/madera-marketing-agency', highlight: false },
                                { city: 'Hanford', path: '/hanford-marketing-agency', highlight: false },
                                { city: 'Merced', path: '/merced-marketing-agency', highlight: false },
                                { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
                                { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}>
                                    {item.highlight ? (
                                        <div className="p-6 rounded-2xl border text-center bg-orange text-white border-orange shadow-lg shadow-orange/20">
                                            <Building2 size={24} className="mx-auto mb-3 text-white" strokeWidth={2.5} />
                                            <div className="text-lg font-black mb-1 text-white">{item.city}</div>
                                            <div className="text-sm font-medium text-white/80">Home Base</div>
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

                {/* Guarantee Section */}
                <section className="py-20 px-6 bg-dark text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20">
                            <ShieldCheck size={40} strokeWidth={2} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                            The "Love It" Guarantee
                        </h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
                            We're confident in our craft. If you don't love the results we
                            deliver, we'll keep working until you do, or you don't pay a dime.
                            That's the Boostify promise — not a contract, a commitment.
                        </p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">
                            No Risk • 100% Satisfaction
                        </div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* FAQ Section */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">
                            Common Questions
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
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                exit={{ height: 0 }}
                                                className="overflow-hidden">
                                                <div className="px-8 pb-8 text-gray font-medium leading-relaxed">
                                                    {faq.answer}
                                                </div>
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
