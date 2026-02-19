import { motion } from 'framer-motion';
import { Search, Mail, Loader2, Zap, AlertCircle, Lock, Star, CheckCircle, Clock, Shield, BarChart3, MapPin } from 'lucide-react';

interface LeadForm {
    businessName: string;
    name: string;
    email: string;
    phone: string;
}

interface StepLeadCaptureProps {
    leadForm: LeadForm;
    setLeadForm: (form: LeadForm | ((prev: LeadForm) => LeadForm)) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLeadSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    error: string;
    showAccessCodeInput: boolean;
    setShowAccessCodeInput: (show: boolean) => void;
    showExistingPinUser: boolean;
    setShowExistingPinUser: (show: boolean) => void;
    existingUserName: string;
    handleResendCode: () => void;
    accessCode: string;
    setAccessCode: (code: string) => void;
    handleAccessCodeSubmit: (e: React.FormEvent) => void;
}

const benefits = [
    { icon: Clock, title: 'Results in 60 Seconds', desc: 'No waiting. Your audit runs instantly and results appear in real-time.' },
    { icon: MapPin, title: 'Hyper-Local Grid Analysis', desc: 'We check your Google Maps ranking from 16 points in a 4×4 grid around your location.' },
    { icon: BarChart3, title: 'Competitor Visibility', desc: 'See the biggest competitors in your region that outrank you, and where you\'re losing customers.' },
    { icon: Shield, title: '100% Free, No Strings', desc: 'No credit card. No sales call required. Just actionable data.' },
];

export const StepLeadCapture = ({
    leadForm,
    handleInputChange,
    handleLeadSubmit,
    isLoading,
    error,
    showAccessCodeInput,
    setShowAccessCodeInput,
    showExistingPinUser,
    setShowExistingPinUser,
    existingUserName,
    handleResendCode,
    accessCode,
    setAccessCode,
    handleAccessCodeSubmit
}: StepLeadCaptureProps) => {
    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* ─── LEFT: Benefits ─── */}
                <div className="order-2 lg:order-1 lg:pt-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange/10 text-orange rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-orange/20">
                        <Zap size={14} fill="currentColor" />
                        Free Instant Analysis
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-dark mb-4 tracking-tight leading-[1.1]">
                        See how you rank{' '}
                        <span className="relative inline-block px-2 isolate">
                            <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
                            <span className="text-orange relative z-10">instantly</span>
                        </span>
                    </h1>
                    <p className="text-gray-500 text-lg mb-10 max-w-md">
                        See how your business ranks on Google Maps from every direction, in under a minute.
                    </p>

                    <div className="space-y-5">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 + i * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <b.icon size={20} className="text-orange" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <div className="text-base font-black text-dark">{b.title}</div>
                                    <div className="text-sm text-gray-500 font-medium leading-relaxed">{b.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Social proof */}
                    <div className="mt-10 flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                            <CheckCircle size={16} className="text-green-500" />
                            <span>900+ audits today</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 font-bold">
                            <Star size={14} fill="currentColor" className="text-yellow-500" />
                            4.9/5 rating
                        </div>
                    </div>
                </div>

                {/* ─── RIGHT: Form Card ─── */}
                <div className="order-1 lg:order-2">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-10 relative overflow-hidden">

                        {/* Subtle Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />

                        {showExistingPinUser ? (
                            <div className="text-center space-y-6">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 shadow-sm">
                                    <Mail className="text-green-600" size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-dark">Welcome back, {existingUserName}!</h3>
                                    <p className="text-gray-500">
                                        Active session found for <span className="text-dark font-bold">{leadForm.email}</span>
                                    </p>
                                </div>
                                <div className="pt-4 space-y-3">
                                    <button
                                        onClick={handleResendCode}
                                        className="w-full h-14 bg-orange text-white text-lg font-bold rounded-xl hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20"
                                    >
                                        Resend My Code
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowExistingPinUser(false);
                                            setShowAccessCodeInput(true);
                                        }}
                                        className="w-full h-14 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-orange hover:text-orange transition-all"
                                    >
                                        Enter Code Manually
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowExistingPinUser(false)}
                                    className="text-sm text-gray-400 hover:text-dark font-medium underline decoration-2 hover:decoration-orange underline-offset-4"
                                >
                                    Not you? Start over
                                </button>
                            </div>
                        ) : !showAccessCodeInput ? (
                            /* Main Lead Form */
                            <form onSubmit={handleLeadSubmit} className="space-y-5">
                                <div className="text-center mb-6 lg:hidden">
                                    <h2 className="text-2xl font-black text-dark">Start Your Free Audit</h2>
                                    <p className="text-gray-400 text-sm font-medium mt-1">Takes less than 60 seconds</p>
                                </div>
                                <div className="hidden lg:block mb-2">
                                    <h2 className="text-xl font-black text-dark">Start Your Free Audit</h2>
                                    <p className="text-gray-400 text-sm font-medium mt-1">Fill out the form. Results in under a minute.</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-dark mb-1 ml-1">Business Name</label>
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange transition-colors" size={20} />
                                            <input
                                                required
                                                type="text"
                                                name="businessName"
                                                value={leadForm.businessName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. David's Plumbing"
                                                className="w-full h-14 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange rounded-xl pl-12 pr-4 font-bold text-dark outline-none transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-dark mb-1 ml-1">Your Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={leadForm.name}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                                className="w-full h-14 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange rounded-xl px-4 font-bold text-dark outline-none transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-dark mb-1 ml-1">Phone</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={leadForm.phone}
                                                onChange={handleInputChange}
                                                placeholder="(555) 123-4567"
                                                className="w-full h-14 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange rounded-xl px-4 font-bold text-dark outline-none transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-dark mb-1 ml-1">Email (For Results)</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange transition-colors" size={20} />
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={leadForm.email}
                                                onChange={handleInputChange}
                                                placeholder="name@company.com"
                                                className="w-full h-14 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange rounded-xl pl-12 pr-4 font-bold text-dark outline-none transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 font-bold text-sm">
                                        <AlertCircle size={18} className="shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-16 bg-orange text-white text-xl font-black rounded-xl hover:bg-orange-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange/20 mt-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            Scanning...
                                        </>
                                    ) : (
                                        <>
                                            See My Rankings
                                            <Zap size={24} fill="currentColor" />
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowAccessCodeInput(true)}
                                    className="w-full text-center text-sm font-bold text-gray-400 hover:text-orange transition-colors"
                                >
                                    Already have an access code?
                                </button>
                            </form>
                        ) : (
                            /* PIN Entry Form */
                            <form onSubmit={handleAccessCodeSubmit} className="space-y-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange border border-orange/20">
                                        <Lock size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black text-dark">Enter Access Code</h3>
                                    <p className="text-gray-500 font-medium mt-2">Check your email for your 6-digit PIN</p>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        value={accessCode}
                                        onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="000000"
                                        className="w-full h-20 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange rounded-2xl text-center text-4xl font-black text-dark placeholder:text-gray-200 outline-none transition-all tracking-widest"
                                        maxLength={6}
                                        inputMode="numeric"
                                        autoFocus
                                    />
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 font-bold text-sm justify-center">
                                        <AlertCircle size={18} className="shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading || accessCode.length < 6}
                                    className="w-full h-16 bg-orange text-white text-xl font-black rounded-xl hover:bg-orange-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            Unlock Audit
                                            <Lock size={20} />
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowAccessCodeInput(false)}
                                    className="w-full text-center text-sm font-bold text-gray-400 hover:text-orange transition-colors"
                                >
                                    Go back to form
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
