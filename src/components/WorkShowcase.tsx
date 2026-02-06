import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';

const posts = [
  {
    title: '5 SEO Mistakes Fresno Businesses Keep Making',
    category: 'Local SEO',
    tag: 'Article',
    tagIcon: 'article',
    image: "/pexels-level23media-19097251.jpg",
    slug: 'seo-mistakes'
  },
  {
    title: "Why Your Website Isn't Getting Leads",
    category: 'Web Design',
    tag: 'Guide',
    tagIcon: 'article',
    image: "/pexels-noviana-27910251.jpg",
    slug: 'website-leads'
  },
  {
    title: 'Google Ads vs. LSAs: Which Is Right for You?',
    category: 'Paid Ads',
    tag: 'Breakdown',
    tagIcon: 'article',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'google-ads-vs-lsa'
  },
  {
    title: 'How to Get More Google Reviews (Without Being Annoying)',
    category: 'Local SEO',
    tag: 'Guide',
    tagIcon: 'article',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'dental-redesign'
  }
];

export function WorkShowcase() {
  const MotionLink = motion(Link);

  return (
    <section id="showcase" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              From the Blog
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-dark mb-6 tracking-tight leading-[0.95]">
              Stories, Tips & Fresh Ideas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray font-medium max-w-2xl">
              Local business insights, digital marketing tips, and actionable guides, straight from our team.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:block">
            <div className="text-right">
              <div className="text-4xl font-black text-dark mb-1">Fresh</div>
              <div className="text-sm font-bold text-gray uppercase tracking-widest">
                Weekly Insights
              </div>
            </div>
          </motion.div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {posts.map((post, index) => {
            const isFeatured = index === 0;
            return (
              <MotionLink
                key={index}
                to={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer block ${isFeatured ? 'md:col-span-3 aspect-[4/3] md:aspect-[21/9]' : 'md:col-span-1 aspect-[4/3] md:aspect-[3/4]'}`}>

                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 bg-dark">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90" />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content Container */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  {/* Top Row: Index & Arrow */}
                  <div className="flex justify-between items-start">
                    <span className="text-white/40 font-bold text-sm tracking-widest">
                      0{index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  {/* Bottom Row: Post Info */}
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-orange text-white text-xs font-bold uppercase tracking-wider rounded-full">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                        {post.tagIcon === 'mockup' ?
                          <Sparkles size={12} className="text-yellow-400" /> :
                          <BookOpen size={12} className="text-blue-300" />
                        }
                        {post.tag}
                      </span>
                    </div>
                    <h3
                      className={`font-bold text-white tracking-tight ${isFeatured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                      {post.title}
                    </h3>
                  </div>
                </div>
              </MotionLink>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl bg-dark overflow-hidden">

          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Want results like these for your business?
              </h3>
              <p className="text-white/60 font-medium">
                Let's talk about what we can build together.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all duration-300 shadow-lg shadow-orange/20 group whitespace-nowrap">

              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}