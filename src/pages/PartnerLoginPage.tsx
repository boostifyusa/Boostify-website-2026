import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { Footer } from '../components/Footer';
import { ArrowRight, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { StepVerifyPin } from '../components/seo-audit/StepVerifyPin';

export function PartnerLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const passedEmail = location.state?.email || '';

    const [step, setStep] = useState<'email' | 'pin'>(passedEmail ? 'pin' : 'email');
    const [email, setEmail] = useState(passedEmail);
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);

    // Timer for resend button
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendCooldown > 0) {
            timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    const handleRequestPin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/partners/send-pin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send PIN.');
            }

            setStep('pin');
            setResendCooldown(60);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyPin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pin.length < 6) return;

        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/partners/verify-pin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Invalid PIN.');
            }

            // Save session to localStorage
            localStorage.setItem('boostify_partner_id', data.partnerId);
            localStorage.setItem('boostify_partner_info', JSON.stringify(data.partner));

            // Redirect to dashboard
            navigate('/partners/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 selection:bg-orange selection:text-white flex flex-col">
            <SeoHead
                title="Partner Login - Boostify USA"
                description="Secure login for Boostify USA partners."
                canonicalUrl="/partners/login"
            />
            <Navigation />

            <main className="flex-1 flex items-center justify-center pt-28 pb-20 px-6">
                <div className="w-full max-w-lg">
                    <AnimatePresence mode="wait">
                        {step === 'email' ? (
                            <motion.div
                                key="stepEmail"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12 text-center"
                            >
                                <div className="w-20 h-20 bg-dark rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-lg">
                                    <ShieldCheck size={32} className="text-white" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black text-dark mb-4 tracking-tight">Partner Login</h1>
                                <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                                    Enter your registered email address to receive a secure login PIN. No passwords needed.
                                </p>

                                <form onSubmit={handleRequestPin} className="space-y-6">
                                    <div className="text-left space-y-2">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            className="w-full h-14 bg-light/50 border border-gray-200 rounded-xl px-4 focus:outline-none focus:border-orange focus:bg-white transition-all font-medium text-lg"
                                        />
                                    </div>

                                    {error && (
                                        <div className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium">
                                            <AlertCircle size={16} />
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading || !email}
                                        className="w-full h-14 bg-dark text-white text-lg font-bold rounded-xl hover:bg-dark-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 shadow-lg"
                                    >
                                        {isLoading ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : (
                                            <>
                                                Send Verification PIN
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <StepVerifyPin
                                email={email}
                                pinCode={pin}
                                setPinCode={setPin}
                                handleVerifyPin={handleVerifyPin}
                                isLoading={isLoading}
                                error={error}
                                resendCooldown={resendCooldown}
                                handleResendPin={handleRequestPin}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}
