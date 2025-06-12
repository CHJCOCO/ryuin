import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// 영문 폰트
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// 한글 폰트 - Noto Sans KR로 변경 (더 안정적)
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: {
    default: "ryuin - 성과를 만드는 웹사이트",
    template: "%s | ryuin - 성과를 만드는 웹사이트",
  },
  description: "디지털의 바다에서 방향을 잃지 않는 정교한 웹 솔루션. 디자인과 기술의 균형으로 비즈니스 성공을 이끄는 지속 가능한 웹사이트를 구축합니다.",
  keywords: [
    "웹사이트 제작", "홈페이지 제작", "반응형 웹", "쇼핑몰 제작", 
    "워드프레스", "랜딩페이지", "비즈니스 웹사이트", "웹 솔루션",
    "웹 개발", "UI/UX 디자인", "프론트엔드 개발", "웹 에이전시"
  ],
  authors: [{ name: "ryuin", url: "https://ryuin.studio" }],
  creator: "ryuin",
  publisher: "ryuin",
  category: "Web Development",
  
  // 파비콘 및 아이콘 설정
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2563eb" },
    ],
  },
  manifest: "/site.webmanifest",
  
  // Open Graph 대폭 강화
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://ryuin.studio",
    siteName: "ryuin",
    title: "ryuin - 성과를 만드는 웹사이트",
    description: "디지털의 바다에서 방향을 잃지 않는 정교한 웹 솔루션. 디자인과 기술의 균형으로 비즈니스 성공을 이끄는 지속 가능한 웹사이트를 구축합니다.",
    images: [
      {
        url: "https://ryuin.studio/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ryuin - 성과를 만드는 웹사이트",
        type: "image/png",
      },
      {
        url: "https://ryuin.studio/images/og-image-square.png",
        width: 1200,
        height: 1200,
        alt: "ryuin 로고",
        type: "image/png",
      },
    ],
  },
  
  // Twitter Card 대폭 강화
  twitter: {
    card: "summary_large_image",
    site: "@ryuin_studio",
    creator: "@ryuin_studio",
    title: "ryuin - 성과를 만드는 웹사이트",
    description: "디지털의 바다에서 방향을 잃지 않는 정교한 웹 솔루션. 디자인과 기술의 균형으로 비즈니스 성공을 이끄는 지속 가능한 웹사이트를 구축합니다.",
    images: {
      url: "https://ryuin.studio/images/og-image.png",
      alt: "ryuin - 성과를 만드는 웹사이트",
    },
  },
  
  // 검색엔진 최적화
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // 추가 메타데이터
  alternates: {
    canonical: "https://ryuin.studio",
  },
  
  // 지역 SEO
  other: {
    "geo.region": "KR-11",
    "geo.placename": "Seoul",
    "geo.position": "37.5665;126.9780",
    "ICBM": "37.5665, 126.9780",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* JSON-LD 구조화 데이터 - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ryuin",
              alternateName: "ryuin studio",
              url: "https://ryuin.studio",
              logo: "https://ryuin.studio/images/ryuin.png",
              description: "디지털의 바다에서 방향을 잃지 않는 정교한 웹 솔루션. 디자인과 기술의 균형으로 비즈니스 성공을 이끄는 지속 가능한 웹사이트를 구축합니다.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "서울특별시",
                addressRegion: "강남구",
                addressCountry: "KR"
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+82-10-1234-5678",
                contactType: "customer service",
                email: "contact@ryuin.studio",
                availableLanguage: ["Korean", "English"]
              },
              sameAs: [
                "https://instagram.com/ryuin.studio",
                "https://github.com/ryuin",
                "https://linkedin.com/in/ryuin",
                "https://twitter.com/ryuin_studio"
              ],
              foundingDate: "2024",
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                value: "1-10"
              },
              serviceArea: {
                "@type": "Country",
                name: "대한민국"
              }
            })
          }}
        />
        
        {/* JSON-LD 구조화 데이터 - WebPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://ryuin.studio",
              url: "https://ryuin.studio",
              name: "ryuin - 성과를 만드는 웹사이트",
              description: "디지털의 바다에서 방향을 잃지 않는 정교한 웹 솔루션. 디자인과 기술의 균형으로 비즈니스 성공을 이끄는 지속 가능한 웹사이트를 구축합니다.",
              inLanguage: "ko",
              isPartOf: {
                "@type": "WebSite",
                "@id": "https://ryuin.studio/#website",
                url: "https://ryuin.studio",
                name: "ryuin",
                publisher: {
                  "@type": "Organization",
                  "@id": "https://ryuin.studio/#organization"
                }
              },
              about: {
                "@type": "Organization",
                "@id": "https://ryuin.studio/#organization"
              },
              mainEntity: {
                "@type": "Organization",
                "@id": "https://ryuin.studio/#organization"
              }
            })
          }}
        />
        
        {/* JSON-LD 구조화 데이터 - Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "웹사이트 제작 서비스",
              description: "반응형 웹사이트, 쇼핑몰, 랜딩페이지 등 맞춤형 웹 솔루션 제공",
              provider: {
                "@type": "Organization",
                "@id": "https://ryuin.studio/#organization"
              },
              areaServed: {
                "@type": "Country",
                name: "대한민국"
              },
              serviceType: "웹 개발",
              category: "웹사이트 제작",
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/InStock",
                priceCurrency: "KRW",
                priceRange: "1000000-10000000"
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "웹 서비스 카탈로그",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "반응형 웹사이트 제작",
                      description: "모든 디바이스에 최적화된 반응형 웹사이트"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "쇼핑몰 구축",
                      description: "전자상거래 기능을 갖춘 온라인 쇼핑몰"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "랜딩페이지 제작",
                      description: "마케팅 목적에 특화된 랜딩페이지"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "UI/UX 디자인",
                      description: "사용자 중심의 인터페이스 디자인"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* JSON-LD 구조화 데이터 - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://ryuin.studio/#localbusiness",
              name: "ryuin",
              image: "https://ryuin.studio/images/ryuin.png",
              telephone: "+82-10-1234-5678",
              email: "contact@ryuin.studio",
              address: {
                "@type": "PostalAddress",
                streetAddress: "강남구",
                addressLocality: "서울특별시",
                addressCountry: "KR"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.5665,
                longitude: 126.9780
              },
              url: "https://ryuin.studio",
              priceRange: "₩₩₩",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday", 
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                opens: "09:00",
                closes: "18:00"
              },
              sameAs: [
                "https://instagram.com/ryuin.studio",
                "https://github.com/ryuin",
                "https://linkedin.com/in/ryuin",
                "https://twitter.com/ryuin_studio"
              ]
            })
          }}
        />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${notoSansKR.variable} antialiased min-h-screen bg-white text-gray-900`}>
        {/* Skip Navigation - 접근성 개선 */}
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        >
          본문으로 바로가기
        </a>
        {children}
      </body>
    </html>
  );
}
