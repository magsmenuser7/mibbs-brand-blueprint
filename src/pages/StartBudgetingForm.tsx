import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Rocket, TrendingUp, Crown, PlayCircle, BarChart3, TrendingDown, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Laptop,
  HeartPulse,
  ShoppingCart,
  Utensils,
  LineChart,
  GraduationCap,
  Building2,
  MoreHorizontal,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, XAxis, YAxis, Bar, Legend } from 'recharts';

interface FormData {
  // Step 1
  companyName: string;
  websiteUrl: string;
  companyOverview: string;

  // Step 2
  industry: string;

  // Step 3 - Stage-Specific Assessment
  businessLevel: 'entry' | 'mid' | 'advanced' | '';
  // Entry/Advanced specific fields
  productCategory: string;
  marketResearch: 'yes-comprehensive' | 'yes-limited' | 'no-not-yet' | '';
  primaryBrandingGoal: string;
  distributionChannels: string[];
  budgetAllocationPercentage: number[];

  // Mid-level specific fields (Step 3)
  customerAcquisitionCost: string;
  customerLifetimeValue: string;
  bestROIMarketingChannels: string[];
  revenueFromRepeatCustomers: number[];
  primaryBrandingChallenges: string[];

  // Advanced-level specific fields (Step 3)
  currentMarketShare: string;
  annualMarketingBudgetPercentage: number[];
  brandMetricsTracked: string[];
  primaryGrowthObjectives: string[];
  digitalTransformationBudgetAllocation: number[];

  // Step 4
  brandGoals: string[];
  keyChallenges: string;
  currentMarketingChannels: string[];

  // Step 5
  currentBudget: string;
  plannedBudget: string;
  timeFrame: string;
}

const StartBudgetingForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [canNavigate, setCanNavigate] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    websiteUrl: '',
    companyOverview: '',
    industry: '',
    businessLevel: '',
    productCategory: '',
    marketResearch: '',
    primaryBrandingGoal: '',
    distributionChannels: [],
    budgetAllocationPercentage: [0],
    customerAcquisitionCost: '',
    customerLifetimeValue: '',
    bestROIMarketingChannels: [],
    revenueFromRepeatCustomers: [0],
    primaryBrandingChallenges: [],
    currentMarketShare: '',
    annualMarketingBudgetPercentage: [1],
    brandMetricsTracked: [],
    primaryGrowthObjectives: [],
    digitalTransformationBudgetAllocation: [0],
    brandGoals: [],
    keyChallenges: '',
    currentMarketingChannels: [],
    currentBudget: '',
    plannedBudget: '',
    timeFrame: ''
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStep1Submit = () => {
    if (formData.companyName && formData.websiteUrl && formData.companyOverview) {
      setCanNavigate(true);
      setCurrentStep(2);
    }
  };

  const handleStepClick = (step: number) => {
    if (canNavigate || step === 1) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Basic Company Information';
      case 2: return 'What\'s your industry?';
      case 3:
        if (selectedStage === 'mid') return 'Mid Level Assessment';
        if (selectedStage === 'advanced') return 'Advanced Level Assessment';
        return selectedStage ? 'Stage-Specific Assessment' : 'Select Your Business Stage';
      case 4: return 'Brand Goals & Challenges';
      case 5: return 'Budget & Timeline';
      case 6: return 'Brand Budget Recommendation Report';
      default: return '';
    }
  };
  
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="companyName">
          Name of the Company <span className="text-destructive">*</span>
        </Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => updateFormData('companyName', e.target.value)}
          placeholder="Enter company name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="websiteUrl">
          Website URL <span className="text-destructive">*</span>
        </Label>
        <Input
          id="websiteUrl"
          value={formData.websiteUrl}
          onChange={(e) => updateFormData('websiteUrl', e.target.value)}
          placeholder="www.example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyOverview">
          Overview of the Company <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="companyOverview"
          value={formData.companyOverview}
          onChange={(e) => updateFormData('companyOverview', e.target.value)}
          placeholder="Brief overview of your company"
          className="min-h-[100px]"
        />
      </div>

      <Button onClick={handleStep1Submit} className="w-full">
        Submit & Continue
      </Button>
    </div>
  );

  const renderStep2 = () => {
    const industryOptions = [
      {
        id: 'technology',
        title: 'Technology',
        icon: Laptop,
        bg: 'bg-blue-100',
        color: 'text-blue-600',
      },
      {
        id: 'healthcare',
        title: 'Healthcare',
        icon: HeartPulse,
        bg: 'bg-red-100',
        color: 'text-red-600',
      },
      {
        id: 'retail',
        title: 'Retail',
        icon: ShoppingCart,
        bg: 'bg-green-100',
        color: 'text-green-600',
      },
      {
        id: 'food-beverage',
        title: 'Food & Beverage',
        icon: Utensils,
        bg: 'bg-orange-100',
        color: 'text-orange-500',
      },
      {
        id: 'finance',
        title: 'Finance',
        icon: LineChart,
        bg: 'bg-purple-100',
        color: 'text-purple-600',
      },
      {
        id: 'education',
        title: 'Education',
        icon: GraduationCap,
        bg: 'bg-indigo-100',
        color: 'text-indigo-600',
      },
      {
        id: 'real-estate',
        title: 'Real Estate',
        icon: Building2,
        bg: 'bg-yellow-100',
        color: 'text-yellow-600',
      },
      {
        id: 'other',
        title: 'Other',
        icon: MoreHorizontal,
        bg: 'bg-gray-200',
        color: 'text-gray-600',
      },
    ];

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Different industries have unique marketing approaches and budget allocations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industryOptions.map(({ id, title, icon: Icon, bg, color }) => (
              <Card
                key={id}
                className={`p-6 rounded-xl text-center cursor-pointer transition-all duration-300 border shadow-sm hover:shadow-md
                  ${formData.industry === id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                `}
                onClick={() => {
                  updateFormData('industry', id);
                  nextStep();
                }}
              >
                <div className="space-y-4">
                  <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full ${bg}`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <h3 className="font-medium text-md text-foreground">{title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
        </div>
      </div>
    );
  };

  const renderStageSpecificAssessment = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="productCategory">
          What is your primary product category? <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.productCategory} onValueChange={(value) => updateFormData('productCategory', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apparel-fashion">Apparel & Fashion</SelectItem>
            <SelectItem value="consumer-electronics">Consumer Electronics</SelectItem>
            <SelectItem value="home-goods">Home Goods</SelectItem>
            <SelectItem value="food-beverage">Food & Beverage</SelectItem>
            <SelectItem value="beauty-personal-care">Beauty & Personal Care</SelectItem>
            <SelectItem value="software-digital-product">Software/Digital Product</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Have you conducted any market research for your product? <span className="text-destructive">*</span></Label>
        <RadioGroup value={formData.marketResearch} onValueChange={(value) => updateFormData('marketResearch', value as FormData['marketResearch'])}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes-comprehensive" id="comprehensive" />
            <Label htmlFor="comprehensive">Yes, comprehensive</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes-limited" id="limited" />
            <Label htmlFor="limited">Yes, limited</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no-not-yet" id="none" />
            <Label htmlFor="none">No, not yet</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="primaryBrandingGoal">
          What is your primary goal for branding at this stage? <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.primaryBrandingGoal} onValueChange={(value) => updateFormData('primaryBrandingGoal', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="creating-brand-identity">Creating brand identity</SelectItem>
            <SelectItem value="building-product-awareness">Building product awareness</SelectItem>
            <SelectItem value="establishing-market-position">Establishing market position</SelectItem>
            <SelectItem value="attracting-initial-customers">Attracting initial customers</SelectItem>
            <SelectItem value="preparing-for-funding-investment">Preparing for funding/investment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Which distribution channels are you planning to use? <span className="text-destructive">*</span></Label>
        <div className="space-y-2">
          {[
            'Direct to Consumer (Website)',
            'Retail Stores',
            'Online Marketplaces',
            'Wholesale',
            'Subscription Model'
          ].map((channel) => (
            <div key={channel} className="flex items-center space-x-2">
              <Checkbox
                id={channel}
                checked={formData.distributionChannels.includes(channel)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData('distributionChannels', [...formData.distributionChannels, channel]);
                  } else {
                    updateFormData('distributionChannels', formData.distributionChannels.filter(c => c !== channel));
                  }
                }}
              />
              <Label htmlFor={channel}>{channel}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="budgetAllocation">What percentage of your initial budget can you allocate to branding? <span className="text-destructive">*</span></Label>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-primary">{formData.budgetAllocationPercentage[0]}%</span>
          <Slider
            id="budgetAllocation"
            min={5}
            max={50}
            step={1}
            value={formData.budgetAllocationPercentage}
            onValueChange={(value) => updateFormData('budgetAllocationPercentage', value)}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>5%</span>
          <span>50%</span>
        </div>
      </div>
    </div>
  );

  const renderMidLevelSpecificAssessment = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="customerAcquisitionCost">
          What is your current customer acquisition cost (CAC)? <span className="text-destructive">*</span>
        </Label>
        <Input
          id="customerAcquisitionCost"
          value={formData.customerAcquisitionCost}
          onChange={(e) => updateFormData('customerAcquisitionCost', e.target.value)}
          placeholder="e.g., ₹5,000"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerLifetimeValue">
          What is your average customer lifetime value (LTV)? <span className="text-destructive">*</span>
        </Label>
        <Input
          id="customerLifetimeValue"
          value={formData.customerLifetimeValue}
          onChange={(e) => updateFormData('customerLifetimeValue', e.target.value)}
          placeholder="e.g., ₹25,000"
        />
      </div>

      <div className="space-y-4">
        <Label>Which marketing channels have given you the best ROI so far? <span className="text-destructive">*</span></Label>
        <div className="space-y-2">
          {[
            'Social Media',
            'Search Engine Marketing',
            'Email Marketing',
            'Influencer Marketing',
            'Content Marketing',
            'Trade Shows',
            'Print Media'
          ].map((channel) => (
            <div key={channel} className="flex items-center space-x-2">
              <Checkbox
                id={`mid-channel-${channel}`}
                checked={formData.bestROIMarketingChannels.includes(channel)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData('bestROIMarketingChannels', [...formData.bestROIMarketingChannels, channel]);
                  } else {
                    updateFormData('bestROIMarketingChannels', formData.bestROIMarketingChannels.filter(c => c !== channel));
                  }
                }}
              />
              <Label htmlFor={`mid-channel-${channel}`}>{channel}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="revenueFromRepeatCustomers">What percentage of your revenue comes from repeat customers? <span className="text-destructive">*</span></Label>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-primary">{formData.revenueFromRepeatCustomers[0]}%</span>
          <Slider
            id="revenueFromRepeatCustomers"
            min={0}
            max={100}
            step={1}
            value={formData.revenueFromRepeatCustomers}
            onValueChange={(value) => updateFormData('revenueFromRepeatCustomers', value)}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="space-y-4">
        <Label>What are your primary branding challenges currently? <span className="text-destructive">*</span></Label>
        <div className="space-y-2">
          {[
            'Inconsistent brand messaging',
            'Low brand recognition',
            'Difficulty differentiating from competitors',
            'Unclear brand positioning',
            'Limited marketing resources',
            'Measuring branding ROI'
          ].map((challenge) => (
            <div key={challenge} className="flex items-center space-x-2">
              <Checkbox
                id={`challenge-${challenge}`}
                checked={formData.primaryBrandingChallenges.includes(challenge)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData('primaryBrandingChallenges', [...formData.primaryBrandingChallenges, challenge]);
                  } else {
                    updateFormData('primaryBrandingChallenges', formData.primaryBrandingChallenges.filter(c => c !== challenge));
                  }
                }}
              />
              <Label htmlFor={`challenge-${challenge}`}>{challenge}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdvancedLevelSpecificAssessment = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="currentMarketShare">
          What is your current market share in your primary market? <span className="text-destructive">*</span>
        </Label>
        <Input
          id="currentMarketShare"
          value={formData.currentMarketShare}
          onChange={(e) => updateFormData('currentMarketShare', e.target.value)}
          placeholder="e.g., 15%"
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="annualMarketingBudgetPercentage">What is your annual marketing budget as a percentage of revenue? <span className="text-destructive">*</span></Label>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-primary">{formData.annualMarketingBudgetPercentage[0]}%</span>
          <Slider
            id="annualMarketingBudgetPercentage"
            min={1}
            max={30}
            step={1}
            value={formData.annualMarketingBudgetPercentage}
            onValueChange={(value) => updateFormData('annualMarketingBudgetPercentage', value)}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>1%</span>
          <span>30%</span>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Which brand metrics do you currently track? <span className="text-destructive">*</span></Label>
        <div className="space-y-2">
          {[
            'Brand Awareness',
            'Brand Consideration',
            'Brand Preference',
            'Net Promoter Score',
            'Brand Equity',
            'Share of Voice',
            'Customer Lifetime Value'
          ].map((metric) => (
            <div key={metric} className="flex items-center space-x-2">
              <Checkbox
                id={`metric-${metric}`}
                checked={formData.brandMetricsTracked.includes(metric)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData('brandMetricsTracked', [...formData.brandMetricsTracked, metric]);
                  } else {
                    updateFormData('brandMetricsTracked', formData.brandMetricsTracked.filter(m => m !== metric));
                  }
                }}
              />
              <Label htmlFor={`metric-${metric}`}>{metric}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>What are your primary growth objectives? <span className="text-destructive">*</span></Label>
        <div className="space-y-2">
          {[
            'Market expansion',
            'Product diversification',
            'Premium positioning',
            'Increased market share',
            'International expansion',
            'Digital transformation',
            'Mergers & acquisitions'
          ].map((objective) => (
            <div key={objective} className="flex items-center space-x-2">
              <Checkbox
                id={`objective-${objective}`}
                checked={formData.primaryGrowthObjectives.includes(objective)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData('primaryGrowthObjectives', [...formData.primaryGrowthObjectives, objective]);
                  } else {
                    updateFormData('primaryGrowthObjectives', formData.primaryGrowthObjectives.filter(o => o !== objective));
                  }
                }}
              />
              <Label htmlFor={`objective-${objective}`}>{objective}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="digitalTransformationBudgetAllocation">What percentage of your marketing budget is allocated to digital transformation initiatives? <span className="text-destructive">*</span></Label>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-primary">{formData.digitalTransformationBudgetAllocation[0]}%</span>
          <Slider
            id="digitalTransformationBudgetAllocation"
            min={0}
            max={100}
            step={1}
            value={formData.digitalTransformationBudgetAllocation}
            onValueChange={(value) => updateFormData('digitalTransformationBudgetAllocation', value)}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );


  const renderStep3 = () => {
    const stages = [
      {
        id: 'entry',
        title: 'Entry Level',
        description: 'Starting a new business and not sure where to put money in branding',
        icon: Plus,
      },
      {
        id: 'mid',
        title: 'Mid Level',
        description: 'Existing business, spending vaguely on branding and marketing, need navigation',
        icon: BarChart3,
      },
      {
        id: 'advanced',
        title: 'Advanced',
        description: 'Extensive market visibility, looking to streamline and scale with higher budgets',
        icon: TrendingUp,
      },
    ];

    const handleStageClick = (stageId: string) => {
      setSelectedStage(stageId);
      updateFormData('businessLevel', stageId);
    };

    const handleBackToStageSelection = () => {
      setSelectedStage(null);
      updateFormData('businessLevel', '');
      updateFormData('productCategory', '');
      updateFormData('marketResearch', '');
      updateFormData('primaryBrandingGoal', '');
      updateFormData('distributionChannels', []);
      updateFormData('budgetAllocationPercentage', [0]);
      updateFormData('customerAcquisitionCost', '');
      updateFormData('customerLifetimeValue', '');
      updateFormData('bestROIMarketingChannels', []);
      updateFormData('revenueFromRepeatCustomers', [0]);
      updateFormData('primaryBrandingChallenges', []);
      updateFormData('currentMarketShare', '');
      updateFormData('annualMarketingBudgetPercentage', [1]);
      updateFormData('brandMetricsTracked', []);
      updateFormData('primaryGrowthObjectives', []);
      updateFormData('digitalTransformationBudgetAllocation', [0]);
    };

    const isNextDisabledForStage = () => {
      if (!selectedStage) return true;

      if (selectedStage === 'mid') {
        return (
          !formData.customerAcquisitionCost ||
          !formData.customerLifetimeValue ||
          formData.bestROIMarketingChannels.length === 0 ||
          formData.revenueFromRepeatCustomers[0] === 0 ||
          formData.primaryBrandingChallenges.length === 0
        );
      } else if (selectedStage === 'advanced') {
        return (
          !formData.currentMarketShare ||
          formData.annualMarketingBudgetPercentage[0] === 0 ||
          formData.brandMetricsTracked.length === 0 ||
          formData.primaryGrowthObjectives.length === 0 ||
          formData.digitalTransformationBudgetAllocation[0] === 0
        );
      } else {
        return (
          !formData.productCategory ||
          !formData.marketResearch ||
          !formData.primaryBrandingGoal ||
          formData.distributionChannels.length === 0 ||
          formData.budgetAllocationPercentage[0] === 0
        );
      }
    };


    return (
      <div className="space-y-8">
        {!selectedStage ? (
          <>
            <div>
              <h2 className="text-xl font-semibold mb-2">Select Your Business Stage</h2>
              <Label className="font-medium">
                Select your business stage <span className="text-destructive">*</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {stages.map((stage) => {
                  const Icon = stage.icon;
                  return (
                    <Card
                      key={stage.id}
                      className="p-6 cursor-pointer transition-all duration-300 border hover:border-primary/40 hover:shadow-md"
                      onClick={() => handleStageClick(stage.id)}
                    >
                      <div className="text-center space-y-4">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg text-primary">{stage.title}</h3>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={prevStep}>Previous</Button>
              <Button disabled>Next</Button>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-xl border p-6 bg-white shadow-sm">
              {selectedStage === 'mid' ? renderMidLevelSpecificAssessment() :
               selectedStage === 'advanced' ? renderAdvancedLevelSpecificAssessment() :
               renderStageSpecificAssessment()}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBackToStageSelection}>Previous</Button>
              <Button
                onClick={nextStep}
                disabled={isNextDisabledForStage()}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>What are your goals for your brand? <span className="text-destructive">*</span></Label>
        <div className="space-y-2">
          {[
            'Brand Awareness',
            'Lead Generation',
            'Customer Retention',
            'Product Launch',
            'Market Expansion',
            'Rebranding',
            'Legal / IPR'
          ].map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                checked={formData.brandGoals.includes(goal)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData('brandGoals', [...formData.brandGoals, goal]);
                  } else {
                    updateFormData('brandGoals', formData.brandGoals.filter(g => g !== goal));
                  }
                }}
              />
              <Label htmlFor={goal}>{goal}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="keyChallenges">
          What are the key challenges your brand is facing? (Max 2) <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="keyChallenges"
          value={formData.keyChallenges}
          onChange={(e) => updateFormData('keyChallenges', e.target.value)}
          placeholder="Describe your key challenges"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <Label>What are your Current Marketing channels? <span className="text-destructive">*</span></Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Social Media',
            'Email',
            'Content Marketing',
            'PPC',
            'SEO',
            'Events',
            'Print',
            'TV/Radio',
            'Offline (Hoardings, etc)'
          ].map((channel) => (
            <div key={channel} className="flex items-center space-x-2">
              <Checkbox
                id={`marketing-channel-${channel}`}
                checked={formData.currentMarketingChannels.includes(channel)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData('currentMarketingChannels', [...formData.currentMarketingChannels, channel]);
                  } else {
                    updateFormData('currentMarketingChannels', formData.currentMarketingChannels.filter(c => c !== channel));
                  }
                }}
              />
              <Label htmlFor={`marketing-channel-${channel}`}>{channel}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Previous
        </Button>
        <Button onClick={nextStep} disabled={formData.brandGoals.length === 0 || !formData.keyChallenges || formData.currentMarketingChannels.length === 0}>
          Next
        </Button>
      </div>
    </div>
  );

  const renderStep5 = () => {
    const isStep5Complete = formData.currentBudget && formData.plannedBudget && formData.timeFrame;

    // Remove the redirect and just move to the next step
    const handleSubmit = () => {
      console.log('Form Submitted!', formData);
      nextStep();
    };

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>What is your current budget? <span className="text-destructive">*</span></Label>
          <RadioGroup value={formData.currentBudget} onValueChange={(value) => updateFormData('currentBudget', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Less than 30 Lakhs" id="budget-lt-30l" />
              <Label htmlFor="budget-lt-30l">Less than ₹30 Lakhs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30 Lakhs - 1 Crore" id="budget-30l-1cr" />
              <Label htmlFor="budget-30l-1cr">₹30 Lakhs - ₹1 Crore</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1 Crore - 5 Crore" id="budget-1cr-5cr" />
              <Label htmlFor="budget-1cr-5cr">₹1 Crore - ₹5 Crore</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="More than 5 Crore" id="budget-gt-5cr" />
              <Label htmlFor="budget-gt-5cr">More than ₹5 Crore</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="plannedBudget">
            What is your planned budget? <span className="text-destructive">*</span>
          </Label>
          <Input
            id="plannedBudget"
            value={formData.plannedBudget}
            onChange={(e) => updateFormData('plannedBudget', e.target.value)}
            placeholder="e.g., ₹50 Lakhs (or describe)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeFrame">
            What is your desired time frame? <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.timeFrame} onValueChange={(value) => updateFormData('timeFrame', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3-6-months">3-6 Months</SelectItem>
              <SelectItem value="6-12-months">6-12 Months</SelectItem>
              <SelectItem value="1-2-years">1-2 Years</SelectItem>
              <SelectItem value="2-plus-years">2+ Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
          <Button onClick={handleSubmit} disabled={!isStep5Complete}>
            Generate Report
          </Button>
        </div>
      </div>
    );
  };
  
  const renderStep6 = () => {
    // Dynamically get the total budget from formData.plannedBudget or provide a fallback
    const plannedBudgetString = formData.plannedBudget.replace(/₹|,/g, '');
    const totalRecommendedBudget = parseInt(plannedBudgetString, 10) || 180000;
    const formattedTotalBudget = `₹${totalRecommendedBudget.toLocaleString('en-IN')}`;

    const budgetSummary = `This estimated budget of ${formattedTotalBudget} aims to bolster brand visibility and engagement among clients, directly challenging competitors in the brand strategy sector.`;
    
    // Dynamic data generation for pie chart based on user's selected stage and goals
    const generateBudgetAllocationData = () => {
      // Define a base allocation structure
      let allocation = {
        'Brand Identity': 20,
        'Digital Marketing': 20,
        'Product Development': 20,
        'Market Research': 15,
        'Content Creation': 10,
        'Packaging & Design': 5,
        'Contingency': 5,
        'Brand Awareness': 5
      };

      // Adjust allocation based on business stage and goals
      if (formData.businessLevel === 'mid') {
        allocation = {
          'Brand Identity': 15,
          'Digital Marketing': 30,
          'Product Development': 15,
          'Market Research': 5,
          'Content Creation': 20,
          'Packaging & Design': 5,
          'Contingency': 5,
          'Brand Awareness': 5
        };
      } else if (formData.businessLevel === 'advanced') {
        allocation = {
          'Brand Identity': 10,
          'Digital Marketing': 40,
          'Product Development': 10,
          'Market Research': 5,
          'Content Creation': 20,
          'Packaging & Design': 5,
          'Contingency': 5,
          'Brand Awareness': 5
        };
      }
      
      const data = Object.entries(allocation).map(([name, value]) => ({
        name,
        value,
      }));

      return data;
    };

    // Dynamic data generation for bar chart
    const generateBudgetByCampaignData = () => {
      // Define base budget allocations per campaign type
      const campaignBudgets = {
        'LinkedIn Post Campaigns for Lead Generation': 0.5,
        'Industry Webinars for Thought Leadership': 0.3,
        'Content Marketing (Blogs & Case Studies)': 0.1,
        'Email Marketing for Nurturing Leads': 0.1,
      };

      const totalBudget = totalRecommendedBudget;
      const data = Object.entries(campaignBudgets).map(([name, percentage]) => ({
        name,
        budget: totalBudget * percentage,
      }));
      return data;
    };
    
    const budgetAllocationData = generateBudgetAllocationData();
    const budgetCampaignData = generateBudgetByCampaignData();
    
    const pieChartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f', '#ffbb28', '#a4de6c'];

    const strategicRecommendations = [
      'Deploy precision-targeted ads that command attention from top-tier B2B clients.',
      'Host industry-defining webinars that position our brand as the thought leader.',
      'Publish insightful blogs and case studies that validate our market expertise.',
      'Execute a series of targeted email campaigns to nurture leads and maximize engagement.',
    ];
    
    const implementationTimeline = [
      {
        stage: 'Initial Launch',
        duration: 'Months 1-3',
        activities: 'Kick-off LinkedIn campaigns, publish initial blogs, and organize the first webinar.',
      },
      {
        stage: 'Scale and Engage',
        duration: 'Months 4-6',
        activities: 'Intensify LinkedIn ad efforts, host subsequent webinars, and expand email campaigns.',
      },
    ];

    return (
      <div className="space-y-6">
        {/* Top Header Section with Title and Subtitle */}
        <div className="text-center py-4 space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Brand Budget Recommendation Report</h1>
          <p className="text-sm text-gray-500">Generated For MIBBS - India's First Intelligent Brand Budgeting System</p>
        </div>

        {/* User Details div with six options */}
        <div className="bg-purple-800 text-white p-4 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-34 gap-y-1 text-sm">
            <p>Name: {formData.companyName || 'Not specified'}</p>
            <p>Industry: {formData.industry || 'Not specified'}</p>
            <p>Stage: {formData.businessLevel || 'Not specified'}</p>
            <p>Budget: {formData.currentBudget || 'Not specified'}</p>
            <p>Timeline: {formData.timeFrame || 'Not specified'}</p>
            <p>Goals: {formData.brandGoals.join(', ') || 'Not specified'}</p>
            <p>Challenges: {formData.keyChallenges || 'Not specified'}</p>
            <p>Marketing Channels: {formData.currentMarketingChannels.join(', ') || 'Not specified'}</p>
            <p>Website: {formData.websiteUrl || 'Not specified'}</p>
          </div>
        </div>

        {/* Total Recommended Budget div */}
        <div className="bg-purple-800 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Total Recommended Budget:</h2>
            <p className="text-3xl font-extrabold">{formattedTotalBudget}</p>
          </div>
        </div>
        
        {/* Budget Summary Section */}
        <Card className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Budget Summary</h3>
          <p className="text-gray-600">{budgetSummary}</p>
        </Card>

        {/* Recommended Budget Allocation Section */}
        <Card className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Recommended Budget Allocation</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetAllocationData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                    fill="#8884d8"
                  >
                    {budgetAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2">
              <ul className="space-y-2">
                {budgetAllocationData.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-gray-700">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pieChartColors[index % pieChartColors.length] }}></span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold">{item.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Budget by Campaign Section */}
        <Card className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Budget by Campaign</h3>
          {/* Increased height for the BarChart container */}
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetCampaignData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100} 
                  interval={0} 
                  style={{ fontSize: '10px' }} 
                />
                <YAxis tickFormatter={(value) => `₹${(value / 1000).toLocaleString('en-IN')}k`} />
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Bar dataKey="budget" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
          
        {/* Strategic Recommendations Section */}
        <Card className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Strategic Recommendations</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {strategicRecommendations.map((rec, index) => (
              <li key={index} className="text-md">{rec}</li>
            ))}
          </ul>
        </Card>

        {/* Recommended Implementation Timeline Section */}
        <Card className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Recommended Implementation Timeline</h3>
          <div className="space-y-6">
            {implementationTimeline.map((item, index) => (
              <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-1 before:bg-primary before:rounded-full">
                <h4 className="font-bold text-lg text-gray-800 flex items-center mb-1">
                  <span className="mr-2 text-primary">{index + 1}</span> {item.stage}
                </h4>
                <p className="text-sm text-gray-500 mb-1">{item.duration}</p>
                <p className="text-gray-700">{item.activities}</p>
              </div>
            ))}
          </div>
        </Card>
        
        <div className="flex justify-between mt-6 p-8">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            Start Over
          </Button>
          <Button onClick={() => console.log("Report Completed")}>
            Finish
          </Button>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return null;
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4 md:p-8">
      <Card className="w-full max-w-7xl p-0 shadow-lg rounded-lg">
        <div className="p-6 border-b">
          {/* Header section with brand info and "Back to Dashboard" button */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Brand Budget Planner</h1>
              <p className="text-sm text-gray-500">Optimize your branding investment</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
          
          {/* Progress bar and step indicator */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep} of 5</span>
              <span>{Math.round((currentStep / 5) * 100)}%</span>
            </div>
            <Progress value={(currentStep / 5) * 100} className="w-full h-2 rounded-full" />
          </div>
        </div>

        <div className="p-6">
          {renderCurrentStep()}
        </div>
      </Card>
    </div>
  );
};

export default StartBudgetingForm;















// import React, { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Slider } from '@/components/ui/slider';
// import { Progress } from '@/components/ui/progress';
// import { Rocket, TrendingUp, Crown, PlayCircle, BarChart3, TrendingDown, Plus,ArrowLeft  } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Laptop,
//   HeartPulse,
//   ShoppingCart,
//   Utensils,
//   LineChart,
//   GraduationCap,
//   Building2,
//   MoreHorizontal,
// } from "lucide-react";


// interface FormData {
//   // Step 1
//   companyName: string;
//   websiteUrl: string;
//   companyOverview: string;

//   // Step 2
//   industry: string;

//   // Step 3 - Stage-Specific Assessment
//   businessLevel: 'entry' | 'mid' | 'advanced' | '';
//   // Entry/Advanced specific fields
//   productCategory: string;
//   marketResearch: 'yes-comprehensive' | 'yes-limited' | 'no-not-yet' | '';
//   primaryBrandingGoal: string;
//   distributionChannels: string[];
//   budgetAllocationPercentage: number[];

//   // Mid-level specific fields (Step 3)
//   customerAcquisitionCost: string;
//   customerLifetimeValue: string;
//   bestROIMarketingChannels: string[];
//   revenueFromRepeatCustomers: number[]; // For the slider
//   primaryBrandingChallenges: string[];

//   // Advanced-level specific fields (Step 3)
//   currentMarketShare: string;
//   annualMarketingBudgetPercentage: number[]; // For the slider
//   brandMetricsTracked: string[];
//   primaryGrowthObjectives: string[];
//   digitalTransformationBudgetAllocation: number[]; // For the slider

//   // Step 4
//   brandGoals: string[];
//   keyChallenges: string;
//   currentMarketingChannels: string[]; // This field needs to be added/updated in the FormData interface

//   // Step 5
//   currentBudget: string;
//   plannedBudget: string;
//   timeFrame: string;
// }

// const StartBudgetingForm = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [canNavigate, setCanNavigate] = useState(false);
//   const [selectedStage, setSelectedStage] = useState<string | null>(null);
//   const [formData, setFormData] = useState<FormData>({
//     companyName: '',
//     websiteUrl: '',
//     companyOverview: '',
//     industry: '',
//     businessLevel: '',
//     productCategory: '',
//     marketResearch: '',
//     primaryBrandingGoal: '',
//     distributionChannels: [],
//     budgetAllocationPercentage: [0],
//     customerAcquisitionCost: '',
//     customerLifetimeValue: '',
//     bestROIMarketingChannels: [],
//     revenueFromRepeatCustomers: [0],
//     primaryBrandingChallenges: [],
//     currentMarketShare: '',
//     annualMarketingBudgetPercentage: [1], // Default to 1% as per image
//     brandMetricsTracked: [],
//     primaryGrowthObjectives: [],
//     digitalTransformationBudgetAllocation: [0],
//     brandGoals: [],
//     keyChallenges: '',
//     currentMarketingChannels: [], // Initialize the new field
//     currentBudget: '',
//     plannedBudget: '',
//     timeFrame: ''
//   });

//   const updateFormData = (field: keyof FormData, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleStep1Submit = () => {
//     if (formData.companyName && formData.websiteUrl && formData.companyOverview) {
//       setCanNavigate(true);
//       setCurrentStep(2);
//     }
//   };

//   const handleStepClick = (step: number) => {
//     if (canNavigate || step === 1) {
//       setCurrentStep(step);
//     }
//   };

//   const nextStep = () => {
//     if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const getStepTitle = () => {
//     switch (currentStep) {
//       case 1: return 'Basic Company Information';
//       case 2: return 'What\'s your industry?';
//       case 3:
//         if (selectedStage === 'mid') return 'Mid Level Assessment';
//         if (selectedStage === 'advanced') return 'Advanced Level Assessment';
//         return selectedStage ? 'Stage-Specific Assessment' : 'Select Your Business Stage';
//       case 4: return 'Brand Goals & Challenges';
//       case 5: return 'Budget & Timeline';
//       default: return '';
//     }
//   };

//   const renderStep1 = () => (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="companyName">
//           Name of the Company <span className="text-destructive">*</span>
//         </Label>
//         <Input
//           id="companyName"
//           value={formData.companyName}
//           onChange={(e) => updateFormData('companyName', e.target.value)}
//           placeholder="Enter company name"
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="websiteUrl">
//           Website URL <span className="text-destructive">*</span>
//         </Label>
//         <Input
//           id="websiteUrl"
//           value={formData.websiteUrl}
//           onChange={(e) => updateFormData('websiteUrl', e.target.value)}
//           placeholder="www.example.com"
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="companyOverview">
//           Overview of the Company <span className="text-destructive">*</span>
//         </Label>
//         <Textarea
//           id="companyOverview"
//           value={formData.companyOverview}
//           onChange={(e) => updateFormData('companyOverview', e.target.value)}
//           placeholder="Brief overview of your company"
//           className="min-h-[100px]"
//         />
//       </div>

//       <Button onClick={handleStep1Submit} className="w-full">
//         Submit & Continue
//       </Button>
//     </div>
//   );

//   const renderStep2 = () => {
//     const industryOptions = [
//       {
//         id: 'technology',
//         title: 'Technology',
//         icon: Laptop,
//         bg: 'bg-blue-100',
//         color: 'text-blue-600',
//       },
//       {
//         id: 'healthcare',
//         title: 'Healthcare',
//         icon: HeartPulse,
//         bg: 'bg-red-100',
//         color: 'text-red-600',
//       },
//       {
//         id: 'retail',
//         title: 'Retail',
//         icon: ShoppingCart,
//         bg: 'bg-green-100',
//         color: 'text-green-600',
//       },
//       {
//         id: 'food-beverage',
//         title: 'Food & Beverage',
//         icon: Utensils,
//         bg: 'bg-orange-100',
//         color: 'text-orange-500',
//       },
//       {
//         id: 'finance',
//         title: 'Finance',
//         icon: LineChart,
//         bg: 'bg-purple-100',
//         color: 'text-purple-600',
//       },
//       {
//         id: 'education',
//         title: 'Education',
//         icon: GraduationCap,
//         bg: 'bg-indigo-100',
//         color: 'text-indigo-600',
//       },
//       {
//         id: 'real-estate',
//         title: 'Real Estate',
//         icon: Building2,
//         bg: 'bg-yellow-100',
//         color: 'text-yellow-600',
//       },
//       {
//         id: 'other',
//         title: 'Other',
//         icon: MoreHorizontal,
//         bg: 'bg-gray-200',
//         color: 'text-gray-600',
//       },
//     ];

//     return (
//       <div className="space-y-8">
//         <div className="space-y-4">
//           <p className="text-muted-foreground text-sm">
//             Different industries have unique marketing approaches and budget allocations.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {industryOptions.map(({ id, title, icon: Icon, bg, color }) => (
//               <Card
//                 key={id}
//                 className={`p-6 rounded-xl text-center cursor-pointer transition-all duration-300 border shadow-sm hover:shadow-md
//                   ${formData.industry === id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
//                 `}
//                 onClick={() => {
//                   updateFormData('industry', id);
//                   nextStep();
//                 }}
//               >
//                 <div className="space-y-4">
//                   <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full ${bg}`}>
//                     <Icon className={`w-6 h-6 ${color}`} />
//                   </div>
//                   <h3 className="font-medium text-md text-foreground">{title}</h3>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-between">
//           <Button variant="outline" onClick={prevStep}>
//             Previous
//           </Button>
//         </div>
//       </div>
//     );
//   };

//   const renderStageSpecificAssessment = () => (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="productCategory">
//           What is your primary product category? <span className="text-destructive">*</span>
//         </Label>
//         <Select value={formData.productCategory} onValueChange={(value) => updateFormData('productCategory', value)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select an option" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="apparel-fashion">Apparel & Fashion</SelectItem>
//             <SelectItem value="consumer-electronics">Consumer Electronics</SelectItem>
//             <SelectItem value="home-goods">Home Goods</SelectItem>
//             <SelectItem value="food-beverage">Food & Beverage</SelectItem>
//             <SelectItem value="beauty-personal-care">Beauty & Personal Care</SelectItem>
//             <SelectItem value="software-digital-product">Software/Digital Product</SelectItem>
//             <SelectItem value="other">Other</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-4">
//         <Label>Have you conducted any market research for your product? <span className="text-destructive">*</span></Label>
//         <RadioGroup value={formData.marketResearch} onValueChange={(value) => updateFormData('marketResearch', value as FormData['marketResearch'])}>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="yes-comprehensive" id="comprehensive" />
//             <Label htmlFor="comprehensive">Yes, comprehensive</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="yes-limited" id="limited" />
//             <Label htmlFor="limited">Yes, limited</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem value="no-not-yet" id="none" />
//             <Label htmlFor="none">No, not yet</Label>
//           </div>
//         </RadioGroup>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="primaryBrandingGoal">
//           What is your primary goal for branding at this stage? <span className="text-destructive">*</span>
//         </Label>
//         <Select value={formData.primaryBrandingGoal} onValueChange={(value) => updateFormData('primaryBrandingGoal', value)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select an option" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="creating-brand-identity">Creating brand identity</SelectItem>
//             <SelectItem value="building-product-awareness">Building product awareness</SelectItem>
//             <SelectItem value="establishing-market-position">Establishing market position</SelectItem>
//             <SelectItem value="attracting-initial-customers">Attracting initial customers</SelectItem>
//             <SelectItem value="preparing-for-funding-investment">Preparing for funding/investment</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-4">
//         <Label>Which distribution channels are you planning to use? <span className="text-destructive">*</span></Label>
//         <div className="space-y-2">
//           {[
//             'Direct to Consumer (Website)',
//             'Retail Stores',
//             'Online Marketplaces',
//             'Wholesale',
//             'Subscription Model'
//           ].map((channel) => (
//             <div key={channel} className="flex items-center space-x-2">
//               <Checkbox
//                 id={channel}
//                 checked={formData.distributionChannels.includes(channel)}
//                 onCheckedChange={(checked) => {
//                   if (checked) {
//                     updateFormData('distributionChannels', [...formData.distributionChannels, channel]);
//                   } else {
//                     updateFormData('distributionChannels', formData.distributionChannels.filter(c => c !== channel));
//                   }
//                 }}
//               />
//               <Label htmlFor={channel}>{channel}</Label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-4">
//         <Label htmlFor="budgetAllocation">What percentage of your initial budget can you allocate to branding? <span className="text-destructive">*</span></Label>
//         <div className="flex items-center space-x-4">
//           <span className="text-xl font-bold text-primary">{formData.budgetAllocationPercentage[0]}%</span>
//           <Slider
//             id="budgetAllocation"
//             min={5}
//             max={50}
//             step={1}
//             value={formData.budgetAllocationPercentage}
//             onValueChange={(value) => updateFormData('budgetAllocationPercentage', value)}
//             className="w-full"
//           />
//         </div>
//         <div className="flex justify-between text-sm text-muted-foreground">
//           <span>5%</span>
//           <span>50%</span>
//         </div>
//       </div>
//     </div>
//   );

//   const renderMidLevelSpecificAssessment = () => (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="customerAcquisitionCost">
//           What is your current customer acquisition cost (CAC)? <span className="text-destructive">*</span>
//         </Label>
//         <Input
//           id="customerAcquisitionCost"
//           value={formData.customerAcquisitionCost}
//           onChange={(e) => updateFormData('customerAcquisitionCost', e.target.value)}
//           placeholder="e.g., ₹5,000"
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="customerLifetimeValue">
//           What is your average customer lifetime value (LTV)? <span className="text-destructive">*</span>
//         </Label>
//         <Input
//           id="customerLifetimeValue"
//           value={formData.customerLifetimeValue}
//           onChange={(e) => updateFormData('customerLifetimeValue', e.target.value)}
//           placeholder="e.g., ₹25,000"
//         />
//       </div>

//       <div className="space-y-4">
//         <Label>Which marketing channels have given you the best ROI so far? <span className="text-destructive">*</span></Label>
//         <div className="space-y-2">
//           {[
//             'Social Media',
//             'Search Engine Marketing',
//             'Email Marketing',
//             'Influencer Marketing',
//             'Content Marketing',
//             'Trade Shows',
//             'Print Media'
//           ].map((channel) => (
//             <div key={channel} className="flex items-center space-x-2">
//               <Checkbox
//                 id={`mid-channel-${channel}`}
//                 checked={formData.bestROIMarketingChannels.includes(channel)}
//                 onCheckedChange={(checked) => {
//                   if (checked) {
//                     updateFormData('bestROIMarketingChannels', [...formData.bestROIMarketingChannels, channel]);
//                   } else {
//                     updateFormData('bestROIMarketingChannels', formData.bestROIMarketingChannels.filter(c => c !== channel));
//                   }
//                 }}
//               />
//               <Label htmlFor={`mid-channel-${channel}`}>{channel}</Label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-4">
//         <Label htmlFor="revenueFromRepeatCustomers">What percentage of your revenue comes from repeat customers? <span className="text-destructive">*</span></Label>
//         <div className="flex items-center space-x-4">
//           <span className="text-xl font-bold text-primary">{formData.revenueFromRepeatCustomers[0]}%</span>
//           <Slider
//             id="revenueFromRepeatCustomers"
//             min={0}
//             max={100}
//             step={1}
//             value={formData.revenueFromRepeatCustomers}
//             onValueChange={(value) => updateFormData('revenueFromRepeatCustomers', value)}
//             className="w-full"
//           />
//         </div>
//         <div className="flex justify-between text-sm text-muted-foreground">
//           <span>0%</span>
//           <span>100%</span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <Label>What are your primary branding challenges currently? <span className="text-destructive">*</span></Label>
//         <div className="space-y-2">
//           {[
//             'Inconsistent brand messaging',
//             'Low brand recognition',
//             'Difficulty differentiating from competitors',
//             'Unclear brand positioning',
//             'Limited marketing resources',
//             'Measuring branding ROI'
//           ].map((challenge) => (
//             <div key={challenge} className="flex items-center space-x-2">
//               <Checkbox
//                 id={`challenge-${challenge}`}
//                 checked={formData.primaryBrandingChallenges.includes(challenge)}
//                 onCheckedChange={(checked) => {
//                   if (checked) {
//                     updateFormData('primaryBrandingChallenges', [...formData.primaryBrandingChallenges, challenge]);
//                   } else {
//                     updateFormData('primaryBrandingChallenges', formData.primaryBrandingChallenges.filter(c => c !== challenge));
//                   }
//                 }}
//               />
//               <Label htmlFor={`challenge-${challenge}`}>{challenge}</Label>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderAdvancedLevelSpecificAssessment = () => (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="currentMarketShare">
//           What is your current market share in your primary market? <span className="text-destructive">*</span>
//         </Label>
//         <Input
//           id="currentMarketShare"
//           value={formData.currentMarketShare}
//           onChange={(e) => updateFormData('currentMarketShare', e.target.value)}
//           placeholder="e.g., 15%"
//         />
//       </div>

//       <div className="space-y-4">
//         <Label htmlFor="annualMarketingBudgetPercentage">What is your annual marketing budget as a percentage of revenue? <span className="text-destructive">*</span></Label>
//         <div className="flex items-center space-x-4">
//           <span className="text-xl font-bold text-primary">{formData.annualMarketingBudgetPercentage[0]}%</span>
//           <Slider
//             id="annualMarketingBudgetPercentage"
//             min={1}
//             max={30}
//             step={1}
//             value={formData.annualMarketingBudgetPercentage}
//             onValueChange={(value) => updateFormData('annualMarketingBudgetPercentage', value)}
//             className="w-full"
//           />
//         </div>
//         <div className="flex justify-between text-sm text-muted-foreground">
//           <span>1%</span>
//           <span>30%</span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <Label>Which brand metrics do you currently track? <span className="text-destructive">*</span></Label>
//         <div className="space-y-2">
//           {[
//             'Brand Awareness',
//             'Brand Consideration',
//             'Brand Preference',
//             'Net Promoter Score',
//             'Brand Equity',
//             'Share of Voice',
//             'Customer Lifetime Value'
//           ].map((metric) => (
//             <div key={metric} className="flex items-center space-x-2">
//               <Checkbox
//                 id={`metric-${metric}`}
//                 checked={formData.brandMetricsTracked.includes(metric)}
//                 onCheckedChange={(checked) => {
//                   if (checked) {
//                     updateFormData('brandMetricsTracked', [...formData.brandMetricsTracked, metric]);
//                   } else {
//                     updateFormData('brandMetricsTracked', formData.brandMetricsTracked.filter(m => m !== metric));
//                   }
//                 }}
//               />
//               <Label htmlFor={`metric-${metric}`}>{metric}</Label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-4">
//         <Label>What are your primary growth objectives? <span className="text-destructive">*</span></Label>
//         <div className="space-y-2">
//           {[
//             'Market expansion',
//             'Product diversification',
//             'Premium positioning',
//             'Increased market share',
//             'International expansion',
//             'Digital transformation',
//             'Mergers & acquisitions'
//           ].map((objective) => (
//             <div key={objective} className="flex items-center space-x-2">
//               <Checkbox
//                 id={`objective-${objective}`}
//                 checked={formData.primaryGrowthObjectives.includes(objective)}
//                 onCheckedChange={(checked) => {
//                   if (checked) {
//                     updateFormData('primaryGrowthObjectives', [...formData.primaryGrowthObjectives, objective]);
//                   } else {
//                     updateFormData('primaryGrowthObjectives', formData.primaryGrowthObjectives.filter(o => o !== objective));
//                   }
//                 }}
//               />
//               <Label htmlFor={`objective-${objective}`}>{objective}</Label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-4">
//         <Label htmlFor="digitalTransformationBudgetAllocation">What percentage of your marketing budget is allocated to digital transformation initiatives? <span className="text-destructive">*</span></Label>
//         <div className="flex items-center space-x-4">
//           <span className="text-xl font-bold text-primary">{formData.digitalTransformationBudgetAllocation[0]}%</span>
//           <Slider
//             id="digitalTransformationBudgetAllocation"
//             min={0}
//             max={100}
//             step={1}
//             value={formData.digitalTransformationBudgetAllocation}
//             onValueChange={(value) => updateFormData('digitalTransformationBudgetAllocation', value)}
//             className="w-full"
//           />
//         </div>
//         <div className="flex justify-between text-sm text-muted-foreground">
//           <span>0%</span>
//           <span>100%</span>
//         </div>
//       </div>
//     </div>
//   );


//   const renderStep3 = () => {
//     const stages = [
//       {
//         id: 'entry',
//         title: 'Entry Level',
//         description: 'Starting a new business and not sure where to put money in branding',
//         icon: Plus,
//       },
//       {
//         id: 'mid',
//         title: 'Mid Level',
//         description: 'Existing business, spending vaguely on branding and marketing, need navigation',
//         icon: BarChart3,
//       },
//       {
//         id: 'advanced',
//         title: 'Advanced',
//         description: 'Extensive market visibility, looking to streamline and scale with higher budgets',
//         icon: TrendingUp,
//       },
//     ];

//     const handleStageClick = (stageId: string) => {
//       setSelectedStage(stageId);
//       updateFormData('businessLevel', stageId);
//     };

//     const handleBackToStageSelection = () => {
//       setSelectedStage(null);
//       updateFormData('businessLevel', ''); // Clear the selected business level
//       // Clear all stage-specific fields when going back to stage selection
//       updateFormData('productCategory', '');
//       updateFormData('marketResearch', '');
//       updateFormData('primaryBrandingGoal', '');
//       updateFormData('distributionChannels', []);
//       updateFormData('budgetAllocationPercentage', [0]);
//       updateFormData('customerAcquisitionCost', '');
//       updateFormData('customerLifetimeValue', '');
//       updateFormData('bestROIMarketingChannels', []);
//       updateFormData('revenueFromRepeatCustomers', [0]);
//       updateFormData('primaryBrandingChallenges', []);
//       updateFormData('currentMarketShare', '');
//       updateFormData('annualMarketingBudgetPercentage', [1]); // Reset to default
//       updateFormData('brandMetricsTracked', []);
//       updateFormData('primaryGrowthObjectives', []);
//       updateFormData('digitalTransformationBudgetAllocation', [0]);
//     };

//     // Determine if the "Next" button should be disabled for the current stage
//     const isNextDisabledForStage = () => {
//       if (!selectedStage) return true; // Cannot proceed if no stage is selected

//       if (selectedStage === 'mid') {
//         return (
//           !formData.customerAcquisitionCost ||
//           !formData.customerLifetimeValue ||
//           formData.bestROIMarketingChannels.length === 0 ||
//           formData.revenueFromRepeatCustomers[0] === 0 ||
//           formData.primaryBrandingChallenges.length === 0
//         );
//       } else if (selectedStage === 'advanced') {
//         return (
//           !formData.currentMarketShare ||
//           formData.annualMarketingBudgetPercentage[0] === 0 || // Assuming 0% is not a valid allocation
//           formData.brandMetricsTracked.length === 0 ||
//           formData.primaryGrowthObjectives.length === 0 ||
//           formData.digitalTransformationBudgetAllocation[0] === 0 // Assuming 0% is not a valid allocation
//         );
//       } else { // Entry Level (default StageSpecificAssessment)
//         return (
//           !formData.productCategory ||
//           !formData.marketResearch ||
//           !formData.primaryBrandingGoal ||
//           formData.distributionChannels.length === 0 ||
//           formData.budgetAllocationPercentage[0] === 0
//         );
//       }
//     };


//     return (
//       <div className="space-y-8">
//         {!selectedStage ? (
//           <>
//             <div>
//               <h2 className="text-xl font-semibold mb-2">Select Your Business Stage</h2>
//               <Label className="font-medium">
//                 Select your business stage <span className="text-destructive">*</span>
//               </Label>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                 {stages.map((stage) => {
//                   const Icon = stage.icon;
//                   return (
//                     <Card
//                       key={stage.id}
//                       className="p-6 cursor-pointer transition-all duration-300 border hover:border-primary/40 hover:shadow-md"
//                       onClick={() => handleStageClick(stage.id)}
//                     >
//                       <div className="text-center space-y-4">
//                         <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                           <Icon className="w-6 h-6 text-primary" />
//                         </div>
//                         <h3 className="font-semibold text-lg text-primary">{stage.title}</h3>
//                         <p className="text-sm text-muted-foreground">{stage.description}</p>
//                       </div>
//                     </Card>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="flex justify-between mt-6">
//               <Button variant="outline" onClick={prevStep}>Previous</Button>
//               <Button disabled>Next</Button>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="rounded-xl border p-6 bg-white shadow-sm">
//               {selectedStage === 'mid' ? renderMidLevelSpecificAssessment() :
//                selectedStage === 'advanced' ? renderAdvancedLevelSpecificAssessment() :
//                renderStageSpecificAssessment()}
//             </div>

//             <div className="flex justify-between mt-6">
//               <Button variant="outline" onClick={handleBackToStageSelection}>Previous</Button>
//               <Button
//                 onClick={nextStep}
//                 disabled={isNextDisabledForStage()}
//               >
//                 Next
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//     );
//   };

//   const renderStep4 = () => (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <Label>What are your goals for your brand? <span className="text-destructive">*</span></Label>
//         <div className="space-y-2">
//           {[
//             'Brand Awareness',
//             'Lead Generation',
//             'Customer Retention',
//             'Product Launch',
//             'Market Expansion',
//             'Rebranding',
//             'Legal / IPR'
//           ].map((goal) => (
//             <div key={goal} className="flex items-center space-x-2">
//               <Checkbox
//                 id={goal}
//                 checked={formData.brandGoals.includes(goal)}
//                 onCheckedChange={(checked) => {
//                   if (checked) {
//                     updateFormData('brandGoals', [...formData.brandGoals, goal]);
//                   } else {
//                     updateFormData('brandGoals', formData.brandGoals.filter(g => g !== goal));
//                   }
//                 }}
//               />
//               <Label htmlFor={goal}>{goal}</Label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="keyChallenges">
//           What are the key challenges your brand is facing? (Max 2) <span className="text-destructive">*</span>
//         </Label>
//         <Textarea
//           id="keyChallenges"
//           value={formData.keyChallenges}
//           onChange={(e) => updateFormData('keyChallenges', e.target.value)}
//           placeholder="Describe your key challenges"
//           className="min-h-[100px]"
//         />
//       </div>

//       {/* New section for "Current Marketing channels" */}
//       <div className="space-y-4">
//         <Label>What are your Current Marketing channels? <span className="text-destructive">*</span></Label>
//         <div className="grid grid-cols-2 gap-2">
//           {[
//             'Social Media',
//             'Email',
//             'Content Marketing',
//             'PPC',
//             'SEO',
//             'Events',
//             'Print',
//             'TV/Radio',
//             'Offline (Hoardings, etc)'
//           ].map((channel) => (
//             <div key={channel} className="flex items-center space-x-2">
//               <Checkbox
//                 id={`marketing-channel-${channel}`}
//                 checked={formData.currentMarketingChannels.includes(channel)}
//                 onCheckedChange={(checked) => {
//                   if (checked) {
//                     updateFormData('currentMarketingChannels', [...formData.currentMarketingChannels, channel]);
//                   } else {
//                     updateFormData('currentMarketingChannels', formData.currentMarketingChannels.filter(c => c !== channel));
//                   }
//                 }}
//               />
//               <Label htmlFor={`marketing-channel-${channel}`}>{channel}</Label>
//             </div>
//           ))}
//         </div>
//       </div>


//       <div className="flex justify-between">
//         <Button variant="outline" onClick={prevStep}>
//           Previous
//         </Button>
//         <Button onClick={nextStep} disabled={formData.brandGoals.length === 0 || !formData.keyChallenges || formData.currentMarketingChannels.length === 0}>
//           Next
//         </Button>
//       </div>
//     </div>
//   );

//   const renderStep5 = () => (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <Label>What is your current budget? <span className="text-destructive">*</span></Label>
//         <RadioGroup value={formData.currentBudget} onValueChange={(value) => updateFormData('currentBudget', value)}>
//           {[
//             'Less than 30 Lakhs',
//             '30 Lakhs - 50 Lakhs',
//             '50 Lakhs - 1 Cr',
//             '1Cr - 5 Cr',
//             '5 Cr - 10 Cr',
//             'More than 10 Cr'
//           ].map((budget) => (
//             <div key={budget} className="flex items-center space-x-2">
//               <RadioGroupItem value={budget} id={budget} />
//               <Label htmlFor={budget}>{budget}</Label>
//             </div>
//           ))}
//         </RadioGroup>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="plannedBudget">
//           What is your planned budget? <span className="text-destructive">*</span>
//         </Label>
//         <Input
//           id="plannedBudget"
//           value={formData.plannedBudget}
//           onChange={(e) => updateFormData('plannedBudget', e.target.value)}
//           placeholder="e.g., ₹12"
//         />
//       </div>

//       <div className="space-y-4">
//         <Label>What is the time frame? <span className="text-destructive">*</span></Label>
//         <RadioGroup value={formData.timeFrame} onValueChange={(value) => updateFormData('timeFrame', value)}>
//           {[
//             '0-6 months',
//             '6-12 months',
//             '12-18 months',
//             '18-24 months'
//           ].map((frame) => (
//             <div key={frame} className="flex items-center space-x-2">
//               <RadioGroupItem value={frame} id={frame} />
//               <Label htmlFor={frame}>{frame}</Label>
//             </div>
//           ))}
//         </RadioGroup>
//       </div>

//       <div className="flex justify-between">
//         <Button variant="outline" onClick={prevStep}>
//           Previous
//         </Button>
//         <Button
//           onClick={() => {
//             if (formData.currentBudget && formData.plannedBudget && formData.timeFrame) {
//               navigate("/generate", { state: { formData } });
//             }
//           }}
//           disabled={!formData.currentBudget || !formData.plannedBudget || !formData.timeFrame}
//         >
//           Complete Planning
//         </Button>
//       </div>
//     </div>
//   );

//   return (
//       <div className="min-h-screen bg-background py-8 px-4">
//           {/* Back to Dashboard Button - Right Aligned */}
//           <div className="max-w-4xl mx-auto mb-4 flex justify-start md:justify-end">
//               <Button variant="outline" onClick={() => navigate('/dashboard')} className="gap-2">
//                   <ArrowLeft className="w-4 h-4" />
//                   Back to Dashboard
//               </Button>
//           </div>
//           <div className="max-w-4xl mx-auto">
//               {/* Header */}
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-8">
//                   <h1 className="text-2xl font-bold">Brand Budget Planner</h1>
//                   <span className="text-sm text-muted-foreground">Optimize your branding investment</span>
//               </div>



//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm font-medium">Step {currentStep} of 5</span>
//             <span className="text-sm text-primary font-medium">{Math.round((currentStep / 5) * 100)}%</span>
//           </div>
//           <Progress value={(currentStep / 5) * 100} className="h-2" />
//         </div>

//         {/* Form Card */}
//         <Card className="p-8 shadow-lg">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
//           </div>

//           {currentStep === 1 && renderStep1()}
//           {currentStep === 2 && renderStep2()}
//           {currentStep === 3 && renderStep3()}
//           {currentStep === 4 && renderStep4()}
//           {currentStep === 5 && renderStep5()}
//         </Card>
//       </div>
//     </div>
//   );
// };





// export default StartBudgetingForm;










