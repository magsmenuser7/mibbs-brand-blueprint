import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthenticationContext';
import EntryScreen from '../componentstwo/flow/EntryScreen';
import AssessmentFlow from '../componentstwo/flow/AssessmentFlow';
import SignupModal from '../componentstwo/flow/SignupModal';
import BudgetPlanScreen from '../componentstwo/flow/BudgetPlanScreen';
import Dashboard from '../componentstwo/dashboard/Dashboard';
import BrandBudgetPreloader from '../componentstwo/flow/BrandBudgetPreloader';

type FlowState =
  | 'entry'
  | 'assessment'
  | 'signup'
  | 'preloader'
  | 'budget-plan'
  | 'dashboard';

const MIBBSApp: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const [flowState, setFlowState] = useState<FlowState>('entry');
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [budgetData, setBudgetData] = useState<any>(null);

  const cmsConfig = {
    signupTiming: 'after' as 'before' | 'after',
    confidenceThreshold: 0.6,
    matchRadiusKm: 50,
  };

  // Sync user data if logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserData(user);
    }
  }, [isAuthenticated, user]);

  // If user previously completed flow, go to dashboard
  useEffect(() => {
    const hasCompletedFlow = localStorage.getItem('mibbs_flow_completed');
    if (isAuthenticated && hasCompletedFlow) {
      setFlowState('dashboard');
    }
  }, [isAuthenticated]);

  const handleUserTypeSelection = (type: 'existing' | 'new') => {
    if (type === 'existing') {
      setFlowState('entry');
    } else {
      setFlowState(cmsConfig.signupTiming === 'before' ? 'signup' : 'assessment');
    }
  };

  const handleAssessmentComplete = (data: any) => {
    setAssessmentData(data);
    setFlowState(cmsConfig.signupTiming === 'after' ? 'signup' : 'preloader');
  };

  const handleSignupComplete = (userFromSignup: any) => {
    setUserData(userFromSignup ?? user ?? null);
    setFlowState('preloader');
  };

  const handlePreloaderComplete = () => {
    if (assessmentData) {
      const budget = calculateBudget(assessmentData);
      setBudgetData(budget);
    }
    setFlowState('budget-plan');
  };

  const handleContinueToDashboard = () => {
    localStorage.setItem('mibbs_flow_completed', 'true');
    setFlowState('dashboard');
  };

  const calculateBudget = (data: any) => {
    const monthlyRevenue = data?.monthlyRevenue ?? 48000;
    const annualRevenue = monthlyRevenue * 12;

    let marketingPercent = 6;
    if (data?.industryDetails?.marketingSpendRange) {
      const range = data.industryDetails.marketingSpendRange;
      const match = String(range).match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)/);
      if (match) {
        marketingPercent = (parseFloat(match[1]) + parseFloat(match[2])) / 2;
      } else {
        const single = String(range).match(/(\d+(?:\.\d+)?)/);
        if (single) marketingPercent = parseFloat(single[1]);
      }
    }

    const annualBudget = Math.round((annualRevenue * marketingPercent) / 100);

    return {
      annualBudget,
      monthlyBudget: Math.round(annualBudget / 12),
      allocations: [
        { channel: 'Digital Marketing', percent: 40, amount: Math.round(annualBudget * 0.4) },
        { channel: 'Brand & Creative', percent: 25, amount: Math.round(annualBudget * 0.25) },
        { channel: 'Traditional Media', percent: 20, amount: Math.round(annualBudget * 0.2) },
        { channel: 'Events & PR', percent: 15, amount: Math.round(annualBudget * 0.15) },
      ],
      industry: data?.industry,
      location: { city: data?.city, state: data?.state, pincode: data?.pincode },
      monthlyRevenue,
      annualRevenue,
      marketingPercent,
      industryData: data?.industryDetails,
    };
  };

  // Render flow screens based on flowState
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
          onClose={() =>
            setFlowState(cmsConfig.signupTiming === 'after' ? 'assessment' : 'entry')
          }
          assessmentData={assessmentData}
        />
      );

    case 'preloader':
      return (
        <BrandBudgetPreloader
          userData={userData}
          assessmentData={assessmentData}
          onComplete={handlePreloaderComplete}
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













// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthenticationContext';
// import EntryScreen from '../componentstwo/flow/EntryScreen';
// import AssessmentFlow from '../componentstwo/flow/AssessmentFlow';
// import SignupModal from '../componentstwo/flow/SignupModal';
// import BudgetPlanScreen from '../componentstwo/flow/BudgetPlanScreen';
// import Dashboard from '../componentstwo/dashboard/Dashboard';
// import BrandBudgetPreloader from '../componentstwo/flow/BrandBudgetPreloader';



// type FlowState =
//   | 'entry'
//   | 'assessment'
//   | 'signup'
//   | 'preloader'
//   | 'budget-plan'
//   | 'dashboard';

// const MIBBSApp: React.FC = () => {


//   const { isAuthenticated, user } = useAuth();

//   const [flowState, setFlowState] = useState<FlowState>('entry');
//   const [assessmentData, setAssessmentData] = useState<any>(null);
//   const [userData, setUserData] = useState<any>(null); // <-- declared here
//   const [budgetData, setBudgetData] = useState<any>(null);

//   const cmsConfig = {
//     signupTiming: 'after' as 'before' | 'after',
//     confidenceThreshold: 0.6,
//     matchRadiusKm: 50,
//   };

//   // If the auth context already has a logged in user, sync it into local userData
//   useEffect(() => {
//     if (isAuthenticated && user) {
//       setUserData(user);
//     }
//   }, [isAuthenticated, user]);

//   // If user previously completed entire flow -> go straight to dashboard
//   useEffect(() => {
//     const hasCompletedFlow = localStorage.getItem('mibbs_flow_completed');
//     if (isAuthenticated && hasCompletedFlow) {
//       setFlowState('dashboard');
//     }
//   }, [isAuthenticated]);

//   const handleUserTypeSelection = (type: 'existing' | 'new') => {
//     if (type === 'existing') {
//       setFlowState('entry');
//     } else {
//       if (cmsConfig.signupTiming === 'before') {
//         setFlowState('signup');
//       } else {
//         setFlowState('assessment');
//       }
//     }
//   };

//   const handleAssessmentComplete = (data: any) => {
//     setAssessmentData(data);

//     if (cmsConfig.signupTiming === 'after') {
//       setFlowState('signup');
//     } else {
//       setFlowState('preloader');
//     }
//   };

//   // Called when SignupModal reports signup/login success
//   const handleSignupComplete = (userFromSignup: any) => {
//     // ensure we save userData locally
//     setUserData(userFromSignup ?? user ?? null);

//     // move to preloader
//     setFlowState('preloader');
//   };

//   const handlePreloaderComplete = () => {
//     if (assessmentData) {
//       const budget = calculateBudget(assessmentData);
//       setBudgetData(budget);
//     }
//     setFlowState('budget-plan');
//   };

//   const handleContinueToDashboard = () => {
//     localStorage.setItem('mibbs_flow_completed', 'true');
//     setFlowState('dashboard');
//   };

//   const calculateBudget = (data: any) => {
//     const monthlyRevenue = data?.monthlyRevenue ?? 48000;
//     const annualRevenue = monthlyRevenue * 12;

//     let marketingPercent = 6;
//     if (data?.industryDetails?.marketingSpendRange) {
//       const range = data.industryDetails.marketingSpendRange;
//       const match = String(range).match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)/);
//       if (match) {
//         marketingPercent = (parseFloat(match[1]) + parseFloat(match[2])) / 2;
//       } else {
//         const single = String(range).match(/(\d+(?:\.\d+)?)/);
//         if (single) marketingPercent = parseFloat(single[1]);
//       }
//     }

//     const annualBudget = Math.round((annualRevenue * marketingPercent) / 100);

//     return {
//       annualBudget,
//       monthlyBudget: Math.round(annualBudget / 12),
//       allocations: [
//         { channel: 'Digital Marketing', percent: 40, amount: Math.round(annualBudget * 0.4) },
//         { channel: 'Brand & Creative', percent: 25, amount: Math.round(annualBudget * 0.25) },
//         { channel: 'Traditional Media', percent: 20, amount: Math.round(annualBudget * 0.2) },
//         { channel: 'Events & PR', percent: 15, amount: Math.round(annualBudget * 0.15) },
//       ],
//       industry: data?.industry,
//       location: { city: data?.city, state: data?.state, pincode: data?.pincode },
//       monthlyRevenue,
//       annualRevenue,
//       marketingPercent,
//       industryData: data?.industryDetails,
//     };
//   };

//   switch (flowState) {
//     case 'entry':
//       return <EntryScreen onUserTypeSelection={handleUserTypeSelection} />;

//     case 'assessment':
//       return (
//         <AssessmentFlow
//           onComplete={handleAssessmentComplete}
//           onBack={() => setFlowState('entry')}
//           cmsConfig={cmsConfig}
//         />
//       );

//     case 'signup':
//       return (
//         <SignupModal
//           isOpen={true}
//           onComplete={handleSignupComplete}
//           onClose={() =>
//             setFlowState(cmsConfig.signupTiming === 'after' ? 'assessment' : 'entry')
//           }
//           assessmentData={assessmentData}
//         />
//       );

//     case 'preloader':
//       return (
//         <BrandBudgetPreloader
//           userData={userData}                 // now defined
//           assessmentData={assessmentData}
//           onComplete={handlePreloaderComplete}
//         />
//       );

//     case 'budget-plan':
//       return (
//         <BudgetPlanScreen
//           budgetData={budgetData}
//           assessmentData={assessmentData}
//           onContinueToDashboard={handleContinueToDashboard}
//         />
//       );

//     case 'dashboard':
//       return <Dashboard />;

//     default:
//       return <EntryScreen onUserTypeSelection={handleUserTypeSelection} />;
//   }
// };

// export default MIBBSApp;










// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthenticationContext';
// import EntryScreen from '../componentstwo/flow/EntryScreen';
// import AssessmentFlow from '../componentstwo/flow/AssessmentFlow';
// import SignupModal from '../componentstwo/flow/SignupModal';
// import BudgetPlanScreen from '../componentstwo/flow/BudgetPlanScreen';
// import Dashboard from '../componentstwo/dashboard/Dashboard';
// import BrandBudgetPreloader from '../componentstwo/flow/BrandBudgetPreloader';

// type FlowState = 'entry' | 'assessment' | 'signup' | 'preloader' | 'budget-plan' | 'dashboard';


// const MIBBSApp: React.FC = () => {
//   const { isAuthenticated, user } = useAuth();
//   const [flowState, setFlowState] = useState<FlowState>('entry');
//   const [assessmentData, setAssessmentData] = useState<any>(null);
//   const [budgetData, setBudgetData] = useState<any>(null);
//   const [preloaderPayload, setPreloaderPayload] = useState<any>(null);
  
//   // CMS configuration - in production this would come from API
//   const cmsConfig = {
//     signupTiming: 'after' as 'before' | 'after',
//     confidenceThreshold: 0.6,
//     matchRadiusKm: 50
//   };

//   useEffect(() => {
//     // Check if user has completed full flow
//     const hasCompletedFlow = localStorage.getItem('mibbs_flow_completed');
//     if (isAuthenticated && hasCompletedFlow) {
//       setFlowState('dashboard');
//     }
//   }, [isAuthenticated]);

//   const handleUserTypeSelection = (type: 'existing' | 'new') => {
//     if (type === 'existing') {
//       // Navigate to signin - for now just show entry
//       setFlowState('entry');
//     } else {
//       if (cmsConfig.signupTiming === 'before') {
//         setFlowState('signup');
//       } else {
//         setFlowState('assessment');
//       }
//     }
//   };

//   const handleAssessmentComplete = (data: any) => {
//     setAssessmentData(data);
    
//     if (cmsConfig.signupTiming === 'after') {
//       setFlowState('signup');
//     } else {
//       generateBudgetPlan(data);
//     }
//   };

//   const handleSignupComplete = (userData: any) => {
//     if (assessmentData) {
//       generateBudgetPlan(assessmentData);
//     } else if (cmsConfig.signupTiming === 'before') {
//       setFlowState('assessment');
//     }
//   };

//   const generateBudgetPlan = (data: any) => {
//     // Generate budget plan
//     const budget = calculateBudget(data);
//     setBudgetData(budget);
//     setFlowState('budget-plan');
//   };

//   const handleContinueToDashboard = () => {
//     localStorage.setItem('mibbs_flow_completed', 'true');
//     setFlowState('dashboard');
//   };

//   const calculateBudget = (data: any) => {
//     // Use monthly revenue to calculate annual budget
//     const monthlyRevenue = data.monthlyRevenue || 48000; // Default if no revenue
//     const annualRevenue = monthlyRevenue * 12;
    
//     // Get industry-specific marketing spend percentage
//     const industryData = data.industryDetails;
//     let marketingPercent = 6; // Default
    
//     if (industryData) {
//       // Extract percentage from range like "5-6%" -> use average
//       const percentRange = industryData.marketingSpendRange;
//       const matches = percentRange.match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)/);
//       if (matches) {
//         const min = parseFloat(matches[1]);
//         const max = parseFloat(matches[2]);
//         marketingPercent = (min + max) / 2;
//       } else {
//         // Handle single percentage like "6%"
//         const singleMatch = percentRange.match(/(\d+(?:\.\d+)?)/);
//         if (singleMatch) {
//           marketingPercent = parseFloat(singleMatch[1]);
//         }
//       }
//     }
    
//     const annualBudget = Math.round(annualRevenue * marketingPercent / 100);

//     return {
//       annualBudget,
//       monthlyBudget: Math.round(annualBudget / 12),
//       allocations: [
//         { channel: 'Digital Marketing', percent: 40, amount: Math.round(annualBudget * 0.4) },
//         { channel: 'Brand & Creative', percent: 25, amount: Math.round(annualBudget * 0.25) },
//         { channel: 'Traditional Media', percent: 20, amount: Math.round(annualBudget * 0.2) },
//         { channel: 'Events & PR', percent: 15, amount: Math.round(annualBudget * 0.15) }
//       ],
//       industry: data.industry,
//       location: { city: data.city, state: data.state, pincode: data.pincode },
//       monthlyRevenue: monthlyRevenue,
//       annualRevenue: annualRevenue,
//       marketingPercent: marketingPercent,
//       industryData: data.industryDetails
//     };
//   };

//   const getIndustryPercent = (industry: string) => {
//     const percentages: Record<string, number> = {
//       'Retail & E-Commerce': 10,
//       'SaaS / Tech': 12,
//       'Healthcare': 8,
//       'Manufacturing': 5,
//       'FMCG': 8,
//       'Education': 10
//     };
//     return percentages[industry] || 8;
//   };

//   switch (flowState) {
//     case 'entry':
//       return <EntryScreen onUserTypeSelection={handleUserTypeSelection} />;
    
//     case 'assessment':
//       return (
//         <AssessmentFlow 
//           onComplete={handleAssessmentComplete}
//           onBack={() => setFlowState('entry')}
//           cmsConfig={cmsConfig}
//         />
//       );
    
//     case 'signup':
//       return (
//         <SignupModal
//           isOpen={true}
//           onComplete={handleSignupComplete}
//           onClose={() => setFlowState(cmsConfig.signupTiming === 'after' ? 'assessment' : 'entry')}
//           assessmentData={assessmentData}
//         />
//       );
    
//     case 'budget-plan':
//       return (
//         <BudgetPlanScreen
//           budgetData={budgetData}
//           assessmentData={assessmentData}
//           onContinueToDashboard={handleContinueToDashboard}
//         />
//       );
    
//     case 'dashboard':
//       return <Dashboard />;
    
//     default:
//       return <EntryScreen onUserTypeSelection={handleUserTypeSelection} />;
//   }
// };

// export default MIBBSApp;