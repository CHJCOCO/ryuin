// 홈페이지 메인 섹션 데이터 관리
export const HOME_DATA = {
  // 메인 슬로건 및 소개
  hero: {
    mainSlogan: '성과를 만드는 웹사이트',
    subSlogan: '디지털의 바다에서 방향을 잃지 않는 정교한 웹 솔루션',
    description:
      '디자인과 기술의 균형으로 비즈니스 성공을 이끄는 지속 가능한 웹사이트를 구축합니다.',

    // 캐치프레이즈 리스트
    catchphrases: [
      '웹사이트 제작, 어렵지 않아요.',
      '당신의 비즈니스를 디지털로 확장하세요.',
      '사용자가 머물고 싶어하는 웹사이트를 만듭니다.',
      '성과로 증명하는 웹 솔루션.',
    ],

    // CTA 버튼 텍스트
    ctaButtons: {
      primary: '프로젝트 시작하기',
      secondary: '포트폴리오 보기',
    },
  },

  // 핵심 서비스 (Hero 섹션용)
  coreServices: [
    {
      id: 'responsive',
      title: '반응형 웹사이트',
      description:
        '모든 기기에서 완벽하게 작동하는 반응형 디자인으로 사용자 경험을 극대화합니다.',
      icon: 'responsive', // 아이콘 식별자
      features: ['모바일 우선 설계', '크로스 브라우저 호환', 'SEO 최적화'],
    },
    {
      id: 'ecommerce',
      title: '쇼핑몰 & 전자상거래',
      description:
        '매출 증대를 위한 전문적인 온라인 쇼핑 플랫폼을 제공합니다.',
      icon: 'shopping',
      features: ['결제 연동', '재고 관리', '주문 시스템', '고객 관리'],
    },
    {
      id: 'branding',
      title: '브랜드 웹사이트',
      description:
        '브랜드 가치를 효과적으로 전달하는 프리미엄 기업 웹사이트를 구축합니다.',
      icon: 'branding',
      features: ['브랜드 아이덴티티', '스토리텔링', '인터랙티브 디자인'],
    },
    {
      id: 'landing',
      title: '랜딩페이지',
      description:
        '높은 전환율을 목표로 하는 마케팅 특화 랜딩페이지를 제작합니다.',
      icon: 'landing',
      features: ['전환율 최적화', 'A/B 테스트', '분석 연동'],
    },
  ],

  // 메인 강점 포인트
  strengths: [
    {
      title: '전문성',
      description: '5년 이상의 웹 개발 경험과 다양한 프로젝트 노하우',
      metric: '100+',
      metricLabel: '완성 프로젝트',
    },
    {
      title: '속도',
      description: '빠른 개발 프로세스와 효율적인 프로젝트 관리',
      metric: '30일',
      metricLabel: '평균 완성 기간',
    },
    {
      title: '성과',
      description: '클라이언트 비즈니스 성장에 직접적으로 기여하는 결과',
      metric: '98%',
      metricLabel: '고객 만족도',
    },
    {
      title: '지속성',
      description: '완성 후에도 지속적인 관리와 업데이트 서비스',
      metric: '24/7',
      metricLabel: '기술 지원',
    },
  ],

  // 브랜드 가치 및 철학
  values: {
    vision: '디지털 혁신을 통해 모든 비즈니스가 성공할 수 있도록 돕는 것',
    mission:
      '기술과 디자인의 완벽한 조화로 사용자와 비즈니스 모두에게 가치를 제공',
    philosophy: [
      '사용자 중심의 디자인',
      '지속 가능한 기술 선택',
      '투명하고 협력적인 소통',
      '완성도에 대한 책임감',
    ],
  },

  // 통계 및 수치
  statistics: {
    experience: '5+ 년',
    projects: '100+ 개',
    clients: '50+ 명',
    satisfaction: '98%',
    responsiveDesign: '100%',
    onTimeDelivery: '95%',
  },
} as const;

// About 섹션 데이터
export const ABOUT_DATA = {
  title: 'ABOUT RYUIN',
  subtitle: '디지털 솔루션의 새로운 기준',

  introduction: {
    main: 'ryuin은 웹사이트 제작의 새로운 패러다임을 제시합니다.',
    detail:
      '단순한 웹사이트 제작을 넘어, 비즈니스 성장을 위한 디지털 전략 파트너로서 고객과 함께합니다. 최신 기술과 검증된 방법론을 통해 사용자 경험과 비즈니스 목표를 동시에 달성하는 웹 솔루션을 제공합니다.',
  },

  approach: {
    title: '우리의 접근 방식',
    points: [
      {
        title: '사용자 중심 설계',
        description:
          '실제 사용자의 행동 패턴과 니즈를 분석하여 직관적이고 편리한 인터페이스를 설계합니다.',
      },
      {
        title: '성과 기반 개발',
        description:
          '단순한 기능 구현이 아닌, 비즈니스 목표 달성을 위한 전략적 개발을 진행합니다.',
      },
      {
        title: '지속적인 협력',
        description:
          '프로젝트 완료 후에도 지속적인 개선과 성장을 위한 파트너십을 유지합니다.',
      },
    ],
  },

  team: {
    title: '전문 팀',
    description: '각 분야의 전문가들이 모여 최고의 결과물을 만들어냅니다.',
    expertise: [
      'UI/UX 디자인',
      '프론트엔드 개발',
      '백엔드 개발',
      'SEO & 마케팅',
      '프로젝트 관리',
    ],
  },
} as const;

// 유틸리티 함수들
export function getServiceById(id: string) {
  return HOME_DATA.coreServices.find((service) => service.id === id);
}

export function getCatchphrase(index?: number) {
  if (index !== undefined) {
    return (
      HOME_DATA.hero.catchphrases[index] || HOME_DATA.hero.catchphrases[0]
    );
  }
  // 랜덤하게 하나 선택
  const randomIndex = Math.floor(
    Math.random() * HOME_DATA.hero.catchphrases.length
  );
  return HOME_DATA.hero.catchphrases[randomIndex];
}

export function getStatistic(key: keyof typeof HOME_DATA.statistics) {
  return HOME_DATA.statistics[key];
} 