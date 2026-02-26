import { motion } from 'framer-motion';
import { SeoHead } from '../components/SeoHead';
import {
    Globe,
    Search,
    Briefcase,
    Phone,
    Instagram,
    Facebook,
    MapPin,
    ArrowUpRight,
    Sparkles,
} from 'lucide-react';

/* ── Link data ─────────────────────────────────────────────── */
const siteLinks = [
    {
        label: 'Visit Our Website',
        desc: 'Handcrafted design for local growth',
        href: '/',
        icon: Globe,
        internal: true,
    },
    {
        label: 'Free SEO Audit',
        desc: 'See how your site really performs',
        href: '/seo-audit',
        icon: Search,
        internal: true,
    },
    {
        label: 'See Our Work',
        desc: 'Real results — not just talk',
        href: '/work',
        icon: Briefcase,
        internal: true,
    },
    {
        label: 'Book a Free Call',
        desc: 'No fluff. Just a real conversation.',
        href: '/contact',
        icon: Phone,
        internal: true,
    },
];

const socialLinks = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/boostifyusa/',
        icon: Instagram,
    },
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/hyperboostusa/',
        icon: Facebook,
    },
    {
        label: 'Google Business',
        href: 'https://g.co/kgs/boostifyusa',
        icon: MapPin,
    },
];

/* ── Animation variants ────────────────────────────────────── */
const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
};

const pulseRing = {
    animate: {
        scale: [1, 1.25, 1],
        opacity: [0.4, 0, 0.4],
    },
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};

/* ── Page ───────────────────────────────────────────────────── */
export function LinksPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] selection:bg-orange selection:text-white overflow-hidden relative">
            <SeoHead
                title="Link Tree: Websites That Bring Your Vision To Life"
                description="Your one-stop gateway to Boostify USA. Explore our work, book a call, or follow us on social media."
                canonicalUrl="/links"
            />

            {/* ── Background layers ─────────────────────────────── */}
            {/* Topographic pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                    backgroundImage: 'url(/hero-bg-pattern.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Glow orbs */}
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange/[0.08] rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-orange/[0.05] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[40%] left-[-150px] w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

            {/* ── Main content ──────────────────────────────────── */}
            <div className="relative z-10 flex flex-col items-center px-5 pt-14 pb-16 md:pt-20 md:pb-24 max-w-md mx-auto">

                {/* ── Profile Section ─────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex flex-col items-center mb-10"
                >
                    {/* Avatar with pulse ring */}
                    <div className="relative mb-6">
                        {/* Pulse rings */}
                        <motion.div
                            animate={pulseRing.animate}
                            transition={pulseRing.transition}
                            className="absolute inset-[-8px] rounded-full border-2 border-orange/30"
                        />
                        <motion.div
                            animate={pulseRing.animate}
                            transition={{ ...pulseRing.transition, delay: 1 }}
                            className="absolute inset-[-16px] rounded-full border border-orange/15"
                        />

                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange/40 shadow-xl shadow-orange/10 relative z-10">
                            <img
                                src="/1733568683912.jpg"
                                alt="Joaquin Estrada — Founder of Boostify USA"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Online dot */}
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0A0A0A] z-20" />
                    </div>

                    {/* Logo */}
                    <div className="bg-white/[0.08] backdrop-blur-xl px-5 py-2 rounded-xl border border-white/[0.08] mb-4">
                        <img
                            src="/Group-116.webp"
                            alt="Boostify USA"
                            className="h-6 w-auto object-contain brightness-0 invert"
                        />
                    </div>

                    {/* Tagline */}
                    <h1 className="text-white text-xl md:text-2xl font-black tracking-tight text-center leading-tight mb-2">
                        Websites That Bring Your{' '}
                        <span className="text-orange">Neighbors</span> to Your Door.
                    </h1>

                    <p className="text-white/50 text-sm font-semibold tracking-wider uppercase flex items-center gap-2">
                        <Sparkles size={14} className="text-orange" />
                        Digital Craftsmanship · Fresno, CA
                    </p>
                </motion.div>

                {/* ── Link Cards ──────────────────────────────────── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="w-full space-y-3 mb-10"
                >
                    {siteLinks.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            variants={cardVariants}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative flex items-center gap-4 w-full p-4 rounded-2xl
                bg-white/[0.04] backdrop-blur-xl border border-white/[0.06]
                hover:bg-white/[0.08] hover:border-orange/30
                transition-all duration-300 cursor-pointer
                shadow-lg shadow-black/20 hover:shadow-orange/10"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {/* Icon */}
                            <div className="relative z-10 w-11 h-11 rounded-xl bg-orange/10 flex items-center justify-center shrink-0 group-hover:bg-orange group-hover:scale-110 transition-all duration-300">
                                <link.icon
                                    size={20}
                                    className="text-orange group-hover:text-white transition-colors duration-300"
                                    strokeWidth={2.5}
                                />
                            </div>

                            {/* Copy */}
                            <div className="relative z-10 flex-1 min-w-0">
                                <span className="block text-white font-bold text-base tracking-tight group-hover:text-orange transition-colors duration-300">
                                    {link.label}
                                </span>
                                <span className="block text-white/40 text-xs font-medium truncate">
                                    {link.desc}
                                </span>
                            </div>

                            {/* Arrow */}
                            <ArrowUpRight
                                size={18}
                                className="relative z-10 text-white/20 group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                                strokeWidth={2.5}
                            />
                        </motion.a>
                    ))}
                </motion.div>

                {/* ── Social Icons ────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="flex items-center gap-4 mb-12"
                >
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="group w-12 h-12 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.08]
                flex items-center justify-center
                hover:bg-orange hover:border-orange hover:scale-110 hover:-translate-y-1
                transition-all duration-300 shadow-lg shadow-black/20"
                        >
                            <social.icon
                                size={20}
                                className="text-white/50 group-hover:text-white transition-colors duration-300"
                                strokeWidth={2}
                            />
                        </a>
                    ))}
                </motion.div>

                {/* ── Footer accent ───────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-center"
                >
                    <p className="text-white/20 text-xs font-semibold tracking-widest uppercase mb-1">
                        Made with ❤️ in Fresno, CA
                    </p>
                    <p className="text-white/10 text-[10px] font-medium">
                        © {new Date().getFullYear()} Boostify USA LLC
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
