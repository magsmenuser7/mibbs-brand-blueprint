import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Mail, User, Building } from 'lucide-react';

const LoginEnterprises = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    company: ''
  });

  const roles = [
    'CMO',
    'CFO', 
    'Marketing Head',
    'Procurement',
    'Legal',
    'Regional Head'
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (formData.email.includes('@') && formData.email.includes('.')) {
      setStep(2);
    }
  };

  const handleRoleSubmit = (e) => {
    e.preventDefault();
    if (formData.role) {
      setStep(3);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // Simulate 2FA verification
    setStep(4);
    setTimeout(() => {
      navigate('/enterprises-dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {/* <img 
              src="/src/assets/mibbs 1.png" 
              alt="MIBBS Logo" 
              className="w-10 h-10 object-contain"
            /> */}
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Enterprise
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure Enterprise Access</h1>
          <p className="text-gray-600">Step {step} of 4</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900">Enter Business Email</h2>
              <p className="text-gray-600 text-sm mt-2">Use your verified company domain</p>
            </div>
            
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Role Selection */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900">Select Your Role</h2>
              <p className="text-gray-600 text-sm mt-2">This determines your dashboard access</p>
            </div>
            
            <form onSubmit={handleRoleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({...formData, role})}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.role === role
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 text-gray-700'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
              
              <button
                type="submit"
                disabled={!formData.role}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Company Info */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <Building className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900">Company Information</h2>
              <p className="text-gray-600 text-sm mt-2">Help us customize your experience</p>
            </div>
            
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Step 4: 2FA Verification */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying Access</h2>
            <p className="text-gray-600 mb-6">Authenticating your enterprise credentials...</p>
            
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          </div>
        )}

        {/* Security Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            🔒 Enterprise-grade security with role-based access control
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginEnterprises;