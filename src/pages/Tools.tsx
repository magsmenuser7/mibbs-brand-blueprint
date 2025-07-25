
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, FileText, QrCode } from "lucide-react";
import QRCodeSection from "@/components/QRCodeSection";
import { useNavigate } from "react-router-dom";

const Tools = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">Tools & Templates</h1>
            <p className="text-xl mb-8 text-navy-light">
              Free and premium resources to help you structure and optimize your brand budgeting strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Budget Calculator Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-accent/10 text-[#64378e] px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
                Featured Tool
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Brand Budget Calculator
              </h2>
              <p className="text-lg mb-6 text-navy-light">
                Our interactive calculator helps you quickly determine a recommended brand budget based on your revenue, industry, and business stage.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light">Input your annual revenue and get industry specific recommendations</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light">Adjust based on your business stage and growth targets</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light">Export your results as a PDF report with detailed explanations</p>
                </li>
              </ul>
              <Button className="btn-primary bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]" onClick={() => navigate("/calculator")}>Try Budget Calculator</Button>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-medium text-navy mb-6">Brand Budget Calculator</h4>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-navy-light mb-1">Annual Revenue (₹)</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent" placeholder="Enter your annual revenue" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-light mb-1">Industry</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent">
                      <option>Select your industry</option>
                      <option>Technology/SaaS</option>
                      <option>FMCG/D2C</option>
                      <option>Services</option>
                      <option>Manufacturing</option>
                      <option>Retail</option>
                    </select>
                  </div>
                  <Button 
                    className="w-full btn-primary bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/calculator");
                    }}
                  >
                    Calculate Recommended Budget
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quarterly Budgeting Templates */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Quarterly Budgeting Templates</h2>
            <p className="section-subtitle mx-auto">
              Interactive templates to plan your brand budget allocation for each quarter.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
              <div className="h-40 bg-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#64378e]">Q1</span>
                  <p className="text-navy-light text-sm">Jan - Mar</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-navy mb-2">Q1 Budget Template</h3>
                <p className="text-sm text-navy-light mb-4 ">Strategic planning for the first quarter with focus on annual kickoff.</p>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center hover:bg-[#64378e] hover:text-[#fff]">
                  <Download className="mr-2 h-4 w-4" /> Download Template
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
              <div className="h-40 bg-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#64378e]">Q2</span>
                  <p className="text-navy-light text-sm">Apr - Jun</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-navy mb-2">Q2 Budget Template</h3>
                <p className="text-sm text-navy-light mb-4">Adjustment strategies and mid term planning for second quarter.</p>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center hover:bg-[#64378e] hover:text-[#fff]">
                  <Download className="mr-2 h-4 w-4" /> Download Template
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
              <div className="h-40 bg-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#64378e]">Q3</span>
                  <p className="text-navy-light text-sm">Jul - Sep</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-navy mb-2">Q3 Budget Template</h3>
                <p className="text-sm text-navy-light mb-4">Festival season optimization and seasonal campaign planning.</p>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center hover:bg-[#64378e] hover:text-[#fff]">
                  <Download className="mr-2 h-4 w-4" /> Download Template
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
              <div className="h-40 bg-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#64378e]">Q4</span>
                  <p className="text-navy-light text-sm">Oct - Dec</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-navy mb-2">Q4 Budget Template</h3>
                <p className="text-sm text-navy-light mb-4">Year-end campaigns and next year planning strategies.</p>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center hover:bg-[#64378e] hover:text-[#fff]">
                  <Download className="mr-2 h-4 w-4" /> Download Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry-specific Templates */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Industry-specific Templates</h2>
            <p className="section-subtitle mx-auto">
              Specialized budgeting templates tailored for different industries and business types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-accent/20">
              <div className="h-16 bg-gradient-to-r from-accent to-accent-light flex items-center px-6" style={{
                background: "linear-gradient(to right, #64378e, #9670ac)",
              }}>
                <h3 className="font-bold text-white">Retail & E-commerce</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Brand Budget Template</p>
                      <p className="text-sm text-navy-light">For omnichannel retail businesses</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Seasonal Planning Guide</p>
                      <p className="text-sm text-navy-light">Festival & sale period optimization</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">D2C Channel Strategy</p>
                      <p className="text-sm text-navy-light">For direct-to-consumer brands</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="w-full flex items-center justify-center hover:bg-[#64378e] hover:text-[#fff]">
                  Access Templates <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-accent/20">
              <div className="h-16 bg-gradient-to-r from-accent to-accent-light flex items-center px-6" style={{
                background: "linear-gradient(to right, #64378e, #9670ac)",
              }}>
                <h3 className="font-bold text-white">FMCG & Consumer Goods</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Market Penetration Budget</p>
                      <p className="text-sm text-navy-light">For new product launches</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Distribution Channel Plan</p>
                      <p className="text-sm text-navy-light">Urban vs. rural market strategy</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Trade Marketing Budget</p>
                      <p className="text-sm text-navy-light">Retail visibility planning</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="w-full flex items-center justify-center hover:bg-[#64378e] hover:text-[#fff]">
                  Access Templates <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-accent/20">
              <div className="h-16 bg-gradient-to-r from-accent to-accent-light flex items-center px-6" style={{
                background: "linear-gradient(to right, #64378e, #9670ac)",
              }}>
                <h3 className="font-bold text-white">B2B & Services</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Thought Leadership Budget</p>
                      <p className="text-sm text-navy-light">Content & authority building</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Lead Generation Plan</p>
                      <p className="text-sm text-navy-light">Event & digital marketing focus</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Client Retention Strategy</p>
                      <p className="text-sm text-navy-light">Account-based marketing</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="w-full flex items-center justify-center hover:bg-[#64378e] hover:text-[#fff]">
                  Access Templates <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-accent/20">
              <div className="h-16 bg-gradient-to-r from-accent to-accent-light flex items-center px-6" style={{
                background: "linear-gradient(to right, #64378e, #9670ac)",
              }}>
                <h3 className="font-bold text-white">Technology & SaaS</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Product Launch Budget</p>
                      <p className="text-sm text-navy-light">GTM strategy for tech products</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">User Acquisition Plan</p>
                      <p className="text-sm text-navy-light">Growth hacking focus</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Developer Relations Budget</p>
                      <p className="text-sm text-navy-light">Community building strategy</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="w-full flex items-center justify-center hover:bg-[#64378e] hover:text-[#fff]">
                  Access Templates <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-accent/20">
              <div className="h-16 bg-gradient-to-r from-accent to-accent-light flex items-center px-6" style={{
                background: "linear-gradient(to right, #64378e, #9670ac)",
              }}>
                <h3 className="font-bold text-white">D2C & Startups</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Zero to One Budget</p>
                      <p className="text-sm text-navy-light">For pre revenue startups</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Growth Phase Plan</p>
                      <p className="text-sm text-navy-light">Post-funding expansion</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Channel Optimization</p>
                      <p className="text-sm text-navy-light">Performance marketing focus</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="w-full flex items-center justify-center hover:bg-[#64378e] hover:text-[#fff]">
                  Access Templates <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-accent/20">
              <div className="h-16 bg-gradient-to-r from-accent to-accent-light flex items-center px-6" style={{
                background: "linear-gradient(to right, #64378e, #9670ac)",
              }}>
                <h3 className="font-bold text-white">Government & Public Sector</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Public Awareness Campaign</p>
                      <p className="text-sm text-navy-light">For government initiatives</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Program Launch Budget</p>
                      <p className="text-sm text-navy-light">Citizen engagement focus</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 text-[#64378e] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-navy">Strategic Communication Plan</p>
                      <p className="text-sm text-navy-light">Cross-cultural outreach</p>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="w-full flex items-center justify-center hover:bg-[#64378e] hover:text-[#fff]"> 
                  Access Templates <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Resources Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Premium Resources</h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Advanced tools and templates available with MIBBS premium plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-navy-light/20 rounded-xl p-6">
              <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ac89b9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Brand Budget Report</h3>
              <p className="text-gray-300 mb-4">
                Comprehensive 20+ page custom report with industry benchmarks and recommendations.
              </p>
              <p className="text-[#ac89b9] mb-4">Premium Feature</p>
              <Button className="bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff] text-white font-medium py-2 px-4 rounded flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="bg-navy-light/20 rounded-xl p-6">
              <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ac89b9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Dashboard</h3>
              <p className="text-gray-300 mb-4">
                Real time budget tracking dashboard with scenario planning and ROI visualization.
              </p>
              <p className="text-[#ac89b9] mb-4">Premium Feature</p>
              <Button className="bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]text-white font-medium py-2 px-4 rounded flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="bg-navy-light/20 rounded-xl p-6">
              <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ac89b9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Consultation</h3>
              <p className="text-gray-300 mb-4">
                One on one consultation session with Magsmen's brand strategy experts.
              </p>
              <p className="text-[#ac89b9] mb-4">Premium Feature</p>
              <Button className="bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff] text-white font-medium py-2 px-4 rounded flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code CTA */}
      <QRCodeSection />
    </div>
  );
};

export default Tools;
