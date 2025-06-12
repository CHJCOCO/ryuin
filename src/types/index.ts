// Form related types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
}

// Portfolio related types
export interface Project {
  id: number;
  title: string;
  category: 'website' | 'ecommerce' | 'landing' | 'webapp';
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  details: string;
  features: string[];
}

// Testimonial related types
export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

// Service related types
export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  price: string;
  popular: boolean;
}

// Navigation related types
export interface NavigationItem {
  name: string;
  href: string;
}

// Contact info types
export interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  content: string;
  link: string | null;
}

// Social link types
export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Process step types
export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

// Achievement types
export interface Achievement {
  number: string;
  label: string;
}

// FAQ types
export interface FAQ {
  question: string;
  answer: string;
}

// Value proposition types
export interface ValueProposition {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
}

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined;
}

// API response types
export interface APIResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// Email template types
export interface EmailTemplate {
  from_name: string;
  from_email: string;
  phone: string;
  subject: string;
  message: string;
  project_type: string;
  budget: string;
  to_email: string;
}

// Filter types for portfolio
export type PortfolioFilter = 'all' | 'website' | 'ecommerce' | 'landing' | 'webapp';

// Status types for forms
export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// Theme types (for future dark mode support)
export type Theme = 'light' | 'dark';

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
} 