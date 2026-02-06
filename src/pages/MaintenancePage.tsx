import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import {
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Shield,
  ShieldCheck,
  Activity,
  Database,
  RefreshCw,
  Wrench,
  Headphones,
} from
  'lucide-react';
const faqs = [
  {
    question: 'What counts as an "on-demand change"?',
    answer:
      "Text updates, image swaps, adding new sections, tweaking layouts, updating business hours. Basically anything that doesn't require building an entirely new page from scratch. Most requests are handled same-day."
  },
  {
    question: 'What happens if my site goes down?',
    answer:
      "Our monitoring catches it within 60 seconds and we get an instant alert. Most issues are resolved before you even notice. If it's a hosting issue, we coordinate directly with the provider to get you back online ASAP."
  },
  {
    question: 'Do I need maintenance if I have a new website?',
    answer:
      'Absolutely. Even brand-new sites need security updates, backups, and monitoring. Think of it like a new car: it still needs oil changes. We keep everything running smooth from day one.'
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      "Yes. Month-to-month, no contracts. We believe in earning your business every month with results, not locking you in. Though once you see the peace of mind, you won't want to leave."
  }];

const features = [
  {
    icon: Activity,
    title: '24/7 Uptime Monitoring',
    desc: 'We check your site every 60 seconds. If anything goes wrong, we know before your customers do.',
    visual: 'uptime'
  },
  {
    icon: Database,
    title: 'Daily Cloud Backups',
    desc: 'Your entire site backed up every single day to secure cloud storage. One-click restore if anything ever goes sideways.',
    visual: 'backup'
  },
  {
    icon: Shield,
    title: 'Security Scanning',
    desc: 'Continuous malware scanning, firewall protection, and vulnerability patching. We keep the bad guys out.',
    visual: 'security'
  },
  {
    icon: RefreshCw,
    title: 'Plugin & Core Updates',
    desc: 'We test and apply every update so nothing breaks. No more "update available" anxiety.',
    visual: 'updates'
  },
  {
    icon: Wrench,
    title: 'On-Demand Changes',
    desc: 'Need a text change? New photo? Updated hours? Just send us a message and we handle it, usually same day.',
    visual: 'changes'
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    desc: 'Direct line to our team. No tickets, no waiting. Real humans who know your site inside and out.',
    visual: 'support'
  }];

export function MaintenancePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* Hero — Centered Layout */}
        <section className="px-6 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange/5 rounded-full blur-[120px] -z-10 -translate-y-1/2" />

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">

              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              Website Care Plans
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5,
                delay: 0.1
              }}
              className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">

              Your Site, Always{' '}
              <span className="text-orange">Taken Care Of.</span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5,
                delay: 0.2
              }}
              className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-2xl mx-auto">

              You run your business. We'll keep your website fast, secure, and
              up-to-date. Think of us as your on-call web team, without the
              overhead.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5,
                delay: 0.3
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8">

              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all duration-300">
                Get Protected Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
                View Maintenance Plans
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Live Dashboard Visual */}
        <section className="px-6 mb-32">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.4
            }}
            className="max-w-5xl mx-auto">

            <div className="bg-dark rounded-3xl border border-white/10 shadow-2xl p-6 md:p-8">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-orange" />
                  <span className="text-white/60 text-sm font-bold uppercase tracking-wider">
                    Site Monitor: yourbusiness.com
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm font-bold">
                    ALL SYSTEMS GO
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  {
                    label: 'Uptime',
                    value: '99.98%',
                    sub: '30 days',
                    color: 'text-green-400'
                  },
                  {
                    label: 'Avg Response',
                    value: '142ms',
                    sub: 'Last 24h',
                    color: 'text-white'
                  },
                  {
                    label: 'SSL Grade',
                    value: 'A+',
                    sub: 'Secure',
                    color: 'text-green-400'
                  },
                  {
                    label: 'Threats Blocked',
                    value: '847',
                    sub: 'This month',
                    color: 'text-orange'
                  }].
                  map((stat, i) =>
                    <div
                      key={i}
                      className="bg-white/5 rounded-xl p-4 border border-white/5">

                      <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-2">
                        {stat.label}
                      </div>
                      <div
                        className={`font-black text-2xl leading-none mb-1 ${stat.color}`}>

                        {stat.value}
                      </div>
                      <div className="text-white/20 text-xs font-medium">
                        {stat.sub}
                      </div>
                    </div>
                  )}
              </div>

              {/* Uptime Bar */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/40 text-xs font-bold uppercase tracking-wider">
                    Uptime: Last 30 Days
                  </span>
                  <span className="text-green-400 text-xs font-bold">
                    99.98%
                  </span>
                </div>
                <div className="flex gap-[3px]">
                  {Array.from({
                    length: 30
                  }).map((_, i) =>
                    <div
                      key={i}
                      className={`flex-1 h-6 rounded-sm ${i === 17 ? 'bg-yellow-400/80' : 'bg-green-400/70'}`} />

                  )}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-white/20 text-[10px] font-mono">
                    30 days ago
                  </span>
                  <span className="text-white/20 text-[10px] font-mono">
                    Today
                  </span>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">
                    Recent Activity
                  </div>
                  <div className="space-y-2.5">
                    {[
                      {
                        time: '2m ago',
                        label: 'Backup completed successfully',
                        color: 'bg-green-400'
                      },
                      {
                        time: '1h ago',
                        label: '3 plugins updated',
                        color: 'bg-orange'
                      },
                      {
                        time: '6h ago',
                        label: 'Security scan: all clear',
                        color: 'bg-green-400'
                      },
                      {
                        time: '1d ago',
                        label: 'Core update applied (v6.4)',
                        color: 'bg-orange'
                      }].
                      map((item, i) =>
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${item.color} shrink-0`} />

                          <span className="text-white/60 text-xs font-medium flex-1 truncate">
                            {item.label}
                          </span>
                          <span className="text-white/20 text-[10px] font-mono shrink-0">
                            {item.time}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">
                    This Month
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: 'Backups',
                        value: '30',
                        icon: Database
                      },
                      {
                        label: 'Updates',
                        value: '12',
                        icon: RefreshCw
                      },
                      {
                        label: 'Scans',
                        value: '720',
                        icon: Shield
                      },
                      {
                        label: 'Changes',
                        value: '4',
                        icon: Wrench
                      }].
                      map((item, i) =>
                        <div
                          key={i}
                          className="bg-white/5 rounded-lg p-3 text-center">

                          <item.icon
                            size={14}
                            className="text-orange mx-auto mb-1.5" />

                          <div className="text-white font-black text-lg leading-none">
                            {item.value}
                          </div>
                          <div className="text-white/30 text-[9px] font-bold uppercase tracking-wider mt-1">
                            {item.label}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Bento Feature Grid */}
        <section id="features" className="py-24 px-6 bg-light/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                Everything Your Site Needs to{' '}
                <span className="text-orange">Stay Healthy</span>
              </h2>
              <p className="text-xl text-gray font-medium">
                Six essential services that keep your website fast, secure, and
                always working for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) =>
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
                    delay: i * 0.08
                  }}
                  className="bg-white p-8 rounded-2xl border border-gray-light shadow-sm hover:shadow-md transition-all group">

                  <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* What's Included Card */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
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
              className="bg-white rounded-3xl border-2 border-orange/20 shadow-xl p-10 md:p-14 relative overflow-hidden">

              <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-bold uppercase tracking-wider mb-6">
                  Most Popular
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-dark mb-4 tracking-tight">
                  Website Care Plan
                </h2>
                <p className="text-lg text-gray font-medium mb-10 max-w-xl">
                  Everything below is included. No hidden fees, no surprise
                  charges. Just complete peace of mind.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
                  {[
                    '24/7 uptime monitoring (60s checks)',
                    'Daily automated cloud backups',
                    'Malware scanning & removal',
                    'SSL certificate management',
                    'Plugin & core updates (tested)',
                    'Monthly performance reports',
                    'On-demand content changes',
                    'Priority email & phone support',
                    'Speed optimization',
                    'Broken link monitoring'].
                    map((item, i) =>
                      <div key={i} className="flex items-center gap-3 py-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Check
                            size={12}
                            className="text-green-600"
                            strokeWidth={3} />

                        </div>
                        <span className="text-dark font-bold text-sm">
                          {item}
                        </span>
                      </div>
                    )}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">

                  Get Started: Book a Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
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
              The "Sleep Easy" Guarantee
            </h2>
            <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
              If your site goes down on our watch and we don't resolve it within
              4 hours, your next month is free. That's how seriously we take
              your uptime.
            </p>
            <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">
              No Risk • 4-Hour SLA
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
    </div >);

}