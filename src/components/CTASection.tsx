
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
export function CTASection() {
  return (
    <section
      id="contact"
      className="pt-32 pb-40 md:pb-56 px-6 bg-dark relative overflow-hidden">

      {/* Section art. Replaced two blurred colour blobs; the band is drawn on the
          same #111111 as the section so it sits flush with no seam, and its whole
          middle is empty because the headline goes there. */}
      {/* Boost: a planet horizon with a trajectory arcing into a starfield. Its
          top two thirds are empty #111111, the same ground as the section, so it
          needs no scrim and the visible art stays a band along the bottom. */}
      <img
        src="/section-art/cta-band-dark.webp"
        alt=""
        aria-hidden="true"
        width={1584}
        height={672}
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 bottom-0 w-full h-auto pointer-events-none select-none"
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{
            opacity: 1,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">

          Ready to Grow Your{' '}
          <span className="text-orange">Local Business?</span>
        </motion.h2>

        <motion.p
          initial={{
            opacity: 1,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            delay: 0.1
          }}
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto font-medium">

          Let's chat about how a new website can bring more customers through
          your door. No pressure, just a friendly conversation.
        </motion.p>

        <motion.div
          initial={{
            opacity: 1,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            delay: 0.2
          }}>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-12 py-6 bg-orange text-xl font-bold rounded-lg hover:bg-orange-hover transition-all duration-300 shadow-2xl shadow-orange/30 transform hover:-translate-y-1 hover:scale-105">

            Book a Free Call
            <ArrowRight className="ml-3 h-7 w-7" />
          </Link>
          <p className="mt-6 text-sm text-white/40 font-bold uppercase tracking-widest">
            Free consultation • No obligation
          </p>
        </motion.div>
      </div>
    </section>);

}