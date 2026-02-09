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
  X,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Search,
  ShieldCheck,
  Zap,
  AlertTriangle
} from
  'lucide-react';
// FAQ Data
const faqs = [
  {
    question: 'How long does it take to build a website?',
    answer:
      'Typically 4-6 weeks from kickoff to launch. We move fast but never rush the details. The timeline depends on how quickly we can get content and feedback from you.'
  },
  {
    question: 'Do I own the website?',
    answer:
      "100%. Once the project is paid for, you own everything—the code, the design, and the content. We don't hold your site hostage."
  },
  {
    question: 'Will it work on mobile phones?',
    answer:
      'Absolutely. We design mobile-first, meaning your site will look and perform perfectly on iPhones, Androids, tablets, and desktops.'
  },
  {
    question: 'What if I need to make changes later?',
    answer:
      'We offer affordable maintenance plans to handle updates for you, or we can build the site on a CMS so you can make simple edits yourself.'
  }];

export function WebDesignPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <SeoHead
        title="Custom Web Design Fresno - Boostify USA"
        description="Custom, SEO-optimized web design for Fresno businesses. Mobile-first, fast loading, and built to convert visitors into customers."
        canonicalUrl="/web-design"
      />
      <SchemaJSON
        type="Service"
        data={{
          name: "Custom Web Design",
          description: "Professional web design services for local businesses in Fresno, CA.",
          provider: {
            "@type": "LocalBusiness",
            "name": "Boostify USA"
          },
          areaServed: "Fresno, CA"
        }}
      />
      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* Hero Section */}
        <section className="px-6 mb-20 relative overflow-hidden">
          {/* Background Elements */}
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
                Custom Web Design
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                Websites That Work As{' '}
                <span className="text-orange">Hard As You Do.</span>
              </h1>
              <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-lg">
                Stop losing customers to ugly, slow websites. We build custom
                digital storefronts that turn Fresno neighbors into paying
                customers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">

                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">

                  View Portfolio
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm font-bold text-dark/60">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" strokeWidth={3} />
                  No Templates
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" strokeWidth={3} />
                  SEO Ready
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" strokeWidth={3} />
                  Fast Loading
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
                  <Check size={16} className="text-green-600" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-xs font-black text-dark leading-none">
                    Mobile Ready
                  </div>
                  <div className="text-[10px] text-gray font-medium">
                    Responsive Design
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
                  <Zap size={16} className="text-orange" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-xs font-black text-white leading-none">
                    PageSpeed 98+
                  </div>
                  <div className="text-[10px] text-white/50 font-medium">
                    Lightning Fast
                  </div>
                </div>
              </motion.div>

              {/* Browser Frame */}
              <div className="rounded-2xl border border-gray-light shadow-2xl overflow-hidden relative z-10">
                {/* Browser Chrome */}
                <div className="bg-white border-b border-gray-light px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="ml-4 flex-1 h-5 bg-gray-50 border border-gray-200 rounded-md max-w-[220px] flex items-center justify-center">
                    <span className="text-[8px] text-gray-400 font-medium">
                      fullthrottlesuspension.com
                    </span>
                  </div>
                </div>
                {/* Screenshot */}
                <img
                  src="/FTS-Mock.jpg"
                  alt="Full Throttle Suspension website design by Boostify"
                  className="w-full h-auto object-cover object-top" />

              </div>

              {/* Decorative Blob */}
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
                Most Local Websites Are{' '}
                <span className="text-red-500">Invisible!</span>
              </h2>
              <p className="text-xl text-gray font-medium">
                DIY builders and cheap templates are costing you money. If your
                site isn't working for you, it's working against you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Slow & Bloated',
                  desc: "Templates are full of junk code that kills load speed. Customers won't wait more than 3 seconds.",
                  icon: Clock
                },
                {
                  title: 'Invisible to Google',
                  desc: 'Without proper structure and schema, Google ignores your site. You stay buried on page 10.',
                  icon: Search
                },
                {
                  title: 'Generic Design',
                  desc: 'Looking like everyone else makes you forgettable. Your brand deserves to stand out.',
                  icon: X
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

        {/* The Solution / Benefits */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto space-y-24">
            {/* Benefit 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                  <Zap size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                  Built for Blazing Speed
                </h2>
                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                  We hand-code our sites using modern technology, not heavy page
                  builders. This means near-instant load times, better Google
                  rankings, and happier customers.
                </p>
                <ul className="space-y-3">
                  {[
                    '90+ Google PageSpeed Scores',
                    'Optimized Images & Assets',
                    'Global CDN Hosting'].
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
              <div className="order-1 lg:order-2 bg-white rounded-3xl aspect-square relative overflow-hidden border border-gray-light shadow-2xl p-8 flex flex-col">
                {/* PageSpeed Dashboard */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-orange" />
                    <span className="text-dark/40 text-xs font-bold uppercase tracking-wider">
                      PageSpeed Insights
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Passed
                  </span>
                </div>

                {/* Score Circle */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 120 120">

                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="#e5e5e5"
                        strokeWidth="8" />

                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="8"
                        strokeDasharray="327"
                        strokeDashoffset="3"
                        strokeLinecap="round" />

                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-dark leading-none">
                        100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    {
                      label: 'FCP',
                      value: '0.8s',
                      status: 'green'
                    },
                    {
                      label: 'LCP',
                      value: '1.2s',
                      status: 'green'
                    },
                    {
                      label: 'TBT',
                      value: '0ms',
                      status: 'green'
                    },
                    {
                      label: 'CLS',
                      value: '0.00',
                      status: 'green'
                    }].
                    map((metric, i) =>
                      <div
                        key={i}
                        className="bg-light rounded-lg p-3 border border-gray-light/50">

                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-2 h-2 rounded-full bg-green-400" />
                          <span className="text-[10px] font-bold text-dark/40 uppercase tracking-wider">
                            {metric.label}
                          </span>
                        </div>
                        <span className="text-lg font-black text-dark">
                          {metric.value}
                        </span>
                      </div>
                    )}
                </div>

                {/* Load Time Comparison */}
                <div className="flex-1 bg-light rounded-xl p-4 border border-gray-light/50">
                  <div className="text-[10px] font-bold text-dark/40 uppercase tracking-wider mb-3">
                    Load Time vs. Competitors
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-dark/60 w-16 shrink-0">
                        You
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-green-400 rounded-full"
                          style={{
                            width: '25%'
                          }} />

                      </div>
                      <span className="text-xs font-black text-dark w-10 text-right">
                        1.2s
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-dark/40 w-16 shrink-0">
                        Avg
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{
                            width: '60%'
                          }} />

                      </div>
                      <span className="text-xs font-bold text-dark/40 w-10 text-right">
                        4.2s
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-dark/40 w-16 shrink-0">
                        Slow
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-red-400 rounded-full"
                          style={{
                            width: '90%'
                          }} />

                      </div>
                      <span className="text-xs font-bold text-dark/40 w-10 text-right">
                        8.1s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="bg-dark rounded-3xl aspect-square relative overflow-hidden flex flex-col p-8">
                {/* Google Search Results Mockup */}
                <div className="flex items-center gap-2 mb-6">
                  <Search size={14} className="text-white/40" />
                  <span className="text-white/40 text-xs font-bold uppercase tracking-wider">
                    Search Results
                  </span>
                </div>

                {/* Search Bar */}
                <div className="bg-white/10 rounded-full px-4 py-3 flex items-center gap-3 mb-6 border border-white/10">
                  <Search size={16} className="text-white/30" />
                  <span className="text-white/70 text-sm font-medium">
                    plumber near me fresno
                  </span>
                  <div className="w-0.5 h-4 bg-orange animate-pulse ml-auto" />
                </div>

                {/* Result #1 — Your Client */}
                <div className="bg-white/10 rounded-xl p-4 mb-3 border border-orange/30 relative">
                  <div className="absolute -top-2 -left-2 bg-orange text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    #1
                  </div>
                  <div className="text-orange text-xs font-medium mb-1 truncate">
                    www.yourclient.com
                  </div>
                  <div className="text-white font-bold text-sm mb-1">
                    Valley Pro Plumbing — Fresno's Trusted Plumber
                  </div>
                  <div className="text-white/40 text-xs leading-relaxed mb-2">
                    Fast, reliable plumbing services in Fresno & Clovis.
                    Licensed & insured. Call today for a free estimate...
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) =>
                      <svg
                        key={i}
                        className="w-3 h-3 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20">

                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    <span className="text-white/30 text-[10px] font-bold ml-1">
                      4.9 (127)
                    </span>
                  </div>
                </div>

                {/* Result #2 — Competitor (faded) */}
                <div className="bg-white/5 rounded-xl p-4 mb-3 border border-white/5 opacity-50">
                  <div className="text-white/30 text-xs font-medium mb-1">
                    www.competitor1.com
                  </div>
                  <div className="h-3 bg-white/10 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-white/5 rounded w-full mb-1" />
                  <div className="h-2 bg-white/5 rounded w-5/6" />
                </div>

                {/* Result #3 — Competitor (more faded) */}
                <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5 opacity-30">
                  <div className="text-white/30 text-xs font-medium mb-1">
                    www.competitor2.com
                  </div>
                  <div className="h-3 bg-white/10 rounded w-2/3 mb-2" />
                  <div className="h-2 bg-white/5 rounded w-full" />
                </div>

                {/* Keyword Rankings */}
                <div className="mt-auto bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-3">
                    Keyword Rankings
                  </div>
                  <div className="space-y-2">
                    {[
                      {
                        keyword: 'plumber fresno',
                        rank: '#1',
                        change: '+3'
                      },
                      {
                        keyword: 'emergency plumber',
                        rank: '#2',
                        change: '+5'
                      },
                      {
                        keyword: 'drain cleaning fresno',
                        rank: '#1',
                        change: '+7'
                      }].
                      map((kw, i) =>
                        <div
                          key={i}
                          className="flex items-center justify-between">

                          <span className="text-white/50 text-xs font-medium">
                            {kw.keyword}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-green-400 text-[10px] font-bold">
                              {kw.change}
                            </span>
                            <span className="text-white font-black text-xs">
                              {kw.rank}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div>
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                  <Search size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-4xl font-black text-dark mb-6 tracking-tight">
                  SEO Baked In, Not Sprinkled On
                </h2>
                <p className="text-lg text-gray font-medium mb-8 leading-relaxed">
                  Most designers don't know SEO. We build every site with the
                  proper structure, schema markup, and local keywords needed to
                  rank in Fresno and beyond.
                </p>
                <ul className="space-y-3">
                  {[
                    'Proper Heading Structure',
                    'Local Schema Markup',
                    'Meta Tags & Descriptions'].
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
              We're confident in our craft. If you don't love the design we
              create for you, we'll keep refining it until you do, or you don't
              pay a dime for the build.
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
      </main>

      <Footer />
    </div>);

}