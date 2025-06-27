
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">Pricing & Plans</h1>
            <p className="text-xl mb-8 text-navy-light">
              Simple, transparent pricing for businesses of all sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto mb-12">
            <div className="bg-gray-100 p-1 rounded-lg flex w-full max-w-xs mx-auto">
              <button
                onClick={() => setIsAnnual(true)}
                className={`w-1/2 py-2 text-sm font-medium rounded-md transition-all ${
                  isAnnual 
                    ? "bg-white text-navy shadow-sm" 
                    : "text-navy-light hover:text-navy"
                }`}
              >
                Annual (20% off)
              </button>
              <button
                onClick={() => setIsAnnual(false)}
                className={`w-1/2 py-2 text-sm font-medium rounded-md transition-all ${
                  !isAnnual 
                    ? "bg-white text-navy shadow-sm" 
                    : "text-navy-light hover:text-navy"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-navy">Free</h3>
                <p className="text-navy-light mb-4">Basic access to get started</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-navy">₹0</span>
                  <span className="text-navy-light ml-2">/month</span>
                </div>
              </div>
              <div className="p-6 space-y-4 flex-grow">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Basic budget recommendations</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">1 downloadable PDF report</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Access to free templates</span>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <Button variant="outline" className="w-full hover:bg-[#64378e] hover:text-[#fff]">Get Started Free</Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl overflow-hidden border border-accent shadow-md hover:shadow-lg transition-all flex flex-col relative">
              <div className="absolute top-0 left-0 right-0 bg-[#ac89b9] text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
              <div className="p-6 border-b border-gray-200 mt-6">
                <h3 className="text-xl font-semibold mb-2 text-navy">Pro</h3>
                <p className="text-navy-light mb-4">Full access to all features</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-navy">₹{isAnnual ? '79' : '99'}</span>
                  <span className="text-navy-light ml-2">/month</span>
                </div>
                {isAnnual && (
                  <p className="text-accent text-sm mt-2">Billed ₹948 annually</p>
                )}
              </div>
              <div className="p-6 space-y-4 flex-grow">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">All Free features, plus:</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Advanced budget recommendations</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Unlimited PDF exports</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Quarterly planning tools</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Channel-specific breakdown</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Budget tracking dashboard</span>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <Button className="w-full btn-primary bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]">Subscribe Now</Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-navy">Enterprise</h3>
                <p className="text-navy-light mb-4">Custom solutions for large businesses</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-navy">Custom</span>
                </div>
              </div>
              <div className="p-6 space-y-4 flex-grow">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">All Pro features, plus:</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Dedicated account manager</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Custom brand analytics</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Multiple brand management</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Expert consultation sessions</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-3 mt-0.5" />
                  <span className="text-navy-light">Enterprise API access</span>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <Button variant="outline" className="w-full hover:bg-[#64378e] hover:text-[#fff]">Contact Sales</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Plan Comparison</h2>
            <p className="section-subtitle mx-auto">
              Detailed feature breakdown for each MIBBS<span className="text-accent text-sm align-super">™</span> plan.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-[#64378e]font-semibold">Features</th>
                  <th className="py-4 px-6 text-center text-[#64378e] font-semibold">Free</th>
                  <th className="py-4 px-6 text-center text-[#64378e] font-semibold bg-accent/5">Pro</th>
                  <th className="py-4 px-6 text-center text-[#64378e] font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {/* Basic Features */}
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td colSpan={4} className="py-3 px-6 font-semibold text-navy">Basic Features</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-navy-light">Budget Calculator</td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                  <td className="py-3 px-6 text-center bg-accent/5"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-navy-light">Industry Benchmarks</td>
                  <td className="py-3 px-6 text-center"><span className="text-navy-light">Limited</span></td>
                  <td className="py-3 px-6 text-center bg-accent/5"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-navy-light">PDF Reports</td>
                  <td className="py-3 px-6 text-center"><span className="text-[#64378e]">1</span></td>
                  <td className="py-3 px-6 text-center bg-accent/5"><span className="text-navy-light">Unlimited</span></td>
                  <td className="py-3 px-6 text-center"><span className="text-navy-light">Unlimited</span></td>
                </tr>

                {/* Advanced Features */}
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td colSpan={4} className="py-3 px-6 font-semibold text-navy">Advanced Features</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-navy-light">Quarterly Planning Tools</td>
                  <td className="py-3 px-6 text-center"><span className="text-[#64378e]">—</span></td>
                  <td className="py-3 px-6 text-center bg-accent/5"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-navy-light">Channel-specific Breakdown</td>
                  <td className="py-3 px-6 text-center"><span className="text-navy-light">—</span></td>
                  <td className="py-3 px-6 text-center bg-accent/5"><Check className="h-5 w-5 ttext-[#64378e] mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-navy-light">Budget Tracking Dashboard</td>
                  <td className="py-3 px-6 text-center"><span className="text-navy-light">—</span></td>
                  <td className="py-3 px-6 text-center bg-accent/5"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                </tr>

                {/* Premium Features */}
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td colSpan={4} className="py-3 px-6 font-semibold text-navy">Premium Features</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-navy-light">Dedicated Account Manager</td>
                  <td className="py-3 px-6 text-center"><span className="text-[#64378e]">—</span></td>
                  <td className="py-3 px-6 text-center bg-accent/5"><span className="text-[#64378e]">—</span></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-navy-light">Custom Brand Analytics</td>
                  <td className="py-3 px-6 text-center"><span className="text-[#64378e]">—</span></td>
                  <td className="py-3 px-6 text-center bg-accent/5"><span className="text-[#64378e]">—</span></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-navy-light">Expert Consultation Sessions</td>
                  <td className="py-3 px-6 text-center"><span className="text-[#64378e]">—</span></td>
                  <td className="py-3 px-6 text-center bg-accent/5"><span className="text-navy-light">1/quarter</span></td>
                  <td className="py-3 px-6 text-center"><span className="text-navy-light">Monthly</span></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-6 text-navy-light">API Access</td>
                  <td className="py-3 px-6 text-center"><span className="text-[#64378e]">—</span></td>
                  <td className="py-3 px-6 text-center bg-accent/5"><span className="text-[#64378e]">—</span></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-[#64378e] mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto">
              Find answers to common questions about MIBBS<span className="text-accent text-sm align-super">™</span> plans and pricing.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3 text-navy">Can I switch between plans?</h3>
              <p className="text-navy-light">
                Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to additional features. When downgrading, changes will take effect at the end of your billing cycle.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3 text-navy">Is there a free trial for paid plans?</h3>
              <p className="text-navy-light">
                Yes, all paid plans come with a 14-day free trial. No credit card required until you decide to continue with a paid subscription.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3 text-navy">Do you offer discounts for agencies or educational institutions?</h3>
              <p className="text-navy-light">
                Yes, we offer special pricing for marketing agencies, educational institutions, and non-profit organizations. Contact our sales team for details.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3 text-navy">What payment methods do you accept?</h3>
              <p className="text-navy-light">
                We accept all major credit cards, UPI payments, and bank transfers for annual enterprise plans. All payments are securely processed through Razorpay.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-3 text-navy">Can I get a refund if I'm not satisfied?</h3>
              <p className="text-navy-light">
                We offer a 30-day money-back guarantee for all paid plans. If you're not completely satisfied, contact our support team within 30 days of subscription for a full refund.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-navy-light mb-6">Still have questions about our plans?</p>
            <Button className="btn-primary bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]">Contact Support</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Brand Budgeting?</h2>
            <p className="text-xl mb-8">
              Join thousands of Indian businesses using MIBBS<span className="text-accent-light text-sm align-super">™</span> to make data-backed brand investment decisions.
            </p>
            <Button className="bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff] text-white font-semibold py-3 px-6 rounded-md transition-all duration-300">
              Get Started Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
