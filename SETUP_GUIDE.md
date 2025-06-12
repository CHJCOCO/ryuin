# ryuin 프로젝트 설정 가이드

이 가이드는 ryuin 웹사이트 프로젝트의 초기 설정과 데이터 관리 방법에 대해 설명합니다.

## 📋 목차

- [환경 변수 설정](#환경-변수-설정)
- [데이터 관리 구조](#데이터-관리-구조)
- [컨텐츠 수정 방법](#컨텐츠-수정-방법)
- [보안 설정](#보안-설정)

## 🔧 환경 변수 설정

### 1. 환경 변수 파일 생성

```bash
# env.example 파일을 .env.local로 복사
cp env.example .env.local
```

### 2. 필수 환경 변수 설정

`.env.local` 파일에서 다음 값들을 실제 값으로 변경하세요:

#### 📧 EmailJS 설정
1. [EmailJS](https://emailjs.com) 계정 생성
2. 서비스 및 템플릿 생성
3. 다음 값들을 발급받아 설정:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

#### 📊 분석 도구 설정

**Google Analytics 4:**
1. [Google Analytics](https://analytics.google.com) 계정 생성
2. GA4 속성 생성 및 측정 ID 발급
3. 환경 변수 설정:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Microsoft Clarity:**
1. [Microsoft Clarity](https://clarity.microsoft.com) 계정 생성
2. 프로젝트 생성 및 ID 발급
3. 환경 변수 설정:
```env
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id
```

#### 📞 연락처 정보
실제 비즈니스 정보로 변경:
```env
NEXT_PUBLIC_CONTACT_EMAIL=your_email@domain.com
NEXT_PUBLIC_CONTACT_PHONE=010-0000-0000
NEXT_PUBLIC_BUSINESS_ADDRESS=실제 주소
NEXT_PUBLIC_BUSINESS_HOURS=운영 시간
```

#### 📱 소셜 미디어 링크
실제 소셜 미디어 계정으로 변경:
```env
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/your_account
NEXT_PUBLIC_GITHUB_URL=https://github.com/your_account
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/your_account
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/your_account
```

## 📁 데이터 관리 구조

프로젝트의 모든 콘텐츠 데이터는 `src/data/` 폴더에서 관리됩니다.

### 데이터 파일 구조
```
src/data/
├── home.ts          # 홈페이지 메인 콘텐츠
├── services.ts      # 서비스 관련 데이터
├── portfolio.ts     # 포트폴리오 데이터
└── testimonials.ts  # 고객 후기 데이터
```

### 각 파일의 역할

#### `home.ts` - 홈페이지 콘텐츠
- 메인 슬로건 및 캐치프레이즈
- 핵심 서비스 소개
- 브랜드 가치 및 철학
- 통계 및 성과 지표

#### `services.ts` - 서비스 정보
- 서비스 목록 및 설명
- 가격 정보
- 서비스 프로세스
- 기술 스택

#### `portfolio.ts` - 포트폴리오
- 프로젝트 정보
- 카테고리별 분류
- 기술 스택 및 링크

#### `testimonials.ts` - 고객 후기
- 고객 리뷰 및 평점
- 고객 정보

## ✏️ 컨텐츠 수정 방법

### 1. 홈페이지 메인 문구 수정

`src/data/home.ts` 파일에서:

```typescript
export const HOME_DATA = {
  hero: {
    mainSlogan: '여기서 메인 슬로건 수정',
    subSlogan: '여기서 서브 슬로건 수정',
    description: '여기서 상세 설명 수정',
    // ...
  }
}
```

### 2. 서비스 정보 수정

`src/data/services.ts` 파일에서:

```typescript
export const SERVICES_DATA = {
  description: {
    main: '메인 서비스 설명 수정',
    highlight: '강조할 서비스 목록',
    detail: '상세 설명'
  },
  serviceList: [
    {
      title: '서비스 제목',
      description: '서비스 설명',
      price: '가격 정보'
    }
    // 서비스 추가/수정/삭제
  ]
}
```

### 3. 연락처 정보 수정

환경 변수(`.env.local`)에서 수정:
```env
NEXT_PUBLIC_CONTACT_EMAIL=새로운이메일@domain.com
NEXT_PUBLIC_CONTACT_PHONE=새로운전화번호
```

또는 `src/lib/constants.ts`에서 기본값 변경 가능

## 🔒 보안 설정

### 1. 환경 변수 보안

- ✅ `.env.local` 파일이 `.gitignore`에 포함되어 있는지 확인
- ✅ 민감한 정보는 반드시 환경 변수로 관리
- ❌ API 키나 비밀번호를 코드에 직접 작성하지 않기

### 2. 프로덕션 배포 시

**Vercel 배포 시:**
1. Vercel 대시보드에서 Environment Variables 설정
2. 모든 `NEXT_PUBLIC_*` 변수들을 설정
3. 민감한 정보는 `NEXT_PUBLIC_` 접두사 없이 설정

**기타 플랫폼:**
- 각 플랫폼의 환경 변수 설정 방법에 따라 설정
- 빌드 시 환경 변수가 올바르게 로드되는지 확인

## 🚀 개발 시작하기

1. **환경 변수 설정 완료 후:**
```bash
npm install
npm run dev
```

2. **컨텐츠 수정 후:**
- 브라우저에서 즉시 확인 가능
- 핫 리로딩으로 변경사항 자동 반영

3. **프로덕션 빌드 테스트:**
```bash
npm run build
npm run start
```

## 🆘 문제 해결

### 환경 변수가 로드되지 않을 때
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 변수명에 오타가 없는지 확인
3. 개발 서버 재시작: `npm run dev`

### EmailJS가 작동하지 않을 때
1. EmailJS 서비스/템플릿 설정 확인
2. 환경 변수 값이 올바른지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### Analytics가 수집되지 않을 때
1. GA4 측정 ID가 올바른지 확인
2. 프로덕션 환경에서만 작동하는지 확인
3. 브라우저의 광고 차단기 설정 확인

## 📞 지원

문제가 지속될 경우:
- 이슈 생성: [GitHub Issues](링크)
- 이메일 문의: your-email@domain.com

---

> 💡 **팁:** 정기적으로 환경 변수와 API 키를 업데이트하여 보안을 유지하세요. 