
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  CreditCard,
  TrendingUp,
  Users,
  ArrowRight,
  BarChart3,
  Target,
  Calendar,
  LogOut,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '@/lib/api/auth';




const Dashboard = () => {
  const navigate = useNavigate();



 const handleLogout = async () => {
  debugger;
  try {
    await logoutUser();
    localStorage.clear();
    navigate('/');
  } catch (err: any) {
    if (err.response) {
      console.error('Backend responded with error:', err.response.data);
    } else if (err.request) {
      console.error('No response received:', err.request);
    } else {
      console.error('Error in setting up the request:', err.message);
    }
    alert('Failed to logout.');
  }
};

  // const handleLogout = async () => {
  //   try {
  //     await fetch('http://127.0.0.1:8000/api/logout', {
  //       method: 'POST',
  //       credentials: 'include', // Required for session-based auth
  //     });

  //     localStorage.clear();
  //     navigate('/');
  //   } catch (err) {
  //     console.error('Logout error:', err);
  //     alert('Failed to logout.');
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
              <p className="text-gray-600">Ready to grow your brand today?</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CreditCard className="w-3 h-3 mr-1" />
                1 Credit Available
              </Badge>

              <Button
                variant="outline"
                className="flex items-center text-black-600 border-black-200 hover:bg-[#c9aaca] hover:text-black-600"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Start Card */}
        <Card className="mb-8 bg-gradient-to-br from-[#5b2d89] to-[#ccadcc] text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Start Your Brand Journey</h2>
                <p className="text-purple-100 mb-4">
                  Get personalized budget recommendations based on your business needs
                </p>
                <Button asChild className="bg-white text-[#64378e] hover:bg-gray-100">
                  <Link to="/start-budgeting-form">
                    Start Budgeting
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="hidden md:block">
                <Sparkles className="w-24 h-24 text-purple-200" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <BarChart3 className="w-10 h-10 text-[#5b2d89] bg-[#E0CBEC] p-3 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Generate your first report
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agencies Connected</CardTitle>
              <Users className="w-10 h-10 text-[#5b2d89] bg-[#E0CBEC] p-3 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Connect with certified agencies
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Optimized</CardTitle>
              <Target className="w-10 h-10 text-[#5b2d89] bg-[#E0CBEC] p-3 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹0</div>
              <p className="text-xs text-muted-foreground">
                Start optimizing your spend
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-[#5b2d89]" />
                Free Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                to="/tools/facebook-ads"
                className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Facebook Ads Budget Calculator</div>
                <div className="text-sm text-gray-600">
                  Calculate optimal ad spend for your business
                </div>
              </Link>
              <Link
                to="/tools/website-cost"
                className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Website Cost Calculator</div>
                <div className="text-sm text-gray-600">
                  Estimate website development costs
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#5b2d89]" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No recent activity</p>
                <p className="text-sm">
                  Start your first brand budget to see activity here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


































































// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Sparkles, 
//   CreditCard, 
//   TrendingUp, 
//   Users, 
//   ArrowRight,
//   BarChart3,
//   Target,
//   Calendar,
//   LogOut
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


// const Dashboard = () => {
//   function handleLogout(event: React.MouseEvent<HTMLButtonElement>): void {
//     throw new Error('Function not implemented.');
//   }

//   const navigate = useNavigate();

  

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
//               <p className="text-gray-600">Ready to grow your brand today?</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//                 <CreditCard className="w-3 h-3 mr-1" />
//                 1 Credit Available
//               </Badge>

//               <Button
//                 variant="outline"
//                 className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
//                 onClick={handleLogout}
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Quick Start Card */}
//         <Card className="mb-8 bg-gradient-to-br from-[#5b2d89] to-[#ccadcc] text-white border-0">
//           <CardContent className="p-8">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">Start Your Brand Journey</h2>
//                 <p className="text-purple-100 mb-4">
//                   Get personalized budget recommendations based on your business needs
//                 </p>
//                 <Button asChild className="bg-white text-[#64378e] hover:bg-gray-100">
//                   <Link to="/questionnaire">
//                     Start Budgeting
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </Link>
//                 </Button>
//               </div>
//               <div className="hidden md:block">
//                 <Sparkles className="w-24 h-24 text-purple-200" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
//              <BarChart3 className="w-10 h-10 text-[#5b2d89] bg-[#E0CBEC] p-3 rounded-full" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">0</div>
//               <p className="text-xs text-muted-foreground">
//                 Generate your first report
//               </p>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Agencies Connected</CardTitle>
//               <Users className="w-10 h-10 text-[#5b2d89] bg-[#E0CBEC] p-3 rounded-full" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">0</div>
//               <p className="text-xs text-muted-foreground">
//                 Connect with certified agencies
//               </p>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Budget Optimized</CardTitle>
//               <Target className="w-10 h-10 text-[#5b2d89] bg-[#E0CBEC] p-3 rounded-full" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">₹0</div>
//               <p className="text-xs text-muted-foreground">
//                 Start optimizing your spend
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Action Items */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <TrendingUp className="w-5 h-5 mr-2 text-[#5b2d89]" />
//                 Free Tools
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <Link to="/tools/facebook-ads" className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors">
//                 <div className="font-medium">Facebook Ads Budget Calculator</div>
//                 <div className="text-sm text-gray-600">Calculate optimal ad spend for your business</div>
//               </Link>
//               <Link to="/tools/website-cost" className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors">
//                 <div className="font-medium">Website Cost Calculator</div>
//                 <div className="text-sm text-gray-600">Estimate website development costs</div>
//               </Link>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Calendar className="w-5 h-5 mr-2 text-w-10 h-10 text-[#5b2d89]" />
//                 Recent Activity
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-center py-8 text-gray-500">
//                 <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
//                 <p>No recent activity</p>
//                 <p className="text-sm">Start your first brand budget to see activity here</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
