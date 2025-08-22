export interface User {
  avatar: any;
  name: ReactNode;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  phone: string;
  isFirstLogin: boolean;
  hasBudget: boolean;
  createdAt: string;
}

export interface BudgetData {
  businessType: string;
  industry: string;
  monthlyRevenue: string;
  currentMarketing: string[];
  goals: string[];
  timeline: string;
  budget: {
    total: number;
    digital: number;
    design: number;
    traditional: number;
    events: number;
  };
  location: {
    city: string;
    state: string;
    pincode: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Agency {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  pricing: string;
  experience: string;
  languages: string[];
  specialties: string[];
  portfolio: string[];
  verified: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  type: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
}