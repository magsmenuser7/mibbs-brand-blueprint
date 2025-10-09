import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthenticationContext';
import EntryScreen from '../componentstwo/flow/EntryScreen';
import AssessmentFlow from '../componentstwo/flow/AssessmentFlow';
import SignupModal from '../componentstwo/flow/SignupModal';
import BudgetPlanScreen from '../componentstwo/flow/BudgetPlanScreen';
import Dashboard from '../componentstwo/dashboard/Dashboard';

type FlowState = 'entry' | 'assessment' | 'signup' | 'budget-plan' | 'dashboard';

const MIBBSApp: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [flowState, setFlowState] = useState<FlowState>('entry');
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [budgetData, setBudgetData] = useState<any>(null);
  
  // CMS configuration - in production this would come from API
  const cmsConfig = {
    signupTiming: 'after' as 'before' | 'after',
    confidenceThreshold: 0.6,
    matchRadiusKm: 50
  };

  useEffect(() => {
    // Check if user has completed full flow
    const hasCompletedFlow = localStorage.getItem('mibbs_flow_completed');
    if (isAuthenticated && hasCompletedFlow) {
      setFlowState('dashboard');
    }
  }, [isAuthenticated]);

  const handleUserTypeSelection = (type: 'existing' | 'new') => {
    if (type === 'existing') {
      // Navigate to signin - for now just show entry
      setFlowState('entry');
    } else {
      if (cmsConfig.signupTiming === 'before') {
        setFlowState('signup');
      } else {
        setFlowState('assessment');
      }
    }
  };

  const handleAssessmentComplete = (data: any) => {
    setAssessmentData(data);
    
    if (cmsConfig.signupTiming === 'after') {
      setFlowState('signup');
    } else {
      generateBudgetPlan(data);
    }
  };

  const handleSignupComplete = (userData: any) => {
    if (assessmentData) {
      generateBudgetPlan(assessmentData);
    } else if (cmsConfig.signupTiming === 'before') {
      setFlowState('assessment');
    }
  };

  const generateBudgetPlan = (data: any) => {
    // Generate budget plan
    const budget = calculateBudget(data);
    setBudgetData(budget);
    setFlowState('budget-plan');
  };

  const handleContinueToDashboard = () => {
    localStorage.setItem('mibbs_flow_completed', 'true');
    setFlowState('dashboard');
  };

  const calculateBudget = (data: any) => {
    // Use monthly revenue to calculate annual budget
    const monthlyRevenue = data.monthlyRevenue || 48000; // Default if no revenue
    const annualRevenue = monthlyRevenue * 12;
    
    // Get industry-specific marketing spend percentage
    const industryData = data.industryDetails;
    let marketingPercent = 6; // Default
    
    if (industryData) {
      // Extract percentage from range like "5-6%" -> use average
      const percentRange = industryData.marketingSpendRange;
      const matches = percentRange.match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)/);
      if (matches) {
        const min = parseFloat(matches[1]);
        const max = parseFloat(matches[2]);
        marketingPercent = (min + max) / 2;
      } else {
        // Handle single percentage like "6%"
        const singleMatch = percentRange.match(/(\d+(?:\.\d+)?)/);
        if (singleMatch) {
          marketingPercent = parseFloat(singleMatch[1]);
        }
      }
    }
    
    const annualBudget = Math.round(annualRevenue * marketingPercent / 100);

    return {
      annualBudget,
      monthlyBudget: Math.round(annualBudget / 12),
      allocations: [
        { channel: 'Digital Marketing', percent: 40, amount: Math.round(annualBudget * 0.4) },
        { channel: 'Brand & Creative', percent: 25, amount: Math.round(annualBudget * 0.25) },
        { channel: 'Traditional Media', percent: 20, amount: Math.round(annualBudget * 0.2) },
        { channel: 'Events & PR', percent: 15, amount: Math.round(annualBudget * 0.15) }
      ],
      industry: data.industry,
      location: { city: data.city, state: data.state, pincode: data.pincode },
      monthlyRevenue: monthlyRevenue,
      annualRevenue: annualRevenue,
      marketingPercent: marketingPercent,
      industryData: data.industryDetails
    };
  };

  const getIndustryPercent = (industry: string) => {
    const percentages: Record<string, number> = {
      'Retail & E-Commerce': 10,
      'SaaS / Tech': 12,
      'Healthcare': 8,
      'Manufacturing': 5,
      'FMCG': 8,
      'Education': 10
    };
    return percentages[industry] || 8;
  };

  switch (flowState) {
    case 'entry':
      return <EntryScreen onUserTypeSelection={handleUserTypeSelection} />;
    
    case 'assessment':
      return (
        <AssessmentFlow 
          onComplete={handleAssessmentComplete}
          onBack={() => setFlowState('entry')}
          cmsConfig={cmsConfig}
        />
      );
    
    case 'signup':
      return (
        <SignupModal
          isOpen={true}
          onComplete={handleSignupComplete}
          onClose={() => setFlowState(cmsConfig.signupTiming === 'after' ? 'assessment' : 'entry')}
          assessmentData={assessmentData}
        />
      );
    
    case 'budget-plan':
      return (
        <BudgetPlanScreen
          budgetData={budgetData}
          assessmentData={assessmentData}
          onContinueToDashboard={handleContinueToDashboard}
        />
      );
    
    case 'dashboard':
      return <Dashboard />;
    
    default:
      return <EntryScreen onUserTypeSelection={handleUserTypeSelection} />;
  }
};

export default MIBBSApp;