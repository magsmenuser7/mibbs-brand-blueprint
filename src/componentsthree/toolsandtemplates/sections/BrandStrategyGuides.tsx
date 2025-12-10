import { useState } from 'react';
import { Target, Tag, Rocket, Lightbulb } from 'lucide-react';
import ToolCard from '../ToolCard';
import SectionHeader from '../SectionHeader';
import Toast from '../Toast';

const BrandStrategyGuides = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleDownload = (guideName: string) => {
    setToastMessage(`${guideName} Downloaded!`);
    setIsToastVisible(true);
    console.log(`Downloading ${guideName}`);
  };
  return (
    <section id="strategy-guides" className="w-full px-4 py-10 sm:px-6 sm:py-16 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          icon={Lightbulb}
          title="Brand Strategy Guides"
          description="Step-by-step guides to build a strong brand strategy written in simple language."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <ToolCard
            icon={Target}
            title="Brand Positioning Guide"
            problem="What makes my brand different?"
            description="Learn how to position your brand in the market. Includes examples from Indian businesses and fill-in-the-blank worksheets."
            buttonText="Preview Guide"
            buttonVariant="solid"
            onAction={() => handleDownload('Brand Positioning Guide')}
            badge="PDF Guide (15 pages)"
          />

          <ToolCard
            icon={Tag}
            title="Pricing Framework"
            problem="How should I price my products?"
            description="Calculate the right price using cost-plus, competitor, and value-based methods. Includes Indian market examples."
            buttonText="Preview Guide"
            buttonVariant="solid"
            onAction={() => handleDownload('Pricing Framework')}
            badge="PDF + Calculator (Excel)"
          />

          <ToolCard
            icon={Rocket}
            title="Launch Roadmap"
            problem="How do I launch a new product?"
            description="90-day launch plan covering pre-launch, launch day, and post-launch activities. Perfect for new products or services."
            buttonText="Preview Guide"
            buttonVariant="solid"
            onAction={() => handleDownload('Launch Roadmap')}
            badge="PDF Roadmap (12 pages)"
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

export default BrandStrategyGuides;
