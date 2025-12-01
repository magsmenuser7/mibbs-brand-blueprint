import HeroSection from './HeroSection';
import Step1Content from './Step1Content';
import Step2Content from './Step2Content';
import Step3Content from './Step3Content';
import Step4Content from './Step4Content';
import TrustSection from './TrustSection';
import FinalCTA from './FinalCTA';

export default function HowItWorksReact() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <Step1Content />
      <Step2Content />
      <Step3Content />
      <Step4Content />
      <TrustSection />
      <FinalCTA />
    </div>
  );
}
