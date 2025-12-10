import { useState } from 'react';
import { Grid3x3, TrendingUp, Search } from 'lucide-react';
import ToolCard from '../ToolCard';
import SectionHeader from '../SectionHeader';
import Toast from '../Toast';

const MarketingTemplates = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleDownload = (templateName: string) => {
    setToastMessage(`${templateName} Downloaded!`);
    setIsToastVisible(true);
    console.log(`Downloading ${templateName}`);
  };

  return (
    <section id="marketing-templates" className="w-full px-4 py-10 sm:px-6 sm:py-16 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          icon={Grid3x3}
          title="Marketing Templates"
          description="Ready-to-use templates to plan and track your marketing activities."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <ToolCard
            icon={Grid3x3}
            title="Social Media Calendar"
            problem="How do I plan my posts?"
            description="Plan 30 days of posts across Facebook, Instagram, and WhatsApp. Includes festival dates and trending topics."
            buttonText="Preview Template"
            buttonVariant="solid"
            onAction={() => handleDownload('Social Media Calendar')}
            badge="Excel & PDF"
          />

          <ToolCard
            icon={TrendingUp}
            title="Ad Spend Tracker"
            problem="Am I spending too much on ads?"
            description="Track daily ad spending on Google, Facebook, and Instagram. See what's working and what's wasting money."
            buttonText="Preview Template"
            buttonVariant="solid"
            onAction={() => handleDownload('Ad Spend Tracker')}
            badge="Google Sheets & Excel"
          />

          <ToolCard
            icon={Search}
            title="Competitor Checklist"
            problem="What are my competitors doing?"
            description="Track competitors' prices, offers, social media activity, and customer reviews. Stay ahead in your market."
            buttonText="Preview Template"
            buttonVariant="solid"
            onAction={() => handleDownload('Competitor Checklist')}
            badge="PDF Checklist"
          />
        </div>
      </div>

      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </section>
  );
};

export default MarketingTemplates;
