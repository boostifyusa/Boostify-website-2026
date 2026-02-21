
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { SeoHead } from '../components/SeoHead';
import { motion } from 'framer-motion';

export function PartnerQRPage() {
    const { partnerId } = useParams();

    // Fallback if no partnerId is provided in URL
    if (!partnerId) {
        return (
            <div className="min-h-[100dvh] flex items-center justify-center bg-gray-50 p-6">
                <p className="text-gray-500 font-medium">Invalid Partner Link</p>
            </div>
        );
    }

    const referralLink = `${window.location.origin}/referral/${partnerId}`;

    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 selection:bg-orange selection:text-white p-6 relative">
            <SeoHead title="Scan to claim your local marketing consultation" description="Boostify Partner Referral" />

            {/* Background elements */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2.5rem] shadow-2xl shadow-dark/5 border border-gray-light p-8 md:p-12 w-full max-w-sm text-center relative z-10"
            >
                <Link to="/" className="inline-block mb-8">
                    <img src="/Group-116.png" alt="Boostify" className="h-8 object-contain mx-auto" />
                </Link>

                <h1 className="text-2xl font-black text-dark mb-2 tracking-tight">Free Consultation</h1>
                <p className="text-gray font-medium text-sm mb-10 leading-relaxed">
                    Scan the QR code below with your phone's camera to claim your exclusive referral.
                </p>

                <div className="bg-white p-4 rounded-2xl shadow-inner border border-gray-100 inline-block mb-8">
                    <QRCodeSVG
                        value={referralLink}
                        size={220}
                        fgColor="#111111"
                        level="H"
                    />
                </div>

                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                    Powered by Boostify USA
                </p>
            </motion.div>
        </div>
    );
}
