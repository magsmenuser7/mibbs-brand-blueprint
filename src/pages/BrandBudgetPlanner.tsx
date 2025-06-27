
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Building, TrendingUp, Target, Plus, BarChart3, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const BrandBudgetPlanner = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [selectedBusinessStage, setSelectedBusinessStage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingBudget, setIsGeneratingBudget] = useState(false);
  const navigate = useNavigate();
  
  // Form data
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    websiteUrl: "",
    companyOverview: "",
    industry: "",
    brandProvides: "", 
    businessDuration: "",
    businessStage: "",
    aboutCompany: "",
    targetAudience: "",
    businessType: "",
    customerLTV: "",
    bestROIChannels: "",
    repeatCustomerPercentage: "",
    brandingChallenges: "",
    currentBrandingSpend: "",
    brandGoals: "",
    plannedBudget: "",
    timeFrame: ""
  });

  const industries = [
    "Technology/SaaS",
    "FMCG/D2C", 
    "Services",
    "Manufacturing",
    "Retail",
    "Healthcare",
    "Education",
    "Finance",
    "Real Estate",
    "Other"
  ];

  const businessDurations = [
    "Less than 1 year",
    "1-2 years", 
    "3-5 years",
    "6-10 years",
    "More than 10 years"
  ];

  const businessTypes = [
    "B2B (Business to Business)",
    "B2C (Business to Consumer)",
    "B2B2C (Business to Business to Consumer)",
    "Marketplace",
    "SaaS Platform",
    "E-commerce",
    "Service Provider",
    "Other"
  ];

  const timeFrames = [
    "3 months",
    "6 months",
    "1 year",
    "2 years",
    "3+ years"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (currentStep: number) => {
    switch(currentStep) {
      case 1:
        if (!formData.companyName || !formData.companyOverview || !formData.industry || !formData.brandProvides || !formData.businessDuration) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields to continue",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 2:
        if (!selectedBusinessStage) {
          toast({
            title: "Business Stage Required",
            description: "Please select your business stage to continue",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 3:
        if (!formData.aboutCompany || !formData.targetAudience || !formData.businessType) {
          toast({
            title: "Missing Information", 
            description: "Please fill in all required fields to continue",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 4:
        if (!formData.customerLTV || !formData.bestROIChannels || !formData.repeatCustomerPercentage || !formData.brandingChallenges || !formData.currentBrandingSpend) {
          toast({
            title: "Missing Information", 
            description: "Please fill in all required fields to continue",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 5:
        if (!formData.brandGoals || !formData.plannedBudget || !formData.timeFrame) {
          toast({
            title: "Missing Information", 
            description: "Please fill in all required fields to continue",
            variant: "destructive"
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    
    if (step === 2) {
      setFormData(prev => ({ ...prev, businessStage: selectedBusinessStage }));
      setIsAnalyzing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(step + 1);
        setProgress(Math.min(progress + 20, 100));
      }, 3000);
    } else if (step === 5) {
      setIsGeneratingBudget(true);
      
      // Simulate final budget generation
      setTimeout(() => {
        setIsGeneratingBudget(false);
        toast({
          title: "Budget Plan Generated!",
          description: "Your personalized brand budget plan is ready.",
        });
      }, 4000);
    } else {
      setStep(step + 1);
      setProgress(Math.min(progress + 20, 100));
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
    setProgress(Math.max(progress - 20, 20));
  };

  const businessStageCards = [
    {
      id: "entry",
      icon: Plus,
      title: "Entry Level",
      subtitle: "Starting a new business and not sure where to put money in branding"
    },
    {
      id: "mid", 
      icon: TrendingUp,
      title: "Mid Level",
      subtitle: "Existing business, spending vaguely on branding and marketing, need navigation"
    },
    {
      id: "advanced",
      icon: BarChart3, 
      title: "Advanced",
      subtitle: "Extensive market visibility, looking to streamline and scale with higher budgets"
    }
  ];

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-navy mb-4">Analyzing company profile and target audience..</h2>
          <p className="text-navy-light">
            Our AI is processing your business information to generate comprehensive company analysis and identify your target audience.
          </p>
        </div>
      </div>
    );
  }

  if (isGeneratingBudget) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-navy mb-4">Analyzing and loading personalized budget</h2>
          <p className="text-navy-light">
            Our AI is processing all your inputs to create a comprehensive, data-driven budget recommendation tailored specifically for your business needs.
          </p>
          <p className="text-navy-light mt-2">This may take a few moments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Brand Budget Planner
          </h1>
          <p className="text-xl text-navy-light">
            Optimize your branding investment
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-navy-light mb-2">
            <span>Step {step} of 5</span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              {step === 1 && "Basic Company Information"}
              {step === 2 && "Select Your Business Stage"}
              {step === 3 && "You're over halfway there!"}
              {step === 4 && "Stage-Specific Assessment"}
              {step === 5 && "Brand Goals & Budget Planning"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Alert Boxes */}
            {step === 1 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  Welcome! Let's start by getting to know your business better. This information helps us understand your brand's foundation and create a tailored budget plan that aligns with your industry and business model.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800">
                  Great progress! Now, let's identify where your business currently stands. Each stage has unique branding needs and budget considerations. Don't worry if you're between stages - choose the one that best describes your current situation.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <p className="text-purple-800">
                  Excellent! We've analyzed your business and generated comprehensive insights. Please review and refine the information below. Your input ensures we create the most accurate budget recommendations for your specific market and audience.
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <p className="text-orange-800">
                  Almost there! Now let's dive into the specifics of your marketing performance and challenges. This data helps us understand what's working for your business and where there might be opportunities to optimize your branding investment for better returns.
                </p>
              </div>
            )}

            {step === 5 && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                <p className="text-indigo-800">
                  Final step! You're doing great! Now let's define your brand objectives, timeline, and budget parameters. This final information will allow us to create a comprehensive, actionable budget plan that aligns perfectly with your goals and financial capacity.
                </p>
              </div>
            )}

            {/* Step 1 Form */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Name of the Company *
                    </label>
                    <Input
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Location of the Company
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="City, State, Country"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Website URL
                  </label>
                  <Input
                    value={formData.websiteUrl}
                    onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                    placeholder="https://www.yourcompany.com"
                    type="url"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Overview of the Company *
                  </label>
                  <Textarea
                    value={formData.companyOverview}
                    onChange={(e) => handleInputChange("companyOverview", e.target.value)}
                    placeholder="Briefly describe what your company does, its mission, and key values"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Industry *
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange("industry", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent"
                      required
                    >
                      <option value="">Select your industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Duration of business in the current industry *
                    </label>
                    <select
                      value={formData.businessDuration}
                      onChange={(e) => handleInputChange("businessDuration", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent"
                      required
                    >
                      <option value="">Select duration</option>
                      {businessDurations.map(duration => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    What does your brand provide? *
                  </label>
                  <Textarea
                    value={formData.brandProvides}
                    onChange={(e) => handleInputChange("brandProvides", e.target.value)}
                    placeholder="Describe your products or services, target market, and unique value proposition"
                    rows={3}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2 - Business Stage Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <p className="text-sm font-medium text-navy mb-4">Select your business stage *</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {businessStageCards.map((stage) => {
                    const IconComponent = stage.icon;
                    return (
                      <Card
                        key={stage.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedBusinessStage === stage.id 
                            ? "ring-2 ring-accent bg-accent/5" 
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedBusinessStage(stage.id)}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="h-6 w-6 text-accent" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2 text-navy">{stage.title}</h3>
                          <p className="text-sm text-navy-light">{stage.subtitle}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3 - Company Analysis Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    About Company *
                  </label>
                  <Textarea
                    value={formData.aboutCompany}
                    onChange={(e) => handleInputChange("aboutCompany", e.target.value)}
                    placeholder="AI-generated company analysis will appear here. Please review and refine as needed."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Target Audience *
                  </label>
                  <Textarea
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                    placeholder="AI-identified target audience details will appear here. Please review and refine as needed."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Business Type *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => handleInputChange("businessType", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    required
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 4 - Stage-Specific Assessment */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    What is your average customer lifetime value (LTV)? *
                  </label>
                  <Input
                    value={formData.customerLTV}
                    onChange={(e) => handleInputChange("customerLTV", e.target.value)}
                    placeholder="e.g., ₹50,000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Which marketing channels have given you the best ROI so far? *
                  </label>
                  <Textarea
                    value={formData.bestROIChannels}
                    onChange={(e) => handleInputChange("bestROIChannels", e.target.value)}
                    placeholder="e.g., Social media marketing, Google Ads, Email marketing, etc."
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    What percentage of your revenue comes from repeat customers? *
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.repeatCustomerPercentage}
                    onChange={(e) => handleInputChange("repeatCustomerPercentage", e.target.value)}
                    placeholder="Enter percentage (0-100)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    What are your primary branding challenges currently? *
                  </label>
                  <Textarea
                    value={formData.brandingChallenges}
                    onChange={(e) => handleInputChange("brandingChallenges", e.target.value)}
                    placeholder="e.g., Low brand awareness, inconsistent messaging, competition, etc."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    What is your current branding spend? *
                  </label>
                  <Input
                    value={formData.currentBrandingSpend}
                    onChange={(e) => handleInputChange("currentBrandingSpend", e.target.value)}
                    placeholder="e.g., ₹2,00,000 per month"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 5 - Brand Goals & Budget Planning */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    What are your goals for your brand? *
                  </label>
                  <Textarea
                    value={formData.brandGoals}
                    onChange={(e) => handleInputChange("brandGoals", e.target.value)}
                    placeholder="e.g., Increase brand awareness, improve customer retention, expand market share, etc."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    What is your planned budget? *
                  </label>
                  <Input
                    value={formData.plannedBudget}
                    onChange={(e) => handleInputChange("plannedBudget", e.target.value)}
                    placeholder="e.g., ₹10,00,000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    What is the time frame? *
                  </label>
                  <select
                    value={formData.timeFrame}
                    onChange={(e) => handleInputChange("timeFrame", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    required
                  >
                    <option value="">Select time frame</option>
                    {timeFrames.map(timeFrame => (
                      <option key={timeFrame} value={timeFrame}>{timeFrame}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={step === 1 ? () => navigate("/tools") : handlePrev}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> 
                {step === 1 ? "Back to Tools" : "Previous"}
              </Button>
              
              <Button 
                onClick={handleNext}
                className="flex items-center"
              >
                {step === 5 ? "Complete" : "Continue"} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandBudgetPlanner;
