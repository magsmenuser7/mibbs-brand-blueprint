
import { useState } from "react";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowRight, ArrowLeft, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Calculator = () => {
  const [step, setStep] = useState(1);
  const [revenue, setRevenue] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [businessStage, setBusinessStage] = useState<string>("");
  const [businessGoals, setBusinessGoals] = useState<string[]>([]);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [budgetResults, setBudgetResults] = useState<any>(null);
  
  const navigate = useNavigate();
  
  const goals = [
    "Brand Awareness",
    "Market Expansion",
    "Customer Acquisition",
    "Product Launch",
    "Brand Repositioning",
    "Customer Retention"
  ];
  
  const handleGoalToggle = (goal: string) => {
    if (businessGoals.includes(goal)) {
      setBusinessGoals(businessGoals.filter(g => g !== goal));
    } else {
      if (businessGoals.length < 3) {
        setBusinessGoals([...businessGoals, goal]);
      } else {
        toast({
          title: "Maximum 3 goals",
          description: "Please select a maximum of 3 primary business goals",
          variant: "destructive"
        });
      }
    }
  };
  
  const calculateBudget = () => {
    // Basic validation
    if (!revenue || !industry || !businessStage || businessGoals.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields to get your budget recommendation",
        variant: "destructive"
      });
      return;
    }
    
    // Convert revenue string to number (remove commas and other non-numeric characters)
    const revNumber = parseFloat(revenue.replace(/[^0-9.]/g, ''));
    
    // Simple budget calculation logic (this would be more sophisticated in production)
    let percentage = 0;
    
    // Industry factor
    switch(industry) {
      case "Technology/SaaS":
        percentage = 15;
        break;
      case "FMCG/D2C":
        percentage = 18;
        break;
      case "Services":
        percentage = 12;
        break;
      case "Manufacturing":
        percentage = 8;
        break;
      case "Retail":
        percentage = 10;
        break;
      default:
        percentage = 10;
    }
    
    // Business stage factor
    switch(businessStage) {
      case "Early-stage Startup (0-2 years)":
        percentage += 5;
        break;
      case "Growth Phase (2-5 years)":
        percentage += 2;
        break;
      case "Established Business (5+ years)":
        percentage -= 2;
        break;
      default:
        percentage += 0;
    }
    
    // Goals factor
    if (businessGoals.includes("Brand Awareness") || businessGoals.includes("Market Expansion")) {
      percentage += 2;
    }
    
    if (businessGoals.includes("Product Launch")) {
      percentage += 3;
    }
    
    // Cap percentage between 5-25%
    percentage = Math.min(Math.max(percentage, 5), 25);
    
    // Calculate recommended budget
    const recommendedBudget = revNumber * (percentage / 100);
    
    // Allocations based on industry and goals
    let allocations = [
      { category: "Brand Identity", allocation: 15 },
      { category: "Digital Marketing", allocation: 30 },
      { category: "Traditional Media", allocation: 20 },
      { category: "Content Creation", allocation: 15 },
      { category: "Events & Experiences", allocation: 10 },
      { category: "Research & Insights", allocation: 10 }
    ];
    
    // Adjust allocations based on industry
    if (industry === "Technology/SaaS") {
      allocations = adjustAllocation(allocations, "Digital Marketing", 10);
      allocations = adjustAllocation(allocations, "Traditional Media", -10);
    } else if (industry === "FMCG/D2C") {
      allocations = adjustAllocation(allocations, "Events & Experiences", 5);
      allocations = adjustAllocation(allocations, "Research & Insights", -5);
    }
    
    // Adjust allocations based on goals
    if (businessGoals.includes("Brand Awareness")) {
      allocations = adjustAllocation(allocations, "Traditional Media", 5);
      allocations = adjustAllocation(allocations, "Digital Marketing", -5);
    }
    
    if (businessGoals.includes("Customer Acquisition")) {
      allocations = adjustAllocation(allocations, "Digital Marketing", 10);
      allocations = adjustAllocation(allocations, "Brand Identity", -5);
      allocations = adjustAllocation(allocations, "Research & Insights", -5);
    }
    
    // Convert allocations to chart data
    const chartData = allocations.map(item => ({
      name: item.category,
      value: item.allocation,
      amount: (recommendedBudget * item.allocation / 100).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      })
    }));
    
    // Set results
    setBudgetResults({
      recommendedPercentage: percentage,
      recommendedBudget: recommendedBudget.toLocaleString("en-IN", {
        style: "currency", 
        currency: "INR",
        maximumFractionDigits: 0
      }),
      allocations: chartData
    });
    
    setCalculationComplete(true);
    setStep(4);
  };
  
  // Helper function to adjust allocation percentages
  const adjustAllocation = (allocations: any[], category: string, adjustment: number) => {
    const result = [...allocations];
    const categoryIndex = result.findIndex(a => a.category === category);
    
    if (categoryIndex !== -1) {
      result[categoryIndex].allocation += adjustment;
    }
    
    // Redistribute to ensure total is still 100%
    const total = result.reduce((sum, item) => sum + item.allocation, 0);
    const diff = 100 - total;
    
    if (diff !== 0) {
      // Find categories to adjust (excluding the one we just changed)
      const adjustableCategories = result.filter(a => a.category !== category);
      const adjustmentPerCategory = diff / adjustableCategories.length;
      
      result.forEach(item => {
        if (item.category !== category) {
          item.allocation += adjustmentPerCategory;
        }
      });
    }
    
    return result;
  };
  
  const handleNextStep = () => {
    if (step === 3) {
      calculateBudget();
    } else {
      setStep(step + 1);
    }
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Report generation started",
      description: "Your detailed budget report is being prepared for download"
    });
    
    // In a real implementation, this would generate and download a PDF
    setTimeout(() => {
      toast({
        title: "Report ready",
        description: "Your detailed budget report has been downloaded"
      });
    }, 2000);
  };

  // Format revenue input with commas
  const formatRevenue = (value: string) => {
    // Remove all non-digits
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Format with commas
    if (numericValue) {
      const formatted = new Intl.NumberFormat('en-IN').format(parseInt(numericValue));
      return formatted;
    }
    
    return '';
  };

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatRevenue(e.target.value);
    setRevenue(formattedValue);
  };
  
  const handleStartOver = () => {
    setStep(1);
    setRevenue("");
    setIndustry("");
    setBusinessStage("");
    setBusinessGoals([]);
    setCalculationComplete(false);
    setBudgetResults(null);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Brand Budget Calculator
          </h1>
          <p className="text-xl text-navy-light max-w-2xl mx-auto">
            Get an instant budget recommendation tailored to your business goals, industry, and revenue.
          </p>
        </div>
        
        {!calculationComplete ? (
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-accent text-white" : "bg-gray-200"}`}>
                    1
                  </div>
                  <div className={`h-1 w-8 ${step >= 2 ? "bg-accent" : "bg-gray-200"}`}></div>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-accent text-white" : "bg-gray-200"}`}>
                    2
                  </div>
                  <div className={`h-1 w-8 ${step >= 3 ? "bg-accent" : "bg-gray-200"}`}></div>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-accent text-white" : "bg-gray-200"}`}>
                    3
                  </div>
                </div>
                <CardDescription>
                  Step {step} of 3
                </CardDescription>
              </div>
              <CardTitle className="text-2xl mt-4">
                {step === 1 && "Business Information"}
                {step === 2 && "Industry & Business Stage"}
                {step === 3 && "Business Goals"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Let's start with your annual revenue"}
                {step === 2 && "Tell us about your industry and business stage"}
                {step === 3 && "Select up to 3 primary business goals"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-navy-light mb-2">
                      What is your annual revenue? (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <Input
                        type="text"
                        value={revenue}
                        onChange={handleRevenueChange}
                        className="pl-8 text-lg"
                        placeholder="Enter your annual revenue"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-navy-light mb-2">
                      Select your industry
                    </label>
                    <select 
                      value={industry} 
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    >
                      <option value="">Select your industry</option>
                      <option value="Technology/SaaS">Technology/SaaS</option>
                      <option value="FMCG/D2C">FMCG/D2C</option>
                      <option value="Services">Services</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-navy-light mb-2">
                      Select your business stage
                    </label>
                    <select 
                      value={businessStage} 
                      onChange={(e) => setBusinessStage(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    >
                      <option value="">Select your business stage</option>
                      <option value="Early-stage Startup (0-2 years)">Early-stage Startup (0-2 years)</option>
                      <option value="Growth Phase (2-5 years)">Growth Phase (2-5 years)</option>
                      <option value="Established Business (5+ years)">Established Business (5+ years)</option>
                    </select>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-navy-light">Select up to 3 primary business goals:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {goals.map((goal) => (
                      <Button
                        key={goal}
                        variant={businessGoals.includes(goal) ? "default" : "outline"}
                        className={`justify-start px-4 py-6 h-auto ${businessGoals.includes(goal) ? "bg-accent" : ""}`}
                        onClick={() => handleGoalToggle(goal)}
                      >
                        {goal}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={step === 1 ? () => navigate("/tools") : handlePrevStep}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              <Button onClick={handleNextStep} className="flex items-center">
                {step === 3 ? "Calculate Budget" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-12">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl">Your Brand Budget Recommendation</CardTitle>
                <CardDescription>
                  Based on your business profile and goals
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-8">
                  <div className="bg-accent/10 p-6 rounded-lg text-center">
                    <p className="text-lg text-navy mb-2">Recommended Brand Budget:</p>
                    <h3 className="text-3xl md:text-4xl font-bold text-accent mb-2">
                      {budgetResults?.recommendedBudget}
                    </h3>
                    <p className="text-sm text-navy-light">
                      ({budgetResults?.recommendedPercentage}% of annual revenue)
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-4">Recommended Budget Allocation</h4>
                    <div className="h-64 sm:h-80">
                      <ChartContainer 
                        config={{
                          "Brand Identity": { theme: { light: "#9b87f5", dark: "#9b87f5" } },
                          "Digital Marketing": { theme: { light: "#7E69AB", dark: "#7E69AB" } },
                          "Traditional Media": { theme: { light: "#6E59A5", dark: "#6E59A5" } },
                          "Content Creation": { theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
                          "Events & Experiences": { theme: { light: "#D946EF", dark: "#D946EF" } },
                          "Research & Insights": { theme: { light: "#F97316", dark: "#F97316" } }
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={budgetResults?.allocations}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                            <YAxis type="category" dataKey="name" width={120} />
                            <Tooltip 
                              formatter={(value: any) => [`${value}%`, "Allocation"]} 
                              labelFormatter={() => ""}
                            />
                            <Bar dataKey="value" fill="var(--color-Brand\ Identity)" name="value" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg mb-2">Budget Breakdown</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {budgetResults?.allocations.map((item: any) => (
                        <div key={item.name} className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium text-navy">{item.name}</p>
                          <p className="text-accent font-bold">{item.amount}</p>
                          <p className="text-sm text-navy-light">{item.value}% of budget</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-wrap gap-4 justify-between">
                <Button variant="outline" onClick={handleStartOver}>
                  Recalculate
                </Button>
                <Button className="flex items-center" onClick={handleDownloadReport}>
                  <Download className="mr-2 h-4 w-4" /> Download Detailed Report
                </Button>
              </CardFooter>
            </Card>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Want expert guidance on implementing this budget?</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={() => navigate("/contact")} variant="outline">
                  Contact Our Team
                </Button>
                <Button onClick={() => navigate("/how-it-works")}>
                  Learn More About MIBBS™
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
