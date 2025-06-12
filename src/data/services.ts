// 서비스 섹션 데이터 관리
export const SERVICES_DATA = {
  // 메인 서비스 섹션 데이터
  title: 'OUR SERVICES',
  description: {
    main: '우리는 다양한 목적에 맞는 웹사이트를 제작합니다.',
    highlight: '반응형 웹, 쇼핑몰, 브랜드 사이트, 리디자인, 랜딩 페이지까지',
    detail: '기기 호환성과 사용성, 디자인 감각,\n마케팅 효과를 모두 고려해 설계합니다.'
  },
  
  // 서비스 상세 목록
  serviceList: [
    {
      id: 'responsive-web',
      title: '반응형 웹사이트',
      description: '모든 디바이스에서 최적화된 사용자 경험을 제공하는 반응형 웹사이트',
      features: ['모바일 최적화', 'SEO 최적화', '크로스 브라우저 호환'],
      price: '200만원~'
    },
    {
      id: 'ecommerce',
      title: '쇼핑몰 구축',
      description: '매출 증대를 위한 전문적인 전자상거래 솔루션',
      features: ['결제 시스템', '재고 관리', '주문 관리', '고객 관리'],
      price: '500만원~'
    },
    {
      id: 'brand-site',
      title: '브랜드 사이트',
      description: '브랜드 가치를 전달하는 프리미엄 기업 웹사이트',
      features: ['브랜드 아이덴티티', '인터랙티브 디자인', '콘텐츠 관리'],
      price: '300만원~'
    },
    {
      id: 'redesign',
      title: '웹사이트 리디자인',
      description: '기존 웹사이트의 사용성과 디자인을 현대적으로 개선',
      features: ['UI/UX 개선', '성능 최적화', '모던 디자인'],
      price: '150만원~'
    },
    {
      id: 'landing-page',
      title: '랜딩페이지',
      description: '높은 전환율을 목표로 하는 마케팅 특화 랜딩페이지',
      features: ['전환율 최적화', 'A/B 테스트', '분석 대시보드'],
      price: '100만원~'
    }
  ],

  // 서비스 프로세스
  process: [
    {
      step: 1,
      title: '상담 및 기획',
      description: '고객의 요구사항을 분석하고 최적의 솔루션을 제안합니다.',
      duration: '1-2주'
    },
    {
      step: 2,
      title: '디자인',
      description: '사용자 경험을 고려한 직관적이고 매력적인 디자인을 제작합니다.',
      duration: '2-3주'
    },
    {
      step: 3,
      title: '개발',
      description: '최신 기술을 활용하여 안정적이고 확장 가능한 웹사이트를 개발합니다.',
      duration: '3-4주'
    },
    {
      step: 4,
      title: '테스트 및 배포',
      description: '철저한 테스트를 통해 완성도를 높이고 안전하게 배포합니다.',
      duration: '1주'
    },
    {
      step: 5,
      title: '유지보수',
      description: '지속적인 관리와 업데이트를 통해 최적의 성능을 유지합니다.',
      duration: '지속적'
    }
  ],

  // 기술 스택
  techStack: {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    tools: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'],
    design: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator']
  }
} as const;

// 서비스 관련 유틸리티 함수들
export function getServiceById(id: string) {
  return SERVICES_DATA.serviceList.find(service => service.id === id);
}

export function getServicesByPriceRange(minPrice: number, maxPrice: number) {
  return SERVICES_DATA.serviceList.filter(service => {
    const price = parseInt(service.price.replace(/[^0-9]/g, ''));
    return price >= minPrice && price <= maxPrice;
  });
}

export function getAllServices() {
  return SERVICES_DATA.serviceList;
} 