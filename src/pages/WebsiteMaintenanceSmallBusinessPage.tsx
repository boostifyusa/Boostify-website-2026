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
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

// Direct, fact-first answers. Optimized for both human readers and AI search engines (FAQPage schema).
const faqs = [
  {
    question: 'How much does website maintenance cost for a small business?',
    answer:
      'Most small businesses pay between $50 and $600 per month depending on how hands-on they want their provider. We offer three tiers: Essentials at $99/mo for security, backups, and updates; Pro at $249/mo which adds monthly content edits and active management; and Concierge at $595/mo for unlimited edits, direct text and phone access, and a free site refresh every 16 months. All plans are month to month, no contracts.',
  },
  {
    question: 'Is website maintenance worth it for a low-traffic site?',
    answer:
      'Yes, often more so. A small business site is usually the only point of contact for new leads, so a few hours of downtime can mean missed calls and lost form submissions. Maintenance also prevents the slow drift (broken plugins, expired SSL, outdated PHP) that quietly tanks Google rankings.',
  },
  {
    question: 'What is included in a small business maintenance plan?',
    answer:
      'A complete plan covers six categories: security (malware scan, firewall, SSL), backups (daily, off-site, one-click restore), updates (core, plugin, theme, tested first), uptime monitoring with alerts, performance tuning, and content edits. The exact mix depends on the tier. Essentials covers the protective basics. Pro layers on active management and edits. Concierge adds unlimited edits and a free site refresh every 16 months.',
  },
  {
    question: 'Do you require a long-term contract?',
    answer:
      'No. Every plan is month to month. Cancel anytime with one email. No fees, no lock-in. We earn the renewal each month.',
  },
  {
    question: 'Do you serve small businesses outside California?',
    answer:
      'Yes. We are headquartered in Fresno, California and serve clients across the United States remotely. Maintenance is delivered the same way regardless of location.',
  },
];

const comparisonRows = [
  { feature: 'Starting price', diy: 'Your time (4 to 8 hrs)', agency: '$200/mo with contract', boost: 'From $99/mo, no contract' },
  { feature: 'Contract length', diy: 'N/A', agency: '6 to 12 months', boost: 'Month to month' },
  { feature: 'Response time', diy: 'When you have time', agency: '24 to 72 hours', boost: 'Same day' },
  { feature: 'Tested updates', diy: 'Click and pray', agency: 'Sometimes', boost: 'Staged first, every time' },
  { feature: 'Content edits', diy: 'Yourself', agency: 'Extra fee', boost: '30 min / month included' },
  { feature: 'Real human on the phone', diy: 'N/A', agency: 'Ticket queue', boost: 'Fresno team, direct line' },
];

// Rotations fan outward from center: left cards tilt left, right cards tilt right.
// What happens inside a maintenance month. Helps prospects picture the work and helps GEO with structured process data.
const cadence = [
  {
    when: 'Every 60 seconds',
    title: 'Uptime check fires',
    body:
      'Automated pings hit your homepage and core pages. If anything fails, our team gets a Slack alert before your phone starts ringing.',
  },
  {
    when: 'Every day',
    title: 'Backups run off-site',
    body:
      'Full file + database snapshot to a separate server. We hold 30 days of history so we can roll you back to any morning in the last month.',
  },
  {
    when: 'Every week',
    title: 'Malware and vulnerability scan',
    body:
      'WordFence + manual review across files, themes, plugins, and the database. Anything flagged gets cleaned the same week, not next quarter.',
  },
  {
    when: 'Every update cycle',
    title: 'Staged update, then push',
    body:
      'Plugin and core updates run on a private staging copy first. If a form breaks or the checkout chokes, we catch it there. Your live site never sees a broken release.',
  },
  {
    when: 'Every month',
    title: 'Plain-English report',
    body:
      'One page. What was updated, what was blocked, uptime percentage, page speed delta, and what you should know about for next month. No jargon, no padding.',
  },
];

// Industries we actually work with. Helps long-tail SEO (local seo for X) and shows ICP fit.
const industries = [
  'Contractors and trades',
  'Dental and medical offices',
  'Restaurants and cafes',
  'Law firms and CPAs',
  'Real estate and brokerages',
  'Med spas and salons',
  'Home services (HVAC, plumbing, roofing)',
  'Auto shops and detailers',
  'Boutique retail and ecommerce',
  'Nonprofits and churches',
  'Local consultants and coaches',
  'Veterinary and pet services',
];

const tiers = [
  {
    name: 'Essentials',
    price: 99,
    originalPrice: 120,
    promoNote: 'Launch pricing. Regular price $120/mo.',
    cta: 'Start with Essentials',
    pitch: 'Keep the site safe, current, and online.',
    highlight: false,
    features: [
      'Daily off-site backups (30-day history)',
      '60-second uptime monitoring',
      'Malware scan and active removal',
      'WordPress, plugin, and theme updates',
      'SSL renewal and management',
      'Monthly plain-English report',
      'Email support, 24-hour response',
    ],
  },
  {
    name: 'Pro',
    price: 249,
    pitch: 'Everything in Essentials, plus active management.',
    cta: 'Choose Pro',
    highlight: true,
    features: [
      'Everything in Essentials',
      '30 min of content edits per month',
      'Speed and performance audits',
      'Broken link and form monitoring',
      'Priority email support, same-day',
      'Quarterly strategy check-in',
    ],
  },
  {
    name: 'Concierge',
    price: 595,
    pitch: 'Hands-off care. You text, we handle it.',
    cta: 'Talk About Concierge',
    highlight: false,
    features: [
      'Everything in Pro',
      'Direct text and phone line to our team',
      'Unlimited content edits (within reason)',
      'Free site refresh every 16 months',
      'Priority same-day response',
      'Dedicated account lead',
    ],
  },
];

export function WebsiteMaintenanceSmallBusinessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <SeoHead
        title="Website Maintenance for Small Business: From $99/mo, No Contract"
        description="Honest website maintenance for small businesses. From $99/mo, no contracts. Daily backups, security, same-day edits, 4-hour SLA. 5-star rated on Google."
        canonicalUrl="/website-maintenance-small-business"
        keywords="website maintenance for small business, small business website maintenance, affordable website maintenance, website maintenance pricing, website maintenance cost for small business, wordpress maintenance small business, website maintenance plans"
        ogImage="/og/website-maintenance-small-business.png"
        ogType="article"
      >
        {/* Extended OG + Twitter meta for richer social previews and higher click-through */}
        <meta property="og:site_name" content="Boostify USA Web Design & SEO" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:published_time" content="2026-05-01T00:00:00-07:00" />
        <meta property="article:modified_time" content="2026-05-14T00:00:00-07:00" />
        <meta property="article:author" content="Victor Estrada" />
        <meta name="twitter:site" content="@boostifyusa" />
        <meta name="twitter:creator" content="@boostifyusa" />
        <meta name="twitter:label1" content="Starts at" />
        <meta name="twitter:data1" content="$99/month" />
        <meta name="twitter:label2" content="Contract" />
        <meta name="twitter:data2" content="None, cancel anytime" />
        <meta name="author" content="Victor Estrada" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Fresno" />
        <meta name="geo.position" content="36.7378;-119.7871" />
        <meta name="ICBM" content="36.7378, -119.7871" />
      </SeoHead>

      <SchemaJSON
        type="Service"
        data={{
          '@id': 'https://boostifyusa.com/website-maintenance-small-business#service',
          name: 'Website Maintenance for Small Business',
          alternateName: ['Small Business Website Maintenance', 'WordPress Care Plans for Small Business'],
          serviceType: 'Website Maintenance',
          category: 'Website Maintenance',
          url: 'https://boostifyusa.com/website-maintenance-small-business',
          image: 'https://boostifyusa.com/og/website-maintenance-small-business.png',
          description:
            'Monthly website maintenance plans designed specifically for small businesses. Includes daily backups, security scanning, updates, uptime monitoring, performance tuning, and on-demand content edits. Month to month, no long-term contracts.',
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
            sameAs: [
              'https://www.facebook.com/boostifyusa',
              'https://www.instagram.com/boostifyusa',
              'https://www.linkedin.com/company/boostifyusa',
            ],
          },
          areaServed: [
            { '@type': 'State', name: 'California' },
            { '@type': 'Country', name: 'United States' },
          ],
          audience: { '@type': 'BusinessAudience', audienceType: 'Small Business' },
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
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Essentials Plan', description: 'Daily backups, uptime monitoring, security, software updates, SSL, email support.' },
                price: '99',
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Pro Plan', description: 'Everything in Essentials plus 30 min monthly content edits, performance audits, priority support.' },
                price: '249',
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Concierge Plan', description: 'Everything in Pro plus direct text/phone, unlimited edits, free site refresh every 16 months.' },
                price: '595',
                priceCurrency: 'USD',
              },
            ],
          },
          offers: [
            {
              '@type': 'Offer',
              name: 'Essentials',
              priceCurrency: 'USD',
              price: '99',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '99',
                priceCurrency: 'USD',
                referenceQuantity: { '@type': 'QuantitativeValue', value: '1', unitCode: 'MON' },
                billingIncrement: 1,
                unitCode: 'MON',
              },
              priceValidUntil: '2026-12-31',
              description: 'Launch pricing. Regular monthly price is $120.',
            },
            {
              '@type': 'Offer',
              name: 'Pro',
              priceCurrency: 'USD',
              price: '249',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '249',
                priceCurrency: 'USD',
                billingIncrement: 1,
                unitCode: 'MON',
              },
            },
            {
              '@type': 'Offer',
              name: 'Concierge',
              priceCurrency: 'USD',
              price: '595',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '595',
                priceCurrency: 'USD',
                billingIncrement: 1,
                unitCode: 'MON',
              },
            },
          ],
        }}
      />
      <SchemaJSON
        type="FAQPage"
        data={{
          '@id': 'https://boostifyusa.com/website-maintenance-small-business#faq',
          about: { '@id': 'https://boostifyusa.com/website-maintenance-small-business#service' },
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
          '@id': 'https://boostifyusa.com/website-maintenance-small-business#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://boostifyusa.com/' },
            { '@type': 'ListItem', position: 2, name: 'Maintenance', item: 'https://boostifyusa.com/maintenance' },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Website Maintenance for Small Business',
              item: 'https://boostifyusa.com/website-maintenance-small-business',
            },
          ],
        }}
      />
      {/* WebPage schema wraps everything: gives Google datePublished/dateModified, speakable for voice + AI search, and links the Service as the main entity. */}
      <SchemaJSON
        type="WebPage"
        data={{
          '@id': 'https://boostifyusa.com/website-maintenance-small-business#webpage',
          url: 'https://boostifyusa.com/website-maintenance-small-business',
          name: 'Website Maintenance for Small Business: From $99/mo, No Contract',
          description:
            'Honest website maintenance for small businesses. From $99/mo, no contracts. Daily backups, security, same-day edits, 4-hour SLA. 5-star rated on Google.',
          inLanguage: 'en-US',
          datePublished: '2026-05-01T00:00:00-07:00',
          dateModified: '2026-05-14T00:00:00-07:00',
          isPartOf: { '@id': 'https://boostifyusa.com/#website' },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: 'https://boostifyusa.com/og/website-maintenance-small-business.png',
          },
          about: { '@id': 'https://boostifyusa.com/website-maintenance-small-business#service' },
          mainEntity: { '@id': 'https://boostifyusa.com/website-maintenance-small-business#service' },
          breadcrumb: { '@id': 'https://boostifyusa.com/website-maintenance-small-business#breadcrumb' },
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
          reviewedBy: {
            '@type': 'Person',
            name: 'Victor Estrada',
          },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2', '[data-speakable]'],
          },
          potentialAction: {
            '@type': 'ReadAction',
            target: ['https://boostifyusa.com/website-maintenance-small-business'],
          },
        }}
      />

      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* HERO: centered, single column, balanced headline, single primary CTA, price-in-subhead */}
        <section className="px-6 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange/5 rounded-full blur-[120px] -z-10 -translate-y-1/2" />

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8"
            >
              <Sparkles size={14} />
              Built for Small Business
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95] text-balance"
            >
              Website Maintenance for{' '}
              <span className="text-orange">Small Business.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray font-medium mb-10 leading-snug max-w-2xl mx-auto text-pretty"
            >
              Plans from <span className="text-dark font-black">$99/mo.</span>{' '}
              No contracts. Same-day edits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
            >
              <a
                href="#plan"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-0.5"
              >
                See the Plan
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <Link
                to="/contact"
                className="text-dark font-bold hover:text-orange transition-colors px-4 py-2"
              >
                or book a call
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray font-bold"
            >
              <div className="flex items-center gap-2">
                <Check size={16} className="text-orange" /> No contracts
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-orange" /> Same-day edits
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-orange" /> 4-hour SLA
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-orange" /> Fresno team, US-wide
              </div>
            </motion.div>
          </div>
        </section>

        {/* COST OF DOING NOTHING: single dark band, not 4 cards */}
        <section className="px-6 mb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark rounded-3xl px-8 py-10 md:px-12 md:py-12 border border-white/10 shadow-2xl shadow-dark/20 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange/20 rounded-full blur-3xl" />
              <div className="relative grid md:grid-cols-5 gap-8 md:gap-10 items-center">
                <div className="md:col-span-2">
                  <p className="text-orange text-xs font-bold uppercase tracking-wider mb-3">
                    The hidden number
                  </p>
                  <p className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-3">
                    $8,840
                  </p>
                  <p className="text-white/70 font-medium leading-snug text-balance">
                    What the average unmanaged small business site costs its
                    owner per year. Every plan pays for itself before the year
                    is out.
                  </p>
                </div>
                <div className="md:col-span-3 grid grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    { v: '$2,880', l: 'Downtime revenue loss' },
                    { v: '$2,400', l: 'Emergency dev hours' },
                    { v: '$2,500', l: 'Malware / hack recovery' },
                    { v: '$1,060', l: 'SEO drop from neglect' },
                  ].map((s, i) => (
                    <div key={i} className="border-l-2 border-orange/40 pl-4">
                      <p className="text-2xl md:text-3xl font-black text-white tracking-tight">
                        {s.v}
                      </p>
                      <p className="text-sm text-white/60 font-medium leading-snug">
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <p className="text-xs text-gray font-medium uppercase tracking-wider text-center mt-4">
              Sources:{' '}
              <a
                href="https://www.gartner.com/en/newsroom/press-releases"
                target="_blank"
                rel="noopener nofollow"
                className="underline hover:text-orange transition-colors"
              >
                Gartner SMB downtime study
              </a>
              ,{' '}
              <a
                href="https://sucuri.net/reports/2024-hacked-website-report/"
                target="_blank"
                rel="noopener nofollow"
                className="underline hover:text-orange transition-colors"
              >
                Sucuri 2024 hacked site report
              </a>
              ,{' '}
              <a
                href="https://clutch.co/web-developers/small-business"
                target="_blank"
                rel="noopener nofollow"
                className="underline hover:text-orange transition-colors"
              >
                Clutch
              </a>
            </p>
          </div>
        </section>

        {/* THE PLANS: 3-tier ladder. Essentials anchors low, Pro is featured, Concierge protects high-value clients. */}
        <section id="plan" className="px-6 mb-24 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-orange text-sm font-bold uppercase tracking-wider mb-3">
                The Plans
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight text-balance mb-4">
                Small business website maintenance plans.
              </h2>
              <p className="text-lg text-gray font-medium text-pretty">
                Start light, scale up when the site does. Every plan is month
                to month with no contract.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative rounded-3xl p-8 flex flex-col ${
                    tier.highlight
                      ? 'bg-dark text-white shadow-2xl shadow-dark/30 md:-translate-y-3 border border-orange/30'
                      : 'bg-white border border-gray-light/60 shadow-lg shadow-dark/5'
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange/30">
                      Most Popular
                    </div>
                  )}

                  <div className={tier.highlight ? '' : ''}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${tier.highlight ? 'text-orange' : 'text-orange'}`}>
                      {tier.name}
                    </p>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-5xl font-black tracking-tighter ${tier.highlight ? 'text-white' : 'text-dark'}`}>
                        ${tier.price}
                      </span>
                      {tier.originalPrice && (
                        <span className={`text-xl font-bold line-through ${tier.highlight ? 'text-white/40' : 'text-gray/60'}`}>
                          ${tier.originalPrice}
                        </span>
                      )}
                      <span className={`text-base font-bold ${tier.highlight ? 'text-white/60' : 'text-gray'}`}>
                        /month
                      </span>
                    </div>
                    {tier.promoNote && (
                      <p className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider mb-3 ${tier.highlight ? 'bg-orange/20 text-orange' : 'bg-orange/10 text-orange'}`}>
                        Launch Price
                      </p>
                    )}
                    <p className={`text-sm font-medium mb-6 leading-snug text-pretty ${tier.highlight ? 'text-white/70' : 'text-gray'}`}>
                      {tier.pitch}
                    </p>
                  </div>

                  <ul className={`space-y-3 mb-8 flex-1 ${tier.highlight ? 'text-white/90' : 'text-dark'}`}>
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm font-bold leading-snug">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${tier.highlight ? 'bg-orange/20' : 'bg-green-100'}`}>
                          <Check size={12} className={tier.highlight ? 'text-orange' : 'text-green-600'} strokeWidth={3} />
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`inline-flex items-center justify-center px-6 py-3 font-bold rounded-lg transition-all whitespace-nowrap ${
                      tier.highlight
                        ? 'bg-orange text-white hover:bg-orange-hover hover:-translate-y-0.5 shadow-lg shadow-orange/20'
                        : 'bg-dark text-white hover:bg-orange hover:-translate-y-0.5'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-gray font-medium mt-6">
              Need more than one site, or e-commerce?{' '}
              <Link to="/maintenance" className="text-orange font-bold hover:underline">
                See all care plans
              </Link>
            </p>
          </div>
        </section>

        {/* CADENCE: what actually happens inside a maintenance month. Justifies the work and feeds GEO with process steps. */}
        <section className="px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-orange text-sm font-bold uppercase tracking-wider mb-3">
                Inside the work
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight text-balance mb-4">
                What's included in every maintenance plan.
              </h2>
              <p className="text-lg text-gray font-medium text-pretty">
                Maintenance is not a black box. Here is the cadence of work
                running in the background on every plan.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px bg-orange/20" aria-hidden />
              <div className="space-y-8 md:space-y-12">
                {cadence.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`relative md:grid md:grid-cols-2 md:gap-12 items-start ${
                      i % 2 === 0 ? '' : 'md:[&>div:first-child]:order-2'
                    }`}
                  >
                    <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <p className="text-xs font-bold uppercase tracking-wider text-orange mb-2">
                        {step.when}
                      </p>
                      <h3 className="text-xl md:text-2xl font-black text-dark tracking-tight mb-3 text-balance">
                        {step.title}
                      </h3>
                      <p className="text-gray font-medium leading-relaxed text-pretty">
                        {step.body}
                      </p>
                    </div>
                    <div className="hidden md:block" />
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 w-9 h-9 rounded-full bg-orange flex items-center justify-center text-white font-black text-sm shadow-lg shadow-orange/30 border-4 border-white">
                      {i + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE: tightened labels, clear winner column */}
        <section className="px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-orange text-sm font-bold uppercase tracking-wider mb-3">
                Honest comparison
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight text-balance">
                DIY website maintenance vs. agency vs. Boostify.
              </h2>
            </div>

            <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-xs font-bold text-gray uppercase tracking-wider"></th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-gray uppercase tracking-wider">
                      DIY
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-gray uppercase tracking-wider">
                      Generic Agency
                    </th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider bg-orange text-white rounded-t-xl">
                      Boostify
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-light/40' : 'bg-white'}>
                      <td className="py-4 px-4 font-bold text-dark text-sm">{row.feature}</td>
                      <td className="py-4 px-4 text-gray font-medium text-sm">{row.diy}</td>
                      <td className="py-4 px-4 text-gray font-medium text-sm">{row.agency}</td>
                      <td className="py-4 px-4 font-bold text-dark bg-orange/5 text-sm">
                        {row.boost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* INDUSTRIES: ICP fit, long-tail SEO bait, builds trust through specificity */}
        <section className="px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-orange text-sm font-bold uppercase tracking-wider mb-3">
                  Who this is built for
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight text-balance mb-5">
                  Small service businesses, mostly in California.
                </h2>
                <p className="text-lg text-gray font-medium leading-relaxed text-pretty mb-4">
                  We work with owner-operated businesses that depend on their
                  website for leads, bookings, or orders. Most of our clients
                  are based in Fresno and the Central Valley, with a growing
                  list across California and the broader US.
                </p>
                <p className="text-lg text-gray font-medium leading-relaxed text-pretty">
                  If your site is your storefront, your appointment book, or
                  your sales rep, this is built for you.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industries.map((label, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3 bg-white rounded-xl border border-gray-light/60 px-4 py-3 hover:border-orange/40 hover:shadow-md transition-all"
                  >
                    <div className="w-5 h-5 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-orange" strokeWidth={3} />
                    </div>
                    <span className="text-dark font-bold text-sm leading-snug">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEE: tight dark band, single conversion line */}
        <section className="py-20 px-6 bg-dark text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-6 shadow-xl shadow-orange/20">
              <ShieldCheck size={32} strokeWidth={2} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-balance">
              The Small Business Promise.
            </h2>
            <p className="text-lg text-white/80 font-medium mb-8 leading-snug text-balance">
              If your site goes down and we can't resolve it within 4 hours,
              your next month is on us. Cancel any time, any reason, one email.
            </p>
            <a
              href="#plan"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-dark font-bold rounded-lg hover:bg-orange hover:text-white transition-all"
            >
              See the Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </section>

        <TestimonialsSection />

        {/* FAQ: 5 most important only */}
        <section className="pt-20 pb-12 px-6 bg-light/30">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-orange text-sm font-bold uppercase tracking-wider mb-3">
                FAQ
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight text-balance">
                Small business website maintenance FAQ.
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-light overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left font-bold text-base md:text-lg text-dark hover:bg-gray-50 transition-colors gap-4"
                  >
                    <span>{faq.question}</span>
                    {openFaq === i ? (
                      <ChevronUp size={20} className="text-orange shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-gray/40 shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-6 text-gray font-medium leading-relaxed text-pretty">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Trust line: author + last reviewed date. E-E-A-T signal. */}
            <p className="text-center text-xs text-gray font-medium mt-8">
              Reviewed by Victor Estrada, founder of Boostify USA Web Design &amp; SEO. Last updated May 2026.
            </p>
          </div>
        </section>

        {/* RELATED LINKS: internal linking to maintenance hub and adjacent services for SEO. Equal-height cards with arrow affordance. */}
        <section className="pt-12 pb-20 px-6 bg-light/30">
          <div className="max-w-5xl mx-auto">
            <p className="text-orange text-xs font-bold uppercase tracking-wider mb-5 text-center">
              Keep reading
            </p>
            <div className="grid sm:grid-cols-3 gap-4 items-stretch">
              {[
                {
                  to: '/maintenance',
                  label: 'Service hub',
                  title: 'All website maintenance plans',
                  desc: 'Compare every Boostify care plan side by side.',
                },
                {
                  to: '/web-design',
                  label: 'Related service',
                  title: 'Small business web design',
                  desc: 'Need a rebuild first? Start here, add care after.',
                },
                {
                  to: '/local-seo',
                  label: 'Grow further',
                  title: 'Local SEO for small business',
                  desc: 'Once the site is healthy, rank it in your city.',
                },
              ].map((card) => (
                <Link
                  key={card.to}
                  to={card.to}
                  className="bg-white p-5 rounded-2xl border border-gray-light/60 hover:border-orange/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray mb-2">
                    {card.label}
                  </p>
                  <h3 className="text-base md:text-[17px] font-black text-dark group-hover:text-orange transition-colors tracking-tight leading-snug mb-2 text-balance">
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-gray font-medium leading-snug mb-4 text-pretty flex-1">
                    {card.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-orange opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                    Read
                    <ArrowRight size={12} strokeWidth={3} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
