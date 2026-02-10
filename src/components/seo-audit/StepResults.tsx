import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Info, Check, ArrowRight } from 'lucide-react';
import { LocalMapGrid } from '../LocalMapGrid';

interface StepResultsProps {
    business: any;
    keyword: string;
    auditResults: any[];
    verifiedPin: string;
    remainingRuns: number;
    onRerun: () => void;
}

export const StepResults = ({
    business,
    keyword,
    auditResults,
    verifiedPin,
    remainingRuns,
    onRerun
}: StepResultsProps) => {
    return (
        <motion.div
            key="step5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-7xl mx-auto px-6"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">

                {/* Left Column: Map Card + Quick Stats */}
                <div className="w-full space-y-4">
                    <LocalMapGrid
                        keyword={keyword}
                        businessName={business.name}
                        rating={business.rating}
                        reviewCount={business.reviews}
                        gridData={auditResults || []}
                        centerLat={business?.location?.latitude}
                        centerLng={business?.location?.longitude}
                        variant="card"
                        loadingVariant="scan"
                    />

                    {/* Quick Stats Below Map */}
                    {auditResults && auditResults.length > 0 && (() => {
                        const total = auditResults.length;
                        const top3 = auditResults.filter((p: any) => p.rank <= 3).length;
                        const bestRank = Math.min(...auditResults.map((p: any) => p.rank));
                        const top3Pct = Math.round((top3 / total) * 100);

                        return (
                            <div className="grid grid-cols-3 gap-3">
                                {/* Grid Points */}
                                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                                    <div className="text-2xl font-black text-dark">{total}</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Points Scanned</div>
                                </div>

                                {/* Top 3 Count */}
                                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                                    <div className={`text-2xl font-black ${top3Pct >= 50 ? 'text-green-500' : top3Pct > 0 ? 'text-orange' : 'text-red-500'}`}>
                                        {top3Pct}%
                                    </div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">In Top 3</div>
                                </div>

                                {/* Best Rank */}
                                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                                    <div className={`text-2xl font-black ${bestRank <= 3 ? 'text-green-500' : bestRank <= 10 ? 'text-orange' : 'text-red-500'}`}>
                                        #{bestRank > 20 ? '20+' : bestRank}
                                    </div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Best Rank</div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Keyword Tag */}
                    <div className="flex items-center justify-center gap-2 bg-dark/[0.03] rounded-xl px-4 py-3 border border-gray-100">
                        <Search size={14} className="text-gray-400" />
                        <span className="text-sm font-bold text-dark">{keyword}</span>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-auto">
                            {auditResults ? `${(auditResults.reduce((acc: any, curr: any) => acc + (curr.rank > 20 ? 20 : curr.rank), 0) / auditResults.length).toFixed(1)} avg` : ''}
                        </span>
                    </div>

                    {/* Competitor Analysis — Who's Beating You */}
                    {auditResults && auditResults[0]?.topCompetitors && (() => {
                        const competitorCounts: Record<string, number> = {};
                        auditResults.forEach((point: any) => {
                            (point.topCompetitors || []).forEach((name: string) => {
                                competitorCounts[name] = (competitorCounts[name] || 0) + 1;
                            });
                        });
                        const sorted = Object.entries(competitorCounts)
                            .sort(([, a], [, b]) => (b as number) - (a as number))
                            .slice(0, 5);

                        if (sorted.length === 0) return null;

                        const medals = ['🥇', '🥈', '🥉'];
                        return (
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                                <h3 className="font-black text-dark text-sm uppercase tracking-wide mb-4">Your Top Competitors</h3>
                                <div className="space-y-3">
                                    {sorted.map(([name, count], idx) => (
                                        <div key={name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-base">{medals[idx] || `#${idx + 1}`}</span>
                                                <span className="font-bold text-dark text-sm truncate max-w-[200px]">{name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 bg-gray-100 rounded-full w-20 overflow-hidden">
                                                    <div
                                                        className="h-full bg-orange rounded-full transition-all"
                                                        style={{ width: `${((count as number) / auditResults.length) * 100}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-gray-400 whitespace-nowrap">
                                                    {count as number}/{auditResults.length}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Right Column: Results Content */}
                <div className="w-full flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                        <Check size={12} strokeWidth={3} />
                        Audit Complete
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark mb-6 leading-tight tracking-tight">
                        Here is where you <span className="text-orange">Dominate</span> (and where you don't).
                    </h2>

                    <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                        The <span className="text-green-600 font-bold">green</span> spots show where you rank #1-3. The <span className="text-red-500 font-bold">red</span> spots are where others are winning.
                    </p>

                    {/* Stats Card */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-6">
                        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                            <span className="font-bold text-gray-500 uppercase tracking-wide text-xs">Target Keyword</span>
                            <span className="font-bold text-dark">{keyword}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-500 uppercase tracking-wide text-xs">Avg Rank Position</span>
                            <span className="font-black text-orange text-3xl">
                                {auditResults
                                    ? (auditResults.reduce((acc: any, curr: any) => acc + (curr.rank > 20 ? 20 : curr.rank), 0) / auditResults.length).toFixed(1)
                                    : 'N/A'
                                }
                            </span>
                        </div>
                    </div>


                    {/* Educational Explainer */}
                    <div className="bg-dark/[0.03] rounded-2xl p-5 mb-8 border border-gray-100">
                        <div className="flex items-start gap-3">
                            <Info size={18} className="text-orange mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-black text-dark text-sm mb-2">What do these numbers mean?</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Each circle represents a real Google search from that exact GPS coordinate for "<span className="font-bold text-dark">{keyword}</span>". The number is your business's rank position at that spot.
                                </p>
                                <p className="text-sm text-gray-500 leading-relaxed mt-2">
                                    <span className="font-bold text-dark">Why does #4+ matter?</span> Google only shows <span className="font-bold text-orange">3 businesses</span> in the Map Pack. If you're position #4 or lower, you're <span className="font-bold text-red-500">effectively invisible</span> — a customer has to click "View All" to find you, which kills conversions.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link to="/contact" className="flex-1 px-6 py-4 bg-orange text-white text-base font-bold rounded-xl hover:bg-orange-hover transition-all text-center shadow-lg hover:shadow-orange/20 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                            Fix My Rankings
                            <ArrowRight size={18} />
                        </Link>
                        <button
                            onClick={onRerun}
                            disabled={!!verifiedPin && remainingRuns <= 0}
                            className={`flex-1 px-6 py-4 bg-white border-2 font-bold rounded-xl transition-all ${!!verifiedPin && remainingRuns <= 0 ? 'border-gray-100 text-gray-300 cursor-not-allowed' : 'border-gray-100 text-gray-500 hover:border-dark hover:text-dark'}`}
                        >
                            {!verifiedPin
                                ? "Login to Run Another Scan"
                                : remainingRuns > 0
                                    ? `Run Another Scan (${remainingRuns} left)`
                                    : "Limit Reached (Check back later)"}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
