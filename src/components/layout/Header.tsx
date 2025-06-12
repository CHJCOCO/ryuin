'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Check which section is currently in view
      const sections = ['hero', 'about', 'services', 'services-background', 'portfolio', 'contact'];
      const sectionElements = sections.map(id => ({
        id,
        element: document.getElementById(id) || document.querySelector(`#${id}`)
      })).filter(section => section.element);

      let currentSection = 'hero';
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (const section of sectionElements) {
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          const offsetHeight = section.element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            // services-background 섹션도 services로 인식
            currentSection = section.id === 'services-background' ? 'services' : section.id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '홈', href: '#hero', id: 'hero' },
    { name: '소개', href: '#about', id: 'about' },
    { name: '서비스', href: '#services', id: 'services' },
    { name: '포트폴리오', href: '#portfolio', id: 'portfolio' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Link href="/" className="flex items-center group">
              <motion.div 
                className={`relative transition-all duration-500 ${
                  isScrolled ? 'w-12 h-12' : 'w-16 h-16'
                }`}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <Image
                  src="/images/ryuin.png"
                  alt="RYUIN 로고"
                  fill
                  className="object-contain relative z-10 drop-shadow-lg"
                  priority
                  style={{
                    filter: isScrolled 
                      ? 'brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(1000%) hue-rotate(216deg) brightness(105%) contrast(106%)' 
                      : 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                  }}
                />
              </motion.div>
              
              {/* Brand Text */}
              <motion.div 
                className="ml-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 
                  className={`font-bold text-lg sm:text-xl transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-900' 
                      : 'text-white'
                  }`}
                  style={{
                    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
                    fontWeight: '800',
                    textShadow: isScrolled ? 'none' : '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  RYUIN
                </h1>
                <p 
                  className={`text-xs transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-600' 
                      : 'text-blue-200'
                  }`}
                  style={{
                    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
                    fontWeight: '500',
                    letterSpacing: '0.5px'
                  }}
                >
                  Web Studio
                </p>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, staggerChildren: 0.1 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === item.id
                      ? isScrolled 
                        ? 'text-blue-600' 
                        : 'text-blue-300'
                      : isScrolled 
                        ? 'text-gray-700 hover:text-blue-600' 
                        : 'text-white hover:text-blue-300'
                  }`}
                  style={{
                    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
                    fontWeight: '600'
                  }}
                  onClick={() => {
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item.name}
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        isScrolled ? 'bg-blue-600' : 'bg-blue-300'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Link
                href="#contact"
                className="btn-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
                  fontWeight: '600'
                }}
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                상담하기
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isScrolled 
                ? 'hover:bg-gray-100 text-gray-700 focus:ring-blue-500' 
                : 'hover:bg-white/10 text-white focus:ring-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav 
            id="mobile-menu"
            className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg border-t"
            role="navigation"
            aria-label="모바일 메뉴"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    style={{fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontWeight: '600'}}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Link
                  href="#contact"
                  className="block w-full text-center btn-primary mt-4"
                  style={{fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontWeight: '600'}}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const element = document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  상담하기
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </nav>
    </motion.header>
  );
};

export default Header; 