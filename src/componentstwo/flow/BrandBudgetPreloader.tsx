import React, { useEffect, useState } from 'react';
import { TrendingUp, MapPin, Brain, Building2, Briefcase, ShoppingBag, Factory, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


interface PreloaderProps {
  onComplete?: () => void;
}


interface SignupModalProps {
  isOpen: boolean;
  onComplete: (userData: any) => void;
  onClose: () => void;
  assessmentData?: any;
}

const STAGE_DURATION = 2500;

export default function BrandBudgetPreloader({ onComplete }: PreloaderProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);


  const { signup, login } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  


  const stages = [
    {
      title: 'Gathering data based on pincode & industry',
      subtitle: 'Mapping market intelligence',
      icon: MapPin,
    },
    {
      title: 'Analyzing business requirements',
      subtitle: 'Processing strategic inputs',
      icon: Brain,
    },
    {
      title: 'Building brand budgeting plan',
      subtitle: 'Engineering financial blueprint',
      icon: TrendingUp,
    },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (STAGE_DURATION / 50));
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentStage]);

  useEffect(() => {
    if (currentStage < stages.length) {
      const timer = setTimeout(() => {
        if (currentStage === stages.length - 1) {
          setTimeout(() => {
            onComplete?.();
          }, STAGE_DURATION);
        }
        setCurrentStage(prev => prev + 1);
        setProgress(0);
      }, STAGE_DURATION);

      return () => clearTimeout(timer);
    }
  }, [currentStage, stages.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6B46C1] rounded-full filter blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EC4899] rounded-full filter blur-[120px] animate-pulse-slow-delayed" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6 md:px-8">
        {currentStage === 0 && <Stage1Gathering progress={progress} />}
        {currentStage === 1 && <Stage2Analyzing progress={progress} />}
        {currentStage === 2 && <Stage3Building progress={progress} />}

        <div className="mt-8 sm:mt-12 md:mt-16 text-center space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 animate-slide-up">
            {React.createElement(stages[Math.min(currentStage, stages.length - 1)].icon, {
              className: 'w-5 h-5 sm:w-6 sm:h-6 text-[#EC4899]',
              strokeWidth: 2,
            })}
            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 tracking-wide text-center">
              {stages[Math.min(currentStage, stages.length - 1)].title}
            </h2>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 px-4">
            {stages[Math.min(currentStage, stages.length - 1)].subtitle}
            <span className="inline-flex gap-1">
              <span className="animate-dot-pulse">.</span>
              <span className="animate-dot-pulse-delayed">.</span>
              <span className="animate-dot-pulse-more-delayed">.</span>
            </span>
          </p>

          <div className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6B46C1] via-[#8B5CF6] to-[#EC4899] rounded-full transition-all duration-300 ease-out shadow-lg shadow-[#6B46C1]/50"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            {stages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index <= currentStage
                    ? 'bg-[#EC4899] shadow-lg shadow-[#EC4899]/50 scale-110'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stage1Gathering({ progress }: { progress: number }) {
  const industries = [
    { icon: ShoppingBag, label: 'Retail', delay: 0 },
    { icon: Briefcase, label: 'SaaS', delay: 200 },
    { icon: Building2, label: 'FMCG', delay: 400 },
    { icon: Factory, label: 'Manufacturing', delay: 600 },
    { icon: Sparkles, label: 'Luxury', delay: 800 },
  ];

  return (
    <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-full h-full opacity-20" viewBox="0 0 600 400">
          <path
            d="M 300 50 Q 350 100 380 150 L 400 180 L 380 220 Q 350 260 320 280 L 280 300 L 240 280 Q 210 260 180 220 L 160 180 L 180 150 Q 210 100 260 50 Z"
            fill="none"
            stroke="url(#mapGradient)"
            strokeWidth="2"
            className="animate-draw-path"
          />
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 80 + Math.random() * 40;
            const cx = 300 + Math.cos(angle) * radius;
            const cy = 200 + Math.sin(angle) * radius;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="3"
                fill="#8B5CF6"
                className="animate-pulse-glow"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            );
          })}
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B46C1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64">
          <div className="absolute inset-0 border-2 border-[#6B46C1]/30 rounded-full animate-ping-slow" />
          <div className="absolute inset-4 border-2 border-[#8B5CF6]/40 rounded-full animate-ping-slow-delayed" />
          <div className="absolute inset-8 border-2 border-[#EC4899]/50 rounded-full animate-ping-slow-more-delayed" />

          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#EC4899] animate-bounce-subtle" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {industries.map((industry, index) => {
          const angle = (index / industries.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 180;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;

          return (
            <div
              key={industry.label}
              className="absolute animate-float-in"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${industry.delay}ms`,
              }}
            >
              <div className="relative group hidden sm:block">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6B46C1]/10 to-[#EC4899]/10 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-xl">
                  {React.createElement(industry.icon, {
                    className: 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#8B5CF6]',
                    strokeWidth: 2,
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#8B5CF6] rounded-full animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function Stage2Analyzing({ progress }: { progress: number }) {
  const nodes = [
    { x: 50, y: 30, label: 'Goals' },
    { x: 30, y: 50, label: 'Industry' },
    { x: 70, y: 50, label: 'Target' },
    { x: 40, y: 70, label: 'Budget' },
    { x: 60, y: 70, label: 'Stage' },
    { x: 50, y: 90, label: 'Strategy' },
  ];

  return (
    <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B46C1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((targetNode, j) => (
            <line
              key={`${i}-${j}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${targetNode.x}%`}
              y2={`${targetNode.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-draw-line"
              style={{ animationDelay: `${(i + j) * 100}ms` }}
            />
          ))
        )}
      </svg>

      {nodes.map((node, index) => (
        <div
          key={node.label}
          className="absolute animate-scale-in"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${index * 150}ms`,
          }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-[#6B46C1]/10 rounded-xl sm:rounded-2xl blur-xl animate-pulse-glow" />
            <div className="relative bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 shadow-xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#EC4899] rounded-full animate-pulse-glow" />
                <span className="text-gray-900 text-xs sm:text-sm font-light tracking-wider whitespace-nowrap">{node.label}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="absolute inset-0 animate-spin-slow">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-transparent border-t-[#8B5CF6]/30 rounded-full"
                style={{
                  width: `${(i + 1) * 100}px`,
                  height: `${(i + 1) * 100}px`,
                  margin: 'auto',
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-px h-8 bg-gradient-to-b from-transparent via-[#8B5CF6] to-transparent animate-data-stream"
          style={{
            left: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1.5 + Math.random()}s`,
          }}
        />
      ))}
    </div>
  );
}

function Stage3Building({ progress }: { progress: number }) {
  const budgetCategories = [
    { label: 'Brand', height: 85, color: 'from-[#6B46C1] to-[#8B5CF6]' },
    { label: 'Digital', height: 70, color: 'from-[#8B5CF6] to-[#A78BFA]' },
    { label: 'Content', height: 60, color: 'from-[#A78BFA] to-[#EC4899]' },
    { label: 'Growth', height: 75, color: 'from-[#EC4899] to-[#F472B6]' },
    { label: 'Operations', height: 55, color: 'from-[#F472B6] to-[#F9A8D4]' },
  ];

  return (
    <div className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center">
      <div className="absolute inset-0 flex items-end justify-center gap-3 sm:gap-5 md:gap-8 pb-8 sm:pb-10 md:pb-12">
        {budgetCategories.map((category, index) => (
          <div
            key={category.label}
            className="relative flex flex-col items-center gap-3 animate-rise-up"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="relative w-12 sm:w-16 md:w-20 bg-gray-100 backdrop-blur-sm rounded-t-lg overflow-hidden border border-gray-200 shadow-xl">
              <div
                className={`w-full bg-gradient-to-t ${category.color} transition-all duration-1000 ease-out relative overflow-hidden`}
                style={{ height: `${category.height * (progress / 100)}px` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-shimmer-vertical" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/20 rounded-full blur-xl animate-pulse-glow" />
              </div>
            </div>
            <span className="text-gray-600 text-[10px] sm:text-xs font-light tracking-wider hidden sm:block">{category.label}</span>
          </div>
        ))}
      </div>

      <div className="absolute top-4 sm:top-6 md:top-8 left-0 right-0">
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 animate-fade-in">
          {[25, 50, 75, 100].map((percentage, index) => (
            <div
              key={percentage}
              className="relative animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(209, 213, 219, 0.5)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#ringGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45 * (percentage / 100)} ${2 * Math.PI * 45}`}
                  transform="rotate(-90 50 50)"
                  className="animate-draw-circle"
                  style={{ animationDelay: `${index * 150}ms` }}
                />
                <defs>
                  <linearGradient id="ringGradient">
                    <stop offset="0%" stopColor="#6B46C1" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#EC4899] text-sm sm:text-base md:text-lg font-light">{percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20" viewBox="0 0 600 400">
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1={50 + i * 40}
              x2="550"
              y2={50 + i * 40}
              stroke="#d1d5db"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </svg>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center px-4">
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl sm:rounded-2xl px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 shadow-xl animate-slide-up">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-[#EC4899] rounded-full animate-pulse-glow" />
            <span className="text-gray-900 text-xs sm:text-sm font-light tracking-wider">Blueprint Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
}
