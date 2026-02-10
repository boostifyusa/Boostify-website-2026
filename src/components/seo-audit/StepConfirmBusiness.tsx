import { motion } from 'framer-motion';
import { Check, MapPin } from 'lucide-react';

interface Business {
    name: string;
    address: string;
    rating: number;
    reviews: number;
    // other props
}

interface StepConfirmBusinessProps {
    business: Business;
    verifiedPin: string;
    onConfirm: () => void;
    onBack: () => void;
    error?: string;
}

export const StepConfirmBusiness = ({
    business,
    verifiedPin,
    onConfirm,
    onBack,
    error
}: StepConfirmBusinessProps) => {
    return (
        <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12 max-w-xl mx-auto"
        >
            <div className="text-center mb-10">
                {verifiedPin && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        <Check size={14} strokeWidth={3} />
                        PIN Verified
                    </div>
                )}
                <h2 className="text-3xl font-black text-dark mb-4">Is this your business?</h2>
                <p className="text-gray-500">Confirm this is correct before we proceed.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-gray-200 mb-8">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl shrink-0">
                        🏢
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-dark mb-1">{business.name}</h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-2">
                            <MapPin size={14} />
                            {business.address}
                        </p>
                        <div className="flex items-center gap-1.5 text-sm font-bold text-dark">
                            <span className="text-yellow-500">★</span>
                            {business.rating} ({business.reviews} reviews)
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-500 text-sm font-bold text-center">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-3">
                <button
                    onClick={onConfirm}
                    className="w-full h-14 bg-orange text-white text-lg font-bold rounded-xl hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20"
                >
                    {verifiedPin ? 'Yes, Run Audit' : 'Confirm & Verify Email'}
                </button>
                <button
                    onClick={onBack}
                    className="w-full text-center text-sm font-bold text-gray-400 hover:text-dark mt-2"
                >
                    That's not me — go back
                </button>
            </div>
        </motion.div>
    );
};
