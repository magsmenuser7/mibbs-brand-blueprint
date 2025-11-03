import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Star,
  Eye,
  Send,
} from 'lucide-react';

const Leads: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const leads = [
    {
      id: 1,
      company: 'TechStart Solutions',
      contact: 'Rahul Sharma',
      email: 'rahul@techstart.com',
      phone: '+91 98765 43210',
      industry: 'Technology',
      location: 'Mumbai, Maharashtra',
      budget: '₹5,00,000',
      stage: 'New',
      priority: 'High',
      distance: '2.3 km',
      lastContact: '2 hours ago',
      description:
        'Looking for complete digital transformation including website, mobile app, and digital marketing.',
      requirements: [
        'Website Development',
        'Mobile App',
        'Digital Marketing',
        'SEO',
      ],
      timeline: '3-4 months',
    },
    {
      id: 2,
      company: 'Fashion Forward',
      contact: 'Priya Patel',
      email: 'priya@fashionforward.com',
      phone: '+91 87654 32109',
      industry: 'Fashion',
      location: 'Pune, Maharashtra',
      budget: '₹3,50,000',
      stage: 'Contacted',
      priority: 'Medium',
      distance: '15.7 km',
      lastContact: '1 day ago',
      description:
        'Fashion brand needs social media marketing and influencer campaigns.',
      requirements: [
        'Social Media Marketing',
        'Content Creation',
        'Influencer Marketing',
      ],
      timeline: '2-3 months',
    },
    {
      id: 3,
      company: 'Organic Foods Co.',
      contact: 'Amit Kumar',
      email: 'amit@organicfoods.com',
      phone: '+91 76543 21098',
      industry: 'Food & Beverage',
      location: 'Delhi, Delhi',
      budget: '₹7,50,000',
      stage: 'Proposal Sent',
      priority: 'High',
      distance: '8.2 km',
      lastContact: '3 days ago',
      description:
        'Organic food brand requiring complete branding and digital presence.',
      requirements: [
        'Brand Identity',
        'Packaging Design',
        'Website',
        'Digital Marketing',
      ],
      timeline: '4-6 months',
    },
    {
      id: 4,
      company: 'Urban Fitness',
      contact: 'Sneha Reddy',
      email: 'sneha@urbanfitness.com',
      phone: '+91 65432 10987',
      industry: 'Health & Fitness',
      location: 'Bangalore, Karnataka',
      budget: '₹4,25,000',
      stage: 'Negotiation',
      priority: 'High',
      distance: '5.8 km',
      lastContact: '5 hours ago',
      description:
        'Fitness center chain needs digital marketing and app development.',
      requirements: ['Mobile App', 'Digital Marketing', 'Social Media', 'PPC'],
      timeline: '3-4 months',
    },
  ];

  const getStageColor = (stage: string) => {
    const colors = {
      New: 'bg-blue-100 text-blue-800',
      Contacted: 'bg-yellow-100 text-yellow-800',
      'Proposal Sent': 'bg-purple-100 text-purple-800',
      Negotiation: 'bg-orange-100 text-orange-800',
      'Closed Won': 'bg-green-100 text-green-800',
      'Closed Lost': 'bg-red-100 text-red-800',
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      High: 'text-red-600',
      Medium: 'text-yellow-600',
      Low: 'text-green-600',
    };
    return colors[priority as keyof typeof colors] || 'text-gray-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between animate-slide-up gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-center sm:text-left">
            Leads Management
          </h1>
          <p className="text-gray-600 text-center sm:text-left">
            Manage and track your leads from discovery to conversion.
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex justify-center sm:justify-end">
          <button className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto">
            Export Leads
          </button>
        </div>
      </div>

      {/* Filters */}
      <div
        className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 animate-slide-up"
        style={{ animationDelay: '0.1s' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:border-primary-300"
            />
          </div>

          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300 w-full"
          >
            <option value="all">All Stages</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300 w-full"
          >
            <option value="all">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Fashion">Fashion</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Health & Fitness">Health & Fitness</option>
          </select>

          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300 w-full">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div
        className="grid gap-6 animate-slide-up"
        style={{ animationDelay: '0.2s' }}
      >
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] animate-scale-in p-4 sm:p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                      {lead.company}
                    </h3>
                    <div className="flex flex-wrap items-center text-gray-600 mb-2 gap-1">
                      <span className="font-medium">{lead.contact}</span>
                      <span className="hidden sm:inline mx-2">•</span>
                      <span>{lead.industry}</span>
                    </div>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {lead.location} ({lead.distance})
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {lead.lastContact}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-start sm:items-end space-x-2 sm:space-x-0 sm:space-y-2">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStageColor(
                        lead.stage
                      )}`}
                    >
                      {lead.stage}
                    </span>
                    <div className="flex items-center">
                      <Star
                        className={`w-4 h-4 mr-1 ${getPriorityColor(
                          lead.priority
                        )}`}
                      />
                      <span
                        className={`text-sm font-medium ${getPriorityColor(
                          lead.priority
                        )}`}
                      >
                        {lead.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  {lead.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Budget
                    </h4>
                    <p className="text-lg font-semibold text-green-600">
                      {lead.budget}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </h4>
                    <p className="text-gray-900">{lead.timeline}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Requirements
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {lead.requirements.slice(0, 2).map((req, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full"
                        >
                          {req}
                        </span>
                      ))}
                      {lead.requirements.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          +{lead.requirements.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-200 gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center break-all">
                      <Mail className="w-4 h-4 mr-1" />
                      {lead.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {lead.phone}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-end">
                    <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 rounded-lg transition-all duration-200">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="flex items-center px-3 py-2 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200 transform hover:scale-[1.05]">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Chat
                    </button>
                    <button className="flex items-center px-3 py-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:scale-[1.05]">
                      <Send className="w-4 h-4 mr-1" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-4 sm:px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-slide-up gap-3"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="text-sm text-gray-600 text-center sm:text-left">
          Showing 1 to 4 of 24 leads
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-end space-x-2">
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-2 text-sm bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leads;















// import React, { useState, useEffect } from 'react';
// import { 
//   Search, 
//   Filter, 
//   MapPin, 
//   Calendar, 
//   Phone, 
//   Mail, 
//   MessageSquare, 
//   FileText, 
//   Star,
//   ChevronDown,
//   Eye,
//   Send
// } from 'lucide-react';

// const Leads: React.FC = () => {
//   const [selectedStage, setSelectedStage] = useState('all');
//   const [selectedIndustry, setSelectedIndustry] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   const leads = [
//     {
//       id: 1,
//       company: 'TechStart Solutions',
//       contact: 'Rahul Sharma',
//       email: 'rahul@techstart.com',
//       phone: '+91 98765 43210',
//       industry: 'Technology',
//       location: 'Mumbai, Maharashtra',
//       budget: '₹5,00,000',
//       stage: 'New',
//       priority: 'High',
//       distance: '2.3 km',
//       lastContact: '2 hours ago',
//       description: 'Looking for complete digital transformation including website, mobile app, and digital marketing.',
//       requirements: ['Website Development', 'Mobile App', 'Digital Marketing', 'SEO'],
//       timeline: '3-4 months'
//     },
//     {
//       id: 2,
//       company: 'Fashion Forward',
//       contact: 'Priya Patel',
//       email: 'priya@fashionforward.com',
//       phone: '+91 87654 32109',
//       industry: 'Fashion',
//       location: 'Pune, Maharashtra',
//       budget: '₹3,50,000',
//       stage: 'Contacted',
//       priority: 'Medium',
//       distance: '15.7 km',
//       lastContact: '1 day ago',
//       description: 'Fashion brand needs social media marketing and influencer campaigns.',
//       requirements: ['Social Media Marketing', 'Content Creation', 'Influencer Marketing'],
//       timeline: '2-3 months'
//     },
//     {
//       id: 3,
//       company: 'Organic Foods Co.',
//       contact: 'Amit Kumar',
//       email: 'amit@organicfoods.com',
//       phone: '+91 76543 21098',
//       industry: 'Food & Beverage',
//       location: 'Delhi, Delhi',
//       budget: '₹7,50,000',
//       stage: 'Proposal Sent',
//       priority: 'High',
//       distance: '8.2 km',
//       lastContact: '3 days ago',
//       description: 'Organic food brand requiring complete branding and digital presence.',
//       requirements: ['Brand Identity', 'Packaging Design', 'Website', 'Digital Marketing'],
//       timeline: '4-6 months'
//     },
//     {
//       id: 4,
//       company: 'Urban Fitness',
//       contact: 'Sneha Reddy',
//       email: 'sneha@urbanfitness.com',
//       phone: '+91 65432 10987',
//       industry: 'Health & Fitness',
//       location: 'Bangalore, Karnataka',
//       budget: '₹4,25,000',
//       stage: 'Negotiation',
//       priority: 'High',
//       distance: '5.8 km',
//       lastContact: '5 hours ago',
//       description: 'Fitness center chain needs digital marketing and app development.',
//       requirements: ['Mobile App', 'Digital Marketing', 'Social Media', 'PPC'],
//       timeline: '3-4 months'
//     }
//   ];

//   const getStageColor = (stage: string) => {
//     const colors = {
//       'New': 'bg-blue-100 text-blue-800',
//       'Contacted': 'bg-yellow-100 text-yellow-800',
//       'Proposal Sent': 'bg-purple-100 text-purple-800',
//       'Negotiation': 'bg-orange-100 text-orange-800',
//       'Closed Won': 'bg-green-100 text-green-800',
//       'Closed Lost': 'bg-red-100 text-red-800'
//     };
//     return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
//   };

//   const getPriorityColor = (priority: string) => {
//     const colors = {
//       'High': 'text-red-600',
//       'Medium': 'text-yellow-600',
//       'Low': 'text-green-600'
//     };
//     return colors[priority as keyof typeof colors] || 'text-gray-600';
//   };

//   if (isLoading) {
//     return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div></div>;
//   }

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between animate-slide-up">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
//           <p className="text-gray-600">Manage and track your leads from discovery to conversion.</p>
//         </div>
//         <div className="mt-4 sm:mt-0">
//           <button className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-[1.02]">
//             Export Leads
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="relative group">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search leads..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:border-primary-300"
//             />
//           </div>

//           <select
//             value={selectedStage}
//             onChange={(e) => setSelectedStage(e.target.value)}
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300"
//           >
//             <option value="all">All Stages</option>
//             <option value="New">New</option>
//             <option value="Contacted">Contacted</option>
//             <option value="Proposal Sent">Proposal Sent</option>
//             <option value="Negotiation">Negotiation</option>
//             <option value="Closed Won">Closed Won</option>
//             <option value="Closed Lost">Closed Lost</option>
//           </select>

//           <select
//             value={selectedIndustry}
//             onChange={(e) => setSelectedIndustry(e.target.value)}
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300"
//           >
//             <option value="all">All Industries</option>
//             <option value="Technology">Technology</option>
//             <option value="Fashion">Fashion</option>
//             <option value="Food & Beverage">Food & Beverage</option>
//             <option value="Health & Fitness">Health & Fitness</option>
//           </select>

//           <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300">
//             <Filter className="w-4 h-4 mr-2" />
//             More Filters
//           </button>
//         </div>
//       </div>

//       {/* Leads List */}
//       <div className="grid gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//         {leads.map((lead) => (
//           <div key={lead.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] animate-scale-in">
//             <div className="p-6">
//               <div className="flex flex-col lg:flex-row lg:items-start justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-start justify-between mb-4">
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                         {lead.company}
//                       </h3>
//                       <div className="flex items-center text-gray-600 mb-2">
//                         <span className="font-medium">{lead.contact}</span>
//                         <span className="mx-2">•</span>
//                         <span>{lead.industry}</span>
//                       </div>
//                       <div className="flex items-center text-sm text-gray-500 space-x-4">
//                         <div className="flex items-center">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {lead.location} ({lead.distance})
//                         </div>
//                         <div className="flex items-center">
//                           <Calendar className="w-4 h-4 mr-1" />
//                           {lead.lastContact}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-end space-y-2">
//                       <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStageColor(lead.stage)}`}>
//                         {lead.stage}
//                       </span>
//                       <div className="flex items-center">
//                         <Star className={`w-4 h-4 mr-1 ${getPriorityColor(lead.priority)}`} />
//                         <span className={`text-sm font-medium ${getPriorityColor(lead.priority)}`}>
//                           {lead.priority}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 mb-4">{lead.description}</p>

//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-700 mb-2">Budget</h4>
//                       <p className="text-lg font-semibold text-green-600">{lead.budget}</p>
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-700 mb-2">Timeline</h4>
//                       <p className="text-gray-900">{lead.timeline}</p>
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements</h4>
//                       <div className="flex flex-wrap gap-1">
//                         {lead.requirements.slice(0, 2).map((req, index) => (
//                           <span key={index} className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
//                             {req}
//                           </span>
//                         ))}
//                         {lead.requirements.length > 2 && (
//                           <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
//                             +{lead.requirements.length - 2} more
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                     <div className="flex items-center space-x-4 text-sm text-gray-600">
//                       <div className="flex items-center">
//                         <Mail className="w-4 h-4 mr-1" />
//                         {lead.email}
//                       </div>
//                       <div className="flex items-center">
//                         <Phone className="w-4 h-4 mr-1" />
//                         {lead.phone}
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 rounded-lg transition-all duration-200">
//                         <Eye className="w-4 h-4 mr-1" />
//                         View Details
//                       </button>
//                       <button className="flex items-center px-3 py-2 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200 transform hover:scale-[1.05]">
//                         <MessageSquare className="w-4 h-4 mr-1" />
//                         Chat
//                       </button>
//                       <button className="flex items-center px-3 py-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:scale-[1.05]">
//                         <Send className="w-4 h-4 mr-1" />
//                         Send Proposal
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
//         <div className="text-sm text-gray-600">
//           Showing 1 to 4 of 24 leads
//         </div>
//         <div className="flex items-center space-x-2">
//           <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
//             Previous
//           </button>
//           <button className="px-3 py-2 text-sm bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg">
//             1
//           </button>
//           <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
//             2
//           </button>
//           <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
//             3
//           </button>
//           <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leads;