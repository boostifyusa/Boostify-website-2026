import React, { useState, useEffect } from 'react';
import { SeoHead } from '../components/SeoHead';
import { TrustBadges } from '../components/TrustBadges';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle2, ChevronDown, Star, Layout, Search, MousePointerClick, Zap, Bot, ArrowRight, Check, CheckCircle } from 'lucide-react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const FAQItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-light last:border-0 relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
            >
                <h3 className="text-xl font-bold text-dark group-hover:text-orange transition-colors pr-8">{question}</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${isOpen ? 'bg-orange text-white border-orange' : 'bg-gray-50 text-gray-500 border-gray-light group-hover:bg-orange/10 group-hover:text-orange group-hover:border-orange/20'}`}>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="text-gray font-medium pb-8 max-w-3xl leading-relaxed text-lg pt-2">{answer}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Extracted form component to utilize ReCAPTCHA context
const AuditForm = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        website: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!executeRecaptcha) {
            setError('ReCAPTCHA not ready. Please refresh.');
            setLoading(false);
            return;
        }

        try {
            const token = await executeRecaptcha('campaign_growth_form');

            const payload = {
                name: formData.name,
                email: 'campaign-lead@boostifyusa.local', // Placeholder to satisfy endpoint if required
                phone: formData.phone,
                service: 'Quote & Strategy (Campaign)',
                message: `🔥 NEW CAMPAIGN LEAD 🔥\n\nSource: Central Valley Campaign Landing Page (/campaign)\nRequested: Custom Web Design Quote & Strategy\n\nWebsite/Business URL: ${formData.website ? formData.website : 'None provided - (Potential New Business/From Scratch Build)'}\nPhone Number: ${formData.phone}\n\n* Note: This lead originated directly from the paid ads funnel. Please follow up ASAP.`,
                consentPromo: false,
                consentService: false,
                recaptchaToken: token
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const text = await response.text();
                try {
                    const data = JSON.parse(text);
                    throw new Error(data.error || 'Failed to send message');
                } catch (e) {
                    throw new Error(`Server Error (${response.status}): Please try again.`);
                }
            }

            setSubmitted(true);
        } catch (err: any) {
            console.error('Submission error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-8 border-4 border-green-500/20 text-center"
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-dark mb-3 tracking-tight">
                    Plan Requested!
                </h3>
                <p className="text-gray font-medium text-sm mb-6">
                    We've received your information and are analyzing your online presence. We'll be in touch shortly at {formData.phone}.
                </p>
                <button
                    onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', phone: '', website: '' });
                    }}
                    className="text-orange text-sm font-bold hover:underline"
                >
                    Submit another request
                </button>
            </motion.div>
        );
    }

    return (
        <div id="audit-form" className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-8 border-4 border-white hover:border-orange/20 transition-all duration-300">
            <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs font-bold tracking-widest uppercase mb-4 border border-green-500/20">
                    <Zap size={14} className="text-green-500" /> FREE • TAKES 30 SECONDS
                </span>
                <h2 className="text-2xl font-black mb-2 tracking-tight">Let's Build Your Custom Website</h2>
                <p className="text-sm text-gray font-medium">Stop losing leads to competitors. Get a free proposal and SEO strategy tailored for your Central Valley business.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-dark mb-1.5 text-left">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-light focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/10 transition-all outline-none"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-dark mb-1.5 text-left">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-light focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/10 transition-all outline-none"
                        placeholder="(559) 555-0123"
                    />
                </div>
                <div>
                    <label htmlFor="website" className="block text-sm font-bold text-dark mb-1.5 text-left">Website URL (optional)</label>
                    <input
                        type="url"
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-light focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/10 transition-all outline-none"
                        placeholder="www.yourwebsite.com"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center px-4 py-3.5 md:py-4 bg-dark text-white text-base md:text-lg font-bold rounded-xl hover:bg-black transition-all duration-300 shadow-lg mt-6 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <span className="text-center">{loading ? 'Submitting...' : 'Request a Free Quote & Strategy'}</span>
                    {!loading && <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 shrink-0 group-hover:translate-x-1 transition-transform" />}
                </button>

                {error && (
                    <p className="text-red-500 text-xs font-bold text-center mt-3">{error}</p>
                )}

                <p className="text-center font-bold text-xs text-gray/50 mt-4 tracking-wide uppercase">No spam. 100% free quote.</p>
            </form>
        </div>
    );
};

export function CampaignLandingPage() {
    const [showStickyCTA, setShowStickyCTA] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past the initial hero/form area
            if (window.scrollY > 600) {
                setShowStickyCTA(true);
            } else {
                setShowStickyCTA(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const scrollToForm = () => {
        const formElement = document.getElementById('audit-form');
        if (formElement) {
            // Get the element's position relative to the viewport
            const rect = formElement.getBoundingClientRect();
            // Calculate absolute position on the page, minus the header height (~80px) and some padding
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - 100;

            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-dark relative selection:bg-orange/20 selection:text-dark flex flex-col overflow-x-hidden w-full">
            <SeoHead
                title="Central Valley Web Design : Custom Websites That Win You More Clients"
                description="Custom, SEO-optimized web design for Central Valley businesses. Mobile-first, fast loading, and built to convert visitors into customers."
                canonicalUrl="/campaign"
                noIndex={true}
            />

            {/* Simplified Header with Real Logo */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-light py-4 px-4 md:py-4 md:px-12 flex justify-between items-center transition-all duration-300">
                <div className="flex items-center gap-2">
                    <img
                        src="/Group-116.webp"
                        alt="Boostify Logo"
                        width="1184"
                        height="152"
                        fetchPriority="high"
                        className="h-8 md:h-10 w-auto object-contain"
                    />
                </div>
                <a
                    href="tel:5597853834"
                    className="flex flex-col items-end group"
                >
                    <span className="text-xl font-black text-dark group-hover:text-orange transition-colors tracking-tight">(559) 785-3834</span>
                    <span className="text-[10px] md:text-xs font-bold text-orange tracking-widest uppercase flex items-center gap-1 bg-orange/10 px-1.5 md:px-2 py-0.5 rounded mt-0.5">
                        CALL OR TEXT
                    </span>
                </a>
            </header>

            <main className="flex-grow pt-[72px]">
                {/* Modern Hero Section aligned with HomePageV2 */}
                <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-6 overflow-hidden bg-white">
                    {/* Topographic Background Pattern */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.4]"
                        style={{
                            backgroundImage: 'url(/hero-bg-pattern-micro.webp)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />

                    {/* Radial white fade */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%)'
                        }}
                    />

                    {/* Gradient Orbs */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-orange/[0.05] rounded-full blur-[120px] -z-10 pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                            {/* Left Content */}
                            <div className="flex-1 text-center lg:text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-orange/10 text-orange font-bold text-[10px] md:text-sm tracking-widest uppercase mb-6 md:mb-8 border border-orange/20 mx-auto"
                                >
                                    <span className="relative flex h-2 w-2 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange shrink-0"></span>
                                    </span>
                                    <span className="text-center">Recommended in Fresno • Central Valley Web Design</span>
                                </motion.div>

                                {/* Fixed Hanging Word */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="text-[3.25rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl font-black text-dark tracking-tighter mb-6 md:mb-8 max-w-[800px] mx-auto lg:mx-0 flex flex-col sm:block"
                                >
                                    <span>Custom Websites</span>{' '}
                                    <span className="flex flex-wrap sm:inline justify-center items-center gap-x-2">
                                        <span>That</span>{' '}
                                        <span className="relative inline-block px-1 isolate whitespace-nowrap">
                                            <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
                                            <span className="text-orange relative z-10">Win You</span>
                                        </span>{' '}
                                        <span>More</span>
                                        <span>Clients</span>
                                    </span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-lg md:text-xl lg:text-2xl text-gray font-medium mb-8 md:mb-10 leading-relaxed max-w-xl md:max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0"
                                >
                                    We design Central Valley websites that generate calls and leads. Plus Local SEO, Google Ads, and AI automations.
                                </motion.p>

                                {/* Micro Trust Indicators */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-col items-center lg:items-start gap-4"
                                >
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                        ))}
                                        <span className="font-black text-xl ml-2 text-dark tracking-tight">5.0</span>
                                    </div>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 text-xs md:text-sm font-bold text-dark uppercase tracking-wide">
                                        <span className="flex items-center gap-1.5 md:gap-2">
                                            <Check className="w-3 h-3 md:w-4 md:h-4 text-orange" strokeWidth={3} /> Trusted by 50+ Local SMBs
                                        </span>
                                        <span className="flex items-center gap-1.5 md:gap-2">
                                            <Check className="w-3 h-3 md:w-4 md:h-4 text-orange" strokeWidth={3} /> Web Design
                                        </span>
                                        <span className="flex items-center gap-1.5 md:gap-2">
                                            <Check className="w-3 h-3 md:w-4 md:h-4 text-orange" strokeWidth={3} /> Local SEO
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Founder Trust Element */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="mt-8 md:mt-10 p-4 md:p-5 bg-gray-50/80 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left max-w-xl mx-auto lg:mx-0 shadow-sm"
                                >
                                    <img src="/1733568683912.jpg" alt="Joaquin Estrada" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shadow-md shrink-0 border-2 border-white" />
                                    <div>
                                        <p className="font-bold text-dark mb-1 text-sm md:text-base">Joaquin Estrada, Founder</p>
                                        <p className="text-xs md:text-sm text-gray font-medium leading-snug">
                                            Invited by the SBA to speak on SEO and AI, Joaquin's data-driven strategies have doubled conversions for local businesses.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Content: Lead Capture Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="w-full max-w-md lg:max-w-[480px] shrink-0 mx-auto"
                            >
                                <GoogleReCaptchaProvider
                                    reCaptchaKey={(import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI").trim()}
                                    scriptProps={{ async: false, defer: false, appendTo: 'head' }}
                                >
                                    <AuditForm />
                                </GoogleReCaptchaProvider>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Existing TrustBadges Component */}
                <TrustBadges />

                {/* Problem Agitation Section */}
                <section className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">Sound Familiar?</h2>
                            <p className="text-xl text-gray font-medium max-w-2xl mx-auto tracking-tight">
                                We talk to small business owners every day who are frustrated with their current online presence.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Problem 1 */}
                            <div className="bg-gray-50/80 p-8 md:p-10 rounded-3xl border border-gray-100 flex flex-col group hover:border-gray-200 transition-colors relative overflow-hidden shadow-sm">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                <h3 className="text-2xl font-black mb-4 tracking-tight text-dark">"My website looks terrible on my phone"</h3>
                                <p className="text-gray text-lg font-medium leading-relaxed mb-10 text-pretty">
                                    Customers have to pinch and zoom just to read your phone number. If it's hard to use on mobile, they'll just call your competitor.
                                </p>

                                {/* Abstract Graphic */}
                                <div className="mt-auto relative z-0">
                                    <div className="flex gap-4 opacity-50 justify-center">
                                        <div className="w-16 h-24 bg-gray-200 rounded-xl outline outline-4 outline-dashed outline-gray-300 outline-offset-[-2px]" />
                                        <div className="w-20 h-24 bg-gray-200 rounded-xl relative -top-4 -left-2 rotate-6 border border-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Problem 2 */}
                            <div className="bg-gray-50/80 p-8 md:p-10 rounded-3xl border border-gray-100 flex flex-col group hover:border-gray-200 transition-colors relative overflow-hidden shadow-sm">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                <h3 className="text-2xl font-black mb-4 tracking-tight text-dark">"I can't find my own business on Google"</h3>
                                <p className="text-gray text-lg font-medium leading-relaxed mb-10 text-pretty">
                                    You have a website, but it's invisible. Without proper Local SEO structure, Google doesn't know you exist and competitors outrank you.
                                </p>

                                {/* Abstract Graphic */}
                                <div className="mt-auto relative z-0 flex flex-col gap-2 opacity-50">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                                    <div className="flex gap-1 mt-1">
                                        <div className="w-3 h-3 rounded bg-gray-300" />
                                        <div className="w-3 h-3 rounded bg-gray-300" />
                                        <div className="w-3 h-3 rounded bg-gray-300" />
                                    </div>
                                    <div className="text-[10px] font-bold text-gray-400 mt-1">NO RESULTS FOUND</div>
                                </div>
                            </div>

                            {/* Problem 3 */}
                            <div className="bg-gray-50/80 p-8 md:p-10 rounded-3xl border border-gray-100 flex flex-col group hover:border-gray-200 transition-colors relative overflow-hidden shadow-sm">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                <h3 className="text-2xl font-black mb-4 tracking-tight text-dark">"I have to pay my dev just to change a line"</h3>
                                <p className="text-gray text-lg font-medium leading-relaxed mb-10 text-pretty">
                                    Want to change a photo or update your hours? You're held hostage by developers and have zero control over your own asset.
                                </p>

                                {/* Abstract Graphic */}
                                <div className="mt-auto relative z-0 flex gap-2 overflow-hidden opacity-50">
                                    <div className="w-full bg-gray-200 h-16 rounded flex items-center px-4 relative">
                                        <div className="w-full h-1/2 bg-gray-300 border border-red-300 rounded flex items-center justify-center">
                                            <span className="text-[8px] font-bold text-red-500 tracking-widest uppercase">Locked</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 text-center">
                            <h3 className="text-4xl font-black mb-10 tracking-tight">We fix all of this.</h3>
                            <button
                                onClick={scrollToForm}
                                className="inline-flex py-4 px-8 bg-orange text-white text-lg font-bold rounded-xl hover:bg-orange-hover transition-all duration-300 shadow-xl shadow-orange/20 hover:shadow-orange/30 transform hover:-translate-y-1"
                            >
                                Request a Free Quote & Strategy
                            </button>
                        </div>
                    </div>
                </section>

                {/* Features / Solution Section */}
                <section className="py-24 md:py-32 px-6 bg-light/30 border-y border-gray-light/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-6xl lg:text-[4rem] font-black mb-6 tracking-tighter leading-none">Every Site We Build<br />Comes With</h2>
                            <p className="text-xl text-gray font-medium max-w-2xl mx-auto mt-6">
                                No fluff. Just the features proven to build trust and make it incredibly easy for customers to contact you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {/* Feature 1 */}
                            <div className="bg-gradient-to-b from-gray-50/80 to-white rounded-3xl p-8 md:p-10 border-4 border-white shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)] hover:border-orange/20 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="z-10 relative">
                                    <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-8 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                                        <Layout className="w-7 h-7" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark mb-4 tracking-tight">Mobile-First Design</h3>
                                    <p className="text-gray font-medium leading-relaxed text-lg mb-8">
                                        Looks perfect and loads instantly on all smartphones.
                                    </p>
                                </div>

                                {/* Visual: Mobile Browser Mockup */}
                                <div className="mt-auto relative z-0 h-40 w-full flex justify-center pt-2 overflow-visible">
                                    <div className="w-3/4 max-w-[200px] h-[360px] bg-slate-100 rounded-[2.5rem] border-[8px] border-slate-200 relative overflow-hidden group-hover:-translate-y-4 transition-transform duration-700 shadow-inner translate-y-20 flex flex-col items-center pt-6 px-4 bg-gradient-to-b from-slate-100 to-white">
                                        {/* Camera Notch */}
                                        <div className="absolute top-0 inset-x-0 w-1/3 h-6 bg-white mx-auto rounded-b-3xl border border-t-0 border-slate-200 shadow-sm" />

                                        {/* Placeholder Content */}
                                        <div className="w-full space-y-4 flex-1">
                                            {/* Header */}
                                            <div className="flex justify-between items-center w-full">
                                                <div className="w-10 h-4 bg-slate-200 rounded-full" />
                                                <div className="flex gap-1.5">
                                                    <div className="w-3.5 h-3.5 bg-slate-200 rounded-sm" />
                                                    <div className="w-3.5 h-3.5 bg-slate-200 rounded-sm" />
                                                </div>
                                            </div>
                                            {/* Hero Image */}
                                            <div className="w-full h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl shadow-sm" />
                                            {/* Text lines */}
                                            <div className="space-y-2 w-full pt-1">
                                                <div className="w-5/6 h-2.5 bg-slate-200 rounded-full" />
                                                <div className="w-3/4 h-2.5 bg-slate-200 rounded-full" />
                                                <div className="w-1/2 h-2.5 bg-slate-200 rounded-full" />
                                            </div>
                                            {/* Content blocks */}
                                            <div className="grid grid-cols-2 gap-3 w-full opacity-60">
                                                <div className="h-16 bg-slate-200 rounded-xl" />
                                                <div className="h-16 bg-slate-200 rounded-xl" />
                                                <div className="h-16 bg-slate-200 rounded-xl" />
                                                <div className="h-16 bg-slate-200 rounded-xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-gradient-to-b from-gray-50/80 to-white rounded-3xl p-8 md:p-10 border-4 border-white shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)] hover:border-orange/20 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="z-10 relative">
                                    <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-8 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                                        <Search className="w-7 h-7" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark mb-4 tracking-tight">Local SEO Structure</h3>
                                    <p className="text-gray font-medium leading-relaxed text-lg mb-8">
                                        Built from the ground up to rank in the Central Valley.
                                    </p>
                                </div>

                                {/* Visual: SEO Placeholder */}
                                <div className="mt-auto relative z-0 h-28 flex flex-col justify-end group-hover:scale-105 transition-transform duration-300 translate-y-2">
                                    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 relative">
                                        <div className="h-2 w-16 bg-blue-100 rounded mb-2" />
                                        <div className="h-3 w-4/5 bg-blue-500/80 rounded mb-1.5" />
                                        <div className="h-2 w-full bg-green-500/60 rounded" />
                                    </div>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-gradient-to-b from-gray-50/80 to-white rounded-3xl p-8 md:p-10 border-4 border-white shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)] hover:border-orange/20 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="z-10 relative">
                                    <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-8 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                                        <Phone className="w-7 h-7" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark mb-4 tracking-tight">Click-to-Call Buttons</h3>
                                    <p className="text-gray font-medium leading-relaxed text-lg mb-8">
                                        Floating buttons so customers can call with one tap.
                                    </p>
                                </div>

                                {/* Visual: Floating Call Button */}
                                <div className="mt-auto relative z-0 h-24 flex justify-center items-end pb-2">
                                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-xl shadow-green-500/30 group-hover:animate-bounce">
                                        <Phone className="w-6 h-6 text-white" strokeWidth={3} fill="currentColor" />
                                    </div>
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-gradient-to-b from-gray-50/80 to-white rounded-3xl p-8 md:p-10 border-4 border-white shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)] hover:border-orange/20 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="z-10 relative">
                                    <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-8 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                                        <Zap className="w-7 h-7" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark mb-4 tracking-tight">Fast Load Speeds</h3>
                                    <p className="text-gray font-medium leading-relaxed text-lg mb-8">
                                        Lightning fast hosting so visitors never bounce.
                                    </p>
                                </div>

                                {/* Visual: PageSpeed Score Graphic */}
                                <div className="mt-auto relative z-0 h-24 flex justify-center items-end pb-2 group-hover:-translate-y-2 transition-transform duration-300">
                                    <div className="relative flex items-center justify-center">
                                        <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E5E5" strokeWidth="8" />
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="8" strokeDasharray="283" strokeDashoffset="28" className="group-hover:strokeDashoffset-0 transition-all duration-1000 ease-out" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-black text-green-500 tracking-tighter">99<span className="text-xl">+</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-gradient-to-b from-gray-50/80 to-white rounded-3xl p-8 md:p-10 border-4 border-white shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)] hover:border-orange/20 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="z-10 relative">
                                    <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-8 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                                        <MousePointerClick className="w-7 h-7" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark mb-4 tracking-tight">Google Ads Ready</h3>
                                    <p className="text-gray font-medium leading-relaxed text-lg mb-8">
                                        Targeted landing pages that put your business in front of ready-to-buy customers.
                                    </p>
                                </div>

                                {/* Visual: Google Search Result Mockup */}
                                <div className="mt-auto relative z-0 h-28 flex flex-col justify-end group-hover:-translate-y-2 transition-transform duration-300 px-6 pb-2">
                                    <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 flex gap-3 relative overflow-hidden group-hover:border-orange/30 w-full max-w-[240px] mx-auto">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-orange/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
                                        <div className="w-8 h-8 rounded bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                            <div className="w-4 h-4 bg-orange/20 rounded-sm" />
                                        </div>
                                        <div className="flex-1 text-left space-y-1.5 pt-0.5">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[9px] font-black text-dark tracking-wide">Sponsored</span>
                                                <span className="text-[10px] text-gray-400 font-bold">•</span>
                                                <span className="text-[9px] text-gray-500 font-bold max-w-[80px] truncate">yourbusiness.com</span>
                                            </div>
                                            <div className="h-2.5 w-full bg-blue-600/90 rounded-sm" />
                                            <div className="h-1.5 w-3/4 bg-gray-400/80 rounded-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-gradient-to-b from-gray-50/80 to-white rounded-3xl p-8 md:p-10 border-4 border-white shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.08)] hover:border-orange/20 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="z-10 relative">
                                    <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-8 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                                        <Bot className="w-7 h-7" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark mb-4 tracking-tight">AI Automations</h3>
                                    <p className="text-gray font-medium leading-relaxed text-lg mb-8">
                                        Custom AI workflows that save you hours on follow-ups, scheduling, and lead nurturing.
                                    </p>
                                </div>

                                {/* Visual: Automation Workflow */}
                                <div className="mt-auto relative z-0 h-32 flex flex-col justify-end items-center translate-y-2 pb-2">
                                    <div className="relative w-48 mx-auto -translate-x-2">
                                        {/* Lead Input Node */}
                                        <div className="absolute -top-14 left-0 w-10 h-10 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center z-20 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 group-hover:shadow-orange/20">
                                            <div className="w-5 h-5 bg-orange/10 rounded flex items-center justify-center text-orange"><Bot size={14} /></div>
                                        </div>

                                        {/* Connection Line */}
                                        <svg className="absolute -top-10 left-5 w-16 h-12 -z-0 opacity-40 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 10 C30 10 30 70 80 70" stroke="#f97316" strokeWidth="4" strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
                                        </svg>

                                        {/* Action Node 1 */}
                                        <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2 relative z-10 w-36 ml-auto -translate-y-6">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            <div className="h-1.5 w-16 bg-gray-200 rounded" />
                                        </div>
                                        <div className="w-0.5 h-4 bg-gray-200 ml-auto mr-[4.5rem] -mt-6 z-0" />

                                        {/* Action Node 2 */}
                                        <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2 relative z-10 w-40 ml-auto group-hover:bg-orange/5 group-hover:border-orange/20 transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-green-500 group-hover:animate-pulse" />
                                            <div className="h-1.5 w-24 bg-gray-200 rounded group-hover:bg-orange/40 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 text-center">
                            <button
                                onClick={scrollToForm}
                                className="inline-flex items-center justify-center px-10 py-5 bg-white text-dark border-2 border-gray-light font-bold text-lg rounded-lg hover:border-dark hover:bg-dark hover:text-white transition-all duration-300 shadow-sm"
                            >
                                See What Your New Site Could Look Like
                            </button>
                        </div>
                    </div>
                </section>

                {/* Existing Testimonials Component */}
                <TestimonialsSection />

                {/* FAQs */}
                <section className="py-24 md:py-32 px-6 bg-white shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-6xl font-black mb-16 text-center tracking-tight">Common Questions</h2>

                        <div className="bg-white rounded-3xl border border-gray-light p-8 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
                            <FAQItem
                                question="Will my website look good on mobile phones?"
                                answer="Absolutely. We take a 'mobile-first' approach. The majority of your customers are searching on their phones, so we ensure your site is blazing fast, easy to navigate, and features quick click-to-call buttons for mobile users."
                            />
                            <FAQItem
                                question="Can I update the website myself?"
                                answer="Yes! We build sites on modern, user-friendly platforms (or provide custom CMS solutions) that allow you to easily log in and swap out photos, text, or post blog updates without needing to pay a developer every time."
                            />
                            <FAQItem
                                question="Will this help me show up on Google?"
                                answer={
                                    <>
                                        <p className="font-bold text-dark mb-3">Yes. Unlike cheap website builders, we bake Local SEO into the foundation of your site.</p>
                                        <p>We structure your headings, optimize your images, and integrate your Google Business Profile so you rank higher in the Central Valley.</p>
                                    </>
                                }
                            />
                            <FAQItem
                                question="How long does it take to launch?"
                                answer="Most standard brochure websites launch within 2-4 weeks. More complex projects involving AI automations or extensive custom functionality may take 4-8 weeks. We'll give you a precise timeline during our initial strategy session."
                            />
                        </div>
                    </div>
                </section>

                {/* Final CTA Strip */}
                <section className="py-24 md:py-32 px-6 bg-dark text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange rounded-full blur-[120px]" />
                    </div>

                    <div className="max-w-4xl mx-auto relative z-10">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter">Ready to Stop<br />Losing Leads?</h2>
                        <p className="text-xl md:text-2xl text-gray-300 mb-14 max-w-2xl mx-auto font-medium">
                            Get a custom website that actually brings in customers. Free quote and strategy, no obligation.
                        </p>

                        <button
                            onClick={scrollToForm}
                            className="inline-flex items-center justify-center px-10 py-6 bg-orange text-white text-xl font-bold rounded-xl hover:bg-orange-hover transition-all duration-300 shadow-xl shadow-orange/20 hover:shadow-orange/30 transform hover:-translate-y-1 mb-10 w-full sm:w-auto"
                        >
                            Request a Free Quote & Strategy
                            <ArrowRight className="ml-2 h-6 w-6" />
                        </button>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-bold text-gray-400 tracking-widest uppercase">
                            <a href="tel:5597853834" className="hover:text-white transition-colors flex items-center gap-2">
                                <Phone size={16} /> (559) 785-3834
                            </a>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-green-500" /> FREE CONSULTATION
                            </span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Mobile Sticky CTA */}
            <AnimatePresence>
                {showStickyCTA && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3 md:p-4 bg-white/95 backdrop-blur-md border-t border-gray-light shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center gap-3 pb-6 md:pb-safe"
                    >
                        <a
                            href="tel:5597853834"
                            className="flex-shrink-0 flex items-center justify-center w-[3.25rem] h-[3.25rem] bg-gray-50 text-dark rounded-xl border border-gray-light shadow-sm active:scale-95 transition-transform"
                            aria-label="Call Us"
                        >
                            <Phone className="w-5 h-5 text-orange" strokeWidth={2.5} />
                        </a>
                        <button
                            onClick={scrollToForm}
                            className="flex-1 flex items-center justify-center bg-orange text-white font-bold text-[15px] h-[3.25rem] rounded-xl shadow-lg shadow-orange/20 active:scale-95 transition-transform"
                        >
                            <span className="truncate">Get Custom Proposal</span>
                            <ArrowRight className="ml-1.5 w-4 h-4 shrink-0" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
