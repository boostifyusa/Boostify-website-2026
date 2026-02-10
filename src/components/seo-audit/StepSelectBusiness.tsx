import { motion } from 'framer-motion';
import { ArrowRight, Search, Loader2 } from 'lucide-react';

interface StepSelectBusinessProps {
    leadForm: { businessName: string };
    searchResults: any[]; // Or define the Place type
    onSelectBusiness: (place: any) => void;
    isLoading: boolean;
    error: string;
    showBusinessSearch: boolean;
    setShowBusinessSearch: (show: boolean) => void;
    businessSearchQuery: string;
    setBusinessSearchQuery: (query: string) => void;
    handleManualSearch: (query: string) => void;
}

export const StepSelectBusiness = ({
    leadForm,
    searchResults,
    onSelectBusiness,
    isLoading,
    error,
    showBusinessSearch,
    setShowBusinessSearch,
    businessSearchQuery,
    setBusinessSearchQuery,
    handleManualSearch
}: StepSelectBusinessProps) => {
    return (
        <motion.div
            key="step1.5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12 max-w-xl mx-auto"
        >
            <h2 className="text-3xl font-black text-dark mb-2 text-center">Select Your Business</h2>
            <p className="text-center text-gray-500 mb-8">We found these top matches for "{leadForm.businessName}"</p>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium mb-4 text-center">
                    {error}
                </div>
            )}

            <div className="space-y-3">
                {searchResults.map((place, index) => (
                    <button
                        key={place.id || index}
                        onClick={() => onSelectBusiness(place)}
                        disabled={isLoading}
                        className={`w-full bg-white text-left p-4 rounded-xl border-2 border-gray-100 hover:border-orange hover:shadow-lg transition-all flex items-start justify-between group ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl shrink-0">
                                🏢
                            </div>
                            <div>
                                <h3 className="font-bold text-dark group-hover:text-orange transition-colors">
                                    {place.displayName?.text || place.name}
                                </h3>
                                <p className="text-sm text-gray-500">{place.formattedAddress}</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="text-yellow-500 text-xs">★</span>
                                    <span className="text-xs font-bold text-dark">{place.rating}</span>
                                    <span className="text-xs text-gray-400">({place.userRatingCount} reviews)</span>
                                </div>
                            </div>
                        </div>
                        <ArrowRight className="text-gray-300 group-hover:text-orange transition-colors" size={20} />
                    </button>
                ))}
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={() => setShowBusinessSearch(true)}
                    className="text-gray-400 font-bold hover:text-dark text-sm"
                >
                    I don't see my business
                </button>
            </div>

            {showBusinessSearch && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleManualSearch(businessSearchQuery);
                    }}
                    className="mt-4 flex gap-2"
                >
                    <input
                        type="text"
                        value={businessSearchQuery}
                        onChange={(e) => setBusinessSearchQuery(e.target.value)}
                        placeholder="Search for your business..."
                        className="flex-1 h-12 border-2 border-gray-200 rounded-xl px-4 font-medium focus:border-orange focus:outline-none"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !businessSearchQuery.trim()}
                        className="h-12 px-6 bg-orange text-white font-bold rounded-xl hover:bg-orange-hover transition-all disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                    </button>
                </form>
            )}
        </motion.div>
    );
};
