import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Star, 
  TrendingUp, 
  FileText, 
  Clock, 
  CheckCircle,
  MessageSquare,
  Video,
  Award,
  Target,
  Lightbulb,
  BarChart3,
  Eye
} from 'lucide-react';

const MIBBSAdvisoryCircle = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('current');

  const quarters = [
    { id: 'current', name: 'Current Quarter (Q3 2024)' },
    { id: 'q2-2024', name: 'Q2 2024' },
    { id: 'q1-2024', name: 'Q1 2024' },
    { id: 'q4-2023', name: 'Q4 2023' }
  ];

  const advisors = [
    {
      id: 1,
      name: 'Dr. Rajesh Mehta',
      title: 'Former CMO, Fortune 500',
      expertise: ['Brand Strategy', 'Market Expansion', 'Digital Transformation'],
      experience: '20+ years',
      rating: 4.9,
      sessions: 45,
      avatar: '👨‍💼',
      specialization: 'Brand Strategy'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'Brand Consultant & Author',
      expertise: ['Consumer Psychology', 'Brand Positioning', 'Creative Strategy'],
      experience: '15+ years',
      rating: 4.8,
      sessions: 38,
      avatar: '👩‍💼',
      specialization: 'Consumer Insights'
    },
    {
      id: 3,
      name: 'Amit Gupta',
      title: 'Ex-Global Brand Director',
      expertise: ['International Markets', 'Brand Architecture', 'Innovation'],
      experience: '18+ years',
      rating: 4.9,
      sessions: 52,
      avatar: '👨‍💻',
      specialization: 'Global Expansion'
    },
    {
      id: 4,
      name: 'Kavita Nair',
      title: 'Digital Marketing Pioneer',
      expertise: ['Digital Strategy', 'Performance Marketing', 'Data Analytics'],
      experience: '12+ years',
      rating: 4.7,
      sessions: 29,
      avatar: '👩‍💻',
      specialization: 'Digital Excellence'
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Q3 Brand Performance Review',
      date: '2024-10-25',
      time: '2:00 PM - 4:00 PM',
      type: 'Quarterly Audit',
      advisor: 'Dr. Rajesh Mehta',
      agenda: ['Brand consistency analysis', 'Market performance review', 'Strategic recommendations'],
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Holiday Campaign Strategy',
      date: '2024-11-05',
      time: '10:00 AM - 12:00 PM',
      type: 'Strategy Session',
      advisor: 'Priya Sharma',
      agenda: ['Festival marketing approach', 'Consumer sentiment analysis', 'Creative direction'],
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Digital Transformation Roadmap',
      date: '2024-11-15',
      time: '3:00 PM - 5:00 PM',
      type: 'Growth Planning',
      advisor: 'Kavita Nair',
      agenda: ['Digital maturity assessment', 'Technology roadmap', 'Implementation timeline'],
      status: 'pending'
    }
  ];

  const pastInsights = [
    {
      id: 1,
      quarter: 'Q2 2024',
      advisor: 'Dr. Rajesh Mehta',
      title: 'Brand Consistency Improvement Plan',
      keyFindings: [
        'North region showing 15% brand deviation',
        'Digital channels need unified messaging',
        'Agency coordination gaps identified'
      ],
      recommendations: [
        'Implement monthly brand audits',
        'Create unified creative brief template',
        'Establish agency performance metrics'
      ],
      impact: 'Improved brand consistency by 23%',
      status: 'implemented'
    },
    {
      id: 2,
      quarter: 'Q1 2024',
      advisor: 'Priya Sharma',
      title: 'Consumer Behavior Analysis',
      keyFindings: [
        'Shift towards premium positioning',
        'Mobile-first consumer journey',
        'Regional preference variations'
      ],
      recommendations: [
        'Adjust pricing strategy',
        'Optimize mobile experience',
        'Localize regional campaigns'
      ],
      impact: 'Increased conversion rate by 18%',
      status: 'implemented'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'implemented': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">MIBBS Advisory Circle</h1>
        <p className="text-gray-600 mt-2">Every quarter, sit down with top brand consultants for audits and growth planning. Stay sharp with expert eyes on your brand.</p>
      </div>

      {/* Advisory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expert Advisors</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">12</p>
              <p className="text-sm text-green-600 mt-1">Top industry experts</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sessions This Year</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">16</p>
              <p className="text-sm text-green-600 mt-1">+4 vs last year</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">4.8</p>
              <p className="text-sm text-green-600 mt-1">Excellent feedback</p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Impact Score</p>
              <p className="text-2xl font-bold text-green-600 mt-2">92%</p>
              <p className="text-sm text-green-600 mt-1">Recommendations implemented</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Advisory Team */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Advisory Team</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advisors.map((advisor) => (
            <div key={advisor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{advisor.avatar}</div>
                <h4 className="font-semibold text-gray-900">{advisor.name}</h4>
                <p className="text-sm text-gray-600">{advisor.title}</p>
                <p className="text-xs text-purple-600 font-medium mt-1">{advisor.specialization}</p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center justify-between">
                  <span>Experience:</span>
                  <span className="font-medium">{advisor.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="font-medium">{advisor.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sessions:</span>
                  <span className="font-medium">{advisor.sessions}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Expertise:</p>
                <div className="flex flex-wrap gap-1">
                  {advisor.expertise.slice(0, 2).map((skill, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full text-purple-600 hover:text-purple-700 text-sm font-medium">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Advisory Sessions</h3>
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Schedule Session</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{session.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{session.advisor}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                  {session.status.toUpperCase()}
                </span>
              </div>
              
              <div className="mb-3">
                <span className="text-sm font-medium text-purple-600">{session.type}</span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Agenda:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {session.agenda.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                  <Video className="w-4 h-4" />
                  <span>Join Meeting</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Insights & Impact */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Past Insights & Impact</h3>
          <select 
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {quarters.map(quarter => (
              <option key={quarter.id} value={quarter.id}>{quarter.name}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-6">
          {pastInsights.map((insight) => (
            <div key={insight.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>{insight.quarter}</span>
                    <span>•</span>
                    <span>{insight.advisor}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(insight.status)}`}>
                  {insight.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span>Key Findings</span>
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {insight.keyFindings.map((finding, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600" />
                    <span>Recommendations</span>
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {insight.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Impact: {insight.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory Benefits */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Advisory Circle Works</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-purple-600">Expert Perspective</h4>
            </div>
            <p className="text-sm text-gray-700">Get insights from industry veterans who've built and scaled major brands.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-5 h-5 text-pink-600" />
              <h4 className="font-medium text-pink-600">Strategic Growth</h4>
            </div>
            <p className="text-sm text-gray-700">Quarterly reviews ensure you're always moving in the right direction.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-600">Fresh Ideas</h4>
            </div>
            <p className="text-sm text-gray-700">Stay sharp with expert eyes on your brand and fresh perspectives on challenges.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MIBBSAdvisoryCircle;