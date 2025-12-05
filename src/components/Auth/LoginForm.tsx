import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://api.mibbs.ai/api'; // change if needed

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // Auth Context login
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
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
        // Save user globally in context
        await authLogin(data.user.email, data.user.username);

        // Save user in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to dashboard under MIBBSApp
        setTimeout(() => {
          navigate('/mibbsapp/', { replace: true });
        }, 800);
      } else {
        setErrors({ general: data.message || "Invalid email or password" });
      }
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-3xl font-bold">MIBBS</span>
        </div>
        <p className="text-gray-600">Sign in to your brand command center</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary focus:border-mibbs-primary transition-colors"
              placeholder="you@business.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary focus:border-mibbs-primary transition-colors"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-mibbs-primary focus:ring-mibbs-primary" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button type="button" className="text-sm text-mibbs-primary hover:text-mibbs-secondary">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-mibbs-gradient text-white py-3 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-mibbs-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Quick login for demo:</p>
            <div className="flex space-x-2 justify-center items-center">
              <button
                type="button"
                onClick={() => navigate('/mibbsapp')}
                // onClick={() => setFormData({ email: 'demo@example.com', password: 'demo123' })}
                className="px-3 py-1 bg-mibbs-light text-mibbs-primary rounded hover:bg-purple-100"
              >
                First Time User
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-3 py-1 bg-mibbs-light text-mibbs-primary rounded hover:bg-purple-100"
              >
                Back To Home
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;







// import React, { useState } from 'react';
// import { Eye, EyeOff, Mail, Lock, Building2 } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import { useNavigate } from "react-router-dom";

// interface LoginFormProps {
//   onToggleMode: () => void;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const { login, isLoading } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrors({});

//     try {
//       await login(formData.email, formData.password);

//       // ✅ Redirect after successful login
//       navigate("/mibbsapp", { replace: true });

//     } catch (error) {
//       setErrors({ general: 'Invalid email or password' });
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//     if (errors[e.target.name]) {
//       setErrors(prev => ({ ...prev, [e.target.name]: '' }));
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="text-center mb-8">
//         <div className="flex justify-center items-center space-x-3 mb-2">
//           <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//             <span className="text-white font-bold text-xl">M</span>
//           </div>
//           <span className="text-3xl font-bold">MIBBS</span>
//         </div>
//         <p className="text-gray-600">Sign in to your brand command center</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {errors.general && (
//           <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-sm text-red-600">{errors.general}</p>
//           </div>
//         )}

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary focus:border-mibbs-primary transition-colors"
//               placeholder="you@business.com"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Password
//           </label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mibbs-primary focus:border-mibbs-primary transition-colors"
//               placeholder="Enter your password"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <label className="flex items-center">
//             <input type="checkbox" className="rounded border-gray-300 text-mibbs-primary focus:ring-mibbs-primary" />
//             <span className="ml-2 text-sm text-gray-600">Remember me</span>
//           </label>
//           <button type="button" className="text-sm text-mibbs-primary hover:text-mibbs-secondary">
//             Forgot password?
//           </button>
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-mibbs-gradient text-white py-3 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-mibbs-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? 'Signing in...' : 'Sign In'}
//         </button>

//         <div className="text-center">
//           <p className="text-gray-600">
//             Don't have an account?{' '}
//             <button
//               type="button"
//               onClick={onToggleMode}
//               className="text-mibbs-primary hover:text-mibbs-secondary font-medium"
//             >
//               Sign up for free
//             </button>
//           </p>
//         </div>

//         <div className="mt-6 pt-6 border-t border-gray-200">
//           <div className="text-center">
//             <p className="text-xs text-gray-500 mb-2">Quick login for demo:</p>
//             <div className="flex space-x-2 text-xs flex justify-center items-center">
//               <button
//                 type="button"
//                 onClick={() => setFormData({ email: 'demo@example.com', password: 'demo123' })}
//                 className="px-3 py-1 bg-mibbs-light text-mibbs-primary rounded hover:bg-purple-100"
//               >
//                 Existing User
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setFormData({ email: 'new@example.com', password: 'new123' });
//                   navigate('/onboarding');
//                 }}
//                 className="px-3 py-1 bg-mibbs-light text-mibbs-primary rounded hover:bg-purple-100"
//               >
//                 First Time User
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate('/')}
//                 className="px-3 py-1 bg-mibbs-light text-mibbs-primary rounded hover:bg-purple-100"
//               >
//                 Back To Home
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
