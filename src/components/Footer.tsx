
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MIBBS<span className="text-accent-light text-sm align-super">™</span></h3>
            <p className="text-gray-300 mb-4">
              India's First Intelligent Brand Budgeting System. Smarter Budgets. Stronger Brands.
            </p>
            <p className="text-gray-300">
              Built by <a href="https://magsmen.com" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:underline">Magsmen</a>
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-accent-light transition-colors">Home</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-accent-light transition-colors">How It Works</Link></li>
              <li><Link to="/tools" className="text-gray-300 hover:text-accent-light transition-colors">Tools & Templates</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-accent-light transition-colors">About</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-accent-light transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-accent-light transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent-light transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent-light transition-colors">Media</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent-light transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent-light transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-accent-light transition-colors">Contact Us</Link></li>
              <li><a href="mailto:hello@mibbs.in" className="text-gray-300 hover:text-accent-light transition-colors">hello@mibbs.in</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent-light transition-colors">WhatsApp</a></li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent-light transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-light transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.03 10.03 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.946 4.946 0 004.604 3.417 9.86 9.86 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} MIBBS. All rights reserved.
          </p>
          <p className="text-gray-400">
            A Product of <a href="https://magsmen.com" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:underline">Magsmen</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
