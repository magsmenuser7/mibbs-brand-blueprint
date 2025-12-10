import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <SignupForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Trusted by over 8,000+ MSMEs across India
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">MSME Certified</span>
            </div>
            <div className="flex items-center space-x-1">
             <div
  className="w-3 h-3 rounded-full"
  style={{
    background: `
      linear-gradient(to bottom, #FF9933 33%, white 33%, white 66%, #128807 66%),
      radial-gradient(circle at center, #000080 20%, transparent 21%)
    `,
    backgroundBlendMode: "overlay",
  }}
></div>
              <span className="text-xs text-gray-600">Made in India</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Hindi Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;