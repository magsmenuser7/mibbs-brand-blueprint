import { Building2 } from 'lucide-react';
import StepSection from './StepSection';

export default function Step1Content() {
  const infoFields = (
    <>
      <div className="bg-white rounded-lg p-3.5 sm:p-4 shadow-sm border border-gray-200 active:shadow-md transition-shadow">
        <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">Business Name</label>
        <div className="text-gray-500 text-xs sm:text-sm">e.g., Sharma Electronics</div>
      </div>
      <div className="bg-white rounded-lg p-3.5 sm:p-4 shadow-sm border border-gray-200 active:shadow-md transition-shadow">
        <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">City</label>
        <div className="text-gray-500 text-xs sm:text-sm">e.g., Vijayawada</div>
      </div>
      <div className="bg-white rounded-lg p-3.5 sm:p-4 shadow-sm border border-gray-200 active:shadow-md transition-shadow">
        <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">Pincode</label>
        <div className="text-gray-500 text-xs sm:text-sm">e.g., 520001</div>
      </div>
      <div className="bg-white rounded-lg p-3.5 sm:p-4 shadow-sm border border-gray-200 active:shadow-md transition-shadow">
        <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">Industry Type</label>
        <div className="text-gray-500 text-xs sm:text-sm">Retail, Services, Manufacturing, Food & Beverage...</div>
      </div>
    </>
  );

  return (
    <StepSection
      stepNumber="STEP 1"
      title="Tell Us About Your Business"
      description="We start with the basics no complicated forms. Just simple questions about who you are and where you operate."
      icon={<Building2 className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-mibbs-purple" strokeWidth={1.5} />}
      microCopy={[
        'Takes less than 2 minutes',
        'No technical terms',
        'Edit anytime'
      ]}
      infoFields={infoFields}
      exampleText="Retail shop in Vijayawada or B2B services in Chennai"
      bgGray={false}
    />
  );
}
