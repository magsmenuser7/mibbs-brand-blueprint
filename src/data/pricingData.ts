import { Plan, QuizQuestion, ComparisonCategory, SuccessStory, FAQ, TrustBadge } from '../types/pricing';

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'STARTER',
    badge: 'Free Forever',
    badgeColor: '#10B981',
    price: '₹0',
    priceUnit: '/month',
    tagline: 'For early-stage founders testing the waters',
    description: 'Clarity without cost. Learn where to spend, how much to spend, and avoid beginner mistakes.',
    features: [
      { label: 'AI Budgets', value: 'Basic calculator only', icon: '🧮' },
      { label: 'Projects', value: '1 active project', icon: '📁' },
      { label: 'Benchmarks', value: 'None (upgrade to unlock)', icon: '📊', locked: true },
      { label: 'Marketplace', value: 'View only', icon: '👀' },
      { label: 'ROI Tools', value: 'None', icon: '📈', locked: true },
      { label: 'Templates', value: '3 generic', icon: '📄' },
      { label: 'Alerts', value: 'None', icon: '🔔', locked: true },
      { label: 'Integrations', value: 'None', icon: '🔗', locked: true }
    ],
    cta: {
      text: 'Get Started Free',
      style: 'outline',
      link: '/signup?plan=starter'
    },
    idealFor: [
      'New businesses (0-6 months old)',
      'Testing budget planning for first time',
      'Monthly spend under ₹25,000'
    ]
  },
  {
    id: 'growth',
    name: 'GROWTH',
    badge: 'MOST POPULAR',
    badgeColor: 'linear-gradient(135deg, #9333EA, #EC4899)',
    price: '₹999',
    priceUnit: '/month',
    annualPrice: '₹799/month (billed ₹9,588 annually)',
    tagline: 'For brands starting to invest seriously',
    description: 'Launch with confidence. Build your first structured marketing plan and connect with verified agencies.',
    features: [
      { label: 'AI Budgets', value: '5 basic plans/month', icon: '🤖' },
      { label: 'Projects', value: '3 active projects', icon: '📁' },
      { label: 'Benchmarks', value: 'Your category data', icon: '📊' },
      { label: 'Marketplace', value: 'Browse + message (2 connections/mo)', icon: '🤝' },
      { label: 'ROI Tools', value: 'Basic metrics dashboard', icon: '📈' },
      { label: 'Templates', value: '10 + industry-specific sets', icon: '📄' },
      { label: 'Alerts', value: 'Email alerts', icon: '📧' },
      { label: 'Integrations', value: 'CSV uploads', icon: '📤' }
    ],
    cta: {
      text: 'Upgrade to Growth',
      style: 'gradient',
      link: '/signup?plan=growth'
    },
    idealFor: [
      'Businesses 6-24 months old',
      'Monthly spend: ₹25k - ₹1L',
      'Using 2-4 marketing channels',
      'Ready to work with agencies'
    ],
    savings: 'Most chosen by Indian MSMEs'
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    badge: null,
    badgeColor: '',
    price: '₹2,499',
    priceUnit: '/month',
    annualPrice: '₹1,999/month (billed ₹23,988 annually)',
    tagline: 'For D2C brands ready to scale',
    description: 'Manage multi-channel spending, track ROI, and optimise your budget like a performance team.',
    features: [
      { label: 'AI Budgets', value: 'Unlimited (Advanced algorithms)', icon: '🚀' },
      { label: 'Projects', value: 'Unlimited', icon: '📁' },
      { label: 'Benchmarks', value: 'Top 25% + industry compare', icon: '📊' },
      { label: 'Marketplace', value: 'Unlimited + zero commission on 1st hire', icon: '🤝' },
      { label: 'ROI Tools', value: 'Real-time dashboard + alerts', icon: '📈' },
      { label: 'Templates', value: '50+ advanced templates', icon: '📄' },
      { label: 'Alerts', value: 'Email + In-app notifications', icon: '🔔' },
      { label: 'Integrations', value: 'Google Ads + Meta Auto-sync', icon: '🔗' }
    ],
    cta: {
      text: 'Go Professional',
      style: 'gradient',
      link: '/signup?plan=professional'
    },
    idealFor: [
      'D2C brands scaling fast',
      'Monthly spend: ₹1L - ₹5L',
      'Multi-channel campaigns',
      'Need real-time ROI tracking'
    ]
  },
  {
    id: 'scale',
    name: 'SCALE',
    badge: 'For High-Growth',
    badgeColor: '#EC4899',
    price: '₹5,999',
    priceUnit: '/month',
    annualPrice: '₹4,799/month (billed ₹57,588 annually)',
    tagline: 'For fast-growing brands and agencies',
    description: 'Take control of large budgets, multiple brands, and agency operations with enterprise-grade insights.',
    features: [
      { label: 'AI Budgets', value: 'Unlimited Predictive AI', icon: '🧠' },
      { label: 'Projects', value: 'Unlimited (multi-brand)', icon: '📁' },
      { label: 'Benchmarks', value: 'Top 10% + trend forecasting', icon: '📊' },
      { label: 'Marketplace', value: 'Priority access + featured listing', icon: '⭐' },
      { label: 'ROI Tools', value: 'Predictive analytics + forecasting', icon: '🔮' },
      { label: 'Templates', value: 'Custom + white-label options', icon: '📄' },
      { label: 'Alerts', value: 'Email + SMS + Slack', icon: '📲' },
      { label: 'Integrations', value: 'Shopify, Razorpay, CRM packs', icon: '🔗' }
    ],
    cta: {
      text: 'Grow at Scale',
      style: 'gradient',
      link: '/signup?plan=scale'
    },
    idealFor: [
      'Brands spending ₹5L+ monthly',
      'Agencies managing multiple clients',
      'Need predictive budget planning',
      'Multi-brand management'
    ]
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    badge: 'Custom Built',
    badgeColor: '#F59E0B',
    price: 'Custom',
    priceUnit: '',
    tagline: 'For large agencies + high-spend brands',
    description: 'Custom dashboards, custom AI models, custom workflows — built around your org.',
    features: [
      { label: 'Everything in SCALE', value: 'Plus enterprise features', icon: '⚡' },
      { label: 'Custom API', value: 'Full API library access', icon: '🔧' },
      { label: 'Dashboards', value: 'Role-based + custom views', icon: '📊' },
      { label: 'White-label', value: 'Branded environment', icon: '🏷️' },
      { label: 'Support', value: 'Dedicated account manager', icon: '👤' },
      { label: 'Onboarding', value: 'Custom training + migration', icon: '🎓' },
      { label: 'SLA', value: '99.9% uptime guarantee', icon: '🛡️' },
      { label: 'Security', value: 'SSO + custom compliance', icon: '🔐' }
    ],
    cta: {
      text: 'Contact Sales',
      style: 'outline-gold',
      link: '/contact-sales'
    },
    idealFor: [
      'Marketing teams of 10+ people',
      'Multi-location operations',
      'Monthly spend ₹20L+',
      'Need custom integrations'
    ],
    testimonial: {
      quote: 'MIBBS Enterprise helped us manage ₹5Cr+ annual spend across 12 brands.',
      author: 'Rajesh K., CMO',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your monthly marketing budget?",
    options: [
      {
        label: 'Just starting (₹0 - ₹25,000)',
        value: 'starter',
        icon: '🌱',
        recommendedPlan: 'starter'
      },
      {
        label: 'Growing (₹25,000 - ₹1,00,000)',
        value: 'growth',
        icon: '📈',
        recommendedPlan: 'growth'
      },
      {
        label: 'Scaling (₹1,00,000 - ₹5,00,000)',
        value: 'professional',
        icon: '🚀',
        recommendedPlan: 'professional'
      },
      {
        label: 'Established (₹5,00,000+)',
        value: 'scale',
        icon: '⚡',
        recommendedPlan: 'scale'
      }
    ]
  },
  {
    id: 2,
    question: 'Which marketing channels do you use?',
    helperText: 'Select all that apply',
    multiSelect: true,
    options: [
      { label: 'Social Media (FB, Insta, LinkedIn)', value: 'social', icon: '📱' },
      { label: 'Google Ads / Search Ads', value: 'search', icon: '🔍' },
      { label: 'Website / SEO', value: 'seo', icon: '🌐' },
      { label: 'Email Marketing', value: 'email', icon: '✉️' },
      { label: 'Print / Offline', value: 'offline', icon: '📰' },
      { label: 'Just starting / None yet', value: 'none', icon: '🆕' }
    ]
  },
  {
    id: 3,
    question: 'Do you work with agencies or manage in-house?',
    options: [
      {
        label: 'I manage everything myself',
        value: 'self',
        icon: '🙋',
        description: 'Need simple tools and guidance'
      },
      {
        label: 'I work with 1-2 agencies',
        value: 'few',
        icon: '🤝',
        description: 'Need collaboration features'
      },
      {
        label: 'Multiple agencies / In-house team',
        value: 'many',
        icon: '👥',
        description: 'Need advanced management'
      }
    ]
  }
];

export const comparisonData: ComparisonCategory[] = [
  {
    name: 'Budget & Planning',
    features: [
      {
        name: 'AI Budget Plans',
        description: 'Generate smart budget allocations',
        values: ['Basic calc', '5/month', 'Unlimited', 'Unlimited + Predictive', 'Custom AI']
      },
      {
        name: 'Active Projects',
        values: ['1', '3', 'Unlimited', 'Unlimited', 'Unlimited']
      },
      {
        name: 'Industry Benchmarks',
        values: ['—', 'Your category', 'Top 25%', 'Top 10% + trends', 'Custom']
      }
    ]
  },
  {
    name: 'Marketplace & Agencies',
    features: [
      {
        name: 'Agency Marketplace',
        values: ['View only', 'Browse + 2 connections', 'Unlimited', 'Priority access', 'White-label']
      },
      {
        name: 'Commission on Hires',
        values: ['—', '10%', '0% on 1st', '0%', '0% + featured']
      }
    ]
  },
  {
    name: 'Analytics & Tracking',
    features: [
      {
        name: 'ROI Dashboard',
        values: ['—', 'Basic', 'Real-time', 'Predictive', 'Custom']
      },
      {
        name: 'Alerts',
        values: ['—', 'Email', 'Email + App', 'Email + SMS + Slack', 'Custom channels']
      }
    ]
  },
  {
    name: 'Integrations',
    features: [
      {
        name: 'Data Import',
        values: ['—', 'CSV', 'CSV + Auto', 'Google + Meta', 'Full API']
      },
      {
        name: 'Platforms',
        values: ['—', '—', 'Google Ads, Meta', 'Shopify, Razorpay', 'Custom']
      }
    ]
  },
  {
    name: 'Support',
    features: [
      {
        name: 'Customer Support',
        values: ['Community', 'Email', 'Priority email', 'Dedicated manager', 'Custom SLA']
      },
      {
        name: 'Onboarding',
        values: ['Self-serve', 'Guides', 'Video call', 'Full training', 'Custom migration']
      }
    ]
  }
];

export const successStories: SuccessStory[] = [
  {
    plan: 'GROWTH',
    business: 'Sharma Jewellers, Indore',
    logo: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=200',
    metric: 'Saved ₹45,000 in 3 months',
    quote: 'MIBBS showed me I was overspending on Facebook ads. The benchmarks helped me reallocate to Google, and sales went up 30%.',
    author: 'Rakesh Sharma',
    role: 'Owner',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    plan: 'PROFESSIONAL',
    business: 'GreenEats (D2C Food Brand)',
    logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200',
    metric: '2.5x ROI improvement',
    quote: 'The real-time dashboard changed everything. We could see which campaigns worked instantly and shift budgets mid-month.',
    author: 'Priya Menon',
    role: 'Marketing Head',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    plan: 'SCALE',
    business: 'AdVantage Agency, Mumbai',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200',
    metric: 'Managing 15 brands efficiently',
    quote: 'MIBBS Scale lets us manage all our clients in one place. The predictive AI helps us plan quarters ahead with confidence.',
    author: 'Arjun Kapoor',
    role: 'Founder',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export const faqs: FAQ[] = [
  {
    question: 'Can I switch between plans?',
    answer: 'Yes! Upgrade or downgrade anytime. Changes take effect immediately. If you downgrade, you\'ll be refunded the prorated amount.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'STARTER plan is free forever, no credit card needed. All paid plans come with a 14-day free trial. Cancel anytime during trial for a full refund.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, and net banking. Annual Enterprise plans also support bank transfers.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. No contracts, no lock-ins. Cancel with one click from your dashboard. Your data is yours—export it anytime.'
  },
  {
    question: 'Do you offer discounts?',
    answer: 'Yes! 20% off on annual billing. Students and registered NGOs get 30% off. Agencies managing 5+ brands get custom pricing.'
  },
  {
    question: 'What if I need custom features?',
    answer: 'Enterprise plan includes custom features, integrations, and dedicated support. Contact our sales team to discuss your specific needs.'
  }
];

export const trustBadges: TrustBadge[] = [
  { icon: '🔒', text: 'Bank-grade Security' },
  { icon: '↩️', text: '30-Day Money Back' },
  { icon: '🇮🇳', text: 'Made in India' },
  { icon: '✓', text: '10,000+ Businesses' }
];
