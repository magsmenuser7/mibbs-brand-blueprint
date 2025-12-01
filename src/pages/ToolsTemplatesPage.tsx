import { useState, useEffect } from 'react';
import Hero from '../componentsthree/toolsandtemplates/Hero';
import SectionNavigation from '../componentsthree/toolsandtemplates/SectionNavigation';
import BrandBudgetingTools from '../componentsthree/toolsandtemplates/sections/BrandBudgetingTools';
import MarketingTemplates from '../componentsthree/toolsandtemplates/sections/MarketingTemplates';
import BrandStrategyGuides from '../componentsthree/toolsandtemplates/sections/BrandStrategyGuides';
import MagsmenAuthority from '../componentsthree/toolsandtemplates/MagsmenAuthority';
import BottomCTA from '../componentsthree/toolsandtemplates/BottomCTA';

const ToolsTemplatesPage = () => {
  const [activeSection, setActiveSection] = useState('brand-budgeting');
  const [showStickyNav, setShowStickyNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 400;
      setShowStickyNav(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <SectionNavigation
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isSticky={showStickyNav}
      />

      <main>
        <BrandBudgetingTools />
        <MarketingTemplates />
        <BrandStrategyGuides />
        <MagsmenAuthority />
      </main>

      <BottomCTA />
    </div>
  );
};

export default ToolsTemplatesPage;
