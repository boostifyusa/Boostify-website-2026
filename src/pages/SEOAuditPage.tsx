import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { LocalMapGrid } from '../components/LocalMapGrid';
import {
    ArrowRight,
    Check,
    Search,
    MapPin,
    AlertCircle,
    Loader2,
    Edit2,
    Info,
    Mail
} from 'lucide-react';


const STEPS = {
    ACCESS_CODE: 1,
    SELECT_BUSINESS: 1.5,
    VERIFY_PIN: 1.75,
    CONFIRM_BUSINESS: 2,
    SELECT_KEYWORD: 3,
    RUNNING_AUDIT: 4,
    RESULTS: 5
};

export function SEOAuditPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [step, setStep] = useState(STEPS.ACCESS_CODE);
    const [accessCode, setAccessCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [business, setBusiness] = useState<any>(null);
    const [keyword, setKeyword] = useState('');
    const [customBusiness, setCustomBusiness] = useState('');
    const [isEditingBusiness, setIsEditingBusiness] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [auditResults, setAuditResults] = useState<any>(null);
    const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);

    // Lead Form State
    const [showAccessCodeInput, setShowAccessCodeInput] = useState(false);
    const [leadForm, setLeadForm] = useState({
        name: '',
        email: '',
        phone: '',
        businessName: ''
    });
    const [showExistingPinUser, setShowExistingPinUser] = useState(false);
    const [existingUserName, setExistingUserName] = useState('');

    // PIN Verification State
    const [pinCode, setPinCode] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const [verifiedPin, setVerifiedPin] = useState(''); // Persisted PIN for use-run calls
    const [verifiedEmail, setVerifiedEmail] = useState(''); // Email bound to the PIN
    const [remainingRuns, setRemainingRuns] = useState(0);
    const [showBusinessSearch, setShowBusinessSearch] = useState(false);
    const [businessSearchQuery, setBusinessSearchQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLeadForm(prev => ({ ...prev, [name]: value }));
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting lead form:", leadForm);
        setIsLoading(true);
        setError('');

        try {
            // Check if this email has exhausted their runs
            const checkRes = await fetch('/api/audit/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: leadForm.email })
            });
            const checkData = await checkRes.json();
            if (!checkRes.ok) {
                // If 403 (exhausted runs), show error
                throw new Error(checkData.error || 'Email check failed.');
            }

            // If active PIN exists (and not exhausted), showing prompt instead of auto-resending
            if (checkData.hasExistingPin) {
                setExistingUserName(checkData.name || leadForm.name);
                setShowExistingPinUser(true);
                setIsLoading(false);
                return;
            }

            console.log("Fetching /api/places/search...");
            const response = await fetch('/api/places/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: leadForm.businessName })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch businesses');
            }

            if (data.places && data.places.length > 0) {
                setSearchResults(data.places);
                setStep(STEPS.SELECT_BUSINESS);
            } else {
                // No results? Just let them enter manually in next step
                setBusiness({ name: leadForm.businessName, address: '', rating: 0, reviews: 0 });
                setStep(STEPS.CONFIRM_BUSINESS);
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Could not find business. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectBusiness = async (place: any) => {
        // Extract Place ID: try 'id' first, then resource name 'places/ID'
        let placeId = place.id;
        if (!placeId && place.name && place.name.startsWith('places/')) {
            placeId = place.name.split('/')[1];
        }

        console.log('Selected Place Object:', place);
        console.log('Derived Place ID:', placeId);

        setIsLoading(true);
        setError('');
        try {
            // Check if this business has hit its audit limit
            const checkRes = await fetch('/api/audit/check-business', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ placeId })
            });
            const checkData = await checkRes.json();
            if (!checkRes.ok) {
                setError(checkData.error || 'Business check failed.');
                setIsLoading(false);
                return;
            }
        } catch (err: any) {
            setError(err.message || 'Could not check business status.');
            setIsLoading(false);
            return;
        }

        setBusiness({
            name: place.displayName?.text || place.name,
            address: place.formattedAddress,
            rating: place.rating,
            reviews: place.userRatingCount,
            location: place.location,
            types: place.types,
            primaryType: place.primaryType,
            description: place.editorialSummary?.text,
            placeId: placeId
        });
        setShowBusinessSearch(false);
        setIsLoading(false);
        setStep(STEPS.CONFIRM_BUSINESS);
    };

    // Send PIN email
    const handleSendPin = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/audit/send-pin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: leadForm.email,
                    name: leadForm.name,
                    phone: leadForm.phone,
                    businessName: leadForm.businessName
                })
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to send PIN');
            }
            setStep(STEPS.VERIFY_PIN);
            // Start resend cooldown (60s)
            setResendCooldown(60);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to send verification email.');
        } finally {
            setIsLoading(false);
        }
    };

    // Resend cooldown timer
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    // Verify PIN (from email PIN step — after confirm, verify to unlock keywords)
    const handleVerifyPin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/audit/verify-pin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin: pinCode })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Verification failed');
            }
            setVerifiedPin(pinCode);
            setRemainingRuns(data.remainingRuns);

            setVerifiedPin(pinCode);
            setVerifiedEmail(data.email || leadForm.email); // Store email
            setRemainingRuns(data.remainingRuns);

            // Persist session (1 hour expiry)
            localStorage.setItem('audit_session', JSON.stringify({
                pin: pinCode,
                email: data.email || leadForm.email,
                timestamp: Date.now()
            }));

            // If we have business name but no full details (re-login case), go to search results
            if (data.businessName && !business) {
                // Auto-search for them
                const searchRes = await fetch('/api/places/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: data.businessName })
                });
                const searchData = await searchRes.json();
                if (searchData.places && searchData.places.length > 0) {
                    setSearchResults(searchData.places);
                    setStep(STEPS.SELECT_BUSINESS);
                    // Pre-fill form so they see what they scraped
                    setLeadForm(prev => ({ ...prev, businessName: data.businessName }));
                } else {
                    // Fallback if search fails
                    proceedToKeywords();
                }
            } else {
                // Happy path or data already loaded
                proceedToKeywords();
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Invalid PIN. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Hydrate from URL on load AND check local storage for existing PIN (1 hour expiry)
    useEffect(() => {
        const storedSession = localStorage.getItem('audit_session');
        if (storedSession) {
            try {
                const session = JSON.parse(storedSession);
                const now = Date.now();
                const oneHour = 60 * 60 * 1000;

                if (now - session.timestamp < oneHour) {
                    setVerifiedPin(session.pin);
                    setVerifiedEmail(session.email || ''); // Restore email
                    // Re-verify silently to get latest run count
                    fetch('/api/audit/verify-pin', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ pin: session.pin })
                    })
                        .then(async (res) => {
                            const data = await res.json();
                            if (!res.ok) {
                                console.error('Session Invalidated by Server:', data.error);
                                localStorage.removeItem('audit_session');
                                setVerifiedPin('');
                                setVerifiedEmail('');
                                return;
                            }
                            if (data.remainingRuns !== undefined) {
                                setRemainingRuns(data.remainingRuns);
                            }
                        })
                        .catch(err => {
                            console.error('Silent Re-verify failed (Network Error?)', err);
                            // Network error? Maybe keep session temporarily.
                            // But usually safe to keep until definitive rejection.
                        });
                } else {
                    // Expired
                    localStorage.removeItem('audit_session');
                }
            } catch (e) {
                console.error('Failed to parse session', e);
                localStorage.removeItem('audit_session');
            }
        }

        const dataParam = searchParams.get('d');
        // Only hydrate if we have URL data AND haven't already set results from a fresh run
        if (dataParam && !auditResults) {
            try {
                // Decode compressed data: [[lat,lng,rank],...]
                const rawPoints = JSON.parse(decodeURIComponent(dataParam));
                const hydratedGrid = rawPoints.map((p: any) => ({
                    lat: p[0],
                    lng: p[1],
                    rank: p[2],
                    row: 0,
                    col: 0
                }));

                setAuditResults(hydratedGrid);
                setKeyword(searchParams.get('k') || '');

                // Get center: prefer explicit clat/clng, fallback to grid center average
                const clat = searchParams.get('clat');
                const clng = searchParams.get('clng');
                let centerLat: number;
                let centerLng: number;

                if (clat && clng) {
                    centerLat = parseFloat(clat);
                    centerLng = parseFloat(clng);
                } else {
                    // Fallback: calculate center from grid points average
                    centerLat = hydratedGrid.reduce((sum: number, p: any) => sum + p.lat, 0) / hydratedGrid.length;
                    centerLng = hydratedGrid.reduce((sum: number, p: any) => sum + p.lng, 0) / hydratedGrid.length;
                }

                setBusiness({
                    name: searchParams.get('b') || 'Business',
                    rating: parseFloat(searchParams.get('r') || '0'),
                    reviews: parseInt(searchParams.get('rv') || '0'),
                    location: {
                        latitude: centerLat,
                        longitude: centerLng
                    }
                });
                setStep(STEPS.RESULTS);
            } catch (e) {
                console.error("Failed to hydrate from URL", e);
            }
        }
    }, [searchParams]);

    // Auto-save session whenever verifiedPin/email is set
    useEffect(() => {
        if (verifiedPin) {
            localStorage.setItem('audit_session', JSON.stringify({
                pin: verifiedPin,
                email: verifiedEmail || leadForm.email,
                timestamp: Date.now()
            }));
        }
    }, [verifiedPin, verifiedEmail]);

    // Step 1: Handle Access Code Submit (bypass — returning user with PIN)
    const handleAccessCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (accessCode.length < 6) {
            setError('Please enter a valid 6-digit PIN.');
            return;
        }
        setError('');
        setIsLoading(true);

        try {
            // Verify the PIN first
            const response = await fetch('/api/audit/verify-pin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin: accessCode })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Invalid PIN');
            }
            setVerifiedPin(accessCode);
            setVerifiedEmail(data.email || leadForm.email);
            setRemainingRuns(data.remainingRuns);

            // Populate leadForm with stored data so subtitles show correctly
            const bizName = data.businessName || leadForm.businessName || 'business';
            setLeadForm(prev => ({ ...prev, businessName: bizName, name: data.name || prev.name, email: data.email || prev.email }));

            // Now search for their business to let them select
            const searchRes = await fetch('/api/places/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: bizName })
            });
            const searchData = await searchRes.json();

            if (searchData.places && searchData.places.length > 0) {
                setSearchResults(searchData.places);
                setStep(STEPS.SELECT_BUSINESS);
            } else {
                // No results — let them enter manually
                setBusiness({ name: bizName, address: '', rating: 0, reviews: 0 });
                setStep(STEPS.CONFIRM_BUSINESS);
            }
        } catch (err: any) {
            setError(err.message || 'Invalid PIN.');
        } finally {
            setIsLoading(false);
        }
    };

    // Shared: proceed to keyword selection
    const proceedToKeywords = async () => {
        setStep(STEPS.SELECT_KEYWORD);
        setKeyword("Analyzing...");

        try {
            const response = await fetch('/api/ai/suggest-keywords', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    businessName: business.name,
                    businessType: business.primaryType || business.types?.[0] || 'Local Business',
                    location: business.address,
                    description: business.description
                })
            });
            const data = await response.json();
            if (data.keywords && Array.isArray(data.keywords)) {
                setSuggestedKeywords(data.keywords);
                setKeyword(data.keywords[0]);
            }
        } catch (error) {
            console.error("AI Keyword Error", error);
            const fallback = `${business.types?.[0] || 'Service'} near ${business.address?.split(',')[1] || 'me'}`;
            setSuggestedKeywords([fallback]);
            setKeyword(fallback);
        }
    };

    // Step 2: Confirm Business — if no PIN yet, send it; if verified, go to keywords
    const handleConfirmBusiness = async () => {
        // Only skip verify if we have a PIN AND the email matches the session
        if (verifiedPin && verifiedEmail === leadForm.email) {
            // Already verified — go straight to keywords
            proceedToKeywords();
        } else {
            // Not verified yet (or new email) — send PIN email, then show verify step
            await handleSendPin();
        }
    };

    const handleUpdateBusiness = (e: React.FormEvent) => {
        e.preventDefault();
        if (customBusiness) {
            setBusiness({ ...business, name: customBusiness });
            setIsEditingBusiness(false);
        }
    }

    // Step 3: Run Audit
    const handleRunAudit = async () => {
        if (!business?.location) {
            console.error("Missing business location:", business);
            setError("Business location data missing. Please re-select the business.");
            return;
        }

        setStep(STEPS.RUNNING_AUDIT);
        const auditStartTime = Date.now();

        try {
            // Consume a run from the PIN
            if (verifiedPin) {
                const runRes = await fetch('/api/audit/use-run', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pin: verifiedPin, placeId: business.placeId, businessName: business.name })
                });
                const runData = await runRes.json();
                if (!runRes.ok) {
                    setError('Sorry, you\'ve hit your limit! Reach out to us for additional runs.');
                    setStep(STEPS.SELECT_KEYWORD);
                    return;
                }
                setRemainingRuns(runData.remainingRuns);
                // SAVE SESSION (Lazy Persist for existing in-memory users)
                localStorage.setItem('audit_session', JSON.stringify({
                    pin: verifiedPin,
                    timestamp: Date.now()
                }));
            }

            console.log("Starting Geogrid Audit...", business.location);
            const response = await fetch('/api/audit/grid', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lat: business.location.latitude,
                    lng: business.location.longitude,
                    keyword: keyword,
                    businessName: business.name,
                    radius: 5 // Default 5 miles
                })
            });

            if (!response.ok) {
                throw new Error('Audit failed');
            }

            const data = await response.json();
            console.log("Audit Results:", data.results);
            setAuditResults(data.results);

            // Serialize and update URL for persistence (Zero API cost on refresh)
            const compressedParams = data.results.map((p: any) => [
                Number(p.lat.toFixed(6)),
                Number(p.lng.toFixed(6)),
                p.rank
            ]);

            setSearchParams({
                d: JSON.stringify(compressedParams),
                b: business.name,
                k: keyword,
                r: business.rating.toString(),
                rv: business.reviews.toString(),
                clat: business.location.latitude.toString(),
                clng: business.location.longitude.toString()
            });

            // Ensure loading animation shows for at least 6 seconds
            const elapsed = Date.now() - auditStartTime;
            const minDisplayTime = 6000;
            if (elapsed < minDisplayTime) {
                await new Promise(resolve => setTimeout(resolve, minDisplayTime - elapsed));
            }

            setStep(STEPS.RESULTS);

        } catch (error) {
            console.error("Audit Error:", error);
            // Fallback for demo if API fails
            setAuditResults([]);
            setError("Audit failed. Please try again.");
            setStep(STEPS.SELECT_KEYWORD); // Go back
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-orange selection:text-white font-sans">
            <Navigation />

            <main className="pt-32 pb-20 min-h-[90vh] flex flex-col items-center justify-center px-0">
                <div className={`w-full mx-auto transition-all duration-500 ease-in-out ${step === STEPS.RESULTS
                    ? "min-h-screen w-full max-w-none px-0"
                    : "max-w-4xl px-6"
                    }`}>

                    <AnimatePresence mode="wait">

                        {/* STEP 1: ACCESS CODE */}
                        {step === STEPS.ACCESS_CODE && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center max-w-lg mx-auto"
                            >
                                <div className="w-20 h-20 bg-orange/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-orange/20">
                                    <Search size={32} className="text-orange" />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-dark mb-4 tracking-tight">
                                    Free Local <span className="text-orange">SEO Audit</span>
                                </h1>
                                <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                                    See exactly where you rank on Google Maps and how to beat your competitors.
                                </p>



                                {showExistingPinUser ? (
                                    <div className="bg-white p-6 rounded-2xl border-2 border-orange/10 shadow-xl space-y-4">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <Mail className="text-green-600" size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-dark">Welcome back, {existingUserName}!</h3>
                                        <p className="text-gray-600">
                                            You already have an active access code for <span className="font-bold text-dark">{leadForm.email}</span>.
                                        </p>

                                        <div className="pt-2 space-y-3">
                                            <button
                                                onClick={() => {
                                                    // Explicitly trigger resend
                                                    fetch('/api/audit/send-pin', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify(leadForm)
                                                    }).then(() => {
                                                        setShowExistingPinUser(false);
                                                        setStep(STEPS.VERIFY_PIN);
                                                    }).catch(err => setError(err.message));
                                                }}
                                                className="w-full h-12 bg-orange text-white font-bold rounded-xl hover:bg-orange-hover transition-all shadow-md"
                                            >
                                                Resend Code
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowExistingPinUser(false);
                                                    setShowAccessCodeInput(true);
                                                }}
                                                className="w-full h-12 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-orange hover:text-orange transition-all"
                                            >
                                                I have my code
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setShowExistingPinUser(false)}
                                            className="text-xs text-gray-400 hover:text-dark underline"
                                        >
                                            Use a different email
                                        </button>
                                    </div>
                                ) : !showAccessCodeInput ? (
                                    <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                                        <div>
                                            <label className="block text-sm font-bold text-dark mb-1">Business Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="businessName"
                                                value={leadForm.businessName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Victor's Plumbing"
                                                className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 font-medium focus:border-orange focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-dark mb-1">Your Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={leadForm.name}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Victor Estrada"
                                                className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 font-medium focus:border-orange focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-dark mb-1">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={leadForm.email}
                                                    onChange={handleInputChange}
                                                    placeholder="name@company.com"
                                                    className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 font-medium focus:border-orange focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-dark mb-1">Phone</label>
                                                <input
                                                    required
                                                    type="text"
                                                    inputMode="tel"
                                                    name="phone"
                                                    value={leadForm.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="(559) 555-0123"
                                                    className="w-full h-12 border-2 border-gray-200 rounded-xl px-4 font-medium focus:border-orange focus:outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full h-14 bg-orange text-white text-lg font-bold rounded-xl hover:bg-orange-hover transition-all flex items-center justify-center gap-2 mt-4 shadow-lg hover:shadow-orange/20"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={24} className="animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    Run Free Scan
                                                    <ArrowRight size={20} />
                                                </>
                                            )}
                                        </button>

                                        {error && (
                                            <div className="flex items-center justify-center gap-2 text-red-500 mt-4 font-medium">
                                                <AlertCircle size={16} />
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => setShowAccessCodeInput(true)}
                                            className="w-full text-center text-sm font-bold text-gray-400 hover:text-orange mt-4"
                                        >
                                            Have an access code?
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleAccessCodeSubmit} className="relative">
                                        <input
                                            type="text"
                                            value={accessCode}
                                            onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            placeholder="000000"
                                            className="w-full h-16 bg-white border-2 border-gray-200 rounded-2xl px-6 text-center text-3xl font-black tracking-[0.3em] text-dark placeholder:text-gray-200 focus:border-orange focus:outline-none transition-all"
                                            maxLength={6}
                                            inputMode="numeric"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading || !accessCode}
                                            className="mt-6 w-full h-14 bg-orange text-white text-lg font-bold rounded-xl hover:bg-orange-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange/20 hover:-translate-y-1"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={24} className="animate-spin" />
                                                    Verifying...
                                                </>
                                            ) : (
                                                <>
                                                    Unlock Audit
                                                    <ArrowRight size={20} />
                                                </>
                                            )}
                                        </button>
                                        {error && (
                                            <div className="flex items-center justify-center gap-2 text-red-500 mt-4 font-medium">
                                                <AlertCircle size={16} />
                                                {error}
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => setShowAccessCodeInput(false)}
                                            className="w-full text-center text-sm font-bold text-gray-400 hover:text-orange mt-4"
                                        >
                                            No code? Fill out form instead
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        )}

                        {/* STEP 1.5: SELECT BUSINESS */}
                        {step === STEPS.SELECT_BUSINESS && (
                            <motion.div
                                key="step1.5"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-xl mx-auto"
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
                                            onClick={() => handleSelectBusiness(place)}
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
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            if (!businessSearchQuery.trim()) return;
                                            setIsLoading(true);
                                            try {
                                                const res = await fetch('/api/places/search', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ query: businessSearchQuery })
                                                });
                                                const data = await res.json();
                                                if (data.places && data.places.length > 0) {
                                                    setSearchResults(data.places);
                                                }
                                            } catch (err) {
                                                console.error(err);
                                            } finally {
                                                setIsLoading(false);
                                                setShowBusinessSearch(false);
                                            }
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
                        )}

                        {/* STEP 1.75: VERIFY PIN */}
                        {step === STEPS.VERIFY_PIN && (
                            <motion.div
                                key="stepPin"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center max-w-md mx-auto"
                            >
                                <div className="w-20 h-20 bg-orange/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-orange/20">
                                    <Mail size={32} className="text-orange" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-dark mb-4 tracking-tight">Check Your Inbox</h2>
                                <p className="text-gray-500 mb-2 leading-relaxed">
                                    We sent a 6-digit verification code to
                                </p>
                                <p className="font-bold text-dark mb-8 text-lg">
                                    {leadForm.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')}
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
                                    onClick={() => {
                                        if (resendCooldown <= 0) {
                                            setPinCode('');
                                            setError('');
                                            handleSendPin();
                                        }
                                    }}
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
                        )}

                        {/* STEP 2: CONFIRM BUSINESS */}
                        {step === STEPS.CONFIRM_BUSINESS && (
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

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleConfirmBusiness}
                                        className="w-full h-14 bg-orange text-white text-lg font-bold rounded-xl hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20"
                                    >
                                        {verifiedPin ? 'Yes, Run Audit' : 'Confirm & Verify Email'}
                                    </button>
                                    <button
                                        onClick={() => setStep(STEPS.SELECT_BUSINESS)}
                                        className="w-full text-center text-sm font-bold text-gray-400 hover:text-dark mt-2"
                                    >
                                        That's not me — go back
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: SELECT KEYWORD */}
                        {step === STEPS.SELECT_KEYWORD && (
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
                                <h2 className="text-3xl font-black text-dark mb-4">AI Suggested Keyword</h2>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                    Based on your business category, our AI recommends these high-intent keywords. Select one to audit.
                                </p>

                                <div className="grid gap-3 mb-8">
                                    {suggestedKeywords.map((kw, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setKeyword(kw)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${keyword === kw
                                                ? 'border-orange bg-orange/5 shadow-lg'
                                                : 'border-gray-100 bg-white hover:border-orange/50'
                                                }`}
                                        >
                                            <span className={`font-bold text-lg ${keyword === kw ? 'text-orange' : 'text-dark'}`}>
                                                {kw}
                                            </span>
                                            {keyword === kw && (
                                                <div className="w-6 h-6 bg-orange text-white rounded-full flex items-center justify-center">
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                            )}
                                        </button>
                                    ))}

                                    <div className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${!suggestedKeywords.includes(keyword)
                                        ? 'border-orange bg-orange/5 shadow-lg'
                                        : 'border-gray-100 bg-white'
                                        }`}>
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0">
                                            {!suggestedKeywords.includes(keyword) && <div className="w-3 h-3 bg-orange rounded-full" />}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter custom keyword..."
                                            value={!suggestedKeywords.includes(keyword) ? keyword : ''}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            className="flex-1 bg-transparent font-bold text-lg text-dark focus:outline-none placeholder:font-normal placeholder:text-gray-400"
                                            onClick={() => setKeyword('')}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleRunAudit}
                                    className="px-10 py-5 bg-orange text-white text-xl font-bold rounded-2xl hover:bg-orange-hover transition-all shadow-xl hover:shadow-orange/20 hover:-translate-y-1"
                                >
                                    Start Analysis
                                </button>
                            </motion.div>
                        )}

                        {/* STEP 4: RUNNING AUDIT */}
                        {step === STEPS.RUNNING_AUDIT && (
                            <motion.div
                                key="step4"
                                className="max-w-4xl mx-auto w-full"
                            >
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-black text-dark mb-2">Analyzing Local Grid...</h2>
                                    <p className="text-gray-500">Checking rankings across 16 coordinates in Fresno</p>
                                </div>

                                <div className="flex justify-center">
                                    <div className="w-full max-w-2xl">
                                        <LocalMapGrid
                                            keyword={keyword}
                                            businessName={business.name}
                                            rating={business.rating}
                                            reviewCount={business.reviews}
                                            showBusinessCard={false}
                                            loadingVariant="scan"
                                        // Empty gridData implies loading state in component
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 5: RESULTS */}
                        {step === STEPS.RESULTS && (
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
                                                    <h3 className="font-black text-dark text-sm uppercase tracking-wide mb-4">Who's Beating You</h3>
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
                                                onClick={async () => {
                                                    if (!verifiedPin) {
                                                        setAuditResults(null);
                                                        setShowAccessCodeInput(true);
                                                        setStep(STEPS.ACCESS_CODE);
                                                        return;
                                                    }

                                                    setAuditResults(null);
                                                    setKeyword('');
                                                    setSuggestedKeywords([]);
                                                    setError('');
                                                    // Search for businesses again so they can pick
                                                    setIsLoading(true);
                                                    try {
                                                        const res = await fetch('/api/places/search', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ query: business?.name || leadForm.businessName })
                                                        });
                                                        const data = await res.json();
                                                        if (data.places && data.places.length > 0) {
                                                            setSearchResults(data.places);
                                                        }
                                                    } catch (e) {
                                                        console.error(e);
                                                    } finally {
                                                        setIsLoading(false);
                                                    }
                                                    setStep(STEPS.SELECT_BUSINESS);
                                                }}
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
                        )}

                    </AnimatePresence>

                </div>
            </main >

            <Footer />
        </div >
    );
}
