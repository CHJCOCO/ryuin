# 개발 가이드 (DEV_GUIDE.md)

> ryuin 프로젝트 개발을 위한 완전한 가이드

## 📋 목차

- [개발 환경 설정](#개발-환경-설정)
- [프로젝트 명령어](#프로젝트-명령어)
- [환경 변수 설정](#환경-변수-설정)
- [개발 워크플로우](#개발-워크플로우)
- [디버깅 및 트러블슈팅](#디버깅-및-트러블슈팅)
- [성능 최적화](#성능-최적화)

## 🛠 개발 환경 설정

### 필수 요구사항

- **Node.js**: 18.17.0 이상
- **npm**: 9.0.0 이상
- **Git**: 최신 버전

### 설치 확인

```bash
node --version  # v18.17.0+
npm --version   # 9.0.0+
git --version   # 최신 버전
```

### IDE 설정 (VS Code 권장)

**필수 확장 프로그램:**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Prettier - Code formatter
- ESLint

**권장 설정 (settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 🎯 프로젝트 명령어

### 기본 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 타입 체크
npm run type-check

# 린트 체크
npm run lint

# 린트 자동 수정
npm run lint:fix
```

### 유용한 개발 명령어

```bash
# 새 컴포넌트 생성 (예시)
npm run create:component -- ComponentName

# 의존성 업데이트 확인
npm outdated

# 의존성 보안 취약점 확인
npm audit

# 캐시 정리
npm run clean
```

## ⚙️ 환경 변수 설정

### 개발 환경 (.env.local)

```bash
# EmailJS 설정
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Analytics 설정
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_id

# 개발용 설정
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENV=development
```

### EmailJS 설정 방법

1. [EmailJS 콘솔](https://dashboard.emailjs.com/)에서 계정 생성
2. 이메일 서비스 연결 (Gmail, Outlook 등)
3. 이메일 템플릿 생성:
   ```
   제목: {{subject}}
   
   발신자: {{from_name}} ({{from_email}})
   연락처: {{phone}}
   
   메시지:
   {{message}}
   ```

4. 환경 변수에 설정값 추가

### Analytics 설정 방법

**Google Analytics:**
1. [Google Analytics](https://analytics.google.com/) 계정 생성
2. GA4 속성 생성
3. 측정 ID 확인 (G-XXXXXXXXXX)
4. 환경 변수에 추가

**Microsoft Clarity:**
1. [Microsoft Clarity](https://clarity.microsoft.com/) 계정 생성
2. 프로젝트 생성
3. 프로젝트 ID 확인
4. 환경 변수에 추가

## 🔄 개발 워크플로우

### Git 브랜치 전략

```bash
main          # 프로덕션 배포 브랜치
├── develop   # 개발 통합 브랜치
├── feature/  # 새 기능 개발
├── bugfix/   # 버그 수정
└── hotfix/   # 긴급 수정
```

### 커밋 메시지 컨벤션

```bash
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경 (포맷팅, 세미콜론 등)
refactor: 코드 리팩토링
test: 테스트 코드 추가/수정
chore: 빌드 프로세스 또는 보조 도구 변경

# 예시
feat: 포트폴리오 필터링 기능 추가
fix: 모바일에서 메뉴 버그 수정
docs: README 설치 가이드 업데이트
```

### 코드 리뷰 체크리스트

- [ ] 타입스크립트 에러 없음
- [ ] ESLint 경고 없음
- [ ] 반응형 디자인 테스트 완료
- [ ] 접근성 가이드라인 준수
- [ ] 성능에 영향 없음
- [ ] 테스트 코드 작성 (해당 시)

## 🐛 디버깅 및 트러블슈팅

### 자주 발생하는 문제들

**1. 빌드 에러: Module not found**
```bash
# 해결: 캐시 정리 후 재설치
rm -rf .next node_modules package-lock.json
npm install
```

**2. 타입스크립트 에러: Cannot find module**
```bash
# 해결: 타입 선언 파일 확인
npm install --save-dev @types/node
```

**3. 이미지 최적화 에러**
```bash
# next.config.ts에서 이미지 도메인 설정
images: {
  domains: ['your-domain.com'],
}
```

### 디버깅 도구

**React Developer Tools:**
- 컴포넌트 상태 확인
- 프롭스 추적
- 성능 프로파일링

**Next.js 디버깅:**
```bash
# 상세한 빌드 정보 확인
npm run build -- --debug

# 번들 분석
npm run analyze
```

### 로그 확인

```typescript
// 개발 환경에서만 로그 출력
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

## ⚡ 성능 최적화

### 이미지 최적화

```tsx
import Image from 'next/image';

// 올바른 사용법
<Image
  src="/images/hero-bg.jpg"
  alt="Hero background"
  width={1920}
  height={1080}
  priority // 중요한 이미지는 priority 설정
  placeholder="blur" // 로딩 중 블러 효과
/>
```

### 코드 분할

```tsx
// 동적 import로 번들 크기 줄이기
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});
```

### 메모이제이션

```tsx
import { memo, useMemo, useCallback } from 'react';

// 컴포넌트 메모이제이션
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => /* 무거운 연산 */);
  }, [data]);

  const handleClick = useCallback(() => {
    // 핸들러 함수
  }, []);

  return <div>{/* 컴포넌트 내용 */}</div>;
});
```

### 성능 측정

```bash
# 라이트하우스 성능 측정
npm run lighthouse

# 번들 분석
npm run analyze

# 메모리 사용량 확인
node --inspect npm run dev
```

## 🔧 추가 설정

### 절대 경로 설정

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

### 환경별 설정

```typescript
// src/lib/env.ts
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
```

## 📞 개발 지원

개발 관련 문의사항이 있으시면:

- **기술 문의**: dev@ryuin.studio
- **버그 리포트**: [GitHub Issues](https://github.com/ryuin/ryuin-website/issues)
- **기능 요청**: [GitHub Discussions](https://github.com/ryuin/ryuin-website/discussions)

---

**Happy Coding! 🚀** 