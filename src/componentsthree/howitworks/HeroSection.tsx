import { Store } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-white pt-12 pb-16 px-4 sm:pt-16 sm:pb-20 md:py-24 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8 sm:gap-10 md:grid md:grid-cols-2 md:gap-12 items-center">
          <div
            className={`flex justify-center md:hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-10">
                <Store className="w-24 h-24 text-mibbs-purple" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-green-500 text-white rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 text-center md:text-left">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-mibbs-purple leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '300ms' }}
            >
              How MIBBS Works with You
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '500ms' }}
            >
              Building your brand budget is as simple as answering a few questions. No jargon, no confusion just clear steps designed for Indian business owners.
            </p>
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: '700ms' }}
            >
              <Link
                to="/mibbsapp"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-500 active:from-purple-700 active:to-pink-600 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg shadow-lg active:shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 hover:scale-105 touch-manipulation"
              >
                Build My Brand Budget
              </Link>
            </div>
          </div>

          <div
            className={`hidden md:flex justify-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12">
                <Store className="w-32 h-32 lg:w-40 lg:h-40 text-mibbs-purple" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-full p-4 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
