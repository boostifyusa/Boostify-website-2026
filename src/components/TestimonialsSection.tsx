import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Check } from 'lucide-react';
const testimonials = [
{
  quote:
  'WOW! From day one, Victor made me feel like a close friend. He was quick to communicate and very reasonably priced. The work was done under a tight deadline and he delivered.',
  author: 'Heny Peter',
  role: 'Local Guide',
  rating: 5,
  badge: 'Verified Review'
},
{
  quote:
  'Victor exceeded my expectations. Some things are automated which is great, and the team was always on top of task reminders and updates. Solid work all around.',
  author: 'Frank J. Kaufmann',
  role: 'Business Owner',
  rating: 5,
  badge: 'Verified Review'
},
{
  quote:
  'I recently had the pleasure of working with Victor for help with my WordPress website. As an older clinician, I often struggle with technology, but Victor made the entire process seamless and stress-free.',
  author: 'David Johnson',
  role: 'Healthcare Professional',
  rating: 5,
  badge: 'Verified Review'
}];

// Simple Google G Logo Component
function GoogleLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg">

      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
        <path
          fill="#4285F4"
          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />

        <path
          fill="#34A853"
          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />

        <path
          fill="#FBBC05"
          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />

        <path
          fill="#EA4335"
          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />

      </g>
    </svg>);

}
export function TestimonialsSection() {
  return (
    <section className="py-32 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
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

            Loved by{' '}
            <span className="relative inline-block px-2 isolate">
              <span className="absolute inset-0 bg-orange/20 -skew-y-2 rounded-sm -z-10" />
              Locals
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
            className="text-xl text-gray font-medium mb-8">

            Don't just take our word for it.
          </motion.p>

          {/* Google Rating Badge */}
          <motion.a
            href="https://maps.app.goo.gl/bVTr8noESeDdmxSW6"
            target="_blank"
            rel="noopener noreferrer"
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">

            <GoogleLogo />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                <span className="font-bold text-dark text-lg leading-none">
                  5.0
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) =>
                  <Star key={i} size={14} fill="#FBBC05" strokeWidth={0} />
                  )}
                </div>
              </div>
              <span className="text-xs font-medium text-gray/60 uppercase tracking-wide">
                Based on 9 Google Reviews
              </span>
            </div>
          </motion.a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) =>
          <motion.div
            key={index}
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
              delay: index * 0.1,
              duration: 0.5
            }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">

              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <GoogleLogo />
                  <span className="text-xs font-bold text-gray/60 uppercase tracking-wide">
                    Google Review
                  </span>
                </div>
                <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                  <Check size={12} strokeWidth={3} />
                  Verified
                </span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) =>
              <Star key={i} size={18} fill="#FBBC05" strokeWidth={0} />
              )}
              </div>

              {/* Quote */}
              <p className="text-lg text-dark font-medium leading-relaxed mb-8 flex-1">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-gray-50">
                <p className="font-bold text-dark">{testimonial.author}</p>
                <p className="text-sm text-gray font-medium">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            delay: 0.5
          }}
          className="text-center">

          <a
            href="https://maps.app.goo.gl/bVTr8noESeDdmxSW6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-orange font-bold hover:text-orange-hover transition-colors group">

            See all our reviews on Google
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>);

}