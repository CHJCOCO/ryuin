'use client';

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { SERVICES_DATA } from '@/data/services';

const ServicesSection = () => {
  const [talkAnimation, setTalkAnimation] = useState(null);

  useEffect(() => {
    // Lottie 애니메이션 데이터를 동적으로 로드
    fetch('/lottie/talk.json')
      .then(response => response.json())
      .then(data => setTalkAnimation(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  return (
    <>
      {/* First Section - OUR SERVICES */}
      <section id="services" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Title with decorative line */}
          <div className="flex items-center mb-12 title-container">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mr-8 whitespace-nowrap title-text gradient-text">
              {SERVICES_DATA.title}
            </h2>
            <div className="flex-1 h-1 decorative-line gradient-line"></div>
          </div>

          {/* Service description */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
            {/* Text content */}
            <div className="flex-1 max-w-3xl">
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-900 leading-relaxed service-description">
                {SERVICES_DATA.description.main}<br />
                <span className="service-highlight">{SERVICES_DATA.description.highlight}</span><br />
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

        <style jsx>{`
          .service-description {
            font-family: 'NanumSquareRoundEB', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
            font-weight: 800;
            color: #000000;
          }

          .service-highlight {
            color: #0891b2;
          }

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

          @keyframes navyGradientShift {
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
        </div>
      </section>

      {/* Second Section - RYUIN Animated Text Background */}
      <section id="services-background" className="relative bg-white py-20 min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Bar Animation Above Text */}
          <div className="flex whitespace-nowrap animate-scroll-infinite mb-4">
            <div className="flex items-center pr-8">
              {Array.from({ length: 40 }, (_, i) => {
                const shapes = [
                  // 다이아몬드 모양
                  <div 
                    key={i} 
                    className="h-3 md:h-4 lg:h-5 xl:h-6 w-6 md:w-8 lg:w-10 xl:w-12 mr-6 md:mr-8 lg:mr-10 xl:mr-12 transform rotate-45"
                    style={{ 
                      background: 'linear-gradient(135deg, #0891b2, #06b6d4, #0891b2)',
                      borderRadius: '20%'
                    }}
                  />,
                  // 육각형 모양
                  <div 
                    key={i} 
                    className="h-2 md:h-3 lg:h-4 xl:h-5 w-10 md:w-14 lg:w-18 xl:w-22 mr-6 md:mr-8 lg:mr-10 xl:mr-12"
                    style={{ 
                      background: 'linear-gradient(90deg, #0891b2, #06b6d4)',
                      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                    }}
                  />,
                  // 모서리가 둥근 직사각형 (그라데이션)
                  <div 
                    key={i} 
                    className="h-2 md:h-3 lg:h-4 xl:h-5 w-16 md:w-24 lg:w-32 xl:w-40 mr-6 md:mr-8 lg:mr-10 xl:mr-12 rounded-lg"
                    style={{ 
                      background: 'linear-gradient(45deg, #0891b2, #06b6d4, #67e8f9)',
                      opacity: 0.8
                    }}
                  />,
                  // 원형 (크기 다양)
                  <div 
                    key={i} 
                    className="h-4 md:h-5 lg:h-6 xl:h-7 w-8 md:w-10 lg:w-12 xl:w-14 mr-6 md:mr-8 lg:mr-10 xl:mr-12 rounded-full"
                    style={{ 
                      background: 'radial-gradient(circle, #06b6d4, #0891b2)',
                      opacity: 0.9
                    }}
                  />
                ];
                return shapes[i % 4];
              })}
            </div>
            <div className="flex items-center pr-8">
              {Array.from({ length: 40 }, (_, i) => {
                const shapes = [
                  // 다이아몬드 모양
                  <div 
                    key={i} 
                    className="h-3 md:h-4 lg:h-5 xl:h-6 w-6 md:w-8 lg:w-10 xl:w-12 mr-6 md:mr-8 lg:mr-10 xl:mr-12 transform rotate-45"
                    style={{ 
                      background: 'linear-gradient(135deg, #0891b2, #06b6d4, #0891b2)',
                      borderRadius: '20%'
                    }}
                  />,
                  // 육각형 모양
                  <div 
                    key={i} 
                    className="h-2 md:h-3 lg:h-4 xl:h-5 w-10 md:w-14 lg:w-18 xl:w-22 mr-6 md:mr-8 lg:mr-10 xl:mr-12"
                    style={{ 
                      background: 'linear-gradient(90deg, #0891b2, #06b6d4)',
                      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                    }}
                  />,
                  // 모서리가 둥근 직사각형 (그라데이션)
                  <div 
                    key={i} 
                    className="h-2 md:h-3 lg:h-4 xl:h-5 w-16 md:w-24 lg:w-32 xl:w-40 mr-6 md:mr-8 lg:mr-10 xl:mr-12 rounded-lg"
                    style={{ 
                      background: 'linear-gradient(45deg, #0891b2, #06b6d4, #67e8f9)',
                      opacity: 0.8
                    }}
                  />,
                  // 원형 (크기 다양)
                  <div 
                    key={i} 
                    className="h-4 md:h-5 lg:h-6 xl:h-7 w-8 md:w-10 lg:w-12 xl:w-14 mr-6 md:mr-8 lg:mr-10 xl:mr-12 rounded-full"
                    style={{ 
                      background: 'radial-gradient(circle, #06b6d4, #0891b2)',
                      opacity: 0.9
                    }}
                  />
                ];
                return shapes[i % 4];
              })}
            </div>
          </div>

          {/* RYUIN Text Animation */}
          <div className="flex whitespace-nowrap animate-scroll-infinite">
            <div className="text-[16rem] md:text-[20rem] lg:text-[28rem] xl:text-[32rem] font-black pr-8 leading-none" style={{ color: '#0891b2' }}>
              RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN 
              RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN 
            </div>
            <div className="text-[16rem] md:text-[20rem] lg:text-[28rem] xl:text-[32rem] font-black pr-8 leading-none" style={{ color: '#0891b2' }}>
              RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN 
              RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN RYUIN 
            </div>
          </div>
          
          {/* Bar Animation Below Text */}
          <div className="flex whitespace-nowrap animate-scroll-infinite mt-4">
            <div className="flex items-center pr-8">
              {Array.from({ length: 40 }, (_, i) => {
                const shapes = [
                  // 다이아몬드 모양
                  <div 
                    key={i} 
                    className="h-3 md:h-4 lg:h-5 xl:h-6 w-6 md:w-8 lg:w-10 xl:w-12 mr-6 md:mr-8 lg:mr-10 xl:mr-12 transform rotate-45"
                    style={{ 
                      background: 'linear-gradient(135deg, #0891b2, #06b6d4, #0891b2)',
                      borderRadius: '20%'
                    }}
                  />,
                  // 육각형 모양
                  <div 
                    key={i} 
                    className="h-2 md:h-3 lg:h-4 xl:h-5 w-10 md:w-14 lg:w-18 xl:w-22 mr-6 md:mr-8 lg:mr-10 xl:mr-12"
                    style={{ 
                      background: 'linear-gradient(90deg, #0891b2, #06b6d4)',
                      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                    }}
                  />,
                  // 모서리가 둥근 직사각형 (그라데이션)
                  <div 
                    key={i} 
                    className="h-2 md:h-3 lg:h-4 xl:h-5 w-16 md:w-24 lg:w-32 xl:w-40 mr-6 md:mr-8 lg:mr-10 xl:mr-12 rounded-lg"
                    style={{ 
                      background: 'linear-gradient(45deg, #0891b2, #06b6d4, #67e8f9)',
                      opacity: 0.8
                    }}
                  />,
                  // 원형 (크기 다양)
                  <div 
                    key={i} 
                    className="h-4 md:h-5 lg:h-6 xl:h-7 w-8 md:w-10 lg:w-12 xl:w-14 mr-6 md:mr-8 lg:mr-10 xl:mr-12 rounded-full"
                    style={{ 
                      background: 'radial-gradient(circle, #06b6d4, #0891b2)',
                      opacity: 0.9
                    }}
                  />
                ];
                return shapes[i % 4];
              })}
            </div>
            <div className="flex items-center pr-8">
              {Array.from({ length: 40 }, (_, i) => {
                const shapes = [
                  // 다이아몬드 모양
                  <div 
                    key={i} 
                    className="h-3 md:h-4 lg:h-5 xl:h-6 w-6 md:w-8 lg:w-10 xl:w-12 mr-6 md:mr-8 lg:mr-10 xl:mr-12 transform rotate-45"
                    style={{ 
                      background: 'linear-gradient(135deg, #0891b2, #06b6d4, #0891b2)',
                      borderRadius: '20%'
                    }}
                  />,
                  // 육각형 모양
                  <div 
                    key={i} 
                    className="h-2 md:h-3 lg:h-4 xl:h-5 w-10 md:w-14 lg:w-18 xl:w-22 mr-6 md:mr-8 lg:mr-10 xl:mr-12"
                    style={{ 
                      background: 'linear-gradient(90deg, #0891b2, #06b6d4)',
                      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                    }}
                  />,
                  // 모서리가 둥근 직사각형 (그라데이션)
                  <div 
                    key={i} 
                    className="h-2 md:h-3 lg:h-4 xl:h-5 w-16 md:w-24 lg:w-32 xl:w-40 mr-6 md:mr-8 lg:mr-10 xl:mr-12 rounded-lg"
                    style={{ 
                      background: 'linear-gradient(45deg, #0891b2, #06b6d4, #67e8f9)',
                      opacity: 0.8
                    }}
                  />,
                  // 원형 (크기 다양)
                  <div 
                    key={i} 
                    className="h-4 md:h-5 lg:h-6 xl:h-7 w-8 md:w-10 lg:w-12 xl:w-14 mr-6 md:mr-8 lg:mr-10 xl:mr-12 rounded-full"
                    style={{ 
                      background: 'radial-gradient(circle, #06b6d4, #0891b2)',
                      opacity: 0.9
                    }}
                  />
                ];
                return shapes[i % 4];
              })}
            </div>
          </div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
          {/* This space can be used for additional content if needed */}
        </div>

        <style jsx>{`
          @keyframes scroll-infinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll-infinite {
            animation: scroll-infinite 60s linear infinite;
          }
        `}</style>
      </section>
    </>
  );
};

export default ServicesSection; 