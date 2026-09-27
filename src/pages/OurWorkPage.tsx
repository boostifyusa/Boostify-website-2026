import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { SchemaJSON } from '../components/SchemaJSON';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { WorkWall, ShowReelPlayer } from '../components/work/ShowReel';
import { WorkGrid } from '../components/work/WorkGrid';
import { portfolio, host } from '../data/portfolio';

export function OurWorkPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <SeoHead
        title="Web Design Portfolio | Client Websites in Fresno & the Valley | Boostify USA"
        description="Websites we have designed and built for businesses in Fresno and the Central Valley. See each site on a desktop and a phone, and what we did for it."
        canonicalUrl="/work"
      />
      <SchemaJSON
        type="CollectionPage"
        data={{
          name: "Our Work",
          description: "Portfolio of Boostify USA's web design and marketing projects.",
          publisher: {
            "@type": "ProfessionalService",
            "@id": "https://boostifyusa.com/#localbusiness",
            "name": "Boostify USA Web Design & SEO",
            "url": "https://boostifyusa.com",
            "telephone": "+1-559-785-3834",
            "email": "hello@boostifyusa.com",
            "logo": "https://boostifyusa.com/icon.png",
            "contactPoint": [
              { "@type": "ContactPoint", "telephone": "+1-559-785-3834", "contactType": "sales" },
              { "@type": "ContactPoint", "telephone": "+1-559-785-3834", "contactType": "customer service" }
            ]
          }
        }}
      />
      <Navigation />

      <main className="pt-20 md:pt-24">
        {/* Hero: the wall of work */}
        <section className="relative overflow-hidden bg-dark text-white">
          <WorkWall className="opacity-[0.42]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,rgba(17,17,17,0.94)_0%,rgba(17,17,17,0.78)_45%,rgba(17,17,17,0.35)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark to-transparent" />
          <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-28 md:pt-36 md:pb-40">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="text-5xl md:text-7xl lg:text-[6.2rem] font-black tracking-tighter leading-[0.9] max-w-[13ch]">
              Our work.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 text-lg md:text-xl text-white/70 font-medium leading-relaxed max-w-[52ch]">
              Websites we designed, built and look after, most of them for businesses in Fresno and the Central Valley. <span className="hidden md:inline">Hover a project to scroll through it, click it to see what we did.</span><span className="md:hidden">Tap a project to see what we did.</span>
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-10 flex flex-wrap gap-4">
              <a href="#showreel" className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-bold px-7 py-4 rounded-lg transition-colors">Watch the showreel</a>
              <a href="#projects" className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white font-bold px-7 py-4 rounded-lg transition-colors">Browse projects <ArrowDown className="w-4 h-4" /></a>
            </motion.div>
          </div>
        </section>

        {/* Showreel */}
        <section id="showreel" className="px-6 py-20 md:py-28 bg-dark">
          <div className="max-w-6xl mx-auto">
            <ShowReelPlayer />
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 pt-20 md:pt-28 pb-10">
          <div className="max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-dark leading-[0.95] max-w-[14ch]">Projects</h2>
            <p className="text-gray font-medium max-w-[40ch]">Screenshots taken from each site.</p>
          </div>
        </section>
        <WorkGrid />

        {/* Plain index of live sites (crawlable, and quick to scan) */}
        <section className="px-6 pb-28">
          <div className="max-w-7xl mx-auto border-t border-dark/10 pt-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-dark/45 mb-6">Live sites</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {portfolio.filter(p => !p.archived).map(p => (
                <li key={p.slug}>
                  <a href={p.url} target="_blank" rel="noopener" className="group flex items-baseline justify-between gap-4 py-1.5 border-b border-dark/5">
                    <span className="font-bold text-dark group-hover:text-orange transition-colors">{p.name}</span>
                    <span className="text-sm text-dark/40 inline-flex items-center gap-1">{host(p.url)} <ArrowUpRight className="w-3.5 h-3.5" /></span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-gray font-medium max-w-[70ch]">Want a site like these? <Link to="/contact" className="text-orange font-bold hover:underline">Tell us about your business</Link>. Most clients start with <Link to="/" className="text-orange font-bold hover:underline">website design in Fresno</Link> and add <Link to="/fresno-seo" className="text-orange font-bold hover:underline">Fresno SEO</Link> once the site is live.</p>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>);
}
