'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';

const PortfolioSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const projects = [
    {
      id: 1,
      title: 'Studio Y',
      subtitle: '모던 포토그래퍼 포트폴리오',
      description: '미니멀한 디자인과 고품질 이미지 갤러리로 구성된 사진작가 전용 포트폴리오 웹사이트',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80',
      url: 'https://example.com',
      category: '포트폴리오'
    },
    {
      id: 2,
      title: 'Blooming Shop',
      subtitle: '감성 플라워 온라인 쇼핑몰',
      description: '꽃과 식물 판매를 위한 감각적인 이커머스 플랫폼. 계절별 테마와 구독 서비스 포함',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      url: 'https://example.com',
      category: '이커머스'
    },
    {
      id: 3,
      title: 'MatchUp',
      subtitle: '스타트업 매칭 플랫폼',
      description: '투자자와 스타트업을 연결하는 플랫폼의 랜딩페이지. 신뢰성과 전문성을 강조한 디자인',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      url: 'https://example.com',
      category: '플랫폼'
    },
    {
      id: 4,
      title: 'Creative Agency',
      subtitle: '크리에이티브 에이전시 브랜드 사이트',
      description: '창의적인 서비스를 제공하는 에이전시의 브랜드 아이덴티티를 담은 웹사이트',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      url: 'https://example.com',
      category: '브랜드'
    },
    {
      id: 5,
      title: 'TechStart',
      subtitle: '테크 스타트업 제품 소개',
      description: 'SaaS 제품의 기능과 장점을 명확하게 전달하는 제품 소개 웹사이트',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2342&q=80',
      url: 'https://example.com',
      category: '제품소개'
    },
    {
      id: 6,
      title: 'Wellness Center',
      subtitle: '힐링 웰니스 센터',
      description: '요가, 명상, 마사지 등 웰니스 서비스 예약과 정보를 제공하는 편안한 느낌의 웹사이트',
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      url: 'https://example.com',
      category: '서비스'
    }
  ];

  // 자동 슬라이드 기능
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000); // 5초마다 전환

    return () => clearInterval(interval);
  }, [isAutoPlay, projects.length]);

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % projects.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlay(!isAutoPlay);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAutoPlay, projects.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };



  return (
    <section id="portfolio" className="relative py-20 bg-gray-50">
      <div className="container-custom">
        {/* 섹션 제목 */}
        <div className="flex items-center mb-12 title-container">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mr-8 whitespace-nowrap title-text gradient-text">
            PORTFOLIO
          </h2>
          <div className="flex-1 h-1 decorative-line gradient-line"></div>
        </div>

        {/* 슬라이드 컨테이너 */}
        <div className="relative h-[70vh] min-h-[500px]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              {/* 카드 형태의 배경 이미지 */}
              <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${project.image}')` }}
                >
                  {/* 오버레이 */}
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* 콘텐츠 */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="w-full px-8 md:px-12 lg:px-16">
                    <div className="max-w-xl">
                      {/* 프로젝트 정보 */}
                      <div className="text-left">
                        <div className="mb-6">
                          <span className="text-white/70 text-sm font-medium tracking-wider uppercase">
                            {project.category}
                          </span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                          {project.title}
                        </h2>
                        
                        <h3 className="text-xl md:text-2xl text-white/80 mb-8 font-light">
                          {project.subtitle}
                        </h3>
                        
                        <div className="w-16 h-px bg-white/30 mb-8"></div>
                        
                        <div className="flex items-center gap-4 text-white/70">
                          <span className="text-sm">
                            {String(currentSlide + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* 네비게이션 화살표 */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 group"
          aria-label="이전 슬라이드"
        >
          <ChevronLeftIcon className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <button
          onClick={goToNextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 group"
          aria-label="다음 슬라이드"
        >
          <ChevronRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* 하단 컨트롤 */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-4 bg-white rounded-full px-5 py-2 shadow-lg">
            {/* 자동재생 토글 */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors"
              aria-label={isAutoPlay ? '자동재생 중지' : '자동재생 시작'}
            >
              {isAutoPlay ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </button>

            {/* 인디케이터 */}
            <div className="flex gap-1.5">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gray-900 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`${index + 1}번째 프로젝트로 이동`}
                />
              ))}
            </div>
          </div>
        </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #6b7280, #374151, #9ca3af);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradientShift 3s ease-in-out infinite;
        }

        .gradient-line {
          background: linear-gradient(90deg, #6b7280, #374151, #9ca3af, #6b7280);
          background-size: 200% 100%;
          animation: lineGradientShift 3s ease-in-out infinite;
        }

        .title-container {
          animation: fadeInUp 1s ease-out;
        }

        .title-text {
          animation: slideInLeft 0.8s ease-out;
        }

        .decorative-line {
          animation: expandLineRepeat 2s ease-in-out infinite;
          transform-origin: left center;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expandLineRepeat {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes lineGradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default PortfolioSection; 