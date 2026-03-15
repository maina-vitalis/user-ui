export type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Step = {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Category = {
  name: string;
  count: string;
  emoji: string;
  gradientClass: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  badge: string;
  initials: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  commission: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
};