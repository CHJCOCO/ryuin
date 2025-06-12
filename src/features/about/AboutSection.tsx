'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * 색상 테마 설정 - 여기서 한 번에 관리
 * 
 * 사용법:
 * 1. 직접 사용: style={{ color: colorTheme.text.primary }}
 * 2. 유틸리티 함수 사용: style={getTextStyle(colorTheme.text.primary)}
 * 
 * 색상 변경시 이 객체의 값만 수정하면 전체 컴포넌트에 적용됩니다.
 */
const colorTheme = {
  primary: {
    main: '#5d5c62',        // 메인 브랜드 색상
    light: '#8b8a91',       // 연한 브랜드 색상
    dark: '#3a3940',        // 진한 브랜드 색상
  },
  text: {
    primary: '#1f2937',     // 기본 텍스트 색상 (gray-900)
    secondary: '#6b7280',   // 보조 텍스트 색상 (gray-600)
    tertiary: '#9ca3af',    // 3차 텍스트 색상 (gray-400)
    white: '#ffffff',       // 흰색 텍스트
    accent: '#2563eb',      // 강조 색상 (blue-600)
    highlight: '#0891b2',   // 하이라이트 색상 (cyan-600)
    navy: '#1e3a8a',        // 네이비 색상 (blue-800)
  },
  background: {
    overlay: 'rgba(255, 255, 255, 0.1)', // 오버레이 배경
    light: '#f8fafc',       // 연한 배경
    accent: '#e0f2fe',      // 강조 배경
  }
};



const AboutSection = () => {
  return (
    <section id="about" className="bg-white">
      {/* 첫 번째 부분: Professional Web Agency */}
      <div className="py-20 lg:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* 메인 타이틀 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
              style={{
                fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                color: colorTheme.text.primary,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                letterSpacing: '-0.02em'
              }}
            >
              Navigating<br />
              <span style={{ color: colorTheme.text.highlight }}>The Digital Ocean</span>
            </h2>
          </motion.div>
          
          {/* 부연 설명 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <p 
              className="text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-3xl mx-auto"
              style={{
                fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                color: colorTheme.text.secondary,
                lineHeight: '1.8'
              }}
            >
              디지털의 바다 위, <br />
              우리는 흔들림 없는 웹 솔루션을 만듭니다.
            </p>
          </motion.div>
          
          {/* 영상 영역 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative w-full max-w-5xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100">
              {/* 영상 placeholder - 실제 영상 파일로 교체하세요 */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ filter: 'brightness(0.9)' }}
                >
                  {/* Pexels 무료 영상 사용 - 도시 야경/건물 테마 */}
                  <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_3840_2160_30fps.mp4" type="video/mp4" />
                  
                  {/* 영상 로드 실패 시 대체 이미지 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🎥</div>
                      <p className="text-xl font-medium">Professional Web Agency Video</p>
                      <p className="text-sm opacity-80 mt-2">Coming Soon</p>
                    </div>
                  </div>
                </video>
              </div>
              
              {/* 영상 위 그라데이션 오버레이 (선택사항) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
            </div>
            
            {/* 영상 하단 장식 요소 */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-60"></div>
          </motion.div>
          
        </div>
      </div>

      {/* 두 번째 부분: 브랜드 소개 */}
      <div className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* 상단 텍스트 영역 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left mt-16 mb-30"
          >
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mb-6"
              style={{
                fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                color: colorTheme.text.primary,
                lineHeight: '1.6'
              }}
            >
              브랜드의 가치를 제대로 전달하려면,<br />
              <span style={{ color: colorTheme.text.highlight }}> 명확한 목적</span> 아래 만들어져야 합니다.
            </h2>
            
            <p 
              className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl"
              style={{
                fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                lineHeight: '1.8'
              }}
            >
              겉보기만 좋은 디자인보다, <span style={{ color: '#ED4078' }}>전달력이 분명한 구조</span>가 더 중요합니다. <br />
              목적에 부합하지 않는 홈페이지는 오히려 브랜드 신뢰를 낮출 수 있어요.
            </p>
          </motion.div>

          {/* 하단 이미지 영역 - 좌우 2단 구조 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 md:gap-12"
          >
            
            {/* 왼쪽 이미지 + 설명 - 위로 올라간 상태 */}
            <div className="flex-1 text-left -mt-8 md:-mt-12">
              <div className="relative mb-4">
                <Image 
                  src="/images/6.jpg" 
                  alt="모니터에 코드를 보며 개발 계획을 세우는 장면"
                  width={2069}
                  height={480}
                  className="w-full h-120 md:h-144 object-cover rounded-lg shadow-md"
                />
              </div>
              <p 
                className="text-sm md:text-base text-gray-800 leading-relaxed"
                style={{
                  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  lineHeight: '1.6',
                  fontWeight: '500'
                }}
              >
                기획에서 개발까지,<br />
                각 분야 전문가가 함께 만드는 완성도 높은 홈페이지를 제공합니다.
              </p>
            </div>

            {/* 오른쪽 이미지 + 설명 - 아래로 내려간 상태 */}
            <div className="flex-1 text-left mt-8 md:mt-12">
              <div className="relative mb-4">
                <Image 
                  src="/images/5.jpg" 
                  alt="개발팀이 함께 협업하며 회의하는 장면"
                  width={2070}
                  height={480}
                  className="w-full h-120 md:h-144 object-cover rounded-lg shadow-md"
                />
              </div>
              <p 
                className="text-sm md:text-base text-gray-800 leading-relaxed"
                style={{
                  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  lineHeight: '1.6',
                  fontWeight: '500'
                }}
              >
                전 과정에 걸친 체계적인 진행과  <br />
                꼼꼼한 커뮤니케이션으로 높은 만족도를 드립니다.
              </p>
            </div>

          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 