export interface IndustryParams {
  industry: string;
  marketingSpendPercent: string;
  typicalChannels: string;
  parameters: string[];
}

export const industryData: Record<string, IndustryParams> = {
  "Food & Beverages": {
    industry: "Food & Beverages",
    marketingSpendPercent: "5–6%",
    typicalChannels: "TV, digital, print",
    parameters: ["Mass campaigns", "Brand awareness", "Retail tie-ups"],
  },
  "Retail & E-commerce": {
    industry: "Retail & E-commerce",
    marketingSpendPercent: "6–10%",
    typicalChannels: "Performance digital, influencer",
    parameters: ["Customer acquisition", "Social commerce", "ROI-driven", "Platform partnerships"],
  },
  "Health & Wellness": {
    industry: "Health & Wellness",
    marketingSpendPercent: "4.5–5.5%",
    typicalChannels: "Print, outreach, digital, events",
    parameters: ["Doctor-focused", "Scientific branding", "Rural outreach", "Compliance"],
  },
  "Education & Training": {
    industry: "Education & Training",
    marketingSpendPercent: "5–7%",
    typicalChannels: "Digital, events, content marketing",
    parameters: ["Lead generation", "Content/SEO", "Webinars", "Community building"],
  },
  "Beauty & Personal Care": {
    industry: "Beauty & Personal Care",
    marketingSpendPercent: "6–8%",
    typicalChannels: "Digital, influencer, print, OOH",
    parameters: ["New launches", "Influencer marketing", "Visual branding", "Event activations"],
  },
  "Real Estate": {
    industry: "Real Estate",
    marketingSpendPercent: "4.5–5.5%",
    typicalChannels: "Print, OOH, events, digital",
    parameters: ["Local presence", "Lead generation", "Experiential", "Regional focus"],
  },
  "Technology & IT": {
    industry: "Technology & IT",
    marketingSpendPercent: "1.5–2.5%",
    typicalChannels: "Digital, events, B2B platforms",
    parameters: ["Lead generation", "Content/SEO", "CRM", "Channel enablement"],
  },
  "Fashion & Apparel": {
    industry: "Fashion & Apparel",
    marketingSpendPercent: "6–8%",
    typicalChannels: "Digital, influencer, print, OOH",
    parameters: ["New launches", "Influencer marketing", "Visual branding", "Event activations"],
  },
  "Automotive": {
    industry: "Automotive",
    marketingSpendPercent: "4.5–6.5%",
    typicalChannels: "TV, events, digital, OOH",
    parameters: ["Launch events", "Sponsorship", "Digital growth", "Dealer network marketing"],
  },
  "Home Services": {
    industry: "Home Services",
    marketingSpendPercent: "5–7%",
    typicalChannels: "Digital, local SEO, referrals",
    parameters: ["Local presence", "Customer reviews", "Referral programs", "Service quality"],
  },
  "Travel & Tourism": {
    industry: "Travel & Tourism",
    marketingSpendPercent: "5–8%",
    typicalChannels: "Digital, social media, partnerships",
    parameters: ["Destination marketing", "Social engagement", "Influencer trips", "Seasonal campaigns"],
  },
  "Finance & Insurance": {
    industry: "Finance & Insurance",
    marketingSpendPercent: "4–6%",
    typicalChannels: "Digital, TV, print, events",
    parameters: ["Trust building", "Lead generation", "Compliance", "Customer education"],
  },
  "Entertainment & Media": {
    industry: "Entertainment & Media",
    marketingSpendPercent: "5–6%",
    typicalChannels: "TV, digital, influencer",
    parameters: ["Streaming", "Celebrity talent", "OTT focus", "Social engagement"],
  },
  "Agriculture": {
    industry: "Agriculture",
    marketingSpendPercent: "3–5%",
    typicalChannels: "Print, rural outreach, digital",
    parameters: ["Rural penetration", "Farmer education", "Distribution", "Government schemes"],
  },
  "Manufacturing": {
    industry: "Manufacturing",
    marketingSpendPercent: "2–4%",
    typicalChannels: "B2B digital, trade shows, print",
    parameters: ["B2B marketing", "Trade exhibitions", "Supply chain", "Quality certification"],
  },
  "Other": {
    industry: "Other",
    marketingSpendPercent: "4–6%",
    typicalChannels: "Digital, print, events",
    parameters: ["Brand awareness", "Lead generation", "Digital presence", "Customer engagement"],
  },
};

export function getIndustrySpendRange(industry: string): { min: number; max: number } {
  const data = industryData[industry];
  if (!data) return { min: 4, max: 6 };
  const match = data.marketingSpendPercent.match(/([\d.]+)[–-]([\d.]+)/);
  if (match) return { min: parseFloat(match[1]), max: parseFloat(match[2]) };
  return { min: 4, max: 6 };
}

export function calculateBudgets(monthlyRevenue: number, industry: string) {
  const { min, max } = getIndustrySpendRange(industry);
  const avgPercent = (min + max) / 2 / 100;
  const monthlyBrandBudget = monthlyRevenue * avgPercent;
  const annualBudget = monthlyBrandBudget * 12;

  // Channel allocation breakdown
  const params = industryData[industry]?.parameters || [];
  const channels = industryData[industry]?.typicalChannels || "Digital, print";

  return {
    monthlyRevenue,
    monthlyBrandBudget: Math.round(monthlyBrandBudget),
    annualBudget: Math.round(annualBudget),
    spendPercent: `${min}–${max}%`,
    avgPercent: ((min + max) / 2).toFixed(1),
    channels,
    parameters: params,
    // Random breakdown for chart
    channelBreakdown: generateChannelBreakdown(monthlyBrandBudget, channels),
  };
}

function generateChannelBreakdown(budget: number, channelsStr: string) {
  const channels = channelsStr.split(",").map((c) => c.trim());
  const total = channels.length;
  const weights = channels.map(() => Math.random() * 30 + 10);
  const weightSum = weights.reduce((a, b) => a + b, 0);
  return channels.map((name, i) => ({
    name,
    value: Math.round((weights[i] / weightSum) * budget),
    percent: Math.round((weights[i] / weightSum) * 100),
  }));
}

// Revenue string to number
export function parseRevenue(rangeStr: string): number {
  const map: Record<string, number> = {
    "Below ₹5 Lakhs": 300000,
    "₹5 - ₹25 Lakhs": 1200000,
    "₹25 - ₹50 Lakhs": 3000000,
    "₹50 Lakhs - ₹1 Crore": 6000000,
    "₹1 - ₹5 Crore": 24000000,
    "₹5 - ₹10 Crore": 60000000,
    "Above ₹10 Crore": 120000000,
  };
  return map[rangeStr] || 1200000;
}
