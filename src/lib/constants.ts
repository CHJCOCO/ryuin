// Site configuration constants - 환경 변수 기반으로 설정
export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'ryuin',
  title: 'ryuin - 성과를 만드는 웹사이트',
  description: '디지털의 바다에서 방향을 잃지 않는 정교한 웹 솔루션. 디자인과 기술의 균형으로 비즈니스 성공을 이끄는 지속 가능한 웹사이트를 구축합니다.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ryuin.studio',
  creator: 'ryuin',
  keywords: ['웹사이트 제작', '홈페이지 제작', '반응형 웹', '쇼핑몰', '워드프레스', '랜딩페이지', '비즈니스 웹사이트', '웹 솔루션'],
} as const;

// Contact information - 환경 변수에서 가져오기
export const CONTACT_INFO = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@ryuin.studio',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '010-1234-5678',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '서울특별시 강남구',
  business_hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || '평일 09:00 - 18:00',
} as const;

// Social media links - 환경 변수에서 가져오기
export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/ryuin.studio',
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/ryuin',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/ryuin',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/ryuin_studio',
} as const;

// Analytics configuration - 환경 변수에서 가져오기
export const ANALYTICS = {
  google_analytics_id: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID',
  microsoft_clarity_id: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'CLARITY_PROJECT_ID',
} as const;

// EmailJS configuration - 환경 변수에서 가져오기
export const EMAILJS_CONFIG = {
  service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  public_key: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
} as const;

// Navigation menu items
export const NAVIGATION_ITEMS = [
  { name: '홈', href: '#hero', id: 'hero' },
  { name: '소개', href: '#about', id: 'about' },
  { name: '서비스', href: '#services', id: 'services' },
  { name: '포트폴리오', href: '#portfolio', id: 'portfolio' },
] as const;

// Service categories for portfolio filtering
export const PORTFOLIO_CATEGORIES = [
  { id: 'all', name: '전체' },
  { id: 'website', name: '웹사이트' },
  { id: 'ecommerce', name: '쇼핑몰' },
  { id: 'landing', name: '랜딩페이지' },
  { id: 'webapp', name: '웹앱' },
] as const;

// Project types for contact form
export const PROJECT_TYPES = [
  { value: 'website', label: '반응형 웹사이트' },
  { value: 'ecommerce', label: '쇼핑몰 구축' },
  { value: 'wordpress', label: '워드프레스 개발' },
  { value: 'landing', label: '랜딩페이지' },
  { value: 'webapp', label: '웹 애플리케이션' },
  { value: 'design', label: 'UI/UX 디자인' },
  { value: 'other', label: '기타' },
] as const;

// Budget ranges for contact form
export const BUDGET_RANGES = [
  { value: '100-300', label: '100만원 - 300만원' },
  { value: '300-500', label: '300만원 - 500만원' },
  { value: '500-1000', label: '500만원 - 1000만원' },
  { value: '1000+', label: '1000만원 이상' },
  { value: 'discuss', label: '상담 후 결정' },
] as const;

// Animation delays for staggered animations
export const ANIMATION_DELAYS = {
  short: 0.1,
  medium: 0.2,
  long: 0.4,
} as const; 