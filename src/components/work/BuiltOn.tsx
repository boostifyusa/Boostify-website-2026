import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { portfolio, host, type PortfolioItem } from '../../data/portfolio';
import { BrowserFrame, PhoneScroll } from './Frames';
import './work.css';

// The /web-design page argues that the platform follows the job. This is the proof for that
// argument: answers from the platform table, each with the client sites we built
// on it. The phone is the thing that moves, because the page's other claim is that the phone is
// what your customers are holding.
const GROUPS: { key: string; label: string; why: string; slugs: string[] }[] = [
  {
    key: 'code',
    label: 'Hand-coded',
    why: 'Written for the one business, with no theme or plugin stack underneath. It loads fast and there is very little that can break.',
    slugs: ['blc-custom-homes', 'sequoia-air-co', 'copper-crest', 'triple-c-pressure-washing', 'the-hmong-inc', 'fresno-management-company', 'high-throne-rentals'],
  },
  {
    key: 'wp',
    label: 'WordPress',
    why: 'For owners and staff who publish and edit the site themselves. The editor is the whole reason to pick it.',
    slugs: ['green-and-clean', 'fresno-state-today', 'martin-energy', 'shelby-pools', 'headquarters-window-tint'],
  },
];

const bySlug = new Map(portfolio.map(p => [p.slug, p]));
const groups = GROUPS
  .map(g => ({ ...g, items: g.slugs.map(s => bySlug.get(s)).filter((p): p is PortfolioItem => !!p) }))
  .filter(g => g.items.length);

export function BuiltOn() {
  const [g, setG] = useState(0);
  const [sel, setSel] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);

  if (!groups.length) return null;
  const group = groups[g];
  const p = group.items[Math.min(sel, group.items.length - 1)];
  const pick = (n: number) => { setG(n); setSel(0); };

  return (
    <section ref={ref} className="pt-2 pb-20 md:pb-24 px-6 bg-white" aria-labelledby="built-on-title">
      <div className="max-w-7xl mx-auto border-t border-gray-light pt-14 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-end mb-10 md:mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange-hover mb-3">Our work</p>
            <h2 id="built-on-title" className="text-4xl md:text-5xl font-black text-dark tracking-tight max-w-[18ch] mb-4">
              What we built, and what we built it on.
            </h2>
            <p className="text-lg text-gray font-medium leading-relaxed max-w-[60ch]">
              Client sites built on each option in the table above. They’re shown on a phone because that’s where most of their customers see them.
            </p>
          </div>
          {/* platform switch */}
          <div role="tablist" aria-label="Platform" className="inline-flex self-start lg:self-end rounded-full bg-light p-1.5 gap-1 overflow-x-auto max-w-full">
            {groups.map((x, n) => (
              <button
                key={x.key}
                role="tab"
                aria-selected={n === g}
                onClick={() => pick(n)}
                className={`relative shrink-0 rounded-full px-3 sm:px-4 md:px-5 py-2.5 text-[13px] sm:text-sm font-bold transition-colors ${n === g ? 'text-white' : 'text-dark/60 hover:text-dark'}`}
              >
                {n === g && <motion.span layoutId="builton-pill" className="absolute inset-0 rounded-full bg-dark" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,21rem)_1fr] gap-6 lg:gap-16 items-start">
          <div>
            <AnimatePresence mode="wait">
              <motion.p
                key={group.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="text-dark font-bold leading-relaxed mb-6 pl-4 border-l-[3px] border-orange"
              >
                {group.why}
              </motion.p>
            </AnimatePresence>
            {/* wide screens: the list beside the stage */}
            <ul className="hidden lg:block border-t border-gray-light">
              {group.items.map((it, n) => {
                const on = it.slug === p.slug;
                return (
                  <li key={it.slug} className="border-b border-gray-light">
                    <button
                      onClick={() => setSel(n)}
                      aria-pressed={on}
                      className={`group relative w-full text-left py-4 pl-5 pr-2 transition-colors ${on ? 'bg-light/70' : 'hover:bg-light/40'}`}
                    >
                      <span className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors ${on ? 'bg-orange' : 'bg-transparent'}`} />
                      <span className="flex items-baseline justify-between gap-4">
                        <span className={`font-black tracking-tight ${on ? 'text-dark' : 'text-dark/70 group-hover:text-dark'}`}>{it.name}</span>
                        {it.stack && <span className="text-[11px] font-bold text-dark/40 shrink-0">{it.stack}</span>}
                      </span>
                      <span className="block text-sm text-gray font-medium mt-0.5">{it.industry}{it.city ? `, ${it.city}` : ''}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* phones and tablets: a swipeable row right above the stage, so a tap changes what is on screen */}
            {group.items.length > 1 && (
              <div className="lg:hidden -mx-6 px-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {group.items.map((it, n) => {
                  const on = it.slug === p.slug;
                  return (
                    <button key={it.slug} onClick={() => setSel(n)} aria-pressed={on}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold border transition-colors ${on ? 'bg-dark text-white border-dark' : 'bg-white text-dark/70 border-gray-light'}`}>
                      {it.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* the stage */}
          <div>
            <div className="relative rounded-2xl bg-light/70 border border-gray-light overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.28]"
                style={{ backgroundImage: 'url(/hero-bg-pattern.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                aria-hidden="true"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.slug}
                  className="relative px-5 py-8 md:p-0 md:aspect-[16/10.6]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.18 } }}
                >
                  {/* desktop, set back and to the right */}
                  <motion.div
                    className="hidden md:block absolute right-[4%] top-[17%] w-[66%]"
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } }}
                  >
                    <BrowserFrame url={host(p.url)}>
                      <img src={p.media.hero} alt={`${p.name} website on a desktop`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
                    </BrowserFrame>
                  </motion.div>
                  {/* phone, in front and moving; it just overlaps the desktop's edge so it never covers a headline */}
                  {p.media.mobile && (
                    <motion.div
                      className="relative mx-auto w-[58%] max-w-[250px] md:absolute md:mx-0 md:left-[5.5%] md:top-[6%] md:w-[26%] md:max-w-none"
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.15, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } }}
                    >
                      <PhoneScroll poster={p.media.mobile} full={p.media.mobileFull} alt={`${p.name} website on a phone`} live={inView} url={host(p.url)} top={p.media.mobileTop} />
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={p.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  className="text-gray font-medium leading-relaxed max-w-[56ch]"
                >
                  <span className="font-black text-dark">{p.name}. </span>{p.summary}
                </motion.p>
              </AnimatePresence>
              <div className="flex items-center gap-5 shrink-0">
                <Link to={`/work?p=${p.slug}`} className="inline-flex items-center gap-1.5 font-bold text-dark hover:text-orange transition-colors">
                  The project <ArrowRight size={16} />
                </Link>
                <a href={p.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-bold text-dark/60 hover:text-orange transition-colors">
                  {host(p.url)} <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
