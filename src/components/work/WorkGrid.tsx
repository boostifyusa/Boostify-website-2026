import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { portfolio, host, type PortfolioItem, type Service } from '../../data/portfolio';
import { BrowserFrame, PhoneFrame, PhoneScroll, ScrollShot, useIsPhone } from './Frames';
import './work.css';

const FILTERS: ('All' | Service)[] = ['All', 'Web design', 'Local SEO', 'Branding', 'E-commerce', 'Google Ads', 'Hosting & care'];

// forwardRef: AnimatePresence's popLayout mode measures each card through a ref.
const Card = forwardRef<HTMLButtonElement, { p: PortfolioItem; onOpen: () => void }>(function Card({ p, onOpen }, ref) {
  const [hover, setHover] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  // Touch screens have no hover: play the scroll while the card sits in the middle of the screen.
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches || !box.current) return;
    const io = new IntersectionObserver(([e]) => setHover(e.isIntersecting), { rootMargin: '-38% 0px -38% 0px' });
    io.observe(box.current); return () => io.disconnect();
  }, []);
  return (
    <motion.button
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="group text-left block w-full focus:outline-none"
      aria-label={`${p.name}: see what we did`}
    >
      <div ref={box} className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
        <BrowserFrame url={host(p.url)}>
          <ScrollShot hero={p.media.heroSm} full={p.media.full} alt={`${p.name} website`} live={hover} speed={340} />
          <div className="absolute inset-x-0 bottom-0 p-4 flex justify-end opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-dark/85 text-white text-xs font-bold px-3 py-1.5 backdrop-blur">See what we did <ArrowRight className="w-3.5 h-3.5" /></span>
          </div>
        </BrowserFrame>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-dark group-hover:text-orange transition-colors">{p.name}</h3>
          <div className="text-sm text-gray font-medium mt-1">{p.industry}{p.city ? ` · ${p.city}` : ''}</div>
        </div>
        <div className="hidden sm:block text-[11px] font-bold uppercase tracking-wider text-dark/40 text-right leading-5 shrink-0 max-w-[45%]">{p.services.slice(0, 2).join(' · ')}</div>
      </div>
    </motion.button>
  );
});

function Panel({ p, onClose, onPrev, onNext }: { p: PortfolioItem; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const views = useMemo(() => [
    { key: 'home', label: 'Home', hero: p.media.hero, full: p.media.full },
    ...p.media.inner.map((x, n) => ({ key: `i${n}`, label: x.title || x.path, hero: x.src, full: x.full })),
  ], [p]);
  const [v, setV] = useState(0);
  useEffect(() => setV(0), [p.slug]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onNext(); if (e.key === 'ArrowLeft') onPrev(); };
    window.addEventListener('keydown', onKey);
    const o = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = o; };
  }, [onClose, onNext, onPrev]);
  const view = views[v];
  const phone = useIsPhone();
  const visit = p.archived ? (
    <p className="text-sm text-gray font-medium leading-relaxed border-l-2 border-gray-light pl-4 max-w-[40ch]">
      Our build, shown as we delivered it. The client has since moved to another provider, so the live site is no longer ours.
    </p>
  ) : (
    <a href={p.url} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 bg-dark hover:bg-orange text-white font-bold px-6 py-3.5 rounded-lg transition-colors self-start">
      Visit {host(p.url)} <ArrowUpRight className="w-4 h-4" />
    </a>
  );

  if (phone) {
    // Phone: a full-height sheet. The client's own phone view leads, the header (and the close
    // button) stays pinned, and the desktop pages follow as a swipe row.
    return (
      // Own keys: the layout flips to phone after load, and reusing the desktop dialog mid fade-in
      // left this sheet stuck at opacity 0.
      <motion.div key="phone-sheet" className="fixed inset-0 z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-dark/80" onClick={onClose} />
        <motion.div
          role="dialog" aria-modal="true" aria-label={p.name} key={p.slug + ':phone'}
          initial={{ y: '100%', opacity: 1 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.2, 0.7, 0.2, 1] } }} exit={{ y: '100%', transition: { duration: 0.3 } }}
          className="absolute inset-x-0 bottom-0 top-3 bg-white rounded-t-3xl overflow-y-auto overscroll-contain"
        >
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-light flex items-center gap-3 px-5 py-3 rounded-t-3xl">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-orange truncate">{p.industry}{p.city ? ` · ${p.city}` : ''}</div>
              <div className="text-lg font-black tracking-tight text-dark truncate">{p.name}</div>
            </div>
            <button onClick={onClose} aria-label="Close" className="shrink-0 w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center"><X className="w-5 h-5" /></button>
          </div>
          {p.media.mobile && (
            <div className="bg-light px-5 pt-7 pb-8">
              <div className="mx-auto w-[62%] max-w-[260px]">
                {p.media.mobileFull
                  ? <PhoneScroll poster={p.media.mobile} full={p.media.mobileFull} alt={`${p.name} on a phone`} live url={host(p.url)} top={p.media.mobileTop} />
                  : <PhoneFrame src={p.media.mobile} alt={`${p.name} on a phone`} url={host(p.url)} top={p.media.mobileTop} />}
              </div>
            </div>
          )}
          <div className="px-5 pt-7 pb-4">
            <p className="text-lg text-gray font-medium leading-relaxed mb-7">{p.summary}</p>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-dark/45 mb-3">What we did</div>
            <ul className="space-y-2 mb-6">
              {p.services.map(x => <li key={x} className="flex items-center gap-3 font-bold text-dark"><span className="w-1.5 h-1.5 rounded-full bg-orange" />{x}</li>)}
            </ul>
            {p.stack && <div className="text-sm text-gray font-medium mb-7">Built on {p.stack}</div>}
            {visit}
          </div>
          <div className="pt-6 pb-2">
            <div className="px-5 text-xs font-bold uppercase tracking-[0.14em] text-dark/45 mb-3">On a desktop</div>
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {views.map(x => (
                <div key={x.key} className="snap-start shrink-0 w-[82%]">
                  <BrowserFrame url={host(p.url) + (x.key === 'home' ? '' : p.media.inner[views.indexOf(x) - 1]?.path || '')}>
                    <img src={x.hero} alt={`${p.name}, ${x.label}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
                  </BrowserFrame>
                  <div className="mt-2 text-xs font-bold text-dark/60">{x.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-5 py-6 flex items-center justify-between border-t border-gray-light mt-4">
            <button onClick={onPrev} className="inline-flex items-center gap-2 font-bold text-dark/60"><ArrowLeft className="w-4 h-4" /> Previous</button>
            <button onClick={onNext} className="inline-flex items-center gap-2 font-bold text-dark/60">Next <ArrowRight className="w-4 h-4" /></button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog" aria-modal="true" aria-label={p.name}
        key={p.slug}
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] } }} exit={{ y: 30, opacity: 0 }}
        className="relative w-full max-w-7xl max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl md:rounded-3xl shadow-2xl"
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center hover:bg-orange transition-colors"><X className="w-5 h-5" /></button>
        <div className="grid lg:grid-cols-[1.55fr_1fr]">
          <div className="bg-light p-5 md:p-8 lg:rounded-l-3xl">
            <div className="relative">
              <BrowserFrame url={host(p.url) + (view.key === 'home' ? '' : p.media.inner[v - 1]?.path || '')}>
                <ScrollShot key={view.key} hero={view.hero} full={view.full} alt={`${p.name}, ${view.label}`} live speed={300} eager />
              </BrowserFrame>
              {p.media.mobile && v === 0 && (
                <div className="hidden md:block absolute -bottom-6 -right-4 w-[19%]"><PhoneFrame src={p.media.mobile} alt={`${p.name} on a phone`} url={host(p.url)} top={p.media.mobileTop} /></div>
              )}
            </div>
            {views.length > 1 && (
              <div className="mt-8 md:mt-10 grid grid-cols-4 gap-3">
                {views.map((x, n) => (
                  <button key={x.key} onClick={() => setV(n)} className={`text-left rounded-lg p-1.5 transition-colors ${n === v ? 'bg-white ring-2 ring-orange' : 'hover:bg-white'}`}>
                    <img src={x.hero} alt="" loading="lazy" className="w-full aspect-[16/10] object-cover object-top rounded" />
                    <div className="mt-1.5 text-[11px] font-bold text-dark/70 truncate">{x.label}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-6 md:p-10 flex flex-col">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-orange mb-3">{p.industry}{p.city ? ` · ${p.city}` : ''}</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-dark leading-[0.95] mb-5">{p.name}</h2>
            <p className="text-lg text-gray font-medium leading-relaxed mb-8">{p.summary}</p>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-dark/45 mb-3">What we did</div>
            <ul className="space-y-2 mb-8">
              {p.services.map(s => <li key={s} className="flex items-center gap-3 font-bold text-dark"><span className="w-1.5 h-1.5 rounded-full bg-orange" />{s}</li>)}
            </ul>
            {p.stack && <div className="text-sm text-gray font-medium mb-8">Built on {p.stack}</div>}
            {visit}
            <div className="mt-auto pt-10 flex items-center justify-between">
              <button onClick={onPrev} className="inline-flex items-center gap-2 font-bold text-dark/60 hover:text-orange transition-colors"><ArrowLeft className="w-4 h-4" /> Previous</button>
              <button onClick={onNext} className="inline-flex items-center gap-2 font-bold text-dark/60 hover:text-orange transition-colors">Next <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WorkGrid() {
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState<'All' | Service>('All');
  const list = useMemo(() => portfolio.filter(p => filter === 'All' || p.services.includes(filter)), [filter]);
  const openSlug = params.get('p');
  const idx = list.findIndex(p => p.slug === openSlug);
  const open = openSlug ? portfolio.find(p => p.slug === openSlug) : undefined;
  const setOpen = (slug: string | null) => { const n = new URLSearchParams(params); if (slug) n.set('p', slug); else n.delete('p'); setParams(n, { replace: !!slug && !!openSlug }); };
  const step = (d: number) => { const arr = idx >= 0 ? list : portfolio; const at = arr.findIndex(p => p.slug === openSlug); setOpen(arr[(at + d + arr.length) % arr.length].slug); };
  const available = FILTERS.filter(f => f === 'All' || portfolio.some(p => p.services.includes(f as Service)));

  return (
    <section className="px-6 pb-28" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-2 mb-10 md:mb-12 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Filter by service">
          {available.map(f => {
            return (
              <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-colors ${filter === f ? 'bg-dark text-white' : 'bg-light text-dark/70 hover:text-dark'}`}>
                {f}
              </button>
            );
          })}
        </div>
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          <AnimatePresence mode="popLayout">
            {list.map(p => <Card key={p.slug} p={p} onOpen={() => setOpen(p.slug)} />)}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>{open && <Panel key="panel" p={open} onClose={() => setOpen(null)} onPrev={() => step(-1)} onNext={() => step(1)} />}</AnimatePresence>
    </section>
  );
}
