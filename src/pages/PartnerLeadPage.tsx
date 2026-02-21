import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SeoHead } from '../components/SeoHead';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ArrowRight, CheckCircle2, Loader2, Target, Zap, Star } from 'lucide-react';

export function PartnerLeadPage() {
    const { partnerId } = useParams();

    const [formData, setFormData] = useState({
        clientName: '',
        clientBusiness: '',
        clientPhone: '',
        clientEmail: '',
        notes: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/partners/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ partnerId, ...formData })
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to submit form');

            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-white">
                <Navigation />
                <div className="min-h-[80vh] flex items-center justify-center p-6 mt-20">
                    <SeoHead title="Request Received | We Will Be In Touch Shortly" description="We will be in touch shortly." />
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-light p-12 text-center rounded-[2.5rem] border border-gray-light shadow-2xl max-w-lg w-full">
                        <div className="w-20 h-20 bg-green-50 rounded-full mx-auto flex items-center justify-center mb-6">
                            <CheckCircle2 size={40} className="text-green-500" />
                        </div>
                        <h2 className="text-3xl font-black text-dark mb-4 tracking-tight">Request Received!</h2>
                        <p className="text-gray font-medium mb-8 leading-relaxed">Thanks for reaching out. A Boostify marketing specialist will contact you shortly to discuss growing your business.</p>
                        <Link to="/" className="inline-flex items-center text-orange font-bold hover:underline">
                            Return to boostifyusa.com <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white font-sans">
            <SeoHead title="Grow Your Local Business - Boostify USA" description="Get a free marketing consultation with Boostify USA." />
            <Navigation />

            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03] bg-[length:40px_40px]"
                    style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)' }} />
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-orange/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <main className="relative z-10 pt-32 md:pt-40">
                {/* Hero Section */}
                <section className="px-6 mb-16 md:mb-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl flex flex-col items-center text-center md:items-start md:text-left">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                                Exclusive Referral
                            </motion.div>
                            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Turn Clicks Into <span className="text-orange whitespace-nowrap">Local Customers.</span>
                            </motion.h1>
                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-gray font-medium leading-relaxed mb-8">
                                You've been personally referred to Boostify. We build fast websites and run high-converting local ads tailored specifically for the Central Valley. Claim your free consultation below.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Form & Info Section */}
                <section className="px-6 mb-32">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                        {/* LEFT: Form (3 cols) */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="lg:col-span-3">
                            <div className="bg-white rounded-[2.5rem] border border-gray-light shadow-xl p-8 sm:p-12">
                                <h3 className="text-3xl font-black text-dark mb-2 tracking-tight">Drop your details</h3>
                                <p className="text-gray font-medium mb-10">A Boostify marketing specialist will reach out within 24 hours.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-dark mb-2">Your Name *</label>
                                            <input required type="text" value={formData.clientName} onChange={e => setFormData({ ...formData, clientName: e.target.value })} placeholder="John Doe" className="w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium placeholder:text-gray/40 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-dark mb-2">Business Name</label>
                                            <input type="text" value={formData.clientBusiness} onChange={e => setFormData({ ...formData, clientBusiness: e.target.value })} placeholder="Optional" className="w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium placeholder:text-gray/40 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-dark mb-2">Email Address *</label>
                                            <input required type="text" value={formData.clientEmail} onChange={e => setFormData({ ...formData, clientEmail: e.target.value })} placeholder="john@example.com" className="w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium placeholder:text-gray/40 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-dark mb-2">Phone Number</label>
                                            <input type="tel" value={formData.clientPhone} onChange={e => setFormData({ ...formData, clientPhone: e.target.value })} placeholder="(559) 000-0000" className="w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium placeholder:text-gray/40 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-dark mb-2">How can we help? *</label>
                                        <textarea required rows={4} value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="I need a new website designed to attract more local customers..." className="w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium placeholder:text-gray/40 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all resize-none"></textarea>
                                    </div>

                                    <button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-orange text-white text-lg font-bold rounded-xl hover:bg-orange-hover transition-all duration-300 shadow-xl shadow-orange/20 hover:shadow-orange/30 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {status === 'loading' ? <><Loader2 size={24} className="animate-spin mr-2" /> Processing...</> : <>Request Consultation <ArrowRight className="ml-2 h-6 w-6" /></>}
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        {/* RIGHT: Trust Signals & Info (2 cols) */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="lg:col-span-2 space-y-6">

                            <div className="bg-dark rounded-[2rem] p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-orange"><Zap size={20} /></div>
                                    Why Boostify?
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-white mb-2 tracking-tight">Lightning Fast Web Design</h4>
                                        <p className="text-white/60 text-sm font-medium leading-relaxed">Sites custom built from scratch so Google loves them and customers convert.</p>
                                    </div>
                                    <div className="h-px w-full bg-white/10" />
                                    <div>
                                        <h4 className="font-bold text-white mb-2 tracking-tight">Local SEO & Ads</h4>
                                        <p className="text-white/60 text-sm font-medium leading-relaxed">Dominate your service area and stay at the top of local search results.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-light rounded-[2rem] border border-gray-light p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex flex-col">
                                        <div className="flex text-[#FBBC05] mb-1">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}
                                        </div>
                                        <span className="text-sm font-bold text-dark mt-1">5.0 Star Rating</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray font-medium leading-relaxed italic">"Victor exceeded my expectations. Some things are automated which is great, and the team was always on top of task reminders and updates."</p>
                            </div>

                            {/* Quick Response */}
                            <div className="bg-orange/5 rounded-[2rem] border border-orange/20 p-8 flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0 relative">
                                    <span className="absolute inset-0 bg-orange/40 rounded-full animate-ping" />
                                    <div className="relative w-3 h-3 bg-orange rounded-full" />
                                </div>
                                <div>
                                    <h4 className="text-orange font-bold text-sm tracking-wide uppercase mb-2">Fast Response Time</h4>
                                    <p className="text-dark/80 text-sm font-medium leading-relaxed">We review requests daily and reach out promptly. For urgent needs, call us at <a href="tel:+15597853834" className="text-orange font-bold hover:underline">(559) 785-3834</a>.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <TestimonialsSection />
            </main>
            <Footer />
        </div>
    );
}
