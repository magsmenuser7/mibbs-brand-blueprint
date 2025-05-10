
import { Link } from "react-router-dom";

const Logo = ({ variant = "default" }: { variant?: "default" | "white" }) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/7a398dd0-1c8a-4165-b535-94922f313fbe.png" 
            alt="MIBBS Logo" 
            className="h-10 md:h-12" 
          />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
