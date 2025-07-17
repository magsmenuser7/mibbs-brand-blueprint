
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Facebook, TrendingUp } from 'lucide-react';

const FacebookAdsCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyRevenue: '',
    industryType: 'retail',
    campaignObjective: 'sales',
    targetAudience: 'local'
  });
  const [result, setResult] = useState<any>(null);

  const calculateBudget = () => {
    const revenue = parseFloat(inputs.monthlyRevenue) || 0;
    let budgetPercentage = 0.05; // Default 5%
    
    // Adjust based on industry
    switch (inputs.industryType) {
      case 'ecommerce':
        budgetPercentage = 0.08;
        break;
      case 'saas':
        budgetPercentage = 0.12;
        break;
      case 'retail':
        budgetPercentage = 0.06;
        break;
      default:
        budgetPercentage = 0.05;
    }

    const totalBudget = revenue * budgetPercentage;
    const dailyBudget = totalBudget / 30;
    const weeklyBudget = totalBudget / 4;

    setResult({
      monthlyBudget: totalBudget,
      weeklyBudget,
      dailyBudget,
      percentage: budgetPercentage * 100
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ccadcc] to-[#5b2d89] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Facebook className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Facebook Ads Budget Calculator</h1>
          <p className="text-gray-600">Calculate the optimal Facebook advertising budget for your business</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Business Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="revenue">Monthly Revenue (₹)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="e.g., 500000"
                  value={inputs.monthlyRevenue}
                  onChange={(e) => setInputs({...inputs, monthlyRevenue: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="industry">Industry Type</Label>
                <select
                  id="industry"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={inputs.industryType}
                  onChange={(e) => setInputs({...inputs, industryType: e.target.value})}
                >
                  <option value="retail">Retail</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS/Technology</option>
                  <option value="services">Services</option>
                  <option value="food">Food & Beverage</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="objective">Campaign Objective</Label>
                <select
                  id="objective"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={inputs.campaignObjective}
                  onChange={(e) => setInputs({...inputs, campaignObjective: e.target.value})}
                >
                  <option value="sales">Sales/Conversions</option>
                  <option value="leads">Lead Generation</option>
                  <option value="traffic">Website Traffic</option>
                  <option value="awareness">Brand Awareness</option>
                </select>
              </div>
              
              <Button onClick={calculateBudget} className="w-full bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]">
                Calculate Budget
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recommended Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Budget Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monthly Budget:</span>
                      <span className="font-bold">₹{result.monthlyBudget.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Budget:</span>
                      <span className="font-bold">₹{result.weeklyBudget.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Budget:</span>
                      <span className="font-bold">₹{result.dailyBudget.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Recommendation</h4>
                  <p className="text-sm text-gray-700">
                    Based on your industry, we recommend allocating {result.percentage}% of your monthly revenue to Facebook advertising.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Pro Tips</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Start with 70% of the recommended budget and scale up</li>
                    <li>• Test different ad formats and audiences</li>
                    <li>• Monitor your ROAS (Return on Ad Spend) weekly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacebookAdsCalculator;
