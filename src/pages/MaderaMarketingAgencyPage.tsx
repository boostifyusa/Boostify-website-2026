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
    MousePointerClick, Users, Zap, Building2, DollarSign, Mountain
} from 'lucide-react';

const faqs = [
    { question: 'Is Boostify USA based in Madera?', answer: "Our headquarters are in Fresno, just minutes from Madera. We serve Madera County businesses with the same local expertise and availability as our Fresno clients. We're close enough to meet in person whenever needed." },
    { question: 'What results can a Madera business expect from SEO?', answer: "Most clients see meaningful ranking improvements within 3-4 months and significant lead growth by month 6. Because Madera is a smaller market, competition is lower — meaning faster results than in bigger cities." },
    { question: 'How much should I budget for digital marketing?', answer: 'For Madera businesses, effective campaigns typically run $800–$2,500/month depending on services. We always start with a free consultation to recommend the right investment based on your goals and competitive landscape.' },
    { question: 'Do you build websites for Madera businesses?', answer: "Absolutely. Every website we build is 100% custom — no templates. We design for your specific audience, optimize for mobile and speed, and include SEO foundations so you start ranking from launch day." },
    { question: 'Can you help me compete with bigger businesses in Fresno?', answer: "That's exactly what we do. Local SEO levels the playing field. When someone in Madera searches for your service, we make sure you appear first — not the Fresno chain with a bigger budget." },
];

const advertiserSchema = {
    "@context": "https://schema.org", "@type": "AdvertisingAgency",
    "name": "Boostify USA", "url": "https://boostifyusa.com/madera-marketing-agency",
    "description": "Madera's trusted marketing agency for custom web design, local SEO, and Google Ads. Helping Madera County businesses grow their digital presence.",
    "address": { "@type": "PostalAddress", "streetAddress": "6362 N Figarden Dr Ste 118", "addressLocality": "Fresno", "addressRegion": "CA", "postalCode": "93722", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": 36.8250248, "longitude": -119.8684005 },
    "areaServed": [{ "@type": "City", "name": "Madera" }, { "@type": "City", "name": "Fresno" }, { "@type": "City", "name": "Clovis" }, { "@type": "City", "name": "Merced" }],
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
    { city: 'Visalia', path: '/visalia-marketing-agency', highlight: false },
    { city: 'Madera', path: '/madera-marketing-agency', highlight: true },
    { city: 'Hanford', path: '/hanford-marketing-agency', highlight: false },
    { city: 'Merced', path: '/merced-marketing-agency', highlight: false },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
];

export function MaderaMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead title="Marketing Agency Madera CA | Web Design & SEO | Boostify USA" description="Boostify USA helps Madera businesses grow with custom web design, local SEO, and targeted Google Ads. Your gateway to digital growth in Madera County." canonicalUrl="/madera-marketing-agency" />
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
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] -z-10 -translate-x-1/4 -translate-y-1/4" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                                Madera Marketing Agency
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Small Town. <span className="text-orange">Big Time Growth.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Madera is growing — and your business should grow with it. Boostify
                                USA delivers enterprise-grade marketing to local businesses:
                                custom websites, local SEO dominance, and Google Ads that turn
                                clicks into customers.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                    Book Your Free Strategy Call <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                                <Link to="/seo-audit" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                    Free SEO Audit
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Minutes from Madera</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> No Contracts</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Proven Results</span>
                            </div>
                        </motion.div>

                        {/* Hero Graphic: Multi-Channel Overview (unique to Madera) */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -top-4 -right-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center"><Mountain size={16} className="text-orange" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-dark leading-none">Gateway City</div><div className="text-[10px] text-gray font-medium">Yosemite Corridor</div></div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                                className="absolute -bottom-4 -left-4 z-20 bg-dark rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><BarChart3 size={16} className="text-green-400" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-white leading-none">+189%</div><div className="text-[10px] text-white/50 font-medium">Avg. Lead Growth</div></div>
                            </motion.div>

                            <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10 p-6 aspect-[4/3] flex flex-col">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2"><Megaphone size={16} className="text-orange" /><span className="text-white/60 text-xs font-bold uppercase tracking-wider">Multi-Channel Overview</span></div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-green-400 text-xs font-bold">LIVE</span></div>
                                </div>

                                {/* Channel Cards */}
                                <div className="space-y-3 flex-1">
                                    {[
                                        { channel: 'Google Search Ads', metric: '32 Leads', spend: '$680', roas: '3.8x', color: 'bg-orange', barW: '75%' },
                                        { channel: 'Local SEO', metric: '48 Calls', spend: '$0 (organic)', roas: '∞', color: 'bg-green-500', barW: '90%' },
                                        { channel: 'Website Forms', metric: '26 Submissions', spend: '—', roas: '—', color: 'bg-blue-500', barW: '55%' },
                                        { channel: 'Google Maps', metric: '154 Views', spend: '$0 (organic)', roas: '∞', color: 'bg-purple-500', barW: '95%' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white/80 text-sm font-medium">{item.channel}</span>
                                                <span className="text-white text-xs font-bold">{item.metric}</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.barW }} />
                                            </div>
                                            <div className="flex items-center justify-between mt-1.5">
                                                <span className="text-white/30 text-[10px] font-medium">Spend: {item.spend}</span>
                                                <span className="text-orange text-[10px] font-bold">ROAS: {item.roas}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-lg">106 Total Leads <span className="text-white/40 font-medium text-sm">This Month</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +34%</div>
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
                                Madera Businesses Are <span className="text-red-500">Being Outpaced Online</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">The businesses that invest in digital marketing now will own Madera's growth. The rest get left behind.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'No Online Visibility', desc: "Your business exists but Google doesn't know it. Without proper local SEO, you're invisible to the 87% of consumers who search online before buying.", icon: Search },
                                { title: 'Losing to Fresno Competitors', desc: "Bigger Fresno businesses are showing up in Madera search results. Without a targeted local strategy, their marketing budgets drown out your presence.", icon: Users },
                                { title: 'DIY Marketing Burnout', desc: "You've tried posting on social media and running your own ads. The results? Inconsistent, unmeasurable, and eating time you should spend running your business.", icon: AlertTriangle },
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

                {/* ───── BENEFIT 1: Google Ads (leads for Madera) ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><MousePointerClick size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Digital Advertising That Puts Madera on the Map</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    Stop burning ad budget on broad campaigns. Our Google Ads strategies
                                    are hyper-targeted to Madera County — reaching the exact people
                                    searching for your services right now.
                                </p>
                                <ul className="space-y-3">
                                    {['Madera County geo-targeting', 'Local Service Ads setup & management', 'Phone call & form tracking', 'Monthly ROI reporting'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="order-1 lg:order-2 bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                                <div className="flex items-center gap-2 mb-6"><Target size={20} className="text-orange" /><span className="text-white font-bold text-lg">Campaign Dashboard</span></div>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5"><div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Ad Spend</div><div className="text-white font-black text-2xl">$950</div></div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5"><div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Revenue</div><div className="text-green-400 font-black text-2xl">$4,180</div></div>
                                </div>
                                <div className="space-y-3 mb-6 flex-1">
                                    {[
                                        { label: 'Impressions', value: '9,240', bar: '100%', color: 'bg-white/15' },
                                        { label: 'Clicks', value: '684', bar: '55%', color: 'bg-white/25' },
                                        { label: 'Leads', value: '58', bar: '28%', color: 'bg-orange/60' },
                                        { label: 'Customers', value: '22', bar: '12%', color: 'bg-orange' },
                                    ].map((item, i) => (
                                        <div key={i}><div className="flex items-center justify-between mb-1"><span className="text-white/50 text-xs font-medium">{item.label}</span><span className="text-white font-bold text-xs">{item.value}</span></div>
                                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden"><div className={`h-full ${item.color} rounded-full`} style={{ width: item.bar }} /></div></div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-xl">4.4x <span className="text-white/40 font-medium text-sm">ROAS</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +19%</div>
                                </div>
                            </div>
                        </div>

                        {/* ───── BENEFIT 2: Web Design ───── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                                <div className="flex items-center gap-2 mb-6"><Globe size={20} className="text-orange" /><span className="text-white font-bold text-lg">Site Performance</span></div>
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    {[{ label: 'Speed', value: '97', color: 'text-green-400' }, { label: 'Mobile', value: '95', color: 'text-green-400' }, { label: 'SEO', value: '100', color: 'text-orange' }].map((m, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5 text-center"><div className={`font-black text-2xl leading-none mb-1 ${m.color}`}>{m.value}</div><div className="text-white/30 text-[8px] font-bold uppercase tracking-wider">{m.label}</div></div>
                                    ))}
                                </div>
                                <div className="space-y-3 flex-1">
                                    {[{ label: 'Load Time', value: '1.4s', bar: '86%', color: 'bg-green-500' }, { label: 'Bounce Rate', value: '24%', bar: '24%', color: 'bg-green-500' }, { label: 'Conversion Rate', value: '7.8%', bar: '78%', color: 'bg-orange' }, { label: 'Mobile Traffic', value: '71%', bar: '71%', color: 'bg-blue-500' }].map((item, i) => (
                                        <div key={i}><div className="flex items-center justify-between mb-1"><span className="text-white/50 text-xs font-medium">{item.label}</span><span className="text-white font-bold text-xs">{item.value}</span></div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className={`h-full ${item.color} rounded-full`} style={{ width: item.bar }} /></div></div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-xl">7.8% <span className="text-white/40 font-medium text-sm">Conversion Rate</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +2.8%</div>
                                </div>
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><Globe size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Custom Websites for Madera's Growing Market</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">A great website isn't a luxury — it's the foundation of every successful marketing campaign. We build fast, beautiful, conversion-focused websites that make your Madera business stand out.</p>
                                <ul className="space-y-3">
                                    {['Custom-coded, no template shortcuts', 'Mobile-first responsive design', 'SEO-ready from launch', 'Secure hosting & ongoing support'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───── LOCAL SEO FEATURES (grid layout unique to Madera) ───── */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto"><Search size={24} strokeWidth={2.5} /></div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Local SEO for <span className="text-orange">Madera County</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">Own the search results in your backyard. Our local SEO strategies put Madera businesses ahead of the competition on Google Search and Maps.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: MapPin, title: 'Map Pack Dominance', desc: 'We optimize your Google Business Profile to rank in the coveted 3-pack for every service you offer in Madera.' },
                                { icon: Search, title: 'Keyword Strategy', desc: 'We research what Madera residents actually search for and build content and pages to match that intent.' },
                                { icon: Star, title: 'Review Management', desc: 'More 5-star reviews = higher rankings. We implement systems to generate authentic reviews from happy customers.' },
                                { icon: Globe, title: 'Citation Building', desc: 'Consistent business listings across 60+ directories strengthen your local authority and improve rankings.' },
                                { icon: BarChart3, title: 'Monthly Reports', desc: 'Transparent ranking reports, call tracking data, and ROI analysis delivered every month.' },
                                { icon: Zap, title: 'Technical SEO', desc: 'Site speed, mobile optimization, schema markup, and core web vitals — the factors Google actually cares about.' },
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Serving Madera & the <span className="text-orange">Central Valley</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">From the Gateway to Yosemite to the heart of the Central Valley, we help businesses across the region unlock their digital potential.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {areaCities.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                                    {item.highlight ? (
                                        <div className="p-6 rounded-2xl border text-center bg-orange text-white border-orange shadow-lg shadow-orange/20">
                                            <Building2 size={24} className="mx-auto mb-3 text-white" strokeWidth={2.5} /><div className="text-lg font-black mb-1 text-white">{item.city}</div><div className="text-sm font-medium text-white/80">You Are Here</div>
                                        </div>
                                    ) : (
                                        <Link to={item.path} className="block p-6 rounded-2xl border text-center bg-white border-gray-light hover:border-orange/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                            <Building2 size={24} className="mx-auto mb-3 text-orange" strokeWidth={2.5} /><div className="text-lg font-black mb-1 text-dark">{item.city}</div><div className="text-sm font-medium text-gray">View Services →</div>
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── GUARANTEE ───── */}
                <section className="py-20 px-6 bg-dark text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20"><ShieldCheck size={40} strokeWidth={2} /></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Small Town Trust, Big Time Results</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">We believe in earning your business every month — not locking you in. No contracts, no hidden fees, and a standing promise: if we don't deliver, you don't pay.</p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">Zero Risk • 100% Commitment</div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Madera Marketing Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-light overflow-hidden">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg text-dark hover:bg-gray-50 transition-colors">
                                        {faq.question}{openFaq === i ? <ChevronUp size={20} className="text-orange shrink-0 ml-4" /> : <ChevronDown size={20} className="text-gray/40 shrink-0 ml-4" />}
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
