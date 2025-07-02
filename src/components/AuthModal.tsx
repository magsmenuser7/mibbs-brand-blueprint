import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock } from "lucide-react";
import { registerUser, loginUser } from "@/lib/api/auth";

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginUser(email, password);
        localStorage.setItem("token", res.data.token);
        onClose();
      } else {
        const res = await registerUser(name, email, password);
        localStorage.setItem("token", res.data.token);
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (

    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true" />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white w-full h-full max-w-5xl rounded-none lg:rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
          
          {/* Left Image */}
          <div className="hidden lg:block lg:w-1/2 bg-[#f5edf8]">
            <img
              src="/lovable-uploads/7a398dd0-1c8a-4165-b535-94922f313fbe.png"
              alt="Auth"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-10 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#64378e]">
              {isLogin ? "Login to Continue" : "Create an Account"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ac89b9]"
                />
              </div>
            )}

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ac89b9]"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ac89b9]"
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button className="w-full bg-[#ac89b9] hover:bg-[#64378e] text-white">
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </form>

            <p className="text-center text-sm mt-4 text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                className="text-[#64378e] font-semibold underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>            
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-[#64378e] text-xl"
          >
            ✕
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AuthModal;
