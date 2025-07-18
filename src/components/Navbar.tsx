import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import AuthModal from "@/components/AuthModal";
import { ArrowRight, LogIn, LogOut, User, UserPlus } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [showAuthModal]); // update when modal closes after login

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Optional redirect
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">About</Link>
            <Link to="/how-it-works" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">How It Works</Link>
            <Link to="/tools" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">Tools & Templates</Link>
            <Link to="/pricing" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">Pricing</Link>
            <Link to="/contact" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">Contact</Link>
          </div>



          <div className="flex items-center space-x-4">
            {user ? (
              <Button variant="ghost" size="sm">
                <User className="w-6 h-6" />
                {user.username || user.name}
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <User className="w-6 h-6" />
                  Login
                </Link>
              </Button>
            )}
            {/* <Button size="sm" asChild className="bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]">
              <Link to="/signup">
                <UserPlus className="w-4 h-4 mr-2" />
                Get Started
              </Link>
            </Button> */}
          </div>

          {/* Desktop Login/Logout Button */}
          {/* <div className="hidden md:block">
            {isLoggedIn ? (
              <Button
                className="bg-[#64378e] text-white hover:bg-[#4e2c6c]"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />Logout
                
              </Button>
            ) : (
              <Button
                className="btn-primary flex items-center group bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]"
                onClick={() => setShowAuthModal(true)}
              >
                 <User className="w-5 h-5" /> Login
              </Button>
            )}
          </div> */}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-navy focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-fade-in">
            <div className="flex flex-col space-y-4 p-6">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">Home</Link>
              <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">How It Works</Link>
              <Link to="/tools" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">Tools & Templates</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">About</Link>
              <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">Pricing</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">Contact</Link>

              {/* {isLoggedIn ? (
                <Button className="btn-primary w-full" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button className="btn-primary w-full" onClick={() => setShowAuthModal(true)}>
                  Login
                </Button>
              )} */}
            </div>
          </div>
        )}

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    </nav>
  );
};

export default Navbar;




// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import Logo from "./Logo";
// import AuthModal from "@/components/AuthModal";
// import { ArrowRight } from "lucide-react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
    
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}>
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="flex items-center justify-between">
//           <Logo />
          
//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {/* <Link to="/" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">Home</Link> */}
//             <Link to="/how-it-works" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">How It Works</Link>
//             <Link to="/tools" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">Tools & Templates</Link>
//             <Link to="/about" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">About</Link>
//             <Link to="/pricing" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">Pricing</Link>
//             <Link to="/contact" className="font-medium text-[#5A4A6A] hover:text-[#c1a1c5] transition-colors">Contact</Link>
//           </div>

//           <div className="hidden md:block">
//             {/* <Button
//               className="btn-primary flex items-center group bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]"
//               onClick={() => setShowAuthModal(true)}
//             >
//               Start Budgeting
//               <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
//             </Button> */}
//           </div>
          
//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden text-navy focus:outline-none"
//             aria-label="Toggle Menu"
//           >
//             {isMenuOpen ? (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             )}
//           </button>
//         </div>
        
//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-fade-in">
//             <div className="flex flex-col space-y-4 p-6">
//               <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">Home</Link>
//               <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">How It Works</Link>
//               <Link to="/tools" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">Tools & Templates</Link>
//               <Link to="/about" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">About</Link>
//               <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">Pricing</Link>
//               <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="font-medium text-navy hover:text-accent transition-colors">Contact</Link>
//               <Button className="btn-primary w-full" asChild>
//                 <Link to="/brand-budget-planner">Start Budgeting</Link>
//               </Button>
//             </div>
//           </div>
//         )}

//         <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

