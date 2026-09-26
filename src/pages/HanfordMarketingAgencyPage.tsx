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
    MousePointerClick, Users, Zap, Building2, Handshake
} from 'lucide-react';

const faqs = [
    { question: "Do you work with businesses in Kings County outside Hanford?", answer: "Lemoore, Armona and Corcoran are part of the same trip, and one site can have a page for each town you actually serve. The office is at 6362 N Figarden Dr, Suite 118, in Fresno, about 45 minutes away." },
    { question: "What does SEO cost for a Hanford business?", answer: "Local SEO is $595 a month and Lite is $249 a month, both month to month, and you can stop whenever it stops bringing in calls." },
    { question: "Can my Hanford business rank above Visalia competitors?", answer: "For searches made in Hanford, distance already works in your favor, because Google weighs how close a business is to the person searching. For searches made in Visalia it is harder, and a page written for Visalia customers is the usual way in." },
    { question: "What should I expect in the first month?", answer: "The first weeks go to the Google Business Profile, your listings and the pages that are already closest to ranking. Rankings usually take weeks to move after Google recrawls a change, so judge the work on calls over a few months." },
    { question: "Is there a contract?", answer: "There is no long-term contract on SEO, ads or the care plan. Websites are paid per build, $649 for a template and $1,995 and up for custom." },
    { question: "What ROI should I expect?", answer: "It depends on your service, your area and your budget, so we don't promise a multiple. Ads can bring calls in the first week, and SEO builds over months and keeps working after you stop paying for clicks." },
];

const advertiserSchema = {
    "@context": "https://schema.org", "@type": "ProfessionalService",
    "name": "Boostify USA Web Design & SEO", "url": "https://boostifyusa.com/hanford-marketing-agency",
    "description": "Hanford SEO and web design for Kings County businesses from a Fresno office. Local SEO, custom websites, and Google Ads.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    },
    "areaServed": [{ "@type": "City", "name": "Hanford" }, { "@type": "City", "name": "Lemoore" }, { "@type": "City", "name": "Visalia" }, { "@type": "City", "name": "Fresno" }],
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
    { city: 'Hanford', path: '/hanford-marketing-agency', highlight: true },
    { city: 'Merced', path: '/merced-marketing-agency', highlight: false },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: false },
];

export function HanfordMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null); // FAQs start open; clicking one closes it (visible answers rank better than hidden ones)
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead title="Hanford SEO Company | Kings County Web Design | Boostify USA" description="Hanford SEO and web design for Kings County businesses from Boostify USA's Fresno office. Local SEO from $595 a month, websites from $649, no contracts." canonicalUrl="/hanford-marketing-agency" />
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
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] -z-10 translate-x-1/3 translate-y-1/4" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" /> Hanford SEO & Web Design
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Hanford SEO Company. <span className="text-orange">Kings County's Growth Partner.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Hanford SEO and web design for Kings County businesses, run from
                                our Fresno office, about 45 minutes away. The prices match what we quote for <Link to="/" className="text-orange font-bold hover:underline">Fresno web design</Link>.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                    Free Strategy Session <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                                <Link to="/seo-audit" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                    Free SEO Audit
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Kings County Focus</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Month-to-Month</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Results-First</span>
                            </div>
                        </motion.div>

                        {/* Hero Graphic: Lead Pipeline (unique to Hanford) */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -top-4 -left-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center"><Handshake size={16} className="text-orange" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-dark leading-none">Kings County</div><div className="text-[10px] text-gray font-medium">Trusted Partner</div></div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                                className="absolute -bottom-4 -right-4 z-20 bg-dark rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><Users size={16} className="text-green-400" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-white leading-none">30+ Clients</div><div className="text-[10px] text-white/50 font-medium">Kings County</div></div>
                            </motion.div>

                            <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10 p-6 aspect-[4/3] flex flex-col">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2"><Target size={16} className="text-orange" /><span className="text-white/60 text-xs font-bold uppercase tracking-wider">Lead Pipeline</span></div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-green-400 text-xs font-bold">EXAMPLE</span></div>
                                </div>

                                {/* Pipeline stages */}
                                <div className="flex-1 space-y-3">
                                    {[
                                        { stage: 'New Visitors', count: 2840, pct: 100, color: 'bg-white/10', textColor: 'text-white/60' },
                                        { stage: 'Engaged', count: 1920, pct: 68, color: 'bg-white/15', textColor: 'text-white/70' },
                                        { stage: 'Contacted', count: 142, pct: 5, color: 'bg-orange/40', textColor: 'text-orange' },
                                        { stage: 'Qualified Leads', count: 86, pct: 3, color: 'bg-orange/60', textColor: 'text-orange' },
                                        { stage: 'Customers', count: 34, pct: 1.2, color: 'bg-orange', textColor: 'text-orange' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className={`text-sm font-medium ${item.textColor}`}>{item.stage}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white font-bold text-sm">{item.count.toLocaleString()}</span>
                                                    <span className="text-white/30 text-[10px] font-bold">{item.pct}%</span>
                                                </div>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${Math.max(item.pct, 5)}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-white font-black text-lg">34 New Customers <span className="text-white/40 font-medium text-sm">This Month</span></div>
                                    <div className="text-green-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14} /> +18%</div>
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Before you hire a <span className="text-red-500">Kings County SEO company</span></h2>
                            <p className="text-xl text-gray font-medium">These take a few minutes and tell you more than any sales call, ours included.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Check the users on your Google listing", desc: "If the only owner on your Business Profile is an old employee or the last agency, get added as primary owner first. Every vendor after that needs access through that login.", icon: Users },
                                { title: "Search from Hanford, not Visalia", desc: "Google ranks map results by relevance, distance and prominence, so a Visalia search shows Visalia businesses. Check where you rank with a phone that is actually in Hanford or Lemoore.", icon: Building2 },
                                { title: "Count calls by source", desc: "If you can't tell whether a call came from the listing, the website or an ad, ask for call tracking before you pay anyone for more traffic.", icon: BarChart3 },
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

                {/* ───── SERVICES GRID (unique layout for Hanford: all 3 services in grid) ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Kings County SEO, Web Design &amp; <span className="text-orange">Google Ads</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">Local SEO is $595 a month or $249 for Lite, month to month, and websites start at $649. The <Link to="/fresno-seo" className="text-dark font-bold hover:text-orange transition-colors">Fresno SEO page</Link> lays out the first 90 days, and the <Link to="/web-design" className="text-dark font-bold hover:text-orange transition-colors">web design page</Link> covers which build fits.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Globe, title: "Web design", desc: "A $649 template or a custom build from $1,995. You own the domain and the hosting account either way." },
                                { icon: Search, title: "Local SEO", desc: "The Business Profile, your listings and pages that name Hanford, Lemoore and Kings County, month to month." },
                                { icon: MousePointerClick, title: "Google Ads", desc: "Most local service businesses start between $1,000 and $2,500 a month in ad spend, billed by Google." },
                                { icon: Phone, title: "Call tracking", desc: "Calls get counted by where they came from, so you can see which channel is paying for itself." },
                                { icon: Star, title: "Review routine", desc: "A short text your staff sends after each job with the direct link to your review form." },
                                { icon: BarChart3, title: "Monthly report", desc: "Rankings, calls and form leads, once a month, in plain language." },
                                { icon: Target, title: "Competitor check", desc: "What the top three map results in Hanford have that you don't, starting with categories and reviews." },
                                { icon: Zap, title: "Speed", desc: "A PageSpeed target of 95 or better on mobile, checked before launch." },
                                { icon: ShieldCheck, title: "Care plan", desc: "Backups, updates and small edits for $99 a month, optional, cancel whenever." },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
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
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 mx-auto"><MapPin size={24} strokeWidth={2.5} /></div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Serving Hanford & the <span className="text-orange">Central Valley</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">From the office it is about 45 minutes to Hanford, and Lemoore and Armona are on the same trip. <Link to="/visalia-web-design" className="text-dark font-bold hover:text-orange transition-colors">Visalia</Link> is about 25 minutes east of Hanford.</p>
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
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20"><ShieldCheck size={40} strokeWidth={2} /></div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">What you own</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">The domain, the hosting account and the code are yours, and we transfer them on request at no charge. SEO and ads run month to month, so you can walk away whenever it stops making sense.</p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">No Contracts • No Hidden Fees</div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Hanford SEO FAQ</h2>
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
