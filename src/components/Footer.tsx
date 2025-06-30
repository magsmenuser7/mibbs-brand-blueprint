
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo variant="white" />
            <p className="text-gray-300 mt-4 mb-4">
              India's First Intelligent Brand Budgeting System. Smarter Budgets. Stronger Brands.
            </p>
            {/* <p className="text-gray-300">
              Built by <a href="https://magsmen.com" target="_blank" rel="noopener noreferrer" className="text-[#cbd347] hover:underline">Magsmen</a>
            </p> */}
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
              {/* <li><a href="#" className="text-gray-300 hover:text-accent-light transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent-light transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent-light transition-colors">Media</a></li> */}
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
              <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQHP2Od1_dfKSgAAAZe2GZegAjmGljyQCP5e_61PPMUsKF1Sp8UsHpUubanGNPy_OzXmgpc1alefZJHYUon3S1LxA3Q0hajVZyoal226uDsG1GnYrtEBfRqlEpRV_tiJg_oD8io=&original_referer=&sessionRedirect=https%3A%2F%2Fin.linkedin.com%2Fcompany%2Fmagsmen" className="text-gray-300 hover:text-accent-light transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://x.com/magsmenindia"
                className="text-gray-300 hover:text-accent-light transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">X (formerly Twitter)</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.323 2H21L13.738 10.225 22.5 22h-7.26l-5.67-7.5L5.25 22H1.5l8.01-9.338L1 2h7.384l5.22 6.864L17.323 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-evenly items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} MIBBS. All rights reserved.
          </p>
          <p className="text-gray-400">
            A Product of <a href="https://magsmen.com" target="_blank" rel="noopener noreferrer" className="text-[#e2659f] hover:underline ">Magsmen</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
