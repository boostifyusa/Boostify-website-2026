import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Check,
  Instagram,
  Facebook,
  MapPin,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { SeoHead } from '../../components/SeoHead';
import { CheckShell, Eyebrow, Highlight } from './CheckShell';

/* The three lead paths from the talk — ordered as a natural funnel, shown as
   editorial numbered rows (the deck/agenda primitive), not icon-card grids. */
const moves = [
  {
    to: '/seo-audit',
    title: 'Free Local SEO Audit',
    desc: 'See your real Google Map rankings, live, in under a minute.',
  },
  {
    to: '/check/consult',
    title: 'Free Consult',
    desc: 'A real conversation about getting found. No pressure.',
  },
  {
    to: '/check/appointment',
    title: 'Book an Appointment',
    desc: 'Pick a time and we will meet you, in person or online.',
  },
];

const trust = ['5.0 on Google', 'Family-run since 2014', 'Fresno, CA'];

const explore = [
  { to: '/', label: 'Our website' },
  { to: '/work', label: 'See our work' },
];

const social = [
  { href: 'https://www.instagram.com/boostifyusa/', icon: Instagram, label: 'Instagram' },
  { href: 'https://www.facebook.com/boostifyusa/', icon: Facebook, label: 'Facebook' },
  { href: 'https://g.co/kgs/boostifyusa', icon: MapPin, label: 'Google Business' },
];

export function CheckHubPage() {
  const reduce = useReducedMotion();

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
  };
  const item = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <CheckShell>
      <SeoHead
        title="Get Seen. Get Hired. — Boostify USA"
        description="Your next move after the talk: a free Local SEO audit with real-time rankings, a free consult, or book a time with Boostify USA. Fresno, CA."
        canonicalUrl="/check"
      />

      {/* Intro */}
      <div className="mb-10">
        <Eyebrow>Table Mountain &middot; Native Summit</Eyebrow>
        <h1 className="text-[2.7rem] leading-[0.92] sm:text-6xl font-black text-dark tracking-tighter mb-5">
          Get seen.
          <br />
          Get <Highlight>hired.</Highlight>
        </h1>
        <p className="text-lg text-gray font-medium leading-relaxed">
          Thanks for stopping by. Pick your next move below. Each one is free and
          takes about a minute.
        </p>

        {/* Trust row — the site's check style */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-dark uppercase tracking-wide">
          {trust.map((t) => (
            <span key={t} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange" strokeWidth={3} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Primary moves — numbered editorial rows */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="mb-10">
        {moves.map((m, i) => (
          <motion.div variants={item} key={m.to}>
            <Link
              to={m.to}
              className="group flex items-center gap-5 py-5 border-t border-gray-light last:border-b last:border-gray-light hover:pl-1 transition-[padding] duration-300"
            >
              <span className="text-3xl font-black text-orange tracking-tighter tabular-nums w-9 shrink-0 leading-none">
                {i + 1}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-xl font-black text-dark tracking-tight leading-tight">
                  {m.title}
                </span>
                <span className="block text-sm text-gray font-medium leading-snug mt-0.5">
                  {m.desc}
                </span>
              </span>
              <ArrowRight
                size={22}
                className="text-gray/30 group-hover:text-orange group-hover:translate-x-1 transition-all shrink-0"
                strokeWidth={2.5}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Explore — quiet text links, not a second card grid */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
        {explore.map((e) => (
          <Link
            key={e.to}
            to={e.to}
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-dark hover:text-orange transition-colors"
          >
            {e.label}
            <ArrowUpRight
              size={15}
              className="text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              strokeWidth={2.5}
            />
          </Link>
        ))}
      </div>

      {/* Social */}
      <div className="flex items-center gap-3 pt-6 border-t border-gray-light">
        {social.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-10 h-10 rounded-lg border border-gray-light flex items-center justify-center text-gray hover:text-white hover:bg-orange hover:border-orange transition-all"
          >
            <s.icon size={18} strokeWidth={2} />
          </a>
        ))}
      </div>
    </CheckShell>
  );
}
