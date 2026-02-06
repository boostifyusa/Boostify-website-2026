import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ArrowRight, Home } from 'lucide-react';

export function NotFoundPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-orange selection:text-white flex flex-col">
            <Navigation />

            <main className="flex-grow flex items-center justify-center relative overflow-hidden px-6 pt-28 pb-20">
                {/* Background Gradients similar to Hero */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange/[0.03] rounded-full blur-[120px] -z-10 pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                        <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                        Error 404
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-8xl md:text-9xl font-black text-dark mb-4 tracking-tighter leading-none select-none opacity-10">
                        404
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-black text-dark mb-6 tracking-tighter relative z-20">
                        Page Not Found
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xl text-gray font-medium mb-10 leading-relaxed max-w-xl mx-auto">
                        The page you're looking for might have been moved, deleted, or possibly never existed.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white text-lg font-bold rounded-lg hover:bg-orange-hover transition-all duration-300 shadow-xl shadow-orange/20 hover:shadow-orange/30 transform hover:-translate-y-1">
                            <Home className="w-5 h-5 mr-2" />
                            Back to Home
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
