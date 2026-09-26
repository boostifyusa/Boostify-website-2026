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
    BarChart3, Star, Phone, ArrowRight, ArrowUpRight, Search, Target, Globe,
    MousePointerClick, Users, Zap, Building2, DollarSign, Sprout
} from 'lucide-react';

// ─── Page positioning ───────────────────────────────────────────────────────
// Retargeted 2026-09-25 from "visalia marketing agency" (near-zero volume, the
// URL only ranked for job-seeker queries) to "web design visalia" /
// "visalia web design", with "visalia seo" as the secondary term. Moves to
// /visalia-web-design with a 301 from /visalia-marketing-agency. Every price
// and claim below is already printed elsewhere on the site or in the Google
// Business Profile description. There is no Visalia client or office, and the
// copy says so rather than implying one.
const faqs = [
    { question: "I'm in Visalia. Why would I hire a web designer in Fresno?", answer: "You don't have to. Hire whoever puts the domain in your name and gives you a price in writing, even if that's a designer down the street. Tulare County is inside our service area, the office is about an hour up Highway 99 in Fresno, and we'll drive out to your shop." },
    { question: 'Do I need a new website, or can you fix the one I have?', answer: "Often it can be fixed. If the platform is current and the problem is speed, structure or thin content, fixing it costs less than replacing it. If it's an abandoned WordPress theme carrying forty plugins, the repair costs more than a rebuild, because every fix has to be re-tested against every plugin. We'll tell you which one you have before you pay us anything." },
    { question: 'How much should I budget for the website, and for SEO after it?', answer: 'The template build is $649, paid once. A custom build starts at $1,995 and goes up with the page count and with how much has to be built rather than assembled. After launch, Local SEO is $595 a month, and Local SEO Lite is $249 a month with hosting, maintenance and baseline optimization bundled in. Both plans are month to month.' },
    { question: 'How long does the build take?', answer: "A custom build takes 3 to 5 weeks. Shoot twenty photos of real jobs on your phone before the first call, because stock photos of another company's crew cost you trust on the exact page where a visitor decides to call. What moves the timeline is how fast photos and feedback come back to us." },
    { question: 'If I stop paying you, does my website go offline?', answer: "Not if the domain and hosting are in your name, and with us they are. The rented setup works differently. The agency registers your domain in its own account and builds on a platform only it can log in to, so canceling the monthly fee takes the site down with it. We transfer both to you on request, in writing, at no charge." },
];

// Published prices, same numbers as the homepage, /web-design and /fresno-seo.
const pricing = [
    { name: 'Template build, $649.', body: 'Paid once. Your logo and colors on a template layout, up to 5 pages, with mobile, SSL and basic schema.' },
    { name: 'Custom build, from $1,995.', body: 'Designed and coded for your business and live in 3 to 5 weeks. The price goes up with the page count and with how much has to be built rather than assembled.' },
    { name: 'Hosting and domain, about $20 to $30 a month.', body: 'You can pay those directly rather than through us, and both accounts are in your name.' },
    { name: 'Care plan, $99 a month.', body: 'Optional, and it covers content changes on request, uptime and form monitoring, security patches and backups. Cancel any month.' },
    { name: 'Local SEO, $595 a month.', body: 'Google Business Profile work, local rankings, and a report that shows what changed. Month to month.' },
    { name: 'Local SEO Lite, $249 a month.', body: 'Hosting, maintenance and baseline optimization bundled together. Also month to month.' },
];

const advertiserSchema = {
    "@context": "https://schema.org", "@type": "ProfessionalService",
    "name": "Boostify USA Web Design & SEO", "url": "https://boostifyusa.com/visalia-web-design",
    "description": "Website design and local SEO for businesses in Visalia and Tulare County, from Boostify USA Web Design & SEO in Fresno, CA.",
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
    "areaServed": [{ "@type": "City", "name": "Visalia" }, { "@type": "City", "name": "Tulare" }, { "@type": "AdministrativeArea", "name": "Tulare County, CA" }],
    "hasOfferCatalog": {
        "@type": "OfferCatalog", "name": "Website design and local SEO", "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website design" }, "priceSpecification": { "@type": "PriceSpecification", "minPrice": "649", "priceCurrency": "USD" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO" }, "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": "249", "priceCurrency": "USD", "unitCode": "MON" } }
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
const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://boostifyusa.com/" },
        { "@type": "ListItem", "position": 2, "name": "Web Design", "item": "https://boostifyusa.com/web-design" },
        { "@type": "ListItem", "position": 3, "name": "Visalia Web Design", "item": "https://boostifyusa.com/visalia-web-design" }
    ]
};
const webPageSchema = {
    "@context": "https://schema.org", "@type": "WebPage",
    "@id": "https://boostifyusa.com/visalia-web-design#webpage",
    "url": "https://boostifyusa.com/visalia-web-design",
    "name": "Web Design Visalia, CA",
    "dateModified": "2026-09-25",
    "author": {
        "@type": "Person",
        "name": "Victor Joaquin",
        "url": "https://boostifyusa.com/about",
        "worksFor": { "@type": "Organization", "@id": "https://boostifyusa.com/#localbusiness", "name": "Boostify USA Web Design & SEO" }
    }
};

const areaCities = [
    { city: 'Fresno', path: '/', highlight: false },
    { city: 'Clovis', path: '/clovis-web-design', highlight: false },
    { city: 'Visalia', path: '/visalia-web-design', highlight: true },
    { city: 'Madera', path: '/madera-marketing-agency', highlight: false },
    { city: 'Hanford', path: '/hanford-marketing-agency', highlight: false },
    { city: 'Merced', path: '/merced-marketing-agency', highlight: false },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
];

export function VisaliaMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [ranks, setRanks] = useState<Record<number, { rank: number | string, colorClass: string }>>({});

    useEffect(() => {
        const initialRanks: Record<number, { rank: number | string, colorClass: string }> = {};
        for (let i = 0; i < 49; i++) {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const dist = Math.sqrt(Math.pow(row - 3, 2) + Math.pow(col - 3, 2));
            let rank: number | string, colorClass: string;
            if (dist < 3) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
            else if (dist < 4.5) { rank = Math.floor(Math.random() * 2) + 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
            else { rank = Math.floor(Math.random() * 4) + 2; colorClass = rank > 3 ? "bg-orange text-white shadow-orange/20" : "bg-green-500 text-white shadow-green-500/20"; }
            initialRanks[i] = { rank, colorClass };
        }
        setRanks(initialRanks);
    }, []);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead title="Web Design Visalia, CA | Custom Websites | Boostify USA" description="Web design for Visalia and Tulare County businesses from Boostify USA in Fresno. Custom sites from $1,995, templates from $649, and you own the domain." canonicalUrl="/visalia-web-design" />
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(advertiserSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
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
                                Web Design in Visalia, CA
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Visalia Web Design From a Fresno Shop <span className="text-orange">That Covers Tulare County</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Boostify USA builds websites for Visalia and Tulare County
                                businesses from an office on Figarden Dr in Fresno. Custom builds
                                start at $1,995 and template builds are $649. You own the domain
                                and the code.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <a href="tel:+15597853834" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                    Call (559) 785-3834 <ArrowRight className="w-5 h-5 ml-2" />
                                </a>
                                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                    Get a Quote
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> You Own the Domain</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> No Contracts</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Fresno Office</span>
                            </div>
                        </motion.div>

                        {/* Hero Graphic: Conversion Funnel (unique to Visalia) */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -top-4 -right-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><Sprout size={16} className="text-green-600" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-dark leading-none">Tulare County</div><div className="text-[10px] text-gray font-medium">Growth Leader</div></div>
                            </motion.div>

                            <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10 p-6 aspect-[4/3] flex flex-col">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2"><Target size={16} className="text-orange" /><span className="text-white/60 text-xs font-bold uppercase tracking-wider">Conversion Pipeline</span></div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-green-400 text-xs font-bold">EXAMPLE</span></div>
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
                                I Need a New Website. <span className="text-red-500">What Do I Sort Out Before I Call Anyone?</span>
                            </h2>
                            <p className="text-xl text-gray font-medium">None of this costs anything, and every one of them shortens a build no matter who you end up hiring in Visalia or Fresno.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Find out who owns your Google listing', desc: "Sign in at business.google.com and check which email manages your Business Profile. If it's a former employee or your last web guy, move it to your own email first, because every vendor you hire after that needs access through that login.", icon: MapPin },
                                { title: 'Track down your domain login', desc: "Look up which email your domain is registered to. That email is the owner no matter who paid the invoice, and whoever holds it also holds the DNS records that route your email.", icon: Globe },
                                { title: 'Ask for a price before the sales call', desc: "A quote that only arrives after a discovery call can be priced off your reaction. Ours is printed further down this page. A template build is $649 and a custom build starts at $1,995.", icon: DollarSign },
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
                                            let rank: number | string, colorClass: string;
                                            if (ranks[i]) {
                                                rank = ranks[i].rank;
                                                colorClass = ranks[i].colorClass;
                                            } else {
                                                if (dist < 3) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
                                                else if (dist < 4.5) { rank = 1; colorClass = "bg-green-500 text-white shadow-green-500/20"; }
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
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
                                </div>
                            </div>

                            <div>
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><BarChart3 size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Will a New Website Get Me Into the Visalia Map Results?</h2>
                                <p className="text-lg text-gray font-medium mb-6 leading-relaxed">
                                    Not by itself. Google fills the three-business map pack from Business Profiles and ranks them on{' '}
                                    <a href="https://support.google.com/business/answer/7091" target="_blank" rel="noopener noreferrer" className="text-dark font-bold hover:text-orange transition-colors">relevance, distance and prominence</a>,
                                    so a Visalia business needs a verified Profile at its Visalia address first. The website is the page that Profile links to, and it's where Google reads what you actually do.
                                </p>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">If anyone offers to put your listing at a Visalia address you don't operate from, say no. Google suspends Business Profiles on virtual offices, and the suspension follows the owner, so it can take your real location down with it.</p>
                                <ul className="space-y-3">
                                    {['Google Business Profile setup in the custom build', 'One page per service, so each one can rank', 'LocalBusiness schema with your real coordinates', 'A 301 redirect map so current rankings carry over'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-dark"><Check size={18} className="text-green-500" strokeWidth={3} />{item}</li>
                                    ))}
                                </ul>
                                <p className="text-lg text-gray font-medium mt-8 leading-relaxed">
                                    Ongoing Visalia SEO after launch is our{' '}
                                    <Link to="/local-seo" className="text-dark font-bold hover:text-orange transition-colors">Local SEO plan</Link>, at $595 a month, or $249 a month for Lite.
                                </p>
                            </div>
                        </div>

                        {/* ───── BENEFIT 2: Paid Advertising ───── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><Target size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Do I Need a Separate Page for My Google Ads?</h2>
                                <p className="text-lg text-gray font-medium mb-6 leading-relaxed">
                                    If the page exists only for an ad campaign, Unbounce or Instapage
                                    usually beats a page on your main website, because A/B testing is
                                    built in and you can strip the page down to whatever converts.
                                </p>
                                <p className="text-lg text-gray font-medium leading-relaxed">
                                    Running the ads themselves is covered on our{' '}
                                    <Link to="/local-marketing" className="text-dark font-bold hover:text-orange transition-colors">local marketing</Link> page.
                                </p>
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">What's Actually <span className="text-orange">in the Build?</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">
                                A custom build starts at $1,995 and takes 3 to 5 weeks, same as our{' '}
                                <Link to="/" className="text-dark font-bold hover:text-orange transition-colors">Fresno web design</Link>. The longer
                                guide to which kind of site you need, and whether WordPress is right
                                for it, is on our{' '}
                                <Link to="/web-design" className="text-dark font-bold hover:text-orange transition-colors">web design page</Link>.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Zap, title: 'Checked on a Phone Before Launch', desc: "Tested against Core Web Vitals on a mid-priced phone before launch, because that's what most of your visitors are holding." },
                                { icon: Phone, title: 'The Number Is a Button', desc: 'On a phone, your number is tap-to-call before anyone scrolls, and call tracking shows which page produced the call.' },
                                { icon: Target, title: 'One Page per Service', desc: 'A page for each thing you sell instead of one page listing everything, so a search for that service lands on the right page.' },
                                { icon: Search, title: 'Schema and GBP Setup', desc: 'Titles, internal links and LocalBusiness schema with your real coordinates ship inside the custom build, along with Google Business Profile setup.' },
                                { icon: ShieldCheck, title: 'Your Rankings Carry Over', desc: 'Every old URL gets pointed at its replacement with a 301 redirect before launch. The redirect map is a spreadsheet, and you get a copy.' },
                                { icon: Users, title: 'You Can Edit It Yourself', desc: 'Hours and prices go stale fastest, so you can change them yourself in about a minute, and the site stays registered in your name.' },
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

                {/* ───── PRICING ─────
                    Reuses the "What is in the build" left-rail checklist from
                    WebDesignPage.tsx. Same published numbers as the homepage,
                    /web-design and /fresno-seo. */}
                <section className="py-16 md:py-20 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-8 lg:gap-16 items-start">
                            <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight lg:sticky lg:top-28">
                                What does a website cost in Visalia?
                            </h2>
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                                    {pricing.map((item) =>
                                        <div key={item.name} className="flex gap-3">
                                            <Check size={16} strokeWidth={3} className="text-orange-hover shrink-0 mt-1.5" />
                                            <p className="text-gray font-medium leading-relaxed">
                                                <span className="font-black text-dark">{item.name} </span>
                                                {item.body}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray font-medium leading-relaxed max-w-[68ch] mt-10">
                                    Being in Visalia doesn't change any of these numbers, and they're the ones we quote on the phone.
                                    If all you need is one page with your phone number and a map, Squarespace and a weekend
                                    does the job, and you keep the $649.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───── WHO BUILDS IT ─────
                    Reuses the "Who does the work" block from WebDesignPage.tsx.
                    Every line about Victor comes from the Google Business Profile
                    description. */}
                <section className="py-16 md:py-20 px-6 bg-light/50 border-t border-gray-light">
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
                                <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">
                                    Victor Joaquin builds it.
                                </h2>
                                <p className="text-lg text-gray font-medium leading-relaxed max-w-[68ch] mb-4">
                                    Victor started building websites at 16 and spent time inside several of the
                                    bigger agencies in town before starting his own. Boostify did the WordPress build
                                    for Fresno State&rsquo;s news site and trained their staff on it, and Victor has
                                    run workshops for the SBA.
                                </p>
                                <p className="text-gray font-medium leading-relaxed max-w-[68ch] mb-6">
                                    The person on your first call is the person who writes the copy and builds the
                                    pages. You own your website and your domain when it&rsquo;s done.
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

                {/* ───── AREA SERVED ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto"><MapPin size={24} strokeWidth={2.5} /></div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Tulare County Is Inside <span className="text-orange">Our Service Area</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">Our Google Business Profile covers Fresno, Madera and Tulare counties, so Visalia and Tulare are both inside it. There&rsquo;s no Visalia office. The office is at 6362 N Figarden Dr Ste 118 in Fresno, about an hour up Highway 99, and we&rsquo;ll drive out to your shop.</p>
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
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">No Contract on Any of It</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">The website is paid for once. The care plan and both Local SEO plans run month to month, so you can stop after any month. If you leave, we transfer the domain, the hosting account and the code on request, in writing, at no charge.</p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">Month to Month • No Lock-In</div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Questions About Visalia Web Design</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-light overflow-hidden">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg text-dark hover:bg-gray-50 transition-colors">
                                        {faq.question}
                                        {openFaq === i ? <ChevronUp size={20} className="text-orange shrink-0 ml-4" /> : <ChevronDown size={20} className="text-gray/40 shrink-0 ml-4" />}
                                    </button>
                                    <motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0 }} className="overflow-hidden"><div className="px-8 pb-8 text-gray font-medium leading-relaxed">{faq.answer}</div></motion.div>
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
