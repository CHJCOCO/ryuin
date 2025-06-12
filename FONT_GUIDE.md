# 폰트 변경 가이드

## 📝 개요
이 프로젝트는 폰트 변경이 쉽도록 체계적으로 구성되어 있습니다.

## 🎯 폰트 변경 방법

### 1. Google Fonts 변경하기
`src/app/layout.tsx` 파일에서 Google Fonts를 변경할 수 있습니다:

```typescript
// 현재 설정
import { Inter, Noto_Sans_KR } from "next/font/google";

// 다른 폰트로 변경 예시
import { Roboto, Nanum_Gothic } from "next/font/google";
```

### 2. CSS 변수에서 폰트 우선순위 변경하기
`src/app/globals.css` 파일의 `:root` 섹션에서 폰트 우선순위를 변경:

```css
:root {
  /* 주 폰트 - 본문에 사용 */
  --font-primary: var(--font-noto-sans-kr), 'LeeSeoyunB', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  
  /* 보조 폰트 - 영문에 주로 사용 */
  --font-secondary: var(--font-inter), -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  
  /* 강조 폰트 - 특별한 텍스트에 사용 */
  --font-accent: 'MaruBuri', var(--font-noto-sans-kr), sans-serif;
  
  /* 제목 폰트 - 대제목에 사용 */
  --font-display: 'KOTRA', var(--font-noto-sans-kr), sans-serif;
}
```

### 3. 로컬 폰트 추가하기
1. 폰트 파일을 `public/fonts/` 폴더에 추가
2. `globals.css`에 `@font-face` 규칙 추가:

```css
@font-face {
  font-family: '새폰트이름';
  src: url('/fonts/새폰트파일.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

## 🎨 사용 가능한 폰트 클래스

컴포넌트에서 다음 클래스들을 사용할 수 있습니다:

```html
<!-- 기본 폰트 (자동 적용) -->
<p>일반 텍스트</p>

<!-- 보조 폰트 -->
<p className="font-secondary">영문 위주 텍스트</p>

<!-- 강조 폰트 -->
<p className="font-accent">특별한 텍스트</p>

<!-- 제목용 폰트 -->
<h1 className="font-display">큰 제목</h1>
```

## 📁 현재 사용 가능한 폰트들

### Google Fonts
- **Noto Sans KR**: 한글 메인 폰트
- **Inter**: 영문 메인 폰트

### 로컬 폰트들
- **LeeSeoyunB**: 이순신돋움체 볼드
- **MaruBuri**: 마루부리 레귤러  
- **KOTRA**: 코트라 볼드

## ⚡ 빠른 폰트 변경

전체 사이트의 기본 폰트를 바꾸고 싶다면:

1. `globals.css`에서 `--font-primary` 값만 변경
2. 예시: `--font-primary: 'MaruBuri', sans-serif;`

특정 섹션의 폰트만 바꾸고 싶다면:

1. 해당 컴포넌트에 `font-accent` 또는 `font-display` 클래스 추가
2. 또는 인라인 스타일로 `style={{fontFamily: 'var(--font-accent)'}}` 사용

## 🔧 트러블슈팅

### 폰트가 적용되지 않는 경우
1. 브라우저 캐시 새로고침 (Ctrl+F5)
2. 폰트 파일 경로 확인
3. `font-display: swap` 설정 확인
4. Next.js 개발 서버 재시작

### 성능 최적화
- 사용하지 않는 폰트 파일 제거
- Google Fonts는 필요한 weight만 로드
- `font-display: swap` 사용으로 렌더링 차단 방지 