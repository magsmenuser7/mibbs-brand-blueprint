import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as ExistingUser, AuthState } from '../types';

// ---------------- EXISTING CODE (untouched) ----------------
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<ExistingUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('mibbs_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user: ExistingUser = {
      id: '1',
      email,
      firstName: 'Rajesh',
      lastName: 'Kumar',
      businessName: 'Kumar Enterprises',
      phone: '+91 98765 43210',
      isFirstLogin: email === 'new@example.com',
      hasBudget: email !== 'new@example.com',
      createdAt: new Date().toISOString(),
      name: undefined,
      avatar: undefined
    };

    localStorage.setItem('mibbs_user', JSON.stringify(user));
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const signup = async (userData: any) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user: ExistingUser = {
      id: Date.now().toString(),
      ...userData,
      isFirstLogin: true,
      hasBudget: false,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('mibbs_user', JSON.stringify(user));
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('mibbs_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (userData: Partial<ExistingUser>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem('mibbs_user', JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ---------------- NEW CODE (ADDED ONLY) ----------------
interface SimpleUser {
  id: string;
  name: string;
  email: string;
  role: 'agency';
  avatar?: string;
}

interface SimpleAuthContextType {
  user: SimpleUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const SimpleAuthContext = createContext<SimpleAuthContextType | undefined>(undefined);

export const useSimpleAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (context === undefined) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider');
  }
  return context;
};

export const SimpleAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SimpleUser | null>(null);

  const login = (email: string, password: string) => {
    const mockUser: SimpleUser = {
      id: '1',
      name: 'Digital Marketing Pro',
      email,
      role: 'agency',
      avatar:
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <SimpleAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </SimpleAuthContext.Provider>
  );
};















// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { User, AuthState } from '../types';

// interface AuthContextType extends AuthState {
//   login: (email: string, password: string) => Promise<void>;
//   signup: (userData: any) => Promise<void>;
//   logout: () => void;
//   updateUser: (userData: Partial<User>) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     isAuthenticated: false,
//     isLoading: true,
//   });

//   useEffect(() => {
//     // Check for existing session
//     const savedUser = localStorage.getItem('mibbs_user');
//     if (savedUser) {
//       const user = JSON.parse(savedUser);
//       setAuthState({
//         user,
//         isAuthenticated: true,
//         isLoading: false,
//       });
//     } else {
//       setAuthState(prev => ({ ...prev, isLoading: false }));
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     setAuthState(prev => ({ ...prev, isLoading: true }));
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Mock user data - in real app, this would come from API
//     const user: User = {
//       id: '1',
//       email,
//       firstName: 'Rajesh',
//       lastName: 'Kumar',
//       businessName: 'Kumar Enterprises',
//       phone: '+91 98765 43210',
//       isFirstLogin: email === 'new@example.com',
//       hasBudget: email !== 'new@example.com',
//       createdAt: new Date().toISOString(),
//     };

//     localStorage.setItem('mibbs_user', JSON.stringify(user));
//     setAuthState({
//       user,
//       isAuthenticated: true,
//       isLoading: false,
//     });
//   };

//   const signup = async (userData: any) => {
//     setAuthState(prev => ({ ...prev, isLoading: true }));
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     const user: User = {
//       id: Date.now().toString(),
//       ...userData,
//       isFirstLogin: true,
//       hasBudget: false,
//       createdAt: new Date().toISOString(),
//     };

//     localStorage.setItem('mibbs_user', JSON.stringify(user));
//     setAuthState({
//       user,
//       isAuthenticated: true,
//       isLoading: false,
//     });
//   };

//   const logout = () => {
//     localStorage.removeItem('mibbs_user');
//     setAuthState({
//       user: null,
//       isAuthenticated: false,
//       isLoading: false,
//     });
//   };

//   const updateUser = (userData: Partial<User>) => {
//     if (authState.user) {
//       const updatedUser = { ...authState.user, ...userData };
//       localStorage.setItem('mibbs_user', JSON.stringify(updatedUser));
//       setAuthState(prev => ({
//         ...prev,
//         user: updatedUser,
//       }));
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...authState,
//         login,
//         signup,
//         logout,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };