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
    BarChart3, ArrowRight, Search, Globe,
    MousePointerClick, Building2, DollarSign, Award
} from 'lucide-react';

const faqs = [
    { question: 'Why does a Sanger business need a marketing agency?', answer: "Sanger may be a smaller market, but your customers are searching online just like everyone else. In fact, smaller markets offer a huge advantage — less competition means faster results and lower advertising costs. A focused digital strategy can help you dominate your local area quickly." },
    { question: 'How close is Boostify to Sanger?', answer: "We're based in Fresno — just 15 minutes from Sanger. We serve Sanger as a priority market, not a distant afterthought. We're always available for in-person meetings and local strategy sessions." },
    { question: 'What kind of budget do I need to get started?', answer: `Our Local SEO plans start at $595/month with AI-powered tools, and we're launching a Local SEO Lite plan in March at just $249/month that includes hosting, web design, and maintenance. Custom websites start at $1,995 and template-based sites start at $649. Because competition is lower in Sanger, your marketing dollars go further. We always recommend a free strategy call to find the right fit.` },
    { question: 'Will you build my website or just do marketing?', answer: "Both. We offer complete digital solutions — from custom website design and development to ongoing SEO and Google Ads management. Most clients start with a website and SEO, then add paid advertising once their foundation is solid." },
    { question: 'How do you track results for my Sanger business?', answer: "Every client gets access to a live reporting dashboard showing rankings, traffic, leads, calls, and revenue attribution. We track every phone call and form submission back to its source — so you always know exactly what's working." },
];

const advertiserSchema = {
    "@context": "https://schema.org", "@type": "ProfessionalService",
    "name": "Boostify USA", "url": "https://boostifyusa.com/sanger-marketing-agency",
    "description": "Sanger's dedicated marketing agency for custom web design, local SEO, and Google Ads. Helping East Valley businesses compete and win online.",
    "address": { "@type": "PostalAddress", "streetAddress": "6362 N Figarden Dr. #118", "addressLocality": "Fresno", "addressRegion": "CA", "postalCode": "93722", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": 36.8250248, "longitude": -119.8684005 },
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
    { city: 'Merced', path: '/merced-marketing-agency', highlight: false },
    { city: 'Tulare', path: '/tulare-marketing-agency', highlight: false },
    { city: 'Sanger', path: '/sanger-marketing-agency', highlight: true },
];

export function SangerMarketingAgencyPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead title="Sanger Marketing Agency: Custom Websites That Convert" description="Boostify USA helps Sanger businesses grow online with custom web design, local SEO, and Google Ads. Small-town pride, big results." canonicalUrl="/sanger-marketing-agency" />
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
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" /> Sanger Marketing Agency
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Small Town. <span className="text-orange">Big Digital Presence.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                Sanger businesses have something big-city companies can't buy:
                                real community roots. Now it's time your online presence matched
                                your reputation. We build custom websites, run local SEO campaigns,
                                and manage ads that bring East Valley customers to your door.
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
                                    <div className="flex items-center gap-2"><BarChart3 size={16} className="text-orange" /><span className="text-white/60 text-xs font-bold uppercase tracking-wider">Before & After</span></div>
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
                                    <div className="text-green-400 font-black text-lg">1,467% More Leads <span className="text-white/30 font-medium text-sm">in 90 Days</span></div>
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
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">East Valley Businesses <span className="text-red-500">Can't Afford to Wait</span></h2>
                            <p className="text-xl text-gray font-medium">The longer you wait to invest in digital marketing, the harder it gets to catch up. Here's what we see holding Sanger businesses back.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Fresno's Shadow", desc: "Sanger businesses get buried under Fresno results. Without a hyper-local SEO strategy, Google treats you like a suburb — not a destination. We fix that.", icon: Building2 },
                                { title: 'No Digital Storefront', desc: "If you don't have a professional website, customers assume you're either closed or not serious. 75% of people judge a business's credibility by its website.", icon: Globe },
                                { title: 'Spending Without Tracking', desc: "You've paid for a website, maybe boosted a Facebook post. But can you point to a single customer it generated? Without tracking, marketing is just a cost — not an investment.", icon: DollarSign },
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

                {/* ───── FULL SERVICES (stacked cards — unique layout for Sanger) ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Our Complete <span className="text-orange">Digital Toolkit</span> for Sanger</h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">Everything your Sanger business needs under one roof — no juggling freelancers or multiple vendors.</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Globe, title: 'Custom Website Design & Development', desc: 'Hand-coded, mobile-first websites built to convert. We design for your brand, your audience, and your goals — not from a template library.', highlight: 'Sub-2s Load Time • 95+ PageSpeed Score' },
                                { icon: Search, title: 'Local SEO & Google Maps Optimization', desc: "Dominate Sanger search results. We optimize your Google Business Profile, build local citations, target East Valley keywords, and generate authentic reviews.", highlight: '#1 Rankings in 3-6 Months • Full Reporting' },
                                { icon: MousePointerClick, title: 'Google Ads & Paid Advertising', desc: "Geo-targeted campaigns that put your business in front of Sanger customers right now. We track every call, form, and dollar so you always know your ROI.", highlight: '$15-$25 Cost Per Lead • Weekly Optimization' },
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
                            <p className="text-xl text-gray font-medium leading-relaxed">From Academy Avenue to the orchards beyond, we know the East Valley. That local knowledge powers smarter marketing for every business we partner with.</p>
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
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Small Business, Big Commitment</h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">We champion small businesses because we are one. No contracts, no corporate nonsense. Just a team that cares about your growth as much as you do.</p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">Small Business Champions</div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Sanger Marketing FAQ</h2>
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
