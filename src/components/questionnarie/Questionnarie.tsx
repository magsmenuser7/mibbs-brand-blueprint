// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import { ArrowRight, ArrowLeft, MapPin, Building, Calendar, Target } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface Question {
//   id: string;
//   title: string;
//   subtitle?: string;
//   type: 'single' | 'multiple';
//   options: { id: string; label: string; icon?: React.ReactNode }[];
// }

// const Questionnaire = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string[]>>({});

//   const questions: Question[] = [
//     {
//       id: 'location',
//       title: 'Where is your business located?',
//       subtitle: 'This helps us find agencies in your area',
//       type: 'single',
//       options: [
//         { id: 'mumbai', label: 'Mumbai', icon: <MapPin className="w-4 h-4" /> },
//         { id: 'delhi', label: 'Delhi', icon: <MapPin className="w-4 h-4" /> },
//         { id: 'bangalore', label: 'Bangalore', icon: <MapPin className="w-4 h-4" /> },
//         { id: 'chennai', label: 'Chennai', icon: <MapPin className="w-4 h-4" /> },
//         { id: 'pune', label: 'Pune', icon: <MapPin className="w-4 h-4" /> },
//         { id: 'other', label: 'Other City', icon: <MapPin className="w-4 h-4" /> },
//       ]
//     },
//     {
//       id: 'industry',
//       title: 'What industry are you in?',
//       type: 'single',
//       options: [
//         { id: 'technology', label: 'Technology', icon: <Building className="w-4 h-4" /> },
//         { id: 'retail', label: 'Retail & E-commerce', icon: <Building className="w-4 h-4" /> },
//         { id: 'healthcare', label: 'Healthcare', icon: <Building className="w-4 h-4" /> },
//         { id: 'finance', label: 'Finance', icon: <Building className="w-4 h-4" /> },
//         { id: 'food', label: 'Food & Beverage', icon: <Building className="w-4 h-4" /> },
//         { id: 'education', label: 'Education', icon: <Building className="w-4 h-4" /> },
//         { id: 'other', label: 'Other', icon: <Building className="w-4 h-4" /> },
//       ]
//     },
//     {
//       id: 'stage',
//       title: 'What stage is your business in?',
//       type: 'single',
//       options: [
//         { id: 'idea', label: 'Yet to start - Just an idea', icon: <Target className="w-4 h-4" /> },
//         { id: 'startup', label: 'In business, looking to build brand', icon: <Target className="w-4 h-4" /> },
//         { id: 'established', label: 'Established brand, want to scale', icon: <Target className="w-4 h-4" /> },
//       ]
//     },
//     {
//       id: 'experience',
//       title: 'How many years have you been in business?',
//       type: 'single',
//       options: [
//         { id: '0', label: 'Just starting', icon: <Calendar className="w-4 h-4" /> },
//         { id: '1-2', label: '1-2 years', icon: <Calendar className="w-4 h-4" /> },
//         { id: '3-5', label: '3-5 years', icon: <Calendar className="w-4 h-4" /> },
//         { id: '5+', label: '5+ years', icon: <Calendar className="w-4 h-4" /> },
//       ]
//     }
//   ];

//   const currentQuestion = questions[currentStep];
//   const progress = ((currentStep + 1) / questions.length) * 100;

//   const handleOptionSelect = (optionId: string) => {
//     const newAnswers = { ...answers };
//     if (currentQuestion.type === 'single') {
//       newAnswers[currentQuestion.id] = [optionId];
//     } else {
//       const currentOptions = newAnswers[currentQuestion.id] || [];
//       if (currentOptions.includes(optionId)) {
//         newAnswers[currentQuestion.id] = currentOptions.filter(id => id !== optionId);
//       } else {
//         newAnswers[currentQuestion.id] = [...currentOptions, optionId];
//       }
//     }
//     setAnswers(newAnswers);
//   };

//   const isOptionSelected = (optionId: string) => {
//     return answers[currentQuestion.id]?.includes(optionId) || false;
//   };

//   const canProceed = () => {
//     return answers[currentQuestion.id]?.length > 0;
//   };

//   const handleNext = () => {
//     if (currentStep < questions.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       navigate('/report', { state: { answers } });
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-50 py-8">
//       {/* Top-right fixed "Back to Dashboard" button */}
//       <div className="absolute top-4 right-4">
//         <Button
//           variant="ghost"
//           className="text-sm text-gray-600 hover:text-[#5b2d89]"
//           onClick={() => navigate('/dashboard')}
//         >
//           ← Back to Dashboard
//         </Button>
//       </div>

//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-2xl font-bold text-gray-900">Brand Budget Analysis</h1>
//             <span className="text-sm text-gray-500">{currentStep + 1} of {questions.length}</span>
//           </div>
//           <Progress value={progress} className="h-2" />
//         </div>

//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
//             {currentQuestion.subtitle && (
//               <p className="text-gray-600">{currentQuestion.subtitle}</p>
//             )}
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {currentQuestion.options.map((option) => (
//                 <button
//                   key={option.id}
//                   onClick={() => handleOptionSelect(option.id)}
//                   className={`p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center space-x-3 hover:shadow-md ${
//                     isOptionSelected(option.id)
//                       ? 'border-[#5b2d89]  bg-purple-50 shadow-md'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className={`p-2 rounded-lg ${
//                     isOptionSelected(option.id) ? 'bg-purple-100 text-[#5b2d89]' : 'bg-gray-100 text-gray-600'
//                   }`}>
//                     {option.icon}
//                   </div>
//                   <span className={`font-medium ${
//                     isOptionSelected(option.id) ? 'text-purple-900' : 'text-gray-900'
//                   }`}>
//                     {option.label}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex justify-between">
//           <Button
//             className='bg-gradient-to-br hover:from-[#ccadcc] hover:to-[#5b2d89]'
//             variant="outline"
//             onClick={handlePrevious}
//             disabled={currentStep === 0}
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Previous
//           </Button>
//           <Button
//             onClick={handleNext}
//             disabled={!canProceed()}
//             className="bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]"
//           >
//             {currentStep === questions.length - 1 ? 'Generate Report' : 'Next'}
//             <ArrowRight className="w-4 h-4 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Questionnaire;



import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Laptop2,
  HeartPulse,
  ShoppingCart,
  Utensils,
  LineChart,
  GraduationCap,
  Home,
  MoreHorizontal,
  Calendar,
  Target,
  IndianRupee,
  Rocket,
  Building2,
  Sprout
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multiple';
  options: { id: string; label: string; icon?: React.ReactNode; description?: string }[];
}

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const questions: Question[] = [
    {
      id: 'location',
      title: 'Where is your business located?',
      subtitle: 'This helps us find agencies in your area',
      type: 'single',
      options: [
        { id: 'mumbai', label: 'Mumbai', icon: <MapPin className="w-4 h-4" /> },
        { id: 'delhi', label: 'Delhi', icon: <MapPin className="w-4 h-4" /> },
        { id: 'bangalore', label: 'Bangalore', icon: <MapPin className="w-4 h-4" /> },
        { id: 'chennai', label: 'Chennai', icon: <MapPin className="w-4 h-4" /> },
        { id: 'pune', label: 'Pune', icon: <MapPin className="w-4 h-4" /> },
        { id: 'other', label: 'Other City', icon: <MapPin className="w-4 h-4" /> },
      ]
    },
    {
      id: 'industry',
      title: "What’s your industry?",
      subtitle: "Different industries have unique marketing approaches and budget allocations.",
      type: 'single',
      options: [
        { id: 'technology', label: 'Technology', icon: <Laptop2 className="w-6 h-6 text-blue-500" /> },
        { id: 'healthcare', label: 'Healthcare', icon: <HeartPulse className="w-6 h-6 text-red-500" /> },
        { id: 'retail', label: 'Retail', icon: <ShoppingCart className="w-6 h-6 text-green-500" /> },
        { id: 'food', label: 'Food & Beverage', icon: <Utensils className="w-6 h-6 text-orange-500" /> },
        { id: 'finance', label: 'Finance', icon: <LineChart className="w-6 h-6 text-purple-500" /> },
        { id: 'education', label: 'Education', icon: <GraduationCap className="w-6 h-6 text-indigo-500" /> },
        { id: 'real_estate', label: 'Real Estate', icon: <Home className="w-6 h-6 text-yellow-500" /> },
        { id: 'other', label: 'Other', icon: <MoreHorizontal className="w-6 h-6 text-gray-500" /> },
      ]
    },
    {
      id: 'stage',
      title: "What's your current business stage?",
      subtitle: 'This helps us understand your marketing needs and budget requirements.',
      type: 'single',
      options: [
        {
          id: 'idea',
          label: 'Yet to Start',
          description: 'Planning to launch a new business',
          icon: <Sprout className="w-6 h-6 text-green-600" />,
        },
        {
          id: 'startup',
          label: 'Building Brand',
          description: 'In business, looking to build brand presence',
          icon: <Building2 className="w-6 h-6 text-blue-600" />,
        },
        {
          id: 'scale',
          label: 'Scaling Brand',
          description: 'Established brand wanting to scale',
          icon: <Rocket className="w-6 h-6 text-purple-600" />,
        },
      ],
    },
    {
      id: 'budget',
      title: "What's your monthly marketing budget?",
      subtitle: 'This helps us recommend the right agencies and strategies for your budget range.',
      type: 'single',
      options: [
        {
          id: '10k-50k',
          label: '₹10K - ₹50K',
          description: 'Startup Budget',
          icon: <IndianRupee className="w-6 h-6 text-green-600" />,
        },
        {
          id: '50k-2l',
          label: '₹50K - ₹2L',
          description: 'Growth Budget',
          icon: <IndianRupee className="w-6 h-6 text-blue-600" />,
        },
        {
          id: '2l+',
          label: '₹2L+',
          description: 'Scale Budget',
          icon: <IndianRupee className="w-6 h-6 text-purple-600" />,
        },
      ],
    },
    {
      id: 'experience',
      title: 'How many years have you been in business?',
      type: 'single',
      options: [
        { id: '0', label: 'Just starting', icon: <Calendar className="w-4 h-4" /> },
        { id: '1-2', label: '1-2 years', icon: <Calendar className="w-4 h-4" /> },
        { id: '3-5', label: '3-5 years', icon: <Calendar className="w-4 h-4" /> },
        { id: '5+', label: '5+ years', icon: <Calendar className="w-4 h-4" /> },
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    const newAnswers = { ...answers };
    if (currentQuestion.type === 'single') {
      newAnswers[currentQuestion.id] = [optionId];
    } else {
      const currentOptions = newAnswers[currentQuestion.id] || [];
      if (currentOptions.includes(optionId)) {
        newAnswers[currentQuestion.id] = currentOptions.filter(id => id !== optionId);
      } else {
        newAnswers[currentQuestion.id] = [...currentOptions, optionId];
      }
    }
    setAnswers(newAnswers);
  };

  const isOptionSelected = (optionId: string) => {
    return answers[currentQuestion.id]?.includes(optionId) || false;
  };

  const canProceed = () => {
    return answers[currentQuestion.id]?.length > 0;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/report', { state: { answers } });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 py-8">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          className="text-sm text-gray-600 hover:text-[#5b2d89]"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </Button>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Brand Budget Analysis</h1>
            <span className="text-sm text-gray-500">{currentStep + 1} of {questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl mb-1">{currentQuestion.title}</CardTitle>
            {currentQuestion.subtitle && (
              <p className="text-gray-600 text-sm">{currentQuestion.subtitle}</p>
            )}
          </CardHeader>
          <CardContent>
            <div className={`grid ${currentQuestion.id === 'industry' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center hover:shadow-md ${
                    isOptionSelected(option.id)
                      ? 'border-[#5b2d89] bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`mb-2 ${isOptionSelected(option.id) ? '' : 'opacity-70'}`}>
                    {option.icon}
                  </div>
                  <span className={`text-sm font-medium ${isOptionSelected(option.id) ? 'text-[#5b2d89]' : 'text-gray-900'}`}>
                    {option.label}
                  </span>
                  {option.description && (
                    <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            className='bg-gradient-to-br hover:from-[#ccadcc] hover:to-[#5b2d89]'
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]"
          >
            {currentStep === questions.length - 1 ? 'Generate Report' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;



















































// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import { ArrowRight, ArrowLeft, MapPin, Building, Calendar, Target } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface Question {
//   id: string;
//   title: string;
//   subtitle?: string;
//   type: 'single' | 'multiple';
//   options: { id: string; label: string; icon?: React.ReactNode }[];
// }

// const Questionnaire = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string[]>>({});

//   const questions: Question[] = [
//     {
//       id: 'location',
//       title: 'Where is your business located?',
//       subtitle: 'This helps us find agencies in your area',
//       type: 'single',
//       options: [
//         { id: 'mumbai', label: 'Mumbai', icon: <MapPin className="w-4 h-4" /> },
//         { id: 'delhi', label: 'Delhi', icon: <MapPin className="w-4 h-4" /> },
//         { id: 'bangalore', label: 'Bangalore', icon: <MapPin className="w-4 h-4" /> },
//         { id: 'chennai', label: 'Chennai', icon: <MapPin className="w-4 h-4" /> },
//         { id: 'pune', label: 'Pune', icon: <MapPin className="w-4 h-4" /> },
//         { id: 'other', label: 'Other City', icon: <MapPin className="w-4 h-4" /> },
//       ]
//     },
//     {
//       id: 'industry',
//       title: 'What industry are you in?',
//       type: 'single',
//       options: [
//         { id: 'technology', label: 'Technology', icon: <Building className="w-4 h-4" /> },
//         { id: 'retail', label: 'Retail & E-commerce', icon: <Building className="w-4 h-4" /> },
//         { id: 'healthcare', label: 'Healthcare', icon: <Building className="w-4 h-4" /> },
//         { id: 'finance', label: 'Finance', icon: <Building className="w-4 h-4" /> },
//         { id: 'food', label: 'Food & Beverage', icon: <Building className="w-4 h-4" /> },
//         { id: 'education', label: 'Education', icon: <Building className="w-4 h-4" /> },
//         { id: 'other', label: 'Other', icon: <Building className="w-4 h-4" /> },
//       ]
//     },
//     {
//       id: 'stage',
//       title: 'What stage is your business in?',
//       type: 'single',
//       options: [
//         { id: 'idea', label: 'Yet to start - Just an idea', icon: <Target className="w-4 h-4" /> },
//         { id: 'startup', label: 'In business, looking to build brand', icon: <Target className="w-4 h-4" /> },
//         { id: 'established', label: 'Established brand, want to scale', icon: <Target className="w-4 h-4" /> },
//       ]
//     },
//     {
//       id: 'experience',
//       title: 'How many years have you been in business?',
//       type: 'single',
//       options: [
//         { id: '0', label: 'Just starting', icon: <Calendar className="w-4 h-4" /> },
//         { id: '1-2', label: '1-2 years', icon: <Calendar className="w-4 h-4" /> },
//         { id: '3-5', label: '3-5 years', icon: <Calendar className="w-4 h-4" /> },
//         { id: '5+', label: '5+ years', icon: <Calendar className="w-4 h-4" /> },
//       ]
//     }
//   ];

//   const currentQuestion = questions[currentStep];
//   const progress = ((currentStep + 1) / questions.length) * 100;

//   const handleOptionSelect = (optionId: string) => {
//     const newAnswers = { ...answers };
//     if (currentQuestion.type === 'single') {
//       newAnswers[currentQuestion.id] = [optionId];
//     } else {
//       const currentOptions = newAnswers[currentQuestion.id] || [];
//       if (currentOptions.includes(optionId)) {
//         newAnswers[currentQuestion.id] = currentOptions.filter(id => id !== optionId);
//       } else {
//         newAnswers[currentQuestion.id] = [...currentOptions, optionId];
//       }
//     }
//     setAnswers(newAnswers);
//   };

//   const isOptionSelected = (optionId: string) => {
//     return answers[currentQuestion.id]?.includes(optionId) || false;
//   };

//   const canProceed = () => {
//     return answers[currentQuestion.id]?.length > 0;
//   };

//   const handleNext = () => {
//     if (currentStep < questions.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       // Generate report
//       navigate('/report', { state: { answers } });
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-2xl font-bold text-gray-900">Brand Budget Analysis</h1>
//             <span className="text-sm text-gray-500">{currentStep + 1} of {questions.length}</span>
//           </div>
//           <Progress value={progress} className="h-2" />
//         </div>

//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
//             {currentQuestion.subtitle && (
//               <p className="text-gray-600">{currentQuestion.subtitle}</p>
//             )}
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {currentQuestion.options.map((option) => (
//                 <button
//                   key={option.id}
//                   onClick={() => handleOptionSelect(option.id)}
//                   className={`p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center space-x-3 hover:shadow-md ${
//                     isOptionSelected(option.id)
//                       ? 'border-[#5b2d89]  bg-purple-50 shadow-md'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className={`p-2 rounded-lg ${
//                     isOptionSelected(option.id) ? 'bg-purple-100 text-[#5b2d89]' : 'bg-gray-100 text-gray-600'
//                   }`}>
//                     {option.icon}
//                   </div>
//                   <span className={`font-medium ${
//                     isOptionSelected(option.id) ? 'text-purple-900' : 'text-gray-900'
//                   }`}>
//                     {option.label}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex justify-between">
//           <Button className='bg-gradient-to-br hover:from-[#ccadcc] hover:to-[#5b2d89]'
//             variant="outline"
//             onClick={handlePrevious}
//             disabled={currentStep === 0}
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Previous
//           </Button>
//           <Button
//             onClick={handleNext}
//             disabled={!canProceed()}
//             className="bg-gradient-to-br from-[#ccadcc] to-[#5b2d89]"
//           >
//             {currentStep === questions.length - 1 ? 'Generate Report' : 'Next'}
//             <ArrowRight className="w-4 h-4 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Questionnaire;
