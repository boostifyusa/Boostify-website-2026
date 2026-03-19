import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 pt-24 pb-12 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-24">
          <div className="text-left">
            <div className="bg-white p-2 inline-flex rounded mb-8">
              <img
                src="/Group-116.webp"
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
              <li>
                <Link
                  to="/ai-automation"
                  className="hover:text-orange transition-colors">

                  AI Automation
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
                  to="/blog/free-contractor-tools"
                  className="hover:text-orange transition-colors">

                  Free Tools for Contractors
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
              <li>
                <Link to="/seo-audit" className="hover:text-orange transition-colors">
                  Free SEO Audit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-8 tracking-tight">
              Service Areas
            </h3>
            <ul className="space-y-4 text-white/60 font-medium">
              <li>
                <Link to="/clovis-marketing-agency" className="hover:text-orange transition-colors">
                  Clovis Marketing
                </Link>
              </li>
              <li>
                <Link to="/visalia-marketing-agency" className="hover:text-orange transition-colors">
                  Visalia Marketing
                </Link>
              </li>
              <li>
                <Link to="/madera-marketing-agency" className="hover:text-orange transition-colors">
                  Madera Marketing
                </Link>
              </li>
              <li>
                <Link to="/hanford-marketing-agency" className="hover:text-orange transition-colors">
                  Hanford Marketing
                </Link>
              </li>
              <li>
                <Link to="/merced-marketing-agency" className="hover:text-orange transition-colors">
                  Merced Marketing
                </Link>
              </li>
              <li>
                <Link to="/tulare-marketing-agency" className="hover:text-orange transition-colors">
                  Tulare Marketing
                </Link>
              </li>
              <li>
                <Link to="/sanger-marketing-agency" className="hover:text-orange transition-colors">
                  Sanger Marketing
                </Link>
              </li>
              <li>
                <Link to="/modesto-web-design" className="hover:text-orange transition-colors">
                  Modesto Web Design
                </Link>
              </li>
              <li>
                <Link to="/local-marketing" className="text-orange font-bold hover:text-white transition-colors">
                  View All Areas →
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
                <a href="https://www.google.com/maps/place/Boostify+USA+Web+Design+%26+SEO/@36.8250248,-119.8709754,17z/data=!3m2!1e3!4b1!4m6!3m5!1s0x809479893e14f2eb:0x4f3d031e35ffc106!8m2!3d36.8250248!4d-119.8684005!16s%2Fg%2F11cmpmyllw" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">
                  6362 N Figarden Dr. #118
                  <br />
                  Fresno, CA 93722
                </a>
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
            © 2026 Boostify USA. All rights reserved.
          </p>
          <p>❤️ Proudly serving businesses in Fresno, CA and across all California</p>
        </div>
      </div>
    </footer>);
}