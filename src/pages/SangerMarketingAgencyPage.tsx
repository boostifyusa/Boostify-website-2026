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
    Check, ChevronDown, ChevronUp, ShieldCheck, AlertTriangle, MapPin,
    BarChart3, ArrowRight, Search, Globe,
    MousePointerClick, Building2, DollarSign, Award
} from 'lucide-react';

const faqs = [
    { question: "Is a Fresno web designer close enough for my Sanger business?", answer: "The office is at 6362 N Figarden Dr, Suite 118, about half an hour from Sanger, and we would rather meet at your place than ours. The drive doesn't change the build. What Google looks at is the address and service area on your Business Profile and whether your site names Sanger, and we set up both." },
    { question: "What does a website cost in Sanger?", answer: "The same as it costs in Fresno. A template build is $649, paid once, and a custom build starts at $1,995 and takes 3 to 5 weeks. Hosting and the domain run roughly $20 to $30 a month, and you can pay those directly." },
    { question: "Is the $649 template enough for a small Sanger shop?", answer: "If most of your work comes from referrals and people mostly need your number, your hours and a few photos, it is. Custom makes sense when you want a page for each service or each East Valley town you work in, since each of those pages can rank on its own." },
    { question: "Can a Sanger business pick up customers searching from Fresno?", answer: "In the map results it is hard, because Google weighs how close a business is to the person searching. In the regular results a page that names the service and the Fresno area can rank, and that is the usual route for East Valley businesses." },
    { question: "Who owns the domain and my Google listing when we're done?", answer: "You do. The domain is registered in your name, or we work as a delegate inside your own GoDaddy account, and you stay the primary owner of the Business Profile. If you leave, the hosting account and the code transfer at no charge." },
    { question: "How long until my Sanger business shows up on Google Maps?", answer: "No agency controls Google, so a promised date is a guess. A complete profile with real photos and a steady flow of reviews usually moves first, and pages that name Sanger help Google match you to searches made there." },
];

const advertiserSchema = {
    "@context": "https://schema.org", "@type": "ProfessionalService",
    "name": "Boostify USA Web Design & SEO", "url": "https://boostifyusa.com/sanger-marketing-agency",
    "description": "Web design and local SEO for Sanger businesses from a Fresno office about half an hour away. Template sites are $649 and custom builds start at $1,995.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    },
    "areaServed": [{ "@type": "City", "name": "Sanger" }, { "@type": "City", "name": "Fresno" }, { "@type": "City", "name": "Reedley" }, { "@type": "City", "name": "Clovis" }],
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
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: true },
];

export function SangerMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null); // FAQs start open; clicking one closes it (visible answers rank better than hidden ones)
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead title="Web Design Sanger, CA & Local SEO | Boostify USA" description="Web design and local SEO for Sanger businesses from a Fresno office about half an hour away. Template sites are $649, custom builds start at $1,995." canonicalUrl="/sanger-marketing-agency" />
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
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px] -z-10 translate-x-1/4 -translate-y-1/3" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" /> Sanger Web Design & SEO
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Sanger Web Design <span className="text-orange">From a Fresno Office.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Sanger web design and local SEO from our office at 6362 N Figarden Dr, about half an hour from Academy Avenue. The prices are the same ones we quote for <Link to="/" className="text-orange font-bold hover:underline">Fresno web design</Link>, and the first meeting can be at your shop.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                    Schedule Free Consultation <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                                <Link to="/seo-audit" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                    Free SEO Audit
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> 15 Min from Sanger</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> No Contracts</span>
                                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Small Biz Specialists</span>
                            </div>
                        </motion.div>

                        {/* Hero Graphic: Before/After Comparison (unique to Sanger) */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -top-4 -right-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden lg:flex">
                                <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center"><Award size={16} className="text-orange" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-dark leading-none">East Valley</div><div className="text-[10px] text-gray font-medium">Proud Partner</div></div>
                            </motion.div>


                            <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10 p-6 aspect-[4/3] flex flex-col">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2"><BarChart3 size={16} className="text-orange" /><span className="text-white/60 text-xs font-bold uppercase tracking-wider">Example: Before & After</span></div>
                                    <div className="text-orange text-xs font-bold">90-Day Transformation</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 flex-1">
                                    {/* Before Column */}
                                    <div className="space-y-3">
                                        <div className="text-center mb-2"><span className="text-red-400/80 text-xs font-bold uppercase tracking-wider">Before Boostify</span></div>
                                        {[
                                            { label: 'Google Rank', value: 'Page 4', color: 'text-red-400' },
                                            { label: 'Monthly Leads', value: '3', color: 'text-red-400' },
                                            { label: 'Website Speed', value: '6.8s', color: 'text-red-400' },
                                            { label: 'Online Reviews', value: '4', color: 'text-red-400' },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white/5 rounded-lg p-2.5 border border-white/5 text-center">
                                                <div className="text-white/30 text-[9px] font-bold uppercase mb-0.5">{item.label}</div>
                                                <div className={`font-black text-lg ${item.color}`}>{item.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* After Column */}
                                    <div className="space-y-3">
                                        <div className="text-center mb-2"><span className="text-green-400 text-xs font-bold uppercase tracking-wider">After Boostify</span></div>
                                        {[
                                            { label: 'Google Rank', value: '#1', color: 'text-green-400' },
                                            { label: 'Monthly Leads', value: '47', color: 'text-green-400' },
                                            { label: 'Website Speed', value: '1.3s', color: 'text-green-400' },
                                            { label: 'Online Reviews', value: '52', color: 'text-green-400' },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white/5 rounded-lg p-2.5 border border-green-500/10 text-center">
                                                <div className="text-white/30 text-[9px] font-bold uppercase mb-0.5">{item.label}</div>
                                                <div className={`font-black text-lg ${item.color}`}>{item.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10 flex items-center justify-center">
                                    <div className="text-green-400 font-black text-lg">Month to Month <span className="text-white/30 font-medium text-sm">No long-term contract</span></div>
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Before you hire anyone for a <span className="text-red-500">Sanger website</span></h2>
                            <p className="text-xl text-gray font-medium">These take ten minutes and protect you from the next vendor you hire, including us.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Search from Sanger, not from Fresno", desc: "Google ranks map results by relevance, distance and prominence, so a search made in Fresno fills up with Fresno shops. Check where you show up with a phone that is actually in Sanger.", icon: Building2 },
                                { title: "Find out who owns your domain", desc: "Log in to the registrar and look at which email the domain is registered to. That email owns it, whoever paid the invoice, and the same login controls the records that deliver your email.", icon: Globe },
                                { title: "Ask what the monthly fee gets you", desc: "If you pay a monthly website fee, ask for the registrar and hosting logins in writing. If all they can give you is a login to their own dashboard, canceling takes the site offline.", icon: DollarSign },
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

                {/* ───── FULL SERVICES (stacked cards: unique layout for Sanger) ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">What web design and SEO <span className="text-orange">cost in Sanger</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">The prices are on the page because a quote that only shows up after a call can be priced off your reaction. The <Link to="/web-design" className="text-dark font-bold hover:text-orange transition-colors">web design page</Link> covers which build fits, and the <Link to="/fresno-seo" className="text-dark font-bold hover:text-orange transition-colors">Fresno SEO page</Link> lays out the first 90 days of SEO.</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Globe, title: "Web design", desc: "Template builds are $649, paid once, and custom builds start at $1,995. Both get tested on a phone before launch, and the domain and hosting stay in your name.", highlight: "Template $649 \u2022 Custom from $1,995 \u2022 3 to 5 weeks" },
                                { icon: Search, title: "Local SEO", desc: "The Google Business Profile, your directory listings and pages that name Sanger and the East Valley towns you work in.", highlight: "$595 a month \u2022 Lite $249 a month \u2022 Month to month" },
                                { icon: MousePointerClick, title: "Google Ads", desc: "Ad spend is billed by Google, and most local service businesses start somewhere between $1,000 and $2,500 a month. The site should turn visitors into calls before you pay for clicks.", highlight: "Ad spend billed by Google \u2022 Calls counted by source" },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-light hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange shrink-0"><item.icon size={28} strokeWidth={2.5} /></div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-dark mb-3">{item.title}</h3>
                                        <p className="text-gray font-medium leading-relaxed mb-3">{item.desc}</p>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-sm font-bold rounded-lg"><Check size={14} strokeWidth={3} />{item.highlight}</div>
                                    </div>
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Serving Sanger & the <span className="text-orange">Central Valley</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">From the office it is about half an hour to Sanger, and Reedley, Parlier and Del Rey are the same trip. <Link to="/clovis-web-design" className="text-dark font-bold hover:text-orange transition-colors">Clovis</Link> is on the way, about 20 minutes from Sanger.</p>
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
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">What you keep</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">You own the domain, the hosting account and the code, and we transfer all of it on request at no charge. Local SEO runs month to month, so you can stop the day it stops making sense.</p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">Small Business Champions</div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Sanger web design questions</h2>
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
