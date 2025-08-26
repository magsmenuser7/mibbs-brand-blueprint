import React, { useState } from 'react';
import { Menu, X, ChevronDown, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Logo from './Logo';
import { Navigate, useNavigate } from 'react-router-dom';
import logo1 from "../assets/mibbs-1.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({
    agencyName: '',
    businessName: '',
    businessEmail: '',
    phoneNumber: '',
    website: '',
    industry: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    panNumber: '',
    businessRegNumber: '',
    teamSize: '',
    services: [],
    experience: '',
    portfolioUrl: '',
    description: ''
  });

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setRegistrationData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration data:', registrationData);
    // Here you would typically send the data to your backend
    setIsRegisterOpen(false);
    // Reset form
    setCurrentStep(1);
    setRegistrationData({
      agencyName: '',
      businessName: '',
      businessEmail: '',
      phoneNumber: '',
      website: '',
      industry: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      gstNumber: '',
      panNumber: '',
      businessRegNumber: '',
      teamSize: '',
      services: [],
      experience: '',
      portfolioUrl: '',
      description: ''
    });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the external dashboard
    window.open('https://super-tulumba-3aa55a.netlify.app/', '_blank');
    setIsSignInOpen(false);
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center hover:scale-105 transition-transform duration-300">
            {/* <Logo /> */}
            
            <img 
              src={logo1}
              alt="MIBBS" 
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
             {/* <a href="/" className="text-gray-700 hover:text-mibbs-primary transition-all duration-300 font-medium hover:scale-105 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-mibbs-primary to-mibbs-accent group-hover:w-full transition-all duration-300"></span>
            </a> */}
            <a href="#how-it-works" className="text-gray-700 hover:text-mibbs-primary transition-all duration-300 font-medium hover:scale-105 relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-mibbs-primary to-mibbs-accent group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-mibbs-primary transition-all duration-300 font-medium hover:scale-105 relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-mibbs-primary to-mibbs-accent group-hover:w-full transition-all duration-300"></span>
            </a>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-mibbs-primary transition-all duration-300 font-medium hover:scale-105 relative group"
              >
                Resources
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-mibbs-primary to-mibbs-accent group-hover:w-full transition-all duration-300"></span>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-100 py-2 animate-fadeInUp">
                  <a href="#dashboard-preview" className="block px-4 py-2 text-gray-700 hover:bg-mibbs-light hover:text-mibbs-primary transition-all duration-300">
                    Dashboard Preview
                  </a>
                  <a href="#success-stories" className="block px-4 py-2 text-gray-700 hover:bg-mibbs-light hover:text-mibbs-primary transition-all duration-300">
                    Success Stories
                  </a>
                  <a href="#faqs" className="block px-4 py-2 text-gray-700 hover:bg-mibbs-light hover:text-mibbs-primary transition-all duration-300">
                    FAQs
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              // onClick={() => setIsSignInOpen(true)}
              onClick={() => navigate("/agency-login")}
              className="text-mibbs-primary hover:text-mibbs-accent font-medium transition-all duration-300 hover:scale-105"
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsRegisterOpen(true)}
              data-register-btn
              className="bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white px-6 py-2 rounded-lg hover:from-mibbs-secondary hover:to-mibbs-accent transition-all duration-300 font-medium transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fadeInUp">
            <div className="flex flex-col space-y-4">
              <a href="#how-it-works" className="text-gray-700 hover:text-mibbs-primary transition-all duration-300 font-medium hover:translate-x-2">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-mibbs-primary transition-all duration-300 font-medium hover:translate-x-2">
                Pricing
              </a>
              <a href="#dashboard-preview" className="text-gray-700 hover:text-mibbs-primary transition-all duration-300 font-medium hover:translate-x-2">
                Dashboard Preview
              </a>
              <a href="#success-stories" className="text-gray-700 hover:text-mibbs-primary transition-all duration-300 font-medium hover:translate-x-2">
                Success Stories
              </a>
              <a href="#faqs" className="text-gray-700 hover:text-mibbs-primary transition-all duration-300 font-medium hover:translate-x-2">
                FAQs
              </a>
              <div className="pt-4 border-t border-gray-100">
                <button 
                  onClick={() => setIsSignInOpen(true)}
                  className="w-full text-left text-mibbs-primary hover:text-mibbs-accent font-medium mb-3 transition-all duration-300 hover:translate-x-2"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setIsRegisterOpen(true)}
                  className="w-full bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white px-6 py-2 rounded-lg hover:from-mibbs-secondary hover:to-mibbs-accent transition-all duration-300 font-medium transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </header>

      {/* Sign In Modal */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeInUp">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform animate-fadeInUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Sign In to MIBBS</h2>
              <button
                onClick={() => setIsSignInOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300 hover:scale-110"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300 hover:border-mibbs-primary"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300 hover:border-mibbs-primary"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-mibbs-primary focus:ring-mibbs-primary transition-colors duration-300"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-mibbs-primary hover:text-mibbs-accent transition-colors duration-300"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white py-3 px-6 rounded-lg hover:from-mibbs-secondary hover:to-mibbs-accent transition-all duration-500 font-semibold transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg animate-pulse-glow"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <button
                type="button"
                className="w-full border-2 border-mibbs-primary text-mibbs-primary py-3 px-6 rounded-lg hover:bg-gradient-to-r hover:from-mibbs-primary hover:to-mibbs-secondary hover:text-white transition-all duration-500 font-semibold transform hover:-translate-y-1 hover:scale-105"
              >
                Create Free Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeInUp">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl transform animate-fadeInUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Create Your Agency Profile</h2>
                  <p className="text-gray-600 mt-1">Join the MIBBS network and start receiving quality leads</p>
                </div>
                <button
                  onClick={() => setIsRegisterOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-300 hover:scale-110"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Step {currentStep} of 3</span>
                  <span>{Math.round((currentStep / 3) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-mibbs-primary to-mibbs-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleRegistrationSubmit} className="p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeInUp">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Agency Name *
                      </label>
                      <input
                        type="text"
                        name="agencyName"
                        value={registrationData.agencyName}
                        onChange={handleRegistrationChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                        placeholder="Your agency name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={registrationData.businessName}
                        onChange={handleRegistrationChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                        placeholder="Legal business name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="businessEmail"
                        value={registrationData.businessEmail}
                        onChange={handleRegistrationChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                        placeholder="business@company.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={registrationData.phoneNumber}
                        onChange={handleRegistrationChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={registrationData.website}
                        onChange={handleRegistrationChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Industry *
                      </label>
                      <select
                        name="industry"
                        value={registrationData.industry}
                        onChange={handleRegistrationChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select your industry</option>
                        <option value="digital">Digital Agency</option>
                        <option value="technology">Technology</option>
                        <option value="design">Design Agency</option>
                        <option value="strategy">Strategy & Consulting</option>
                        <option value="printing">Printing & Production</option>
                        <option value="packaging">Packaging Design</option>
                        <option value="outdoor">Outdoor Media</option>
                        <option value="advertising">Advertising Agency</option>
                        <option value="branding">Branding & Identity</option>
                        <option value="marketing">Marketing Agency</option>
                        <option value="pr">Public Relations</option>
                        <option value="events">Event Management</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeInUp">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Details</h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={registrationData.address}
                        onChange={handleRegistrationChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                        placeholder="Complete business address"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={registrationData.city}
                          onChange={handleRegistrationChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                          placeholder="City"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={registrationData.state}
                          onChange={handleRegistrationChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                          placeholder="State"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={registrationData.pincode}
                          onChange={handleRegistrationChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                          placeholder="Pincode"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GST Number *
                        </label>
                        <input
                          type="text"
                          name="gstNumber"
                          value={registrationData.gstNumber}
                          onChange={handleRegistrationChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                          placeholder="GST Number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PAN Number *
                        </label>
                        <input
                          type="text"
                          name="panNumber"
                          value={registrationData.panNumber}
                          onChange={handleRegistrationChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                          placeholder="PAN Number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Registration Number
                        </label>
                        <input
                          type="text"
                          name="businessRegNumber"
                          value={registrationData.businessRegNumber}
                          onChange={handleRegistrationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                          placeholder="CIN/Registration Number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Team Size *
                        </label>
                        <select
                          name="teamSize"
                          value={registrationData.teamSize}
                          onChange={handleRegistrationChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select team size</option>
                          <option value="1-5">1-5 members</option>
                          <option value="6-10">6-10 members</option>
                          <option value="11-25">11-25 members</option>
                          <option value="26-50">26-50 members</option>
                          <option value="50+">50+ members</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Services & Portfolio */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeInUp">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Services & Portfolio</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Services Offered * (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Brand Strategy', 'Logo Design', 'Website Development', 'Social Media Marketing',
                        'Content Creation', 'SEO/SEM', 'Print Design', 'Packaging Design',
                        'Digital Marketing', 'Video Production', 'Photography', 'Event Management',
                        'PR & Communications', 'UI/UX Design', 'Mobile App Development', 'E-commerce'
                      ].map((service) => (
                        <label key={service} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300">
                          <input
                            type="checkbox"
                            checked={registrationData.services.includes(service)}
                            onChange={() => handleServiceToggle(service)}
                            className="rounded border-gray-300 text-mibbs-primary focus:ring-mibbs-primary mr-3"
                          />
                          <span className="text-sm text-gray-700">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience *
                      </label>
                      <select
                        name="experience"
                        value={registrationData.experience}
                        onChange={handleRegistrationChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="2-5">2-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="11-15">11-15 years</option>
                        <option value="15+">15+ years</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Portfolio URL
                      </label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={registrationData.portfolioUrl}
                        onChange={handleRegistrationChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agency Description
                    </label>
                    <textarea
                      name="description"
                      value={registrationData.description}
                      onChange={handleRegistrationChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mibbs-primary focus:border-transparent transition-all duration-300"
                      placeholder="Tell us about your agency, your approach, and what makes you unique..."
                    />
                  </div>
                </div>
              )}

              {/* Form Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 transform hover:-translate-y-1'
                  }`}
                >
                  Previous
                </button>
                
                <div className="flex space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        step === currentStep
                          ? 'bg-mibbs-primary scale-125'
                          : step < currentStep
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white px-6 py-3 rounded-lg hover:from-mibbs-secondary hover:to-mibbs-accent transition-all duration-500 font-semibold transform hover:-translate-y-1 hover:scale-105"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-500 font-semibold transform hover:-translate-y-1 hover:scale-105 animate-pulse-glow"
                  >
                    Create Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;