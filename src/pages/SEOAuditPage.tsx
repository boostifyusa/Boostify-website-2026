import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { StepLeadCapture } from '../components/seo-audit/StepLeadCapture';
import { StepSelectBusiness } from '../components/seo-audit/StepSelectBusiness';
import { StepVerifyPin } from '../components/seo-audit/StepVerifyPin';
import { StepConfirmBusiness } from '../components/seo-audit/StepConfirmBusiness';
import { StepSelectKeyword } from '../components/seo-audit/StepSelectKeyword';
import { StepRunning } from '../components/seo-audit/StepRunning';
import { StepResults } from '../components/seo-audit/StepResults';


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
                            // Restore lead details so verification checks pass & subtitles work
                            setLeadForm(prev => ({
                                ...prev,
                                email: data.email || session.email || prev.email,
                                name: data.name || prev.name,
                                businessName: data.businessName || prev.businessName
                            }));
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
        // Log removed: Confidence in fix.

        // If we have a verified PIN, trust the verified email even if form is empty (e.g. refresh/rerun flow)
        const currentEmail = leadForm.email || verifiedEmail;

        if (verifiedPin && verifiedEmail && verifiedEmail === currentEmail) {
            // Already verified — go straight to keywords
            // Ensure form state is consistent for next steps and subtitles
            if (!leadForm.email) {
                setLeadForm(prev => ({ ...prev, email: verifiedEmail }));
            }
            proceedToKeywords();
        } else {
            // Not verified yet (or new email) — send PIN email, then show verify step
            await handleSendPin();
        }
    };



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

    // Extracted Logic for Step 1.5 Manual Search
    const handleManualSearch = async (query: string) => {
        if (!query.trim()) return;
        setIsLoading(true);
        try {
            const res = await fetch('/api/places/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
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
    };

    // Extracted Logic for Step 5 Rerun
    const handleRerunAudit = async () => {
        if (!verifiedPin) {
            setAuditResults(null);
            setShowAccessCodeInput(true);
            setStep(STEPS.ACCESS_CODE);
            return;
        }

        // Implicitly trusting verified state for rerun
        if (verifiedEmail && !leadForm.email) {
            setLeadForm(prev => ({ ...prev, email: verifiedEmail }));
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
    };

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-orange selection:text-white font-sans">
            <Navigation />

            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[length:40px_40px]"
                    style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)' }} />

                {/* Animated Gradient Orbs */}
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-orange/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />


            </div>

            <main className="relative z-10 pt-32 pb-20 min-h-[90vh] flex flex-col items-center justify-center px-0">
                <div className={`w-full mx-auto transition-all duration-500 ease-in-out ${step === STEPS.RESULTS
                    ? "min-h-screen w-full max-w-none px-0"
                    : "max-w-4xl px-6"
                    }`}>

                    <AnimatePresence mode="wait">

                        {/* STEP 1: ACCESS CODE */}
                        {step === STEPS.ACCESS_CODE && (
                            <StepLeadCapture
                                leadForm={leadForm}
                                setLeadForm={setLeadForm as any} // State setter type mismatch slightly but functional
                                handleInputChange={handleInputChange}
                                handleLeadSubmit={handleLeadSubmit}
                                isLoading={isLoading}
                                error={error}
                                showAccessCodeInput={showAccessCodeInput}
                                setShowAccessCodeInput={setShowAccessCodeInput}
                                showExistingPinUser={showExistingPinUser}
                                setShowExistingPinUser={setShowExistingPinUser}
                                existingUserName={existingUserName}
                                handleResendCode={handleSendPin} // Reusing existing handler
                                accessCode={accessCode}
                                setAccessCode={setAccessCode}
                                handleAccessCodeSubmit={handleAccessCodeSubmit}
                            />
                        )}

                        {/* STEP 1.5: SELECT BUSINESS */}
                        {step === STEPS.SELECT_BUSINESS && (
                            <StepSelectBusiness
                                leadForm={leadForm}
                                searchResults={searchResults}
                                onSelectBusiness={handleSelectBusiness}
                                isLoading={isLoading}
                                error={error}
                                showBusinessSearch={showBusinessSearch}
                                setShowBusinessSearch={setShowBusinessSearch}
                                businessSearchQuery={businessSearchQuery}
                                setBusinessSearchQuery={setBusinessSearchQuery}
                                handleManualSearch={handleManualSearch}
                            />
                        )}

                        {/* STEP 1.75: VERIFY PIN */}
                        {step === STEPS.VERIFY_PIN && (
                            <StepVerifyPin
                                email={leadForm.email}
                                pinCode={pinCode}
                                setPinCode={setPinCode}
                                handleVerifyPin={handleVerifyPin}
                                isLoading={isLoading}
                                error={error}
                                resendCooldown={resendCooldown}
                                handleResendPin={handleSendPin}
                            />
                        )}

                        {/* STEP 2: CONFIRM BUSINESS */}
                        {step === STEPS.CONFIRM_BUSINESS && (
                            <StepConfirmBusiness
                                business={business}
                                verifiedPin={verifiedPin}
                                onConfirm={handleConfirmBusiness}
                                onBack={() => setStep(STEPS.SELECT_BUSINESS)}
                                error={error}
                            />
                        )}

                        {/* STEP 3: SELECT KEYWORD */}
                        {step === STEPS.SELECT_KEYWORD && (
                            <StepSelectKeyword
                                keyword={keyword}
                                setKeyword={setKeyword}
                                aiKeywords={suggestedKeywords}
                                isAiLoading={isLoading} // Assuming isLoading is shared for AI fetch
                                onRunAudit={handleRunAudit}
                                isLoading={isLoading}
                                error={error}
                            />
                        )}

                        {/* STEP 4: RUNNING AUDIT */}
                        {step === STEPS.RUNNING_AUDIT && (
                            <StepRunning
                                keyword={keyword}
                                business={business}
                            />
                        )}

                        {/* STEP 5: RESULTS */}
                        {step === STEPS.RESULTS && (
                            <StepResults
                                business={business}
                                keyword={keyword}
                                auditResults={auditResults}
                                verifiedPin={verifiedPin}
                                remainingRuns={remainingRuns}
                                onRerun={handleRerunAudit}
                            />
                        )}

                    </AnimatePresence>

                </div>
            </main >

            <Footer />
        </div >
    );
}
