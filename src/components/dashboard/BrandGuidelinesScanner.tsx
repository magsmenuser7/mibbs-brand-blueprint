import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Eye, MapPin, Zap, FileText } from 'lucide-react';

const BrandGuidelinesScanner = () => {
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'north', name: 'North India' },
    { id: 'south', name: 'South India' },
    { id: 'east', name: 'East India' },
    { id: 'west', name: 'West India' },
    { id: 'central', name: 'Central India' }
  ];

  const runScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanResults({
        overallScore: 87,
        totalAssets: 1247,
        violations: 23,
        regions: {
          north: { score: 92, violations: 3, assets: 312 },
          south: { score: 85, violations: 8, assets: 298 },
          east: { score: 83, violations: 7, assets: 201 },
          west: { score: 89, violations: 4, assets: 267 },
          central: { score: 88, violations: 1, assets: 169 }
        },
        categories: [
          { name: 'Logo Usage', score: 94, violations: 2, critical: false },
          { name: 'Color Palette', score: 89, violations: 5, critical: false },
          { name: 'Typography', score: 76, violations: 8, critical: true },
          { name: 'Messaging Tone', score: 91, violations: 3, critical: false },
          { name: 'Visual Hierarchy', score: 82, violations: 5, critical: true }
        ],
        recentViolations: [
          { 
            id: 1, 
            type: 'Logo', 
            description: 'Incorrect logo proportions in Tamil Nadu campaign',
            region: 'South',
            severity: 'medium',
            agency: 'Creative South',
            timestamp: '2 hours ago'
          },
          { 
            id: 2, 
            type: 'Typography', 
            description: 'Non-brand font used in Punjab outdoor ads',
            region: 'North',
            severity: 'high',
            agency: 'North Media',
            timestamp: '4 hours ago'
          },
          { 
            id: 3, 
            type: 'Color', 
            description: 'Brand colors not matching in Gujarat digital campaign',
            region: 'West',
            severity: 'low',
            agency: 'West Digital',
            timestamp: '6 hours ago'
          }
        ]
      });
      setIsScanning(false);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brand Guidelines Scanner</h1>
          <p className="text-gray-600 mt-2">AI-powered brand consistency monitoring across all regions and mediums</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
          
          <button
            onClick={runScan}
            disabled={isScanning}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Run Brand Scan</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Brand Consistency Tracker</h1>
        <p className="text-gray-600 mt-2">Keeps track of how your brand looks and feels across different states and channels</p>
      </div>

      {isScanning && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="animate-pulse space-y-4">
            <Shield className="w-16 h-16 text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900">Scanning Brand Assets</h3>
            <p className="text-gray-600">Analyzing brand consistency across regions and mediums...</p>
            <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      )}

      {scanResults && !isScanning && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Score</p>
                  <p className={`text-3xl font-bold mt-2 ${getScoreColor(scanResults.overallScore)}`}>
                    {scanResults.overallScore}%
                  </p>
                </div>
                <Shield className={`w-8 h-8 ${getScoreColor(scanResults.overallScore)}`} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Assets</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{scanResults.totalAssets}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Violations Found</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{scanResults.violations}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {Math.round((1 - scanResults.violations / scanResults.totalAssets) * 100)}%
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Regional Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(scanResults.regions).map(([region, data]) => (
                <div key={region} className="text-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900 capitalize">{region}</h4>
                  <p className={`text-2xl font-bold mt-2 ${getScoreColor(data.score)}`}>{data.score}%</p>
                  <p className="text-sm text-gray-600">{data.assets} assets</p>
                  <p className="text-sm text-red-600">{data.violations} violations</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Analysis</h3>
            <div className="space-y-4">
              {scanResults.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${category.critical ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.violations} violations found</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${getScoreColor(category.score)}`}>{category.score}%</p>
                    {category.critical && (
                      <span className="text-xs text-red-600 font-medium">Critical</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Violations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Violations</h3>
            <div className="space-y-4">
              {scanResults.recentViolations.map((violation) => (
                <div key={violation.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(violation.severity)}`}>
                          {violation.severity.toUpperCase()}
                        </span>
                        <span className="text-sm font-medium text-purple-600">{violation.type}</span>
                        <span className="text-sm text-gray-500">{violation.region}</span>
                      </div>
                      <p className="text-gray-900 mb-2">{violation.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Agency: {violation.agency}</span>
                        <span>{violation.timestamp}</span>
                      </div>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BrandGuidelinesScanner;