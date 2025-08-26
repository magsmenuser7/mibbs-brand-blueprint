import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import navigate, { useNavigate } from 'react-router-dom';


const FAQ = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "Is MIBBS really completely free?",
      answer: "Yes! MIBBS is completely free for all users. There are no hidden costs, subscription fees, or premium tiers. Our mission is to help every Indian business transform from idea to market leader, regardless of their budget size. We believe strategic guidance should be accessible to all."
    },
    {
      question: "How does the agency marketplace work?",
      answer: "Once MIBBS creates your strategic plan, our system automatically shows you verified local agencies in your city and state. These include marketing agencies, PR firms, design studios, and branding experts. You can browse their profiles, see their work, and connect directly. For agencies, joining our marketplace is also completely free."
    },
    {
      question: "What cities and states does MIBBS cover?",
      answer: "MIBBS covers all cities and states across India. Whether you're in a metro like Mumbai or Delhi, or a smaller city like Mangalore or Dharamshala, our system provides location-specific insights and connects you with local agencies. Our goal is to ensure every business, everywhere in India, has access to strategic guidance."
    },
    {
      question: "How do I track my progress from business to brand leader?",
      answer: "MIBBS provides a comprehensive dashboard where you can input your actual spending against our strategic recommendations. This helps us understand your commitment to the system and provides you with better insights. You'll see your progress through different stages: Idea → Business → Brand → Leader, with actionable next steps at each stage."
    },
    {
      question: "How can agencies join the MIBBS marketplace?",
      answer: "Agencies can join our marketplace completely free. We onboard marketing agencies, PR firms, advertising agencies, branding experts, and design studios. Once verified, you'll be listed in our location-based directory and connected with businesses in your area who need your services. It's a great way to grow your client base."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Common <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about starting your free journey to market leadership.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left focus:outline-none focus:ring-4 focus:ring-purple-500/20 hover:bg-purple-50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-800 pr-8">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 transition-transform duration-300 ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}>
                    {openFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-purple-500" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>
              
              <div className={`transition-all duration-500 overflow-hidden ${
                openFAQ === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">
              Ready to start your transformation?
            </h3>
            <p className="text-purple-700 text-lg mb-6">
              Join thousands of businesses already on their journey to market leadership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/dashboard")} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-xl hover:scale-105 transform hover:-translate-y-1">
                Start Free Now
              </button>
              <button onClick={() => navigate("/landing")}  className="border-2 border-purple-500 text-purple-500 px-8 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300">
                Join as Agency
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;