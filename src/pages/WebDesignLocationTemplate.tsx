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
    ArrowRight, Check, ChevronDown, ChevronUp, Code2, Smartphone,
    Zap, Search, ShieldCheck, Lock, BarChart3, Layers,
    MousePointerClick, Timer, Eye, RefreshCw, Gauge
} from 'lucide-react';

// ─── Template Data (replace per city) ────────────────────────────────────────
const CITY = 'Fresno';
const CITY_SLUG = 'fresno';
const REGION = 'Central Valley';

const faqs = [
    { question: `How much does a custom website cost in ${CITY}?`, answer: `Custom websites start at $1,995 depending on complexity, pages, and features. Template-based sites start at just $649. Every project includes mobile-responsive design, SEO optimization, speed optimization, and a dedicated project manager. We offer flexible payment plans for ${CITY} businesses.` },
    { question: 'How long does it take to build a website?', answer: 'Most projects launch within 3-5 weeks. We move fast without cutting corners. You get a staging site to review and approve before anything goes live. Rush timelines are available for businesses that need to launch quickly.' },
    { question: 'Will my website work well on mobile phones?', answer: "Every site we build is mobile-first — meaning we design for phones first, then scale up to tablets and desktops. Over 65% of your customers will visit on their phone. We don't just make it 'responsive' — we make it genuinely excellent on every screen." },
    { question: 'Do you offer website maintenance after launch?', answer: "Yes. We offer monthly maintenance plans that include security updates, content changes, performance monitoring, and priority support. Your website is an asset — we treat it like one." },
    { question: 'Can you redesign my existing website?', answer: "Absolutely. We'll audit your current site's performance, SEO, and conversion potential, then build a new version that addresses every weakness. We handle the full migration — no downtime, no lost rankings." },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function WebDesignLocationTemplate() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState(0);

    const processSteps = [
        { step: '01', title: 'Discovery Call', desc: 'We learn your business, audience, and goals. You tell us what success looks like.', duration: 'Day 1', icon: Eye },
        { step: '02', title: 'Strategy & Wireframes', desc: 'We map out the sitemap, user flow, and wireframes. You approve the blueprint before we design a pixel.', duration: 'Days 2-5', icon: Layers },
        { step: '03', title: 'Design & Build', desc: 'Hand-coded, pixel-perfect. You get a live staging link to see progress in real time.', duration: 'Days 5-20', icon: Code2 },
        { step: '04', title: 'Launch & Optimize', desc: 'We deploy, configure analytics, run speed tests, and hand you the keys. Then we optimize based on real data.', duration: 'Days 20-25', icon: Zap },
    ];

    const features = [
        { icon: Zap, title: 'Sub-2s Load Time', desc: 'Every millisecond counts. Our sites load in under 2 seconds, faster than 95% of competitors.' },
        { icon: Smartphone, title: 'Mobile-First Design', desc: "Designed for thumbs first, mice second. Over 65% of traffic is mobile: we don't treat it as an afterthought." },
        { icon: Search, title: 'SEO Built-In', desc: 'Schema markup, meta tags, semantic HTML, image optimization: SEO is in the foundation, not bolted on after.' },
        { icon: Lock, title: 'Security Hardened', desc: 'SSL certificates, secure headers, automated backups. Your site is locked down from day one.' },
        { icon: Gauge, title: '95+ PageSpeed Score', desc: "Google grades your speed. We don't ship a site until it scores 95+ on Google PageSpeed Insights." },
        { icon: BarChart3, title: 'Conversion Tracking', desc: 'Every call, form, and click tracked back to its source. You know exactly what your website generates.' },
    ];

    const comparisonData = [
        { feature: 'Design', template: 'Cookie-cutter template', custom: 'Unique to your brand' },
        { feature: 'Speed', template: '4-8 seconds load', custom: 'Under 2 seconds' },
        { feature: 'PageSpeed Score', template: '40-60', custom: '95+' },
        { feature: 'SEO', template: 'Basic or none', custom: 'Built into every page' },
        { feature: 'Mobile', template: '"Responsive" (barely)', custom: 'Mobile-first design' },
        { feature: 'Ownership', template: "Locked to platform", custom: "You own everything" },
        { feature: 'Support', template: 'Ticket queue', custom: 'Direct line to your dev' },
    ];

    const tabs = [
        {
            label: 'Speed', icon: Timer,
            title: 'Lightning Fast Load Times',
            desc: "Slow websites kill revenue. 53% of mobile users abandon sites that take over 3 seconds to load. Our hand-coded sites load in under 2 seconds, giving your visitors zero reason to leave.",
            stat: '1.4s', statLabel: 'Average Load Time',
            visual: [
                { label: 'Template Sites', value: 65, color: 'bg-red-400', time: '6.5s' },
                { label: 'Competitor Sites', value: 42, color: 'bg-yellow-400', time: '4.2s' },
                { label: 'Boostify Sites', value: 14, color: 'bg-green-400', time: '1.4s' },
            ]
        },
        {
            label: 'Conversion', icon: MousePointerClick,
            title: 'Designed to Convert',
            desc: "A pretty website is useless if it doesn't generate leads. We design every page around a single goal: getting your visitors to take action, like call, click, submit, or buy.",
            stat: '3.2x', statLabel: 'More Conversions',
            visual: [
                { label: 'Before Redesign', value: 20, color: 'bg-red-400', time: '1.2%' },
                { label: 'Industry Average', value: 35, color: 'bg-yellow-400', time: '2.1%' },
                { label: 'Boostify Sites', value: 65, color: 'bg-green-400', time: '6.8%' },
            ]
        },
        {
            label: 'SEO', icon: Search,
            title: 'SEO From Day One',
            desc: "We don't build your site and bolt on SEO later. Every page is built with semantic HTML, structured data, optimized images, and keyword-targeted copy from the start.",
            stat: '95+', statLabel: 'PageSpeed Score',
            visual: [
                { label: 'PageSpeed', value: 95, color: 'bg-green-400', time: '95+' },
                { label: 'Accessibility', value: 98, color: 'bg-green-400', time: '98' },
                { label: 'Best Practices', value: 100, color: 'bg-green-400', time: '100' },
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title={`${CITY} Web Design: Custom Sites Built to Convert`}
                description={`Custom, SEO-optimized web design for ${CITY} businesses. Mobile-first, fast-loading sites built to turn local visitors into paying customers.`}
                canonicalUrl={`/${CITY_SLUG}-web-design`}
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "Boostify USA Web Design & SEO",
                        "url": `https://boostifyusa.com/${CITY_SLUG}-web-design`,
                        "description": `Custom, hand-coded ${CITY} web design for ${REGION} businesses. Fast, mobile-first, conversion-focused websites.`,
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "6362 N Figarden Dr. #118",
                            "addressLocality": "Fresno",
                            "addressRegion": "CA",
                            "postalCode": "93722",
                            "addressCountry": "US"
                        },
                        "areaServed": { "@type": "City", "name": CITY },
                        "telephone": "+1-559-785-3834",
                        "email": "hello@boostifyusa.com",
                        "logo": "https://boostifyusa.com/icon.png",
                        "priceRange": "$$",
                        "openingHoursSpecification": [
                            { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" }
                        ]
                    })}
                </script>
            </Helmet>
            <Navigation />

            <main>
                {/* ───── HERO: Centered editorial layout ───── */}
                <section className="relative overflow-hidden pt-32 pb-0 md:pt-44">
                    {/* Animated gradient bg */}
                    <div className="absolute inset-0 bg-gradient-to-b from-orange/[0.03] via-white to-white" />
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange/[0.06] rounded-full blur-[150px] pointer-events-none" />

                    <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                        {/* Badge */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8 mx-auto">
                            <Code2 size={14} strokeWidth={3} /> Hand-Coded in {CITY}
                        </motion.div>

                        {/* Headline: stacked, massive */}
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl sm:text-6xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] mb-6">
                            {CITY} Web Design That<br />
                            <span className="text-orange">Makes You Money.</span>
                        </motion.h1>

                        {/* Subhead */}
                        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                            {CITY} web design that turns visitors into paying customers, not just
                            pretty pages that sit there. We hand-code fast, conversion-focused
                            websites for {REGION} businesses.
                        </motion.p>

                        {/* CTAs: centered */}
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                                Get a Free Quote <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <Link to="/work" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                                See Our Work
                            </Link>
                        </motion.div>

                        {/* Stats strip: horizontal metrics bar */}
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap justify-center gap-8 md:gap-14 mb-16">
                            {[
                                { value: '<2s', label: 'Load Time' },
                                { value: '95+', label: 'PageSpeed Score' },
                                { value: '3.2x', label: 'More Conversions' },
                                { value: '100%', label: 'Hand-Coded' },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl md:text-4xl font-black text-dark tracking-tight">{stat.value}</div>
                                    <div className="text-xs font-bold text-gray uppercase tracking-wider mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Browser mockup: centered showpiece, overlaps into next section */}
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
                        className="max-w-4xl mx-auto px-6 relative z-10 -mb-32 md:-mb-48">
                        <div className="relative">
                            {/* Floating badges */}
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 0.4 }}
                                className="absolute -top-4 -right-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden md:flex">
                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center"><Gauge size={16} className="text-green-500" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-dark leading-none">98/100</div><div className="text-[10px] text-gray font-medium">PageSpeed</div></div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, duration: 0.4 }}
                                className="absolute -bottom-4 -left-4 z-20 bg-dark rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 hidden md:flex">
                                <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center"><Smartphone size={14} className="text-orange" strokeWidth={3} /></div>
                                <div><div className="text-xs font-black text-white leading-none">Mobile-First</div><div className="text-[10px] text-white/50 font-medium">Always</div></div>
                            </motion.div>

                            {/* Browser window */}
                            <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400/60" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/60" />
                                    </div>
                                    <div className="flex-1 mx-3 bg-white/10 rounded-lg px-3 py-1 text-xs text-white/40 font-mono">yourbusiness.com</div>
                                </div>
                                <div className="p-6 md:p-8 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="w-24 h-3 bg-orange/40 rounded-full" />
                                        <div className="flex gap-3"><div className="w-14 h-2 bg-white/15 rounded-full" /><div className="w-14 h-2 bg-white/15 rounded-full" /><div className="w-14 h-2 bg-white/15 rounded-full" /><div className="w-20 h-7 bg-orange/40 rounded-md" /></div>
                                    </div>
                                    <div className="pt-8 pb-4 space-y-3 max-w-md">
                                        <div className="w-4/5 h-6 bg-white/20 rounded-full" />
                                        <div className="w-3/5 h-6 bg-orange/30 rounded-full" />
                                        <div className="w-3/4 h-2.5 bg-white/10 rounded-full mt-5" />
                                        <div className="w-2/3 h-2.5 bg-white/10 rounded-full" />
                                        <div className="flex gap-3 pt-5">
                                            <div className="w-32 h-9 bg-orange/50 rounded-lg" />
                                            <div className="w-32 h-9 bg-white/10 rounded-lg border border-white/10" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 pt-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/5">
                                                <div className="w-10 h-10 bg-orange/20 rounded-lg mb-3" />
                                                <div className="w-full h-2.5 bg-white/10 rounded-full mb-2" />
                                                <div className="w-3/4 h-2.5 bg-white/10 rounded-full" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-full h-full bg-orange/5 rounded-3xl -z-10 hidden md:block" />
                        </div>
                    </motion.div>
                </section>

                <TrustBadges />

                {/* ───── TEMPLATE vs CUSTOM COMPARISON ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                                className="inline-flex items-center justify-center w-16 h-16 bg-orange/10 rounded-full mb-6">
                                <RefreshCw size={32} className="text-orange" strokeWidth={2.5} />
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                Template vs. <span className="text-orange">Custom-Built</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed">See why {CITY} businesses are ditching Wix, Squarespace, and WordPress templates for hand-coded websites.</p>
                        </div>

                        {/* Desktop table: hidden on mobile */}
                        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-light overflow-hidden">
                            <div className="grid grid-cols-3 text-center font-bold text-sm uppercase tracking-wider border-b border-gray-light">
                                <div className="p-4 text-gray">Feature</div>
                                <div className="p-4 text-red-400 bg-red-50/50">Template Sites</div>
                                <div className="p-4 text-orange bg-orange/5">Boostify Custom</div>
                            </div>
                            {comparisonData.map((row, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                    className={`grid grid-cols-3 text-center text-sm ${i < comparisonData.length - 1 ? 'border-b border-gray-light' : ''}`}>
                                    <div className="p-4 font-bold text-dark">{row.feature}</div>
                                    <div className="p-4 text-gray bg-red-50/20">{row.template}</div>
                                    <div className="p-4 font-bold text-dark bg-orange/5 flex items-center justify-center gap-2">
                                        <Check size={14} className="text-green-500" strokeWidth={3} /> {row.custom}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile stacked cards: hidden on desktop */}
                        <div className="md:hidden space-y-4">
                            {comparisonData.map((row, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-light overflow-hidden">
                                    <div className="px-5 py-3 bg-gray-50 border-b border-gray-light">
                                        <span className="font-black text-dark text-sm uppercase tracking-wider">{row.feature}</span>
                                    </div>
                                    <div className="grid grid-cols-2 divide-x divide-gray-light">
                                        <div className="p-4 text-center bg-red-50/30">
                                            <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1.5">Template</div>
                                            <div className="text-sm text-gray font-medium">{row.template}</div>
                                        </div>
                                        <div className="p-4 text-center bg-orange/[0.03]">
                                            <div className="text-[10px] font-bold text-orange uppercase tracking-wider mb-1.5">Boostify</div>
                                            <div className="text-sm font-bold text-dark flex items-center justify-center gap-1.5">
                                                <Check size={13} className="text-green-500 shrink-0" strokeWidth={3} /> {row.custom}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── PERFORMANCE TABS ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                Performance That <span className="text-orange">Speaks for Itself</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed max-w-3xl mx-auto">Every website we build is measured by three metrics: speed, conversions, and search visibility.</p>
                        </div>

                        {/* Tab buttons */}
                        <div className="flex justify-center gap-3 mb-12">
                            {tabs.map((tab, i) => (
                                <button key={i} onClick={() => setActiveTab(i)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === i ? 'bg-orange text-white shadow-lg shadow-orange/20' : 'bg-gray-100 text-gray hover:bg-gray-200'}`}>
                                    <tab.icon size={16} strokeWidth={2.5} /> {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <AnimatePresence mode="wait">
                            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-3xl font-black text-dark mb-4 tracking-tight">{tabs[activeTab].title}</h3>
                                    <p className="text-lg text-gray font-medium leading-relaxed mb-8">{tabs[activeTab].desc}</p>
                                    <div className="inline-flex items-center gap-4 bg-dark rounded-2xl px-8 py-5">
                                        <div className="text-4xl font-black text-orange">{tabs[activeTab].stat}</div>
                                        <div className="text-sm font-bold text-white/60 uppercase tracking-wider">{tabs[activeTab].statLabel}</div>
                                    </div>
                                </div>
                                <div className="bg-dark rounded-2xl p-8 border border-white/10">
                                    <div className="space-y-6">
                                        {tabs[activeTab].visual.map((bar, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="font-bold text-white/60">{bar.label}</span>
                                                    <span className="font-black text-white">{bar.time}</span>
                                                </div>
                                                <div className="h-5 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${bar.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }}
                                                        className={`h-full ${bar.color} rounded-full`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* ───── WHAT'S INCLUDED: Feature Grid ───── */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                Every Site Includes <span className="text-orange">Everything</span>
                            </h2>
                            <p className="text-xl text-gray font-medium leading-relaxed max-w-3xl mx-auto">No upsells, no surprise fees. Every website we build ships with these features standard.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-light hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 group-hover:bg-orange group-hover:text-white transition-all duration-300">
                                        <feat.icon size={28} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark mb-3">{feat.title}</h3>
                                    <p className="text-gray font-medium leading-relaxed">{feat.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── PROCESS TIMELINE ───── */}
                <section className="py-24 px-6 bg-dark text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/3" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                                From Concept to <span className="text-orange">Launch</span>
                            </h2>
                            <p className="text-xl text-white/60 font-medium leading-relaxed max-w-3xl mx-auto">Our proven 4-step process. No guesswork, no delays, no surprises.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {processSteps.map((step, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all group">
                                    <div className="flex items-start gap-6">
                                        <div className="shrink-0">
                                            <div className="w-16 h-16 bg-orange/20 rounded-2xl flex items-center justify-center group-hover:bg-orange transition-all">
                                                <step.icon size={28} className="text-orange group-hover:text-white transition-colors" strokeWidth={2.5} />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-orange font-black text-lg">{step.step}</span>
                                                <span className="px-2 py-0.5 bg-white/10 rounded-md text-xs font-bold text-white/50 uppercase">{step.duration}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                            <p className="text-white/60 font-medium leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* ───── GUARANTEE ───── */}
                <section className="py-20 px-6 bg-light/30">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                            <div className="w-20 h-20 bg-dark rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                                <ShieldCheck size={40} className="text-orange" strokeWidth={2} />
                            </div>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                            The <span className="text-orange">Boostify Guarantee</span>
                        </h2>
                        <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
                            If your new website doesn't load in under 2 seconds and score 95+ on Google PageSpeed, we'll keep optimizing until it does: at no extra charge.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['Sub-2s Speed', '95+ PageSpeed', '100% Mobile-First', 'SEO Foundation', 'Conversion Tracked'].map((item, i) => (
                                <div key={i} className="px-5 py-2.5 rounded-full bg-white border border-gray-light text-sm font-bold text-dark flex items-center gap-2 shadow-sm">
                                    <Check size={14} className="text-green-500" strokeWidth={3} /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── FAQ ───── */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">{CITY} Web Design FAQ</h2>
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
