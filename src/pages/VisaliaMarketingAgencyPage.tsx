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
    Check, ChevronDown, ChevronUp, ShieldCheck, AlertTriangle, MapPin, TrendingUp,
    BarChart3, Star, Phone, ArrowRight, Search, Target, Globe, Megaphone,
    MousePointerClick, Users, Zap, Building2, DollarSign, Sprout
} from 'lucide-react';

const faqs = [
    { question: 'What kind of businesses in Visalia do you work with?', answer: 'We partner with service-based businesses, retail shops, medical practices, restaurants, and professional firms throughout Tulare County. If you serve local customers, our strategies are built for you.' },
    { question: 'How is Boostify different from other Visalia marketing companies?', answer: "We're not a template shop. Every website is hand-coded, every SEO campaign is custom-built, and every ad dollar is tracked to revenue. We operate on results, not promises — and we never lock you into a contract." },
    { question: 'Do I need a new website, or can you improve my current one?', answer: "Both. If your current site is structurally sound, we can optimize it for speed, SEO, and conversions. If it's outdated or template-based, a custom rebuild will deliver dramatically better results." },
    { question: 'How much should a Visalia business spend on digital marketing?', answer: 'It depends on your goals and competition. Most of our Tulare County clients invest $1,000–$3,000/month across SEO and ads. We always start with a free strategy call to find the right fit for your budget.' },
    { question: 'Can you manage our social media too?', answer: 'Yes. While our core strengths are SEO, Google Ads, and web design, we offer social media management as an add-on service. We focus on platforms that actually drive business — not just vanity likes.' },
];

const advertiserSchema = {
    "@context": "https://schema.org", "@type": "AdvertisingAgency",
    "name": "Boostify USA", "url": "https://boostifyusa.com/visalia-marketing-agency",
    "description": "Visalia's premier marketing agency offering custom web design, local SEO, and paid advertising for Tulare County businesses.",
    "address": { "@type": "PostalAddress", "streetAddress": "6362 N Figarden Dr Ste 118", "addressLocality": "Fresno", "addressRegion": "CA", "postalCode": "93722", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": 36.8250248, "longitude": -119.8684005 },
    "areaServed": [{ "@type": "City", "name": "Visalia" }, { "@type": "City", "name": "Tulare" }, { "@type": "City", "name": "Fresno" }, { "@type": "City", "name": "Hanford" }],
    "hasOfferCatalog": {
        "@type": "OfferCatalog", "name": "Digital Marketing Services", "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Design" } }
        ]
    }, "priceRange": "$$"
};
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };

const areaCities = [
    { city: 'Fresno', path: '/fresno-marketing-agency', highlight: false },
    { city: 'Clovis', path: '/clovis-marketing-agency', highlight: false },
    { city: 'Visalia', path: '/visalia-marketing-agency', highlight: true },
    { city: 'Madera', path: '/madera-marketing-agency', highlight: false },
    { city: 'Hanford', path: '/hanford-marketing-agency', highlight: false },
    { city: 'Merced', path: '/merced-marketing-agency', highlight: false },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
];

export function VisaliaMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead title="Marketing Agency Visalia CA | SEO & Web Design | Boostify USA" description="Boostify USA is a leading Visalia marketing agency. Custom web design, local SEO, and Google Ads that drive real growth for Tulare County businesses." canonicalUrl="/visalia-marketing-agency" />
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(advertiserSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>
            <Navigation />

            <main>
                {/* ───── HERO ───── */}
                <section className="px-6 relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{ backgroundImage: 'url(/hero-bg-pattern.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)' }} />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/4" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                                Visalia Marketing Agency
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Visalia Deserves <span className="text-orange">Better Marketing.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Tulare County businesses need marketing that works as hard as they
                                do. Boostify USA delivers custom websites, dominant local SEO, and
                                paid advertising campaigns that turn searches into sales.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                    Start Your Free Strategy Call <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                                <Link to="/seo-audit" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                    Free SEO Audit
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Tulare County Experts</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> No Long-Term Contracts</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Data-Driven</span>
                            </div>
                        </motion.div>

                        {/* Hero Graphic: Conversion Funnel (unique to Visalia) */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -top-4 -right-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><Sprout size={16} className="text-green-600" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-dark leading-none">Tulare County</div><div className="text-[10px] text-gray font-medium">Growth Leader</div></div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                                className="absolute -bottom-4 -left-4 z-20 bg-dark rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center"><DollarSign size={16} className="text-orange" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-white leading-none">$2.4M+</div><div className="text-[10px] text-white/50 font-medium">Revenue Generated</div></div>
                            </motion.div>

                            <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10 p-6 aspect-[4/3] flex flex-col">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2"><Target size={16} className="text-orange" /><span className="text-white/60 text-xs font-bold uppercase tracking-wider">Conversion Pipeline</span></div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-green-400 text-xs font-bold">LIVE</span></div>
                                </div>

                                {/* Funnel Stages */}
                                <div className="flex-1 flex flex-col justify-center gap-3">
                                    {[
                                        { stage: 'Website Visitors', count: '4,280', pct: '100%', width: '100%', color: 'bg-white/10' },
                                        { stage: 'Engaged Visitors', count: '2,890', pct: '67%', width: '75%', color: 'bg-white/15' },
                                        { stage: 'Leads Generated', count: '186', pct: '4.3%', width: '45%', color: 'bg-orange/50' },
                                        { stage: 'Customers Won', count: '52', pct: '28%', width: '25%', color: 'bg-orange' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-28 shrink-0 text-right">
                                                <div className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{item.stage}</div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-8 bg-white/5 rounded-lg overflow-hidden relative">
                                                    <div className={`h-full ${item.color} rounded-lg flex items-center justify-end pr-3`} style={{ width: item.width }}>
                                                        <span className="text-white font-bold text-xs">{item.count}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-12 text-right shrink-0"><span className="text-orange text-xs font-bold">{item.pct}</span></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-lg">52 Customers <span className="text-white/40 font-medium text-sm">This Quarter</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +31%</div>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-full h-full bg-orange/5 rounded-3xl -z-10 hidden lg:block" />
                        </motion.div>
                    </div>
                </section>

                <TrustBadges />

                {/* ───── PAIN POINTS ───── */}
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
                                Is Your Visalia Business <span className="text-red-500">Getting Found Online?</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">Most Tulare County businesses are hemorrhaging potential customers to competitors with better digital presence. Here's why.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Lost in Local Search', desc: "When someone googles your service in Visalia, they find your competitor first. 46% of all Google searches have local intent — if you're not ranking, you're invisible.", icon: MapPin },
                                { title: 'Outdated Online Presence', desc: "Your website was built five years ago and it shows. Slow load times, no mobile optimization, and zero calls-to-action mean visitors bounce before they ever call.", icon: Globe },
                                { title: 'Wasted Ad Spend', desc: "You tried Google Ads once and it 'didn't work.' The truth? Without proper keyword research, negative keywords, and conversion tracking, most ad budgets are wasted.", icon: DollarSign },
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

                {/* ───── BENEFIT 1: Local SEO (leads for Visalia) ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl border border-white shadow-2xl overflow-hidden relative z-10 aspect-square flex flex-col p-3 md:p-4">
                                <div className="bg-white border border-gray-100 rounded-full px-4 py-3 flex items-center gap-3 mb-4 shadow-sm z-20">
                                    <Search size={18} className="text-gray-400" />
                                    <span className="text-dark font-medium">marketing agency visalia</span>
                                    <div className="w-px h-5 bg-gray-200 ml-auto" />
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-xs font-bold text-green-600 uppercase tracking-wider">Local</span></div>
                                </div>
                                <div className="flex-1 bg-white rounded-2xl relative overflow-hidden border border-gray-100 flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-[0.05] select-none pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                                    <div className="grid grid-cols-7 gap-1.5 md:gap-3 relative z-10 p-4">
                                        {Array.from({ length: 49 }).map((_, i) => {
                                            const row = Math.floor(i / 7); const col = i % 7;
                                            const dist = Math.sqrt(Math.pow(row - 3, 2) + Math.pow(col - 3, 2));
                                            let rank: number, colorClass: string;
                                            if (dist < 3) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
                                            else if (dist < 4.5) { rank = Math.floor(Math.random() * 2) + 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
                                            else { rank = Math.floor(Math.random() * 4) + 2; colorClass = rank > 3 ? "bg-orange text-white shadow-orange/20" : "bg-green-500 text-white shadow-green-500/20"; }
                                            if (row === 3 && col === 3) return (<motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 border-gray-100 shadow-xl flex items-center justify-center z-20"><MapPin size={14} className="text-dark" fill="currentColor" /></motion.div>);
                                            return (<motion.div key={i} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: dist * 0.05, type: "spring", stiffness: 200 }} className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${colorClass} shadow-lg flex items-center justify-center text-[10px] md:text-xs font-bold border border-white/50`}>{rank}</motion.div>);
                                        })}
                                    </div>
                                    <div className="absolute bottom-4 z-30 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-xl border border-gray-100 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange/10 rounded-lg shrink-0 flex items-center justify-center"><span className="text-orange font-black text-sm">B</span></div>
                                        <div><div className="text-xs font-black text-dark mb-0.5">Boostify USA</div><div className="flex items-center gap-1"><div className="flex text-yellow-500 gap-0.5">{[...Array(5)].map((_, j) => (<Star key={j} size={8} fill="currentColor" />))}</div><span className="text-[9px] text-gray-500 font-bold">5.0 (48)</span></div></div>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
                                </div>
                            </div>

                            <div>
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><BarChart3 size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Dominate Local Search in Visalia & Tulare County</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">Our local SEO services are engineered to put your Visalia business at the top of Google search and Maps. We target the keywords your customers actually use and optimize every signal Google cares about.</p>
                                <ul className="space-y-3">
                                    {['Google Business Profile optimization & management', 'Keyword research tailored to Tulare County', 'Local link building & citation management', 'Transparent monthly performance reports'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* ───── BENEFIT 2: Paid Advertising ───── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><Target size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Paid Advertising That Pays for Itself</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    Our Google Ads campaigns are built from the ground up for Visalia
                                    and the Central Valley. We focus on high-intent keywords, precise
                                    geo-targeting, and relentless optimization to ensure every dollar
                                    drives measurable results.
                                </p>
                                <ul className="space-y-3">
                                    {['Geo-targeted to Visalia, Tulare, Hanford & beyond', 'Full conversion & call tracking setup', 'Weekly optimization & bid management', 'Real-time reporting dashboard'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="order-1 lg:order-2 bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                                <div className="flex items-center gap-2 mb-6"><MousePointerClick size={20} className="text-orange" /><span className="text-white font-bold text-lg">Ad Campaign Results</span></div>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5"><div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Monthly Spend</div><div className="text-white font-black text-2xl">$2,100</div></div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5"><div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Revenue Driven</div><div className="text-green-400 font-black text-2xl">$9,450</div></div>
                                </div>
                                <div className="space-y-3 mb-6 flex-1">
                                    {[
                                        { label: 'Impressions', value: '22,150', bar: '100%', color: 'bg-white/15' },
                                        { label: 'Clicks', value: '1,540', bar: '55%', color: 'bg-white/25' },
                                        { label: 'Phone Calls', value: '98', bar: '25%', color: 'bg-orange/60' },
                                        { label: 'New Customers', value: '41', bar: '12%', color: 'bg-orange' },
                                    ].map((item, i) => (
                                        <div key={i}><div className="flex items-center justify-between mb-1"><span className="text-white/50 text-xs font-medium">{item.label}</span><span className="text-white font-bold text-xs">{item.value}</span></div>
                                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden"><div className={`h-full ${item.color} rounded-full`} style={{ width: item.bar }} /></div></div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-xl">4.5x <span className="text-white/40 font-medium text-sm">Return on Ad Spend</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +22%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───── WEB DESIGN FEATURES ───── */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto"><Globe size={24} strokeWidth={2.5} /></div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Websites That Work as Hard as <span className="text-orange">You Do</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">Your website should be your best employee — generating leads 24/7. We design and build custom sites that load fast, look incredible, and convert visitors into paying customers.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Zap, title: 'Blazing Performance', desc: 'Sub-2-second load times that keep visitors engaged and boost your Google rankings.' },
                                { icon: Phone, title: 'Mobile-First Always', desc: 'Most of your customers browse on phones. Every design decision starts with mobile.' },
                                { icon: Target, title: 'Conversion Architecture', desc: 'Strategic page flows, CTAs, and trust signals that guide visitors toward action.' },
                                { icon: Search, title: 'SEO Built In', desc: 'Proper heading structure, schema markup, and clean code — SEO isn\'t an afterthought.' },
                                { icon: ShieldCheck, title: 'Secure & Reliable', desc: 'SSL, daily backups, and proactive maintenance keep your site safe and online.' },
                                { icon: Users, title: 'Easy to Manage', desc: 'We train you on simple updates. Need bigger changes? We\'re always a call away.' },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-light hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 group-hover:bg-orange group-hover:text-white transition-colors"><item.icon size={24} strokeWidth={2.5} /></div>
                                    <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                                    <p className="text-gray font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── AREA SERVED ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto"><MapPin size={24} strokeWidth={2.5} /></div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Serving Visalia & the <span className="text-orange">Entire Central Valley</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">We know Tulare County — the agricultural heartbeat, the small-business spirit, and the growth opportunity. Our digital strategies are tuned for this unique market.</p>
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
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20"><ShieldCheck size={40} strokeWidth={2} /></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">The Boostify Guarantee</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">We're in the results business. If you don't see measurable improvement in traffic, leads, or revenue within 90 days, we'll work for free until you do. That's our handshake.</p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">Results Guaranteed • No Lock-In</div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Questions About Visalia Marketing</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-light overflow-hidden">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg text-dark hover:bg-gray-50 transition-colors">
                                        {faq.question}
                                        {openFaq === i ? <ChevronUp size={20} className="text-orange shrink-0 ml-4" /> : <ChevronDown size={20} className="text-gray/40 shrink-0 ml-4" />}
                                    </button>
                                    <AnimatePresence>{openFaq === i && (<motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden"><div className="px-8 pb-8 text-gray font-medium leading-relaxed">{faq.answer}</div></motion.div>)}</AnimatePresence>
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
