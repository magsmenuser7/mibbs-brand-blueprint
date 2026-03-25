import React, { useState, useEffect, useMemo } from 'react';
import { Download, Share, ArrowRight, MessageCircle, Save, Crown, TrendingUp, Zap, Target } from 'lucide-react';
import BudgetChatbot from './BudgetChatbot';
import mibbslogo from '../../assets/mibbs-1.png';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// --- Utility Components for Cleaner JSX ---
const SummaryStat: React.FC<{ label: string; value: string | number; valueColor?: string; icon?: React.ReactNode }> = ({ label, value, valueColor = 'text-gray-900', icon }) => (
    <div className="flex flex-col p-3 border-l-4 border-indigo-200 bg-gray-50 rounded-lg">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center space-x-1">
            {icon}
            <span>{label}</span>
        </span>
        <span className={`text-base font-semibold ${valueColor}`}>{value}</span>
    </div>
);


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

// --- INDUSTRY PERCENTAGE MAP ---
const INDUSTRY_PERCENTAGE_MAP: Record<string, [number, number]> = {
    'FMCG': [5, 6],
    'Retail': [5, 6],
    'Fashion/Apparel': [6, 8],
    'Real Estate': [4.5, 5.5],
    'Technology/IT': [1.5, 2.5],
    'Automotive': [4.5, 6.5],
    'Media/Entertainment': [5, 6],
    'Pharmaceuticals': [4.5, 5.5],
    'E-Commerce': [6, 10]
};

// --- Main Component ---
interface BudgetPlanScreenProps {
    budgetData: any;
    assessmentData: any;
    userData?: any;
    onContinueToDashboard: () => void;
}

const BudgetPlanScreen: React.FC<BudgetPlanScreenProps> = ({
    budgetData,
    assessmentData,
    userData,
    onContinueToDashboard
}) => {
    const [showChatbot, setShowChatbot] = useState(false);

    // NEW: runNonce ensures new random values across distinct runs/mounts
    // It's intentionally seeded from Date.now() so every new visit/run differs.
    const [runNonce] = useState(() => Date.now());

    const MIBBS_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // ---------- DYNAMIC BUDGET CALCULATION (STABLE BUT DIFFERENT EACH RUN) ----------
    const monthlyRevenue = Number(budgetData?.monthlyRevenue ?? assessmentData?.monthlyRevenue ?? 48000);
    const industry = budgetData?.industry ?? assessmentData?.industry ?? 'FMCG';

    // stableComputed stores the random percent and computed budgets
    // NOTE: we include runNonce in the computation (via effect dependency) so that even if
    // monthlyRevenue & industry are identical across separate runs, generated numbers differ.
    const [stableComputed, setStableComputed] = useState(() => {
        const [minPct, maxPct] = INDUSTRY_PERCENTAGE_MAP[industry] ?? [5, 6];
        const randPct = parseFloat((minPct + Math.random() * (maxPct - minPct)).toFixed(2));
        const monthlyBudgetLocal = Math.round(monthlyRevenue * (randPct / 100));
        const totalAnnualBudgetLocal = monthlyBudgetLocal * 12;
        return {
            randPct,
            monthlyBudget: monthlyBudgetLocal,
            totalAnnualBudget: totalAnnualBudgetLocal
        };
    });

    // Recompute when inputs change OR when runNonce changes (runNonce changes per mount/run)
    useEffect(() => {
        const [minPct, maxPct] = INDUSTRY_PERCENTAGE_MAP[industry] ?? [5, 6];

        // A tiny, deterministic augmentation to the seed using runNonce ensures unique output each run.
        // Use Math.random() seeded by runNonce mixing is not cryptographically secure but fits our use-case.
        // We'll create a pseudo-random value using runNonce as starting point + Math.random() to vary.
        const baseRandom = Math.abs(Math.sin(runNonce % 1000000)); // deterministic-ish from runNonce
        const randPct = parseFloat((minPct + (baseRandom * (maxPct - minPct)) % (maxPct - minPct) + Math.random() * 0.0001).toFixed(2));
        const monthlyBudgetLocal = Math.round(monthlyRevenue * (randPct / 100));
        const totalAnnualBudgetLocal = monthlyBudgetLocal * 12;
        setStableComputed({
            randPct,
            monthlyBudget: monthlyBudgetLocal,
            totalAnnualBudget: totalAnnualBudgetLocal
        });
    }, [monthlyRevenue, industry, runNonce]);

    // Use stable values for rendering and calculations
    const monthlyBudget = stableComputed.monthlyBudget;
    const totalAnnualBudget = stableComputed.totalAnnualBudget;

    // Distribute across channels dynamically (uses stable totalAnnualBudget)
    const getIndustryChannels = () => {
        if (!budgetData?.industryData) {
            return [
                { name: 'TV', percentage: 35, amount: Math.round(totalAnnualBudget * 0.35) },
                { name: 'Digital', percentage: 40, amount: Math.round(totalAnnualBudget * 0.40) },
                { name: 'Print', percentage: 25, amount: Math.round(totalAnnualBudget * 0.25) }
            ];
        }

        const channels = budgetData.industryData.channels || [];
        const parameters = budgetData.industryData.parameters || [];

        const allItems = [...channels, ...parameters];
        const totalBasePercentage = 100 / allItems.length;

        return allItems.map((item, index) => {
            const variation = (index % 3) * 3;
            let percentage = Math.round(totalBasePercentage + (index % 2 === 0 ? variation : -variation));
            if (index === allItems.length - 1) {
                const currentTotal = allItems.slice(0, allItems.length - 1).reduce((sum, _, i) => {
                    const base = totalBasePercentage;
                    const v = (i % 3) * 3;
                    return sum + Math.round(base + (i % 2 === 0 ? v : -v));
                }, 0);
                percentage = 100 - currentTotal;
            }
            if (percentage < 5) percentage = 5;
            const amount = Math.round((totalAnnualBudget * percentage) / 100);
            return { name: item, percentage, amount };
        });
    };

    const handleDownloadPDF = async () => {
        const input = document.getElementById("budget-report");
        const paywallBanner = document.getElementById("paywall-banner");
        const actionButtonsSection = document.getElementById("action-buttons-section");
        if (!input || !paywallBanner || !actionButtonsSection) return;
        paywallBanner.style.display = 'none';
        actionButtonsSection.style.display = 'none';
        try {
            const canvas = await html2canvas(input, { scale: 2, useCORS: true, logging: false });
            paywallBanner.style.display = 'block';
            actionButtonsSection.style.display = 'block';
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            const pdf = new jsPDF("p", "mm", "a4");
            let position = 0;
            while (heightLeft >= 0) {
                if (position !== 0) pdf.addPage();
                pdf.addImage(canvas.toDataURL("image/jpeg", 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                position -= pageHeight;
            }
            pdf.save(`${budgetData?.businessName || 'Brand'}_Budget_Recommendation_Report.pdf`);
        } catch (error) {
            paywallBanner.style.display = 'block';
            actionButtonsSection.style.display = 'block';
            console.error("PDF generation error:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    const handleSavePlan = () => {
        const savedPlan = {
            ...budgetData,
            assessmentData,
            createdAt: new Date().toISOString(),
            monthlyBudget,
            totalAnnualBudget
        };
        localStorage.setItem('mibbs_saved_plan', JSON.stringify(savedPlan));
        alert('Your budget plan has been saved locally!');
    };

    const pieChartData = (budgetData?.allocations || []).map((allocation: any, index: number) => ({
        name: allocation.channel,
        value: allocation.percent,
        amount: allocation.amount,
        color: MIBBS_COLORS[index % MIBBS_COLORS.length]
    }));

    const barChartData = getIndustryChannels();

    // Merge stable budgets into budgetData passed to chatbot so chatbot uses exact same numbers:
    const mergedBudgetDataForChatbot = useMemo(() => ({
        ...budgetData,
        monthlyBudget,
        totalAnnualBudget
    }), [budgetData, monthlyBudget, totalAnnualBudget]);

    // -------------------- JSX (Your existing JSX remains unchanged with stable values plugged in) --------------------
    


    
// ---------------- FINAL DYNAMIC ALLOCATIONS (SINGLE SOURCE) ----------------
const finalAllocations = useMemo(() => {
    const baseCategories = [
        'Digital Marketing',
        'Brand & Creative',
        'Traditional Media',
        'Events & PR'
    ];

    // Generate random but controlled percentages
    let remaining = 100;
    const percentages = baseCategories.map((_, index) => {
        if (index === baseCategories.length - 1) return remaining;
        const val = Math.floor(15 + Math.random() * 15); // 15–30%
        remaining -= val;
        return val;
    });

    // Normalize safety
    const total = percentages.reduce((a, b) => a + b, 0);
    if (total !== 100) percentages[0] += 100 - total;

    return baseCategories.map((name, index) => ({
        channel: name,
        percent: percentages[index],
        amount: Math.round((totalAnnualBudget * percentages[index]) / 100)
    }));
}, [totalAnnualBudget]);

    
    
    return (
        // Added 'id' for PDF generation
        <div id="budget-report" className="w-full min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
            <div className="w-full max-w-7xl mx-auto space-y-6">
                
                {/* Header */}
                <header className="bg-white w-full py-6 px-4 rounded shadow-md">
                    <div className="max-w-4xl flex flex-col sm:flex-row items-center justify-center mx-auto sm:items-end gap-3">
                        <img
                            src={mibbslogo}
                            alt="mibbs logo"
                            className="h-10 sm:h-12 w-auto"
                            style={{ maxWidth: 160 }}
                        />
                        <div className="text-center sm:text-left">
                            <h1 className="text-md sm:text-2xl font-black text-indigo-900 whitespace-nowrap">
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

                {/* About MIBBS Section */}
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-br from-indigo-700 to-blue-900 rounded p-8 text-white shadow-2xl transition-all duration-500 hover:shadow-indigo-500/50">
                        <h2 className="text-xl font-bold text-center mb-4 tracking-wider uppercase flex items-center justify-center space-x-2">
                            <span>Why MIBBS?</span>
                        </h2>
                        <p className="text-sm text-center max-w-3xl mx-auto opacity-90 leading-relaxed">
                            At Magsmen, we've seen brands struggle not because they lacked ideas, but because they lacked intelligent budget planning. MIBBS is India's first intelligent brand budgeting system, a structured, data-driven model crafted to align your brand ambitions with financial discipline, helping you invest smarter, grow faster, and build a stronger market position.
                        </p>
                    </div>
                </div>

                {/* --- */}

                {/* Business Summary */}
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

                    {/* Monthly & Annual Budget Display using Flex for alignment */}
                    <div className="mt-8 pt-4 border-t-2 border-dashed border-indigo-100">
                        <p className="text-lg font-medium text-gray-700 uppercase tracking-widest text-center mb-6">Recommended Brand Budget</p>
                        {/* START: Added Monthly Revenue Card */}
                        <div className='flex justify-center mb-6'>
                            <div className='p-4 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm w-full max-w-sm text-center'>
                                <p className="text-sm font-semibold text-yellow-700 uppercase tracking-wider mb-1">Estimated Monthly Revenue</p>
                                <h2 className="text-2xl font-black text-yellow-600">
                                    {formatCurrency(monthlyRevenue)}
                                </h2>
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
                    </div>
                </div>

                {/* --- */}

                {/* Charts Section */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 w-full">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Budget Allocation & Channel Performance</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Pie Chart Section (Budget Distribution) */}
                        <div>
                            <h3 className="text-xl font-semibold text-indigo-700 mb-6">Budget Distribution</h3>
                            <div className="w-full flex justify-center mb-8">
                                <div className="w-100 h-100 relative">
                                    <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90 shadow-2xl rounded-full">
                                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#E5E7EB" strokeWidth="4" />
                                        {pieChartData.map((item: any, index: number) => {
                                            const circumference = 100;
                                            const offset = pieChartData.slice(0, index).reduce((sum: number, prev: any) => sum + prev.value, 0);
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
                            {/* <div className="space-y-3">
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
                            </div> */}
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

                {/* Budget Allocation Cards */}
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full pt-10">
                    {(budgetData?.allocations || []).map((allocation: any, index: number) => (
                        <AllocationCard 
                            key={index} 
                            allocation={allocation} 
                            formatCurrency={formatCurrency}
                            color={MIBBS_COLORS[index % MIBBS_COLORS.length]}
                        />
                    ))}
                </div> */}





                {/* Final Budget Allocation Cards */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full pt-10">
    {finalAllocations.map((allocation, index) => (
        <AllocationCard
            key={allocation.channel}
            allocation={allocation}
            formatCurrency={formatCurrency}
            color={MIBBS_COLORS[index % MIBBS_COLORS.length]}
        />
    ))}
</div>





                {/* --- */}

                {/* Industry Details Section */}
                {budgetData.industryDetails && (
                    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 w-full">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                            <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                            <span>{budgetData.industryDetails.name} Industry Benchmark Insights</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                         
                            <div className="bg-yellow-50 rounded-xl p-5 border-l-4 border-yellow-500">
                                <h3 className="font-bold text-gray-900 mb-2 uppercase text-sm tracking-wider">Avg. Marketing Spend</h3>
                                <div className="text-2xl font-black text-yellow-700">
                                    {budgetData.industryDetails.marketingSpendRange} of Revenue
                                </div>
                                <p className="text-xs text-gray-600 mt-2">Recommended range for similar-sized businesses.</p>
                            </div>

                        
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

                {/* Paywall Banner - ID for Exclusion */}
                <div id="paywall-banner" className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white w-full shadow-xl">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-6">
                            <Crown className="w-10 h-1- text-yellow-300 fill-yellow-300" />
                            <div>
                                <h3 className="text-xl sm:text-2xl font-black">Unlock Your Brand's Full Potential</h3>
                                <p className="text-purple-100 mt-1 font-light">Get Spend Tracker, Agency Discovery, and Premium Tools.</p>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-center">
                            <div className="text-3xl font-black">₹999</div>
                            <div className="text-purple-200 text-sm">per month</div>
                            <button className="mt-3 bg-white text-purple-700 px-6 py-3 rounded-full font-bold shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-purple-50">
                                Subscribe to Premium
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- */}

                {/* Action Buttons - ADDED ID for Exclusion */}
                <div id="action-buttons-section" className="bg-white rounded-3xl shadow-2xl p-8 text-center w-full border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to put your plan to work?</h2>
                    <p className="text-gray-600 mb-8">Take the next step: save your plan, download the report, or continue to your personalized dashboard.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-4xl mx-auto">
                        
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

                         <button
                            onClick={onContinueToDashboard}
                            className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl flex-grow"
                        >
                            <span>Go to Dashboard</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
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
{/* About Magsmen Section - Footer style */}
<footer className="max-w-7xl mx-auto pb-8">
    <div className="bg-indigo-900 p-6 text-white shadow-xl">
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
{/* Chatbot - Pass stable monthlyBudget and totalAnnualBudget so chatbot uses same values */}
<BudgetChatbot
    budgetData={mergedBudgetDataForChatbot}
    isOpen={showChatbot}
    onClose={() => setShowChatbot(false)}
/>
</div>

    );
};
export default BudgetPlanScreen;































