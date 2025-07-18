
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
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
import { json } from "stream/consumers";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Questionnaire from "./pages/Questionnarie";
import FacebookAdsCalculatorPage from "./pages/FacebookAdsCalculator";
import WebsiteCostCalculatorPage from "./pages/WebsiteCostCalculator";
import Report from "./pages/Report";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';





const queryClient = new QueryClient();

const App = () => (

  <GoogleOAuthProvider clientId="1064045400562-lljdlndc03j31gh3e3njeegd4p79ms4l.apps.googleusercontent.com">
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/brand-budget-planner" element={<BudgetingFormPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/tools/facebook-ads" element={<FacebookAdsCalculatorPage />} />
            <Route path="/tools/website-cost" element={<WebsiteCostCalculatorPage />} />
            <Route path="/report" element={<Report />} />
           
          </Route>
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </GoogleOAuthProvider>


 
);

export default App;
