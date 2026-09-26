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
    Check, ChevronDown, ChevronUp, ShieldCheck, AlertTriangle, MapPin, TrendingUp,
    BarChart3, Star, ArrowRight, Search, Target, Globe, Megaphone,
    MousePointerClick, Users, Zap, Building2, Mountain
} from 'lucide-react';

const faqs = [
    { question: "Is Boostify based in Madera?", answer: "The office is in Fresno at 6362 N Figarden Dr, Suite 118, about 25 minutes south of Madera on 99. We meet Madera clients at their shop for the first meeting, and the rest of the build happens over a screen share." },
    { question: "What does a website cost in Madera?", answer: "A template build is $649, paid once, and a custom build starts at $1,995. Hosting and the domain run roughly $20 to $30 a month, which you can pay directly so the accounts stay in your name." },
    { question: "Fresno businesses show up when people in Madera search. Can I get ahead of them?", answer: "In the map results distance works for you, because Google favors listings close to the person searching. What usually holds a Madera business back is a thin Business Profile or a site that never says Madera, and both are fixable." },
    { question: "How long does SEO take for a Madera business?", answer: "No agency controls Google, so any date is a guess. A complete profile and a steady flow of reviews tend to move first, and new pages usually need a few weeks after Google recrawls them before rankings settle." },
    { question: "Can I update the site myself?", answer: "If you want to change your own hours, photos and specials, we build it in WordPress and show you how. If it rarely changes, we hand-code it, which keeps it faster, and small edits are part of the $99 a month care plan." },
    { question: "Should I start with ads or with the website?", answer: "Start with the website and the Google profile. Ads send people to the same page, and a page that doesn't turn visitors into calls wastes the ad spend, which for most local service businesses runs $1,000 to $2,500 a month." },
];

const advertiserSchema = {
    "@context": "https://schema.org", "@type": "ProfessionalService",
    "name": "Boostify USA Web Design & SEO", "url": "https://boostifyusa.com/madera-marketing-agency",
    "description": "Web design and local SEO for Madera businesses from a Fresno office about 25 minutes south on 99. Template sites are $649 and custom builds start at $1,995.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    },
    "areaServed": [{ "@type": "City", "name": "Madera" }, { "@type": "City", "name": "Fresno" }, { "@type": "City", "name": "Clovis" }, { "@type": "City", "name": "Merced" }],
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
    { city: 'Madera', path: '/madera-marketing-agency', highlight: true },
    { city: 'Hanford', path: '/hanford-marketing-agency', highlight: false },
    { city: 'Merced', path: '/merced-marketing-agency', highlight: false },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
];

export function MaderaMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null); // FAQs start open; clicking one closes it (visible answers rank better than hidden ones)
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead title="Web Design Madera, CA & Local SEO | Boostify USA" description="Web design and local SEO for Madera businesses from a Fresno office about 25 minutes south on 99. Template sites are $649, custom builds start at $1,995." canonicalUrl="/madera-marketing-agency" />
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
                                Madera Web Design & SEO
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Madera Web Design &amp; SEO. <span className="text-orange">From a Fresno Office.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Madera web design and local SEO from our office in northwest Fresno, about 25 minutes south on 99. The prices match what we quote for <Link to="/" className="text-orange font-bold hover:underline">Fresno web design</Link>, and the first meeting can be at your place.
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


                            <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10 p-6 aspect-[4/3] flex flex-col">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2"><Megaphone size={16} className="text-orange" /><span className="text-white/60 text-xs font-bold uppercase tracking-wider">Multi-Channel Overview</span></div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-green-400 text-xs font-bold">EXAMPLE</span></div>
                                </div>

                                {/* Channel Cards */}
                                <div className="space-y-3 flex-1">
                                    {[
                                        { channel: 'Google Search Ads', metric: '32 Leads', spend: '$680', roas: '3.8x', color: 'bg-orange', barW: '75%' },
                                        { channel: 'Local SEO', metric: '48 Calls', spend: '$0 (organic)', roas: '∞', color: 'bg-green-500', barW: '90%' },
                                        { channel: 'Website Forms', metric: '26 Submissions', spend: 'N/A', roas: 'N/A', color: 'bg-blue-500', barW: '55%' },
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
                                Before you hire anyone for a <span className="text-red-500">Madera website</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">Each of these takes a few minutes and protects you from the next vendor you hire, us included.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Search yourself from Madera", desc: "Google ranks map results by relevance, distance and prominence. A search from a Fresno address shows you Fresno shops, so do the check standing in Madera where your customers are.", icon: Search },
                                { title: "Check who owns your Google listing", desc: "Open the users list on your Business Profile. If the only owner is an old employee or the last agency, have them add you as primary owner before anyone else touches it.", icon: Users },
                                { title: "Know where your domain lives", desc: "The email the domain is registered to owns it, whoever paid for it. Find that login before you change vendors, because it also controls the records that deliver your email.", icon: AlertTriangle },
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

                {/* ───── BENEFIT 1: Google Ads (leads for Madera) ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><MousePointerClick size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Google Ads for Madera, once the site converts</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    Most local service businesses start somewhere between $1,000 and $2,500 a month in ad spend, and that money goes to Google. If the landing page doesn't turn visitors into calls, paid clicks only make the problem more expensive, so the site comes first.
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
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">What a Madera website costs</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">A template build is $649, paid once. A custom build starts at $1,995 and takes 3 to 5 weeks, and the <Link to="/web-design" className="text-dark font-bold hover:text-orange transition-colors">web design page</Link> covers which one fits.</p>
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Madera SEO, <span className="text-orange">month to month</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">Local SEO is $595 a month and Lite is $249 a month, with no contract on either. North of Madera we also cover <Link to="/merced-marketing-agency" className="text-dark font-bold hover:text-orange transition-colors">Merced</Link> and <Link to="/modesto-web-design" className="text-dark font-bold hover:text-orange transition-colors">Modesto</Link>, and the <Link to="/fresno-seo" className="text-dark font-bold hover:text-orange transition-colors">Fresno SEO page</Link> lays out the first 90 days.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: MapPin, title: "Google Business Profile", desc: "Categories, services, hours and photos filled out to match the site, because Google checks that the two agree." },
                                { icon: Search, title: "Pages that name Madera", desc: "Each service gets a page that says what you do and that you do it in Madera, so Google can match it to searches made here." },
                                { icon: Star, title: "A review routine", desc: "A short text your staff sends after each job with the direct link to your review form." },
                                { icon: Globe, title: "Listings cleaned up", desc: "Directory listings that show an old phone or address get corrected or removed, so every listing points to the same name, address and number." },
                                { icon: BarChart3, title: "A monthly report", desc: "Rankings, calls and form leads, sent once a month in plain language." },
                                { icon: Zap, title: "Speed and page titles", desc: "Page titles, schema and load speed checked on every page, with a PageSpeed target of 95 or better on mobile." },
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Serving Madera & the <span className="text-orange">Central Valley</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">From the office it is about 25 minutes to Madera, and we would rather meet at your shop than ask you to come to Figarden. Chowchilla and Madera Ranchos are the same trip.</p>
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
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20"><ShieldCheck size={40} strokeWidth={2} /></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">What you keep if you leave</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">The domain, the hosting account and the code are yours, and we transfer them on request at no charge. SEO is month to month, so there is nothing to buy your way out of.</p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">Zero Risk • 100% Commitment</div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Madera web design questions</h2>
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
