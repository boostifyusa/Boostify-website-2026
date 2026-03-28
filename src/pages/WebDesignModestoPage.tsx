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
    X
} from 'lucide-react';

// FAQ Data
const faqs = [
    {
        question: 'What makes you different from other Modesto web design agencies?',
        answer:
            "Most agencies use bloated drag-and-drop templates like WordPress or Wix that slow down your site and limit brand creativity. We use a combination of expert hand-coding and advanced AI to build your site from scratch. This delivers premium websites cheaper and faster for small business owners, guaranteeing lightning-fast load times, better Google rankings, and a completely unique Brand Website Design that sets your Modesto business apart."
    },
    {
        question: 'Do you offer Ecommerce Web Design?',
        answer:
            "Yes! As a complete Ecommerce Web Design Agency, we build high-converting online stores. Whether you need a Shopify setup or a fully custom headless commerce solution, we ensure the buying process is frictionless and optimized for sales."
    },
    {
        question: 'Do you build bilingual sites or offer Diseño Web services?',
        answer:
            "Absolutely. The Central Valley has a massive Spanish-speaking population. We offer 'Diseño Web' (web design) services and can build fully bilingual English/Spanish websites to help you capture a broader local market."
    },
    {
        question: 'How much does a custom website cost in Modesto?',
        answer:
            "Our bespoke custom websites start at $1,995. If you're looking for a faster turnaround or have a strict budget, we offer highly optimized template-based sites starting at $649. We focus on ROI: your website should generate more revenue than it costs."
    },
    {
        question: 'Will my website work well on mobile phones?',
        answer:
            "Yes. Over 70% of local Modesto traffic comes from mobile devices. We design 'mobile-first', meaning your site will look and function flawlessly on iPhones, Androids, and tablets before we even look at the desktop version."
    }
];

// JSON-LD Schema
const advertiserSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Boostify USA Web Design & SEO",
    "url": "https://boostifyusa.com/modesto-web-design",
    "description": "Premium Website Design Modesto. Top web design agency building fast, custom, ecommerce, and brand websites for Stanislaus County.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
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
        { "@type": "City", "name": "Modesto" },
        { "@type": "City", "name": "Turlock" },
        { "@type": "City", "name": "Ceres" },
        { "@type": "City", "name": "Oakdale" }
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Design Services",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Design Modesto" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ecommerce Web Design Agency" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Website Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diseño Web" } }
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

export function WebDesignModestoPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title="Website Design Modesto | Top Web Design Agencies | Boostify USA"
                description="Looking for Website Design in Modesto? We are a top web design agency specializing in Ecommerce, Brand Website Design, and Diseño Web."
                canonicalUrl="/modesto-web-design"
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
                            Ranked Among Top Web Design Agencies
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-dark leading-[0.95] tracking-tighter mb-6">
                                Website Design<br />
                                <span className="relative inline-block px-2 isolate">
                                    <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
                                    <span className="text-orange relative z-10">Modesto.</span>
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray font-medium leading-relaxed max-w-2xl mb-10"
                        >
                            We combine expert hand-coding and AI to build affordable websites that turn Modesto traffic into customers. Faster load times. Better SEO. More revenue.
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
                                Local Support
                            </span>
                            <span className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" strokeWidth={3} />
                                High Conversion
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
                                Most Modesto Websites Are {' '}
                                <span className="text-red-500">Invisible!</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">
                                DIY builders and cheap templates from typical agencies are costing your local business money. If your Modesto site isn't actively working for you, it's working against you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Mobile Abandonment',
                                    desc: "Shoppers in Stanislaus County use their phones first. If your website takes more than a few seconds to load, you've already lost the sale.",
                                    icon: Clock
                                },
                                {
                                    title: 'Buried in Search',
                                    desc: "Without dedicated Modesto local SEO structures, Google won't show your business for 'near me' queries. You're losing market share to local competitors.",
                                    icon: Search
                                },
                                {
                                    title: 'Outdated Branding',
                                    desc: "A stale design makes your company look untrustworthy. An instant visual impact is required to capture modern Modesto consumer attention.",
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
                                    alt="Premium Custom Website Design Example"
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
                                Custom Solutions for <br />
                                <span className="text-orange">Local Leaders.</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">
                                We don't believe in one-size-fits-all. Every line of code is forged by expert developers and AI to solve specific business problems affordably, generating measurable ROI for your Modesto company.
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
                                <h3 className="text-3xl font-black text-dark tracking-tight mb-4">Brand Website Design</h3>
                                <p className="text-lg text-gray font-medium leading-relaxed mb-8 flex-1">
                                    Your website is your 24/7 digital storefront. We craft bespoke brand identities and stunning visual layouts that make your local business instantly trusted and memorable to Modesto residents.
                                </p>
                                <ul className="space-y-3 mt-auto">
                                    {['Custom Styling & Typography', 'Premium Asset Integration', 'Conversion Optimized Layouts'].map((item, i) => (
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
                                <h3 className="text-3xl font-black text-dark tracking-tight mb-4">Ecommerce Web Design Agency</h3>
                                <p className="text-lg text-gray font-medium leading-relaxed mb-8 flex-1">
                                    Frictionless checkouts, high-resolution product galleries, and robust inventory management. We build fast online stores designed to turn browsers into buyers instantly.
                                </p>
                                <ul className="space-y-3 mt-auto">
                                    {['Shopify & Custom Solutions', 'Secure Payment Gateways', 'Abandoned Cart Recovery'].map((item, i) => (
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
                                The Boostify <span className="text-orange">Difference.</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">Why settle for a slow, bloated template when you can have an AI-accelerated, handcrafted revenue-generating engine?</p>
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
                                <h3 className="text-3xl font-black text-dark tracking-tight mb-4">Off-The-Shelf Builders</h3>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {[
                                        'Heavy theme files slowing down performance',
                                        'Frustrating mobile navigation',
                                        'Designs that blend in with every other site',
                                        'Constant need for security patches',
                                        'Hidden fees for premium plugins'
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
                                <h3 className="text-3xl font-black text-white tracking-tight mb-4 relative z-10">Bespoke Architecture</h3>
                                <ul className="space-y-4 mb-8 flex-1 relative z-10">
                                    {[
                                        'Code specifically tailored to your business',
                                        'Instant page transitions and routing',
                                        'Unique visual assets establishing authority',
                                        'Seamless cross-device experiences',
                                        'Built-in modern performance best practices'
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
                                        <Globe2 size={16} /> Modesto Digital Marketing
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tighter">
                                        Dominate the <br /> Central Valley.
                                    </h2>
                                    <p className="text-lg font-medium text-white/90 mb-10 leading-relaxed max-w-md">
                                        Whether you need a high-end corporate build or targeted <strong>Diseño Web</strong> for the bilingual market, we craft the tools that drive revenue.
                                    </p>
                                    <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange font-bold rounded-lg hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-1">
                                        Get Your Free Proposal
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { title: 'Local Focus', desc: 'We know Modesto, Ceres, and Turlock search behaviors.' },
                                        { title: 'Bilingual Reach', desc: 'Capture Spanish-speakers with native Diseño Web.' },
                                        { title: 'Zero Lock-In', desc: 'You own your code. No holding your business hostage.' }
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
                            Modesto Web Design FAQ
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
