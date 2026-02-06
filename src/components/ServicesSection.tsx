import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, MapPin, ArrowUpRight, BarChart3 } from 'lucide-react';
export function ServicesSection() {
  return (
    <section id="services" className="py-32 px-6 bg-light/50">
      <div className="max-w-7xl mx-auto">
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
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
              duration: 0.5
            }}
            className="text-5xl md:text-6xl font-black text-dark mb-6 tracking-tight">

            Everything You Need to{' '}
            <span className="relative inline-block px-2 isolate">
              <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
              <span className="text-orange relative z-10">Grow Online</span>
            </span>
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
              delay: 0.1
            }}
            className="text-xl md:text-2xl text-gray font-medium">

            We handle the technical stuff so you can focus on running your
            business.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Web Design (Tall, Left) */}
          <motion.div
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
              duration: 0.5,
              delay: 0.2
            }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-gray-light shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden group">

            <div className="relative z-10">
              <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                <Globe size={24} strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-bold text-dark mb-4 tracking-tight">
                Web Design
              </h3>
              <p className="text-gray font-medium leading-relaxed text-lg mb-12 max-w-md">
                Beautiful, fast websites that turn visitors into customers. We
                build custom sites that reflect your brand and work perfectly on
                every device.
              </p>
              <a
                href="#/web-design"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-dark/60 hover:text-orange transition-colors duration-200 group/link">

                Learn more
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />

              </a>
            </div>

            {/* Visual: Browser Mockup */}
            <div className="mt-auto relative z-0 translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
              <div className="bg-gray-50 rounded-t-xl border border-gray-light shadow-sm overflow-hidden">
                {/* Browser Header */}
                <div className="bg-white border-b border-gray-light px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="ml-4 flex-1 h-5 bg-gray-100 rounded-md max-w-[200px]" />
                </div>
                {/* Browser Content Abstract */}
                <div className="p-6 space-y-6 bg-white min-h-[200px]">
                  {/* Hero Abstract */}
                  <div className="flex gap-6 items-center">
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-dark/10 rounded w-3/4" />
                      <div className="h-8 bg-dark/80 rounded w-full" />
                      <div className="h-3 bg-gray-100 rounded w-5/6" />
                      <div className="flex gap-2 pt-2">
                        <div className="h-8 w-24 bg-orange rounded" />
                        <div className="h-8 w-24 bg-gray-100 rounded" />
                      </div>
                    </div>
                    <div className="w-1/3 aspect-square bg-gray-100 rounded-lg" />
                  </div>
                  {/* Grid Abstract */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-gray-50 rounded border border-gray-100" />
                    <div className="h-24 bg-gray-50 rounded border border-gray-100" />
                    <div className="h-24 bg-gray-50 rounded border border-gray-100" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative background blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          </motion.div>

          {/* Right Column Stack */}
          <div className="flex flex-col gap-8">
            {/* Card 2: SEO */}
            <motion.div
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
                duration: 0.5,
                delay: 0.3
              }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-gray-light shadow-lg hover:shadow-xl transition-all duration-300 flex-1 relative overflow-hidden group">

              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                    <Search size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3 tracking-tight">
                    SEO Optimization
                  </h3>
                  <p className="text-gray font-medium leading-relaxed">
                    Get found on Google by the people in your community. We
                    optimize your site so local customers find you when they
                    need you most.
                  </p>
                  <a
                    href="#/local-seo"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-dark/60 hover:text-orange transition-colors duration-200 mt-4 group/link">

                    Learn more
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />

                  </a>
                </div>

                {/* Visual: Search Bar & Growth */}
                <div className="w-full md:w-48 shrink-0 bg-gray-50 rounded-xl p-4 border border-gray-light/50 self-center group-hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-full border border-gray-200 px-3 py-2 flex items-center gap-2 mb-4 shadow-sm">
                    <Search size={14} className="text-gray-400" />
                    <div className="h-2 w-20 bg-gray-100 rounded" />
                    <div className="w-0.5 h-3 bg-orange animate-pulse ml-auto" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-100 rounded w-5/6" />
                    <div className="h-2 bg-gray-100 rounded w-4/6" />
                  </div>
                  <div className="mt-4 flex items-end gap-1 h-16 justify-between px-2">
                    <div className="w-3 bg-orange/20 rounded-t h-[40%]" />
                    <div className="w-3 bg-orange/40 rounded-t h-[60%]" />
                    <div className="w-3 bg-orange/60 rounded-t h-[30%]" />
                    <div className="w-3 bg-orange/80 rounded-t h-[80%]" />
                    <div className="w-3 bg-orange rounded-t h-[100%]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Local Marketing */}
            <motion.div
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
                duration: 0.5,
                delay: 0.4
              }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-gray-light shadow-lg hover:shadow-xl transition-all duration-300 flex-1 relative overflow-hidden group">

              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                    <MapPin size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3 tracking-tight">
                    Local Marketing
                  </h3>
                  <p className="text-gray font-medium leading-relaxed">
                    Digital strategies that drive real foot traffic. From Google
                    Ads to Local Service Ads, we put your business at the top.
                  </p>
                  <a
                    href="#/local-marketing"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-dark/60 hover:text-orange transition-colors duration-200 mt-4 group/link">

                    Learn more
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />

                  </a>
                </div>

                {/* Visual: Map Grid */}
                <div className="w-full md:w-48 shrink-0 aspect-[4/3] bg-gray-50 rounded-xl border border-gray-light/50 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  {/* Grid Lines */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                      'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />


                  {/* Pins */}
                  <div className="absolute top-1/3 left-1/4 text-orange drop-shadow-md transform -translate-y-1/2 hover:-translate-y-2 transition-transform duration-300">
                    <MapPin size={24} fill="currentColor" />
                  </div>
                  <div className="absolute bottom-1/3 right-1/3 text-orange/60 drop-shadow-md transform scale-75">
                    <MapPin size={24} fill="currentColor" />
                  </div>
                  <div className="absolute top-1/4 right-1/4 text-orange/40 drop-shadow-md transform scale-50">
                    <MapPin size={24} fill="currentColor" />
                  </div>

                  {/* Radar Effect */}
                  <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-orange/20 rounded-full -translate-x-[12px] -translate-y-[2px] animate-ping" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

}