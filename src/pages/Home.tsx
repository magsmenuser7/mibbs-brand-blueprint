import { Button } from "@/components/ui/button";
import { ArrowRight, Download, BarChart2, PieChart, TrendingUp } from "lucide-react";
import QRCodeSection from "@/components/QRCodeSection";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import { useEffect } from "react";





const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthOpen, setAuthOpen] = useState(false);
  
useEffect(() => {
  if (isAuthOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  // Clean up when component unmounts
  return () => document.body.classList.remove("overflow-hidden");
}, [setAuthOpen]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-tl from-[#CBB3D7] via-[#efeaf2] to-[#EFEEEA] overflow-hidden bg-gradient-to-br from-white to-gray-50">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(126,105,171,0.15),transparent_70%)]"></div>
        </div>
        <div className="container mx-auto px-4 md:px-8 z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="bg-accent/10  text-[#ac89b9] px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
                India's First Intelligent Brand Budgeting System
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#64378e] mb-6">
                Smarter Budgets. <br />
                <span className="text-[#ac89b9]">Stronger Brands.</span>
              </h1>
              <p className="text-xl mb-8 text-navy-light max-w-lg">
                Built for Indian Businesses. Data-backed brand budgeting tools, strategic recommendations, and real-time planning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="btn-primary flex items-center group bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]"
                  onClick={() => setShowAuthModal(true)}
                >
                  Start Budgeting
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
                <Button variant="outline" className="btn-secondary text-[#64378e] hover:bg-[#64378e] hover:text-[#fff]">
                  Learn How It Works
                </Button>
              </div>
            </div>
            <div className="lg:flex hidden justify-end animate-scale-in">
              <div className="relative">
                <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-navy">Brand Budget Summary</h3>
                    <Button variant="ghost" size="sm" className="flex items-center text-navy hover:bg-[#64378e] hover:text-[#fff]">
                      <Download size={18} className="mr-1" /> Export
                    </Button>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div
                        className="flex items-center justify-center h-40 rounded-md"
                        style={{
                          backgroundImage: "url('./lovable-uploads/mibbs-percentage-report.jpeg')",
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          borderRadius: "0.375rem", // same as rounded-md
                        }}
                      >
                        <PieChart className="text-white h-16 w-16" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                        <BarChart2 className="text-[#64378e] mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Allocation</p>
                          <p className="font-semibold">Optimal</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                        <TrendingUp className="text-[#64378e] mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">ROI Estimate</p>
                          <p className="font-semibold">+24%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -left-4 -z-10 bg-accent/20 rounded-xl h-full w-full"></div>
                <div className="absolute -bottom-4 -right-4 -z-10 bg-accent/10 rounded-xl h-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Why MIBBS Exists Section */}
      <section className="py-20 bg-white" id="why-mibbs">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Why MIBBS<span className="text-accent text-sm align-super">™</span> Exists</h2>
            <p className="section-subtitle">
              Most Indian businesses struggle with brand budget allocation. They either underspend, overspend, or misallocate resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card hover:-translate-y-2 bg-gradient-to-br from-[#ccadcc] to-[#5b2d89] p-6 sm:p-8 rounded-2xl">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#ebd9ff]">Guesswork Elimination</h3>
              <p className="text-[#ebd9ff]">
                Indian businesses rely on intuition rather than data when allocating brand budgets.
              </p>
            </div>

            <div className="card hover:-translate-y-2 bg-gradient-to-br from-[#ccadcc] to-[#5b2d89] p-6 sm:p-8 rounded-2xl">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#ebd9ff]">Market Specificity</h3>
              <p className="text-[#ebd9ff]">
                Global templates don't account for the unique dynamics of the Indian market.
              </p>
            </div>

            <div className="card hover:-translate-y-2 bg-gradient-to-br from-[#ccadcc] to-[#5b2d89] p-6 sm:p-8 rounded-2xl">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#ebd9ff]">Strategic Alignment</h3>
              <p className="text-[#ebd9ff]">
                Brand budgets should align with business objectives, not the other way around.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What MIBBS Solves Section */}
      <section className="py-20 bg-gray-50 bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]" id="what-mibbs-solves">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title text-white">What MIBBS<span className="text-accent text-sm align-super text-white">™</span> Solves</h2>
            <p className="section-subtitle text-white">
              Our data-backed system helps brands make informed decisions for optimal budget allocation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8 relative">
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-accent-light to-accent"></div>
                <h3 className="text-2xl font-semibold mb-6 text-navy">
                  Strategic Budget Allocation
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-navy-light"><span className="font-medium text-navy">Data-Driven Decisions:</span> Replace guesswork with India-specific market data.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-navy-light"><span className="font-medium text-navy">Industry Benchmarking:</span> See how your allocation compares to industry standards.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-navy-light"><span className="font-medium text-navy">ROI Optimization:</span> Maximize return on every rupee spent on brand building.</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mt-8 relative">
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-accent-light to-accent"></div>
                <h3 className="text-2xl font-semibold mb-6 text-navy">
                  Real-Time Planning Tools
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-navy-light"><span className="font-medium text-navy">Interactive Budgeting:</span> Adjust parameters and see impacts in real time.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-navy-light"><span className="font-medium text-navy">Business Stage Adaptation:</span> Tailored recommendations based on your growth phase.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-navy-light"><span className="font-medium text-navy">Exportable Reports:</span> Download comprehensive budgeting plans and strategies.</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="relative z-10">
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="MIBBS in action" className="rounded-lg shadow-xl" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#efeeea]" id="how-it-works">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">How MIBBS<span className="text-accent text-sm align-super">™</span> Works</h2>
            <p className="section-subtitle">
              A simple three-step process to transform your brand budgeting approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="card text-center h-full">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#64378e]">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-navy">Input Your Parameters</h3>
                <p className="text-navy-light">
                  Share your business details, industry, growth stage, and available budget.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 left-100 transform translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <div className="card text-center h-full">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#64378e]">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-navy">Receive Recommendations</h3>
                <p className="text-navy-light">
                  Our algorithm processes your data against India-specific market insights.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#64378e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            <div className="card text-center h-full">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-[#64378e]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy">Implement Your Strategy</h3>
              <p className="text-navy-light">
                Apply the optimized budget allocation with actionable implementation plans.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button className="btn-primary bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]" asChild>
              <a href="/how-it-works">Learn More About Our Process</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Founder Quote Section */}
      <section className="py-20 bg-[#ffffff] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-[#64378e] text-5xl font-serif mb-6">"</div>
            <blockquote className="text-xl md:text-2xl text-[#64378e] italic mb-8">
              Indian brands deserve better than guesswork. With MIBBS, we're bringing data-backed strategic thinking to brand budgeting—something that has been missing in our market for far too long. This is how we build world-class Indian brands.
            </blockquote>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-[#64378e] rounded-full mr-4">
              <h5 className="absolute top-50 mt-5 ml-7">S</h5>
                {}
              </div>
              <div>
                <p className="font-bold text-lg text-[#64378e]">Sandeep</p>
                <p className="text-[#64378e]">Founder, MIBBS & Magsmen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <QRCodeSection />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Home;
