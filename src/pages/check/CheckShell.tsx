import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

/**
 * Shared chrome for the Table Mountain QR landing flow (/check and its
 * lead-capture children). Deliberately lighter than the full site nav: these
 * are single-purpose pages people reach by scanning a code from the stage or
 * banner, so the page has one job and no nav distractions.
 *
 * Matches the live site, not a generic linktree: topographic background +
 * radial white fade (the home-hero signature), eyebrow pill, the skewed
 * orange-highlight keyword treatment, big black headlines, hairline rules.
 * Refs: wiki/design/boostify-brand-design.md + anti-ai-slop-design.md.
 */

/** The site's "Actually" treatment: an orange word on a skewed orange wash. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block px-2 isolate whitespace-nowrap">
      <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
      <span className="text-orange relative z-10">{children}</span>
    </span>
  );
}

/** The site's eyebrow pill (one per page). */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-bold uppercase tracking-widest mb-6">
      <span className="w-2 h-2 rounded-full bg-orange animate-pulse shrink-0" />
      {children}
    </div>
  );
}

export function CheckShell({
  children,
  back = false,
}: {
  children: ReactNode;
  /** Show a "Back" link to the hub (used on the mini lead pages). */
  back?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-screen bg-white text-dark selection:bg-orange selection:text-white overflow-hidden">
      {/* Topographic pattern — the home-hero background signature. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: 'url(/hero-bg-pattern-micro.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Radial white fade so content stays crisp over the texture. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 45% at 50% 8%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0) 100%)',
        }}
      />
      {/* One faint warm orb, low and subtle (matches the home hero). */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[680px] h-[680px] max-w-[130vw] bg-orange/[0.05] rounded-full blur-[120px] pointer-events-none"
      />

      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-xl mx-auto px-5 pt-6 flex items-center justify-between">
          <Link to="/check" className="flex items-center gap-2" aria-label="Boostify USA">
            <img
              src="/Group-116.webp"
              alt="Boostify USA"
              width="1184"
              height="152"
              className="h-7 w-auto object-contain"
            />
          </Link>
          {back ? (
            <Link
              to="/check"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-gray hover:text-orange transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              Back
            </Link>
          ) : (
            <span className="text-xs font-bold uppercase tracking-widest text-gray/70">
              Fresno, CA
            </span>
          )}
        </div>
      </header>

      {/* Body */}
      <main className="relative z-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto px-5 pt-8 pb-14"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-light">
        <div className="max-w-xl mx-auto px-5 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray">
          <span className="font-medium">
            &copy; {new Date().getFullYear()} Boostify USA LLC &middot; Fresno, CA
          </span>
          <span className="flex items-center gap-4 font-semibold">
            <a href="https://boostifyusa.com/privacy" className="hover:text-orange transition-colors">
              Privacy
            </a>
            <a href="https://boostifyusa.com/terms" className="hover:text-orange transition-colors">
              Terms
            </a>
            <a href="tel:+15597853834" className="hover:text-orange transition-colors">
              (559) 785-3834
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
