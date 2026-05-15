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
  DollarSign,
  Sparkles,
} from 'lucide-react';

// Pricing-cluster page: targets "website maintenance cost", "website maintenance pricing", "charges for website maintenance", "price for website maintenance".
// Combined volume ~1,800/mo, KD 0-4, commercial intent. Buyers here are price-shopping.

const tiers = [
  {
    name: 'Essentials',
    price: 99,
    originalPrice: 120,
    pitch: 'The protective basics. Most sites need at least this.',
    cta: 'Start with Essentials',
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
    pitch: 'Active management for growing small businesses.',
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

// Work breakdown per tier. Hours by category, retail value calculated at ~$100/hr blended technical rate.
// Each tier has its own math so buyers at any price point can see exactly why it costs what it costs.
const tierBreakdown = [
  { category: 'Protective work (backups, security, uptime, updates, SSL)', essentials: 9, pro: 9, concierge: 9 },
  { category: 'Performance audits + monthly reporting', essentials: 1, pro: 2.5, concierge: 2.5 },
  { category: 'Content edits (writing, images, layouts)', essentials: 0, pro: 0.5, concierge: 4 },
  { category: 'Strategy calls + relationship time', essentials: 0, pro: 0.5, concierge: 4 },
  { category: 'Direct text + phone access (real human)', essentials: 0, pro: 0, concierge: 2 },
  { category: 'Site refresh prorated (every 16 months)', essentials: 0, pro: 0, concierge: 2 },
];

const tierSummary = [
  { name: 'Essentials', price: 99, hours: 10, retail: 725 },
  { name: 'Pro', price: 249, hours: 12.5, retail: 1200, highlight: true },
  { name: 'Concierge', price: 595, hours: 21.5, retail: 2500 },
];

const faqs = [
  {
    question: 'How much does website maintenance cost in 2026?',
    answer:
      'Most small business website maintenance plans run between $50 and $600 per month. The lower end ($50 to $100) covers basic backups, security, and updates. Mid-tier ($150 to $300) adds content edits and active management. Top-tier ($400 to $600) typically includes unlimited edits, direct phone support, and design refreshes. Our plans run $99, $249, and $595 per month with no contract.',
  },
  {
    question: 'Why does website maintenance cost so much?',
    answer:
      "It's not just the work, it's what you're paying to prevent. A single hacked-site recovery averages $2,500. Emergency dev hours run $150 to $250 per hour. A site that drops out of Google because of outdated software can cost thousands in lost leads. Most small businesses absorb around $8,840 per year in hidden costs from skipping maintenance. A $99 plan saves you $7,652 of that.",
  },
  {
    question: "What's the cheapest website maintenance plan worth paying for?",
    answer:
      'Any plan under $50/month is usually a hosting addon, not real maintenance. Look for off-site backups (not just on the same server), 60-second uptime monitoring, malware scanning with active removal, and staged plugin updates. Our Essentials plan at $99 is the minimum we recommend for a small business that depends on its website for leads.',
  },
  {
    question: 'Do I need to sign a contract?',
    answer:
      'No. Every Boostify maintenance plan is month to month with no lock-in. Cancel any time, any reason, one email. Most agencies require 6 to 12 month contracts, which protects the agency, not you.',
  },
  {
    question: 'Are there setup fees or hidden charges?',
    answer:
      "No setup fees, no onboarding charges, no per-incident charges. The monthly price is the full price. The only exceptions are major rebuilds or scope outside maintenance (custom development, new pages, ecommerce work), which we quote separately and only with your approval.",
  },
  {
    question: 'How much does WordPress maintenance specifically cost?',
    answer:
      'WordPress maintenance pricing matches what we charge generally: $99, $249, or $595 per month depending on the plan. WordPress sites need slightly more attention than static sites (plugins, themes, core updates), but our pricing is the same since WordPress is what most small businesses run.',
  },
];

export function WebsiteMaintenanceCostPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <SeoHead
        title="Website Maintenance Cost: Real Pricing in 2026 (No Quotes Needed)"
        description="Honest website maintenance pricing for 2026. Plans from $99/month, no contracts. See exactly what each tier costs and includes. No quote forms, no sales calls required."
        canonicalUrl="/website-maintenance-cost"
        keywords="website maintenance cost, website maintenance pricing, charges for website maintenance, price for website maintenance, website maintenance cost for small business, wordpress maintenance cost"
        ogImage="/og/website-maintenance-cost.png"
        ogType="article"
      >
        <meta property="og:site_name" content="Boostify USA Web Design & SEO" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:published_time" content="2026-05-15T00:00:00-07:00" />
        <meta property="article:modified_time" content="2026-05-15T00:00:00-07:00" />
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
          '@id': 'https://boostifyusa.com/website-maintenance-cost#service',
          name: 'Website Maintenance Pricing',
          alternateName: ['Website Maintenance Cost', 'Website Maintenance Pricing Plans'],
          serviceType: 'Website Maintenance',
          category: 'Website Maintenance',
          url: 'https://boostifyusa.com/website-maintenance-cost',
          image: 'https://boostifyusa.com/og/website-maintenance-cost.png',
          description:
            'Transparent website maintenance pricing for small businesses in 2026. Three plans at $99, $249, and $595 per month. Month to month, no contracts, no hidden fees.',
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
            name: 'Website Maintenance Pricing Plans',
            itemListElement: tiers.map((t) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: `${t.name} Plan`, description: t.pitch },
              price: String(t.price),
              priceCurrency: 'USD',
            })),
          },
        }}
      />
      <SchemaJSON
        type="FAQPage"
        data={{
          '@id': 'https://boostifyusa.com/website-maintenance-cost#faq',
          about: { '@id': 'https://boostifyusa.com/website-maintenance-cost#service' },
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
          '@id': 'https://boostifyusa.com/website-maintenance-cost#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://boostifyusa.com/' },
            { '@type': 'ListItem', position: 2, name: 'Maintenance', item: 'https://boostifyusa.com/maintenance' },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Website Maintenance Cost',
              item: 'https://boostifyusa.com/website-maintenance-cost',
            },
          ],
        }}
      />
      <SchemaJSON
        type="WebPage"
        data={{
          '@id': 'https://boostifyusa.com/website-maintenance-cost#webpage',
          url: 'https://boostifyusa.com/website-maintenance-cost',
          name: 'Website Maintenance Cost: Real Pricing in 2026 (No Quotes Needed)',
          description:
            'Honest website maintenance pricing for 2026. Plans from $99/month, no contracts. See exactly what each tier costs and includes.',
          inLanguage: 'en-US',
          datePublished: '2026-05-15T00:00:00-07:00',
          dateModified: '2026-05-15T00:00:00-07:00',
          isPartOf: { '@id': 'https://boostifyusa.com/#website' },
          about: { '@id': 'https://boostifyusa.com/website-maintenance-cost#service' },
          mainEntity: { '@id': 'https://boostifyusa.com/website-maintenance-cost#service' },
          breadcrumb: { '@id': 'https://boostifyusa.com/website-maintenance-cost#breadcrumb' },
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
          reviewedBy: { '@type': 'Person', name: 'Victor Estrada' },
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
          potentialAction: {
            '@type': 'ReadAction',
            target: ['https://boostifyusa.com/website-maintenance-cost'],
          },
        }}
      />

      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* HERO: direct answer to the search query, prices visible immediately */}
        <section className="px-6 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange/5 rounded-full blur-[120px] -z-10 -translate-y-1/2" />

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8"
            >
              <DollarSign size={14} />
              Transparent Pricing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95] text-balance"
            >
              Website Maintenance Cost,{' '}
              <span className="text-orange">No Quote Forms.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray font-medium mb-10 leading-snug max-w-2xl mx-auto text-pretty"
            >
              Three plans:{' '}
              <span className="text-dark font-black">$99</span>,{' '}
              <span className="text-dark font-black">$249</span>, or{' '}
              <span className="text-dark font-black">$595</span> per month. Month
              to month. No contracts, no setup fees.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <a
                href="#plans"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-0.5"
              >
                See the Plans
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <Link
                to="/contact"
                className="text-dark font-bold hover:text-orange transition-colors px-4 py-2"
              >
                or book a call
              </Link>
            </motion.div>
          </div>
        </section>

        {/* QUICK ANSWER BOX: direct response to "how much does website maintenance cost", optimized for Google AI overviews + featured snippets */}
        <section className="px-6 mb-24">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-light/60 rounded-3xl border-l-4 border-orange p-8 md:p-10"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-orange mb-3">
                Quick answer
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-dark tracking-tight mb-4 text-balance">
                How much does website maintenance cost?
              </h2>
              <p className="text-base md:text-lg text-dark/80 font-medium leading-relaxed text-pretty">
                Most small business website maintenance plans cost between{' '}
                <span className="font-black text-dark">$50 and $600 per month</span>{' '}
                in 2026. Basic plans ($50 to $100) cover backups, security, and
                updates. Mid-tier plans ($150 to $300) add content edits and
                active management. Premium plans ($400 to $600) include
                unlimited edits and direct phone support. Boostify's plans run{' '}
                <span className="font-black text-dark">$99, $249, and $595 per month</span>{' '}
                with no contracts.
              </p>
            </motion.div>
          </div>
        </section>

        {/* PRICING TIERS: full feature lists per tier so $595 buyers can see why it costs $595. */}
        <section id="plans" className="px-6 mb-24 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-orange text-sm font-bold uppercase tracking-wider mb-3">
                The plans
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight text-balance mb-4">
                Website maintenance pricing, in plain English.
              </h2>
              <p className="text-lg text-gray font-medium text-pretty">
                Three tiers, every feature listed, no "contact us for pricing."
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

                  <p className="text-xs font-bold uppercase tracking-wider mb-3 text-orange">
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
                  {tier.originalPrice && (
                    <p className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider mb-3 ${tier.highlight ? 'bg-orange/20 text-orange' : 'bg-orange/10 text-orange'}`}>
                      Launch Price
                    </p>
                  )}
                  <p className={`text-sm font-medium mb-6 leading-snug text-pretty ${tier.highlight ? 'text-white/70' : 'text-gray'}`}>
                    {tier.pitch}
                  </p>

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
          </div>
        </section>

        {/* WORK BREAKDOWN PER TIER: every price point has its own justification, not just the entry tier. */}
        <section className="px-6 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-orange text-sm font-bold uppercase tracking-wider mb-3">
                Where every dollar goes
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight text-balance mb-4">
                What does each plan actually buy you?
              </h2>
              <p className="text-lg text-gray font-medium text-pretty">
                Hours of skilled technical work per month, by category, for
                every tier. The retail value is what these hours would cost at
                market rates.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-light/60 shadow-lg shadow-dark/5 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="bg-light/60 border-b border-gray-light">
                    <th className="text-left px-6 md:px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray">Where the time goes</th>
                    {tierSummary.map((t) => (
                      <th
                        key={t.name}
                        className={`px-4 py-4 text-center text-xs font-bold uppercase tracking-wider ${t.highlight ? 'bg-orange text-white' : 'text-gray'}`}
                      >
                        {t.name}
                        <div className={`font-black text-lg tracking-tighter mt-1 ${t.highlight ? 'text-white' : 'text-dark'}`}>
                          ${t.price}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tierBreakdown.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-light/40'}>
                      <td className="px-6 md:px-8 py-3 text-sm font-bold text-dark leading-snug">{row.category}</td>
                      <td className="px-4 py-3 text-sm text-center font-medium text-gray">
                        {row.essentials ? `${row.essentials} hrs` : <span className="text-gray/30">-</span>}
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-medium bg-orange/5 text-dark">
                        {row.pro ? `${row.pro} hrs` : <span className="text-gray/30">-</span>}
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-medium text-gray">
                        {row.concierge ? `${row.concierge} hrs` : <span className="text-gray/30">-</span>}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-orange bg-orange/5">
                    <td className="px-6 md:px-8 py-4 text-sm font-black uppercase tracking-wider text-dark">Total hours / month</td>
                    {tierSummary.map((t) => (
                      <td key={t.name} className="px-4 py-4 text-center text-base font-black text-dark">
                        {t.hours} hrs
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-orange/5">
                    <td className="px-6 md:px-8 py-4 text-sm font-black uppercase tracking-wider text-dark">Retail value</td>
                    {tierSummary.map((t) => (
                      <td key={t.name} className="px-4 py-4 text-center text-base font-black text-orange">
                        ${t.retail.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-dark">
                    <td className="px-6 md:px-8 py-4 text-sm font-black uppercase tracking-wider text-white">You pay</td>
                    {tierSummary.map((t) => (
                      <td key={t.name} className="px-4 py-4 text-center text-base font-black text-white">
                        ${t.price}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-dark border-t border-white/10">
                    <td className="px-6 md:px-8 py-4 text-sm font-black uppercase tracking-wider text-white">You save</td>
                    {tierSummary.map((t) => (
                      <td key={t.name} className="px-4 py-4 text-center text-base font-black text-green-400">
                        ${(t.retail - t.price).toLocaleString()}/mo
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-center text-base text-gray font-medium mt-6 text-pretty max-w-2xl mx-auto">
              Every tier delivers more retail value than you pay. The higher
              tiers add hours that are harder to scale (relationship time,
              unlimited edits, design refresh) which is why the unit rate is
              still below market at every level.
            </p>
          </div>
        </section>

        {/* COST OF DOING NOTHING: ties back to the hidden number used on SMB page */}
        <section className="px-6 mb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark rounded-3xl px-8 py-10 md:px-12 md:py-12 border border-white/10 shadow-2xl shadow-dark/20 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange/20 rounded-full blur-3xl" />
              <div className="relative">
                <p className="text-orange text-xs font-bold uppercase tracking-wider mb-3">
                  The other number
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight text-balance mb-6">
                  The real cost is{' '}
                  <span className="text-orange">not paying for maintenance.</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <p className="text-white/70 font-medium leading-relaxed text-pretty">
                    The average unmanaged small business website costs its
                    owner <span className="font-black text-white">$8,840 per year</span>{' '}
                    in downtime, emergency dev hours, hack recovery, and lost
                    SEO rankings. Even our most expensive plan ($7,140/year)
                    saves you $1,700 plus the value of a free site refresh.
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {[
                      { v: '$2,880', l: 'Downtime revenue loss' },
                      { v: '$2,400', l: 'Emergency dev hours' },
                      { v: '$2,500', l: 'Malware / hack recovery' },
                      { v: '$1,060', l: 'SEO drop from neglect' },
                    ].map((s, i) => (
                      <div key={i} className="border-l-2 border-orange/40 pl-4">
                        <p className="text-2xl font-black text-white tracking-tight">
                          {s.v}
                        </p>
                        <p className="text-xs text-white/60 font-medium leading-snug">
                          {s.l}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPARE PRICING MODELS */}
        <section className="px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-orange text-sm font-bold uppercase tracking-wider mb-3">
                How we compare
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight text-balance">
                Website maintenance pricing, by model.
              </h2>
            </div>

            <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
              <table className="w-full min-w-[680px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-xs font-bold text-gray uppercase tracking-wider"></th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-gray uppercase tracking-wider">DIY (hidden cost)</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-gray uppercase tracking-wider">Freelancer hourly</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-gray uppercase tracking-wider">Generic agency</th>
                    <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider bg-orange text-white rounded-t-xl">Boostify</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: 'Starting price', a: 'Your time', b: '$75 to $150/hr', c: '$200/mo + contract', d: 'From $99/mo, no contract' },
                    { f: 'Annual cost', a: '~$8,840 hidden', b: '$3,600 (40 hrs)', c: '$2,400 + setup fees', d: '$1,188 (Essentials)' },
                    { f: 'Contract required', a: 'N/A', b: 'No', c: '6 to 12 months', d: 'Month to month' },
                    { f: 'Response time', a: 'When you notice', b: 'When they get back to you', c: '24 to 72 hours', d: 'Same day' },
                    { f: 'Predictable monthly?', a: 'No', b: 'No (hourly invoices)', c: 'Yes', d: 'Yes' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-light/40' : 'bg-white'}>
                      <td className="py-4 px-4 font-bold text-dark text-sm">{row.f}</td>
                      <td className="py-4 px-4 text-gray font-medium text-sm">{row.a}</td>
                      <td className="py-4 px-4 text-gray font-medium text-sm">{row.b}</td>
                      <td className="py-4 px-4 text-gray font-medium text-sm">{row.c}</td>
                      <td className="py-4 px-4 font-bold text-dark bg-orange/5 text-sm">{row.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        {/* FAQ: cost-shopper questions */}
        <section className="pt-20 pb-12 px-6 bg-light/30">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-orange text-sm font-bold uppercase tracking-wider mb-3">
                FAQ
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight text-balance">
                Website maintenance pricing FAQ.
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

            <p className="text-center text-xs text-gray font-medium mt-8">
              Reviewed by Victor Estrada, founder of Boostify USA Web Design &amp; SEO. Last updated May 2026.
            </p>
          </div>
        </section>

        {/* RELATED LINKS: route to hub and sibling spoke */}
        <section className="pt-12 pb-20 px-6 bg-light/30">
          <div className="max-w-5xl mx-auto">
            <p className="text-orange text-xs font-bold uppercase tracking-wider mb-5 text-center">
              Keep reading
            </p>
            <div className="grid sm:grid-cols-2 gap-4 items-stretch max-w-3xl mx-auto">
              {[
                {
                  to: '/maintenance',
                  label: 'Service hub',
                  title: 'All website maintenance plans',
                  desc: 'The full overview of our care plans and what each includes.',
                },
                {
                  to: '/website-maintenance-small-business',
                  label: 'Built for SMB',
                  title: 'Maintenance for small business',
                  desc: 'Same pricing, framed for small business owners.',
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
