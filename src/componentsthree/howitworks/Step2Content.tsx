import { ClipboardCheck } from 'lucide-react';
import StepSection from './StepSection';

export default function Step2Content() {
  const infoFields = (
    <>
      <div className="bg-white rounded-lg p-3.5 sm:p-4 shadow-sm border border-gray-200 active:shadow-md transition-shadow">
        <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-2">Brand Stage</label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <span className="px-2.5 py-1 sm:px-3 bg-purple-100 text-purple-700 rounded-full text-xs active:bg-purple-200 transition-colors">New Business</span>
          <span className="px-2.5 py-1 sm:px-3 bg-purple-100 text-purple-700 rounded-full text-xs active:bg-purple-200 transition-colors">Growing</span>
          <span className="px-2.5 py-1 sm:px-3 bg-purple-100 text-purple-700 rounded-full text-xs active:bg-purple-200 transition-colors">Established</span>
          <span className="px-2.5 py-1 sm:px-3 bg-purple-100 text-purple-700 rounded-full text-xs active:bg-purple-200 transition-colors">Leader</span>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3.5 sm:p-4 shadow-sm border border-gray-200 active:shadow-md transition-shadow">
        <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-2">Main Goal</label>
        <div className="text-gray-500 text-xs sm:text-sm leading-relaxed">Get customers • Build brand name • Expand locations • Beat competitors</div>
      </div>
      <div className="bg-white rounded-lg p-3.5 sm:p-4 shadow-sm border border-gray-200 active:shadow-md transition-shadow">
        <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-2">Monthly Budget</label>
        <div className="text-gray-500 text-xs sm:text-sm">₹10,000 to ₹5,00,000</div>
      </div>
      <div className="bg-white rounded-lg p-3.5 sm:p-4 shadow-sm border border-gray-200 active:shadow-md transition-shadow">
        <label className="text-xs sm:text-sm font-medium text-gray-700 block mb-2">Competitor Standing</label>
        <div className="flex gap-2">
          <span className="px-2.5 py-1 sm:px-3 bg-gray-100 text-gray-700 rounded text-xs active:bg-gray-200 transition-colors">Behind</span>
          <span className="px-2.5 py-1 sm:px-3 bg-gray-100 text-gray-700 rounded text-xs active:bg-gray-200 transition-colors">Equal</span>
          <span className="px-2.5 py-1 sm:px-3 bg-gray-100 text-gray-700 rounded text-xs active:bg-gray-200 transition-colors">Ahead</span>
        </div>
      </div>
    </>
  );

  return (
    <StepSection
      stepNumber="STEP 2"
      title="Answer Simple Questions"
      description="We'll ask about your brand stage, business goals, monthly budget, and where you stand compared to competitors. Don't worry we explain everything in plain language."
      icon={<ClipboardCheck className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-mibbs-purple" strokeWidth={1.5} />}
      microCopy={[
        'No wrong answers',
        'We guide you at every question',
        'Save progress automatically'
      ]}
      infoFields={infoFields}
      exampleText="New retail shop, goal: get first 100 customers, budget: ₹50,000/month, currently behind competitors"
      reverseLayout={true}
      bgGray={true}
    />
  );
}
