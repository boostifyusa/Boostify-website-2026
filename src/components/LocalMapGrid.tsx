import { motion } from 'framer-motion';
import { Search, MapPin, Star } from 'lucide-react';

interface GridPoint {
    lat: number;
    lng: number;
    rank: number;
    row: number;
    col: number;
}

interface LocalMapGridProps {
    keyword?: string;
    businessName?: string;
    rating?: number;
    reviewCount?: number;
    showSearch?: boolean;
    showBusinessCard?: boolean;
    className?: string;
    gridData?: GridPoint[];
    centerLat?: number;
    centerLng?: number;
    variant?: 'card' | 'fullscreen';
    loadingVariant?: 'demo' | 'scan';
    theme?: 'light' | 'dark';
}

export function LocalMapGrid({
    keyword = "plumber near me",
    businessName = "Valley Pro Plumbing",
    rating = 4.9,
    reviewCount = 127,
    showSearch = true,
    showBusinessCard = true,
    className = "",
    gridData = [],
    centerLat,
    centerLng,
    variant = 'card',
    loadingVariant = 'demo',
    theme = 'light'
}: LocalMapGridProps) {
    const totalPoints = 16;
    const isLoading = gridData.length === 0;
    const TILE_SIZE = 256;

    const project = (lat: number, lng: number, zoom: number) => {
        const siny = Math.sin((lat * Math.PI) / 180);
        const clippedSiny = Math.min(Math.max(siny, -0.9999), 0.9999);

        const pointX = TILE_SIZE * (0.5 + lng / 360);
        const pointY = TILE_SIZE * (0.5 - Math.log((1 + clippedSiny) / (1 - clippedSiny)) / (4 * Math.PI));

        const scale = Math.pow(2, zoom);
        return {
            x: pointX * scale,
            y: pointY * scale
        };
    };

    const MAP_WIDTH = 800;
    const MAP_HEIGHT = 600;
    const ZOOM = 11;

    const getMarkerPosition = (pointLat: number, pointLng: number) => {
        if (!centerLat || !centerLng) return { left: '50%', top: '50%' };

        const centerPoint = project(centerLat, centerLng, ZOOM);
        const currentPoint = project(pointLat, pointLng, ZOOM);

        const dx = currentPoint.x - centerPoint.x;
        const dy = currentPoint.y - centerPoint.y;

        const x = (MAP_WIDTH / 2) + dx;
        const y = (MAP_HEIGHT / 2) + dy;

        return {
            left: `${(x / MAP_WIDTH) * 100}%`,
            top: `${(y / MAP_HEIGHT) * 100}%`
        };
    };

    const isFullScreen = variant === 'fullscreen';
    const isDark = theme === 'dark';

    const cardContainerClasses = `flex flex-col w-full rounded-3xl overflow-hidden shadow-2xl border ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-100 bg-white'} ${className}`;
    const cardMapClasses = `relative overflow-hidden w-full ${isDark ? 'bg-slate-800' : 'bg-[#e5e3df]'} ${showSearch ? '' : 'rounded-t-3xl'} ${showBusinessCard ? '' : 'rounded-b-3xl'} aspect-[4/3]`;

    const fullScreenContainerClasses = `flex flex-col w-full h-full ${className}`;
    const fullScreenMapClasses = `relative overflow-hidden w-full h-full ${isDark ? 'bg-slate-800' : 'bg-[#e5e3df]'}`;

    const containerClasses = isFullScreen ? fullScreenContainerClasses : cardContainerClasses;
    const mapContainerClasses = isFullScreen ? fullScreenMapClasses : cardMapClasses;

    return (
        <div className={containerClasses}>

            {/* Search Bar */}
            {showSearch && (
                <div className={`${isFullScreen ? 'absolute top-6 left-6 z-30 w-auto' : `${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'} border rounded-t-3xl border-b-0 px-6 py-4`} flex items-center gap-4 shadow-sm transition-all relative z-20`}>
                    <div className={`flex items-center gap-4 ${isFullScreen ? 'bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-gray-200/50' : 'w-full'}`}>
                        <Search size={20} className="text-gray-400" />
                        <span className={`${isDark && !isFullScreen ? 'text-white' : 'text-dark/80'} font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] md:max-w-xs`}>
                            {keyword}
                        </span>
                        <div className={`flex items-center gap-2 shrink-0 pl-4 border-l ${isDark && !isFullScreen ? 'border-slate-700' : 'border-gray-200'}`}>
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-black text-green-600 uppercase tracking-wider">Live</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Map Area */}
            <div className={mapContainerClasses}>
                {/* Background */}
                <div className="absolute inset-0 select-none pointer-events-none">
                    {isLoading ? (
                        loadingVariant === 'scan' ? (
                            /* ── Premium Scanning Animation (Audit Page) ── */
                            <div className="absolute inset-0 bg-dark overflow-hidden">
                                {/* Subtle grid lines */}
                                <div className="absolute inset-0 opacity-[0.06]"
                                    style={{
                                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                                        backgroundSize: '40px 40px'
                                    }}
                                />

                                {/* Ambient glow orbs */}
                                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange/[0.08] rounded-full blur-[120px]" />
                                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange/[0.05] rounded-full blur-[100px]" />

                                {/* Radar sweep */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]">
                                    <div
                                        className="absolute inset-0 origin-center"
                                        style={{
                                            background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(232,89,12,0.1) 85%, rgba(232,89,12,0.35) 95%, transparent 100%)',
                                            animation: 'spin 4s linear infinite'
                                        }}
                                    />
                                </div>

                                {/* Concentric scanning rings */}
                                {[1, 2, 3].map((ring) => (
                                    <div
                                        key={ring}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/20"
                                        style={{
                                            width: `${ring * 30}%`,
                                            height: `${ring * 30}%`,
                                            animation: `pulse 3s ease-in-out ${ring * 0.4}s infinite`,
                                            opacity: 0.3
                                        }}
                                    />
                                ))}

                                {/* Ghost grid dots */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="grid grid-cols-4 gap-6 md:gap-10">
                                        {Array.from({ length: totalPoints }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{
                                                    scale: [0.5, 1, 0.5],
                                                    opacity: [0.2, 0.8, 0.2],
                                                    boxShadow: [
                                                        '0 0 0px rgba(232,89,12,0)',
                                                        '0 0 12px rgba(232,89,12,0.6)',
                                                        '0 0 0px rgba(232,89,12,0)'
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    delay: i * 0.15,
                                                    repeat: Infinity,
                                                    repeatDelay: 1
                                                }}
                                                className="w-8 h-8 rounded-full bg-orange/20 border border-orange/30 flex items-center justify-center"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-orange/60" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Center beacon */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-5 h-5 rounded-full bg-orange shadow-[0_0_20px_rgba(232,89,12,0.8)] border-2 border-white/40"
                                    />
                                </div>

                                {/* "Scanning" label */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                                    <motion.div
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                                        <span className="text-[11px] font-bold text-white/60 uppercase tracking-[0.2em]">Scanning Area</span>
                                    </motion.div>
                                </div>
                            </div>
                        ) : (
                            /* ── Demo Skeleton (Local SEO Page) ── */
                            <>
                                <div className="absolute inset-0 opacity-40"
                                    style={{ backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="grid grid-cols-4 gap-8 md:gap-12 p-8">
                                        {Array.from({ length: totalPoints }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full bg-gray-400/30 animate-pulse"
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )
                    ) : (
                        <img
                            src={`/api/static-map?center=${centerLat},${centerLng}&zoom=${ZOOM}&size=${MAP_WIDTH}x${MAP_HEIGHT}&scale=2`}
                            alt="Map Background"
                            className="w-full h-full object-cover"
                            draggable={false}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    )}
                </div>

                {/* Markers Overlay */}
                <div className="absolute inset-0 z-10">
                    {!isLoading ? (
                        gridData.map((point, i) => {
                            const { left, top } = getMarkerPosition(point.lat, point.lng);
                            const rank = point.rank;

                            let colorClass = "bg-red-500 text-white shadow-red-500/30";
                            if (rank <= 3) colorClass = "bg-green-500 text-white shadow-green-500/30";
                            else if (rank <= 10) colorClass = "bg-yellow-500 text-white shadow-yellow-500/30";

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.05, type: "spring" }}
                                    style={{ left, top }}
                                    className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full ${colorClass} shadow-xl flex items-center justify-center text-base font-black border-[3px] border-white transform hover:scale-125 transition-transform z-20 hover:z-50 cursor-default`}
                                >
                                    {rank > 20 ? '20+' : rank}
                                </motion.div>
                            );
                        })
                    ) : null}

                    {/* Center Pin - Business Location */}
                    <div className="absolute top-1/2 left-1/2 -ml-3 -mt-3 z-30 pointer-events-none">
                        <div className="relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-xl flex items-center justify-center">
                                <MapPin size={12} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Business Card */}
            {showBusinessCard && (
                <div className={`${isFullScreen ? 'absolute bottom-6 left-6 z-30 w-auto' : `${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'} border rounded-b-3xl border-t-0 p-5 shadow-2xl relative z-20`}`}>
                    <div className={`flex items-center gap-4 ${isFullScreen ? 'bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl border border-gray-200/50' : ''}`}>
                        <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center shrink-0 text-orange font-black text-lg">
                            {businessName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className={`font-black ${isDark && !isFullScreen ? 'text-white' : 'text-dark'} text-base leading-snug`}>{businessName}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-0.5">
                                <span className="text-yellow-500 font-black flex items-center gap-1">
                                    <Star fill="currentColor" size={14} />
                                    {rating}
                                </span>
                                <span>({reviewCount} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
