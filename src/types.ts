export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Will map to a Lucide icon
  metric?: string;
  metricLabel?: string;
  codeSnippet?: string;
  badge?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface WorkflowStep {
  number: number;
  title: string;
  description: string;
  illustrationType: 'code' | 'nodes' | 'logs';
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatarUrl: string;
  content: string;
  companyName: string;
  companyIcon?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
