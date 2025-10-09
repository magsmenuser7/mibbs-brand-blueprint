import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Calculator from "./pages/Calculator";
import BudgetingFormPage from "./pages/BudgetingForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Questionnaire from "./pages/Questionnarie";
import FacebookAdsCalculatorPage from "./pages/FacebookAdsCalculator";
import WebsiteCostCalculatorPage from "./pages/WebsiteCostCalculator";
import Report from "./pages/Report";
import Analytics from "./pages/Analytics";
import StartBudgetingForm from "./pages/StartBudgetingForm";
import Generate from "./pages/Generate";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LoginForm from "./components/auth/LoginForm";
import Logo from "./components/Logo";
import MIBBSApp from './componentstwo/MIBBSApp';





// Updated Home Page pages
import HeaderNew from './components/UpdatedHomePage/Header';
import HeroNew from './components/UpdatedHomePage/Hero';
import Problem from './components/UpdatedHomePage/Problem';
import Features from './components/UpdatedHomePage/Features';
import HowItWorksNew from './components/UpdatedHomePage/HowItWorks';
import WhoItsFor from './components/UpdatedHomePage/WhoItsFor';
import ProductPreview from './components/UpdatedHomePage/ProductPreview';
import Testimonials from './components/UpdatedHomePage/Testimonials';
import FAQNew from './components/UpdatedHomePage/FAQ';
import FinalCTA from './components/UpdatedHomePage/FinalCTA';
import FooterNew from './components/UpdatedHomePage/Footer';
import PrivacyPolicyNew from './components/UpdatedHomePage/PrivacyPolicy';






// User Dashboard  Authenticartion
import { AuthenticateProvider } from "./contexts/AuthenticationContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./components/auth/AuthPage";
import WelcomeOnboarding from "./components/onboarding/WelcomeOnboarding";
import BudgetingQuestionnaire from "./components/budgeting/BudgetingQuestionnaire";
import BudgetReport from "./components/budgeting/BudgetReport";
import CMSDashboard from "./components/cms/CMSDashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserTypeSelection from "./components/UserTypeSelection";

const queryClient = new QueryClient();



// Enterprises user authentication  and  dashboard 
import LandingPage from './components/LandingPage';
import DashboardEnterprises from './components/DashboardEnterprises';
import LoginEnterprises from './components/LoginEnterprises';


//Agency Dashboard 
import AuthScreen from './components/AuthScreen';
import AgencyPortal from './components/AgencyPortal/AgencyPortal';



// Extra Components (new code merged here)
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyChoose from "./components/WhyChoose";
import Certification from "./components/Certification";
import HowItWorksAgency from "./components/HowItWorksAgency"; // ✅ renamed to avoid clash
import DashboardAgency from "./components/DashboardAgency";
import FooterAgency from "./components/FooterAgency";
import SuccessStories from "./components/SuccessStories";
import PricingAgency from "./components/PricingAgency";
import FAQ from "./components/FAQ";






// --- AppContent that uses useAuth for user dashboard  ---
const AppContent: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [showBudgetReport, setShowBudgetReport] = React.useState(false);
  const [budgetData, setBudgetData] = React.useState<any>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (user?.isFirstLogin && !showOnboarding && !user?.hasBudget) {
    return (
      <WelcomeOnboarding
        onComplete={(data) => {
          setShowOnboarding(true);
          localStorage.setItem("mibbs_onboarding", JSON.stringify(data));
        }}
      />
    );
  }

  if ((showOnboarding || user?.isFirstLogin) && !user?.hasBudget && !showBudgetReport) {
    return <BudgetingQuestionnaire />;
  }

  if (showBudgetReport && budgetData) {
    return (
      <BudgetReport
        budgetData={budgetData}
        onContinueToDashboard={() => setShowBudgetReport(false)}
      />
    );
  }

  return <CMSDashboard />;
};





// --- Final App ---
const App = () => (
  <GoogleOAuthProvider clientId="1064045400562-lljdlndc03j31gh3e3njeegd4p79ms4l.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.DEV ? "/mibbs-brand-blueprint" : "/"}>
          <Analytics />
          {/* ✅ Wrap everything in AuthProvider */}
          <AuthProvider>
            <Routes>
              {/* Public Pages */}
              <Route element={<Layout />}>

                {/* ✅ Homepage Route */}
                <Route
                  path="/"
                  element={
                    <div className="min-h-screen bg-gray-50 text-gray-800">
                      {/* <HeaderNew /> */}
                      <HeroNew />
                      <Problem />
                      <Features />
                      <HowItWorksNew />
                      <WhoItsFor />
                      <ProductPreview />
                      <Testimonials />
                      <FAQNew />
                      <FinalCTA />
                      <FooterNew />
                      {/* <PrivacyPolicyNew /> */}
                    </div>
                  }
                />



                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/brand-budget-planner" element={<BudgetingFormPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/tools/facebook-ads" element={<FacebookAdsCalculatorPage />} />
                <Route path="/tools/website-cost" element={<WebsiteCostCalculatorPage />} />
                <Route path="/report" element={<Report />} />
                <Route path="/start-budgeting-form" element={<StartBudgetingForm />} />
                <Route path="/generate" element={<Generate />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
                {/* <Route path="/budgeting-dashboard" element={<Dashboard />} /> */}

                {/* Enterprises Dashboard */}
                <Route path="/enterprises" element={<LandingPage />} />
                <Route path="/enterprises-dashboard" element={<DashboardEnterprises />} />
                <Route path="/enterprises-login" element={<LoginEnterprises />} />
                <Route path="/budgeting-questionnaire" element={<BudgetingQuestionnaire  />} />
              </Route>

              {/* Protected User Dashboard  */}
              <Route path="/dashboard/*" element={<AppContent />} />
              <Route path="/onboarding" element={<WelcomeOnboarding onComplete={() => {}} />} />
              <Route path="/cms-dashboard" element={<CMSDashboard />} />
              

              <Route path="/agency-login" element={<AuthScreen />} />
              <Route path="/agency/*" element={<AgencyPortal />} />
              <Route path="/login" element={<Login />} />


              <Route path="/user-type-selection" element={<UserTypeSelection />} />
              
              
              
              <Route
                path="/mibbsapp"
                element={
                  <AuthenticateProvider>
                    <MIBBSApp />
                
                  </AuthenticateProvider>
                }
              />



              





              {/* ✅ New "One-Page Landing" version */}
                <Route
                  path="/landing"
                  element={
                    <div className="min-h-screen bg-white">
                      <Header />
                      <Hero />
                      <WhyChoose />
                      <HowItWorksAgency />
                      <DashboardAgency />
                      <PricingAgency />
                      <Certification />
                      <SuccessStories />
                      <FAQ />
                      <FooterAgency />
                    </div>
                  }
                />



            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;



