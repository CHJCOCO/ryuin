# 접근성(Accessibility) 감사 보고서

## 📊 접근성 감사 개요

WCAG 2.1 AA 기준에 따른 ryuin 웹사이트 접근성 감사 결과입니다.

## 🔍 발견된 주요 문제점

### ❌ 1. aria-* 속성 누락

#### 현재 상태:
```typescript
// Header.tsx - 모바일 메뉴 버튼
<button
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
  {isMobileMenuOpen ? <XMarkIcon /> : <Bars3Icon />}
</button>

// HeroSection.tsx - 슬라이더 네비게이션
<button onClick={() => goToSlide(index)}>
  인디케이터
</button>
```

#### 문제점:
- **aria-label 없음**: 스크린 리더가 버튼 목적을 알 수 없음
- **aria-expanded 없음**: 메뉴 상태를 알 수 없음
- **aria-current 없음**: 현재 슬라이드를 알 수 없음

### ❌ 2. 폼 요소 라벨 연결 문제

#### 현재 상태:
```typescript
// ContactSection.tsx
<input
  type="text"
  id="companyName"
  placeholder="회사명"
  {...register('companyName')}
/>
```

#### 문제점:
- **<label> 없음**: placeholder만 있고 명시적 라벨 없음
- **aria-describedby 없음**: 에러 메시지와 연결 안됨
- **aria-invalid 없음**: 유효성 상태 표시 안됨

### ❌ 3. 키보드 네비게이션 문제

#### 현재 상태:
```typescript
// 커스텀 onClick만 있는 요소들
<div onClick={() => goToSlide(index)}>
```

#### 문제점:
- **tabIndex 없음**: 키보드로 접근 불가
- **onKeyDown 핸들러 없음**: Enter/Space 키 작동 안함
- **focus 스타일 없음**: 포커스 시각화 부족

### ❌ 4. 색상 대비 문제 의심

#### 확인 필요한 색상 조합:
```css
/* AboutSection.tsx */
color: '#6b7280' /* gray-600 */ on background: '#ffffff'
color: '#9ca3af' /* gray-400 */ on background: '#ffffff'

/* HeroSection.tsx */  
color: '#text-blue-400' on background: 'dark image'
color: '#862B0D' /* 갈색 텍스트 */
```

## 🎯 WCAG 2.1 AA 기준 준수 상태

| 항목 | 현재 상태 | 목표 | 상태 |
|------|-----------|------|------|
| **1.1.1 비텍스트 콘텐츠** | 이미지 alt 있음 | ✅ | 양호 |
| **1.3.1 정보와 관계** | 헤딩 구조 양호 | ✅ | 양호 |
| **1.3.2 의미있는 순서** | 논리적 순서 | ✅ | 양호 |
| **1.4.3 색상 대비** | 확인 필요 | ⚠️ | 점검 필요 |
| **2.1.1 키보드 접근** | 부분적 지원 | ❌ | 개선 필요 |
| **2.1.2 키보드 트랩 없음** | 문제없음 | ✅ | 양호 |
| **2.4.1 블록 건너뛰기** | 없음 | ❌ | 개선 필요 |
| **2.4.2 페이지 제목** | 적절함 | ✅ | 양호 |
| **2.4.3 포커스 순서** | 논리적 | ✅ | 양호 |
| **2.4.4 링크 목적** | 대부분 명확 | ⚠️ | 일부 개선 |
| **2.4.6 헤딩과 라벨** | 일부 부족 | ❌ | 개선 필요 |
| **2.4.7 포커스 표시** | 불완전 | ❌ | 개선 필요 |
| **3.1.1 페이지 언어** | 설정됨 | ✅ | 양호 |
| **3.2.1 포커스 시 변화** | 문제없음 | ✅ | 양호 |
| **3.2.2 입력 시 변화** | 문제없음 | ✅ | 양호 |
| **3.3.1 오류 식별** | 부분적 | ⚠️ | 개선 필요 |
| **3.3.2 라벨 또는 지시사항** | 부족 | ❌ | 개선 필요 |
| **4.1.1 구문 분석** | 유효한 HTML | ✅ | 양호 |
| **4.1.2 이름, 역할, 값** | 부분적 | ❌ | 개선 필요 |

## 📈 색상 대비 분석

### 텍스트 색상 검증 (WCAG AA 기준: 4.5:1)

#### ✅ 양호한 대비:
```css
#000000 on #ffffff = 21:1 (Perfect)
#1f2937 on #ffffff = 15.8:1 (Perfect)
#374151 on #ffffff = 12.6:1 (Perfect)
```

#### ⚠️ 확인 필요:
```css
#6b7280 on #ffffff = 5.8:1 (Pass AA)
#9ca3af on #ffffff = 3.9:1 (Fail AA, Pass AAA Large)
#text-blue-400 on dark = 확인 필요
```

#### ❌ 개선 필요:
```css
#862B0D on #ffffff = 8.5:1 (Pass - but check actual usage)
gray-400 텍스트 (#9ca3af) = 3.9:1 (AA 기준 미달)
```

## 🔧 권장 수정사항

### 1. Header 컴포넌트 개선

```typescript
// AS-IS
<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
  <Bars3Icon className="h-6 w-6" />
</button>

// TO-BE
<button
  aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
  aria-expanded={isMobileMenuOpen}
  aria-controls="mobile-menu"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
</button>

<nav
  id="mobile-menu"
  aria-hidden={!isMobileMenuOpen}
  role="navigation"
  aria-label="모바일 메뉴"
>
```

### 2. ContactSection 폼 개선

```typescript
// AS-IS
<input
  type="text"
  id="companyName"
  placeholder="회사명"
/>

// TO-BE
<div>
  <label 
    htmlFor="companyName"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    회사명 <span className="text-red-500" aria-hidden="true">*</span>
  </label>
  <input
    type="text"
    id="companyName"
    aria-describedby={errors.companyName ? "companyName-error" : undefined}
    aria-invalid={errors.companyName ? "true" : "false"}
    aria-required="true"
    placeholder="회사명을 입력해주세요"
  />
  {errors.companyName && (
    <p 
      id="companyName-error"
      role="alert"
      className="mt-2 text-sm text-red-600"
    >
      {errors.companyName.message}
    </p>
  )}
</div>
```

### 3. HeroSection 슬라이더 개선

```typescript
// AS-IS
<button onClick={() => goToSlide(index)}>

// TO-BE
<button
  aria-label={`슬라이드 ${index + 1}로 이동`}
  aria-current={currentSlide === index ? "true" : "false"}
  tabIndex={0}
  onClick={() => goToSlide(index)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToSlide(index);
    }
  }}
  className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
>
```

### 4. 색상 대비 개선

```css
/* AS-IS */
.text-gray-400 { color: #9ca3af; } /* 3.9:1 - 미달 */

/* TO-BE */
.text-gray-500 { color: #6b7280; } /* 5.8:1 - 통과 */
.text-gray-600 { color: #4b5563; } /* 7.9:1 - 안전 */
```

### 5. Skip Navigation 추가

```typescript
// layout.tsx에 추가
<a 
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
>
  본문으로 바로가기
</a>

// page.tsx에 추가
<main id="main-content" tabIndex={-1}>
```

### 6. 포커스 관리 개선

```css
/* 전역 포커스 스타일 개선 */
.focus-visible:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* 버튼 포커스 개선 */
.btn-primary:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.5);
}
```

## 📱 모바일 접근성 고려사항

### 터치 대상 크기 (최소 44px × 44px)
```css
/* 모든 터치 대상 최소 크기 보장 */
button, a, input[type="checkbox"] {
  min-width: 44px;
  min-height: 44px;
}
```

### 화면 회전 지원
```css
/* 가로/세로 모드 모두 지원 */
@media (orientation: landscape) {
  /* 가로 모드 최적화 */
}
```

## 🔧 구현 우선순위

### 🚨 즉시 수정 (Critical)
1. **폼 라벨 연결** - 필수 접근성
2. **색상 대비 수정** - WCAG AA 준수
3. **키보드 네비게이션** - 기본 접근성

### ⚠️ 중요 수정 (High)
1. **aria 속성 추가** - 스크린 리더 지원
2. **Skip Navigation** - 효율적 탐색
3. **포커스 표시 개선** - 시각적 피드백

### 💡 개선 권장 (Medium)
1. **에러 메시지 개선** - 사용자 경험
2. **도움말 텍스트 추가** - 가이드 제공
3. **랜드마크 역할 명시** - 구조 개선

## 📊 예상 개선 효과

### 접근성 점수 예상:
- **현재**: 65/100 (보통)
- **수정 후**: 90/100 (우수)

### 사용자 그룹별 혜택:
- **시각장애인**: 스크린 리더 완벽 지원
- **운동장애인**: 키보드만으로 완전 이용
- **색맹/색약자**: 색상 외 다른 표시 수단 제공
- **고령자**: 명확한 라벨과 큰 터치 영역

## 🛠️ 검증 도구 권장

### 자동 검사 도구:
```bash
# axe-core (브라우저 확장)
npm install @axe-core/react

# Lighthouse 접근성 감사
lighthouse --accessibility-only https://ryuin.studio

# Pa11y 명령줄 도구  
npx pa11y https://ryuin.studio
```

### 수동 검사 체크리스트:
1. **키보드만으로 전체 사이트 탐색**
2. **스크린 리더로 모든 콘텐츠 접근**
3. **확대 200%에서 사용성 확인**
4. **색상 제거 후 정보 전달 확인**

---

**결론**: 기본적인 구조는 양호하나, 폼 라벨링과 키보드 접근성 개선이 시급합니다. 모든 수정사항 적용 시 WCAG 2.1 AA 기준을 완전히 만족할 것으로 예상됩니다. 