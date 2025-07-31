
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  Phone,
  Linkedin,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '@/lib/api/auth';
import { jwtDecode } from "jwt-decode";



interface GoogleUser {
  name: string;
  email: string;
  picture?: string;
  sub: string;
}

const LoginForm = () => {
  const BASE_URL = 'https://api.mibbs.ai/api';
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (forgotPassword) {
      if (!forgotEmail) return alert('Please enter your email');
      alert(`OTP sent to ${forgotEmail}`);
      return;
    }

    const { username, email, phone, password, confirmPassword } = form;

    if (isSignup) {
      if (!username || !email || !phone || !password || !confirmPassword) {
        alert('Please fill all fields');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/registerUser`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, phone, password }),
        });

        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (res.ok) {
            alert('Signup successful. Please login.');
            setIsSignup(false);
            setForm({
              username: '',
              email: '',
              phone: '',
              password: '',
              confirmPassword: '',
            });
          } else {
            const errors = [];
            if (data.username) errors.push(`Username: ${data.username[0]}`);
            if (data.email) errors.push(`Email: ${data.email[0]}`);
            if (data.phone) errors.push(`Phone: ${data.phone[0]}`);
            alert(errors.join('\n') || 'Registration failed');
            console.error('Server Error:', data);
          }
        } catch {
          console.error('Expected JSON but got:', text);
          alert('Invalid server response during signup.');
        }
      } catch (err) {
        console.error('Signup network error:', err);
        alert('Signup failed. Check your network or server.');
      }
    } else {
      try {
        const identifier = loginMethod === 'email' ? email : phone;
        const res = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password }),
        });

        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (res.ok) {
            alert('Login successful');
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
          } else {
            alert(data.error || 'Invalid credentials');
            console.error('Login Error:', data);
          }
        } catch {
          console.error('Expected JSON but got:', text);
          alert('Invalid server response during login.');
        }
      } catch (err) {
        console.error('Login network error:', err);
        alert('Login failed. Check your network or server.');
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decoded = jwtDecode<GoogleUser>(credentialResponse.credential);
      console.log("Decoded User Info:", decoded);

      localStorage.setItem("username", decoded.name);

      // Send token to backend using auth.js
      const response = await loginWithGoogle(credentialResponse.credential);
      console.log("Backend Response:", response.data);

      // Optional: redirect user
      // navigate("/dashboard");
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#ccadcc] to-[#5b2d89] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <CardTitle className="text-2xl font-bold">
            {forgotPassword ? 'Forgot Password' : isSignup ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <p className="text-gray-600">
            {forgotPassword
              ? 'Reset your password with email'
              : isSignup
              ? 'Sign up to your MIBBS account'
              : 'Sign in to your MIBBS account'}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {!isSignup && !forgotPassword && (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={loginMethod === 'email' ? 'default' : 'outline'}
                onClick={() => setLoginMethod('email')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                variant={loginMethod === 'phone' ? 'default' : 'outline'}
                onClick={() => setLoginMethod('phone')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                />
              </div>
            )}

            {(isSignup || loginMethod === 'email' || forgotPassword) && (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={forgotPassword ? forgotEmail : form.email}
                  onChange={(e) =>
                    forgotPassword ? setForgotEmail(e.target.value) : handleChange(e)
                  }
                  required
                  placeholder="Enter your email address"
                />
              </div>
            )}

            {isSignup || (!isSignup && loginMethod === 'phone') ? (
              !forgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your mobile number"
                  />
                </div>
              )
            ) : null}

            {!forgotPassword && (
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {isSignup && (
              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {!isSignup && !forgotPassword && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#5b2d89]"
                  />
                  <span>Remember Me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setForgotPassword(true)}
                  className="text-sm text-[#64378e] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]"
            >
              {forgotPassword ? 'Send OTP' : isSignup ? 'Sign Up' : 'Sign In'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {!isSignup && !forgotPassword && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <GoogleLogin
                  onSuccess={(handleGoogleSuccess) => {
                    console.log('Google Login Success', handleGoogleSuccess);
                    navigate('/dashboard');
                  }}
                  onError={() => {
                    console.error('Google Login Failed');
                  }}
                />
                <Button variant="outline" className="flex items-center justify-center">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </>
          )}

          <div className="text-center text-sm">
            {forgotPassword ? (
              <button
                type="button"
                onClick={() => {
                  setForgotPassword(false);
                  setForgotEmail('');
                }}
                className="text-[#64378e] hover:underline font-medium"
              >
                Back to Login
              </button>
            ) : (
              <>
                <span className="text-gray-600">
                  {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setForgotPassword(false);
                    setForgotEmail('');
                  }}
                  className="text-[#64378e] hover:underline font-medium"
                >
                  {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
















































// function jwt_decode<T>(credential: any) {
//   throw new Error('Function not implemented.');
// }
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { Mail, Phone, Chrome, Linkedin, ArrowRight } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';


// const LoginForm = () => {
//   const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Simulate login success
//     navigate('/dashboard');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center pb-8">
//           <div className="w-12 h-12 bg-gradient-to-br from-[#ccadcc] to-[#5b2d89] rounded-xl flex items-center justify-center mx-auto mb-4">
//             <span className="text-white font-bold text-lg">M</span>
//           </div>
//           <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
//           <p className="text-gray-600">Sign in to your MIBBS account</p>
//         </CardHeader>
        
//         <CardContent className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <Button
//               variant={loginMethod === 'email' ? 'default' : 'outline'}
//               onClick={() => setLoginMethod('email')}
//               className="flex items-center justify-center"
//             >
//               <Mail className="w-4 h-4 mr-2" />
//               Email
//             </Button>
//             <Button
//               variant={loginMethod === 'phone' ? 'default' : 'outline'}
//               onClick={() => setLoginMethod('phone')}
//               className="flex items-center justify-center"
//             >
//               <Phone className="w-4 h-4 mr-2" />
//               Mobile
//             </Button>
//           </div>
          
//           <form onSubmit={handleLogin} className="space-y-4">
//             {loginMethod === 'email' ? (
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input 
//                   id="email" 
//                   type="email" 
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Mobile Number</Label>
//                 <Input 
//                   id="phone" 
//                   type="tel" 
//                   placeholder="Enter your mobile number"
//                   required
//                 />
//               </div>
//             )}
            
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input 
//                 id="password" 
//                 type="password" 
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
            
//             <Button type="submit" className="w-full bg-gradient-to-br from-[#ccadcc] to-[#5b2d89] ">
//               Sign In
//               <ArrowRight className="w-4 h-4 ml-2" />
//             </Button>
//           </form>
          
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <Separator />
//             </div>
//             <div className="relative flex justify-center text-xs uppercase">
//               <span className="bg-white px-2 text-gray-500">Or continue with</span>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             {/* <Button variant="outline" className="flex items-center justify-center">
//               <Chrome className="w-4 h-4 mr-2" />
//               Google
//             </Button> */}
//              <GoogleLogin
//                 onSuccess={(credentialResponse) => {
//                   console.log("Google Credential:", credentialResponse);
//                   navigate('/dashboard'); // Replace with your auth flow
//                 }}
//                 onError={() => {
//                   console.error("Google Login Failed");
//                 }}
//               />
//             <Button variant="outline" className="flex items-center justify-center">
//               <Linkedin className="w-4 h-4 mr-2" />
//               LinkedIn
//             </Button>
//           </div>
          
//           <div className="text-center text-sm">
//             <span className="text-gray-600">Don't have an account? </span>
//             <Link to="/signup" className="text-[#64378e] hover:underline font-medium">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default LoginForm;









// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import {
//   Mail,
//   Phone,
//   Linkedin,
//   ArrowRight,
//   Eye,
//   EyeOff,
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';

// const LoginForm = () => {
//   const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [forgotPassword, setForgotPassword] = useState(false);
//   const [isSignup, setIsSignup] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState('');
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (forgotPassword) {
//       if (!forgotEmail) return alert('Please enter your email');
//       alert(`OTP sent to ${forgotEmail}`);
//       return;
//     }

//     if (isSignup) {
//       const { username, email, phone, password, confirmPassword } = form;
//       if (!username || !email || !phone || !password || !confirmPassword) {
//         alert('Please fill all fields');
//         return;
//       }
//       if (password !== confirmPassword) {
//         alert('Passwords do not match');
//         return;
//       }
//       alert('Signup successful. Please login.');
//       setIsSignup(false);
//       setForm({
//         username: '',
//         email: '',
//         phone: '',
//         password: '',
//         confirmPassword: '',
//       });
//     } else {
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center pb-6">
//           <div className="w-12 h-12 bg-gradient-to-br from-[#ccadcc] to-[#5b2d89] rounded-xl flex items-center justify-center mx-auto mb-4">
//             <span className="text-white font-bold text-lg">M</span>
//           </div>
//           <CardTitle className="text-2xl font-bold">
//             {forgotPassword
//               ? 'Forgot Password'
//               : isSignup
//               // ? 'Create Account'
//               // : 'Welcome Back'
//               }
//           </CardTitle>
//           <p className="text-gray-600">
//             {forgotPassword
//               ? 'Reset your password with email'
//               : isSignup
//               ? 'Sign up to your MIBBS account'
//               : 'Sign in to your MIBBS account'}
//           </p>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {!isSignup && !forgotPassword && (
//             <div className="grid grid-cols-2 gap-4">
//               <Button
//                 variant={loginMethod === 'email' ? 'default' : 'outline'}
//                 onClick={() => setLoginMethod('email')}
//                 className="flex items-center justify-center"
//               >
//                 <Mail className="w-4 h-4 mr-2" />
//                 Email
//               </Button>
//               <Button
//                 variant={loginMethod === 'phone' ? 'default' : 'outline'}
//                 onClick={() => setLoginMethod('phone')}
//                 className="flex items-center justify-center"
//               >
//                 <Phone className="w-4 h-4 mr-2" />
//                 Mobile
//               </Button>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {isSignup && (
//               <div className="space-y-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   name="username"
//                   placeholder="Enter your name"
//                   value={form.username}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             )}

//             {(isSignup || loginMethod === 'email' || forgotPassword) && (
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={forgotPassword ? forgotEmail : form.email}
//                   onChange={(e) =>
//                     forgotPassword
//                       ? setForgotEmail(e.target.value)
//                       : handleChange(e)
//                   }
//                   required
//                 />
//               </div>
//             )}

//             {isSignup || (!isSignup && loginMethod === 'phone') ? (
//               !forgotPassword && (
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Mobile Number</Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     placeholder="Enter your mobile number"
//                     value={form.phone}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               )
//             ) : null}

//             {!forgotPassword && (
//               <div className="space-y-2 relative">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Enter your password"
//                     value={form.password}
//                     onChange={handleChange}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2.5 text-gray-500"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-4 h-4" />
//                     ) : (
//                       <Eye className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}

//             {isSignup && (
//               <div className="space-y-2 relative">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     placeholder="Re-enter your password"
//                     value={form.confirmPassword}
//                     onChange={handleChange}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowConfirmPassword(!showConfirmPassword)
//                     }
//                     className="absolute right-3 top-2.5 text-gray-500"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="w-4 h-4" />
//                     ) : (
//                       <Eye className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}

//             {!isSignup && !forgotPassword && (
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center space-x-2 text-sm text-gray-600">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="accent-[#5b2d89]"
//                   />
//                   <span>Remember Me</span>
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => setForgotPassword(true)}
//                   className="text-sm text-[#64378e] hover:underline"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//             )}

//             <Button
//               type="submit"
//               className="w-full bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]"
//             >
//               {forgotPassword
//                 ? 'Send OTP'
//                 : isSignup
//                 ? 'Sign Up'
//                 : 'Sign In'}
//               <ArrowRight className="w-4 h-4 ml-2" />
//             </Button>
//           </form>

//           {/* Social login section only shown in LOGIN form */}
//           {!isSignup && !forgotPassword && (
//             <>
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <Separator />
//                 </div>
//                 <div className="relative flex justify-center text-xs uppercase">
//                   <span className="bg-white px-2 text-gray-500">
//                     Or continue with
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <GoogleLogin
//                   onSuccess={(res) => {
//                     console.log('Google Login Success', res);
//                     navigate('/dashboard');
//                   }}
//                   onError={() => {
//                     console.error('Google Login Failed');
//                   }}
//                 />
//                 <Button
//                   variant="outline"
//                   className="flex items-center justify-center"
//                 >
//                   <Linkedin className="w-4 h-4 mr-2" />
//                   LinkedIn
//                 </Button>
//               </div>
//             </>
//           )}

//           <div className="text-center text-sm">
//             {forgotPassword ? (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setForgotPassword(false);
//                   setForgotEmail('');
//                 }}
//                 className="text-[#64378e] hover:underline font-medium"
//               >
//                 Back to Login
//               </button>
//             ) : (
//               <>
//                 <span className="text-gray-600">
//                   {isSignup
//                     ? 'Already have an account? '
//                     : "Don't have an account? "}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsSignup(!isSignup);
//                     setForgotPassword(false);
//                     setForgotEmail('');
//                   }}
//                   className="text-[#64378e] hover:underline font-medium"
//                 >
//                   {isSignup ? 'Sign In' : 'Sign Up'}
//                 </button>
//               </>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default LoginForm;




// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import {
//   Mail,
//   Phone,
//   Linkedin,
//   ArrowRight,
//   Eye,
//   EyeOff,
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';



// const LoginForm = () => {
//   debugger;
//   const BASE_URL = 'http://127.0.0.1:8000/api';
//   const navigate = useNavigate();

//   const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [forgotPassword, setForgotPassword] = useState(false);
//   const [isSignup, setIsSignup] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState('');
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (forgotPassword) {
//       if (!forgotEmail) return alert('Please enter your email');
//       alert(`OTP sent to ${forgotEmail}`);
//       return;
//     }

//     const { username, email, phone, password, confirmPassword } = form;

//     if (isSignup) {
//       if (!username || !email || !phone || !password || !confirmPassword) {
//         alert('Please fill all fields');
//         return;
//       }

//       if (password !== confirmPassword) {
//         alert('Passwords do not match');
//         return;
//       }

//       try {
//         const res = await fetch(`${BASE_URL}/registerUser`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ username, email, phone, password }),
//         });

//         const text = await res.text();
//         try {
//           const data = JSON.parse(text);

//           if (res.ok) {
//             alert('Signup successful. Please login.');
//             setIsSignup(false);
//             setForm({
//               username: '',
//               email: '',
//               phone: '',
//               password: '',
//               confirmPassword: '',
//             });
//           } else {
//             const errors = [];
//             if (data.username) errors.push(`Username: ${data.username[0]}`);
//             if (data.email) errors.push(`Email: ${data.email[0]}`);
//             if (data.phone) errors.push(`Phone: ${data.phone[0]}`);
//             alert(errors.join('\n') || 'Registration failed');
//             console.error('Server Error:', data);
//           }
//         } catch {
//           console.error('Expected JSON but got:', text);
//           alert('Invalid server response during signup.');
//         }
//       } catch (err) {
//         console.error('Signup network error:', err);
//         alert('Signup failed. Check your network or server.');
//       }
//     } else {
//       try {
//         const res = await fetch(`${BASE_URL}/login`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, phone, password }),
//         });

//         const text = await res.text();
//         try {
//           const data = JSON.parse(text);
//           if (res.ok) {
//             alert('Login successful');
//             localStorage.setItem('user', JSON.stringify(data.user));
//             navigate('/dashboard');
//           } else {
//             alert(data.error || 'Invalid credentials');
//             console.error('Login Error:', data);
//           }
//         } catch {
//           console.error('Expected JSON but got:', text);
//           alert('Invalid server response during login.');
//         }
//       } catch (err) {
//         console.error('Login network error:', err);
//         alert('Login failed. Check your network or server.');
//       }
//     }

    
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center pb-6">
//           <div className="w-12 h-12 bg-gradient-to-br from-[#ccadcc] to-[#5b2d89] rounded-xl flex items-center justify-center mx-auto mb-4">
//             <span className="text-white font-bold text-lg">M</span>
//           </div>
//           <CardTitle className="text-2xl font-bold">
//             {forgotPassword ? 'Forgot Password' : isSignup ? 'Create Account' : 'Welcome Back'}
//           </CardTitle>
//           <p className="text-gray-600">
//             {forgotPassword
//               ? 'Reset your password with email'
//               : isSignup
//               ? 'Sign up to your MIBBS account'
//               : 'Sign in to your MIBBS account'}
//           </p>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {!isSignup && !forgotPassword && (
//             <div className="grid grid-cols-2 gap-4">
//               <Button
//                 variant={loginMethod === 'email' ? 'default' : 'outline'}
//                 onClick={() => setLoginMethod('email')}
//               >
//                 <Mail className="w-4 h-4 mr-2" />
//                 Email
//               </Button>
//               <Button
//                 variant={loginMethod === 'phone' ? 'default' : 'outline'}
//                 onClick={() => setLoginMethod('phone')}
//               >
//                 <Phone className="w-4 h-4 mr-2" />
//                 Mobile
//               </Button>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {isSignup && (
//               <div className="space-y-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   name="username"
//                   value={form.username}
//                   onChange={handleChange}
//                   required
//                   placeholder="Enter your username"
//                 />
//               </div>
//             )}

//             {(isSignup || loginMethod === 'email' || forgotPassword) && (
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={forgotPassword ? forgotEmail : form.email}
//                   onChange={(e) =>
//                     forgotPassword ? setForgotEmail(e.target.value) : handleChange(e)
//                   }
//                   required
//                   placeholder="Enter your email address"
//                 />
//               </div>
//             )}

//             {isSignup || (!isSignup && loginMethod === 'phone') ? (
//               !forgotPassword && (
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Mobile Number</Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={form.phone}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your mobile number"
//                   />
//                 </div>
//               )
//             ) : null}

//             {!forgotPassword && (
//               <div className="space-y-2 relative">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={form.password}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2.5 text-gray-500"
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>
//             )}

//             {isSignup && (
//               <div className="space-y-2 relative">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     value={form.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     placeholder="Re-enter your password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-2.5 text-gray-500"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>
//             )}

//             {!isSignup && !forgotPassword && (
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center space-x-2 text-sm text-gray-600">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="accent-[#5b2d89]"
//                   />
//                   <span>Remember Me</span>
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => setForgotPassword(true)}
//                   className="text-sm text-[#64378e] hover:underline"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//             )}

//             <Button
//               type="submit"
//               className="w-full bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]"
//             >
//               {forgotPassword ? 'Send OTP' : isSignup ? 'Sign Up' : 'Sign In'}
//               <ArrowRight className="w-4 h-4 ml-2" />
//             </Button>
//           </form>

//           {!isSignup && !forgotPassword && (
//             <>
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <Separator />
//                 </div>
//                 <div className="relative flex justify-center text-xs uppercase">
//                   <span className="bg-white px-2 text-gray-500">Or continue with</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <GoogleLogin
//                   onSuccess={(res) => {
//                     console.log('Google Login Success', res);
//                     navigate('/dashboard');
//                   }}
//                   onError={() => {
//                     console.error('Google Login Failed');
//                   }}
//                 />
//                 <Button variant="outline" className="flex items-center justify-center">
//                   <Linkedin className="w-4 h-4 mr-2" />
//                   LinkedIn
//                 </Button>
//               </div>
//             </>
//           )}

//           <div className="text-center text-sm">
//             {forgotPassword ? (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setForgotPassword(false);
//                   setForgotEmail('');
//                 }}
//                 className="text-[#64378e] hover:underline font-medium"
//               >
//                 Back to Login
//               </button>
//             ) : (
//               <>
//                 <span className="text-gray-600">
//                   {isSignup ? 'Already have an account? ' : "Don't have an account? "}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsSignup(!isSignup);
//                     setForgotPassword(false);
//                     setForgotEmail('');
//                   }}
//                   className="text-[#64378e] hover:underline font-medium"
//                 >
//                   {isSignup ? 'Sign In' : 'Sign Up'}
//                 </button>
//               </>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default LoginForm;








