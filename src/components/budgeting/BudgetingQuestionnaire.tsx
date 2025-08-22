import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Target, DollarSign, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import BudgetReport from './BudgetReport';
import { BudgetData } from '../../types';
import { indianStates, getCitiesByState, isValidIndianPincode } from '../../data/indianLocations';

const BudgetingQuestionnaire: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const [finalBudgetData, setFinalBudgetData] = useState<BudgetData | null>(null);
  const [budgetData, setBudgetData] = useState<Partial<BudgetData>>({
    businessType: '',
    industry: '',
    monthlyRevenue: '',
    currentMarketing: [],
    goals: [],
    timeline: '',
    location: {
      city: '',
      state: '',
      pincode: '',
    },
  });
  const { updateUser } = useAuth();

  const totalSteps = 6;

  const businessTypes = [
    { id: 'product', label: 'Product Business', desc: 'Selling physical products' },
    { id: 'service', label: 'Service Business', desc: 'Providing services to customers' },
    { id: 'retail', label: 'Retail Store', desc: 'Physical or online store' },
    { id: 'restaurant', label: 'Restaurant/F&B', desc: 'Food and beverage business' },
    { id: 'manufacturing', label: 'Manufacturing', desc: 'Making products to sell' },
    { id: 'other', label: 'Other', desc: 'Something else' },
  ];

  const industries = [
    'Agriculture & Food Processing', 'Textiles & Garments', 'Handicrafts & Handloom',
    'Leather & Leather Products', 'Gems & Jewellery', 'Chemicals & Pharmaceuticals',
    'Engineering & Auto Components', 'Electronics & IT Hardware', 'Food & Beverages',
    'Retail & E-commerce', 'Healthcare Services', 'Education & Training',
    'Tourism & Hospitality', 'Beauty & Personal Care', 'Professional Services', 'Other'
  ];

  const revenueRanges = [
    'Under ₹1 Lakh/month',
    '₹1-5 Lakhs/month', 
    '₹5-10 Lakhs/month',
    '₹10-25 Lakhs/month',
    '₹25-50 Lakhs/month',
    'Above ₹50 Lakhs/month'
  ];

  const marketingChannels = [
    'Social Media (Facebook, Instagram)',
    'Google Ads',
    'Print Advertising',
    'Radio/TV',
    'Influencer Marketing',
    'Email Marketing',
    'WhatsApp Marketing',
    'Local Events/Sponsorships',
    'Word of Mouth',
    'None - Just starting'
  ];

  const businessGoals = [
    'Increase brand awareness',
    'Generate more leads',
    'Boost online sales',
    'Expand to new markets',
    'Launch new products',
    'Improve customer retention',
    'Build professional image',
    'Compete with bigger brands'
  ];

  const timelines = [
    '1-3 months (Quick wins)',
    '3-6 months (Steady growth)',
    '6-12 months (Long-term building)',
    '1+ years (Strategic expansion)'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate budget recommendations
      const calculatedBudget = calculateBudget();
      const finalBudgetData = {
        ...budgetData,
        budget: calculatedBudget,
      } as BudgetData;
      
      // Save budget data and show report
      localStorage.setItem('mibbs_budget', JSON.stringify(finalBudgetData));
      setFinalBudgetData(finalBudgetData);
      setShowReport(true);
    }
  };

  const handleContinueToDashboard = () => {
    updateUser({ hasBudget: true, isFirstLogin: false });
  };

  if (showReport && finalBudgetData) {
    return (
      <BudgetReport 
        budgetData={finalBudgetData}
        onContinueToDashboard={handleContinueToDashboard}
      />
    );
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateBudget = () => {
    // Simple budget calculation logic
    const revenueMultipliers: Record<string, number> = {
      'Under ₹1 Lakh/month': 0.15,
      '₹1-5 Lakhs/month': 0.12,
      '₹5-10 Lakhs/month': 0.10,
      '₹10-25 Lakhs/month': 0.08,
      '₹25-50 Lakhs/month': 0.07,
      'Above ₹50 Lakhs/month': 0.06,
    };

    const baseAmount = revenueMultipliers[budgetData.monthlyRevenue || ''] || 0.10;
    const monthlyBudget = Math.round(baseAmount * 500000); // Base calculation in INR

    return {
      total: monthlyBudget,
      digital: Math.round(monthlyBudget * 0.4),
      design: Math.round(monthlyBudget * 0.25),
      traditional: Math.round(monthlyBudget * 0.2),
      events: Math.round(monthlyBudget * 0.15),
    };
  };

  const updateBudgetData = (field: string, value: any) => {
    setBudgetData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateLocationData = (field: string, value: string) => {
    setBudgetData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const toggleArrayValue = (field: string, value: string) => {
    setBudgetData(prev => {
      const currentArray = (prev as any)[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item: string) => item !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [field]: newArray,
      };
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of business do you run?</h2>
              <p className="text-gray-600">This helps us understand your branding needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateBudgetData('businessType', type.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    budgetData.businessType === type.id
                      ? 'border-mibbs-primary bg-mibbs-light'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">{type.label}</h3>
                  <p className="text-sm text-gray-600">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Which industry are you in?</h2>
              <p className="text-gray-600">We'll match you with relevant agencies and strategies</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => updateBudgetData('industry', industry)}
                  className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                    budgetData.industry === industry
                      ? 'border-mibbs-primary bg-mibbs-light text-mibbs-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your monthly revenue range?</h2>
              <p className="text-gray-600">This helps us recommend an appropriate marketing budget</p>
            </div>
            <div className="space-y-3">
              {revenueRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => updateBudgetData('monthlyRevenue', range)}
                  className={`w-full p-4 border-2 rounded-lg text-left font-medium transition-all ${
                    budgetData.monthlyRevenue === range
                      ? 'border-mibbs-accent bg-pink-50 text-mibbs-accent'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What marketing do you currently do?</h2>
              <p className="text-gray-600">Select all that apply - we'll help you optimize</p>
            </div>
            <div className="space-y-3">
              {marketingChannels.map((channel) => (
                <button
                  key={channel}
                  onClick={() => toggleArrayValue('currentMarketing', channel)}
                  className={`w-full p-4 border-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                    budgetData.currentMarketing?.includes(channel)
                      ? 'border-mibbs-primary bg-mibbs-light text-mibbs-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span>{channel}</span>
                  {budgetData.currentMarketing?.includes(channel) && (
                    <CheckCircle className="w-5 h-5 text-mibbs-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What are your main business goals?</h2>
              <p className="text-gray-600">Select your top priorities for the next 6 months</p>
            </div>
            <div className="space-y-3">
              {businessGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleArrayValue('goals', goal)}
                  className={`w-full p-4 border-2 rounded-lg text-left font-medium transition-all flex items-center justify-between ${
                    budgetData.goals?.includes(goal)
                      ? 'border-mibbs-secondary bg-mibbs-light text-mibbs-secondary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span>{goal}</span>
                  {budgetData.goals?.includes(goal) && (
                    <CheckCircle className="w-5 h-5 text-mibbs-secondary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Where is your business located?</h2>
              <p className="text-gray-600">We'll find agencies and opportunities near you</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={budgetData.location?.city || ''}
                  onChange={(e) => updateLocationData('city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={budgetData.location?.state || ''}
                  onChange={(e) => updateLocationData('state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                <input
                  type="text"
                  value={budgetData.location?.pincode || ''}
                  onChange={(e) => updateLocationData('pincode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
                  placeholder="Enter 6-digit pincode"
                  maxLength={6}
                />
                {budgetData.location?.pincode && !isValidIndianPincode(budgetData.location.pincode) && (
                  <p className="text-sm text-red-600 mt-1">Please enter a valid 6-digit Indian pincode</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeline for results</label>
                <div className="space-y-2">
                  {timelines.map((timeline) => (
                    <button
                      key={timeline}
                      onClick={() => updateBudgetData('timeline', timeline)}
                      className={`w-full p-3 border-2 rounded-lg text-left font-medium transition-all ${
                        budgetData.timeline === timeline
                         ? 'border-mibbs-secondary bg-mibbs-light text-mibbs-secondary'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return budgetData.businessType;
      case 2:
        return budgetData.industry;
      case 3:
        return budgetData.monthlyRevenue;
      case 4:
        return budgetData.currentMarketing && budgetData.currentMarketing.length > 0;
      case 5:
        return budgetData.goals && budgetData.goals.length > 0;
      case 6:
        return budgetData.location?.city && budgetData.location?.state && budgetData.location?.pincode && budgetData.timeline;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-mibbs-gradient h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center space-x-2 px-6 py-3 bg-mibbs-gradient text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span>{currentStep === totalSteps ? 'Complete Setup' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetingQuestionnaire;