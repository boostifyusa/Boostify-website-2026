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
    Check, ChevronDown, ChevronUp, MapPin, Star, ArrowRight, Search,
    Globe, BarChart3, Zap, ClipboardCheck, Wrench, FileText
} from 'lucide-react';

const faqs = [
    {
        question: 'How much does SEO cost in Fresno?',
        answer: "Our standard Local SEO plan is $595 a month. Local SEO Lite is $249 a month and bundles hosting, maintenance, and baseline optimization. Websites are priced separately: custom builds start at $1,995, template builds at $649. No setup fees, no contracts.",
    },
    {
        question: 'How long until SEO starts working?',
        answer: "Expect visible movement in 3 to 4 months and meaningful lead growth by month 6. Smaller markets like Madera or Sanger usually move faster than Fresno itself. Anyone promising page one in 30 days is guessing.",
    },
    {
        question: 'Do you outsource the work?',
        answer: "No. The people who build our sites do the SEO, from our office on N Figarden Dr in Fresno. The person you meet on the first call is the person in your account.",
    },
    {
        question: "What's the difference between SEO and local SEO?",
        answer: "SEO makes a site rank anywhere; local SEO makes a business rank in a specific place, which adds Google Business Profile work, the map pack, reviews, and citations to the job. Most Fresno service businesses need the local kind. We explain the service in detail on our local SEO page.",
    },
    {
        question: "We're not in Fresno. Can you still help?",
        answer: "Yes. We work across the Central Valley, including Clovis, Madera, Visalia, Merced, Hanford, Tulare, Sanger, and Modesto, and we drive out for in-person meetings when it helps.",
    },
    {
        question: 'Do I have to sign a contract?',
        answer: "No. Everything is month to month. If we don't deliver, you don't pay.",
    },
];

const fresnoSeoSchema = {
    "@context": "https://schema.org", "@type": "ProfessionalService",
    "name": "Boostify USA Web Design & SEO",
    "url": "https://boostifyusa.com/fresno-seo",
    "description": "Fresno SEO company. Google Business Profile optimization, local rankings, review systems, and monthly reporting for Central Valley businesses.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    },
    "areaServed": [
        { "@type": "City", "name": "Fresno" }, { "@type": "City", "name": "Clovis" },
        { "@type": "City", "name": "Madera" }, { "@type": "City", "name": "Visalia" },
        { "@type": "City", "name": "Merced" }, { "@type": "City", "name": "Hanford" },
        { "@type": "City", "name": "Tulare" }, { "@type": "City", "name": "Sanger" },
        { "@type": "City", "name": "Modesto" }
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog", "name": "SEO Services", "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Business Profile Optimization" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical SEO" } }
        ]
    },
    "priceRange": "$$",
    "telephone": "+1-559-785-3834",
    "email": "hello@boostifyusa.com",
    "logo": "https://boostifyusa.com/icon.png"
};
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };

const services = [
    { icon: MapPin, title: 'Google Business Profile', desc: "Categories, services, photos, posts, and review replies, tuned so Google connects your profile to the searches that pay. The map pack is won or lost here." },
    { icon: Search, title: 'Pages that match real searches', desc: "We check what Fresno types into Google (volumes, not hunches) and build a page for each service and city worth targeting. No filler pages for towns nobody searches." },
    { icon: Star, title: 'Review systems', desc: "A simple ask-and-remind routine your staff will use. Steady reviews are one of the strongest map pack signals there is." },
    { icon: Globe, title: 'Citation and listing cleanup', desc: "Same name, address, and phone everywhere your business appears, from Yelp to the Chamber. Old listings under old names get fixed or removed." },
    { icon: Zap, title: 'Technical SEO', desc: "Titles, schema, speed, and indexing. Your pages return real 200s, load in about a second, and tell Google exactly what they are." },
    { icon: BarChart3, title: 'Monthly reporting', desc: "A short report with rankings, calls, and form fills, plus what we did and what's next. If a month was slow, the report says so." },
];

const processSteps = [
    { step: '01', icon: ClipboardCheck, title: 'Weeks 1-2: Audit and profile', desc: "We pull your current rankings, crawl the site, and fix your Google Business Profile first: categories, services, photos. You keep the audit either way." },
    { step: '02', icon: Wrench, title: 'Weeks 3-6: Fixes and first pages', desc: "Technical cleanup, titles, schema, and the first service pages, written for searches with real volume in your market." },
    { step: '03', icon: Star, title: 'Weeks 7-12: Reviews and citations', desc: "The review system goes live, listings get cleaned up, and the next pages on the calendar get published." },
    { step: '04', icon: FileText, title: 'Ongoing: Report, adjust, repeat', desc: "A report every month, new targets each quarter. Most clients see movement by month three and meaningful lead growth by month six." },
];

const areaCities = [
    { city: 'Clovis', path: '/clovis-marketing-agency' },
    { city: 'Madera', path: '/madera-marketing-agency' },
    { city: 'Visalia', path: '/visalia-marketing-agency' },
    { city: 'Merced', path: '/merced-marketing-agency' },
    { city: 'Hanford', path: '/hanford-marketing-agency' },
    { city: 'Tulare', path: '/tulare-marketing-agency' },
    { city: 'Sanger', path: '/sanger-marketing-agency' },
    { city: 'Modesto', path: '/modesto-web-design' },
];

export function FresnoSEOPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title="Fresno SEO | SEO Company in Fresno, CA | Boostify USA"
                description="Fresno SEO from a company with an office in Fresno. Google Business Profile, local rankings, and reports that show what changed. From $595/month, no contracts."
                canonicalUrl="/fresno-seo"
            />
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(fresnoSeoSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>
            <Navigation />

            <main>
                {/* ───── HERO ───── */}
                <section className="px-6 relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-28">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{ backgroundImage: 'url(/hero-bg-pattern.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)' }} />

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                            Fresno SEO Company
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                            className="text-5xl md:text-7xl font-black text-dark mb-8 tracking-tighter leading-[0.95]">
                            Fresno SEO From a Company That's{' '}
                            <span className="relative inline-block px-2 isolate">
                                <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
                                <span className="text-orange relative z-10">Actually in Fresno</span>
                            </span>.
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
                            Search "SEO company Fresno" and most of page one is a national
                            agency with a Fresno landing page and no Fresno office. Our office
                            is on N Figarden Dr. We've been building and ranking Central
                            Valley websites since 2014, and you can meet the person doing the
                            work.
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                Book a Free Call <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link to="/seo-audit" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                Run a Free SEO Audit
                            </Link>
                        </motion.div>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-dark/60">
                            <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Month to Month, No Contracts</span>
                            <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Plans From $595/mo</span>
                            <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} /> Office in Northwest Fresno</span>
                        </div>
                    </div>
                </section>

                <TrustBadges />

                {/* ───── SERVICES ───── */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">What You're <span className="text-orange">Actually Buying</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">SEO gets sold as magic. It's work. Here's the work, item by item.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-light hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 group-hover:bg-orange group-hover:text-white transition-colors"><item.icon size={26} strokeWidth={2.5} /></div>
                                    <h3 className="text-2xl font-black text-dark mb-3 tracking-tight">{item.title}</h3>
                                    <p className="text-dark/70 font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── PRICING, PLAINLY ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-dark mb-8 tracking-tight">Pricing, <span className="text-orange">Plainly</span></h2>
                        <p className="text-xl text-gray font-medium leading-relaxed mb-6">
                            Local SEO is $595 a month. Local SEO Lite is $249 a month and
                            bundles hosting, maintenance, and baseline optimization. Custom
                            websites start at $1,995, template builds at $649.
                        </p>
                        <p className="text-xl text-gray font-medium leading-relaxed mb-10">
                            Everything is month to month. If we don't deliver, you don't pay.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                Get a Straight Quote <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link to="/local-seo" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                What Local SEO Includes
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ───── PROCESS ───── */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">The First <span className="text-orange">90 Days</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">The same sequence every time, because it works. You'll know what's happening at each step.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {processSteps.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-light">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange"><item.icon size={24} strokeWidth={2.5} /></div>
                                        <span className="text-4xl font-black text-orange/20">{item.step}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-dark mb-3 tracking-tight">{item.title}</h3>
                                    <p className="text-dark/70 font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── PROOF ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-dark mb-8 tracking-tight">Sites We Build, Host, and <span className="text-orange">Rank</span></h2>
                        <p className="text-xl text-gray font-medium leading-relaxed mb-10">
                            Full Throttle Suspension, Benchmark Pool Supply, Tint
                            Headquarters, Martin Energy. Real Central Valley businesses on
                            sites we built and host on our own servers. Have a look before
                            you call us.
                        </p>
                        <Link to="/work" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                            See the Work <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── AREA SERVED ───── */}
                <section className="py-24 px-6 bg-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">Beyond <span className="text-orange">Fresno</span></h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">We serve the whole Central Valley from our Fresno office. Pick your city for local details.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {areaCities.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                                    <Link to={item.path} className="block p-6 rounded-2xl border text-center bg-white border-gray-light hover:border-orange/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                        <MapPin size={24} className="mx-auto mb-3 text-orange" strokeWidth={2.5} />
                                        <div className="text-lg font-black mb-1 text-dark">{item.city}</div>
                                        <div className="text-sm font-medium text-gray">View Services →</div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">Fresno SEO Questions</h2>
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
