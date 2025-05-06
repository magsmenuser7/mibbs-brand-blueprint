
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const QRCodeSection = () => {
  return (
    <div className="bg-navy text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in Seconds</h2>
          <p className="text-lg mb-6 text-gray-300">
            Scan the QR code with your smartphone to instantly access MIBBS™ and start planning your brand budget.
          </p>
          <Button className="btn-primary flex items-center group">
            Start Budgeting <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="bg-white p-3 rounded-lg">
            {/* Replace with actual QR code */}
            <div className="w-48 h-48 bg-gray-900 flex items-center justify-center">
              <span className="text-white text-sm">QR Code</span>
            </div>
            <p className="text-center mt-2 text-navy text-sm">Scan to access MIBBS™</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;
