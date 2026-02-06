import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import {
  ArrowRight,
  Megaphone,
  Search,
  Bot,
  Target,
  BarChart3,
  Award,
  Users,
  Globe,
  Mic,
  TrendingUp,
  Code,
  Palette,
  Headphones } from
'lucide-react';
const expertise = [
{
  label: 'Google Ads',
  icon: Megaphone
},
{
  label: 'Local SEO',
  icon: Search
},
{
  label: 'AI Automations',
  icon: Bot
},
{
  label: 'Lead Generation',
  icon: Target
},
{
  label: 'Competitor Analysis',
  icon: BarChart3
}];

const credentials = [
{
  icon: Mic,
  title: 'SBA Speaker',
  desc: 'Invited by the Small Business Administration to speak on SEO and AI for local businesses.'
},
{
  icon: Globe,
  title: 'Fresno State News',
  desc: "Built Fresno State's news website — a high-traffic, content-heavy platform used by thousands."
},
{
  icon: TrendingUp,
  title: '2x Conversions',
  desc: 'Doubled conversion rates for local service businesses with data-driven design and strategy.'
}];

const team = [
{
  role: 'Web Development',
  icon: Code,
  desc: 'Custom-coded sites built for speed and conversion.'
},
{
  role: 'Design & UX',
  icon: Palette,
  desc: 'Interfaces that look sharp and feel intuitive.'
},
{
  role: 'SEO & Marketing',
  icon: Search,
  desc: 'Data-driven strategies that get you found.'
},
{
  role: 'Client Support',
  icon: Headphones,
  desc: 'Real humans, fast responses, no runaround.'
}];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* Founder Section */}
        <section className="px-6 mb-24">
          <div className="max-w-4xl mx-auto">
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-10">

              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              Meet the Founder
            </motion.div>

            <div className="flex items-start gap-8 mb-10">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1
                }}
                className="shrink-0">

                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-gray-light shadow-lg">
                  <img
                    src="/1733568683912.jpg"
                    alt="Joaquin Estrada"
                    className="w-full h-full object-cover" />

                </div>
              </motion.div>

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
                  delay: 0.15
                }}>

                <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tighter leading-[0.95] mb-2">
                  Joaquin Estrada
                </h1>
                <p className="text-orange font-bold text-lg tracking-tight">
                  Founder & Lead Strategist
                </p>
              </motion.div>
            </div>

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
                delay: 0.2
              }}>

              <p className="text-xl md:text-2xl text-gray font-medium leading-relaxed mb-8 max-w-3xl">
                Joaquin's websites and SEO strategies turn small businesses into
                lead-generating juggernauts. Invited by the SBA to speak on SEO
                and AI, he's built Fresno State's news site and doubled
                conversions for local businesses with ruthless, data-driven
                designs.
              </p>
              <p className="text-xl md:text-2xl text-dark font-bold leading-relaxed mb-10 max-w-3xl">
                Ignoring Boostify is a choice to let competitors win.
              </p>

              {/* Expertise Pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                {expertise.map((skill, i) =>
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.3 + i * 0.06
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-light rounded-full border border-gray-light">

                    <skill.icon
                    size={14}
                    className="text-orange"
                    strokeWidth={2.5} />

                    <span className="text-sm font-bold text-dark">
                      {skill.label}
                    </span>
                  </motion.div>
                )}
              </div>

              <a
                href="#/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1">

                Book a Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Credentials */}
        <section className="px-6 py-24 bg-light/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight mb-4">
                Not Just Talk — <span className="text-orange">Receipts.</span>
              </h2>
              <p className="text-xl text-gray font-medium">
                Real credentials, real results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {credentials.map((cred, i) =>
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
                className="bg-white p-8 rounded-2xl border border-gray-light shadow-sm">

                  <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange mb-6">
                    <cred.icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3 tracking-tight">
                    {cred.title}
                  </h3>
                  <p className="text-gray font-medium leading-relaxed">
                    {cred.desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight mb-4">
                A Lean, <span className="text-orange">Remote Team</span>
              </h2>
              <p className="text-xl text-gray font-medium max-w-2xl mx-auto">
                We keep the team small and sharp. No bloated agency overhead,
                just specialists who are really, really good at what they do.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) =>
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
                  delay: i * 0.08
                }}
                className="bg-light rounded-2xl p-6 border border-gray-light text-center group">

                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-orange mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <member.icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-2 tracking-tight">
                    {member.role}
                  </h3>
                  <p className="text-sm text-gray font-medium leading-relaxed">
                    {member.desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Values / Philosophy */}
        <section className="px-6 py-20 bg-dark text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight text-center">
              How We Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
              {
                num: '01',
                title: 'Data Over Opinions',
                desc: 'Every decision is backed by analytics, not guesswork. We test, measure, and optimize relentlessly.'
              },
              {
                num: '02',
                title: 'Speed Is a Feature',
                desc: "We move fast. Most projects launch in weeks, not months. Your competitors aren't waiting and neither should you."
              },
              {
                num: '03',
                title: 'Results or Nothing',
                desc: "We don't bill for busywork. If it doesn't move the needle for your business, we don't do it."
              }].
              map((value, i) =>
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
                }}>

                  <div className="text-orange font-black text-5xl mb-4 opacity-30">
                    {value.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/60 font-medium leading-relaxed">
                    {value.desc}
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