import { } from 'react';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { Footer } from '../components/Footer';
import { ProcessSection } from '../components/ProcessSection';
import { StatsSection } from '../components/StatsSection';
import { WorkShowcase } from '../components/WorkShowcase';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Zap, Globe, Search, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

const homeSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Boostify USA: Fresno Web Design & Marketing Agency",
    "url": "https://boostifyusa.com/",
    "description": "Most Fresno businesses lose money on websites that don't convert. Boostify USA builds custom web design & SEO systems that generate leads 24/7 for local businesses.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.8250248,
        "longitude": -119.8684005
    },
    "areaServed": [
        { "@type": "City", "name": "Fresno" },
        { "@type": "City", "name": "Clovis" },
        { "@type": "City", "name": "Madera" },
        { "@type": "City", "name": "Central Valley" }
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Marketing Services",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Optimization" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local Marketing" } }
        ]
    },
    "priceRange": "$$",
    "telephone": "+1-559-785-3834",
    "contactPoint": [
        { "@type": "ContactPoint", "telephone": "+1-559-785-3834", "contactType": "sales" },
        { "@type": "ContactPoint", "telephone": "+1-559-201-8706", "contactType": "customer service" }
    ],
    "email": "hello@boostifyusa.com",
    "logo": "https://boostifyusa.com/icon.png",
    "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" }
    ]
};

export function HomePageV2() {
    const { scrollY } = useScroll();

    // Badge 1 (right side) blurs first, flies right
    const badge1Opacity = useTransform(scrollY, [700, 1000], [1, 0]);
    const badge1Blur = useTransform(scrollY, [700, 1000], [0, 14]);
    const badge1Filter = useMotionTemplate`blur(${badge1Blur}px)`;
    const badge1Y = useTransform(scrollY, [700, 1000], [0, 20]);
    const badge1X = useTransform(scrollY, [700, 1000], [0, 120]);

    // Badge 2 (bottom-left) blurs after, flies left
    const badge2Opacity = useTransform(scrollY, [850, 1150], [1, 0]);
    const badge2Blur = useTransform(scrollY, [850, 1150], [0, 14]);
    const badge2Filter = useMotionTemplate`blur(${badge2Blur}px)`;
    const badge2Y = useTransform(scrollY, [850, 1150], [0, 30]);
    const badge2X = useTransform(scrollY, [850, 1150], [0, -120]);

    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title="Fresno Web Design Agency | Your Site Should Be Your #1 Closer"
                description="Most Fresno businesses lose money on websites that don't convert. We fix that. Custom web design & SEO built to generate leads 24/7. See what we can do for you."
                canonicalUrl="/"
            >
                <link rel="preload" as="image" href="/hero-bg-pattern-micro.webp" />
                <script type="application/ld+json">
                    {JSON.stringify(homeSchema)}
                </script>
            </SeoHead>

            <Navigation />

            <main>
                {/* ─── HERO (Original copy, original backgrounds, original browser mockups) ─── */}
                <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-6 overflow-hidden bg-white">
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
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange/[0.03] rounded-full blur-[80px] -z-10 pointer-events-none translate-x-1/3 translate-y-1/3" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Centered Content */}
                        <div className="text-center max-w-4xl mx-auto mb-16 relative">
                            <motion.h1
                                suppressHydrationWarning
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-xs md:text-sm font-bold uppercase tracking-wider mb-8"
                            >
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse shrink-0" />
                                <span className="md:hidden whitespace-nowrap">Fresno Web Design</span>
                                <span className="hidden md:inline whitespace-nowrap">Fresno Web Design & Marketing Agency</span>
                            </motion.h1>

                            <motion.p
                                suppressHydrationWarning
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-6xl lg:text-[5.7rem] font-black text-dark leading-[0.95] tracking-tighter mb-8"
                            >
                                We Build Websites That{' '}
                                <span className="relative inline-block px-2 isolate whitespace-nowrap">
                                    <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
                                    <motion.span
                                        suppressHydrationWarning
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="text-orange relative z-10"
                                    >Actually</motion.span>
                                </span>{' '}
                                Bring Customers In.
                            </motion.p>

                            <motion.p
                                suppressHydrationWarning
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl md:text-2xl text-gray font-medium mb-10 leading-relaxed max-w-3xl mx-auto"
                            >
                                Handcrafted web design & local search systems built to scale Fresno and Central Valley service businesses.
                            </motion.p>

                            <motion.div
                                suppressHydrationWarning
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                            >
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-10 py-5 bg-orange text-white text-lg font-bold rounded-lg hover:bg-orange-hover transition-all duration-300 shadow-xl shadow-orange/20 hover:shadow-orange/30 transform hover:-translate-y-1 w-full sm:w-auto"
                                >
                                    Book a Free Call
                                    <ArrowRight className="ml-2 h-6 w-6" />
                                </Link>
                                <Link
                                    to="/work"
                                    className="inline-flex items-center justify-center px-10 py-5 bg-white text-dark border-2 border-gray-light font-bold text-lg rounded-lg hover:border-dark hover:bg-dark hover:text-white transition-all duration-300 w-full sm:w-auto"
                                >
                                    View Our Work
                                </Link>
                            </motion.div>

                            <motion.div
                                suppressHydrationWarning
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-bold text-dark uppercase tracking-wide mb-6"
                            >
                                <span className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-orange" strokeWidth={3} />
                                    Built to Scale
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-orange" strokeWidth={3} />
                                    Quality Work
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-orange" strokeWidth={3} />
                                    American Operated
                                </span>
                            </motion.div>
                        </div>

                    </div>
                </section>

                {/* ─── OVERLAPPING PORTFOLIO MOCKUP + FLOATING BADGES + STATS BAR ─── */}
                <section className="relative z-20 pb-20 bg-white">
                    <div className="max-w-6xl mx-auto px-6 -mt-10 md:-mt-20 relative">
                        {/* Floating Badges — dark, bold, blur out on scroll */}
                        <motion.div
                            suppressHydrationWarning
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
                            style={{ opacity: badge1Opacity, filter: badge1Filter, y: badge1Y, x: badge1X }}
                            className="absolute top-[15%] -right-8 md:-right-12 z-30 bg-dark rounded-2xl shadow-2xl shadow-dark/30 px-5 py-3.5 flex items-center gap-3 hidden lg:flex"
                        >
                            <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center">
                                <Zap size={20} className="text-orange" strokeWidth={2.5} />
                            </div>
                            <div>
                                <div className="text-sm font-black text-white leading-tight">PageSpeed 98+</div>
                                <div className="text-xs text-white/50 font-medium">Lightning Fast</div>
                            </div>
                        </motion.div>

                        <motion.div
                            suppressHydrationWarning
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.1, duration: 0.5, ease: 'easeOut' }}
                            style={{ opacity: badge2Opacity, filter: badge2Filter, y: badge2Y, x: badge2X }}
                            className="absolute bottom-12 -left-6 md:-left-8 z-30 bg-dark rounded-2xl shadow-2xl shadow-dark/30 px-5 py-3.5 flex items-center gap-3 hidden lg:flex"
                        >
                            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <Check size={20} className="text-green-400" strokeWidth={3} />
                            </div>
                            <div>
                                <div className="text-sm font-black text-white leading-tight">SEO Optimized</div>
                                <div className="text-xs text-white/50 font-medium">Schema + Local</div>
                            </div>
                        </motion.div>

                        {/* Browser Mockup — taller */}
                        <motion.div
                            suppressHydrationWarning
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="bg-white rounded-3xl shadow-2xl shadow-dark/10 p-2 border border-gray-light mb-16 overflow-hidden relative z-10"
                        >
                            {/* Browser frame */}
                            <div className="bg-gray-50 border-b border-gray-light px-4 py-3 flex items-center gap-2 rounded-t-2xl">
                                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                <div className="ml-4 flex-1 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center max-w-[200px] mx-auto">
                                    <span className="text-[8px] text-gray-400 font-medium">
                                        fresnotruckwash.com
                                    </span>
                                </div>
                            </div>
                            {/* Portfolio Image — taller aspect ratio */}
                            <div className="bg-gray-100 aspect-[16/10] w-full rounded-b-lg overflow-hidden relative">
                                <img
                                    src="/FTS-Mock.webp"
                                    fetchPriority="high"
                                    alt="Fresno Truck Wash Portfolio Preview"
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Bar */}
                    <div className="max-w-6xl mx-auto px-6 border-t border-gray-light py-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 bg-white">
                        <div className="text-center md:text-left flex-1 border-b md:border-b-0 md:border-r border-gray-light pb-8 md:pb-0 md:pr-8">
                            <div className="text-sm text-gray font-bold tracking-widest uppercase mb-1">Established</div>
                            <div className="text-3xl font-black text-dark tracking-tighter">2014</div>
                        </div>
                        <div className="text-center md:text-left flex-1 border-b md:border-b-0 md:border-r border-gray-light pb-8 md:pb-0 md:pr-8">
                            <div className="text-sm text-gray font-bold tracking-widest uppercase mb-1">HQ & Local Reach</div>
                            <div className="text-3xl font-black text-dark tracking-tighter">
                                <Link to="/fresno-web-design" className="hover:text-orange transition-colors">Fresno, CA</Link>
                            </div>
                        </div>
                        <div className="text-center md:text-left flex-1 border-b md:border-b-0 md:border-r border-gray-light pb-8 md:pb-0 md:pr-8">
                            <div className="text-sm text-gray font-bold tracking-widest uppercase mb-1">Focus</div>
                            <div className="text-3xl font-black text-dark tracking-tighter">Performance + Design</div>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <svg key={i} className="w-5 h-5 text-orange" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                ))}
                            </div>
                            <div className="text-lg font-bold text-dark tracking-tight">5-Star Proven</div>
                        </div>
                    </div>

                    {/* Slogan / Bridge */}
                    <div className="max-w-6xl mx-auto px-6 py-10 text-center">
                        <p className="text-lg md:text-xl text-gray font-medium tracking-tight">
                            Precision-built websites & search strategies, <span className="text-dark font-bold">trusted by businesses across California.</span>
                        </p>
                    </div>
                </section>

                {/* ─── TRUST BADGES (redesigned for V2 — larger, bolder) ─── */}
                <section className="py-10 md:py-12 bg-light/50">
                    <div className="max-w-6xl mx-auto px-6">
                        <p className="text-xs font-bold text-gray/60 uppercase tracking-[0.25em] text-center mb-10">
                            Trusted by Organizations You Know
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-20">
                            {/* SBA */}
                            <div className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
                                <div className="flex items-center gap-3">
                                    <svg width="52" height="52" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="40" height="40" rx="4" fill="#002E6D" />
                                        <text x="20" y="18" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" fontFamily="Inter, sans-serif">SBA</text>
                                        <rect x="8" y="23" width="24" height="2" fill="#CC0000" />
                                        <rect x="8" y="27" width="24" height="2" fill="white" />
                                        <rect x="8" y="31" width="24" height="2" fill="#CC0000" />
                                    </svg>
                                    <div>
                                        <div className="text-sm font-bold text-dark/70 uppercase tracking-wide leading-tight">U.S. Small Business</div>
                                        <div className="text-sm font-bold text-dark/70 uppercase tracking-wide leading-tight">Administration</div>
                                    </div>
                                </div>
                            </div>
                            {/* Fresno State */}
                            <div className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
                                <div className="flex items-center gap-3">
                                    <svg width="46" height="46" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="16" cy="16" r="16" fill="#DB0032" />
                                        <text x="16" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="900" fontFamily="Inter, sans-serif">FS</text>
                                    </svg>
                                    <div>
                                        <div className="text-lg font-black text-dark/70 uppercase tracking-wider leading-none">Fresno</div>
                                        <div className="text-lg font-black text-dark/70 uppercase tracking-wider leading-none">State</div>
                                    </div>
                                </div>
                            </div>
                            {/* SBDC */}
                            <div className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
                                <div className="flex items-center gap-3">
                                    <svg width="50" height="50" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="18" cy="18" r="18" fill="#1B3A5C" />
                                        <path d="M10 24 L18 10 L26 24 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                                        <circle cx="18" cy="20" r="3" fill="#E8590C" />
                                    </svg>
                                    <div>
                                        <div className="text-sm font-black text-dark/70 uppercase tracking-wider leading-tight">Valley Sierra</div>
                                        <div className="text-xl font-black text-dark/70 uppercase tracking-wider leading-tight">SBDC</div>
                                    </div>
                                </div>
                            </div>
                            {/* Google Marketing */}
                            <div className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
                                <div className="flex items-center gap-3">
                                    <svg viewBox="0 0 24 24" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
                                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                                        </g>
                                    </svg>
                                    <div>
                                        <div className="text-sm font-bold text-dark/70 leading-tight">Google Marketing</div>
                                        <div className="text-sm font-bold text-dark/70 leading-tight">Platform <span className="text-xs font-medium text-gray/50">Certified</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── SERVICES (redesigned for V2) ─── */}
                <section id="services" className="py-24 md:py-32 px-6 bg-light/30">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-5 tracking-tight"
                            >
                                Everything You Need to{' '}
                                <span className="relative inline-block px-2 isolate">
                                    <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
                                    <span className="text-orange relative z-10">Actually</span>
                                </span>{' '}
                                Grow Fresno Businesses.
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-lg md:text-xl text-gray font-medium"
                            >
                                From custom websites to search dominance. Every service is{' '}
                                <span className="text-dark font-bold">precision-built for results</span>, not templates.
                            </motion.p>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Card 1: Web Design (Tall, Left) */}
                            <Link
                                to="/web-design"
                                className="bg-gradient-to-b from-gray-50/80 to-white rounded-3xl p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.04)] shadow-dark/5 hover:shadow-2xl hover:shadow-dark/10 hover:-translate-y-1 transition-all duration-500 flex flex-col relative overflow-hidden group"
                            >
                                <div className="relative z-10">
                                    <div className="w-11 h-11 bg-orange/10 rounded-lg flex items-center justify-center text-orange mb-5">
                                        <Globe size={22} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-dark mb-3 tracking-tight">
                                        Web Design
                                    </h3>
                                    <p className="text-gray font-medium leading-relaxed mb-8 max-w-md">
                                        Beautiful, fast websites that turn visitors into customers. Custom-built to reflect your brand on every device.
                                    </p>
                                    <div className="inline-flex items-center gap-1.5 text-sm font-bold text-dark/50 group-hover:text-orange transition-colors duration-200">
                                        Learn more
                                        <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </div>
                                </div>

                                {/* Visual: Abstract layout in Mac browser chrome */}
                                <div className="mt-auto relative z-0 pt-8">
                                    <div className="relative overflow-hidden rounded-t-xl translate-y-6 group-hover:translate-y-2 transition-transform duration-500">
                                        <div className="bg-gray-50/80 border border-gray-light/40 rounded-t-xl overflow-hidden">
                                            {/* Mac browser chrome */}
                                            <div className="bg-white/80 border-b border-gray-light/50 px-4 py-2.5 flex items-center gap-2">
                                                <div className="flex gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                                                </div>
                                                <div className="ml-3 flex-1 h-5 bg-gray-100/80 rounded-md max-w-[200px]" />
                                            </div>
                                            {/* Client site example — richer content */}
                                            <div className="p-4 bg-white space-y-3">
                                                {/* Mini nav */}
                                                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                                                    <div className="h-3 w-16 bg-dark/60 rounded" />
                                                    <div className="flex gap-3">
                                                        <div className="h-2 w-10 bg-gray-200 rounded" />
                                                        <div className="h-2 w-10 bg-gray-200 rounded" />
                                                        <div className="h-2 w-10 bg-gray-200 rounded" />
                                                    </div>
                                                </div>
                                                {/* Hero area */}
                                                <p className="text-[9px] font-bold text-orange uppercase tracking-widest">Fresh • Local • Daily</p>
                                                <h4 className="text-base font-black text-dark leading-tight tracking-tight">Valley's Best<br />Baked Goods</h4>
                                                <div className="h-2 bg-gray-100 rounded w-3/4" />
                                                <div className="flex gap-2">
                                                    <div className="h-6 w-16 bg-orange rounded text-[7px] text-white font-bold flex items-center justify-center">Order Now</div>
                                                    <div className="h-6 w-16 bg-gray-100 rounded" />
                                                </div>
                                                {/* Image placeholder */}
                                                <div className="h-14 bg-gradient-to-br from-orange/10 to-orange/5 rounded-lg border border-orange/10 flex items-center justify-center">
                                                    <div className="text-[8px] font-bold text-orange/40 uppercase tracking-widest">Hero Image</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Bottom fade */}
                                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 w-48 h-48 bg-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            </Link>

                            {/* Right Column */}
                            <div className="flex flex-col gap-6">
                                {/* Card 2: SEO */}
                                <Link
                                    to="/local-seo"
                                    className="bg-gradient-to-b from-gray-50/80 to-white rounded-3xl p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.04)] shadow-dark/5 hover:shadow-2xl hover:shadow-dark/10 hover:-translate-y-1 transition-all duration-500 flex-1 relative overflow-hidden group"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                                        <div className="flex-1">
                                            <div className="w-11 h-11 bg-orange/10 rounded-lg flex items-center justify-center text-orange mb-5">
                                                <Search size={22} strokeWidth={2} />
                                            </div>
                                            <h3 className="text-2xl font-black text-dark mb-3 tracking-tight">
                                                SEO Optimization
                                            </h3>
                                            <p className="text-gray font-medium leading-relaxed">
                                                Get found on Google by the people in your community. We optimize your site so local customers find you first.
                                            </p>
                                            <div className="inline-flex items-center gap-1.5 text-sm font-bold text-dark/50 group-hover:text-orange transition-colors duration-200 mt-4">
                                                Learn more
                                                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                            </div>
                                        </div>

                                        <div className="w-full md:w-40 shrink-0 self-center group-hover:scale-[1.03] transition-transform duration-300">
                                            <div className="flex items-end gap-1.5 h-20 justify-between">
                                                <div className="flex-1 bg-gray-200 rounded-t h-[30%]" />
                                                <div className="flex-1 bg-gray-200 rounded-t h-[45%]" />
                                                <div className="flex-1 bg-orange/30 rounded-t h-[55%]" />
                                                <div className="flex-1 bg-orange/50 rounded-t h-[75%]" />
                                                <div className="flex-1 bg-orange rounded-t h-[100%]" />
                                            </div>
                                            <div className="h-px bg-gray-200 w-full mt-1" />
                                        </div>
                                    </div>
                                </Link>

                                {/* Card 3: Local Marketing */}
                                <Link
                                    to="/local-marketing"
                                    className="bg-gradient-to-b from-gray-50/80 to-white rounded-3xl p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.04)] shadow-dark/5 hover:shadow-2xl hover:shadow-dark/10 hover:-translate-y-1 transition-all duration-500 flex-1 relative overflow-hidden group"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                                        <div className="flex-1">
                                            <div className="w-11 h-11 bg-orange/10 rounded-lg flex items-center justify-center text-orange mb-5">
                                                <MapPin size={22} strokeWidth={2} />
                                            </div>
                                            <h3 className="text-2xl font-black text-dark mb-3 tracking-tight">
                                                Local Marketing
                                            </h3>
                                            <p className="text-gray font-medium leading-relaxed">
                                                Digital strategies that drive real foot traffic. From <Link to="/fresno-marketing-agency" className="text-dark font-bold hover:text-orange transition-colors">Fresno marketing</Link> campaigns to Local Service Ads, we put your business at the top.
                                            </p>
                                            <div className="inline-flex items-center gap-1.5 text-sm font-bold text-dark/50 group-hover:text-orange transition-colors duration-200 mt-4">
                                                Learn more
                                                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                            </div>
                                        </div>

                                        <div className="w-full md:w-44 shrink-0 aspect-square rounded-2xl relative overflow-hidden flex items-center justify-center group-hover:scale-[1.03] transition-transform duration-300 bg-slate-100/80 border border-slate-200 shadow-inner">
                                            {/* Dot grid pattern */}
                                            <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
                                            {/* Soft gradient blobs */}
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-orange/15 rounded-full blur-2xl" />
                                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-400/10 rounded-full blur-2xl" />
                                            {/* Central pin */}
                                            <MapPin size={30} className="text-orange relative z-10 drop-shadow-sm" fill="currentColor" />
                                            <div className="absolute w-14 h-14 bg-orange/15 rounded-full animate-ping z-0" style={{ animationDuration: '2.5s' }} />
                                            {/* Secondary pins */}
                                            <div className="absolute top-4 right-5 text-orange/40">
                                                <MapPin size={14} fill="currentColor" />
                                            </div>
                                            <div className="absolute bottom-5 left-4 text-orange/30">
                                                <MapPin size={16} fill="currentColor" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* View All Services Link */}
                        <div className="text-center mt-14">
                            <Link
                                to="/services"
                                className="inline-flex items-center gap-2 text-dark font-bold text-lg hover:text-orange transition-colors duration-300 group"
                            >
                                <span className="border-b-2 border-dark/20 group-hover:border-orange pb-0.5 transition-colors duration-300">View All Services</span>
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </section>



                {/* ─── PROCESS (reused) ─── */}
                <ProcessSection />

                {/* ─── STATS (reused — orange bar) ─── */}
                <StatsSection />

                {/* ─── BLOG / SHOWCASE (reused) ─── */}
                <WorkShowcase />

                {/* ─── TESTIMONIALS (reused) ─── */}
                <TestimonialsSection />

                {/* ─── CTA (reused) ─── */}
                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
