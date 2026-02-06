import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
export function SMSProgramPage() {
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

              <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tighter leading-[0.95] mb-6">
                SMS Program
              </h1>
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
              className="space-y-10 text-gray font-medium leading-relaxed text-lg">

              <p>
                Boostify USA LLC may send SMS messages to customers who provide
                their mobile number and consent. Message frequency may vary.
                Message &amp; data rates may apply.
              </p>

              {/* Action Table */}
              <div className="overflow-hidden rounded-2xl border border-gray-light">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark text-white">
                      <th className="text-left px-6 py-4 text-sm font-bold uppercase tracking-wider">
                        Action
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-bold uppercase tracking-wider">
                        Instructions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-light">
                    <tr className="bg-light">
                      <td className="px-6 py-4 font-bold text-dark">Opt out</td>
                      <td className="px-6 py-4">Reply STOP at any time.</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-bold text-dark">Help</td>
                      <td className="px-6 py-4">Reply HELP for assistance.</td>
                    </tr>
                    <tr className="bg-light">
                      <td className="px-6 py-4 font-bold text-dark">Support</td>
                      <td className="px-6 py-4">
                        <a
                          href="mailto:support@boostifyusa.com"
                          className="text-orange font-bold hover:underline">

                          support@boostifyusa.com
                        </a>{' '}
                        &bull;{' '}
                        <a
                          href="tel:+15597853834"
                          className="text-orange font-bold hover:underline">

                          +1 559-785-3834
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                For additional details, please review our{' '}
                <Link
                  to="/contact"
                  className="inline-flex px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all duration-300 self-center">
                  Contact Us for Help
                </Link>{' '}
                and{' '}
                <a
                  href="#/terms"
                  className="text-orange font-bold hover:underline">

                  Terms of Service
                </a>
                .
              </p>

              {/* Contact Card */}
              <div className="bg-light rounded-2xl border border-gray-light p-8">
                <p className="font-bold text-dark text-lg mb-4">
                  Boostify USA LLC
                </p>
                <div className="space-y-2">
                  <p>6362 N Figarden Dr Ste 118, Fresno, CA 93722</p>
                  <p>
                    <a
                      href="mailto:support@boostifyusa.com"
                      className="text-orange font-bold hover:underline">

                      support@boostifyusa.com
                    </a>{' '}
                    &bull;{' '}
                    <a
                      href="tel:+15597853834"
                      className="text-orange font-bold hover:underline">

                      +1 559-785-3834
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </article>
      </main>

      <Footer />
    </div>);

}