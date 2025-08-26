import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, X } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Tools & Templates', href: '/tools' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'API Documentation', href: '#api' },
        { label: 'Integrations', href: '#integrations' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Enterprises', href: '/enterprises' },
        { label: 'Contact', href: '/contact' },
        { label: 'Press Kit', href: '#press' },
        // { label: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '#help' },
        { label: 'Blog', href: '#blog' },
        { label: 'Case Studies', href: '#cases' },
        { label: 'Webinars', href: '#webinars' },
        { label: 'Templates', href: '#templates' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Cookie Policy', href: '#cookies' },
        { label: 'GDPR', href: '#gdpr' },
        { label: 'Refund Policy', href: '#refunds' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-3xl font-bold">MIBBS</span>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                India's first AI-powered brand budgeting system, helping businesses allocate, track, and optimize every rupee spent on branding.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>hello@mibbs.ai</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span>+91 90449 10449</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-300">
                  <MapPin className="w-14 h-15 text-purple-400" />
                  <span>4th floor, icon spaces 5-98-57/5, 6th Lane, Brodipet, Beside Brodipet, Police Station, Guntur, Andhra Pradesh 522002.</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://x.com/magsmenindia" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300 hover:scale-110">
                  <X className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/magsmen/" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/magsmenindia/" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300 hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-xl font-semibold text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href} 
                        className="text-gray-300 hover:text-purple-400 transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-12">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">Stay Updated with MIBBS</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Get the latest insights on brand budgeting, AI-powered marketing, and Indian business trends delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              Join 5,000+ marketing leaders who trust MIBBS insights
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 MIBBS (Magsmen Intelligent Brand Budgeting System). All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              {/* <span className="text-gray-400">Made with ❤️ in India</span> */}
              <span className="text-gray-400">Made In India</span>
              <div className="flex items-center space-x-4">
                <a href="#privacy" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
                <a href="#terms" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
                <a href="#cookies" className="text-gray-400 hover:text-purple-400 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;