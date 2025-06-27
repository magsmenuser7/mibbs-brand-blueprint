
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

const QRCodeSection = () => {
  return (
    <div className="bg-navy text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in Seconds</h2>
          <p className="text-lg mb-6 text-gray-300">
            Scan the QR code with your smartphone to instantly access MIBBS™ and start planning your brand budget.
          </p>
          <Button className="btn-primary flex items-center group bg-[#ac89b9] hover:bg-[#64378e] hover:text-[#fff]">
            Start Budgeting <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>
        
        {/* <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="bg-white p-3 rounded-lg">
              {QR Code with logo}
            <div className="w-48 h-48 bg-gray-900 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm">QR Code</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-white p-1 rounded-sm">
                  <img 
                    src="/lovable-uploads/7a398dd0-1c8a-4165-b535-94922f313fbe.png" 
                    alt="MIBBS Logo" 
                    className="h-8 w-auto" 
                  />
                </div>
              </div>
            </div>
            <p className="text-center mt-2 text-navy text-sm font-medium">Scan to access MIBBS™</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default QRCodeSection;
