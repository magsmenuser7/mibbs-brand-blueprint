
import { Link } from "react-router-dom";

const Logo = ({ variant = "default" }: { variant?: "default" | "white" }) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        <img 
          src="./lovable-uploads/mibbs.png" 
          alt="MIBBS Logo" 
          className="h-20 md:h-12" 
        />
      </div>
    </Link>
  );
};

export default Logo;
