
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
export function HeroSection() {
  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-white">
      {/* Topographic Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            'url(/hero-bg-pattern.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />

      {/* Radial white fade — keeps text area clean, pattern visible at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%)'
        }} />


      {/* Gradient Orbs — slightly stronger */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-orange/[0.05] rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange/[0.03] rounded-full blur-[80px] -z-10 pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Centered Content */}
        <div className="text-center max-w-4xl mx-auto mb-20 relative">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">

            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            Local Digital Growth Studio
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.1
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-dark leading-[0.95] tracking-tighter mb-8">

            Websites That Bring Your{' '}
            <span className="relative inline-block px-2 isolate">
              <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
              <span className="text-orange relative z-10">Neighbors</span>
            </span>{' '}
            to Your Door.
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="text-xl md:text-2xl text-gray font-medium mb-10 leading-relaxed max-w-3xl mx-auto">

            Handcrafted design & search systems built to scale local service businesses from the Central Valley to the Coast.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.3
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-orange text-white text-lg font-bold rounded-lg hover:bg-orange-hover transition-all duration-300 shadow-xl shadow-orange/20 hover:shadow-orange/30 transform hover:-translate-y-1 w-full sm:w-auto">

              Book a Free Call
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-dark border-2 border-gray-light font-bold text-lg rounded-lg hover:border-dark hover:bg-dark hover:text-white transition-all duration-300 w-full sm:w-auto">

              View Our Work
            </Link>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              duration: 0.5,
              delay: 0.4
            }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-bold text-dark uppercase tracking-wide">

            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange" strokeWidth={3} />
              Built to Scale
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange" strokeWidth={3} />
              Quality Work
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-orange" strokeWidth={3} />
              American Operated
            </span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1,
            duration: 0.5
          }}
          className="flex justify-center mb-12">

          <motion.div
            animate={{
              y: [0, 8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-6 h-10 rounded-full border-2 border-gray-light flex items-start justify-center pt-2">

            <div className="w-1 h-2 bg-orange rounded-full" />
          </motion.div>
        </motion.div>

        {/* Portfolio Preview Cards - Browser Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Card 1 - Solar Energy Website */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              ease: 'easeOut'
            }}
            className="relative group">

            <div className="bg-white rounded-xl shadow-2xl shadow-dark/10 overflow-hidden border border-gray-light transform transition-transform duration-500 hover:-translate-y-2">
              {/* Browser Header */}
              <div className="bg-gray-50 border-b border-gray-light px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <div className="ml-4 flex-1 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center max-w-[200px] mx-auto">
                  <span className="text-[8px] text-gray-400 font-medium">
                    martinenergyinc.com
                  </span>
                </div>
              </div>
              {/* Screenshot */}
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                <img
                  src="/Slide-4_3-5.webp"
                  alt="Martin Energy Inc website design"
                  width="1024"
                  height="768"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />

              </div>
            </div>
            {/* Label */}
            <div className="absolute -bottom-4 left-6 bg-dark text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              Martin Energy Inc
            </div>
          </motion.div>

          {/* Card 2 - Fresno State Website */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.7,
              delay: 0.6,
              ease: 'easeOut'
            }}
            className="relative group md:mt-16">

            <div className="bg-white rounded-xl shadow-2xl shadow-dark/10 overflow-hidden border border-gray-light transform transition-transform duration-500 hover:-translate-y-2">
              {/* Browser Header */}
              <div className="bg-gray-50 border-b border-gray-light px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <div className="ml-4 flex-1 h-6 bg-white border border-gray-200 rounded-md flex items-center justify-center max-w-[200px] mx-auto">
                  <span className="text-[8px] text-gray-400 font-medium">
                    fresnostatetoday.com
                  </span>
                </div>
              </div>
              {/* Screenshot */}
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                <img
                  src="/Slide-4_3-4.webp"
                  alt="Fresno State Today website design"
                  width="1024"
                  height="768"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />

              </div>
            </div>
            {/* Label */}
            <div className="absolute -bottom-4 left-6 bg-dark text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              Fresno State Today
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}