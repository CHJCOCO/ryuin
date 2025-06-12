'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  theme?: 'light' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ theme = 'light' }) => {
  const currentYear = new Date().getFullYear();

  // SNS 아이콘들
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/ryuin.studio',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'Brunch',
      href: 'https://brunch.co.kr/@ryuin',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-1 15V7h2v10h-2zm4-4h-2V9h2v4z"/>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/ryuin',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'Notion',
      href: 'https://ryuin.notion.site',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.533 2.754c-.466.046-.56.28-.374.466l1.3.988zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337-.42c.094.513 0 1.027-.513 1.073l-.747.14v10.264c-.653.327-1.26.513-1.773.513-.748 0-.935-.233-1.493-.933l-4.459-7.009v6.756l1.54.327s0 1.027-1.446 1.027l-3.993.233c-.094-.187 0-.653.327-.746l.84-.233V9.854L7.533 9.48c-.094-.513.14-1.26.887-1.307l4.459-.326 4.646 7.103V9.014l-1.307-.14c-.094-.607.326-1.027.793-1.027l3.993-.233z"/>
        </svg>
      ),
    },
  ];

  // 테마별 스타일
  const themeStyles = {
    light: {
      container: 'bg-white border-t border-gray-200',
      text: 'text-gray-900',
      textMuted: 'text-gray-600',
      textLight: 'text-gray-500',
      hover: 'hover:text-gray-900',
      linkHover: 'hover:text-blue-600 hover:underline',
      socialHover: 'hover:text-blue-600',
    },
    dark: {
      container: 'bg-gray-900 border-t border-gray-800',
      text: 'text-white',
      textMuted: 'text-gray-300',
      textLight: 'text-gray-400',
      hover: 'hover:text-white',
      linkHover: 'hover:text-blue-400 hover:underline',
      socialHover: 'hover:text-blue-400',
    },
  };

  const styles = themeStyles[theme];

  return (
    <footer className={`${styles.container} py-12`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 메인 콘텐츠 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          {/* 브랜드 영역 */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-6">
              {/* Logo Image */}
              <div className="relative w-12 h-12 mr-3">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 hover:opacity-100 transition-all duration-300"></div>
                <Image
                  src="/images/ryuin.png"
                  alt="RYUIN 로고"
                  fill
                  className="object-contain relative z-10 drop-shadow-lg"
                  style={{
                    filter: theme === 'light' 
                      ? 'brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(1000%) hue-rotate(216deg) brightness(105%) contrast(106%)' 
                      : 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                  }}
                />
              </div>
              
              {/* Brand Text */}
              <div>
                <h2 
                  className={`font-bold text-xl ${styles.text}`}
                  style={{
                    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
                    fontWeight: '800'
                  }}
                >
                  RYUIN
                </h2>
                <p 
                  className={`text-xs ${styles.textMuted}`}
                  style={{
                    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
                    fontWeight: '500',
                    letterSpacing: '0.5px'
                  }}
                >
                  Web Studio
                </p>
              </div>
            </div>
            
            {/* 이메일 */}
            <div className="mb-4">
              <a 
                href="mailto:contact@ryuin.studio"
                className={`text-sm ${styles.textMuted} ${styles.linkHover} transition-all duration-200`}
              >
                contact@ryuin.studio
              </a>
            </div>

            {/* SNS 아이콘 */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.textMuted} ${styles.socialHover} transition-all duration-200 hover:scale-110`}
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 정책 링크 */}
          <div className="lg:col-span-8 lg:flex lg:justify-end lg:items-start">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <Link 
                href="/legal/privacy" 
                className={`text-sm ${styles.textMuted} ${styles.linkHover} transition-all duration-200`}
              >
                개인정보처리방침
              </Link>
              <Link 
                href="/legal/terms" 
                className={`text-sm ${styles.textMuted} ${styles.linkHover} transition-all duration-200`}
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className={`border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'} pt-6`}>
          {/* 저작권 정보 */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className={`text-sm ${styles.textLight}`}>
              © {currentYear} ryuin. All rights reserved.
            </div>
            
            {/* Powered by 영역 (향후 확장용) */}
            <div className={`text-xs ${styles.textLight} hidden sm:block`}>
              {/* Powered by Vercel 등 필요시 추가 */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 