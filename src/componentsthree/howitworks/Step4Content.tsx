import { FileText, MessageCircle, FileDown, Handshake } from 'lucide-react';
import StepSection from './StepSection';
import { Link } from "react-router-dom";

export default function Step4Content() {
  const infoFields = (
    <>
      <div className="bg-white rounded-lg p-4 sm:p-5 shadow-md border border-gray-200 active:shadow-lg transition-all">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="bg-green-100 rounded-lg p-2.5 sm:p-3">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">WhatsApp Delivery</h4>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">Get your report in 2 minutes via WhatsApp</p>
            <button className="text-xs sm:text-sm font-medium text-green-600 active:text-green-700 transition-colors">
              Connect WhatsApp →
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 sm:p-5 shadow-md border border-gray-200 active:shadow-lg transition-all">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="bg-red-100 rounded-lg p-2.5 sm:p-3">
            <FileDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">PDF Report</h4>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">Download & share with your team or advisors</p>
            <button className="text-xs sm:text-sm font-medium text-red-600 active:text-red-700 transition-colors">
              See Sample Report →
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 sm:p-5 shadow-md border border-gray-200 active:shadow-lg transition-all">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="bg-blue-100 rounded-lg p-2.5 sm:p-3">
            <Handshake className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">Certified Vendors</h4>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">Browse agencies in your city (optional)</p>
            <button className="text-xs sm:text-sm font-medium text-blue-600 active:text-blue-700 transition-colors">
              Explore Agencies →
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center pt-3">
        <Link
          to="/mibbsapp"
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-500 active:from-purple-700 active:to-pink-600 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg shadow-lg active:shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 hover:scale-105 touch-manipulation"
        >
          Start Your Brand Budget
        </Link>
      </div>
    </>
  );

  return (
    <StepSection
      stepNumber="STEP 4"
      title="Get Your Report + Connect to Agencies"
      description="Your personalized budget report is delivered instantly to your WhatsApp. You get a clear plan + the option to connect with trusted, certified agencies in your city."
      icon={<FileText className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-mibbs-purple" strokeWidth={1.5} />}
      microCopy={[
        'Free WhatsApp delivery',
        'Shareable PDF report',
        'No obligation to hire agencies'
      ]}
      infoFields={infoFields}
      exampleText="Ramesh from Chennai got his ₹75,000/month budget plan on WhatsApp. He hired a local agency from MIBBS marketplace and saved ₹15,000 in the first month."
      reverseLayout={true}
      bgGray={true}
    />
  );
}
