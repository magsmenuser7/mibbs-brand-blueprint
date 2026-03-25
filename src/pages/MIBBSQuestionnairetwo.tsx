import { useState, useCallback, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Building2, Globe, TrendingUp, MapPin, Factory, Package, Wrench,
  DollarSign, Briefcase, Calendar, AlertTriangle, BarChart3, Target,
  ChevronLeft, ChevronRight, CheckCircle2, Check, Rocket, Monitor,
  FileText, Users, BookOpen, MonitorSmartphone, Sparkles, Store, Globe2,
  UserX, ShoppingCart, HelpCircle, Megaphone, PuzzleIcon, Shield, CircleDollarSign,
  RefreshCw, Search, Compass, Smartphone, BarChart2,
  Eye, EyeOff, X, Mail, Phone,Lock, KeyRound, ArrowLeft,
} from "lucide-react";

import OptionCard from "@/componentsfour/questionnaire/OptionCard";
import PincodeLookup from "@/componentsfour/questionnaire/PincodeLookup";
import NewBusinessOutput from "@/componentsfour/output/NewBusinessOutput";
import ExistingBusinessOutput from "@/componentsfour/output/ExistingBusinessOutput";
import Dashboard from "@/componentsfour/dashboard/Dashboard";
import { QuestionnaireData, initialData } from "@/types/questionnaire";
import { PincodeInfo } from "@/data/pincodeData";

//signupModal Related page imports start here
import React from 'react';
import { useNavigate } from "react-router-dom";
import mibbs2 from '../../src/assets/mibbs-2.png';
import SignupModal from "@/componentstwo/flow/SignupModal";

interface OutputProps {
  data: QuestionnaireData;
  onSave: () => void;
  onGoToDashboard: () => void; // Must match exactly
  onBack: () => void;
}

interface SavedPlan {
  id: string;
  data: QuestionnaireData;
  type: "new" | "existing";
  savedAt: string;
}

// --- Interfaces ---
interface SignupModalProps {
  isOpen: boolean;
  onComplete: (userData: any) => void;
  onClose: () => void;
  assessmentData?: any;
}

type ViewState = 'LOGIN' | 'SIGNUP' | 'FORGOT';

interface MIBBSQuestionnaireProps {
  onClose?: () => void;
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

type AppView = "questionnaire" | "output" | "dashboard";

const MIBBSQuestionnairetwo: React.FC<MIBBSQuestionnaireProps> = ({ onClose = () => { } }) => {
  const BASE_URL = "http://127.0.0.1:8000/api";

  // SignupModal logic states
  const [fpStep, setFpStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loginOtpStep, setLoginOtpStep] = useState<1 | 2>(1);
  const [loginOtpMobile, setLoginOtpMobile] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    rememberMe: false,
  });

  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [data, setData] = useState<QuestionnaireData>({ ...initialData });
  const [currentStep, setCurrentStep] = useState(0);
  const [noBusinessName, setNoBusinessName] = useState(false);
  const [view, setView] = useState<AppView>("questionnaire");
  const [authView, setAuthView] = useState<ViewState>('LOGIN');

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
      setCurrentStep((s) => s + 1);
    } else {
      setView("output");
    }
  };

  const prev = () => { 
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1); 
    } else {
      // ✅ FIX: Clear the success message so it doesn't show when going back
      setSuccessMessage('');

      // ✅ FIX: If at the first step, log out and show Auth Modal
      setIsAuthenticated(false);
      setShowAuthModal(true);
      setAuthView('LOGIN'); // Or 'SIGNUP' depending on your preference
    }
  };

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
    const alreadySaved = savedPlans.some(p => JSON.stringify(p.data) === JSON.stringify(data));
    if (!alreadySaved) {
      handleSave();
    }
    setView("dashboard");
  };

  const handleDeletePlan = (id: string) => {
    const updated = savedPlans.filter((p) => p.id !== id);
    setSavedPlans(updated);
    localStorage.setItem("mibbs_plans", JSON.stringify(updated));
    toast({ title: "Plan Deleted", description: "The plan has been removed." });
  };

  const handleNewRegistration = () => {
    setData({ ...initialData });
    setCurrentStep(0);
    setNoBusinessName(false);
    setView("questionnaire");
    setViewingPlan(null);
  };

  const handleViewPlan = (plan: SavedPlan) => {
    setData({ ...initialData, ...plan.data });
    setViewingPlan(plan);
    setView("output");
  };

  // --- Validation Logic ---
  const validateSignupForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, ''))) newErrors.mobile = 'Invalid Indian mobile number';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSignupSuccess = async (userData: any) => {
    const token = localStorage.getItem('access_token');
    const savedData = localStorage.getItem("pending_assessment");

    if (savedData && userData?.email) {
      const payload = JSON.parse(savedData);
      payload.username = userData.firstName || userData.username;
      payload.email = userData.email;
      payload.phone = userData.phone || "";

      try {
        await fetch(`${BASE_URL}/assessment/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        localStorage.removeItem("pending_assessment");
      } catch (err) {
        console.error("Network error saving assessment:", err);
      }
    }
  };

  const resetFormData = () => {
    setFormData({
      username: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      rememberMe: false,
    });
  };

  const loginUser = async () => {
    const response = await fetch(`${BASE_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, password: formData.password }),
    });
    const result = await response.json();
    if (!response.ok || !result.user) throw new Error(result.message || "Invalid credentials.");

    if (formData.rememberMe) {
      localStorage.setItem("rememberedEmail", formData.email);
    }
    localStorage.setItem("user", JSON.stringify(result.user));
    if (result.token) localStorage.setItem("access_token", result.token);
    await handleSignupSuccess(result.user);
    return result.user;
  };

  const registerUser = async () => {
    const response = await fetch(`${BASE_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        phone: formData.mobile,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      }),
    });
    const result = await response.json();
    if (!response.ok || !result.user) throw new Error(result.message || "Registration failed.");
    await handleSignupSuccess(result.user);
    return result.user;
  };

  const handleLoginOrSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const isLogin = authView === "LOGIN";

    if (isLogin && !validateLoginForm()) return;
    if (!isLogin && !validateSignupForm()) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        await loginUser();
        setSuccessMessage("Login successful!");
        setTimeout(() => {
          setIsAuthenticated(true);
          setShowAuthModal(false);
          setCurrentStep(0);
          setView("questionnaire");
        }, 1000);
      } else {
        await registerUser();
        setSuccessMessage("Account created successfully!");
        resetFormData();
        setTimeout(() => {
          setSuccessMessage("");
          setAuthView("LOGIN");
        }, 1500);
      }
    } catch (error: any) {
      setErrors({ general: error.message || "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  const sendLoginOtp = async () => {
    const res = await fetch(`${BASE_URL}/login-otp/send/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: loginOtpMobile }),
    });
    if (!res.ok) throw new Error("Failed to send OTP");
  };

  const verifyLoginOtp = async () => {
    const res = await fetch(`${BASE_URL}/login-otp/verify/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: loginOtpMobile, otp: loginOtp }),
    });
    const result = await res.json();
    if (!res.ok || !result.user) throw new Error("Invalid OTP");
    localStorage.setItem("user", JSON.stringify(result.user));
    if (result.token) localStorage.setItem("access_token", result.token);
    return result.user;
  };

  const handleLoginWithOtp = async () => {
    setErrors({});
    setIsLoading(true);
    try {
      if (loginOtpStep === 1) {
        if (!/^[6-9]\d{9}$/.test(loginOtpMobile)) {
          setErrors({ general: "Enter valid registered mobile number" });
          return;
        }
        await sendLoginOtp();
        setSuccessMessage("OTP sent!");
        setLoginOtpStep(2);
      } else {
        await verifyLoginOtp();
        setSuccessMessage("Login successful!");
        setTimeout(() => {
          setIsAuthenticated(true);
          setShowAuthModal(false);
          setView("questionnaire");
        }, 1200);
      }
    } catch (error: any) {
      setErrors({ general: error.message || "OTP login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      if (res.ok) { setSuccessMessage("OTP Sent!"); setFpStep(2); }
    } finally { setIsLoading(false); }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, otp }),
      });
      const result = await res.json();
      if (res.ok) { setResetToken(result.token || otp); setFpStep(3); }
    } finally { setIsLoading(false); }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, email: forgotEmail, new_password: newPassword, confirm_password: confirmNewPassword }),
      });
      if (res.ok) { setSuccessMessage("Password reset!"); setAuthView('LOGIN'); }
    } finally { setIsLoading(false); }
  };

  useEffect(() => {
    document.body.style.overflow = showAuthModal ? "hidden" : "auto";
  }, [showAuthModal]);

  // --- Rendering Conditional Outputs ---
  if (view === "dashboard") {
    return (
      <Dashboard
        plans={savedPlans}
        onViewPlan={handleViewPlan}
        onDeletePlan={handleDeletePlan}
        onNewRegistration={handleNewRegistration}
      />
    );
  }

  if (view === "output") {
    const businessType = viewingPlan ? viewingPlan.type : (isNewBusiness ? "new" : "existing");
    if (businessType === "new") {
      return <NewBusinessOutput data={data} onSave={handleSave} onGoToDashboard={handleGoToDashboard} onBack={() => { setView("questionnaire"); setViewingPlan(null); }} />;
    }
    return <ExistingBusinessOutput data={data} onSave={handleSave} onGoToDashboard={handleGoToDashboard} onBack={() => { setView("questionnaire"); setViewingPlan(null); }} />;
  }

  return (
    <div className="min-h-screen bg-background py-6 sm:py-10 px-4">
      {/* ================= AUTH MODAL ================= */}
{showAuthModal && !isAuthenticated && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-hidden">
    <div className="shadow-2xl w-full max-w-5xl bg-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Image (Kept your exact design) */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gray-200">
          <img src={mibbs2} alt="MIBBS Visual" className="max-w-full h-auto object-contain" />
        </div>

        {/* Right Side - Forms */}
        <div className="p-8 bg-white h-full relative overflow-y-auto max-h-[90vh]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-mibbs-gradient rounded-lg flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
                <h2 className="text-white font-bold">M</h2>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">MIBBS</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6"/>
            </button>
          </div>

          {/* Title / Subtitle Logic */}
          <h3 className="text-xl font-semibold mb-1">
            {/* {authView === 'FORGOT' ? 'Reset Password' : (authView === 'LOGIN' ? 'Welcome Back' : 'Create Account')} */}
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            {authView === 'LOGIN' ? 'Login to your MIBBS account' : 
             authView === 'SIGNUP' ? 'Sign up to your MIBBS account' : 
             (fpStep === 1 ? 'Enter your email to receive a code' : 
              fpStep === 2 ? 'Enter the code sent to your email' : 'Create a new strong password')}
          </p>

          {/* Global Messages */}
          {successMessage && (
            <div className="p-3 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
              {successMessage}
            </div>
          )}
          {errors.general && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              {errors.general}
            </div>
          )}

          {/* --- FORGOT PASSWORD FLOW (Integrated New Logic) --- */}
          {authView === 'FORGOT' && (
            <div className="space-y-4">
              {fpStep === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.forgotEmail ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all">
                    {isLoading ? 'Sending...' : 'Send Verification Code'}
                  </button>
                </form>
              )}

              {fpStep === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Verification Code</label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm tracking-widest"
                        placeholder="Enter OTP"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all">
                    {isLoading ? 'Verifying...' : 'Verify & Proceed'}
                  </button>
                </form>
              )}

              {fpStep === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="relative">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="New Password"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all">
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>
              )}
              <button onClick={() => setAuthView('LOGIN')} className="text-sm text-blue-600 text-center w-full mt-2 hover:underline">Back to Login</button>
            </div>
          )}

          {/* --- LOGIN / SIGNUP FLOW (Integrated New Logic) --- */}
          {authView !== 'FORGOT' && (
            <form onSubmit={handleLoginOrSignup} className="space-y-4">
              {authView === 'SIGNUP' && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="username"
                    type="text"
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Username"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Email address"
                  required
                />
              </div>

              {authView === 'SIGNUP' && (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="mobile"
                    type="tel"
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Mobile number"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Password"
                  required
                />
              </div>

              {authView === 'SIGNUP' && (
                <input
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Confirm password"
                  required
                />
              )}

              {authView === 'LOGIN' && (
                <div className="flex justify-between text-xs">
                  <label className="flex items-center"><input type="checkbox" name="rememberMe" onChange={handleChange} className="mr-2 rounded border-gray-300" /> Remember Me</label>
                  <button type="button" onClick={() => setAuthView('FORGOT')} className="text-blue-600 font-semibold">Forgot Password?</button>
                </div>
              )}

              <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-all">
                {isLoading ? 'Processing...' : (authView === 'LOGIN' ? 'Sign In' : 'Create Account')}
              </button>

              {/* Login with OTP (New Logic in Existing Design) */}
              {authView === 'LOGIN' && (
                <div className="mt-6 border-t pt-4">
                  <p className="text-center text-xs text-gray-500 mb-3">Or login using OTP</p>
                  <div className="space-y-3">
                    <input
                      type="tel"
                      value={loginOtpMobile}
                      onChange={(e) => setLoginOtpMobile(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Mobile for OTP"
                    />
                    {loginOtpStep === 2 && (
                      <input
                        type="text"
                        value={loginOtp}
                        onChange={(e) => setLoginOtp(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-center tracking-widest text-sm"
                        placeholder="Enter OTP"
                      />
                    )}
                    <button
                      type="button"
                      onClick={handleLoginWithOtp}
                      className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors"
                    >
                      {loginOtpStep === 1 ? 'Send OTP' : 'Verify & Login'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* Toggle Footer */}
          <div className="mt-4 text-center text-sm text-gray-600">
            {authView === 'LOGIN' ? (
              <>Don't have an account? <button onClick={() => setAuthView('SIGNUP')} className="text-blue-600 font-bold hover:underline">Sign Up</button></>
            ) : (
              <>Already have an account? <button onClick={() => setAuthView('LOGIN')} className="text-blue-600 font-bold hover:underline">Sign In</button></>
            )}
          </div>

        </div>
      </div>
    </div>
  </div>
)}

      {isAuthenticated && (
        <>
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
                      <StepHeader title="Business Mode" subtitle="How do you want to start your business?" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                        <OptionCard label="Offline" description="Shop, office, physical location" icon={<Store className="w-5 h-5" />} selected={data.businessMode === "Offline"} onClick={() => update("businessMode", "Offline")} />
                        <OptionCard label="Online" description="Website, Instagram, WhatsApp, apps" icon={<Globe2 className="w-5 h-5" />} selected={data.businessMode === "Online"} onClick={() => update("businessMode", "Online")} />
                      </div>
                    </div>
                  )}

                  {/* NEW BUSINESS: STEP 6 - What Help Do You Need? */}
                  {isNewBusiness && currentStep === 5 && (
                    <div>
                      <StepHeader title="What Help Do You Need?" subtitle="What do you need most help with right now? Select all that apply." />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                        <OptionCard label="Paperwork / Legal" description="Licenses, registrations" icon={<FileText className="w-5 h-5" />} selected={(data.helpNeeded || []).includes("Paperwork / Legal")} onClick={() => toggleArrayItem("helpNeeded", "Paperwork / Legal")} />
                        <OptionCard label="Money Planning" description="How much to spend where" icon={<DollarSign className="w-5 h-5" />} selected={(data.helpNeeded || []).includes("Money Planning")} onClick={() => toggleArrayItem("helpNeeded", "Money Planning")} />
                        <OptionCard label="Finding Customers" description="First few clients" icon={<Users className="w-5 h-5" />} selected={(data.helpNeeded || []).includes("Finding Customers")} onClick={() => toggleArrayItem("helpNeeded", "Finding Customers")} />
                        <OptionCard label="Skills / Knowledge" description="How to do the work" icon={<BookOpen className="w-5 h-5" />} selected={(data.helpNeeded || []).includes("Skills / Knowledge")} onClick={() => toggleArrayItem("helpNeeded", "Skills / Knowledge")} />
                        <OptionCard label="Online Setup" description="Website, social media" icon={<MonitorSmartphone className="w-5 h-5" />} selected={(data.helpNeeded || []).includes("Online Setup")} onClick={() => toggleArrayItem("helpNeeded", "Online Setup")} />
                        <OptionCard label="Everything" description="Complete guidance" icon={<Sparkles className="w-5 h-5" />} selected={(data.helpNeeded || []).includes("Everything")} onClick={() => toggleArrayItem("helpNeeded", "Everything")} />
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

                  {/* EXISTING BUSINESS: STEP 5 - Challenges */}
                  {isExistingBusiness && currentStep === 4 && (
                    <div>
                      <StepHeader title="Business Challenges" subtitle="Tell us what's bothering your business right now. Select all that feel true." />
                      <div className="space-y-3 mt-6">
                        {challengesList.map((c) => (
                          <OptionCard key={c.label} label={c.label} description={c.desc} icon={c.icon} selected={(data.businessChallenges || []).includes(c.label)} onClick={() => toggleArrayItem("businessChallenges", c.label)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EXISTING BUSINESS: STEP 6 - Digital Scaling */}
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
                              <div className="grid grid-cols-3 gap-3">
                                {["Facebook", "Instagram", "WhatsApp"].map((p) => (
                                  <SimpleOption key={p} label={p} selected={(data.digitalPlatforms || []).includes(p)} onClick={() => toggleArrayItem("digitalPlatforms", p)} />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* EXISTING BUSINESS: STEP 7 - Revenue */}
                  {isExistingBusiness && currentStep === 6 && (
                    <div>
                      <StepHeader title="Revenue & Marketing Spend" subtitle="Based on the last 2-3 months, an approximate number is perfectly fine." />
                      <div className="space-y-6 mt-6">
                        <FieldGroup label="What is your average monthly revenue?">
                          <input type="text" value={data.monthlyRevenue || ""} onChange={(e) => update("monthlyRevenue", e.target.value)} placeholder="e.g. ₹50,000" className="form-input" />
                        </FieldGroup>
                        <FieldGroup label="Monthly marketing spend?">
                          <div className="space-y-3">
                            {marketingSpendOptions.map((opt) => (
                              <OptionCard key={opt} label={opt} selected={data.marketingBudgetRange === opt} onClick={() => update("marketingBudgetRange", opt)} />
                            ))}
                          </div>
                        </FieldGroup>
                      </div>
                    </div>
                  )}

                  {/* EXISTING BUSINESS: STEP 8 - Objectives */}
                  {isExistingBusiness && currentStep === 7 && (
                    <div>
                      <StepHeader title="Brand Objectives" subtitle="What do you want your business to achieve next? Choose up to 4 that matter most." />
                      <div className="space-y-3 mt-6">
                        {brandObjectivesList.map((o) => (
                          <OptionCard
                            key={o.label}
                            label={o.label}
                            description={o.desc}
                            icon={o.icon}
                            selected={(data.brandObjectives || []).includes(o.label)}
                            onClick={() => {
                              const current = (data.brandObjectives || []);
                              if (current.includes(o.label)) {
                                toggleArrayItem("brandObjectives", o.label);
                              } else if (current.length < 4) {
                                toggleArrayItem("brandObjectives", o.label);
                              }
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-center text-sm text-muted-foreground mt-4">{(data.brandObjectives || []).length}/4 selected</p>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="px-5 sm:px-8 pb-5 sm:pb-6 flex items-center justify-between border-t border-border pt-4">
          <button 
            onClick={prev} 
            // ✅ FIX: Removed 'disabled={currentStep === 0}' so it is clickable on Step 1
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-border font-medium text-sm transition-all text-muted-foreground hover:text-foreground hover:bg-secondary">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          <motion.button 
            whileHover={canProceed() ? { scale: 1.02 } : {}} 
            whileTap={canProceed() ? { scale: 0.98 } : {}}
            onClick={next} 
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed gradient-btn text-primary-foreground gradient-shadow">
            {currentStep === steps.length - 1 ? "Complete" : "Continue"} <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
          </div>
        </>
      )}
    </div>
  );
};

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

export default MIBBSQuestionnairetwo;










// import { useState, useCallback } from "react";
// import { toast } from "@/hooks/use-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   User, Building2, Globe, TrendingUp, MapPin, Factory, Package, Wrench,
//   DollarSign, Briefcase, Calendar, AlertTriangle, BarChart3, Target,
//   ChevronLeft, ChevronRight, CheckCircle2, Check, Rocket, Monitor,
//   FileText, Users, BookOpen, MonitorSmartphone, Sparkles, Store, Globe2,
//   UserX, ShoppingCart, HelpCircle, Megaphone, PuzzleIcon, Shield, CircleDollarSign,
//   RefreshCw, Search, Compass, Smartphone, BarChart2,
//   Eye,
//   ArrowLeft,
// } from "lucide-react";
// import OptionCard from "@/componentsfour/questionnaire/OptionCard";
// import PincodeLookup from "@/componentsfour/questionnaire/PincodeLookup";
// import NewBusinessOutput from "@/componentsfour/output/NewBusinessOutput";
// import ExistingBusinessOutput from "@/componentsfour/output/ExistingBusinessOutput";
// import Dashboard from "@/components/dashboard/Dashboard";
// import { QuestionnaireData, initialData } from "@/types/questionnaire";
// import { PincodeInfo } from "@/data/pincodeData";


// //signupModal Related page imports start here
// import React, { useEffect } from 'react';
// import { X, Mail, Phone, EyeOff, KeyRound, } from 'lucide-react'; 
// import { useNavigate } from "react-router-dom";
// import mibbs2 from '../../src/assets/mibbs-2.png';
// import SignupModal from "@/componentstwo/flow/SignupModal";



// interface SavedPlan {
//   id: string;
//   data: QuestionnaireData;
//   type: "new" | "existing";
//   savedAt: string;
// }


// // --- Interfaces ---
// interface SignupModalProps {
//   isOpen: boolean;
//   onComplete: (userData: any) => void;
//   onClose: () => void;
//   assessmentData?: any;
// }

// type ViewState = 'LOGIN' | 'SIGNUP' | 'FORGOT';

// interface MIBBSQuestionnaireProps {
//   onClose?: () => void;
// }


// const industries = [
//   "Food & Beverages", "Retail & E-commerce", "Health & Wellness",
//   "Education & Training", "Beauty & Personal Care", "Real Estate",
//   "Technology & IT", "Fashion & Apparel", "Automotive",
//   "Home Services", "Travel & Tourism", "Finance & Insurance",
//   "Entertainment & Media", "Agriculture", "Manufacturing", "Other"
// ];

// const productCategories = [
//   "Physical Products", "Digital Products", "SaaS / Software", "Consumer Electronics",
//   "FMCG", "Industrial Goods", "Handmade / Artisan", "Health & Nutrition"
// ];

// const challengesList = [
//   { label: "Not enough people are coming to us", desc: "We want more customers, but footfall or enquiries feel low.", icon: <UserX className="w-5 h-5" /> },
//   { label: "People ask, but don't buy", desc: "Customers show interest, but most don't go ahead and purchase.", icon: <ShoppingCart className="w-5 h-5" /> },
//   { label: "We don't know what's actually working", desc: "We try different ways to promote, but can't tell what brings customers.", icon: <HelpCircle className="w-5 h-5" /> },
//   { label: "Promotions feel like wasted money", desc: "We spend money to promote, but the results aren't clear.", icon: <CircleDollarSign className="w-5 h-5" /> },
//   { label: "Marketing feels confusing", desc: "We're unsure how to promote our business in the right way.", icon: <Compass className="w-5 h-5" /> },
//   { label: "Too many businesses like ours", desc: "There are many similar businesses fighting for the same customers.", icon: <AlertTriangle className="w-5 h-5" /> },
//   { label: "We have to be very careful with spending", desc: "Our marketing budget is limited, so mistakes are costly.", icon: <Shield className="w-5 h-5" /> },
//   { label: "Customers don't come back", desc: "People buy once, but rarely return again.", icon: <RefreshCw className="w-5 h-5" /> },
//   { label: "Hardly anyone finds us online", desc: "Few people see or discover our business on the internet.", icon: <Search className="w-5 h-5" /> },
//   { label: "We're not sure what to do next", desc: "We want to grow, but don't have a clear direction.", icon: <Compass className="w-5 h-5" /> },
// ];

// const scalingLevels = [
//   { label: "No digital presence", desc: "Haven't started online yet", icon: <Monitor className="w-5 h-5" /> },
//   { label: "Basic", desc: "Social media platforms", icon: <Smartphone className="w-5 h-5" /> },
//   { label: "Growing", desc: "Active marketing efforts", icon: <TrendingUp className="w-5 h-5" /> },
//   { label: "Advanced", desc: "Full digital marketing stack", icon: <BarChart2 className="w-5 h-5" /> },
// ];

// const marketingSpendOptions = [
//   "Less than ₹10,000", "₹10,000 - ₹1,00,000", "More than ₹1,00,000"
// ];

// const brandObjectivesList = [
//   { label: "More people should know about my business", desc: "Right now, many people don't know we exist — we want to be seen and recognised.", icon: <Megaphone className="w-5 h-5" /> },
//   { label: "I want more calls, messages, or enquiries", desc: "I want more people to reach out and ask about what we offer.", icon: <Smartphone className="w-5 h-5" /> },
//   { label: "I want to increase online sales", desc: "More people should buy from us through the internet.", icon: <ShoppingCart className="w-5 h-5" /> },
//   { label: "I want customers to come back again", desc: "Getting repeat customers is more important than one-time sales.", icon: <RefreshCw className="w-5 h-5" /> },
//   { label: "I want people to trust my brand", desc: "When customers see us, they should feel confident choosing us.", icon: <Shield className="w-5 h-5" /> },
//   { label: "I want to stop wasting money on marketing", desc: "I want my money to be spent wisely, not blindly.", icon: <CircleDollarSign className="w-5 h-5" /> },
//   { label: "I want steady income every month", desc: "I want predictable, stable sales — not ups and downs.", icon: <TrendingUp className="w-5 h-5" /> },
//   { label: "I want to be well-known in my local area", desc: "People nearby should think of us first when they need this product/service.", icon: <MapPin className="w-5 h-5" /> },
//   { label: "I want my business to look strong online", desc: "My website or social media should look active, clear, and professional.", icon: <Globe className="w-5 h-5" /> },
//   { label: "I want to know what is actually working", desc: "I want clarity on what brings results, so I can do more of it.", icon: <BarChart2 className="w-5 h-5" /> },
// ];

// const yearsOptions = [
//   "Less than 1 year", "1 - 3 years", "3 - 5 years", "More than 5 years"
// ];

// const pageVariants = {
//   enter: { opacity: 0, x: 30 },
//   center: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: -30 },
// };

// type AppView = "questionnaire" | "output" | "dashboard";

// const MIBBSQuestionnaire: React.FC<MIBBSQuestionnaireProps> = ({ onClose = () => {} }) => {
//    const BASE_URL = "http://127.0.0.1:8000/api";


// // SignupModal logic
// const [fpStep, setFpStep] = useState<number>(1); 
// const [isLoading, setIsLoading] = useState(false);
// const [successMessage, setSuccessMessage] = useState('');
// const [errors, setErrors] = useState<Record<string, string>>({});

// const [loginOtpStep, setLoginOtpStep] = useState<1 | 2>(1);
// const [loginOtpMobile, setLoginOtpMobile] = useState('');
// const [loginOtp, setLoginOtp] = useState('');
// const [isComplete, setIsComplete] = useState(false);

// const [formData, setFormData] = useState({
//   username: '',
//   email: '',
//   mobile: '',
//   password: '',
//   confirmPassword: '',
//   agreeToTerms: false,
//   rememberMe: false,
// });

// const [forgotEmail, setForgotEmail] = useState('');
// const [otp, setOtp] = useState('');
// const [resetToken, setResetToken] = useState('');
// const [newPassword, setNewPassword] = useState('');
// const [confirmNewPassword, setConfirmNewPassword] = useState('');

// const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// const [showNewPassword, setShowNewPassword] = useState(false);
// const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);


//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(true);
//   const [data, setData] = useState<QuestionnaireData>({ ...initialData });
//   const [currentStep, setCurrentStep] = useState(0);
//   const [noBusinessName, setNoBusinessName] = useState(false);
//   const [view, setView] = useState<AppView>("questionnaire");
//   const [authView, setAuthView] = useState<ViewState>('LOGIN');
//   const [savedPlans, setSavedPlans] = useState<SavedPlan[]>(() => {
//     try {
//       return JSON.parse(localStorage.getItem("mibbs_plans") || "[]");
//     } catch { return []; }
//   });
//   const [viewingPlan, setViewingPlan] = useState<SavedPlan | null>(null);

//   const isNewBusiness = data.businessStage === "not_started";
//   const isExistingBusiness = ["early", "growing", "advanced"].includes(data.businessStage || "");

//   const getSteps = useCallback(() => {
//     const base = ["Details", "Location", "Industry"];
//     if (isNewBusiness) return [...base, "Capital", "Mode", "Help"];
//     if (isExistingBusiness) return [...base, "Experience", "Challenges", "Digital Scale", "Revenue", "Objectives"];
//     return base;
//   }, [isNewBusiness, isExistingBusiness]);

//   const steps = getSteps();
//   const progressPercent = ((currentStep + 1) / steps.length) * 100;

//   const update = (field: keyof QuestionnaireData, value: unknown) => {
//     setData((prev) => ({ ...prev, [field]: value }));
//   };

//   const toggleArrayItem = (field: "businessChallenges" | "brandObjectives" | "helpNeeded" | "digitalPlatforms" | "digitalActivities", item: string) => {
//     setData((prev) => {
//       const arr = (prev[field] as string[]) || [];
//       return { ...prev, [field]: arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item] };
//     });
//   };

//   const canProceed = () => {
//     switch (currentStep) {
//       case 0: return data.name.trim() && (noBusinessName || data.businessName.trim()) && data.businessStage;
//       case 1: return data.pincode.length === 6 && data.locality;
//       case 2: return data.industry && data.businessType;
//       default:
//         if (isNewBusiness) {
//           if (currentStep === 3) return data.startingBudget;
//           if (currentStep === 4) return data.businessMode;
//           if (currentStep === 5) return (data.helpNeeded || []).length > 0;
//         }
//         if (isExistingBusiness) {
//           if (currentStep === 3) return data.yearsInBusiness;
//           if (currentStep === 4) return data.businessChallenges.length > 0;
//           if (currentStep === 5) return data.digitalScalingLevel;
//           if (currentStep === 6) return (data.monthlyRevenue || "").trim() && data.marketingBudgetRange;
//           if (currentStep === 7) return data.brandObjectives.length > 0;
//         }
//         return true;
//     }
//   };

//   const next = () => {
//     if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
//     else setView("output");
//   };

//   const prev = () => { if (currentStep > 0) setCurrentStep((s) => s - 1); };

//   const handleLocationFound = useCallback((info: PincodeInfo) => {
//     setData((prev) => ({ ...prev, locality: info.locality, district: info.district, state: info.state, country: info.country }));
//   }, []);

//   const handleSave = () => {
//     const plan: SavedPlan = {
//       id: Date.now().toString(),
//       data: { ...data },
//       type: isNewBusiness ? "new" : "existing",
//       savedAt: new Date().toISOString(),
//     };
//     const updated = [...savedPlans, plan];
//     setSavedPlans(updated);
//     localStorage.setItem("mibbs_plans", JSON.stringify(updated));
//     toast({ title: "✅ Data Saved Successfully!", description: "Your plan has been saved." });
//   };

//   const handleGoToDashboard = () => {
//     // Save first if not already saved
//     const alreadySaved = savedPlans.some(p => JSON.stringify(p.data) === JSON.stringify(data));
//     if (!alreadySaved) {
//       const plan: SavedPlan = {
//         id: Date.now().toString(),
//         data: { ...data },
//         type: isNewBusiness ? "new" : "existing",
//         savedAt: new Date().toISOString(),
//       };
//       const updated = [...savedPlans, plan];
//       setSavedPlans(updated);
//       localStorage.setItem("mibbs_plans", JSON.stringify(updated));
//     }
//     setView("dashboard");
//   };

//   const handleDeletePlan = (id: string) => {
//     const updated = savedPlans.filter((p) => p.id !== id);
//     setSavedPlans(updated);
//     localStorage.setItem("mibbs_plans", JSON.stringify(updated));
//   };

//   const handleNewRegistration = () => {
//     setData(initialData);
//     setCurrentStep(0);
//     setNoBusinessName(false);
//     setView("questionnaire");
//     setViewingPlan(null);
//   };

//   const handleViewPlan = (plan: SavedPlan) => {
//     setData({ ...initialData, ...plan.data, helpNeeded: plan.data.helpNeeded || [], businessChallenges: plan.data.businessChallenges || [], brandObjectives: plan.data.brandObjectives || [], digitalPlatforms: plan.data.digitalPlatforms || [], digitalActivities: plan.data.digitalActivities || [] });
//     setViewingPlan(plan);
//     setView("output");
//   };

//   // Dashboard view
//   if (view === "dashboard") {
//     return <Dashboard />;
//   }

//   // Output view
//   if (view === "output") {
//     const businessType = viewingPlan ? viewingPlan.type : (isNewBusiness ? "new" : "existing");
//     if (businessType === "new") {
//       return <NewBusinessOutput data={data} onSave={handleSave} onGoToDashboard={handleGoToDashboard} onBack={() => { setView("questionnaire"); setViewingPlan(null); }} />;
//     }
//     return <ExistingBusinessOutput data={data} onSave={handleSave} onGoToDashboard={handleGoToDashboard} onBack={() => { setView("questionnaire"); setViewingPlan(null); }} />;
//   }




// // --- Validation Logic ---
//   const validateSignupForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
//     if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
//     if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, ''))) newErrors.mobile = 'Invalid Indian mobile number';
//     if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//     if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateLoginForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // --- Handlers ---

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const handleSignupSuccess = async (userData: any) => {
//     const token = localStorage.getItem('access_token');
//     const savedData = localStorage.getItem("pending_assessment");
    
//     if (savedData && userData?.email) {
//       const payload = JSON.parse(savedData);
//       payload.username = userData.firstName || userData.username;
//       payload.email = userData.email;
//       payload.phone = userData.phone || "";

//       try {
//         await fetch(`${BASE_URL}/assessment/`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//           body: JSON.stringify(payload),
//         });
//         localStorage.removeItem("pending_assessment");
//       } catch (err) {
//         console.error("Network error saving assessment:", err);
//       }
//     }
//   };


// const resetFormData = () => {
//   setFormData({
//     username: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//     agreeToTerms: false,
//     rememberMe: false,
//   });
// };



// // -------------------- LOGIN FETCH --------------------
// const loginUser = async () => {
//   const response = await fetch(`${BASE_URL}/login/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: formData.email,
//       password: formData.password,
//     }),
//   });

//   const text = await response.text();
//   let data: any = {};

//   try {
//     data = JSON.parse(text);
//   } catch {
//     throw new Error("Invalid server response");
//   }

//   if (!response.ok || !data.user) {
//     throw new Error(data.message || "Invalid credentials.");
//   }

//   // Remember Me
//   if (formData.rememberMe) {
//     localStorage.setItem("rememberedEmail", formData.email);
//     localStorage.setItem("rememberedPassword", formData.password);
//   } else {
//     localStorage.removeItem("rememberedEmail");
//     localStorage.removeItem("rememberedPassword");
//   }

//   localStorage.setItem("user", JSON.stringify(data.user));
//   if (data.token) {
//     localStorage.setItem("access_token", data.token);
//   }

//   await handleSignupSuccess({
//     username: data.user.username,
//     email: data.user.email,
//     phone: data.user.phone || "",
//   });

//   return data.user;
// };



// // -------------------- REGISTER FETCH --------------------
// const registerUser = async () => {
//   const response = await fetch(`${BASE_URL}/register/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       username: formData.username,
//       email: formData.email,
//       phone: formData.mobile,
//       password: formData.password,
//       confirm_password: formData.confirmPassword,
//     }),
//   });

//   const text = await response.text();
//   let data: any = {};

//   try {
//     data = JSON.parse(text);
//   } catch {
//     throw new Error("Invalid server response");
//   }

//   if (!response.ok || !data.user) {
//     throw new Error(data.message || "Registration failed.");
//   }

//   await handleSignupSuccess({
//     username: data.user.username || formData.username,
//     email: data.user.email || formData.email,
//     phone: data.user.phone || formData.mobile,
//   });

//   return data.user;
// };



// const clearLoginFields = () => {
//   setFormData(prev => ({
//     ...prev,
//     email: "",
//     password: "",
//     confirmPassword: "",
//     rememberMe: false,
//   }));
// };


// // // -------------------- MAIN HANDLER --------------------
// // const handleLoginOrSignup = async (e: React.FormEvent) => {
// //   e.preventDefault();
// //   setErrors({});

// //   const isLogin = authView === "LOGIN";

// //   if (isLogin && !validateLoginForm()) return;
// //   if (!isLogin && !validateSignupForm()) return;

// //   setIsLoading(true);

// //   try {
// //   if (isLogin) {
// //     const user = await loginUser();

// //     setSuccessMessage("Login successful!");

// //     clearLoginFields(); // ✅ ONLY THIS (no extra setFormData)

// //     setErrors({});
// //     setTimeout(() => {
// //       setSuccessMessage("");

// //       // ✅ CLOSE MODAL
// //       setShowAuthModal(false);

// //       // ✅ START QUESTIONNAIRE
// //       setCurrentStep(1);

// //     }, 1000);
// //     // setTimeout(() => {
// //     //   setSuccessMessage("");
// //     //   setIsComplete(true);
// //     // }, 1500);
// //   } else {
// //     await registerUser();

// //     setSuccessMessage("Account created successfully!");

// //     // ✅ RESET AFTER SIGNUP
// //     resetFormData();
    
// //     setErrors({});

// //     setTimeout(() => {
// //       setSuccessMessage("");
// //       setAuthView("LOGIN");
// //     }, 1500);
// //   }
// // } catch (error: any) {
// //   setErrors({ general: error.message || "Something went wrong." });
// // } finally {
// //   setIsLoading(false);
// // }
// // };




// const handleLoginOrSignup = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setErrors({});

//   const isLogin = authView === "LOGIN";

//   if (isLogin && !validateLoginForm()) return;
//   if (!isLogin && !validateSignupForm()) return;

//   setIsLoading(true);

//   try {
//     if (isLogin) {
//       const user = await loginUser();

//       setSuccessMessage("Login successful!");
//       clearLoginFields();
//       setErrors({});

//       setTimeout(() => {
//         setSuccessMessage("");

//         // ✅ MOST IMPORTANT FIX
//         setIsAuthenticated(true);

//         // ✅ CLOSE MODAL
//         setShowAuthModal(false);

//         // ✅ START FROM STEP 1 (index 0)
//         setCurrentStep(0);

//       }, 1000);

//     } else {
//       await registerUser();

//       setSuccessMessage("Account created successfully!");
//       resetFormData();
//       setErrors({});

//       setTimeout(() => {
//         setSuccessMessage("");
//         setAuthView("LOGIN");
//       }, 1500);
//     }

//   } catch (error: any) {
//     setErrors({ general: error.message || "Something went wrong." });
//   } finally {
//     setIsLoading(false);
//   }
// };

// // Step 1: Send OTP to Email
//   const handleSendOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!forgotEmail) { setErrors({ forgotEmail: 'Email is required' }); return; }
    
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${BASE_URL}/forgot-password/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: forgotEmail }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("OTP sent to your email.");
//         setTimeout(() => {
//           setSuccessMessage("");
//           setFpStep(2); // Move to Step 2
//         }, 1000);
//       } else {
//         setErrors({ general: data.message || "Failed to send OTP." });
//       }
//     } catch (err) {
//       setErrors({ general: "Error sending OTP." });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!otp) { setErrors({ otp: 'OTP is required' }); return; }

//     setIsLoading(true);
//     try {
//       // NOTE: Ensure your backend has this endpoint to verify OTP and return a temp token
//       const response = await fetch(`${BASE_URL}/verify-otp/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: forgotEmail, otp: otp }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("OTP Verified!");
//         // If backend returns a specific token for reset, save it here. 
//         // Otherwise, we might just pass the OTP again in step 3.
//         if (data.token) setResetToken(data.token); 
//         else setResetToken(otp); // Fallback if backend expects OTP as token

//         setTimeout(() => {
//           setSuccessMessage("");
//           setFpStep(3); // Auto move to Step 3
//         }, 1000);
//       } else {
//         setErrors({ general: data.message || "Invalid OTP." });
//       }
//     } catch (err) {
//       setErrors({ general: "Error verifying OTP." });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Step 3: Reset Password
//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newPassword.length < 6) { setErrors({ newPassword: 'Password too short' }); return; }
//     if (newPassword !== confirmNewPassword) { setErrors({ confirmNewPassword: 'Passwords do not match' }); return; }

//     setIsLoading(true);
//     try {
//       const response = await fetch(`${BASE_URL}/reset-password/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           token: resetToken, // The token/otp from Step 2
//           email: forgotEmail, // Some backends might need email again
//           new_password: newPassword,
//           confirm_password: confirmNewPassword,
//         }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("Password reset successful! Redirecting to login...");
//         setTimeout(() => {
//           setSuccessMessage("");
//           resetToLogin();
//         }, 2000);
//       } else {
//         setErrors({ general: data.message || "Failed to reset password." });
//       }
//     } catch (err) {
//       setErrors({ general: "Error resetting password." });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetToLogin = () => {
//     setAuthView('LOGIN');
//     setFpStep(1);
//     setForgotEmail('');
//     setOtp('');
//     setResetToken('');
//     setNewPassword('');
//     setErrors({});
//     setSuccessMessage('');
//   };

//   if (!open) return null;






//   // -------------------- LOGIN WITH OTP (SEND) --------------------
// const sendLoginOtp = async () => {
//   const response = await fetch(`${BASE_URL}/login-otp/send/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       mobile: loginOtpMobile,
//     }),
//   });

//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Failed to send OTP");
//   }
// };

// // -------------------- LOGIN WITH OTP (VERIFY) --------------------
// const verifyLoginOtp = async () => {
//   const response = await fetch(`${BASE_URL}/login-otp/verify/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       mobile: loginOtpMobile,
//       otp: loginOtp,
//     }),
//   });

//   const data = await response.json();
//   if (!response.ok || !data.user) {
//     throw new Error(data.message || "Invalid OTP");
//   }

//   localStorage.setItem("user", JSON.stringify(data.user));
//   if (data.token) {
//     localStorage.setItem("access_token", data.token);
//   }

//   await handleSignupSuccess({
//     username: data.user.username,
//     email: data.user.email,
//     phone: data.user.phone || "",
//   });

//   return data.user;
// };



// // -------------------- LOGIN WITH OTP HANDLER --------------------
// const handleLoginWithOtp = async () => {
//   setErrors({});
//   setIsLoading(true);

//   try {
//     if (loginOtpStep === 1) {
//       if (!/^[6-9]\d{9}$/.test(loginOtpMobile)) {
//         setErrors({ general: "Enter valid registered mobile number" });
//         return;
//       }

//       await sendLoginOtp();
//       setSuccessMessage("OTP sent to your registered mobile number");
//       setLoginOtpStep(2);
//     } else {
//       const user = await verifyLoginOtp();
//       setSuccessMessage("Login successful!");

//       setTimeout(() => {
//         setSuccessMessage("");
//         setIsComplete(true);
//       }, 1200);
//     }
//   } catch (error: any) {
//     setErrors({ general: error.message || "OTP login failed" });
//   } finally {
//     setIsLoading(false);
//   }
// };


// useEffect(() => {
//   document.body.style.overflow = showAuthModal ? "hidden" : "auto";
// }, [showAuthModal]);


//   return (
//     <div className="min-h-screen bg-background py-6 sm:py-10 px-4">
//     {/* ================= AUTH MODAL ================= */}
//     {showAuthModal && !isAuthenticated && (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-hidden">
//       <div className="shadow-2xl w-full max-w-5xl bg-white overflow-hidden">
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* Left Side - Image */}
//           <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gray-200">
//             <img src={mibbs2} alt="MIBBS Visual" className="max-w-full h-auto object-contain" />
//           </div>

//           {/* Right Side - Forms */}
//           <div className="p-8 bg-white h-full">
            
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-mibbs-gradient rounded-lg flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
//                    <h2 className="text-white font-bold">M</h2>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900">MIBBS</h2>
//               </div>
//               <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors">
//                 <X className="w-6 h-6"/>
//               </button>
//             </div>

//             {/* Title / Subtitle */}
//             <h3 className="text-xl font-semibold mb-1">
//               {/* {authView === 'LOGIN' && 'Welcome Back'} */}
//               {/* {authView === 'SIGNUP' && 'Create Account'} */}
//               {authView === 'FORGOT' && 'Reset Password'}
//             </h3>
//             <p className="text-gray-600 mb-6 text-sm">
//               {authView === 'LOGIN' && 'Login to your MIBBS account'}
//               {authView === 'SIGNUP' && 'Sign up to get started'}
//               {authView === 'FORGOT' && (
//                 fpStep === 1 ? 'Enter your email to receive a code' :
//                 fpStep === 2 ? 'Enter the code sent to your email' :
//                 'Create a new strong password'
//               )}
//             </p>

//             {/* Global Messages */}
//             {successMessage && (
//               <div className="p-3 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
//                 {successMessage}
//               </div>
//             )}
//             {errors.general && (
//               <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
//                 {errors.general}
//               </div>
//             )}

//             {/* --- FORGOT PASSWORD FLOW --- */}
//             {authView === 'FORGOT' && (
//               <div className="space-y-4">
                
//                 {/* STEP 1: EMAIL */}
//                 {fpStep === 1 && (
//                   <form onSubmit={handleSendOtp} className="space-y-4">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type="email"
//                           value={forgotEmail}
//                           onChange={(e) => setForgotEmail(e.target.value)}
//                           className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${errors.forgotEmail ? 'border-red-300' : 'border-gray-300'}`}
//                           placeholder="name@example.com"
//                         />
//                       </div>
//                       {errors.forgotEmail && <p className="text-xs text-red-600 mt-1">{errors.forgotEmail}</p>}
//                     </div>
//                     <button type="submit" disabled={isLoading} className="w-full bg-mibbs-gradient text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all">
//                       {isLoading ? 'Sending...' : 'Send Verification Code'}
//                     </button>
//                   </form>
//                 )}

//                 {/* STEP 2: OTP */}
//                 {fpStep === 2 && (
//                   <form onSubmit={handleVerifyOtp} className="space-y-4">
//                      <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">Verification Code</label>
//                       <div className="relative">
//                         <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                         <input
//                           type="text"
//                           value={otp}
//                           onChange={(e) => setOtp(e.target.value)}
//                           className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm tracking-widest"
//                           placeholder="Enter OTP"
//                         />
//                       </div>
//                       {errors.otp && <p className="text-xs text-red-600 mt-1">{errors.otp}</p>}
//                     </div>
//                     <button type="submit" disabled={isLoading} className="w-full bg-mibbs-gradient text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all">
//                       {isLoading ? 'Verifying...' : 'Verify & Proceed'}
//                     </button>
//                     <button type="button" onClick={() => setFpStep(1)} className="text-xs text-blue-600 hover:underline w-full text-center">
//                       Change Email
//                     </button>
//                   </form>
//                 )}

//                 {/* STEP 3: RESET PASSWORD */}
//                 {fpStep === 3 && (
//                   <form onSubmit={handleResetPassword} className="space-y-4">
//                     <div>
//                       <div className="relative">
//                         <input
//                           type={showNewPassword ? 'text' : 'password'}
//                           value={newPassword}
//                           onChange={(e) => setNewPassword(e.target.value)}
//                           className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//                           placeholder="New Password"
//                         />
//                         <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                       {errors.newPassword && <p className="text-xs text-red-600 mt-1">{errors.newPassword}</p>}
//                     </div>

//                     <div>
//                       <div className="relative">
//                         <input
//                           type={showConfirmNewPassword ? 'text' : 'password'}
//                           value={confirmNewPassword}
//                           onChange={(e) => setConfirmNewPassword(e.target.value)}
//                           className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//                           placeholder="Confirm New Password"
//                         />
//                         <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                           {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                       {errors.confirmNewPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmNewPassword}</p>}
//                     </div>

//                     <button type="submit" disabled={isLoading} className="w-full bg-mibbs-gradient text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all">
//                       {isLoading ? 'Resetting...' : 'Reset Password'}
//                     </button>
//                   </form>
//                 )}

//                 {/* Back to Login Button */}
//                 <div className="mt-4 text-center">
//                   <button type="button" onClick={resetToLogin} className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-blue-600 mx-auto transition-colors">
//                     <ArrowLeft className="w-4 h-4" />
//                     <span>Back to Login</span>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* --- LOGIN / SIGNUP FLOW --- */}
//             {authView !== 'FORGOT' && (
//               <form onSubmit={handleLoginOrSignup} className="space-y-4">
//                 {/* Username (Signup Only) */}
//                 {authView === 'SIGNUP' && (
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                       type="text"
//                       name="username"
//                       value={formData.username}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
//                       placeholder="Username"
//                     />
//                   </div>
//                 )}

//                 {/* Email */}
//                 <div>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
//                       placeholder="Email address"
//                     />
//                   </div>
//                   {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
//                 </div>

//                 {/* Mobile (Signup Only) */}
//                 {authView === 'SIGNUP' && (
//                   <div>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                       <input
//                         type="tel"
//                         name="mobile"
//                         value={formData.mobile}
//                         onChange={handleChange}
//                         className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${errors.mobile ? 'border-red-300' : 'border-gray-300'}`}
//                         placeholder="Mobile number"
//                       />
//                     </div>
//                     {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
//                   </div>
//                 )}

//                 {/* Password */}
//                 <div>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className={`w-full pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
//                       placeholder="Password"
//                     />
//                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>
//                   {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
//                 </div>

//                 {/* Confirm Password (Signup Only) */}
//                 {authView === 'SIGNUP' && (
//                   <div>
//                     <div className="relative">
//                       <input
//                         type={showConfirmPassword ? 'text' : 'password'}
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         className={`w-full pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
//                         placeholder="Confirm password"
//                       />
//                       <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                         {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                       </button>
//                     </div>
//                     {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
//                   </div>
//                 )}

//                 {/* Extras: Remember Me & Forgot Password */}
//                 {authView === 'LOGIN' && (
//                   <div className="flex items-center justify-between">
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         name="rememberMe"
//                         checked={formData.rememberMe}
//                         onChange={handleChange}
//                         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
//                       />
//                       <span className="text-xs text-gray-600">Remember me</span>
//                     </label>
//                     <button type="button" onClick={() => { setAuthView('FORGOT'); setFpStep(1); }} className="text-xs text-blue-600 hover:text-purple-600 font-semibold">
//                       Forgot Password?
//                     </button>
//                   </div>
//                 )}

//                 {/* Terms (Signup Only) */}
//                 {authView === 'SIGNUP' && (
//                   <div>
//                     <label className="flex items-start space-x-2">
//                       <input
//                         type="checkbox"
//                         name="agreeToTerms"
//                         checked={formData.agreeToTerms}
//                         onChange={handleChange}
//                         className="mt-0.6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
//                       />
//                       <span className="text-xs text-gray-600">
//                         I agree to the <a href="/terms-and-conditions" className="text-blue-600">Terms</a> & <a href="/privacy-policy" className="text-blue-600">Privacy Policy</a>
//                       </span>
//                     </label>
//                     {errors.agreeToTerms && <p className="text-xs text-red-600 mt-1">{errors.agreeToTerms}</p>}
//                   </div>
//                 )}

//                 {/* Main Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full bg-mibbs-gradient text-white py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-all disabled:opacity-50"
//                 >
//                   {isLoading ? 'Processing...' : (authView === 'LOGIN' ? 'Sign In' : 'Create Account')}
//                 </button>
//                 {/* -------- LOGIN WITH OTP (ADDED BELOW LOGIN INPUTS) -------- */}
//                 {authView === 'LOGIN' && (
//                   <div className="mt-6 border-t pt-4">
//                     <p className="text-center text-xs text-gray-500 mb-3">
//                       Or login using OTP
//                     </p>

//                     <div className="space-y-3">
//                       <input
//                         type="tel"
//                         value={loginOtpMobile}
//                         onChange={(e) => setLoginOtpMobile(e.target.value)}
//                         className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//                         placeholder="Registered mobile number"
//                       />

//                       {loginOtpStep === 2 && (
//                         <input
//                           type="text"
//                           value={loginOtp}
//                           onChange={(e) => setLoginOtp(e.target.value)}
//                           className="w-full px-4 py-2.5 border rounded-lg text-center tracking-widest focus:ring-2 focus:ring-blue-500 text-sm"
//                           placeholder="Enter OTP"
//                         />
//                       )}

//                       <button
//                         type="button"
//                         disabled={isLoading}
//                         onClick={handleLoginWithOtp}
//                         className="w-full bg-mibbs-gradient text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all disabled:opacity-50"
//                       >
//                         {isLoading
//                           ? 'Processing...'
//                           : loginOtpStep === 1
//                             ? 'Send OTP'
//                             : 'Verify & Login'}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </form>
//             )}

//             {/* Toggle Login/Signup */}
//             {authView !== 'FORGOT' && (
//               <div className="mt-4 text-center text-sm text-gray-600">
//                 {authView === 'LOGIN' ? (
//                   <>Don't have an account? <button onClick={() => setAuthView('SIGNUP')} className="text-blue-600 font-semibold hover:underline">Sign Up</button></>
//                 ) : (
//                   <>Already have an account? <button onClick={() => setAuthView('LOGIN')} className="text-blue-600 font-semibold hover:underline">Sign In</button></>
//                 )}
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   )}

// {isAuthenticated && (
//    <>
//       {/* Top bar */}
//       <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-6 sm:mb-8">
//         MIBBS Registration
//       </h1>

//       <div className="max-w-2xl mx-auto bg-card rounded-2xl card-shadow overflow-hidden">
//         {/* Progress */}
//         <div className="px-5 sm:px-8 pt-5 sm:pt-6">
//           <div className="flex items-center justify-between mb-3">
//             <span className="text-sm text-muted-foreground font-medium">Step {currentStep + 1} of {steps.length}</span>
//             <span className="text-sm font-semibold gradient-text">{steps[currentStep]}</span>
//           </div>
//           <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
//             <motion.div className="h-full rounded-full gradient-btn" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
//           </div>
//         </div>

//         {/* Content */}
//         <div className="px-5 sm:px-8 py-6 sm:py-8">
//           <AnimatePresence mode="wait">
//             <motion.div key={currentStep} variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>

//               {/* STEP 1: Basic Details */}
//               {currentStep === 0 && (
//                 <div>
//                   <StepHeader title="Basic Details" subtitle="Let's start with some basic information about you and your business." />
//                   <div className="space-y-6 mt-6">
//                     <FieldGroup label="What should we call you?" hint="This helps us personalise your experience.">
//                       <input type="text" value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter your name" className="form-input" />
//                     </FieldGroup>

//                     <FieldGroup label="What is the name of your business?" hint="This will be shown on your dashboard and reports.">
//                       <input type="text" value={data.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Enter business name" className="form-input" disabled={noBusinessName} />
//                       <label className="flex items-center gap-2 mt-2 cursor-pointer">
//                         <input type="checkbox" checked={noBusinessName} onChange={(e) => { setNoBusinessName(e.target.checked); if (e.target.checked) update("businessName", ""); }} className="w-4 h-4 rounded gradient-checkbox" />
//                         <span className="text-sm text-muted-foreground">I don't have a business name yet</span>
//                       </label>
//                     </FieldGroup>

//                     <FieldGroup label="Do you have a website?" hint="It's completely okay if you don't — many businesses start without one.">
//                       <div className="grid grid-cols-2 gap-3">
//                         <OptionCard label="Yes, I have a website" icon={<Globe className="w-5 h-5" />} selected={data.hasWebsite === true} onClick={() => update("hasWebsite", true)} compact />
//                         <OptionCard label="Not built yet" icon={<Monitor className="w-5 h-5" />} selected={data.hasWebsite === false} onClick={() => update("hasWebsite", false)} compact />
//                       </div>
//                       <AnimatePresence>
//                         {data.hasWebsite && (
//                           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4">
//                             <p className="text-sm font-bold text-foreground mb-2">Website URL</p>
//                             <input type="url" value={data.websiteUrl} onChange={(e) => update("websiteUrl", e.target.value)} placeholder="https://yourwebsite.com" className="form-input" />
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </FieldGroup>

//                     <FieldGroup label="What stage is your business in right now?" hint="Based on this, we'll ask the right questions for you.">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         <OptionCard label="Haven't started yet" description="I'm planning to start my business" icon={<Rocket className="w-5 h-5" />} selected={data.businessStage === "not_started"} onClick={() => update("businessStage", "not_started")} compact />
//                         <OptionCard label="Early Stage" description="Just getting started" icon={<TrendingUp className="w-5 h-5" />} selected={data.businessStage === "early"} onClick={() => update("businessStage", "early")} compact />
//                         <OptionCard label="Growing" description="Business is running & growing" icon={<BarChart3 className="w-5 h-5" />} selected={data.businessStage === "growing"} onClick={() => update("businessStage", "growing")} compact />
//                         <OptionCard label="Advanced" description="Well established business" icon={<Target className="w-5 h-5" />} selected={data.businessStage === "advanced"} onClick={() => update("businessStage", "advanced")} compact />
//                       </div>
//                     </FieldGroup>
//                   </div>
//                 </div>
//               )}

//               {/* STEP 2: Business Location */}
//               {currentStep === 1 && (
//                 <div>
//                   <StepHeader title="Business Location" subtitle="Where will your business be located? Location affects customer behaviour and costs." />
//                   <div className="mt-6">
//                     <FieldGroup label="Enter your Pincode" hint="Enter any 6-digit Indian pincode to auto-detect your area.">
//                       <PincodeLookup pincode={data.pincode} onPincodeChange={(v) => update("pincode", v)} onLocationFound={handleLocationFound} />
//                     </FieldGroup>
//                   </div>
//                 </div>
//               )}

//               {/* STEP 3: Business Category */}
//               {currentStep === 2 && (
//                 <div>
//                   <StepHeader title="Business Category" subtitle="Which industry does your business belong to? Choose the closest option." />
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
//                     {industries.map((ind) => (
//                       <SimpleOption key={ind} label={ind} selected={data.industry === ind} onClick={() => update("industry", ind)} />
//                     ))}
//                   </div>

//                   <div className="mt-8">
//                     <p className="text-base font-semibold gradient-text mb-3">What will you mainly offer to customers?</p>
//                     <div className="grid grid-cols-2 gap-3">
//                       <OptionCard label="Products" description="Things people buy" icon={<Package className="w-5 h-5" />} selected={data.businessType === "product"} onClick={() => update("businessType", "product")} compact />
//                       <OptionCard label="Services" description="Work you do for people" icon={<Wrench className="w-5 h-5" />} selected={data.businessType === "service"} onClick={() => update("businessType", "service")} compact />
//                     </div>
//                   </div>

//                   <AnimatePresence>
//                     {data.businessType === "product" && (
//                       <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6">
//                         <p className="text-base font-semibold text-foreground mb-3">What type of product business?</p>
//                         <div className="grid grid-cols-3 gap-3">
//                           <SimpleOption label="B2B" selected={data.productBusinessType === "B2B"} onClick={() => update("productBusinessType", "B2B")} />
//                           <SimpleOption label="B2C" selected={data.productBusinessType === "B2C"} onClick={() => update("productBusinessType", "B2C")} />
//                           <SimpleOption label="D2C" selected={data.productBusinessType === "D2C"} onClick={() => update("productBusinessType", "D2C")} />
//                         </div>

//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               {/* NEW BUSINESS: STEP 4 - Capital / Starting Budget */}
//               {isNewBusiness && currentStep === 3 && (
//                 <div>
//                   <StepHeader title="Capital / Starting Budget" subtitle="How much money are you planning to invest? This helps us suggest realistic marketing plans." />
//                   <div className="space-y-3 mt-6">
//                     {[
//                       { label: "Less than ₹1,00,000", value: "Below ₹1 Lakh" },
//                       { label: "₹1,00,000 - ₹5,00,000", value: "₹1 - ₹5 Lakhs" },
//                       { label: "More than ₹5,00,000", value: "Above ₹5 Lakhs" },
//                     ].map((r) => (
//                       <OptionCard key={r.value} label={r.label} icon={<DollarSign className="w-5 h-5" />} selected={data.startingBudget === r.value} onClick={() => update("startingBudget", r.value)} />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* NEW BUSINESS: STEP 5 - Business Mode */}
//               {isNewBusiness && currentStep === 4 && (
//                 <div>
//                   <StepHeader title="Business Mode" subtitle="How do you want to start your business?" />
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
//                     <OptionCard label="Offline" description="Shop, office, physical location" icon={<Store className="w-5 h-5" />} selected={data.businessMode === "Offline"} onClick={() => update("businessMode", "Offline")} />
//                     <OptionCard label="Online" description="Website, Instagram, WhatsApp, apps" icon={<Globe2 className="w-5 h-5" />} selected={data.businessMode === "Online"} onClick={() => update("businessMode", "Online")} />
//                   </div>
//                 </div>
//               )}

//               {/* NEW BUSINESS: STEP 6 - What Help Do You Need? */}
//               {isNewBusiness && currentStep === 5 && (
//                 <div>
//                   <StepHeader title="What Help Do You Need?" subtitle="What do you need most help with right now? Select all that apply." />
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
//                     <OptionCard label="Paperwork / Legal" description="Licenses, registrations" icon={<FileText className="w-5 h-5" />} selected={data.helpNeeded.includes("Paperwork / Legal")} onClick={() => toggleArrayItem("helpNeeded", "Paperwork / Legal")} />
//                     <OptionCard label="Money Planning" description="How much to spend where" icon={<DollarSign className="w-5 h-5" />} selected={data.helpNeeded.includes("Money Planning")} onClick={() => toggleArrayItem("helpNeeded", "Money Planning")} />
//                     <OptionCard label="Finding Customers" description="First few clients" icon={<Users className="w-5 h-5" />} selected={data.helpNeeded.includes("Finding Customers")} onClick={() => toggleArrayItem("helpNeeded", "Finding Customers")} />
//                     <OptionCard label="Skills / Knowledge" description="How to do the work" icon={<BookOpen className="w-5 h-5" />} selected={data.helpNeeded.includes("Skills / Knowledge")} onClick={() => toggleArrayItem("helpNeeded", "Skills / Knowledge")} />
//                     <OptionCard label="Online Setup" description="Website, social media" icon={<MonitorSmartphone className="w-5 h-5" />} selected={data.helpNeeded.includes("Online Setup")} onClick={() => toggleArrayItem("helpNeeded", "Online Setup")} />
//                     <OptionCard label="Everything" description="Complete guidance" icon={<Sparkles className="w-5 h-5" />} selected={data.helpNeeded.includes("Everything")} onClick={() => toggleArrayItem("helpNeeded", "Everything")} />
//                   </div>
//                 </div>
//               )}

//               {/* EXISTING BUSINESS PATH */}
//               {isExistingBusiness && currentStep === 3 && (
//                 <div>
//                   <StepHeader title="Business Experience" subtitle="How long have you been running this business? This helps us understand your experience level." />
//                   <div className="space-y-3 mt-6">
//                     {yearsOptions.map((y) => (
//                       <OptionCard key={y} label={y} icon={<Calendar className="w-5 h-5" />} selected={data.yearsInBusiness === y} onClick={() => update("yearsInBusiness", y)} />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {isExistingBusiness && currentStep === 4 && (
//                 <div>
//                   <StepHeader title="Business Challenges" subtitle="Tell us what's bothering your business right now. Select all that feel true." />
//                   <div className="space-y-3 mt-6">
//                     {challengesList.map((c) => (
//                       <OptionCard key={c.label} label={c.label} description={c.desc} icon={c.icon} selected={data.businessChallenges.includes(c.label)} onClick={() => toggleArrayItem("businessChallenges", c.label)} />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {isExistingBusiness && currentStep === 5 && (
//                 <div>
//                   <StepHeader title="Digital Presence" subtitle="How active is your business online? Select your level and choose the channels you use." />
//                   <div className="space-y-3 mt-6">
//                     {scalingLevels.map((l) => (
//                       <OptionCard key={l.label} label={l.label} description={l.desc} icon={l.icon} selected={data.digitalScalingLevel === l.label} onClick={() => update("digitalScalingLevel", l.label)} />
//                     ))}
//                   </div>

//                   <AnimatePresence>
//                     {data.digitalScalingLevel === "Basic" && (
//                       <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6">
//                         <div className="bg-secondary/30 rounded-xl p-4 border border-border">
//                           <p className="text-sm font-semibold gradient-text mb-2">Which platforms do you use?</p>
//                           <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
//                           <div className="grid grid-cols-3 gap-3">
//                             {["Facebook", "Instagram", "WhatsApp"].map((p) => (
//                               <SimpleOption key={p} label={p} selected={(data.digitalPlatforms || []).includes(p)} onClick={() => toggleArrayItem("digitalPlatforms", p)} />
//                             ))}
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                     {data.digitalScalingLevel === "Growing" && (
//                       <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6">
//                         <div className="bg-secondary/30 rounded-xl p-4 border border-border">
//                           <p className="text-sm font-semibold gradient-text mb-2">What marketing activities are you doing?</p>
//                           <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
//                           <div className="grid grid-cols-2 gap-3">
//                             {["Ad Campaigns", "Content Creation", "Brand Marketing", "Influencer Marketing"].map((a) => (
//                               <SimpleOption key={a} label={a} selected={(data.digitalActivities || []).includes(a)} onClick={() => toggleArrayItem("digitalActivities", a)} />
//                             ))}
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                     {data.digitalScalingLevel === "Advanced" && (
//                       <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6">
//                         <div className="bg-secondary/30 rounded-xl p-4 border border-border">
//                           <p className="text-sm font-semibold gradient-text mb-2">What advanced activities are you doing?</p>
//                           <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
//                           <div className="grid grid-cols-2 gap-3">
//                             {["Ad Campaigns", "Content Creation", "Brand Marketing", "Influencer Marketing", "E-commerce Websites"].map((a) => (
//                               <SimpleOption key={a} label={a} selected={(data.digitalActivities || []).includes(a)} onClick={() => toggleArrayItem("digitalActivities", a)} />
//                             ))}
//                           </div>
//                           <div className="mt-4">
//                             <p className="text-sm font-bold text-foreground">ROI (Return on Investment)</p>
//                             <p className="text-xs text-muted-foreground mb-2">What is your approximate ROI percentage?</p>
//                             <input type="text" value={data.roiPercentage || ""} onChange={(e) => update("roiPercentage", e.target.value)} placeholder="Enter numeric value" className="form-input" />
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               {isExistingBusiness && currentStep === 6 && (
//                 <div>
//                   <StepHeader title="Revenue & Marketing Spend" subtitle="Based on the last 2-3 months, an approximate number is perfectly fine." />
//                   <div className="space-y-6 mt-6">
//                     <FieldGroup label="What is your average monthly revenue?" hint="On average, how much does your business earn in a month?">
//                       <input type="text" value={data.monthlyRevenue || ""} onChange={(e) => update("monthlyRevenue", e.target.value)} placeholder="e.g. ₹50,000" className="form-input" />
//                     </FieldGroup>
//                     <FieldGroup label="Monthly marketing spend?" hint="How much do you spend on promoting your brand each month?">
//                       <div className="space-y-3">
//                         {marketingSpendOptions.map((opt) => (
//                           <OptionCard key={opt} label={opt} selected={data.marketingBudgetRange === opt} onClick={() => update("marketingBudgetRange", opt)} />
//                         ))}
//                       </div>
//                     </FieldGroup>
//                   </div>
//                 </div>
//               )}

//               {isExistingBusiness && currentStep === 7 && (
//                 <div>
//                   <StepHeader title="Brand Objectives" subtitle="What do you want your business to achieve next? Choose up to 4 that matter most." />
//                   <div className="space-y-3 mt-6">
//                     {brandObjectivesList.map((o) => (
//                       <OptionCard key={o.label} label={o.label} description={o.desc} icon={o.icon}
//                         selected={data.brandObjectives.includes(o.label)}
//                         onClick={() => {
//                           if (data.brandObjectives.includes(o.label)) {
//                             toggleArrayItem("brandObjectives", o.label);
//                           } else if (data.brandObjectives.length < 4) {
//                             toggleArrayItem("brandObjectives", o.label);
//                           }
//                         }}
//                       />
//                     ))}
//                   </div>
//                   <p className="text-center text-sm text-muted-foreground mt-4">{data.brandObjectives.length}/4 selected</p>
//                 </div>
//               )}

//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Navigation */}
//         <div className="px-5 sm:px-8 pb-5 sm:pb-6 flex items-center justify-between border-t border-border pt-4">
//           <button onClick={prev} disabled={currentStep === 0}
//             className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-border font-medium text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground hover:bg-secondary">
//             <ChevronLeft className="w-4 h-4" /> Back
//           </button>
//           <motion.button whileHover={canProceed() ? { scale: 1.02 } : {}} whileTap={canProceed() ? { scale: 0.98 } : {}}
//             onClick={next} disabled={!canProceed()}
//             className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed gradient-btn text-primary-foreground gradient-shadow">
//             {currentStep === steps.length - 1 ? "Complete" : "Continue"} <ChevronRight className="w-4 h-4" />
//           </motion.button>
//         </div>
//       </div>
//       </>
//     )}
//     </div>
//   );
// };

// /* ─── Sub-components ─── */

// const StepHeader = ({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) => (
//   <div className="text-center">
//     <h2 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">{title}</h2>
//     {badge && (
//       <span className="inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full gradient-btn text-primary-foreground">{badge}</span>
//     )}
//     <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">{subtitle}</p>
//   </div>
// );

// const FieldGroup = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
//   <div>
//     <p className="text-sm sm:text-base font-bold text-foreground">{label}</p>
//     {hint && <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 mb-2">{hint}</p>}
//     {!hint && <div className="mb-2" />}
//     {children}
//   </div>
// );

// const SimpleOption = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
//   <motion.button
//     whileHover={{ scale: 1.01 }}
//     whileTap={{ scale: 0.98 }}
//     onClick={onClick}
//     className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all w-full ${
//       selected ? "border-[hsl(280,70%,55%)] bg-[hsl(280,60%,96%)] text-[hsl(280,70%,45%)]" : "border-border bg-card text-foreground hover:border-primary/30"
//     }`}
//   >
//     <span>{label}</span>
//     <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
//       selected ? "bg-[hsl(280,70%,55%)]" : "border-2 border-muted"
//     }`}>
//       {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
//     </div>
//   </motion.button>
// );

// export default MIBBSQuestionnaire;