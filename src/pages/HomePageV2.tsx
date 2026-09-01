import { useRef, useState, useEffect, useCallback } from 'react';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { Footer } from '../components/Footer';
import { ProcessSection } from '../components/ProcessSection';
import { StatsSection } from '../components/StatsSection';
import { WorkShowcase } from '../components/WorkShowcase';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { TrustBadges } from '../components/TrustBadges';
import { Link } from 'react-router-dom';
import {
    ArrowRight, ArrowLeft, ArrowUpRight, Check, Zap, MapPin,
    Code2, Gauge, Braces, FileText, Building2, ServerCog,
    Tractor, Wrench, Scale, Stethoscope, UtensilsCrossed, Truck,
    ChevronDown, Phone, Star, Sparkles
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const homeSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Boostify USA: Fresno Web Design & Marketing Agency",
    "url": "https://boostifyusa.com/",
    "description": "Most Fresno businesses lose money on websites that don't convert. Boostify USA builds custom web design & SEO systems that generate leads 24/7 for local businesses.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "6362 N Figarden Dr. #118",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.8250248,
        "longitude": -119.8684005
    },
    "areaServed": [
        { "@type": "City", "name": "Fresno" },
        { "@type": "City", "name": "Clovis" },
        { "@type": "City", "name": "Madera" },
        { "@type": "City", "name": "Central Valley" }
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Marketing Services",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Optimization" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local Marketing" } }
        ]
    },
    "priceRange": "$$",
    "telephone": "+1-559-785-3834",
    "contactPoint": [
        { "@type": "ContactPoint", "telephone": "+1-559-785-3834", "contactType": "sales" },
        { "@type": "ContactPoint", "telephone": "+1-559-201-8706", "contactType": "customer service" }
    ],
    "email": "hello@boostifyusa.com",
    "logo": "https://boostifyusa.com/icon.png",
    "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59" }
    ]
};

// ─── Service rail ───────────────────────────────────────────────────────────
const services = [
    { to: '/web-design', kind: 'web', featured: true, name: 'Web Design', cta: 'See the build spec',
      blurb: 'Hand-coded, never assembled from a purchased theme. Loads in under two seconds on a phone, and you can still edit the parts you need to edit.' },
    { to: '/local-seo', kind: 'seo', name: 'Local SEO', cta: 'How ranking works',
      blurb: 'The work that decides whether you show up in the three-result map pack.' },
    { to: '/local-marketing', kind: 'map', name: 'Local Marketing', cta: 'Campaigns and LSAs',
      blurb: 'Profile management, Local Service Ads, reviews, and the call tracking that shows which one paid.' },
    { to: '/app-development', kind: 'app', name: 'App Development', cta: 'What we build',
      blurb: 'Customer portals, booking, and internal tools when a website is not the right shape for the job.' },
    { to: '/ai-automation', kind: 'ai', name: 'AI Automation', cta: 'Where it helps',
      blurb: 'Intake, follow-up, and the after-hours replies that otherwise wait until somebody opens the laptop.' },
    { to: '/maintenance', kind: 'care', name: 'Website Care', cta: 'Plans from $99',
      blurb: 'Updates, backups, uptime and form monitoring, and content changes on request.' },
];

// Card artwork. Per the brand system these are small device/product mockups
// carrying real content, not grey skeleton bars. The previous pass used
// placeholder rectangles, which is the generated-placeholder look.
function ServiceVisual({ kind }: { kind: string }) {
    if (kind === 'web') {
        // A real local business page in a browser frame, with the speed score
        // we actually build to sitting on top of it.
        return (
            <div className="absolute inset-0 px-5 pt-5 flex items-end">
                <div className="sv-page relative w-full bg-white rounded-t-lg border border-gray-light border-b-0 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-light bg-white">
                        <span className="w-2 h-2 rounded-full bg-gray-light" />
                        <span className="w-2 h-2 rounded-full bg-gray-light" />
                        <span className="ml-1.5 flex-1 max-w-[10rem] rounded bg-light px-2 py-0.5 text-[8px] font-medium text-gray truncate">
                            fresnotruckwash.com
                        </span>
                    </div>
                    <div className="px-4 py-3.5">
                        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-orange-hover mb-1">Fresno &amp; Clovis</p>
                        <p className="text-[15px] font-black text-dark leading-[1.05] tracking-tight mb-2">
                            Fleet washing,<br />done overnight.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="sv-cta inline-block rounded bg-orange px-2.5 py-1 text-[8px] font-bold text-white">
                                (559) 785-3834
                            </span>
                            <span className="text-[8px] font-bold text-gray">Open 24 hrs</span>
                        </div>
                    </div>
                    <div className="sv-score absolute top-9 right-3 flex items-center gap-1.5 rounded-full bg-white border border-gray-light px-2 py-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[9px] font-black text-dark tabular-nums">98</span>
                        <span className="text-[7px] font-bold text-gray uppercase tracking-wider">speed</span>
                    </div>
                </div>
            </div>
        );
    }

    if (kind === 'seo') {
        // The map pack, which is what ranking actually looks like to a customer.
        // On hover the top result holds and the two beneath it recede.
        const rows = [
            { n: 'Your business', r: '5.0', c: 'Truck washing service' },
            { n: 'Competitor', r: '4.2', c: 'Car wash' },
            { n: 'Competitor', r: '4.0', c: 'Car wash' },
        ];
        return (
            <div className="absolute inset-0 p-4 flex flex-col justify-center gap-1.5">
                {rows.map((row, i) => (
                    <div
                        key={i}
                        className={`sv-rank flex items-center gap-2 rounded-md px-2.5 py-1.5 border ${
                            i === 0 ? 'bg-white border-orange/40' : 'bg-white/70 border-gray-light'
                        }`}
                    >
                        <span className={`text-[9px] font-black tabular-nums ${i === 0 ? 'text-orange-hover' : 'text-gray'}`}>
                            {i + 1}
                        </span>
                        <span className="flex-1 min-w-0">
                            <span className="block text-[9px] font-bold text-dark truncate leading-tight">{row.n}</span>
                            <span className="block text-[7px] font-medium text-gray truncate">{row.c}</span>
                        </span>
                        <span className="flex items-center gap-0.5 shrink-0">
                            <Star size={8} className="text-orange" fill="currentColor" strokeWidth={0} />
                            <span className="text-[8px] font-bold text-dark tabular-nums">{row.r}</span>
                        </span>
                    </div>
                ))}
            </div>
        );
    }

    if (kind === 'map') {
        // A Google Business Profile card, which is the thing this service manages.
        return (
            <div className="absolute inset-0 p-4 flex items-center">
                <div className="sv-gbp w-full rounded-lg bg-white border border-gray-light p-3 shadow-sm">
                    <div className="flex items-start gap-2 mb-2">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-orange/10">
                            <MapPin size={13} className="text-orange" fill="currentColor" strokeWidth={0} />
                        </span>
                        <span className="min-w-0">
                            <span className="block text-[10px] font-black text-dark leading-tight truncate">Boostify USA</span>
                            <span className="block text-[8px] font-medium text-gray truncate">Website designer &middot; Fresno</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2.5">
                        <span className="text-[9px] font-black text-dark tabular-nums">5.0</span>
                        {[0, 1, 2, 3, 4].map(i => (
                            <Star key={i} size={8} className="sv-star text-orange" fill="currentColor" strokeWidth={0} />
                        ))}
                        <span className="text-[8px] font-medium text-gray ml-0.5">(9)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="rounded bg-orange px-2 py-0.5 text-[8px] font-bold text-white">Call</span>
                        <span className="rounded border border-gray-light px-2 py-0.5 text-[8px] font-bold text-dark">Directions</span>
                        <span className="ml-auto text-[8px] font-bold text-green-600">Open</span>
                    </div>
                </div>
            </div>
        );
    }

    if (kind === 'app') {
        // A dispatch screen, because that is what these builds usually are.
        return (
            <div className="absolute inset-0 flex items-end justify-center">
                <div className="sv-screen w-[7.5rem] rounded-t-[1.1rem] border-2 border-dark/85 border-b-0 bg-white px-2 pt-2.5 h-[86%] overflow-hidden">
                    <div className="mx-auto mb-2 h-1 w-7 rounded-full bg-dark/20" />
                    <p className="text-[8px] font-black text-dark mb-1.5 px-0.5">Today &middot; 3 jobs</p>
                    {[
                        { t: '7:30a', n: 'Figarden Dr', s: 'Done' },
                        { t: '9:00a', n: 'Shaw Ave', s: 'En route' },
                        { t: '1:15p', n: 'Clovis Ave', s: 'Queued' },
                    ].map((j, i) => (
                        <div key={i} className="sv-job mb-1 rounded border border-gray-light px-1.5 py-1">
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-[7px] font-bold text-dark truncate">{j.n}</span>
                                <span className="text-[6px] font-bold text-gray tabular-nums shrink-0">{j.t}</span>
                            </div>
                            <span className={`text-[6px] font-bold ${i === 0 ? 'text-green-600' : i === 1 ? 'text-orange-hover' : 'text-gray'}`}>
                                {j.s}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (kind === 'ai') {
        // An after-hours message and the reply that went out without anybody there.
        return (
            <div className="absolute inset-0 p-4 flex flex-col justify-center gap-2">
                <div className="max-w-[78%] rounded-lg rounded-tl-sm bg-white border border-gray-light px-2.5 py-1.5">
                    <p className="text-[8px] font-medium text-dark leading-snug">
                        Do you do roof repair in Clovis?
                    </p>
                    <p className="text-[6px] font-bold text-gray mt-0.5 tabular-nums">9:47 PM</p>
                </div>
                <div className="sv-reply max-w-[86%] self-end rounded-lg rounded-br-sm bg-dark px-2.5 py-1.5">
                    <p className="text-[8px] font-medium text-white leading-snug">
                        We do. Want the first opening Thursday?
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                        <Sparkles size={7} className="text-orange" />
                        <span className="text-[6px] font-bold uppercase tracking-wider text-white/60">Auto-reply &middot; 9:47 PM</span>
                    </div>
                </div>
            </div>
        );
    }

    // Care: a status-page uptime strip, the artifact a monitoring plan produces.
    return (
        <div className="absolute inset-0 p-4 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-black text-dark">Uptime</span>
                <span className="text-[9px] font-black text-dark tabular-nums">99.98%</span>
            </div>
            <div className="flex items-end gap-[3px] h-9">
                {Array.from({ length: 26 }).map((_, i) => (
                    <span
                        key={i}
                        className={`sv-tick flex-1 rounded-sm ${i === 17 ? 'bg-orange' : 'bg-green-500'}`}
                        style={{ height: i === 17 ? '62%' : '100%', ['--i' as string]: i }}
                    />
                ))}
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
                <span className="sv-dot w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[7px] font-bold text-gray uppercase tracking-[0.12em]">90 days &middot; 1 incident</span>
            </div>
        </div>
    );
}

// ─── What ships with every build (concrete spec, not adjectives) ─────────────
const included = [
    {
        icon: Code2,
        title: 'Hand-coded front end',
        body: 'No WordPress theme, no page builder, no plugin stack. The site compiles to static HTML, which means a visitor downloads finished pages instead of waiting on a server to assemble one out of a database and thirty extensions. Nothing to patch on a Tuesday. Nothing that breaks when a plugin author quits.',
    },
    {
        icon: Gauge,
        title: 'Core Web Vitals inside Google’s thresholds',
        body: 'LCP under 2.5 seconds, CLS under 0.1, measured on a mid-range Android over 4G. That last part is the part agencies skip. Your site was designed on a Mac wired to fiber, and that is not the machine Google grades you on, or the one your customer is holding in a truck cab.',
    },
    {
        icon: Braces,
        title: 'Structured data on every page',
        body: 'JSON-LD for LocalBusiness with real coordinates, Service, Breadcrumb, and FAQPage where the content earns it. This is the code that puts your hours, your phone number, and your answers directly into the search result, instead of leaving Google to guess them off your footer.',
    },
    {
        icon: FileText,
        title: 'A CMS only where you need one',
        body: 'Most service businesses edit five things and only five: hours, phone, staff, prices, photos. Those get wired to an editor you can actually use, and everything else stays static, which is the part that matters, because a content change on a Tuesday afternoon cannot take the site down on Wednesday morning when there is nothing sitting there to break.',
    },
    {
        icon: Building2,
        title: 'Google Business Profile wired to the site',
        body: 'Primary and secondary categories, service areas, products, and UTM-tagged links back to the site. Do that once and GA4 can finally separate the calls that came from the map pack from the ones that came from organic. Skip it and every lead reports as direct, which tells you nothing.',
    },
    {
        icon: ServerCog,
        title: 'Hosting, SSL, DNS, and the redirect map',
        body: 'Every URL on the old site gets inventoried and pointed at its replacement with a 301 redirect before anything goes live, because the alternative is that Google keeps sending people to addresses that no longer exist and quietly stops sending them at all. The map is a spreadsheet and you get a copy of it. Check our work.',
    },
];

// ─── Published pricing (same numbers we quote on the phone) ──────────────────
const tiers = [
    {
        name: 'Template build',
        price: '$649',
        unit: 'one time',
        who: 'A business that needs to exist online this month and does not need anything custom.',
        points: ['Up to 5 pages', 'Your branding on a proven layout', 'Mobile, SSL, and basic schema', 'Live in about a week'],
    },
    {
        name: 'Custom build',
        price: '$1,995',
        unit: 'starting',
        who: 'A business that competes on search and needs the site to carry weight.',
        points: ['Designed and coded for you', 'Core Web Vitals work included', 'Full schema and GBP setup', 'Live in 3 to 5 weeks'],
        featured: true,
    },
    {
        name: 'Care plan',
        price: '$99',
        unit: 'per month',
        who: 'Anyone who does not want to think about updates, backups, or a broken form.',
        points: ['Content changes on request', 'Uptime and form monitoring', 'Security patches and backups', 'Cancel any month'],
    },
];

// ─── Fresno sectors, with the specific thing each one actually needs ─────────
const industries = [
    {
        icon: Tractor,
        name: 'Agriculture and equipment',
        body: 'Growers and equipment dealers sell on spec sheets and service radius, and almost every ag site in the Valley buries both under a stock photo of a sunset over a field. Searchable implement lists. A real service-area map. A quote form that reaches a phone somebody picks up during harvest.',
    },
    {
        icon: Wrench,
        name: 'HVAC, plumbing, roofing, electrical',
        body: 'Trade work is won in the map pack at 9pm in July by whoever loads first and shows a number. One page per service so each one can rank on its own, call tracking on every one of them, and the phone number where a thumb already is.',
    },
    {
        icon: Scale,
        name: 'Legal practices',
        body: 'One page per practice area, because a single services page cannot rank for seven different things at once. Attorney bios carrying real bar numbers. Intake forms hardened against the bot traffic that buries a small firm’s inbox until nobody checks it anymore.',
    },
    {
        icon: Stethoscope,
        name: 'Dental and medical',
        body: 'New-patient paperwork and appointment requests that never travel by plain email. Type set large enough to read at arm’s length, which sounds like a small thing until you look at who is actually filling out the form.',
    },
    {
        icon: UtensilsCrossed,
        name: 'Restaurants and food',
        body: 'Your menu as real HTML text, not a PDF and not a photograph of a printed menu. That one change is the entire reason most restaurant sites are invisible when somebody searches the dish by name. Google cannot read a picture of the word birria.',
    },
    {
        icon: Truck,
        name: 'Auto, truck, and fleet',
        body: 'Bay counts, turnaround times, and fleet account pages, plus hours that actually match between the site and the Google listing, which on most shop sites they quietly do not, and that mismatch is what sends somebody to a competitor at 6:40 on a Friday. Fresno Truck Wash is the build at the top of this page.',
    },
];

// ─── Service area ────────────────────────────────────────────────────────────
const neighborhoods = [
    'Old Fig Garden', 'Woodward Park', 'Tower District', 'Downtown Fresno',
    'River Park', 'Sunnyside', 'Bullard', 'Fig Garden Village',
];

const cityPages = [
    { name: 'Fresno', to: '/fresno-web-design' },
    { name: 'Clovis', to: '/clovis-marketing-agency' },
    { name: 'Madera', to: '/madera-marketing-agency' },
    { name: 'Sanger', to: '/sanger-marketing-agency' },
    { name: 'Visalia', to: '/visalia-marketing-agency' },
    { name: 'Tulare', to: '/tulare-marketing-agency' },
    { name: 'Hanford', to: '/hanford-marketing-agency' },
    { name: 'Merced', to: '/merced-marketing-agency' },
    { name: 'Modesto', to: '/modesto-web-design' },
];

// ─── Jobs we say no to, and where they should go instead ────────────────────
const turndown = [
    {
        job: 'A site built to rank in a city you do not operate in',
        why: 'Fake addresses and rented virtual offices get Google Business Profiles suspended, and the suspension follows the owner, not the listing. Build in the city you actually work in.',
        instead: 'Nowhere. Do not buy this from anyone.',
    },
    {
        job: 'A $200 website',
        why: 'Nobody can design, write, and build one for that. What you would be paying for is a template somebody else already made, marked up.',
        instead: 'Go straight to Squarespace or Wix and do it yourself in a weekend. You will get the same result and keep the difference.',
    },
    {
        job: 'A store carrying more than a few hundred products',
        why: 'Inventory sync, tax tables, shipping rules, and returns are a separate trade with its own specialists, and taking the job would mean learning it on your money and your launch date.',
        instead: 'A Shopify Plus partner. Ask us and we will name two in the Valley.',
    },
    {
        job: 'Guaranteed number one on Google',
        why: 'No agency controls the ranking, and the ones who guarantee it are either targeting a phrase nobody searches or planning to blame you in month four.',
        instead: 'Hire on process and reporting. Anyone selling a guarantee is telling you what they are.',
    },
    {
        job: 'Live in 48 hours',
        why: 'Rushed launches skip the redirect map, and that is the one step that costs you rankings you already had.',
        instead: 'If the old site is up, we can patch what is broken this week and build the replacement properly behind it.',
    },
];

// ─── Questions worth asking any agency, including us ─────────────────────────
const vetting = [
    {
        q: 'Who owns the domain and the hosting account the day I leave?',
        a: 'If the answer is anything but you, that is a lease. Ask for it in writing. Ours says you, and it costs nothing to transfer.',
    },
    {
        q: 'What did the last three sites you shipped score on PageSpeed?',
        a: 'Anybody can promise a number for a site that does not exist yet. Ask for three live URLs, open pagespeed.web.dev while you are still on the phone, and run them yourself.',
    },
    {
        q: 'Are the reviews on your website real, and where do I read them?',
        a: 'Ours sit on our Google Business Profile. There are nine and they are all five stars. Nine is a small number and we would rather you see the real count than a badge we drew ourselves in Illustrator.',
    },
    {
        q: 'What happens to my rankings during the rebuild?',
        a: 'If the word redirect does not come out of their mouth without prompting, your traffic is going to fall and it will be described to you as a redesign.',
    },
    {
        q: 'Who picks up the phone in six months?',
        a: 'Ours is (559) 785-3834 and it rings in Fresno. Ask where the number you are dialing actually rings, and ask before you sign, not after.',
    },
];

// ─── FAQ (rendered in HTML, mirrored into FAQPage schema) ───────────────────
const faqs = [
    {
        q: 'I called two agencies and neither one would give me a number. What does a website actually cost?',
        a: 'Template build, $649, paid once. Custom build, $1,995 and up depending on how many pages and how much of it has to be built rather than assembled. Care plan, $99 a month, optional, cancel whenever. Those are the numbers we say on the phone, which is the only reason they are printed here. An agency that will not quote a range before a discovery call is protecting its ability to price you off your reaction, and you should read it that way.',
    },
    {
        q: 'My busy season starts in six weeks. Can you actually be live by then?',
        a: 'A template build, yes, comfortably. A custom build takes 3 to 5 weeks and six is not much margin, so we would tell you on the first call whether we believe it. You get a staging link on day one and it stays live the whole time, so you are never waiting on a reveal to find out where it stands.',
    },
    {
        q: 'My last guy still has my domain and will not hand it over. Who owns what when we are done?',
        a: 'You do. Domain, hosting account, code, content, analytics. We transfer all of it on request, in writing, for free. Get that answer from anyone you hire before you pay them a deposit, because the version of this you are living through right now is extremely common and almost impossible to unwind afterward.',
    },
    {
        q: 'I rank on the first page right now and I am scared a rebuild kills it. Does it?',
        a: 'It does when nobody maps the URLs, which is most of the time. Here is the actual mechanism: your old pages have addresses, Google has those addresses indexed, and a new site with new addresses orphans every one of them unless each old URL is pointed at its replacement with a 301 redirect before launch. We inventory the old site first, write the redirect map, keep the titles and headings that are already earning the ranking, and watch Search Console for two weeks after. Ask whoever you hire to describe that process. If redirects do not come up on their own, walk.',
    },
    {
        q: 'I am in Visalia, not Fresno. Does that change anything?',
        a: 'No. Most of our work is Fresno and Clovis, and we build across Madera, Sanger, Visalia, Tulare, Hanford, Merced, and Modesto. Being local means we will drive to your shop, not that we refuse work that is an hour out.',
    },
    {
        q: 'I already paid for a website two years ago. Do I really have to start over?',
        a: 'Often not. If the platform is current and the problem is speed, structure, or thin content, fixing it costs less than replacing it and we will say so. If it is an abandoned theme carrying forty plugins, the repair costs more than the rebuild, because every fix has to be re-tested against every plugin. We will tell you which one you have before you pay us anything.',
    },
    {
        q: 'Do I have to hire somebody else for SEO after the site is built?',
        a: 'No, and you should be suspicious of anyone who structures it that way. Schema, page structure, internal links, and Google Business Profile setup ship inside the custom build. SEO sold as a separate retainer immediately after a launch usually means it was left out of the launch on purpose.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};

export function HomePageV2() {
    const { scrollY } = useScroll();

    // Service rail: arrows scroll one card and disable at the ends.
    const railRef = useRef<HTMLDivElement>(null);
    const [canScroll, setCanScroll] = useState({ left: false, right: false });
    const [railProgress, setRailProgress] = useState(0);
    const [railIndex, setRailIndex] = useState(1);

    const readRail = useCallback(() => {
        const el = railRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        setCanScroll({ left: el.scrollLeft > 8, right: el.scrollLeft < max - 8 });
        setRailProgress(max > 0 ? Math.min(1, (el.scrollLeft + el.clientWidth) / el.scrollWidth) : 1);
        const cards = Array.from(el.children).filter(c => c.tagName === 'A') as HTMLElement[];
        const here = cards.findIndex(c => c.offsetLeft >= el.scrollLeft - 12);
        setRailIndex(here === -1 ? cards.length : here + 1);
    }, []);

    useEffect(() => {
        readRail();
        const el = railRef.current;
        if (!el) return;
        el.addEventListener('scroll', readRail, { passive: true });
        window.addEventListener('resize', readRail);
        return () => {
            el.removeEventListener('scroll', readRail);
            window.removeEventListener('resize', readRail);
        };
    }, [readRail]);

    // Mouse drag on the rail. Touch scrolls natively, so this is mouse-only.
    //
    // Snap is gone entirely (it pinned cards to the left edge and re-fired on
    // any hover transform), so the drag just moves scrollLeft and hands its
    // velocity to a short inertial glide on release so it does not dead-stop.
    const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: 0, vx: 0, lastX: 0, lastT: 0 });
    const glideRef = useRef<number | null>(null);

    const onRailPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        const el = railRef.current;
        if (!el) return;

        if (glideRef.current) { cancelAnimationFrame(glideRef.current); glideRef.current = null; }
        el.classList.add('is-dragging');
        // setPointerCapture throws NotFoundError on a pointerId the element does
        // not have. Unguarded it aborts this handler after the class is applied
        // but before the move/up listeners bind, stranding the rail in the
        // dragging state with snap switched off.
        try { el.setPointerCapture?.(e.pointerId); } catch { /* capture is optional */ }

        dragState.current = {
            active: true, startX: e.clientX, startScroll: el.scrollLeft,
            moved: 0, vx: 0, lastX: e.clientX, lastT: performance.now(),
        };

        const onMove = (ev: PointerEvent) => {
            const d = dragState.current;
            if (!d.active) return;
            ev.preventDefault();
            const dx = ev.clientX - d.startX;
            d.moved = Math.max(d.moved, Math.abs(dx));

            const now = performance.now();
            const dt = now - d.lastT;
            if (dt > 0) {
                // px per ms, smoothed so a single jittery sample cannot spike it
                d.vx = 0.8 * d.vx + 0.2 * ((ev.clientX - d.lastX) / dt);
                d.lastX = ev.clientX;
                d.lastT = now;
            }
            el.scrollLeft = d.startScroll - dx;
        };

        const onUp = () => {
            const d = dragState.current;
            if (!d.active) return;
            d.active = false;
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            el.removeEventListener('pointerup', onUp);
            el.removeEventListener('pointercancel', onUp);
            el.removeEventListener('lostpointercapture', onUp);

            const finish = () => {
                el.classList.remove('is-dragging');
                readRail();
            };

            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            let v = Math.max(-42, Math.min(42, -d.vx * 16)); // px/frame, clamped
            if (reduce || Math.abs(v) < 0.6) { finish(); }
            else {
                const step = () => {
                    v *= 0.94;                      // ease-out decay, no overshoot
                    el.scrollLeft += v;
                    if (Math.abs(v) > 0.4) glideRef.current = requestAnimationFrame(step);
                    else { glideRef.current = null; finish(); }
                };
                glideRef.current = requestAnimationFrame(step);
            }

            // a drag past 5px must not also navigate
            if (d.moved > 5) {
                const swallow = (ce: MouseEvent) => { ce.preventDefault(); ce.stopPropagation(); };
                el.addEventListener('click', swallow, { capture: true, once: true });
                window.setTimeout(() => el.removeEventListener('click', swallow, { capture: true }), 0);
            }
        };

        window.addEventListener('pointermove', onMove, { passive: false });
        window.addEventListener('pointerup', onUp);
        el.addEventListener('pointerup', onUp);
        el.addEventListener('pointercancel', onUp);
        el.addEventListener('lostpointercapture', onUp);
    };

    useEffect(() => () => { if (glideRef.current) cancelAnimationFrame(glideRef.current); }, []);

    const scrollRail = (dir: number) => {
        const el = railRef.current;
        if (!el) return;
        const card = el.querySelector('a');
        const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' });
    };



    // Badges leave on scroll. Transform + opacity only: animating `filter: blur()`
    // forces a per-frame repaint and stutters on mid-range phones.
    const badge1Opacity = useTransform(scrollY, [700, 1000], [1, 0]);
    const badge1Y = useTransform(scrollY, [700, 1000], [0, 20]);
    const badge1X = useTransform(scrollY, [700, 1000], [0, 120]);

    const badge2Opacity = useTransform(scrollY, [850, 1150], [1, 0]);
    const badge2Y = useTransform(scrollY, [850, 1150], [0, 30]);
    const badge2X = useTransform(scrollY, [850, 1150], [0, -120]);

    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <SeoHead
                title="Boostify USA: Web Design & Local Marketing in Fresno"
                description="Fresno's web design and local marketing studio. We build fast, SEO-ready websites that turn Central Valley visitors into paying customers."
                canonicalUrl="/"
            >
                <link rel="preload" as="image" href="/hero-bg-pattern-micro.webp" />
                <script type="application/ld+json">
                    {JSON.stringify(homeSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </SeoHead>

            <Navigation />

            <main>
                {/* ─── HERO (Original copy, original backgrounds, original browser mockups) ─── */}
                <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-6 overflow-hidden bg-white">
                    {/* Topographic Background Pattern */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.4]"
                        style={{
                            backgroundImage: 'url(/hero-bg-pattern-micro.webp)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />

                    {/* Radial white fade */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%)'
                        }}
                    />

                    <div className="max-w-7xl mx-auto relative z-10">
                        {/* Centered Content */}
                        <div className="text-center max-w-4xl mx-auto mb-16 relative">
                            <motion.div
                                suppressHydrationWarning
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2.5 text-xs md:text-sm font-bold uppercase tracking-[0.13em] text-orange-hover mb-8"
                            >
                                <MapPin size={14} strokeWidth={3} className="shrink-0" />
                                <span className="md:hidden">Fresno web design, since 2014</span>
                                <span className="hidden md:inline">Fresno web design &amp; marketing agency, since 2014</span>
                            </motion.div>

                            <motion.h1
                                suppressHydrationWarning
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-6xl lg:text-[5.7rem] font-black text-dark leading-[0.95] tracking-tighter mb-8"
                            >
                                We Build Websites That{' '}
                                <span className="relative inline-block px-2 isolate whitespace-nowrap">
                                    <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
                                    <motion.span
                                        suppressHydrationWarning
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="text-orange relative z-10"
                                    >Actually</motion.span>
                                </span>{' '}
                                Bring Customers In.
                            </motion.h1>

                            <motion.p
                                suppressHydrationWarning
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl md:text-2xl text-gray font-medium mb-10 leading-relaxed max-w-3xl mx-auto"
                            >
                                Most small business websites are a brochure nobody asked for. Yours should
                                answer the question somebody typed into Google at 9pm and then make it easy
                                to call you. That is the whole job.
                            </motion.p>

                            <motion.div
                                suppressHydrationWarning
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                            >
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-10 py-5 bg-orange text-white text-lg font-bold rounded-lg hover:bg-orange-hover transition-all duration-300 shadow-xl shadow-orange/20 hover:shadow-orange/30 transform hover:-translate-y-1 w-full sm:w-auto"
                                >
                                    Book a Free Call
                                    <ArrowRight className="ml-2 h-6 w-6" />
                                </Link>
                                <Link
                                    to="/work"
                                    className="inline-flex items-center justify-center px-10 py-5 bg-white text-dark border-2 border-gray-light font-bold text-lg rounded-lg hover:border-dark hover:bg-dark hover:text-white transition-all duration-300 w-full sm:w-auto"
                                >
                                    View Our Work
                                </Link>
                            </motion.div>

                            <motion.div
                                suppressHydrationWarning
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-bold text-dark uppercase tracking-wide mb-6"
                            >
                                <span className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-orange" strokeWidth={3} />
                                    You own the domain and the code
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-orange" strokeWidth={3} />
                                    Pricing published below
                                </span>
                                <span className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-orange" strokeWidth={3} />
                                    No contract
                                </span>
                            </motion.div>
                        </div>

                    </div>
                </section>

                {/* ─── OVERLAPPING PORTFOLIO MOCKUP + FLOATING BADGES + STATS BAR ─── */}
                <section className="relative z-20 pb-20 bg-white overflow-x-clip">
                    <div className="max-w-6xl mx-auto px-6 -mt-10 md:-mt-20 relative">
                        {/* Floating badges, leave on scroll */}
                        <motion.div
                            suppressHydrationWarning
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
                            style={{ opacity: badge1Opacity, y: badge1Y, x: badge1X }}
                            className="absolute top-[15%] -right-8 md:-right-12 z-30 bg-dark rounded-xl shadow-2xl shadow-dark/30 px-5 py-3.5 flex items-center gap-3 hidden lg:flex"
                        >
                            <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center">
                                <Zap size={20} className="text-orange" strokeWidth={2.5} />
                            </div>
                            <div>
                                <div className="text-sm font-black text-white leading-tight">98 PageSpeed</div>
                                <div className="text-xs text-white/60 font-medium">Scored on a phone</div>
                            </div>
                        </motion.div>

                        <motion.div
                            suppressHydrationWarning
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.1, duration: 0.5, ease: 'easeOut' }}
                            style={{ opacity: badge2Opacity, y: badge2Y, x: badge2X }}
                            className="absolute bottom-12 -left-6 md:-left-8 z-30 bg-dark rounded-xl shadow-2xl shadow-dark/30 px-5 py-3.5 flex items-center gap-3 hidden lg:flex"
                        >
                            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <Check size={20} className="text-green-400" strokeWidth={3} />
                            </div>
                            <div>
                                <div className="text-sm font-black text-white leading-tight">Schema shipped</div>
                                <div className="text-xs text-white/60 font-medium">Not sold separately</div>
                            </div>
                        </motion.div>

                        {/* Browser mockup */}
                        <motion.div
                            suppressHydrationWarning
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="bg-white rounded-xl border border-gray-light shadow-[0_30px_70px_-30px_rgba(17,17,17,0.45)] mb-16 overflow-hidden relative z-10"
                        >
                            {/* Browser chrome. The old version centred the URL field with
                                mx-auto, which no browser does, and nested a rounded-t-2xl
                                bar inside a rounded-xl frame so the corners disagreed. The
                                frame clips now, so the chrome needs no radius of its own. */}
                            <div className="bg-light border-b border-gray-light px-3.5 py-2.5 flex items-center gap-3">
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                                    <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                                    <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                                </div>

                                <div className="hidden sm:flex items-center gap-1 shrink-0 text-dark/25">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                                </div>

                                {/* left-aligned and full width, like the real thing */}
                                <div className="flex-1 min-w-0 flex items-center gap-1.5 h-7 bg-white border border-gray-light rounded-md px-2.5">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-dark/30 shrink-0" aria-hidden="true">
                                        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <span className="text-[11px] font-medium text-dark/55 truncate">fresnotruckwash.com</span>
                                </div>

                                <div className="hidden sm:flex items-center gap-[3px] shrink-0 text-dark/20">
                                    <span className="w-[3px] h-[3px] rounded-full bg-current" />
                                    <span className="w-[3px] h-[3px] rounded-full bg-current" />
                                    <span className="w-[3px] h-[3px] rounded-full bg-current" />
                                </div>
                            </div>

                            <div className="bg-gray-100 aspect-[16/10] w-full overflow-hidden relative">
                                <img
                                    src="/FTS-Mock.webp"
                                    fetchPriority="high"
                                    alt="Fresno Truck Wash Portfolio Preview"
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Bar */}
                    <div className="max-w-6xl mx-auto px-6 border-t border-gray-light py-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 bg-white">
                        <div className="text-center md:text-left flex-1 border-b md:border-b-0 md:border-r border-gray-light pb-8 md:pb-0 md:pr-8">
                            <div className="text-sm text-gray font-bold tracking-widest uppercase mb-1">Established</div>
                            <div className="text-3xl font-black text-dark tracking-tighter">2014</div>
                        </div>
                        <div className="text-center md:text-left flex-1 border-b md:border-b-0 md:border-r border-gray-light pb-8 md:pb-0 md:pr-8">
                            <div className="text-sm text-gray font-bold tracking-widest uppercase mb-1">HQ & Local Reach</div>
                            <div className="text-3xl font-black text-dark tracking-tighter">
                                <Link to="/fresno-web-design" className="hover:text-orange transition-colors">Fresno, CA</Link>
                            </div>
                        </div>
                        <div className="text-center md:text-left flex-1 border-b md:border-b-0 md:border-r border-gray-light pb-8 md:pb-0 md:pr-8">
                            <div className="text-sm text-gray font-bold tracking-widest uppercase mb-1">Custom builds from</div>
                            <div className="text-3xl font-black text-dark tracking-tighter">$1,995</div>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <svg key={i} className="w-5 h-5 text-orange" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                ))}
                            </div>
                            <div className="text-lg font-bold text-dark tracking-tight">5.0 on 9 Google reviews</div>
                        </div>
                    </div>

                    {/* Slogan / Bridge */}
                    <div className="max-w-6xl mx-auto px-6 py-10 text-center">
                        <p className="text-lg md:text-xl text-gray font-medium tracking-tight max-w-3xl mx-auto">
                            We are a family-operated shop on N Figarden Drive. Every site on this page was
                            designed, coded, and launched by the same three people who answer the phone at{' '}
                            <a href="tel:+15597853834" className="text-dark font-bold hover:text-orange transition-colors">(559) 785-3834</a>.
                        </p>
                    </div>
                </section>

                {/* ─── TRUST BADGES ─── */}
                {/* Was a duplicated inline copy of the shared component with
                    hand-drawn logo approximations. Now the real marks, once. */}
                <TrustBadges />

                {/* ─── SERVICES ───
                    A drag-and-arrow rail rather than a grid. The motion means something:
                    there are seven service pages and they do not fit, so the rail
                    bleeds off the right edge to say so. Card widths vary, which keeps
                    it from reading as another identical card grid. */}
                <section id="services" className="py-24 md:py-32 px-6 bg-white overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-20 items-end mb-14">
                            <div>
                                <h2 className="text-4xl md:text-5xl lg:text-[4.25rem] font-black text-dark tracking-tighter leading-[0.95] max-w-[13ch] mb-6">
                                    Seven services, all of them in house.
                                </h2>
                                <p className="lede text-lg md:text-xl text-gray font-medium leading-relaxed max-w-[52ch]">
                                    Design, search, and the local listings work that ties the two together.
                                    None of it subcontracted. None of it built on a template somebody else made.
                                </p>
                            </div>

                            {/* Right column: the question a visitor actually has here is
                                "which of these do I need", so answer it instead of
                                leaving the space to the arrows. */}
                            <div className="lg:pb-2">
                                <div className="border-l-2 border-orange pl-6">
                                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.13em] text-orange-hover mb-2">
                                        Which one do I need
                                    </p>
                                    <p className="lede text-dark font-medium leading-relaxed max-w-[44ch]">
                                        Most clients start with one and add a second inside a year, almost always in
                                        the same order: build the site, fix the listings, then pay for traffic.
                                        Running ads at a site that does not convert is how people decide that
                                        marketing does not work.
                                    </p>
                                </div>

                                <div className="hidden md:flex items-center gap-2 mt-7 pl-6">
                                    <button
                                        type="button"
                                        onClick={() => scrollRail(-1)}
                                        disabled={!canScroll.left}
                                        aria-label="Previous services"
                                        className="w-11 h-11 rounded-lg border-2 border-dark/15 flex items-center justify-center text-dark transition-colors hover:border-dark disabled:opacity-25 disabled:hover:border-dark/15"
                                    >
                                        <ArrowLeft size={18} strokeWidth={2.5} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => scrollRail(1)}
                                        disabled={!canScroll.right}
                                        aria-label="More services"
                                        className="w-11 h-11 rounded-lg border-2 border-dark/15 flex items-center justify-center text-dark transition-colors hover:border-dark disabled:opacity-25 disabled:hover:border-dark/15"
                                    >
                                        <ArrowRight size={18} strokeWidth={2.5} />
                                    </button>
                                    <span className="ml-3 text-sm font-bold text-gray tabular-nums">
                                        {railIndex} / {services.length + 1}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rail. Left padding matches the container; right side runs off the
                        viewport so the next card is visibly cut. */}
                    <div
                        ref={railRef}
                        className="service-rail -mx-6 flex gap-5 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
                        style={{
                            // A flat 20px gutter, not the container inset. The rail is meant to
                            // run full-bleed so the cards read edge to edge; it just should
                            // not start flush against the screen.
                            paddingLeft: '20px',
                            paddingRight: '20px',
                        }}
                        onPointerDown={onRailPointerDown}
                    >
                        {services.map((svc) => (
                            <Link
                                key={svc.to}
                                to={svc.to}
                                className={`svc-card shrink-0 group flex flex-col rounded-xl border border-gray-light bg-white overflow-hidden hover:border-dark ${
                                    svc.featured
                                        ? 'w-[min(85vw,32rem)]'
                                        : 'w-[min(72vw,19rem)]'
                                }`}
                            >
                                <div className={`relative ${svc.featured ? 'h-52' : 'h-36'} bg-light border-b border-gray-light overflow-hidden`} aria-hidden="true">
                                    <ServiceVisual kind={svc.kind} />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className={`font-black text-dark tracking-tight mb-2 ${svc.featured ? 'text-2xl' : 'text-xl'}`}>
                                        {svc.name}
                                    </h3>
                                    <p className="lede text-gray font-medium leading-relaxed mb-6">{svc.blurb}</p>
                                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-dark/50 group-hover:text-orange-hover transition-colors">
                                        {svc.cta}
                                        <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </span>
                                </div>
                            </Link>
                        ))}

                        {/* Closing card: the index, in ink, so the rail ends on a full stop */}
                        <Link
                            to="/services"
                            className="shrink-0 group w-[min(72vw,19rem)] rounded-xl bg-dark text-white p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-2xl font-black tracking-tight mb-2">Everything, on one page.</h3>
                                <p className="text-white/60 font-medium leading-relaxed">
                                    Scope, what is included at each tier, and what we hand off at the end.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-2 font-bold text-orange mt-8">
                                All services
                                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                            </span>
                        </Link>

                        <div className="shrink-0 w-2" aria-hidden="true" />
                    </div>

                    {/* Closes the section: a progress track tied to real scroll position,
                        then a hairline and a line that hands off to the spec below. Without
                        this the rail just stopped and the next section arrived cold. */}
                    <div className="max-w-6xl mx-auto">
                        <div className="h-0.5 bg-dark/10 rounded-full overflow-hidden mt-2 mb-10">
                            <div
                                className="h-full bg-orange rounded-full origin-left"
                                style={{ width: `${Math.max(12, railProgress * 100)}%` }}
                            />
                        </div>

                        <div className="border-t border-dark/15 pt-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-start">
                            <p className="text-lg text-gray font-medium leading-relaxed max-w-[62ch]">
                                <span className="text-dark font-bold">All seven ship against the same build spec.</span>{' '}
                                The $649 template and the $1,995 custom build get the same redirect map, the
                                same schema, and the same speed budget, because the cheap version of that work
                                is not cheaper, it is just missing.
                            </p>
                            <Link
                                to="/services"
                                className="inline-flex items-center gap-2 font-bold text-dark hover:text-orange-hover transition-colors shrink-0 md:pt-1"
                            >
                                <span className="border-b-2 border-dark/20 pb-0.5">Compare all services</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ─── THE SPEC ───
                    Primitive: a two-column spec sheet on hairline rules. No icons, no
                    cards, no eyebrow. Reads like documentation, which is the point. */}
                <section className="py-20 md:py-24 px-6 bg-light">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[22ch] mb-5">
                            What a Boostify build actually includes.
                        </h2>
                        <p className="lede text-lg text-gray font-medium leading-relaxed max-w-[58ch] mb-14">
                            Every agency on earth says fast and mobile-friendly. Nobody says what they mean
                            by it. This is the spec, in numbers you can check on a site we already shipped.
                        </p>

                        <dl className="border-t border-dark/15">
                            {included.map((item, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-[15rem_1fr] gap-2 md:gap-12 py-7 border-b border-dark/10">
                                    <dt className="text-base font-black text-dark tracking-tight md:pt-0.5">
                                        {item.title}
                                    </dt>
                                    <dd className="text-gray font-medium leading-relaxed max-w-[62ch]">
                                        {item.body}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* ─── PRICING ───
                    Primitive: full-width rows, not a three-card pricing table. Price sits
                    in the left rail at display size; one CTA for the section, not three. */}
                <section className="py-28 md:py-36 px-6 bg-dark text-white relative overflow-hidden">
                    {/* Dot texture, masked so it fades to nothing before it reaches the
                        copy. CSS rather than an image: this is the section that claims a
                        speed budget, so it should not ship a background download. */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        aria-hidden="true"
                        style={{
                            backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)',
                            backgroundSize: '22px 22px',
                            maskImage: 'radial-gradient(120% 90% at 8% 0%, #000 0%, rgba(0,0,0,0.45) 35%, transparent 72%)',
                            WebkitMaskImage: 'radial-gradient(120% 90% at 8% 0%, #000 0%, rgba(0,0,0,0.45) 35%, transparent 72%)',
                        }}
                    />

                    <div className="max-w-6xl mx-auto relative z-10">
                        <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange mb-5">Pricing</p>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] max-w-[16ch] mb-8">
                            What it costs, before you call us.
                        </h2>
                        <p className="lede text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-[58ch] mb-16">
                            Most Fresno agencies make you sit through a discovery call before anybody says a
                            number, and the reason is that a price quoted after forty minutes of rapport can
                            be shaped by how much you seem able to pay. Here are ours, in advance, in public.
                        </p>

                        <div className="border-t border-white/15">
                            {tiers.map((tier, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6 md:gap-12 py-10 border-b border-white/10">
                                    <div>
                                        <div className={`text-6xl font-black tracking-tighter leading-none mb-2 ${tier.featured ? 'text-orange' : 'text-white'}`}>
                                            {tier.price}
                                        </div>
                                        <div className="text-sm font-bold text-white/50">
                                            {tier.name}, {tier.unit}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-lg text-white/90 font-medium leading-relaxed max-w-[56ch] mb-5">
                                            {tier.who}
                                        </p>
                                        <ul className="flex flex-wrap gap-x-6 gap-y-2">
                                            {tier.points.map((pt, j) => (
                                                <li key={j} className="flex items-center gap-2 text-sm font-bold text-white/70">
                                                    <Check size={14} strokeWidth={3} className="text-orange shrink-0" />
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-8 mt-12">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold bg-orange text-white hover:bg-orange-hover transition-colors shrink-0"
                            >
                                Get a quote <ArrowRight size={18} />
                            </Link>
                            <p className="text-white/50 font-medium leading-relaxed max-w-[54ch]">
                                No contracts on any of it. You own the domain, the hosting account, and the
                                code, and we transfer all three on request at no charge. Full breakdowns are on{' '}
                                <Link to="/web-design" className="text-orange font-bold hover:underline">web design</Link>,{' '}
                                <Link to="/maintenance" className="text-orange font-bold hover:underline">maintenance</Link>, and{' '}
                                <Link to="/website-maintenance-cost" className="text-orange font-bold hover:underline">maintenance cost</Link>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ─── INDUSTRIES ───
                    The only icon block left on the page, so it earns the icons. Denser
                    and quieter than the two sections above it; heading runs inline. */}
                <section className="py-16 md:py-20 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-3">
                            The Fresno businesses we know well.
                        </h2>
                        <p className="lede text-lg text-gray font-medium leading-relaxed max-w-[62ch] mb-12">
                            A restaurant site and a roofing site fail for completely different reasons. These
                            are the ones we have built enough of to know where each breaks before it breaks.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-9">
                            {industries.map((ind, i) => (
                                <div key={i} className="flex gap-4">
                                    <ind.icon size={20} className="text-orange shrink-0 mt-1" strokeWidth={2.25} />
                                    <div>
                                        <h3 className="text-base font-black text-dark mb-1.5 tracking-tight">{ind.name}</h3>
                                        <p className="text-gray font-medium leading-relaxed">{ind.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── PROCESS (reused) ─── */}
                <ProcessSection />

                {/* ─── STATS (reused, orange bar) ─── */}
                <StatsSection />

                {/* ─── SERVICE AREA: real geography, and the internal links that were missing ─── */}
                <section className="py-24 md:py-28 px-6 bg-light">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-16 lg:gap-24 items-start">
                            <div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                                    Where we work.
                                </h2>
                                <p className="text-lg text-gray font-medium leading-relaxed mb-6">
                                    The office is at 6362 N Figarden Dr. #118, off Figarden between Herndon and
                                    Bullard. Most clients are inside twenty minutes of that door. We would still
                                    rather meet at your shop, because the things worth putting on the site are
                                    usually sitting in your yard.
                                </p>
                                <p className="text-lg text-gray font-medium leading-relaxed mb-8">
                                    We take walk-ins and on-site meetings across{' '}
                                    {neighborhoods.map((n, i) => (
                                        <span key={n}>
                                            <span className="text-dark font-bold">{n}</span>
                                            {i < neighborhoods.length - 2 ? ', ' : i === neighborhoods.length - 2 ? ', and ' : '. '}
                                        </span>
                                    ))}
                                    Anywhere past that, we work over a screen share and it makes no difference
                                    to the build.
                                </p>
                                <a
                                    href="https://www.google.com/maps/place/Boostify+USA+Web+Design+%26+SEO/@36.8250248,-119.8709754,17z/data=!3m2!1e3!4b1!4m6!3m5!1s0x809479893e14f2eb:0x4f3d031e35ffc106!8m2!3d36.8250248!4d-119.8684005!16s%2Fg%2F11cmpmyllw"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-bold text-dark hover:text-orange transition-colors"
                                >
                                    <MapPin size={18} className="text-orange" />
                                    <span className="border-b-2 border-dark/20 pb-0.5">Open the office in Google Maps</span>
                                </a>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-[0.13em] text-gray mb-6">
                                    Cities with their own page
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                                    {cityPages.map(city => (
                                        <Link
                                            key={city.to}
                                            to={city.to}
                                            className="flex items-center justify-between gap-2 bg-white border border-gray-light rounded-lg px-4 py-3 font-bold text-dark hover:border-dark hover:text-orange transition-colors"
                                        >
                                            {city.name}
                                            <ArrowUpRight size={15} className="text-gray shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                                <p className="text-gray font-medium leading-relaxed">
                                    Each of those pages covers pricing, timelines, and the questions we get
                                    most often in that city. If yours is not listed, we still build there,
                                    and{' '}
                                    <Link to="/local-marketing" className="text-dark font-bold hover:text-orange transition-colors">
                                        the Central Valley page
                                    </Link>{' '}
                                    covers the rest of the region.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── BLOG / SHOWCASE (reused) ─── */}
                <WorkShowcase />

                {/* ─── TESTIMONIALS (reused) ─── */}
                <TestimonialsSection />

                {/* ─── WORK WE TURN DOWN ───
                    Each row reads in three beats: the job, why it gets a no, and where
                    it should go instead. The redirect is the valuable part, so it gets
                    its own rule and label rather than running on inside the paragraph. */}
                <section className="py-24 md:py-32 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-dark mb-5 tracking-tight max-w-[20ch]">
                                Work we turn down, and where to send it.
                            </h2>
                            <p className="lede text-lg md:text-xl text-gray font-medium leading-relaxed max-w-[62ch]">
                                These come in most weeks and get turned down, which costs us money and saves you
                                more. Two of them go somewhere better and we will make the introduction. One of
                                them nobody should sell you at any price.
                            </p>
                        </div>

                        <div className="border-t border-dark/15">
                            {turndown.map((item, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-[1.6rem_1fr] gap-x-5 gap-y-4 py-9 border-b border-dark/10">
                                    <span
                                        aria-hidden="true"
                                        className="hidden md:flex items-center justify-center w-6 h-6 rounded-full border-2 border-dark/20 mt-1"
                                    >
                                        <span className="block w-2.5 h-0.5 bg-dark/40 rounded-full" />
                                    </span>

                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black text-dark tracking-tight mb-3">
                                            {item.job}
                                        </h3>
                                        <p className="text-gray font-medium leading-relaxed max-w-[64ch] mb-5">
                                            {item.why}
                                        </p>
                                        <div className="border-l-2 border-orange pl-5">
                                            <p className="text-[0.7rem] font-bold uppercase tracking-[0.13em] text-orange-hover mb-1">
                                                Instead
                                            </p>
                                            <p className="font-bold text-dark leading-relaxed max-w-[58ch]">
                                                {item.instead}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── HOW TO VET AN AGENCY (including us) ───
                    Heading sits in a left rail so the five questions read straight down
                    one column. Five items in a two-up grid would leave a hole. */}
                <section className="py-20 md:py-24 px-6 bg-light">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[19rem_1fr] gap-10 lg:gap-20 items-start">
                            <div className="lg:sticky lg:top-28">
                                <h2 className="text-2xl md:text-3xl font-black text-dark mb-3 tracking-tight">
                                    Five questions that separate an agency from a lead-gen mill.
                                </h2>
                                <p className="lede text-gray font-medium leading-relaxed">
                                    Ask us. Then ask the next three shops you call. A portfolio only shows you
                                    the work that went well.
                                </p>
                            </div>

                            <ol className="border-t border-dark/10">
                                {vetting.map((item, i) => (
                                    <li key={i} className="py-6 border-b border-dark/10">
                                        <h3 className="text-lg font-black text-dark mb-2 tracking-tight max-w-[52ch]">
                                            {item.q}
                                        </h3>
                                        <p className="text-gray font-medium leading-relaxed max-w-[62ch]">
                                            {item.a}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ───
                    Native <details> so answers ship in the static HTML. Marker reset
                    covers WebKit too; see faq-details in index.css. */}
                <section className="py-20 md:py-24 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[18ch] mb-12">
                            Fresno web design questions we get every week.
                        </h2>

                        <div className="border-t border-dark/15 max-w-5xl">
                            {faqs.map((faq, i) => (
                                <details key={i} className="faq-details group border-b border-dark/10">
                                    <summary className="flex items-start justify-between gap-6 cursor-pointer py-6 -mx-3 px-3 rounded-md hover:bg-dark/[0.03] transition-colors">
                                        <h3 className="text-lg md:text-xl font-black text-dark tracking-tight max-w-[46ch]">
                                            {faq.q}
                                        </h3>
                                        <ChevronDown
                                            size={22}
                                            aria-hidden="true"
                                            className="text-orange shrink-0 mt-1 transition-transform duration-200 group-open:rotate-180"
                                        />
                                    </summary>
                                    <p className="text-gray font-medium leading-relaxed pb-7 max-w-[62ch]">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>

                        <p className="flex items-start gap-3 mt-10 text-gray font-medium leading-relaxed max-w-[62ch]">
                            <Phone size={18} className="text-orange shrink-0 mt-1" strokeWidth={2.5} aria-hidden="true" />
                            <span>
                                Not covered here? Call{' '}
                                <a href="tel:+15597853834" className="text-dark font-bold hover:text-orange transition-colors">(559) 785-3834</a>{' '}
                                and ask. We will tell you on the first call whether we are the right shop
                                for the job, including when the answer is no.
                            </span>
                        </p>
                    </div>
                </section>

                {/* ─── CTA (reused) ─── */}
                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
