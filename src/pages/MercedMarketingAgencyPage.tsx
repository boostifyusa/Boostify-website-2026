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
    BarChart3, Star, Phone, ArrowRight, Search, Target, Globe,
    MousePointerClick, Users, Zap, Building2, DollarSign, GraduationCap
} from 'lucide-react';

const faqs = [
    { question: "Is an SEO company in Fresno a good fit for a Merced business?", answer: "The office is at 6362 N Figarden Dr, Suite 118, about an hour south on 99, and we meet Merced clients in person for the first meeting. Google ranks you on your profile, your reviews and your pages, and none of that depends on where your agency sits." },
    { question: "What does Merced SEO cost?", answer: "Local SEO is $595 a month and Lite is $249 a month, both month to month. Lite bundles hosting, maintenance and baseline optimization, and it fits a business that mostly needs to be found for its own name and one or two services." },
    { question: "What does a website cost in Merced?", answer: "A template build is $649, paid once, and a custom build starts at $1,995 and takes 3 to 5 weeks. Hosting and the domain run roughly $20 to $30 a month, and you can pay those directly." },
    { question: "I already have a website I like. Do I need a new one?", answer: "It depends on two things. If it loads fast on a phone and each service has its own page, SEO can build on what you have. If it takes five seconds to load or the whole business sits on one page, fixing it usually costs close to a rebuild." },
    { question: "How fast can Google Ads bring calls in Merced?", answer: "Ads can start showing the day the campaign is approved, so the first calls can come within days. Whether they keep coming depends on the landing page, which is why the site gets looked at before your ad budget gets spent." },
    { question: "Why don't I show up on Google Maps in Merced?", answer: "The usual reasons are a category that is too broad, a service area that leaves Merced out, or a few reviews against competitors with dozens. Check those before paying anyone, including us." },
];

const advertiserSchema = {
    "@context": "https://schema.org", "@type": "ProfessionalService",
    "name": "Boostify USA Web Design & SEO", "url": "https://boostifyusa.com/merced-marketing-agency",
    "description": "Merced SEO and web design from a Fresno office an hour away. Local SEO, custom websites, and Google Ads for Merced County businesses.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    },
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
    { city: 'Merced', path: '/merced-marketing-agency', highlight: true },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
];

export function MercedMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null); // FAQs start open; clicking one closes it (visible answers rank better than hidden ones)
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead title="Merced SEO Company & Web Design | Boostify USA" description="Merced SEO and web design from Boostify USA's Fresno office, an hour from Merced. Local SEO from $595 a month, websites from $649, no contracts." canonicalUrl="/merced-marketing-agency" />
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
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" /> Merced SEO & Web Design
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Merced SEO &amp; Web Design. <span className="text-orange">Get Ahead Now.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Merced SEO and web design from our Fresno office, an hour away. For Merced,
                                the prices match what we quote for <Link to="/" className="text-orange font-bold hover:underline">web design from Fresno</Link>, and the first meeting can be at your place in Merced or Atwater.
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
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-green-400 text-xs font-bold">EXAMPLE</span></div>
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
                                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-3">Example client, revenue over 12 months</div>
                                    <div className="flex items-end gap-1 h-16">
                                        {[35, 42, 38, 55, 62, 58, 72, 80, 75, 88, 95, 100].map((h, i) => (
                                            <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
                                                className={`flex-1 rounded-t-sm ${i >= 10 ? 'bg-orange' : i >= 8 ? 'bg-orange/60' : 'bg-white/15'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-lg">12 Months <span className="text-white/40 font-medium text-sm">Example Trend</span></div>
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Before you hire a <span className="text-red-500">Merced SEO company</span></h2>
                            <p className="text-xl text-gray font-medium">Run these before any Merced SEO company, including us, touches your listing.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Ask where the work happens", desc: "Ask any agency where its office is and who does the work. Then check that the address on its own Google listing matches what you were told.", icon: Building2 },
                                { title: "Search from Merced, not from home", desc: "Google ranks map results by relevance, distance and prominence, so a search from Fresno shows you Fresno businesses. Check your rankings with a phone that is actually in Merced.", icon: Phone },
                                { title: "Count reviews against the top three", desc: "Search your main service with Merced and count the reviews on the three businesses in the map. If they have dozens and you have a handful, that gap matters more than anything on your website.", icon: Star },
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

                {/* ───── BENEFIT 1: SEO ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6"><Search size={24} strokeWidth={2.5} /></div>
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Merced SEO Built for a Growing Market</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                                    Merced SEO is $595 a month, or $249 a month for Lite, both month to month. The work is your Google Business Profile, the listings that point to it and pages that name Merced, Atwater and the towns you drive to. The <Link to="/fresno-seo" className="text-dark font-bold hover:text-orange transition-colors">Fresno SEO page</Link> lays out the first 90 days.
                                </p>
                                <ul className="space-y-3">
                                    {['Google Business Profile setup and posts', 'Pages written for Merced and Atwater searches', 'Listings corrected to one name, address and phone', 'A monthly report with rankings and calls'].map((item, i) => (
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
                                        { keyword: '"plumber merced"', rank: '#1', trend: '↑ 6' },
                                        { keyword: '"hvac repair merced ca"', rank: '#1', trend: '↑ 9' },
                                        { keyword: '"roofer merced"', rank: '#2', trend: '↑ 4' },
                                        { keyword: '"electrician merced"', rank: '#1', trend: '↑ 5' },
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
                                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">Merced Web Design That Keeps Up With the Growth</h2>
                                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">A template build is $649, paid once, and a custom build starts at $1,995 and takes 3 to 5 weeks. The <Link to="/web-design" className="text-dark font-bold hover:text-orange transition-colors">web design page</Link> covers which one fits, and you own the domain either way.</p>
                                <ul className="space-y-3">
                                    {['Hand-coded, or WordPress if you want to edit it', 'PageSpeed target of 95 or better on mobile', 'Your phone number one tap away on every page', 'Optional $99 a month care plan'].map((item, i) => (
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
                            <p className="text-xl text-gray font-medium leading-relaxed">Ad spend goes to Google, and most local service businesses start somewhere between $1,000 and $2,500 a month. If the site isn't turning visitors into calls yet, fix that first, because paid clicks land on the same page.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Target, title: "Limit the area", desc: "Set the campaign to Merced, Atwater, Los Banos and the zip codes you actually serve." },
                                { icon: Phone, title: "Count calls separately", desc: "Track calls from ads apart from calls from your Google listing, or you can't tell which one is paying." },
                                { icon: DollarSign, title: "Know where the money goes", desc: "Ad spend is billed by Google. Most local service businesses start somewhere between $1,000 and $2,500 a month." },
                                { icon: BarChart3, title: "Read the search terms", desc: "The search terms report shows what people typed before they clicked, and junk searches go in as negatives." },
                                { icon: Zap, title: "Send each ad to its page", desc: "Each ad should land on the page for the service it advertises." },
                                { icon: ShieldCheck, title: "Fix the page first", desc: "If the page doesn't turn visitors into calls, paid clicks just make that more expensive." },
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Serving Merced & the <span className="text-orange">Central Valley</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">From the office it is about an hour to Merced, and we come to you for the first meeting. <Link to="/modesto-web-design" className="text-dark font-bold hover:text-orange transition-colors">Modesto</Link> is about 40 minutes further north on 99, with Atwater on the way.</p>
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
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20"><ShieldCheck size={40} strokeWidth={2} /></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">What stays yours</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">The domain, the hosting account and the code stay in your name, and we transfer them on request at no charge. SEO and ad management run month to month.</p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">Results First • Always</div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Merced SEO &amp; Web Design Questions</h2>
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
