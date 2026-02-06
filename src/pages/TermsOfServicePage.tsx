import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
export function TermsOfServicePage() {
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
                Terms of Service
              </h1>
              <p className="text-gray font-medium mb-12">
                Effective Date: February 6, 2026
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
                    1. Acceptance of Terms
                  </h2>
                  <p>
                    By accessing and using the Boostify USA LLC website and
                    services, you agree to comply with and be bound by these
                    Terms of Service. If you do not agree, please do not use our
                    services.
                  </p>
                </section>

                {/* Section 2 */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    2. Use of Services
                  </h2>
                  <p>
                    You agree to use our services only for lawful purposes and
                    in accordance with these Terms. You are prohibited from
                    using our services to transmit any harmful or illegal
                    content.
                  </p>
                  <p className="mt-4">
                    By accessing or using the services of Boostify USA LLC,
                    including submitting forms or opting in to SMS
                    communications, you agree to the following Terms &amp;
                    Conditions.
                  </p>
                </section>

                {/* Section 3 - Services */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    3. Services
                  </h2>
                  <p>
                    Boostify USA LLC provides informational,
                    appointment-related, and service-based communications.
                  </p>
                </section>

                {/* Section 4 - SMS */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    4. SMS Messaging Terms
                  </h2>
                  <p className="mb-4">
                    By opting in to receive SMS messages, you agree that:
                  </p>
                  <ul className="space-y-3 ml-1">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2.5 shrink-0" />
                      <span>
                        You are providing express consent to receive SMS
                        messages.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2.5 shrink-0" />
                      <span>
                        Message frequency may vary (up to 4 messages per month).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2.5 shrink-0" />
                      <span>Message and data rates may apply.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2.5 shrink-0" />
                      <span>You can opt out at any time by replying STOP.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2.5 shrink-0" />
                      <span>For help, reply HELP or contact us directly.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2.5 shrink-0" />
                      <span>Consent is not a condition of purchase.</span>
                    </li>
                  </ul>

                  <div className="bg-light rounded-2xl border border-gray-light p-6 mt-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-dark mb-2">
                        Opt-Out &amp; Support
                      </h3>
                      <p>
                        You can cancel the SMS service at any time. Just text
                        "STOP" to{' '}
                        <a
                          href="tel:+15597853834"
                          className="text-orange font-bold hover:underline">

                          +1 559-785-3834
                        </a>
                        . After you send "STOP", we will send a confirmation
                        message. For help, reply HELP or contact{' '}
                        <a
                          href="mailto:support@boostifyusa.com"
                          className="text-orange font-bold hover:underline">

                          support@boostifyusa.com
                        </a>
                        .
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-dark mb-2">
                        Carrier Liability
                      </h3>
                      <p>
                        Carriers are not liable for delayed or undelivered
                        messages.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-dark mb-2">
                        Age Restriction
                      </h3>
                      <p>
                        You must be 18 years of age or older to use our SMS
                        messaging services.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 5 */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    5. User Responsibilities
                  </h2>
                  <p>You agree to provide accurate and current information.</p>
                </section>

                {/* Section 6 */}
                <section>
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    6. Limitation of Liability
                  </h2>
                  <p>
                    Boostify USA LLC is not liable for any direct, indirect,
                    incidental, or consequential damages.
                  </p>
                </section>

                {/* Contact */}
                <section className="bg-light rounded-2xl border border-gray-light p-8">
                  <h2 className="text-2xl font-black text-dark tracking-tight mb-4">
                    7. Contact Information
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
                    <p>Address: 6362 N Figarden Dr Ste 118, Fresno, CA 93722</p>
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