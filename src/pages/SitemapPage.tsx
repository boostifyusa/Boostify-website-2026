import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import { ArrowRight, Map } from 'lucide-react';
import { blogPosts } from '../data/posts';

const sitemapLinks = [
    {
        category: 'Main Pages',
        links: [
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
            { name: 'Our Work', path: '/work' },
            { name: 'Contact', path: '/contact' },
        ]
    },
    {
        category: 'Services',
        links: [
            { name: 'All Services', path: '/services' },
            { name: 'Custom Web Design', path: '/web-design' },
            { name: 'Local SEO', path: '/local-seo' },
            { name: 'Local Marketing', path: '/local-marketing' },
            { name: 'Website Maintenance', path: '/maintenance' },
            { name: 'App Development', path: '/app-development' },
            { name: 'AI Automation', path: '/ai-automation' },
            { name: 'SEO Audit Tool', path: '/seo-audit' },
        ]
    },
    {
        category: 'Legal & Info',
        links: [
            { name: 'Privacy Policy', path: '/privacy' },
            { name: 'Terms of Service', path: '/terms' },
            { name: 'SMS Program Terms', path: '/sms' },
            { name: '404 Not Found', path: '/404' },
        ]
    },
    {
        category: 'Insights & Resources',
        links: Object.entries(blogPosts).map(([slug, post]: [string, any]) => ({
            name: post.title,
            path: `/blog/${slug}`
        }))
    }
];

export function SitemapPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
            <Navigation />

            <main className="pt-28 md:pt-40">
                {/* Header */}
                <section className="px-6 mb-20">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                            Site Map
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">
                            Explore Our <span className="text-orange">Website.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray font-medium leading-relaxed max-w-2xl mx-auto">
                            A complete overview of all pages available on Boostify. Find exactly what you're looking for.
                        </motion.p>
                    </div>
                </section>

                {/* Links Grid */}
                <section className="px-6 mb-32">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {sitemapLinks.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-light/30 rounded-3xl border border-gray-light p-8 md:p-10 hover:border-orange/20 transition-colors duration-300">

                                    <h2 className="text-2xl font-black text-dark mb-6 flex items-center gap-3">
                                        <Map size={24} className="text-orange" />
                                        {section.category}
                                    </h2>

                                    <ul className="space-y-4">
                                        {section.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link
                                                    to={link.path}
                                                    className="group flex items-center text-lg font-medium text-gray hover:text-orange transition-colors">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3 group-hover:bg-orange transition-colors" />
                                                    {link.name}
                                                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
