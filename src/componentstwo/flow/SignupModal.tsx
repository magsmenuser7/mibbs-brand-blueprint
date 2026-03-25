import React, { useState, useEffect } from 'react';
import { X, Mail, User, Phone, Eye, EyeOff, KeyRound, ArrowLeft } from 'lucide-react'; 
import { useNavigate } from "react-router-dom";
import mibbs2 from '../../assets/mibbs-2.png';

// --- Interfaces ---
interface SignupModalProps {
  isOpen: boolean;
  onComplete: (userData: any) => void;
  onClose: () => void;
  assessmentData?: any;
  isStatic?: boolean;
}

type ViewState = 'LOGIN' | 'SIGNUP' | 'FORGOT';

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onComplete, onClose }) => {
  const BASE_URL = "https://api.mibbs.ai/api";

  // --- State Management ---
  const [view, setView] = useState<ViewState>('LOGIN'); // Main view switcher
  
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

  // --- Effects ---
  // useEffect(() => {
  //   const rememberedEmail = localStorage.getItem('rememberedEmail');
  //   const rememberedPassword = localStorage.getItem('rememberedPassword');
    
  //   if (rememberedEmail && rememberedPassword) {
  //   // if (rememberedEmail) {
  //     setFormData(prev => ({
  //       ...prev,
  //       email: rememberedEmail,
  //       password: rememberedPassword,
  //       rememberMe: true,
  //     }));
  //   }
  // }, []);

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
      onComplete(user);
    }, 1500);
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

//   try {
//     if (isLogin) {
//       const user = await loginUser();

//       setSuccessMessage("Login successful!");
//       clearLoginFields();
//       setFormData((prev) => ({
//         ...prev,
//         password: "",
//         confirmPassword: "",
//       }));
      
//       setTimeout(() => {
//         setSuccessMessage("");
//         onComplete(user);
//       }, 1500);
//     } else {
//       await registerUser();

//       setSuccessMessage("Account created successfully!");
      
//       // ✅ RESET AFTER SIGNUP
//       resetFormData();
//       setErrors({});
      
//       setTimeout(() => {
//         setSuccessMessage("");
//         setView("LOGIN");
//       }, 1500);
//     }
//   } catch (error: any) {
//     setErrors({ general: error.message || "Something went wrong." });
//   } finally {
//     setIsLoading(false);
//   }
// };

  // --- Forgot Password Logic (Step by Step) ---

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

  if (!isOpen) return null;






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
        onComplete(user);
      }, 1200);
    }
  } catch (error: any) {
    setErrors({ general: error.message || "OTP login failed" });
  } finally {
    setIsLoading(false);
  }
};


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
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors">
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
};

export default SignupModal;












// import React, { useState } from 'react';
// import { X, Mail, User, Phone, Eye, EyeOff, Target } from 'lucide-react'; // kept icons
// import { useAuth } from '../../contexts/AuthContext';
// import { GoogleLogin } from '@react-oauth/google';
// import { loginWithGoogle } from '@/lib/api/auth';
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import budgetvideo from '../../assets/budget-background-video.mp4';
// import budgetimage from '../../assets/BUDGET-IMAGE3.jpeg'; // (1) left column image
// import mibbs2 from '../../assets/mibbs-2.png'


// interface GoogleUser {
//   name: string;
//   email: string;
//   picture?: string;
//   sub: string;
// }


// declare global {
//   interface Window {
//     fbq?: (...args: any[]) => void;
//   }
// }

// interface SignupModalProps {
//   isOpen: boolean;
//   onComplete: (userData: any) => void;
//   onClose: () => void;
//   assessmentData?: any;
// }

// const SignupModal: React.FC<SignupModalProps> = ({
//   isOpen, onComplete, onClose,
// }) => {
//   // (2) auth hooks & router
//   const { signup, login } = useAuth();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const BASE_URL = "http://127.0.0.1:8000/api";
//   // const BASE_URL = 'https://api.mibbs.ai/api';

//   // (3) handleSignupSuccess: saves pending assessment after signup/login
//   const handleSignupSuccess = async (userData) => {
//     await signup(userData);
//     const token = localStorage.getItem('access_token');

//     const savedData = localStorage.getItem("pending_assessment");
//     if (savedData && userData?.email) {
//       const payload = JSON.parse(savedData);
//       payload.username = userData.firstName || userData.username;
//       payload.email = userData.email;
//       payload.phone = userData.phone || "";

//       try {
//         const response = await fetch(`${BASE_URL}/assessment/`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//           body: JSON.stringify(payload),
//         });

//         if (response.ok) {
//           console.log("✅ Assessment saved with user details!");
//           localStorage.removeItem("pending_assessment");
//         } else {
//           console.error("❌ Failed to save assessment:", await response.text());
//         }
//       } catch (err) {
//         console.error("⚠️ Network error saving assessment:", err);
//       }
//     }
//   };

//   // (4) form state
//   const [isLoginMode, setIsLoginMode] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     mobile: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   // (5) validation helpers
//   const validateSignupForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
//     if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
//     if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, ''))) newErrors.mobile = 'Invalid Indian mobile number';
//     if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
//     if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword)
//       newErrors.confirmPassword = 'Passwords do not match';
//     if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateLoginForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
//     if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // (6) duplicate check for email/mobile
//   const checkDuplicate = async (field: string, value: string) => {
//     if (!value || isLoginMode) return;
//     try {
//       const response = await fetch(`${BASE_URL}/check-duplicate/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ [field]: value }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.exists) {
//           setErrors(prev => ({ ...prev, [field]: `${field === 'email' ? 'Email' : 'Mobile number'} already registered` }));
//         } else {
//           setErrors(prev => ({ ...prev, [field]: '' }));
//         }
//       }
//     } catch (error) {
//       console.error(`Error checking ${field}:`, error);
//     }
//   };

//   // (7) form change handler (with live duplicate checks)
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));

//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

//     if (name === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//       checkDuplicate("email", value);
//     }
//     if (name === "mobile" && /^[6-9]\d{9}$/.test(value)) {
//       checkDuplicate("mobile", value);
//     }
//   };

//   // (8) submit handler (login & signup flows)
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrors({});

//     if (isLoginMode) {
//       // ---- LOGIN ----
//       if (!validateLoginForm()) return;
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${BASE_URL}/login/`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: formData.email,
//             password: formData.password,
//           }),
//         });

//         const data = await response.json();
//         if (response.ok && data.user) {
//           setSuccessMessage("Login successful!");
//           localStorage.setItem("user", JSON.stringify(data.user));
//           await handleSignupSuccess({
//             username: data.user.username,
//             email: data.user.email,
//             phone: data.user.phone || '',
//           });
//           setTimeout(() => {
//             setSuccessMessage("");
//             onComplete(data.user);
//           }, 1200);
//         } else {
//           setErrors({ general: data.message || "Invalid credentials." });
//         }
//       } catch (error) {
//         console.error("Login error:", error);
//         setErrors({ general: "Login failed. Please try again." });
//       } finally {
//         setIsLoading(false);
//       }
//     } else {
//       // ---- SIGNUP ----
//       if (!validateSignupForm()) return;
//       setIsLoading(true);

//       try {
//         const response = await fetch(`${BASE_URL}/register/`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             username: formData.username,
//             email: formData.email,
//             phone: formData.mobile,
//             password: formData.password,
//             confirm_password: formData.confirmPassword,
//           }),
//         });

//         const text = await response.text();
//         let data: any = {};
//         try {
//           data = JSON.parse(text);
//         } catch {
//           console.error("Signup failed, invalid JSON:", text);
//           setErrors({ general: "User already registered. Please use your login credentials." });
//           return;
//         }

//         if (response.ok && data.user) {
//           setSuccessMessage("Account created successfully! Please login now.");
//           setIsLoginMode(true);
//           await handleSignupSuccess({
//             username: data.user.username || formData.username,
//             email: data.user.email || formData.email,
//             phone: data.user.phone || formData.mobile,
//           });
//           setFormData((prev) => ({
//             ...prev,
//             password: formData.password,
//             confirmPassword: "",
//             agreeToTerms: false,
//           }));
//         } else {
//           setErrors({ general: data.message || "Failed to create account." });
//         }
//       } catch (error) {
//         console.error("Signup error:", error);
//         setErrors({ general: "Signup failed. Please try again." });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse: any) => {
//     try {
//       const decoded = jwtDecode<GoogleUser>(credentialResponse.credential);
//       console.log("Decoded User Info:", decoded);

//       localStorage.setItem("username", decoded.name);

//       // Send token to backend using auth.js
//       const response = await loginWithGoogle(credentialResponse.credential);
//       console.log("Backend Response:", response.data);

//       // Optional: redirect user
//       // navigate("/dashboard");
//     } catch (error) {
//       console.error("Google Login Error:", error);
//     }
//   };




//   // (9) modal not open -> render nothing
//   if (!isOpen) return null;

//   // (10) ---------- RENDER ----------
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Optional background video (kept commented as you had it) */}
//       {/* <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
//         <source src={budgetvideo} type="video/mp4" />
//       </video> */}

//       {/* (11) Outer modal container */}
//       <div className="shadow-2xl w-full max-w-5xl p-0 bg-white/30 backdrop-blur-lg border border-white/30 overflow-hidden">
//         {/* (12) Grid: left image column + right form column */}
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* ---------------- LEFT COLUMN: IMAGE / BRAND (13) ---------------- */}
//           <div className="hidden md:flex flex-col items-center justify-center p-8">
//             {/* You can replace this with an <img> or a styled div */}
//             <img
//               src={mibbs2}
//               alt="MIBBS"
//               className="w-full h-56 object-cover border border-white/20"
//             />
//             {/* <h3 className="mt-6 text-white text-2xl font-bold">MIBBS Budget Tool</h3>
//             <p className="mt-2 text-white/90 text-sm text-center max-w-xs">
//               Build a smarter brand budget — get tailored marketing budgets, channel focus and recommendations.
//             </p> */}
//           </div>

//           {/* ---------------- RIGHT COLUMN: FORM (14) ---------------- */}
//           <div className="p-5 md:p-6 bg-gray-200">
//             {/* Header (15) */}
//             <div className="flex items-center justify-between mb-3">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-mibbs-gradient rounded-lg flex items-center justify-center">
//                   <h2 className="text-white">M</h2>
//                 </div>
//                 <h2 className="text-1xl font-bold text-gray-900">MIBBS</h2>
//               </div>
//               <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <p className="text-gray-600 mb-3">
//               {isLoginMode ? 'Login to your MIBBS account' : 'Sign up to your MIBBS account'}
//             </p>

//             {/* Success / Error messages (16) */}
//             {successMessage && (
//               <div className="p-4 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
//                 {successMessage}
//               </div>
//             )}

//             {errors.general && (
//               <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
//                 <p className="text-sm text-red-600">{errors.general}</p>
//               </div>
//             )}

//             {/* (17) FORM */}
//             <form onSubmit={handleSubmit} className="space-y-3">
//               {!isLoginMode && (
//                 <div>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black-600" />
//                     <input
//                       type="text"
//                       name="username"
//                       value={formData.username}
//                       onChange={handleChange}
//                       className={`bg-white/30 w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors border-gray-300 placeholder-gray-600`}
//                       placeholder="Enter your username"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Email field */}
//               <div>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black-400" />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`bg-white/30 w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors placeholder-gray-600 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
//                     placeholder="Enter your email address"
//                   />
//                 </div>
//                 {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
//               </div>

//               {/* Mobile field */}
//               {!isLoginMode && (
//                 <div>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black-400" />
//                     <input
//                       type="tel"
//                       name="mobile"
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       className={`bg-white/30 w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors placeholder-gray-600 ${errors.mobile ? 'border-red-300' : 'border-gray-300'}`}
//                       placeholder="Enter your mobile number"
//                     />
//                   </div>
//                   {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
//                 </div>
//               )}

//               {/* Password */}
//               <div>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`bg-white/30 w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors placeholder-gray-600 ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
//                     placeholder={isLoginMode ? "Enter your password" : "Enter your password"}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-600"
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
//               </div>

//               {/* Confirm password */}
//               {!isLoginMode && (
//                 <div>
//                   <div className="relative">
//                     <input
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       className={`bg-white/30 w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors placeholder-gray-600 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
//                       placeholder="Re-enter your password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-600"
//                     >
//                       {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>
//                   {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
//                 </div>
//               )}

//               {/* Agree to terms */}
//               {!isLoginMode && (
//                 <div>
//                   <label className="flex items-start space-x-3">
//                     <input
//                       type="checkbox"
//                       name="agreeToTerms"
//                       checked={formData.agreeToTerms}
//                       onChange={handleChange}
//                       className="mt-1 rounded border-gray-300 text-mibbs-primary focus:ring-mibbs-primary"
//                     />
//                     <span className="text-sm text-gray-600">
//                       I agree to the{' '}
//                       <a href="/terms-and-conditions" className="text-mibbs-primary hover:text-mibbs-secondary">Terms of Service</a> and{' '}
//                       <a href="/privacy-policy" className="text-mibbs-primary hover:text-mibbs-secondary">Privacy Policy</a>
//                     </span>
//                   </label>
//                   {errors.agreeToTerms && <p className="text-xs text-red-600 mt-1">{errors.agreeToTerms}</p>}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-mibbs-gradient text-white py-2 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading
//                   ? (isLoginMode ? 'Signing in...' : 'Signing up...')
//                   : (isLoginMode ? 'Sign In' : 'Sign Up')}
//               </button>
//             </form>

//             {/* (18) Footer text: toggle mode */}
//             <div className="mt-3 text-left text-black">
//               {isLoginMode ? (
//                 <>
//                   Don't have an account?{' '}
//                   <button type="button" onClick={() => setIsLoginMode(false)} className="text-mibbs-primary hover:text-mibbs-secondary font-semibold">
//                     Sign Up
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   Already have an account?{' '}
//                   <button type="button" onClick={() => setIsLoginMode(true)} className="text-mibbs-primary hover:text-mibbs-secondary font-semibold">
//                     Sign In
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupModal;









