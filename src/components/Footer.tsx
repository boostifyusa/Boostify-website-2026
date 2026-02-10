import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 pt-24 pb-12 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1 text-left">
            <div className="bg-white p-2 inline-flex rounded mb-8">
              <img
                src="/Group-116.png"
                alt="Boostify Logo"
                width="1184"
                height="152"
                className="h-8 w-auto object-contain" />

            </div>
            <p className="text-white/60 mb-8 font-medium leading-relaxed">
              Handcrafted web design & SEO for local service businesses.
            </p>
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/boostifyusa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-orange transition-colors">
                <span className="sr-only">Follow us on Instagram</span>
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/hyperboostusa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-orange transition-colors">
                <span className="sr-only">Follow us on Facebook</span>
                <Facebook size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-8 tracking-tight">
              Services
            </h3>
            <ul className="space-y-4 text-white/60 font-medium">
              <li>
                <Link
                  to="/web-design"
                  className="hover:text-orange transition-colors">

                  Web Design
                </Link>
              </li>
              <li>
                <Link
                  to="/local-seo"
                  className="hover:text-orange transition-colors">

                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link
                  to="/local-marketing"
                  className="hover:text-orange transition-colors">

                  Local Marketing
                </Link>
              </li>
              <li>
                <Link
                  to="/app-development"
                  className="hover:text-orange transition-colors">

                  App Development
                </Link>
              </li>
              <li>
                <Link
                  to="/maintenance"
                  className="hover:text-orange transition-colors">

                  Maintenance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-8 tracking-tight">
              Company
            </h3>
            <ul className="space-y-4 text-white/60 font-medium">
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange transition-colors">

                  About Us
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-orange transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-orange transition-colors">

                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-orange transition-colors">

                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-orange transition-colors">

                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/sms" className="hover:text-orange transition-colors">
                  SMS Program
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-8 tracking-tight">
              Contact
            </h3>
            <ul className="space-y-4 text-white/60 font-medium">
              <li>hello@boostifyusa.com</li>
              <li>
                6362 N Figarden Dr Ste 118
                <br />
                Fresno, CA 93722
              </li>
              <li>
                <a href="tel:+15597853834" className="hover:text-orange transition-colors">
                  (559) 785-3834
                </a>
              </li>
              <li className="pt-4">
                <Link
                  to="/contact"
                  className="text-orange font-bold hover:text-white transition-colors text-lg">

                  Book a Call →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40 font-medium">
          <p>
            © {new Date().getFullYear()} Boostify USA. All rights reserved.
          </p>
          <p>❤️ Proudly serving businesses in Fresno, CA and across all California</p>
        </div>
      </div>
    </footer>);
}