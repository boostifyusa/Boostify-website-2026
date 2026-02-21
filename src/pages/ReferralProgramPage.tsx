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

            <main>
                {/* Hero Section */}
                <section className="px-6 relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
                    {/* Topographic Background Pattern - Subtle & Reoriented */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.35] -scale-x-100"
                        style={{
                            backgroundImage: 'url(/hero-bg-pattern.webp)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }} />

                    {/* Radial white fade for text readability */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)'
                        }} />

                    {/* Background Elements */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4" />

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                                <Handshake size={16} className="text-orange" />
                                Boostify Partner Program
                            </div>
                            <h1 className="text-5xl md:text-[5rem] font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                                Earn <span className="text-orange">$100</span> Per{' '}
                                Referral.
                            </h1>
                            <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-md">
                                A simple, transparent partner program. You bring the lead, we close the deal and build their site, you get paid instantly via Venmo or Zelle.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#signup" className="inline-flex items-center justify-center px-8 py-5 bg-orange text-white font-bold text-lg rounded-2xl hover:bg-orange-hover hover:-translate-y-1 transition-all shadow-xl shadow-orange/20">
                                    Become a Partner
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </a>
                                <Link to="/partners/login" className="inline-flex items-center justify-center px-8 py-5 bg-white text-dark border-2 border-gray-100 font-bold text-lg rounded-2xl hover:border-dark hover:bg-gray-50 transition-all">
                                    Partner Login
                                </Link>
                            </div>
                        </motion.div>

                        {/* Visual Side (Animated Payout Mocks) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative h-[24rem] md:h-[32rem] w-full flex items-center justify-center perspective-1000"
                        >
                            <div className="absolute inset-0 bg-dark rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                                {/* Dynamic Background Gradients */}
                                <motion.div
                                    animate={{
                                        rotate: [0, 90, 180, 270, 360],
                                        scale: [1, 1.2, 1, 1.1, 1]
                                    }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-[50%] -right-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,107,43,0.3)_360deg)] opacity-30 blur-3xl"
                                />
                                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange/20 rounded-full blur-[100px]" />
                                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />

                                {/* Floating Notification Mocks */}
                                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6 p-8">
                                    {[
                                        { delay: 0.4, amount: "$100", name: "Boostify USA", sub: "For referring Valley Roofing LLC" },
                                        { delay: 1.2, amount: "$100", name: "Boostify USA", sub: "For referring Fresno Plumbers" }
                                    ].map((mock, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 20 }}
                                            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: mock.delay,
                                                type: "spring",
                                                stiffness: 100
                                            }}
                                            className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-2xl transform-gpu flex items-center gap-4"
                                        >
                                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                                                <DollarSign size={24} className="text-white relative z-10" />
                                                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-bold text-white text-lg leading-none">{mock.name}</span>
                                                    <span className="font-black text-green-400 text-xl leading-none">+{mock.amount}</span>
                                                </div>
                                                <p className="text-white/60 text-sm font-medium truncate">{mock.sub}</p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Abstract Status Bar */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2, duration: 1 }}
                                        className="absolute bottom-8 right-8 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2"
                                    >
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Instant Transfers Active</span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* How it Works / Perks */}
                <section className="bg-light py-24 md:py-32 px-6 relative z-20 -mt-16 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] border-t border-gray-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">How the Program Works</h2>
                            <p className="text-xl text-gray font-medium max-w-2xl mx-auto text-balance">Three simple steps to start earning. We keep it straightforward—no soulless corporate hoops to jump through.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    <div className="w-16 h-16 bg-orange/5 rounded-2xl flex items-center justify-center text-orange mb-8 group-hover:scale-110 group-hover:bg-orange group-hover:text-white transition-all duration-300">
                                        <step.icon size={32} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark mb-4">{step.title}</h3>
                                    <p className="text-gray/80 text-lg font-medium leading-relaxed">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Signup Form Section (Split Layout) */}
                <section id="signup" className="py-24 md:py-32 px-6 relative overflow-hidden">
                    {/* Abstract True Breakout Backgrounds */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 z-0" />

                    <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                        {/* LEFT: Trust & Typography */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight leading-[1.1]">
                                    Join Our Local Network.
                                </h2>
                                <p className="text-xl text-gray font-medium leading-relaxed mb-6">
                                    Start referring business to the highest-rated agency in the Central Valley, and get paid instantly for your connections.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
                                        <AlertCircle size={24} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark text-lg mb-1">Zero Cost & Zero Risk</h4>
                                        <p className="text-gray/80 text-sm font-medium leading-relaxed">It's completely free to join. We only win when you win.</p>
                                    </div>
                                </div>
                                <div className="bg-dark rounded-3xl p-6 shadow-2xl shadow-dark/20 flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                                        <CheckCircle2 size={24} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg mb-1">Instant Approvals</h4>
                                        <p className="text-white/60 text-sm font-medium leading-relaxed">No waiting periods. Sign up now, get your unique code, and start referring today.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: The Form */}
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.08)] border border-gray-100 p-8 md:p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-bl-full z-0" />

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <h3 className="text-2xl font-black text-dark mb-8">Partner Application</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-dark ml-1">Your Name *</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full h-14 bg-light border border-gray-200 rounded-xl px-5 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all font-medium text-dark placeholder:text-gray/40"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-dark ml-1">Business Name</label>
                                            <input
                                                type="text"
                                                className="w-full h-14 bg-light border border-gray-200 rounded-xl px-5 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all font-medium text-dark placeholder:text-gray/40"
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
                                            type="text"
                                            className="w-full h-14 bg-light border border-gray-200 rounded-xl px-5 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all font-medium text-dark placeholder:text-gray/40"
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
                                                className="w-full h-14 bg-light border border-gray-200 rounded-xl px-5 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all font-medium text-dark placeholder:text-gray/40"
                                                placeholder="(559) 000-0000"
                                                value={formData.commsPhone}
                                                onChange={(e) => setFormData({ ...formData, commsPhone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-dark ml-1">Payment Phone (Venmo/Zelle)</label>
                                            <input
                                                type="text"
                                                className="w-full h-14 bg-light border border-gray-200 rounded-xl px-5 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all font-medium text-dark placeholder:text-gray/40"
                                                placeholder="Leave blank if same as communication"
                                                value={formData.venmoPhone}
                                                onChange={(e) => setFormData({ ...formData, venmoPhone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 font-medium text-sm">
                                            <AlertCircle size={18} />
                                            {errorMessage}
                                        </motion.div>
                                    )}

                                    {status === 'success' ? (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 text-green-700 p-5 rounded-xl flex flex-col items-center justify-center gap-3 font-bold text-center border border-green-200">
                                            <CheckCircle2 size={32} />
                                            Account Created!
                                            <span className="text-sm font-medium text-green-600">Redirecting you to the secure PIN verification...</span>
                                        </motion.div>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full h-16 mt-8 bg-orange text-white text-lg font-bold rounded-xl hover:bg-orange-hover transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange/20 hover:shadow-orange/30 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <Loader2 size={24} className="animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Create Partner Account
                                                    <ArrowRight size={24} />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <CTASection />
            <Footer />
        </div>
    );
}
