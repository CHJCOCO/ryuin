'use client';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 숫자 */}
          <div className="text-8xl md:text-9xl font-bold text-gray-100 mb-4 select-none">
            404
          </div>
          
          {/* 메인 메시지 */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            길을 잃으셨나요?
          </h1>
          
          {/* 서브 메시지 */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            디지털의 바다에서 방향을 잃으셨군요.<br />
            요청하신 페이지를 찾을 수 없습니다.
          </p>
          
          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              홈으로 돌아가기
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              이전 페이지로
            </button>
          </div>
          
          {/* 추가 도움말 */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              도움이 필요하시나요?
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                href="/#contact" 
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                문의하기
              </Link>
              <Link 
                href="/#services" 
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                서비스 보기
              </Link>
              <Link 
                href="/#portfolio" 
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                포트폴리오 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer theme="light" />
    </main>
  );
} 