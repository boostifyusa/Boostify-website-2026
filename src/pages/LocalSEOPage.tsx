import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { SchemaJSON } from '../components/SchemaJSON';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { TrustBadges } from '../components/TrustBadges';
import { TestimonialsSection } from '../components/TestimonialsSection';

import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  TrendingUp,
  EyeOff,
  ThumbsDown,
  BarChart3,
  Star,
  Phone,
  Compass,
  ArrowRight,
  Search
} from 'lucide-react';

// MapPinOff icon component since it might not be in the lucide version or just to be safe
const MapPinOff = ({ size = 24, className = '' }) =>
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
    className={className}>

    <path d="M12.729 12.729a2 2 0 0 1-2.56-2.56" />
    <path d="M8.7 8.7c-1.233 1.324-2.7 3.59-2.7 6.3 0 2.29 1.5 4.5 4.5 4.5 3 0 4.5-2.21 4.5-4.5 0-.663-.09-1.306-.25-1.92" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>;

// FAQ Data for SEO
const faqs = [
  {
    question: 'How long does it take to see results?',
    answer:
      "SEO is a marathon, not a sprint. Typically, you'll start seeing movement in 3-4 months, with significant traffic growth around months 6-9. We build long-term assets that pay dividends for years."
  },
  {
    question: 'Do you guarantee #1 rankings?',
    answer:
      "No ethical SEO agency can guarantee a #1 spot because Google's algorithm changes daily. However, we have a proven track record of getting our clients to the first page and the top of the Map Pack."
  },
  {
    question: 'Do I have to sign a long-term contract?',
    answer:
      'Nope. We work month-to-month. We believe we should earn your business every single month with results, not lock you into a piece of paper.'
  },
  {
    question: "What's the difference between SEO and Google Ads?",
    answer:
      'Google Ads (PPC) is like renting a house. You pay for every visitor, and traffic stops when you stop paying. SEO is like buying a house. You invest upfront to own the real estate, and the traffic is free forever.'
  }];

export function LocalSEOPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <SeoHead
        title="Local SEO Services Fresno - Boostify USA"
        description="Dominate Google Maps and local search results in Fresno. Our local SEO strategies help you get found by neighbors who need your services."
        canonicalUrl="/local-seo"
      />
      <SchemaJSON
        type="Service"
        data={{
          name: "Local SEO Services",
          description: "Search Engine Optimization services focused on local ranking in Fresno, CA.",
          provider: {
            "@type": "LocalBusiness",
            "name": "Boostify USA"
          },
          areaServed: "Fresno, CA"
        }}
      />
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="px-6 relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
          {/* Topographic Background Pattern - Subtle & Reoriented */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.35] -scale-x-100"
            style={{
              backgroundImage: 'url(/hero-bg-pattern.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />

          {/* Radial white fade for text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)'
            }} />

          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
            <motion.div
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6
              }}>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                Local SEO Services
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                Get Found <br></br>Faster Locally<br></br>{' '}
                <span className="text-orange">On Google.</span>
              </h1>
              <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                Stop being invisible on Google. We optimize your online presence
                so when locals search for your services, you show up first —
                every time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/seo-audit"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                  Get Your Free Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                  See Results
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" strokeWidth={3} />
                  Google Certified
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" strokeWidth={3} />
                  Local Focus
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" strokeWidth={3} />
                  Real Results
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.2
              }}
              className="relative">

              {/* Floating badges */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.5
                }}
                className="absolute -top-4 -right-4 z-20 bg-white rounded-xl shadow-lg border border-gray-light px-4 py-2.5 flex items-center gap-2 hidden lg:flex">

                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <MapPin
                    size={16}
                    className="text-green-600"
                    strokeWidth={3} />

                </div>
                <div>
                  <div className="text-xs font-black text-dark leading-none">
                    #1 on Maps
                  </div>
                  <div className="text-[10px] text-gray font-medium">
                    Top 3 Pack
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 1,
                  duration: 0.5
                }}
                className="absolute -bottom-4 -left-4 z-20 bg-dark rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 hidden lg:flex">

                <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center">
                  <TrendingUp
                    size={16}
                    className="text-orange"
                    strokeWidth={3} />

                </div>
                <div>
                  <div className="text-xs font-black text-white leading-none">
                    47 Keywords
                  </div>
                  <div className="text-[10px] text-white/50 font-medium">
                    Page 1 Rankings
                  </div>
                </div>
              </motion.div>

              {/* The Original Graphic (Light Theme) */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl border border-white shadow-2xl overflow-hidden relative z-10 aspect-[4/3] flex flex-col p-3 md:p-4">
                <div className="bg-white border border-gray-100 rounded-full px-4 py-3 flex items-center gap-3 mb-4 shadow-sm z-20">
                  <Search size={18} className="text-gray-400" />
                  <span className="text-dark font-medium">plumber near me</span>
                  <div className="w-px h-5 bg-gray-200 ml-auto" />
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Live Scan</span>
                  </div>
                </div>

                <div className="flex-1 bg-white rounded-2xl relative overflow-hidden border border-gray-100 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-[0.05] select-none pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                  <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M-10 40 Q 30 30 50 50 T 110 60" stroke="#000" strokeWidth="2" fill="none"></path>
                    <path d="M40 -10 Q 50 30 50 50 T 60 110" stroke="#000" strokeWidth="2" fill="none"></path>
                  </svg>

                  <div className="grid grid-cols-7 gap-1.5 md:gap-3 relative z-10 p-4">
                    {Array.from({ length: 49 }).map((_, i) => {
                      const row = Math.floor(i / 7);
                      const col = i % 7;
                      const dist = Math.sqrt(Math.pow(row - 3, 2) + Math.pow(col - 3, 2));

                      let rank, colorClass, delay;

                      if (dist < 4) {
                        rank = Math.floor(Math.random() * 3) + 1;
                        colorClass = "bg-green-500 text-white shadow-green-500/20";
                        delay = dist * 0.05;
                      } else {
                        rank = Math.floor(Math.random() * 3) + 2;
                        if (rank > 3) {
                          colorClass = "bg-orange text-white shadow-orange/20";
                        } else {
                          colorClass = "bg-green-500 text-white shadow-green-500/20";
                        }
                        delay = dist * 0.05;
                      }

                      if (row === 3 && col === 3) {
                        return (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-2 border-gray-100 shadow-xl flex items-center justify-center z-20"
                          >
                            <MapPin size={14} className="text-dark" fill="currentColor" />
                          </motion.div>
                        );
                      }

                      return (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: delay, type: "spring", stiffness: 200 }}
                          className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${colorClass} shadow-lg flex items-center justify-center text-[10px] md:text-xs font-bold border border-white/50`}
                        >
                          {rank}
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="absolute bottom-4 z-30 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-xl border border-gray-100 flex items-center gap-3 transition-transform hover:scale-105 cursor-default">
                    <div className="w-10 h-10 bg-orange/10 rounded-lg shrink-0 flex items-center justify-center">
                      <span className="text-orange font-black text-sm">VP</span>
                    </div>
                    <div>
                      <div className="text-xs font-black text-dark mb-0.5">Valley Pro Plumbing</div>
                      <div className="flex items-center gap-1">
                        <div className="flex text-yellow-500 font-black gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={8} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-[9px] text-gray-500 font-bold">4.9 (127)</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: "3s" }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section >

        <TrustBadges />

        {/* Pain Points Section */}
        <section className="py-24 px-6 bg-light/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1
                }}
                viewport={{
                  once: true
                }}
                className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">

                <motion.div
                  animate={{
                    rotate: [0, -8, 8, -8, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}>

                  <AlertTriangle
                    size={32}
                    className="text-red-500"
                    strokeWidth={2.5} />

                </motion.div>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                Are Your Competitors<br></br>{' '}
                <span className="text-red-500">Busier Than You?</span>
              </h2>
              <p className="text-xl text-gray font-medium">
                If you're not showing up on the first page of Google, your
                competitors are getting the calls that should be yours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Buried on Page 5',
                  desc: 'Your website exists but nobody can find it. 92% of clicks go to page one results.',
                  icon: EyeOff
                },
                {
                  title: 'No Google Profile',
                  desc: "Without an optimized Google Business Profile, you're invisible on Maps — where 46% of searches have local intent.",
                  icon: MapPinOff
                },
                {
                  title: 'Bad Reviews Hurting You',
                  desc: 'Unmanaged reviews are silently driving customers to your competitors. Reputation is everything.',
                  icon: ThumbsDown
                }].
                map((item, i) =>
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 20
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: i * 0.1
                    }}
                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-light hover:shadow-md transition-all">

                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-6">
                      <item.icon size={24} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto space-y-24">
            {/* Benefit 1: Google Business Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                  <MapPin size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                  Dominate Google Maps
                </h2>
                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                  Your Google Business Profile is your most powerful local
                  marketing tool. We optimize every detail so you appear in the
                  coveted Map Pack for your key services.
                </p>
                <ul className="space-y-3">
                  {[
                    'Complete profile optimization',
                    'Strategic category selection',
                    'Photo & post management',
                    'Q&A optimization'].
                    map((item, i) =>
                      <li
                        key={i}
                        className="flex items-center gap-3 font-bold text-dark">

                        <Check
                          size={18}
                          className="text-green-500"
                          strokeWidth={3} />

                        {item}
                      </li>
                    )}
                </ul>
              </div>

              <div className="order-1 lg:order-2 bg-white rounded-3xl aspect-square relative overflow-hidden border border-gray-light shadow-2xl p-8 flex items-center justify-center">
                {/* Subtle Topographic Background */}
                <img
                  src="/279000632_61847a32-e2d1-49e5-bbbb-6ea5c145d830-1-1.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none" />


                {/* GBP Card Mockup */}
                <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 relative z-10">
                  <div className="h-32 bg-gradient-to-br from-orange/20 to-orange/5 relative">
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full p-1 shadow-md">
                      <div className="w-full h-full bg-orange/10 rounded-full flex items-center justify-center text-orange font-black text-xl">
                        VP
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 px-4 pb-6">
                    <h3 className="text-xl font-black text-dark mb-1">
                      Valley Pro Plumbing
                    </h3>
                    <div className="text-sm text-gray font-medium mb-2">
                      Plumber in Fresno, CA
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      <span className="text-orange font-bold text-sm">4.9</span>
                      <div className="flex text-yellow-400 gap-0.5">
                        {[...Array(5)].map((_, i) =>
                          <Star key={i} size={14} fill="currentColor" />
                        )}
                      </div>
                      <span className="text-gray text-sm">(127)</span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray">
                        <Clock size={16} />
                        <span>
                          <span className="text-green-600 font-bold">Open</span>{' '}
                          · Closes 6 PM
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray">
                        <Phone size={16} />
                        <span>(559) 555-0123</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray">
                        <MapPin size={16} />
                        <span>123 Main St, Fresno, CA</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-full text-sm font-bold">
                        <Compass size={14} /> Directions
                      </button>
                      <button className="flex items-center justify-center gap-2 py-2 bg-white border border-gray-300 text-blue-600 rounded-full text-sm font-bold">
                        <Phone size={14} /> Call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 2: Keyword Rankings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                {/* Ranking Tracker UI */}
                <div className="flex items-center gap-2 mb-8">
                  <TrendingUp size={20} className="text-orange" />
                  <span className="text-white font-bold text-lg">
                    Ranking Tracker
                  </span>
                </div>

                {/* Chart */}
                <div className="h-32 w-full mb-8 relative">
                  <svg
                    viewBox="0 0 100 40"
                    className="w-full h-full overflow-visible">

                    <path
                      d="M0 35 C 20 35, 20 20, 40 20 C 60 20, 60 5, 100 5"
                      fill="none"
                      stroke="#E8590C"
                      strokeWidth="3"
                      strokeLinecap="round" />

                    <circle cx="0" cy="35" r="3" fill="#E8590C" />
                    <circle cx="40" cy="20" r="3" fill="#E8590C" />
                    <circle cx="100" cy="5" r="3" fill="#E8590C" />
                  </svg>
                  {/* Gradient under chart */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-orange/10 to-transparent opacity-50 -z-10"
                    style={{
                      clipPath:
                        'polygon(0 100%, 0 85%, 40% 50%, 100% 10%, 100% 100%)'
                    }} />

                </div>

                {/* Keyword List */}
                <div className="space-y-3 mb-6 flex-1">
                  {[
                    {
                      kw: 'ac repair fresno',
                      rank: '#1',
                      change: '↑4',
                      badge: 'bg-green-500'
                    },
                    {
                      kw: 'hvac contractor clovis',
                      rank: '#2',
                      change: '↑6',
                      badge: 'bg-green-500'
                    },
                    {
                      kw: 'furnace repair 93711',
                      rank: '#1',
                      change: '↑8',
                      badge: 'bg-green-500'
                    },
                    {
                      kw: 'emergency ac service',
                      rank: '#3',
                      change: '↑2',
                      badge: 'bg-orange'
                    }].
                    map((item, i) =>
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">

                        <span className="text-white/80 text-sm font-medium">
                          {item.kw}
                        </span>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${item.badge}`}>

                            {item.rank}
                          </span>
                          <span className="text-green-400 text-xs font-bold">
                            {item.change}
                          </span>
                        </div>
                      </div>
                    )}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-white font-black text-xl">
                    47 Keywords{' '}
                    <span className="text-white/40 font-medium text-sm">
                      on Page 1
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                  <BarChart3 size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                  Rank for Keywords That Matter
                </h2>
                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                  We don't chase vanity metrics. We target the exact keywords
                  your customers are typing into Google — specific to your
                  services and your service area.
                </p>
                <ul className="space-y-3">
                  {[
                    'Hyper-local keyword research',
                    'On-page optimization',
                    'Technical SEO fixes',
                    'Monthly ranking reports'].
                    map((item, i) =>
                      <li
                        key={i}
                        className="flex items-center gap-3 font-bold text-dark">

                        <Check
                          size={18}
                          className="text-green-500"
                          strokeWidth={3} />

                        {item}
                      </li>
                    )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-20 px-6 bg-dark text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 shadow-xl shadow-orange/20">
              <ShieldCheck size={40} strokeWidth={2} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              The "Love It" Guarantee
            </h2>
            <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
              We're confident in our craft. If you don't love the results we
              deliver, we'll keep working until you do, or you don't pay a dime.
            </p>
            <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">
              No Risk • 100% Satisfaction
            </div>
          </div>
        </section>

        <TestimonialsSection />

        {/* FAQ Section */}
        <section className="py-24 px-6 bg-light/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight">
              Common Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) =>
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-light overflow-hidden">

                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-lg text-dark hover:bg-gray-50 transition-colors">

                    {faq.question}
                    {openFaq === i ?
                      <ChevronUp size={20} className="text-orange" /> :

                      <ChevronDown size={20} className="text-gray/40" />
                    }
                  </button>
                  <AnimatePresence>
                    {openFaq === i &&
                      <motion.div
                        initial={{
                          height: 0
                        }}
                        animate={{
                          height: 'auto'
                        }}
                        exit={{
                          height: 0
                        }}
                        className="overflow-hidden">

                        <div className="px-8 pb-8 text-gray font-medium leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </section>

        <CTASection />
      </main >

      <Footer />
    </div >);

}