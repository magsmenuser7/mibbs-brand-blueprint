

import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Repeat2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';

// Define a type for the budget allocation data
interface BudgetAllocation {
  name: string;
  value: number;
  color: string;
}

const Generate = () => {
  const navigate = useNavigate();
  const reportRef = useRef(null);

  // Placeholder data - this would typically come from a state or props
  const brandBudgetRecommendation = {
    branding: {
      companyName: "",
      industry: "Food & Beverage",
      businessType: "B2B",
      businessStage: "Entry Level",
      timeFrame: "", // Added to fix the error
    },
    totalPlannedBudget: "₹1,80,000",
    budgetSummary: "This estimated budget of ₹1,80,000 aims to bolster brand visibility and engagement among B2B clients, directly challenging competitors in the brand strategy sector.",
    recommendedBudgetAllocation: [
        { name: "Brand Identity", value: 20, color: '#40306F' },
        { name: "Digital Marketing", value: 20, color: '#5A3D9E' },
        { name: "Product Development", value: 20, color: '#7E63BE' },
        { name: "Market Research", value: 15, color: '#8FD0DB' },
        { name: "Content Creation", value: 10, color: '#32BAD5' },
        { name: "Packaging & Design", value: 5, color: '#57D97A' },
        { name: "Contingency", value: 5, color: '#97E6AC' },
        { name: "Brand Awareness", value: 5, color: '#CFFBE1' },
    ],
    recommendedBudgetDetails: [
        { category: 'LinkedIn Post Campaigns for Lead Generation', value: 100000 },
        { category: 'Industry Webinars for Thought Leadership', value: 75000 },
        { category: 'Content Marketing (Blogs & Case Studies)', value: 50000 },
        { category: 'Email Marketing for Nurturing Leads', value: 20000 },
    ],
    strategicRecommendations: [
      "Deploy precision-targeted ads that command attention from top-tier B2B clients.",
      "Host industry-defining webinars that position our brand as the thought leader.",
      "Publish insightful blogs and case studies that validate our market expertise.",
      "Execute a series of targeted email campaigns to nurture leads and maximize engagement.",
    ],
    recommendedImplementationTimeline: [
      {
        step: 1,
        title: "Initial Launch",
        months: "Months 1-3",
        description: "Kick-off LinkedIn campaigns, publish initial blogs, and organize the first webinar.",
      },
      {
        step: 2,
        title: "Scale and Engage",
        months: "Months 4-6",
        description: "Intensify LinkedIn ad efforts, host subsequent webinars, and expand email campaigns.",
      },
    ],
  };

  const handleDownload = () => {
    if (reportRef.current) {
      const opt = {
        margin: [10, 10, 10, 10], // Adjusted margins for more content space (top, left, bottom, right)
        filename: 'Brand-Budget-Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false, dpi: 192, letterRendering: true, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'p' },
      };
      html2pdf().from(reportRef.current).set(opt).save();
    }
  };

  const getFormattedDate = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${formattedDate}, ${formattedTime}`;
  };


  const handleSaveReport = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/reports/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_name: brandBudgetRecommendation.branding.companyName || 'N/A',
        industry: brandBudgetRecommendation.branding.industry || '',
        business_type: brandBudgetRecommendation.branding.businessType || '',
        business_stage: brandBudgetRecommendation.branding.businessStage || '',
        time_frame: brandBudgetRecommendation.branding.timeFrame || '',

        total_planned_budget: brandBudgetRecommendation.totalPlannedBudget,
        budget_summary: brandBudgetRecommendation.budgetSummary || '',

        recommended_budget_allocation: brandBudgetRecommendation.recommendedBudgetAllocation || [],
        recommended_budget_details: brandBudgetRecommendation.recommendedBudgetDetails || [],

        strategic_recommendations: brandBudgetRecommendation.strategicRecommendations || [],
        recommended_implementation_timeline: brandBudgetRecommendation.recommendedImplementationTimeline || [],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error saving report:', data);
    } else {
      console.log('✅ Report saved successfully:', data);
    }
  } catch (err) {
    console.error('❌ Error during save:', err);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 w-full">
      {/* The entire report content is wrapped in this Card and uses reportRef */}
      <Card ref={reportRef} className="w-full max-w-4xl p-5 shadow-lg mx-auto bg-white text-gray-800 font-sans leading-snug text-[0.8rem]"> {/* Reduced padding to p-5 and set base font size to ~12.8px */}
        
        {/* === PAGE 1 CONTENT === */}
        {/* Header Section */}
        <div className="text-[0.65rem] text-gray-500 flex justify-between mb-2 font-normal">
            <span>{getFormattedDate()}</span>
            <span>Brand Budget Report {brandBudgetRecommendation.branding.companyName}</span>
        </div>
        <div className="text-center mb-5">
            <img src="./lovable-uploads/mibbs.png" alt="mibbs" className="w-60 mx-auto" />
            <h1 className="text-xl font-bold text-gray-900 mb-0.5">Brand Budget Recommendation Report</h1>
            <p className="text-sm text-gray-600">Generated For MIBBS - India's First Intelligent Brand Budgeting System</p>
        </div>

        {/* About MIBBS Section */}
        <div className="bg-[#663399] text-white p-4 rounded-lg shadow-md mb-5">
          <h2 className="text-base font-semibold mb-1.5">About MIBBS</h2>
          <p className="text-xs leading-snug mb-0.5">
            At Magamen, we have seen brands struggle - not because they lacked ideas, but because they lacked intelligent
            budget planning. In a market driven by emotions, we know businesses needed more than just Ad-hoc. They needed a system.
          </p>
          <p className="text-xs leading-snug">
            A structured, intelligent model to align their brand ambitions with financial discipline. That's why we built MIBBS —
            India's first intelligent brand budgeting system — a robust, automated model that gives brands confidence and
            stronger market positions.
          </p>
        </div>

        {/* User Information Summary */}
        <div className="mb-5 bg-white">
          <div className="grid grid-cols-3 gap-x-5 gap-y-1 text-xs">
            <p><strong>Name:</strong> {brandBudgetRecommendation.branding.companyName}</p> {/* Takes value from formDataToSend.branding.companyName */}
            <p><strong>Industry:</strong> {brandBudgetRecommendation.branding.industry}</p> {/* Takes value from formDataToSend.branding.industry */}
            <p><strong>Type:</strong> {brandBudgetRecommendation.branding.businessType}</p> {/* Takes value from formDataToSend.branding.businessType */}
            <p><strong>Stage:</strong> {brandBudgetRecommendation.branding.businessStage}</p> {/* Takes value from formDataToSend.branding.businessStage */}
            <p><strong>Budget:</strong> {brandBudgetRecommendation.totalPlannedBudget}</p> {/* Takes value from formDataToSend.totalPlannedBudget */}
          </div>
        </div>

        {/* Total Planned Budget */}
        <div className="bg-[#5F45B3] text-white p-2.5 rounded-lg text-center font-bold text-sm mb-5">
          Total Recommended Budget: {brandBudgetRecommendation.totalPlannedBudget} {/* Takes value from formDataToSend.totalPlannedBudget */}
        </div>

        {/* Budget Summary */}
        <div className="mb-5">
          <h2 className="text-base font-semibold mb-1.5 text-gray-800">Budget Summary</h2>
          <p className="text-xs">{brandBudgetRecommendation.budgetSummary}</p> {/* Takes value from formDataToSend.budgetSummary */}
        </div>

        {/* Recommended Budget Allocation (Pie Chart & Percentages) */}
        <div className="mb-5">
          <h2 className="text-base font-semibold mb-2 text-gray-800">Recommended Budget Allocation</h2>
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-5">
            {/* Pie Chart */}
            <div className="w-full lg:w-1/2 h-52 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={brandBudgetRecommendation.recommendedBudgetAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {brandBudgetRecommendation.recommendedBudgetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${props.payload.value}%`, props.payload.name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Allocation List with Percentages */}
            <div className="w-full lg:w-1/2 space-y-1.5 text-xs">
              {brandBudgetRecommendation.recommendedBudgetAllocation.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <p className="text-gray-700">{item.name}</p>
                  </div>
                  <p className="font-medium text-gray-900">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Budget Allocation (second section with monetary amounts) */}
        <div className="mb-5">
            <h2 className="text-base font-semibold mb-2 text-gray-800">Recommended Budget Allocation</h2>
            <div className="space-y-2">
                {brandBudgetRecommendation.recommendedBudgetDetails.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0 text-xs">
                        <span className="text-gray-700">{item.category}</span>
                        <span className="font-semibold text-gray-900">{item.value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Force Page Break Here */}
        {/* This div will instruct html2pdf.js to start a new page before its content */}
        <div style={{ pageBreakBefore: 'always' }}></div>

        {/* === START OF PAGE 2 CONTENT === */}
        {/* Header Section (repeated for continuity) */}
        {/* <div className="text-[0.65rem] text-gray-500 flex justify-between mt-0 mb-2 font-normal"> 
            <span>{getFormattedDate()}</span>
            <span>Brand Budget Report - {brandBudgetRecommendation.branding.companyName}</span>
        </div> */}

        {/* Strategic Recommendations (now on Page 2) */}
        <div className="space-y-2 mb-5">
          <h2 className="text-base font-semibold mb-2 text-gray-800">Strategic Recommendations</h2>
          <ul className="list-disc list-inside pl-3 space-y-1 text-xs">
            {brandBudgetRecommendation.strategicRecommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>

        {/* Recommended Implementation Timeline */}
        <div className="space-y-4 mb-5">
          <h2 className="text-base font-semibold mb-2 text-gray-800">Recommended Implementation Timeline</h2>
          <div className="relative border-l-2 border-gray-200 pl-4">
            {brandBudgetRecommendation.recommendedImplementationTimeline.map((item) => (
              <div key={item.step} className="mb-3 last:mb-0">
                <div className="absolute w-6 h-6 -left-3 -mt-0 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                  {item.step}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground mb-0.5">{item.months}</p>
                <p className="text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Magamen Footer */}
        <div className="bg-[#663399] text-white p-4 rounded-lg shadow-md mb-3">
          <h2 className="text-base font-semibold mb-1.5">About Magamen</h2>
          <p className="text-xs leading-snug mb-0.5">
            Magamen is a renowned brand consulting firm that helps businesses grow by making them easy to understand and
            trust. We work with companies to improve how they present themselves, so more people remember and choose them.
          </p>
          <p className="text-xs leading-snug">
            We combine a fresh perspective with deep expertise to create strategies that get results. We believe you
            don't need big budgets or complex ideas, but a clear plan that connects with people. Whether you're just starting or
            looking to scale, Magamen's team is passionate about helping you craft a brand that will stand apart.
          </p>
        </div>
        <div className="text-center text-[0.6rem] text-gray-500 mt-2">
            <p>Secure. Private. In Your Control.</p>
            <p>Your data stays private - always encrypted, never shared.</p>
            <p>Report generated on {new Date().toLocaleDateString('en-US')}</p>
        </div>
        {/* Page number at bottom right (simulate for PDF, not interactive) */}
        <div className="text-right text-[0.6rem] text-gray-500 mt-1">
            2/2
        </div>
      </Card>

      {/* Action buttons (outside the report ref so they are not included in the PDF) */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-sm">
        <Button className="w-full sm:w-auto px-5 py-2.5 text-sm" onClick={handleDownload}>
          <Download className="mr-2 h-3.5 w-3.5" /> Download Report
        </Button>
        <Button variant="outline" className="w-full sm:w-auto px-5 py-2.5 text-sm" onClick={() => navigate('/start-budgeting-form')}>
          <Repeat2 className="mr-2 h-3.5 w-3.5" /> Start Over
        </Button>
      </div>
    </div>
  );
};

export default Generate;

















// import React from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Download, Repeat2 } from 'lucide-react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';



// // Define a type for the budget allocation data
// interface BudgetAllocation {
//   name: string;
//   value: number;
//   color: string;
// }

// const Generate = () => {
//   // Placeholder data - in a real app, this would come from the form data
//   const brandBudgetRecommendation = {
//     branding: {
//       industry: "Manufacturing",
//       businessType: "Product",
//       businessStage: "Advanced",
//       timeFrame: "0-6 months",
//     },
//     recommendedBudgetAllocation: [
//       { name: "Brand Equity", value: 15, color: "#6366F1" }, // indigo-500
//       { name: "Innovation & R&D", value: 20, color: "#8B5CF6" }, // purple-500
//       { name: "Digital Transformation", value: 15, color: "#EC4899" }, // pink-500
//       { name: "Market Expansion", value: 15, color: "#F59E0B" }, // amber-500
//       { name: "Customer Experience", value: 10, color: "#10B981" }, // emerald-500
//       { name: "Content Strategy", value: 5, color: "#06B6D4" }, // cyan-500
//       { name: "Brand Awareness", value: 5, color: "#EF4444" }, // red-500
//       { name: "Internal Branding", value: 5, color: "#FACC15" }, // yellow-500
//       { name: "Contingency", value: 5, color: "#A855F7" }, // violet-500
//     ],
//     strategicRecommendations: [
//       "Invest in brand equity measurement and tracking.",
//       "Allocate significant budget to innovation and new product development.",
//       "Consider international market expansion strategies.",
//       "Develop an integrated digital transformation roadmap.",
//       "Focus on creating memorable customer experiences across all touchpoints.",
//     ],
//     recommendedImplementationTimeline: [
//       {
//         step: 1,
//         title: "Strategic Planning",
//         months: "Months 1-2",
//         description: "Comprehensive brand audit, competitive analysis, and strategic planning.",
//       },
//       {
//         step: 2,
//         title: "Digital Transformation",
//         months: "Months 3-4",
//         description: "Implement advanced digital marketing infrastructure and analytics.",
//       },
//       {
//         step: 3,
//         title: "Market Expansion",
//         months: "Months 5-6",
//         description: "Execute market expansion strategies and new product/service launches.",
//       },
//       // ... Add more steps as needed based on your full data
//     ],
//     totalPlannedBudget: "testing" // Placeholder from image
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
//       <Card className="w-full max-w-4xl p-6 sm:p-8 shadow-lg">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Brand Budget Planner</h1>
//           <span className="text-sm text-gray-600">Optimize your branding investment</span>
//         </div>

//         {/* <div className="mb-6">
//           <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
//             <span>Step 6 of 5</span> 
//             <span>100%</span>
//           </div>
//           <div className="h-2 w-full bg-primary rounded-full"></div> 
//         </div> */}

//         <h2 className="text-xl font-semibold mb-6 text-gray-700">Your Brand Budget Recommendation</h2>
//         <p className="text-muted-foreground mb-6">
//           Based on your inputs, here is our recommended budget allocation
//         </p>

//         <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">branding</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
//             <div>
//               <span className="font-medium">Industry:</span> {brandBudgetRecommendation.branding.industry}
//             </div>
//             <div>
//               <span className="font-medium">Business Type:</span> {brandBudgetRecommendation.branding.businessType}
//             </div>
//             <div>
//               <span className="font-medium">Business Stage:</span> {brandBudgetRecommendation.branding.businessStage}
//             </div>
//             <div>
//               <span className="font-medium">Time Frame:</span> {brandBudgetRecommendation.branding.timeFrame}
//             </div>
//           </div>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Budget Allocation</h3>
//           <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
//             <div className="w-full lg:w-1/2 h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={brandBudgetRecommendation.recommendedBudgetAllocation}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                   >
//                     {brandBudgetRecommendation.recommendedBudgetAllocation.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="w-full lg:w-1/2 space-y-3">
//               {brandBudgetRecommendation.recommendedBudgetAllocation.map((item) => (
//                 <div key={item.name} className="flex items-center space-x-2">
//                   <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
//                   <p className="text-gray-700 flex-grow">{item.name}</p>
//                   <p className="font-medium text-gray-900">{item.value}%</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mb-8 p-4 bg-blue-50 rounded-lg border-blue-200 border">
//           <p className="text-blue-800 font-semibold">Total Planned Budget: {brandBudgetRecommendation.totalPlannedBudget}</p>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Strategic Recommendations</h3>
//           <ul className="list-disc pl-5 space-y-2 text-gray-700">
//             {brandBudgetRecommendation.strategicRecommendations.map((rec, index) => (
//               <li key={index}>{rec}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Implementation Timeline</h3>
//           <div className="relative border-l-2 border-gray-200 pl-4">
//             {brandBudgetRecommendation.recommendedImplementationTimeline.map((item) => (
//               <div key={item.step} className="mb-6 last:mb-0">
//                 <div className="absolute w-8 h-8 -left-4 -mt-1 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
//                   {item.step}
//                 </div>
//                 <h4 className="font-semibold text-gray-900 text-lg">{item.title}</h4>
//                 <p className="text-sm text-muted-foreground mb-1">{item.months}</p>
//                 <p className="text-gray-700">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
//           <Button className="w-full sm:w-auto px-6 py-3">
//             <Download className="mr-2 h-4 w-4" /> Download Report
//           </Button>
//           <Button variant="outline" className="w-full sm:w-auto px-6 py-3">
//             <Repeat2 className="mr-2 h-4 w-4" /> Start Over
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Generate;