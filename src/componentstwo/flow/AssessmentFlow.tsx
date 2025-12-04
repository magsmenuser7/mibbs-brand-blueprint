import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PincodeInput from './PincodeInput';
import { industryDataMap, IndustryData } from '../../data/industryData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

// data/stateData.ts
export interface StateData {
  digitalPenetration: number;
  traditionalBranding: number;
  consumerTriggers: string;
  advertisingROI: number;
  budgetAllocation: { name: string; percentage: number }[];
  preferredChannels: string[];
  consumerTrustFactors: string[];
  budgetTrend: string;
}

export const stateDataMap: Record<string, StateData> = {
  'Andhra Pradesh': {
    digitalPenetration: 65,
    traditionalBranding: 35,
    consumerTriggers: 'Brand Familiarity, Festival Discounts',
    advertisingROI: 3.5,
    budgetAllocation: [
      { name: 'Digital', percentage: 50 },
      { name: 'TV', percentage: 30 },
      { name: 'Print', percentage: 20 },
    ],
    preferredChannels: ['TV', 'Digital', 'Outdoor'],
    consumerTrustFactors: ['Celebrity Endorsements'],
    budgetTrend: 'Digital-first with a balance of traditional',
  },
  'Arunachal Pradesh': {
    digitalPenetration: 45,
    traditionalBranding: 55,
    consumerTriggers: 'Local Trust, Word of Mouth',
    advertisingROI: 2.8,
    budgetAllocation: [
      { name: 'Print', percentage: 40 },
      { name: 'Radio', percentage: 35 },
      { name: 'Community', percentage: 25 },
    ],
    preferredChannels: ['Print', 'Radio', 'Word of Mouth'],
    consumerTrustFactors: ['Community Leaders', 'Govt Endorsements'],
    budgetTrend: 'Rural-driven traditional media',
  },
  'Assam': {
    digitalPenetration: 50,
    traditionalBranding: 50,
    consumerTriggers: 'Festival-Based Purchases, Traditional Ties',
    advertisingROI: 3.2,
    budgetAllocation: [
      { name: 'Traditional', percentage: 45 },
      { name: 'Digital', percentage: 35 },
      { name: 'PR', percentage: 20 },
    ],
    preferredChannels: ['Social Media', 'Print', 'Retail'],
    consumerTrustFactors: ['Local Influencers', 'Assamese Content'],
    budgetTrend: 'Balanced budget',
  },
  'Bihar': {
    digitalPenetration: 35,
    traditionalBranding: 65,
    consumerTriggers: 'Price Sensitivity, Family Recommendations',
    advertisingROI: 4.0,
    budgetAllocation: [
      { name: 'Traditional', percentage: 40 },
      { name: 'Digital', percentage: 40 },
      { name: 'Outdoor', percentage: 20 },
    ],
    preferredChannels: ['Radio', 'WhatsApp', 'Local Ads'],
    consumerTrustFactors: ['Govt Schemes', 'Religious Leaders'],
    budgetTrend: 'Traditional-heavy branding',
  },
  'Chhattisgarh': {
    digitalPenetration: 40,
    traditionalBranding: 60,
    consumerTriggers: 'Local Network Trust, Social Influence',
    advertisingROI: 3.6,
    budgetAllocation: [
      { name: 'Traditional', percentage: 50 },
      { name: 'Digital', percentage: 30 },
      { name: 'PR', percentage: 20 },
    ],
    preferredChannels: ['Outdoor', 'Print', 'Digital'],
    consumerTrustFactors: ['Government Policies', 'Word of Mouth'],
    budgetTrend: 'Rural branding-focused',
  },
  'Goa': {
    digitalPenetration: 80,
    traditionalBranding: 20,
    consumerTriggers: 'Premium Branding, Tourism Influence',
    advertisingROI: 4.2,
    budgetAllocation: [
      { name: 'Digital', percentage: 60 },
      { name: 'Print', percentage: 25 },
      { name: 'PR', percentage: 15 },
    ],
    preferredChannels: ['Influencers', 'Social Media'],
    consumerTrustFactors: ['Tourism Reviews', 'User-Generated Content'],
    budgetTrend: 'Digital-heavy, influencer-driven',
  },
  'Gujarat': {
    digitalPenetration: 70,
    traditionalBranding: 30,
    consumerTriggers: 'Business-Oriented, Entrepreneurial Appeal',
    advertisingROI: 3.9,
    budgetAllocation: [
      { name: 'Traditional', percentage: 45 },
      { name: 'Digital', percentage: 35 },
      { name: 'PR', percentage: 20 },
    ],
    preferredChannels: ['Print', 'Digital', 'Outdoor'],
    consumerTrustFactors: ['Business Trust', 'Trade Endorsements'],
    budgetTrend: 'Mix of traditional & digital',
  },
  'Haryana': {
    digitalPenetration: 55,
    traditionalBranding: 45,
    consumerTriggers: 'Political Endorsements, Sports Culture',
    advertisingROI: 3.8,
    budgetAllocation: [
      { name: 'Traditional', percentage: 50 },
      { name: 'Digital', percentage: 35 },
      { name: 'Outdoor', percentage: 15 },
    ],
    preferredChannels: ['TV', 'Print', 'Digital'],
    consumerTrustFactors: ['Political Trust', 'Sports Sponsorships'],
    budgetTrend: 'Balanced branding',
  },
  'Himachal Pradesh': {
    digitalPenetration: 50,
    traditionalBranding: 50,
    consumerTriggers: 'Nature-Based Branding, Ethical Products',
    advertisingROI: 3.3,
    budgetAllocation: [
      { name: 'Traditional', percentage: 45 },
      { name: 'Digital', percentage: 35 },
      { name: 'PR', percentage: 20 },
    ],
    preferredChannels: ['Print', 'Digital', 'Outdoor'],
    consumerTrustFactors: ['Eco-Friendliness', 'Cultural Roots'],
    budgetTrend: 'Focus on eco-friendly branding',
  },
  'Jharkhand': {
    digitalPenetration: 38,
    traditionalBranding: 62,
    consumerTriggers: 'Word of Mouth, Govt Schemes',
    advertisingROI: 3.5,
    budgetAllocation: [
      { name: 'Traditional', percentage: 50 },
      { name: 'Digital', percentage: 30 },
      { name: 'Events', percentage: 20 },
    ],
    preferredChannels: ['Outdoor', 'Print', 'WhatsApp'],
    consumerTrustFactors: ['Rural Networks', 'Government Ads'],
    budgetTrend: 'Rural-heavy advertising',
  },
  'Karnataka': {
    digitalPenetration: 75,
    traditionalBranding: 25,
    consumerTriggers: 'Tech-Focused, Premium Brand Perception',
    advertisingROI: 4.5,
    budgetAllocation: [
      { name: 'Digital', percentage: 60 },
      { name: 'PR', percentage: 25 },
      { name: 'Print', percentage: 15 },
    ],
    preferredChannels: ['LinkedIn', 'Social Media'],
    consumerTrustFactors: ['Startup Endorsements', 'Tech Blogs'],
    budgetTrend: 'Digital-heavy branding',
  },
  'Kerala': {
    digitalPenetration: 70,
    traditionalBranding: 30,
    consumerTriggers: 'Education, Social Awareness Branding',
    advertisingROI: 3.9,
    budgetAllocation: [
      { name: 'Traditional', percentage: 50 },
      { name: 'Digital', percentage: 30 },
      { name: 'PR', percentage: 20 },
    ],
    preferredChannels: ['TV', 'Digital', 'WhatsApp'],
    consumerTrustFactors: ['Intellectual Messaging', 'Malayalam Content'],
    budgetTrend: 'Balanced traditional & digital',
  },
  'Madhya Pradesh': {
    digitalPenetration: 45,
    traditionalBranding: 55,
    consumerTriggers: 'Rural Influence, Festival Spending',
    advertisingROI: 3.5,
    budgetAllocation: [
      { name: 'Traditional', percentage: 50 },
      { name: 'Digital', percentage: 30 },
      { name: 'PR', percentage: 20 },
    ],
    preferredChannels: ['Outdoor', 'Print', 'Digital'],
    consumerTrustFactors: ['Religious Leaders', 'Family Trust'],
    budgetTrend: 'Rural branding strategy',
  },
  'Maharashtra': {
    digitalPenetration: 80,
    traditionalBranding: 20,
    consumerTriggers: 'High-End Branding, Luxury Perception',
    advertisingROI: 4.6,
    budgetAllocation: [
      { name: 'Digital', percentage: 60 },
      { name: 'TV', percentage: 25 },
      { name: 'PR', percentage: 15 },
    ],
    preferredChannels: ['Digital Ads', 'Influencers'],
    consumerTrustFactors: ['Brand Heritage', 'Celebrity Endorsements'],
    budgetTrend: 'Premium digital-first strategy',
  },
  'Manipur': {
    digitalPenetration: 55,
    traditionalBranding: 45,
    consumerTriggers: 'Handcrafted, Artistic Brands',
    advertisingROI: 3.4,
    budgetAllocation: [
      { name: 'Traditional', percentage: 50 },
      { name: 'Digital', percentage: 35 },
      { name: 'Events', percentage: 15 },
    ],
    preferredChannels: ['Print', 'Community Ads'],
    consumerTrustFactors: ['Cultural Branding', 'Artisanal Trust'],
    budgetTrend: 'Localized branding approach',
  },
  'Meghalaya': {
    digitalPenetration: 52,
    traditionalBranding: 48,
    consumerTriggers: 'Tribal Culture, Eco-Friendliness',
    advertisingROI: 3.3,
    budgetAllocation: [
      { name: 'Traditional', percentage: 45 },
      { name: 'Digital', percentage: 30 },
      { name: 'PR', percentage: 25 },
    ],
    preferredChannels: ['Print', 'Digital', 'Events'],
    consumerTrustFactors: ['NGO Endorsements', 'Community Trust'],
    budgetTrend: 'Sustainability-focused branding',
  },
  'Mizoram': {
    digitalPenetration: 60,
    traditionalBranding: 40,
    consumerTriggers: 'Fashion-Forward, High Awareness',
    advertisingROI: 3.7,
    budgetAllocation: [
      { name: 'Digital', percentage: 55 },
      { name: 'Traditional', percentage: 35 },
      { name: 'PR', percentage: 10 },
    ],
    preferredChannels: ['Social Media', 'Print'],
    consumerTrustFactors: ['Church Networks', 'Local Influencers'],
    budgetTrend: 'Digital-first but community-led',
  },
  'Nagaland': {
    digitalPenetration: 62,
    traditionalBranding: 38,
    consumerTriggers: 'Community Influence, Fashion Trends',
    advertisingROI: 3.8,
    budgetAllocation: [
      { name: 'Digital', percentage: 55 },
      { name: 'Traditional', percentage: 30 },
      { name: 'PR', percentage: 15 },
    ],
    preferredChannels: ['Social Media', 'Digital', 'Print'],
    consumerTrustFactors: ['Social Proof', 'Community Figures'],
    budgetTrend: 'Fashion-oriented branding',
  },
  'Odisha': {
    digitalPenetration: 50,
    traditionalBranding: 50,
    consumerTriggers: 'Religious Festivals, Traditional Appeal',
    advertisingROI: 3.5,
    budgetAllocation: [
      { name: 'Traditional', percentage: 50 },
      { name: 'Digital', percentage: 30 },
      { name: 'Outdoor', percentage: 20 },
    ],
    preferredChannels: ['Print', 'Digital', 'TV'],
    consumerTrustFactors: ['Religious Leaders', 'Cultural Sentiment'],
    budgetTrend: 'Mix of traditional & digital',
  },
  'Punjab': {
    digitalPenetration: 65,
    traditionalBranding: 35,
    consumerTriggers: 'Celebrity Ads, Sports & Music Culture',
    advertisingROI: 4.0,
    budgetAllocation: [
      { name: 'Traditional', percentage: 55 },
      { name: 'Digital', percentage: 35 },
      { name: 'PR', percentage: 10 },
    ],
    preferredChannels: ['TV', 'Outdoor', 'Social Media'],
    consumerTrustFactors: ['Celebrity & Music Trust', 'Cultural Trends'],
    budgetTrend: 'Influencer-heavy branding',
  },
  'Rajasthan': {
    digitalPenetration: 45,
    traditionalBranding: 55,
    consumerTriggers: 'Festival & Heritage-Driven Branding',
    advertisingROI: 3.5,
    budgetAllocation: [
      { name: 'Traditional', percentage: 50 },
      { name: 'Digital', percentage: 30 },
      { name: 'PR', percentage: 20 },
    ],
    preferredChannels: ['TV', 'Print', 'Digital'],
    consumerTrustFactors: ['Cultural Heritage', 'Tourism Branding'],
    budgetTrend: 'Traditional-heavy branding',
  },
  'Sikkim': {
    digitalPenetration: 55,
    traditionalBranding: 45,
    consumerTriggers: 'Sustainability, Eco-Friendly Branding',
    advertisingROI: 3.9,
    budgetAllocation: [
      { name: 'Traditional', percentage: 50 },
      { name: 'Digital', percentage: 30 },
      { name: 'PR', percentage: 20 },
    ],
    preferredChannels: ['Digital', 'Print', 'Outdoor'],
    consumerTrustFactors: ['Environmental Branding', 'Word of Mouth'],
    budgetTrend: 'Green branding strategy',
  },
  'Tamil Nadu': {
    digitalPenetration: 72,
    traditionalBranding: 28,
    consumerTriggers: 'Tamil-Language Ads, Emotional Storytelling',
    advertisingROI: 4.2,
    budgetAllocation: [
      { name: 'Digital', percentage: 55 },
      { name: 'Traditional', percentage: 30 },
      { name: 'Outdoor', percentage: 15 },
    ],
    preferredChannels: ['TV', 'Digital', 'Print'],
    consumerTrustFactors: ['Tamil-Language Messaging', 'Emotional Ads'],
    budgetTrend: 'Balanced branding',
  },
  'Telangana': {
    digitalPenetration: 75,
    traditionalBranding: 25,
    consumerTriggers: 'Startup Branding, Digital-First Approach',
    advertisingROI: 4.4,
    budgetAllocation: [
      { name: 'Digital', percentage: 60 },
      { name: 'PR', percentage: 30 },
      { name: 'Traditional', percentage: 10 },
    ],
    preferredChannels: ['Digital', 'OTT', 'Social Media'],
    consumerTrustFactors: ['Tech Influence', 'Business Growth'],
    budgetTrend: 'Digital-driven branding',
  },
  'Uttar Pradesh': {
    digitalPenetration: 40,
    traditionalBranding: 60,
    consumerTriggers: 'Political Ads, Family-Oriented Marketing',
    advertisingROI: 3.3,
    budgetAllocation: [
      { name: 'Traditional', percentage: 55 },
      { name: 'Digital', percentage: 30 },
      { name: 'PR', percentage: 15 },
    ],
    preferredChannels: ['TV', 'Radio', 'Print'],
    consumerTrustFactors: ['Religious Leaders', 'Political Messaging'],
    budgetTrend: 'Traditional-heavy branding',
  }
};

// ----------------- AssessmentFlow Component -----------------
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
  monthlyBudget: number,
  annualBudget: number,
  barChartData: { name: string; percentage: number; amount: number; }[],
  pieChartData?: { name: string; value: number; amount: number; color: string; }[];
  channelFocuses: { name: string; percentage: number; amount: number; }[],
  budgetAllocations?: { name: string; percentage: number; amount: number; }[]
}

interface barChartDataInput {
  name: string;
  percentage: number;
  amount: number;
}

interface PieChartInput {
  name: string;
  amount: number;
  value: number;
  color: string | null;
}

interface AssessmentFlowProps {
  onComplete: (data: AssessmentData) => void;
  onBack: () => void;
  cmsConfig: any;
}

const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ onComplete, onBack, cmsConfig }) => {
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
    industryDetails: undefined,
    monthlyBudget: 0,
    annualBudget: 0,
    barChartData: [],
    pieChartData: [],
    channelFocuses: [],
    budgetAllocations: []
  });

  // -------------------- Compute Budgets & Pie --------------------
  const computeBudgetsAndPie = (assessment: Partial<AssessmentData>) => {
    const monthlyRevenue = Number(assessment.monthlyRevenue || 0);
    const monthlyBudget = Math.round(monthlyRevenue * 0.05); // 5% of revenue
    const annualBudget = Math.round(monthlyBudget * 12);

    // ---------- Dynamic: use state-specific budget if available ----------
    const stateInfo = assessment.state ? stateDataMap[assessment.state] : undefined;
    const barChartDataInputs: barChartDataInput[] = stateInfo && stateInfo.budgetAllocation
      ? stateInfo.budgetAllocation.map(item => ({
          name: item.name,
          amount: Math.round(annualBudget * (item.percentage / 100)),
          percentage: item.percentage
        }))
      : [
          { name: 'Digital', amount: Math.round(annualBudget * 0.5), percentage: 50 },
          { name: 'TV', amount: Math.round(annualBudget * 0.3), percentage: 30 },
          { name: 'Print', amount: Math.round(annualBudget * 0.2), percentage: 20 },
        ];

    const totalBarAmount = barChartDataInputs.reduce((sum, item) => sum + item.amount, 0);

    const channelFocuses = barChartDataInputs.map(item => ({
      name: item.name,
      amount: item.amount,
      percentage: item.percentage || (totalBarAmount > 0 ? parseFloat(((item.amount / totalBarAmount) * 100).toFixed(1)) : 0)
    }));

    // ---------- Pie chart ----------
    const pieChartInput: PieChartInput[] = [
      { name: 'Digital Marketing', amount: Math.round(annualBudget * 0.4), value: 40, color: '#4F46E5' },
      { name: 'Brand & Creative', amount: Math.round(annualBudget * 0.25), value: 25, color: '#EC4899' },
      { name: 'Traditional Media', amount: Math.round(annualBudget * 0.2), value: 20, color: '#10B981' },
      { name: 'Events & PR', amount: Math.round(annualBudget * 0.15), value: 15, color: '#F59E0B' },
    ];

    const totalPieAmount = pieChartInput.reduce((sum, c) => sum + c.amount, 0);
    const fallbackColors = ["#6366F1", "#F43F5E", "#FACC15", "#22C55E", "#10B981", "#F97316"];

    const pieChartData = pieChartInput.map((c, i) => ({
      name: c.name,
      amount: c.amount,
      value: c.value || (totalPieAmount > 0 ? parseFloat(((c.amount / totalPieAmount) * 100).toFixed(1)) : 0),
      color: c.color || fallbackColors[i % fallbackColors.length]
    }));

    return { monthlyBudget, annualBudget, channelFocuses, pieChartData };
  };

  // -------------------- Other states & helpers --------------------
  const [unlockData, setUnlockData] = useState({ username: "", email: "", phone: "" });
  const totalSteps = 8;

  // Auto-save draft
  useEffect(() => {
    localStorage.setItem('mibbs_assessment_draft', JSON.stringify(data));
  }, [data]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('mibbs_assessment_draft');
    if (draft) {
      try { setData(JSON.parse(draft)); } catch (e) { console.error('Failed to load draft'); }
    }
  }, []);

  const brandStages = [
    { id: 'new', label: 'New', icon: '🌱', description: 'Just starting my entrepreneurial journey' },
    { id: 'growing', label: 'Growing', icon: '📈', description: 'Have some traction, ready to scale' },
    { id: 'established', label: 'Established', icon: '🏢', description: 'Stable business, expanding reach' },
    { id: 'enterprise', label: 'Enterprise', icon: '🚀', description: 'Large scale operations' }
  ];

  const industries = [
    'FMCG','Retail','E-Commerce','Fashion/Apparel','Real Estate','Automotive','Media/Entertainment','Pharmaceuticals','SaaS / Tech','Healthcare','Education','Manufacturing','B2B / Professional Services','Hospitality / Travel','Financial Services / BFSI'
  ];

  const digitalMaturityOptions = [
    { id: 'not-present', label: 'Not present', description: 'No digital presence' },
    { id: 'basic', label: 'Basic (social)', description: 'WhatsApp/Facebook only' },
    { id: 'growing', label: 'Growing (ads, analytics)', description: 'Running ads with tracking' },
    { id: 'digital-first', label: 'Digital-first', description: 'Advanced analytics & integrations' }
  ];

  const primaryGoalsOptions = ['Awareness','Leads','Online Sales','New Markets','Product Launch','Retention','Pro Image','Compete Bigger'];
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

  const updateData = (field: string, value: any) => setData(prev => ({ ...prev, [field]: value }));
  const handleIndustrySelect = (industry: string) => { updateData('industry', industry); updateData('industryDetails', industryDataMap[industry] || null); };
  const toggleGoal = (goal: string) => {
    setData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : prev.primaryGoals.length < 4 ? [...prev.primaryGoals, goal] : prev.primaryGoals
    }));
  };

  // ---------- Updated: handleLocationUpdate ----------
  const handleLocationUpdate = (locationData: { city: string; state: string; suggestedIndustry?: string }) => {
    updateData('city', locationData.city);
    updateData('state', locationData.state);

    // If industry not set, use suggested
    if (locationData.suggestedIndustry && !data.industry) {
      updateData('industry', locationData.suggestedIndustry);
      updateData('industryDetails', industryDataMap[locationData.suggestedIndustry] || null);
    }

    // Update state-specific channel focuses dynamically
    const stateInfo = stateDataMap[locationData.state];
    if (stateInfo) {
      const channelFocuses = stateInfo.budgetAllocation.map(item => ({
        name: item.name,
        percentage: item.percentage,
        amount: 0
      }));
      updateData('channelFocuses', channelFocuses);
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

  const handleNext = async () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    else {
      try {
        const computed = computeBudgetsAndPie(data);
        const merged = { ...data, monthlyBudget: computed.monthlyBudget, annualBudget: computed.annualBudget, channelFocuses: computed.channelFocuses, pieChartData: computed.pieChartData };
        setData(merged);
        localStorage.setItem("pending_assessment", JSON.stringify(merged));
        console.log("✅ Final Assessment:", merged);
        onComplete(merged);
      } catch (error) { console.error("⚠️ Error completing assessment:", error); alert("Something went wrong."); }
    }
  };

  const handlePrevious = () => { currentStep === 1 ? onBack() : setCurrentStep(currentStep - 1); };

  // ---------- Render step function ---------- (kept intact, omitted here for brevity, same as your existing code)
    const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What type of business do you run?</h2>
              <p className="text-mibbs-primary italic">Tell us who you are today this frames your budget story.</p>
            </div>

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-mibbs-gradient h-3 rounded-full transition-all duration-500" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
            </div>
          </div>
          <div className="mb-8">{renderStep()}</div>
          <div className="flex items-center justify-between">
            <button onClick={handlePrevious} className="flex items-center space-x-2 py-3 text-gray-600 hover:text-gray-800 transition-colors"><ChevronLeft className="w-4 h-4" /><span>Previous</span></button>
            <button onClick={handleNext} disabled={!canProceed()} className="flex items-center space-x-2 px-8 py-2 bg-mibbs-gradient text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl">
              <span>{currentStep === totalSteps ? 'Complete Assessment' : 'Continue'}</span><ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;



















// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, MapPin, Building2, Calendar, TrendingUp, Target, DollarSign } from 'lucide-react';
// import PincodeInput from './PincodeInput';
// import { industryDataMap, IndustryData } from '../../data/industryData';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../../contexts/AuthContext";

// interface AssessmentData {
//   brandStage: string;
//   pincode: string;
//   city: string;
//   state: string;
//   industry: string;
//   yearsInBusiness: number;
//   digitalMaturity: string;
//   primaryGoals: string[];
//   monthlyRevenue: number;
//   marketingSpendBand: string;
//   exactMarketingSpend: number;
//   positioning: string;
//   competitorNotes: string;
//   businessName: string;
//   industryDetails?: IndustryData;
//   monthlyBudget: number,
//   annualBudget: number,
//   barChartData: { name: string; percentage: number; amount: number; }[],   // e.g., [{ channel: 'Google Ads', percent: 40, amount: 5000 }]
//   pieChartData?: { name: string; value: number; amount: number; color: string; }[];
//   channelFocuses: { name: string; percentage: number; amount: number; }[]  
//   budgetAllocations?: { name: string; percentage: number; amount: number; }[]
  
// }

// interface barChartDataInput {
//   name: string;
//   percentage: number;
//   amount: number;
// }

// interface PieChartInput {
//   name: string;
//   amount: number;
//   value: number;
//   color: string | null;
// }


// interface AssessmentFlowProps {
//   onComplete: (data: AssessmentData) => void;
//   onBack: () => void;
//   cmsConfig: any;
// }


// const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ onComplete, onBack, cmsConfig }) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [data, setData] = useState<AssessmentData>({
//     brandStage: '',
//     pincode: '',
//     city: '',
//     state: '',
//     industry: '',
//     yearsInBusiness: 0,
//     digitalMaturity: '',
//     primaryGoals: [],
//     monthlyRevenue: 0,
//     marketingSpendBand: '',
//     exactMarketingSpend: 0,
//     positioning: '',
//     competitorNotes: '',
//     businessName: '',
//     industryDetails: undefined,
//     monthlyBudget: 0,
//     annualBudget: 0,
//     barChartData: [],   // aligns with { channel, percent, amount }[]
//     pieChartData: [],
//     channelFocuses: [],    // aligns with { name, percentage, amount }[]
//     budgetAllocations: []    // aligns with { name, percentage, amount }[]
//   });




//   const computeBudgetsAndPie = (assessment: Partial<AssessmentData>) => {
//     const monthlyRevenue = Number(assessment.monthlyRevenue || 0);
//     const monthlyBudget = Math.round(monthlyRevenue * 0.05); // 5% of revenue
//     const annualBudget = Math.round(monthlyBudget * 12);

//     // --------- 1️⃣ Channel Focus (dynamic channels) ---------
//     const barChartDataInputs: barChartDataInput[] =
//       assessment?.barChartData?.length > 0
//         ? assessment.barChartData.map((item: any) => ({
//           name: item.name,
//           amount: Number(item.amount) || 0,
//           percentage: Number(item.percentage) || 0, // keep backend percentage if available
//         }))
//         : [
//           { name: 'Digital', amount: Math.round(annualBudget * 0.5), percentage: 50 },
//           { name: 'TV', amount: Math.round(annualBudget * 0.3), percentage: 30 },
//           { name: 'Print', amount: Math.round(annualBudget * 0.2), percentage: 20 },
//         ];

//     // ---- Calculate dynamic totals ----
//     const totalBarAmount = barChartDataInputs.reduce(
//       (sum: number, item: barChartDataInput) => sum + (Number(item.amount) || 0),
//       0
//     );

//     // ---- Final computed normalized channel focus values ----
//     const channelFocuses = barChartDataInputs.map((item: any) => ({
//       name: item.name,
//       amount: Number(item.amount) || 0,
//       percentage:
//         item.percentage && item.percentage > 0
//           ? parseFloat(item.percentage.toFixed(1)) // keep backend original %
//           : totalBarAmount > 0
//             ? parseFloat(((item.amount / totalBarAmount) * 100).toFixed(1)) // compute if missing
//             : 0,
//     }));

//     // --------- 2️⃣ Pie Chart Data (dynamic entries) ---------
//     const pieChartInput: PieChartInput[] =
//       assessment?.pieChartData?.length > 0
//         ? assessment.pieChartData.map((item: any) => ({
//           name: item.name,
//           amount: Number(item.amount) || 0,
//           value: Number(item.value) || 0,   // keep if backend saved percentage
//           color: item.color || null,        // use backend color if exists
//         }))
//         : [
//           { name: 'Digital Marketing', amount: Math.round(annualBudget * 0.4), value: 40, color: '#4F46E5' },
//           { name: 'Brand & Creative', amount: Math.round(annualBudget * 0.25), value: 25, color: '#EC4899' },
//           { name: 'Traditional Media', amount: Math.round(annualBudget * 0.2), value: 20, color: '#10B981' },
//           { name: 'Events & PR', amount: Math.round(annualBudget * 0.15), value: 15, color: '#F59E0B' },
//         ];

//     // ---- Calculate total dynamically ----
//     const totalPieAmount = pieChartInput.reduce((sum: number, c: PieChartInput) => sum + (Number(c.amount) || 0), 0);

//     // ---- Default fallback colors if backend doesn't include ----
//     const fallbackColors = ["#6366F1", "#F43F5E", "#FACC15", "#22C55E", "#10B981", "#F97316"];

//     // ---- Final pie chart formatted dataset ----
//     const pieChartData = pieChartInput.map((c, i) => ({
//       name: c.name,
//       amount: Number(c.amount) || 0,
//       value:
//         c.value && c.value > 0
//           ? parseFloat(c.value.toFixed(1)) // if backend saved percentage → keep it
//           : totalPieAmount > 0
//             ? parseFloat(((Number(c.amount) / totalPieAmount) * 100).toFixed(1)) // else auto compute
//             : 0,
//       color: c.color || fallbackColors[i % fallbackColors.length], // ensure every item has a color
//     }));

//     return { monthlyBudget, annualBudget, channelFocuses, pieChartData };
//   };


//   const [unlockData, setUnlockData] = useState({
//     username: "",
//     email: "",
//     phone: ""
//   });

//   const totalSteps = 8;

//   // Auto-save draft
//   useEffect(() => {
//     localStorage.setItem('mibbs_assessment_draft', JSON.stringify(data));
//   }, [data]);

//   // Load draft on mount
//   useEffect(() => {
//     const draft = localStorage.getItem('mibbs_assessment_draft');
//     if (draft) {
//       try {
//         setData(JSON.parse(draft));
//       } catch (e) {
//         console.error('Failed to load draft');
//       }
//     }
//   }, []);

//   const brandStages = [
//     { id: 'new', label: 'New', icon: '🌱', description: 'Just starting my entrepreneurial journey' },
//     { id: 'growing', label: 'Growing', icon: '📈', description: 'Have some traction, ready to scale' },
//     { id: 'established', label: 'Established', icon: '🏢', description: 'Stable business, expanding reach' },
//     { id: 'enterprise', label: 'Enterprise', icon: '🚀', description: 'Large scale operations' }
//   ];

//   const industries = [
//     'FMCG',
//     'Retail',
//     'E-Commerce',
//     'Fashion/Apparel',
//     'Real Estate',
//     'Automotive',
//     'Media/Entertainment',
//     'Pharmaceuticals',
//     'SaaS / Tech',
//     'Healthcare',
//     'Education',
//     'Manufacturing',
//     'B2B / Professional Services',
//     'Hospitality / Travel',
//     'Financial Services / BFSI'
//   ];

//   const digitalMaturityOptions = [
//     { id: 'not-present', label: 'Not present', description: 'No digital presence' },
//     { id: 'basic', label: 'Basic (social)', description: 'WhatsApp/Facebook only' },
//     { id: 'growing', label: 'Growing (ads, analytics)', description: 'Running ads with tracking' },
//     { id: 'digital-first', label: 'Digital-first', description: 'Advanced analytics & integrations' }
//   ];

//   const primaryGoalsOptions = [
//     'Awareness',
//     'Leads', 
//     'Online Sales',
//     'New Markets',
//     'Product Launch',
//     'Retention',
//     'Pro Image',
//     'Compete Bigger'
//   ];

//   const marketingSpendOptions = [
//     { id: 'low', label: 'Less than ₹10,000 / month' },
//     { id: 'medium', label: '₹10,000 to ₹1,00,000 / month' },
//     { id: 'high', label: 'More than ₹1,00,000 / month' }
//   ];

//   const positioningOptions = [
//     { id: 'leader', label: 'Market Leader', description: 'We dominate our category' },
//     { id: 'challenger', label: 'Challenger', description: 'We compete with leaders' },
//     { id: 'emerging', label: 'Emerging Player', description: 'We are new but growing' },
//     { id: 'unsure', label: 'Unsure', description: 'Not sure where we stand' }
//   ];

//   const updateData = (field: string, value: any) => {
//     setData(prev => ({ ...prev, [field]: value }));
//   };

//   // Handle industry selection directly without modal
//   const handleIndustrySelect = (industry: string) => {
//     updateData('industry', industry);
//     updateData('industryDetails', industryDataMap[industry] || null);
//   };

//   const toggleGoal = (goal: string) => {
//     setData(prev => ({
//       ...prev,
//       primaryGoals: prev.primaryGoals.includes(goal)
//         ? prev.primaryGoals.filter(g => g !== goal)
//         : prev.primaryGoals.length < 4 
//           ? [...prev.primaryGoals, goal]
//           : prev.primaryGoals
//     }));
//   };

//   const handleLocationUpdate = (locationData: { city: string; state: string; suggestedIndustry?: string }) => {
//     updateData('city', locationData.city);
//     updateData('state', locationData.state);
//     if (locationData.suggestedIndustry && !data.industry) {
//       updateData('industry', locationData.suggestedIndustry);
//     }
//   };

//   const canProceed = () => {
//     switch (currentStep) {
//       case 1: return data.brandStage !== '' && data.businessName.trim() !== '';
//       case 2: return data.pincode.length === 6 && data.city.trim() !== '' && data.state !== '';
//       case 3: return data.industry !== '';
//       case 4: return data.yearsInBusiness > 0;
//       case 5: return data.digitalMaturity !== '';
//       case 6: return data.primaryGoals.length > 0;
//       case 7: return data.monthlyRevenue > 0 && data.marketingSpendBand !== '';
//       case 8: return data.positioning !== '';
//       default: return false;
//     }
//   };

// const handleNext = async () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       try {
//         const computed = computeBudgetsAndPie(data);

//         const merged = {
//           ...data,
//           monthlyBudget: computed.monthlyBudget,
//           annualBudget: computed.annualBudget,
//           // budgetAllocations: computed.budgetAllocations,
//           channelFocuses: computed.channelFocuses,
//           pieChartData: computed.pieChartData
//         };

//         setData(merged);
//         localStorage.setItem("pending_assessment", JSON.stringify(merged));
//         console.log("✅ Final Assessment with pieChartData:", merged);
//         onComplete(merged);
//       } catch (error) {
//         console.error("⚠️ Error completing assessment:", error);
//         alert("Something went wrong while finishing your assessment.");
//       }
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep === 1) {
//       onBack();
//     } else {
//       setCurrentStep(currentStep - 1);
//     }
//   };

  // const renderStep = () => {
  //   switch (currentStep) {
  //     case 1:
  //       return (
  //         <div className="space-y-8">
  //           <div className="text-center">
  //             <h2 className="text-3xl font-bold text-gray-900 mb-4">What type of business do you run?</h2>
  //             <p className="text-mibbs-primary italic">Tell us who you are today this frames your budget story.</p>
  //           </div>

  //           <div className="space-y-4">
  //             <label className="block text-sm font-medium text-gray-700">Business Name</label>
  //             <input
  //               type="text"
  //               value={data.businessName}
  //               onChange={(e) => updateData('businessName', e.target.value)}
  //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
  //               placeholder="Enter your business name"
  //             />
  //           </div>

  //           <div className="space-y-4">
  //             {brandStages.map(stage => (
  //               <button
  //                 key={stage.id}
  //                 onClick={() => updateData('brandStage', stage.id)}
  //                 className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
  //                   data.brandStage === stage.id
  //                     ? 'border-mibbs-primary bg-mibbs-light'
  //                     : 'border-gray-200 hover:border-gray-300'
  //                 }`}
  //               >
  //                 <div className="flex items-center space-x-4">
  //                   <span className="text-3xl">{stage.icon}</span>
  //                   <div>
  //                     <div className="text-lg font-semibold text-gray-900">{stage.label}</div>
  //                     <div className="text-gray-600">{stage.description}</div>
  //                   </div>
  //                 </div>
  //               </button>
  //             ))}
  //           </div>
  //         </div>
  //       );

  //     case 2:
  //       return (
  //         <div className="space-y-6">
  //           <div className="text-center mb-8">
  //             <h2 className="text-3xl font-bold text-gray-900 mb-4">Where is your business located?</h2>
  //             <p className="text-mibbs-primary italic">We'll suggest common business types in your area.</p>
  //           </div>
  //           <PincodeInput
  //             pincode={data.pincode}
  //             city={data.city}
  //             state={data.state}
  //             onPincodeChange={(pincode) => updateData('pincode', pincode)}
  //             onLocationUpdate={handleLocationUpdate}
  //             confidenceThreshold={cmsConfig.confidenceThreshold}
  //           />
  //         </div>
  //       );

  //     case 3:
  //       return (
  //         <div className="space-y-6">
  //           <div className="text-center mb-8">
  //             <h2 className="text-3xl font-bold text-gray-900 mb-4">Which industry best describes your business?</h2>
  //             <p className="text-mibbs-primary italic">Pick the lane you play in. The system tailors budgets industry by industry.</p>
  //           </div>
            
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  //             {industries.map(industry => (
  //               <button
  //                 key={industry}
  //                 onClick={() => handleIndustrySelect(industry)}
  //                 className={`p-4 rounded-lg border-2 text-sm font-medium transition-all text-left ${
  //                   data.industry === industry
  //                     ? 'border-mibbs-primary bg-mibbs-light text-mibbs-primary'
  //                     : 'border-gray-200 hover:border-gray-300'
  //                 }`}
  //               >
  //                 {industry}
  //               </button>
  //             ))}
  //           </div>
  //         </div>
  //       );
  //       case 4:
  //       return (
  //         <div className="space-y-6">
  //           <div className="text-center mb-8">
  //             <h2 className="text-3xl font-bold text-gray-900 mb-4">How many years have you been in business?</h2>
  //           </div>
  //           <div className="text-center">
  //             <input
  //               type="number"
  //               min="0"
  //               max="50"
  //               value={data.yearsInBusiness || ''}
  //               onChange={(e) => updateData('yearsInBusiness', parseInt(e.target.value) || 0)}
  //               className="w-32 text-center text-3xl font-bold py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-mibbs-primary"
  //               placeholder="0"
  //             />
  //             <p className="text-gray-600 mt-4">years</p>
  //           </div>
  //         </div>
  //       );

  //     case 5:
  //       return (
  //         <div className="space-y-6">
  //           <div className="text-center mb-8">
  //             <h2 className="text-3xl font-bold text-gray-900 mb-4">How digitally scaled is your brand?</h2>
  //             <p className="text-mibbs-primary italic">Your digital readiness defines how far your money travels.</p>
  //           </div>
  //           <div className="space-y-4">
  //             {digitalMaturityOptions.map(option => (
  //               <button
  //                 key={option.id}
  //                 onClick={() => updateData('digitalMaturity', option.id)}
  //                 className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
  //                   data.digitalMaturity === option.id
  //                     ? 'border-mibbs-primary bg-mibbs-light'
  //                     : 'border-gray-200 hover:border-gray-300'
  //                 }`}
  //               >
  //                 <div className="font-medium text-gray-900">{option.label}</div>
  //                 <div className="text-sm text-gray-600">{option.description}</div>
  //               </button>
  //             ))}
  //           </div>
  //         </div>
  //       );

  //     case 6:
  //       return (
  //         <div className="space-y-6">
  //           <div className="text-center mb-8">
  //             <h2 className="text-3xl font-bold text-gray-900 mb-4">What are your primary brand objectives?</h2>
  //             <p className="text-sm text-gray-600">Select up to 4 objectives</p>
  //           </div>
  //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  //             {primaryGoalsOptions.map(goal => (
  //               <button
  //                 key={goal}
  //                 onClick={() => toggleGoal(goal)}
  //                 className={`p-4 rounded-lg border-2 font-medium transition-all ${
  //                   data.primaryGoals.includes(goal)
  //                     ? 'border-mibbs-primary bg-mibbs-light text-mibbs-primary'
  //                     : 'border-gray-200 hover:border-gray-300'
  //                 }`}
  //               >
  //                 <div className="flex items-center justify-between">
  //                   <span className="text-sm">{goal}</span>
  //                   {data.primaryGoals.includes(goal) && (
  //                     <div className="w-5 h-5 bg-mibbs-primary rounded-full flex items-center justify-center">
  //                       <span className="text-white text-xs">✓</span>
  //                     </div>
  //                   )}
  //                 </div>
  //               </button>
  //             ))}
  //           </div>
  //           <div className="text-center">
  //             <p className="text-sm text-gray-500">{data.primaryGoals.length}/4 objectives selected</p>
  //           </div>
  //         </div>
  //       );

  //     case 7:
  //       return (
  //         <div className="space-y-6">
  //           <div className="text-center mb-8">
  //             <h2 className="text-3xl font-bold text-gray-900 mb-4">What is your average monthly revenue?</h2>
  //             <p className="text-sm text-gray-600">Enter your average sales in the last 3 months</p>
  //           </div>
            
  //           <div className="space-y-6">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Revenue</label>
  //               <div className="relative">
  //                 <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
  //                 <input
  //                   type="text"
  //                   inputMode="numeric"
  //                   value={data.monthlyRevenue || ''}
  //                   onChange={(e) => {
  //                     const value = e.target.value.replace(/[^0-9]/g, '');
  //                     updateData('monthlyRevenue', Number(value));
  //                   }}
  //                   className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary text-lg"
  //                   placeholder="50000"
  //                 />
  //               </div>
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-4">
  //                 How much do you spend on marketing each month?
  //               </label>
  //               <p className="text-mibbs-primary italic text-sm mb-4">Be honest here. Smarter inputs mean sharper outputs.</p>
  //               <div className="space-y-3">
  //                 {marketingSpendOptions.map(option => (
  //                   <button
  //                     key={option.id}
  //                     onClick={() => updateData('marketingSpendBand', option.id)}
  //                     className={`w-full p-4 rounded-lg border-2 font-medium transition-all text-left ${
  //                       data.marketingSpendBand === option.id
  //                         ? 'border-mibbs-primary bg-mibbs-light'
  //                         : 'border-gray-200 hover:border-gray-300'
  //                     }`}
  //                   >
  //                     {option.label}
  //                   </button>
  //                 ))}
  //               </div>
                
  //               {data.marketingSpendBand === 'high' && (
  //                 <div className="mt-4">
  //                   <label className="block text-sm font-medium text-gray-700 mb-2">Exact monthly marketing spend</label>
  //                   <div className="relative">
  //                     <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
  //                     <input
  //                       type="text"
  //                       inputMode="numeric"
  //                       value={data.exactMarketingSpend || ''}
  //                       onChange={(e) => {
  //                         const value = e.target.value.replace(/[^0-9]/g, '');
  //                         updateData('exactMarketingSpend', Number(value));
  //                       }}
  //                       className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
  //                       placeholder="150000"
  //                     />
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       );

  //     case 8:
  //       return (
  //         <div className="space-y-6">
  //           <div className="text-center mb-8">
  //             <h2 className="text-3xl font-bold text-gray-900 mb-4">How do you see yourself vs competition?</h2>
  //             <p className="text-mibbs-primary italic">Positioning matters. Compete smart, not just hard.</p>
  //           </div>
  //           <div className="space-y-4">
  //             {positioningOptions.map(option => (
  //               <button
  //                 key={option.id}
  //                 onClick={() => updateData('positioning', option.id)}
  //                 className={`w-full p-4 rounded-lg border-2 font-medium transition-all text-left ${
  //                   data.positioning === option.id
  //                     ? 'border-mibbs-primary bg-mibbs-light'
  //                     : 'border-gray-200 hover:border-gray-300'
  //                 }`}
  //               >
  //                 <div>
  //                   <div className="font-semibold text-gray-900">{option.label}</div>
  //                   <div className="text-sm text-gray-600">{option.description}</div>
  //                 </div>
  //               </button>
  //             ))}
  //           </div>
            
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">Notes about competitors (optional)</label>
  //             <textarea
  //               value={data.competitorNotes}
  //               onChange={(e) => updateData('competitorNotes', e.target.value)}
  //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
  //               rows={3}
  //               placeholder="Tell us about your main competitors..."
  //             />
  //           </div>
  //         </div>
  //       );

  //     default:
  //       return null;
  //   }
  // };
// return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50">
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
//               <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-3">
//               <div 
//                 className="bg-mibbs-gradient h-3 rounded-full transition-all duration-500"
//                 style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//               />
//             </div>
//           </div>

//           <div className="mb-8">
//             {renderStep()}
//           </div>

//           <div className="flex items-center justify-between">
//             <button
//               onClick={handlePrevious}
//               className="flex items-center space-x-2 py-3 text-gray-600 hover:text-gray-800 transition-colors"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               <span>Previous</span>
//             </button>

//             <button
//               onClick={handleNext}
//               disabled={!canProceed()}
//               className="flex items-center space-x-2 px-8 py-2 bg-mibbs-gradient text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <span>{currentStep === totalSteps ? 'Complete Assessment' : 'Continue'}</span>
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssessmentFlow;















// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, MapPin, Building2, Calendar, TrendingUp, Target, DollarSign } from 'lucide-react';
// import PincodeInput from './PincodeInput';
// import IndustryModal from './IndustryModal';
// import { industryDataMap, IndustryData } from '../../data/industryData';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../../contexts/AuthContext";



// interface AssessmentData {
//   brandStage: string;
//   pincode: string;
//   city: string;
//   state: string;
//   industry: string;
//   yearsInBusiness: number;
//   digitalMaturity: string;
//   primaryGoals: string[];
//   monthlyRevenue: number;
//   marketingSpendBand: string;
//   exactMarketingSpend: number;
//   positioning: string;
//   competitorNotes: string;
//   businessName: string;
//   industryDetails?: IndustryData;

// }

// interface AssessmentFlowProps {
//   onComplete: (data: AssessmentData) => void;
//   onBack: () => void;
//   cmsConfig: any;

// }

// const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ onComplete, onBack, cmsConfig }) => {
// // const BASE_URL = 'http://127.0.0.1:8000/api';
// // const BASE_URL = 'https://api.mibbs.ai/api';

//   const [currentStep, setCurrentStep] = useState(1);
//   const [data, setData] = useState<AssessmentData>({
//     brandStage: '',
//     pincode: '',
//     city: '',
//     state: '',
//     industry: '',
//     yearsInBusiness: 0,
//     digitalMaturity: '',
//     primaryGoals: [],
//     monthlyRevenue: 0,
//     marketingSpendBand: '',
//     exactMarketingSpend: 0,
//     positioning: '',
//     competitorNotes: '',
//     businessName: '',
//     industryDetails: undefined
//   });

//   const [unlockData, setUnlockData] = useState({
//     username: "",
//     email: "",
//     phone: ""
//   });



  
   
  
//   const [showIndustryModal, setShowIndustryModal] = useState(false);
//   const [selectedIndustryData, setSelectedIndustryData] = useState<IndustryData | null>(null);
//   const [tempIndustry, setTempIndustry] = useState('');
  
  

//   const totalSteps = 8;

//   // Auto-save draft
//   useEffect(() => {
//     localStorage.setItem('mibbs_assessment_draft', JSON.stringify(data));
//   }, [data]);

//   // Load draft on mount
//   useEffect(() => {
//     const draft = localStorage.getItem('mibbs_assessment_draft');
//     if (draft) {
//       try {
//         setData(JSON.parse(draft));
//       } catch (e) {
//         console.error('Failed to load draft');
//       }
//     }
//   }, []);

//   const brandStages = [
//     { id: 'new', label: 'New', icon: '🌱', description: 'Just starting my entrepreneurial journey' },
//     { id: 'growing', label: 'Growing', icon: '📈', description: 'Have some traction, ready to scale' },
//     { id: 'established', label: 'Established', icon: '🏢', description: 'Stable business, expanding reach' },
//     { id: 'enterprise', label: 'Enterprise', icon: '🚀', description: 'Large scale operations' }
//   ];

//   const industries = [
//     'FMCG',
//     'Retail',
//     'E-Commerce',
//     'Fashion/Apparel',
//     'Real Estate',
//     'Automotive',
//     'Media/Entertainment',
//     'Pharmaceuticals',
//     'SaaS / Tech',
//     'Healthcare',
//     'Education',
//     'Manufacturing',
//     'B2B / Professional Services',
//     'Hospitality / Travel',
//     'Financial Services / BFSI'
//   ];

//   const digitalMaturityOptions = [
//     { id: 'not-present', label: 'Not present', description: 'No digital presence' },
//     { id: 'basic', label: 'Basic (social)', description: 'WhatsApp/Facebook only' },
//     { id: 'growing', label: 'Growing (ads, analytics)', description: 'Running ads with tracking' },
//     { id: 'digital-first', label: 'Digital-first', description: 'Advanced analytics & integrations' }
//   ];

//   const primaryGoalsOptions = [
//     'Awareness',
//     'Leads', 
//     'Online Sales',
//     'New Markets',
//     'Product Launch',
//     'Retention',
//     'Pro Image',
//     'Compete Bigger'
//   ];

//   const marketingSpendOptions = [
//     { id: 'low', label: 'Less than ₹10,000 / month' },
//     { id: 'medium', label: '₹10,000 to ₹1,00,000 / month' },
//     { id: 'high', label: 'More than ₹1,00,000 / month' }
//   ];

//   const positioningOptions = [
//     { id: 'leader', label: 'Market Leader', description: 'We dominate our category' },
//     { id: 'challenger', label: 'Challenger', description: 'We compete with leaders' },
//     { id: 'emerging', label: 'Emerging Player', description: 'We are new but growing' },
//     { id: 'unsure', label: 'Unsure', description: 'Not sure where we stand' }
//   ];

//   const updateData = (field: string, value: any) => {
//     setData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleIndustrySelect = (industry: string) => {
//     const industryData = industryDataMap[industry];
//     if (industryData) {
//       setTempIndustry(industry);
//       setSelectedIndustryData(industryData);
//       setShowIndustryModal(true);
//     } else {
//       updateData('industry', industry);
//       updateData('industryDetails', null);
//     }
//   };

//   const handleIndustryConfirm = () => {
//     updateData('industry', tempIndustry);
//     updateData('industryDetails', selectedIndustryData);
//     setShowIndustryModal(false);
//   };

//   const handleIndustryModalClose = () => {
//     setShowIndustryModal(false);
//     setTempIndustry('');
//     setSelectedIndustryData(null);
//   };

//   const toggleGoal = (goal: string) => {
//     setData(prev => ({
//       ...prev,
//       primaryGoals: prev.primaryGoals.includes(goal)
//         ? prev.primaryGoals.filter(g => g !== goal)
//         : prev.primaryGoals.length < 4 
//           ? [...prev.primaryGoals, goal]
//           : prev.primaryGoals
//     }));
//   };

//   const handleLocationUpdate = (locationData: { city: string; state: string; suggestedIndustry?: string }) => {
//     updateData('city', locationData.city);
//     updateData('state', locationData.state);
//     if (locationData.suggestedIndustry && !data.industry) {
//       updateData('industry', locationData.suggestedIndustry);
//     }
//   };

//   const canProceed = () => {
//     switch (currentStep) {
//       case 1: return data.brandStage !== '' && data.businessName.trim() !== '';
//       case 2: return data.pincode.length === 6 && data.city.trim() !== '' && data.state !== '';
//       case 3: return data.industry !== '';
//       case 4: return data.yearsInBusiness > 0;
//       case 5: return data.digitalMaturity !== '';
//       case 6: return data.primaryGoals.length > 0;
//       case 7: return data.monthlyRevenue > 0 && data.marketingSpendBand !== '';
//       case 8: return data.positioning !== '';
//       default: return false;
//     }
//   };

//   // const handleNext = () => {
//   //   if (currentStep < totalSteps) {
//   //     setCurrentStep(currentStep + 1);
//   //   } else {
//   //     onComplete(data);
//   //   }
//   // };




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



//   const handlePrevious = () => {
//     if (currentStep === 1) {
//       onBack();
//     } else {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//      case 1:
//   return (
//     <div className="space-y-8">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">What type of business do you run?</h2>
//         <p className="text-mibbs-primary italic">Tell us who you are today this frames your budget story.</p>
//       </div>

//       {/* Business Name Input */}
//       <div className="space-y-4">
//         <label className="block text-sm font-medium text-gray-700">Business Name</label>
//         <input
//           type="text"
//           value={data.businessName}
//           onChange={(e) => updateData('businessName', e.target.value)}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
//           placeholder="Enter your business name"
//         />
//       </div>

//       {/* Brand Stage Options */}
//       <div className="space-y-4">
//         {brandStages.map(stage => (
//           <button
//             key={stage.id}
//             onClick={() => updateData('brandStage', stage.id)}
//             className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
//               data.brandStage === stage.id
//                 ? 'border-mibbs-primary bg-mibbs-light'
//                 : 'border-gray-200 hover:border-gray-300'
//             }`}
//           >
//             <div className="flex items-center space-x-4">
//               <span className="text-3xl">{stage.icon}</span>
//               <div>
//                 <div className="text-lg font-semibold text-gray-900">{stage.label}</div>
//                 <div className="text-gray-600">{stage.description}</div>
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );


//       case 2:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">Where is your business located?</h2>
//               <p className="text-mibbs-primary italic">We'll suggest common business types in your area.</p>
//             </div>
//             <PincodeInput
//               pincode={data.pincode}
//               city={data.city}
//               state={data.state}
//               onPincodeChange={(pincode) => updateData('pincode', pincode)}
//               onLocationUpdate={handleLocationUpdate}
//               confidenceThreshold={cmsConfig.confidenceThreshold}
//             />
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">Which industry best describes your business?</h2>
//               <p className="text-mibbs-primary italic">Pick the lane you play in. The system tailors budgets industry by industry.</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {industries.map(industry => (
//                 <button
//                   key={industry}
//                   onClick={() => handleIndustrySelect(industry)}
//                   className={`p-4 rounded-lg border-2 text-sm font-medium transition-all text-left ${
//                     data.industry === industry
//                       ? 'border-mibbs-primary bg-mibbs-light text-mibbs-primary'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   {industry}
//                 </button>
//               ))}
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">How many years have you been in business?</h2>
//             </div>
//             <div className="text-center">
//               <input
//                 type="number"
//                 min="0"
//                 max="50"
//                 value={data.yearsInBusiness || ''}
//                 onChange={(e) => updateData('yearsInBusiness', parseInt(e.target.value) || 0)}
//                 className="w-32 text-center text-3xl font-bold py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-mibbs-primary"
//                 placeholder="0"
//               />
//               <p className="text-gray-600 mt-4">years</p>
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">How digitally scaled is your brand?</h2>
//               <p className="text-mibbs-primary italic">Your digital readiness defines how far your money travels.</p>
//             </div>
//             <div className="space-y-4">
//               {digitalMaturityOptions.map(option => (
//                 <button
//                   key={option.id}
//                   onClick={() => updateData('digitalMaturity', option.id)}
//                   className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
//                     data.digitalMaturity === option.id
//                       ? 'border-mibbs-primary bg-mibbs-light'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="font-medium text-gray-900">{option.label}</div>
//                   <div className="text-sm text-gray-600">{option.description}</div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         );

//       case 6:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">What are your primary brand objectives?</h2>
//               <p className="text-sm text-gray-600">Select up to 4 objectives</p>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {primaryGoalsOptions.map(goal => (
//                 <button
//                   key={goal}
//                   onClick={() => toggleGoal(goal)}
//                   className={`p-4 rounded-lg border-2 font-medium transition-all ${
//                     data.primaryGoals.includes(goal)
//                       ? 'border-mibbs-primary bg-mibbs-light text-mibbs-primary'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm">{goal}</span>
//                     {data.primaryGoals.includes(goal) && (
//                       <div className="w-5 h-5 bg-mibbs-primary rounded-full flex items-center justify-center">
//                         <span className="text-white text-xs">✓</span>
//                       </div>
//                     )}
//                   </div>
//                 </button>
//               ))}
//             </div>
//             <div className="text-center">
//               <p className="text-sm text-gray-500">{data.primaryGoals.length}/4 objectives selected</p>
//             </div>
//           </div>
//         );

//       case 7:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">What is your average monthly revenue?</h2>
//               <p className="text-sm text-gray-600">Enter your average sales in the last 3 months</p>
//             </div>
            
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Revenue</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     value={data.monthlyRevenue || ''}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/[^0-9]/g, '');
//                       updateData('monthlyRevenue', Number(value));
//                     }}
//                     className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary text-lg"
//                     placeholder="50000"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-4">
//                   How much do you spend on marketing each month?
//                 </label>
//                 <p className="text-mibbs-primary italic text-sm mb-4">Be honest here. Smarter inputs mean sharper outputs.</p>
//                 <div className="space-y-3">
//                   {marketingSpendOptions.map(option => (
//                     <button
//                       key={option.id}
//                       onClick={() => updateData('marketingSpendBand', option.id)}
//                       className={`w-full p-4 rounded-lg border-2 font-medium transition-all text-left ${
//                         data.marketingSpendBand === option.id
//                           ? 'border-mibbs-primary bg-mibbs-light'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       {option.label}
//                     </button>
//                   ))}
//                 </div>
                
//                 {data.marketingSpendBand === 'high' && (
//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Exact monthly marketing spend</label>
//                     <div className="relative">
//                       <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
//                       <input
//                         type="text"
//                         inputMode="numeric"
//                         value={data.exactMarketingSpend || ''}
//                         onChange={(e) => {
//                           const value = e.target.value.replace(/[^0-9]/g, '');
//                           updateData('exactMarketingSpend', Number(value));
//                         }}
//                         className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
//                         placeholder="150000"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 8:
//         return (
//           <div className="space-y-6">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-4">How do you see yourself vs competition?</h2>
//               <p className="text-mibbs-primary italic">Positioning matters. Compete smart, not just hard.</p>
//             </div>
//             <div className="space-y-4">
//               {positioningOptions.map(option => (
//                 <button
//                   key={option.id}
//                   onClick={() => updateData('positioning', option.id)}
//                   className={`w-full p-4 rounded-lg border-2 font-medium transition-all text-left ${
//                     data.positioning === option.id
//                       ? 'border-mibbs-primary bg-mibbs-light'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div>
//                     <div className="font-semibold text-gray-900">{option.label}</div>
//                     <div className="text-sm text-gray-600">{option.description}</div>
//                   </div>
//                 </button>
//               ))}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Notes about competitors (optional)</label>
//               <textarea
//                 value={data.competitorNotes}
//                 onChange={(e) => updateData('competitorNotes', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary"
//                 rows={3}
//                 placeholder="Tell us about your main competitors..."
//               />
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50">
//           {/* Progress Bar */}
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
//               <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-3">
//               <div 
//                 className="bg-mibbs-gradient h-3 rounded-full transition-all duration-500"
//                 style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//               />
//             </div>
//           </div>

//           {/* Step Content */}
//           <div className="mb-8">
//             {renderStep()}
//           </div>

//           {/* Navigation */}
//           <div className="flex items-center justify-between">
//             <button
//               onClick={handlePrevious}
//               className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               <span>Previous</span>
//             </button>

//             <button
//               onClick={handleNext}
//               disabled={!canProceed()}
//               className="flex items-center space-x-2 px-8 py-4 bg-mibbs-gradient text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <span>{currentStep === totalSteps ? 'Complete Assessment' : 'Continue'}</span>
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//       </div>
      
//       {/* Industry Modal */}
//       <IndustryModal
//         isOpen={showIndustryModal}
//         industryData={selectedIndustryData}
//         onClose={handleIndustryModalClose}
//         onConfirm={handleIndustryConfirm}
//       />
//     </>
//   );
// };

// export default AssessmentFlow;