export interface IndustryData {
  name: string;
  marketingSpendRange: string;
  channels: string[];
  parameters: string[];
}

export const industryDataMap: Record<string, IndustryData> = {
  'FMCG': {
    name: 'FMCG',
    marketingSpendRange: '5-6%',
    channels: ['TV', 'Digital', 'Print'],
    parameters: [
      'Mass campaigns',
      'Brand awareness', 
      'Retail tie-ups'
    ]
  },
  'Retail': {
    name: 'Retail',
    marketingSpendRange: '5-6%',
    channels: ['Digital (e-com, social)', 'TV', 'OOH'],
    parameters: [
      'Promotions',
      'Loyalty events',
      'Omnichannel spend'
    ]
  },
  'E-Commerce': {
    name: 'E-Commerce',
    marketingSpendRange: '6-10%',
    channels: ['Performance digital', 'Influencer'],
    parameters: [
      'Customer acquisition',
      'Social commerce',
      'ROI-driven',
      'Strategic partnerships'
    ]
  },
  'Fashion/Apparel': {
    name: 'Fashion/Apparel',
    marketingSpendRange: '6-8%',
    channels: ['Digital', 'Influencer', 'Print', 'OOH'],
    parameters: [
      'New launches',
      'Influencer marketing',
      'Visual branding',
      'Event activations'
    ]
  },
  'Real Estate': {
    name: 'Real Estate',
    marketingSpendRange: '4.5-5.5%',
    channels: ['Print', 'OOH', 'Events', 'Digital'],
    parameters: [
      'Local presence',
      'Lead generation',
      'Experiential',
      'Regional focus'
    ]
  },
  'Automotive': {
    name: 'Automotive',
    marketingSpendRange: '4.5-6.5%',
    channels: ['TV', 'Events', 'Digital', 'OOH'],
    parameters: [
      'Launch events',
      'Sponsorship',
      'Digital growth',
      'Dealer network marketing'
    ]
  },
  'Media/Entertainment': {
    name: 'Media/Entertainment',
    marketingSpendRange: '5-6%',
    channels: ['TV', 'Digital', 'Influencer'],
    parameters: [
      'Streaming',
      'Celebrity talent',
      'OTT focus',
      'Social engagement'
    ]
  },
  'Pharmaceuticals': {
    name: 'Pharmaceuticals',
    marketingSpendRange: '4.5-6.5%',
    channels: ['Print', 'Outreach', 'Digital', 'Events'],
    parameters: [
      'Doctor-focused',
      'Scientific branding',
      'Rural outreach',
      'Compliance'
    ]
  },
  'SaaS / Tech': {
    name: 'Technology/IT',
    marketingSpendRange: '1.5-2.5%',
    channels: ['Digital', 'Events', 'B2B platforms'],
    parameters: [
      'Lead generation',
      'Content/SEO',
      'CRM',
      'Channel enablement'
    ]
  },
  'Healthcare': {
    name: 'Healthcare',
    marketingSpendRange: '3-5%',
    channels: ['Digital', 'Print', 'Community outreach'],
    parameters: [
      'Trust building',
      'Educational content',
      'Patient testimonials',
      'Local partnerships'
    ]
  },
  'Education': {
    name: 'Education',
    marketingSpendRange: '4-6%',
    channels: ['Digital', 'Print', 'Events'],
    parameters: [
      'Parent targeting',
      'Success stories',
      'Community events',
      'Seasonal campaigns'
    ]
  },
  'Manufacturing': {
    name: 'Manufacturing',
    marketingSpendRange: '2-4%',
    channels: ['B2B platforms', 'Trade shows', 'Digital'],
    parameters: [
      'B2B relationships',
      'Trade publications',
      'Quality certifications',
      'Industry partnerships'
    ]
  }
};