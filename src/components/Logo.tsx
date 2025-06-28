
import { Link } from "react-router-dom";

const Logo = ({ variant = "default" }: { variant?: "default" | "white" }) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        <img 
          src="./lovable-uploads/mibbs.png" 
          alt="MIBBS Logo" 
          className="h-10 sm:h-10 md:h-12" 
        />
      </div>
    </Link>
  );
};

export default Logo;
