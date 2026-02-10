import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Globe,
  Search,
  MapPin,
  Wrench,
  ChevronDown,
  Rocket
} from
  'lucide-react';

const serviceLinks = [
  {
    name: 'Web Design',
    href: '/web-design',
    icon: Globe,
    desc: 'Custom sites that convert'
  },
  {
    name: 'Local SEO',
    href: '/local-seo',
    icon: Search,
    desc: 'Dominate Google search'
  },
  {
    name: 'Local Marketing',
    href: '/local-marketing',
    icon: MapPin,
    desc: 'Google Ads & LSAs'
  },
  {
    name: 'App Development',
    href: '/app-development',
    icon: Rocket,
    desc: 'MVPs for startups'
  },
  {
    name: 'Maintenance',
    href: '/maintenance',
    icon: Wrench,
    desc: 'Keep your site healthy'
  }];


const navLinks = [
  {
    name: 'Work',
    href: '/work'
  },
  {
    name: 'Services',
    href: '/services'
  },
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Contact',
    href: '/contact'
  }];


export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-light transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 z-50">
            <img
              src="/Group-116.png"
              alt="Boostify Logo"
              width="1184"
              height="152"
              className="h-8 md:h-10 w-auto object-contain" />

          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.name === 'Services' ?
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setServicesOpen(false);
                    }
                  }}>

                  <Link
                    to={link.href}
                    className="text-dark font-semibold hover:text-orange transition-colors duration-200 tracking-tight flex items-center gap-1">

                    Services
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-orange' : ''}`} />

                  </Link>

                  <AnimatePresence>
                    {servicesOpen &&
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 8
                        }}
                        animate={{
                          opacity: 1,
                          y: 0
                        }}
                        exit={{
                          opacity: 0,
                          y: 8
                        }}
                        transition={{
                          duration: 0.15
                        }}
                        className="absolute top-full left-0 pt-3">

                        <div className="bg-white rounded-xl border border-gray-light shadow-xl p-2 w-64">
                          {serviceLinks.map((service, i) =>
                            <Link
                              key={i}
                              to={service.href}
                              className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-light transition-colors group">

                              <div className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center text-orange shrink-0 mt-0.5 group-hover:bg-orange group-hover:text-white transition-colors">
                                <service.icon size={16} strokeWidth={2.5} />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-dark leading-tight">
                                  {service.name}
                                </div>
                                <div className="text-xs text-gray font-medium">
                                  {service.desc}
                                </div>
                              </div>
                            </Link>
                          )}
                          <div className="border-t border-gray-light mt-1 pt-1">
                            <Link
                              to="/services"
                              className="flex items-center justify-center px-3 py-2 rounded-lg text-xs font-bold text-orange hover:bg-orange/5 transition-colors">

                              View All Services →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    }
                  </AnimatePresence>
                </div> :

                <Link
                  key={link.name}
                  to={link.href}
                  className="text-dark font-semibold hover:text-orange transition-colors duration-200 tracking-tight">

                  {link.name}
                </Link>

            )}

            {/* Phone Number → or → Book a Call */}
            <a
              href="tel:+15597853834"
              className="flex items-center gap-2 group">

              <span className="text-xl font-black text-dark tracking-tight group-hover:text-orange transition-colors">
                (559) 785-3834
              </span>
              <span className="text-[8px] font-bold text-orange bg-orange/10 rounded px-1.5 py-0.5 uppercase tracking-widest leading-none">
                Call · Text
              </span>
            </a>

            <span className="text-sm font-medium text-gray/40 italic">or</span>

            <Link
              to="/contact"
              className="px-6 py-2.5 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-colors duration-200 shadow-lg shadow-orange/20">

              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-dark hover:text-orange transition-colors focus:outline-none z-50"
            aria-label="Toggle menu">

            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen &&
          <>
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-dark/50 z-40 md:hidden backdrop-blur-sm" />

            <motion.div
              initial={{
                x: '100%'
              }}
              animate={{
                x: 0
              }}
              exit={{
                x: '100%'
              }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300
              }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl md:hidden flex flex-col pt-24 px-8 border-l border-gray-light overflow-y-auto">

              <div className="flex flex-col gap-6">
                <Link
                  to="/work"
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-dark hover:text-orange transition-colors tracking-tight">

                  Work
                </Link>

                {/* Mobile Services Accordion */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-between w-full text-3xl font-bold text-dark hover:text-orange transition-colors tracking-tight">

                    Services
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-orange' : ''}`} />

                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen &&
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0
                        }}
                        animate={{
                          height: 'auto',
                          opacity: 1
                        }}
                        exit={{
                          height: 0,
                          opacity: 0
                        }}
                        className="overflow-hidden">

                        <div className="pt-3 pl-2 space-y-1">
                          {serviceLinks.map((service, i) =>
                            <Link
                              key={i}
                              to={service.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-light transition-colors">

                              <div className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center text-orange shrink-0">
                                <service.icon size={16} strokeWidth={2.5} />
                              </div>
                              <div>
                                <div className="text-lg font-bold text-dark">
                                  {service.name}
                                </div>
                                <div className="text-xs text-gray font-medium">
                                  {service.desc}
                                </div>
                              </div>
                            </Link>
                          )}
                          <Link
                            to="/services"
                            onClick={() => setIsOpen(false)}
                            className="block text-sm font-bold text-orange pl-3 pt-2">

                            View All Services →
                          </Link>
                        </div>
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>

                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-dark hover:text-orange transition-colors tracking-tight">

                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-dark hover:text-orange transition-colors tracking-tight">

                  Contact
                </Link>

                <div className="h-px bg-gray-light w-full my-2" />
                <a
                  href="tel:+15597853834"
                  className="flex items-center gap-2.5">

                  <span className="text-2xl font-black text-dark tracking-tight">
                    (559) 785-3834
                  </span>
                  <span className="text-[8px] font-bold text-orange bg-orange/10 rounded px-1.5 py-0.5 uppercase tracking-widest leading-none">
                    Call · Text
                  </span>
                </a>
                <div className="h-px bg-gray-light w-full my-2" />
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-4 bg-orange text-white text-center font-bold text-lg rounded-lg hover:bg-orange-hover transition-colors shadow-lg">

                  Book a Free Call
                </Link>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </>);

}