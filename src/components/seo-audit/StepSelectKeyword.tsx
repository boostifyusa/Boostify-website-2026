import { motion } from 'framer-motion';
import { Search, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface StepSelectKeywordProps {
    keyword: string;
    setKeyword: (kw: string) => void;
    aiKeywords: string[];
    isAiLoading: boolean;
    onRunAudit: () => void;
    isLoading: boolean;
    error: string;
}

export const StepSelectKeyword = ({
    keyword,
    setKeyword,
    aiKeywords,
    isAiLoading,
    onRunAudit,
    isLoading,
    error
}: StepSelectKeywordProps) => {
    return (
        <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto text-center"
        >
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search size={32} />
            </div>
            <h2 className="text-3xl font-black text-dark mb-4">What do you want to rank for?</h2>
            <p className="text-gray-500 mb-8">
                Choose a keyword people use to find businesses like yours.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-orange" />
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">AI Suggested Keywords</span>
                </div>

                {isAiLoading ? (
                    <div className="flex items-center justify-center py-8 text-gray-400 gap-2">
                        <Loader2 size={20} className="animate-spin" />
                        Analyzing business category...
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {aiKeywords.map((kw, idx) => (
                            <button
                                key={idx}
                                onClick={() => setKeyword(kw)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${keyword === kw
                                        ? 'border-orange bg-orange/5'
                                        : 'border-gray-100 hover:border-gray-300'
                                    }`}
                            >
                                <span className={`font-bold ${keyword === kw ? 'text-orange' : 'text-dark'}`}>
                                    {kw}
                                </span>
                                {keyword === kw && <CheckCircle className="text-orange" size={20} />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-50 text-gray-500 font-bold">OR TYPE YOUR OWN</span>
                </div>
            </div>

            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Best plumber in Fresno"
                className="w-full h-16 bg-white border-2 border-gray-200 rounded-2xl px-6 text-xl font-bold text-dark placeholder:text-gray-300 focus:border-orange focus:outline-none transition-all mb-8 text-center"
            />

            {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium mb-6">
                    {error}
                </div>
            )}

            <button
                onClick={onRunAudit}
                disabled={isLoading || !keyword}
                className="w-full h-16 bg-orange text-white text-xl font-bold rounded-2xl hover:bg-orange-hover transition-all shadow-xl hover:translate-y-[-2px] hover:shadow-orange/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={24} className="animate-spin" />
                        Scanning Grid (This takes ~10s)...
                    </>
                ) : (
                    <>
                        Run Audit Scan
                        <ArrowRight size={24} />
                    </>
                )}
            </button>
        </motion.div>
    );
};

// Helper component for CheckCircle since it was missing import
const CheckCircle = ({ className, size }: { className?: string; size: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);
