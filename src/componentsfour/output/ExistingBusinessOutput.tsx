import { useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Save, Download, LayoutDashboard, ArrowLeft } from "lucide-react";
import { QuestionnaireData } from "@/types/questionnaire";
import { industryData, calculateBudgets } from "@/data/industryDatatwo";
import { createSeededRandom, getDataSeed } from "../../../utils/seededRandom";
import mibbsLogo from "../../assets/mibbs-2.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ExistingBusinessOutputProps {
  data: QuestionnaireData;
  onSave: () => void;
  onGoToDashboard: () => void;
  onBack: () => void;
}

const formatINRFull = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

// Algorithm: derive values from questionnaire data with seeded allocation
function generateReport(data: QuestionnaireData) {
  const rand = createSeededRandom(getDataSeed(data));
  const ind = industryData[data.industry] || industryData["Other"];

  const rawRevenue = parseInt((data.monthlyRevenue || "10000").replace(/[^0-9]/g, ""), 10) || 10000;
  const budgetCalc = calculateBudgets(rawRevenue, data.industry);

  const audienceMap: Record<string, string> = {
    "Food & Beverages": "Youth (18-35)",
    "Retail & E-commerce": "All Ages (18-55)",
    "Health & Wellness": "Adults (25-50)",
    "Education & Training": "Students & Parents",
    "Beauty & Personal Care": "Women (18-40)",
    "Real Estate": "Professionals (30-55)",
    "Technology & IT": "Tech Professionals",
    "Fashion & Apparel": "Youth (18-35)",
    "Automotive": "Adults (25-55)",
    "Home Services": "Homeowners (30-60)",
    "Travel & Tourism": "Travelers (22-50)",
    "Finance & Insurance": "Working Adults (25-55)",
    "Entertainment & Media": "Youth (15-35)",
    "Agriculture": "Farmers & Traders",
    "Manufacturing": "B2B Buyers",
  };

  const challengeCount = (data.businessChallenges || []).length;
  const competition = challengeCount >= 5 ? "High" : challengeCount >= 3 ? "Medium" : "Low";

  const goals = data.brandObjectives || [];
  const marketingGoal = goals[0] || "Brand Awareness";
  const shortGoal = marketingGoal.length > 20 ? marketingGoal.slice(0, 20) + "..." : marketingGoal;

  const digital = data.digitalScalingLevel || "Basic";
  const salesChannel =
    digital === "No digital presence" ? "Offline Only" :
    digital === "Basic" ? "Online & Retail" :
    digital === "Growing" ? "Multi-Channel" : "Omni-Channel";

  // 4 category budget allocation with seeded variance
  const annual = budgetCalc.annualBudget;
  const weights = [
    25 + rand() * 10, // Digital Marketing
    18 + rand() * 8,  // Brand & Creative
    18 + rand() * 8,  // Traditional Media
    20 + rand() * 15, // Events & PR
  ];
  const wSum = weights.reduce((a, b) => a + b, 0);
  const categories = [
    { name: "Digital Marketing", color: "#3B82F6", desc: "Recommended annual budget for digital marketing activities." },
    { name: "Brand & Creative", color: "#22C55E", desc: "Recommended annual budget for brand & creative activities." },
    { name: "Traditional Media", color: "#EAB308", desc: "Recommended annual budget for traditional media activities." },
    { name: "Events & PR", color: "#EF4444", desc: "Recommended annual budget for events & pr activities." },
  ].map((c, i) => ({
    ...c,
    percent: Math.round((weights[i] / wSum) * 100),
    value: Math.round((weights[i] / wSum) * annual),
  }));

  // Channel breakdown with seeded variance
  const channels = (ind.typicalChannels || "Digital, Print").split(",").map(c => c.trim());
  const allChannels = [...channels, ...ind.parameters.slice(0, 3)];
  const cWeights = allChannels.map(() => 8 + rand() * 25);
  const cSum = cWeights.reduce((a, b) => a + b, 0);
  const channelBars = allChannels.map((name, i) => ({
    name,
    percent: Math.round((cWeights[i] / cSum) * 100),
    value: Math.round((cWeights[i] / cSum) * budgetCalc.monthlyBrandBudget),
  }));

  return {
    ind,
    monthlyRevenue: rawRevenue,
    monthlyBrandBudget: budgetCalc.monthlyBrandBudget,
    annualBudget: budgetCalc.annualBudget,
    spendPercent: budgetCalc.spendPercent,
    targetAudience: audienceMap[data.industry] || "General Audience",
    competition,
    marketingGoal: shortGoal,
    salesChannel,
    categories,
    channelBars,
  };
}

const DONUT_COLORS = ["#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"];

const ExistingBusinessOutput = ({ data, onSave, onGoToDashboard, onBack }: ExistingBusinessOutputProps) => {
  const report = generateReport(data);
  const stageName = data.businessStage === "early" ? "Early Stage" : data.businessStage === "growing" ? "Growing" : "Advanced";
  const reportRef = useRef<HTMLDivElement>(null);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!pdfContentRef.current) return;
    const buttons = pdfContentRef.current.querySelectorAll('[data-pdf-hide]');
    buttons.forEach(el => { (el as HTMLElement).style.visibility = 'hidden'; (el as HTMLElement).style.height = '0'; (el as HTMLElement).style.overflow = 'hidden'; (el as HTMLElement).style.padding = '0'; (el as HTMLElement).style.margin = '0'; });
    const canvas = await html2canvas(pdfContentRef.current, { scale: 2, useCORS: true, scrollY: -window.scrollY, backgroundColor: '#ffffff' });
    buttons.forEach(el => { (el as HTMLElement).style.visibility = ''; (el as HTMLElement).style.height = ''; (el as HTMLElement).style.overflow = ''; (el as HTMLElement).style.padding = ''; (el as HTMLElement).style.margin = ''; });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfPageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfPageHeight;

    while (heightLeft > 0) {
      position -= pdfPageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfPageHeight;
    }

    pdf.save(`MIBBS_Report_${data.name || "Plan"}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] py-0 px-0 print:bg-white">
      <div ref={pdfContentRef} className="max-w-[900px] mx-auto bg-white shadow-lg">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-100 py-5 px-8 flex items-center justify-center gap-3">
          <img src={mibbsLogo} alt="MIBBS Logo" className="h-10 object-contain" />
          <div className="text-left">
            <h1 className="text-lg font-bold text-[#1E293B] tracking-tight">Brand Budget Recommendation Report</h1>
            <p className="text-xs text-gray-400">Generated by MIBBS – India's First Intelligent Brand Budgeting System</p>
          </div>
        </div>

        {/* Why MIBBS Banner */}
        <div className="mx-6 mt-6 rounded-xl bg-gradient-to-r from-[#3730A3] to-[#4F46E5] px-6 py-5 text-center">
          <h2 className="text-white font-bold text-base tracking-wide uppercase mb-2">WHY MIBBS?</h2>
          <p className="text-blue-100 text-xs leading-relaxed max-w-2xl mx-auto">
            At Magsmen, we've seen brands struggle not because they lacked ideas, but because they lacked intelligent budget planning. MIBBS is India's first intelligent brand budgeting system, a structured, data-driven model crafted to align your brand ambitions with financial discipline, helping you invest smarter, grow faster, and build a stronger market position.
          </p>
        </div>

        <div className="h-px bg-gray-200 mx-6 mt-6" />

        {/* Marketing Plan Header */}
        <div className="px-8 pt-6 pb-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1E293B]">
            {data.name || "Your Business"}
          </h2>
          <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
            ✦ {stageName}
          </span>
        </div>

        {/* Responsive 8 Info Cards */}
        <div className="px-4 md:px-8 pb-4">
          <div className="border-t border-l border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Cell 1 */}
            <div className="border-r border-b border-gray-200">
              <InfoCell label="INDUSTRY" value={data.industry} />
            </div>
            
            {/* Cell 2 */}
            <div className="border-r border-b border-gray-200">
              <InfoCell label="LOCATION" value={`${data.locality}, ${data.state}`} />
            </div>
            
            {/* Cell 3 */}
            <div className="border-r border-b border-gray-200">
              <InfoCell label="YEARS IN BUSINESS" value={data.yearsInBusiness || "N/A"} />
            </div>
            
            {/* Cell 4 */}
            <div className="border-r border-b border-gray-200">
              <InfoCell label="DIGITAL MATURITY" value={data.digitalScalingLevel || "basic"} />
            </div>

            {/* Cell 5 */}
            <div className="border-r border-b border-gray-200">
              <InfoCell label="TARGET AUDIENCE" value={report.targetAudience} valueColor="text-blue-600" />
            </div>

            {/* Cell 6 */}
            <div className="border-r border-b border-gray-200">
              <InfoCell label="COMPETITION LEVEL" value={report.competition} valueColor="text-green-600" />
            </div>

            {/* Cell 7 */}
            <div className="border-r border-b border-gray-200">
              <InfoCell label="MARKETING GOAL" value={report.marketingGoal} valueColor="text-orange-500" />
            </div>

            {/* Cell 8 */}
            <div className="border-r border-b border-gray-200">
              <InfoCell label="SALES CHANNEL" value={report.salesChannel} valueColor="text-purple-600" />
            </div>

          </div>
        </div>

        {/* Recommended Brand Budget */}
        <div className="px-8 py-6">
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Recommended Brand Budget</h3>
          <div className="flex justify-center mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg px-6 py-2 text-center">
              <p className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Estimated Monthly Revenue</p>
              <p className="text-xl font-bold text-green-600">{formatINRFull(report.monthlyRevenue)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-xl p-5 text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Brand Budget</p>
              <p className="text-2xl font-bold text-[#4F46E5] mt-1">{formatINRFull(report.monthlyBrandBudget)}</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5 text-center bg-[#F0EDFF]">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Annual Budget (12 Months)</p>
              <p className="text-2xl font-bold text-[#4F46E5] mt-1">{formatINRFull(report.annualBudget)}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 mx-6" />

        {/* Budget Allocation & Channel Performance */}
        <div className="px-8 py-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-6">Budget Allocation & Channel Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-[#4F46E5] mb-4">Budget Distribution</h4>
              <div className="flex items-center justify-center">
                <DonutChart />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#4F46E5] italic mb-4">Industry Channel Focus</h4>
              <div className="space-y-3">
                {report.channelBars.map((ch, i) => (
                  <ChannelBar key={i} name={ch.name} percent={ch.percent} value={ch.value} color={DONUT_COLORS[i % DONUT_COLORS.length]} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 mx-6" />

        {/* 4 Category Cards */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.categories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="h-1" style={{ backgroundColor: cat.color }} />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-[#1E293B]">{cat.name}</h4>
                    <span className="text-sm font-bold" style={{ color: cat.color }}>{cat.percent}%</span>
                  </div>
                  <p className="text-2xl font-bold text-[#1E293B] mt-1">{formatINRFull(cat.value)}</p>
                  <p className="text-xs text-gray-400 mt-2">{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Action Buttons */}
        <div data-pdf-hide className="px-8 py-4 flex items-center justify-center gap-4 print:hidden grid grid-cols-2 lg:grid-cols-4">
          <button onClick={onBack} className="flex items-center gap-2 lg:px-14 px-10 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={onSave} className="flex items-center gap-2 lg:px-14 px-10 py-2.5 rounded-xl bg-[#4F46E5] text-white font-semibold text-sm hover:bg-[#4338CA] transition-all shadow-md">
            <Save className="w-4 h-4" /> Save
          </button>
          <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-[#4F46E5] text-[#4F46E5] font-semibold text-sm hover:bg-[#4F46E5]/5 transition-all">
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button onClick={onGoToDashboard} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E293B] text-white font-semibold text-sm hover:bg-[#0F172A] transition-all">
            <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
          </button>
        </div>

        {/* About Magsmen */}
        <div className="mx-6 rounded-xl bg-gradient-to-r from-[#3730A3] to-[#4F46E5] px-6 py-3 text-center">
          <h3 className="text-white font-bold text-sm">About Magsmen</h3>
        </div>
        <div className="mx-6 mt-3 bg-gray-50 border border-gray-200 rounded-xl px-6 py-4">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            Magsmen is a renowned brand consulting firm that helps businesses grow by making them easy to understand and trust. We believe every business has a unique story and we help you tell it in a simple and powerful way. We guide you to turn your business into a strong, well-known brand without complex ideas or inflated budgets.
          </p>
        </div>
        <div className="text-center py-5">
          <p className="text-xs text-gray-400">© 2026 Magsmen. Secure. Private. In Your Control.</p>
        </div>
      </div>
    </div>
  );
};

/* Sub-components */

const InfoCell = ({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) => (
  <div className="px-4 py-3">
    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className={`text-xs font-semibold mt-0.5 ${valueColor || "text-[#1E293B]"}`} title={value}>{value}</p>
  </div>
);

const DonutChart = () => (
  <div className="relative w-40 h-40">
    <svg viewBox="0 0 160 160" className="w-full h-full">
      <circle cx="80" cy="80" r="60" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="94.2 282.7" strokeDashoffset="0" />
      <circle cx="80" cy="80" r="60" fill="none" stroke="#F59E0B" strokeWidth="20" strokeDasharray="75.4 301.6" strokeDashoffset="-94.2" />
      <circle cx="80" cy="80" r="60" fill="none" stroke="#EF4444" strokeWidth="20" strokeDasharray="56.5 320.4" strokeDashoffset="-169.6" />
      <circle cx="80" cy="80" r="60" fill="none" stroke="#8B5CF6" strokeWidth="20" strokeDasharray="150.8 226.2" strokeDashoffset="-226.2" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-2xl font-bold text-[#1E293B]">100%</span>
      <span className="text-xs text-gray-400">Allocated</span>
    </div>
  </div>
);

const ChannelBar = ({ name, percent, value, color }: { name: string; percent: number; value: number; color: string }) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-xs font-semibold text-[#1E293B]">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold" style={{ color }}>{percent}%</span>
        <span className="text-xs text-gray-400">{formatINRFull(value)}</span>
      </div>
    </div>
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: color }} />
    </div>
  </div>
);

export default ExistingBusinessOutput;
