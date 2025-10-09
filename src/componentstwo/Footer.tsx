import React from 'react';
import { Shield, Users, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-mibbs-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MIBBS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering MSMEs to build brands that last. Built with Indian entrepreneurs in mind.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="col-span-1">
            <h4 className="font-semibold text-white mb-4">Trust & Security</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Certified by MSME Brand Acceleration Program</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Trusted by over 8,000 small businesses</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Privacy-first approach</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Find Agencies
              </a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Brand Tools
              </a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Legal Compliance
              </a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Training Resources
              </a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Government Schemes
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Brand Consultation
              </a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Upgrade to Premium
              </a>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                API Documentation
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400">
              © 2024 MIBBS. All rights reserved. Made in India with ❤️ for Indian MSMEs.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                MSME Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;