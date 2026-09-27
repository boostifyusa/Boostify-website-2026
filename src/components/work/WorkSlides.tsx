import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { featured, host, type PortfolioItem } from '../../data/portfolio';
import { BrowserFrame, PhoneFrame, PhoneScroll, ScrollShot, useIsPhone } from './Frames';
import './work.css';

const SLIDE_MS = 8000;

/**
 * Phones get a native swipe row instead of the timed slides: each client as their own phone view,
 * the one in the middle scrolling its real mobile page. No autoplay, the thumb drives it.
 */
function PhoneSlides({ items }: { items: PortfolioItem[] }) {
  const sec = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sec.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    const el = row.current; if (!el) return;
    const on = () => {
      const mid = el.scrollLeft + el.clientWidth / 2; let best = 0, d = Infinity;
      [...el.children].forEach((c, k) => { const h = c as HTMLElement; const dd = Math.abs(h.offsetLeft + h.offsetWidth / 2 - mid); if (dd < d) { d = dd; best = k; } });
      setActive(best);
    };
    el.addEventListener('scroll', on, { passive: true }); on();
    return () => el.removeEventListener('scroll', on);
  }, []);
  const goTo = (k: number) => {
    const el = row.current; const c = el?.children[k] as HTMLElement | undefined;
    if (el && c) el.scrollTo({ left: c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <section ref={sec} aria-roledescription="carousel" aria-label="Client websites we built" className="relative overflow-hidden bg-dark text-white py-16">
      <div className="absolute inset-0 wk-grain opacity-60 pointer-events-none" />
      <div className="relative px-6 mb-9">
        <div className="text-xs font-bold uppercase tracking-[0.14em] text-orange mb-3">Our work</div>
        <h2 className="text-4xl font-black tracking-tight leading-[0.95] mb-5">Some of the sites we’ve built.</h2>
        <Link to="/work" className="inline-flex items-center gap-2 font-bold text-white/80">See more of our work <ArrowRight className="w-4 h-4" /></Link>
      </div>
      <div ref={row} className="relative flex gap-3 overflow-x-auto snap-x snap-mandatory px-[12vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((p, k) => {
          const on = k === active;
          return (
            <div key={p.slug} className="snap-center shrink-0 w-[76vw] max-w-[320px]">
              <Link to={`/work?p=${p.slug}`} className="block" aria-label={`${p.name}: see the project`}>
                <div className={`mx-auto w-[68%] transition-all duration-500 ${on ? 'scale-100 opacity-100' : 'scale-[0.9] opacity-50'}`}>
                  {p.media.mobile && (on && p.media.mobileFull
                    ? <PhoneScroll poster={p.media.mobile} full={p.media.mobileFull} alt={`${p.name} on a phone`} live={inView} url={host(p.url)} top={p.media.mobileTop} />
                    : <PhoneFrame src={p.media.mobile} alt={`${p.name} on a phone`} url={host(p.url)} top={p.media.mobileTop} />)}
                </div>
                <div className={`mt-5 text-center transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="text-2xl font-black tracking-tight leading-tight">{p.name}</div>
                  <div className="text-sm text-white/55 font-medium mt-1">{p.industry}{p.city ? ` · ${p.city}` : ''}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-orange">See the project <ArrowRight className="w-4 h-4" /></div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="relative mt-7 flex justify-center gap-1.5">
        {items.map((it, k) => (
          <button key={it.slug} onClick={() => goTo(k)} aria-label={`Show ${it.name}`} aria-current={k === active}
            className={`h-1.5 rounded-full transition-all duration-300 ${k === active ? 'w-6 bg-orange' : 'w-1.5 bg-white/25'}`} />
        ))}
      </div>
    </section>
  );
}

/** Homepage work slides: one client at a time, the real site scrolling in a browser frame. */
export function WorkSlides() {
  const items = featured;
  const phone = useIsPhone();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<number>();

  const go = useCallback((n: number) => {
    setDir(n > i || (i === items.length - 1 && n === 0) ? 1 : -1);
    setI((n + items.length) % items.length);
  }, [i, items.length]);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || phone) return;
    timer.current = window.setTimeout(() => go(i + 1), SLIDE_MS);
    return () => window.clearTimeout(timer.current);
  }, [i, inView, paused, phone, go]);

  if (!items.length) return null;
  if (phone) return <PhoneSlides items={items} />;
  const p = items[i];

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Client websites we built"
      className="relative overflow-hidden bg-dark text-white py-24 md:py-32 px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={e => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); }}
    >
      <div className="absolute inset-0 wk-grain opacity-60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] invert" style={{ backgroundImage: 'url(/hero-bg-pattern.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-16">
          <div>
            <div className="text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-orange mb-4">Our work</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] max-w-[16ch]">Some of the sites we’ve built.</h2>
          </div>
          <Link to="/work" className="inline-flex items-center gap-2 font-bold text-white/80 hover:text-orange transition-colors">
            See more of our work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.5fr] gap-10 lg:gap-14 items-center">
          {/* Copy */}
          <div className="relative min-h-[300px] order-2 lg:order-1" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={p.slug}
                custom={dir}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] } }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
              >
                <div className="font-mono text-sm text-white/40 mb-5">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] mb-4">{p.name}</h3>
                <div className="text-white/60 font-medium mb-6">{p.industry}{p.city ? ` · ${p.city}` : ''}</div>
                <p className="text-lg text-white/80 leading-relaxed max-w-[44ch] mb-7">{p.summary}</p>
                <ul className="flex flex-wrap gap-2 mb-8">
                  {p.services.map(s => <li key={s} className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/15 text-white/75">{s}</li>)}
                </ul>
                <div className="flex flex-wrap items-center gap-5">
                  <Link to={`/work?p=${p.slug}`} className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-bold px-6 py-3.5 rounded-lg transition-colors">
                    See the project <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href={p.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-bold text-white/70 hover:text-white transition-colors">
                    {host(p.url)} <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stage */}
          <div className="relative order-1 lg:order-2">
            <div className="relative">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={p.slug}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 60, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } }}
                  exit={{ opacity: 0, x: dir * -40, scale: 0.97, transition: { duration: 0.35 } }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => { if (info.offset.x < -60) go(i + 1); else if (info.offset.x > 60) go(i - 1); }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <BrowserFrame url={host(p.url)} tone="dark">
                    <ScrollShot hero={p.media.hero} full={p.media.full} alt={`${p.name} website`} live={inView} eager={i === 0} delay={1800} maxScreens={2.2} speed={220} />
                  </BrowserFrame>
                </motion.div>
              </AnimatePresence>
              {p.media.mobile && (
                <motion.div
                  key={p.slug + '-m'}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } }}
                  className="hidden md:block absolute -bottom-10 -left-8 w-[21%] pointer-events-none"
                >
                  <PhoneFrame src={p.media.mobile} alt={`${p.name} on a phone`} url={host(p.url)} top={p.media.mobileTop} />
                </motion.div>
              )}
            </div>
            {/* preload the next hero */}
            <link rel="prefetch" href={items[(i + 1) % items.length].media.hero} />
          </div>
        </div>

        {/* Progress + controls */}
        <div className="mt-16 md:mt-20 flex items-center gap-6">
          <button onClick={() => go(i - 1)} aria-label="Previous project" className="shrink-0 w-11 h-11 rounded-full border border-white/15 hover:border-orange hover:text-orange flex items-center justify-center transition-colors"><ArrowLeft className="w-4 h-4" /></button>
          <ol className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
            {items.map((it, n) => (
              <li key={it.slug}>
                <button onClick={() => go(n)} className="group w-full text-left" aria-label={`Show ${it.name}`} aria-current={n === i}>
                  <div
                    className={`wk-progress h-[3px] rounded-full bg-white/15 overflow-hidden ${n < i ? 'is-done' : ''} ${n === i ? 'is-active' : ''} ${paused || !inView ? 'is-paused' : ''}`}
                    style={{ ['--wk-slide' as string]: `${SLIDE_MS}ms` }}
                  >
                    <span key={n === i ? `a${i}` : 'x'} className="block h-full bg-orange" />
                  </div>
                  <div className={`hidden md:block mt-3 text-xs font-bold truncate transition-colors ${n === i ? 'text-white' : 'text-white/35 group-hover:text-white/70'}`}>{it.name}</div>
                </button>
              </li>
            ))}
          </ol>
          <button onClick={() => go(i + 1)} aria-label="Next project" className="shrink-0 w-11 h-11 rounded-full border border-white/15 hover:border-orange hover:text-orange flex items-center justify-center transition-colors"><ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>
    </section>
  );
}
