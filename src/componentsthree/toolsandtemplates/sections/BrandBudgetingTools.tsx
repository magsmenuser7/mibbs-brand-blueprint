import { motion } from 'framer-motion';
import { Calculator, Calendar, Map } from 'lucide-react';
import ToolCard from '../ToolCard';
import SectionHeader from '../SectionHeader';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const BrandBudgetingTools = () => {
  const handleOpenCalculator = () => {
    console.log('Opening Budget Calculator');
  };

  const handleOpenPlanner = () => {
    console.log('Opening Monthly Planner');
  };

  const handleGetBlueprint = () => {
    console.log('Getting Annual Blueprint');
  };

  return (
    <section id="brand-budgeting" className="w-full px-4 py-10 sm:px-6 sm:py-16 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          icon={Calculator}
          title="Brand Budgeting Tools"
          description="Know exactly how much to spend and where to invest your marketing budget."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8"
        >
          <ToolCard
            icon={Calculator}
            title="Budget Calculator"
            problem="How much should I spend on branding?"
            description="Enter your monthly revenue and get instant budget recommendations based on your industry and business stage."
            buttonText="Open Calculator"
            buttonVariant="outline"
            onAction={handleOpenCalculator}
          />

          <ToolCard
            icon={Calendar}
            title="Monthly Budget Planner"
            problem="Where should I spend this month?"
            description="Plan your monthly marketing spend across social media, ads, content, and agencies. Adjust and download your plan."
            buttonText="Open Planner"
            buttonVariant="outline"
            onAction={handleOpenPlanner}
          />

          <ToolCard
            icon={Map}
            title="Annual Brand Blueprint"
            problem="How do I plan my full year?"
            description="Get a 12-month budget roadmap with month-by-month breakdowns for launches, festivals, and growth phases."
            buttonText="Get Blueprint"
            buttonVariant="outline"
            onAction={handleGetBlueprint}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BrandBudgetingTools;
