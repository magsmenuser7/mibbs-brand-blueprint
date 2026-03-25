export interface Agency {
  name: string;
  initial: string;
  city: string;
  state: string;
  rating: number;
  reviews: number;
  tags: string[];
  price: string;
  budget: string;
  color: string;
  phone: string;
  email: string;
}

export const AGENCY_CATEGORIES = [
  "Design", "Digital Marketing", "Brand Strategy", "Performance Marketing",
  "SEO", "Analytics", "Branding", "Content", "Social Media",
  "Growth Marketing", "UI/UX", "Video Production", "PR & Communications",
  "Influencer Marketing", "Email Marketing", "E-Commerce", "Web Development",
  "Mobile App Marketing", "OOH Advertising", "Event Management"
];

const COLORS = [
  "bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700", "bg-green-100 text-green-700",
  "bg-orange-100 text-orange-700", "bg-pink-100 text-pink-700", "bg-red-100 text-red-700",
  "bg-teal-100 text-teal-700", "bg-indigo-100 text-indigo-700", "bg-amber-100 text-amber-700",
  "bg-cyan-100 text-cyan-700",
];

export const agencies: Agency[] = [
  // Mumbai
  { name: "Creative Minds Studio", initial: "C", city: "Mumbai", state: "Maharashtra", rating: 4.8, reviews: 127, tags: ["Design", "Digital Marketing", "Brand Strategy"], price: "₹50,000/month", budget: "₹2-5 lakhs", color: COLORS[0], phone: "+91 98765 43210", email: "hello@creativeminds.in" },
  { name: "Digital Impact Agency", initial: "D", city: "Mumbai", state: "Maharashtra", rating: 4.6, reviews: 89, tags: ["Performance Marketing", "SEO", "Analytics"], price: "₹80,000/month", budget: "₹5-10 lakhs", color: COLORS[1], phone: "+91 91234 56789", email: "info@digitalimpact.in" },
  { name: "BrandWave Media", initial: "B", city: "Mumbai", state: "Maharashtra", rating: 4.7, reviews: 156, tags: ["Branding", "Content", "Social Media"], price: "₹1,00,000/month", budget: "₹8-15 lakhs", color: COLORS[2], phone: "+91 98123 45678", email: "contact@brandwave.in" },
  { name: "Starter Digital", initial: "S", city: "Mumbai", state: "Maharashtra", rating: 4.4, reviews: 72, tags: ["Digital Marketing", "Email Marketing", "SEO"], price: "₹35,000/month", budget: "₹1-3 lakhs", color: COLORS[3], phone: "+91 87654 12345", email: "hello@starterdigital.in" },
  { name: "Reel Stories Productions", initial: "R", city: "Mumbai", state: "Maharashtra", rating: 4.9, reviews: 210, tags: ["Video Production", "Content", "Social Media"], price: "₹1,50,000/month", budget: "₹10-25 lakhs", color: COLORS[4], phone: "+91 99001 23456", email: "films@reelstories.in" },
  { name: "Pixel Perfect Studios", initial: "P", city: "Mumbai", state: "Maharashtra", rating: 4.3, reviews: 45, tags: ["Design", "UI/UX", "Brand Strategy"], price: "₹40,000/month", budget: "₹1-3 lakhs", color: COLORS[5], phone: "+91 88765 43210", email: "design@pixelperfect.in" },
  { name: "OOH Masters India", initial: "O", city: "Mumbai", state: "Maharashtra", rating: 4.5, reviews: 98, tags: ["OOH Advertising", "Event Management", "PR & Communications"], price: "₹2,00,000/month", budget: "₹15-30 lakhs", color: COLORS[6], phone: "+91 92345 67890", email: "info@oohmasters.in" },

  // Delhi NCR
  { name: "Brand Builders Co.", initial: "B", city: "New Delhi", state: "Delhi", rating: 4.5, reviews: 64, tags: ["Branding", "Content", "Social Media"], price: "₹1,20,000/month", budget: "₹10-20 lakhs", color: COLORS[2], phone: "+91 87654 32109", email: "contact@brandbuilders.in" },
  { name: "Mindshare Digital", initial: "M", city: "Gurugram", state: "Haryana", rating: 4.7, reviews: 178, tags: ["Performance Marketing", "Analytics", "Growth Marketing"], price: "₹1,80,000/month", budget: "₹15-30 lakhs", color: COLORS[7], phone: "+91 96543 21098", email: "digital@mindsharedigital.in" },
  { name: "Influence Factory", initial: "I", city: "New Delhi", state: "Delhi", rating: 4.6, reviews: 134, tags: ["Influencer Marketing", "Social Media", "Content"], price: "₹90,000/month", budget: "₹5-12 lakhs", color: COLORS[8], phone: "+91 99887 76655", email: "connect@influencefactory.in" },
  { name: "SEO Wizards India", initial: "S", city: "Noida", state: "Uttar Pradesh", rating: 4.4, reviews: 92, tags: ["SEO", "Digital Marketing", "Analytics"], price: "₹45,000/month", budget: "₹2-5 lakhs", color: COLORS[9], phone: "+91 88776 65544", email: "info@seowizards.in" },
  { name: "Capital Creatives", initial: "C", city: "New Delhi", state: "Delhi", rating: 4.8, reviews: 201, tags: ["Design", "Brand Strategy", "UI/UX"], price: "₹1,40,000/month", budget: "₹10-20 lakhs", color: COLORS[0], phone: "+91 97766 55443", email: "hello@capitalcreatives.in" },
  { name: "NCR PR Partners", initial: "N", city: "Gurugram", state: "Haryana", rating: 4.3, reviews: 67, tags: ["PR & Communications", "Event Management", "Content"], price: "₹75,000/month", budget: "₹5-10 lakhs", color: COLORS[1], phone: "+91 95544 33221", email: "pr@ncrpartners.in" },
  { name: "WebCraft Solutions", initial: "W", city: "Noida", state: "Uttar Pradesh", rating: 4.5, reviews: 113, tags: ["Web Development", "E-Commerce", "UI/UX"], price: "₹60,000/month", budget: "₹3-8 lakhs", color: COLORS[3], phone: "+91 98877 66554", email: "dev@webcraft.in" },

  // Bangalore
  { name: "Growth Hackers Inc.", initial: "G", city: "Bangalore", state: "Karnataka", rating: 4.9, reviews: 203, tags: ["Growth Marketing", "Performance Marketing", "Analytics"], price: "₹1,50,000/month", budget: "₹10-25 lakhs", color: COLORS[3], phone: "+91 99876 54321", email: "grow@growthhackers.in" },
  { name: "TechBrand Labs", initial: "T", city: "Bangalore", state: "Karnataka", rating: 4.7, reviews: 165, tags: ["Digital Marketing", "Web Development", "Mobile App Marketing"], price: "₹1,20,000/month", budget: "₹8-18 lakhs", color: COLORS[7], phone: "+91 98765 00123", email: "labs@techbrand.in" },
  { name: "SocialBee Agency", initial: "S", city: "Bangalore", state: "Karnataka", rating: 4.5, reviews: 88, tags: ["Social Media", "Content", "Influencer Marketing"], price: "₹55,000/month", budget: "₹3-7 lakhs", color: COLORS[9], phone: "+91 96543 78901", email: "buzz@socialbee.in" },
  { name: "Namma Ads", initial: "N", city: "Bangalore", state: "Karnataka", rating: 4.6, reviews: 142, tags: ["OOH Advertising", "Brand Strategy", "Event Management"], price: "₹1,00,000/month", budget: "₹8-15 lakhs", color: COLORS[4], phone: "+91 97890 12345", email: "ads@nammaads.in" },
  { name: "Pixel Forge Studio", initial: "P", city: "Bangalore", state: "Karnataka", rating: 4.8, reviews: 176, tags: ["Design", "UI/UX", "Video Production"], price: "₹85,000/month", budget: "₹5-12 lakhs", color: COLORS[5], phone: "+91 91234 00567", email: "studio@pixelforge.in" },

  // Hyderabad
  { name: "Deccan Digital Hub", initial: "D", city: "Hyderabad", state: "Telangana", rating: 4.6, reviews: 119, tags: ["Digital Marketing", "SEO", "E-Commerce"], price: "₹65,000/month", budget: "₹4-8 lakhs", color: COLORS[1], phone: "+91 94321 56789", email: "hub@deccandigital.in" },
  { name: "HydBrand Studio", initial: "H", city: "Hyderabad", state: "Telangana", rating: 4.4, reviews: 76, tags: ["Branding", "Design", "Content"], price: "₹50,000/month", budget: "₹2-5 lakhs", color: COLORS[6], phone: "+91 93210 98765", email: "hello@hydbrand.in" },
  { name: "Pearl City Marketers", initial: "P", city: "Hyderabad", state: "Telangana", rating: 4.7, reviews: 145, tags: ["Performance Marketing", "Growth Marketing", "Analytics"], price: "₹1,10,000/month", budget: "₹8-16 lakhs", color: COLORS[0], phone: "+91 99887 11223", email: "grow@pearlcity.in" },
  { name: "TechMedia Hyd", initial: "T", city: "Hyderabad", state: "Telangana", rating: 4.5, reviews: 93, tags: ["Web Development", "Mobile App Marketing", "Digital Marketing"], price: "₹70,000/month", budget: "₹5-10 lakhs", color: COLORS[8], phone: "+91 98001 22334", email: "tech@techmediahyd.in" },

  // Chennai
  { name: "Marina Digital", initial: "M", city: "Chennai", state: "Tamil Nadu", rating: 4.5, reviews: 108, tags: ["Digital Marketing", "Content", "Email Marketing"], price: "₹55,000/month", budget: "₹3-7 lakhs", color: COLORS[2], phone: "+91 94567 89012", email: "digital@marinadigital.in" },
  { name: "South Star Creatives", initial: "S", city: "Chennai", state: "Tamil Nadu", rating: 4.7, reviews: 132, tags: ["Design", "Video Production", "Brand Strategy"], price: "₹90,000/month", budget: "₹6-12 lakhs", color: COLORS[4], phone: "+91 93456 78901", email: "create@southstar.in" },
  { name: "Social Pulse Chennai", initial: "S", city: "Chennai", state: "Tamil Nadu", rating: 4.3, reviews: 58, tags: ["Social Media", "Influencer Marketing", "Content"], price: "₹40,000/month", budget: "₹2-4 lakhs", color: COLORS[9], phone: "+91 92345 11223", email: "pulse@socialpulse.in" },
  { name: "Madrasi Marketers", initial: "M", city: "Chennai", state: "Tamil Nadu", rating: 4.6, reviews: 101, tags: ["Performance Marketing", "SEO", "E-Commerce"], price: "₹75,000/month", budget: "₹5-10 lakhs", color: COLORS[7], phone: "+91 96789 01234", email: "mktg@madrasimarketers.in" },

  // Pune
  { name: "Pune Digital Works", initial: "P", city: "Pune", state: "Maharashtra", rating: 4.5, reviews: 87, tags: ["Digital Marketing", "Web Development", "SEO"], price: "₹45,000/month", budget: "₹2-5 lakhs", color: COLORS[1], phone: "+91 95678 12340", email: "work@punedigital.in" },
  { name: "Quantum Branding Pune", initial: "Q", city: "Pune", state: "Maharashtra", rating: 4.8, reviews: 154, tags: ["Branding", "Brand Strategy", "Design"], price: "₹1,10,000/month", budget: "₹8-15 lakhs", color: COLORS[5], phone: "+91 94567 23451", email: "brand@quantumpune.in" },
  { name: "AdReach Pune", initial: "A", city: "Pune", state: "Maharashtra", rating: 4.4, reviews: 66, tags: ["Performance Marketing", "Analytics", "Email Marketing"], price: "₹55,000/month", budget: "₹3-6 lakhs", color: COLORS[8], phone: "+91 97654 34562", email: "ads@adreachpune.in" },

  // Kolkata
  { name: "Eastern Media Lab", initial: "E", city: "Kolkata", state: "West Bengal", rating: 4.5, reviews: 95, tags: ["Digital Marketing", "Content", "PR & Communications"], price: "₹50,000/month", budget: "₹3-6 lakhs", color: COLORS[6], phone: "+91 93456 45673", email: "media@easternlab.in" },
  { name: "Calcutta Creatives", initial: "C", city: "Kolkata", state: "West Bengal", rating: 4.6, reviews: 112, tags: ["Design", "Branding", "Video Production"], price: "₹70,000/month", budget: "₹5-10 lakhs", color: COLORS[0], phone: "+91 92345 56784", email: "art@calcuttacreatives.in" },
  { name: "East Growth Partners", initial: "E", city: "Kolkata", state: "West Bengal", rating: 4.3, reviews: 54, tags: ["Growth Marketing", "Social Media", "SEO"], price: "₹40,000/month", budget: "₹2-4 lakhs", color: COLORS[3], phone: "+91 98765 67895", email: "grow@eastgrowth.in" },

  // Ahmedabad
  { name: "Gujarat Digital Pro", initial: "G", city: "Ahmedabad", state: "Gujarat", rating: 4.6, reviews: 103, tags: ["Digital Marketing", "E-Commerce", "Web Development"], price: "₹60,000/month", budget: "₹4-8 lakhs", color: COLORS[2], phone: "+91 97654 78906", email: "pro@gujaratdigital.in" },
  { name: "Ahmedabad Ad Agency", initial: "A", city: "Ahmedabad", state: "Gujarat", rating: 4.4, reviews: 79, tags: ["OOH Advertising", "Brand Strategy", "Event Management"], price: "₹85,000/month", budget: "₹5-12 lakhs", color: COLORS[7], phone: "+91 96543 89017", email: "ads@ahdadagency.in" },
  { name: "Sabarmati Social", initial: "S", city: "Ahmedabad", state: "Gujarat", rating: 4.5, reviews: 91, tags: ["Social Media", "Influencer Marketing", "Content"], price: "₹45,000/month", budget: "₹2-5 lakhs", color: COLORS[4], phone: "+91 91234 90128", email: "social@sabarmati.in" },

  // Jaipur
  { name: "Pink City Digital", initial: "P", city: "Jaipur", state: "Rajasthan", rating: 4.5, reviews: 84, tags: ["Digital Marketing", "SEO", "Content"], price: "₹40,000/month", budget: "₹2-5 lakhs", color: COLORS[5], phone: "+91 98765 01239", email: "digital@pinkcity.in" },
  { name: "Royal Creatives Jaipur", initial: "R", city: "Jaipur", state: "Rajasthan", rating: 4.7, reviews: 126, tags: ["Design", "Branding", "UI/UX"], price: "₹75,000/month", budget: "₹5-10 lakhs", color: COLORS[9], phone: "+91 97654 12340", email: "create@royalcreatives.in" },
  { name: "Desert Eagle Marketing", initial: "D", city: "Jaipur", state: "Rajasthan", rating: 4.3, reviews: 47, tags: ["Performance Marketing", "Email Marketing", "Analytics"], price: "₹35,000/month", budget: "₹1-3 lakhs", color: COLORS[1], phone: "+91 94321 23451", email: "mktg@deserteagle.in" },

  // Lucknow
  { name: "Awadh Digital Studio", initial: "A", city: "Lucknow", state: "Uttar Pradesh", rating: 4.4, reviews: 62, tags: ["Digital Marketing", "Social Media", "Content"], price: "₹35,000/month", budget: "₹1-3 lakhs", color: COLORS[8], phone: "+91 93210 34562", email: "studio@awadhdigital.in" },
  { name: "Lucknow Brand Lab", initial: "L", city: "Lucknow", state: "Uttar Pradesh", rating: 4.5, reviews: 73, tags: ["Branding", "Design", "Video Production"], price: "₹50,000/month", budget: "₹3-6 lakhs", color: COLORS[6], phone: "+91 98876 45673", email: "lab@lucknowbrand.in" },

  // Chandigarh
  { name: "Chandigarh Creative Co.", initial: "C", city: "Chandigarh", state: "Chandigarh", rating: 4.6, reviews: 88, tags: ["Design", "Brand Strategy", "UI/UX"], price: "₹55,000/month", budget: "₹3-7 lakhs", color: COLORS[0], phone: "+91 97654 56784", email: "hello@chcreative.in" },
  { name: "North Digital Pros", initial: "N", city: "Chandigarh", state: "Chandigarh", rating: 4.4, reviews: 56, tags: ["Digital Marketing", "Performance Marketing", "SEO"], price: "₹45,000/month", budget: "₹2-5 lakhs", color: COLORS[3], phone: "+91 96543 67895", email: "info@northdigital.in" },

  // Indore
  { name: "Central India Ads", initial: "C", city: "Indore", state: "Madhya Pradesh", rating: 4.5, reviews: 71, tags: ["OOH Advertising", "Digital Marketing", "Event Management"], price: "₹40,000/month", budget: "₹2-5 lakhs", color: COLORS[2], phone: "+91 95432 78906", email: "ads@centralindia.in" },
  { name: "Indore Social Hub", initial: "I", city: "Indore", state: "Madhya Pradesh", rating: 4.3, reviews: 49, tags: ["Social Media", "Influencer Marketing", "Content"], price: "₹30,000/month", budget: "₹1-3 lakhs", color: COLORS[7], phone: "+91 94321 89017", email: "hub@indoresocial.in" },

  // Kochi
  { name: "Kerala Digital Wave", initial: "K", city: "Kochi", state: "Kerala", rating: 4.6, reviews: 97, tags: ["Digital Marketing", "Web Development", "E-Commerce"], price: "₹55,000/month", budget: "₹3-7 lakhs", color: COLORS[4], phone: "+91 98765 90128", email: "wave@keraladigital.in" },
  { name: "Cochin Creatives", initial: "C", city: "Kochi", state: "Kerala", rating: 4.7, reviews: 118, tags: ["Design", "Video Production", "Branding"], price: "₹70,000/month", budget: "₹5-10 lakhs", color: COLORS[9], phone: "+91 97654 01239", email: "art@cochinceatives.in" },

  // Bhopal
  { name: "Bhopal Brand Works", initial: "B", city: "Bhopal", state: "Madhya Pradesh", rating: 4.4, reviews: 53, tags: ["Branding", "Design", "Content"], price: "₹35,000/month", budget: "₹1-3 lakhs", color: COLORS[6], phone: "+91 96543 12340", email: "works@bhopalbrand.in" },

  // Coimbatore
  { name: "Kovai Digital Lab", initial: "K", city: "Coimbatore", state: "Tamil Nadu", rating: 4.5, reviews: 82, tags: ["Digital Marketing", "SEO", "Web Development"], price: "₹40,000/month", budget: "₹2-5 lakhs", color: COLORS[1], phone: "+91 95432 23451", email: "lab@kovaidigital.in" },
  { name: "Coimbatore Ads Pro", initial: "C", city: "Coimbatore", state: "Tamil Nadu", rating: 4.3, reviews: 41, tags: ["Performance Marketing", "Email Marketing", "Analytics"], price: "₹30,000/month", budget: "₹1-3 lakhs", color: COLORS[8], phone: "+91 94321 34562", email: "pro@cbeads.in" },

  // Surat
  { name: "Surat Digital Hub", initial: "S", city: "Surat", state: "Gujarat", rating: 4.5, reviews: 76, tags: ["Digital Marketing", "E-Commerce", "Social Media"], price: "₹45,000/month", budget: "₹2-5 lakhs", color: COLORS[5], phone: "+91 93210 45673", email: "hub@suratdigital.in" },

  // Nagpur
  { name: "Orange City Media", initial: "O", city: "Nagpur", state: "Maharashtra", rating: 4.4, reviews: 59, tags: ["Digital Marketing", "Content", "PR & Communications"], price: "₹40,000/month", budget: "₹2-4 lakhs", color: COLORS[3], phone: "+91 98876 56784", email: "media@orangecity.in" },

  // Visakhapatnam
  { name: "Vizag Digital Solutions", initial: "V", city: "Visakhapatnam", state: "Andhra Pradesh", rating: 4.5, reviews: 68, tags: ["Digital Marketing", "Web Development", "SEO"], price: "₹40,000/month", budget: "₹2-5 lakhs", color: COLORS[2], phone: "+91 97654 67895", email: "solutions@vizagdigital.in" },

  // Bhubaneswar
  { name: "Odisha Creative Agency", initial: "O", city: "Bhubaneswar", state: "Odisha", rating: 4.3, reviews: 44, tags: ["Design", "Branding", "Social Media"], price: "₹35,000/month", budget: "₹1-3 lakhs", color: COLORS[4], phone: "+91 96543 78906", email: "create@odishacreative.in" },

  // Patna
  { name: "Bihar Digital Media", initial: "B", city: "Patna", state: "Bihar", rating: 4.2, reviews: 38, tags: ["Digital Marketing", "Social Media", "Content"], price: "₹25,000/month", budget: "₹1-2 lakhs", color: COLORS[7], phone: "+91 95432 89017", email: "media@bihardigital.in" },

  // Guwahati
  { name: "Northeast Digital Co.", initial: "N", city: "Guwahati", state: "Assam", rating: 4.4, reviews: 52, tags: ["Digital Marketing", "Content", "Social Media"], price: "₹30,000/month", budget: "₹1-3 lakhs", color: COLORS[0], phone: "+91 94321 90128", email: "digital@northeastco.in" },

  // Thiruvananthapuram
  { name: "Capital Digi Kerala", initial: "C", city: "Thiruvananthapuram", state: "Kerala", rating: 4.5, reviews: 74, tags: ["Web Development", "E-Commerce", "Digital Marketing"], price: "₹50,000/month", budget: "₹3-6 lakhs", color: COLORS[9], phone: "+91 93210 01239", email: "digi@capitalkerala.in" },

  // Vadodara
  { name: "Baroda Creative Hub", initial: "B", city: "Vadodara", state: "Gujarat", rating: 4.3, reviews: 47, tags: ["Design", "Video Production", "Branding"], price: "₹35,000/month", budget: "₹1-3 lakhs", color: COLORS[6], phone: "+91 98876 12340", email: "hub@barodacreative.in" },

  // Dehradun
  { name: "Uttarakhand Digital Pro", initial: "U", city: "Dehradun", state: "Uttarakhand", rating: 4.3, reviews: 39, tags: ["Digital Marketing", "SEO", "Social Media"], price: "₹30,000/month", budget: "₹1-3 lakhs", color: COLORS[1], phone: "+91 97654 23451", email: "pro@ukdigital.in" },

  // Mysuru
  { name: "Royal Mysore Digital", initial: "R", city: "Mysuru", state: "Karnataka", rating: 4.5, reviews: 63, tags: ["Digital Marketing", "Content", "Branding"], price: "₹40,000/month", budget: "₹2-5 lakhs", color: COLORS[8], phone: "+91 96543 34562", email: "digital@royalmysore.in" },

  // Ranchi
  { name: "Jharkhand Media Works", initial: "J", city: "Ranchi", state: "Jharkhand", rating: 4.2, reviews: 31, tags: ["Digital Marketing", "Social Media", "OOH Advertising"], price: "₹25,000/month", budget: "₹1-2 lakhs", color: COLORS[5], phone: "+91 95432 45673", email: "works@jharkhandmedia.in" },

  // Raipur
  { name: "CG Digital Agency", initial: "C", city: "Raipur", state: "Chhattisgarh", rating: 4.3, reviews: 42, tags: ["Digital Marketing", "Web Development", "Content"], price: "₹30,000/month", budget: "₹1-3 lakhs", color: COLORS[3], phone: "+91 94321 56784", email: "agency@cgdigital.in" },
];

export const ALL_CITIES = Array.from(new Set(agencies.map(a => a.city))).sort();
export const ALL_STATES = Array.from(new Set(agencies.map(a => a.state))).sort();
