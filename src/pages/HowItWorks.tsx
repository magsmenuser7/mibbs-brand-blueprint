
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, PieChart, FileText, Download } from "lucide-react";
import QRCodeSection from "@/components/QRCodeSection";

const HowItWorks = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">How MIBBS<span className="text-accent text-sm align-super">™</span> Works</h1>
            <p className="text-xl mb-8 text-navy-light">
              Understand the intelligent system that's transforming brand budgeting for Indian businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title">The MIBBS<span className="text-accent text-sm align-super">™</span> Process</h2>
              <p className="section-subtitle">
                Our system takes your inputs, processes them through our proprietary algorithm, and delivers actionable strategies.
              </p>
            </div>

            <div className="space-y-16">
              {/* Step 1 */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#64378e]">1</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-navy">Collect Your Business Inputs</h3>
                  <p className="text-navy-light mb-4">
                    MIBBS starts by gathering crucial information about your business to ensure recommendations are tailored specifically to you.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Business stage (Startup, Growth, Established)</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Industry classification and subtype</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Available budget and timeframe</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Key business objectives and priorities</p>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-3">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="bg-white rounded-lg p-5 shadow-sm">
                      <h4 className="font-medium text-navy mb-4">Sample Input Form</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-navy-light mb-1">Business Stage</label>
                          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent">
                            <option>Select Business Stage</option>
                            <option>Early-stage Startup</option>
                            <option>Growth Phase</option>
                            <option>Established Business</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy-light mb-1">Industry Category</label>
                          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent">
                            <option>Select Industry</option>
                            <option>Technology/SaaS</option>
                            <option>FMCG/D2C</option>
                            <option>Services</option>
                            <option>Manufacturing</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy-light mb-1">Annual Brand Budget (₹)</label>
                          <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent" placeholder="Enter budget amount" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="h-16 border-l-2 border-dashed border-accent/30"></div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2 md:order-2">
                  <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#64378e]">2</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-navy">Intelligent Processing</h3>
                  <p className="text-navy-light mb-4">
                    Our proprietary algorithm analyzes your inputs against our extensive database of Indian market insights and benchmarks.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Industry benchmarking and competitive analysis</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Channel effectiveness models</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">ROI probability mapping</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Objective-based optimization</p>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-3 md:order-1">
                  <div className="bg-navy-light/5 p-6 rounded-xl border border-navy-light/20">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
                        <PieChart className="text-[#64378e] mb-2 h-12 w-12" />
                        <h5 className="font-medium text-navy">Market Analysis</h5>
                        <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                          <div className="bg-[#64378e] h-2 rounded-full w-3/4"></div>
                        </div>
                        <p className="text-xs text-navy-light mt-2">Processing: 75%</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
                        <BarChart2 className="text-[#64378e] mb-2 h-12 w-12" />
                        <h5 className="font-medium text-navy">Budget Optimization</h5>
                        <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                          <div className="bg-[#64378e] h-2 rounded-full w-5/6"></div>
                        </div>
                        <p className="text-xs text-navy-light mt-2">Processing: 83%</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                      <h5 className="font-medium text-navy mb-3">Algorithm Processing</h5>
                      <div className="space-y-2 text-sm">
                        <p className="text-navy-light flex items-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          Analyzing industry benchmarks...
                        </p>
                        <p className="text-navy-light flex items-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          Mapping channel effectiveness...
                        </p>
                        <p className="text-navy-light flex items-center">
                          <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                          Calculating ROI probability...
                        </p>
                        <p className="text-navy-light flex items-center">
                          <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                          Finalizing recommendations...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="h-16 border-l-2 border-dashed border-accent/30"></div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#64378e]">3</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-navy">Strategic Recommendations</h3>
                  <p className="text-navy-light mb-4">
                    Receive comprehensive, actionable budget recommendations and strategic guidelines tailored to your business.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Detailed budget allocation by channel</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Implementation timelines and roadmaps</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Strategic rationale and explanations</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-navy-light">Downloadable reports and action plans</p>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-3">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-semibold text-navy">Budget Recommendation Report</h4>
                      <Button variant="outline" size="sm" className="flex items-center text-navy hover:bg-[#64378e] hover:text-[#fff]">
                        <Download size={16} className="mr-1" /> Export
                      </Button>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h5 className="text-sm font-medium text-navy-light mb-2">Channel Allocation</h5>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="h-32 flex items-end space-x-2">
                            <div className="h-[80%] w-full bg-[#64378e]/80 rounded-t-md"></div>
                            <div className="h-[60%] w-full bg-[#64378e]/70 rounded-t-md"></div>
                            <div className="h-[45%] w-full bg-[#64378e]/60 rounded-t-md"></div>
                            <div className="h-[30%] w-full bg-[#64378e]/50 rounded-t-md"></div>
                            <div className="h-[20%] w-full bg-[#64378e]/40 rounded-t-md"></div>
                          </div>
                          <div className="flex justify-between text-xs text-navy-light mt-2">
                            <span>Digital</span>
                            <span>Content</span>
                            <span>PR</span>
                            <span>Events</span>
                            <span>Print</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-navy-light mb-2">Timeline Summary</h5>
                          <div className="bg-gray-50 p-4 rounded-lg h-24 flex items-center justify-center">
                            <div className="text-center">
                              <FileText className="h-8 w-8 text-[#64378e] mx-auto mb-1" />
                              <span className="text-xs text-navy-light">Quarterly Roadmap</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-navy-light mb-2">ROI Projection</h5>
                          <div className="bg-gray-50 p-4 rounded-lg h-24 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#64378e]">24%</div>
                              <span className="text-xs text-navy-light">Estimated Return</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">What MIBBS<span className="text-[#64378e] text-sm align-super">™</span> Delivers</h2>
            <p className="section-subtitle">
              Each MIBBS recommendation includes comprehensive resources to guide your brand budgeting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card hover:-translate-y-2">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-[#64378e]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy">Budget Allocation Plan</h3>
              <p className="text-navy-light mb-4">
                Detailed breakdown of how to distribute your budget across different brand-building channels.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light text-sm">Percentage-based allocation</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light text-sm">Channel prioritization</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light text-sm">Spend optimization strategy</p>
                </li>
              </ul>
              <Button variant="ghost" className="text-[#64378e] hover:bg-[#64378e] hover:text-[#fff]">
                View Sample <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="card hover:-translate-y-2">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-[#64378e]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy">Strategic Roadmap</h3>
              <p className="text-navy-light mb-4">
                Timeline-based implementation plan for your brand budgeting strategy across quarters.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light text-sm">Quarterly planning structure</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light text-sm">Seasonal optimization</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light text-sm">Key milestone planning</p>
                </li>
              </ul>
              <Button variant="ghost" className="text-[#64378e] hover:bg-[#64378e] hover:text-[#fff]">
                View Sample <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="card hover:-translate-y-2">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-[#64378e]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy">ROI Analysis</h3>
              <p className="text-navy-light mb-4">
                Projected return on investment for your brand budget allocation with impact assessment.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light text-sm">Channel effectiveness scores</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light text-sm">Brand impact projections</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center text-[#64378e] mr-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-navy-light text-sm">Performance tracking metrics</p>
                </li>
              </ul>
              <Button variant="ghost" className="text-[#64378e] hover:bg-[#64378e] hover:text-[#fff]">
                View Sample <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-16 text-center ">
            <Button className="btn-primary bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]" asChild>
              <a href="/tools">Explore Templates & Tools</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Sample Outputs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Example Outputs</h2>
            <p className="section-subtitle">
              See samples of what MIBBS provides to help you understand the value before you start.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <BarChart2 className="h-16 w-16 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-navy mb-2">D2C Brand Budget</h3>
                <p className="text-sm text-navy-light mb-4">
                  Sample budget allocation for a direct-to-consumer brand in growth stage.
                </p>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <BarChart2 className="h-16 w-16 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-navy mb-2">SaaS Brand Strategy</h3>
                <p className="text-sm text-navy-light mb-4">
                  Strategic brand budget roadmap for SaaS company entering Indian market.
                </p>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <BarChart2 className="h-16 w-16 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-navy mb-2">FMCG Brand Plan</h3>
                <p className="text-sm text-navy-light mb-4">
                  Comprehensive brand budgeting template for established FMCG brands.
                </p>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code CTA */}
      <QRCodeSection />
    </div>
  );
};

export default HowItWorks;
