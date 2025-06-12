# 스타일 가이드 (STYLE_GUIDE.md)

> ryuin 프로젝트의 디자인 시스템 및 스타일 가이드

## 📋 목차

- [디자인 시스템](#디자인-시스템)
- [색상 팔레트](#색상-팔레트)
- [타이포그래피](#타이포그래피)
- [컴포넌트 규칙](#컴포넌트-규칙)
- [레이아웃 가이드](#레이아웃-가이드)
- [애니메이션 가이드](#애니메이션-가이드)
- [반응형 디자인](#반응형-디자인)

## 🎨 디자인 시스템

### 핵심 디자인 원칙

1. **간결함**: 불필요한 요소 제거, 핵심 메시지에 집중
2. **일관성**: 전체 페이지에서 동일한 스타일 언어
3. **접근성**: 모든 사용자가 이용할 수 있는 디자인
4. **성능**: 빠른 로딩과 부드러운 사용자 경험

### 브랜드 아이덴티티

- **브랜드 컬러**: 깔끔하고 전문적인 블루 톤
- **브랜드 성격**: 신뢰감, 전문성, 혁신
- **톤앤매너**: 친근하지만 전문적

## 🌈 색상 팔레트 (실제 사용 색상)

### 브랜드 주요 색상

```css
/* 실제 사용되는 주요 색상 */
#0891b2         /* 강조 색상 (cyan-600) - RYUIN 브랜드 색상 */
#2563eb         /* 링크 색상 (blue-600) */
#1e3a8a         /* 네이비 색상 (blue-800) */
#ED4078         /* 강조 포인트 (핑크) */
```

**실제 사용 예시:**
```tsx
// 브랜드 강조 텍스트 (About 섹션)
<span style={{ color: '#0891b2' }}>하이라이트 텍스트</span>

// 서비스 섹션 애니메이션 텍스트 
<div style={{ color: '#0891b2' }}>RYUIN RYUIN RYUIN</div>

// 링크 호버 효과
<a className="hover:text-blue-600">링크</a>

// 특별 강조 (About 섹션)
<span style={{ color: '#ED4078' }}>전달력이 분명한 구조</span>
```

### 텍스트 색상 (실제 사용)

```css
/* About 섹션에서 정의된 색상 테마 */
#1f2937         /* 기본 텍스트 (gray-900) */
#6b7280         /* 보조 텍스트 (gray-600) */
#9ca3af         /* 3차 텍스트 (gray-400) */
#ffffff         /* 흰색 텍스트 */
#5d5c62         /* 메인 브랜드 색상 */
#8b8a91         /* 연한 브랜드 색상 */
#3a3940         /* 진한 브랜드 색상 */
```

### 배경 색상

```css
/* 실제 사용되는 배경 */
.bg-white           /* 기본 배경 */
.bg-gray-50         /* 섹션 배경 (포트폴리오) */
.bg-black/60        /* Hero 오버레이 */
.bg-black/40        /* 포트폴리오 오버레이 */
.bg-white/95        /* 헤더 반투명 배경 */
.bg-white/20        /* 네비게이션 버튼 */
```

### 그라데이션 (실제 사용)

```css
/* 코어 서비스 카드 배경 */
background: linear-gradient(135deg, rgb(243, 218, 216) 0%, rgb(245, 241, 210) 100%);

/* 버튼 그라데이션 (globals.css) */
background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #5b21b6 100%);

/* 제목 텍스트 그라데이션 */
background: linear-gradient(135deg, #6b7280, #374151, #9ca3af);
```

### 테마별 색상 (Footer)

```css
/* Light 테마 */
.light-theme {
  container: 'bg-white border-t border-gray-200',
  text: 'text-gray-900',
  textMuted: 'text-gray-600',
  hover: 'hover:text-blue-600',
}

/* Dark 테마 */
.dark-theme {
  container: 'bg-gray-900 border-t border-gray-800',
  text: 'text-white',
  textMuted: 'text-gray-300',
  hover: 'hover:text-blue-400',
}
```

## 📝 타이포그래피 (실제 사용 폰트)

### 폰트 패밀리 (실제 구현)

```css
/* CSS 변수로 정의된 폰트 (globals.css) */
--font-primary: var(--font-noto-sans-kr), 'LeeSeoyunB', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-secondary: var(--font-inter), -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-accent: 'MaruBuri', var(--font-noto-sans-kr), sans-serif;
--font-display: 'KOTRA', var(--font-noto-sans-kr), sans-serif;

/* 실제 사용되는 폰트 */
Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif  /* 대부분의 텍스트 */
NanumSquareRoundEB  /* 서비스 섹션 제목 */
'SF Pro Display', 'Helvetica Neue'  /* 숫자 (코어 서비스) */
```

### 헤딩 스타일 (실제 구현)

```tsx
// Hero 섹션 메인 타이틀 
<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
    style={{
      fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontWeight: '700',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
    }}>

// About 섹션 제목
<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed"
    style={{
      fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      lineHeight: '1.6'
    }}>

// 포트폴리오 섹션 대제목
<h2 className="text-4xl md:text-5xl lg:text-6xl font-black gradient-text">
  PORTFOLIO
</h2>

// Footer 브랜드명
<h2 className="font-bold text-xl"
    style={{
      fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontWeight: '800'
    }}>
```

### 본문 텍스트 (실제 구현)

```tsx
// Hero 섹션 설명
<p className="text-lg md:text-xl text-gray-200 font-medium"
   style={{
     fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
     fontWeight: '500',
     textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
   }}>

// About 섹션 본문
<p className="text-base md:text-lg text-gray-600 leading-relaxed"
   style={{
     fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
     lineHeight: '1.8'
   }}>

// 서비스 설명 (특별한 폰트)
<div className="service-description">
  style: font-family: 'NanumSquareRoundEB', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
         font-weight: 800;
</div>

// 코어 서비스 제목
<h3 style={{
     fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
     fontWeight: '600',
     letterSpacing: '-0.01em',
     lineHeight: '1.3'
   }}>
```

### 폰트 가중치 시스템

```css
/* 실제 사용되는 font-weight */
font-weight: 300;    /* 얇은 폰트 (숫자 표시용) */
font-weight: 400;    /* 기본 본문 */
font-weight: 500;    /* 중간 가중치 (Hero 설명) */
font-weight: 600;    /* 세미볼드 (카드 제목) */
font-weight: 700;    /* 볼드 (헤딩) */
font-weight: 800;    /* 매우 볼드 (브랜드명, 서비스 설명) */
font-weight: 900;    /* 블랙 (font-black) */
```

### 로컬 폰트 파일들

```css
/* public/fonts/ 폴더의 실제 파일들 */
- Pretendard-Regular.otf
- Pretendard-SemiBold.otf  
- Pretendard-Bold.otf
- NanumSquareRoundEB.ttf
- LeeSeoyunB.ttf
- MaruBuri-Regular.ttf
- MaruBuri-SemiBold.ttf
- MaruBuri-Bold.ttf
- KOTRA_BOLD.ttf
- JalnanGothicTTF.ttf
```

## 🧩 컴포넌트 규칙

### 버튼 컴포넌트

```tsx
// Primary 버튼
<button className="
  bg-blue-600 hover:bg-blue-700 
  text-white font-semibold 
  px-6 py-3 rounded-lg 
  transition-colors duration-200
  focus:outline-none focus:ring-4 focus:ring-blue-300
">
  Primary Button
</button>

// Secondary 버튼
<button className="
  bg-transparent hover:bg-blue-50 
  text-blue-600 font-semibold 
  px-6 py-3 rounded-lg border-2 border-blue-600
  transition-colors duration-200
">
  Secondary Button
</button>

// Ghost 버튼
<button className="
  bg-transparent hover:bg-gray-100 
  text-gray-700 font-medium 
  px-4 py-2 rounded-md 
  transition-colors duration-200
">
  Ghost Button
</button>
```

### 카드 컴포넌트

```tsx
<div className="
  bg-white rounded-lg shadow-lg 
  p-6 hover:shadow-xl 
  transition-shadow duration-300
  border border-gray-100
">
  <h3 className="text-xl font-semibold text-gray-800 mb-3">
    카드 제목
  </h3>
  <p className="text-gray-600 leading-relaxed">
    카드 내용
  </p>
</div>
```

### 입력 필드

```tsx
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    라벨
  </label>
  <input 
    type="text"
    className="
      w-full px-4 py-3 
      border border-gray-300 rounded-lg 
      focus:ring-4 focus:ring-blue-300 focus:border-blue-500
      transition-colors duration-200
    "
    placeholder="플레이스홀더"
  />
</div>
```

## 📐 레이아웃 가이드

### 그리드 시스템

```tsx
// 컨테이너
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  
  // 2열 그리드
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>컨텐츠 1</div>
    <div>컨텐츠 2</div>
  </div>
  
  // 3열 그리드
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div>컨텐츠 1</div>
    <div>컨텐츠 2</div>
    <div>컨텐츠 3</div>
  </div>
</div>
```

### 간격 (Spacing)

```css
/* 섹션 간격 */
.py-16 md:py-24    /* 섹션 상하 패딩 */

/* 컴포넌트 간격 */
.mb-6              /* 제목 하단 마진 */
.mb-4              /* 일반 요소 마진 */
.mb-2              /* 작은 요소 마진 */

/* 내부 패딩 */
.p-6               /* 카드 내부 패딩 */
.px-4 py-2         /* 버튼 패딩 */
```

## 🎬 애니메이션 가이드 (실제 구현)

### Framer Motion 애니메이션 (실제 사용)

```tsx
// Hero 섹션 타이핑 애니메이션 타이밍
useEffect(() => {
  const interval = setInterval(() => {
    setTitleIndex(prev => prev + 1);
  }, 50); // 50ms 간격으로 타이핑
}, []);

// Hero 슬라이드 전환 (6초 자동재생)
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 6000);
}, []);

// 포트폴리오 슬라이드 전환 (5초 자동재생)
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  }, 5000);
}, []);
```

### 실제 사용된 Motion Variants

```tsx
// Hero 섹션 텍스트 애니메이션
const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0.25, 0.75],
      staggerChildren: 0.3
    }
  }
};

// 코어 서비스 카드 애니메이션
<motion.div 
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.6, 
    delay: index * 0.15,  // 0.15초씩 지연
    ease: "easeOut"
  }}
  whileHover={{ 
    y: -8,  // 8px 위로 이동
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
  }}
/>
```

### 커스텀 CSS 애니메이션 (실제 구현)

```css
/* globals.css에 정의된 실제 애니메이션 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 서비스 섹션 무한 스크롤 애니메이션 */
@keyframes scroll-infinite {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-scroll-infinite {
  animation: scroll-infinite 60s linear infinite;
}

/* 포트폴리오 섹션 그라데이션 애니메이션 */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### 전환 효과 타이밍 (실제 사용값)

```css
/* 실제 사용되는 transition 값들 */
transition: "duration: 1.2s, ease: 'easeInOut'"     /* Hero 배경 전환 */
transition: "duration: 0.8s, ease: 'easeOut'"       /* About 섹션 진입 */
transition: "duration: 0.6s, ease: 'easeOut'"       /* 카드 애니메이션 */
transition: "duration: 0.5s, ease: 'easeInOut'"     /* 호버 효과 */
transition: "duration: 0.3s"                        /* 버튼 호버 */
transition: "duration: 0.2s"                        /* 색상 변화 */

/* 지연 시간 패턴 */
delay: index * 0.15s    /* 카드 순차 애니메이션 */
delay: 0.1s             /* 설명 텍스트 지연 */
delay: 0.2s             /* 아이콘 지연 */
```

### 호버 효과 (실제 구현)

```tsx
// Header 로고 호버
whileHover={{ 
  scale: 1.1, 
  rotate: [0, -5, 5, -5, 0] 
}}

// 네비게이션 버튼 호버  
whileHover={{ scale: 1.1, x: -2 }}    /* 왼쪽 버튼 */
whileHover={{ scale: 1.1, x: 2 }}     /* 오른쪽 버튼 */

// 코어 서비스 아이콘 호버
whileHover={{ 
  scale: 1.15,
  rotate: [0, -5, 5, -5, 0],
  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.25)"
}}

// 카드 호버 (CSS)
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
```

### 스크롤 기반 애니메이션

```tsx
// whileInView를 사용한 스크롤 애니메이션
<motion.div 
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}  // 한 번만 실행
  transition={{ duration: 0.8 }}
>

// 복잡한 스크롤 애니메이션 (About 섹션)
<motion.div 
  initial={{ opacity: 0, scale: 0.8, y: 100 }}
  whileInView={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ 
    duration: 1.2, 
    ease: [0.25, 0.25, 0.25, 0.75],
    scale: { delay: 0.2 }
  }}
/>
```

## 📱 반응형 디자인

### 브레이크포인트

```css
/* Mobile First 접근법 */
/* xs: ~640px   (기본) */
/* sm: 640px~   (작은 태블릿) */
/* md: 768px~   (태블릿) */
/* lg: 1024px~  (작은 데스크톱) */
/* xl: 1280px~  (데스크톱) */
/* 2xl: 1536px~ (큰 데스크톱) */
```

### 반응형 패턴

```tsx
// 텍스트 크기
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  반응형 헤딩
</h1>

// 그리드 레이아웃
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  반응형 그리드
</div>

// 간격 조정
<div className="p-4 md:p-6 lg:p-8">
  반응형 패딩
</div>

// 숨김/표시
<div className="hidden md:block">
  데스크톱에서만 표시
</div>
<div className="block md:hidden">
  모바일에서만 표시
</div>
```

## 🎯 사용 가이드라인

### DO (권장사항)

✅ 일관된 색상 팔레트 사용  
✅ 적절한 대비율 유지 (4.5:1 이상)  
✅ 의미있는 간격 사용  
✅ 반응형 디자인 고려  
✅ 애니메이션은 부드럽게 (300ms 이하)  

### DON'T (지양사항)

❌ 너무 많은 색상 사용  
❌ 가독성을 해치는 폰트 크기  
❌ 과도한 애니메이션  
❌ 일관성 없는 간격  
❌ 접근성 무시  

## 🔧 디자이너 협업 명세서

### Hero 섹션 (실제 구현 명세)

```
높이: 100vh (min-h-screen)
배경: 슬라이더 형태, 배경 이미지 + 어두운 오버레이 (bg-black/60)
텍스트 애니메이션: 
  - 타이핑 효과 (실제 타이핑 시뮬레이션)
  - 첫 번째 라인: 흰색 텍스트 (text-white)
  - 두 번째 라인: 파란색 텍스트 (text-blue-400)
  - 커서: 깜빡이는 효과 (animate-pulse)
슬라이드 전환: 
  - 자동 재생 6초 간격
  - 페이드 트랜지션 (1.2초 duration, easeInOut)
  - 좌우 화살표 네비게이션
  - 하단 점 인디케이터
네비게이션 버튼: 
  - 반투명 배경 (bg-white/20)
  - 호버 시 scale(1.1) + 이동 효과
텍스트 크기: 
  - 모바일: text-4xl
  - 태블릿: md:text-6xl  
  - 데스크톱: lg:text-7xl
```

### 포트폴리오 섹션 (실제 구현 명세)

```
레이아웃: 슬라이더 형태 (그리드 아님)
높이: 70vh (min-h-[500px])
배경: 각 프로젝트별 이미지 + 어두운 오버레이 (bg-black/40)
카드 전환: 
  - 자동 재생 5초 간격
  - opacity + scale 애니메이션 (1초 duration)
  - 현재 슬라이드: opacity-100 scale-100
  - 다른 슬라이드: opacity-0 scale-105
제목 섹션:
  - 큰 제목: PORTFOLIO (gradient-text 효가)
  - 데코레이션 라인: 확장 애니메이션 반복
컨트롤:
  - 좌우 화살표: 반투명 원형 버튼
  - 하단 컨트롤: 자동재생 토글 + 인디케이터
  - 키보드 지원: 좌우 화살표, 스페이스바
카테고리 표시: 각 프로젝트 상단에 작은 텍스트
```

### 코어 서비스 섹션 (Hero 하단)

```
배경: 비디오 배경 (/video/desk.mp4) + 어두운 오버레이
레이아웃: 2x2 그리드 (md:grid-cols-2)
카드 스타일:
  - 배경: 그라데이션 (rgb(243, 218, 216) to rgb(245, 241, 210))
  - 투명도: 0.95 opacity
  - 테두리: border-2 border-white/30
  - 호버: translateY(-8px) + shadow 증가
아이콘: Lottie 애니메이션 (외부 URL에서 로드)
애니메이션:
  - 진입: y: 40 → 0, 0.15초씩 지연
  - 호버: scale(1.15) + 회전 효과
넘버링: 각 카드 좌측 상단 큰 숫자 (1, 2, 3, 4)
```

## 📞 디자인 지원

디자인 관련 문의사항이 있으시면:

- **디자인 문의**: design@ryuin.studio
- **피드백**: [GitHub Issues](https://github.com/ryuin/ryuin-website/issues)
- **제안사항**: [GitHub Discussions](https://github.com/ryuin/ryuin-website/discussions)

---

**Beautiful Design, Better Experience! 🎨** 