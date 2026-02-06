import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <Navigation />

      <main className="pt-28 md:pt-40 pb-24">
        <article className="px-6">
          <div className="max-w-3xl mx-auto">
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
              }}>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-bold uppercase tracking-wider mb-8">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                Legal
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tighter leading-[0.95] mb-4">
                Privacy Policy
              </h1>
              <p className="text-gray font-medium mb-6">Boostify USA LLC</p>
              <p className="text-lg text-gray font-medium leading-relaxed mb-12">
                Boostify USA LLC values your privacy and is committed to
                protecting your personal information. This Privacy Policy
                explains how we collect, use, store, and protect your
                information when you interact with us, including through our
                website, forms, SMS communications, and services.
              </p>
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
                delay: 0.1
              }}
              className="prose prose-lg max-w-none">

              <div className="space-y-10 text-gray font-medium leading-relaxed text-lg">
                {/* Section 1 */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    1. Information We Collect
                  </h2>
                  <p className="mb-4">
                    We may collect the following information:
                  </p>
                  <ul className="space-y-3 ml-1">
                    {[
                    'Name',
                    'Phone number',
                    'Email address',
                    'Appointment or inquiry details',
                    'Any information you voluntarily submit through forms or communication channels'].
                    map((item, i) =>
                    <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    )}
                  </ul>
                </section>

                {/* Section 2 */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    2. How We Use Your Information
                  </h2>
                  <p className="mb-4">We use your information to:</p>
                  <ul className="space-y-3 ml-1">
                    {[
                    'Respond to inquiries or requests',
                    'Schedule, confirm, or remind you of appointments',
                    'Send transactional or informational messages',
                    'Provide customer support',
                    'Improve our services and communications'].
                    map((item, i) =>
                    <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    )}
                  </ul>
                </section>

                {/* Section 3 */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    3. SMS &amp; Messaging Consent
                  </h2>
                  <p className="mb-4">
                    By providing your phone number and opting in, you consent to
                    receive SMS messages from Boostify USA LLC, including
                    appointment confirmations, reminders, and informational
                    messages. Message frequency may vary. Message and data rates
                    may apply. Reply STOP to opt out at any time. Reply HELP for
                    assistance.
                  </p>

                  <div className="bg-light rounded-2xl border border-gray-light p-6 mt-6">
                    <h3 className="text-lg font-bold text-dark mb-3">
                      Mobile Information Sharing
                    </h3>
                    <p>
                      No mobile information will be shared with third
                      parties/affiliates for marketing/promotional purposes.
                      Information sharing to subcontractors in support services,
                      such as customer service, is permitted. All other use case
                      categories exclude text messaging originator opt-in data
                      and consent; this information will not be shared with any
                      third parties.
                    </p>
                  </div>
                </section>

                {/* Section 4 */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    4. Data Sharing
                  </h2>
                  <p className="mb-4">
                    We may share your information only with trusted service
                    providers strictly for business operations (e.g., CRM
                    systems, messaging platforms) and only to the extent
                    necessary to provide our services.
                  </p>
                  <ul className="space-y-3 ml-1">
                    {[
                    'We do not sell or rent your personal information.',
                    'We do not share mobile information for marketing or promotional purposes.'].
                    map((item, i) =>
                    <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    )}
                  </ul>
                </section>

                {/* Section 5 */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    5. Data Security
                  </h2>
                  <p className="mb-4">
                    We implement reasonable administrative, technical, and
                    physical safeguards to protect your information from
                    unauthorized access, disclosure, or misuse.
                  </p>

                  <div className="bg-light rounded-2xl border border-gray-light p-6 mt-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-dark mb-2">
                        Cookie &amp; Tracking Practices
                      </h3>
                      <p>
                        We may use cookies and similar tracking technologies to
                        improve your experience on our website. Cookies are
                        small files stored on your device that help us analyze
                        web traffic and remember your preferences.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-dark mb-2">
                        Message Frequency
                      </h3>
                      <p>
                        If you opt in to receive SMS messages from Boostify USA
                        LLC, message frequency varies, up to 4 messages per
                        month. Message and data rates may apply. You may opt out
                        at any time by replying STOP.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 6 */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    6. Your Rights
                  </h2>
                  <p>
                    You may request to review/update information, opt out of
                    communications, or request deletion of your data.
                  </p>
                </section>

                {/* Section 7 */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    7. Policy Updates
                  </h2>
                  <p>Effective date revised periodically.</p>
                </section>

                {/* Contact */}
                <section className="bg-light rounded-2xl border border-gray-light p-8">
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    8. Contact Information
                  </h2>
                  <div className="space-y-2">
                    <p className="font-bold text-dark text-lg">
                      Boostify USA LLC
                    </p>
                    <p>
                      Email:{' '}
                      <a
                        href="mailto:support@boostifyusa.com"
                        className="text-orange font-bold hover:underline">

                        support@boostifyusa.com
                      </a>
                    </p>
                    <p>
                      Phone:{' '}
                      <a
                        href="tel:+15597853834"
                        className="text-orange font-bold hover:underline">

                        +1 559-785-3834
                      </a>
                    </p>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </article>
      </main>

      <Footer />
    </div>);

}