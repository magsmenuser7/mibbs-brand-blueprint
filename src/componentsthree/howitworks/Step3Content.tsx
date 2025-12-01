import { Brain, MapPin, Factory, Map } from 'lucide-react';
import StepSection from './StepSection';

export default function Step3Content() {
  const infoFields = (
    <>
      <div className="bg-purple-50 rounded-lg p-3.5 sm:p-4 border border-purple-200 active:shadow-md transition-shadow">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">Pincode Intelligence</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Local market rates & customer behavior</p>
          </div>
        </div>
      </div>
      <div className="bg-pink-50 rounded-lg p-3.5 sm:p-4 border border-pink-200 active:shadow-md transition-shadow">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <Factory className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">Industry Intelligence</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Sector-specific budget strategies</p>
          </div>
        </div>
      </div>
      <div className="bg-purple-50 rounded-lg p-3.5 sm:p-4 border border-purple-200 active:shadow-md transition-shadow">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <Map className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">Region Intelligence</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">State & city marketing trends</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <StepSection
      stepNumber="STEP 3"
      title="System Builds Your Budget Plan"
      description="Our AI studies your pincode, industry, and competitors in your region. Within seconds, MIBBS creates a custom budget plan designed specifically for your business reality."
      icon={<Brain className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-mibbs-purple" strokeWidth={1.5} />}
      microCopy={[
        'Uses real data from your area',
        'Based on 50,000+ Indian businesses',
        'Updates with market changes'
      ]}
      infoFields={infoFields}
      exampleText="For a retail shop in Vijayawada (520001), MIBBS knows local Facebook ad costs, popular festivals, and competitor spending patterns."
      bgGray={false}
    />
  );
}
