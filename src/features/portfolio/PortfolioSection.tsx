'use client';

import React, { useState, useEffect } from 'react';
import { 
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
      image: '/images/portfolio/p.png',
      url: 'https://example.com',
      category: '포트폴리오'
    },
    {
      id: 2,
      title: 'Blooming Shop',
      subtitle: '감성 플라워 온라인 쇼핑몰',
      description: '꽃과 식물 판매를 위한 감각적인 이커머스 플랫폼. 계절별 테마와 구독 서비스 포함',
      image: '/images/portfolio/f.png',
      url: 'https://example.com',
      category: '이커머스'
    },

    {
      id: 4,
      title: 'Creative Agency',
      subtitle: '크리에이티브 에이전시 브랜드 사이트',
      description: '창의적인 서비스를 제공하는 에이전시의 브랜드 아이덴티티를 담은 웹사이트',
      image: '/images/portfolio/c.png',
      url: 'https://example.com',
      category: '브랜드'
    },
    {
      id: 5,
      title: 'TechStart',
      subtitle: '테크 스타트업 제품 소개',
      description: 'SaaS 제품의 기능과 장점을 명확하게 전달하는 제품 소개 웹사이트',
      image: '/images/portfolio/t.png',
      url: 'https://example.com',
      category: '제품소개'
    },
    {
      id: 6,
      title: 'Wellness Center',
      subtitle: '힐링 웰니스 센터',
      description: '요가, 명상, 마사지 등 웰니스 서비스 예약과 정보를 제공하는 편안한 느낌의 웹사이트',
      image: '/images/portfolio/w.png',
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="portfolio" className="relative py-12 md:py-20 bg-gray-50">
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
                          <span 
                            className="text-white/70 text-sm font-medium tracking-wider uppercase"
                            style={{
                              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                              fontWeight: '500',
                              letterSpacing: '0.1em'
                            }}
                          >
                            {project.category}
                          </span>
                        </div>
                        
                        <h2 
                          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                          style={{
                            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                            fontWeight: '700',
                            letterSpacing: '-0.01em',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                          }}
                        >
                          {project.title}
                        </h2>
                        
                        <h3 
                          className="text-xl md:text-2xl text-white/80 mb-8 font-light"
                          style={{
                            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                            fontWeight: '400',
                            letterSpacing: '0.01em',
                            lineHeight: '1.5'
                          }}
                        >
                          {project.subtitle}
                        </h3>
                        
                        <div className="w-16 h-px bg-white/30 mb-8"></div>
                        
                        <div className="flex items-center gap-4 text-white/70">
                          <span 
                            className="text-sm"
                            style={{
                              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                              fontWeight: '500',
                              letterSpacing: '0.05em'
                            }}
                          >
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
          </div>
        </div>

        {/* Progress Dots - 비즈니스 쇼케이스와 동일한 스타일 */}
        <div className="flex justify-center mt-6 md:mt-8 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                currentSlide === index 
                  ? 'w-6 md:w-8 h-2 bg-gray-900 rounded-full' 
                  : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
              }`}
            />
          ))}
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