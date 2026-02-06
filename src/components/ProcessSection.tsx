import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Palette, Code2, Rocket } from 'lucide-react';
const steps = [
{
  number: '01',
  title: 'Discovery',
  description:
  'We learn about your business, goals, and what makes you unique in your market.',
  icon: MessageSquare
},
{
  number: '02',
  title: 'Design',
  description:
  'We craft a custom design that reflects your brand and speaks to your local audience.',
  icon: Palette
},
{
  number: '03',
  title: 'Develop',
  description:
  'We build your site with clean code, fast load times, and SEO baked in from day one.',
  icon: Code2
},
{
  number: '04',
  title: 'Launch',
  description:
  'We go live, train your team, and provide ongoing support to keep you growing.',
  icon: Rocket
}];

export function ProcessSection() {
  return (
    <section className="py-32 px-6 bg-dark relative overflow-hidden">
      {/* Stacked arch lines — gradient from grey to transparent */}
      <div className="absolute bottom-0 right-0 w-[1200px] h-[1200px] pointer-events-none translate-x-1/4 translate-y-1/4">
        <svg
          viewBox="0 0 1200 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          overflow="visible">

          <defs>
            <linearGradient
              id="arch-stack-grad"
              x1="200"
              y1="200"
              x2="1000"
              y2="1000"
              gradientUnits="userSpaceOnUse">

              <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.03)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          {Array.from({
            length: 24
          }).map((_, i) => {
            const r = 120 + i * 35;
            return (
              <circle
                key={i}
                cx="600"
                cy="600"
                r={r}
                stroke="url(#arch-stack-grad)"
                strokeWidth="1"
                fill="none" />);


          })}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header — left aligned */}
        <div className="mb-20 max-w-2xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-bold uppercase tracking-widest mb-6">

            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            Our Process
          </motion.div>
          <motion.h2
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: 0.1
            }}
            className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[0.95]">

            How We Work
          </motion.h2>
          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="text-xl text-white/50 font-medium">

            Four steps. No fluff. From first call to launch day.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 relative">
            {steps.map((step, index) =>
            <motion.div
              key={index}
              initial={{
                opacity: 0,
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
                delay: index * 0.12,
                duration: 0.5
              }}
              className="relative lg:px-6">

                {/* Icon box */}
                <div className="relative mb-8">
                  <div className="w-[104px] h-[104px] rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center relative z-10">
                    <step.icon
                    size={36}
                    className="text-orange"
                    strokeWidth={1.5} />

                    {/* Step number badge */}
                    <span className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-orange rounded-lg flex items-center justify-center text-white text-xs font-black">
                      {step.number}
                    </span>
                  </div>

                  {/* Connector line — from right edge of this box to left edge of next box */}
                  {index < steps.length - 1 &&
                <div className="hidden lg:block absolute top-1/2 left-[104px] right-[-24px] h-px -translate-y-1/2">
                      <div
                    className="w-full h-px bg-gradient-to-r from-orange/30 to-white/10"
                    style={{
                      marginLeft: '24px'
                    }} />

                    </div>
                }
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/40 font-medium leading-relaxed text-[15px] pr-4">
                  {step.description}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

}