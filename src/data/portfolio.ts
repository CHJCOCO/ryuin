import { Project } from '@/types';

export const portfolioProjects: Project[] = [
  {
    id: 1,
    title: '카페 브랜드 웹사이트',
    category: 'website',
    description: '모던하고 세련된 카페 브랜드를 위한 반응형 웹사이트',
    image: '/images/portfolio/cafe-website.jpg',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://brewing-cafe-demo.vercel.app',
    details: '고급스러운 카페 브랜드의 정체성을 반영한 웹사이트입니다. 메뉴 소개, 매장 정보, 온라인 주문 기능을 포함하여 고객 경험을 극대화했습니다. 특히 모바일 환경에서의 사용성을 중점적으로 고려하여 개발했습니다.',
    features: [
      '반응형 디자인',
      '온라인 주문 시스템',
      'SEO 최적화',
      '빠른 로딩 속도',
      '메뉴 관리 시스템',
      '매장 찾기 기능'
    ]
  },
  {
    id: 2,
    title: '패션 쇼핑몰',
    category: 'ecommerce',
    description: '트렌디한 패션 아이템을 판매하는 온라인 쇼핑몰',
    image: '/images/portfolio/fashion-shop.jpg',
    technologies: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://fashion-store-demo.vercel.app',
    details: '최신 패션 트렌드를 반영한 쇼핑몰로, 직관적인 상품 검색과 간편한 결제 시스템을 구현했습니다. 사용자 경험을 최우선으로 고려한 UI/UX 디자인과 안전한 결제 프로세스를 제공합니다.',
    features: [
      '상품 관리 시스템',
      'Stripe 결제 연동',
      '재고 관리',
      '고객 리뷰 시스템',
      '위시리스트 기능',
      '주문 추적 시스템'
    ]
  },
  {
    id: 3,
    title: 'SaaS 제품 랜딩페이지',
    category: 'landing',
    description: '높은 전환율을 위한 SaaS 제품 마케팅 페이지',
    image: '/images/portfolio/saas-landing.jpg',
    technologies: ['React', 'Framer Motion', 'Analytics', 'Tailwind CSS'],
    liveUrl: 'https://saas-landing-demo.vercel.app',
    details: 'B2B SaaS 제품의 핵심 가치를 효과적으로 전달하는 랜딩페이지입니다. A/B 테스트를 통해 최적화된 전환율을 달성했으며, 다양한 분석 도구를 통해 지속적인 성능 개선을 진행했습니다.',
    features: [
      'A/B 테스트 지원',
      '분석 도구 연동',
      '리드 생성 폼',
      '전환율 최적화',
      '인터랙티브 애니메이션',
      '성능 모니터링'
    ]
  },
  {
    id: 4,
    title: '부동산 관리 시스템',
    category: 'webapp',
    description: '부동산 중개업체를 위한 통합 관리 웹 애플리케이션',
    image: '/images/portfolio/real-estate-system.jpg',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    liveUrl: 'https://realestate-demo.vercel.app',
    details: '부동산 매물 관리, 고객 관리, 계약 관리를 통합한 올인원 솔루션입니다. 복잡한 비즈니스 로직을 직관적인 UI로 구현했으며, 실시간 데이터 동기화와 권한 관리 시스템을 포함합니다.',
    features: [
      '매물 관리 시스템',
      '고객 CRM',
      '계약 관리',
      '보고서 생성',
      '권한 관리',
      '실시간 알림'
    ]
  },
  {
    id: 5,
    title: '레스토랑 예약 시스템',
    category: 'website',
    description: '온라인 예약과 메뉴 주문이 가능한 레스토랑 웹사이트',
    image: '/images/portfolio/restaurant-booking.jpg',
    technologies: ['Next.js', 'Prisma', 'Tailwind CSS', 'Socket.io'],
    liveUrl: 'https://restaurant-demo.vercel.app',
    details: '레스토랑의 브랜드 이미지를 강화하고 온라인 예약 시스템을 통해 운영 효율성을 높인 프로젝트입니다. 실시간 테이블 관리와 고객 알림 시스템을 통해 원활한 서비스 운영을 지원합니다.',
    features: [
      '온라인 예약 시스템',
      '메뉴 관리',
      '테이블 관리',
      '고객 알림',
      '실시간 업데이트',
      '리뷰 관리'
    ]
  },
  {
    id: 6,
    title: '헬스케어 랜딩페이지',
    category: 'landing',
    description: '의료 서비스를 위한 신뢰감 있는 랜딩페이지',
    image: '/images/portfolio/healthcare-landing.jpg',
    technologies: ['React', 'GSAP', 'Tailwind CSS', 'Next.js'],
    liveUrl: 'https://healthcare-demo.vercel.app',
    details: '의료 서비스의 전문성과 신뢰성을 강조한 랜딩페이지로, 환자들의 신뢰를 얻을 수 있도록 디자인했습니다. 접근성과 사용성을 고려한 인터페이스와 의료진 소개 및 온라인 상담 기능을 제공합니다.',
    features: [
      '신뢰성 강조 디자인',
      '서비스 소개',
      '의료진 소개',
      '온라인 상담 예약',
      '접근성 최적화',
      '환자 후기 시스템'
    ]
  },
  {
    id: 7,
    title: '교육 플랫폼',
    category: 'webapp',
    description: '온라인 강의와 학습 관리를 위한 교육 플랫폼',
    image: '/images/portfolio/education-platform.jpg',
    technologies: ['Next.js', 'MongoDB', 'Socket.io', 'Stripe'],
    liveUrl: 'https://education-demo.vercel.app',
    details: '학생과 강사를 위한 종합적인 온라인 교육 플랫폼입니다. 실시간 강의, 과제 제출, 성적 관리, 결제 시스템 등을 통합한 완전한 LMS(Learning Management System)입니다.',
    features: [
      '실시간 화상 강의',
      '과제 관리 시스템',
      '성적 관리',
      '결제 시스템',
      '학습 진도 추적',
      '커뮤니티 기능'
    ]
  },
  {
    id: 8,
    title: '포트폴리오 웹사이트',
    category: 'website',
    description: '크리에이터를 위한 개인 포트폴리오 웹사이트',
    image: '/images/portfolio/portfolio-website.jpg',
    technologies: ['Next.js', 'Sanity CMS', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://portfolio-demo.vercel.app',
    details: '디자이너와 개발자를 위한 개인 포트폴리오 웹사이트입니다. CMS를 통한 쉬운 컨텐츠 관리와 인상적인 애니메이션 효과로 방문자들에게 강한 인상을 남기도록 설계했습니다.',
    features: [
      'CMS 연동',
      '프로젝트 갤러리',
      '블로그 기능',
      '연락처 폼',
      '반응형 디자인',
      '인터랙티브 애니메이션'
    ]
  }
];

// 카테고리별 프로젝트 필터링 함수
export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return portfolioProjects;
  return portfolioProjects.filter(project => project.category === category);
};

// 특정 프로젝트 가져오기
export const getProjectById = (id: number) => {
  return portfolioProjects.find(project => project.id === id);
};

// 인기 프로젝트 가져오기 (예: 처음 3개)
export const getFeaturedProjects = (count: number = 3) => {
  return portfolioProjects.slice(0, count);
}; 