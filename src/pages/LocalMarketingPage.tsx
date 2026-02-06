import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { TrustBadges } from '../components/TrustBadges';
import { TestimonialsSection } from '../components/TestimonialsSection';
import {
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  Star,
  Phone,
  DollarSign,
  Target,
  Users,
  MousePointerClick,
  TrendingUp,
  BadgeCheck,
  Megaphone
} from
  'lucide-react';
const faqs = [
  {
    question: 'How much should I spend on Google Ads?',
    answer:
      "It depends on your industry and competition. Most local service businesses see great results starting at $1,000 to $2,500/month in ad spend. We'll help you find the sweet spot where every dollar brings back $3-5 in revenue."
  },
  {
    question: 'What are Local Service Ads (LSAs)?',
    answer:
      'LSAs are Google\'s pay-per-lead ads that appear at the very top of search results with a "Google Guaranteed" badge. You only pay when a customer actually contacts you, not for clicks. They\'re the highest-converting ad format for local businesses.'
  },
  {
    question: 'How fast will I start getting leads?',
    answer:
      'Unlike SEO, paid ads deliver results almost immediately. Most clients see their first leads within 48 hours of campaign launch. We optimize continuously to improve quality and lower costs over time.'
  },
  {
    question: 'Can I pause or stop my ads anytime?',
    answer:
      'Absolutely. You have full control. No long-term contracts, no cancellation fees. We work month-to-month because we believe results should earn your business, not a contract.'
  }];

export function LocalMarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* Hero Section */}
        <section className="px-6 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                Local Advertising
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                Stop Waiting for Leads. Start Getting Them{' '}
                <span className="text-orange">Today.</span>
              </h1>
              <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                Google Ads and Local Service Ads put your business at the top of
                search results instantly. We manage every dollar so you get
                maximum leads at minimum cost.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/contact"
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
                  Google Partner
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" strokeWidth={3} />
                  Proven ROI
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" strokeWidth={3} />
                  No Contracts
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
                  <TrendingUp
                    size={16}
                    className="text-green-600"
                    strokeWidth={3} />

                </div>
                <div>
                  <div className="text-xs font-black text-dark leading-none">
                    3.2x ROAS
                  </div>
                  <div className="text-[10px] text-gray font-medium">
                    Avg Return
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
                  <DollarSign
                    size={16}
                    className="text-orange"
                    strokeWidth={3} />

                </div>
                <div>
                  <div className="text-xs font-black text-white leading-none">
                    $12 Avg
                  </div>
                  <div className="text-[10px] text-white/50 font-medium">
                    Cost Per Lead
                  </div>
                </div>
              </motion.div>

              {/* Google Ads Dashboard Mockup */}
              <div className="bg-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10 p-6 aspect-[4/3] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Megaphone size={16} className="text-orange" />
                    <span className="text-white/60 text-xs font-bold uppercase tracking-wider">
                      Campaign Manager
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-bold">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Campaign Row */}
                <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-white font-bold text-sm">
                        Fresno Plumbing - Search
                      </div>
                      <div className="text-white/30 text-[10px] font-medium">
                        Active · Fresno, Clovis, Madera
                      </div>
                    </div>
                    <div className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ACTIVE
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {[
                    {
                      label: 'Impressions',
                      value: '12,847'
                    },
                    {
                      label: 'Clicks',
                      value: '943'
                    },
                    {
                      label: 'CTR',
                      value: '7.3%'
                    },
                    {
                      label: 'Conversions',
                      value: '78'
                    }].
                    map((metric, i) =>
                      <div
                        key={i}
                        className="bg-white/5 rounded-lg p-2.5 border border-white/5 text-center">

                        <div className="text-white font-black text-sm leading-none mb-1">
                          {metric.value}
                        </div>
                        <div className="text-white/30 text-[8px] font-bold uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    )}
                </div>

                {/* Mini Chart */}
                <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">
                      Leads This Month
                    </span>
                    <span className="text-green-400 text-xs font-bold">
                      +34%
                    </span>
                  </div>
                  <div className="flex items-end gap-1.5 h-20">
                    {[35, 42, 28, 55, 48, 62, 45, 70, 58, 75, 68, 82, 78].map(
                      (h, i) =>
                        <div
                          key={i}
                          className={`flex-1 rounded-t-sm ${i >= 10 ? 'bg-orange' : 'bg-white/15'}`}
                          style={{
                            height: `${h}%`
                          }} />


                    )}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-white/20 text-[8px] font-mono">
                      Week 1
                    </span>
                    <span className="text-white/20 text-[8px] font-mono">
                      Week 4
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -left-10 w-full h-full bg-orange/5 rounded-3xl -z-10 hidden lg:block" />
            </motion.div>
          </div>
        </section>

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
                You're Burning Money on{' '}
                <span className="text-red-500">Bad Ads!</span>
              </h2>
              <p className="text-xl text-gray font-medium">
                Most small businesses waste thousands on poorly managed ads.
                Without the right strategy, you're paying for clicks that never
                become customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Wasted Ad Spend',
                  desc: 'Throwing money at Google without a strategy is like setting it on fire. Most DIY campaigns waste 40-60% of their budget on irrelevant clicks.',
                  icon: DollarSign
                },
                {
                  title: 'No Conversion Tracking',
                  desc: "If you can't measure it, you can't improve it. Without proper tracking, you have no idea which ads are actually bringing in customers.",
                  icon: Target
                },
                {
                  title: 'Wrong Audience',
                  desc: "Your ads are showing to people 50 miles away who'll never visit. Poor targeting means you're paying for eyeballs that don't matter.",
                  icon: Users
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
            {/* Benefit 1: Local Service Ads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                  <BadgeCheck size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                  Get the Google Guaranteed Badge
                </h2>
                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                  Local Service Ads put you at the very top of Google, above
                  regular ads and organic results. You only pay when a customer
                  actually contacts you, not for clicks.
                </p>
                <ul className="space-y-3">
                  {[
                    'Pay per lead, not per click',
                    'Google Guaranteed trust badge',
                    'Top of search placement',
                    'Background-verified business'].
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

              <div className="order-1 lg:order-2 bg-white rounded-3xl aspect-square relative overflow-hidden border border-gray-light shadow-2xl p-8 flex items-center justify-center bg-gray-50">
                {/* LSA Listing Mockup */}
                <div className="w-full max-w-sm space-y-4">
                  {/* Google Guaranteed Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-green-700 text-xs font-bold uppercase tracking-wider">
                      Google Guaranteed
                    </span>
                  </div>

                  {/* LSA Card */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-orange/10 rounded-lg shrink-0 flex items-center justify-center">
                        <span className="text-orange font-black text-xl">
                          VP
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-black text-dark text-lg">
                            Valley Pro Plumbing
                          </h4>
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                            <Check
                              size={10}
                              className="text-white"
                              strokeWidth={3} />

                          </div>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex text-yellow-400 gap-0.5">
                            {[...Array(5)].map((_, i) =>
                              <Star key={i} size={12} fill="currentColor" />
                            )}
                          </div>
                          <span className="text-dark/60 text-xs font-bold">
                            5.0 (89)
                          </span>
                        </div>
                        <div className="text-gray text-sm mb-3">
                          Fresno, CA · 8 yrs in business
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                            Google Guaranteed
                          </span>
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            Licensed
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold">
                            <Phone size={14} /> Call
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-gray-300 text-dark rounded-lg text-sm font-bold">
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Faded competitor */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 opacity-40">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 2: Google Ads / PPC */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                {/* PPC Dashboard */}
                <div className="flex items-center gap-2 mb-6">
                  <MousePointerClick size={20} className="text-orange" />
                  <span className="text-white font-bold text-lg">
                    Campaign Performance
                  </span>
                </div>

                {/* Big Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">
                      Total Spend
                    </div>
                    <div className="text-white font-black text-2xl">$2,450</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">
                      Revenue
                    </div>
                    <div className="text-green-400 font-black text-2xl">
                      $7,840
                    </div>
                  </div>
                </div>

                {/* Conversion Funnel */}
                <div className="space-y-3 mb-6 flex-1">
                  {[
                    {
                      label: 'Impressions',
                      value: '24,512',
                      bar: '100%',
                      color: 'bg-white/15'
                    },
                    {
                      label: 'Clicks',
                      value: '1,847',
                      bar: '65%',
                      color: 'bg-white/25'
                    },
                    {
                      label: 'Leads',
                      value: '156',
                      bar: '35%',
                      color: 'bg-orange/60'
                    },
                    {
                      label: 'Customers',
                      value: '42',
                      bar: '18%',
                      color: 'bg-orange'
                    }].
                    map((item, i) =>
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/50 text-xs font-medium">
                            {item.label}
                          </span>
                          <span className="text-white font-bold text-xs">
                            {item.value}
                          </span>
                        </div>
                        <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{
                              width: item.bar
                            }} />

                        </div>
                      </div>
                    )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-white font-black text-xl">
                    3.2x{' '}
                    <span className="text-white/40 font-medium text-sm">
                      Return on Ad Spend
                    </span>
                  </div>
                  <div className="text-green-400 text-sm font-bold flex items-center gap-1">
                    <TrendingUp size={14} /> +34%
                  </div>
                </div>
              </div>

              <div>
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                  <MousePointerClick size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                  Precision-Targeted Google Ads
                </h2>
                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                  We build laser-focused campaigns that target the exact
                  customers searching for your services in your area. Every
                  dollar is tracked, optimized, and working hard.
                </p>
                <ul className="space-y-3">
                  {[
                    'Geo-targeted to your service area',
                    'Full conversion tracking setup',
                    'A/B tested ad copy & landing pages',
                    'Weekly performance reports'].
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
              The "No Waste" Guarantee
            </h2>
            <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
              We treat your ad budget like it's our own money. If we can't
              deliver a positive return on your ad spend within 60 days, we'll
              manage your campaigns for free until we do.
            </p>
            <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">
              No Risk • 60-Day Guarantee
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
      </main>

      <Footer />
    </div>);

}