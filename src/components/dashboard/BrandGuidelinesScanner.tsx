import React, { useState } from 'react';
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

      {/* Header + Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Brand Guidelines Scanner</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            AI-powered brand consistency monitoring across all regions and mediums
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
          
          <button
            onClick={runScan}
            disabled={isScanning}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 transition-all duration-300"
          >
            {isScanning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="text-sm sm:text-base">Scanning...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span className="text-sm sm:text-base">Run Brand Scan</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-4">Brand Consistency Tracker</h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
          Keeps track of how your brand looks and feels across different states and channels
        </p>
      </div>

      {/* Scanning Placeholder */}
      {isScanning && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="animate-pulse space-y-4">
            <Shield className="w-16 h-16 text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900">Scanning Brand Assets</h3>
            <p className="text-gray-600 text-sm sm:text-base">Analyzing brand consistency across regions and mediums...</p>
            <div className="w-full sm:w-64 bg-gray-200 rounded-full h-2 mx-auto">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      )}

      {/* Scan Results */}
      {scanResults && !isScanning && (
        <div className="space-y-6">

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Score</p>
                <p className={`text-2xl sm:text-3xl font-bold mt-1 ${getScoreColor(scanResults.overallScore)}`}>
                  {scanResults.overallScore}%
                </p>
              </div>
              <Shield className={`w-8 h-8 ${getScoreColor(scanResults.overallScore)}`} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">{scanResults.totalAssets}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Violations Found</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1 text-red-600">{scanResults.violations}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1 text-green-600">
                  {Math.round((1 - scanResults.violations / scanResults.totalAssets) * 100)}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Regional Performance */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h3>
            <div className="flex flex-wrap sm:flex-nowrap gap-4">
              {Object.entries(scanResults.regions).map(([region, data]) => (
                <div key={region} className="min-w-[150px] flex-1 text-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900 capitalize">{region}</h4>
                  <p className={`text-xl sm:text-2xl font-bold mt-1 ${getScoreColor(data.score)}`}>{data.score}%</p>
                  <p className="text-sm text-gray-600">{data.assets} assets</p>
                  <p className="text-sm text-red-600">{data.violations} violations</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category Analysis */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Analysis</h3>
            <div className="space-y-2">
              {scanResults.categories.map((category, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <div className={`w-3 h-3 rounded-full ${category.critical ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.violations} violations found</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl sm:text-2xl font-bold ${getScoreColor(category.score)}`}>{category.score}%</p>
                    {category.critical && <span className="text-xs text-red-600 font-medium">Critical</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Violations */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Violations</h3>
            <div className="space-y-2 min-w-full">
              {scanResults.recentViolations.map((v) => (
                <div key={v.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(v.severity)}`}>{v.severity.toUpperCase()}</span>
                      <span className="text-sm font-medium text-purple-600">{v.type}</span>
                      <span className="text-sm text-gray-500">{v.region}</span>
                    </div>
                    <p className="text-gray-900 text-sm sm:text-base">{v.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600 mt-1">
                      <span>Agency: {v.agency}</span>
                      <span>{v.timestamp}</span>
                    </div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1 mt-2 sm:mt-0">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">View</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandGuidelinesScanner;
