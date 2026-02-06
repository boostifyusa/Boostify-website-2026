import React from 'react';
import { motion } from 'framer-motion';
const stats = [
{
  value: '5.0',
  label: 'Stars on Google'
},
{
  value: '9',
  label: 'Five-Star Reviews'
},
{
  value: '30%',
  label: 'Average Increase in Leads'
},
{
  value: 'Fresno',
  label: 'Based in California'
}];

export function StatsSection() {
  return (
    <section className="py-20 px-6 bg-orange text-white relative overflow-hidden">
      {/* Subtle Dot Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
          'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />


      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Left Header */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5
            }}
            className="lg:w-1/4 shrink-0">

            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              By the
              <br />
              Numbers
            </h2>
            <div className="w-12 h-1 bg-white/40 mt-4" />
          </motion.div>

          {/* Stats Grid */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {stats.map((stat, index) =>
            <motion.div
              key={index}
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
                delay: index * 0.1,
                duration: 0.5
              }}
              className="bg-orange p-6 md:p-8 text-center">

                <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-bold text-white/70 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>);

}