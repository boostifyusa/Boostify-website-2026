import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
// @ts-ignore
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    consentPromo: false,
    consentService: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // If recaptcha isn't ready yet
    if (!executeRecaptcha) {
      setError('ReCAPTCHA not ready. Please refresh.');
      setLoading(false);
      return;
    }

    try {
      const token = await executeRecaptcha('contact_form');

      console.log('Sending Form Data:', formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      if (!response.ok) {
        // Try to parse error JSON, but handle HTML (e.g. 500/404) gracefully
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          throw new Error(data.error || 'Failed to send message');
        } catch (e) {
          throw new Error(`Server Error (${response.status}): Please try again.`);
        }
      }

      const data = await response.json();

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Something went wrong. Please try again later or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-light rounded-3xl border border-gray-light p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-black text-dark mb-3 tracking-tight">
          Message Sent!
        </h3>
        <p className="text-gray font-medium text-lg mb-6">
          We'll get back to you within a few hours. Talk soon!
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              service: '',
              message: '',
              consentPromo: false,
              consentService: false
            });
          }}
          className="text-orange font-bold hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-dark mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
            placeholder="Joaquin Estrada"
            className="w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium placeholder:text-gray/40 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all" />

        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
            placeholder="you@business.com"
            className="w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium placeholder:text-gray/40 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all" />

        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-dark mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value
              })
            }
            placeholder="(559) 555-0123"
            className="w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium placeholder:text-gray/40 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all" />

        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-2">
            Service Interested In
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={(e) =>
              setFormData({
                ...formData,
                service: e.target.value
              })
            }
            className="w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all appearance-none">

            <option value="">Select a service...</option>
            <option value="web-design">Web Design</option>
            <option value="local-seo">Local SEO</option>
            <option value="local-marketing">
              Google Ads / Marketing
            </option>
            <option value="maintenance">Website Maintenance</option>
            <option value="other">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-dark mb-2">
          Tell Us About Your Project *
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value
            })
          }
          placeholder="What's your business? What are you looking to accomplish? Any timeline in mind?"
          className="w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium placeholder:text-gray/40 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all resize-none" />

      </div>

      {/* A2P SMS Opt-In Consents */}
      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="consentPromo"
            checked={formData.consentPromo}
            onChange={(e) =>
              setFormData({
                ...formData,
                consentPromo: e.target.checked
              })
            }
            className="mt-1 w-4 h-4 rounded border-gray-light text-orange focus:ring-orange/20 shrink-0 accent-orange" />

          <span className="text-xs text-gray leading-relaxed">
            I consent to receive marketing text messages from Boostify USA LLC at the phone number provided. Message frequency varies, up to 4 messages per month. Message & data rates may apply. Text HELP to (559) 785-3834 for assistance, reply STOP to opt out.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="consentService"
            checked={formData.consentService}
            onChange={(e) =>
              setFormData({
                ...formData,
                consentService: e.target.checked
              })
            }
            className="mt-1 w-4 h-4 rounded border-gray-light text-orange focus:ring-orange/20 shrink-0 accent-orange" />

          <span className="text-xs text-gray leading-relaxed">
            I consent to receive non-marketing text messages from Boostify USA LLC about service updates and inquiries. Message frequency varies, up to 4 messages per month. Message & data rates may apply. Text HELP to (559) 785-3834 for assistance, reply STOP to opt out.
          </span>
        </label>
      </div>


      <button
        type="submit" disabled={loading}
        className="inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 hover:-translate-y-1 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? 'Sending...' : 'Send Message'}
        {!loading && <Send className="ml-2 h-5 w-5" />}
      </button>
      {error && (
        <p className="text-red-500 font-bold text-center mt-4">
          {error}
        </p>
      )}

      <p className="text-[11px] text-gray/60 leading-relaxed">
        By clicking "Send Message", you agree to our{' '}
        <Link to="/terms" className="text-orange hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-orange hover:underline">
          Privacy Policy
        </Link>
        . Message and data rates may apply. Reply STOP to
        unsubscribe or HELP for help.
      </p>

      <p className="text-sm text-gray font-medium">
        Or skip the form, call us at{' '}
        <a
          href="tel:+15597853834"
          className="text-orange font-bold hover:underline">

          (559) 785-3834
        </a>
      </p>
    </form>
  )
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* Hero */}
        <section className="px-6 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
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
                Get In Touch
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
                  duration: 0.5,
                  delay: 0.1
                }}
                className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-[0.95]">

                Let's Build Something{' '}
                <span className="text-orange">Great Together.</span>
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

                Whether you need a new website, better Google rankings, or a
                full digital strategy, it starts with a conversation. No
                pressure, no jargon, just real talk about growing your business.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="px-6 mb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form — takes 3 cols */}
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
                delay: 0.3
              }}
              className="lg:col-span-3">

              <GoogleReCaptchaProvider
                reCaptchaKey={(import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI").trim()}
                scriptProps={{
                  async: false,
                  defer: false,
                  appendTo: 'head',
                  nonce: undefined,
                }}
              >
                <ContactForm />
              </GoogleReCaptchaProvider>

            </motion.div>

            {/* Info Sidebar — takes 2 cols */}
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
                delay: 0.4
              }}
              className="lg:col-span-2 space-y-6">

              {/* Office Card */}
              <div className="bg-light rounded-2xl border border-gray-light p-6">
                <h3 className="text-lg font-bold text-dark mb-5 tracking-tight">
                  Our Office
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-orange/10 rounded-lg flex items-center justify-center text-orange shrink-0 mt-0.5">
                      <MapPin size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-dark font-bold text-sm">Address</div>
                      <div className="text-gray font-medium text-sm leading-relaxed">
                        6362 N Figarden Dr Ste 118
                        <br />
                        Fresno, CA 93722
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-orange/10 rounded-lg flex items-center justify-center text-orange shrink-0 mt-0.5">
                      <Phone size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-dark font-bold text-sm">Phone</div>
                      <a
                        href="tel:+15597853834"
                        className="text-gray font-medium text-sm hover:text-orange transition-colors">

                        (559) 785-3834
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-orange/10 rounded-lg flex items-center justify-center text-orange shrink-0 mt-0.5">
                      <Mail size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-dark font-bold text-sm">Email</div>
                      <a
                        href="mailto:hello@boostifyusa.com"
                        className="text-gray font-medium text-sm hover:text-orange transition-colors">

                        hello@boostifyusa.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-orange/10 rounded-lg flex items-center justify-center text-orange shrink-0 mt-0.5">
                      <Clock size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-dark font-bold text-sm">Hours</div>
                      <div className="text-gray font-medium text-sm leading-relaxed">
                        Mon–Fri: 9am – 6pm
                        <br />
                        Sat–Sun: By appointment
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="bg-light rounded-2xl border border-gray-light overflow-hidden aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.8!2d-119.84!3d36.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ4JzM2LjAiTiAxMTnCsDUwJzI0LjAiVw!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Boostify Office Location"
                  className="w-full h-full" />

              </div>

              {/* Quick Response */}
              <div className="bg-dark rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-bold uppercase tracking-wider">
                    Typically responds in 2 hours
                  </span>
                </div>
                <p className="text-white/60 font-medium text-sm leading-relaxed">
                  We read every message and respond fast. For urgent projects,
                  give us a call. We pick up.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>);

}