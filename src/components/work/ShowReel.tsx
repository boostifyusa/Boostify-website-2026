import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { featured, host, portfolio, type PortfolioItem } from '../../data/portfolio';
import { BrowserFrame, PhoneFrame, PhoneScroll, ScrollShot } from './Frames';
import './work.css';

/** Tilted, endlessly scrolling wall of client homepages. Pure CSS motion. */
export function WorkWall({ className = '' }: { className?: string }) {
  const shots = portfolio.map(p => p.media.heroSm);
  const rows = [0, 1, 2, 3].map(r => shots.filter((_, k) => k % 4 === r));
  return (
    <div className={`wk-wall absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <div className="wk-wall-plane absolute -inset-x-[20%] top-[-18%] flex flex-col gap-[18px]">
        {rows.map((row, r) => (
          <div key={r} className={`wk-row ${r % 2 ? 'is-reverse' : ''}`} style={{ ['--wk-speed' as string]: `${70 + r * 14}s` }}>
            {[...row, ...row, ...row, ...row].map((src, k) => (
              <div key={k} className="w-[300px] md:w-[380px] shrink-0 rounded-lg overflow-hidden ring-1 ring-white/10 bg-[#1a1a1a]">
                <img src={src} alt="" loading="lazy" decoding="async" className="block w-full aspect-[16/10] object-cover object-top" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const INTRO_MS = 2800;
const SCENE_MS = 5600;
const END_MS = 4400;
const EASE = [0.2, 0.7, 0.2, 1] as const;

type Scene = { kind: 'intro' } | { kind: 'site'; p: PortfolioItem; n: number } | { kind: 'end' };

/** Client name set huge behind the scene, drifting left. */
function Ghost({ text }: { text: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-black tracking-tighter leading-none text-white/[0.035] text-[clamp(80px,17vw,260px)] pointer-events-none"
      initial={{ x: '6%' }}
      animate={{ x: '-14%', transition: { duration: SCENE_MS / 1000 + 1, ease: 'linear' } }}
    >
      {text}
    </motion.div>
  );
}

function NameCard({ p, n, align = 'right' }: { p: PortfolioItem; n: number; align?: 'left' | 'right' }) {
  const r = align === 'right';
  return (
    <motion.div
      className={r ? 'text-right' : 'text-left'}
      initial={{ opacity: 0, x: r ? 30 : -30 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.7, duration: 0.6, ease: EASE } }}
    >
      <div className="font-mono text-[clamp(9px,1vw,13px)] text-orange mb-2">{String(n).padStart(2, '0')}</div>
      <div className="text-white font-black tracking-tight leading-[0.95] text-[clamp(18px,2.6vw,40px)]">{p.name}</div>
      <div className="text-white/55 font-medium mt-2 text-[clamp(10px,1.1vw,15px)]">{p.industry}{p.city ? `, ${p.city}` : ''}</div>
      <div className={`mt-3 flex flex-wrap gap-1.5 ${r ? 'justify-end' : ''}`}>
        {p.services.slice(0, 3).map(x => <span key={x} className="text-[clamp(8px,0.8vw,11px)] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-white/15 text-white/70">{x}</span>)}
      </div>
    </motion.div>
  );
}

/** Desktop scrolling a couple of screens, phone rising in front of its corner. */
function SplitScene({ p, n, live }: { p: PortfolioItem; n: number; live: boolean }) {
  return (
    <>
      <motion.div
        className="absolute left-[6%] top-[11%] w-[60%]"
        initial={{ opacity: 0, x: 80, rotateY: -14, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1, transition: { duration: 0.9, ease: EASE } }}
        style={{ transformPerspective: 1600 }}
      >
        <BrowserFrame url={host(p.url)} tone="dark">
          <ScrollShot hero={p.media.hero} full={p.media.full} alt={`${p.name} website`} live={live} eager delay={2000} maxScreens={1.4} speed={320} />
        </BrowserFrame>
      </motion.div>
      {p.media.mobile && (
        <motion.div
          className="absolute left-[58%] top-[27%] w-[12.5%]"
          initial={{ opacity: 0, y: 70, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 0, transition: { delay: 0.45, duration: 0.8, ease: EASE } }}
        >
          <PhoneFrame src={p.media.mobile} alt={`${p.name} on a phone`} url={host(p.url)} top={p.media.mobileTop} />
        </motion.div>
      )}
      <div className="absolute right-[5%] bottom-[14%] w-[24%]"><NameCard p={p} n={n} /></div>
    </>
  );
}

/** Home and two inner pages fanned out in depth: shows it's a whole site, not one page. */
function FanScene({ p, n }: { p: PortfolioItem; n: number }) {
  const pages = [
    { src: p.media.inner[0]?.src, path: p.media.inner[0]?.path, pos: 'left-[6%] top-[13%]', rot: 16, delay: 0.25 },
    { src: p.media.inner[1]?.src, path: p.media.inner[1]?.path, pos: 'right-[6%] top-[13%]', rot: -16, delay: 0.35 },
    { src: p.media.hero, path: '', pos: 'left-1/2 -translate-x-1/2 top-[6%]', rot: 0, delay: 0 },
  ];
  return (
    <>
      {pages.map((x, k) => x.src && (
        <div key={k} className={`absolute w-[42%] ${x.pos} ${k === 2 ? 'z-10' : ''}`} style={{ perspective: 1800 }}>
          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: x.rot * 1.8, scale: 0.9 }}
            animate={{ opacity: k === 2 ? 1 : 0.85, y: 0, rotateY: x.rot, scale: k === 2 ? 1 : 0.9, transition: { delay: x.delay, duration: 0.95, ease: EASE } }}
          >
            <BrowserFrame url={host(p.url) + x.path} tone="dark">
              <img src={x.src} alt={k === 2 ? `${p.name} website` : ''} className="absolute inset-0 w-full h-full object-cover object-top" />
            </BrowserFrame>
          </motion.div>
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 h-[42%] z-10 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/85 to-transparent pointer-events-none" />
      <div className="absolute left-[6%] bottom-[15%] w-[60%] z-20"><NameCard p={p} n={n} align="left" /></div>
    </>
  );
}

/** Phone first: the view most of their customers get, with the desktop set back. */
function PhoneScene({ p, n, live }: { p: PortfolioItem; n: number; live: boolean }) {
  return (
    <>
      <motion.div
        className="absolute right-[5%] top-[14%] w-[52%] opacity-70"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 0.7, x: 0, transition: { duration: 0.9, ease: EASE } }}
      >
        <BrowserFrame url={host(p.url)} tone="dark">
          <img src={p.media.hero} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
        </BrowserFrame>
      </motion.div>
      <motion.div
        className="absolute left-[33%] top-[8%] w-[18%] z-10"
        initial={{ opacity: 0, y: 90 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.9, ease: EASE } }}
      >
        {p.media.mobileFull
          ? <PhoneScroll poster={p.media.mobile!} full={p.media.mobileFull} alt={`${p.name} on a phone`} live={live} url={host(p.url)} top={p.media.mobileTop} />
          : <PhoneFrame src={p.media.mobile!} alt={`${p.name} on a phone`} url={host(p.url)} top={p.media.mobileTop} />}
      </motion.div>
      <div className="absolute left-[5%] bottom-[14%] w-[25%]"><NameCard p={p} n={n} align="left" /></div>
    </>
  );
}

/** Phones get a portrait reel: the client's own phone view, scrolling, with the name under it. */
function CompactScene({ p, n, live }: { p: PortfolioItem; n: number; live: boolean }) {
  return (
    <>
      <motion.div
        className="absolute left-[24%] top-[6%] w-[52%]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }}
      >
        {p.media.mobileFull
          ? <PhoneScroll poster={p.media.mobile!} full={p.media.mobileFull} alt={`${p.name} on a phone`} live={live} url={host(p.url)} top={p.media.mobileTop} />
          : <PhoneFrame src={p.media.mobile!} alt={`${p.name} on a phone`} url={host(p.url)} top={p.media.mobileTop} />}
      </motion.div>
      <div className="absolute inset-x-[8%] bottom-[11%] text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5, ease: EASE } }}>
          <div className="font-mono text-[11px] text-orange mb-1.5">{String(n).padStart(2, '0')}</div>
          <div className="text-white font-black tracking-tight leading-[0.95] text-[26px]">{p.name}</div>
          <div className="text-white/55 font-medium mt-1.5 text-[13px]">{p.industry}{p.city ? `, ${p.city}` : ''}</div>
        </motion.div>
      </div>
    </>
  );
}

/**
 * The showreel: a title card, then each featured client in one of three layouts (desktop and phone,
 * the site's pages fanned out, phone first), cut together with an orange wipe, ending on a title card.
 */
export function ShowReelPlayer() {
  const picks = featured.length ? featured : portfolio.slice(0, 8);
  const scenes: Scene[] = [{ kind: 'intro' }, ...picks.map((p, i) => ({ kind: 'site' as const, p, n: i + 1 })), { kind: 'end' }];
  const hold = (s: Scene) => (s.kind === 'intro' ? INTRO_MS : s.kind === 'end' ? END_MS : SCENE_MS);
  const total = scenes.length;
  const [k, setK] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [wipe, setWipe] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const on = () => setCompact(mq.matches); on();
    mq.addEventListener('change', on); return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const h = hold(scenes[k]);
    const t1 = window.setTimeout(() => setWipe(w => w + 1), h - 450);
    const t2 = window.setTimeout(() => setK(x => (x + 1) % total), h);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k, playing, inView, total]);

  const s = scenes[k];
  const live = playing && inView;
  // Layout rotates per client; the fan needs two inner pages and the phone scene needs a phone shot.
  const layout = (p: PortfolioItem, n: number) => {
    const want = ['split', 'fan', 'phone'][(n - 1) % 3];
    if (want === 'fan' && p.media.inner.length >= 2) return 'fan';
    if (want === 'phone' && p.media.mobile) return 'phone';
    return 'split';
  };

  return (
    <div ref={ref} data-reel-ms={scenes.reduce((a, x) => a + hold(x), 0)} className={`relative ${compact ? 'aspect-[9/16] max-h-[82vh] mx-auto' : 'aspect-[16/9]'} w-full overflow-hidden rounded-2xl bg-[#0c0c0c] ring-1 ring-white/10 select-none`}>
      <div className="absolute inset-0 wk-grain opacity-70" />
      <div className="absolute inset-0 opacity-[0.08] invert" style={{ backgroundImage: 'url(/hero-bg-pattern.webp)', backgroundSize: 'cover' }} />
      <div key={wipe} className={`wk-wipe ${wipe ? 'is-on' : ''}`} />

      <AnimatePresence mode="wait">
        {s.kind === 'site' ? (
          <motion.div key={s.p.slug} className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
            <Ghost text={s.p.name} />
            {compact && s.p.media.mobile ? <CompactScene p={s.p} n={s.n} live={live} />
              : layout(s.p, s.n) === 'fan' ? <FanScene p={s.p} n={s.n} />
              : layout(s.p, s.n) === 'phone' ? <PhoneScene p={s.p} n={s.n} live={live} />
              : <SplitScene p={s.p} n={s.n} live={live} />}
          </motion.div>
        ) : s.kind === 'intro' ? (
          <motion.div key="intro" className="absolute inset-0 flex flex-col items-start justify-center px-[8%]"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.15, duration: 0.5 } }}
              className="font-bold uppercase tracking-[0.18em] text-orange text-[clamp(10px,1.1vw,15px)] mb-4">Boostify USA</motion.div>
            <div className="overflow-hidden">
              <motion.div initial={{ y: '105%' }} animate={{ y: 0, transition: { delay: 0.25, duration: 0.8, ease: [0.7, 0, 0.2, 1] } }}
                className="text-white font-black tracking-tighter leading-[0.9] text-[clamp(34px,8vw,120px)]">Selected work.</motion.div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.9, duration: 0.6 } }}
              className="mt-5 text-white/55 font-medium text-[clamp(12px,1.6vw,22px)]">Web design and SEO in Fresno, California.</motion.div>
          </motion.div>
        ) : (
          <motion.div key="end" className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.6 } }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.7 } }}
              className="text-white font-black tracking-tighter leading-[0.9] text-[clamp(28px,6vw,88px)]">
              Boostify USA
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.6, duration: 0.6 } }}
              className="mt-4 text-white/60 font-medium text-[clamp(12px,1.6vw,22px)]">6362 N Figarden Dr, Fresno · (559) 785-3834</motion.div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1, transition: { delay: 0.9, duration: 0.8, ease: [0.7, 0, 0.2, 1] } }}
              className="mt-8 h-1 w-24 bg-orange origin-left" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* chrome */}
      <div className="absolute left-5 bottom-5 right-5 flex items-center gap-4 z-40">
        <button onClick={() => setPlaying(v => !v)} aria-label={playing ? 'Pause showreel' : 'Play showreel'}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange text-white flex items-center justify-center backdrop-blur transition-colors">
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <div className="flex-1 flex gap-1">
          {scenes.map((_, n) => (
            <button key={n} onClick={() => { setK(n); setWipe(w => w + 1); }} aria-label={`Scene ${n + 1}`} className="flex-1 py-2">
              <span className={`block h-[2px] rounded-full ${n === k ? 'bg-orange' : n < k ? 'bg-white/50' : 'bg-white/15'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
