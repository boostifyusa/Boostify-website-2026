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
    Check, ChevronDown, ChevronUp, ShieldCheck, AlertTriangle, MapPin, TrendingUp,
    BarChart3, Star, Phone, ArrowRight, Search, Target, Globe,
    MousePointerClick, Users, Zap, Building2, DollarSign, Wheat
} from 'lucide-react';

const faqs = [
    { question: "Is an hour too far for a web designer to work with my Tulare business?", answer: "Most of the build happens over a screen share, so the drive only matters for the first meeting and the photos. We come to Tulare for both, because pictures of your actual trucks, crew and shop do more for the site than anything we could write. The office is at 6362 N Figarden Dr, Suite 118, in Fresno." },
    { question: "What does a website cost in Tulare?", answer: "A template build is $649, paid once. A custom build starts at $1,995 and depends on how many pages have to be built from scratch rather than assembled. Hosting and the domain run roughly $20 to $30 a month, and you can pay those to the provider directly." },
    { question: "I work in Tulare and Visalia. Do I need two websites?", answer: "One site is enough, with a page for each town that is written for that town and lists the work you actually do there. Two separate sites split your reviews and your links in half." },
    { question: "Why doesn't my business show up on Google Maps in Tulare?", answer: "Start with your Business Profile. A category that is too broad, a hidden address with no service area, or a handful of reviews against competitors with dozens are the usual reasons. The website helps once the profile is right, because Google checks that the two match." },
    { question: "Do I have to sign a contract for SEO?", answer: "Local SEO is $595 a month and Lite is $249 a month, and both are month to month. If it isn't producing calls, you can stop, and the pages and the profile stay yours." },
    { question: "Can you fix my current site instead of rebuilding it?", answer: "It depends on what's under it. If it is a WordPress site with a handful of plugins, a cleanup and faster hosting can be enough. If it runs thirty or forty plugins on a theme nobody has updated in years, the repair usually costs more than a rebuild, because every fix has to be retested against everything else." },
];

const advertiserSchema = {
    "@context": "https://schema.org", "@type": "ProfessionalService",
    "name": "Boostify USA Web Design & SEO", "url": "https://boostifyusa.com/tulare-marketing-agency",
    "description": "Web design and local SEO for Tulare businesses from a Fresno office about an hour up 99. Template sites are $649 and custom builds start at $1,995.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    },
    "areaServed": [{ "@type": "City", "name": "Tulare" }, { "@type": "City", "name": "Visalia" }, { "@type": "City", "name": "Fresno" }, { "@type": "City", "name": "Hanford" }],
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
        { "@type": "ContactPoint", "telephone": "+1-559-785-3834", "contactType": "customer service" }
    ],
    "email": "hello@boostifyusa.com",
    "logo": "https://boostifyusa.com/icon.png",
    "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" }
    ]
};
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };

const areaCities = [
    { city: 'Fresno', path: '/', highlight: false },
    { city: 'Clovis', path: '/clovis-web-design', highlight: false },
    { city: 'Visalia', path: '/visalia-web-design', highlight: false },
    { city: 'Madera', path: '/madera-marketing-agency', highlight: false },
    { city: 'Hanford', path: '/hanford-marketing-agency', highlight: false },
    { city: 'Merced', path: '/merced-marketing-agency', highlight: false },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: true },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
];

export function TulareMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null); // FAQs start open; clicking one closes it (visible answers rank better than hidden ones)
    const [ranks, setRanks] = useState<Record<number, { rank: number | string, colorClass: string }>>({});

    useEffect(() => {
        const initialRanks: Record<number, { rank: number | string, colorClass: string }> = {};
        for (let i = 0; i < 49; i++) {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const dist = Math.sqrt(Math.pow(row - 3, 2) + Math.pow(col - 3, 2));
            let rank: number | string, colorClass: string;
            if (dist < 2.5) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
            else if (dist < 4) { rank = Math.floor(Math.random() * 2) + 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
            else { rank = Math.floor(Math.random() * 3) + 2; colorClass = rank > 3 ? "bg-orange text-white shadow-orange/20" : "bg-green-500 text-white shadow-green-500/20"; }
            initialRanks[i] = { rank, colorClass };
        }
        setRanks(initialRanks);
    }, []);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead title="Web Design Tulare, CA & Local SEO | Boostify USA" description="Web design and local SEO for Tulare businesses from a Fresno office about an hour up 99. Template sites are $649, custom builds start at $1,995." canonicalUrl="/tulare-marketing-agency" />
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
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] -z-10 -translate-x-1/3 translate-y-1/3" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" /> Tulare Web Design & SEO
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Tulare Web Design <span className="text-orange">From a Fresno Office.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Tulare web design and local SEO from our office on Figarden Drive in Fresno, about an hour up 99. A lot of Tulare County customers look you up on a phone between jobs, so the site is built for a phone first. The prices match what we quote for <Link to="/" className="text-orange font-bold hover:underline">Fresno web design</Link>.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                    Get Your Free Strategy <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                                <Link to="/seo-audit" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                    Free SEO Audit
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Tulare County Experts</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Month-to-Month</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Proven ROI</span>
                            </div>
                        </motion.div>

                        {/* Hero Graphic: ROI Calculator (unique to Tulare) */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -top-4 -left-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><Wheat size={16} className="text-green-600" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-dark leading-none">World Ag Expo</div><div className="text-[10px] text-gray font-medium">Industry Hub</div></div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                                className="absolute -bottom-4 -right-4 z-20 bg-dark rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center"><DollarSign size={16} className="text-orange" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-white leading-none">5.2x ROAS</div><div className="text-[10px] text-white/50 font-medium">Avg. Return</div></div>
                            </motion.div>

                            <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10 p-6 aspect-[4/3] flex flex-col">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2"><DollarSign size={16} className="text-orange" /><span className="text-white/60 text-xs font-bold uppercase tracking-wider">ROI Breakdown</span></div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-green-400 text-xs font-bold">EXAMPLE</span></div>
                                </div>

                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
                                    <div className="grid grid-cols-3 gap-3 text-center">
                                        <div><div className="text-white/30 text-[10px] font-bold uppercase mb-1">Investment</div><div className="text-white font-black text-xl">$1,500</div></div>
                                        <div><div className="text-white/30 text-[10px] font-bold uppercase mb-1">Revenue</div><div className="text-green-400 font-black text-xl">$7,800</div></div>
                                        <div><div className="text-white/30 text-[10px] font-bold uppercase mb-1">ROI</div><div className="text-orange font-black text-xl">420%</div></div>
                                    </div>
                                </div>

                                <div className="space-y-3 flex-1">
                                    {[
                                        { source: 'Google Ads', leads: 28, revenue: '$3,200', pct: '41%' },
                                        { source: 'Organic SEO', leads: 34, revenue: '$2,800', pct: '36%' },
                                        { source: 'Google Maps', leads: 22, revenue: '$1,400', pct: '18%' },
                                        { source: 'Website Forms', leads: 8, revenue: '$400', pct: '5%' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5 flex items-center justify-between">
                                            <div>
                                                <div className="text-white/80 text-sm font-medium">{item.source}</div>
                                                <div className="text-white/30 text-[10px]">{item.leads} leads</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-bold text-sm">{item.revenue}</div>
                                                <div className="text-orange text-[10px] font-bold">{item.pct}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-lg">92 Total Leads <span className="text-white/40 font-medium text-sm">This Month</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +26%</div>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-full h-full bg-orange/5 rounded-3xl -z-10 hidden lg:block" />
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Before you hire anyone for a <span className="text-red-500">Tulare website</span></h2>
                            <p className="text-xl text-gray font-medium">These take a few minutes and they protect you from whoever you hire next, us included.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Find the email that owns your domain", desc: "Log in to the registrar and check which email the domain is registered to. That email owns it, whoever paid the bill, and the same login controls the records that deliver your email.", icon: Building2 },
                                { title: "Make sure you own your Google listing", desc: "Open your Business Profile and look at the users. If a former employee or your last web guy is the only owner, get yourself added as primary owner before you change vendors.", icon: Globe },
                                { title: "Search the way your customers do", desc: "Search your main service plus Tulare on your phone while you're in town. Google ranks map results by relevance, distance and prominence, so a search from Visalia or Fresno shows you a different list.", icon: BarChart3 },
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

                {/* ───── BENEFIT 1: Ads ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                                <div className="flex items-center gap-2 mb-6"><MousePointerClick size={20} className="text-orange" /><span className="text-white font-bold text-lg">Advertising Engine</span></div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5"><div className="text-white/30 text-[10px] font-bold uppercase mb-2">Cost Per Lead</div><div className="text-green-400 font-black text-2xl">$18</div></div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5"><div className="text-white/30 text-[10px] font-bold uppercase mb-2">Avg. Job Value</div><div className="text-white font-black text-2xl">$380</div></div>
                                </div>
                                <div className="space-y-2 flex-1">
                                    {[
                                        { label: 'Search Ads', clicks: '680', ctr: '8.2%', bar: '80%', color: 'bg-orange' },
                                        { label: 'Local Service Ads', clicks: '420', ctr: '11.4%', bar: '65%', color: 'bg-green-500' },
                                        { label: 'Display Remarketing', clicks: '290', ctr: '2.1%', bar: '40%', color: 'bg-blue-500' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                                            <div className="flex items-center justify-between mb-1"><span className="text-white/70 text-sm font-medium">{item.label}</span><span className="text-orange text-xs font-bold">CTR: {item.ctr}</span></div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className={`h-full ${item.color} rounded-full`} style={{ width: item.bar }} /></div>
                                            <div className="text-right mt-1"><span className="text-white/40 text-[10px]">{item.clicks} clicks</span></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-xl">$18/lead <span className="text-white/40 font-medium text-sm">Avg. Cost</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> −12% CPL</div>
                                </div>
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><Target size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Google Ads for Tulare, once the site is ready</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">Ad spend goes straight to Google, and most local service businesses start somewhere between $1,000 and $2,500 a month. If the site doesn't turn visitors into calls yet, fix that first, because paid clicks land on the same page the free ones do.</p>
                                <ul className="space-y-3">
                                    {['Tulare County geo-fencing', 'Search, Local Service & Display ads', 'Call tracking with recording', 'Weekly performance optimization'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* ───── BENEFIT 2: SEO ───── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><Search size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Tulare SEO, month to month</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">Local SEO is $595 a month and Lite is $249 a month, with no contract on either. The work is your Google Business Profile, the listings that point to it and pages that name Tulare and the towns you drive to. The <Link to="/fresno-seo" className="text-dark font-bold hover:text-orange transition-colors">Fresno SEO page</Link> lays out the first 90 days.</p>
                                <ul className="space-y-3">
                                    {['Google Business Profile mastery', 'Tulare-specific keyword targeting', 'Link building from Valley publications', 'Monthly ranking & ROI reports'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="order-1 lg:order-2 bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl border border-white shadow-2xl overflow-hidden relative z-10 aspect-square flex flex-col p-3 md:p-4">
                                <div className="bg-white border border-gray-100 rounded-full px-4 py-3 flex items-center gap-3 mb-4 shadow-sm z-20">
                                    <Search size={18} className="text-gray-400" />
                                    <span className="text-dark font-medium">seo company tulare</span>
                                    <div className="ml-auto flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-xs font-bold text-green-600 uppercase tracking-wider">Local</span></div>
                                </div>
                                <div className="flex-1 bg-white rounded-2xl relative overflow-hidden border border-gray-100 flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                                    <div className="grid grid-cols-7 gap-1.5 md:gap-3 relative z-10 p-4">
                                        {Array.from({ length: 49 }).map((_, i) => {
                                            const row = Math.floor(i / 7); const col = i % 7;
                                            const dist = Math.sqrt(Math.pow(row - 3, 2) + Math.pow(col - 3, 2));
                                            let rank: number | string, colorClass: string;
                                            if (ranks[i]) {
                                                rank = ranks[i].rank;
                                                colorClass = ranks[i].colorClass;
                                            } else {
                                                if (dist < 2.5) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
                                                else if (dist < 4) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
                                                else { rank = "-"; colorClass = "bg-orange text-white shadow-orange/20"; }
                                            }
                                            if (row === 3 && col === 3) return (<motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 border-gray-100 shadow-xl flex items-center justify-center z-20"><MapPin size={14} className="text-dark" fill="currentColor" /></motion.div>);
                                            return (<motion.div key={i} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: dist * 0.05, type: "spring", stiffness: 200 }} className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${colorClass} shadow-lg flex items-center justify-center text-[10px] md:text-xs font-bold border border-white/50`}>{rank}</motion.div>);
                                        })}
                                    </div>
                                    <div className="absolute bottom-4 z-30 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-xl border border-gray-100 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange/10 rounded-lg shrink-0 flex items-center justify-center"><span className="text-orange font-black text-sm">B</span></div>
                                        <div><div className="text-xs font-black text-dark mb-0.5">Boostify USA</div><div className="flex items-center gap-1"><div className="flex text-yellow-500 gap-0.5">{[...Array(5)].map((_, j) => (<Star key={j} size={8} fill="currentColor" />))}</div><span className="text-[9px] text-gray-500 font-bold">5.0 (8)</span></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───── WEB DESIGN ───── */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto"><Globe size={24} strokeWidth={2.5} /></div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">What a Tulare website <span className="text-orange">costs and includes</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">A template build is $649, paid once, and a custom build starts at $1,995 and takes 3 to 5 weeks. The <Link to="/web-design" className="text-dark font-bold hover:text-orange transition-colors">web design page</Link> covers which of the two fits your business.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Zap, title: "Fast on a phone", desc: "Every build gets run through pagespeed.web.dev on the mobile tab before launch, and the target is 95 or better." },
                                { icon: Phone, title: "Your number on every page", desc: "The phone number sits at the top of every page and dials with one tap, because most of your visitors are on a phone." },
                                { icon: Target, title: "One service per page", desc: "Each service gets its own page, so someone searching for that service lands on a page that answers it." },
                                { icon: Search, title: "Titles and schema at launch", desc: "Page titles, LocalBusiness schema and your service area are set before launch, so Google reads the site correctly from the first crawl." },
                                { icon: ShieldCheck, title: "Backups and updates", desc: "The $99 a month care plan covers backups, updates and small edits. It is optional and you can cancel whenever." },
                                { icon: Users, title: "Edit it yourself, or leave it", desc: "If you want to change your own hours and photos, we build it in WordPress. If the site rarely changes, we hand-code it and it stays faster." },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-light hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 group-hover:bg-orange group-hover:text-white transition-colors"><item.icon size={26} strokeWidth={2.5} /></div>
                                    <h3 className="text-2xl font-black text-dark mb-3 tracking-tight group-hover:text-red-500 transition-colors duration-300">{item.title}</h3>
                                    <p className="text-dark/70 font-medium leading-relaxed">{item.desc}</p>
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Serving Tulare & the <span className="text-orange">Central Valley</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">From the office it is about an hour to Tulare, and we would rather see your yard or your shop than ask you to drive to Fresno. <Link to="/visalia-web-design" className="text-dark font-bold hover:text-orange transition-colors">Visalia</Link> is about 15 minutes away, and one site can name both towns if you work in each.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {areaCities.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                                    {item.highlight ? (
                                        <div className="p-6 rounded-2xl border text-center bg-orange text-white border-orange shadow-lg shadow-orange/20">
                                            <Building2 size={24} className="mx-auto mb-3 text-white" strokeWidth={2.5} /><div className="text-lg font-black mb-1 text-white">{item.city}</div><div className="text-sm font-medium text-white/80">This page</div>
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
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20"><ShieldCheck size={40} strokeWidth={2} /></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">What you own when we're done</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">You own the domain, the hosting account and the code, and we hand all of it over on request at no charge. SEO runs month to month, so you can stop whenever it stops paying for itself.</p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">Performance Guaranteed</div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Tulare web design questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-light overflow-hidden">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg text-dark hover:bg-gray-50 transition-colors">
                                        {faq.question}{openFaq !== i ? <ChevronUp size={20} className="text-orange shrink-0 ml-4" /> : <ChevronDown size={20} className="text-gray/40 shrink-0 ml-4" />}
                                    </button>
                                    <motion.div initial={false} animate={{ height: openFaq !== i ? 'auto' : 0 }} className="overflow-hidden"><div className="px-8 pb-8 text-gray font-medium leading-relaxed">{faq.answer}</div></motion.div>
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
