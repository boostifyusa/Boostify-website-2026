import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import {
  Check,
  ArrowRight,
  Globe,
  Search,
  MapPin,
  Shield,
  Zap,
  Megaphone,
  Rocket
} from
  'lucide-react';
export function ServicesPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* Page Header */}
        <section className="px-6 mb-20 md:mb-32">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">

              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              Our Expertise
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
                delay: 0.1
              }}
              className="text-5xl md:text-7xl font-black text-dark mb-8 tracking-tighter leading-[0.95]">

              Digital Craftsmanship for{' '}
              <span className="relative inline-block px-2 isolate">
                <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
                Local Growth
              </span>
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
                delay: 0.2
              }}
              className="text-xl md:text-2xl text-gray font-medium max-w-3xl mx-auto leading-relaxed">

              We don't just build websites. We build digital engines that drive
              real customers from your neighborhood to your door.
            </motion.p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="px-6 mb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Built for Speed',
                  desc: 'Lightning-fast load times that keep customers engaged and Google happy. No bloated templates.'
                },
                {
                  icon: Shield,
                  title: 'Bulletproof Security',
                  desc: 'Enterprise-grade protection for your small business. We keep the bad guys out so you can sleep easy.'
                },
                {
                  icon: MapPin,
                  title: 'Hyper-Local Focus',
                  desc: 'Strategies tailored specifically for the Central Valley market. We know what makes locals tick.'
                }].
                map((benefit, i) =>
                  <motion.div
                    key={i}
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
                      delay: i * 0.1
                    }}
                    className="bg-light/50 p-8 rounded-3xl border border-gray-light hover:border-orange/30 transition-colors duration-300 group">

                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray font-medium leading-relaxed">
                      {benefit.desc}
                    </p>
                  </motion.div>
                )}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="px-6 mb-20 md:mb-32 space-y-20 md:space-y-32 overflow-hidden">
          {/* Service 1: Web Design */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}>

              <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8">
                <Globe size={32} strokeWidth={2} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                Custom Web Design
              </h2>
              <p className="text-xl text-gray font-medium mb-8 leading-relaxed">
                Your website is your 24/7 salesperson. We hand-code custom sites
                that capture your brand's unique personality and convert
                visitors into paying customers.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Mobile-first responsive design',
                  'Custom interactions & animations',
                  'Conversion-optimized layouts',
                  'Accessibility compliance (ADA)'].
                  map((item, i) =>
                    <li
                      key={i}
                      className="flex items-center gap-3 text-dark font-bold">

                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check
                          size={14}
                          className="text-green-600"
                          strokeWidth={3} />

                      </div>
                      {item}
                    </li>
                  )}
              </ul>
              <Link
                to="/services/web-design"
                className="inline-flex items-center font-bold text-orange hover:gap-2 transition-all">

                Explore Web Design
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="relative">

              <div className="aspect-square max-h-[400px] lg:max-h-none rounded-3xl overflow-hidden bg-gray-100 border border-gray-light shadow-2xl relative z-10">
                {/* Abstract Browser UI */}
                <div className="absolute inset-0 bg-white p-8 flex flex-col">
                  <div className="flex gap-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-light rounded-xl border border-gray-light/50 p-6 space-y-6">
                    <div className="flex gap-6">
                      <div className="w-1/3 h-32 bg-white rounded-lg shadow-sm" />
                      <div className="flex-1 space-y-3">
                        <div className="h-6 bg-dark/10 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="flex gap-2 pt-2">
                          <div className="h-8 w-24 bg-orange rounded" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-white rounded-lg shadow-sm" />
                      <div className="h-24 bg-white rounded-lg shadow-sm" />
                      <div className="h-24 bg-white rounded-lg shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative Blob */}
              <div className="absolute -top-10 -right-10 w-full h-full bg-orange/5 rounded-3xl -z-10 hidden lg:block" />
            </motion.div>
          </div>

          {/* Service 2: SEO (Reversed) */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="relative order-2 lg:order-1">

              <div className="aspect-square max-h-[400px] lg:max-h-none rounded-3xl overflow-hidden bg-dark border border-white/10 shadow-2xl relative z-10 p-8 flex flex-col justify-center">
                {/* Abstract Graph UI */}
                <div className="space-y-6">
                  <div className="flex items-end justify-between h-48 gap-4">
                    <div className="w-full bg-white/10 rounded-t-lg h-[30%]" />
                    <div className="w-full bg-white/10 rounded-t-lg h-[50%]" />
                    <div className="w-full bg-white/10 rounded-t-lg h-[40%]" />
                    <div className="w-full bg-orange/50 rounded-t-lg h-[70%]" />
                    <div className="w-full bg-orange rounded-t-lg h-[90%] relative">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-dark text-xs font-bold px-2 py-1 rounded shadow-lg">
                        +145%
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-white/20 w-full" />
                  <div className="flex justify-between text-white/40 text-sm font-mono">
                    <span>JAN</span>
                    <span>FEB</span>
                    <span>MAR</span>
                    <span>APR</span>
                    <span>MAY</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-full h-full bg-gray-100 rounded-3xl -z-10 hidden lg:block" />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="order-1 lg:order-2">

              <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8">
                <Search size={32} strokeWidth={2} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                Local SEO
              </h2>
              <p className="text-xl text-gray font-medium mb-8 leading-relaxed">
                Dominate the search results in your specific service area. We
                optimize your digital presence so when neighbors search for your
                services, they find you first.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Google Business Profile optimization',
                  'Local keyword targeting',
                  'Review management strategy',
                  'Citation building & cleanup'].
                  map((item, i) =>
                    <li
                      key={i}
                      className="flex items-center gap-3 text-dark font-bold">

                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check
                          size={14}
                          className="text-green-600"
                          strokeWidth={3} />

                      </div>
                      {item}
                    </li>
                  )}
              </ul>
              <Link
                to="/services/local-seo"
                className="inline-flex items-center font-bold text-orange hover:gap-2 transition-all">

                Explore Local SEO
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>

          {/* Service: Local Marketing (Visual Left, Text Right) */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="relative order-2 lg:order-1">

              <div className="aspect-square max-h-[400px] lg:max-h-none rounded-3xl overflow-hidden bg-dark border border-white/10 shadow-2xl relative z-10 p-8 flex flex-col">
                {/* Google Ads Dashboard Mockup */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Megaphone size={16} className="text-orange" />
                    <span className="text-white/60 text-xs font-bold uppercase tracking-wider">
                      Ads Manager
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-bold">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="text-white font-black text-xl mb-1">
                      12.4k
                    </div>
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider">
                      Impressions
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="text-white font-black text-xl mb-1">
                      843
                    </div>
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider">
                      Clicks
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="text-white font-black text-xl mb-1">
                      6.8%
                    </div>
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider">
                      CTR
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="text-green-400 font-black text-xl mb-1">
                      42
                    </div>
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider">
                      Conversions
                    </div>
                  </div>
                </div>

                {/* Campaign Row */}
                <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-bold text-sm">
                      Local Service Ads
                    </div>
                    <div className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ACTIVE
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-orange w-[75%] rounded-full" />
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5 flex items-end gap-1.5">
                  {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90].map((h, i) =>
                    <div
                      key={i}
                      className="flex-1 bg-orange/80 rounded-t-sm"
                      style={{
                        height: `${h}%`
                      }} />

                  )}
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-full h-full bg-orange/5 rounded-3xl -z-10 hidden lg:block" />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="order-1 lg:order-2">

              <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8">
                <Megaphone size={32} strokeWidth={2} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                Local Advertising
              </h2>
              <p className="text-xl text-gray font-medium mb-8 leading-relaxed">
                Stop waiting for organic traffic. We launch high-converting
                Google Ads and Local Service Ads campaigns that put your phone
                number at the top of search results instantly.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Google Ads management',
                  'Local Service Ads setup',
                  'Conversion tracking',
                  'Monthly ROI reporting'].
                  map((item, i) =>
                    <li
                      key={i}
                      className="flex items-center gap-3 text-dark font-bold">

                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check
                          size={14}
                          className="text-green-600"
                          strokeWidth={3} />

                      </div>
                      {item}
                    </li>
                  )}
              </ul>
              <Link
                to="/services/local-marketing"
                className="inline-flex items-center font-bold text-orange hover:gap-2 transition-all">

                Explore Marketing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>

          {/* Service: App Development (Text Left, Visual Right) */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}>

              <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8">
                <Rocket size={32} strokeWidth={2} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                App &amp; MVP Development
              </h2>
              <p className="text-xl text-gray font-medium mb-8 leading-relaxed">
                Got a startup idea? We build investor-ready prototypes and MVPs
                in weeks, not months. Validate your concept fast and affordable
                before burning your runway.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Rapid prototyping in weeks',
                  'Investor-ready demos',
                  'Web & mobile apps',
                  'Equity partnerships available'].
                  map((item, i) =>
                    <li
                      key={i}
                      className="flex items-center gap-3 text-dark font-bold">

                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check
                          size={14}
                          className="text-green-600"
                          strokeWidth={3} />

                      </div>
                      {item}
                    </li>
                  )}
              </ul>
              <Link
                to="/services/app-development"
                className="inline-flex items-center font-bold text-orange hover:gap-2 transition-all">

                Explore App Dev
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="relative">

              <div className="aspect-square max-h-[400px] lg:max-h-none rounded-3xl overflow-hidden bg-white border border-gray-light shadow-2xl relative z-10 p-8 flex items-center justify-center bg-gray-50">
                {/* Abstract Mobile App UI */}
                <div className="w-64 h-[90%] bg-white rounded-3xl border-4 border-gray-200 shadow-xl overflow-hidden flex flex-col relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-200 rounded-b-xl z-20" />

                  {/* App Header */}
                  <div className="h-16 bg-white border-b border-gray-100 flex items-end pb-3 px-4 justify-between">
                    <div className="w-6 h-6 bg-gray-100 rounded-full" />
                    <div className="w-24 h-4 bg-gray-100 rounded-full" />
                    <div className="w-6 h-6 bg-gray-100 rounded-full" />
                  </div>

                  {/* App Content */}
                  <div className="flex-1 p-4 space-y-4 bg-gray-50/50">
                    <div className="h-32 bg-orange/10 rounded-xl w-full border border-orange/5" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 bg-white rounded-xl shadow-sm" />
                      <div className="h-24 bg-white rounded-xl shadow-sm" />
                    </div>
                    <div className="h-16 bg-white rounded-xl shadow-sm w-full" />
                    <div className="h-16 bg-white rounded-xl shadow-sm w-full" />
                  </div>

                  {/* Tab Bar */}
                  <div className="h-16 bg-white border-t border-gray-100 flex items-center justify-around px-4">
                    <div className="w-8 h-8 bg-orange/20 rounded-lg" />
                    <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                    <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                    <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-full h-full bg-blue-500/5 rounded-3xl -z-10 hidden lg:block" />
            </motion.div>
          </div>

          {/* Service 3: Maintenance */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}>

              <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8">
                <Shield size={32} strokeWidth={2} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 tracking-tight">
                Care & Maintenance
              </h2>
              <p className="text-xl text-gray font-medium mb-8 leading-relaxed">
                Your business evolves, and your website should too. We provide
                ongoing support, security updates, and content changes so you
                never have to worry about your site going down.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  '24/7 Uptime monitoring',
                  'Daily cloud backups',
                  'Plugin & core updates',
                  'Priority support line'].
                  map((item, i) =>
                    <li
                      key={i}
                      className="flex items-center gap-3 text-dark font-bold">

                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check
                          size={14}
                          className="text-green-600"
                          strokeWidth={3} />

                      </div>
                      {item}
                    </li>
                  )}
              </ul>
              <Link
                to="/services/maintenance"
                className="inline-flex items-center font-bold text-orange hover:gap-2 transition-all">

                Explore Maintenance
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="relative">

              <div className="aspect-square max-h-[400px] lg:max-h-none rounded-3xl overflow-hidden bg-dark border border-white/10 shadow-2xl relative z-10 p-8 flex flex-col">
                {/* Monitoring Dashboard UI */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-orange" />
                    <span className="text-white/60 text-xs font-bold uppercase tracking-wider">
                      Site Monitor
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-bold">
                      ALL SYSTEMS GO
                    </span>
                  </div>
                </div>

                {/* Uptime Bar */}
                <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-wider">
                      Uptime — 30 Days
                    </span>
                    <span className="text-white font-black text-lg">
                      99.98%
                    </span>
                  </div>
                  <div className="flex gap-[3px]">
                    {Array.from({
                      length: 30
                    }).map((_, i) =>
                      <div
                        key={i}
                        className={`flex-1 h-5 rounded-sm ${i === 17 ? 'bg-yellow-400/80' : 'bg-green-400/70'}`} />

                    )}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-white font-black text-lg leading-none mb-1">
                      142ms
                    </div>
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider">
                      Avg Response
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-white font-black text-lg leading-none mb-1">
                      A+
                    </div>
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider">
                      SSL Grade
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-white font-black text-lg leading-none mb-1">
                      0
                    </div>
                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider">
                      Threats
                    </div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5 space-y-3 overflow-hidden">
                  <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">
                    Recent Activity
                  </div>
                  {[
                    {
                      time: '2m ago',
                      label: 'Backup completed',
                      color: 'bg-green-400'
                    },
                    {
                      time: '1h ago',
                      label: 'Plugin updated (3)',
                      color: 'bg-orange'
                    },
                    {
                      time: '6h ago',
                      label: 'Security scan — clear',
                      color: 'bg-green-400'
                    },
                    {
                      time: '1d ago',
                      label: 'Core update applied',
                      color: 'bg-orange'
                    }].
                    map((item, i) =>
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${item.color} shrink-0`} />

                        <span className="text-white/60 text-xs font-medium flex-1 truncate">
                          {item.label}
                        </span>
                        <span className="text-white/20 text-[10px] font-mono shrink-0">
                          {item.time}
                        </span>
                      </div>
                    )}
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-full h-full bg-dark/5 rounded-3xl -z-10 hidden lg:block" />
            </motion.div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>);

}