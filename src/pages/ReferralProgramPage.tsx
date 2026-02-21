import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ArrowRight, Handshake, DollarSign, Users, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export function ReferralProgramPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        venmoPhone: '',
        commsPhone: '',
        email: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/partners/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to sign up');
            }

            setStatus('success');
            // Redirect to login page to verify PIN
            setTimeout(() => {
                navigate('/partners/login', { state: { email: formData.email } });
            }, 1500);

        } catch (error: any) {
            console.error('Signup error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title="Boostify Referral Partner Program"
                description="Partner with Boostify USA. Refer local businesses to us and earn $100 per successful sign-up. Simple, transparent, local."
                canonicalUrl="/partners"
            />
            <Navigation />

            <main className="pt-28 md:pt-40">
                {/* Hero Section */}
                <section className="px-6 mb-20 md:mb-32">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <Handshake size={16} className="text-orange" />
                                Boostify Partner Program
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Earn $100 for Every{' '}
                                <span className="text-orange">Local Business</span> You Refer.
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                                We are local, and that is our advantage. Partner with Central Valley's fastest-growing digital agency. No red tape, just simple payouts for helping your network grow.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#signup" className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-xl hover:bg-orange-hover hover:-translate-y-1 transition-all shadow-xl shadow-orange/20">
                                    Become a Partner
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </a>
                                <Link to="/partners/login" className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-100 font-bold rounded-xl hover:border-dark transition-all">
                                    Partner Login
                                </Link>
                            </div>
                        </motion.div>

                        {/* Visual Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] rounded-[2.5rem] bg-dark p-8 md:p-12 overflow-hidden relative shadow-2xl flex flex-col justify-center border border-white/10">
                                {/* Abstract Graphic */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />

                                <div className="relative z-10 text-center">
                                    <div className="w-24 h-24 bg-gradient-to-br from-orange to-orange-hover rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-orange/30 mb-8 transform rotate-3">
                                        <DollarSign size={48} className="text-white" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Fast, Local Payouts</h3>
                                    <p className="text-white/70 font-medium text-lg">Sent directly via Venmo or Zelle upon client sign-on.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* How it Works / Perks */}
                <section className="bg-gray-50 py-24 px-6 border-y border-gray-100 mb-20 md:mb-32">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">How the Program Works</h2>
                            <p className="text-xl text-gray font-medium max-w-2xl mx-auto">Three simple steps to start earning. We keep it straightforward—no soulless corporate hoops to jump through.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Users,
                                    title: "1. Join the Network",
                                    desc: "Fill out the quick form below. It takes 30 seconds. We'll send a secure PIN to your email to access your dashboard."
                                },
                                {
                                    icon: Handshake,
                                    title: "2. Refer a Client",
                                    desc: "Share your custom QR code, send them your tracked link, or manually submit their info via your Partner Dashboard."
                                },
                                {
                                    icon: DollarSign,
                                    title: "3. Get Paid",
                                    desc: "When they sign a contract with Boostify, we instantly send $100 to your preferred payment method. Easy."
                                }
                            ].map((step, i) => (
                                <div key={i} className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl hover:border-orange/20 transition-all duration-300">
                                    <div className="w-14 h-14 bg-light rounded-2xl flex items-center justify-center text-orange mb-6 group-hover:bg-orange group-hover:text-white transition-colors">
                                        <step.icon size={28} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-dark mb-4">{step.title}</h3>
                                    <p className="text-gray leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Signup Form Section */}
                <section id="signup" className="px-6 mb-20 md:mb-32">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-14">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-black text-dark mb-4 tracking-tight">Become a Partner</h2>
                                <p className="text-gray font-medium">Join our local network today and start referring.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-dark ml-1">Your Name *</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full h-14 bg-light/50 border border-gray-200 rounded-xl px-4 focus:outline-none focus:border-orange focus:bg-white transition-all font-medium"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-dark ml-1">Business Name</label>
                                        <input
                                            type="text"
                                            className="w-full h-14 bg-light/50 border border-gray-200 rounded-xl px-4 focus:outline-none focus:border-orange focus:bg-white transition-all font-medium"
                                            placeholder="Optional"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-dark ml-1">Email Address *</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full h-14 bg-light/50 border border-gray-200 rounded-xl px-4 focus:outline-none focus:border-orange focus:bg-white transition-all font-medium"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <p className="text-xs text-gray ml-1 mt-1">We'll send your secure login PIN here.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-dark ml-1">Communication Phone *</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full h-14 bg-light/50 border border-gray-200 rounded-xl px-4 focus:outline-none focus:border-orange focus:bg-white transition-all font-medium"
                                            placeholder="(559) 000-0000"
                                            value={formData.commsPhone}
                                            onChange={(e) => setFormData({ ...formData, commsPhone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-dark ml-1">Payment Phone (Venmo/Zelle)</label>
                                        <input
                                            type="text"
                                            className="w-full h-14 bg-light/50 border border-gray-200 rounded-xl px-4 focus:outline-none focus:border-orange focus:bg-white transition-all font-medium"
                                            placeholder="Leave blank if same as communication"
                                            value={formData.venmoPhone}
                                            onChange={(e) => setFormData({ ...formData, venmoPhone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {status === 'error' && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 font-medium text-sm">
                                        <AlertCircle size={18} />
                                        {errorMessage}
                                    </div>
                                )}

                                {status === 'success' ? (
                                    <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center justify-center gap-3 font-bold">
                                        <CheckCircle2 size={20} />
                                        Account created! Redirecting to login...
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full h-14 bg-orange text-white font-bold rounded-xl hover:bg-orange-hover transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-orange/20 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Create Partner Account
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <CTASection />
            <Footer />
        </div>
    );
}
