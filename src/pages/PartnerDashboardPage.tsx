import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { Footer } from '../components/Footer';
import { QRCodeSVG } from 'qrcode.react';
import {
    LogOut, Copy, Check, Plus, Link as LinkIcon,
    User, Building2, Mail, Loader2, FileText, ExternalLink,
    Activity, Award, TrendingUp
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

    const totalReferrals = leads.length;
    const activeReferrals = leads.filter(l => l.status === 'New' || l.status === 'Contacted').length;
    const wonReferrals = leads.filter(l => l.status === 'Won').length;
    const winRate = totalReferrals > 0 ? Math.round((wonReferrals / totalReferrals) * 100) : 0;

    return (
        <div className="min-h-screen bg-gray-50 selection:bg-orange selection:text-white flex flex-col relative overflow-hidden">
            {/* Ambient Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange/[0.04] rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[-5%] w-[40vw] h-[40vw] bg-orange/[0.03] rounded-full blur-[100px]" />
            </div>

            <SeoHead
                title="Partner Dashboard | Boostify USA Referral Portal"
                description="Manage your referrals and payouts."
                canonicalUrl="/partners/dashboard"
            />
            <Navigation />

            <main className="flex-1 pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-[76.8rem] mx-auto">
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-dark mb-2 tracking-tight">
                                Dashboard
                            </h1>
                            <p className="text-gray flex items-center gap-2 font-medium text-lg">
                                <User size={20} className="text-orange" />
                                Welcome, {partner.name} {partner.businessName && `• ${partner.businessName}`}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-gray hover:text-dark font-bold flex items-center gap-2 transition-colors px-5 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 bg-white shadow-sm"
                        >
                            <LogOut size={18} />
                            Log Out
                        </button>
                    </div>

                    {/* Top Metrics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-[1.5rem] shadow-xl shadow-dark/5 border border-gray-100 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                                    <FileText size={16} />
                                </div>
                                <p className="text-xs font-bold text-gray uppercase tracking-wider">Total Referrals</p>
                            </div>
                            <p className="text-4xl font-black text-dark">{totalReferrals}</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-[1.5rem] shadow-xl shadow-dark/5 border border-gray-100 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                    <Activity size={16} />
                                </div>
                                <p className="text-xs font-bold text-gray uppercase tracking-wider">Active Deals</p>
                            </div>
                            <p className="text-4xl font-black text-dark">{activeReferrals}</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-[1.5rem] shadow-xl shadow-dark/5 border border-gray-100 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                                    <Award size={16} />
                                </div>
                                <p className="text-xs font-bold text-gray uppercase tracking-wider">Total Won</p>
                            </div>
                            <p className="text-4xl font-black text-dark">{wonReferrals}</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-orange p-6 rounded-[1.5rem] shadow-xl shadow-orange/20 border border-orange-hover flex flex-col justify-between hover:-translate-y-1 transition-transform relative overflow-hidden group">
                            {/* Decorative element inside orange card */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500" />
                            <div className="relative z-10 flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                                    <TrendingUp size={16} />
                                </div>
                                <p className="text-xs font-bold text-white/90 uppercase tracking-wider">Win Rate</p>
                            </div>
                            <p className="relative z-10 text-4xl font-black text-white">{winRate}%</p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT COLUMN: Tools */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Referral Link Card */}
                            <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-dark/5 border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                                <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                                    <LinkIcon size={20} className="text-orange" />
                                    Your Referral Link
                                </h3>
                                <p className="text-sm text-gray mb-6 leading-relaxed font-medium">
                                    Send this link to clients so they can submit their info directly to us. We'll automatically credit you.
                                </p>

                                <div className="bg-gray-50 flex items-center justify-between p-2 pl-4 rounded-xl border border-gray-200">
                                    <span className="text-xs font-mono text-gray-500 truncate mr-3 font-medium">
                                        {referralLink}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        className="w-10 h-10 shrink-0 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-dark hover:border-orange hover:text-orange hover:shadow-md transition-all"
                                    >
                                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Promotional Material Card Placeholder over mobile */}
                            <div className="bg-gradient-to-br from-dark to-gray-900 p-8 rounded-[2rem] shadow-2xl shadow-dark/20 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange/20 rounded-full blur-2xl" />
                                <h3 className="text-xl font-bold mb-2 relative z-10 flex items-center gap-2">
                                    Need Marketing Materials?
                                </h3>
                                <p className="text-sm text-gray-300 font-medium relative z-10 mb-6 leading-relaxed">
                                    Access our partner kit with email templates, social posts, and printable flyers to help you close deals.
                                </p>
                                <button className="w-full relative z-10 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 text-sm">
                                    Coming Soon
                                </button>
                            </div>

                            {/* QR Code Card */}
                            <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-dark/5 border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-500">
                                <h3 className="text-xl font-bold text-dark mb-2">In-Person QR Code</h3>
                                <p className="text-sm text-gray mb-8 font-medium">Have clients scan this code instantly on your phone.</p>
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
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-black text-dark">Your Leads</h2>
                                <button
                                    onClick={() => setShowForm(!showForm)}
                                    className="bg-orange text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-orange-hover transition-all shadow-xl shadow-orange/20 hover:shadow-orange/30 transform hover:-translate-y-0.5"
                                >
                                    <Plus size={16} />
                                    Submit Lead
                                </button>
                            </div>

                            {showForm && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    className="bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl shadow-dark/10 border border-orange/20 mb-6"
                                >
                                    <h3 className="text-xl font-black text-dark mb-1">Manually Submit a Lead</h3>
                                    <p className="text-gray text-sm mb-6 font-medium">Fill out your client's details and we'll reach out to them.</p>
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
                                        <div key={lead.id} className="bg-white p-6 rounded-[1.5rem] shadow-md shadow-dark/5 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-orange/30 hover:shadow-lg transition-all group">
                                            <div>
                                                <h4 className="text-lg font-bold text-dark flex items-center gap-2">
                                                    <User size={16} className="text-gray-400 group-hover:text-orange transition-colors" />
                                                    {lead.clientName}
                                                </h4>
                                                {(lead.clientBusiness || lead.clientEmail) && (
                                                    <p className="text-sm text-gray mt-2 flex items-center gap-4 font-medium">
                                                        {lead.clientBusiness && <span className="flex items-center gap-1"><Building2 size={12} className="text-gray-400" />{lead.clientBusiness}</span>}
                                                        {lead.clientEmail && <span className="flex items-center gap-1"><Mail size={12} className="text-gray-400" />{lead.clientEmail}</span>}
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-400 mt-3 font-medium">
                                                    Submitted on {new Date(lead.submittedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3 self-start md:self-center">
                                                <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider
                                                    ${lead.status === 'New' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                                        lead.status === 'Contacted' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                                            lead.status === 'Won' ? 'bg-green-50 text-green-600 border border-green-100' :
                                                                'bg-gray-100 text-gray-600 border border-gray-200'}`}>
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
