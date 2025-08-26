import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import navigate, { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does MIBBS ensure lead quality?",
      answer: "Every lead on MIBBS comes from businesses that have completed our AI-powered budgeting tool. This means they have a clear budget allocation, defined project scope, and genuine intent to hire an agency. We also verify business credentials and filter out tire-kickers."
    },
    {
      question: "What's the difference between free and certified agencies?",
      answer: "Free agencies get basic access to leads and can send proposals. Certified agencies get priority placement, verified badges, access to high-value clients, early RFP invites, and additional features like team access and advanced analytics. Certification costs ₹499 one-time."
    },
    {
      question: "How do credits work?",
      answer: "Credits are used to access leads and send proposals. Each lead costs 1-3 credits depending on budget size. Credits don't expire and can be topped up anytime. You can also pause your subscription and resume later without losing credits."
    },
    {
      question: "Can I see leads before spending credits?",
      answer: "Yes! You can see basic lead information (industry, location, budget range, project type) before deciding to spend credits. Once you spend credits, you get full contact details and can send proposals directly."
    },
    {
      question: "Do you take commission from deals?",
      answer: "No, never. MIBBS operates on a credit-based model. Once you connect with a client, all negotiations and payments happen directly between you and them. We don't take any percentage of your earnings."
    },
    {
      question: "What if I'm not satisfied with lead quality?",
      answer: "We offer a satisfaction guarantee. If you're not happy with lead quality in your first month, we'll refund your credits. We also continuously improve our matching algorithm based on feedback."
    },
    {
      question: "Can I target specific locations and industries?",
      answer: "Absolutely! You can set preferences for specific pincodes, cities, industries, budget ranges, and project types. Our AI matching system will prioritize leads that fit your criteria."
    },
    {
      question: "How quickly do I need to respond to leads?",
      answer: "We recommend responding within 2-4 hours for best results. Leads are shown to multiple agencies, so quick response times improve your chances. You'll get instant notifications when new matching leads arrive."
    },
    {
      question: "Is there a contract or can I cancel anytime?",
      answer: "No contracts required. You can pause, upgrade, downgrade, or cancel your subscription anytime. Unused credits remain in your account and don't expire."
    },
    {
      question: "What support do you provide?",
      answer: "We provide onboarding support, proposal templates, pricing guidance, and ongoing customer success support. Certified agencies get priority support and dedicated account management."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about partnering with MIBBS
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={`bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-500 animate-fadeInUp stagger-${(index % 5) + 1}`}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-all duration-300 group"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0 group-hover:text-mibbs-primary transition-colors duration-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0 group-hover:text-mibbs-primary transition-colors duration-300" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 animate-fadeInUp">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-16 bg-mibbs-light rounded-2xl p-8 hover:shadow-xl transition-all duration-500 animate-fadeInUp stagger-5">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help you get started with MIBBS
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/dashboard")} className="bg-gradient-to-r from-mibbs-primary to-mibbs-secondary text-white px-6 py-3 rounded-lg hover:from-mibbs-secondary hover:to-mibbs-accent transition-all duration-500 font-semibold transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
              Schedule a Demo
            </button>
            <button onClick={() => navigate("/contact")} className="border border-mibbs-primary text-mibbs-primary px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-mibbs-primary hover:to-mibbs-secondary hover:text-white transition-all duration-500 font-semibold transform hover:-translate-y-1 hover:scale-105">
              Contact Support
            </button>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-mibbs-secondary/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-mibbs-accent/5 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>
    </section>
  );
};

export default FAQ;