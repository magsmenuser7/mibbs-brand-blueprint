
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Globe, Calculator, IndianRupee } from 'lucide-react';

const WebsiteCostCalculator = () => {
  const [selections, setSelections] = useState({
    websiteType: 'business',
    features: [] as string[],
    design: 'template',
    maintenance: false
  });
  const [result, setResult] = useState<any>(null);

  const websiteTypes = {
    business: { label: 'Business Website', basePrice: 25000 },
    ecommerce: { label: 'E-commerce Store', basePrice: 50000 },
    portfolio: { label: 'Portfolio Website', basePrice: 15000 },
    blog: { label: 'Blog/News Site', basePrice: 20000 },
    app: { label: 'Web Application', basePrice: 100000 }
  };

  const features = {
    cms: { label: 'Content Management System', price: 15000 },
    seo: { label: 'SEO Optimization', price: 10000 },
    analytics: { label: 'Analytics Setup', price: 5000 },
    payment: { label: 'Payment Gateway Integration', price: 20000 },
    booking: { label: 'Booking/Appointment System', price: 25000 },
    multilingual: { label: 'Multi-language Support', price: 15000 },
    mobile: { label: 'Mobile App Integration', price: 75000 },
    crm: { label: 'CRM Integration', price: 30000 }
  };

  const designTypes = {
    template: { label: 'Template Based', multiplier: 1 },
    custom: { label: 'Custom Design', multiplier: 1.5 },
    premium: { label: 'Premium Custom Design', multiplier: 2 }
  };

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    const newFeatures = checked 
      ? [...selections.features, featureId]
      : selections.features.filter(f => f !== featureId);
    
    setSelections({...selections, features: newFeatures});
  };

  const calculateCost = () => {
    const basePrice = websiteTypes[selections.websiteType as keyof typeof websiteTypes].basePrice;
    const featureCost = selections.features.reduce((total, featureId) => {
      return total + features[featureId as keyof typeof features].price;
    }, 0);
    
    const designMultiplier = designTypes[selections.design as keyof typeof designTypes].multiplier;
    const subtotal = (basePrice + featureCost) * designMultiplier;
    
    const maintenanceCost = selections.maintenance ? subtotal * 0.15 : 0;
    const total = subtotal + maintenanceCost;

    setResult({
      basePrice,
      featureCost,
      designMultiplier,
      subtotal,
      maintenanceCost,
      total,
      timeline: Math.ceil(selections.features.length / 2) + 4 // weeks
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ccadcc] to-[#5b2d89] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Website Cost Calculator</h1>
          <p className="text-gray-600">Get accurate website development cost estimates for the Indian market</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Website Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Website Type</Label>
                <div className="space-y-2">
                  {Object.entries(websiteTypes).map(([key, type]) => (
                    <label key={key} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="websiteType"
                        value={key}
                        checked={selections.websiteType === key}
                        onChange={(e) => setSelections({...selections, websiteType: e.target.value})}
                        className="text-blue-600"
                      />
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-500">Starting from ₹{type.basePrice.toLocaleString('en-IN')}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Additional Features</Label>
                <div className="space-y-2">
                  {Object.entries(features).map(([key, feature]) => (
                    <div key={key} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={key}
                        checked={selections.features.includes(key)}
                        onCheckedChange={(checked) => handleFeatureChange(key, checked as boolean)}
                      />
                      <label htmlFor={key} className="flex-1 cursor-pointer">
                        <div className="font-medium">{feature.label}</div>
                        <div className="text-sm text-gray-500">+₹{feature.price.toLocaleString('en-IN')}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Design Type</Label>
                <div className="space-y-2">
                  {Object.entries(designTypes).map(([key, design]) => (
                    <label key={key} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="design"
                        value={key}
                        checked={selections.design === key}
                        onChange={(e) => setSelections({...selections, design: e.target.value})}
                        className="text-blue-600"
                      />
                      <div>
                        <div className="font-medium">{design.label}</div>
                        <div className="text-sm text-gray-500">{design.multiplier}x base price</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id="maintenance"
                  checked={selections.maintenance}
                  onCheckedChange={(checked) => setSelections({...selections, maintenance: checked as boolean})}
                />
                <label htmlFor="maintenance" className="cursor-pointer">
                  <div className="font-medium">Annual Maintenance Package</div>
                  <div className="text-sm text-gray-500">15% of project cost per year</div>
                </label>
              </div>

              <Button onClick={calculateCost} className="w-full bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]">
                Calculate Cost
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <IndianRupee className="w-5 h-5 mr-2" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Project Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Website Cost:</span>
                      <span>₹{result.basePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Additional Features:</span>
                      <span>₹{result.featureCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Design Multiplier:</span>
                      <span>{result.designMultiplier}x</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Development Cost:</span>
                      <span>₹{result.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {result.maintenanceCost > 0 && (
                      <div className="flex justify-between">
                        <span>Annual Maintenance:</span>
                        <span>₹{result.maintenanceCost.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold text-green-600">
                      <span>Total Investment:</span>
                      <span>₹{result.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Timeline Estimate</h4>
                  <p className="text-sm text-gray-700">
                    Estimated completion: <strong>{result.timeline} weeks</strong>
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What's Included</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Responsive design for all devices</li>
                    <li>• Basic SEO setup</li>
                    <li>• Contact forms and basic integrations</li>
                    <li>• SSL certificate and security setup</li>
                    <li>• 30 days post-launch support</li>
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

export default WebsiteCostCalculator;
