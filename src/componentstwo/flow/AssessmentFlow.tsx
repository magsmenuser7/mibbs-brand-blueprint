import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Building2, Calendar, TrendingUp, Target, DollarSign } from 'lucide-react';
import PincodeInput from './PincodeInput';
import IndustryModal from './IndustryModal';
import { industryDataMap, IndustryData } from '../../data/industryData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";


interface AssessmentData {
  brandStage: string;
  pincode: string;
  city: string;
  state: string;
  industry: string;
  yearsInBusiness: number;
  digitalMaturity: string;
  primaryGoals: string[];
  monthlyRevenue: number;
  marketingSpendBand: string;
  exactMarketingSpend: number;
  positioning: string;
  competitorNotes: string;
  businessName: string;
  industryDetails?: IndustryData;

}

interface AssessmentFlowProps {
  onComplete: (data: AssessmentData) => void;
  onBack: () => void;
  cmsConfig: any;

}

const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ onComplete, onBack, cmsConfig }) => {
// const BASE_URL = 'http://127.0.0.1:8000/api';
// const BASE_URL = 'https://api.mibbs.ai/api';

  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<AssessmentData>({
    brandStage: '',
    pincode: '',
    city: '',
    state: '',
    industry: '',
    yearsInBusiness: 0,
    digitalMaturity: '',
    primaryGoals: [],
    monthlyRevenue: 0,
    marketingSpendBand: '',
    exactMarketingSpend: 0,
    positioning: '',
    competitorNotes: '',
    businessName: '',
    industryDetails: undefined
  });

  const [unlockData, setUnlockData] = useState({
    username: "",
    email: "",
    phone: ""
  });

  const [showIndustryModal, setShowIndustryModal] = useState(false);
  const [selectedIndustryData, setSelectedIndustryData] = useState<IndustryData | null>(null);
  const [tempIndustry, setTempIndustry] = useState('');
  
  

  const totalSteps = 8;

  // Auto-save draft
  useEffect(() => {
    localStorage.setItem('mibbs_assessment_draft', JSON.stringify(data));
  }, [data]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('mibbs_assessment_draft');
    if (draft) {
      try {
        setData(JSON.parse(draft));
      } catch (e) {
        console.error('Failed to load draft');
      }
    }
  }, []);

  const brandStages = [
    { id: 'new', label: 'New', icon: '🌱', description: 'Just starting my entrepreneurial journey' },
    { id: 'growing', label: 'Growing', icon: '📈', description: 'Have some traction, ready to scale' },
    { id: 'established', label: 'Established', icon: '🏢', description: 'Stable business, expanding reach' },
    { id: 'enterprise', label: 'Enterprise', icon: '🚀', description: 'Large scale operations' }
  ];

  const industries = [
    'FMCG',
    'Retail',
    'E-Commerce',
    'Fashion/Apparel',
    'Real Estate',
    'Automotive',
    'Media/Entertainment',
    'Pharmaceuticals',
    'SaaS / Tech',
    'Healthcare',
    'Education',
    'Manufacturing',
    'B2B / Professional Services',
    'Hospitality / Travel',
    'Financial Services / BFSI'
  ];

  const digitalMaturityOptions = [
    { id: 'not-present', label: 'Not present', description: 'No digital presence' },
    { id: 'basic', label: 'Basic (social)', description: 'WhatsApp/Facebook only' },
    { id: 'growing', label: 'Growing (ads, analytics)', description: 'Running ads with tracking' },
    { id: 'digital-first', label: 'Digital-first', description: 'Advanced analytics & integrations' }
  ];

  const primaryGoalsOptions = [
    'Awareness',
    'Leads', 
    'Online Sales',
    'New Markets',
    'Product Launch',
    'Retention',
    'Pro Image',
    'Compete Bigger'
  ];

  const marketingSpendOptions = [
    { id: 'low', label: 'Less than ₹10,000 / month' },
    { id: 'medium', label: '₹10,000 to ₹1,00,000 / month' },
    { id: 'high', label: 'More than ₹1,00,000 / month' }
  ];

  const positioningOptions = [
    { id: 'leader', label: 'Market Leader', description: 'We dominate our category' },
    { id: 'challenger', label: 'Challenger', description: 'We compete with leaders' },
    { id: 'emerging', label: 'Emerging Player', description: 'We are new but growing' },
    { id: 'unsure', label: 'Unsure', description: 'Not sure where we stand' }
  ];

  const updateData = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleIndustrySelect = (industry: string) => {
    const industryData = industryDataMap[industry];
    if (industryData) {
      setTempIndustry(industry);
      setSelectedIndustryData(industryData);
      setShowIndustryModal(true);
    } else {
      updateData('industry', industry);
      updateData('industryDetails', null);
    }
  };

  const handleIndustryConfirm = () => {
    updateData('industry', tempIndustry);
    updateData('industryDetails', selectedIndustryData);
    setShowIndustryModal(false);
  };

  const handleIndustryModalClose = () => {
    setShowIndustryModal(false);
    setTempIndustry('');
    setSelectedIndustryData(null);
  };

  const toggleGoal = (goal: string) => {
    setData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : prev.primaryGoals.length < 4 
          ? [...prev.primaryGoals, goal]
          : prev.primaryGoals
    }));
  };

  const handleLocationUpdate = (locationData: { city: string; state: string; suggestedIndustry?: string }) => {
    updateData('city', locationData.city);
    updateData('state', locationData.state);
    if (locationData.suggestedIndustry && !data.industry) {
      updateData('industry', locationData.suggestedIndustry);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return data.brandStage !== '' && data.businessName.trim() !== '';
      case 2: return data.pincode.length === 6 && data.city.trim() !== '' && data.state !== '';
      case 3: return data.industry !== '';
      case 4: return data.yearsInBusiness > 0;
      case 5: return data.digitalMaturity !== '';
      case 6: return data.primaryGoals.length > 0;
      case 7: return data.monthlyRevenue > 0 && data.marketingSpendBand !== '';
      case 8: return data.positioning !== '';
      default: return false;
    }
  };

  // const handleNext = () => {
  //   if (currentStep < totalSteps) {
  //     setCurrentStep(currentStep + 1);
  //   } else {
  //     onComplete(data);
  //   }
  // };




// const handleNext = async () => {
//   debugger;

//   if (currentStep < totalSteps) {
//     setCurrentStep(currentStep + 1);
//   } else {
//     // try {
//     //   // ✅ Send data to Django backend when assessment is complete
//     //   const response = await fetch(`${BASE_URL}/assessment/`, {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(data),
//     //   });

//     //   if (response.ok) {
//     //     const result = await response.json();
//     //     console.log('✅ Assessment saved successfully:', result);

//     //     // Optionally clear local storage draft
//     //     localStorage.removeItem('mibbs_assessment_draft');

//     //     // Continue app flow
//     //     onComplete(data);
//     //   } else {
//     //     console.error('❌ Failed to save assessment:', await response.text());
//     //     alert('Something went wrong while saving. Please try again.');
//     //   }
//     // } 
//     // catch (error) {
//     //   console.error('⚠️ Error saving assessment:', error);
//     //   alert('Network error. Please check your connection.');
//     // }

//      try {
//     // 🟡 Instead of sending to backend directly, save in localStorage
//     localStorage.setItem("pending_assessment", JSON.stringify(data));

//     console.log("✅ Assessment temporarily saved. Waiting for user signup/login.");

//     // Continue flow → show signup/login modal
//     onComplete(data);

//   } catch (error) {
//     console.error("⚠️ Error saving assessment draft:", error);
//     alert("Something went wrong while saving your assessment.");
//   }
//   }
// };

const BASE_URL = process.env.REACT_APP_API_URL;

const handleNext = async () => {
  if (currentStep < totalSteps) {
    setCurrentStep(currentStep + 1);
  } else {
    try {
      const response = await fetch(`${BASE_URL}/assessment/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        localStorage.removeItem('mibbs_assessment_draft');
        const result = await response.json();
        console.log('✅ Assessment saved:', result);
        onComplete(data);
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to save:', errorText);
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('⚠️ Network error:', error);
      alert('Network error. Please check your connection.');
    }
  }
};


  const handlePrevious = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
     case 1:
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What type of business do you run?</h2>
        <p className="text-mibbs-primary italic">Tell us who you are today this frames your budget story.</p>
      </div>

      {/* Business Name Input */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Business Name</label>
        <input
          type="text"
          value={data.businessName}
          onChange={(e) => updateData('businessName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
          placeholder="Enter your business name"
        />
      </div>

      {/* Brand Stage Options */}
      <div className="space-y-4">
        {brandStages.map(stage => (
          <button
            key={stage.id}
            onClick={() => updateData('brandStage', stage.id)}
            className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
              data.brandStage === stage.id
                ? 'border-mibbs-primary bg-mibbs-light'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{stage.icon}</span>
              <div>
                <div className="text-lg font-semibold text-gray-900">{stage.label}</div>
                <div className="text-gray-600">{stage.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );


      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Where is your business located?</h2>
              <p className="text-mibbs-primary italic">We'll suggest common business types in your area.</p>
            </div>
            <PincodeInput
              pincode={data.pincode}
              city={data.city}
              state={data.state}
              onPincodeChange={(pincode) => updateData('pincode', pincode)}
              onLocationUpdate={handleLocationUpdate}
              confidenceThreshold={cmsConfig.confidenceThreshold}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Which industry best describes your business?</h2>
              <p className="text-mibbs-primary italic">Pick the lane you play in. The system tailors budgets industry by industry.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {industries.map(industry => (
                <button
                  key={industry}
                  onClick={() => handleIndustrySelect(industry)}
                  className={`p-4 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                    data.industry === industry
                      ? 'border-mibbs-primary bg-mibbs-light text-mibbs-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How many years have you been in business?</h2>
            </div>
            <div className="text-center">
              <input
                type="number"
                min="0"
                max="50"
                value={data.yearsInBusiness || ''}
                onChange={(e) => updateData('yearsInBusiness', parseInt(e.target.value) || 0)}
                className="w-32 text-center text-3xl font-bold py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-mibbs-primary"
                placeholder="0"
              />
              <p className="text-gray-600 mt-4">years</p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How digitally scaled is your brand?</h2>
              <p className="text-mibbs-primary italic">Your digital readiness defines how far your money travels.</p>
            </div>
            <div className="space-y-4">
              {digitalMaturityOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => updateData('digitalMaturity', option.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    data.digitalMaturity === option.id
                      ? 'border-mibbs-primary bg-mibbs-light'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What are your primary brand objectives?</h2>
              <p className="text-sm text-gray-600">Select up to 4 objectives</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {primaryGoalsOptions.map(goal => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`p-4 rounded-lg border-2 font-medium transition-all ${
                    data.primaryGoals.includes(goal)
                      ? 'border-mibbs-primary bg-mibbs-light text-mibbs-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{goal}</span>
                    {data.primaryGoals.includes(goal) && (
                      <div className="w-5 h-5 bg-mibbs-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">{data.primaryGoals.length}/4 objectives selected</p>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What is your average monthly revenue?</h2>
              <p className="text-sm text-gray-600">Enter your average sales in the last 3 months</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Revenue</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={data.monthlyRevenue || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      updateData('monthlyRevenue', Number(value));
                    }}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary text-lg"
                    placeholder="50000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How much do you spend on marketing each month?
                </label>
                <p className="text-mibbs-primary italic text-sm mb-4">Be honest here. Smarter inputs mean sharper outputs.</p>
                <div className="space-y-3">
                  {marketingSpendOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => updateData('marketingSpendBand', option.id)}
                      className={`w-full p-4 rounded-lg border-2 font-medium transition-all text-left ${
                        data.marketingSpendBand === option.id
                          ? 'border-mibbs-primary bg-mibbs-light'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                
                {data.marketingSpendBand === 'high' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exact monthly marketing spend</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={data.exactMarketingSpend || ''}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          updateData('exactMarketingSpend', Number(value));
                        }}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
                        placeholder="150000"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How do you see yourself vs competition?</h2>
              <p className="text-mibbs-primary italic">Positioning matters. Compete smart, not just hard.</p>
            </div>
            <div className="space-y-4">
              {positioningOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => updateData('positioning', option.id)}
                  className={`w-full p-4 rounded-lg border-2 font-medium transition-all text-left ${
                    data.positioning === option.id
                      ? 'border-mibbs-primary bg-mibbs-light'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes about competitors (optional)</label>
              <textarea
                value={data.competitorNotes}
                onChange={(e) => updateData('competitorNotes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
                rows={3}
                placeholder="Tell us about your main competitors..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-mibbs-gradient h-3 rounded-full transition-all duration-500"
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
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 px-8 py-4 bg-mibbs-gradient text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>{currentStep === totalSteps ? 'Complete Assessment' : 'Continue'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      </div>
      
      {/* Industry Modal */}
      <IndustryModal
        isOpen={showIndustryModal}
        industryData={selectedIndustryData}
        onClose={handleIndustryModalClose}
        onConfirm={handleIndustryConfirm}
      />
    </>
  );
};

export default AssessmentFlow;