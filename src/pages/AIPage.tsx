import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { SchemaJSON } from '../components/SchemaJSON';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import {
    Bot,
    Check,
    Star,
    Smartphone,
    Sparkles,
    ShieldCheck,
    ChevronDown,
    ChevronUp,
    Battery,
    Wifi,
    Signal
} from 'lucide-react';

export function AIPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title="AI Automation for Local Business - Boostify USA"
                description="Automate your busywork. AI Chatbots, Missed Call Text-Back, and Review Management for Fresno businesses."
                canonicalUrl="/ai-automation"
            />
            <SchemaJSON
                type="Service"
                data={{
                    name: "AI Automation Services",
                    description: "AI Chatbots and Automation for local businesses.",
                    provider: {
                        "@type": "LocalBusiness",
                        "name": "Boostify USA"
                    },
                    areaServed: "Fresno, CA",
                }}
            />
            <Navigation />

            <main className="pt-28 md:pt-40">
                {/* Hero Section */}
                <section className="px-6 mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                                New Service
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Automate the Busywork. Focus on <span className="text-orange">Growth.</span>
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                You're drowning in admin tasks. Our AI agents answer calls, book appointments, and chase leads 24/7 so you don't have to.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1"
                                >
                                    Automate My Business
                                    <Bot className="w-5 h-5 ml-2" />
                                </Link>
                            </div>

                            <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                                <span className="flex items-center gap-2">
                                    <Check size={16} className="text-green-500" strokeWidth={3} />
                                    24/7 Response
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check size={16} className="text-green-500" strokeWidth={3} />
                                    Instant Booking
                                </span>
                            </div>
                        </motion.div>

                        {/* AI Hero Graphic */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative lg:h-[600px] flex items-center justify-center py-12 px-6 md:px-12"
                        >
                            {/* Decorative Container */}
                            <div className="absolute inset-0 bg-slate-100/80 rounded-[2.5rem] z-0 overflow-hidden border border-slate-200 shadow-inner">
                                <div className="absolute inset-0 opacity-[0.6]" style={{ backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                {/* Soft Gradients */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange/10 rounded-full blur-[60px]" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px]" />
                            </div>

                            <div className="relative w-full max-w-sm mx-auto z-10">
                                {/* Floating Badge - Appointment */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    transition={{ delay: 4.5, duration: 0.5, type: "spring" }}
                                    className="absolute -right-24 top-4 z-20 bg-white rounded-2xl shadow-xl border border-green-100 px-5 py-4 flex items-center gap-4 hidden xl:flex"
                                >
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                                        <Check size={20} className="text-green-600" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-dark leading-none mb-1">Appointment Booked</div>
                                        <div className="text-xs text-gray-500 font-bold">Tomorrow at 10:00 AM</div>
                                    </div>
                                </motion.div>

                                <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl relative z-10 p-4 md:p-6 w-full flex flex-col overflow-hidden">
                                    {/* Chat Header */}
                                    <div className="flex items-center gap-3 border-b border-gray-50 pb-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange shrink-0">
                                            <Bot size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-dark text-sm">Boostify AI Agent</div>
                                            <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold uppercase tracking-wider">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                Active Now
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chat Area */}
                                    <div className="space-y-4">
                                        {/* User Message */}
                                        <div className="flex justify-end">
                                            <div className="bg-orange text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm font-medium max-w-[90%] shadow-sm leading-relaxed">
                                                Do you have any openings for a consultation tomorrow?
                                            </div>
                                        </div>

                                        {/* AI Typing Indicator */}
                                        <motion.div
                                            initial={{ opacity: 0, display: "none" }}
                                            animate={{ opacity: [0, 1, 0], display: ["flex", "flex", "none"] }}
                                            transition={{ duration: 1.5, repeat: 0, times: [0, 0.2, 1] }}
                                            className="gap-1 bg-gray-50 px-4 py-4 rounded-2xl rounded-tl-sm w-16"
                                        >
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </motion.div>

                                        {/* AI Response 1 */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, display: "none" }}
                                            animate={{ opacity: 1, y: 0, display: "flex" }}
                                            transition={{ delay: 1.5 }}
                                            className="justify-start"
                                        >
                                            <div className="bg-gray-50 text-dark px-4 py-3 rounded-2xl rounded-tl-sm text-sm font-medium max-w-[90%] leading-relaxed">
                                                Yes! I have openings at 10:00 AM and 2:00 PM tomorrow. Would you like to grab one?
                                            </div>
                                        </motion.div>

                                        {/* User Response 2 */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, display: "none" }}
                                            animate={{ opacity: 1, y: 0, display: "flex" }}
                                            transition={{ delay: 3.5 }}
                                            className="justify-end"
                                        >
                                            <div className="bg-orange text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm font-medium max-w-[90%] shadow-sm">
                                                10:00 AM works perfectly.
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Feature: Missed Call Text Back */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1 relative"
                        >
                            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl flex flex-col overflow-hidden">
                                <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[13px] top-[72px] rounded-s-lg"></div>
                                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[13px] top-[124px] rounded-s-lg"></div>
                                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[13px] top-[178px] rounded-s-lg"></div>
                                <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[13px] top-[142px] rounded-e-lg"></div>
                                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative flex flex-col">
                                    {/* Status Bar */}
                                    <div className="h-8 bg-white flex justify-between items-center px-6 text-[10px] font-bold text-dark pt-2">
                                        <span>9:41</span>
                                        <div className="flex gap-1.5 items-center">
                                            <Signal size={12} className="text-dark" />
                                            <Wifi size={12} className="text-dark" />
                                            <Battery size={16} className="text-dark rotate-0" />
                                        </div>
                                    </div>

                                    {/* Messages App Header */}
                                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                                        <div className="text-blue-500 text-sm">Back</div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 mb-1 overflow-hidden">
                                                <div className="w-full h-full bg-gray-300 flex items-end justify-center">
                                                    <div className="w-5 h-5 bg-gray-400 rounded-full mb-[-4px]" />
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-gray-500">Local Pros</span>
                                        </div>
                                        <div className="w-8" />
                                    </div>

                                    {/* Message Thread */}
                                    <div className="flex-1 bg-white p-4 space-y-4 overflow-hidden relative">
                                        <div className="flex justify-center">
                                            <span className="text-[10px] text-gray-400 font-medium">Tue, 9:40 AM</span>
                                        </div>

                                        <div className="flex justify-start">
                                            <div className="bg-gray-100 text-dark px-3 py-2 rounded-2xl rounded-tl-sm text-xs max-w-[85%]">
                                                Hey! Sorry we missed your call. We're on a job right now. How can we help?
                                            </div>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 }}
                                            className="flex justify-end"
                                        >
                                            <div className="bg-blue-500 text-white px-3 py-2 rounded-2xl rounded-tr-sm text-xs max-w-[85%]">
                                                I have a leaking pipe, need someone today.
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 1.5 }}
                                            className="flex justify-start"
                                        >
                                            <div className="bg-gray-100 text-dark px-3 py-2 rounded-2xl rounded-tl-sm text-xs max-w-[85%]">
                                                We can help with that! We have a tech available at 2pm. Shall I book it?
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Input Area */}
                                    <div className="h-16 bg-white border-t border-gray-100 px-4 flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
                                        <div className="flex-1 h-8 rounded-full border border-gray-200 px-3 text-xs flex items-center text-gray-400">iMessage</div>
                                    </div>

                                    {/* Notification Overlay */}
                                    <motion.div
                                        initial={{ y: -100 }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1, type: "spring" }}
                                        className="absolute top-2 left-2 right-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-3 z-20 border border-gray-100"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                                                    <Smartphone size={10} className="text-white" />
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">Phone</span>
                                            </div>
                                            <span className="text-[10px] text-gray-400">now</span>
                                        </div>
                                        <div className="font-bold text-xs text-dark">Missed Call: Potential Customer</div>
                                        <div className="text-[10px] text-gray-500">Auto-text sent successfully.</div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8">
                                <Smartphone size={32} strokeWidth={2} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                Never Miss a <span className="text-orange">Lead</span> Again
                            </h2>
                            <p className="text-xl text-gray font-medium mb-8 leading-relaxed">
                                62% of calls to small businesses go unanswered. Our system automatically texts back anyone you miss, instantly starting a conversation and saving the lead before they call your competitor.
                            </p>
                            <ul className="space-y-4 mb-10">
                                {[
                                    'Instant text response to missed calls',
                                    'Customizable after-hours messages',
                                    'Capture leads while you sleep',
                                    'Stop playing phone tag'].
                                    map((item, i) =>
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 text-dark font-bold">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                <Check
                                                    size={14}
                                                    className="text-green-600"
                                                    strokeWidth={3} />
                                            </div>
                                            {item}
                                        </li>
                                    )}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Feature: Reviews & CRM */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8">
                                <Star size={32} strokeWidth={2} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                Turn Reviews into <span className="text-orange">Revenue</span>
                            </h2>
                            <p className="text-xl text-gray font-medium mb-8 leading-relaxed">
                                Automatically request reviews from happy customers and let our AI draft the perfect response to every single one. Boost your Google ranking without lifting a finger.
                            </p>
                            <ul className="space-y-4 mb-10">
                                {[
                                    'Auto-SMS review requests',
                                    'AI-drafted responses',
                                    'Filter negative feedback',
                                    'Boost Google Map ranking'].
                                    map((item, i) =>
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 text-dark font-bold">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                <Check
                                                    size={14}
                                                    className="text-green-600"
                                                    strokeWidth={3} />
                                            </div>
                                            {item}
                                        </li>
                                    )}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="bg-dark rounded-3xl border border-white/10 shadow-2xl p-6 relative overflow-hidden flex flex-col h-[500px]">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6 relative z-10 border-b border-white/10 pb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <Sparkles size={14} className="text-green-400" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">Reputation Monitor</div>
                                            <div className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Live Feed</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 border border-white/5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-green-400 text-xs font-bold">Active</span>
                                    </div>
                                </div>

                                {/* Live Feed */}
                                <div className="flex-1 overflow-hidden relative z-10 space-y-4 mask-image-b">
                                    {/* Review Item 1 (Processing) */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-white/5 border border-white/5 rounded-xl p-4 relative overflow-hidden"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex gap-1 text-yellow-500">
                                                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                            </div>
                                            <span className="text-white/20 text-[10px]">Just now</span>
                                        </div>
                                        <p className="text-white/80 text-xs leading-relaxed mb-3">
                                            "The team was incredibly helpful and fast. Fixed my AC in under an hour!"
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-green-500 border-t-transparent animate-spin" />
                                            <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider">AI Drafting Response...</span>
                                        </div>
                                    </motion.div>

                                    {/* Review Item 2 (Completed) */}
                                    <div className="bg-white/5 border border-white/5 rounded-xl p-4 opacity-60">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex gap-1 text-yellow-500">
                                                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                            </div>
                                            <span className="text-white/20 text-[10px]">12m ago</span>
                                        </div>
                                        <p className="text-white/60 text-xs leading-relaxed mb-3 line-clamp-1">
                                            "Great local business. Highly recommended for anyone..."
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Check size={12} className="text-green-500" />
                                            <span className="text-green-500/60 text-[10px] font-bold uppercase tracking-wider">Auto-Responded</span>
                                        </div>
                                    </div>

                                    {/* Review Item 3 (Completed) */}
                                    <div className="bg-white/5 border border-white/5 rounded-xl p-4 opacity-30">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex gap-1 text-yellow-500">
                                                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                            </div>
                                            <span className="text-white/20 text-[10px]">2h ago</span>
                                        </div>
                                        <p className="text-white/60 text-xs leading-relaxed mb-3 line-clamp-1">
                                            "Professional and affordable. Will use again."
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Check size={12} className="text-green-500" />
                                            <span className="text-green-500/60 text-[10px] font-bold uppercase tracking-wider">Auto-Responded</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Stats */}
                                <div className="mt-4 pt-4 border-t border-white/10 relative z-10 grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-1">Avg Rating</div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-white font-black text-2xl">4.9</span>
                                            <span className="text-green-400 text-xs font-bold">▲</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-1">Revenue</div>
                                        <div className="text-white font-black text-2xl">$12.4k</div>
                                    </div>
                                </div>

                                {/* Background Effects */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange/10 rounded-full blur-[80px] pointer-events-none" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Guarantee Section */}
                <section className="py-20 px-6 bg-dark text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20">
                            <ShieldCheck size={40} strokeWidth={2} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                            The "Love It" Guarantee
                        </h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
                            We're confident our AI agents will save you time and money. If you don't love the system we build for you, we'll keep refining it until you do, or you don't pay a dime for the setup.
                        </p>
                        <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">
                            No Risk • 100% Satisfaction
                        </div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* FAQ Section */}
                <section className="py-24 px-6 bg-light/30">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">
                            Common Questions
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    question: 'Will the AI sound like a robot?',
                                    answer:
                                        "Not at all. We train the AI on your specific business voice, utilizing natural language processing to ensure it sounds human, friendly, and helpful."
                                },
                                {
                                    question: 'Can I take over the conversation?',
                                    answer:
                                        "Absolutely. You can jump into any conversation at any time. The AI will immediately pause and let you handle it from there."
                                },
                                {
                                    question: 'Does it work with my existing phone number?',
                                    answer:
                                        "Yes, in most cases we can forward your existing calls to our system, or we can provide a dedicated tracking number that forwards to you."
                                },
                                {
                                    question: 'How fast does it respond?',
                                    answer:
                                        "Instantly. The AI responds to texts and missed calls within seconds, ensuring you never lose a lead to a competitor."
                                }
                            ].map((faq, i) =>
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl border border-gray-light overflow-hidden">

                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg text-dark hover:bg-gray-50 transition-colors">

                                        {faq.question}
                                        {openFaq === i ?
                                            <ChevronUp size={20} className="text-orange" /> :
                                            <ChevronDown size={20} className="text-gray/40" />
                                        }
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i &&
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                exit={{ height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-8 pb-8 text-gray font-medium leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        }
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
