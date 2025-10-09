import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthenticateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('mibbs_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        
        // Track login data for progressive engagement
        updateLoginData();
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('mibbs_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const updateLoginData = () => {
    const existingData = localStorage.getItem('mibbs_login_data');
    if (existingData) {
      const data = JSON.parse(existingData);
      data.loginCount = (data.loginCount || 0) + 1;
      data.lastLogin = new Date().toISOString();
      localStorage.setItem('mibbs_login_data', JSON.stringify(data));
    } else {
      const data = {
        firstLoginDate: new Date().toISOString(),
        loginCount: 1,
        lastLogin: new Date().toISOString()
      };
      localStorage.setItem('mibbs_login_data', JSON.stringify(data));
    }
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real app, this would come from API
    const user: User = {
      id: '1',
      email,
      firstName: 'Rajesh',
      lastName: 'Kumar',
      businessName: 'Kumar Enterprises',
      phone: '+91 98765 43210',
      isFirstLogin: email === 'new@example.com',
      hasBudget: email !== 'new@example.com',
      createdAt: new Date().toISOString(),
      avatar: undefined,
      name: undefined
    };

    // Track login data for progressive engagement
    updateLoginData();

    localStorage.setItem('mibbs_user', JSON.stringify(user));
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const signup = async (userData: any) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Date.now().toString(),
      ...userData,
      isFirstLogin: true,
      hasBudget: false,
      createdAt: new Date().toISOString(),
    };

    // Track login data for progressive engagement
    updateLoginData();

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

  const updateUser = (userData: Partial<User>) => {
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
    <AuthenticationContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};