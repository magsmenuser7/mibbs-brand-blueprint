import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">MIBBS</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105">How It Works</a>
            <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105">Contact</a>
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-1 hover:scale-105">
              Start Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-gray-700 hover:text-purple-600 transition-colors">Features</a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-purple-600 transition-colors">How It Works</a>
              <a href="#pricing" className="block text-gray-700 hover:text-purple-600 transition-colors">Pricing</a>
              <a href="#contact" className="block text-gray-700 hover:text-purple-600 transition-colors">Contact</a>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all">
                Start Free
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;