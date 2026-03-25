
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, User, Building2, Globe, Rocket, MapPin, Factory, Package, Wrench, DollarSign, Monitor, HelpCircle, Calendar, AlertTriangle, BarChart3, Target, CheckCircle2, ShoppingCart, Briefcase, Store, Smartphone, BookOpen, FileText, Users, TrendingUp, Heart, Shield, Eye, Megaphone, Zap, Award, Loader2 } from "lucide-react";
import ProgressBar from "@/componentsfour/questionnaire/ProgressBar";
import StepWrapper from "@/componentsfour/questionnaire/StepWrapper";
import OptionCard from "@/componentsfour/questionnaire/OptionCard";
import TextInput from "@/componentsfour/questionnaire/TextInput";
import { QuestionnaireData, initialData, BusinessPath, PincodeInfo } from "@/types/questionnaire";


//signupModal Related page imports start here
import React, { useEffect } from 'react';
import { X, Mail, Phone, EyeOff, KeyRound, } from 'lucide-react'; 
import { useNavigate } from "react-router-dom";
import mibbs2 from '../../src/assets/mibbs-2.png';
import SignupModal from "@/componentstwo/flow/SignupModal";

// --- Interfaces ---
interface SignupModalProps {
  isOpen: boolean;
  onComplete: (userData: any) => void;
  onClose: () => void;
  assessmentData?: any;
}

type ViewState = 'LOGIN' | 'SIGNUP' | 'FORGOT';


// MIBBSQuestionnarie page logic starts here 

const INDUSTRIES = [
  "Food & Beverages", "Retail & E-commerce", "Health & Wellness", "Education & Training",
  "Beauty & Personal Care", "Real Estate", "Technology & IT", "Fashion & Apparel",
  "Automotive", "Home Services", "Travel & Tourism", "Finance & Insurance",
  "Entertainment & Media", "Agriculture", "Manufacturing", "Other"
];

const CHALLENGES = [
  { id: "low_footfall", title: "Not enough people are coming to us", desc: "We want more customers, but footfall or enquiries feel low.", icon: <Users className="w-4 h-4" /> },
  { id: "low_conversion", title: "People ask, but don't buy", desc: "Customers show interest, but most don't go ahead and purchase.", icon: <ShoppingCart className="w-4 h-4" /> },
  { id: "no_tracking", title: "We don't know what's actually working", desc: "We try different ways to promote, but can't tell what brings customers.", icon: <Eye className="w-4 h-4" /> },
  { id: "wasted_spend", title: "Promotions feel like wasted money", desc: "We spend money to promote, but the results aren't clear.", icon: <DollarSign className="w-4 h-4" /> },
  { id: "confused", title: "Marketing feels confusing", desc: "We're unsure how to promote our business in the right way.", icon: <HelpCircle className="w-4 h-4" /> },
  { id: "competition", title: "Too many businesses like ours", desc: "There are many similar businesses fighting for the same customers.", icon: <AlertTriangle className="w-4 h-4" /> },
  { id: "budget_tight", title: "We have to be very careful with spending", desc: "Our marketing budget is limited, so mistakes are costly.", icon: <Shield className="w-4 h-4" /> },
  { id: "no_retention", title: "Customers don't come back", desc: "People buy once, but rarely return again.", icon: <Heart className="w-4 h-4" /> },
  { id: "no_online", title: "Hardly anyone finds us online", desc: "Few people see or discover our business on the internet.", icon: <Globe className="w-4 h-4" /> },
  { id: "no_direction", title: "We're not sure what to do next", desc: "We want to grow, but don't have a clear direction.", icon: <Target className="w-4 h-4" /> },
];

const OBJECTIVES = [
  { id: "awareness", title: "More people should know about my business", desc: "Right now, many people don't know we exist — we want to be seen and recognised.", icon: <Megaphone className="w-4 h-4" /> },
  { id: "leads", title: "I want more calls, messages, or enquiries", desc: "I want more people to reach out and ask about what we offer.", icon: <Smartphone className="w-4 h-4" /> },
  { id: "online_sales", title: "I want to increase online sales", desc: "More people should buy from us through the internet.", icon: <ShoppingCart className="w-4 h-4" /> },
  { id: "retention", title: "I want customers to come back again", desc: "Getting repeat customers is more important than one-time sales.", icon: <Heart className="w-4 h-4" /> },
  { id: "trust", title: "I want people to trust my brand", desc: "When customers see us, they should feel confident choosing us.", icon: <Shield className="w-4 h-4" /> },
  { id: "optimize", title: "I want to stop wasting money on marketing", desc: "I want my money to be spent wisely, not blindly.", icon: <Zap className="w-4 h-4" /> },
  { id: "stable_income", title: "I want steady income every month", desc: "I want predictable, stable sales — not ups and downs.", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "local", title: "I want to be well-known in my local area", desc: "People nearby should think of us first when they need this product/service.", icon: <MapPin className="w-4 h-4" /> },
  { id: "online_presence", title: "I want my business to look strong online", desc: "My website or social media should look active, clear, and professional.", icon: <Monitor className="w-4 h-4" /> },
  { id: "clarity", title: "I want to know what is actually working", desc: "I want clarity on what brings results, so I can do more of it.", icon: <BarChart3 className="w-4 h-4" /> },
];

const HELP_OPTIONS = [
  { id: "legal", title: "Paperwork / Legal", desc: "Licenses, registrations", icon: <FileText className="w-4 h-4" /> },
  { id: "money", title: "Money Planning", desc: "How much to spend where", icon: <DollarSign className="w-4 h-4" /> },
  { id: "customers", title: "Finding Customers", desc: "First few clients", icon: <Users className="w-4 h-4" /> },
  { id: "skills", title: "Skills / Knowledge", desc: "How to do the work", icon: <BookOpen className="w-4 h-4" /> },
  { id: "online", title: "Online Setup", desc: "Website, social media", icon: <Monitor className="w-4 h-4" /> },
  { id: "everything", title: "Everything", desc: "Complete guidance", icon: <Sparkles className="w-4 h-4" /> },
];

const MIBBSQuestionnaire = () => {

  const BASE_URL = "http://127.0.0.1:8000/api";
  
  // --- State Management ---
  const [view, setView] = useState<ViewState>('LOGIN'); // Main view switcher
  const [showAuthModal, setShowAuthModal] = useState(true);
  
  // Forgot Password Flow State: 1 = Email, 2 = OTP, 3 = New Password
  const [fpStep, setFpStep] = useState<number>(1); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

    // --- Login with OTP (ADDED) ---
  const [loginOtpStep, setLoginOtpStep] = useState<1 | 2>(1);
  const [loginOtpMobile, setLoginOtpMobile] = useState('');
  const [loginOtp, setLoginOtp] = useState('');

  // Form Data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    rememberMe: false,
  });

  // Forgot Password Specific Data
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState(''); // Token received after verifying OTP
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Password Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

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

  // --- Handlers ---

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



// -------------------- LOGIN FETCH --------------------
const loginUser = async () => {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });

  const text = await response.text();
  let data: any = {};

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok || !data.user) {
    throw new Error(data.message || "Invalid credentials.");
  }

  // Remember Me
  if (formData.rememberMe) {
    localStorage.setItem("rememberedEmail", formData.email);
    localStorage.setItem("rememberedPassword", formData.password);
  } else {
    localStorage.removeItem("rememberedEmail");
    localStorage.removeItem("rememberedPassword");
  }

  localStorage.setItem("user", JSON.stringify(data.user));
  if (data.token) {
    localStorage.setItem("access_token", data.token);
  }

  await handleSignupSuccess({
    username: data.user.username,
    email: data.user.email,
    phone: data.user.phone || "",
  });

  return data.user;
};



// -------------------- REGISTER FETCH --------------------
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

  const text = await response.text();
  let data: any = {};

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok || !data.user) {
    throw new Error(data.message || "Registration failed.");
  }

  await handleSignupSuccess({
    username: data.user.username || formData.username,
    email: data.user.email || formData.email,
    phone: data.user.phone || formData.mobile,
  });

  return data.user;
};



const clearLoginFields = () => {
  setFormData(prev => ({
    ...prev,
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  }));
};


// -------------------- MAIN HANDLER --------------------
const handleLoginOrSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrors({});

  const isLogin = view === "LOGIN";

  if (isLogin && !validateLoginForm()) return;
  if (!isLogin && !validateSignupForm()) return;

  setIsLoading(true);

  try {
  if (isLogin) {
    const user = await loginUser();

    setSuccessMessage("Login successful!");

    clearLoginFields(); // ✅ ONLY THIS (no extra setFormData)

    setErrors({});
    setTimeout(() => {
      setSuccessMessage("");

      // ✅ CLOSE MODAL
      setShowAuthModal(false);

      // ✅ START QUESTIONNAIRE
      setCurrentStep(1);

    }, 1000);
    // setTimeout(() => {
    //   setSuccessMessage("");
    //   setIsComplete(true);
    // }, 1500);
  } else {
    await registerUser();

    setSuccessMessage("Account created successfully!");

    // ✅ RESET AFTER SIGNUP
    resetFormData();
    
    setErrors({});

    setTimeout(() => {
      setSuccessMessage("");
      setView("LOGIN");
    }, 1500);
  }
} catch (error: any) {
  setErrors({ general: error.message || "Something went wrong." });
} finally {
  setIsLoading(false);
}
};

// Step 1: Send OTP to Email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) { setErrors({ forgotEmail: 'Email is required' }); return; }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("OTP sent to your email.");
        setTimeout(() => {
          setSuccessMessage("");
          setFpStep(2); // Move to Step 2
        }, 1000);
      } else {
        setErrors({ general: data.message || "Failed to send OTP." });
      }
    } catch (err) {
      setErrors({ general: "Error sending OTP." });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) { setErrors({ otp: 'OTP is required' }); return; }

    setIsLoading(true);
    try {
      // NOTE: Ensure your backend has this endpoint to verify OTP and return a temp token
      const response = await fetch(`${BASE_URL}/verify-otp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, otp: otp }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("OTP Verified!");
        // If backend returns a specific token for reset, save it here. 
        // Otherwise, we might just pass the OTP again in step 3.
        if (data.token) setResetToken(data.token); 
        else setResetToken(otp); // Fallback if backend expects OTP as token

        setTimeout(() => {
          setSuccessMessage("");
          setFpStep(3); // Auto move to Step 3
        }, 1000);
      } else {
        setErrors({ general: data.message || "Invalid OTP." });
      }
    } catch (err) {
      setErrors({ general: "Error verifying OTP." });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) { setErrors({ newPassword: 'Password too short' }); return; }
    if (newPassword !== confirmNewPassword) { setErrors({ confirmNewPassword: 'Passwords do not match' }); return; }

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: resetToken, // The token/otp from Step 2
          email: forgotEmail, // Some backends might need email again
          new_password: newPassword,
          confirm_password: confirmNewPassword,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          setSuccessMessage("");
          resetToLogin();
        }, 2000);
      } else {
        setErrors({ general: data.message || "Failed to reset password." });
      }
    } catch (err) {
      setErrors({ general: "Error resetting password." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetToLogin = () => {
    setView('LOGIN');
    setFpStep(1);
    setForgotEmail('');
    setOtp('');
    setResetToken('');
    setNewPassword('');
    setErrors({});
    setSuccessMessage('');
  };

  if (!open) return null;






  // -------------------- LOGIN WITH OTP (SEND) --------------------
const sendLoginOtp = async () => {
  const response = await fetch(`${BASE_URL}/login-otp/send/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobile: loginOtpMobile,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to send OTP");
  }
};

// -------------------- LOGIN WITH OTP (VERIFY) --------------------
const verifyLoginOtp = async () => {
  const response = await fetch(`${BASE_URL}/login-otp/verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobile: loginOtpMobile,
      otp: loginOtp,
    }),
  });

  const data = await response.json();
  if (!response.ok || !data.user) {
    throw new Error(data.message || "Invalid OTP");
  }

  localStorage.setItem("user", JSON.stringify(data.user));
  if (data.token) {
    localStorage.setItem("access_token", data.token);
  }

  await handleSignupSuccess({
    username: data.user.username,
    email: data.user.email,
    phone: data.user.phone || "",
  });

  return data.user;
};



// -------------------- LOGIN WITH OTP HANDLER --------------------
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
      setSuccessMessage("OTP sent to your registered mobile number");
      setLoginOtpStep(2);
    } else {
      const user = await verifyLoginOtp();
      setSuccessMessage("Login successful!");

      setTimeout(() => {
        setSuccessMessage("");
        setIsComplete(true);
      }, 1200);
    }
  } catch (error: any) {
    setErrors({ general: error.message || "OTP login failed" });
  } finally {
    setIsLoading(false);
  }
};

  const [data, setData] = useState<QuestionnaireData>(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");

  const businessPath: BusinessPath | null = useMemo(() => {
    if (data.businessStage === "not_started") return "new";
    if (data.businessStage && ["early", "growing", "advanced"].includes(data.businessStage)) return "existing";
    return null;
  }, [data.businessStage]);

  const stepLabels = useMemo(() => {
    if (businessPath === "new") return ["Details", "Location", "Industry", "Capital", "Mode", "Help"];
    if (businessPath === "existing") return ["Details", "Location", "Industry", "Experience", "Challenges", "Digital", "Revenue", "Objectives"];
    return ["Details", "Location", "Industry"];
  }, [businessPath]);

  const totalSteps = stepLabels.length;

  const update = <K extends keyof QuestionnaireData>(key: K, val: QuestionnaireData[K]) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  const toggleArrayItem = (key: "challenges" | "helpNeeded" | "brandObjectives" | "digitalChannels", item: string, max?: number) => {
    setData((prev) => {
      const arr = prev[key];
      if (arr.includes(item)) return { ...prev, [key]: arr.filter((x) => x !== item) };
      if (max && arr.length >= max) return prev;
      return { ...prev, [key]: [...arr, item] };
    });
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0: return true;
      case 1: return data.name.trim().length > 0 && (data.businessName.trim().length > 0 || data.noBusinessName) && data.hasWebsite !== null && data.businessStage !== null;
      case 2: return data.pincode.trim().length >= 5;
      case 3: return data.industry.length > 0 && data.offerType !== null;
      case 4:
        if (businessPath === "new") return data.capitalRange.length > 0;
        if (businessPath === "existing") return data.yearsInBusiness.length > 0;
        return false;
      case 5:
        if (businessPath === "new") return data.businessMode !== null;
        if (businessPath === "existing") return data.challenges.length > 0;
        return false;
      case 6:
        if (businessPath === "new") return data.helpNeeded.length > 0;
        if (businessPath === "existing") return data.digitalPresence !== null;
        return false;
      case 7:
        if (businessPath === "existing") return data.monthlyRevenue.trim().length > 0 && data.marketingSpend.length > 0;
        return false;
      case 8:
        if (businessPath === "existing") return data.brandObjectives.length > 0;
        return false;
      default: return true;
    }
  };

  const nextStep = () => {
    if (currentStep >= totalSteps) {
      setIsComplete(true);
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handlePincodeChange = useCallback(async (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 6);
    update("pincode", clean);
    update("pincodeInfo", null);
    update("locality", "");
    setPincodeError("");

    if (clean.length === 6) {
      setPincodeLoading(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${clean}`);
        const json = await res.json();
        if (json[0]?.Status === "Success" && json[0]?.PostOffice?.length > 0) {
          const po = json[0].PostOffice[0];
          const info: PincodeInfo = {
            area: po.Name,
            district: po.District,
            state: po.State,
          };
          update("pincodeInfo", info);
          update("locality", `${info.area}, ${info.district}, ${info.state}`);
        } else {
          setPincodeError("Invalid pincode. Please enter a valid Indian pincode.");
        }
      } catch {
        setPincodeError("Could not fetch pincode details. Please try again.");
      } finally {
        setPincodeLoading(false);
      }
    }
  }, []);

  // Welcome screen
  if (currentStep === 0 && !isComplete) {
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-hidden">
      <div className="shadow-2xl w-full max-w-5xl bg-white overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Image */}
          <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gray-200">
            <img src={mibbs2} alt="MIBBS Visual" className="max-w-full h-auto object-contain" />
          </div>

          {/* Right Side - Forms */}
          <div className="p-8 bg-white h-full">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-mibbs-gradient rounded-lg flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
                   <h2 className="text-white font-bold">M</h2>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">MIBBS</h2>
              </div>
              <button onClick={() => setShowAuthModal(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors">
                <X className="w-6 h-6"/>
              </button>
            </div>

            {/* Title / Subtitle */}
            <h3 className="text-xl font-semibold mb-1">
              {/* {view === 'LOGIN' && 'Welcome Back'} */}
              {/* {view === 'SIGNUP' && 'Create Account'} */}
              {view === 'FORGOT' && 'Reset Password'}
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              {view === 'LOGIN' && 'Login to your MIBBS account'}
              {view === 'SIGNUP' && 'Sign up to get started'}
              {view === 'FORGOT' && (
                fpStep === 1 ? 'Enter your email to receive a code' :
                fpStep === 2 ? 'Enter the code sent to your email' :
                'Create a new strong password'
              )}
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

            {/* --- FORGOT PASSWORD FLOW --- */}
            {view === 'FORGOT' && (
              <div className="space-y-4">
                
                {/* STEP 1: EMAIL */}
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
                        />
                      </div>
                      {errors.forgotEmail && <p className="text-xs text-red-600 mt-1">{errors.forgotEmail}</p>}
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-mibbs-gradient text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all">
                      {isLoading ? 'Sending...' : 'Send Verification Code'}
                    </button>
                  </form>
                )}

                {/* STEP 2: OTP */}
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
                        />
                      </div>
                      {errors.otp && <p className="text-xs text-red-600 mt-1">{errors.otp}</p>}
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-mibbs-gradient text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all">
                      {isLoading ? 'Verifying...' : 'Verify & Proceed'}
                    </button>
                    <button type="button" onClick={() => setFpStep(1)} className="text-xs text-blue-600 hover:underline w-full text-center">
                      Change Email
                    </button>
                  </form>
                )}

                {/* STEP 3: RESET PASSWORD */}
                {fpStep === 3 && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="New Password"
                        />
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.newPassword && <p className="text-xs text-red-600 mt-1">{errors.newPassword}</p>}
                    </div>

                    <div>
                      <div className="relative">
                        <input
                          type={showConfirmNewPassword ? 'text' : 'password'}
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Confirm New Password"
                        />
                        <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmNewPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmNewPassword}</p>}
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full bg-mibbs-gradient text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all">
                      {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </form>
                )}

                {/* Back to Login Button */}
                <div className="mt-4 text-center">
                  <button type="button" onClick={resetToLogin} className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-blue-600 mx-auto transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Login</span>
                  </button>
                </div>
              </div>
            )}

            {/* --- LOGIN / SIGNUP FLOW --- */}
            {view !== 'FORGOT' && (
              <form onSubmit={handleLoginOrSignup} className="space-y-4">
                {/* Username (Signup Only) */}
                {view === 'SIGNUP' && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-colors"
                      placeholder="Username"
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="Email address"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                {/* Mobile (Signup Only) */}
                {view === 'SIGNUP' && (
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${errors.mobile ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder="Mobile number"
                      />
                    </div>
                    {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
                  </div>
                )}

                {/* Password */}
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="Password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password (Signup Only) */}
                {view === 'SIGNUP' && (
                  <div>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-4 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder="Confirm password"
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}

                {/* Extras: Remember Me & Forgot Password */}
                {view === 'LOGIN' && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-xs text-gray-600">Remember me</span>
                    </label>
                    <button type="button" onClick={() => { setView('FORGOT'); setFpStep(1); }} className="text-xs text-blue-600 hover:text-purple-600 font-semibold">
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Terms (Signup Only) */}
                {view === 'SIGNUP' && (
                  <div>
                    <label className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="mt-0.6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-xs text-gray-600">
                        I agree to the <a href="/terms-and-conditions" className="text-blue-600">Terms</a> & <a href="/privacy-policy" className="text-blue-600">Privacy Policy</a>
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="text-xs text-red-600 mt-1">{errors.agreeToTerms}</p>}
                  </div>
                )}

                {/* Main Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-mibbs-gradient text-white py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : (view === 'LOGIN' ? 'Sign In' : 'Create Account')}
                </button>
                {/* -------- LOGIN WITH OTP (ADDED BELOW LOGIN INPUTS) -------- */}
                {view === 'LOGIN' && (
                  <div className="mt-6 border-t pt-4">
                    <p className="text-center text-xs text-gray-500 mb-3">
                      Or login using OTP
                    </p>

                    <div className="space-y-3">
                      <input
                        type="tel"
                        value={loginOtpMobile}
                        onChange={(e) => setLoginOtpMobile(e.target.value)}
                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Registered mobile number"
                      />

                      {loginOtpStep === 2 && (
                        <input
                          type="text"
                          value={loginOtp}
                          onChange={(e) => setLoginOtp(e.target.value)}
                          className="w-full px-4 py-2.5 border rounded-lg text-center tracking-widest focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Enter OTP"
                        />
                      )}

                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={handleLoginWithOtp}
                        className="w-full bg-mibbs-gradient text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-all disabled:opacity-50"
                      >
                        {isLoading
                          ? 'Processing...'
                          : loginOtpStep === 1
                            ? 'Send OTP'
                            : 'Verify & Login'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}

            {/* Toggle Login/Signup */}
            {view !== 'FORGOT' && (
              <div className="mt-4 text-center text-sm text-gray-600">
                {view === 'LOGIN' ? (
                  <>Don't have an account? <button onClick={() => setView('SIGNUP')} className="text-blue-600 font-semibold hover:underline">Sign Up</button></>
                ) : (
                  <>Already have an account? <button onClick={() => setView('LOGIN')} className="text-blue-600 font-semibold hover:underline">Sign In</button></>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
    );
  }

  // Complete screen
  if (isComplete && currentStep >= totalSteps) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg glass-card p-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">You're All Set! 🎉</h2>
          <p className="text-muted-foreground text-lg mb-3">Thank you, <span className="text-primary font-semibold">{data.name}</span>!</p>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-10">
            Your personalised business insights are being prepared. We'll use your responses to create a tailored experience just for you.
          </p>
          <div className="glass-card p-6 text-left space-y-3">
            <h3 className="text-sm font-semibold font-display text-primary mb-3">Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-muted-foreground">Business:</span> <span className="text-foreground font-medium">{data.businessName || "New Business"}</span></div>
              <div><span className="text-muted-foreground">Stage:</span> <span className="text-foreground font-medium capitalize">{data.businessStage?.replace("_", " ")}</span></div>
              <div><span className="text-muted-foreground">Industry:</span> <span className="text-foreground font-medium">{data.industry}</span></div>
              <div><span className="text-muted-foreground">Location:</span> <span className="text-foreground font-medium">{data.pincode}</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepWrapper stepKey="step1" icon={<User className="w-6 h-6" />} title="Basic Details" subtitle="Let's start with some basic information about you and your business.">
            <TextInput label="What should we call you?" value={data.name} onChange={(v) => update("name", v)} placeholder="Enter your name" hint="This helps us personalise your experience." />
            <div className="pt-2">
              <TextInput label="What is the name of your business?" value={data.businessName} onChange={(v) => update("businessName", v)} placeholder="Enter business name" hint="This will be shown on your dashboard and reports." disabled={data.noBusinessName} />
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={data.noBusinessName} onChange={(e) => { update("noBusinessName", e.target.checked); if (e.target.checked) update("businessName", ""); }}
                  className="w-4 h-4 rounded border-border bg-input accent-primary" />
                <span className="text-xs text-muted-foreground">I don't have a business name yet</span>
              </label>
            </div>

            <div className="pt-4">
              <p className="text-sm font-medium text-foreground font-display mb-1">Do you have a website?</p>
              <p className="text-xs text-muted-foreground mb-3">It's completely okay if you don't — many businesses start without one.</p>
              <div className="grid grid-cols-2 gap-3">
                <OptionCard selected={data.hasWebsite === "yes"} onClick={() => update("hasWebsite", "yes")} icon={<Globe className="w-4 h-4" />} title="Yes, I have a website" compact />
                <OptionCard selected={data.hasWebsite === "no"} onClick={() => update("hasWebsite", "no")} icon={<Monitor className="w-4 h-4" />} title="Not built yet" compact />
              </div>
              {data.hasWebsite === "yes" && (
                <div className="mt-3">
                  <TextInput label="Website URL" value={data.websiteUrl} onChange={(v) => update("websiteUrl", v)} placeholder="https://yourwebsite.com" />
                </div>
              )}
            </div>

            <div className="pt-4">
              <p className="text-sm font-medium text-foreground font-display mb-1">What stage is your business in right now?</p>
              <p className="text-xs text-muted-foreground mb-3">Based on this, we'll ask the right questions for you.</p>
              <div className="grid grid-cols-2 gap-3">
                <OptionCard selected={data.businessStage === "not_started"} onClick={() => update("businessStage", "not_started")} icon={<Rocket className="w-4 h-4" />} title="Haven't started yet" description="I'm planning to start my business" compact />
                <OptionCard selected={data.businessStage === "early"} onClick={() => update("businessStage", "early")} icon={<Sparkles className="w-4 h-4" />} title="Early Stage" description="Just getting started" compact />
                <OptionCard selected={data.businessStage === "growing"} onClick={() => update("businessStage", "growing")} icon={<TrendingUp className="w-4 h-4" />} title="Growing" description="Business is running & growing" compact />
                <OptionCard selected={data.businessStage === "advanced"} onClick={() => update("businessStage", "advanced")} icon={<Award className="w-4 h-4" />} title="Advanced" description="Well established business" compact />
              </div>
            </div>
          </StepWrapper>
        );

      case 2:
        return (
          <StepWrapper stepKey="step2" icon={<MapPin className="w-6 h-6" />} title="Business Location" subtitle="Where will your business be located? Location affects customer behaviour and costs.">
            <TextInput label="Enter your Pincode" value={data.pincode} onChange={handlePincodeChange} placeholder="e.g. 400001" type="text" hint="Enter any 6-digit Indian pincode to auto-detect your area." />
            
            {pincodeLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mt-3 p-3 rounded-lg bg-muted border border-border">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span className="text-sm text-muted-foreground">Looking up pincode...</span>
              </motion.div>
            )}

            {pincodeError && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-sm text-destructive">{pincodeError}</span>
              </motion.div>
            )}

            {data.pincodeInfo && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 glass-card p-5 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold font-display text-primary">Location Detected</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Area</p>
                    <p className="text-sm font-medium text-foreground">{data.pincodeInfo.area}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">District</p>
                    <p className="text-sm font-medium text-foreground">{data.pincodeInfo.district}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">State</p>
                    <p className="text-sm font-medium text-foreground">{data.pincodeInfo.state}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </StepWrapper>
        );

      case 3:
        return (
          <StepWrapper stepKey="step3" icon={<Factory className="w-6 h-6" />} title="Business Category" subtitle="Which industry does your business belong to? Choose the closest option.">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {INDUSTRIES.map((ind) => (
                <OptionCard key={ind} selected={data.industry === ind} onClick={() => update("industry", ind)} title={ind} compact />
              ))}
            </div>

            <div className="pt-6">
              <p className="text-sm font-medium text-foreground font-display mb-1">What will you mainly offer to customers?</p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <OptionCard selected={data.offerType === "product"} onClick={() => { update("offerType", "product"); setShowProductPopup(true); }} icon={<Package className="w-4 h-4" />} title="Products" description="Things people buy" />
                <OptionCard selected={data.offerType === "service"} onClick={() => { update("offerType", "service"); update("productModel", null); setShowProductPopup(false); }} icon={<Wrench className="w-4 h-4" />} title="Services" description="Work you do for people" />
              </div>
            </div>

            {/* Product Model Popup */}
            <AnimatePresence>
              {showProductPopup && data.offerType === "product" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass-card p-5 mt-4">
                    <p className="text-sm font-medium text-foreground font-display mb-3">What type of product business?</p>
                    <div className="grid grid-cols-3 gap-3">
                      <OptionCard selected={data.productModel === "b2b"} onClick={() => { update("productModel", "b2b"); setShowProductPopup(false); }} title="B2B" description="Business to Business" compact />
                      <OptionCard selected={data.productModel === "b2c"} onClick={() => { update("productModel", "b2c"); setShowProductPopup(false); }} title="B2C" description="Business to Consumer" compact />
                      <OptionCard selected={data.productModel === "d2c"} onClick={() => { update("productModel", "d2c"); setShowProductPopup(false); }} title="D2C" description="Direct to Consumer" compact />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </StepWrapper>
        );

      case 4:
        if (businessPath === "new") {
          return (
            <StepWrapper stepKey="step4-new" icon={<DollarSign className="w-6 h-6" />} title="Capital / Starting Budget" subtitle="How much money are you planning to invest? This helps us suggest realistic marketing plans.">
              <div className="space-y-3">
                <OptionCard selected={data.capitalRange === "less_1l"} onClick={() => update("capitalRange", "less_1l")} icon={<DollarSign className="w-4 h-4" />} title="Less than ₹1,00,000" />
                <OptionCard selected={data.capitalRange === "1l_5l"} onClick={() => update("capitalRange", "1l_5l")} icon={<DollarSign className="w-4 h-4" />} title="₹1,00,000 - ₹5,00,000" />
                <OptionCard selected={data.capitalRange === "more_5l"} onClick={() => update("capitalRange", "more_5l")} icon={<DollarSign className="w-4 h-4" />} title="More than ₹5,00,000" />
              </div>
            </StepWrapper>
          );
        }
        return (
          <StepWrapper stepKey="step4-existing" icon={<Calendar className="w-6 h-6" />} title="Business Experience" subtitle="How long have you been running this business? This helps us understand your experience level.">
            <div className="space-y-3">
              <OptionCard selected={data.yearsInBusiness === "less_1"} onClick={() => update("yearsInBusiness", "less_1")} icon={<Calendar className="w-4 h-4" />} title="Less than 1 year" />
              <OptionCard selected={data.yearsInBusiness === "1_3"} onClick={() => update("yearsInBusiness", "1_3")} icon={<Calendar className="w-4 h-4" />} title="1 - 3 years" />
              <OptionCard selected={data.yearsInBusiness === "3_5"} onClick={() => update("yearsInBusiness", "3_5")} icon={<Calendar className="w-4 h-4" />} title="3 - 5 years" />
              <OptionCard selected={data.yearsInBusiness === "more_5"} onClick={() => update("yearsInBusiness", "more_5")} icon={<Calendar className="w-4 h-4" />} title="More than 5 years" />
            </div>
          </StepWrapper>
        );

      case 5:
        if (businessPath === "new") {
          return (
            <StepWrapper stepKey="step5-new" icon={<Store className="w-6 h-6" />} title="Business Mode" subtitle="How do you want to start your business?">
              <div className="grid grid-cols-2 gap-4">
                <OptionCard selected={data.businessMode === "offline"} onClick={() => update("businessMode", "offline")} icon={<Store className="w-5 h-5" />} title="Offline" description="Shop, office, physical location" />
                <OptionCard selected={data.businessMode === "online"} onClick={() => update("businessMode", "online")} icon={<Globe className="w-5 h-5" />} title="Online" description="Website, Instagram, WhatsApp, apps" />
              </div>
            </StepWrapper>
          );
        }
        return (
          <StepWrapper stepKey="step5-existing" icon={<AlertTriangle className="w-6 h-6" />} title="Business Challenges" subtitle="Tell us what's bothering your business right now. Select all that feel true.">
            <div className="space-y-2.5">
              {CHALLENGES.map((c) => (
                <OptionCard key={c.id} selected={data.challenges.includes(c.id)} onClick={() => toggleArrayItem("challenges", c.id)} icon={c.icon} title={c.title} description={c.desc} compact />
              ))}
            </div>
          </StepWrapper>
        );

      case 6:
        if (businessPath === "new") {
          return (
            <StepWrapper stepKey="step6-new" icon={<HelpCircle className="w-6 h-6" />} title="What Help Do You Need?" subtitle="What do you need most help with right now? Select all that apply.">
              <div className="grid grid-cols-2 gap-3">
                {HELP_OPTIONS.map((h) => (
                  <OptionCard key={h.id} selected={data.helpNeeded.includes(h.id)} onClick={() => toggleArrayItem("helpNeeded", h.id)} icon={h.icon} title={h.title} description={h.desc} compact />
                ))}
              </div>
            </StepWrapper>
          );
        }
        return (
          <StepWrapper stepKey="step6-existing" icon={<Monitor className="w-6 h-6" />} title="Digital Presence" subtitle="How active is your business online? Select your level and choose the channels you use.">
            <div className="space-y-3">
              <OptionCard selected={data.digitalPresence === "none"} onClick={() => { update("digitalPresence", "none"); update("digitalChannels", []); update("roi", ""); }} icon={<Monitor className="w-4 h-4" />} title="No digital presence" description="Haven't started online yet" />
              <OptionCard selected={data.digitalPresence === "basic"} onClick={() => { update("digitalPresence", "basic"); update("digitalChannels", []); update("roi", ""); }} icon={<Smartphone className="w-4 h-4" />} title="Basic" description="Social media platforms" />
              <OptionCard selected={data.digitalPresence === "growing"} onClick={() => { update("digitalPresence", "growing"); update("digitalChannels", []); update("roi", ""); }} icon={<TrendingUp className="w-4 h-4" />} title="Growing" description="Active marketing efforts" />
              <OptionCard selected={data.digitalPresence === "advanced"} onClick={() => { update("digitalPresence", "advanced"); update("digitalChannels", []); update("roi", ""); }} icon={<BarChart3 className="w-4 h-4" />} title="Advanced" description="Full digital marketing stack" />
            </div>

            {/* Basic sub-options */}
            <AnimatePresence>
              {data.digitalPresence === "basic" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="glass-card p-5 mt-4">
                    <p className="text-sm font-medium text-foreground font-display mb-3">Which platforms do you use?</p>
                    <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
                    <div className="grid grid-cols-3 gap-3">
                      <OptionCard selected={data.digitalChannels.includes("facebook")} onClick={() => toggleArrayItem("digitalChannels", "facebook")} title="Facebook" compact />
                      <OptionCard selected={data.digitalChannels.includes("instagram")} onClick={() => toggleArrayItem("digitalChannels", "instagram")} title="Instagram" compact />
                      <OptionCard selected={data.digitalChannels.includes("whatsapp")} onClick={() => toggleArrayItem("digitalChannels", "whatsapp")} title="WhatsApp" compact />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Growing sub-options */}
            <AnimatePresence>
              {data.digitalPresence === "growing" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="glass-card p-5 mt-4">
                    <p className="text-sm font-medium text-foreground font-display mb-3">What marketing activities are you doing?</p>
                    <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
                    <div className="grid grid-cols-2 gap-3">
                      <OptionCard selected={data.digitalChannels.includes("ad_campaigns")} onClick={() => toggleArrayItem("digitalChannels", "ad_campaigns")} title="Ad Campaigns" compact />
                      <OptionCard selected={data.digitalChannels.includes("content_creation")} onClick={() => toggleArrayItem("digitalChannels", "content_creation")} title="Content Creation" compact />
                      <OptionCard selected={data.digitalChannels.includes("brand_marketing")} onClick={() => toggleArrayItem("digitalChannels", "brand_marketing")} title="Brand Marketing" compact />
                      <OptionCard selected={data.digitalChannels.includes("influencer_marketing")} onClick={() => toggleArrayItem("digitalChannels", "influencer_marketing")} title="Influencer Marketing" compact />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Advanced sub-options */}
            <AnimatePresence>
              {data.digitalPresence === "advanced" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="glass-card p-5 mt-4">
                    <p className="text-sm font-medium text-foreground font-display mb-3">What advanced activities are you doing?</p>
                    <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
                    <div className="grid grid-cols-2 gap-3">
                      <OptionCard selected={data.digitalChannels.includes("ad_campaigns")} onClick={() => toggleArrayItem("digitalChannels", "ad_campaigns")} title="Ad Campaigns" compact />
                      <OptionCard selected={data.digitalChannels.includes("content_creation")} onClick={() => toggleArrayItem("digitalChannels", "content_creation")} title="Content Creation" compact />
                      <OptionCard selected={data.digitalChannels.includes("brand_marketing")} onClick={() => toggleArrayItem("digitalChannels", "brand_marketing")} title="Brand Marketing" compact />
                      <OptionCard selected={data.digitalChannels.includes("influencer_marketing")} onClick={() => toggleArrayItem("digitalChannels", "influencer_marketing")} title="Influencer Marketing" compact />
                      <OptionCard selected={data.digitalChannels.includes("ecommerce")} onClick={() => toggleArrayItem("digitalChannels", "ecommerce")} title="E-commerce Websites" compact />
                    </div>
                    <div className="mt-4">
                      <TextInput label="ROI (Return on Investment)" value={data.roi} onChange={(v) => update("roi", v.replace(/\D/g, ""))} placeholder="Enter numeric value" hint="What is your approximate ROI percentage?" type="text" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </StepWrapper>
        );

      case 7:
        if (businessPath === "existing") {
          return (
            <StepWrapper stepKey="step7" icon={<BarChart3 className="w-6 h-6" />} title="Revenue & Marketing Spend" subtitle="Based on the last 2-3 months, an approximate number is perfectly fine.">
              <TextInput label="What is your average monthly revenue?" value={data.monthlyRevenue} onChange={(v) => update("monthlyRevenue", v)} placeholder="e.g. ₹50,000" hint="On average, how much does your business earn in a month?" />
              <div className="pt-4">
                <p className="text-sm font-medium text-foreground font-display mb-1">Monthly marketing spend?</p>
                <p className="text-xs text-muted-foreground mb-3">How much do you spend on promoting your brand each month?</p>
                <div className="space-y-3">
                  <OptionCard selected={data.marketingSpend === "less_10k"} onClick={() => update("marketingSpend", "less_10k")} title="Less than ₹10,000" compact />
                  <OptionCard selected={data.marketingSpend === "10k_1l"} onClick={() => update("marketingSpend", "10k_1l")} title="₹10,000 - ₹1,00,000" compact />
                  <OptionCard selected={data.marketingSpend === "more_1l"} onClick={() => update("marketingSpend", "more_1l")} title="More than ₹1,00,000" compact />
                </div>
              </div>
            </StepWrapper>
          );
        }
        return null;

      case 8:
        if (businessPath === "existing") {
          return (
            <StepWrapper stepKey="step8" icon={<Target className="w-6 h-6" />} title="Brand Objectives" subtitle="What do you want your business to achieve next? Choose up to 4 that matter most.">
              <div className="space-y-2.5">
                {OBJECTIVES.map((o) => (
                  <OptionCard key={o.id} selected={data.brandObjectives.includes(o.id)} onClick={() => toggleArrayItem("brandObjectives", o.id, 4)} icon={o.icon} title={o.title} description={o.desc} compact />
                ))}
              </div>
              {data.brandObjectives.length > 0 && (
                <p className="text-xs text-muted-foreground text-center mt-2">{data.brandObjectives.length}/4 selected</p>
              )}
            </StepWrapper>
          );
        }
        return null;

      default:
        return null;
    }
  };




return (
<>
  {/* ✅ AUTH MODAL */}
  {showAuthModal && (
    <SignupModal
      isOpen={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      onComplete={(user) => {

        console.log("Login success:", user);

        // ✅ CLOSE MODAL
        setShowAuthModal(false);

        // ✅ IMPORTANT FIX
        setIsComplete(false);

        // ✅ START FROM STEP 1
        setCurrentStep(1);
      }}
    />
  )}

  {/* ✅ MAIN APP AFTER LOGIN */}
  {!showAuthModal && (

    <>
      {/* ✅ COMPLETE SCREEN (ONLY AFTER LAST STEP) */}
      {isComplete && currentStep >= totalSteps ? (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <h2 className="text-2xl font-bold">You're All Set! 🎉</h2>
        </div>
      ) : (

        <>
          {/* ✅ STEP 0 (WELCOME) */}
          {currentStep === 0 && (
            <div className="min-h-screen flex items-center justify-center p-4 bg-background">
              <motion.div className="text-center max-w-xl">

                <motion.div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8">
                  <Sparkles className="w-10 h-10 text-primary-foreground" />
                </motion.div>

                <h1 className="text-4xl font-bold mb-4">
                  Welcome to MIBBS
                </h1>

                <motion.button
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-4 rounded-xl gradient-btn"
                >
                  Let's Get Started
                </motion.button>

              </motion.div>
            </div>
          )}

          {/* ✅ QUESTIONNAIRE STEPS */}
          {currentStep !== 0 && (
            <div className="min-h-screen bg-background flex flex-col items-center py-6 px-4">

              <h1 className="text-2xl md:text-3xl font-bold font-display gradient-text mb-6">
                MIBBS Registration
              </h1>

              <div className="w-full max-w-3xl glass-card p-6">

                <ProgressBar
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  stepLabels={stepLabels}
                />

                <div className="min-h-[400px]">
                  {renderStep()}
                </div>

                <div className="flex justify-between mt-6">
                  {/* <button onClick={prevStep}>
                    <ArrowLeft /> Back
                  </button> */}

                  {/* <button onClick={nextStep}>
                    {currentStep >= totalSteps ? "Finish" : "Continue"}
                    <ArrowRight />
                  </button> */}
                </div>
                <div className="flex items-center justify-between">
          <motion.button
            onClick={prevStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium border border-border
              text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          <motion.button
            onClick={nextStep}
            disabled={!canProceed()}
            whileHover={canProceed() ? { scale: 1.05 } : {}}
            whileTap={canProceed() ? { scale: 0.95 } : {}}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold font-display transition-all duration-300
              ${canProceed()
                ? "gradient-btn hover:shadow-lg hover:shadow-primary/25"
                : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
          >
            {currentStep >= totalSteps ? "Complete" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
              </div>             
            </div>
          )};
        </>
      )}
    </>
  )}
</>
);
};
export default MIBBSQuestionnaire;





































// import { useState, useMemo, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, ArrowRight, Sparkles, User, Building2, Globe, Rocket, MapPin, Factory, Package, Wrench, DollarSign, Monitor, HelpCircle, Calendar, AlertTriangle, BarChart3, Target, CheckCircle2, ShoppingCart, Briefcase, Store, Smartphone, BookOpen, FileText, Users, TrendingUp, Heart, Shield, Eye, Megaphone, Zap, Award, Loader2 } from "lucide-react";
// import ProgressBar from "@/componentsfour/questionnaire/ProgressBar";
// import StepWrapper from "@/componentsfour/questionnaire/StepWrapper";
// import OptionCard from "@/componentsfour/questionnaire/OptionCard";
// import TextInput from "@/componentsfour/questionnaire/TextInput";
// import { QuestionnaireData, initialData, BusinessPath, PincodeInfo } from "@/types/questionnaire";

// const INDUSTRIES = [
//   "Food & Beverages", "Retail & E-commerce", "Health & Wellness", "Education & Training",
//   "Beauty & Personal Care", "Real Estate", "Technology & IT", "Fashion & Apparel",
//   "Automotive", "Home Services", "Travel & Tourism", "Finance & Insurance",
//   "Entertainment & Media", "Agriculture", "Manufacturing", "Other"
// ];

// const CHALLENGES = [
//   { id: "low_footfall", title: "Not enough people are coming to us", desc: "We want more customers, but footfall or enquiries feel low.", icon: <Users className="w-4 h-4" /> },
//   { id: "low_conversion", title: "People ask, but don't buy", desc: "Customers show interest, but most don't go ahead and purchase.", icon: <ShoppingCart className="w-4 h-4" /> },
//   { id: "no_tracking", title: "We don't know what's actually working", desc: "We try different ways to promote, but can't tell what brings customers.", icon: <Eye className="w-4 h-4" /> },
//   { id: "wasted_spend", title: "Promotions feel like wasted money", desc: "We spend money to promote, but the results aren't clear.", icon: <DollarSign className="w-4 h-4" /> },
//   { id: "confused", title: "Marketing feels confusing", desc: "We're unsure how to promote our business in the right way.", icon: <HelpCircle className="w-4 h-4" /> },
//   { id: "competition", title: "Too many businesses like ours", desc: "There are many similar businesses fighting for the same customers.", icon: <AlertTriangle className="w-4 h-4" /> },
//   { id: "budget_tight", title: "We have to be very careful with spending", desc: "Our marketing budget is limited, so mistakes are costly.", icon: <Shield className="w-4 h-4" /> },
//   { id: "no_retention", title: "Customers don't come back", desc: "People buy once, but rarely return again.", icon: <Heart className="w-4 h-4" /> },
//   { id: "no_online", title: "Hardly anyone finds us online", desc: "Few people see or discover our business on the internet.", icon: <Globe className="w-4 h-4" /> },
//   { id: "no_direction", title: "We're not sure what to do next", desc: "We want to grow, but don't have a clear direction.", icon: <Target className="w-4 h-4" /> },
// ];

// const OBJECTIVES = [
//   { id: "awareness", title: "More people should know about my business", desc: "Right now, many people don't know we exist — we want to be seen and recognised.", icon: <Megaphone className="w-4 h-4" /> },
//   { id: "leads", title: "I want more calls, messages, or enquiries", desc: "I want more people to reach out and ask about what we offer.", icon: <Smartphone className="w-4 h-4" /> },
//   { id: "online_sales", title: "I want to increase online sales", desc: "More people should buy from us through the internet.", icon: <ShoppingCart className="w-4 h-4" /> },
//   { id: "retention", title: "I want customers to come back again", desc: "Getting repeat customers is more important than one-time sales.", icon: <Heart className="w-4 h-4" /> },
//   { id: "trust", title: "I want people to trust my brand", desc: "When customers see us, they should feel confident choosing us.", icon: <Shield className="w-4 h-4" /> },
//   { id: "optimize", title: "I want to stop wasting money on marketing", desc: "I want my money to be spent wisely, not blindly.", icon: <Zap className="w-4 h-4" /> },
//   { id: "stable_income", title: "I want steady income every month", desc: "I want predictable, stable sales — not ups and downs.", icon: <TrendingUp className="w-4 h-4" /> },
//   { id: "local", title: "I want to be well-known in my local area", desc: "People nearby should think of us first when they need this product/service.", icon: <MapPin className="w-4 h-4" /> },
//   { id: "online_presence", title: "I want my business to look strong online", desc: "My website or social media should look active, clear, and professional.", icon: <Monitor className="w-4 h-4" /> },
//   { id: "clarity", title: "I want to know what is actually working", desc: "I want clarity on what brings results, so I can do more of it.", icon: <BarChart3 className="w-4 h-4" /> },
// ];

// const HELP_OPTIONS = [
//   { id: "legal", title: "Paperwork / Legal", desc: "Licenses, registrations", icon: <FileText className="w-4 h-4" /> },
//   { id: "money", title: "Money Planning", desc: "How much to spend where", icon: <DollarSign className="w-4 h-4" /> },
//   { id: "customers", title: "Finding Customers", desc: "First few clients", icon: <Users className="w-4 h-4" /> },
//   { id: "skills", title: "Skills / Knowledge", desc: "How to do the work", icon: <BookOpen className="w-4 h-4" /> },
//   { id: "online", title: "Online Setup", desc: "Website, social media", icon: <Monitor className="w-4 h-4" /> },
//   { id: "everything", title: "Everything", desc: "Complete guidance", icon: <Sparkles className="w-4 h-4" /> },
// ];

// const MIBBSQuestionnaire = () => {
//   const [data, setData] = useState<QuestionnaireData>(initialData);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [showProductPopup, setShowProductPopup] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);
//   const [pincodeLoading, setPincodeLoading] = useState(false);
//   const [pincodeError, setPincodeError] = useState("");

//   const businessPath: BusinessPath | null = useMemo(() => {
//     if (data.businessStage === "not_started") return "new";
//     if (data.businessStage && ["early", "growing", "advanced"].includes(data.businessStage)) return "existing";
//     return null;
//   }, [data.businessStage]);

//   const stepLabels = useMemo(() => {
//     if (businessPath === "new") return ["Details", "Location", "Industry", "Capital", "Mode", "Help"];
//     if (businessPath === "existing") return ["Details", "Location", "Industry", "Experience", "Challenges", "Digital", "Revenue", "Objectives"];
//     return ["Details", "Location", "Industry"];
//   }, [businessPath]);

//   const totalSteps = stepLabels.length;

//   const update = <K extends keyof QuestionnaireData>(key: K, val: QuestionnaireData[K]) => {
//     setData((prev) => ({ ...prev, [key]: val }));
//   };

//   const toggleArrayItem = (key: "challenges" | "helpNeeded" | "brandObjectives" | "digitalChannels", item: string, max?: number) => {
//     setData((prev) => {
//       const arr = prev[key];
//       if (arr.includes(item)) return { ...prev, [key]: arr.filter((x) => x !== item) };
//       if (max && arr.length >= max) return prev;
//       return { ...prev, [key]: [...arr, item] };
//     });
//   };

//   const canProceed = (): boolean => {
//     switch (currentStep) {
//       case 0: return true;
//       case 1: return data.name.trim().length > 0 && (data.businessName.trim().length > 0 || data.noBusinessName) && data.hasWebsite !== null && data.businessStage !== null;
//       case 2: return data.pincode.trim().length >= 5;
//       case 3: return data.industry.length > 0 && data.offerType !== null;
//       case 4:
//         if (businessPath === "new") return data.capitalRange.length > 0;
//         if (businessPath === "existing") return data.yearsInBusiness.length > 0;
//         return false;
//       case 5:
//         if (businessPath === "new") return data.businessMode !== null;
//         if (businessPath === "existing") return data.challenges.length > 0;
//         return false;
//       case 6:
//         if (businessPath === "new") return data.helpNeeded.length > 0;
//         if (businessPath === "existing") return data.digitalPresence !== null;
//         return false;
//       case 7:
//         if (businessPath === "existing") return data.monthlyRevenue.trim().length > 0 && data.marketingSpend.length > 0;
//         return false;
//       case 8:
//         if (businessPath === "existing") return data.brandObjectives.length > 0;
//         return false;
//       default: return true;
//     }
//   };

//   const nextStep = () => {
//     if (currentStep >= totalSteps) {
//       setIsComplete(true);
//       return;
//     }
//     setCurrentStep((s) => s + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 0) setCurrentStep((s) => s - 1);
//   };

//   const handlePincodeChange = useCallback(async (val: string) => {
//     const clean = val.replace(/\D/g, "").slice(0, 6);
//     update("pincode", clean);
//     update("pincodeInfo", null);
//     update("locality", "");
//     setPincodeError("");

//     if (clean.length === 6) {
//       setPincodeLoading(true);
//       try {
//         const res = await fetch(`https://api.postalpincode.in/pincode/${clean}`);
//         const json = await res.json();
//         if (json[0]?.Status === "Success" && json[0]?.PostOffice?.length > 0) {
//           const po = json[0].PostOffice[0];
//           const info: PincodeInfo = {
//             area: po.Name,
//             district: po.District,
//             state: po.State,
//           };
//           update("pincodeInfo", info);
//           update("locality", `${info.area}, ${info.district}, ${info.state}`);
//         } else {
//           setPincodeError("Invalid pincode. Please enter a valid Indian pincode.");
//         }
//       } catch {
//         setPincodeError("Could not fetch pincode details. Please try again.");
//       } finally {
//         setPincodeLoading(false);
//       }
//     }
//   }, []);

//   // Welcome screen
//   if (currentStep === 0 && !isComplete) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4 bg-background">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center max-w-xl"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
//             className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8"
//           >
//             <Sparkles className="w-10 h-10 text-primary-foreground" />
//           </motion.div>
//           <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
//             Welcome to <span className="gradient-text">MIBBS</span>
//           </h1>
//           <p className="text-muted-foreground text-lg mb-2">Tell us a bit about yourself!</p>
//           <p className="text-muted-foreground text-sm mb-10 max-w-md mx-auto">
//             This quick questionnaire helps us understand your business so we can personalise your experience.
//           </p>
//           <motion.button
//             onClick={() => setCurrentStep(1)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-4 rounded-xl gradient-btn text-lg
//               hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-300"
//           >
//             Let's Get Started
//             <ArrowRight className="w-5 h-5 inline ml-2" />
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   // Complete screen
//   if (isComplete) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4 bg-background">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center max-w-lg glass-card p-10"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 150 }}
//             className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8"
//           >
//             <CheckCircle2 className="w-12 h-12 text-primary" />
//           </motion.div>
//           <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">You're All Set! 🎉</h2>
//           <p className="text-muted-foreground text-lg mb-3">Thank you, <span className="text-primary font-semibold">{data.name}</span>!</p>
//           <p className="text-muted-foreground text-sm max-w-md mx-auto mb-10">
//             Your personalised business insights are being prepared. We'll use your responses to create a tailored experience just for you.
//           </p>
//           <div className="glass-card p-6 text-left space-y-3">
//             <h3 className="text-sm font-semibold font-display text-primary mb-3">Summary</h3>
//             <div className="grid grid-cols-2 gap-3 text-xs">
//               <div><span className="text-muted-foreground">Business:</span> <span className="text-foreground font-medium">{data.businessName || "New Business"}</span></div>
//               <div><span className="text-muted-foreground">Stage:</span> <span className="text-foreground font-medium capitalize">{data.businessStage?.replace("_", " ")}</span></div>
//               <div><span className="text-muted-foreground">Industry:</span> <span className="text-foreground font-medium">{data.industry}</span></div>
//               <div><span className="text-muted-foreground">Location:</span> <span className="text-foreground font-medium">{data.pincode}</span></div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <StepWrapper stepKey="step1" icon={<User className="w-6 h-6" />} title="Basic Details" subtitle="Let's start with some basic information about you and your business.">
//             <TextInput label="What should we call you?" value={data.name} onChange={(v) => update("name", v)} placeholder="Enter your name" hint="This helps us personalise your experience." />
//             <div className="pt-2">
//               <TextInput label="What is the name of your business?" value={data.businessName} onChange={(v) => update("businessName", v)} placeholder="Enter business name" hint="This will be shown on your dashboard and reports." disabled={data.noBusinessName} />
//               <label className="flex items-center gap-2 mt-2 cursor-pointer">
//                 <input type="checkbox" checked={data.noBusinessName} onChange={(e) => { update("noBusinessName", e.target.checked); if (e.target.checked) update("businessName", ""); }}
//                   className="w-4 h-4 rounded border-border bg-input accent-primary" />
//                 <span className="text-xs text-muted-foreground">I don't have a business name yet</span>
//               </label>
//             </div>

//             <div className="pt-4">
//               <p className="text-sm font-medium text-foreground font-display mb-1">Do you have a website?</p>
//               <p className="text-xs text-muted-foreground mb-3">It's completely okay if you don't — many businesses start without one.</p>
//               <div className="grid grid-cols-2 gap-3">
//                 <OptionCard selected={data.hasWebsite === "yes"} onClick={() => update("hasWebsite", "yes")} icon={<Globe className="w-4 h-4" />} title="Yes, I have a website" compact />
//                 <OptionCard selected={data.hasWebsite === "no"} onClick={() => update("hasWebsite", "no")} icon={<Monitor className="w-4 h-4" />} title="Not built yet" compact />
//               </div>
//               {data.hasWebsite === "yes" && (
//                 <div className="mt-3">
//                   <TextInput label="Website URL" value={data.websiteUrl} onChange={(v) => update("websiteUrl", v)} placeholder="https://yourwebsite.com" />
//                 </div>
//               )}
//             </div>

//             <div className="pt-4">
//               <p className="text-sm font-medium text-foreground font-display mb-1">What stage is your business in right now?</p>
//               <p className="text-xs text-muted-foreground mb-3">Based on this, we'll ask the right questions for you.</p>
//               <div className="grid grid-cols-2 gap-3">
//                 <OptionCard selected={data.businessStage === "not_started"} onClick={() => update("businessStage", "not_started")} icon={<Rocket className="w-4 h-4" />} title="Haven't started yet" description="I'm planning to start my business" compact />
//                 <OptionCard selected={data.businessStage === "early"} onClick={() => update("businessStage", "early")} icon={<Sparkles className="w-4 h-4" />} title="Early Stage" description="Just getting started" compact />
//                 <OptionCard selected={data.businessStage === "growing"} onClick={() => update("businessStage", "growing")} icon={<TrendingUp className="w-4 h-4" />} title="Growing" description="Business is running & growing" compact />
//                 <OptionCard selected={data.businessStage === "advanced"} onClick={() => update("businessStage", "advanced")} icon={<Award className="w-4 h-4" />} title="Advanced" description="Well established business" compact />
//               </div>
//             </div>
//           </StepWrapper>
//         );

//       case 2:
//         return (
//           <StepWrapper stepKey="step2" icon={<MapPin className="w-6 h-6" />} title="Business Location" subtitle="Where will your business be located? Location affects customer behaviour and costs.">
//             <TextInput label="Enter your Pincode" value={data.pincode} onChange={handlePincodeChange} placeholder="e.g. 400001" type="text" hint="Enter any 6-digit Indian pincode to auto-detect your area." />
            
//             {pincodeLoading && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mt-3 p-3 rounded-lg bg-muted border border-border">
//                 <Loader2 className="w-4 h-4 text-primary animate-spin" />
//                 <span className="text-sm text-muted-foreground">Looking up pincode...</span>
//               </motion.div>
//             )}

//             {pincodeError && (
//               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
//                 <span className="text-sm text-destructive">{pincodeError}</span>
//               </motion.div>
//             )}

//             {data.pincodeInfo && (
//               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 glass-card p-5 space-y-3">
//                 <div className="flex items-center gap-2 mb-1">
//                   <MapPin className="w-4 h-4 text-primary" />
//                   <span className="text-sm font-semibold font-display text-primary">Location Detected</span>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                   <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
//                     <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Area</p>
//                     <p className="text-sm font-medium text-foreground">{data.pincodeInfo.area}</p>
//                   </div>
//                   <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
//                     <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">District</p>
//                     <p className="text-sm font-medium text-foreground">{data.pincodeInfo.district}</p>
//                   </div>
//                   <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
//                     <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">State</p>
//                     <p className="text-sm font-medium text-foreground">{data.pincodeInfo.state}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </StepWrapper>
//         );

//       case 3:
//         return (
//           <StepWrapper stepKey="step3" icon={<Factory className="w-6 h-6" />} title="Business Category" subtitle="Which industry does your business belong to? Choose the closest option.">
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
//               {INDUSTRIES.map((ind) => (
//                 <OptionCard key={ind} selected={data.industry === ind} onClick={() => update("industry", ind)} title={ind} compact />
//               ))}
//             </div>

//             <div className="pt-6">
//               <p className="text-sm font-medium text-foreground font-display mb-1">What will you mainly offer to customers?</p>
//               <div className="grid grid-cols-2 gap-3 mt-3">
//                 <OptionCard selected={data.offerType === "product"} onClick={() => { update("offerType", "product"); setShowProductPopup(true); }} icon={<Package className="w-4 h-4" />} title="Products" description="Things people buy" />
//                 <OptionCard selected={data.offerType === "service"} onClick={() => { update("offerType", "service"); update("productModel", null); setShowProductPopup(false); }} icon={<Wrench className="w-4 h-4" />} title="Services" description="Work you do for people" />
//               </div>
//             </div>

//             {/* Product Model Popup */}
//             <AnimatePresence>
//               {showProductPopup && data.offerType === "product" && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="overflow-hidden"
//                 >
//                   <div className="glass-card p-5 mt-4">
//                     <p className="text-sm font-medium text-foreground font-display mb-3">What type of product business?</p>
//                     <div className="grid grid-cols-3 gap-3">
//                       <OptionCard selected={data.productModel === "b2b"} onClick={() => { update("productModel", "b2b"); setShowProductPopup(false); }} title="B2B" description="Business to Business" compact />
//                       <OptionCard selected={data.productModel === "b2c"} onClick={() => { update("productModel", "b2c"); setShowProductPopup(false); }} title="B2C" description="Business to Consumer" compact />
//                       <OptionCard selected={data.productModel === "d2c"} onClick={() => { update("productModel", "d2c"); setShowProductPopup(false); }} title="D2C" description="Direct to Consumer" compact />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </StepWrapper>
//         );

//       case 4:
//         if (businessPath === "new") {
//           return (
//             <StepWrapper stepKey="step4-new" icon={<DollarSign className="w-6 h-6" />} title="Capital / Starting Budget" subtitle="How much money are you planning to invest? This helps us suggest realistic marketing plans.">
//               <div className="space-y-3">
//                 <OptionCard selected={data.capitalRange === "less_1l"} onClick={() => update("capitalRange", "less_1l")} icon={<DollarSign className="w-4 h-4" />} title="Less than ₹1,00,000" />
//                 <OptionCard selected={data.capitalRange === "1l_5l"} onClick={() => update("capitalRange", "1l_5l")} icon={<DollarSign className="w-4 h-4" />} title="₹1,00,000 - ₹5,00,000" />
//                 <OptionCard selected={data.capitalRange === "more_5l"} onClick={() => update("capitalRange", "more_5l")} icon={<DollarSign className="w-4 h-4" />} title="More than ₹5,00,000" />
//               </div>
//             </StepWrapper>
//           );
//         }
//         return (
//           <StepWrapper stepKey="step4-existing" icon={<Calendar className="w-6 h-6" />} title="Business Experience" subtitle="How long have you been running this business? This helps us understand your experience level.">
//             <div className="space-y-3">
//               <OptionCard selected={data.yearsInBusiness === "less_1"} onClick={() => update("yearsInBusiness", "less_1")} icon={<Calendar className="w-4 h-4" />} title="Less than 1 year" />
//               <OptionCard selected={data.yearsInBusiness === "1_3"} onClick={() => update("yearsInBusiness", "1_3")} icon={<Calendar className="w-4 h-4" />} title="1 - 3 years" />
//               <OptionCard selected={data.yearsInBusiness === "3_5"} onClick={() => update("yearsInBusiness", "3_5")} icon={<Calendar className="w-4 h-4" />} title="3 - 5 years" />
//               <OptionCard selected={data.yearsInBusiness === "more_5"} onClick={() => update("yearsInBusiness", "more_5")} icon={<Calendar className="w-4 h-4" />} title="More than 5 years" />
//             </div>
//           </StepWrapper>
//         );

//       case 5:
//         if (businessPath === "new") {
//           return (
//             <StepWrapper stepKey="step5-new" icon={<Store className="w-6 h-6" />} title="Business Mode" subtitle="How do you want to start your business?">
//               <div className="grid grid-cols-2 gap-4">
//                 <OptionCard selected={data.businessMode === "offline"} onClick={() => update("businessMode", "offline")} icon={<Store className="w-5 h-5" />} title="Offline" description="Shop, office, physical location" />
//                 <OptionCard selected={data.businessMode === "online"} onClick={() => update("businessMode", "online")} icon={<Globe className="w-5 h-5" />} title="Online" description="Website, Instagram, WhatsApp, apps" />
//               </div>
//             </StepWrapper>
//           );
//         }
//         return (
//           <StepWrapper stepKey="step5-existing" icon={<AlertTriangle className="w-6 h-6" />} title="Business Challenges" subtitle="Tell us what's bothering your business right now. Select all that feel true.">
//             <div className="space-y-2.5">
//               {CHALLENGES.map((c) => (
//                 <OptionCard key={c.id} selected={data.challenges.includes(c.id)} onClick={() => toggleArrayItem("challenges", c.id)} icon={c.icon} title={c.title} description={c.desc} compact />
//               ))}
//             </div>
//           </StepWrapper>
//         );

//       case 6:
//         if (businessPath === "new") {
//           return (
//             <StepWrapper stepKey="step6-new" icon={<HelpCircle className="w-6 h-6" />} title="What Help Do You Need?" subtitle="What do you need most help with right now? Select all that apply.">
//               <div className="grid grid-cols-2 gap-3">
//                 {HELP_OPTIONS.map((h) => (
//                   <OptionCard key={h.id} selected={data.helpNeeded.includes(h.id)} onClick={() => toggleArrayItem("helpNeeded", h.id)} icon={h.icon} title={h.title} description={h.desc} compact />
//                 ))}
//               </div>
//             </StepWrapper>
//           );
//         }
//         return (
//           <StepWrapper stepKey="step6-existing" icon={<Monitor className="w-6 h-6" />} title="Digital Presence" subtitle="How active is your business online? Select your level and choose the channels you use.">
//             <div className="space-y-3">
//               <OptionCard selected={data.digitalPresence === "none"} onClick={() => { update("digitalPresence", "none"); update("digitalChannels", []); update("roi", ""); }} icon={<Monitor className="w-4 h-4" />} title="No digital presence" description="Haven't started online yet" />
//               <OptionCard selected={data.digitalPresence === "basic"} onClick={() => { update("digitalPresence", "basic"); update("digitalChannels", []); update("roi", ""); }} icon={<Smartphone className="w-4 h-4" />} title="Basic" description="Social media platforms" />
//               <OptionCard selected={data.digitalPresence === "growing"} onClick={() => { update("digitalPresence", "growing"); update("digitalChannels", []); update("roi", ""); }} icon={<TrendingUp className="w-4 h-4" />} title="Growing" description="Active marketing efforts" />
//               <OptionCard selected={data.digitalPresence === "advanced"} onClick={() => { update("digitalPresence", "advanced"); update("digitalChannels", []); update("roi", ""); }} icon={<BarChart3 className="w-4 h-4" />} title="Advanced" description="Full digital marketing stack" />
//             </div>

//             {/* Basic sub-options */}
//             <AnimatePresence>
//               {data.digitalPresence === "basic" && (
//                 <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
//                   <div className="glass-card p-5 mt-4">
//                     <p className="text-sm font-medium text-foreground font-display mb-3">Which platforms do you use?</p>
//                     <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
//                     <div className="grid grid-cols-3 gap-3">
//                       <OptionCard selected={data.digitalChannels.includes("facebook")} onClick={() => toggleArrayItem("digitalChannels", "facebook")} title="Facebook" compact />
//                       <OptionCard selected={data.digitalChannels.includes("instagram")} onClick={() => toggleArrayItem("digitalChannels", "instagram")} title="Instagram" compact />
//                       <OptionCard selected={data.digitalChannels.includes("whatsapp")} onClick={() => toggleArrayItem("digitalChannels", "whatsapp")} title="WhatsApp" compact />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Growing sub-options */}
//             <AnimatePresence>
//               {data.digitalPresence === "growing" && (
//                 <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
//                   <div className="glass-card p-5 mt-4">
//                     <p className="text-sm font-medium text-foreground font-display mb-3">What marketing activities are you doing?</p>
//                     <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
//                     <div className="grid grid-cols-2 gap-3">
//                       <OptionCard selected={data.digitalChannels.includes("ad_campaigns")} onClick={() => toggleArrayItem("digitalChannels", "ad_campaigns")} title="Ad Campaigns" compact />
//                       <OptionCard selected={data.digitalChannels.includes("content_creation")} onClick={() => toggleArrayItem("digitalChannels", "content_creation")} title="Content Creation" compact />
//                       <OptionCard selected={data.digitalChannels.includes("brand_marketing")} onClick={() => toggleArrayItem("digitalChannels", "brand_marketing")} title="Brand Marketing" compact />
//                       <OptionCard selected={data.digitalChannels.includes("influencer_marketing")} onClick={() => toggleArrayItem("digitalChannels", "influencer_marketing")} title="Influencer Marketing" compact />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Advanced sub-options */}
//             <AnimatePresence>
//               {data.digitalPresence === "advanced" && (
//                 <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
//                   <div className="glass-card p-5 mt-4">
//                     <p className="text-sm font-medium text-foreground font-display mb-3">What advanced activities are you doing?</p>
//                     <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
//                     <div className="grid grid-cols-2 gap-3">
//                       <OptionCard selected={data.digitalChannels.includes("ad_campaigns")} onClick={() => toggleArrayItem("digitalChannels", "ad_campaigns")} title="Ad Campaigns" compact />
//                       <OptionCard selected={data.digitalChannels.includes("content_creation")} onClick={() => toggleArrayItem("digitalChannels", "content_creation")} title="Content Creation" compact />
//                       <OptionCard selected={data.digitalChannels.includes("brand_marketing")} onClick={() => toggleArrayItem("digitalChannels", "brand_marketing")} title="Brand Marketing" compact />
//                       <OptionCard selected={data.digitalChannels.includes("influencer_marketing")} onClick={() => toggleArrayItem("digitalChannels", "influencer_marketing")} title="Influencer Marketing" compact />
//                       <OptionCard selected={data.digitalChannels.includes("ecommerce")} onClick={() => toggleArrayItem("digitalChannels", "ecommerce")} title="E-commerce Websites" compact />
//                     </div>
//                     <div className="mt-4">
//                       <TextInput label="ROI (Return on Investment)" value={data.roi} onChange={(v) => update("roi", v.replace(/\D/g, ""))} placeholder="Enter numeric value" hint="What is your approximate ROI percentage?" type="text" />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </StepWrapper>
//         );

//       case 7:
//         if (businessPath === "existing") {
//           return (
//             <StepWrapper stepKey="step7" icon={<BarChart3 className="w-6 h-6" />} title="Revenue & Marketing Spend" subtitle="Based on the last 2-3 months, an approximate number is perfectly fine.">
//               <TextInput label="What is your average monthly revenue?" value={data.monthlyRevenue} onChange={(v) => update("monthlyRevenue", v)} placeholder="e.g. ₹50,000" hint="On average, how much does your business earn in a month?" />
//               <div className="pt-4">
//                 <p className="text-sm font-medium text-foreground font-display mb-1">Monthly marketing spend?</p>
//                 <p className="text-xs text-muted-foreground mb-3">How much do you spend on promoting your brand each month?</p>
//                 <div className="space-y-3">
//                   <OptionCard selected={data.marketingSpend === "less_10k"} onClick={() => update("marketingSpend", "less_10k")} title="Less than ₹10,000" compact />
//                   <OptionCard selected={data.marketingSpend === "10k_1l"} onClick={() => update("marketingSpend", "10k_1l")} title="₹10,000 - ₹1,00,000" compact />
//                   <OptionCard selected={data.marketingSpend === "more_1l"} onClick={() => update("marketingSpend", "more_1l")} title="More than ₹1,00,000" compact />
//                 </div>
//               </div>
//             </StepWrapper>
//           );
//         }
//         return null;

//       case 8:
//         if (businessPath === "existing") {
//           return (
//             <StepWrapper stepKey="step8" icon={<Target className="w-6 h-6" />} title="Brand Objectives" subtitle="What do you want your business to achieve next? Choose up to 4 that matter most.">
//               <div className="space-y-2.5">
//                 {OBJECTIVES.map((o) => (
//                   <OptionCard key={o.id} selected={data.brandObjectives.includes(o.id)} onClick={() => toggleArrayItem("brandObjectives", o.id, 4)} icon={o.icon} title={o.title} description={o.desc} compact />
//                 ))}
//               </div>
//               {data.brandObjectives.length > 0 && (
//                 <p className="text-xs text-muted-foreground text-center mt-2">{data.brandObjectives.length}/4 selected</p>
//               )}
//             </StepWrapper>
//           );
//         }
//         return null;

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex flex-col items-center py-6 px-4">
//       {/* Page Title */}
//       <h1 className="text-2xl md:text-3xl font-bold font-display gradient-text mb-6">
//         MIBBS Registration
//       </h1>

//       {/* Main Card */}
//       <div className="w-full max-w-3xl glass-card p-6 md:p-10">
//         {/* Progress bar inside card */}
//         <div className="mb-8">
//           <ProgressBar currentStep={currentStep} totalSteps={totalSteps} stepLabels={stepLabels} />
//         </div>

//         {/* Content */}
//         <div className="min-h-[400px] flex items-start justify-center">
//           {renderStep()}
//         </div>

//         {/* Separator */}
//         <hr className="border-border my-6" />

//         {/* Footer Navigation */}
//         <div className="flex items-center justify-between">
//           <motion.button
//             onClick={prevStep}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium border border-border
//               text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </motion.button>

//           <motion.button
//             onClick={nextStep}
//             disabled={!canProceed()}
//             whileHover={canProceed() ? { scale: 1.05 } : {}}
//             whileTap={canProceed() ? { scale: 0.95 } : {}}
//             className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold font-display transition-all duration-300
//               ${canProceed()
//                 ? "gradient-btn hover:shadow-lg hover:shadow-primary/25"
//                 : "bg-muted text-muted-foreground cursor-not-allowed"
//               }`}
//           >
//             {currentStep >= totalSteps ? "Complete" : "Continue"}
//             <ArrowRight className="w-4 h-4" />
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MIBBSQuestionnaire;