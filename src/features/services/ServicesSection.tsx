'use client';

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { SERVICES_DATA } from '@/data/services';

const ServicesSection = () => {
  const [talkAnimation, setTalkAnimation] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const businessShowcase = [
    {
      id: 'cafe',
      title: 'THE CAFE',
      subtitle: '당신의 브랜드를 가장 잘 표현할 웹사이트를 디자인합니다',
      image: '/images/business/cafe.png',
      features: ['모던하고 따뜻한 분위기', '메뉴 및 가격 정보 표시', '온라인 예약 시스템', '소셜미디어 연동']
    },
    {
      id: 'clinic',
      title: 'THE CLINIC',
      subtitle: '전문성과 신뢰를 전달하는 의료진 웹사이트를 제작합니다',
      image: '/images/business/clinic.png',
      features: ['전문적이고 신뢰감 있는 디자인', '진료과목 및 의료진 소개', '온라인 예약 및 상담', '의료 정보 제공']
    },
    {
      id: 'shop',
      title: 'THE SHOP',
      subtitle: '쇼핑 경험을 극대화하는 온라인 스토어를 구축합니다',
      image: '/images/business/shop.png',
      features: ['상품 카탈로그 및 쇼핑몰', '결제 시스템 연동', '재고 관리 기능', '고객 리뷰 시스템']
    },
    {
      id: 'academy',
      title: 'THE ACADEMY',
      subtitle: '교육의 가치를 전달하는 학원 웹사이트를 디자인합니다',
      image: '/images/business/academy.png',
      features: ['교육과정 및 커리큘럼 소개', '온라인 수강신청', '학습자료 다운로드', '성과 및 후기 게시']
    },
    {
      id: 'studio',
      title: 'THE STUDIO',
      subtitle: '창작자의 감성을 담은 포트폴리오 웹사이트를 만듭니다',
      image: '/images/business/studio.png',
      features: ['포트폴리오 갤러리', '작업 과정 소개', '아티스트 프로필', '전시 및 이벤트 정보']
    }
  ];

  useEffect(() => {
    // Lottie 애니메이션 데이터를 동적으로 로드
    fetch('/lottie/talk.json')
      .then(response => response.json())
      .then(data => setTalkAnimation(data))
      .catch(error => console.error('Error loading animation:', error));

    // Auto-advance main slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % businessShowcase.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMainSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleThumbnailPrev = () => {
    setThumbnailStartIndex((prev) => 
      prev > 0 ? prev - 1 : Math.max(0, businessShowcase.length - 5)
    );
  };

  const handleThumbnailNext = () => {
    setThumbnailStartIndex((prev) => 
      prev < businessShowcase.length - 5 ? prev + 1 : 0
    );
  };

  return (
    <div>
      {/* First Section - OUR SERVICES */}
      <section id="services" className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Title with decorative line */}
          <div 
            className="flex items-center mb-12"
            style={{
              animation: 'fadeInUp 1s ease-out'
            }}
          >
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black mr-8 whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #6b7280, #374151, #9ca3af)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease-in-out infinite, slideInLeft 0.8s ease-out'
              }}
            >
              {SERVICES_DATA.title}
            </h2>
            <div 
              className="flex-1 h-1"
              style={{
                background: 'linear-gradient(90deg, #6b7280, #374151, #9ca3af, #6b7280)',
                backgroundSize: '200% 100%',
                animation: 'lineGradientShift 3s ease-in-out infinite, expandLineRepeat 2s ease-in-out infinite',
                transformOrigin: 'left center'
              }}
            ></div>
          </div>

          {/* Service description */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
            {/* Text content */}
            <div className="flex-1 max-w-3xl">
              <p 
                className="text-xl md:text-2xl lg:text-3xl text-gray-900 leading-relaxed font-bold whitespace-pre-line"
                style={{
                  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontWeight: '700',
                  letterSpacing: '-0.01em',
                  lineHeight: '1.5'
                }}
              >
                {SERVICES_DATA.description.main}
                {'\n'}
                <span className="text-cyan-600">{SERVICES_DATA.description.highlight}</span>
                {'\n'}
                {SERVICES_DATA.description.detail}
              </p>
            </div>
            
            {/* Lottie animation container */}
            <div className="flex-shrink-0 w-full lg:w-96 h-64 lg:h-80 flex items-center justify-center">
              {talkAnimation ? (
                <Lottie 
                  animationData={talkAnimation}
                  className="w-full h-full"
                  loop={true}
                  autoplay={true}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  <span className="text-sm">Loading animation...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Business Showcase Section - Portfolio Style Design */}
      <section id="business-showcase" className="relative py-12 md:py-20 md:min-h-screen" style={{ backgroundColor: '#faf9f7' }}>
        <div className="container mx-auto px-6 max-w-7xl">


          {/* Main Mockup Display */}
          <div className="flex justify-center mb-6 md:mb-12 px-2 md:px-0">
            <div className="relative w-full max-w-4xl">
              {/* Main Mockup Card */}
              <div className="relative w-full mx-auto">
                <div 
                  className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ease-in-out transform hover:scale-[1.02] w-full aspect-video md:aspect-[8/5]"
                  style={{ 
                    maxWidth: '800px',
                    boxShadow: '0 25px 60px -5px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  {/* Mockup Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                    style={{ 
                      backgroundImage: `url(${businessShowcase[currentSlide].image})`
                    }}
                  />
                  
                                     {/* Overlay with Business Info */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                   <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
                     <h3 
                       className="text-xl md:text-2xl lg:text-3xl mb-1 md:mb-2"
                       style={{
                         fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, Inter, sans-serif',
                         fontWeight: '300',
                         letterSpacing: '-0.01em',
                         lineHeight: '1.2'
                       }}
                     >
                       {businessShowcase[currentSlide].title}
                     </h3>
                     <p 
                       className="text-sm md:text-lg opacity-90 mb-2 md:mb-4"
                       style={{
                         fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                         fontWeight: '400',
                         letterSpacing: '0.01em',
                         lineHeight: '1.5'
                       }}
                     >
                       {businessShowcase[currentSlide].subtitle}
                     </p>
                    
                                         {/* Features List */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 text-xs md:text-sm">
                       {businessShowcase[currentSlide].features.map((feature, index) => (
                         <div key={index} className="flex items-center space-x-2">
                           <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full flex-shrink-0"></div>
                           <span 
                             className="opacity-80"
                             style={{
                               fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                               fontWeight: '400',
                               letterSpacing: '0.01em'
                             }}
                           >
                             {feature}
                           </span>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>

                                 {/* Agency Badge */}
                 <div className="absolute -bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2">
                   <div className="bg-white/95 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-full shadow-lg border border-gray-100">
                     <span 
                       className="text-xs font-medium"
                       style={{
                         fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                         fontWeight: '500',
                         letterSpacing: '0.02em',
                         color: '#862B0D'
                       }}
                     >
                       Designed by <span style={{ color: '#86C548' }}>RYUIN</span>{' '}
                       <span style={{ color: '#F59393' }}>Web Agency</span>
                     </span>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Slider */}
          <div className="relative mt-6 md:mt-20">
            {/* Desktop Thumbnail Slider */}
            <div className="hidden md:flex items-center justify-center">
                             {/* Previous Button */}
               <button
                 onClick={handleThumbnailPrev}
                 className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 mr-6 z-10"
                 disabled={businessShowcase.length <= 5}
               >
                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                 </svg>
               </button>

               {/* Thumbnails Container */}
               <div className="flex space-x-6 overflow-hidden">
                 {businessShowcase
                   .slice(thumbnailStartIndex, thumbnailStartIndex + 5)
                   .map((business, index) => {
                    const actualIndex = thumbnailStartIndex + index;
                    const isActive = actualIndex === currentSlide;
                    
                    return (
                      <div
                        key={business.id}
                        onClick={() => handleMainSlideChange(actualIndex)}
                        className={`relative cursor-pointer transition-all duration-500 ${
                          isActive ? 'scale-105' : 'scale-100 hover:scale-102'
                        }`}
                      >
                        <div 
                          className={`relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                            isActive ? 'opacity-100 shadow-xl' : 'opacity-60 hover:opacity-80'
                          }`}
                          style={{ width: '160px', height: '100px' }}
                        >
                          <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ 
                              backgroundImage: `url(${business.image})`
                            }}
                          />
                          
                          {/* Active Indicator */}
                          {isActive && (
                            <div className="absolute inset-0 border-3 border-gray-900 rounded-xl" />
                          )}
                          
                                                     {/* Business Type Label */}
                           <div className="absolute top-2 left-2">
                             <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
                               <span
                                 style={{
                                   fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, Inter, sans-serif',
                                   fontWeight: '600',
                                   letterSpacing: '0.02em',
                                   color: '#862B0D'
                                 }}
                               >
                                 {business.id.toUpperCase()}
                               </span>
                             </div>
                           </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

                             {/* Next Button */}
               <button
                 onClick={handleThumbnailNext}
                 className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 ml-6 z-10"
                 disabled={businessShowcase.length <= 5}
               >
                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </button>
            </div>

            {/* Mobile Thumbnail Slider */}
            <div className="md:hidden flex justify-center">
              <div className="flex space-x-2 overflow-x-auto px-2 py-2 scrollbar-hide">
                {businessShowcase.map((business, index) => {
                  const isActive = index === currentSlide;
                  
                  return (
                    <div
                      key={business.id}
                      onClick={() => handleMainSlideChange(index)}
                      className={`relative cursor-pointer transition-all duration-500 flex-shrink-0 ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                    >
                      <div 
                        className={`relative bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                          isActive ? 'opacity-100 shadow-xl' : 'opacity-60'
                        }`}
                        style={{ width: '100px', height: '65px' }}
                      >
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url(${business.image})`
                          }}
                        />
                        
                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-gray-900 rounded-lg" />
                        )}
                        
                        {/* Business Type Label */}
                        <div className="absolute top-1 left-1">
                          <div className="bg-white/90 backdrop-blur-sm px-1 py-0.5 rounded text-xs font-bold">
                            <span
                              style={{
                                fontFamily: '"SF Pro Display", "Helvetica Neue", -apple-system, BlinkMacSystemFont, Inter, sans-serif',
                                fontWeight: '600',
                                letterSpacing: '0.02em',
                                color: '#862B0D',
                                fontSize: '8px'
                              }}
                            >
                              {business.id.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center mt-4 md:mt-8 space-x-2">
              {businessShowcase.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleMainSlideChange(index)}
                  className={`transition-all duration-300 ${
                    currentSlide === index 
                      ? 'w-6 md:w-8 h-2 bg-gray-900 rounded-full' 
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          
        </div>

                 {/* Portfolio Style Animations & Mobile Responsive Styles */}
         <style jsx global>{`
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

           @media (max-width: 768px) {
             .container {
               padding-left: 1rem;
               padding-right: 1rem;
             }
             
             /* Scrollbar hide for mobile slider */
             .scrollbar-hide {
               -ms-overflow-style: none;
               scrollbar-width: none;
             }
             
             .scrollbar-hide::-webkit-scrollbar {
               display: none;
             }
             
             /* Main mockup adjustments for mobile */
             .main-mockup {
               width: 100% !important;
               height: auto !important;
               aspect-ratio: 16/9 !important;
             }
           }
           
           @media (max-width: 640px) {
             /* Additional mobile adjustments */
             .main-mockup {
               margin: 0 0.5rem;
             }
             
             /* Ensure proper spacing */
             .mobile-spacing {
               padding: 0 0.5rem;
             }
             
             /* Mobile business showcase optimizations */
             #business-showcase {
               padding-top: 2rem !important;
               padding-bottom: 2rem !important;
             }
             
             /* Mobile thumbnail improvements */
             .mobile-thumbnail {
               min-width: 100px;
               height: 65px;
             }
           }
         `}</style>
      </section>
    </div>
  );
};

export default ServicesSection; 