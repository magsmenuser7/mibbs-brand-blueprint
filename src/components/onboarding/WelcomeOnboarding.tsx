import React, { useState } from 'react';
import { ChevronRight, Building2, MapPin, Target, TrendingUp, Users, Calendar } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface WelcomeOnboardingProps {
  onComplete: (data: any) => void;
}

const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    founderType: '',
    location: '',
    industry: '',
    yearsInBusiness: '',
    digitalMaturity: '',
    brandGoals: []
  });

  const founderTypes = [
    {
      id: 'first-time',
      title: 'First-time Founder',
      description: 'Just starting my entrepreneurial journey',
      icon: '🌱',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'growing',
      title: 'Growing Brand',
      description: 'Have some traction, ready to scale',
      icon: '📈',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'scaling',
      title: 'Scaling Enterprise',
      description: 'Established business, expanding reach',
      icon: '🚀',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const industries = [
    'Food & Beverages', 'Fashion & Apparel', 'Health & Wellness', 'Technology',
    'Education', 'Beauty & Personal Care', 'Home & Garden', 'Professional Services',
    'Manufacturing', 'Retail', 'Agriculture', 'Handicrafts', 'Textiles', 'Other'
  ];

  const yearsOptions = [
    'Just starting (0-6 months)',
    'Early stage (6 months - 2 years)',
    'Growing (2-5 years)',
    'Established (5+ years)'
  ];

  const digitalMaturityOptions = [
    {
      id: 'beginner',
      title: 'Digital Beginner',
      description: 'Basic social media presence',
      icon: '📱'
    },
    {
      id: 'intermediate',
      title: 'Digitally Active',
      description: 'Regular posting, some paid ads',
      icon: '💻'
    },
    {
      id: 'advanced',
      title: 'Digital Native',
      description: 'Multi-platform, analytics-driven',
      icon: '🎯'
    }
  ];

  const brandGoalsOptions = [
    'Increase brand awareness',
    'Generate more leads',
    'Improve brand perception',
    'Launch new products',
    'Expand to new markets',
    'Build customer loyalty',
    'Establish thought leadership',
    'Compete with bigger brands'
  ];

  // Existing Code 
  // const handleNext = () => {
  //   if (currentStep < 4) {
  //     setCurrentStep(currentStep + 1);
  //   } else {
  //     onComplete(onboardingData);
  //   }
  // };



  //New code 
   const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // ✅ navigate when last step is complete
      navigate("/budgeting-questionnaire", { state: onboardingData });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (field: string, value: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleGoal = (goal: string) => {
    setOnboardingData(prev => ({
      ...prev,
      brandGoals: prev.brandGoals.includes(goal)
        ? prev.brandGoals.filter(g => g !== goal)
        : [...prev.brandGoals, goal]
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.founderType;
      case 2:
        return onboardingData.location && onboardingData.industry;
      case 3:
        return onboardingData.yearsInBusiness && onboardingData.digitalMaturity;
      case 4:
        return onboardingData.brandGoals.length > 0;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Let's understand your brand journey
              </h2>
              <p className="text-xl text-gray-600">
                Before we recommend how to grow it
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {founderTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateData('founderType', type.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    onboardingData.founderType === type.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-2xl`}>
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{type.title}</h3>
                      <p className="text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tell us about your business
              </h2>
              <p className="text-xl text-gray-600">
                This helps us find the right partners for you
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <MapPin className="w-5 h-5 inline mr-2" />
                  Where is your business located?
                </label>
                <input
                  type="text"
                  value={onboardingData.location}
                  onChange={(e) => updateData('location', e.target.value)}
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g., Mumbai, Maharashtra"
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <Building2 className="w-5 h-5 inline mr-2" />
                  What industry are you in?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => updateData('industry', industry)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        onboardingData.industry === industry
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your business maturity
              </h2>
              <p className="text-xl text-gray-600">
                This helps us customize recommendations
              </p>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <Calendar className="w-5 h-5 inline mr-2" />
                  How long have you been in business?
                </label>
                <div className="space-y-3">
                  {yearsOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => updateData('yearsInBusiness', option)}
                      className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                        onboardingData.yearsInBusiness === option
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <TrendingUp className="w-5 h-5 inline mr-2" />
                  How would you describe your digital presence?
                </label>
                <div className="grid grid-cols-1 gap-4">
                  {digitalMaturityOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => updateData('digitalMaturity', option.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        onboardingData.digitalMaturity === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{option.title}</h4>
                          <p className="text-gray-600">{option.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What are your brand goals?
              </h2>
              <p className="text-xl text-gray-600">
                Select all that apply for the next 6 months
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brandGoalsOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
                    onboardingData.brandGoals.includes(goal)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{goal}</span>
                    {onboardingData.brandGoals.includes(goal) && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of 4</span>
              <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-mibbs-gradient h-3 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-12">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center space-x-2 px-8 py-4 bg-mibbs-gradient text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>{currentStep === 4 ? 'Start My Brand Budgeting' : 'Continue'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOnboarding;