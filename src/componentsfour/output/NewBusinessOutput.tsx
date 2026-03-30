import { useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Save, Download, LayoutDashboard, ArrowLeft } from "lucide-react";
import { QuestionnaireData } from "@/types/questionnaire";
import { industryData } from "@/data/industryDatatwo";
import { createSeededRandom, getDataSeed } from "../../../utils/seededRandom";
import mibbsLogo from "../../assets/mibbs-2.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface NewBusinessOutputProps {
  data: QuestionnaireData;
  onSave: () => void;
  onGoToDashboard: () => void;
  onBack: () => void;
}

const formatINRFull = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

// Budget map from starting budget selection
const budgetMap: Record<string, number> = {
  "Below ₹1 Lakh": 80000,
  "₹1 - ₹5 Lakhs": 300000,
  "₹5 - ₹10 Lakhs": 700000,
  "₹10 - ₹25 Lakhs": 1500000,
  "₹25 - ₹50 Lakhs": 3500000,
  "₹50 Lakhs - ₹1 Crore": 7000000,
  "Above ₹1 Crore": 15000000,
  "Above ₹5 Lakhs": 700000,
};

function generateNewReport(data: QuestionnaireData) {
  const rand = createSeededRandom(getDataSeed(data));
  const ind = industryData[data.industry] || industryData["Other"];
  const totalBudget = budgetMap[data.startingBudget] || 300000;

  // Suggested allocation for setup phase
  const setupPercent = 35 + rand() * 5;
  const marketingPercent = 25 + rand() * 5;
  const opsPercent = 20 + rand() * 3;
  const remaining = 100 - setupPercent - marketingPercent - opsPercent;

  const categories = [
    { name: "Product / Setup", color: "#3B82F6", desc: "Initial setup, inventory, infrastructure costs.", percent: Math.round(setupPercent), value: Math.round(totalBudget * setupPercent / 100) },
    { name: "Brand & Marketing", color: "#22C55E", desc: "Branding, social media, initial marketing push.", percent: Math.round(marketingPercent), value: Math.round(totalBudget * marketingPercent / 100) },
    { name: "Operations", color: "#EAB308", desc: "Rent, utilities, staffing, daily expenses.", percent: Math.round(opsPercent), value: Math.round(totalBudget * opsPercent / 100) },
    { name: "Contingency", color: "#EF4444", desc: "Emergency fund and unexpected expenses.", percent: Math.round(remaining), value: Math.round(totalBudget * remaining / 100) },
  ];

  // Channel recommendations
  const channels = (ind.typicalChannels || "Digital, Print").split(",").map(c => c.trim());
  const allChannels = [...channels, ...ind.parameters.slice(0, 2)];
  const cWeights = allChannels.map(() => 8 + rand() * 25);
  const cSum = cWeights.reduce((a, b) => a + b, 0);
  const channelBars = allChannels.map((name, i) => ({
    name,
    percent: Math.round((cWeights[i] / cSum) * 100),
    value: Math.round((cWeights[i] / cSum) * totalBudget * 0.25),
  }));

  const helpAreas = (data.helpNeeded || []).join(", ") || "General guidance";

  return { ind, totalBudget, categories, channelBars, helpAreas };
}

const DONUT_COLORS = ["#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"];

const NewBusinessOutput = ({ data, onSave, onGoToDashboard, onBack }: NewBusinessOutputProps) => {
  const report = generateNewReport(data);
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

    pdf.save(`MIBBS_NewBusiness_Report_${data.name || "Plan"}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] py-0 px-0 print:bg-white">
      <div ref={pdfContentRef} className="max-w-[900px] mx-auto bg-white shadow-lg">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-100 py-5 px-8 flex items-center justify-center gap-3">
          <img src={mibbsLogo} alt="MIBBS Logo" className="h-10 object-contain" />
          <div className="text-left">
            <h1 className="text-sm md:text-lg lg:text-xl font-bold text-[#1E293B] tracking-tight">New Business Launch Report</h1>
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

        {/* Launch Plan Header */}
        <div className="px-8 pt-6 pb-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1E293B]">
            {data.name || "Your Business Plan"}
          </h2>
          <span className="text-sm font-semibold text-orange-500 flex items-center gap-1">
            🚀 New Business
          </span>
        </div>

        {/* Info Cards - Responsive Grid */}
        <div className="px-4 md:px-8 pb-4">
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col">
            {/* Top Row: Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-200">
              <InfoCell label="BUSINESS NAME" value={data.businessName || "Not Named"} />
              <div className="sm:border-l lg:border-l-0 border-gray-200">
                <InfoCell label="LOCATION" value={`${data.locality}, ${data.state}`} />
              </div>
              <InfoCell label="INDUSTRY" value={data.industry} />
              <InfoCell label="BUSINESS MODE" value={data.businessMode || "N/A"} />
            </div>

            {/* Bottom Row: Responsive Grid */}
            <div className="border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-200">
              <InfoCell label="STARTING BUDGET" value={data.startingBudget || "N/A"} valueColor="text-green-600" />
              <div className="sm:border-l lg:border-l-0 border-gray-200">
                <InfoCell label="BUSINESS TYPE" value={data.businessType === "product" ? "Products" : "Services"} valueColor="text-blue-600" />
              </div>
              <InfoCell label="HELP NEEDED" value={report.helpAreas.length > 25 ? report.helpAreas.slice(0, 25) + "..." : report.helpAreas} valueColor="text-orange-500" />
              <InfoCell label="PRODUCT CATEGORY" value={data.productCategory || "N/A"} valueColor="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Total Investment */}
        <div className="px-8 py-6">
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Suggested Budget Allocation</h3>
          <div className="flex justify-center mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-2 text-center">
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Total Starting Capital</p>
              <p className="text-xl font-bold text-blue-600">{formatINRFull(report.totalBudget)}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 mx-6" />

{/* Budget Allocation & Channel Performance - Responsive Version */}
        <div className="px-4 md:px-8 py-6">
          <h3 className="text-base md:text-lg font-bold text-[#1E293B] mb-6 text-center md:text-left">
            Budget Allocation & Recommended Channels
          </h3>
          
          {/* Changed grid-cols-2 to grid-cols-1 for mobile, md:grid-cols-2 for desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-start">
            
            {/* Capital Distribution Column */}
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-xs md:text-sm font-semibold text-[#4F46E5] mb-6 md:mb-4 uppercase tracking-wider">
                Capital Distribution
              </h4>
              <div className="flex items-center justify-center w-full">
                <DonutChart />
              </div>
            </div>

            {/* Recommended Channels Column */}
            <div className="w-full px-2 sm:px-0">
              <h4 className="text-xs md:text-sm font-semibold text-[#4F46E5] italic mb-6 md:mb-4 uppercase tracking-wider text-center md:text-left">
                Recommended Channels
              </h4>
              <div className="space-y-5">
                {report.channelBars.map((ch, i) => (
                  <ChannelBar 
                    key={i} 
                    name={ch.name} 
                    percent={ch.percent} 
                    value={ch.value} 
                    color={DONUT_COLORS[i % DONUT_COLORS.length]} 
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="h-px bg-gray-200 mx-6" />
        {/* 4 Category Cards */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          <h3 className="text-white font-bold text-lg pb-3">About Magsmen</h3>
        
          <p className="text-xs text-white text-center leading-relaxed">
            Magsmen is a renowned brand consulting firm that helps businesses grow by making them easy to understand and trust. We believe every business has a unique story and we help you tell it in a simple and powerful way. We guide you to turn your business into a strong, well-known brand without complex ideas or inflated budgets.
          </p>
       
        </div>

        <div className="text-center py-5">
          <p className="text-xs text-gray-400">© 2026 MIBBS. Secure. Private. In Your Control.</p>
        </div>
      </div>
    </div>
  );
};

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
      <circle cx="80" cy="80" r="60" fill="none" stroke="#22C55E" strokeWidth="20" strokeDasharray="75.4 301.6" strokeDashoffset="-94.2" />
      <circle cx="80" cy="80" r="60" fill="none" stroke="#EAB308" strokeWidth="20" strokeDasharray="56.5 320.4" strokeDashoffset="-169.6" />
      <circle cx="80" cy="80" r="60" fill="none" stroke="#EF4444" strokeWidth="20" strokeDasharray="150.8 226.2" strokeDashoffset="-226.2" />
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

export default NewBusinessOutput;
