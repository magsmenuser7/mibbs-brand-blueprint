import React from 'react';
import { Users, UserPlus, ArrowRight, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface EntryScreenProps {
  onUserTypeSelection: (type: 'existing' | 'new') => void;
}

const EntryScreen: React.FC<EntryScreenProps> = ({ onUserTypeSelection }) => {
    const navigate = useNavigate();
    

    
  return (
    <div className="min-h-screen bg-gradient-to-br from-mibbs-light via-white to-pink-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-mibbs-gradient rounded-2xl flex items-center justify-center animate-float">
              {/* <Building2 className="w-8 h-8 text-white" /> */}
               <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-4xl font-bold text-gray-900">MIBBS</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MIBBS
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Budget Smarter, Grow Faster - Your AI-powered brand building companion for MSMEs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Existing User */}
          <button onClick={() => { onUserTypeSelection('existing'); navigate('/dashboard'); }}
            className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-mibbs-primary"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-mibbs-primary to-mibbs-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Existing User</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Already have a MIBBS account? Sign in to access your dashboard, track campaigns, and manage your brand growth.
              </p>
              <div className="flex items-center justify-center space-x-2 text-mibbs-primary font-semibold group-hover:text-mibbs-secondary transition-colors">
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* First Time User */}
          <button
            onClick={() => onUserTypeSelection('new')}
            className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-mibbs-accent"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-mibbs-accent to-mibbs-pink rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">First Time User</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Start my brand budgeting (1 credit). Let's create your personalized brand budget plan and connect you with the right agencies.
              </p>
              <div className="flex items-center justify-center space-x-2 text-mibbs-accent font-semibold group-hover:text-mibbs-pink transition-colors">
                <span>Start My Brand Budgeting</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>MSME Certified Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-mibbs-primary rounded-full"></div>
              <span>8,000+ Businesses Trust Us</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-mibbs-accent rounded-full"></div>
              <span>Made in India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;