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
    BarChart3, Star, Phone, ArrowRight, Search, Target, Globe,
    MousePointerClick, Users, Zap, Building2, DollarSign, GraduationCap
} from 'lucide-react';

const faqs = [
    { question: 'Why should a Merced business invest in digital marketing?', answer: "Merced is booming — UC Merced's growth is bringing thousands of new residents and businesses. The companies that establish a strong digital presence now will dominate this market for years. Early movers win." },
    { question: 'Do you specialize in Merced or serve it from far away?', answer: "Our office is in Fresno, just an hour from Merced. We serve Merced County as a core market — not an afterthought. We know the area, the competition, and the customers. We're available for in-person meetings anytime." },
    { question: 'What makes your web design different from cheap website builders?', answer: "DIY builders give you generic templates that look like everyone else. We hand-code every site for speed, SEO, and conversion. Our sites consistently load in under 2 seconds, score 95+ on Google PageSpeed, and generate 3-5x more leads." },
    { question: 'How fast can you get my Google Ads running?', answer: "We can typically launch a campaign within 5-7 business days of onboarding. That includes keyword research, ad copywriting, landing page setup, and conversion tracking. You'll see leads within the first week of launch." },
    { question: 'What if I already have a website that I like?', answer: "Great — we can work with it. We'll audit your current site for speed, SEO, and conversion opportunities, then optimize what's there. Not every client needs a full redesign; sometimes strategic improvements deliver the best ROI." },
];

const advertiserSchema = {
    "@context": "https://schema.org", "@type": "ProfessionalService",
    "name": "Boostify USA", "url": "https://boostifyusa.com/merced-marketing-agency",
    "description": "Premier Merced marketing agency offering custom web design, local SEO, and Google Ads. Helping Merced County businesses thrive in a growing market.",
    "address": { "@type": "PostalAddress", "streetAddress": "6362 N Figarden Dr Ste 118", "addressLocality": "Fresno", "addressRegion": "CA", "postalCode": "93722", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": 36.8250248, "longitude": -119.8684005 },
    "areaServed": [{ "@type": "City", "name": "Merced" }, { "@type": "City", "name": "Atwater" }, { "@type": "City", "name": "Fresno" }, { "@type": "City", "name": "Madera" }],
    "hasOfferCatalog": {
        "@type": "OfferCatalog", "name": "Digital Marketing Services", "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads Management" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Design" } }
        ]
    }, "priceRange": "$$",
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
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };

const areaCities = [
    { city: 'Fresno', path: '/fresno-marketing-agency', highlight: false },
    { city: 'Clovis', path: '/clovis-marketing-agency', highlight: false },
    { city: 'Visalia', path: '/visalia-marketing-agency', highlight: false },
    { city: 'Madera', path: '/madera-marketing-agency', highlight: false },
    { city: 'Hanford', path: '/hanford-marketing-agency', highlight: false },
    { city: 'Merced', path: '/merced-marketing-agency', highlight: true },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
];

export function MercedMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead title="Merced Marketing Agency: Expert Web Design & SEO" description="Boostify USA is a premier Merced marketing agency. Custom websites, local SEO, and Google Ads built for Merced County's booming market." canonicalUrl="/merced-marketing-agency" />
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
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] -z-10 -translate-x-1/4 -translate-y-1/3" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" /> Merced Marketing Agency
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Merced Is Booming. <span className="text-orange">Get Ahead Now.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                With UC Merced's expansion and a wave of new businesses, the opportunity
                                is now. Boostify USA delivers custom websites, local SEO, and
                                performance-driven ad campaigns for Merced County's fastest-growing
                                businesses.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                    Claim Your Free Audit <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                                <Link to="/seo-audit" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                    Free SEO Report
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Merced Market Experts</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> 100% Transparent</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> No Lock-Ins</span>
                            </div>
                        </motion.div>

                        {/* Hero Graphic: Growth Metrics (unique to Merced) */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -top-4 -right-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><GraduationCap size={16} className="text-blue-600" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-dark leading-none">UC Merced</div><div className="text-[10px] text-gray font-medium">Growth Corridor</div></div>
                            </motion.div>


                            <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10 p-6 aspect-[4/3] flex flex-col">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2"><BarChart3 size={16} className="text-orange" /><span className="text-white/60 text-xs font-bold uppercase tracking-wider">Growth Scorecard</span></div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-green-400 text-xs font-bold">LIVE</span></div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {[
                                        { label: 'Organic Traffic', value: '+312%', icon: TrendingUp, color: 'text-green-400' },
                                        { label: 'Leads/Month', value: '94', icon: Users, color: 'text-orange' },
                                        { label: 'Conversion Rate', value: '9.2%', icon: Target, color: 'text-green-400' },
                                        { label: 'Ad ROAS', value: '5.1x', icon: DollarSign, color: 'text-orange' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <item.icon size={14} className={item.color} />
                                                <span className="text-white/30 text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                                            </div>
                                            <div className={`font-black text-2xl ${item.color}`}>{item.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
                                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-3">Revenue Generated — Last 12 Months</div>
                                    <div className="flex items-end gap-1 h-16">
                                        {[35, 42, 38, 55, 62, 58, 72, 80, 75, 88, 95, 100].map((h, i) => (
                                            <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
                                                className={`flex-1 rounded-t-sm ${i >= 10 ? 'bg-orange' : i >= 8 ? 'bg-orange/60' : 'bg-white/15'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-lg">$1.8M+ <span className="text-white/40 font-medium text-sm">Revenue Driven</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +47%</div>
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
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
                                <motion.div animate={{ rotate: [0, -8, 8, -8, 0] }} transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 4 }}><AlertTriangle size={32} className="text-red-500" strokeWidth={2.5} /></motion.div>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Merced Is Growing. <span className="text-red-500">Are You Keeping Up?</span></h2>
                            <p className="text-xl text-gray font-medium">New businesses are opening every month. The ones investing in digital marketing are capturing new customers. The rest are watching from the sidelines.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'New Competition Everywhere', desc: "UC Merced's growth attracts new businesses monthly. Without a strong digital presence, you're constantly losing ground to fresh competitors with modern websites and targeted ads.", icon: Building2 },
                                { title: 'Missed Mobile Customers', desc: "72% of local searches happen on phones. If your site isn't mobile-optimized and fast, you're losing the majority of potential customers before they ever see your offer.", icon: Phone },
                                { title: 'Zero Online Reviews Strategy', desc: "Businesses with 50+ Google reviews get 266% more leads. If you're not actively generating and managing reviews, you're handing an advantage to competitors who are.", icon: Star },
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

                {/* ───── BENEFIT 1: SEO ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><Search size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Local SEO Built for Merced's Growing Market</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    As Merced grows, so does search volume. We position your business at
                                    the top of Google for the keywords that matter — from "plumber Merced"
                                    to "restaurant near UC Merced." Early SEO investment compounds into
                                    long-term dominance.
                                </p>
                                <ul className="space-y-3">
                                    {['Google Business Profile mastery', 'Merced-specific keyword targeting', 'Citation building across 60+ directories', 'Competitor gap analysis & content strategy'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                                <div className="flex items-center gap-2 mb-6"><Search size={20} className="text-orange" /><span className="text-white font-bold text-lg">Search Rankings</span></div>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5"><div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Map Pack</div><div className="text-green-400 font-black text-3xl">#1</div></div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5"><div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">Visibility</div><div className="text-orange font-black text-3xl">92%</div></div>
                                </div>
                                <div className="space-y-2.5 flex-1">
                                    {[
                                        { keyword: '"marketing agency merced"', rank: '#1', trend: '↑ 6' },
                                        { keyword: '"web design merced ca"', rank: '#1', trend: '↑ 9' },
                                        { keyword: '"seo services merced"', rank: '#2', trend: '↑ 4' },
                                        { keyword: '"google ads merced"', rank: '#1', trend: '↑ 5' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5 flex items-center justify-between">
                                            <span className="text-white/70 text-sm font-medium truncate">{item.keyword}</span>
                                            <div className="flex items-center gap-3 shrink-0"><span className="text-white font-bold text-sm">{item.rank}</span><span className="text-green-400 text-xs font-bold">{item.trend}</span></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-lg">14 Keywords <span className="text-white/40 font-medium text-sm">Page 1</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +58%</div>
                                </div>
                            </div>
                        </div>

                        {/* ───── BENEFIT 2: Web Design ───── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl border border-white shadow-2xl overflow-hidden relative z-10 aspect-square flex flex-col p-6 md:p-8">
                                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-4">
                                    <div className="flex items-center gap-2 mb-3"><Globe size={16} className="text-orange" /><span className="text-dark font-bold">Site Analytics</span></div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[{ label: 'Speed', value: '99', color: 'text-green-500' }, { label: 'Mobile', value: '97', color: 'text-green-500' }, { label: 'SEO', value: '100', color: 'text-orange' }].map((m, i) => (
                                            <div key={i} className="text-center"><div className={`font-black text-3xl ${m.color}`}>{m.value}</div><div className="text-dark/40 text-[10px] font-bold uppercase tracking-wider">{m.label}</div></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                                    <div className="text-dark/40 text-[10px] font-bold uppercase tracking-wider mb-3">Visitor Flow</div>
                                    <div className="space-y-3">
                                        {[{ from: 'Google Search', sessions: '2,840', conversion: '8.1%' }, { from: 'Google Maps', sessions: '1,260', conversion: '12.3%' }, { from: 'Direct', sessions: '680', conversion: '6.4%' }, { from: 'Social Media', sessions: '340', conversion: '4.2%' }].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                                                <span className="text-dark font-medium text-sm">{item.from}</span>
                                                <div className="flex items-center gap-3"><span className="text-dark/60 text-xs">{item.sessions} visits</span><span className="text-orange font-bold text-xs">{item.conversion}</span></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><Globe size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Websites That Capture Merced's Growth</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">A custom website is your 24/7 sales machine. We build fast, stunning sites optimized for the Merced market — designed to convert the wave of new residents and customers into loyal buyers.</p>
                                <ul className="space-y-3">
                                    {['100% custom, hand-coded design', 'Sub-2-second load times', 'Conversion-optimized page architecture', 'Ongoing maintenance & support'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───── ADS SECTION ───── */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto"><MousePointerClick size={24} strokeWidth={2.5} /></div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Google Ads for <span className="text-orange">Merced Businesses</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">Targeted ad campaigns that put your Merced business in front of customers the moment they search. Every click tracked, every dollar optimized for maximum return.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Target, title: 'Geo-Targeted Campaigns', desc: 'Ads focused on Merced, Atwater, Los Banos, and surrounding Merced County zips. No wasted spend on irrelevant areas.' },
                                { icon: Phone, title: 'Call-First Strategy', desc: 'For service businesses, phone calls = revenue. We optimize every campaign to drive phone calls, not just clicks.' },
                                { icon: DollarSign, title: 'Budget Efficiency', desc: 'We specialize in maximizing results for real-world budgets. Most Merced campaigns deliver 4-6x return on ad spend.' },
                                { icon: BarChart3, title: 'Weekly Optimization', desc: 'We adjust bids, test ad copy, and refine targeting weekly. Your campaigns improve every single week.' },
                                { icon: Zap, title: 'Fast Launch', desc: 'Campaigns go live within 5-7 days. You start generating leads within the first week of advertising.' },
                                { icon: ShieldCheck, title: 'Full Transparency', desc: 'Access your own real-time dashboard. See exactly where every dollar goes and what it produces. No secrets.' },
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Serving Merced & the <span className="text-orange">Central Valley</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">We serve Merced County and beyond — from the university corridor to agricultural communities across the Valley.</p>
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
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20"><ShieldCheck size={40} strokeWidth={2} /></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Growth Is the Only Metric That Matters</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">We stake our reputation on your results. No contracts, no excuses. If your Merced business isn't growing, we haven't done our job — and we'll keep working until we do.</p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">Results First • Always</div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Merced Marketing Questions</h2>
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
