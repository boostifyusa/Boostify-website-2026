import React from 'react';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 pt-24 pb-12 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="bg-white p-2 inline-block rounded mb-8">
              <img
                src="/Group-116.png"
                alt="Boostify Logo"
                className="h-8 object-contain" />

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

                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/hyperboostusa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-orange transition-colors">

                <Facebook size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-8 tracking-tight">
              Services
            </h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li>
                <a
                  href="#/web-design"
                  className="hover:text-orange transition-colors">

                  Web Design
                </a>
              </li>
              <li>
                <a
                  href="#/local-seo"
                  className="hover:text-orange transition-colors">

                  SEO Optimization
                </a>
              </li>
              <li>
                <a
                  href="#/local-marketing"
                  className="hover:text-orange transition-colors">

                  Local Marketing
                </a>
              </li>
              <li>
                <a
                  href="#/app-development"
                  className="hover:text-orange transition-colors">

                  App Development
                </a>
              </li>
              <li>
                <a
                  href="#/maintenance"
                  className="hover:text-orange transition-colors">

                  Maintenance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-8 tracking-tight">
              Company
            </h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li>
                <a
                  href="#/about"
                  className="hover:text-orange transition-colors">

                  About Us
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-orange transition-colors">
                  Our Work
                </a>
              </li>
              <li>
                <a
                  href="#/contact"
                  className="hover:text-orange transition-colors">

                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#/privacy"
                  className="hover:text-orange transition-colors">

                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#/terms"
                  className="hover:text-orange transition-colors">

                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#/sms" className="hover:text-orange transition-colors">
                  SMS Program
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-8 tracking-tight">
              Contact
            </h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li>hello@boostifyusa.com</li>
              <li>
                6362 N Figarden Dr Ste 118
                <br />
                Fresno, CA 93722
              </li>
              <li className="pt-4">
                <a
                  href="#/contact"
                  className="text-orange font-bold hover:text-white transition-colors text-lg">

                  Book a Call →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40 font-medium">
          <p>
            © {new Date().getFullYear()} Boostify USA. All rights reserved.
          </p>
          <p>Proudly serving businesses in Fresno and the Central Valley.</p>
        </div>
      </div>
    </footer>);

}