// Example: /src/pages/AuthCallback.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    if (code) {
      // Send this code to your backend to exchange for a token
      console.log("Google OAuth code:", code);
    }
  }, [location]);

  return <div>Processing login...</div>;
};

export default AuthCallback;
