import React, { useState } from 'react';
import { Download, Share, ArrowRight, MessageCircle, Save, Crown, TrendingUp, Zap, Target } from 'lucide-react';
import BudgetChatbot from './BudgetChatbot';
import mibbslogo from '../../assets/mibbs-1.png';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import { generateBudgetPDF } from '../../utils/pdfGenerator';

// --- Utility Components for Cleaner JSX (Added for better UI readability) ---

// Component for a single stat in the Business Summary (Updated to handle more fields)
const SummaryStat: React.FC<{ label: string; value: string | number; valueColor?: string; icon?: React.ReactNode }> = ({ label, value, valueColor = 'text-gray-900', icon }) => (
    <div className="flex flex-col p-3 border-l-4 border-indigo-200 bg-gray-50 rounded-lg">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center space-x-1">
            {icon}
            <span>{label}</span>
        </span>
        <span className={`text-base font-semibold ${valueColor}`}>{value}</span>
    </div>
);

// Component for a single Budget Allocation Card
const AllocationCard: React.FC<{ allocation: any; formatCurrency: (amount: number) => string; color: string }> = ({ allocation, formatCurrency, color }) => (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-t-8 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl" style={{ borderColor: color }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <h3 className="text-xl font-extrabold text-gray-900">{allocation.channel}</h3>
            <span className={`text-3xl font-black`} style={{ color }}>{allocation.percent}%</span>
        </div>
        <div className="text-4xl font-extrabold text-gray-900 mb-4 border-b pb-2">
            {formatCurrency(allocation.amount)}
        </div>
        <p className="text-gray-600 text-sm italic">
            Recommended annual budget for {allocation.channel.toLowerCase()} activities.
        </p>
    </div>
);

// --- Main Component ---

interface BudgetPlanScreenProps {
    budgetData: any;
    assessmentData: any;
    onContinueToDashboard: () => void;
}

const BudgetPlanScreen: React.FC<BudgetPlanScreenProps> = ({
    budgetData,
    assessmentData,
    onContinueToDashboard
}) => {
    const [showChatbot, setShowChatbot] = useState(false);

    // Define a richer color palette for charts and cards
    const MIBBS_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleDownloadPDF = async () => {
        const input = document.getElementById("budget-report");
        if (!input) return;

        try {
            // Enhanced settings for higher quality PDF
            const canvas = await html2canvas(input, {
                scale: 3, // Increased scale for better resolution
                useCORS: true,
                logging: false,
                // letterRendering: true,
            });

            const imgData = canvas.toDataURL("image/jpeg", 1.0); // Use JPEG for smaller file size, high quality
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pageWidth - 10;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "JPEG", 5, position + 5, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "JPEG", 5, position + 5, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${budgetData?.businessName || 'Brand'}_Budget_Recommendation_Report.pdf`);
        } catch (error) {
            console.error("PDF generation error:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };


    // Calculate 5% of monthly revenue value
    const monthlyRevenue = budgetData.monthlyRevenue || 48000;
    const monthlyBudget = Math.round(monthlyRevenue * 0.05);
    const totalAnnualBudget = Math.round(monthlyRevenue * 0.05 * 12);

    // Get industry-specific channels and parameters (No change to logic)
    const getIndustryChannels = () => {
        if (!budgetData.industryData) {
            return [
                { name: 'TV', percentage: 35, amount: totalAnnualBudget * 0.35 },
                { name: 'Digital', percentage: 40, amount: totalAnnualBudget * 0.40 },
                { name: 'Print', percentage: 25, amount: totalAnnualBudget * 0.25 }
            ];
        }

        const channels = budgetData.industryData.channels;
        const parameters = budgetData.industryData.parameters;
        
        // Combine channels and parameters for the bar chart
        const allItems = [...channels, ...parameters];
        // Dynamic: total distributed by array length and slight variation
        const totalBasePercentage = 100 / allItems.length;
        return allItems.map((item, index) => {
            // Slight variation ensures bars aren't identical and total approx 100%
            const variation = (index % 3) * 3; // Reduced variation for realism
            let percentage = Math.round(totalBasePercentage + (index % 2 === 0 ? variation : -variation));
            
            // Basic normalization to ensure total doesn't stray too far
            if (index === allItems.length - 1) {
                const currentTotal = allItems.slice(0, allItems.length - 1).reduce((sum, _, i) => {
                    const base = totalBasePercentage;
                    const v = (i % 3) * 3;
                    return sum + Math.round(base + (i % 2 === 0 ? v : -v));
                }, 0);
                percentage = 100 - currentTotal;
            }

            if (percentage < 5) percentage = 5; // Minimum 5%
            
            const amount = Math.round((totalAnnualBudget * percentage) / 100);
            return {
                name: item,
                percentage: percentage,
                amount: amount
            };
        });
    };

    const handleSavePlan = () => {
        const savedPlan = {
            ...budgetData,
            assessmentData,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('mibbs_saved_plan', JSON.stringify(savedPlan));
        alert('Your budget plan has been saved locally!');
    };

    // Calculate pie chart data – dynamic from backend provided data
    const pieChartData = budgetData.allocations.map((allocation: any, index: number) => {
        return {
            name: allocation.channel,
            value: allocation.percent,
            amount: allocation.amount,
            color: MIBBS_COLORS[index % MIBBS_COLORS.length]
        };
    });

    const barChartData = getIndustryChannels();

    return (
        // Added 'id' for PDF generation
        <div id="budget-report" className="w-full min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
            <div className="w-full max-w-7xl mx-auto space-y-6">
                
                {/* Header (Top Section - kept structure simple for PDF) */}
                <header className="bg-white w-full py-6 px-4 rounded shadow-md">
                    <div className="max-w-4xl flex flex-col sm:flex-row items-center justify-center mx-auto sm:items-end gap-3">
                        <img
                            src={mibbslogo}
                            alt="mibbs logo"
                            className="h-10 sm:h-12 w-auto"
                            style={{ maxWidth: 160 }}
                        />
                        <div className="text-center sm:text-left">
                            <h1 className="text-lg sm:text-2xl font-black text-indigo-900 whitespace-nowrap">
                                Brand Budget Recommendation Report
                            </h1>
                            <div className="text-xs sm:text-sm text-gray-600 mt-1">
                                Generated by MIBBS - India's First Intelligent Brand Budgeting System
                            </div>
                        </div>
                    </div>
                    <hr className="border-t border-indigo-200 mt-6" />
                </header>

                {/* --- */}

                {/* About MIBBS Section - More prominent and styled */}
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-br from-indigo-700 to-blue-900 rounded p-8 text-white shadow-2xl transition-all duration-500 hover:shadow-indigo-500/50">
                        <h2 className="text-xl font-bold text-center mb-4 tracking-wider uppercase flex items-center justify-center space-x-2">
                            {/* <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400"/> */}
                            <span>Why MIBBS?</span>
                        </h2>
                        <p className="text-sm text-center max-w-3xl mx-auto opacity-90 leading-relaxed">
                            At Magsmen, we've seen brands struggle not because they lacked ideas, but because they lacked intelligent budget planning. MIBBS is **India's first intelligent brand budgeting system**, a structured, data-driven model crafted to align your brand ambitions with financial discipline, helping you invest smarter, grow faster, and build a stronger market position.
                        </p>
                    </div>
                </div>

                {/* --- */}

                {/* Business Summary - FIXED: Added four new fields and changed grid layout */}
                <div className="bg-white rounded shadow-2xl p-6 sm:p-8 border border-gray-100 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4">
                        <h2 className="text-3xl font-black text-indigo-800">
                            {budgetData?.businessName || assessmentData?.businessName || 'Your Brand'}
                        </h2>
                        <div className="flex items-center space-x-2 mt-2 md:mt-0">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <span className="text-lg font-semibold text-green-600 capitalize">
                                {assessmentData?.brandStage || 'Growing'} Stage
                            </span>
                        </div>
                    </div>

                    {/* Updated Grid for 8 fields (4x2 or 2x4 on smaller screens) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <SummaryStat label="Industry" value={budgetData.industry} />
                        <SummaryStat label="Location" value={`${budgetData.location?.city}, ${budgetData.location?.state}`} />
                        <SummaryStat label="Years in Business" value={`${assessmentData?.yearsInBusiness || 1} years`} />
                        <SummaryStat label="Digital Maturity" value={assessmentData?.digitalMaturity?.replace('-', ' ') || 'Basic Social'} />

                        {/* NEW FIELD 1: Target Audience */}
                        <SummaryStat 
                            label="Target Audience" 
                            value={budgetData?.targetAudience || 'Youth (18-35)'} 
                            valueColor='text-blue-600'
                        />
                        {/* NEW FIELD 2: Competition Level */}
                        <SummaryStat 
                            label="Competition Level" 
                            value={assessmentData?.competition || 'Medium'} 
                            valueColor='text-red-600'
                        />
                        {/* NEW FIELD 3: Marketing Goal */}
                        <SummaryStat 
                            label="Marketing Goal" 
                            value={budgetData?.marketingGoal || 'Brand Awareness'} 
                            valueColor='text-purple-600'
                        />
                        {/* NEW FIELD 4: Sales Channel */}
                        <SummaryStat 
                            label="Sales Channel" 
                            value={budgetData?.salesChannel || 'Online & Retail'} 
                            valueColor='text-green-600'
                        />
                    </div>

                    {/* FIXED: Monthly & Annual Budget Display using Flex for alignment */}
                    <div className="mt-8 pt-4 border-t-2 border-dashed border-indigo-100">
                        <p className="text-lg font-medium text-gray-700 uppercase tracking-widest text-center mb-6">Recommended Brand Budget</p>
                        {/* START: Added Monthly Revenue Card */}
                        <div className='flex justify-center mb-6'>
                            <div className='p-4 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm w-full max-w-sm text-center'>
                                <p className="text-sm font-semibold text-yellow-700 uppercase tracking-wider mb-1">Estimated Monthly Revenue</p>
                                <h2 className="text-2xl font-black text-yellow-600">
                                    {formatCurrency(monthlyRevenue)}
                                </h2>
                                {/* <p className="text-xs text-gray-500 mt-1">
                                    *Budget is calculated at 5% of this revenue.
                                </p> */}
                            </div>
                        </div>
                        {/* END: Added Monthly Revenue Card */}

                        <div className="flex flex-col md:flex-row justify-center items-stretch space-y-6 md:space-y-0 md:space-x-8 text-center">
                            
                            {/* Monthly Budget */}
                            <div className='flex-1 p-6 bg-indigo-50 rounded-xl border border-indigo-200 shadow-md'>
                                <p className="text-sm font-semibold text-indigo-700 uppercase tracking-wider mb-2">Monthly Brand Budget</p>
                                <h1 className="text-4xl font-black text-indigo-600">
                                    {formatCurrency(monthlyBudget)}
                                </h1>
                            </div>

                            {/* Annual Budget */}
                            <div className='flex-1 p-6 bg-green-50 rounded-xl border border-green-200 shadow-md'>
                                <p className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-2">Annual Budget (12 Months)</p>
                                <h1 className="text-4xl font-black text-green-600">
                                    {formatCurrency(totalAnnualBudget)}
                                </h1>
                            </div>
                        </div>
                        {/* <p className="text-sm text-gray-500 mt-4 text-center">
                            Calculated based on a recommended 5% of your estimated monthly revenue ($${formatCurrency(monthlyRevenue)}$)
                        </p> */}
                    </div>
                </div>

                {/* --- */}

                {/* Charts Section - Enhanced visual contrast and layout (No change to content logic) */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 w-full">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Budget Allocation & Channel Performance</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Pie Chart Section (Budget Distribution) */}
                        <div>
                            <h3 className="text-xl font-semibold text-indigo-700 mb-6">Budget Distribution</h3>
                            <div className="w-full flex justify-center mb-8">
                                <div className="w-64 h-64 relative">
                                    <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90 shadow-2xl rounded-full">
                                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#E5E7EB" strokeWidth="4" />
                                        {pieChartData.map((item, index) => {
                                            const circumference = 100;
                                            const offset = pieChartData.slice(0, index).reduce((sum, prev) => sum + prev.value, 0);
                                            return (
                                                <circle
                                                    key={index}
                                                    cx="21"
                                                    cy="21"
                                                    r="15.915"
                                                    fill="transparent"
                                                    stroke={item.color}
                                                    strokeWidth="4.5" // Slightly thicker stroke
                                                    strokeDasharray={`${item.value} ${100 - item.value}`}
                                                    strokeDashoffset={-offset}
                                                    className="transition-all duration-500 hover:stroke-width-6" // Hover effect
                                                />
                                            );
                                        })}
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-3xl font-black text-gray-900">
                                                {pieChartData.reduce((sum: number, item: any) => sum + item.value, 0)}%
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">Allocated</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Pie Chart Legend */}
                            <div className="space-y-3">
                                {pieChartData.map((item: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 border border-gray-100 hover:bg-indigo-50 hover:shadow-sm">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-5 h-5 rounded-full`} style={{ backgroundColor: item.color }}></div>
                                            <span className="text-base font-medium text-gray-800">{item.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-extrabold" style={{ color: item.color }}>{item.value}%</div>
                                            <div className="text-sm text-gray-600">{formatCurrency(item.amount)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bar Chart Section (Channel Performance) */}
                        <div>
                            <h3 className="text-xl font-semibold text-indigo-700 mb-6">Industry Channel Focus</h3>
                            <div className="space-y-6">
                                {barChartData.map((item, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-bold text-gray-800 capitalize flex items-center space-x-2">
                                                <Target className="w-4 h-4 text-indigo-500" />
                                                <span>{item.name}</span>
                                            </span>
                                            <div className="flex items-center space-x-3">
                                                <span className="text-sm font-extrabold text-indigo-700">{item.percentage}%</span>
                                                <span className="text-xs text-gray-600">{formatCurrency(item.amount)}</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full shadow-md transition-all duration-700 hover:shadow-lg"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- */}

                {/* Budget Allocation Cards - Using the new AllocationCard component */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full pt-10">
                    {budgetData.allocations.map((allocation: any, index: number) => (
                        <AllocationCard 
                            key={index} 
                            allocation={allocation} 
                            formatCurrency={formatCurrency}
                            color={MIBBS_COLORS[index % MIBBS_COLORS.length]}
                        />
                    ))}
                </div>

                {/* --- */}

                {/* Industry Details Section - Refined layout (No change to logic) */}
                {budgetData.industryDetails && (
                    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 w-full">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                            <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                            <span>{budgetData.industryDetails.name} Industry Benchmark Insights</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Marketing Spend */}
                            <div className="bg-yellow-50 rounded-xl p-5 border-l-4 border-yellow-500">
                                <h3 className="font-bold text-gray-900 mb-2 uppercase text-sm tracking-wider">Avg. Marketing Spend</h3>
                                <div className="text-2xl font-black text-yellow-700">
                                    {budgetData.industryDetails.marketingSpendRange} of Revenue
                                </div>
                                <p className="text-xs text-gray-600 mt-2">Recommended range for similar-sized businesses.</p>
                            </div>

                            {/* Channels */}
                            <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-500">
                                <h3 className="font-bold text-gray-900 mb-2 uppercase text-sm tracking-wider">Top Channels</h3>
                                <div className="flex flex-wrap gap-2">
                                    {budgetData.industryDetails.channels.slice(0, 3).map((channel: string, index: number) => (
                                        <span key={index} className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full shadow-md">
                                            {channel}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Parameters */}
                            <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-500">
                                <h3 className="font-bold text-gray-900 mb-2 uppercase text-sm tracking-wider">Key Growth Focus</h3>
                                <ul className="space-y-1 text-sm text-gray-700 list-inside">
                                    {budgetData.industryDetails.parameters.slice(0, 2).map((param: string, index: number) => (
                                        <li key={index} className="flex items-start">
                                            <svg className="w-3 h-3 text-purple-600 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                            {param}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- */}

                {/* Paywall Banner - More visually striking (No change to content logic) */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white w-full shadow-xl">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-6">
                            <Crown className="w-10 h-1- text-yellow-300 fill-yellow-300" />
                            <div>
                                <h3 className="text-xl sm:text-2xl font-black">Unlock Your Brand's Full Potential</h3>
                                <p className="text-purple-100 mt-1 font-light">Get Spend Tracker, Agency Discovery, and Premium Tools.</p>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <div className="text-3xl font-black">₹999</div>
                            <div className="text-purple-200 text-sm">per month</div>
                            <button className="mt-3 bg-white text-purple-700 px-6 py-3 rounded-full font-bold shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-purple-50">
                                Subscribe to Premium
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- */}

                {/* Action Buttons - Clean and prominent action area (No change to logic) */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center w-full border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to put your plan to work?</h2>
                    <p className="text-gray-600 mb-8">Take the next step: save your plan, download the report, or continue to your personalized dashboard.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-4xl mx-auto">
                        
                        {/* Primary Action */}
                        <button
                            onClick={onContinueToDashboard}
                            className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl flex-grow"
                        >
                            <span>Go to Dashboard</span>
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>

                        {/* Secondary Actions */}
                        <button
                            onClick={handleSavePlan}
                            className="flex items-center justify-center space-x-2 px-6 py-3 border border-indigo-300 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition-colors flex-grow-0"
                        >
                            <Save className="w-4 h-4" />
                            <span>Save Plan</span>
                        </button>
                        <button 
                            onClick={handleDownloadPDF}
                            className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors flex-grow-0"
                        >
                            <Download className="w-4 h-4" />
                            <span>Download PDF</span>
                        </button>
                    </div>
                    
                    {/* Chatbot Link */}
                    <button
                        onClick={() => setShowChatbot(true)}
                        className="mt-8 text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-2 mx-auto transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span className="underline underline-offset-2">Questions about your budget? Ask our AI advisor</span>
                    </button>
                </div>

                {/* --- */}

                {/* About Magsmen Section - Footer style (No change to content logic) */}
                <footer className="max-w-7xl mx-auto pb-8">
                    <div className="bg-indigo-900 rounded-3xl p-6 text-white shadow-xl">
                        <h2 className="text-lg font-semibold text-center mb-2 tracking-wide border-b border-blue-200 pb-2">About Magsmen, Your Brand Consultants</h2>
                        <p className="text-sm text-center font-light leading-relaxed opacity-90">
                            Magsmen is a renowned brand consulting firm that helps businesses grow by making them easy to understand and trust. We believe every business has a unique story and we help you tell it in a simple and powerful way. We guide you to turn your business into a strong, well-known brand without complex ideas or inflated budgets.
                        </p>
                    </div>
                    <div className="text-center mt-4 text-xs text-slate-500">
                        © {new Date().getFullYear()} Magsmen. Secure. Private. In Your Control.
                    </div>
                </footer>

            </div>
            {/* Chatbot */}
            <BudgetChatbot
                budgetData={budgetData}
                isOpen={showChatbot}
                onClose={() => setShowChatbot(false)}
            />
        </div>
    );
};

export default BudgetPlanScreen;









// import React, { useState } from 'react';
// import { Download, Share, ArrowRight, MessageCircle, Save, Crown } from 'lucide-react';
// import BudgetChatbot from './BudgetChatbot';
// import mibbslogo from '../../assets/mibbs-1.png';
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// // import { generateBudgetPDF } from '../../utils/pdfGenerator';




// interface BudgetPlanScreenProps {
//   budgetData: any;
//   assessmentData: any;
//   onContinueToDashboard: () => void;
// }

// const BudgetPlanScreen: React.FC<BudgetPlanScreenProps> = ({
//   budgetData,
//   assessmentData,
//   onContinueToDashboard
// }) => {
//   const [showChatbot, setShowChatbot] = useState(false);

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

// const handleDownloadPDF = async () => {
//   const input = document.getElementById("budget-report");
//   if (!input) return;

//   try {
//     const canvas = await html2canvas(input, {
//       scale: 2,
//       useCORS: true,
//       logging: false,
//     });

//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     const imgWidth = pageWidth - 10;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let heightLeft = imgHeight;
//     let position = 0;

//     pdf.addImage(imgData, "PNG", 5, position + 5, imgWidth, imgHeight);
//     heightLeft -= pageHeight;

//     while (heightLeft > 0) {
//       position = heightLeft - imgHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, "PNG", 5, position + 5, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }

//     pdf.save("Brand_Budget_Recommendation_Report.pdf");
//   } catch (error) {
//     console.error("PDF generation error:", error);
//     alert("Failed to generate PDF. Please try again.");
//   }
// };



//   // Calculate 5% of monthly revenue value for use anywhere
//   const monthlyRevenue = budgetData.monthlyRevenue || 48000;
//   const monthlyRevenuePercent = Math.round(monthlyRevenue * 0.05);

//   // Get industry-specific channels and parameters
//   const getIndustryChannels = () => {
//     if (!budgetData.industryData) {
//       return [
//         { name: 'TV', percentage: 35, amount: budgetData.annualBudget * 0.35 },
//         { name: 'Digital', percentage: 40, amount: budgetData.annualBudget * 0.40 },
//         { name: 'Print', percentage: 25, amount: budgetData.annualBudget * 0.25 }
//       ];
//     }

//     const channels = budgetData.industryData.channels;
//     const parameters = budgetData.industryData.parameters;
    
//     // Combine channels and parameters for the bar chart
//     const allItems = [...channels, ...parameters];
//     // Dynamic: total distributed by array length and slight variation
//     return allItems.map((item, index) => {
//       const basePercentage = 100 / allItems.length;
//       const variation = (index % 3) * 5;
//       const percentage = Math.round(basePercentage + variation);
//       const amount = Math.round((budgetData.annualBudget * percentage) / 100);
//       return {
//         name: item,
//         percentage: percentage,
//         amount: amount
//       };
//     });
//   };

//   const handleSavePlan = () => {
//     const savedPlan = {
//       ...budgetData,
//       assessmentData,
//       createdAt: new Date().toISOString()
//     };
//     localStorage.setItem('mibbs_saved_plan', JSON.stringify(savedPlan));
//   };

//   // Calculate pie chart data – dynamic from backend provided data
//   const pieChartData = budgetData.allocations.map((allocation: any, index: number) => {
//     const colors = ['#8B5CF6', '#06B6D4', '#F59E0B', '#EF4444'];
//     return {
//       name: allocation.channel,
//       value: allocation.percent,
//       amount: allocation.amount,
//       color: colors[index % colors.length]
//     };
//   });

//   const barChartData = getIndustryChannels();

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
//       <div className="w-full max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         {/* Report Header */}
//         <div className="bg-white w-full pt-8 pb-2 px-4">
//           <div className="max-w-4xl flex flex-col sm:flex-row items-center justify-center mx-auto sm:items-end gap-0 sm:gap-3 ">
//             <img
//               src={mibbslogo}
//               alt="mibbs logo"
//               className="h-10 sm:h-12 w-auto mb-2 sm:mb-0"
//               style={{ maxWidth: 160 }}
//             />
//             <div>
//               <h1 className="text-lg sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
//                 Brand Budget Recommendation Report
//               </h1>
//               <div className="text-xs sm:text-sm text-gray-600 mt-1">
//                 Generated by MIBBS - India&apos;s First Intelligent Brand Budgeting System
//               </div>
//             </div>
//           </div>
//           <hr className="border-t-2 border-indigo-900 mt-4" />
//         </div>




//         {/* About MIBBS Section */}
//         <div className="max-w-7xl mx-auto mb-8">
//           <div className="bg-gradient-to-r from-indigo-900 to-blue-800 rounded-xl p-6 text-white shadow-lg">
//             <h2 className="text-lg font-semibold text-center mb-2 tracking-wide">About MIBBS</h2>
//             <hr className="border-blue-200 mb-4" />
//             <p className="text-base text-center mb-2">
//               At Magsmen, we have seen brands struggle not because they lacked ideas, but because they lacked intelligent budget planning. In a market driven by intuition, we realized businesses needed more than just advice. They needed a system.
//             </p>
//             <p className="text-base text-center">
//               A structured, intelligent model to align their brand ambitions with financial discipline. That's why we built MIBBS India's first intelligent brand budgeting system, crafted to help businesses invest smarter, grow faster, and build stronger market positions.
//             </p>
//           </div>
//         </div>



//         {/* Business Summary */}
//         <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 w-full">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Summary</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3">
//             <div className="space-y-4">
//               <div>
//                 <span className="text-gray-600">Business Type:</span>
//                 <span className="ml-4 font-semibold text-gray-900 capitalize">{assessmentData?.brandStage || 'growing'}</span>
//               </div>
//               <div>
//                 <span className="text-gray-600">Industry:</span>
//                 <span className="ml-4 font-semibold text-gray-900">{budgetData.industry}</span>
//               </div>
//               <div>
//                 <span className="text-gray-600">Location:</span>
//                 <span className="ml-4 font-semibold text-gray-900">{budgetData.location?.city}, {budgetData.location?.state}</span>
//               </div>
//                <div>
//                 <span className="text-gray-600">No Of Years:</span>
//                 <span className="ml-4 font-semibold text-gray-900">{assessmentData?.yearsInBusiness || 1} years</span>
//               </div>
//             </div>
//             <div className="space-y-4">
             
//               <div>
//                 <span className="text-gray-600">Digital Scale:</span>
//                 <span className="ml-4 font-semibold text-gray-900">{assessmentData?.digitalMaturity?.replace('-', '-') || 'basic-social'}</span>
//               </div>
//               <div>
//                 <span className="text-gray-600">Monthly Revenue:</span>
//                 <span className="ml-4 font-semibold text-gray-900">{formatCurrency(monthlyRevenue)}</span>
//               </div>
//               <div>
//                 <span className="text-gray-600">Total Annual Brand Budget:</span>
//                 <span className="ml-4 font-semibold text-indigo-600">
//                   {formatCurrency((monthlyRevenue || 0) * 0.05 * 12)}
//                 </span>
//               </div>
//             </div>

//               <div className="space-y-4">
             
           
//               <div className='flex flex-col '>
//                 <span className="text-gray-600">Business Name:</span>
//                 <span className=" font-semibold text-indigo-600 text-4xl">
//                    {budgetData?.businessName || assessmentData?.businessName || 'N/A'}
//                 </span>
//               </div>
//             </div>

//           </div>
//         </div>


//         <div className="text-center">
//           {/* Updated: Monthly Brand Budget */}
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Monthly Brand Budget: {formatCurrency((budgetData.monthlyRevenue || 0) * 0.05)}
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Your personalized budget plan for {budgetData.industry} business in {budgetData.location?.city}, {budgetData.location?.state}
//           </p>
//         </div>

//         {/* Charts Section */}
//         <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 w-full">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Budget Allocation & Channel Performance</h2>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Pie Chart Section */}
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-6">Budget Distribution</h3>
//               {/* Enhanced Pie Chart */}
//               <div className="w-72 h-72 mx-auto relative mb-6">
//                 <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
//                   <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F3F4F6" strokeWidth="2" />
//                   {pieChartData.map((item, index) => {
//                     const circumference = 100;
//                     const offset = pieChartData.slice(0, index).reduce((sum, prev) => sum + prev.value, 0);
//                     return (
//                       <circle
//                         key={index}
//                         cx="21"
//                         cy="21"
//                         r="15.915"
//                         fill="transparent"
//                         stroke={item.color}
//                         strokeWidth="4"
//                         strokeDasharray={`${item.value} ${100 - item.value}`}
//                         strokeDashoffset={-offset}
//                         className="transition-all duration-500 hover:stroke-width-5"
//                       />
//                     );
//                   })}
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-gray-900">
//                       {formatCurrency((budgetData.monthlyRevenue || 0) * 0.05 * 12)}
//                     </div>
//                     <div className="text-sm text-gray-600 mt-1">Total Budget</div>
//                   </div>
//                 </div>

//               </div>
//               { }
//               <div className="space-y-3">
//                 {pieChartData.map((item, index) => (
//                   <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
//                     <div className="flex items-center space-x-3">
//                       <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: item.color }}></div>
//                       <span className="text-sm font-medium text-gray-700">{item.name}</span>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-sm font-bold text-gray-900">{item.value}%</div>
//                       <div className="text-xs text-gray-600">{formatCurrency(item.amount)}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Bar Chart Section */}
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-6">Channel Performance</h3>
//               <div className="space-y-5">
//                 {barChartData.map((item, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex items-center justify-between mb-1">
//                       <span className="text-sm font-semibold text-gray-800 capitalize">{item.name}</span>
//                       <div className="flex items-center space-x-2">
//                         <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
//                         <span className="text-xs text-gray-600">{formatCurrency(item.amount)}</span>
//                       </div>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-4">
//                       <div
//                         className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-700 hover:from-blue-600 hover:to-purple-700"
//                         style={{ width: `${item.percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Budget Allocation Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//           {budgetData.allocations.map((allocation: any, index: number) => (
//             <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">{allocation.channel}</h3>
//                 <span className="text-2xl font-bold text-mibbs-primary">{allocation.percent}%</span>
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mb-3">
//                 {formatCurrency(allocation.amount)}
//               </div>
//               <p className="text-gray-600 text-sm">
//                 Allocated for {allocation.channel.toLowerCase()} activities throughout the year
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Industry Details Section */}
//         {budgetData.industryDetails && (
//           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-full">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">
//               {budgetData.industryDetails.name} Industry Insights
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Marketing Spend */}
//               <div className="bg-blue-50 rounded-lg p-4">
//                 <h3 className="font-semibold text-gray-900 mb-2">Marketing Spend</h3>
//                 <div className="text-xl font-bold text-blue-600">
//                   {budgetData.industryDetails.marketingSpendRange} of Revenue
//                 </div>
//               </div>
//               {/* Channels */}
//               <div className="bg-green-50 rounded-lg p-4">
//                 <h3 className="font-semibold text-gray-900 mb-2">Top Channels</h3>
//                 <div className="flex flex-wrap gap-1">
//                   {budgetData.industryDetails.channels.slice(0, 2).map((channel: string, index: number) => (
//                     <span key={index} className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
//                       {channel}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               {/* Parameters */}
//               <div className="bg-purple-50 rounded-lg p-4">
//                 <h3 className="font-semibold text-gray-900 mb-2">Key Focus</h3>
//                 <div className="space-y-1">
//                   {budgetData.industryDetails.parameters.slice(0, 2).map((param: string, index: number) => (
//                     <div key={index} className="text-sm text-gray-700">• {param}</div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Paywall Banner */}
//         <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white w-full">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Crown className="w-8 h-8" />
//               <div>
//                 <h3 className="text-xl font-bold">Explore Spend Tracker, Agency Discovery and Premium Tools</h3>
//                 <p className="text-purple-100">Subscribe to Premium for advanced features</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-2xl font-bold">₹999</div>
//               <div className="text-purple-100 text-sm">per month</div>
//             </div>
//           </div>
//           <button className="mt-4 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
//             Subscribe to Premium
//           </button>
//         </div>

//         {/* Action Buttons */}
//         <div className="bg-white rounded-xl shadow-lg p-8 text-center w-full">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to put your plan to work?</h2>
//           <p className="text-gray-600 mb-6">Your budget is ready. Let's put it to work.</p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xxl mx-auto">
//             <button
//               onClick={handleSavePlan}
//               className="flex items-center justify-center space-x-2 px-6 py-3 bg-mibbs-primary text-white rounded-lg font-semibold hover:bg-mibbs-secondary transition-colors"
//             >
//               <Save className="w-4 h-4" />
//               <span>Save Plan</span>
//             </button>
//             <button
//               onClick={onContinueToDashboard}
//               className="flex items-center justify-center space-x-2 px-8 py-4 bg-mibbs-gradient text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
//             >
//               <span>Continue to Dashboard</span>
//               <ArrowRight className="w-5 h-5" />
//             </button>
//             <button 
//               onClick={handleDownloadPDF}
//             className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <Download className="w-4 h-4" />
//               <span>Download PDF</span>
//             </button>
//           </div>
//           <button
//             onClick={() => setShowChatbot(true)}
//             className="mt-6 text-blue-600 hover:text-blue-700 font-medium underline flex items-center justify-center space-x-2 mx-auto"
//           >
//             <MessageCircle className="w-4 h-4" />
//             <span>Questions about your budget? Ask our AI advisor</span>
//           </button>




//         </div>
//           {/* About Magsmen Section */}
// <div className="max-w-7xl mx-auto mt-8">
//   <div className="bg-gradient-to-r from-indigo-900 to-blue-800 rounded-xl p-6 text-white shadow-lg">
//     <h2 className="text-lg font-semibold text-center mb-2 tracking-wide">About Magsmen</h2>
//     <hr className="border-blue-200 mb-4"/>
//     <p className="text-base text-center">
//       Magsmen is a renowned brand consulting firm that helps businesses grow by making them easy to understand and trust. We work with companies to improve how they present themselves, so more people remember and choose them. Magsmen believes that every business has a unique story—and we help you tell it in a simple and powerful way. You don't need big budgets or complex ideas. Just a clear plan that connects with people. Whether you're just starting or looking to grow, Magsmen is here to guide you and turn your business into a strong, well-known brand.
//     </p>
//   </div>
//   <div className="text-center mt-4 text-xs text-slate-400">
//     Secure. Private. In Your Control.<br/>
//     Your data stays yours — always encrypted, never shared.
//   </div>
// </div>

//       </div>
//       {/* Chatbot */}
//       <BudgetChatbot
//         budgetData={budgetData}
//         isOpen={showChatbot}
//         onClose={() => setShowChatbot(false)}
//       />
//     </div>
//   );
// };

// export default BudgetPlanScreen;
