import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Search, MapPin, ArrowUpRight } from 'lucide-react';

const services = [
  {
    num: '01',
    title: 'Web Design',
    desc: 'Beautiful, fast websites that turn visitors into customers. Custom-built for your brand, optimized for every device.',
    icon: Globe,
    link: '/web-design',
    accent: 'from-orange to-amber-500',
  },
  {
    num: '02',
    title: 'Local SEO',
    desc: 'Get found on Google by the people in your community. We optimize your site so local customers find you first.',
    icon: Search,
    link: '/local-seo',
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    num: '03',
    title: 'Local Marketing',
    desc: 'Digital strategies that drive real results. From Google Ads to Local Service Ads, we put your business at the top.',
    icon: MapPin,
    link: '/local-marketing',
    accent: 'from-emerald-500 to-green-400',
  },
];

const MotionLink = motion(Link);

export function ServicesSection() {
  return (
    <section id="services" className="py-32 px-6 bg-dark relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[length:40px_40px]" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-orange rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-white/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              What We Do
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]"
            >
              Everything you need to{' '}
              <span className="text-orange">grow online</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 font-medium text-base lg:text-lg max-w-sm lg:text-right"
          >
            We handle the technical stuff so you can focus on running your business.
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <MotionLink
              key={s.num}
              to={s.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className="group relative rounded-3xl p-8 md:p-10 border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Hover glow */}
              <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${s.accent} rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none`} />

              {/* Number */}
              <span className="text-6xl font-black text-white/[0.04] absolute top-6 right-8 select-none">{s.num}</span>

              <div className="relative z-10 flex flex-col flex-1">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:bg-orange/20 transition-colors duration-300">
                  <s.icon size={26} className="text-orange" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{s.title}</h3>
                <p className="text-white/40 font-medium leading-relaxed mb-8 flex-1">{s.desc}</p>

                {/* CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <span className="text-sm font-bold text-white/50 group-hover:text-orange transition-colors duration-300">
                    Learn more
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight size={18} className="text-white/60 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
}