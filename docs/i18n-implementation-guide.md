# 다국어 지원 구현 가이드

## 📋 개요
현재 ryuin 프로젝트는 한국어 단일 언어로 구성되어 있습니다. 향후 글로벌 서비스 확장을 고려한 다국어 지원 구현 방안을 제시합니다.

## 🔍 현재 상황 분석

### ❌ 현재 구조의 문제점
```typescript
// 하드코딩된 텍스트 예시들
const slides = [
  {
    title: '성과를 만드는',           // 하드코딩
    subtitle: '웹사이트',            // 하드코딩
    description: '단순한 웹사이트가 아닌...' // 하드코딩
  }
];

// 메타데이터도 하드코딩
export const metadata: Metadata = {
  title: "ryuin - 성과를 만드는 웹사이트",
  description: "디지털의 바다에서 방향을 잃지 않는..."
};
```

### 📊 영향 범위
- **컴포넌트**: 모든 섹션 컴포넌트에 하드코딩된 텍스트
- **메타데이터**: SEO 정보가 한국어로만 설정
- **폼**: 입력 필드 라벨, 에러 메시지 등
- **네비게이션**: 메뉴 항목명
- **법적 페이지**: 이용약관, 개인정보처리방침

## 🚀 권장 구현 방안

### 1. next-intl 도입 (권장)
```bash
npm install next-intl
```

**장점:**
- App Router 완벽 지원
- Type-safe 번역
- 서버/클라이언트 컴포넌트 모두 지원
- 간단한 설정

**vs next-i18next:**
- next-i18next는 Pages Router 중심
- App Router 지원이 제한적

### 2. 프로젝트 구조 개편

```
├── src/
│   ├── app/
│   │   ├── [locale]/           # 언어별 라우팅
│   │   │   ├── layout.tsx      # 언어별 레이아웃
│   │   │   ├── page.tsx        # 언어별 메인 페이지
│   │   │   ├── terms/
│   │   │   └── privacy/
│   │   └── globals.css
│   ├── messages/               # 번역 리소스
│   │   ├── ko.json            # 한국어
│   │   ├── en.json            # 영어
│   │   ├── ja.json            # 일본어
│   │   └── zh.json            # 중국어
│   ├── lib/
│   │   └── i18n.ts            # i18n 설정
│   └── middleware.ts          # 언어 감지 미들웨어
```

### 3. 번역 리소스 구조

```json
// messages/ko.json
{
  "common": {
    "home": "홈",
    "about": "소개",
    "services": "서비스",
    "portfolio": "포트폴리오",
    "contact": "문의하기"
  },
  "hero": {
    "slides": {
      "performance": {
        "title": "성과를 만드는",
        "subtitle": "웹사이트",
        "description": "단순한 웹사이트가 아닌, 비즈니스 성공을 이끄는 웹사이트를 만들어드립니다."
      },
      "balance": {
        "title": "디자인과 기술의",
        "subtitle": "균형",
        "description": "아름다운 디자인과 견고한 기술력의 완벽한 조화로 최고의 결과물을 제공합니다."
      }
    }
  },
  "contact": {
    "form": {
      "name": "담당자명",
      "email": "이메일",
      "message": "문의내용",
      "submit": "문의하기",
      "sending": "전송 중...",
      "privacyConsent": "개인정보처리방침에 동의합니다."
    }
  },
  "metadata": {
    "title": "ryuin - 성과를 만드는 웹사이트",
    "description": "디지털의 바다에서 방향을 잃지 않는 정교한 웹 솔루션"
  }
}
```

```json
// messages/en.json
{
  "common": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "portfolio": "Portfolio",
    "contact": "Contact"
  },
  "hero": {
    "slides": {
      "performance": {
        "title": "Performance-Driven",
        "subtitle": "Websites",
        "description": "We create websites that drive business success, not just good-looking sites."
      }
    }
  },
  "metadata": {
    "title": "ryuin - Performance-Driven Websites",
    "description": "Precise web solutions that never lose direction in the digital ocean"
  }
}
```

### 4. 컴포넌트 리팩토링 예시

```typescript
// Before (하드코딩)
const HeroSection = () => {
  const slides = [
    {
      title: '성과를 만드는',
      subtitle: '웹사이트',
      description: '단순한 웹사이트가 아닌...'
    }
  ];
};

// After (다국어 지원)
import { useTranslations } from 'next-intl';

const HeroSection = () => {
  const t = useTranslations('hero');
  
  const slides = [
    {
      title: t('slides.performance.title'),
      subtitle: t('slides.performance.subtitle'),
      description: t('slides.performance.description')
    }
  ];
};
```

### 5. 라우팅 설정

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ko', 'en', 'ja', 'zh'],
  defaultLocale: 'ko',
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

### 6. Next.js 설정

```typescript
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  // 다른 설정들...
};

export default withNextIntl(nextConfig);
```

## 🎯 구현 단계별 로드맵

### Phase 1: 기반 구조 구축
1. `next-intl` 설치 및 설정
2. 미들웨어 구성
3. 언어별 라우팅 구조 생성
4. 기본 번역 리소스 파일 생성

### Phase 2: 핵심 컴포넌트 리팩토링
1. Header/Footer 다국어 적용
2. HeroSection 리팩토링
3. ContactSection 폼 다국어화
4. 메타데이터 다국어 지원

### Phase 3: 콘텐츠 번역 및 최적화
1. 전체 텍스트 번역 작업
2. 언어별 SEO 최적화
3. 언어 선택기 UI 구현
4. 번역 품질 검토

### Phase 4: 고도화
1. 언어별 폰트 최적화
2. RTL 언어 지원 (아랍어 등)
3. 언어별 이미지/미디어 지원
4. 성능 최적화

## 💡 현재 결정 사항

**당장 구현할 필요가 있는가?**
- 현재는 한국 시장 집중으로 보임
- 글로벌 진출 계획이 확실해지면 그때 구현 권장

**준비할 수 있는 것들:**
1. 텍스트 하드코딩을 constants 파일로 분리
2. 컴포넌트와 텍스트의 관심사 분리
3. 번역이 필요한 문자열 목록 정리

## 🔧 임시 개선안 (현재 적용 가능)

다국어 지원 전까지 텍스트 관리를 개선하는 방법:

```typescript
// src/lib/content.ts
export const CONTENT = {
  hero: {
    slides: [
      {
        title: '성과를 만드는',
        subtitle: '웹사이트',
        description: '단순한 웹사이트가 아닌, 비즈니스 성공을 이끄는 웹사이트를 만들어드립니다.'
      }
    ]
  },
  contact: {
    form: {
      name: '담당자명',
      email: '이메일',
      submit: '문의하기'
    }
  }
} as const;
```

이렇게 하면 나중에 다국어 지원할 때 구조 변경 없이 번역만 추가하면 됩니다.

## 📊 예상 작업량

### 초기 설정: 2-3일
- 패키지 설치 및 설정
- 기본 구조 구축
- 미들웨어 설정

### 컴포넌트 리팩토링: 5-7일
- 모든 컴포넌트의 텍스트 추출
- 번역 키 구조 설계
- 컴포넌트 수정

### 번역 작업: 3-5일 (언어당)
- 전문 번역가 협업 필요
- 브랜드 톤앤매너 유지
- 검토 및 수정

**총 예상 기간: 2-3주 (영어 1개 언어 기준)**

## ✅ 권장사항 요약

1. **현재**: 한국어 단일 언어로 유지
2. **준비**: 텍스트를 상수 파일로 분리하여 관리성 개선
3. **향후**: 글로벌 진출 확정 시 `next-intl` 도입
4. **우선순위**: 영어 → 일본어 → 중국어 순으로 확장 권장 