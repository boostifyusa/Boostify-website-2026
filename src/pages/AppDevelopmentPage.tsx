import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import {
  Rocket,
  Zap,
  Check,
  ArrowRight,
  Layers,
  Clock,
  DollarSign,
  PieChart,
  Lightbulb,
  Hammer,
  Sparkles
} from
  'lucide-react';
export function AppDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="px-6 mb-20 relative overflow-hidden bg-dark text-white pt-36 md:pt-48 pb-24 rounded-b-[3rem]">
          {/* Subtle Dot Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.07] z-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              maskImage:
                'radial-gradient(ellipse at center, black 20%, transparent 70%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 20%, transparent 70%)'
            }} />


          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/10 rounded-full blur-[100px] z-0 translate-x-1/3 -translate-y-1/4" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6
              }}>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-orange text-sm font-bold uppercase tracking-wider mb-8 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                Startup MVPs
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.95]">
                Your Idea. Built &amp; Launched in{' '}
                <span className="text-orange">Weeks.</span>
              </h1>
              <p className="text-xl text-white/70 font-medium mb-10 leading-relaxed max-w-lg">
                Stop burning runway on endless development. We build
                investor-ready MVPs fast, so you can validate your idea and get
                funded.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">
                  Start Your MVP
                  <Rocket className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white/20 font-bold rounded-lg hover:bg-white/10 transition-all">
                  See Our Work
                </Link></div>

              <div className="flex items-center gap-6 text-sm font-bold text-white/60">
                <span className="flex items-center gap-2">
                  <Zap size={16} className="text-orange" strokeWidth={3} />
                  Fast Delivery
                </span>
                <span className="flex items-center gap-2">
                  <PieChart size={16} className="text-orange" strokeWidth={3} />
                  Investor Ready
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign
                    size={16}
                    className="text-orange"
                    strokeWidth={3} />

                  Equity Friendly
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.2
              }}
              className="relative">

              {/* Terminal / Code Editor Mockup */}
              <div className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-white/10 font-mono text-sm relative z-10 max-w-md mx-auto lg:max-w-none">
                {/* Window Controls */}
                <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-4 text-white/40 text-xs">
                    build_mvp.tsx
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-4 sm:p-6 text-gray-300 space-y-2 overflow-x-auto text-xs sm:text-sm">
                  <div className="flex gap-4">
                    <span className="text-white/20 select-none">01</span>
                    <span>
                      <span className="text-purple-400">import</span>{' '}
                      <span className="text-yellow-300">
                        {'{'} Future {'}'}
                      </span>{' '}
                      <span className="text-purple-400">from</span>{' '}
                      <span className="text-green-400">'./startup'</span>
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-white/20 select-none">02</span>
                    <span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-white/20 select-none">03</span>
                    <span>
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-400">launchMVP</span> ={' '}
                      <span className="text-purple-400">async</span> (){' '}
                      <span className="text-purple-400">=&gt;</span> {'{'}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-white/20 select-none">04</span>
                    <span className="pl-4">
                      <span className="text-purple-400">await</span>{' '}
                      <span className="text-blue-400">buildFeatures</span>(['
                      <span className="text-green-400">Auth</span>', '
                      <span className="text-green-400">Database</span>', '
                      <span className="text-green-400">Payments</span>'])
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-white/20 select-none">05</span>
                    <span className="pl-4">
                      <span className="text-purple-400">await</span>{' '}
                      <span className="text-blue-400">deploy</span>(
                      <span className="text-orange">"Production"</span>)
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-white/20 select-none">06</span>
                    <span className="pl-4">
                      <span className="text-purple-400">return</span>{' '}
                      <span className="text-green-400">true</span>
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-white/20 select-none">07</span>
                    <span>{'}'}</span>
                  </div>
                </div>

                {/* Progress Overlay */}
                <div className="bg-[#2d2d2d] border-t border-white/5 p-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white font-bold">
                      Building MVP...
                    </span>
                    <span className="text-orange font-bold">87%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-orange w-[87%] rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_1s_infinite] skew-x-12" />
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-green-400">
                      <Check size={10} strokeWidth={3} /> Database Connected
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-green-400">
                      <Check size={10} strokeWidth={3} /> API Ready
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <div className="w-2 h-2 border-2 border-white/40 border-t-white rounded-full animate-spin" />{' '}
                      Deploying
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange/20 rounded-full blur-xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl -z-10" />
            </motion.div>
          </div>
        </section>

        {/* Pain Points — Comparison Layout */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-4 tracking-tight">
                The Old Way Is <span className="text-red-500">Broken</span>
              </h2>
              <p className="text-xl text-gray font-medium max-w-2xl mx-auto">
                Traditional development wasn't built for startups. Here's what
                founders are up against.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  problem: 'Agencies charge $50k–$150k for an MVP',
                  solution: 'We build MVPs at a fraction of the cost',
                  problemIcon: DollarSign,
                  solutionIcon: Check
                },
                {
                  problem: '6+ months before anything is usable',
                  solution: 'Working prototype in 2–4 weeks',
                  problemIcon: Clock,
                  solutionIcon: Zap
                },
                {
                  problem: 'No demo to show investors',
                  solution: 'Investor-ready product you can pitch with',
                  problemIcon: Layers,
                  solutionIcon: Rocket
                }].
                map((item, i) =>
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 12
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 rounded-2xl overflow-hidden border border-gray-light">

                    {/* Problem Side */}
                    <div className="flex items-center gap-4 px-8 py-6 bg-red-50/50">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                        <item.problemIcon size={20} strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">
                          The old way
                        </div>
                        <p className="text-dark font-bold">{item.problem}</p>
                      </div>
                    </div>
                    {/* Solution Side */}
                    <div className="flex items-center gap-4 px-8 py-6 bg-green-50/50">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                        <item.solutionIcon size={20} strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-1">
                          With Boostify
                        </div>
                        <p className="text-dark font-bold">{item.solution}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 px-6 bg-light/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-4 tracking-tight">
                Why Founders <span className="text-orange">Choose Us</span>
              </h2>
              <p className="text-xl text-gray font-medium max-w-2xl mx-auto">
                We're built for speed, built for startups, and built to get you
                funded.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Rapid Prototyping',
                  desc: 'We go from napkin sketch to clickable prototype in days, not weeks. Validate your UX before writing a line of code.',
                  icon: Zap
                },
                {
                  title: 'Investor-Ready Demos',
                  desc: 'Polished, functional MVPs that look and feel like a Series A product. Built to impress VCs and angels.',
                  icon: PieChart
                },
                {
                  title: 'Flexible Partnerships',
                  desc: 'For the right startups, we offer equity-based partnerships to lower your upfront cash burn.',
                  icon: Check
                }].
                map((item, i) =>
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
                    className="bg-dark text-white p-8 rounded-3xl relative overflow-hidden group">

                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange/20 transition-colors" />
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-orange mb-6">
                      <item.icon size={24} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-white/60 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                )}
            </div>
          </div>
        </section>

        {/* How It Works Timeline */}
        <section className="py-24 px-6 bg-dark text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-orange text-sm font-bold uppercase tracking-wider mb-6 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                Our Process
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                From Idea to Launch
              </h2>
              <p className="text-xl text-white/50 font-medium">
                Our streamlined process gets you to market fast.
              </p>
            </div>

            {/* Horizontal Timeline on Desktop, Vertical on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 relative">
              {/* Connecting Line (Desktop) */}
              <div
                className="hidden md:block absolute left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-orange/0 via-orange/40 to-orange/0"
                style={{
                  top: '4rem'
                }} />


              {[
                {
                  step: '01',
                  week: 'Week 1',
                  title: 'Discovery & Wireframes',
                  desc: 'We map out your core features, user flows, and database architecture. No fluff, just the essentials that matter.',
                  icon: Lightbulb
                },
                {
                  step: '02',
                  week: 'Week 2–3',
                  title: 'Build & Iterate',
                  desc: 'We code the core functionality using modern, scalable tech stacks. You get weekly updates and live demos.',
                  icon: Hammer
                },
                {
                  step: '03',
                  week: 'Week 4',
                  title: 'Polish & Launch',
                  desc: 'UI refinement, bug squashing, and deployment to production. You walk away with a live product.',
                  icon: Sparkles
                }].
                map((item, i) =>
                  <motion.div
                    key={i}
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
                      delay: i * 0.15,
                      duration: 0.5
                    }}
                    className="relative flex flex-col items-center text-center px-6">

                    {/* Step Circle */}
                    <div className="relative mb-8">
                      <div className="w-32 h-32 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center relative">
                        <div className="w-20 h-20 rounded-full bg-[rgba(42,42,42,1)] border border-white/10 flex items-center justify-center">
                          <item.icon
                            size={28}
                            className="text-orange"
                            strokeWidth={2} />

                        </div>
                      </div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-orange flex items-center justify-center text-white font-black text-sm shadow-lg shadow-orange/30">
                        {item.step}
                      </div>
                    </div>

                    {/* Week Badge */}
                    <div className="text-[11px] font-bold text-orange uppercase tracking-widest mb-3 bg-orange/10 px-3 py-1 rounded-full">
                      {item.week}
                    </div>

                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-white/50 font-medium leading-relaxed text-sm max-w-xs">
                      {item.desc}
                    </p>
                  </motion.div>
                )}
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>);

}