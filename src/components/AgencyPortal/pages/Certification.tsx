import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Upload, 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileText, 
  Calendar, 
  Badge
} from 'lucide-react';

const Certification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'application' | 'documents'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const certificationStatus = {
    current: 'Premium',
    tier: 2,
    validUntil: '2025-12-15',
    score: 87,
    benefits: [
      'Priority lead notifications',
      'Higher proposal visibility',
      'Advanced analytics dashboard',
      'Dedicated account manager',
      'Co-marketing opportunities'
    ]
  };

  const requirements = [
    { name: 'Business Registration', status: 'completed', score: 10 },
    { name: 'Portfolio Submission', status: 'completed', score: 15 },
    { name: 'Client Testimonials', status: 'completed', score: 20 },
    { name: 'Team Certification', status: 'pending', score: 15 },
    { name: 'Financial Records', status: 'completed', score: 10 },
    { name: 'Industry Experience', status: 'completed', score: 20 },
    { name: 'Quality Assessment', status: 'review', score: 0 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'review': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'review': return 'Under Review';
      case 'failed': return 'Requires Update';
      default: return 'Not Started';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-slide-up">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900">MIBBS Certification</h1>
          <p className="text-gray-600">Manage your certification status and unlock premium benefits.</p>
        </div>
        <div className="flex justify-center sm:justify-end">
          <button className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto">
            Upgrade Tier
          </button>
        </div>
      </div>

      {/* Current Status Card */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-6 text-white animate-slide-up shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start md:items-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-3 mr-4 animate-float">
              <Award className="w-8 h-8 animate-pulse-soft" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{certificationStatus.current} Partner</h2>
              <p className="text-primary-100">Tier {certificationStatus.tier} Certification</p>
              <div className="flex items-center mt-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">Valid until {certificationStatus.validUntil}</span>
              </div>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center w-full sm:w-auto">
            <p className="text-3xl font-bold">{certificationStatus.score}</p>
            <p className="text-sm text-primary-100">Certification Score</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-slide-up overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-6 md:space-x-8 px-4 sm:px-6 min-w-max md:min-w-0">
            {[
              { id: 'overview', name: 'Overview', icon: Badge },
              { id: 'application', name: 'Application', icon: FileText },
              { id: 'documents', name: 'Documents', icon: Upload }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-primary-300 transition-all duration-200'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certificationStatus.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 animate-scale-in">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-green-800 text-sm sm:text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification Requirements</h3>
                <div className="space-y-4">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-gradient-to-r hover:from-primary-50/30 hover:to-accent-50/30 transition-all duration-200">
                      <div className="flex items-start sm:items-center">
                        {getStatusIcon(req.status)}
                        <div className="ml-3">
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{req.name}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{getStatusText(req.status)}</p>
                        </div>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{req.score}/20</p>
                        <p className="text-xs text-gray-500">Points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Application Tab */}
          {activeTab === 'application' && (
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                    <option value="">Select years</option>
                    <option value="1-2">1–2 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="6-10">6–10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Services</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    'Digital Marketing',
                    'Website Development',
                    'Graphic Design',
                    'Social Media Marketing',
                    'SEO Services',
                    'Content Marketing',
                    'Video Production',
                    'Brand Strategy',
                    'E-commerce Solutions'
                  ].map((service) => (
                    <label key={service} className="flex items-center">
                      <input type="checkbox" className="mr-2 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                    <option value="">Select team size</option>
                    <option value="1-5">1–5</option>
                    <option value="6-15">6–15</option>
                    <option value="16-50">16–50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe your company and expertise..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Update Application
                </button>
              </div>
            </form>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
                <p className="text-gray-600 mb-6">Upload the required documents to complete your certification.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Business Registration Certificate', status: 'uploaded', required: true },
                  { name: 'Portfolio Samples', status: 'uploaded', required: true },
                  { name: 'Client Testimonials', status: 'uploaded', required: true },
                  { name: 'Team Certifications', status: 'pending', required: true },
                  { name: 'Financial Statements', status: 'uploaded', required: false },
                  { name: 'Insurance Certificate', status: 'not_uploaded', required: false }
                ].map((doc, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <div className="flex items-start sm:items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-500">{doc.required ? 'Required' : 'Optional'}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(doc.status)}
                        <span className="ml-2 text-sm text-gray-600">{getStatusText(doc.status)}</span>
                      </div>
                    </div>

                    {doc.status === 'not_uploaded' || doc.status === 'pending' ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                        <button className="mt-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-[1.02]">
                          Choose File
                        </button>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-sm text-green-800">Document uploaded successfully</span>
                        </div>
                        <button className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors duration-200">
                          Replace
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certification;















// import React, { useState, useEffect } from 'react';
// import { 
//   Award, 
//   Upload, 
//   CheckCircle, 
//   Clock, 
//   XCircle, 
//   FileText, 
//   User, 
//   Building, 
//   Star,
//   Calendar,
//   Badge
// } from 'lucide-react';

// const Certification: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'overview' | 'application' | 'documents'>('overview');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 600);
//     return () => clearTimeout(timer);
//   }, []);

//   const certificationStatus = {
//     current: 'Premium',
//     tier: 2,
//     validUntil: '2025-12-15',
//     score: 87,
//     benefits: [
//       'Priority lead notifications',
//       'Higher proposal visibility',
//       'Advanced analytics dashboard',
//       'Dedicated account manager',
//       'Co-marketing opportunities'
//     ]
//   };

//   const requirements = [
//     { name: 'Business Registration', status: 'completed', score: 10 },
//     { name: 'Portfolio Submission', status: 'completed', score: 15 },
//     { name: 'Client Testimonials', status: 'completed', score: 20 },
//     { name: 'Team Certification', status: 'pending', score: 15 },
//     { name: 'Financial Records', status: 'completed', score: 10 },
//     { name: 'Industry Experience', status: 'completed', score: 20 },
//     { name: 'Quality Assessment', status: 'review', score: 0 }
//   ];

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
//       case 'review': return <Clock className="w-5 h-5 text-blue-500" />;
//       case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
//       default: return <Clock className="w-5 h-5 text-gray-400" />;
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case 'completed': return 'Completed';
//       case 'pending': return 'Pending';
//       case 'review': return 'Under Review';
//       case 'failed': return 'Requires Update';
//       default: return 'Not Started';
//     }
//   };

//   if (isLoading) {
//     return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div></div>;
//   }

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between animate-slide-up">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">MIBBS Certification</h1>
//           <p className="text-gray-600">Manage your certification status and unlock premium benefits.</p>
//         </div>
//         <div className="mt-4 sm:mt-0 flex space-x-3">
//           <button className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-[1.02]">
//             Upgrade Tier
//           </button>
//         </div>
//       </div>

//       {/* Current Status Card */}
//       <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-6 text-white animate-slide-up shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ animationDelay: '0.1s' }}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="bg-white bg-opacity-20 rounded-lg p-3 mr-4 animate-float">
//               <Award className="w-8 h-8 animate-pulse-soft" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold">{certificationStatus.current} Partner</h2>
//               <p className="text-primary-100">Tier {certificationStatus.tier} Certification</p>
//               <div className="flex items-center mt-2">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 <span className="text-sm">Valid until {certificationStatus.validUntil}</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="bg-white bg-opacity-20 rounded-lg p-4">
//               <p className="text-3xl font-bold">{certificationStatus.score}</p>
//               <p className="text-sm text-primary-100">Certification Score</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//         <div className="border-b border-gray-200">
//           <nav className="flex space-x-8 px-6">
//             {[
//               { id: 'overview', name: 'Overview', icon: Badge },
//               { id: 'application', name: 'Application', icon: FileText },
//               { id: 'documents', name: 'Documents', icon: Upload }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id as any)}
//                 className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === tab.id
//                     ? 'border-primary-500 text-primary-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-primary-300 transition-all duration-200'
//                 }`}
//               >
//                 <tab.icon className="w-4 h-4 mr-2" />
//                 {tab.name}
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div className="p-6">
//           {activeTab === 'overview' && (
//             <div className="space-y-6">
//               {/* Benefits */}
//               <div className="animate-slide-up">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Benefits</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {certificationStatus.benefits.map((benefit, index) => (
//                     <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
//                       <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
//                       <span className="text-green-800">{benefit}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Requirements Progress */}
//               <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification Requirements</h3>
//                 <div className="space-y-4">
//                   {requirements.map((req, index) => (
//                     <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-gradient-to-r hover:from-primary-50/30 hover:to-accent-50/30 transition-all duration-200 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
//                       <div className="flex items-center">
//                         {getStatusIcon(req.status)}
//                         <div className="ml-3">
//                           <p className="font-medium text-gray-900">{req.name}</p>
//                           <p className="text-sm text-gray-500">{getStatusText(req.status)}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-semibold text-gray-900">{req.score}/20</p>
//                         <p className="text-xs text-gray-500">Points</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'application' && (
//             <div className="space-y-6">
//               <div className="animate-slide-up">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification Application</h3>
//                 <p className="text-gray-600 mb-6">Complete your certification application to unlock additional benefits.</p>
//               </div>

//               <form className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Company Name
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300"
//                       placeholder="Enter company name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Years in Business
//                     </label>
//                     <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300">
//                       <option value="">Select years</option>
//                       <option value="1-2">1-2 years</option>
//                       <option value="3-5">3-5 years</option>
//                       <option value="6-10">6-10 years</option>
//                       <option value="10+">10+ years</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Primary Services
//                   </label>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                     {[
//                       'Digital Marketing',
//                       'Website Development',
//                       'Graphic Design',
//                       'Social Media Marketing',
//                       'SEO Services',
//                       'Content Marketing',
//                       'Video Production',
//                       'Brand Strategy',
//                       'E-commerce Solutions'
//                     ].map((service) => (
//                       <label key={service} className="flex items-center">
//                         <input type="checkbox" className="mr-2 text-primary-600 focus:ring-primary-500" />
//                         <span className="text-sm text-gray-700">{service}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Team Size
//                   </label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300">
//                     <option value="">Select team size</option>
//                     <option value="1-5">1-5 members</option>
//                     <option value="6-15">6-15 members</option>
//                     <option value="16-50">16-50 members</option>
//                     <option value="50+">50+ members</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Company Description
//                   </label>
//                   <textarea
//                     rows={4}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300"
//                     placeholder="Describe your company and expertise..."
//                   />
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-[1.02]"
//                   >
//                     Update Application
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {activeTab === 'documents' && (
//             <div className="space-y-6">
//               <div className="animate-slide-up">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
//                 <p className="text-gray-600 mb-6">Upload the required documents to complete your certification.</p>
//               </div>

//               <div className="grid gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
//                 {[
//                   { name: 'Business Registration Certificate', status: 'uploaded', required: true },
//                   { name: 'Portfolio Samples', status: 'uploaded', required: true },
//                   { name: 'Client Testimonials', status: 'uploaded', required: true },
//                   { name: 'Team Certifications', status: 'pending', required: true },
//                   { name: 'Financial Statements', status: 'uploaded', required: false },
//                   { name: 'Insurance Certificate', status: 'not_uploaded', required: false }
//                 ].map((doc, index) => (
//                   <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 hover:shadow-md transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center">
//                         <FileText className="w-5 h-5 text-gray-400 mr-3" />
//                         <div>
//                           <h4 className="font-medium text-gray-900">{doc.name}</h4>
//                           <p className="text-sm text-gray-500">
//                             {doc.required ? 'Required' : 'Optional'}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center">
//                         {getStatusIcon(doc.status)}
//                         <span className="ml-2 text-sm text-gray-600">
//                           {getStatusText(doc.status)}
//                         </span>
//                       </div>
//                     </div>
                    
//                     {doc.status === 'not_uploaded' || doc.status === 'pending' ? (
//                       <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                         <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                         <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
//                         <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
//                         <button className="mt-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-[1.02]">
//                           Choose File
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
//                         <div className="flex items-center">
//                           <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                           <span className="text-sm text-green-800">Document uploaded successfully</span>
//                         </div>
//                         <button className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors duration-200">
//                           Replace
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certification;