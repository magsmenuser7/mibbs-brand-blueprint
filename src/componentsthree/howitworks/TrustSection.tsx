import { Gift, Flag, Users, Award } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const badges = [
    {
      icon: <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-mibbs-purple" strokeWidth={1.5} />,
      title: '100% Free to Use',
      delay: '0ms',
    },
    {
      icon: <Flag className="w-10 h-10 sm:w-12 sm:h-12 text-mibbs-purple" strokeWidth={1.5} />,
      title: 'Made in India',
      delay: '100ms',
    },
    {
      icon: <Users className="w-10 h-10 sm:w-12 sm:h-12 text-mibbs-purple" strokeWidth={1.5} />,
      title: '50,000+ Businesses Trust Us',
      delay: '200ms',
    },
    {
      icon: <Award className="w-10 h-10 sm:w-12 sm:h-12 text-mibbs-purple" strokeWidth={1.5} />,
      title: 'Certified Agencies',
      delay: '300ms',
    },
  ];

  return (
    <section ref={sectionRef} className="bg-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-mibbs-purple mb-3 sm:mb-4 px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            MIBBS Works With You, Not For Experts Only
          </h2>
          <p
            className={`text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
          >
            Built for Indian MSME owners who want to grow their brand without confusion or expensive consultants.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm active:shadow-mibbs p-5 sm:p-6 text-center transition-all duration-700 active:scale-95 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: isVisible ? badge.delay : '0ms' }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-3 sm:p-4">
                  {badge.icon}
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-snug">{badge.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
