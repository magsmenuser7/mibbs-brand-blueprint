import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, BarChart3, Users, Wand2, CreditCard, Settings, Search,
  Bell, User, LogOut, Plus, Eye, Download, TrendingUp, Clock, Factory,
  MapPin, Star, Phone, Mail, MessageSquare, Calendar, ChevronRight,
  Shield, Lock, Globe, Palette, BellRing, UserCircle, Edit, Trash2,
  CheckCircle2, X, ChevronDown, Filter,
} from "lucide-react";
import { QuestionnaireData } from "@/types/questionnaire";
import { calculateBudgets } from "@/data/industryDatatwo";
import mibbsLogo from "../../assets/mibbs-1.png";
import { agencies as allAgenciesData, AGENCY_CATEGORIES, ALL_CITIES, ALL_STATES } from "@/data/agenciesData";

interface SavedPlan {
  id: string;
  data: QuestionnaireData;
  type: "new" | "existing";
  savedAt: string;
}

interface DashboardProps {
  plans: SavedPlan[];
  onViewPlan: (plan: SavedPlan) => void;
  onDeletePlan: (id: string) => void;
  onNewRegistration: () => void;
}

const formatINRFull = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

type DashboardPage = "budget" | "spend" | "agencies" | "growth" | "payments" | "settings";

const navItems: { id: DashboardPage; label: string; icon: React.ReactNode }[] = [
  { id: "budget", label: "Budget Plans", icon: <FileText className="w-5 h-5" /> },
  { id: "spend", label: "Spend Tracker", icon: <BarChart3 className="w-5 h-5" /> },
  { id: "agencies", label: "Agencies", icon: <Users className="w-5 h-5" /> },
  { id: "growth", label: "Growth Tools", icon: <Wand2 className="w-5 h-5" /> },
  { id: "payments", label: "Payments", icon: <CreditCard className="w-5 h-5" /> },
  { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
];

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

const generateNotifications = (plans: SavedPlan[]): Notification[] => {
  const notifs: Notification[] = [
    { id: "1", title: "Welcome to MIBBS!", message: "Complete your first registration to unlock budget insights.", time: "Just now", read: false, type: "info" },
    { id: "2", title: "New Agency Match", message: "3 agencies near your location match your budget range.", time: "2h ago", read: false, type: "success" },
    { id: "3", title: "Growth Tip", message: "Festival season is coming! Plan your marketing calendar.", time: "5h ago", read: true, type: "info" },
  ];
  plans.forEach((p, i) => {
    notifs.push({
      id: `plan-${p.id}`,
      title: "Plan Saved Successfully",
      message: `Your ${p.type === "new" ? "New Business" : "Existing Business"} plan for ${p.data.industry || "business"} has been saved.`,
      time: new Date(p.savedAt).toLocaleDateString("en-IN"),
      read: i < plans.length - 1,
      type: "success",
    });
  });
  return notifs;
};

const createRand = (s: string) => {
  let hash = 0;
  for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); hash = ((hash << 5) - hash) + c; hash = hash & hash; }
  let state = Math.abs(hash) || 1;
  return () => { state = (state * 1664525 + 1013904223) & 0xffffffff; return (state >>> 0) / 0xffffffff; };
};

const Dashboard = ({ plans, onViewPlan, onDeletePlan, onNewRegistration }: DashboardProps) => {
  const [page, setPage] = useState<DashboardPage>("budget");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(() => generateNotifications(plans));
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const latestPlan = plans.length > 0 ? plans[plans.length - 1] : null;
  const userName = latestPlan?.data.name || "User";
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col min-h-screen">
        <div className="px-5 py-5 border-b border-gray-100 flex items-center gap-2">
          <img src={mibbsLogo} alt="MIBBS Logo" className="object-cover" />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                page === item.id
                  ? "bg-[#EEF2FF] text-[#4F46E5]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 pb-4">
          <div className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-xl p-4 text-center">
            <p className="text-white font-bold text-sm">Upgrade to Premium</p>
            <p className="text-white/70 text-xs mt-1">Unlock advanced features</p>
            <button className="mt-3 w-full bg-white text-[#7C3AED] font-semibold text-xs py-2 rounded-lg hover:bg-gray-50 transition-all">
              Start Free Trial
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Welcome back, <span className="text-[#4F46E5]">{userName}</span></h1>
            <p className="text-sm text-gray-500">Your brand command center</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none w-32" />
            </div>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }} className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 top-12 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <h4 className="font-bold text-sm text-[#1E293B]">Notifications</h4>
                      <button onClick={markAllRead} className="text-xs text-[#4F46E5] font-medium hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-8">No notifications</p>
                      ) : (
                        notifications.map((n) => (
                          <button key={n.id} onClick={() => markRead(n.id)}
                            className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-all ${!n.read ? "bg-blue-50/50" : ""}`}>
                            <div className="flex items-start gap-3">
                              <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${!n.read ? "bg-[#4F46E5]" : "bg-transparent"}`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#1E293B]">{n.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
                className="w-9 h-9 rounded-full bg-[#4F46E5] flex items-center justify-center text-white hover:bg-[#4338CA] transition-all">
                <User className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {showProfile && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 top-12 w-64 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white font-bold">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#1E293B]">{userName}</p>
                          <p className="text-xs text-gray-500">{latestPlan?.data.businessName || "Business Owner"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button onClick={() => { setPage("settings"); setShowProfile(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <UserCircle className="w-4 h-4" /> View Profile
                      </button>
                      <button onClick={() => { setPage("settings"); setShowProfile(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="w-4 h-4" /> Account Settings
                      </button>
                      <button onClick={() => { setPage("budget"); setShowProfile(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <FileText className="w-4 h-4" /> My Plans
                      </button>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button onClick={() => { onNewRegistration(); setShowProfile(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={onNewRegistration} className="p-2 text-gray-400 hover:text-gray-600">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto" onClick={() => { setShowNotifications(false); setShowProfile(false); }}>
          {page === "budget" && <BudgetPlansPage plans={plans} onViewPlan={onViewPlan} onNewRegistration={onNewRegistration} />}
          {page === "spend" && <SpendTrackerPage latestPlan={latestPlan} />}
          {page === "agencies" && <AgenciesPage />}
          {page === "growth" && <GrowthToolsPage />}
          {page === "payments" && <PaymentsPage plans={plans} />}
          {page === "settings" && <SettingsPage userName={userName} businessName={latestPlan?.data.businessName || ""} industry={latestPlan?.data.industry || ""} locality={latestPlan?.data.locality || ""} state={latestPlan?.data.state || ""} />}
        </div>
      </main>
    </div>
  );
};

/* ─── Budget Plans Page ─── */
const BudgetPlansPage = ({ plans, onViewPlan, onNewRegistration }: { plans: SavedPlan[]; onViewPlan: (p: SavedPlan) => void; onNewRegistration: () => void }) => {
  const latest = plans.length > 0 ? plans[plans.length - 1] : null;

  let annualBudget = 0;
  let monthlyAvg = 0;
  let industry = "N/A";
  if (latest) {
    if (latest.type === "existing") {
      const rev = parseInt((latest.data.monthlyRevenue || "10000").replace(/[^0-9]/g, ""), 10) || 10000;
      const calc = calculateBudgets(rev, latest.data.industry);
      annualBudget = calc.annualBudget;
      monthlyAvg = calc.monthlyBrandBudget;
    } else {
      const budgetMap: Record<string, number> = { "Below ₹1 Lakh": 80000, "₹1 - ₹5 Lakhs": 300000, "Above ₹5 Lakhs": 700000 };
      annualBudget = budgetMap[latest.data.startingBudget] || 300000;
      monthlyAvg = Math.round(annualBudget / 12);
    }
    industry = latest.data.industry;
  }

  const seedStr = latest ? `${latest.data.name || ''}-${latest.data.businessName || ''}-${latest.data.industry || ''}-${latest.data.pincode || ''}-${latest.data.monthlyRevenue || ''}-${latest.data.startingBudget || ''}` : '';
  const rand = createRand(seedStr);
  const weights = [25 + rand() * 10, 18 + rand() * 8, 18 + rand() * 8, 20 + rand() * 15];
  const wSum = weights.reduce((a, b) => a + b, 0);
  const channels = [
    { name: "Digital Marketing", percent: Math.round((weights[0] / wSum) * 100), color: "#3B82F6" },
    { name: "Brand & Creative", percent: Math.round((weights[1] / wSum) * 100), color: "#22C55E" },
    { name: "Traditional Media", percent: Math.round((weights[2] / wSum) * 100), color: "#EAB308" },
    { name: "Events & PR", percent: Math.round((weights[3] / wSum) * 100), color: "#EF4444" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Budget Plans</h2>
          <p className="text-sm text-gray-500">Your saved budget plans and performance</p>
        </div>
        <button onClick={onNewRegistration} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm hover:bg-[#4338CA] transition-all">
          <Plus className="w-4 h-4" /> New Registration
        </button>
      </div>

      {latest && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#1E293B]">Current Budget Plan</h3>
              <p className="text-sm text-gray-500">Generated for {industry} business</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onViewPlan(latest)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Eye className="w-4 h-4" /> View Full Plan
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4338CA]">
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F0FDF4] rounded-xl p-4">
              <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-xs text-gray-500">Annual Budget</p>
              <p className="text-xl font-bold text-[#1E293B]">{formatINRFull(annualBudget)}</p>
            </div>
            <div className="bg-[#EFF6FF] rounded-xl p-4">
              <Clock className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-xs text-gray-500">Monthly Average</p>
              <p className="text-xl font-bold text-[#1E293B]">{formatINRFull(monthlyAvg)}</p>
            </div>
            <div className="bg-[#F5F3FF] rounded-xl p-4">
              <Factory className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-xs text-gray-500">Industry</p>
              <p className="text-xl font-bold text-[#1E293B]">{industry}</p>
            </div>
          </div>
          <h4 className="font-bold text-[#1E293B] mb-3">Budget Allocation by Channel</h4>
          <div className="grid grid-cols-2 gap-4">
            {channels.map((ch) => (
              <div key={ch.name} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-[#1E293B]">{ch.name}</h5>
                  <span className="text-sm font-bold" style={{ color: ch.color }}>{ch.percent}%</span>
                </div>
                <p className="text-xl font-bold text-[#1E293B] mt-1">{formatINRFull(annualBudget * ch.percent / 100)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {plans.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#1E293B] mb-2">No Plans Yet</h3>
          <p className="text-gray-500 mb-4">Complete a registration to see your budget plan here.</p>
          <button onClick={onNewRegistration} className="px-6 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm">
            Create Your First Plan
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── Spend Tracker Page ─── */
const SpendTrackerPage = ({ latestPlan }: { latestPlan: SavedPlan | null }) => {
  const [spendEntries, setSpendEntries] = useState<{ channel: string; amount: number; date: string; note: string }[]>(() => {
    const saved = localStorage.getItem("mibbs_spend_entries");
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddSpend, setShowAddSpend] = useState(false);
  const [newChannel, setNewChannel] = useState("Digital Marketing");
  const [newAmount, setNewAmount] = useState("");
  const [newNote, setNewNote] = useState("");

  let annualBudget = 0;
  if (latestPlan) {
    if (latestPlan.type === "existing") {
      const rev = parseInt((latestPlan.data.monthlyRevenue || "10000").replace(/[^0-9]/g, ""), 10) || 10000;
      const calc = calculateBudgets(rev, latestPlan.data.industry);
      annualBudget = calc.annualBudget;
    } else {
      const budgetMap: Record<string, number> = { "Below ₹1 Lakh": 80000, "₹1 - ₹5 Lakhs": 300000, "Above ₹5 Lakhs": 700000 };
      annualBudget = budgetMap[latestPlan.data.startingBudget] || 300000;
    }
  }

  const seedStr = latestPlan ? `${latestPlan.data.name || ''}-${latestPlan.data.businessName || ''}-${latestPlan.data.industry || ''}-${latestPlan.data.pincode || ''}-${latestPlan.data.monthlyRevenue || ''}-${latestPlan.data.startingBudget || ''}` : '';
  const rand = createRand(seedStr);
  const weights = [25 + rand() * 10, 18 + rand() * 8, 18 + rand() * 8, 20 + rand() * 15];
  const wSum = weights.reduce((a, b) => a + b, 0);

  const channelNames = ["Digital Marketing", "Brand & Creative", "Traditional Media", "Events & PR"];
  const channelColors = ["#3B82F6", "#22C55E", "#A855F7", "#F59E0B"];

  const channelBudgets = channelNames.map((name, i) => ({
    name,
    color: channelColors[i],
    budget: Math.round(annualBudget * (weights[i] / wSum)),
  }));

  const channelSpent = channelNames.map((name) =>
    spendEntries.filter(e => e.channel === name).reduce((sum, e) => sum + e.amount, 0)
  );

  const totalBudget = annualBudget || 500000;
  const amountSpent = channelSpent.reduce((a, b) => a + b, 0);
  const remaining = totalBudget - amountSpent;
  const usage = totalBudget > 0 ? ((amountSpent / totalBudget) * 100).toFixed(1) : "0.0";

  const handleAddSpend = () => {
    const amt = parseInt(newAmount.replace(/[^0-9]/g, ""), 10);
    if (!amt || amt <= 0) return;
    const entry = { channel: newChannel, amount: amt, date: new Date().toISOString(), note: newNote || "Manual entry" };
    const updated = [...spendEntries, entry];
    setSpendEntries(updated);
    localStorage.setItem("mibbs_spend_entries", JSON.stringify(updated));
    setNewAmount("");
    setNewNote("");
    setShowAddSpend(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Spend Tracker</h2>
          <p className="text-sm text-gray-500">Track your marketing spend and ROI</p>
        </div>
        <button onClick={() => setShowAddSpend(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm">
          <Plus className="w-4 h-4" /> Add Spend
        </button>
      </div>

      {/* Add Spend Modal */}
      <AnimatePresence>
        {showAddSpend && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={() => setShowAddSpend(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#1E293B]">Add Spend Entry</h3>
                <button onClick={() => setShowAddSpend(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Channel</label>
                  <select value={newChannel} onChange={e => setNewChannel(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5]">
                    {channelNames.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Amount (₹)</label>
                  <input type="text" value={newAmount} onChange={e => setNewAmount(e.target.value)} placeholder="e.g. 25000" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5]" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Note</label>
                  <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="e.g. Google Ads campaign" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5]" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleAddSpend} className="flex-1 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm hover:bg-[#4338CA]">Add Entry</button>
                <button onClick={() => setShowAddSpend(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: <CreditCard className="w-5 h-5 text-blue-600" />, label: "Total Budget", value: formatINRFull(totalBudget), bg: "bg-blue-50" },
          { icon: <TrendingUp className="w-5 h-5 text-orange-500" />, label: "Amount Spent", value: formatINRFull(amountSpent), bg: "bg-orange-50" },
          { icon: <Clock className="w-5 h-5 text-green-600" />, label: "Remaining", value: formatINRFull(remaining), bg: "bg-green-50" },
          { icon: <BarChart3 className="w-5 h-5 text-purple-600" />, label: "Usage", value: `${usage}%`, bg: "bg-purple-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>{s.icon}</div>
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-lg font-bold text-[#1E293B]">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-bold text-[#1E293B] mb-4">Spend by Channel</h3>
        <div className="space-y-5">
          {channelBudgets.map((ch, idx) => {
            const spent = channelSpent[idx];
            const util = ch.budget > 0 ? ((spent / ch.budget) * 100).toFixed(1) : "0.0";
            return (
              <div key={ch.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ch.color }} />
                    <span className="text-sm font-semibold text-[#1E293B]">{ch.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatINRFull(spent)} / {formatINRFull(ch.budget)}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(parseFloat(util), 100)}%`, backgroundColor: ch.color }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">{util}% utilized</p>
              </div>
            );
          })}
        </div>
      </div>

      {spendEntries.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-[#1E293B] mb-4">Recent Entries</h3>
          <div className="space-y-3">
            {[...spendEntries].reverse().slice(0, 10).map((entry, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">{entry.channel}</p>
                  <p className="text-xs text-gray-400">{entry.note} • {new Date(entry.date).toLocaleDateString("en-IN")}</p>
                </div>
                <p className="text-sm font-bold text-[#1E293B]">{formatINRFull(entry.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Agencies Page ─── */
const AgenciesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState<string | null>(null);
  const [requestText, setRequestText] = useState("");
  const [messageText, setMessageText] = useState("");
  const [sentRequests, setSentRequests] = useState<string[]>(() => {
    const saved = localStorage.getItem("mibbs_agency_requests");
    return saved ? JSON.parse(saved) : [];
  });
  const [sentMessages, setSentMessages] = useState<{ agencyName: string; text: string; time: string }[]>(() => {
    const saved = localStorage.getItem("mibbs_agency_messages");
    return saved ? JSON.parse(saved) : [];
  });

  // Get cities for selected state
  const filteredCities = selectedState === "all"
    ? ALL_CITIES
    : Array.from(new Set(allAgenciesData.filter(a => a.state === selectedState).map(a => a.city))).sort();

  const filtered = allAgenciesData.filter(a => {
    const matchesSearch = searchQuery === "" ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      a.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || a.tags.includes(selectedCategory);
    const matchesCity = selectedCity === "all" || a.city === selectedCity;
    const matchesState = selectedState === "all" || a.state === selectedState;
    return matchesSearch && matchesCategory && matchesCity && matchesState;
  });

  // Group by city for display
  const groupedByCity: Record<string, typeof filtered> = {};
  filtered.forEach(a => {
    if (!groupedByCity[a.city]) groupedByCity[a.city] = [];
    groupedByCity[a.city].push(a);
  });
  const sortedCities = Object.keys(groupedByCity).sort();

  const handleSendRequest = (agencyName: string) => {
    if (!requestText.trim()) return;
    const updated = [...sentRequests, agencyName];
    setSentRequests(updated);
    localStorage.setItem("mibbs_agency_requests", JSON.stringify(updated));
    setRequestText("");
    setShowRequestModal(null);
  };

  const handleSendMessage = (agencyName: string) => {
    if (!messageText.trim()) return;
    const msg = { agencyName, text: messageText, time: new Date().toISOString() };
    const updated = [...sentMessages, msg];
    setSentMessages(updated);
    localStorage.setItem("mibbs_agency_messages", JSON.stringify(updated));
    setMessageText("");
    setShowMessageModal(null);
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedCity("all");
    setSelectedState("all");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedCity !== "all" || selectedState !== "all" || searchQuery !== "";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Top Agencies Involved</h2>
          <p className="text-sm text-gray-500">
            {filtered.length} agencies across {sortedCities.length} cities
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button onClick={clearAllFilters} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50">
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
          <button onClick={() => setShowLocationFilter(!showLocationFilter)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Location Filter
          </button>
        </div>
      </div>

      {/* Location Filters */}
      <AnimatePresence>
        {showLocationFilter && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-4 mb-4 overflow-hidden">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">State</label>
                <select value={selectedState} onChange={e => { setSelectedState(e.target.value); setSelectedCity("all"); }}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5]">
                  <option value="all">All States</option>
                  {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">City</label>
                <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5]">
                  <option value="all">All Cities</option>
                  {filteredCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 mb-4 flex items-center gap-2">
        <Search className="w-4 h-4 text-gray-400" />
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search agencies by name, specialty, city, or state..." className="flex-1 bg-transparent text-sm outline-none" />
        {searchQuery && <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
      </div>

      {/* Category Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setSelectedCategory("all")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === "all" ? "bg-[#4F46E5] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>All</button>
        {AGENCY_CATEGORIES.map(tag => (
          <button key={tag} onClick={() => setSelectedCategory(tag)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === tag ? "bg-[#4F46E5] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{tag}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#1E293B] mb-2">No Agencies Found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search, category, or location filters.</p>
          <button onClick={clearAllFilters} className="px-6 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm">Clear All Filters</button>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedCities.map(city => (
            <div key={city}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#4F46E5]" />
                <h3 className="text-lg font-bold text-[#1E293B]">{city}, {groupedByCity[city][0].state}</h3>
                <span className="px-2 py-0.5 bg-[#EEF2FF] text-[#4F46E5] text-xs font-semibold rounded-full">{groupedByCity[city].length} agencies</span>
              </div>
              <div className="space-y-3">
                {groupedByCity[city].map((a, i) => (
                  <motion.div key={a.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl ${a.color} flex items-center justify-center text-xl font-bold flex-shrink-0`}>
                        {a.initial}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[#1E293B]">{a.name}</h4>
                            <span className="text-blue-500">✓</span>
                            {sentRequests.includes(a.name) && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">Request Sent</span>}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-[#1E293B]">Starts {a.price}</p>
                            <p className="text-xs text-gray-400">Avg budget: {a.budget}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3" /> {a.city}, {a.state}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold text-[#1E293B]">{a.rating}</span>
                          <span className="text-xs text-gray-400">({a.reviews} reviews)</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {a.tags.map((t) => (
                            <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded cursor-pointer hover:bg-blue-100" onClick={() => setSelectedCategory(t)}>{t}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <button onClick={() => { setShowRequestModal(a.name); setRequestText(""); }}
                            disabled={sentRequests.includes(a.name)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs ${sentRequests.includes(a.name) ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"}`}>
                            <FileText className="w-3.5 h-3.5" /> {sentRequests.includes(a.name) ? "Requested" : "Raise a Request"}
                          </button>
                          <button onClick={() => { setShowMessageModal(a.name); setMessageText(""); }} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50">
                            <MessageSquare className="w-3.5 h-3.5" /> Message
                          </button>
                          <a href={`tel:${a.phone}`} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50">
                            <Phone className="w-3.5 h-3.5" /> Call
                          </a>
                          <a href={`mailto:${a.email}`} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50">
                            <Mail className="w-3.5 h-3.5" /> Email
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Raise Request Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={() => setShowRequestModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#1E293B]">Raise a Request</h3>
                <button onClick={() => setShowRequestModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <p className="text-sm text-gray-500 mb-4">Send a service request to <span className="font-semibold text-[#1E293B]">{showRequestModal}</span></p>
              <textarea value={requestText} onChange={e => setRequestText(e.target.value)} placeholder="Describe your requirements, budget, and timeline..." rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5] resize-none" />
              <div className="flex gap-3 mt-4">
                <button onClick={() => handleSendRequest(showRequestModal)} className="flex-1 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm hover:bg-[#4338CA]">Send Request</button>
                <button onClick={() => setShowRequestModal(null)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={() => setShowMessageModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#1E293B]">Message Agency</h3>
                <button onClick={() => setShowMessageModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <p className="text-sm text-gray-500 mb-2">To: <span className="font-semibold text-[#1E293B]">{showMessageModal}</span></p>
              {sentMessages.filter(m => m.agencyName === showMessageModal).length > 0 && (
                <div className="mb-3 max-h-32 overflow-y-auto space-y-2">
                  {sentMessages.filter(m => m.agencyName === showMessageModal).map((m, i) => (
                    <div key={i} className="bg-[#EEF2FF] rounded-lg p-2.5 text-xs">
                      <p className="text-[#1E293B]">{m.text}</p>
                      <p className="text-gray-400 text-[10px] mt-1">{new Date(m.time).toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>
              )}
              <textarea value={messageText} onChange={e => setMessageText(e.target.value)} placeholder="Type your message..." rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5] resize-none" />
              <div className="flex gap-3 mt-4">
                <button onClick={() => handleSendMessage(showMessageModal)} className="flex-1 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm hover:bg-[#4338CA]">Send Message</button>
                <button onClick={() => setShowMessageModal(null)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Growth Tools Page ─── */
const GrowthToolsPage = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const tools = [
    { name: "Government Benefits", desc: "MSME schemes and subsidies", icon: <Calendar className="w-6 h-6 text-white" />, bg: "bg-green-500", premium: false, content: {
      title: "Government Benefits & Schemes",
      items: [
        { name: "MSME Registration (Udyam)", desc: "Free registration for micro, small & medium enterprises. Get access to subsidies, credit, and government tenders.", status: "Available" },
        { name: "PMEGP Scheme", desc: "Prime Minister's Employment Generation Programme - Get up to ₹25 lakhs for manufacturing & ₹10 lakhs for service sector.", status: "Check Eligibility" },
        { name: "Credit Guarantee Fund (CGTMSE)", desc: "Collateral-free loans up to ₹2 crores for MSMEs.", status: "Available" },
        { name: "Stand-Up India", desc: "Loans between ₹10 lakhs to ₹1 crore for SC/ST and women entrepreneurs.", status: "Check Eligibility" },
        { name: "Digital MSME Scheme", desc: "Cloud computing subsidies to help businesses go digital.", status: "Apply Now" },
      ]
    }},
    { name: "Brand Protection", desc: "Trademark and legal tools", icon: <Shield className="w-6 h-6 text-white" />, bg: "bg-red-400", premium: true },
    { name: "Sales Tracker", desc: "Daily sales and profit tracking", icon: <TrendingUp className="w-6 h-6 text-white" />, bg: "bg-blue-500", premium: true },
    { name: "Festival Calendar", desc: "Seasonal marketing opportunities", icon: <Calendar className="w-6 h-6 text-white" />, bg: "bg-orange-400", premium: false, content: {
      title: "Upcoming Festival Marketing Calendar",
      items: [
        { name: "Holi (Mar 2026)", desc: "Color-themed campaigns, special discounts on fashion & food. High engagement on social media.", status: "Plan Now" },
        { name: "Eid ul-Fitr (Apr 2026)", desc: "Festival shopping surge. Great for ethnic wear, food & gifting categories.", status: "Upcoming" },
        { name: "Independence Day (Aug 2026)", desc: "Patriotic themed campaigns. Good for all FMCG and retail categories.", status: "Upcoming" },
        { name: "Navratri / Dussehra (Oct 2026)", desc: "9-day festival. Peak season for fashion, jewelry, and electronics.", status: "Upcoming" },
        { name: "Diwali (Nov 2026)", desc: "Biggest shopping festival. Plan mega sales, gift hampers, and ad campaigns.", status: "Upcoming" },
        { name: "Christmas & New Year (Dec 2026)", desc: "Year-end sales, party supplies, travel & hospitality boom.", status: "Upcoming" },
      ]
    }},
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1E293B] mb-1">Business Plus Tools</h2>
      <p className="text-sm text-gray-500 mb-6">Growth checklist, creatives brief, templates</p>

      {!activeTool ? (
        <div className="grid grid-cols-2 gap-4">
          {tools.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 p-6 relative">
              {t.premium && (
                <span className="absolute top-4 right-4 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-md">Premium</span>
              )}
              <div className={`w-12 h-12 rounded-xl ${t.bg} flex items-center justify-center mb-4`}>{t.icon}</div>
              <h4 className="font-bold text-[#1E293B] text-lg">{t.name}</h4>
              <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
              <button onClick={() => t.premium ? setShowUpgradeModal(true) : setActiveTool(t.name)}
                className={`mt-4 w-full py-2.5 rounded-lg font-semibold text-sm ${
                  t.premium ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90" : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                } transition-all`}>
                {t.premium ? "Upgrade to Access" : "Explore Tool"}
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => setActiveTool(null)} className="flex items-center gap-2 text-sm text-[#4F46E5] font-medium mb-4 hover:underline">
            ← Back to Tools
          </button>
          {(() => {
            const tool = tools.find(t => t.name === activeTool);
            if (!tool || !tool.content) return null;
            return (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-[#1E293B] mb-6">{tool.content.title}</h3>
                <div className="space-y-4">
                  {tool.content.items.map((item, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-[#4F46E5]/30 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#1E293B]">{item.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ml-4 ${
                          item.status === "Available" || item.status === "Apply Now" || item.status === "Plan Now" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }`}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={() => setShowUpgradeModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">Upgrade to Premium</h3>
              <p className="text-sm text-gray-500 mb-6">Unlock advanced tools including Brand Protection, Sales Tracker, and more premium features.</p>
              <button onClick={() => setShowUpgradeModal(false)} className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm mb-3">Start Free Trial</button>
              <button onClick={() => setShowUpgradeModal(false)} className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm">Maybe Later</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Payments & Escrow Page ─── */
const PaymentsPage = ({ plans }: { plans: SavedPlan[] }) => {
  const [activeTab, setActiveTab] = useState<"transactions" | "escrow" | "invoices">("transactions");
  const [showNewPayment, setShowNewPayment] = useState(false);
  const [paymentAgency, setPaymentAgency] = useState("Creative Minds Studio");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paymentDesc, setPaymentDesc] = useState("");

  const [customTransactions, setCustomTransactions] = useState<{ id: string; description: string; amount: number; date: string; status: string; method: string }[]>(() => {
    const saved = localStorage.getItem("mibbs_transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [invoices, setInvoices] = useState<{ id: string; agency: string; amount: number; date: string; status: string; dueDate: string }[]>(() => {
    const saved = localStorage.getItem("mibbs_invoices");
    return saved ? JSON.parse(saved) : [];
  });

  const planTransactions = plans.map((p, i) => ({
    id: `TXN-${1000 + i}`,
    description: `${p.type === "new" ? "New" : "Existing"} Business Plan - ${p.data.industry || "General"}`,
    amount: p.type === "existing"
      ? Math.round((parseInt((p.data.monthlyRevenue || "50000").replace(/[^0-9]/g, ""), 10) || 50000) * 0.15)
      : Math.round(15000 + (i * 3000)),
    date: new Date(p.savedAt).toLocaleDateString("en-IN"),
    status: i === plans.length - 1 ? "pending" : "completed",
    method: ["UPI", "Bank Transfer", "Credit Card"][i % 3],
  }));

  const allTransactions = [...planTransactions, ...customTransactions];

  const escrowItems = [
    { id: "ESC-001", agency: "Creative Minds Studio", amount: 50000, status: "held", releaseDate: "Apr 15, 2026" },
    { id: "ESC-002", agency: "Digital Impact Agency", amount: 80000, status: "released", releaseDate: "Mar 10, 2026" },
  ];

  const handleNewPayment = () => {
    const amt = parseInt(paymentAmount.replace(/[^0-9]/g, ""), 10);
    if (!amt || amt <= 0) return;
    const txn = {
      id: `TXN-${2000 + customTransactions.length}`,
      description: paymentDesc || `Payment to ${paymentAgency}`,
      amount: amt,
      date: new Date().toLocaleDateString("en-IN"),
      status: "pending",
      method: paymentMethod,
    };
    const inv = {
      id: `INV-${1000 + invoices.length}`,
      agency: paymentAgency,
      amount: amt,
      date: new Date().toLocaleDateString("en-IN"),
      status: "unpaid",
      dueDate: new Date(Date.now() + 30 * 86400000).toLocaleDateString("en-IN"),
    };
    const updatedTxns = [...customTransactions, txn];
    const updatedInvs = [...invoices, inv];
    setCustomTransactions(updatedTxns);
    setInvoices(updatedInvs);
    localStorage.setItem("mibbs_transactions", JSON.stringify(updatedTxns));
    localStorage.setItem("mibbs_invoices", JSON.stringify(updatedInvs));
    setPaymentAmount("");
    setPaymentDesc("");
    setShowNewPayment(false);
  };

  const markInvoicePaid = (id: string) => {
    const updated = invoices.map(inv => inv.id === id ? { ...inv, status: "paid" } : inv);
    setInvoices(updated);
    localStorage.setItem("mibbs_invoices", JSON.stringify(updated));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Payments & Escrow</h2>
          <p className="text-sm text-gray-500">Secure payments with agencies</p>
        </div>
        <button onClick={() => setShowNewPayment(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm">
          <Plus className="w-4 h-4" /> New Payment
        </button>
      </div>

      {/* New Payment Modal */}
      <AnimatePresence>
        {showNewPayment && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={() => setShowNewPayment(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#1E293B]">New Payment</h3>
                <button onClick={() => setShowNewPayment(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Agency</label>
                  <select value={paymentAgency} onChange={e => setPaymentAgency(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5]">
                    {["Creative Minds Studio", "Digital Impact Agency", "Brand Builders Co.", "Growth Hackers Inc.", "Pixel Perfect Studios"].map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Amount (₹)</label>
                  <input type="text" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} placeholder="e.g. 50000" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5]" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Payment Method</label>
                  <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5]">
                    {["UPI", "Bank Transfer", "Credit Card", "Debit Card"].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Description</label>
                  <input type="text" value={paymentDesc} onChange={e => setPaymentDesc(e.target.value)} placeholder="e.g. Monthly retainer" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5]" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleNewPayment} className="flex-1 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm hover:bg-[#4338CA]">Make Payment</button>
                <button onClick={() => setShowNewPayment(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
        {(["transactions", "escrow", "invoices"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
              activeTab === tab ? "bg-white text-[#4F46E5] shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab}{tab === "invoices" && invoices.length > 0 ? ` (${invoices.length})` : ""}
          </button>
        ))}
      </div>

      {activeTab === "transactions" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Transaction ID</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Method</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400 text-sm">No transactions yet. Click "New Payment" to add one.</td></tr>
              ) : (
                allTransactions.map((t) => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm font-mono text-[#4F46E5]">{t.id}</td>
                    <td className="px-5 py-4 text-sm text-[#1E293B]">{t.description}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-[#1E293B]">{formatINRFull(t.amount)}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{t.date}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{t.method}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        t.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {t.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "escrow" && (
        <div className="space-y-4">
          {escrowItems.map((e) => (
            <div key={e.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm text-[#4F46E5]">{e.id}</p>
                  <h4 className="font-bold text-[#1E293B] mt-1">{e.agency}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">Release date: {e.releaseDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#1E293B]">{formatINRFull(e.amount)}</p>
                  <span className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    e.status === "held" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                  }`}>
                    {e.status === "held" ? "In Escrow" : "Released"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "invoices" && (
        <div>
          {invoices.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1E293B] mb-2">No Invoices Yet</h3>
              <p className="text-gray-500 mb-4">Invoices will appear here once payments are processed.</p>
              <button onClick={() => setShowNewPayment(true)} className="px-6 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm">Create First Payment</button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Invoice ID</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Agency</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm font-mono text-[#4F46E5]">{inv.id}</td>
                      <td className="px-5 py-4 text-sm text-[#1E293B]">{inv.agency}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-[#1E293B]">{formatINRFull(inv.amount)}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{inv.date}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{inv.dueDate}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {inv.status === "paid" ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {inv.status !== "paid" && (
                          <button onClick={() => markInvoicePaid(inv.id)} className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700">Mark Paid</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ─── Settings Page ─── */
const SettingsPage = ({ userName, businessName, industry, locality, state }: { userName: string; businessName: string; industry: string; locality: string; state: string }) => {
  const [activeSection, setActiveSection] = useState("profile");
  const [editName, setEditName] = useState(userName);
  const [editBusiness, setEditBusiness] = useState(businessName);
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: "profile", label: "Profile", icon: <UserCircle className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <BellRing className="w-4 h-4" /> },
    { id: "preferences", label: "Preferences", icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1E293B] mb-1">Settings</h2>
      <p className="text-sm text-gray-500 mb-6">Manage your account settings</p>

      <div className="flex gap-6">
        <div className="w-48 space-y-1">
          {sections.map((s) => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === s.id ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-gray-600 hover:bg-gray-50"
              }`}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>

              {activeSection === "profile" && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-[#1E293B] mb-6">Profile Information</h3>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-2xl font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#1E293B]">{userName}</p>
                      <p className="text-sm text-gray-500">{industry} • {locality}{state ? `, ${state}` : ""}</p>
                      <button className="text-xs text-[#4F46E5] font-medium mt-1 hover:underline">Change avatar</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Full Name</label>
                      <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Business Name</label>
                      <input type="text" value={editBusiness} onChange={(e) => setEditBusiness(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Email Address</label>
                      <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Phone Number</label>
                      <input type="tel" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10" />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Industry</label>
                      <input type="text" value={industry} readOnly className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#1E293B] block mb-1.5">Location</label>
                      <input type="text" value={`${locality}${state ? `, ${state}` : ""}`} readOnly className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <button onClick={handleSave} className="px-6 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm hover:bg-[#4338CA]">
                      {saved ? "✓ Saved!" : "Save Changes"}
                    </button>
                    <button className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50">Cancel</button>
                  </div>
                </div>
              )}

              {activeSection === "security" && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-[#1E293B] mb-6">Security Settings</h3>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-[#1E293B]">Password</h4>
                          <p className="text-sm text-gray-500 mt-0.5">Last changed 30 days ago</p>
                        </div>
                        <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">Change Password</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-[#1E293B]">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500 mt-0.5">Add an extra layer of security</p>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4338CA]">Enable 2FA</button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-[#1E293B]">Active Sessions</h4>
                          <p className="text-sm text-gray-500 mt-0.5">1 active session on this device</p>
                        </div>
                        <button className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50">Sign Out All</button>
                      </div>
                    </div>
                    <div className="border border-red-200 rounded-xl p-5 bg-red-50/50">
                      <h4 className="font-semibold text-red-600">Danger Zone</h4>
                      <p className="text-sm text-gray-500 mt-0.5">Once deleted, your account cannot be recovered.</p>
                      <button className="mt-3 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700">Delete Account</button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-[#1E293B] mb-6">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Email Notifications", desc: "Receive updates and reports via email", value: notifEmail, setter: setNotifEmail },
                      { label: "Push Notifications", desc: "Browser push notifications for important alerts", value: notifPush, setter: setNotifPush },
                      { label: "SMS Notifications", desc: "Get text messages for payment confirmations", value: notifSMS, setter: setNotifSMS },
                    ].map((n) => (
                      <div key={n.label} className="flex items-center justify-between border border-gray-200 rounded-xl p-5">
                        <div>
                          <h4 className="font-semibold text-[#1E293B]">{n.label}</h4>
                          <p className="text-sm text-gray-500 mt-0.5">{n.desc}</p>
                        </div>
                        <button onClick={() => n.setter(!n.value)}
                          className={`w-12 h-6 rounded-full transition-all relative ${n.value ? "bg-[#4F46E5]" : "bg-gray-300"}`}>
                          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${n.value ? "left-6" : "left-0.5"}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleSave} className="mt-6 px-6 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm hover:bg-[#4338CA]">
                    {saved ? "✓ Saved!" : "Save Preferences"}
                  </button>
                </div>
              )}

              {activeSection === "preferences" && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-[#1E293B] mb-6">App Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border border-gray-200 rounded-xl p-5">
                      <div>
                        <h4 className="font-semibold text-[#1E293B]">Dark Mode</h4>
                        <p className="text-sm text-gray-500 mt-0.5">Switch to dark theme</p>
                      </div>
                      <button onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? "bg-[#4F46E5]" : "bg-gray-300"}`}>
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${darkMode ? "left-6" : "left-0.5"}`} />
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h4 className="font-semibold text-[#1E293B]">Language</h4>
                      <p className="text-sm text-gray-500 mt-0.5 mb-3">Choose your preferred language</p>
                      <div className="flex gap-2">
                        {["English", "हिंदी", "தமிழ்", "తెలుగు"].map((lang) => (
                          <button key={lang} onClick={() => setLanguage(lang)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              language === lang ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}>
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5">
                      <h4 className="font-semibold text-[#1E293B]">Currency</h4>
                      <p className="text-sm text-gray-500 mt-0.5">Indian Rupee (₹ INR) — Default</p>
                    </div>
                  </div>
                  <button onClick={handleSave} className="mt-6 px-6 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold text-sm hover:bg-[#4338CA]">
                    {saved ? "✓ Saved!" : "Save Preferences"}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
