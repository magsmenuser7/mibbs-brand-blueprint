import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Building2, Globe, TrendingUp, MapPin, Factory, Package, Wrench,
  DollarSign, Briefcase, Calendar, AlertTriangle, BarChart3, Target,
  ChevronLeft, ChevronRight, CheckCircle2, Check, Rocket, Monitor,
  FileText, Users, BookOpen, MonitorSmartphone, Sparkles, Store, Globe2,
  UserX, ShoppingCart, HelpCircle, Megaphone, PuzzleIcon, Shield, CircleDollarSign,
  RefreshCw, Search, Compass, Smartphone, BarChart2,
} from "lucide-react";
import OptionCard from "@/componentsfour/questionnaire/OptionCard";
import PincodeLookup from "@/componentsfour/questionnaire/PincodeLookup";
import NewBusinessOutput from "@/componentsfour/output/NewBusinessOutput";
import ExistingBusinessOutput from "@/componentsfour/output/ExistingBusinessOutput";
import Dashboard from "@/componentsfour/dashboard/Dashboard";
import { initialData } from "@/types/questionnaire";
import { PincodeInfo } from "@/data/pincodeData";
import SignupModal from "@/componentstwo/flow/SignupModal";
import axios from "axios";

interface SavedPlan {
  id: string;
  data: QuestionnaireData;
  type: "new" | "existing";
  savedAt: string;
}


interface QuestionnaireData {
  name: string;
  businessName: string;
  businessStage: "not_started" | "early" | "growing" | "advanced" | "";
  hasWebsite: boolean;
  websiteUrl: string;
  pincode: string;
  locality: string;
  district: string;
  state: string;
  country: string;
  industry: string;
  businessType: "product" | "service" | "";
  productBusinessType: "B2B" | "B2C" | "D2C" | "";
  startingBudget: string;
  businessMode: ("Online" | "Offline")[];
  helpNeeded: string[];
  yearsInBusiness: string;
  businessChallenges: string[];
  digitalScalingLevel: string;
  digitalPlatforms: string[];
  digitalActivities: string[];
  roiPercentage: string;
  monthlyRevenue: string;
  marketingBudgetRange: string;
  brandObjectives: string[];
  monthlyBudget: number;
  annualBudget: number;
  pieChartData: { name: string; value: number; amount: number; color: string; }[];
  channelFocuses: { name: string; percentage: number; amount: number; }[];
  budgetAllocations: any[];
  barChartData: any[];
}



const industries = [
  "Food & Beverages", "Retail & E-commerce", "Health & Wellness",
  "Education & Training", "Beauty & Personal Care", "Real Estate",
  "Technology & IT", "Fashion & Apparel", "Automotive",
  "Home Services", "Travel & Tourism", "Finance & Insurance",
  "Entertainment & Media", "Agriculture", "Manufacturing", "Other"
];

const productCategories = [
  "Physical Products", "Digital Products", "SaaS / Software", "Consumer Electronics",
  "FMCG", "Industrial Goods", "Handmade / Artisan", "Health & Nutrition"
];

const challengesList = [
  { label: "Not enough people are coming to us", desc: "We want more customers, but footfall or enquiries feel low.", icon: <UserX className="w-5 h-5" /> },
  { label: "People ask, but don't buy", desc: "Customers show interest, but most don't go ahead and purchase.", icon: <ShoppingCart className="w-5 h-5" /> },
  { label: "We don't know what's actually working", desc: "We try different ways to promote, but can't tell what brings customers.", icon: <HelpCircle className="w-5 h-5" /> },
  { label: "Promotions feel like wasted money", desc: "We spend money to promote, but the results aren't clear.", icon: <CircleDollarSign className="w-5 h-5" /> },
  { label: "Marketing feels confusing", desc: "We're unsure how to promote our business in the right way.", icon: <Compass className="w-5 h-5" /> },
  { label: "Too many businesses like ours", desc: "There are many similar businesses fighting for the same customers.", icon: <AlertTriangle className="w-5 h-5" /> },
  { label: "We have to be very careful with spending", desc: "Our marketing budget is limited, so mistakes are costly.", icon: <Shield className="w-5 h-5" /> },
  { label: "Customers don't come back", desc: "People buy once, but rarely return again.", icon: <RefreshCw className="w-5 h-5" /> },
  { label: "Hardly anyone finds us online", desc: "Few people see or discover our business on the internet.", icon: <Search className="w-5 h-5" /> },
  { label: "We're not sure what to do next", desc: "We want to grow, but don't have a clear direction.", icon: <Compass className="w-5 h-5" /> },
];

const scalingLevels = [
  { label: "No digital presence", desc: "Haven't started online yet", icon: <Monitor className="w-5 h-5" /> },
  { label: "Basic", desc: "Social media platforms", icon: <Smartphone className="w-5 h-5" /> },
  { label: "Growing", desc: "Active marketing efforts", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Advanced", desc: "Full digital marketing stack", icon: <BarChart2 className="w-5 h-5" /> },
];

const marketingSpendOptions = [
  "Less than ₹10,000", "₹10,000 - ₹1,00,000", "More than ₹1,00,000"
];

const brandObjectivesList = [
  { label: "More people should know about my business", desc: "Right now, many people don't know we exist — we want to be seen and recognised.", icon: <Megaphone className="w-5 h-5" /> },
  { label: "I want more calls, messages, or enquiries", desc: "I want more people to reach out and ask about what we offer.", icon: <Smartphone className="w-5 h-5" /> },
  { label: "I want to increase online sales", desc: "More people should buy from us through the internet.", icon: <ShoppingCart className="w-5 h-5" /> },
  { label: "I want customers to come back again", desc: "Getting repeat customers is more important than one-time sales.", icon: <RefreshCw className="w-5 h-5" /> },
  { label: "I want people to trust my brand", desc: "When customers see us, they should feel confident choosing us.", icon: <Shield className="w-5 h-5" /> },
  { label: "I want to stop wasting money on marketing", desc: "I want my money to be spent wisely, not blindly.", icon: <CircleDollarSign className="w-5 h-5" /> },
  { label: "I want steady income every month", desc: "I want predictable, stable sales — not ups and downs.", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "I want to be well-known in my local area", desc: "People nearby should think of us first when they need this product/service.", icon: <MapPin className="w-5 h-5" /> },
  { label: "I want my business to look strong online", desc: "My website or social media should look active, clear, and professional.", icon: <Globe className="w-5 h-5" /> },
  { label: "I want to know what is actually working", desc: "I want clarity on what brings results, so I can do more of it.", icon: <BarChart2 className="w-5 h-5" /> },
];

const yearsOptions = [
  "Less than 1 year", "1 - 3 years", "3 - 5 years", "More than 5 years"
];

const pageVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

type AppView = "questionnaire" | "preloader" | "output" | "dashboard" | "auth";

const MIBBSQuestionnaire = () => {
  const [data, setData] = useState<QuestionnaireData>({
    ...initialData,
    name: initialData.name || "",
    businessName: initialData.businessName || "",
    businessStage: initialData.businessStage || "",
    hasWebsite: initialData.hasWebsite || false,
    websiteUrl: initialData.websiteUrl || "",
    pincode: initialData.pincode || "",
    locality: initialData.locality || "",
    district: initialData.district || "",
    state: initialData.state || "",
    country: initialData.country || "India",
    industry: initialData.industry || "",
    businessType: initialData.businessType || "",
    productBusinessType: (initialData.productBusinessType ?? "") as "B2B" | "B2C" | "D2C" | "",
    startingBudget: initialData.startingBudget || "",
    businessMode: [],
    helpNeeded: initialData.helpNeeded || [],
    yearsInBusiness: initialData.yearsInBusiness || "",
    businessChallenges: initialData.businessChallenges || [],
    digitalScalingLevel: initialData.digitalScalingLevel || "",
    digitalPlatforms: initialData.digitalPlatforms || [],
    digitalActivities: initialData.digitalActivities || [],
    roiPercentage: initialData.roiPercentage || "",
    monthlyRevenue: initialData.monthlyRevenue || "",
    marketingBudgetRange: initialData.marketingBudgetRange || "",
    brandObjectives: initialData.brandObjectives || [],
    monthlyBudget: 0,
    annualBudget: 0,
    barChartData: [],
    pieChartData: [],
    channelFocuses: [],
    budgetAllocations: [],
  });


  const [currentStep, setCurrentStep] = useState(0);
  const [noBusinessName, setNoBusinessName] = useState(false);
  const [view, setView] = useState<AppView>("questionnaire");
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("mibbs_plans") || "[]");
    } catch { return []; }
  });
  const [viewingPlan, setViewingPlan] = useState<SavedPlan | null>(null);

  const isNewBusiness = data.businessStage === "not_started";
  const isExistingBusiness = ["early", "growing", "advanced"].includes(data.businessStage || "");

  const getSteps = useCallback(() => {
    const base = ["Details", "Location", "Industry"];
    if (isNewBusiness) return [...base, "Capital", "Mode", "Help"];
    if (isExistingBusiness) return [...base, "Experience", "Challenges", "Digital Scale", "Revenue", "Objectives"];
    return base;
  }, [isNewBusiness, isExistingBusiness]);

  const steps = getSteps();
  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  const update = (field: keyof QuestionnaireData, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: "businessChallenges" | "brandObjectives" | "helpNeeded" | "digitalPlatforms" | "digitalActivities", item: string) => {
    setData((prev) => {
      const arr = (prev[field] as string[]) || [];
      return { ...prev, [field]: arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item] };
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return data.name.trim() && (noBusinessName || data.businessName.trim()) && data.businessStage;
      case 1: return data.pincode.length === 6 && data.locality;
      case 2: return data.industry && data.businessType;
      default:
        if (isNewBusiness) {
          if (currentStep === 3) return data.startingBudget;
          if (currentStep === 4) return data.businessMode;
          if (currentStep === 5) return (data.helpNeeded || []).length > 0;
        }
        if (isExistingBusiness) {
          if (currentStep === 3) return data.yearsInBusiness;
          if (currentStep === 4) return data.businessChallenges.length > 0;
          if (currentStep === 5) return data.digitalScalingLevel;
          if (currentStep === 6) return (data.monthlyRevenue || "").trim() && data.marketingBudgetRange;
          if (currentStep === 7) return data.brandObjectives.length > 0;
        }
        return true;
    }
  };

  const next = () => {

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    // Last step completed
    handleComplete();

  };


  const handleComplete = () => {

    // Save questionnaire temporarily
    localStorage.setItem(
      "pending_questionnaire",
      JSON.stringify(data)
    );

    const token = localStorage.getItem("access_token");

    // If user NOT logged in → open AUTH PAGE
    if (!token) {
      setView("auth");   // ✅ open separate page
      return;
    }

    // If already logged in → go to output
    setView("output");

  };


  const handleAuthSuccess = async (user: any) => {
    debugger;

    const saved = localStorage.getItem("pending_questionnaire");

    if (!saved) return;

    const data = JSON.parse(saved);

    // 🔹 ADD THIS LINE
    const result = generateBudgetReport(data);

    const payload = {

      business_path:
        data.businessStage === "not_started"
          ? "NEW"
          : "EXISTING",

      user: user?.id,

      business_name: data.businessName,
      business_stage: data.businessStage,
      has_website: data.hasWebsite,
      website_url: data.websiteUrl,

      pincode: data.pincode,
      locality: data.locality,
      district: data.district,
      state: data.state,
      country: data.country,

      industry: data.industry,
      business_type: data.businessType,
      product_business_type: data.productBusinessType,

      starting_budget: data.startingBudget,
      business_mode: data.businessMode,
      help_needed: data.helpNeeded,

      years_in_business: data.yearsInBusiness,
      business_challenges: data.businessChallenges,

      digital_scaling_level: data.digitalScalingLevel,
      digital_platforms: data.digitalPlatforms,
      digital_activities: data.digitalActivities,

      roi_percentage: data.roiPercentage,

      monthly_revenue: data.monthlyRevenue,
      marketing_budget_range: data.marketingBudgetRange,

      brand_objectives: data.brandObjectives,

      // 🔹 Budget Data
      monthly_budget: result.monthlyBudget,
      annual_budget: result.annualBudget,
      pie_chart_data: result.pieChartData,
      channel_focuses: result.channelFocuses,
      budget_allocations: result.budgetAllocations,

    };

    try {

      await saveQuestionnaireToDB(payload);

      localStorage.removeItem("pending_questionnaire");

      setData({
        ...data,
        monthlyBudget: result.monthlyBudget,
        annualBudget: result.annualBudget,
        pieChartData: result.pieChartData,
        channelFocuses: result.channelFocuses,
        budgetAllocations: result.budgetAllocations
      });

      setView("output");

    } catch (error) {

      console.error("Questionnaire save failed:", error);

    }

  };

  // const next = () => {
  //   if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  //   else setView("output");
  // };

  const prev = () => { if (currentStep > 0) setCurrentStep((s) => s - 1); };

  const handleLocationFound = useCallback((info: PincodeInfo) => {
    setData((prev) => ({ ...prev, locality: info.locality, district: info.district, state: info.state, country: info.country }));
  }, []);

  const handleSave = () => {
    const plan: SavedPlan = {
      id: Date.now().toString(),
      data: { ...data },
      type: isNewBusiness ? "new" : "existing",
      savedAt: new Date().toISOString(),
    };
    const updated = [...savedPlans, plan];
    setSavedPlans(updated);
    localStorage.setItem("mibbs_plans", JSON.stringify(updated));
    toast({ title: "✅ Data Saved Successfully!", description: "Your plan has been saved." });
  };

  const handleGoToDashboard = () => {
    // Save first if not already saved
    const alreadySaved = savedPlans.some(p => JSON.stringify(p.data) === JSON.stringify(data));
    if (!alreadySaved) {
      const plan: SavedPlan = {
        id: Date.now().toString(),
        data: { ...data },
        type: isNewBusiness ? "new" : "existing",
        savedAt: new Date().toISOString(),
      };
      const updated = [...savedPlans, plan];
      setSavedPlans(updated);
      localStorage.setItem("mibbs_plans", JSON.stringify(updated));
    }
    setView("dashboard");
  };

  const handleDeletePlan = (id: string) => {
    const updated = savedPlans.filter((p) => p.id !== id);
    setSavedPlans(updated);
    localStorage.setItem("mibbs_plans", JSON.stringify(updated));
  };

  const handleNewRegistration = () => {
    setData({
      ...initialData,
      businessMode: initialData.businessMode ?? [],
      monthlyBudget: 0,
      annualBudget: 0,
      barChartData: [],
      pieChartData: [],
      channelFocuses: [],
      budgetAllocations: [],
    } as QuestionnaireData);

    setCurrentStep(0);
    setNoBusinessName(false);
    setView("questionnaire");
    setViewingPlan(null);
  };


  const handleViewPlan = (plan: SavedPlan) => {

    setData({
      ...initialData,
      ...(plan.data as QuestionnaireData),

      helpNeeded: plan.data.helpNeeded || [],
      businessChallenges: plan.data.businessChallenges || [],
      brandObjectives: plan.data.brandObjectives || [],
      digitalPlatforms: plan.data.digitalPlatforms || [],
      digitalActivities: plan.data.digitalActivities || [],

      monthlyBudget: plan.data.monthlyBudget || 0,
      annualBudget: plan.data.annualBudget || 0,
      barChartData: plan.data.barChartData || [],
      pieChartData: plan.data.pieChartData || [],
      channelFocuses: plan.data.channelFocuses || [],
      budgetAllocations: plan.data.budgetAllocations || [],
    });

    setViewingPlan(plan);
    setView("output");
  };


  // Dashboard view
  if (view === "dashboard") {
    return (
      <Dashboard
        plans={savedPlans as any}
        onViewPlan={handleViewPlan as any}
        onDeletePlan={handleDeletePlan as any}
        onNewRegistration={handleNewRegistration as any}
      />
    );
  }


  // Output view
  if (view === "output") {

    const businessType =
      viewingPlan
        ? viewingPlan.type
        : isNewBusiness
          ? "new"
          : "existing";

    if (businessType === "new") {

      return (
        <NewBusinessOutput
          data={data as any}
          onSave={handleSave}
          onGoToDashboard={handleGoToDashboard}
          onBack={() => {
            setView("questionnaire");
            setViewingPlan(null);
          }}
        />
      );

    }

    return (
      <ExistingBusinessOutput
        data={data as any}
        onSave={handleSave}
        onGoToDashboard={handleGoToDashboard}
        onBack={() => {
          setView("questionnaire");
          setViewingPlan(null);
        }}
      />
    );

  }


  const toggleBusinessMode = (mode: "Online" | "Offline" | "Both") => {

    setData((prev) => {

      const modes = prev.businessMode ?? [];

      if (mode === "Both") {
        return {
          ...prev,
          businessMode: ["Online", "Offline"]
        };
      }

      if (modes.includes(mode)) {
        return {
          ...prev,
          businessMode: modes.filter((m) => m !== mode)
        };
      }

      return {
        ...prev,
        businessMode: [...modes, mode]
      };

    });

  };



  const generateBudgetReport = (data: any) => {

    const revenue = parseInt(
      (data.monthlyRevenue || "0").toString().replace(/[^\d]/g, "")
    );

    const monthlyBudget = Math.round(revenue * 0.06);
    const annualBudget = monthlyBudget * 12;

    // 🔹 Budget Distribution
    const allocations = [
      { name: "Digital Marketing", percent: 29, color: "#3b82f6" },
      { name: "Brand & Creative", percent: 23, color: "#22c55e" },
      { name: "Traditional Media", percent: 22, color: "#f59e0b" },
      { name: "Events & PR", percent: 26, color: "#ef4444" }
    ];

    const pieChartData = allocations.map((item) => ({
      name: item.name,
      value: item.percent,
      amount: Math.round((annualBudget * item.percent) / 100),
      color: item.color
    }));


    // 🔹 Channel Focus Dynamic Calculation
    const channelStructure = [
      { name: "Digital", percent: 9 },
      { name: "Events", percent: 12 },
      { name: "Content Marketing", percent: 11 },
      { name: "Lead Generation", percent: 12 },
      { name: "Content/SEO", percent: 31 },
      { name: "Webinars", percent: 26 }
    ];

    const channelFocuses = channelStructure.map((item) => ({
      name: item.name,
      percentage: item.percent,
      amount: Math.round((monthlyBudget * item.percent) / 100)
    }));


    return {
      monthlyBudget,
      annualBudget,
      pieChartData,
      channelFocuses,
      budgetAllocations: pieChartData
    };

  };


  // 🔹 ADD THIS FUNCTION HERE
  const saveQuestionnaireToDB = async (payload: any) => {

    try {

      const response = await axios.post(
        "https://api.mibbs.ai/api/questionnaire/",
        payload
      );

      console.log("Questionnaire Saved:", response.data);

    } catch (error) {

      console.error("Error saving questionnaire:", error);

    }

  };


  return (
    <div>
      {/* AUTH PAGE */}
      {view === "auth" && (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="w-full max-w-4xl">
            <SignupModal
              isOpen={true}
              onClose={() => setView("questionnaire")}
              onComplete={handleAuthSuccess}
            />
          </div>
        </div>
      )}

      {view === "questionnaire" && (

        <div className="min-h-screen bg-background py-6 sm:py-10 px-4">
          {/* Top bar */}
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-6 sm:mb-8">
            MIBBS Registration
          </h1>

          <div className="max-w-2xl mx-auto bg-card rounded-2xl card-shadow overflow-hidden">
            {/* Progress */}
            <div className="px-5 sm:px-8 pt-5 sm:pt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground font-medium">Step {currentStep + 1} of {steps.length}</span>
                <span className="text-sm font-semibold gradient-text">{steps[currentStep]}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div className="h-full rounded-full gradient-btn" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
              </div>
            </div>

            {/* Content */}
            <div className="px-5 sm:px-8 py-6 sm:py-8">
              <AnimatePresence mode="wait">
                <motion.div key={currentStep} variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>

                  {/* STEP 1: Basic Details */}
                  {currentStep === 0 && (
                    <div>
                      <StepHeader title="Basic Details" subtitle="Let's start with some basic information about you and your business." />
                      <div className="space-y-6 mt-6">
                        <FieldGroup label="What should we call you?" hint="This helps us personalise your experience.">
                          <input type="text" value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter your name" className="form-input" />
                        </FieldGroup>

                        <FieldGroup label="What is the name of your business?" hint="This will be shown on your dashboard and reports.">
                          <input type="text" value={data.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Enter business name" className="form-input" disabled={noBusinessName} />
                          <label className="flex items-center gap-2 mt-2 cursor-pointer">
                            <input type="checkbox" checked={noBusinessName} onChange={(e) => { setNoBusinessName(e.target.checked); if (e.target.checked) update("businessName", ""); }} className="w-4 h-4 rounded gradient-checkbox" />
                            <span className="text-sm text-muted-foreground">I don't have a business name yet</span>
                          </label>
                        </FieldGroup>

                        <FieldGroup label="Do you have a website?" hint="It's completely okay if you don't — many businesses start without one.">
                          <div className="grid grid-cols-2 gap-3">
                            <OptionCard label="Yes, I have a website" icon={<Globe className="w-5 h-5" />} selected={data.hasWebsite === true} onClick={() => update("hasWebsite", true)} compact />
                            <OptionCard label="Not built yet" icon={<Monitor className="w-5 h-5" />} selected={data.hasWebsite === false} onClick={() => update("hasWebsite", false)} compact />
                          </div>
                          <AnimatePresence>
                            {data.hasWebsite && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4">
                                <p className="text-sm font-bold text-foreground mb-2">Website URL</p>
                                <input type="url" value={data.websiteUrl} onChange={(e) => update("websiteUrl", e.target.value)} placeholder="https://yourwebsite.com" className="form-input" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </FieldGroup>

                        <FieldGroup label="What stage is your business in right now?" hint="Based on this, we'll ask the right questions for you.">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <OptionCard label="Haven't started yet" description="I'm planning to start my business" icon={<Rocket className="w-5 h-5" />} selected={data.businessStage === "not_started"} onClick={() => update("businessStage", "not_started")} compact />
                            <OptionCard label="Early Stage" description="Just getting started" icon={<TrendingUp className="w-5 h-5" />} selected={data.businessStage === "early"} onClick={() => update("businessStage", "early")} compact />
                            <OptionCard label="Growing" description="Business is running & growing" icon={<BarChart3 className="w-5 h-5" />} selected={data.businessStage === "growing"} onClick={() => update("businessStage", "growing")} compact />
                            <OptionCard label="Advanced" description="Well established business" icon={<Target className="w-5 h-5" />} selected={data.businessStage === "advanced"} onClick={() => update("businessStage", "advanced")} compact />
                          </div>
                        </FieldGroup>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Business Location */}
                  {currentStep === 1 && (
                    <div>
                      <StepHeader title="Business Location" subtitle="Where will your business be located? Location affects customer behaviour and costs." />
                      <div className="mt-6">
                        <FieldGroup label="Enter your Pincode" hint="Enter any 6-digit Indian pincode to auto-detect your area.">
                          <PincodeLookup pincode={data.pincode} onPincodeChange={(v) => update("pincode", v)} onLocationFound={handleLocationFound} />
                        </FieldGroup>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Business Category */}
                  {currentStep === 2 && (
                    <div>
                      <StepHeader title="Business Category" subtitle="Which industry does your business belong to? Choose the closest option." />
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                        {industries.map((ind) => (
                          <SimpleOption key={ind} label={ind} selected={data.industry === ind} onClick={() => update("industry", ind)} />
                        ))}
                      </div>

                      <div className="mt-8">
                        <p className="text-base font-semibold gradient-text mb-3">What will you mainly offer to customers?</p>
                        <div className="grid grid-cols-2 gap-3">
                          <OptionCard label="Products" description="Things people buy" icon={<Package className="w-5 h-5" />} selected={data.businessType === "product"} onClick={() => update("businessType", "product")} compact />
                          <OptionCard label="Services" description="Work you do for people" icon={<Wrench className="w-5 h-5" />} selected={data.businessType === "service"} onClick={() => update("businessType", "service")} compact />
                        </div>
                      </div>

                      <AnimatePresence>
                        {data.businessType === "product" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6">
                            <p className="text-base font-semibold text-foreground mb-3">What type of product business?</p>
                            <div className="grid grid-cols-3 gap-3">
                              <SimpleOption label="B2B" selected={data.productBusinessType === "B2B"} onClick={() => update("productBusinessType", "B2B")} />
                              <SimpleOption label="B2C" selected={data.productBusinessType === "B2C"} onClick={() => update("productBusinessType", "B2C")} />
                              <SimpleOption label="D2C" selected={data.productBusinessType === "D2C"} onClick={() => update("productBusinessType", "D2C")} />
                            </div>

                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* NEW BUSINESS: STEP 4 - Capital / Starting Budget */}
                  {isNewBusiness && currentStep === 3 && (
                    <div>
                      <StepHeader title="Capital / Starting Budget" subtitle="How much money are you planning to invest? This helps us suggest realistic marketing plans." />
                      <div className="space-y-3 mt-6">
                        {[
                          { label: "Less than ₹1,00,000", value: "Below ₹1 Lakh" },
                          { label: "₹1,00,000 - ₹5,00,000", value: "₹1 - ₹5 Lakhs" },
                          { label: "More than ₹5,00,000", value: "Above ₹5 Lakhs" },
                        ].map((r) => (
                          <OptionCard key={r.value} label={r.label} icon={<DollarSign className="w-5 h-5" />} selected={data.startingBudget === r.value} onClick={() => update("startingBudget", r.value)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* NEW BUSINESS: STEP 5 - Business Mode */}

                  {isNewBusiness && currentStep === 4 && (
                    <div>
                      <StepHeader
                        title="Business Mode"
                        subtitle="How do you want to start your business?"
                      />

                      <div className=" grid-cols-1 sm:grid-cols-3 gap-3 mt-6 flex flex-col">

                        <OptionCard
                          label="Offline"
                          description="Shop, office, physical location"
                          icon={<Store className="w-5 h-5" />}
                          selected={data.businessMode.includes("Offline")}
                          onClick={() => update("businessMode", "Offline")}
                        />

                        <OptionCard
                          label="Online"
                          description="Website, Instagram, WhatsApp, apps"
                          icon={<Globe2 className="w-5 h-5" />}
                          selected={data.businessMode.includes("Online")}
                          onClick={() => update("businessMode", "Online")}
                        />

                        <OptionCard
                          label="Both"
                          description="Online + Offline"
                          icon={<Globe2 className="w-5 h-5" />}
                          selected={
                            data.businessMode.includes("Online") &&
                            data.businessMode.includes("Offline")
                          }
                          onClick={() => toggleBusinessMode("Both")}
                        />

                      </div>
                    </div>
                  )}
                  {/* {isNewBusiness && currentStep === 4 && (
                  <div>
                    <StepHeader title="Business Mode" subtitle="How do you want to start your business?" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      <OptionCard label="Offline" description="Shop, office, physical location" icon={<Store className="w-5 h-5" />} selected={data.businessMode === "Offline"} onClick={() => update("businessMode", "Offline")} />
                      <OptionCard label="Online" description="Website, Instagram, WhatsApp, apps" icon={<Globe2 className="w-5 h-5" />} selected={data.businessMode === "Online"} onClick={() => update("businessMode", "Online")} />
                    </div>
                  </div>
                )} */}

                  {/* NEW BUSINESS: STEP 6 - What Help Do You Need? */}
                  {isNewBusiness && currentStep === 5 && (
                    <div>
                      <StepHeader title="What Help Do You Need?" subtitle="What do you need most help with right now? Select all that apply." />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                        <OptionCard label="Paperwork / Legal" description="Licenses, registrations" icon={<FileText className="w-5 h-5" />} selected={data.helpNeeded.includes("Paperwork / Legal")} onClick={() => toggleArrayItem("helpNeeded", "Paperwork / Legal")} />
                        <OptionCard label="Money Planning" description="How much to spend where" icon={<DollarSign className="w-5 h-5" />} selected={data.helpNeeded.includes("Money Planning")} onClick={() => toggleArrayItem("helpNeeded", "Money Planning")} />
                        <OptionCard label="Finding Customers" description="First few clients" icon={<Users className="w-5 h-5" />} selected={data.helpNeeded.includes("Finding Customers")} onClick={() => toggleArrayItem("helpNeeded", "Finding Customers")} />
                        <OptionCard label="Skills / Knowledge" description="How to do the work" icon={<BookOpen className="w-5 h-5" />} selected={data.helpNeeded.includes("Skills / Knowledge")} onClick={() => toggleArrayItem("helpNeeded", "Skills / Knowledge")} />
                        <OptionCard label="Online Setup" description="Website, social media" icon={<MonitorSmartphone className="w-5 h-5" />} selected={data.helpNeeded.includes("Online Setup")} onClick={() => toggleArrayItem("helpNeeded", "Online Setup")} />
                        <OptionCard label="Everything" description="Complete guidance" icon={<Sparkles className="w-5 h-5" />} selected={data.helpNeeded.includes("Everything")} onClick={() => toggleArrayItem("helpNeeded", "Everything")} />
                      </div>
                    </div>
                  )}

                  {/* EXISTING BUSINESS PATH */}
                  {isExistingBusiness && currentStep === 3 && (
                    <div>
                      <StepHeader title="Business Experience" subtitle="How long have you been running this business? This helps us understand your experience level." />
                      <div className="space-y-3 mt-6">
                        {yearsOptions.map((y) => (
                          <OptionCard key={y} label={y} icon={<Calendar className="w-5 h-5" />} selected={data.yearsInBusiness === y} onClick={() => update("yearsInBusiness", y)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {isExistingBusiness && currentStep === 4 && (
                    <div>
                      <StepHeader title="Business Challenges" subtitle="Tell us what's bothering your business right now. Select all that feel true." />
                      <div className="space-y-3 mt-6">
                        {challengesList.map((c) => (
                          <OptionCard key={c.label} label={c.label} description={c.desc} icon={c.icon} selected={data.businessChallenges.includes(c.label)} onClick={() => toggleArrayItem("businessChallenges", c.label)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {isExistingBusiness && currentStep === 5 && (
                    <div>
                      <StepHeader title="Digital Presence" subtitle="How active is your business online? Select your level and choose the channels you use." />
                      <div className="space-y-3 mt-6">
                        {scalingLevels.map((l) => (
                          <OptionCard key={l.label} label={l.label} description={l.desc} icon={l.icon} selected={data.digitalScalingLevel === l.label} onClick={() => update("digitalScalingLevel", l.label)} />
                        ))}
                      </div>

                      <AnimatePresence>
                        {data.digitalScalingLevel === "Basic" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6">
                            <div className="bg-secondary/30 rounded-xl p-4 border border-border">
                              <p className="text-sm font-semibold gradient-text mb-2">Which platforms do you use?</p>
                              <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
                              <div className="grid grid-cols-3 gap-3">
                                {["Facebook", "Instagram", "WhatsApp"].map((p) => (
                                  <SimpleOption key={p} label={p} selected={(data.digitalPlatforms || []).includes(p)} onClick={() => toggleArrayItem("digitalPlatforms", p)} />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                        {data.digitalScalingLevel === "Growing" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6">
                            <div className="bg-secondary/30 rounded-xl p-4 border border-border">
                              <p className="text-sm font-semibold gradient-text mb-2">What marketing activities are you doing?</p>
                              <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
                              <div className="grid grid-cols-2 gap-3">
                                {["Ad Campaigns", "Content Creation", "Brand Marketing", "Influencer Marketing"].map((a) => (
                                  <SimpleOption key={a} label={a} selected={(data.digitalActivities || []).includes(a)} onClick={() => toggleArrayItem("digitalActivities", a)} />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                        {data.digitalScalingLevel === "Advanced" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6">
                            <div className="bg-secondary/30 rounded-xl p-4 border border-border">
                              <p className="text-sm font-semibold gradient-text mb-2">What advanced activities are you doing?</p>
                              <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
                              <div className="grid grid-cols-2 gap-3">
                                {["Ad Campaigns", "Content Creation", "Brand Marketing", "Influencer Marketing", "E-commerce Websites"].map((a) => (
                                  <SimpleOption key={a} label={a} selected={(data.digitalActivities || []).includes(a)} onClick={() => toggleArrayItem("digitalActivities", a)} />
                                ))}
                              </div>
                              <div className="mt-4">
                                <p className="text-sm font-bold text-foreground">ROI (Return on Investment)</p>
                                <p className="text-xs text-muted-foreground mb-2">What is your approximate ROI percentage?</p>
                                <input type="text" value={data.roiPercentage || ""} onChange={(e) => update("roiPercentage", e.target.value)} placeholder="Enter numeric value" className="form-input" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {isExistingBusiness && currentStep === 6 && (
                    <div>
                      <StepHeader title="Revenue & Marketing Spend" subtitle="Based on the last 2-3 months, an approximate number is perfectly fine." />
                      <div className="space-y-6 mt-6">
                        <FieldGroup label="What is your average monthly revenue?" hint="On average, how much does your business earn in a month?">
                          <input type="text" value={data.monthlyRevenue || ""} onChange={(e) => update("monthlyRevenue", e.target.value)} placeholder="e.g. ₹50,000" className="form-input" />
                        </FieldGroup>
                        <FieldGroup label="Monthly marketing spend?" hint="How much do you spend on promoting your brand each month?">
                          <div className="space-y-3">
                            {marketingSpendOptions.map((opt) => (
                              <OptionCard key={opt} label={opt} selected={data.marketingBudgetRange === opt} onClick={() => update("marketingBudgetRange", opt)} />
                            ))}
                          </div>
                        </FieldGroup>
                      </div>
                    </div>
                  )}

                  {isExistingBusiness && currentStep === 7 && (
                    <div>
                      <StepHeader title="Brand Objectives" subtitle="What do you want your business to achieve next? Choose up to 4 that matter most." />
                      <div className="space-y-3 mt-6">
                        {brandObjectivesList.map((o) => (
                          <OptionCard key={o.label} label={o.label} description={o.desc} icon={o.icon}
                            selected={data.brandObjectives.includes(o.label)}
                            onClick={() => {
                              if (data.brandObjectives.includes(o.label)) {
                                toggleArrayItem("brandObjectives", o.label);
                              } else if (data.brandObjectives.length < 4) {
                                toggleArrayItem("brandObjectives", o.label);
                              }
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-center text-sm text-muted-foreground mt-4">{data.brandObjectives.length}/4 selected</p>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="px-5 sm:px-8 pb-5 sm:pb-6 flex items-center justify-between border-t border-border pt-4">
              <button onClick={prev} disabled={currentStep === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-border font-medium text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground hover:bg-secondary">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <motion.button whileHover={canProceed() ? { scale: 1.02 } : {}} whileTap={canProceed() ? { scale: 0.98 } : {}}
                onClick={next} disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed gradient-btn text-primary-foreground gradient-shadow">
                {currentStep === steps.length - 1 ? "Complete" : "Continue"} <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      )}; {/* End of questionnaire view */}
    </div>
  );
}

/* ─── Sub-components ─── */

const StepHeader = ({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) => (
  <div className="text-center">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">{title}</h2>
    {badge && (
      <span className="inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full gradient-btn text-primary-foreground">{badge}</span>
    )}
    <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">{subtitle}</p>
  </div>
);

const FieldGroup = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div>
    <p className="text-sm sm:text-base font-bold text-foreground">{label}</p>
    {hint && <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 mb-2">{hint}</p>}
    {!hint && <div className="mb-2" />}
    {children}
  </div>
);

const SimpleOption = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all w-full ${selected ? "border-[hsl(280,70%,55%)] bg-[hsl(280,60%,96%)] text-[hsl(280,70%,45%)]" : "border-border bg-card text-foreground hover:border-primary/30"
      }`}
  >
    <span>{label}</span>
    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${selected ? "bg-[hsl(280,70%,55%)]" : "border-2 border-muted"
      }`}>
      {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
    </div>
  </motion.button>
);

export default MIBBSQuestionnaire;





