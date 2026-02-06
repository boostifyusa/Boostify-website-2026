import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
const projects = [
{
  title: 'Full Throttle Suspension',
  category: 'Web Design & SEO',
  result: 'Page 1 Rankings',
  excerpt:
  'Custom website build with full local SEO strategy. Hand-coded for speed, optimized for conversions, and ranking on page one for competitive automotive keywords in Fresno.',
  image: "/FTS-Mock.jpg"

},
{
  title: 'Martin Energy Inc',
  category: 'Web Design & SEO',
  result: '3× Organic Traffic',
  excerpt:
  'Full website redesign for a Fresno-based solar energy company. Custom pages for every service, optimized for local search, and built to convert homeowners looking to go solar.',
  image: "/Slide-4_3-5.png"

},
{
  title: 'Fresno State Today',
  category: 'Web Development',
  result: '50k+ Monthly Visitors',
  excerpt:
  'Built the official Fresno State news website from the ground up. A high-traffic, content-heavy platform serving students, faculty, and the Fresno community.',
  image: "/Slide-4_3-4.png"

},
{
  title: 'Benchmark Pool Supply',
  category: 'Web Design & Local SEO',
  result: '2× Service Bookings',
  excerpt:
  'Complete website and brand presence for a Fresno pool servicing company. Designed to showcase services, build trust, and drive appointment bookings from local homeowners.',
  image: "/Slide-4_3-1.png"

},
{
  title: 'Tint Headquarters',
  category: 'Web Design & Google Ads',
  result: '#1 for Window Tint Fresno',
  excerpt:
  "Bold, high-converting website for Fresno's top-rated ceramic window tint shop. Paired with Google Ads to dominate local search and drive same-day appointment requests.",
  image: "/2024-04-30-2.jpg"

}];

export function OurWorkPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* Hero */}
        <section className="px-6 mb-20">
          <div className="max-w-7xl mx-auto">
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
              Our Work
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="max-w-3xl">
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
                  className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">

                  Real Work. <span className="text-orange">Real Results.</span>
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
                  className="text-xl text-gray font-medium leading-relaxed">

                  A growing portfolio of local businesses we've helped stand out
                  online. Every project is hand-crafted, data-driven, and built
                  to generate leads.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-6 mb-32">
          <div className="max-w-7xl mx-auto space-y-8">
            {projects.map((project, i) =>
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
                delay: i * 0.1,
                duration: 0.5
              }}
              className="group relative block rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">

                {/* Background Image */}
                <div className="absolute inset-0 bg-dark">
                  <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80" />

                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80" />

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  {/* Top */}
                  <div className="flex justify-between items-start">
                    <span className="text-white/30 font-bold text-sm tracking-widest">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Bottom */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-orange text-white text-xs font-bold uppercase tracking-wider rounded-full">
                        {project.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                        <TrendingUp size={12} className="text-green-400" />
                        {project.result}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="text-white/60 font-medium text-sm md:text-base leading-relaxed max-w-xl">
                      {project.excerpt}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* More Coming */}
        <section className="px-6 mb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-light rounded-3xl border border-gray-light p-12">
              <div className="text-5xl mb-6">🚧</div>
              <h3 className="text-2xl font-black text-dark mb-3 tracking-tight">
                More Projects Coming Soon
              </h3>
              <p className="text-gray font-medium text-lg leading-relaxed">
                We're always building. New case studies and project breakdowns
                are on the way. Want to be featured here?
              </p>
              <a
                href="#/contact"
                className="inline-flex items-center text-orange font-bold text-lg mt-6 hover:gap-2 transition-all">

                Let's work together →
              </a>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>);

}