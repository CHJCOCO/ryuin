'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { 
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// URL에서 Lottie 애니메이션을 로드하는 컴포넌트
const LottieAnimation = ({ url }: { url: string }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, [url]);

  if (!animationData) {
    return <div className="w-16 h-16 bg-blue-100 rounded-lg animate-pulse"></div>;
  }

  return (
    <Lottie 
      animationData={animationData}
      className={url.includes('lf20_w51pcehl') ? "w-32 h-32" : "w-24 h-24"}
      style={{ border: 'none', outline: 'none' }}
      loop={true}
      autoplay={true}
    />
  );
};

// 슬라이드 타입 정의
interface Slide {
  title: string;
  subtitle: string;
  description: string;
  mobileBreakPoint: string;
  background: string;
}

// 서비스 타입 정의
interface Service {
  title: string;
  description: string;
  animationUrl: string;
}

// ServiceCarousel 컴포넌트
const ServiceCarousel = ({ coreServices }: { coreServices: Service[] }) => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % coreServices.length);
    }, 3000); // 3초마다 자동 슬라이드

    return () => clearInterval(timer);
  }, [coreServices.length]);

  // 카드 위치 계산 함수
  const getCardPosition = (index: number) => {
    const diff = index - currentServiceIndex;
    
    // 순환 처리
    let position = diff;
    if (Math.abs(diff) > 2) {
      position = diff > 0 ? diff - coreServices.length : diff + coreServices.length;
    }
    
    return position;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* 데스크탑 카드 캐러셀 */}
      <div className="hidden md:block relative h-[500px] overflow-visible">
        <div className="flex items-center justify-center h-full">
          {coreServices.map((service, index) => {
            const position = getCardPosition(index);
            const isCenter = position === 0;
            const isVisible = Math.abs(position) <= 1;

            if (!isVisible) return null;

            return (
              <motion.div
                key={index}
                className="absolute cursor-pointer"
                animate={{
                  x: position * 420, // 카드 간격
                  scale: isCenter ? 1 : 0.9,
                  opacity: 1,
                  zIndex: isCenter ? 25 : 15 - Math.abs(position),
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                whileHover={isCenter ? { 
                  y: -8,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
                } : {}}
                onClick={() => setCurrentServiceIndex(index)}
              >
                <div 
                  className="rounded-2xl p-8 text-center border-2 border-white/30 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg,rgb(243, 218, 216) 0%,rgb(245, 241, 210) 100%)',
                    width: isCenter ? '600px' : '540px',
                    height: isCenter ? '400px' : '360px',
                    boxShadow: isCenter ? '0 20px 40px rgba(0,0,0,0.25)' : '0 10px 20px rgba(0,0,0,0.15)'
                  }}
                >
                  <motion.div 
                    className="flex items-center justify-center text-blue-600 mb-6 mx-auto"
                    style={{
                      width: isCenter ? '160px' : '140px',
                      height: isCenter ? '160px' : '140px'
                    }}
                    whileHover={isCenter ? { 
                      scale: 1.15,
                      rotate: [0, -5, 5, -5, 0],
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.25)",
                      transition: { duration: 0.5 }
                    } : {}}
                  >
                    <LottieAnimation url={service.animationUrl} />
                  </motion.div>
                  <h3 
                    className="text-gray-900 mb-4" 
                    style={{
                      fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
                      fontWeight: '600', 
                      letterSpacing: '-0.01em', 
                      lineHeight: '1.3',
                      fontSize: isCenter ? '2rem' : '1.5rem'
                    }}
                  >
                    <span 
                      className="font-bold leading-none mr-2" 
                      style={{
                        fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, Inter, sans-serif', 
                        fontWeight: '300', 
                        color: '#ADC3D2',
                        fontSize: isCenter ? '4rem' : '3rem'
                      }}
                    >
                      {index + 1}
                    </span>
                    {(() => {
                      const words = service.title.split(' ');
                      const lastWord = words.pop();
                      const firstWords = words.join(' ');
                      return (
                        <>
                          {firstWords && <span style={{color: '#86C548'}}>{firstWords} </span>}
                          <span style={{color: '#F59393'}}>{lastWord}</span>
                        </>
                      );
                    })()}
                  </h3>
                  <p 
                    className="leading-relaxed" 
                    style={{
                      fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
                      fontWeight: '400', 
                      letterSpacing: '0.01em', 
                      color: '#862B0D',
                      fontSize: isCenter ? '1.125rem' : '1rem'
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 모바일 단일 카드 */}
      <div className="md:hidden relative">
        <motion.div
          key={currentServiceIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="rounded-2xl p-6 text-center border-2 border-white/30 shadow-lg mx-4"
          style={{
            background: 'linear-gradient(135deg,rgb(243, 218, 216) 0%,rgb(245, 241, 210) 100%)',
          }}
        >
          <motion.div 
            className="flex items-center justify-center w-24 h-24 text-blue-600 mb-4 mx-auto"
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
          >
            <LottieAnimation url={coreServices[currentServiceIndex].animationUrl} />
          </motion.div>
          <h3 className="text-xl text-gray-900 mb-3" style={{fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: '600', letterSpacing: '-0.01em', lineHeight: '1.3'}}>
            <span className="text-3xl font-bold leading-none mr-2" style={{fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, Inter, sans-serif', fontWeight: '300', color: '#ADC3D2'}}>{currentServiceIndex + 1}</span>
            {(() => {
              const words = coreServices[currentServiceIndex].title.split(' ');
              const lastWord = words.pop();
              const firstWords = words.join(' ');
              return (
                <>
                  {firstWords && <span style={{color: '#86C548'}}>{firstWords} </span>}
                  <span style={{color: '#F59393'}}>{lastWord}</span>
                </>
              );
            })()}
          </h3>
          <p className="leading-relaxed text-sm" style={{fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: '400', letterSpacing: '0.01em', color: '#862B0D'}}>{coreServices[currentServiceIndex].description}</p>
        </motion.div>
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center mt-8 space-x-2">
        {coreServices.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentServiceIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentServiceIndex 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              scale: index === currentServiceIndex ? 1.25 : 1,
              opacity: index === currentServiceIndex ? 1 : 0.7
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // 타이핑 애니메이션 상태 - 초기값 명확하게 설정
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(-1);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  
  // 모바일에서 특정 글자부터 줄바꿈하는 유틸리티 함수
  const formatDescriptionForMobile = (text: string, breakPoint: string) => {
    const breakIndex = text.indexOf(breakPoint);
    if (breakIndex === -1) return text;
    
    const beforeBreak = text.substring(0, breakIndex);
    const afterBreak = text.substring(breakIndex);
    
    return (
      <>
        <span className="hidden md:inline">{text}</span>
        <span className="md:hidden">
          {beforeBreak}
          <br />
          {afterBreak}
        </span>
      </>
    );
  };
  
  // 슬라이드 메시지 데이터 - useMemo로 메모이제이션
  const slides: Slide[] = useMemo(() => [
    {
      title: '성과를 만드는',
      subtitle: '웹사이트',
      description: '단순한 웹사이트가 아닌, 비즈니스 성공을 이끄는 웹사이트를 만들어드립니다.',
      mobileBreakPoint: '성공을', // 이 글자부터 줄바꿈
      background: "url('/images/4.jpg')" // 첫 번째 슬라이드 배경 이미지
    },
    {
      title: '디자인과 기술의',
      subtitle: '균형',
      description: '아름다운 디자인과 견고한 기술력의 완벽한 조화로 최고의 결과물을 제공합니다.',
      mobileBreakPoint: '완벽한', // 이 글자부터 줄바꿈
      background: "url('/images/2.jpg')" // 두 번째 슬라이드 배경 이미지
    },
    {
      title: '지속 가능한',
      subtitle: '웹 구축',
      description: '미래를 생각하는 확장 가능하고 유지보수가 쉬운 웹사이트를 구축해드립니다.',
      mobileBreakPoint: '유지보수가', // 이 글자부터 줄바꿈
      background: "url('/images/3.jpg')" // 세 번째 슬라이드 배경 이미지
    }
  ], []);

  // 현재 슬라이드 변경 시 타이핑 애니메이션 초기화
  useEffect(() => {
    // 모든 타이핑 상태 완전 초기화
    setDisplayedTitle('');
    setDisplayedSubtitle('');
    setTitleIndex(-1); // -1로 시작하여 명확하게 구분
    setSubtitleIndex(0);
    setShowSubtitle(false);
    setShowDescription(false);
    setShowButtons(false);
    setTypingComplete(false);
    
    // 배경 전환 완료 후 타이핑 시작
    const startTimer = setTimeout(() => {
      setTitleIndex(0); // 0으로 설정하여 첫 글자부터 타이핑 시작
    }, 800); // 콘텐츠 전환에 맞춰 조정
    
    return () => clearTimeout(startTimer);
  }, [currentSlide]);

  // 제목 타이핑 애니메이션
  useEffect(() => {
    const currentTitle = slides[currentSlide]?.title || '';
    
    if (titleIndex >= 0 && titleIndex < currentTitle.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(currentTitle.slice(0, titleIndex + 1));
        setTitleIndex(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timer);
    } else if (titleIndex === currentTitle.length && currentTitle.length > 0 && !showSubtitle) {
      // 제목 타이핑 완료, 부제목 시작 준비
      const timer = setTimeout(() => {
        setShowSubtitle(true);
        setSubtitleIndex(0); // 부제목 인덱스 초기화
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [titleIndex, currentSlide, showSubtitle]);

  // 부제목 타이핑 애니메이션
  useEffect(() => {
    const currentSubtitle = slides[currentSlide]?.subtitle || '';
    
    if (showSubtitle && subtitleIndex < currentSubtitle.length) {
      const timer = setTimeout(() => {
        setDisplayedSubtitle(currentSubtitle.slice(0, subtitleIndex + 1));
        setSubtitleIndex(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timer);
    } else if (showSubtitle && subtitleIndex === currentSubtitle.length && currentSubtitle.length > 0 && !showDescription) {
      // 부제목 타이핑 완료, description 표시
      console.log('부제목 타이핑 완료, description 표시 예정');
      const timer = setTimeout(() => {
        console.log('Description 표시 중');
        setShowDescription(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showSubtitle, subtitleIndex, currentSlide, showDescription, slides]);

  // Description 표시 후 버튼 표시
  useEffect(() => {
    if (showDescription && !showButtons) {
      console.log('Description 표시됨, 버튼 표시 예정');
      const timer = setTimeout(() => {
        console.log('버튼 표시 중');
        setShowButtons(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [showDescription, showButtons]);

  // 버튼 표시 후 타이핑 완료 상태
  useEffect(() => {
    if (showButtons && !typingComplete) {
      const timer = setTimeout(() => {
        setTypingComplete(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showButtons, typingComplete]);

  // 타이핑 완료 후 자동 슬라이드 전환
  useEffect(() => {
    if (typingComplete && isAutoPlaying) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 1500); // 타이핑 완료 후 1.5초 대기 (이전 2.5초에서 단축)
      return () => clearTimeout(timer);
    }
  }, [typingComplete, isAutoPlaying]);

  // 이전 슬라이드로 이동
  const goToPrevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 6000); // 6초 후 자동 재생 재개
  };

  // 다음 슬라이드로 이동
  const goToNextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 6000); // 6초 후 자동 재생 재개
  };

  // 특정 슬라이드로 이동
  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 6000); // 6초 후 자동 재생 재개
  };

  // 애니메이션 variants
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
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  const coreServices = [
    {
      title: '반응형 웹',
      description: '모바일에서도 완벽하게 작동하는 웹사이트',
      animationUrl: 'https://assets9.lottiefiles.com/packages/lf20_iorpbol0.json'
    },
    {
      title: '쇼핑몰 구축',
      description: '구매 전환에 최적화된 쇼핑몰 구축',
      animationUrl: 'https://assets3.lottiefiles.com/packages/lf20_1a8dx7zj.json'
    },
    {
      title: '감성 디자인',
      description: '브랜드에 딱 맞는 비주얼과 흐름 설계',
      animationUrl: 'https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json'
    },
    {
      title: '빠른 제작',
      description: '일정에 맞춰 빠르고 정확하게 제작 완료',
      animationUrl: 'https://assets1.lottiefiles.com/packages/lf20_V9t630.json'
    }
  ];

  return (
    <>
      {/* Hero Section - Slider */}
      <section id="hero" className="min-h-screen relative overflow-hidden">
        {/* Slider Container */}
        <div className="relative h-screen">
          {/* Background Images - All present, controlled by opacity */}
          {slides.map((slide, index) => (
            <motion.div
              key={`bg-${index}`}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: slide.background }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0 
              }}
              transition={{ 
                duration: 1.2, 
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/60 z-5"></div>

          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              index === currentSlide ? (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeInOut"
                  }}
                >
                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="container-custom text-center max-w-4xl mx-auto px-4">
                      <motion.div
                        key={`slide-${currentSlide}`}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-6"
                      >
                        {/* Main Title with Typing Animation */}
                        <div className="space-y-2">
                          <h1 
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight min-h-[1.2em]"
                            style={{
                              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
                              fontWeight: '700', 
                              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                            }}
                          >
                            <span className="inline-block">
                              {displayedTitle}
                              {titleIndex < slides[currentSlide].title.length && (
                                <span className="animate-pulse">|</span>
                              )}
                            </span>
                          </h1>
                          <h1 
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-400 leading-tight min-h-[1.2em]"
                            style={{
                              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
                              fontWeight: '700', 
                              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                            }}
                          >
                            <span className="inline-block">
                              {displayedSubtitle}
                              {showSubtitle && subtitleIndex < slides[currentSlide].subtitle.length && (
                                <span className="animate-pulse">|</span>
                              )}
                            </span>
                          </h1>
                        </div>

                        {/* Description - appears after subtitle typing */}
                        <motion.div 
                          className="min-h-[3rem] mb-6"
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          animate={{ 
                            opacity: showDescription ? 1 : 0, 
                            y: showDescription ? 0 : 30, 
                            scale: showDescription ? 1 : 0.95 
                          }}
                          transition={{ 
                            duration: 1.2, 
                            ease: [0.25, 0.25, 0.25, 0.75],
                            delay: showDescription ? 0.1 : 0
                          }}
                        >
                          <p 
                            className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto"
                            style={{
                              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
                              fontWeight: '500', 
                              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                            }}
                          >
                            {formatDescriptionForMobile(slides[currentSlide].description, slides[currentSlide].mobileBreakPoint)}
                          </p>
                        </motion.div>

                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ) : null
            ))}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={goToPrevSlide}
            className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </motion.button>
          
          <motion.button
            onClick={goToNextSlide}
            className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </motion.button>

          {/* Dot Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  scale: index === currentSlide ? 1.25 : 1,
                  opacity: index === currentSlide ? 1 : 0.7
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Summary Section */}
      <section id="services-preview" className="relative py-20 px-4 md:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/video/desk.mp4" type="video/mp4" />
          </video>
        

          
          <div className="container-custom relative z-20 py-20">
            <ServiceCarousel coreServices={coreServices} />
          </div>
        </div>
      </section>

    </>
  );
};

export default HeroSection; 