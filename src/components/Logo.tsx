
import { Link } from "react-router-dom";
import logo1 from "../assets/mibbs-1.png";
import logo2 from "../assets/mibbs-2.png";

const Logo = ({ variant = "default" }: { variant?: "default" | "white" }) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        <img 
          src={logo1} 
          alt="MIBBS Logo" 
          className="h-10 sm:h-10 md:h-12" 
        />
      </div>
    </Link>
  );
};

export default Logo;
