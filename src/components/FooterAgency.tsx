import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram,X } from 'lucide-react';

const FooterAgency = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img 
              src="src/assets/mibbs-2.png" 
              alt="MIBBS" 
              className="h-8 w-auto mb-6 filter brightness-0 invert"
            />
            <p className="text-gray-300 mb-6 max-w-md">
              Where branding budgets become business. Connecting agencies with meaningful leads, 
              budgets with intent, and systems that respect your craft.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/magsmen"  // <-- replace with your actual X profile link
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5 hover:bg-white hover:text-black rounded-sm" />  {/* ✅ now shows X icon */}
              </a>
              <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQHP2Od1_dfKSgAAAZe2GZegAjmGljyQCP5e_61PPMUsKF1Sp8UsHpUubanGNPy_OzXmgpc1alefZJHYUon3S1LxA3Q0hajVZyoal226uDsG1GnYrtEBfRqlEpRV_tiJg_oD8io=&original_referer=&sessionRedirect=https%3A%2F%2Fin.linkedin.com%2Fcompany%2Fmagsmen/" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5 hover:bg-white hover:text-black rounded-sm" />
              </a>
              <a href="https://www.instagram.com/magsmenindia/" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5 hover:bg-white hover:text-black rounded-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#dashboard-preview" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard Preview
                </a>
              </li>
              <li>
                <a href="#certification" className="text-gray-300 hover:text-white transition-colors">
                  Certification
                </a>
              </li>
              <li>
                <a href="#faqs" className="text-gray-300 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-gray-400" />
                <span className="text-gray-300">hello@mibbs.co</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-gray-400" />
                <span className="text-gray-300">+91 90449 10449</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-15 w-14 mr-3 text-gray-400" />
                <span className="text-gray-300">4th floor, icon spaces 5-98-57/5, 6th Lane, Brodipet, Beside Brodipet, Police Station, Guntur, Andhra Pradesh 522002.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 MIBBS. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAgency;