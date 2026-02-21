import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { Footer } from '../components/Footer';
import { QRCodeSVG } from 'qrcode.react';
import {
    LogOut, Copy, Check, Plus, Link as LinkIcon,
    User, Building2, Mail, Loader2, FileText, ExternalLink
} from 'lucide-react';

interface Lead {
    id: string;
    clientName: string;
    clientBusiness: string;
    clientPhone: string;
    clientEmail: string;
    status: string;
    submittedAt: number;
}

export function PartnerDashboardPage() {
    const navigate = useNavigate();
    const [partner, setPartner] = useState<any>(null);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // New Lead Form State
    const [formData, setFormData] = useState({
        clientName: '',
        clientBusiness: '',
        clientPhone: '',
        clientEmail: '',
        notes: ''
    });

    useEffect(() => {
        const pId = localStorage.getItem('boostify_partner_id');
        const pInfo = localStorage.getItem('boostify_partner_info');

        if (!pId || !pInfo) {
            navigate('/partners/login', { replace: true });
            return;
        }

        setPartner(JSON.parse(pInfo));
        fetchLeads(pId);
    }, [navigate]);

    const fetchLeads = async (partnerId: string) => {
        try {
            const res = await fetch(`/api/partners/leads?partnerId=${partnerId}`);
            const data = await res.json();
            if (res.ok) {
                setLeads(data.leads || []);
            }
        } catch (error) {
            console.error('Failed to fetch leads:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('boostify_partner_id');
        localStorage.removeItem('boostify_partner_info');
        navigate('/partners/login', { replace: true });
    };

    const referralLink = `${window.location.origin}/referral/${partner?.id}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/partners/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    partnerId: partner.id,
                    ...formData
                })
            });
            const data = await res.json();
            if (res.ok) {
                // Prepend new lead
                setLeads([data.lead, ...leads]);
                setShowForm(false);
                setFormData({ clientName: '', clientBusiness: '', clientPhone: '', clientEmail: '', notes: '' });
            } else {
                alert(data.error || 'Failed to submit lead.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred submitting the lead.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || !partner) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 size={40} className="text-orange animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 selection:bg-orange selection:text-white flex flex-col">
            <SeoHead
                title="Partner Dashboard - Boostify USA"
                description="Manage your referrals and payouts."
                canonicalUrl="/partners/dashboard"
            />
            <Navigation />

            <main className="flex-1 pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black text-dark mb-2 tracking-tight">
                                Welcome, {partner.name}
                            </h1>
                            <p className="text-gray flex items-center gap-2 font-medium">
                                <Building2 size={18} />
                                {partner.businessName || 'Independent Partner'}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-gray hover:text-red-500 font-bold flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                        >
                            <LogOut size={18} />
                            Log Out
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT COLUMN: Tools */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Referral Link Card */}
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
                                <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                                    <LinkIcon size={20} className="text-orange" />
                                    Your Referral Link
                                </h3>
                                <p className="text-sm text-gray mb-6 leading-relaxed">
                                    Send this link to clients so they can submit their info directly to us. We'll automatically credit you.
                                </p>

                                <div className="bg-gray-50 flex items-center justify-between p-3 rounded-xl border border-gray-200">
                                    <span className="text-xs font-mono text-gray-500 truncate mr-3">
                                        {referralLink}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        className="w-10 h-10 shrink-0 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-dark hover:border-orange hover:text-orange transition-colors"
                                    >
                                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* QR Code Card */}
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <h3 className="text-xl font-bold text-dark mb-2">QR Code</h3>
                                <p className="text-sm text-gray mb-8">Have clients scan this in person.</p>
                                <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 mb-4 inline-block">
                                    <QRCodeSVG
                                        value={referralLink}
                                        size={180}
                                        fgColor="#111111"
                                        level="H"
                                    />
                                </div>
                                <a
                                    href={`/partners/qr/${partner.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-bold text-orange hover:text-orange-hover hover:underline transition-all mt-2"
                                >
                                    Open Clean QR Page <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Leads */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-black text-dark">Your Leads</h2>
                                <button
                                    onClick={() => setShowForm(!showForm)}
                                    className="bg-orange text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-orange-hover transition-colors shadow-md"
                                >
                                    <Plus size={16} />
                                    Submit Lead
                                </button>
                            </div>

                            {showForm && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-6 md:p-8 rounded-[2rem] shadow-lg border border-orange/20"
                                >
                                    <h3 className="text-lg font-bold text-dark mb-6">Manually Submit a Lead</h3>
                                    <form onSubmit={handleSubmitLead} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray uppercase ml-1">Client Name *</label>
                                                <input required type="text" value={formData.clientName} onChange={e => setFormData({ ...formData, clientName: e.target.value })} className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 mt-1 focus:border-orange focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray uppercase ml-1">Business Name</label>
                                                <input type="text" value={formData.clientBusiness} onChange={e => setFormData({ ...formData, clientBusiness: e.target.value })} className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 mt-1 focus:border-orange focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray uppercase ml-1">Phone</label>
                                                <input type="tel" value={formData.clientPhone} onChange={e => setFormData({ ...formData, clientPhone: e.target.value })} className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 mt-1 focus:border-orange focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray uppercase ml-1">Email</label>
                                                <input type="email" value={formData.clientEmail} onChange={e => setFormData({ ...formData, clientEmail: e.target.value })} className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 mt-1 focus:border-orange focus:outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray uppercase ml-1">Notes</label>
                                            <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mt-1 focus:border-orange focus:outline-none resize-none" placeholder="What do they need help with?"></textarea>
                                        </div>
                                        <div className="flex justify-end gap-3 pt-2">
                                            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-lg font-bold text-gray hover:text-dark">Cancel</button>
                                            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-dark text-white rounded-lg font-bold hover:bg-dark-hover flex items-center gap-2">
                                                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Submit to Boostify'}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {leads.length === 0 ? (
                                <div className="bg-white p-12 rounded-[2rem] border border-gray-100 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full mx-auto flex items-center justify-center mb-4">
                                        <FileText size={24} className="text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark mb-2">No leads yet</h3>
                                    <p className="text-gray font-medium">Share your referral link to get started.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {leads.map((lead) => (
                                        <div key={lead.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-orange/20 transition-colors">
                                            <div>
                                                <h4 className="text-lg font-bold text-dark flex items-center gap-2">
                                                    <User size={16} className="text-gray-400" />
                                                    {lead.clientName}
                                                </h4>
                                                {(lead.clientBusiness || lead.clientEmail) && (
                                                    <p className="text-sm text-gray mt-1 flex items-center gap-4">
                                                        {lead.clientBusiness && <span><Building2 size={12} className="inline mr-1" />{lead.clientBusiness}</span>}
                                                        {lead.clientEmail && <span><Mail size={12} className="inline mr-1" />{lead.clientEmail}</span>}
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-400 mt-2">
                                                    Submitted on {new Date(lead.submittedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                                    ${lead.status === 'New' ? 'bg-blue-50 text-blue-600' :
                                                        lead.status === 'Contacted' ? 'bg-purple-50 text-purple-600' :
                                                            lead.status === 'Won' ? 'bg-green-50 text-green-600' :
                                                                'bg-gray-100 text-gray-600'}`}>
                                                    {lead.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
