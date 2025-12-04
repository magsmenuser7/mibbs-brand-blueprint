export interface PlanFeature {
  label: string;
  value: string;
  icon: string;
  locked?: boolean;
}

export interface PlanCTA {
  text: string;
  style: 'outline' | 'gradient' | 'outline-gold';
  link: string;
}

export interface Plan {
  id: string;
  name: string;
  badge: string | null;
  badgeColor: string;
  price: string;
  priceUnit: string;
  annualPrice?: string;
  tagline: string;
  description: string;
  features: PlanFeature[];
  cta: PlanCTA;
  idealFor: string[];
  savings?: string;
  testimonial?: {
    quote: string;
    author: string;
    avatar: string;
  };
}

export interface QuizOption {
  label: string;
  value: string;
  icon: string;
  recommendedPlan?: string;
  description?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  multiSelect?: boolean;
  helperText?: string;
}

export interface QuizAnswers {
  budget: string;
  channels: string[];
  agency: string;
}

export interface ComparisonCategory {
  name: string;
  features: ComparisonFeature[];
}

export interface ComparisonFeature {
  name: string;
  description?: string;
  values: (string | boolean)[];
}

export interface SuccessStory {
  plan: string;
  business: string;
  logo: string;
  metric: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TrustBadge {
  icon: string;
  text: string;
}
