import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ArrowUpRight,
  Phone,
  ChevronDown,
  Clock,
  Search,
  ShieldCheck,
  Zap,
  AlertTriangle
} from
  'lucide-react';

// ─── Page positioning ───────────────────────────────────────────────────────
// This page and /fresno-web-design were competing for the same term with the
// same closing sections. /fresno-web-design keeps the city term. This page owns
// the DECISION: which kind of site you need, whether WordPress is right, what is
// in the build, and what changes after. City content here is a hub that links
// out to the geo pages rather than duplicating them.

const jobs = [
  {
    key: 'presence',
    kicker: 'Job one',
    name: 'A presence site',
    line: 'You need to exist, and you need to look legitimate.',
    who: [
      'Most of your work already comes from referrals',
      'People Google your name before they call you back',
      'You are booked, and you want better jobs rather than more'],
    does: 'Shows up when somebody searches your business name, answers the five questions every caller asks anyway, and puts a phone number where a thumb already is. That is the entire job, and it is a real one.',
    price: 'From $649',
    span: '2 to 3 weeks'
  },
  {
    key: 'machine',
    kicker: 'Job two',
    name: 'A conversion machine',
    line: 'You need the phone to ring from people who have never heard of you.',
    who: [
      'You are buying attention with ads, SEO, or both',
      'You are fighting for the three-result map pack',
      'A booked calendar is the difference between two trucks and four'],
    does: 'One page per service so each can rank on its own, call tracking on every one, forms hardened against the bot traffic that buries a small inbox, a speed budget it has to pass before launch, and schema so Google can read the whole thing.',
    price: 'From $1,995',
    span: '3 to 5 weeks'
  }];

const platforms = [
  { you: 'You publish several posts a month and want to do it yourself', build: 'WordPress', why: 'The editor is the product. For volume publishing by a non-developer, nothing has beaten it yet.' },
  { you: 'You sell physical products with inventory, tax and shipping', build: 'Shopify, with a partner', why: 'That is a separate trade. We hand it off and name two shops in the Valley rather than learn it on your launch date.' },
  { you: 'You have five to twenty pages that change a few times a year', build: 'Hand-coded and static', why: 'No database, no login, no plugin stack to patch monthly. It loads instantly and there is nothing there to break.' },
  { you: 'You need booking, a customer portal, or a real calculator', build: 'A custom application', why: 'A website is the wrong shape for this. Forcing it into one is how you get six plugins doing one job badly.' },
  { you: 'You already run WordPress and it got slow', build: 'Repair before replace', why: 'It is usually the theme plus forty plugins, not WordPress. Fixing that costs less than a rebuild and we will say so.' }];

const buildIncludes = [
  { name: 'Design', body: 'Drawn for your business, not adapted from a theme somebody else bought. You see the layout before a line of code exists.' },
  { name: 'Copywriting', body: 'We write it. Most small business sites fail on the words, not the pixels, and "quality you can trust" has never made a phone ring.' },
  // Outbound links anchored on the jargon itself, the way Rossmann anchors
  // "PC-3000" rather than a service name. Every spec we claim to build to points
  // at the published standard, so the claim is checkable instead of asserted.
  { name: 'The build', body: 'Hand-coded, mobile first, and measured against Core Web Vitals on a mid-range Android over 4G rather than the Mac it was designed on.',
    href: 'https://web.dev/articles/vitals', linkText: 'Core Web Vitals' },
  { name: 'SEO foundation', body: 'Page structure, internal links, titles, and JSON-LD with your real coordinates, written to Google\u2019s published spec.',
    href: 'https://developers.google.com/search/docs/appearance/structured-data/local-business', linkText: 'LocalBusiness spec' },
  { name: 'Google Business Profile', body: 'Categories, service areas, and UTM-tagged links so you can finally tell map-pack calls apart from organic ones.',
    href: 'https://support.google.com/business/answer/3038177', linkText: 'category guidelines' },
  { name: 'Hosting, DNS and redirects', body: 'Every old URL inventoried and pointed at its replacement with a 301 before launch. You get the redirect map as a spreadsheet.',
    href: 'https://developers.google.com/search/docs/crawling-indexing/301-redirects', linkText: '301 redirect' }];

// Restructured for the comparison: a named dimension plus two SHORT cells.
// The previous version was three prose paragraphs, which is why it would not
// scan as a table no matter how it was laid out.
const outcomes = [
  {
    dim: 'Somebody searches your name',
    before: 'A Facebook page, last posted to in 2019',
    after: 'A site that loads before they lose interest',
    why: 'The cheapest problem on this list, and the one most businesses are still losing to.'
  },
  {
    dim: 'Where your ads land',
    before: 'A homepage about everything you do',
    after: 'The page for the one service they searched',
    why: 'Same budget, same clicks. The page just answers the question that was asked.'
  },
  {
    dim: 'How you measure it',
    before: 'It feels busier than last month',
    after: 'Every call traced to the source that made it',
    why: 'You cannot cut the half that is wasted until you can see which half it is.'
  },
  {
    dim: 'When you need a change',
    before: 'Email the guy, wait, follow up twice',
    after: 'Edit it yourself, or it ships the same week',
    why: 'Hours and prices are the things that go stale fastest and cost you calls.'
  }];

const areas = [
  { name: 'Fresno', to: '/fresno-web-design' },
  { name: 'Clovis', to: '/clovis-marketing-agency' },
  { name: 'Visalia', to: '/visalia-marketing-agency' },
  { name: 'Madera', to: '/madera-marketing-agency' },
  { name: 'Merced', to: '/merced-marketing-agency' },
  { name: 'Tulare', to: '/tulare-marketing-agency' },
  { name: 'Hanford', to: '/hanford-marketing-agency' },
  { name: 'Sanger', to: '/sanger-marketing-agency' },
  { name: 'Modesto', to: '/modesto-web-design' }];

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
      "100%. Once the project is paid for, you own everything: the code, the design, and the content. We don't hold your site hostage."
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
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <SeoHead
        title="Custom Web Design for Small Business | Boostify USA"
        description="Two kinds of website: one that makes you look legitimate, one built to generate calls. Straight answers on scope, WordPress, pricing and what each is actually for."
        canonicalUrl="/web-design"
      />
      <SchemaJSON
        type="Service"
        data={{
          name: "Web Design",
          description: "Professional web design services for local businesses in Fresno, CA.",
          provider: {
            "@type": "ProfessionalService",
            "@id": "https://boostifyusa.com/#localbusiness",
            "name": "Boostify USA Web Design & SEO",
            "url": "https://boostifyusa.com",
            "telephone": "+1-559-785-3834",
            "email": "hello@boostifyusa.com",
            "logo": "https://boostifyusa.com/icon.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "6362 N Figarden Dr. #118",
              "addressLocality": "Fresno",
              "addressRegion": "CA",
              "postalCode": "93722",
              "addressCountry": "US"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": 36.8250248, "longitude": -119.8684005 },
            "openingHoursSpecification": [
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" }
            ],
            "contactPoint": [
              { "@type": "ContactPoint", "telephone": "+1-559-785-3834", "contactType": "sales" },
              { "@type": "ContactPoint", "telephone": "+1-559-201-8706", "contactType": "customer service" }
            ]
          },
          areaServed: "Fresno, CA",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Web design",
            itemListElement: [
              {
                "@type": "Offer",
                name: "Presence site",
                description: "A site that shows up for your business name and answers the questions callers ask.",
                price: "649",
                priceCurrency: "USD",
                priceSpecification: { "@type": "PriceSpecification", minPrice: "649", priceCurrency: "USD" }
              },
              {
                "@type": "Offer",
                name: "Conversion-focused build",
                description: "One page per service, call tracking, hardened forms, a speed budget and schema.",
                price: "1995",
                priceCurrency: "USD",
                priceSpecification: { "@type": "PriceSpecification", minPrice: "1995", priceCurrency: "USD" }
              }
            ]
          }
        }}
      />
      {/* Gaps found by diffing our markup against Rossmann's service pages, which
          carry all of these on every page and we carried none of them:
          BreadcrumbList, Offer on the published prices, a named Person for
          expertise, dateModified, GeoCoordinates, and the credentials that were
          sitting on the page as logos with no markup at all. */}
      <SchemaJSON
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://boostifyusa.com/" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://boostifyusa.com/services" },
            { "@type": "ListItem", position: 3, name: "Web Design", item: "https://boostifyusa.com/web-design" }
          ]
        }}
      />
      <SchemaJSON
        type="WebPage"
        data={{
          "@id": "https://boostifyusa.com/web-design#webpage",
          url: "https://boostifyusa.com/web-design",
          name: "Custom Web Design for Small Business",
          dateModified: "2026-08-31",
          primaryImageOfPage: "https://boostifyusa.com/FTS-Mock.webp",
          author: {
            "@type": "Person",
            name: "Joaquin Estrada",
            jobTitle: "Founder & Lead Strategist",
            url: "https://boostifyusa.com/about",
            worksFor: { "@type": "Organization", name: "Boostify USA" },
            hasCredential: [
              {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "certification",
                name: "Google Partner",
                recognizedBy: { "@type": "Organization", name: "Google" }
              }
            ]
          }
        }}
      />
      <SchemaJSON
        type="FAQPage"
        data={{
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer }
          }))
        }}
      />
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="px-6 relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
          {/* Topographic Background Pattern - Subtle & Standard Orientation */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.35]"
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

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:px-[50px] relative z-10">
            <motion.div
              initial={{
                opacity: 1,
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
                <span className="w-2 h-2 rounded-full bg-orange" />
                Custom Web Design
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                Web Design That Works As{' '}
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
                opacity: 1,
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
                  opacity: 1,
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
                  opacity: 1,
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
                    Scored on a phone
                  </div>
                </div>
              </motion.div>

              {/* Browser Frame */}
              <div className="rounded-xl border border-gray-light shadow-2xl overflow-hidden relative z-10">
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
                <img
                  src="/FTS-Mock.webp"
                  alt="Full Throttle Suspension website design by Boostify"
                  className="w-full h-auto object-cover object-top"
                  fetchPriority="high"
                />

              </div>

              {/* Decorative Blob */}
              <div className="absolute -bottom-10 -left-10 w-full h-full bg-orange/5 rounded-xl -z-10 hidden lg:block" />
            </motion.div>
          </div>
        </section>

        <TrustBadges />

        {/* Pain Points Section */}
        <section className="py-16 md:py-20 px-6 bg-light/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-7xl mx-auto mb-10">
              <motion.div
                initial={{
                  opacity: 1,
                  scale: 0.8
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1
                }}
                viewport={{
                  once: true
                }}
                className="inline-flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-5">
                <AlertTriangle
                  size={32}
                  className="text-red-500"
                  strokeWidth={2.5} />
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
                      opacity: 1,
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
                    className="bg-white p-8 rounded-xl border border-gray-light/50 hover:shadow-xl hover:shadow-dark/10 hover:-translate-y-1 hover:border-red-500/20 transition-all duration-300 group">

                    <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-6 border border-red-100 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <item.icon size={26} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-black text-dark mb-3 tracking-tight group-hover:text-red-500 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-dark/70 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                )}
            </div>
          </div>
        </section>

        {/* The Solution / Benefits */}
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
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
              <div className="order-1 lg:order-2 bg-white rounded-xl aspect-square relative overflow-hidden border border-gray-light shadow-2xl p-8 flex flex-col">
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
                        className="anim-ring"
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="8"
                        strokeDasharray="327"
                        strokeDashoffset="7"
                        strokeLinecap="round" />

                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-dark leading-none">
                        98
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
                          className="anim-bar h-full bg-green-400 rounded-full"
                          style={{ width: '25%', animationDelay: '0s' }} />

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
                          className="anim-bar h-full bg-yellow-400 rounded-full"
                          style={{ width: '60%', animationDelay: '0.12s' }} />

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
                          className="anim-bar h-full bg-red-400 rounded-full"
                          style={{ width: '90%', animationDelay: '0.24s' }} />

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
              <div className="bg-dark rounded-xl aspect-square relative overflow-hidden flex flex-col p-8">
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
                  <div className="w-0.5 h-4 bg-orange ml-auto" />
                </div>

                {/* Result #1: the ranking business */}
                <div className="bg-white/10 rounded-xl p-4 mb-3 border border-orange/30 relative">
                  <div className="absolute -top-2 -left-2 bg-orange text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    #1
                  </div>
                  <div className="text-orange text-xs font-medium mb-1 truncate">
                    valleyproplumbing.com
                  </div>
                  <div className="text-white font-bold text-sm mb-1">
                    Valley Pro Plumbing, Fresno Drain and Water Heater Repair
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

                {/* Result #2: anonymised, faded */}
                <div className="bg-white/5 rounded-xl p-4 mb-3 border border-white/5 opacity-50">
                  <div className="h-3 bg-white/10 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-white/5 rounded w-full mb-1" />
                  <div className="h-2 bg-white/5 rounded w-5/6" />
                </div>

                {/* Result #3: anonymised, faded further */}
                <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5 opacity-30">
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
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.25, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-80px' }}
                          transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
                        </motion.div>
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
                  rank. Based in Fresno? See our dedicated{' '}
                  <Link to="/fresno-web-design" className="text-orange font-bold hover:underline">
                    Fresno web design
                  </Link>{' '}
                  services.
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

        {/* ─── THE TWO JOBS ───
            Asymmetric on purpose: the machine panel is heavier because it is the
            bigger commitment, not because it is the better answer. */}
        <section className="py-20 md:py-28 px-6 bg-light/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[20ch] mb-5">
              Which job are you hiring a website to do?
            </h2>
            <p className="text-lg text-gray font-medium leading-relaxed max-w-[64ch] mb-14">
              Nearly every agency sells the second one to everybody, because it costs more.
              If nine out of ten of your jobs come from referrals, you would be buying a
              machine you have no intention of feeding.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6">
              {jobs.map((job) => {
                const dark = job.key === 'machine';
                return (
                  <motion.div
                    key={job.key}
                    initial={{ opacity: 1, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`rounded-xl p-7 md:p-9 flex flex-col ${dark ? 'bg-dark text-white' : 'bg-white border border-gray-light'}`}>

                    <p className={`text-xs font-bold uppercase tracking-[0.13em] mb-3 ${dark ? 'text-orange' : 'text-orange-hover'}`}>
                      {job.kicker}
                    </p>
                    <h3 className={`text-2xl md:text-3xl font-black tracking-tight mb-3 ${dark ? 'text-white' : 'text-dark'}`}>
                      {job.name}
                    </h3>
                    <p className={`text-lg font-bold leading-snug mb-6 ${dark ? 'text-white/90' : 'text-dark/80'}`}>
                      {job.line}
                    </p>
                    <ul className="space-y-2.5 mb-6">
                      {job.who.map((w) =>
                        <li key={w} className="flex items-start gap-2.5">
                          <Check size={15} strokeWidth={3} className={`mt-1 shrink-0 ${dark ? 'text-orange' : 'text-orange-hover'}`} />
                          <span className={`font-medium leading-relaxed ${dark ? 'text-white/70' : 'text-gray'}`}>{w}</span>
                        </li>
                      )}
                    </ul>
                    <p className={`font-medium leading-relaxed mb-7 max-w-[58ch] ${dark ? 'text-white/60' : 'text-gray'}`}>
                      {job.does}
                    </p>
                    <div className={`mt-auto flex items-baseline gap-3 pt-5 border-t ${dark ? 'border-white/15' : 'border-gray-light'}`}>
                      <span className={`text-2xl font-black tracking-tighter ${dark ? 'text-orange' : 'text-dark'}`}>{job.price}</span>
                      <span className={`text-sm font-bold ${dark ? 'text-white/50' : 'text-gray'}`}>{job.span}</span>
                    </div>
                  </motion.div>);
              })}
            </div>
          </div>
        </section>

        {/* ─── THE PLATFORM QUESTION ───
            A table, used once on this page. Answers the search intent directly
            instead of dodging it. */}
        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[18ch] mb-5">
              Do you actually need WordPress?
            </h2>
            <p className="text-lg text-gray font-medium leading-relaxed max-w-[66ch] mb-12">
              <a href="https://w3techs.com/technologies/details/cm-wordpress" target="_blank" rel="noopener noreferrer" className="text-dark font-bold hover:text-orange transition-colors">WordPress runs a huge share of the web</a>{' '}
              and it is a good tool doing the job it was built for. It is also why a lot of small business sites are slow, because a
              brochure site does not need a database, a login screen, and forty plugins that
              want patching every month. The question is not which platform wins. It is how
              often you actually change your site.
            </p>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-dark/15">
                    <th className="py-3 pr-6 text-xs font-bold uppercase tracking-[0.13em] text-dark/50 w-[38%]">If this is you</th>
                    <th className="py-3 pr-6 text-xs font-bold uppercase tracking-[0.13em] text-dark/50 w-[22%]">What we build</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-[0.13em] text-dark/50">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {platforms.map((pf) =>
                    <tr key={pf.build} className="border-b border-dark/10 align-top">
                      <td className="py-5 pr-6 font-medium text-gray leading-relaxed">{pf.you}</td>
                      <td className="py-5 pr-6 font-black text-dark leading-snug">{pf.build}</td>
                      <td className="py-5 font-medium text-gray leading-relaxed">{pf.why}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="text-gray font-medium leading-relaxed max-w-[64ch] mt-8">
              We build on all of these and we do not get paid more for picking one. If the
              honest answer is that you should keep what you have, that is a cheaper
              conversation for you and a shorter one for us, and a{' '}
              <Link to="/maintenance" className="text-dark font-bold hover:text-orange transition-colors">care plan</Link>{' '}
              usually fixes a slow WordPress site for less than a rebuild costs. When the
              job turns out to need booking, a portal, or logins, that is{' '}
              <Link to="/app-development" className="text-dark font-bold hover:text-orange transition-colors">app development</Link>{' '}
              rather than a website, and we will say so before you pay for the wrong thing.
            </p>
          </div>
        </section>

        {/* ─── OUTCOMES ───
            Comparison with the winning column as one continuous elevated panel.
            The panel wraps the header too, with real padding, so its orange cap
            reads as the top of a card rather than a rule slicing the label. */}
        <section className="py-20 md:py-24 px-6 bg-light/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[20ch] mb-4">
              What changes the week after launch.
            </h2>
            <p className="text-lg text-gray font-medium leading-relaxed max-w-[58ch] mb-12">
              Four things that are true of most local business sites, and what each one
              turns into once the rebuild is live. Getting found for what you sell, rather
              than just your own name, is{' '}
              <Link to="/local-seo" className="text-dark font-bold hover:text-orange transition-colors">local SEO</Link>{' '}
              and it starts the day the site ships.
            </p>

            {/* Cells carry their own surface, so the panel can never drift out of
                alignment with the rows the way an absolutely positioned one did. */}
            <div className="md:grid md:grid-cols-[minmax(11rem,1fr)_1fr_minmax(20rem,1.15fr)]">
              {/* header */}
              <div className="hidden md:block" />
              <div className="hidden md:flex items-end pb-4 pr-8">
                <span className="text-xs font-bold uppercase tracking-[0.13em] text-gray">Most local sites</span>
              </div>
              <div className="hidden md:flex items-end bg-white border-x border-t-[3px] border-t-orange border-gray-light rounded-t-xl px-8 pt-6 pb-4">
                <span className="text-xs font-bold uppercase tracking-[0.13em] text-orange-hover">After a Boostify build</span>
              </div>

              {outcomes.map((o, i) => {
                const last = i === outcomes.length - 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="contents">

                    <div className={`pt-7 pb-2 md:py-7 md:pr-8 border-t border-gray-light ${last ? '' : ''}`}>
                      <p className="font-black text-dark tracking-tight">{o.dim}</p>
                    </div>

                    <div className="pb-3 md:py-7 md:pr-8 md:border-t md:border-gray-light">
                      <p className="flex items-start gap-2 text-gray/75 font-medium leading-relaxed">
                        <X size={15} strokeWidth={3} className="text-gray/35 shrink-0 mt-1" />
                        {o.before}
                      </p>
                    </div>

                    <div
                      className={`bg-white border-x border-gray-light border-t border-t-gray-light px-8 py-7 ${
                        last ? 'rounded-b-xl border-b' : ''
                      }`}>
                      <p className="flex items-start gap-2 font-bold text-dark leading-relaxed mb-1.5">
                        <Check size={15} strokeWidth={3} className="text-orange shrink-0 mt-1" />
                        {o.after}
                      </p>
                      <p className="text-sm text-gray font-medium leading-relaxed md:pl-[23px]">
                        {o.why}
                      </p>
                    </div>
                  </motion.div>);
              })}
            </div>
          </div>
        </section>

        {/* ─── WHAT IS IN THE BUILD ───
            Dense two-column checklist rather than another airy card grid: this is
            a list of things you get, so it should read like one. */}
        <section className="py-16 md:py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-8 lg:gap-16 items-start">
              <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight lg:sticky lg:top-28">
                What you are actually paying for.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                {buildIncludes.map((item) =>
                  <div key={item.name} className="flex gap-3">
                    <Check size={16} strokeWidth={3} className="text-orange-hover shrink-0 mt-1.5" />
                    <p className="text-gray font-medium leading-relaxed">
                      <span className="font-black text-dark">{item.name}. </span>
                      {item.body}
                      {item.href &&
                        <>
                          {' '}
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-dark font-bold hover:text-orange transition-colors underline decoration-gray-light underline-offset-2">
                            {item.linkText}
                          </a>
                        </>
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHO DOES THE WORK ───
            Rossmann's service pages name the person at the bench ("Our Lead
            Technician, Chris") with a face and what he actually touches. We had
            a Person in JSON-LD and nobody visible on the page. Every claim here
            is already on /about and checkable. */}
        <section className="py-16 md:py-20 px-6 bg-white border-t border-gray-light">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
              <img
                src="/1733568683912.jpg"
                alt="Joaquin Estrada, founder of Boostify USA"
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover border border-gray-light shrink-0"
              />

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange-hover mb-3">
                  Who does the work
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">
                  Joaquin Estrada builds these himself.
                </h2>
                <p className="text-lg text-gray font-medium leading-relaxed max-w-[68ch] mb-4">
                  Not a project manager relaying notes to a contractor in another time zone.
                  The person who takes your discovery call is the person who writes the copy,
                  builds the pages, and is still reachable in month eight when something needs
                  changing.
                </p>
                <p className="text-gray font-medium leading-relaxed max-w-[68ch] mb-6">
                  He built{' '}
                  <a href="https://today.fresnostate.edu" target="_blank" rel="noopener noreferrer" className="text-dark font-bold hover:text-orange transition-colors">
                    Fresno State&rsquo;s news platform
                  </a>
                  , was invited by the{' '}
                  <a href="https://www.sba.gov" target="_blank" rel="noopener noreferrer" className="text-dark font-bold hover:text-orange transition-colors">
                    U.S. Small Business Administration
                  </a>{' '}
                  to speak on SEO and AI, and runs the defense technology startup DarkSigma
                  outside of Boostify. The engineering standard from that work is the reason
                  this page publishes a speed budget and a redirect process instead of
                  adjectives.
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link to="/about" className="inline-flex items-center gap-1.5 font-bold text-dark hover:text-orange transition-colors">
                    More about Joaquin
                    <ArrowUpRight size={16} />
                  </Link>
                  <a href="tel:+15597853834" className="inline-flex items-center gap-2 font-bold text-dark hover:text-orange transition-colors">
                    <Phone size={16} className="text-orange" strokeWidth={2.5} />
                    (559) 785-3834
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-20 md:py-28 px-6 bg-dark text-white relative overflow-hidden">

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8 ">
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

        {/* ─── WHAT USUALLY COMES NEXT ───
            Rossmann's service pages hand you the next decision rather than a
            generic "related links" strip: each row says WHEN you would need the
            thing, so the link is useful instead of navigational filler. */}
        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[22rem_1fr] gap-10 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">
                  What usually comes next.
                </h2>
                <p className="text-gray font-medium leading-relaxed">
                  A site is the foundation, not the whole job. Here is the order most
                  clients actually add things in, and the point at which each one starts
                  paying for itself.
                </p>
              </div>

              <div className="divide-y divide-gray-light border-y border-gray-light">
                {[
                  {
                    when: 'Once the site is live and you want strangers, not just referrals',
                    to: '/local-seo',
                    name: 'Local SEO',
                    body: 'Ranking in the three-result map pack is a different job from having a good website. It is the one that decides whether people who have never heard of you ever see you.'
                  },
                  {
                    when: 'When you need calls this month rather than next quarter',
                    to: '/local-marketing',
                    name: 'Local marketing and LSAs',
                    body: 'Google Business Profile management, Local Service Ads, reviews, and the call tracking that tells you which of them actually produced the phone call.'
                  },
                  {
                    when: 'The day after launch, if you would rather not think about it again',
                    to: '/maintenance',
                    name: 'Website care, from $99 a month',
                    body: 'Updates, backups, uptime and form monitoring, and content changes on request. Optional, no contract, and you can start it later.'
                  },
                  {
                    when: 'When the same question reaches you fifty times a month',
                    to: '/ai-automation',
                    name: 'AI automation',
                    body: 'Intake, follow-up, and the after-hours replies that otherwise sit in an inbox until somebody opens a laptop on Monday.'
                  },
                  {
                    when: 'When a website is the wrong shape for the problem',
                    to: '/app-development',
                    name: 'App development',
                    body: 'Booking flows, customer portals, and internal tools. If you are trying to force this into a website with six plugins, stop.'
                  }
                ].map((r) =>
                  <Link key={r.to} to={r.to} className="group grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-2 md:gap-10 py-6 hover:bg-light/60 transition-colors -mx-4 px-4">
                    <p className="text-sm font-bold text-orange-hover leading-relaxed md:pt-0.5">
                      {r.when}
                    </p>
                    <div>
                      <h3 className="text-lg font-black text-dark tracking-tight mb-1.5 inline-flex items-center gap-1.5">
                        {r.name}
                        <ArrowUpRight size={16} className="text-dark/30 group-hover:text-orange-hover transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </h3>
                      <p className="text-gray font-medium leading-relaxed">{r.body}</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHERE WE BUILD ───
            A hub, not a competitor: these link out to the geo pages that own
            those terms instead of duplicating their content here. */}
        <section className="py-16 md:py-20 px-6 bg-light/50 relative overflow-hidden">
          {/* Fresno section art: orchard rows, the foothills and a water tower,
              drawn faint enough to sit under body text without competing. */}
          <img
            src="/section-art/fresno-band-light.webp"
            alt=""
            aria-hidden="true"
            width={1584}
            height={672}
            loading="lazy"
            decoding="async"
            className="absolute inset-x-0 bottom-0 w-full h-auto pointer-events-none select-none opacity-60"
          />
          {/* Weighted to the copy side: heavy wash on the left where the prose
              sits, clearing to nothing on the right where only the city chips are
              and the art can show through. */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-light via-light/85 to-transparent"
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-20 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">
                  Where we build.
                </h2>
                <p className="text-gray font-medium leading-relaxed mb-4">
                  The office is at 6362 N Figarden Dr. #118 in Fresno, off Figarden between
                  Herndon and Bullard. Most clients are inside twenty minutes of that door,
                  and we would rather meet at your shop than ours.
                </p>
                <p className="text-gray font-medium leading-relaxed">
                  Each city below has its own page with local pricing, examples, and the
                  questions businesses there actually ask.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {areas.map((a) =>
                  <Link
                    key={a.to}
                    to={a.to}
                    className="group flex items-center justify-between gap-2 rounded-lg border border-gray-light bg-white px-4 py-3 font-bold text-dark hover:border-dark transition-colors">

                    {a.name}
                    <ArrowUpRight size={15} className="text-dark/30 group-hover:text-orange-hover transition-colors" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ───
            Native <details> so every answer ships in the static HTML. The old
            button + AnimatePresence version kept all five answers out of the
            page source entirely. */}
        <section className="pt-20 md:pt-24 pb-14 md:pb-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[20ch] mb-12">
              The questions worth asking first.
            </h2>
            <div className="border-t border-dark/15 max-w-5xl">
              {faqs.map((faq, i) =>
                <details key={i} className="faq-details group border-b border-dark/10">
                  <summary className="flex items-start justify-between gap-6 cursor-pointer py-6 -mx-3 px-3 rounded-md hover:bg-dark/[0.03] transition-colors">
                    <h3 className="text-lg md:text-xl font-black text-dark tracking-tight max-w-[52ch]">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      size={22}
                      aria-hidden="true"
                      className="text-orange shrink-0 mt-1 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="text-gray font-medium leading-relaxed pb-7 max-w-[68ch]">{faq.answer}</p>
                </details>
              )}
            </div>

            <p className="mt-10 text-gray font-medium leading-relaxed max-w-[64ch]">
              Looking for Fresno specifically? The{' '}
              <Link to="/fresno-web-design" className="text-dark font-bold hover:text-orange transition-colors">Fresno web design page</Link>{' '}
              covers local pricing and examples. Otherwise call{' '}
              <a href="tel:+15597853834" className="text-dark font-bold hover:text-orange transition-colors">(559) 785-3834</a>{' '}
              and we will tell you which of the two jobs above you are hiring for.
            </p>
          </div>
        </section>

        {/* ─── REFERENCES ───
            An appendix, so it is set like one: label in a left rail, links in a
            tight two-up list. The previous version left ragged trailing borders
            and a floating label over dead white space. */}
        <section className="py-12 md:py-14 px-6 bg-light/50 border-t border-gray-light">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[15rem_1fr] gap-6 lg:gap-16">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.13em] text-dark mb-1.5">
                  References
                </h2>
                <p className="text-xs text-gray font-medium leading-relaxed max-w-[30ch]">
                  The published specs behind the claims on this page.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 divide-y divide-gray-light sm:divide-y-0">
                {[
                  { t: 'Core Web Vitals thresholds', s: 'web.dev', h: 'https://web.dev/articles/vitals' },
                  { t: 'LocalBusiness structured data', s: 'Google Search Central', h: 'https://developers.google.com/search/docs/appearance/structured-data/local-business' },
                  { t: '301 redirects and site moves', s: 'Google Search Central', h: 'https://developers.google.com/search/docs/crawling-indexing/301-redirects' },
                  { t: 'Business Profile categories', s: 'Google', h: 'https://support.google.com/business/answer/3038177' },
                  { t: 'PageSpeed Insights', s: 'Test any URL yourself', h: 'https://pagespeed.web.dev/' },
                  { t: 'CMS usage across the web', s: 'W3Techs survey', h: 'https://w3techs.com/technologies/details/cm-wordpress' }
                ].map((r) =>
                  <li key={r.h} className="py-2.5">
                    <a href={r.h} target="_blank" rel="noopener noreferrer" className="group flex items-baseline gap-2">
                      <span className="text-sm font-bold text-dark group-hover:text-orange transition-colors">
                        {r.t}
                      </span>
                      <span className="text-xs font-medium text-gray shrink-0">{r.s}</span>
                      <ArrowUpRight size={12} className="text-gray/50 shrink-0 self-center group-hover:text-orange transition-colors" />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>);

}