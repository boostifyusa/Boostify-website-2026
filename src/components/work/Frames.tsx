import { useEffect, useState } from 'react';
import './work.css';

/** True on phone-width screens. Starts false so prerendered HTML is the desktop layout. */
export function useIsPhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setPhone(mq.matches); on();
    mq.addEventListener('change', on); return () => mq.removeEventListener('change', on);
  }, []);
  return phone;
}

/** Minimal browser chrome. `tone` switches the bar for dark or light stages. */
export function BrowserFrame({ url, tone = 'light', className = '', children }: { url: string; tone?: 'light' | 'dark'; className?: string; children: React.ReactNode }) {
  const dark = tone === 'dark';
  return (
    <div className={`wk-frame rounded-xl overflow-hidden ${dark ? 'bg-[#1c1c1c] ring-1 ring-white/10' : 'bg-white ring-1 ring-dark/10'} shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] ${className}`}>
      <div className={`flex items-center gap-3 px-3.5 h-8 ${dark ? 'bg-[#232323] border-b border-white/5' : 'bg-[#f3f3f3] border-b border-dark/5'}`}>
        <div className="flex gap-1.5 shrink-0" aria-hidden="true">
          {[0, 1, 2].map(i => <span key={i} className={`w-2.5 h-2.5 rounded-full ${dark ? 'bg-white/15' : 'bg-dark/15'}`} />)}
        </div>
        <div className={`mx-auto max-w-[60%] truncate rounded-md px-3 py-0.5 text-[11px] font-medium tracking-tight ${dark ? 'bg-white/5 text-white/55' : 'bg-white text-dark/50'}`}>{url}</div>
        <div className="w-10 shrink-0" />
      </div>
      <div className="wk-screen">{children}</div>
    </div>
  );
}

const luminance = (hex?: string) => {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return 1;
  const n = parseInt(hex.slice(1), 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
};

/**
 * An iPhone running Safari, sized by width. The page sits between a status bar (tinted with the
 * site's own top colour, as iOS does, with the island inside it) and Safari's address bar, so the
 * island never covers the site's header. Corners are iPhone 15 Pro proportions (about 14% of
 * the width), set in percent so they stay right at any size. Proportions follow a 390x844 screen: 50px status bar,
 * 724px of page, 70px address bar.
 */
function PhoneShell({ url, top, className = '', children }: { url?: string; top?: string; className?: string; children: React.ReactNode }) {
  const light = luminance(top) > 0.55;
  const ink = light ? '#111' : '#fff';
  return (
    <div className={`relative bg-[#101010] p-[2.4%] rounded-[15.5%/7.1%] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)] ring-1 ring-black/50 ${className}`}>
      <div className="wk-phone relative overflow-hidden rounded-[13.6%/6.3%] aspect-[390/844] flex flex-col bg-white">
        <div className="wk-phone-status relative shrink-0 flex items-center justify-between px-[8%]" style={{ height: '5.924%', background: top || '#fff', color: ink }}>
          <span className="font-semibold tracking-tight">9:41</span>
          <span className="flex items-center gap-[1.4cqw]" aria-hidden="true">
            <svg viewBox="0 0 18 12" className="h-[2.6cqw] w-auto" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
            <svg viewBox="0 0 16 12" className="h-[2.6cqw] w-auto" fill="currentColor"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.4 10.4 0 0 0 8 .3 10.4 10.4 0 0 0 .7 3.2L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.8c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.8 6.8 0 0 0 8 4.1 6.8 6.8 0 0 0 3.3 5.9l1.3 1.4C5.5 6.5 6.7 6 8 6Zm0 3.7L10.1 7.6a3.1 3.1 0 0 0-4.2 0Z" /></svg>
            <svg viewBox="0 0 27 13" className="h-[2.7cqw] w-auto" fill="none"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="20" height="9" rx="2.2" fill="currentColor" /><path d="M25 4.5v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity=".4" /></svg>
          </span>
          <span className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[31%] h-[64%] rounded-full bg-black" aria-hidden="true" />
        </div>
        <div className="wk-pscreen relative flex-1 overflow-hidden bg-white">{children}</div>
        <div className="wk-phone-bar relative shrink-0 flex flex-col items-center justify-start pt-[2.2%] bg-[#f5f5f7] border-t border-black/10" style={{ height: '8.294%' }}>
          <div className="w-[88%] h-[46%] rounded-[2.2cqw] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)] flex items-center justify-between px-[3.5%] text-[#111]">
            <span className="font-semibold opacity-70">aA</span>
            <span className="truncate font-medium px-2">{url || ''}</span>
            <svg viewBox="0 0 16 16" className="h-[3cqw] w-auto opacity-60" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3.2h-3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[35%] h-[5%] min-h-[2px] rounded-full bg-black/80" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/** Phone showing the first screen of the site. */
export function PhoneFrame({ src, alt, url, top, className = '' }: { src: string; alt: string; url?: string; top?: string; className?: string }) {
  return (
    <PhoneShell url={url} top={top} className={className}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
    </PhoneShell>
  );
}

/**
 * Phone showing the full-length mobile capture, scrolling top to bottom and back on a loop while
 * `live`. Shows the first-screen capture until the long image has loaded.
 */
export function PhoneScroll({ poster, full, alt, live, url, top, className = '' }: {
  poster: string; full?: { src: string; w: number; h: number } | null; alt: string; live: boolean; url?: string; top?: string; className?: string;
}) {
  const [ready, setReady] = useState(false);
  const screens = full ? full.h / full.w / (724 / 390) : 1; // page length in visible screens
  const dur = Math.min(32, Math.max(9, (screens - 1) * 2.1 / 0.77));
  return (
    <PhoneShell url={url} top={top} className={className}>
      <img src={poster} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
      {full && (
        <img
          src={full.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onLoad={() => setReady(true)}
          className={`wk-pscroll transition-opacity duration-300 ${ready ? 'opacity-100 is-live' : 'opacity-0'} ${live ? '' : 'is-paused'}`}
          style={{ ['--wk-dur' as string]: `${dur}s` }}
        />
      )}
    </PhoneShell>
  );
}

/**
 * Hero screenshot that swaps to the full-page capture and scrolls it while `live` is true.
 * The full image only loads once it has been live, so the grid stays light.
 */
export function ScrollShot({ hero, full, alt, live, speed = 260, eager = false, delay = 600, maxScreens }: {
  hero: string; full?: { src: string; w: number; h: number } | null; alt: string; live: boolean; speed?: number; eager?: boolean;
  /** ms to hold on the hero before moving */
  delay?: number;
  /** stop after this many screens instead of running to the bottom of the page */
  maxScreens?: number;
}) {
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const [go, setGo] = useState(false);
  useEffect(() => { if (live) setArmed(true); }, [live]);
  // Start the scroll two frames after the image is in place. A cached image can load before the
  // first paint, and then the class change skips the transition and jumps to the end of the page.
  useEffect(() => {
    if (!(live && ready)) { setGo(false); return; }
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setGo(true)); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [live, ready]);
  // Travel in cqw: the image is as wide as the frame, so its height is h/w*100cqw and one screen is 62.5cqw.
  const pageCqw = full ? (full.h / full.w) * 100 : 0;
  const travel = Math.min(Math.max(0, pageCqw - 62.5), maxScreens ? maxScreens * 62.5 : Infinity);
  // Seconds of travel scale with distance so short and long pages feel the same speed.
  const dur = Math.min(26, Math.max(3, (full ? (travel / 100) * full.w : 0) / speed));
  return (
    <>
      <img src={hero} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
      {full && armed && (
        <img
          src={full.src}
          alt=""
          aria-hidden="true"
          decoding="async"
          onLoad={() => setReady(true)}
          className={`wk-scroll ${go ? 'is-live' : ''} ${ready && live ? 'opacity-100' : 'opacity-0'}`}
          style={{ ['--wk-dur' as string]: `${dur}s`, ['--wk-delay' as string]: `${delay}ms`, ['--wk-to' as string]: `-${travel.toFixed(2)}cqw` }}
        />
      )}
    </>
  );
}
