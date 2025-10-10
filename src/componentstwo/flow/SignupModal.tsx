import React, { useState } from 'react';
import { X, Mail, User, Phone, Eye, EyeOff, Building2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '@/lib/api/auth';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


interface GoogleUser {
  name: string;
  email: string;
  picture?: string;
  sub: string;
}

interface UserData {
    username: string;
    email: string;
    phone: string;
    firstName?: string;
}

interface SignupModalProps {
  isOpen: boolean;
  onComplete: (userData: any) => void;
  onClose: () => void;
  assessmentData?: any;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen, onComplete, onClose,
}) => {
  const { signup, login } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Determines whether the app is pointing to the local dev server or production server
  // const BASE_URL = "http://127.0.0.1:8000/api"; 
//   const BASE_URL = 'https://api.mibbs.ai/api';
const BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? ""
    : "https://api.mibbs.ai/api";

  // This function handles two main tasks:
  // 1. Updates the Auth context (client-side session).
  // 2. Checks for and sends any pending assessment data to the server.
  const handleSignupSuccess = async (userData: UserData) => {
    // 🟢 1. Update client-side session state (AuthContext)
    // This updates React state, but not the backend database.
    await signup(userData);

    // 🟢 2. Check if assessment data exists (pending server storage)
    const savedData = localStorage.getItem("pending_assessment");
    if (savedData && userData?.email) {
      const payload = JSON.parse(savedData);
      
      // Attach the newly registered/logged-in user's details to the assessment data
      payload.username = userData.firstName || userData.username;
      payload.email = userData.email;
      payload.phone = userData.phone || "";

      try {
        // This is the API call that saves the assessment data to the server (production side)
        const response = await fetch(`${BASE_URL}/assessment/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("✅ Assessment saved with user details!");
          localStorage.removeItem("pending_assessment"); // Clear local temporary storage
        } else {
          console.error("❌ Failed to save assessment:", await response.text());
        }
      } catch (err) {
        console.error("⚠️ Network error saving assessment:", err);
      }
    }
  };


  // Handles the entire Google authentication flow (client -> Google -> backend -> client)
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse?.credential) {
        console.error("No credential found in Google response");
        return;
      }

      // 1. Decode Google token for user info
      const decoded = jwtDecode<GoogleUser>(credentialResponse.credential);
      console.log("Decoded User Info:", decoded);

      // 2. Send credential to backend for verification and get the full user object
      // This call authenticates/registers the user on the server (production side)
      const response = await loginWithGoogle(credentialResponse.credential);
      console.log("Backend Response:", response?.data || response);

      // 3. Store backend user data in local storage (client session)
      const userData = response?.data?.user ?? response?.data ?? response;
      if (userData) {
        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );

        // 4. Check and save assessment after successful Google login/signup
        await handleSignupSuccess({
          username: userData.username || decoded.name,
          email: userData.email || decoded.email,
          phone: userData.phone || "",
        });
        
        return userData; // Return user data for the caller to use
      }
      throw new Error("Could not retrieve user data from Google backend response.");
    } catch (error) {
      console.error("Google Login Error:", error);
      throw error;
    }
  };


  const [isLoginMode, setIsLoginMode] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateSignupForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, ''))) newErrors.mobile = 'Invalid Indian mobile number';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (isLoginMode) {
      // ---- LOGIN ----
      if (!validateLoginForm()) return;
      setIsLoading(true);
      try {
        // 🟢 STEP 1: Server Authentication (Production/Backend Save)
        const response = await fetch(`${BASE_URL}/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (response.ok && data.user) {
          setSuccessMessage("Login successful!");
          
          // 🟢 STEP 2: Client Session Storage (Local Save)
          localStorage.setItem("user", JSON.stringify(data.user));

          // 🟢 STEP 3: Check for pending assessment
          await handleSignupSuccess({
            username: data.user.username || formData.username,
            email: data.user.email || formData.email,
            phone: data.user.phone || formData.mobile,
          });

          setTimeout(() => {
            setSuccessMessage("");
            onComplete(data.user);
          }, 1200);
        } else {
          setErrors({ general: data.message || "Invalid credentials." });
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors({ general: "Login failed. Please try again." });
      } finally {
        setIsLoading(false);
      }
    } else {
      // ---- SIGNUP ----
      if (!validateSignupForm()) return;
      setIsLoading(true);

      try {
        // 🟢 STEP 1: Server Registration (Production/Backend Save)
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
          console.error("Signup failed, invalid JSON:", text);
          setErrors({ general: "User already registered or invalid server response." });
          return;
        }

        if (response.ok && data.user) {
          setSuccessMessage("Account created successfully! Please login now.");
          setIsLoginMode(true);
          
          // 🟢 STEP 2: Check for pending assessment and save it to the server
          await handleSignupSuccess({
            username: data.user.username || formData.username,
            email: data.user.email || formData.email,
            phone: data.user.phone || formData.mobile,
          });

          // Optional cleanup after success
          setFormData((prev) => ({
            ...prev,
            password: '', // Clear password fields after successful signup
            confirmPassword: "",
            agreeToTerms: false,
          }));
        } else {
          // Improved error handling
          if (data.email) {
            setErrors({ email: data.email[0] || "Email already exists." });
          } else if (data.phone) {
            setErrors({ mobile: data.phone[0] || "Phone number already exists." });
          } else {
            setErrors({ general: data.message || "Failed to create account." });
          }
        }
      } catch (error) {
        console.error("Signup error:", error);
        setErrors({ general: "Signup failed. Please try again." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-3 ">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-mibbs-gradient rounded-lg flex items-center justify-center">
              <h2 className='text-white'>M</h2>
            </div>
            <h2 className="text-1xl font-bold text-gray-900">
              {isLoginMode ? 'Login' : 'Create Account'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-3">
          {isLoginMode
            ? 'Login to your MIBBS account'
            : 'Sign up to your MIBBS account'}
        </p>

        {successMessage && (
          <div className="p-4 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        {/* Google Login Button (only in login mode) */}
        {isLoginMode && (
          <div className="mb-4">
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    try {
                        setIsLoading(true);
                        if (!credentialResponse?.credential) {
                            setErrors({
                                general: "Google login failed. No credential returned.",
                            });
                            return;
                        }

                        // 1. Call the handler which performs backend authentication and saves 'user' to localStorage.
                        await handleGoogleSuccess(credentialResponse);

                        // 2. Retrieve the user data that was saved by handleGoogleSuccess
                        const userDataString = localStorage.getItem("user");
                        if (userDataString) {
                            const userData = JSON.parse(userDataString);
                            setSuccessMessage("Login successful!");
                            setTimeout(() => {
                                setSuccessMessage("");
                                onComplete(userData); // Pass the retrieved user data
                            }, 1200);
                        } else {
                            // Fallback for unexpected case where backend call failed silently
                            setErrors({ general: "Google login failed: User data not found after successful attempt." });
                        }

                    } catch (error) {
                        console.error("Google login failed:", error);
                        setErrors({ general: "Google login failed. Please try again." });
                    } finally {
                        setIsLoading(false);
                    }
                }}
                onError={() => {
                    setErrors({ general: "Google login failed. Please try again." });
                }}
                text="continue_with"
                shape="rectangular"
                size="large"
                width="100%"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2 ">
          {!isLoginMode && (
            <>
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.username ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Enter your username"
                  />
                </div>
                {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username}</p>}
              </div>
            </>
          )}

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Enter your email address"
              />
            </div>
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          {!isLoginMode && (
            <div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.mobile ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter your mobile number"
                />
              </div>
              {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
            </div>
          )}

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                placeholder={isLoginMode ? "Enter your password" : "Enter your password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </div>

          {!isLoginMode && (
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {!isLoginMode && (
            <div>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 rounded border-gray-300 text-mibbs-primary focus:ring-mibbs-primary"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a
                    href="http://localhost:8080/mibbs-brand-blueprint/mibbsapp#"
                    className="text-mibbs-primary hover:text-mibbs-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Terms of Service</a>
                  {' '}and{' '}
                  <a
                    href="http://localhost:8080/mibbs-brand-blueprint/mibbsapp#"
                    className="text-mibbs-primary hover:text-mibbs-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Privacy Policy</a>
                </span>
              </label>
              {errors.agreeToTerms && <p className="text-xs text-red-600 mt-1">{errors.agreeToTerms}</p>}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-mibbs-gradient text-white py-2 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-mibbs-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? (isLoginMode ? 'Signing in...' : 'Signing up...')
              : (isLoginMode ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-2 text-left text-gray-600">
          {isLoginMode ? (
            <>
              Don't have an account?{' '}
              <button type="button" onClick={() => setIsLoginMode(false)} className="text-mibbs-primary hover:text-mibbs-secondary font-semibold">
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" onClick={() => setIsLoginMode(true)} className="text-mibbs-primary hover:text-mibbs-secondary font-semibold">
                Sign In
              </button>
            </>
            
          )}
        </div>


      </div>
    </div>
  );
};

export default SignupModal;










// import React, { useState } from 'react';
// import { X, Mail, User, Phone, Eye, EyeOff, Building2 } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import { GoogleLogin } from '@react-oauth/google';
// import { loginWithGoogle } from '@/lib/api/auth';
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";



// interface GoogleUser {
//   name: string;
//   email: string;
//   picture?: string;
//   sub: string;
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
//   const { signup, login } = useAuth();

//   const { user } = useAuth();
//   const navigate = useNavigate();
  


//   // const BASE_URL = "http://127.0.0.1:8000/api";
//   const BASE_URL = 'https://api.mibbs.ai/api';

//   const handleSignupSuccess = async (userData) => {
//   // 🟢 Normal signup logic first
//   await signup(userData);

//   // 🟢 Now check if assessment data exists
//   const savedData = localStorage.getItem("pending_assessment");
//   if (savedData && userData?.email) {
//     const payload = JSON.parse(savedData);
//     payload.username = userData.firstName || userData.username;
//     payload.email = userData.email;
//     payload.phone = userData.phone || "";

//     try {
//       const response = await fetch(`${BASE_URL}/assessment/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         console.log("✅ Assessment saved with user details!");
//         localStorage.removeItem("pending_assessment");
//       } else {
//         console.error("❌ Failed to save assessment:", await response.text());
//       }
//     } catch (err) {
//       console.error("⚠️ Network error saving assessment:", err);
//     }
//   }
// };

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

//   const validateSignupForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
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

//         // if (response.ok && data.user) {
//         //   setSuccessMessage("Account created successfully! Please login now.");
//         //   setIsLoginMode(true);
//         //   setFormData((prev) => ({
//         //     ...prev,
//         //     password: formData.password,
//         //     confirmPassword: "",
//         //     agreeToTerms: false,
//         //   }));
//         // } else {
//         //   setErrors({ general: data.message || "Failed to create account." });
//         // }
//         if (response.ok && data.user) {
//           setSuccessMessage("Account created successfully! Please login now.");
//           setIsLoginMode(true);

//           // ✅ Call handleSignupSuccess to attach assessment data
//           await handleSignupSuccess({
//             username: data.user.username || formData.username,
//             email: data.user.email || formData.email,
//             phone: data.user.phone || formData.mobile,
//           });

//           // Optional cleanup after success
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

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5">
//         <div className="flex items-center justify-between mb-3 ">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-mibbs-gradient rounded-lg flex items-center justify-center">
//               <h2 className='text-white'>M</h2>
//             </div>
//             <h2 className="text-1xl font-bold text-gray-900">
//               {isLoginMode ? 'Login' : 'Create Account'}
//             </h2>
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors">
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <p className="text-gray-600 mb-3">
//           {isLoginMode
//             ? 'Login to your MIBBS account'
//             : 'Sign up to your MIBBS account'}
//         </p>

//         {successMessage && (
//           <div className="p-4 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
//             {successMessage}
//           </div>
//         )}

//         {errors.general && (
//           <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
//             <p className="text-sm text-red-600">{errors.general}</p>
//           </div>
//         )}

       

//         <form onSubmit={handleSubmit} className="space-y-2 ">
//           {!isLoginMode && (
//             <>
//               <div>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className={`w-full pl-9 pr-3 py-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.username ? 'border-red-300' : 'border-gray-300'}`}
//                     placeholder="Enter your username"
//                   />
//                 </div>
//                 {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username}</p>}
//               </div>
//             </>
//           )}

//           <div>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
//                 placeholder="Enter your email address"
//               />
//             </div>
//             {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
//           </div>

//           {!isLoginMode && (
//             <div>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="tel"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.mobile ? 'border-red-300' : 'border-gray-300'}`}
//                   placeholder="Enter your mobile number"
//                 />
//               </div>
//               {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
//             </div>
//           )}

//           <div>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
//                 placeholder={isLoginMode ? "Enter your password" : "Enter your password"}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//               </button>
//             </div>
//             {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
//           </div>

//           {!isLoginMode && (
//             <div>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
//                   placeholder="Re-enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//               {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
//             </div>
//           )}

//           {!isLoginMode && (
//             <div>
//               <label className="flex items-start space-x-3">
//                 <input
//                   type="checkbox"
//                   name="agreeToTerms"
//                   checked={formData.agreeToTerms}
//                   onChange={handleChange}
//                   className="mt-1 rounded border-gray-300 text-mibbs-primary focus:ring-mibbs-primary"
//                 />
//                 <span className="text-sm text-gray-600">
//                   I agree to the{' '}
//                   <a
//                     href="http://localhost:8080/mibbs-brand-blueprint/mibbsapp#"
//                     className="text-mibbs-primary hover:text-mibbs-secondary"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >Terms of Service</a>
//                   {' '}and{' '}
//                   <a
//                     href="http://localhost:8080/mibbs-brand-blueprint/mibbsapp#"
//                     className="text-mibbs-primary hover:text-mibbs-secondary"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >Privacy Policy</a>
//                 </span>
//               </label>
//               {errors.agreeToTerms && <p className="text-xs text-red-600 mt-1">{errors.agreeToTerms}</p>}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-mibbs-gradient text-white py-2 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-mibbs-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading
//               ? (isLoginMode ? 'Signing in...' : 'Signing up...')
//               : (isLoginMode ? 'Sign In' : 'Sign Up')}
//           </button>
//         </form>

//         <div className="mt-2 text-left text-gray-600">
//           {isLoginMode ? (
//             <>
//               Don't have an account?{' '}
//               <button type="button" onClick={() => setIsLoginMode(false)} className="text-mibbs-primary hover:text-mibbs-secondary font-semibold">
//                 Sign Up
//               </button>
//             </>
//           ) : (
//             <>
//               Already have an account?{' '}
//               <button type="button" onClick={() => setIsLoginMode(true)} className="text-mibbs-primary hover:text-mibbs-secondary font-semibold">
//                 Sign In
//               </button>
//             </>
            
//           )}
//         </div>


//       </div>
//     </div>
//   );
// };

// export default SignupModal;









// import React, { useState } from 'react';
// import { X, Mail, User, Phone, Eye, EyeOff, Building2 } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import { GoogleLogin } from '@react-oauth/google';
// import { loginWithGoogle } from '@/lib/api/auth';

// interface GoogleUser {
//   name: string;
//   email: string;
//   picture?: string;
//   sub: string;
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
//   const { signup, login } = useAuth();

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

//   const validateSignupForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
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


// // const BASE_URL = "https://api.mibbs.ai/api"; // ✅ Production URL
// const BASE_URL = "http://127.0.0.1:8000/api"; //

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setErrors({});

//   if (isLoginMode) {
//     // ---- LOGIN ----
//     if (!validateLoginForm()) return;
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${BASE_URL}/login/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok && data.user) {
//         setSuccessMessage("Login successful!");
//         localStorage.setItem("user", JSON.stringify(data.user));
//         setTimeout(() => {
//           setSuccessMessage("");
//           onComplete(data.user);
//         }, 1200);
//       } else {
//         setErrors({ general: data.message || "Invalid credentials." });
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setErrors({ general: "Login failed. Please try again." });
//     } finally {
//       setIsLoading(false);
//     }
//   } else {
//   // ---- SIGNUP ----
//   if (!validateSignupForm()) return;
//   setIsLoading(true);

//   try {
//     const response = await fetch(`${BASE_URL}/register/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: formData.username,
//         email: formData.email,
//         phone: formData.mobile, // <-- correct field name
//         password: formData.password,
//         confirm_password: formData.confirmPassword,
//       }),
//     });

//     // Handle backend response safely
//     const text = await response.text();
//     let data: any = {};
//     try {
//       data = JSON.parse(text);
//     } catch {
//       console.error("Signup failed, invalid JSON:", text);
//       setErrors({ general: "Signup failed. Please try again." });
//       return;
//     }

//     if (response.ok && data.user) {
//       setSuccessMessage("Account created successfully! Please login now.");
//       setIsLoginMode(true);
//       setFormData((prev) => ({
//         ...prev,
//         password: formData.password,
//         confirmPassword: "",
//         agreeToTerms: false,
//       }));
//     } else {
//       setErrors({ general: data.message || "Failed to create account." });
//     }
//   } catch (error) {
//     console.error("Signup error:", error);
//     setErrors({ general: "Signup failed. Please try again." });
//   } finally {
//     setIsLoading(false);
//   }
// }
// };


// // const handleSubmit = async (e: React.FormEvent) => {
// //   e.preventDefault();
// //   setErrors({});

// //   if (isLoginMode) {
// //     // ---- LOGIN ----
// //     if (!validateLoginForm()) return;
// //     setIsLoading(true);

// //     try {
// //       const response = await fetch(`${BASE_URL}/login/`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           email: formData.email,
// //           password: formData.password,
// //         }),
// //       });

// //       const data: { success: boolean; user?: any; message?: string } = await response.json();

// //       if (data.success) {
// //         setSuccessMessage("Login successful!");
// //         localStorage.setItem("user", JSON.stringify(data.user));
// //         setTimeout(() => {
// //           setSuccessMessage("");
// //           onComplete(data.user);
// //         }, 1200);
// //       } else {
// //         setErrors({ general: data.message || "Invalid credentials." });
// //       }
// //     } catch (error: unknown) {
// //       console.error("Login error:", error);
// //       setErrors({ general: "Login failed. Please try again." });
// //     } finally {
// //       setIsLoading(false);
// //     }

// //   } else {
// //     // ---- SIGNUP ----
// //     if (!validateSignupForm()) return;
// //     setIsLoading(true);

// //     try {
// //       const response = await fetch(`${BASE_URL}/register/`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           username: formData.username,
// //           email: formData.email,
// //           phone: formData.mobile,
// //           password: formData.password,
// //           confirm_password: formData.confirmPassword,
// //         }),
// //       });

// //       const data: { success: boolean; message?: string } = await response.json();

// //       if (data.success) {
// //         setSuccessMessage("Account created successfully! Please login now.");
// //         setIsLoginMode(true);
// //         setFormData((prev) => ({
// //           ...prev,
// //           password: formData.password,
// //           confirmPassword: "",
// //           agreeToTerms: false,
// //         }));
// //       } else {
// //         setErrors({ general: data.message || "Failed to create account." });
// //       }
// //     } catch (error: unknown) {
// //       console.error("Signup error:", error);
// //       setErrors({ general: "Signup failed. Please try again." });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }
// // };


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5">
//         <div className="flex items-center justify-between mb-3 ">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-mibbs-gradient rounded-lg flex items-center justify-center">
//               {/* <Building2 className="w-5 h-5 text-white" /> */}
//               <h2 className='text-white'>M</h2>
//             </div>
//             <h2 className="text-1xl font-bold text-gray-900">
//               {isLoginMode ? 'Login' : 'Create Account'}
//             </h2>
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors">
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <p className="text-gray-600 mb-3">
//           {isLoginMode
//             ? 'Login to your MIBBS account'
//             : 'Sign up to your MIBBS account'}
//         </p>

//         {successMessage && (
//           <div className="p-4 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
//             {successMessage}
//           </div>
//         )}

//         {errors.general && (
//           <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
//             <p className="text-sm text-red-600">{errors.general}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-2 ">
//           {!isLoginMode && (
//             <>
//               <div>
//                 {/* <label className="block text-sm font-medium text-gray-700 mb-2">Username</label> */}
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className={`w-full pl-9 pr-3 py-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.username ? 'border-red-300' : 'border-gray-300'}`}
//                     placeholder="Enter your username"
//                   />
//                 </div>
//                 {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username}</p>}
//               </div>
//             </>
//           )}

//           <div>
//             {/* <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label> */}
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
//                 placeholder="Enter your email address"
//               />
//             </div>
//             {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
//           </div>

//           {!isLoginMode && (
//             <div>
//               {/* <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label> */}
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="tel"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.mobile ? 'border-red-300' : 'border-gray-300'}`}
//                   placeholder="Enter your mobile number"
//                 />
//               </div>
//               {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
//             </div>
//           )}

//           <div>
//             {/* <label className="block text-sm font-medium text-gray-700 mb-2">Password</label> */}
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
//                 placeholder={isLoginMode ? "Enter your password" : "Enter your password"}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//               </button>
//             </div>
//             {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
//           </div>

//           {!isLoginMode && (
//             <div>
//               {/* <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label> */}
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary transition-colors ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
//                   placeholder="Re-enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//               {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
//             </div>
//           )}

//           {!isLoginMode && (
//             <div>
//               <label className="flex items-start space-x-3">
//                 <input
//                   type="checkbox"
//                   name="agreeToTerms"
//                   checked={formData.agreeToTerms}
//                   onChange={handleChange}
//                   className="mt-1 rounded border-gray-300 text-mibbs-primary focus:ring-mibbs-primary"
//                 />
//                 <span className="text-sm text-gray-600">
//                   I agree to the{' '}
//                   <a
//                     href="http://localhost:8080/mibbs-brand-blueprint/mibbsapp#"
//                     className="text-mibbs-primary hover:text-mibbs-secondary"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >Terms of Service</a>
//                   {' '}and{' '}
//                   <a
//                     href="http://localhost:8080/mibbs-brand-blueprint/mibbsapp#"
//                     className="text-mibbs-primary hover:text-mibbs-secondary"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >Privacy Policy</a>
//                 </span>
//               </label>
//               {errors.agreeToTerms && <p className="text-xs text-red-600 mt-1">{errors.agreeToTerms}</p>}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-mibbs-gradient text-white py-2 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-mibbs-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading
//               ? (isLoginMode ? 'Signing in...' : 'Signing up...')
//               : (isLoginMode ? 'Sign In' : 'Sign Up')}
//           </button>
//         </form>

//         <div className="mt-2 text-left text-gray-600">
//           {isLoginMode ? (
//             <>
//               Don't have an account?{' '}
//               <button type="button" onClick={() => setIsLoginMode(false)} className="text-mibbs-primary hover:text-mibbs-secondary font-semibold">
//                 Sign Up
//               </button>
//             </>
//           ) : (
//             <>
//               Already have an account?{' '}
//               <button type="button" onClick={() => setIsLoginMode(true)} className="text-mibbs-primary hover:text-mibbs-secondary font-semibold">
//                 Sign In
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupModal;
