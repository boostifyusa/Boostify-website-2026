import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { SchemaJSON } from '../components/SchemaJSON';
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
    question: 'What is website maintenance and why do I need it?',
    answer:
      "Website maintenance is the ongoing work that keeps your site secure, fast, and up to date. It covers six core areas: security scanning, backups, software updates, uptime monitoring, performance tuning, and content edits. Without it, sites slowly break: forms stop sending emails, plugins go out of date, security holes open up, and Google rankings drop. Most small businesses lose around $8,840 per year in hidden costs from skipping it.",
  },
  {
    question: 'How much do website maintenance services cost?',
    answer:
      'Most plans run between $50 and $600 per month. Our three tiers are $99 (Essentials), $249 (Pro), and $595 (Concierge). Essentials covers backups, security, and updates. Pro adds monthly content edits and active management. Concierge adds direct text and phone support, unlimited edits, and a free site refresh every 16 months. See the pricing breakdown page for hourly economics.',
  },
  {
    question: 'How often should a website be maintained?',
    answer:
      "Continuously. Uptime monitoring runs every 60 seconds. Backups run daily. Malware scans run weekly. Plugin and core updates run on a staging copy whenever vendors release them. Monthly you should get a plain-English report. That cadence catches problems before they become outages.",
  },
  {
    question: 'What happens if my site goes down?',
    answer:
      "Our monitoring catches it within 60 seconds and the team gets an instant alert. Most issues are resolved before you notice. If it's a hosting issue, we coordinate directly with the provider. If your site goes down on our watch and we can't resolve it within 4 hours, your next month is on us.",
  },
  {
    question: 'Do small businesses really need website maintenance?',
    answer:
      "Yes, often more than enterprise sites. A small business website is usually the only point of contact for new leads, so any downtime is a direct revenue hit. Maintenance also prevents the slow drift (broken plugins, expired SSL, outdated PHP) that quietly tanks Google rankings. See our dedicated page for small business maintenance plans for the full breakdown.",
  },
  {
    question: 'Can I cancel my plan any time?',
    answer:
      "Yes. Every plan is month to month with no contract. Cancel any time, any reason, one email. No fees, no lock-in.",
  },
];

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
      <SeoHead
        title="Website Maintenance Services: Plans From $99/mo, No Contract"
        description="Website maintenance services that keep your site fast, secure, and updated. Plans from $99/month, no contracts. Daily backups, 60-second uptime monitoring, same-day edits."
        canonicalUrl="/maintenance"
        keywords="website maintenance services, website maintenance, website maintenance plans, website maintenance company, wordpress maintenance services, website maintenance pricing"
        ogImage="/og/website-maintenance.png"
        ogType="article"
      >
        <meta property="og:site_name" content="Boostify USA Web Design & SEO" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:modified_time" content="2026-05-15T00:00:00-07:00" />
        <meta property="article:author" content="Victor Estrada" />
        <meta name="twitter:site" content="@boostifyusa" />
        <meta name="twitter:label1" content="Starts at" />
        <meta name="twitter:data1" content="$99/month" />
        <meta name="twitter:label2" content="Contract" />
        <meta name="twitter:data2" content="None, cancel anytime" />
        <meta name="author" content="Victor Estrada" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Fresno" />
      </SeoHead>
      <SchemaJSON
        type="Service"
        data={{
          '@id': 'https://boostifyusa.com/maintenance#service',
          name: 'Website Maintenance Services',
          alternateName: ['Website Maintenance', 'Website Maintenance Plans', 'Website Care Plans'],
          serviceType: 'Website Maintenance',
          category: 'Website Maintenance',
          url: 'https://boostifyusa.com/maintenance',
          description:
            'Professional website maintenance services for small and growing businesses. Daily backups, 60-second uptime monitoring, security scanning, plugin and core updates, content edits, and direct support. Plans from $99/month with no contracts.',
          provider: {
            '@type': 'ProfessionalService',
            '@id': 'https://boostifyusa.com/#localbusiness',
            name: 'Boostify USA Web Design & SEO',
            url: 'https://boostifyusa.com',
            telephone: '+1-559-785-3834',
            email: 'hello@boostifyusa.com',
            logo: 'https://boostifyusa.com/icon.png',
            priceRange: '$99-$595',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Fresno',
              addressRegion: 'CA',
              addressCountry: 'US',
            },
            contactPoint: [
              { '@type': 'ContactPoint', telephone: '+1-559-785-3834', contactType: 'sales' },
              { '@type': 'ContactPoint', telephone: '+1-559-201-8706', contactType: 'customer service' },
            ],
          },
          areaServed: [
            { '@type': 'State', name: 'California' },
            { '@type': 'Country', name: 'United States' },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '9',
            bestRating: '5',
            worstRating: '1',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Website Maintenance Plans',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Essentials Plan' }, price: '99', priceCurrency: 'USD' },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pro Plan' }, price: '249', priceCurrency: 'USD' },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Concierge Plan' }, price: '595', priceCurrency: 'USD' },
            ],
          },
        }}
      />
      <SchemaJSON
        type="FAQPage"
        data={{
          '@id': 'https://boostifyusa.com/maintenance#faq',
          about: { '@id': 'https://boostifyusa.com/maintenance#service' },
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
      <SchemaJSON
        type="BreadcrumbList"
        data={{
          '@id': 'https://boostifyusa.com/maintenance#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://boostifyusa.com/' },
            { '@type': 'ListItem', position: 2, name: 'Maintenance', item: 'https://boostifyusa.com/maintenance' },
          ],
        }}
      />
      <SchemaJSON
        type="WebPage"
        data={{
          '@id': 'https://boostifyusa.com/maintenance#webpage',
          url: 'https://boostifyusa.com/maintenance',
          name: 'Website Maintenance Services: Plans From $99/mo, No Contract',
          description:
            'Website maintenance services hub. Three plans, transparent pricing, no contracts. Links to small business maintenance and pricing breakdown pages.',
          inLanguage: 'en-US',
          dateModified: '2026-05-15T00:00:00-07:00',
          isPartOf: { '@id': 'https://boostifyusa.com/#website' },
          about: { '@id': 'https://boostifyusa.com/maintenance#service' },
          mainEntity: { '@id': 'https://boostifyusa.com/maintenance#service' },
          breadcrumb: { '@id': 'https://boostifyusa.com/maintenance#breadcrumb' },
          author: {
            '@type': 'Person',
            name: 'Victor Estrada',
            jobTitle: 'Founder',
            worksFor: { '@type': 'Organization', name: 'Boostify USA Web Design & SEO' },
            url: 'https://boostifyusa.com/about',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Boostify USA Web Design & SEO',
            logo: { '@type': 'ImageObject', url: 'https://boostifyusa.com/icon.png' },
          },
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
        }}
      />
      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* Hero: centered layout */}
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
              From $99/mo, No Contract
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
              className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95] text-balance">

              Website Maintenance{' '}
              <span className="text-orange">Services.</span>
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
              className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-2xl mx-auto text-pretty">

              Keep your site fast, secure, and updated. Three honest plans,
              monthly pricing, no contracts. Built for small businesses that
              depend on their website for leads.
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

              <a
                href="#plans"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                See Plans &amp; Pricing
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                Book a Call
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
        <section className="py-24 px-6 bg-light/50" id="included">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight text-balance">
                What's in every website maintenance plan.
              </h2>
              <p className="text-xl text-gray font-medium text-pretty">
                Six core services that every plan includes, no matter the tier.
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
                  className="bg-white p-8 rounded-2xl border border-gray-light/50 shadow-lg shadow-dark/5 hover:shadow-xl hover:shadow-dark/10 hover:-translate-y-1 hover:border-orange/20 transition-all duration-300 group">

                  <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-6 border border-orange/20 group-hover:bg-orange group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <feature.icon size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-black text-dark mb-3 tracking-tight group-hover:text-orange transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-dark/70 font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* HUB ROUTING: keep the hub free of detailed pricing. Two clear paths to the spoke pages where pricing lives. */}
        <section id="plans" className="py-24 px-6 scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-orange text-sm font-bold uppercase tracking-wider mb-3">
                Plans &amp; Pricing
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight text-balance mb-4">
                Find the right website maintenance plan.
              </h2>
              <p className="text-lg text-gray font-medium text-pretty">
                Two ways to dig in. Pick the one that matches what you're looking for.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <Link
                to="/website-maintenance-small-business"
                className="bg-light/60 hover:bg-orange/10 hover:border-orange/40 border border-gray-light/60 rounded-2xl p-6 transition-all group flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-orange/15 flex items-center justify-center text-orange shrink-0">
                  <ArrowRight size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange mb-1">
                    Built for SMB
                  </p>
                  <h3 className="text-lg font-black text-dark group-hover:text-orange transition-colors tracking-tight leading-snug mb-1">
                    Maintenance for small business
                  </h3>
                  <p className="text-sm text-gray font-medium leading-snug">
                    Same plans, framed for small business owners.
                  </p>
                </div>
              </Link>
              <Link
                to="/website-maintenance-cost"
                className="bg-light/60 hover:bg-orange/10 hover:border-orange/40 border border-gray-light/60 rounded-2xl p-6 transition-all group flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-orange/15 flex items-center justify-center text-orange shrink-0">
                  <ArrowRight size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange mb-1">
                    Pricing breakdown
                  </p>
                  <h3 className="text-lg font-black text-dark group-hover:text-orange transition-colors tracking-tight leading-snug mb-1">
                    What does $99/month actually buy?
                  </h3>
                  <p className="text-sm text-gray font-medium leading-snug">
                    Hour-by-hour breakdown and ROI math.
                  </p>
                </div>
              </Link>
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
            <h2 className="text-4xl font-black text-dark text-center mb-16 tracking-tight text-balance">
              Website maintenance FAQ.
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