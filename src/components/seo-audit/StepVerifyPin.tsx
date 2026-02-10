import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface StepVerifyPinProps {
    email: string;
    pinCode: string;
    setPinCode: (code: string) => void;
    handleVerifyPin: (e: React.FormEvent) => void;
    isLoading: boolean;
    error: string;
    resendCooldown: number;
    handleResendPin: () => void;
}

export const StepVerifyPin = ({
    email,
    pinCode,
    setPinCode,
    handleVerifyPin,
    isLoading,
    error,
    resendCooldown,
    handleResendPin
}: StepVerifyPinProps) => {
    return (
        <motion.div
            key="stepPin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12 max-w-lg mx-auto text-center"
        >
            <div className="w-20 h-20 bg-orange/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-orange/20">
                <Mail size={32} className="text-orange" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-4 tracking-tight">Check Your Inbox</h2>
            <p className="text-gray-500 mb-2 leading-relaxed">
                We sent a 6-digit verification code to
            </p>
            <p className="font-bold text-dark mb-8 text-lg">
                {email.replace(/(.{2})(.*)(@.*)/, '$1***$3')}
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-6">
                <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="w-full h-16 bg-white border-2 border-gray-200 rounded-2xl px-6 text-center text-3xl font-black tracking-[0.3em] text-dark placeholder:text-gray-200 focus:border-orange focus:outline-none transition-all"
                    maxLength={6}
                    autoFocus
                    inputMode="numeric"
                />

                <button
                    type="submit"
                    disabled={isLoading || pinCode.length < 6}
                    className="w-full h-14 bg-orange text-white text-lg font-bold rounded-xl hover:bg-orange-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange/20 hover:-translate-y-1"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={24} className="animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        <>
                            Verify & Continue
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            {error && (
                <div className="flex items-center justify-center gap-2 text-red-500 mt-4 font-medium">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <button
                onClick={handleResendPin}
                disabled={resendCooldown > 0}
                className={`mt-6 text-sm font-bold transition-colors ${resendCooldown > 0
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-400 hover:text-orange'
                    }`}
            >
                {resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : 'Didn\'t get it? Resend code'
                }
            </button>
        </motion.div>
    );
};
