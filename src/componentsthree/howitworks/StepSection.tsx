import { ReactNode, useEffect, useRef, useState } from 'react';

interface StepSectionProps {
  stepNumber: string;
  title: string;
  description: string;
  icon: ReactNode;
  microCopy: string[];
  infoFields?: ReactNode;
  exampleText: string;
  reverseLayout?: boolean;
  bgGray?: boolean;
}

export default function StepSection({
  stepNumber,
  title,
  description,
  icon,
  microCopy,
  infoFields,
  exampleText,
  reverseLayout = false,
  bgGray = false,
}: StepSectionProps) {
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

  return (
    <section
      ref={sectionRef}
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 ${bgGray ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col gap-8 sm:gap-10 md:grid md:grid-cols-2 md:gap-12 items-center ${reverseLayout ? 'md:flex-row-reverse' : ''}`}>
          <div
            className={`flex justify-center w-full ${reverseLayout ? 'md:order-2' : ''} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 sm:p-10 md:p-12">
              {icon}
            </div>
          </div>

          <div
            className={`space-y-5 sm:space-y-6 w-full ${reverseLayout ? 'md:order-1' : ''} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
          >
            <div className="space-y-3 sm:space-y-4">
              <span className="text-xs sm:text-sm font-semibold text-purple-600 tracking-wider uppercase">
                {stepNumber}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-mibbs-purple leading-tight">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 space-y-2.5">
              {microCopy.map((copy, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700">{copy}</span>
                </div>
              ))}
            </div>

            {infoFields && (
              <div
                className={`space-y-3 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
              >
                {infoFields}
              </div>
            )}

            <div className="border-l-4 border-pink-500 bg-white rounded-r-lg p-4 shadow-sm">
              <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed">
                <span className="font-semibold text-gray-800">Example:</span> {exampleText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
