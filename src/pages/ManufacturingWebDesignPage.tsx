import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { SchemaJSON } from '../components/SchemaJSON';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { TrustBadges } from '../components/TrustBadges';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BrowserFrame } from '../components/work/Frames';
import { portfolio, host } from '../data/portfolio';
import {
  Check,
  X,
  ArrowRight,
  ArrowUpRight,
  Phone,
  ChevronDown,
  ShieldCheck,
  FileUp,
  MapPin,
  Briefcase
} from 'lucide-react';

// ─── Page positioning ───────────────────────────────────────────────────────
// Sturm-style BOFU page for one search, "manufacturing website design" (590/mo
// US, $46 CPC, DataForSEO 2026-10-03). Nobody searches "cnc website design" or
// "welding website design", so those trades live on this page instead of
// getting their own. Every section answers a pain shop owners raise themselves
// (Practical Machinist threads, Google's People Also Ask), logged in the vault:
// initiatives/boostify-niche-industrial.md, sections 5 to 7.
//
// The visual language is the shop's own paperwork: a ballooned drawing, a
// first-article inspection report, job travelers. Same type, colour and core
// sections as /web-design so it still reads as one site.

const PAGE = 'https://boostifyusa.com/manufacturing-website-design';

// Paper grain for the print: fractal noise at a few percent, so the sheet reads
// as paper rather than a flat white box.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.07 0 0 0 0 0.07 0 0 0 0 0.07 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// One light, from above. Tight contact shadow plus a short falloff, the same on
// every drawn object, instead of the wide soft glow that reads as generated.
const PAPER_SHADOW = 'shadow-[0_1px_1px_rgba(17,17,17,0.08),0_2px_6px_rgba(17,17,17,0.06),0_18px_30px_-18px_rgba(17,17,17,0.35)]';
const CARD_SHADOW = 'shadow-[0_1px_1px_rgba(17,17,17,0.06),0_2px_4px_rgba(17,17,17,0.05),0_14px_26px_-16px_rgba(17,17,17,0.28)]';

// A Code 39 style barcode for the traveler header. The bars come from the job
// number, so each traveler gets its own and it never changes between renders.
function Barcode({ value, className = '' }: { value: string; className?: string }) {
  const bars: number[] = [];
  for (const ch of `*${value}*`) {
    const c = ch.charCodeAt(0);
    for (let b = 0; b < 5; b++) bars.push((c >> b) & 1 ? 3 : 1, (c >> (b + 2)) & 1 ? 2 : 1);
    bars.push(2);
  }
  const width = bars.reduce((a, b) => a + b, 0);
  let x = 0;
  return (
    <svg viewBox={`0 0 ${width} 20`} preserveAspectRatio="none" className={className} aria-hidden="true">
      {bars.map((w, i) => {
        const rect = i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={20} fill="currentColor" /> : null;
        x += w;
        return rect;
      })}
    </svg>
  );
}

// A revision flag: the triangle a drafter puts beside whatever changed.
function RevFlag({ rev, className = '' }: { rev: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 21" className={`w-5 h-[18px] ${className}`} aria-hidden="true">
      <path d="M12 1.5 L22.5 19.5 H1.5 Z" fill="#fff" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
      <text x="12" y="16.2" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="ui-monospace, Menlo, monospace" fill="#111">{rev}</text>
    </svg>
  );
}

// A rubber inspection stamp. The roughened edge comes from a displacement
// filter, so the ink breaks up the way a real stamp does on paper.
function InspectedStamp({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`pointer-events-none ${className}`} aria-hidden="true">
      <defs>
        <filter id="stamp-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="1" seed="3" result="blot" />
          <feColorMatrix in="blot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.7 1.6" result="mask" />
          <feComposite in="rough" in2="mask" operator="in" />
        </filter>
        <path id="stamp-top" d="M 22 60 A 38 38 0 0 1 98 60" />
        <path id="stamp-bottom" d="M 18 60 A 42 42 0 0 0 102 60" />
      </defs>
      <g filter="url(#stamp-ink)" fill="none" stroke="#B8460A" opacity="0.88">
        <circle cx="60" cy="60" r="55" strokeWidth="3" />
        <circle cx="60" cy="60" r="48" strokeWidth="1.2" />
        <line x1="22" y1="50" x2="98" y2="50" strokeWidth="1.2" />
        <line x1="22" y1="72" x2="98" y2="72" strokeWidth="1.2" />
        <g fill="#B8460A" stroke="none" fontFamily="ui-monospace, Menlo, monospace" fontWeight="800">
          <text fontSize="11" letterSpacing="2.5"><textPath href="#stamp-top" startOffset="50%" textAnchor="middle">INSPECTED</textPath></text>
          <text x="60" y="67" textAnchor="middle" fontSize="17" letterSpacing="2">PASS</text>
          <text fontSize="9" letterSpacing="2"><textPath href="#stamp-bottom" startOffset="50%" textAnchor="middle">BOOSTIFY &#183; QC</textPath></text>
        </g>
      </g>
    </svg>
  );
}

// A numbered balloon, the way characteristics are called out on an inspection drawing.
function Balloon({ n, className = '' }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-orange bg-white text-orange text-[11px] font-black leading-none shrink-0 ${className}`}>
      {n}
    </span>
  );
}

// A balloon on a leader line, parked in the sheet margin to the right of the
// drawn browser. The parent row is position: relative.
function Callout({ n }: { n: number }) {
  return (
    <span className="absolute top-1/2 -translate-y-1/2 left-full flex items-center pointer-events-none" aria-hidden="true">
      <span className="w-1.5 h-1.5 rounded-full bg-orange -ml-[3px]" />
      <span className="w-4 sm:w-7 h-[1.5px] bg-orange" />
      <Balloon n={n} />
    </span>
  );
}

// ─── The buyer's check ─────────────────────────────────────────────────────
// Set as a first-article inspection report: what gets checked, why, how most
// shop sites do, and what the build does instead.
const checks = [
  {
    item: 'A street address',
    why: 'No address reads like a broker who sends the work overseas.',
    typical: 'A city name, or nothing',
    ours: 'Address, map and hours in the header and footer'
  },
  {
    item: 'Photos of your floor and crew',
    why: 'Proves the machines exist and somebody runs them.',
    typical: 'Stock photos, or none',
    ours: 'Your machines and your people, shot at your shop'
  },
  {
    item: 'Equipment with max part size',
    why: 'Engineers rule shops in or out by envelope before they call.',
    typical: 'Brand names with no numbers',
    ours: 'Each machine with its travels, swing, bed or tonnage'
  },
  {
    item: 'Materials and processes',
    why: 'Tells them whether you have cut their alloy before.',
    typical: '"We do it all"',
    ours: 'Materials, finishes and secondary ops, listed'
  },
  {
    item: 'Certifications you hold',
    why: 'ISO 9001, AS9100, certified welders, ITAR registration. Some buyers can’t send a print without them.',
    typical: 'Buried on an About page',
    ours: 'On the capabilities page, where the buyer is already looking'
  },
  {
    item: 'A way to send the drawing',
    why: 'Nobody wants three emails before they can attach a STEP file.',
    typical: 'A contact form with a message box',
    ours: 'A quote form that takes STEP, DXF and PDF'
  },
  {
    item: 'Email on your own domain',
    why: 'A Gmail address on a quote makes some buyers ask for cash up front.',
    typical: 'shopname@gmail.com',
    ours: 'you@yourshop.com, set up with the site'
  },
  {
    item: 'A Google Maps listing',
    why: '"Machine shop near me" shows the map before the website.',
    typical: 'Unclaimed, or the wrong hours',
    ours: 'Google Business Profile set up and linked to the site'
  }
];

// ─── Two jobs, set as travelers ─────────────────────────────────────────────
// Same two offers and prices as /web-design (presence from $649, conversion
// from $1,995), named the way a shop would name them.
const travelers = [
  {
    key: 'capabilities',
    job: 'Job 01',
    name: 'A capabilities site',
    line: 'Your work comes from referrals and footwork. The site has to back it up.',
    ops: [
      { op: '10', text: 'A call or a shop visit. The machines, the materials, and the work you want more of.' },
      { op: '20', text: 'Photos of your floor, your crew and the parts you are allowed to show.' },
      { op: '30', text: 'Home, capabilities, equipment list, and contact with your address and map.' },
      { op: '40', text: 'Launch. Email on your own domain and your Maps listing linked.' }
    ],
    price: 'From $649',
    lead: '2 to 3 weeks'
  },
  {
    key: 'rfq',
    job: 'Job 02',
    name: 'An RFQ site',
    line: 'You want drawings from buyers who have never heard of you.',
    ops: [
      { op: '10', text: 'Everything in Job 01.' },
      { op: '20', text: 'A page for each process: CNC machining, fabrication, welding, sheet metal, whatever you sell.' },
      { op: '30', text: 'A quote form that takes the file, asks the questions you ask on the phone, and shows your minimum.' },
      { op: '40', text: 'A careers page set up for Google’s job results, plus tracking on every call and form.' }
    ],
    price: 'From $1,995',
    lead: '3 to 5 weeks'
  }
];

// ─── Shop types ────────────────────────────────────────────────────────────
const shops = [
  {
    name: 'CNC machine shops',
    first: 'Envelope, tolerances, materials, prototype or production',
    site: 'A machine list with travels and spindle specs, the tolerance you hold day to day, and quantities you like running'
  },
  {
    name: 'Fabrication and welding',
    first: 'Structural or custom, certified welders, shop or field work',
    site: 'Project photos by type, your welding certifications, and the area your field truck covers'
  },
  {
    name: 'Sheet metal and laser',
    first: 'Thickness by material, bed size, bending capacity',
    site: 'A capacity chart a buyer can read in ten seconds, plus finishes and hardware'
  },
  {
    name: 'Manufacturers with a product',
    first: 'Specs, where to buy it, drawings to design around',
    site: 'A page per product with spec sheets and CAD downloads, and a dealer or distributor finder'
  },
  {
    name: 'Ag equipment and repair',
    first: 'Who answers during harvest, how far you travel',
    site: 'A service-area map and the after-hours number up top from August through October'
  }
];

// Industrial and technical builds already in the portfolio. Archived ones
// (a competitor has the client now) are shown from our copy and never linked.
const proofSlugs = ['balanced-co', 'clean-enterprises', 'tcd-tech'];
const proof = proofSlugs
  .map((s) => portfolio.find((p) => p.slug === s))
  .filter((p): p is (typeof portfolio)[number] => !!p);

// Questions from Google's People Also Ask and the shop-owner threads.
const faqs = [
  {
    question: 'How do engineers and buyers find a new machine shop?',
    answer: 'Mostly the way they always have: referrals, a Google search, and Google Maps. What changed is the step after. Before they send a drawing to a shop they don’t know, they look it up, and Thomas found that 73% of B2B buyers look at a supplier’s website when deciding whether to send a request for information. The website doesn’t replace the footwork. It’s what the buyer checks after the footwork.'
  },
  {
    question: 'Should I list my equipment on the website?',
    answer: 'Yes, with the numbers. Shop owners argue about this, and the ones who list their machines say buyers ask for the list anyway. Put each machine with its travels, swing, bed size or tonnage, so an engineer can tell in ten seconds whether the part fits. A list of brand names without sizes doesn’t answer the question they came with.'
  },
  {
    question: 'Won’t a website just bring tire kickers?',
    answer: 'Some, if the form asks nothing. Print your minimum on the quote form and ask for the drawing, the quantity and the material, and the person shopping for a one-off bracket cheaper than the hardware store usually stops right there. The buyers with real work don’t mind the questions. They were going to answer them on the phone anyway.'
  },
  {
    question: 'Do I still need a website if I’m on Xometry?',
    answer: 'Marketplaces fill slow weeks, and plenty of good shops use them. The trade-off is that the buyer stays the marketplace’s customer and the reorder goes back through the marketplace. Your own site is where the customers who reorder from you directly come from, at the price you quoted.'
  },
  {
    question: 'How much does a manufacturing website cost?',
    answer: 'A capabilities site starts at $649 and takes two to three weeks. An RFQ site with a page per process, a quote form that takes files, and a careers page starts at $1,995 and takes three to five weeks. Hosting and the domain run about $20 to $30 a month, and you own the domain. Care is optional at $99 a month.'
  },
  {
    question: 'Do you only build for shops in the Central Valley?',
    answer: 'No. The office is in Fresno and we build for shops anywhere in the US. If your shop is in the Valley, we would rather come see the floor than send you a questionnaire.'
  }
];

export function ManufacturingWebDesignPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <SeoHead
        title="Manufacturing Website Design | More RFQs | Boostify USA"
        description="Manufacturing website design for machine shops, fab shops and manufacturers, built for the buyer who checks you out before sending a drawing. From $649."
        canonicalUrl="/manufacturing-website-design"
        keywords="manufacturing website design, machine shop website design, fabrication website design, website for machine shop, welding website, industrial website design, cnc machine shop website"
      />
      <SchemaJSON
        type="Service"
        data={{
          '@id': `${PAGE}#service`,
          name: 'Manufacturing Website Design',
          alternateName: ['Machine Shop Website Design', 'Fabrication Shop Website Design', 'Industrial Website Design'],
          serviceType: 'Website design',
          url: PAGE,
          description:
            'Website design for machine shops, fabrication and welding shops, sheet metal shops and manufacturers: capabilities and equipment pages, quote forms that accept STEP, DXF and PDF files, careers pages marked up for Google job results, and Google Business Profile setup.',
          provider: {
            '@type': 'ProfessionalService',
            '@id': 'https://boostifyusa.com/#localbusiness',
            name: 'Boostify USA Web Design & SEO',
            url: 'https://boostifyusa.com',
            telephone: '+1-559-785-3834',
            email: 'hello@boostifyusa.com',
            logo: 'https://boostifyusa.com/icon.png',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '6362 N Figarden Dr. #118',
              addressLocality: 'Fresno',
              addressRegion: 'CA',
              postalCode: '93722',
              addressCountry: 'US'
            },
            geo: { '@type': 'GeoCoordinates', latitude: 36.8250248, longitude: -119.8684005 }
          },
          areaServed: [
            { '@type': 'State', name: 'California' },
            { '@type': 'Country', name: 'United States' }
          ],
          audience: {
            '@type': 'BusinessAudience',
            audienceType: 'Machine shops, fabrication and welding shops, sheet metal shops, manufacturers'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Manufacturing website design',
            itemListElement: [
              {
                '@type': 'Offer',
                name: 'Capabilities site',
                description: 'Home, capabilities, equipment list and contact pages with address, map, domain email and Google Business Profile.',
                price: '649',
                priceCurrency: 'USD',
                priceSpecification: { '@type': 'PriceSpecification', minPrice: '649', priceCurrency: 'USD' }
              },
              {
                '@type': 'Offer',
                name: 'RFQ site',
                description: 'A page per process, a quote form that accepts drawings, a careers page with JobPosting markup, and call and form tracking.',
                price: '1995',
                priceCurrency: 'USD',
                priceSpecification: { '@type': 'PriceSpecification', minPrice: '1995', priceCurrency: 'USD' }
              }
            ]
          }
        }}
      />
      <SchemaJSON
        type="BreadcrumbList"
        data={{
          '@id': `${PAGE}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://boostifyusa.com/' },
            { '@type': 'ListItem', position: 2, name: 'Web Design', item: 'https://boostifyusa.com/web-design' },
            { '@type': 'ListItem', position: 3, name: 'Manufacturing Website Design', item: PAGE }
          ]
        }}
      />
      <SchemaJSON
        type="WebPage"
        data={{
          '@id': `${PAGE}#webpage`,
          url: PAGE,
          name: 'Manufacturing Website Design for Machine Shops and Fabricators',
          inLanguage: 'en-US',
          datePublished: '2026-10-04',
          dateModified: '2026-10-04',
          isPartOf: { '@id': 'https://boostifyusa.com/#website' },
          about: { '@id': `${PAGE}#service` },
          mainEntity: { '@id': `${PAGE}#service` },
          breadcrumb: { '@id': `${PAGE}#breadcrumb` },
          author: {
            '@type': 'Person',
            name: 'Victor Joaquin',
            jobTitle: 'Founder & Lead Strategist',
            url: 'https://boostifyusa.com/about',
            worksFor: { '@type': 'Organization', '@id': 'https://boostifyusa.com/#localbusiness', name: 'Boostify USA Web Design & SEO' }
          }
        }}
      />
      <SchemaJSON
        type="FAQPage"
        data={{
          '@id': `${PAGE}#faq`,
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer }
          }))
        }}
      />
      <Navigation />

      <main>
        {/* ─── HERO ───
            Same two-column hero as /web-design. The art is a print of a shop's
            website: ballooned, title-blocked and stamped, so the page opens in
            the buyer's own paperwork. */}
        <section className="px-6 relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-28">
          {/* Ghosted print of a machined bracket, the way the other heroes use the
              topographic line art. Generated with /ai-images (Gemini 3.1 flash
              image, 2026-10-04), traced to SVG with potrace so the lines stay
              crisp at any width, set in Boostify orange. */}
          <img
            src="/section-art/manufacturing-website-design_hero-drawing.svg"
            alt=""
            aria-hidden="true"
            width={4128}
            height={2304}
            className="absolute pointer-events-none select-none max-w-none h-auto w-[150%] sm:w-[120%] lg:w-[92%] -right-[38%] sm:-right-[22%] lg:-right-[6%] top-[38%] sm:top-[30%] lg:top-[4%] opacity-[0.14]"
          />
          {/* Clears the drawing away from the headline and paragraph. */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #fff 0%, #fff 34%, rgba(255,255,255,0.75) 52%, rgba(255,255,255,0) 72%)' }}
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-14 lg:gap-12 items-center xl:px-[50px] relative z-10">
            <motion.div initial={{ opacity: 1, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-7xl lg:text-[3.6rem] xl:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95] text-balance">
                <span className="lg:block">Manufacturing</span>{' '}
                <span className="lg:block">Website Design</span>{' '}
                <span className="lg:block text-orange">for Job Shops.</span>
              </h1>
              <p className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-[34rem] text-pretty" data-speakable>
                Manufacturing website design for machine and fab shops. Built for the buyer
                who checks you first.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center whitespace-nowrap px-8 lg:px-6 xl:px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="#buyers-check"
                  className="inline-flex items-center justify-center whitespace-nowrap px-8 lg:px-6 xl:px-8 py-4 bg-white text-dark border-2 border-gray-light font-bold rounded-lg hover:border-dark transition-all">
                  See the buyer&rsquo;s check
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-dark/60">
                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} />From $649</span>
                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} />You own the domain</span>
                <span className="flex items-center gap-2"><Check size={16} className="text-green-500" strokeWidth={3} />Fresno office, US-wide</span>
              </div>
            </motion.div>

            {/* The print. Laid a degree off square on the desk, lit from above. */}
            <motion.div initial={{ opacity: 1, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative min-w-0 max-w-xl mx-auto w-full lg:max-w-none">
              <div className={`relative bg-white rounded-[3px] p-3 sm:p-4 lg:-rotate-1 ${PAPER_SHADOW}`} style={{ backgroundImage: GRAIN }}>
                <div className="relative border-2 border-dark/85 px-6 sm:px-8 pt-6 sm:pt-7">
                  {/* zone marks: numbers across the top run right to left, letters up the side */}
                  <div className="absolute top-0 inset-x-0 h-3 grid grid-cols-4 text-[8px] font-mono font-bold text-dark/40 pointer-events-none" aria-hidden="true">
                    {['4', '3', '2', '1'].map((z) => <span key={z} className="border-l first:border-l-0 border-dark/25 flex items-center justify-center">{z}</span>)}
                  </div>
                  <div className="absolute left-0 top-3 bottom-0 w-3 grid grid-rows-3 text-[8px] font-mono font-bold text-dark/40 pointer-events-none" aria-hidden="true">
                    {['C', 'B', 'A'].map((z) => <span key={z} className="border-t first:border-t-0 border-dark/25 flex items-center justify-center">{z}</span>)}
                  </div>

                  {/* the shop site, drawn on the print: ink outline, no shadow */}
                  <div className="relative mr-10 sm:mr-14">
                    <div className="rounded-md border-[1.5px] border-dark/80 bg-white text-left">
                      <div className="flex items-center gap-3 px-3 h-7 border-b border-dark/20">
                        <div className="flex gap-1.5 shrink-0" aria-hidden="true">
                          {[0, 1, 2].map((i) => <span key={i} className="w-2 h-2 rounded-full border border-dark/40" />)}
                        </div>
                        <div className="mx-auto truncate rounded px-3 py-0.5 text-[10px] font-medium tracking-tight border border-dark/15 text-dark/55">yourshop.com</div>
                        <div className="w-8 shrink-0" />
                      </div>
                      <div className="relative flex items-center justify-between gap-3 px-4 py-2.5 border-b border-dark/15">
                        <span className="font-black text-dark text-[12px] tracking-tight whitespace-nowrap">YOUR SHOP</span>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-dark/60 truncate">
                          <MapPin size={11} className="text-orange shrink-0" strokeWidth={2.5} />
                          <span className="sm:hidden">Street address</span><span className="hidden sm:inline">Your street address &middot; Fresno, CA</span>
                        </span>
                        <Callout n={1} />
                      </div>
                      <div className="px-4 pt-4 pb-3.5 bg-dark text-white">
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-orange mb-1">CNC machining &middot; Fabrication</p>
                        <p className="text-[15px] sm:text-[17px] font-black leading-tight tracking-tight mb-3">Prototype to production, parts up to 40 in.</p>
                        <div className="flex gap-2">
                          <span className="rounded bg-orange px-2.5 py-1 text-[10px] font-bold">Send a drawing</span>
                          <span className="rounded border border-white/25 px-2.5 py-1 text-[10px] font-bold text-white/80">Call the shop</span>
                        </div>
                      </div>
                      <div className="relative px-4 py-3">
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-dark/45 mb-1.5">Equipment</p>
                        {[
                          ['Haas UMC-750, 5-axis', '30 × 20 × 20 in'],
                          ['Okuma lathe', '15 in swing'],
                          ['Press brake', '10 ft, 135 ton']
                        ].map(([m, sz]) => (
                          <div key={m} className="flex justify-between gap-3 text-[10px] py-1 border-b border-dark/10 last:border-0">
                            <span className="font-bold text-dark truncate">{m}</span>
                            <span className="font-mono text-dark/60 whitespace-nowrap">{sz}</span>
                          </div>
                        ))}
                        <Callout n={2} />
                      </div>
                      <div className="relative px-4 pb-4">
                        <div className="rounded border border-dashed border-orange/70 px-3 py-2.5 flex items-center gap-2">
                          <FileUp size={14} className="text-orange shrink-0" strokeWidth={2.5} />
                          <span className="text-[10px] font-bold text-dark">Drop a STEP, DXF or PDF</span>
                          <span className="ml-auto text-[9px] font-bold text-dark/45 whitespace-nowrap">Min. order $500</span>
                        </div>
                        <Callout n={3} />
                        {/* revision flag: the quote form is what changed in rev C */}
                        <RevFlag rev="C" className="absolute left-2 -top-2" />
                      </div>
                    </div>
                  </div>

                  {/* stamp + title block along the bottom of the print */}
                  <div className="mt-6 flex items-stretch justify-between border-t-2 border-dark/85 -mx-6 sm:-mx-8">
                    <div className="relative flex-1 min-h-[64px]">
                      <InspectedStamp className="absolute left-5 sm:left-8 top-1/2 -translate-y-1/2 w-[76px] sm:w-[84px] rotate-[-12deg]" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 text-[8.5px] font-mono uppercase border-l-2 border-dark/85">
                      {[['Title', 'Shop website'], ['Dwg no.', 'BST-MFG-01'], ['Rev', 'C'], ['Scale', '1:1'], ['Drawn', 'V. Joaquin'], ['Sheet', '1 of 1']].map(([k, v], i) => (
                        <div key={k} className={`px-3 py-1.5 flex-col justify-center border-dark/30 ${i % 3 < 2 ? 'sm:border-r' : ''} ${i < 3 ? 'sm:border-b' : ''} ${i === 1 ? 'border-r' : ''} ${i === 0 || i > 2 ? 'hidden sm:flex' : 'flex'}`}>
                          <span className="block text-dark/40 font-bold">{k}</span>
                          <span className="block text-dark font-bold whitespace-nowrap">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <TrustBadges />

        {/* ─── THE BUYER'S CHECK ───
            A first-article inspection report: characteristic, requirement, the
            usual result, and ours. Table on desktop, one card per row on phones. */}
        <section id="buyers-check" className="py-20 md:py-28 px-6 bg-light/50 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[20ch] mb-5">
                  What a buyer checks before sending you a drawing.
                </h2>
                <p className="text-lg text-gray font-medium leading-relaxed max-w-[64ch]">
                  Shop owners say it plainly: work still comes from footwork and referrals.
                  One put it as &ldquo;the website backs up the footwork.&rdquo; Before a new
                  buyer sends a print, somebody in purchasing or engineering looks you up, and
                  these eight things decide whether the drawing comes to you.
                </p>
              </div>
              <div className="bg-dark text-white rounded-xl px-7 py-6 max-w-sm">
                <p className="text-5xl font-black tracking-tighter text-orange mb-2">73%</p>
                <p className="text-white/75 font-medium leading-snug">
                  of B2B buyers look at a supplier&rsquo;s website when deciding whether to send a request for information.
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/40 mt-3">Thomas buyer survey</p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-light bg-white overflow-hidden">
              {/* report header strip */}
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 md:px-7 py-3 bg-dark text-white">
                <span className="text-xs font-black uppercase tracking-[0.13em]">Inspection report &middot; your website</span>
                <span className="text-[11px] font-mono text-white/50">Characteristics: 8 &middot; Inspector: the buyer</span>
              </div>

              {/* column heads, desktop */}
              <div className="hidden lg:grid grid-cols-[3rem_1.05fr_1.35fr_1fr_1.25fr] gap-6 px-7 py-3 border-b-2 border-dark/10 text-[11px] font-bold uppercase tracking-[0.13em] text-dark/45">
                <span>No.</span>
                <span>Characteristic</span>
                <span>Why the buyer checks</span>
                <span>Most shop sites</span>
                <span className="text-orange-hover">A Boostify build</span>
              </div>

              <ol>
                {checks.map((c, i) => (
                  <motion.li
                    key={c.item}
                    initial={{ opacity: 1, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    className="grid grid-cols-[2.25rem_1fr] lg:grid-cols-[3rem_1.05fr_1.35fr_1fr_1.25fr] gap-x-4 lg:gap-6 gap-y-2 px-5 md:px-7 py-5 border-b border-dark/[0.07] last:border-0 items-start">
                    <Balloon n={i + 1} className="mt-0.5" />
                    <p className="font-black text-dark tracking-tight leading-snug">{c.item}</p>
                    <p className="col-start-2 lg:col-start-auto text-gray font-medium leading-relaxed text-[15px]">{c.why}</p>
                    <p className="col-start-2 lg:col-start-auto flex items-start gap-2 text-gray/80 font-medium leading-snug text-[15px]">
                      <span className="shrink-0 mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-black tracking-wider bg-red-50 text-red-500 border border-red-100">FAIL</span>
                      {c.typical}
                    </p>
                    <p className="col-start-2 lg:col-start-auto flex items-start gap-2 font-bold text-dark leading-snug text-[15px]">
                      <span className="shrink-0 mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-black tracking-wider bg-green-50 text-green-600 border border-green-100">PASS</span>
                      {c.ours}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-10 items-center rounded-xl border border-gray-light bg-white px-6 py-6 md:px-8">
              <p className="text-5xl md:text-6xl font-black tracking-tighter text-dark whitespace-nowrap">
                352 <span className="text-gray/40 text-3xl md:text-4xl align-middle">of</span> 601
              </p>
              <p className="text-gray font-medium leading-relaxed max-w-[70ch]">
                <span className="font-black text-dark">Valley shops fail the check before a buyer reaches the equipment list.</span>{' '}
                We looked up 601 machine, fab, welding and manufacturing shops on Google Maps across Fresno,
                Visalia, Modesto, Bakersfield and Merced in October 2026. 352 had no website, a dead one, or a
                dated one: no phone layout, no HTTPS, or a copyright year of 2023 or older.
              </p>
            </div>
          </div>
        </section>

        {/* ─── TWO JOBS, AS TRAVELERS ───
            The same two offers as /web-design, set as job travelers with
            operations and a lead time, because that is how a shop reads a job. */}
        <section className="py-20 md:py-28 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[22ch] mb-5">
              Which job are you hiring the website to do?
            </h2>
            <p className="text-lg text-gray font-medium leading-relaxed max-w-[64ch] mb-14">
              If nine of ten jobs come from customers who already know you, you need the
              first one, and anyone selling you the second is selling you capacity you
              won&rsquo;t run.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6">
              {travelers.map((t) => {
                const dark = t.key === 'rfq';
                return (
                  <motion.div
                    key={t.key}
                    initial={{ opacity: 1, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`rounded-xl overflow-hidden flex flex-col ${dark ? 'bg-dark text-white' : 'bg-white border-2 border-dark/80'}`}>
                    {/* traveler header */}
                    <div className={`grid grid-cols-[1fr_1fr_auto] text-[10px] font-mono uppercase ${dark ? 'border-b border-white/15' : 'border-b-2 border-dark/80'}`}>
                      {[['Traveler', t.job], ['Lead time', t.lead]].map(([k, v]) => (
                        <div key={k} className={`px-4 py-2.5 ${dark ? 'border-r border-white/15' : 'border-r border-dark/30'}`}>
                          <span className={`block font-bold ${dark ? 'text-white/40' : 'text-dark/40'}`}>{k}</span>
                          <span className={`block font-bold ${dark ? 'text-white' : 'text-dark'}`}>{v}</span>
                        </div>
                      ))}
                      <div className="px-4 py-2 flex flex-col items-center justify-center">
                        <Barcode value={t.job} className={`h-5 w-[84px] ${dark ? 'text-white/85' : 'text-dark'}`} />
                        <span className={`block font-bold tracking-[0.2em] mt-0.5 ${dark ? 'text-white/50' : 'text-dark/50'}`}>*{t.job.replace(' ', '')}*</span>
                      </div>
                    </div>

                    <div className="p-7 md:p-9 flex flex-col flex-1">
                      <h3 className={`text-2xl md:text-3xl font-black tracking-tight mb-3 ${dark ? 'text-white' : 'text-dark'}`}>{t.name}</h3>
                      <p className={`text-lg font-bold leading-snug mb-7 ${dark ? 'text-white/90' : 'text-dark/80'}`}>{t.line}</p>

                      <ol className="mb-8">
                        {t.ops.map((o) => (
                          <li key={o.op} className={`grid grid-cols-[3.5rem_1fr] gap-3 py-3 border-t ${dark ? 'border-white/10' : 'border-dark/10'}`}>
                            <span className={`font-mono text-xs font-bold pt-0.5 ${dark ? 'text-orange' : 'text-orange-hover'}`}>OP {o.op}</span>
                            <span className={`font-medium leading-relaxed ${dark ? 'text-white/70' : 'text-gray'}`}>{o.text}</span>
                          </li>
                        ))}
                      </ol>

                      <div className={`mt-auto flex items-baseline justify-between gap-3 pt-5 border-t ${dark ? 'border-white/15' : 'border-gray-light'}`}>
                        <span className={`text-2xl sm:text-3xl font-black tracking-tighter whitespace-nowrap ${dark ? 'text-orange' : 'text-dark'}`}>{t.price}</span>
                        <Link
                          to="/contact"
                          className={`inline-flex items-center gap-1.5 font-bold whitespace-nowrap transition-colors ${dark ? 'text-white hover:text-orange' : 'text-dark hover:text-orange'}`}>
                          Quote this job <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── THE QUOTE FORM ───
            The tire-kicker complaint, answered with the form itself. */}
        <section className="py-20 md:py-24 px-6 bg-light/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[18ch] mb-5">
                A quote form that asks what you&rsquo;d ask on the phone.
              </h2>
              <p className="text-lg text-gray font-medium leading-relaxed max-w-[58ch] mb-6">
                The complaint about shop websites is the email that says &ldquo;how much to make a
                part?&rdquo; with no drawing attached. A form that asks for nothing gets exactly that.
              </p>
              <ul className="space-y-3">
                {[
                  'It takes the drawing: STEP, DXF, PDF, or a photo of a sketch',
                  'It asks quantity, material and need-by date, so you can price it',
                  'Your minimum order is printed on it, before they hit send',
                  'Requests land in their own inbox, away from your supplier email'
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 font-bold text-dark leading-snug">
                    <Check size={18} className="text-orange shrink-0 mt-0.5" strokeWidth={3} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* the form, drawn */}
            <motion.div
              initial={{ opacity: 1, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className={`rounded-xl bg-white ring-1 ring-dark/10 p-6 md:p-8 ${CARD_SHADOW}`}
              aria-label="Example quote request form">
              <p className="text-xl font-black text-dark tracking-tight mb-1">Request a quote</p>
              <p className="text-sm text-gray font-medium mb-6">Most quotes go out within two business days.</p>

              <div className="rounded-lg border-2 border-dashed border-orange/50 px-5 py-4 flex items-center gap-3 mb-3">
                <FileUp size={22} className="text-orange shrink-0" strokeWidth={2.25} />
                <div>
                  <p className="font-bold text-dark text-sm leading-tight">Drop your drawing here</p>
                  <p className="text-xs text-gray font-medium">STEP, IGES, DXF, DWG or PDF</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-gray-light px-3 py-2.5 mb-5">
                <span className="shrink-0 rounded bg-dark text-white text-[9px] font-black font-mono px-1.5 py-1">STEP</span>
                <span className="text-sm font-bold text-dark truncate">mount-bracket_rev-C.step</span>
                <span className="text-xs text-gray font-medium whitespace-nowrap">1.4 MB</span>
                <Check size={16} className="ml-auto text-green-600 shrink-0" strokeWidth={3} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.13em] text-dark/50 mb-2">Quantity</p>
              <div className="grid grid-cols-4 gap-2 mb-5">
                {['1–5', '6–50', '51–500', '500+'].map((q, i) => (
                  <span key={q} className={`rounded-md border px-1 sm:px-2 py-2 text-center text-xs sm:text-sm font-bold whitespace-nowrap ${i === 1 ? 'border-dark bg-dark text-white' : 'border-gray-light text-dark/70'}`}>{q}</span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {[['Material', '6061-T6 aluminum'], ['Need it by', 'Nov 14']].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs font-bold uppercase tracking-[0.13em] text-dark/50 mb-1.5">{k}</p>
                    <div className="rounded-md border border-gray-light px-3 py-2.5 text-sm font-medium text-dark">{v}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 rounded-md bg-light px-4 py-3 mb-5">
                <span className="text-xs font-bold text-dark/70">Minimum order: $500. Smaller jobs, try an instant-quote site.</span>
              </div>

              <span className="flex items-center justify-center w-full rounded-lg bg-orange text-white font-bold py-3.5">
                Send for quote <ArrowRight size={16} className="ml-2" />
              </span>
            </motion.div>
          </div>
        </section>

        {/* ─── CAREERS ───
            Hiring is the loudest local search tied to these shops. */}
        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
            {/* Google job result, drawn */}
            <motion.div
              initial={{ opacity: 1, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="order-2 lg:order-1 relative">
              <div className={`rounded-xl bg-white ring-1 ring-dark/10 overflow-hidden ${CARD_SHADOW}`} aria-label="Example job listing in Google search">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-light">
                  <div className="flex-1 rounded-full border border-gray-light px-4 py-2 text-sm font-medium text-dark">welder jobs fresno</div>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs font-bold text-dark/50 mb-3">Jobs</p>
                  <div className="rounded-lg border-2 border-orange/40 p-4 mb-3 relative">
                    <span className="absolute -top-2.5 right-3 bg-orange text-white text-[10px] font-black uppercase tracking-wider rounded px-2 py-0.5">Your opening</span>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-dark text-white flex items-center justify-center font-black text-xs shrink-0">YS</div>
                      <div>
                        <p className="font-black text-dark leading-tight">Welder / Fabricator</p>
                        <p className="text-sm text-gray font-medium">Your Shop &middot; Fresno, CA</p>
                        <p className="text-xs text-gray font-medium mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                          <span className="inline-flex items-center gap-1"><Briefcase size={12} /> Full-time</span>
                          <span>via yourshop.com</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {[
                    ['MIG Welder, 2nd shift', 'Staffing agency \u00b7 Fresno, CA', '3 days ago'],
                    ['Welder Fabricator I', 'Manufacturer \u00b7 Selma, CA', '1 week ago']
                  ].map(([title, who, when]) => (
                    <div key={title} className="rounded-lg border border-gray-light p-4 mb-3 last:mb-0 flex items-start gap-3 opacity-55">
                      <div className="w-10 h-10 rounded-md bg-light border border-gray-light flex items-center justify-center shrink-0">
                        <Briefcase size={16} className="text-dark/40" />
                      </div>
                      <div>
                        <p className="font-bold text-dark leading-tight">{title}</p>
                        <p className="text-sm text-gray font-medium">{who}</p>
                        <p className="text-xs text-gray font-medium mt-1.5">{when} &middot; via a job board</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray font-medium mt-3">Illustration. Google decides what shows in its job results.</p>
            </motion.div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[18ch] mb-5">
                The welders you need are searching right now.
              </h2>
              <p className="text-lg text-gray font-medium leading-relaxed max-w-[58ch] mb-6">
                In the Fresno area, &ldquo;welder jobs fresno&rdquo; gets about <span className="text-dark font-black">590 Google searches a month</span>,
                nearly twice what &ldquo;machine shop near me&rdquo; gets. Most of those people land on a job board
                and apply to whoever paid for the top spot.
              </p>
              <p className="text-gray font-medium leading-relaxed max-w-[58ch]">
                A careers page marked up with Google&rsquo;s{' '}
                <a href="https://developers.google.com/search/docs/appearance/structured-data/job-posting" target="_blank" rel="noopener noreferrer" className="text-dark font-bold hover:text-orange transition-colors underline decoration-gray-light underline-offset-2">
                  job posting format
                </a>{' '}
                can show your opening in Google&rsquo;s job results, with the application coming to you
                instead of a job board. It&rsquo;s part of the RFQ site.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SHOP TYPES ───
            Where CNC, welding, sheet metal and ag live on this page, since
            nobody searches for them as separate website services. */}
        <section className="py-20 md:py-24 px-6 bg-light/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[20ch] mb-12">
              What your kind of shop needs on the page.
            </h2>

            <div className="hidden md:grid grid-cols-[1fr_1.2fr_1.6fr] gap-8 pb-3 border-b-2 border-dark/15 text-xs font-bold uppercase tracking-[0.13em] text-dark/50">
              <span>Shop</span>
              <span>What the buyer wants first</span>
              <span>What goes on your site</span>
            </div>
            <div>
              {shops.map((s) => (
                <div key={s.name} className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.6fr] gap-2 md:gap-8 py-6 border-b border-dark/10">
                  <h3 className="text-lg font-black text-dark tracking-tight">{s.name}</h3>
                  <p className="text-gray font-medium leading-relaxed">{s.first}</p>
                  <p className="font-bold text-dark leading-relaxed flex items-start gap-2">
                    <Check size={16} strokeWidth={3} className="text-orange shrink-0 mt-1" />
                    {s.site}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROOF ───
            Industrial and technical sites from the portfolio. No count, no
            claim they are machine shops: they are the closest work to the floor. */}
        {proof.length > 0 && (
          <section className="py-20 md:py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end mb-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[20ch]">
                    Industrial and technical sites we built.
                  </h2>
                </div>
                <Link to="/work" className="inline-flex items-center gap-1.5 font-bold text-dark hover:text-orange transition-colors">
                  All our work <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {proof.map((p) => (
                  <Link key={p.slug} to={`/work?p=${p.slug}`} className="group block">
                    <BrowserFrame url={host(p.url)}>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img src={p.media.heroSm} alt={`${p.name} website`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
                      </div>
                    </BrowserFrame>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.13em] text-orange-hover">{p.industry}{p.city ? `, ${p.city}` : ''}</p>
                    <h3 className="text-xl font-black text-dark tracking-tight mt-1 mb-2 group-hover:text-orange transition-colors">{p.name}</h3>
                    <p className="text-gray font-medium leading-relaxed">{p.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── WHO DOES THE WORK ─── same block as /web-design */}
        <section className="py-16 md:py-20 px-6 bg-white border-t border-gray-light">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
              <img
                src="/1733568683912.jpg"
                alt="Victor Joaquin, founder of Boostify USA"
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover border border-gray-light shrink-0"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange-hover mb-3">Who does the work</p>
                <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">
                  Victor Joaquin builds these himself.
                </h2>
                <p className="text-lg text-gray font-medium leading-relaxed max-w-[68ch] mb-4">
                  The person on the first call is the person who writes the copy and builds the
                  pages. If your shop is in the Valley, he would rather walk the floor and see the
                  machines than send you a questionnaire.
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
                  to speak on SEO and AI, and runs the defense technology startup DarkSigma outside of Boostify.
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

        {/* ─── GUARANTEE ─── same terms as /web-design, shop wording */}
        <section className="py-20 md:py-28 px-6 bg-dark text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-dark mx-auto mb-8">
              <ShieldCheck size={40} strokeWidth={2} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Final inspection is yours.</h2>
            <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
              If you don&rsquo;t love the design, we keep refining it until you do, or you
              don&rsquo;t pay for the build. Same guarantee as every site we make.
            </p>
            <div className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-bold uppercase tracking-wider">
              No risk &middot; You own the domain
            </div>
          </div>
        </section>

        <TestimonialsSection />

        {/* ─── FAQ ─── native <details>, open, so every answer ships in the HTML */}
        <section className="pt-20 md:pt-24 pb-14 md:pb-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[22ch] mb-12">
              Manufacturing website questions shop owners ask.
            </h2>
            <div className="border-t border-dark/15 max-w-5xl">
              {faqs.map((faq, i) => (
                <details key={i} open className="faq-details group border-b border-dark/10">
                  <summary className="flex items-start justify-between gap-6 cursor-pointer py-6 -mx-3 px-3 rounded-md hover:bg-dark/[0.03] transition-colors">
                    <h3 className="text-lg md:text-xl font-black text-dark tracking-tight max-w-[52ch]">{faq.question}</h3>
                    <ChevronDown size={22} aria-hidden="true" className="text-orange shrink-0 mt-1 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="text-gray font-medium leading-relaxed pb-7 max-w-[68ch]">{faq.answer}</p>
                </details>
              ))}
            </div>
            <p className="mt-10 text-gray font-medium leading-relaxed max-w-[64ch]">
              Not a shop? The{' '}
              <Link to="/web-design" className="text-dark font-bold hover:text-orange transition-colors">web design page</Link>{' '}
              covers every other kind of business. Or call{' '}
              <a href="tel:+15597853834" className="text-dark font-bold hover:text-orange transition-colors">(559) 785-3834</a>{' '}
              and tell us what you make.
            </p>
          </div>
        </section>

        {/* ─── WHAT USUALLY COMES NEXT ─── */}
        <section className="py-20 md:py-24 px-6 bg-light/50 border-t border-gray-light">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[22rem_1fr] gap-10 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">What usually comes next.</h2>
                <p className="text-gray font-medium leading-relaxed">
                  The site is what the buyer checks. These are what put you in front of buyers who
                  haven&rsquo;t heard of you yet.
                </p>
              </div>
              <div className="divide-y divide-gray-light border-y border-gray-light">
                {[
                  {
                    when: 'When you want to show up for "machine shop near me"',
                    to: '/local-seo',
                    name: 'Local SEO and Google Maps',
                    body: 'The three-result map pack is where local buyers start. Getting into it is separate work from building the site.'
                  },
                  {
                    when: 'When you need calls this month rather than next quarter',
                    to: '/local-marketing',
                    name: 'Local marketing and ads',
                    body: 'Google Business Profile management, ads, reviews, and the tracking that tells you which one made the phone ring.'
                  },
                  {
                    when: 'The day after launch, if you would rather run machines',
                    to: '/maintenance',
                    name: 'Website care, from $99 a month',
                    body: 'Updates, backups, uptime and form monitoring, and new machines added to the equipment list when you buy them.'
                  },
                  {
                    when: 'When you need a customer portal, job tracking or a quoting tool',
                    to: '/app-development',
                    name: 'Custom software',
                    body: 'Built around how your shop already runs.'
                  }
                ].map((r) => (
                  <Link key={r.to} to={r.to} className="group grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-2 md:gap-10 py-6 hover:bg-white/70 transition-colors -mx-4 px-4">
                    <p className="text-sm font-bold text-orange-hover leading-relaxed md:pt-0.5">{r.when}</p>
                    <div>
                      <h3 className="text-lg font-black text-dark tracking-tight mb-1.5 inline-flex items-center gap-1.5">
                        {r.name}
                        <ArrowUpRight size={16} className="text-dark/30 group-hover:text-orange-hover transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </h3>
                      <p className="text-gray font-medium leading-relaxed">{r.body}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── REFERENCES ─── */}
        <section className="py-12 md:py-14 px-6 bg-white border-t border-gray-light">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[15rem_1fr] gap-6 lg:gap-16">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.13em] text-dark mb-1.5">References</h2>
                <p className="text-xs text-gray font-medium leading-relaxed max-w-[30ch]">Where the numbers and quotes on this page come from.</p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 divide-y divide-gray-light sm:divide-y-0">
                {[
                  { t: 'B2B buyers and supplier websites', s: 'Thomas', h: 'https://blog.thomasnet.com/ultimate-list-of-b2b-marketing-statistics-for-manufacturers-industrials' },
                  { t: '"Getting new customers" thread', s: 'Practical Machinist', h: 'https://www.practicalmachinist.com/forum/threads/getting-new-customers.397471/page-2' },
                  { t: 'Job posting structured data', s: 'Google Search Central', h: 'https://developers.google.com/search/docs/appearance/structured-data/job-posting' },
                  { t: 'LocalBusiness structured data', s: 'Google Search Central', h: 'https://developers.google.com/search/docs/appearance/structured-data/local-business' },
                  { t: 'Core Web Vitals thresholds', s: 'web.dev', h: 'https://web.dev/articles/vitals' },
                  { t: 'Search volumes', s: 'Google Ads data via DataForSEO, Oct 2026', h: 'https://dataforseo.com/apis/keywords-data-api' }
                ].map((r) => (
                  <li key={r.h} className="py-2.5">
                    <a href={r.h} target="_blank" rel="noopener noreferrer" className="group flex items-baseline gap-2">
                      <span className="text-sm font-bold text-dark group-hover:text-orange transition-colors">{r.t}</span>
                      <span className="text-xs font-medium text-gray shrink-0">{r.s}</span>
                      <ArrowUpRight size={12} className="text-gray/50 shrink-0 self-center group-hover:text-orange transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
