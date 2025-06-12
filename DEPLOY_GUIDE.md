# 배포 가이드 (DEPLOY_GUIDE.md)

> ryuin 프로젝트를 다양한 플랫폼에 배포하는 완전한 가이드

## 📋 목차

- [배포 준비사항](#배포-준비사항)
- [Vercel 배포 (권장)](#vercel-배포-권장)
- [Netlify 배포](#netlify-배포)
- [AWS S3 + CloudFront](#aws-s3--cloudfront)
- [GitHub Pages](#github-pages)
- [Docker 배포](#docker-배포)
- [도메인 설정](#도메인-설정)
- [배포 최적화](#배포-최적화)

## 🚀 배포 준비사항

### 프로덕션 빌드 확인

```bash
# 1. 의존성 설치
npm install

# 2. 타입 체크
npm run type-check

# 3. 린트 확인
npm run lint

# 4. 프로덕션 빌드
npm run build

# 5. 로컬에서 프로덕션 버전 테스트
npm run start
```

### 환경 변수 설정

**필수 환경 변수:**
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_id
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 배포 전 체크리스트

- [ ] 모든 환경 변수 설정 완료
- [ ] 프로덕션 빌드 성공
- [ ] 모든 링크 정상 동작 확인
- [ ] 모바일/데스크톱 반응형 확인
- [ ] SEO 메타태그 설정 완료
- [ ] Analytics 설정 완료

## 🟢 Vercel 배포 (권장)

### 1. Vercel CLI 설치

```bash
npm i -g vercel
```

### 2. Vercel 로그인

```bash
vercel login
```

### 3. 프로젝트 배포

```bash
# 첫 배포 (설정 진행)
vercel

# 프로덕션 배포
vercel --prod
```

### 4. GitHub 연동 배포

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. "New Project" 클릭
3. GitHub 리포지토리 선택
4. 환경 변수 설정:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID = your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = your_public_key
   NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
   NEXT_PUBLIC_CLARITY_PROJECT_ID = your_clarity_id
   NEXT_PUBLIC_SITE_URL = https://your-domain.vercel.app
   ```
5. "Deploy" 클릭

### 5. 커스텀 도메인 설정

```bash
# Vercel CLI로 도메인 추가
vercel domains add your-domain.com

# 또는 Vercel Dashboard에서 설정
# Project Settings > Domains > Add Domain
```

### Vercel 설정 파일 (vercel.json)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "next.config.ts",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🔵 Netlify 배포

### 1. 빌드 설정

**netlify.toml 생성:**
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### 2. Static Export 설정

**next.config.ts 수정:**
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### 3. GitHub 연동 배포

1. [Netlify](https://app.netlify.com/) 로그인
2. "New site from Git" 클릭
3. GitHub 리포지토리 선택
4. 빌드 설정:
   ```
   Build command: npm run build
   Publish directory: out
   ```
5. 환경 변수 설정 (Site Settings > Environment variables)

### 4. CLI 배포

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 배포
netlify deploy --prod --dir=out
```

## 🟠 AWS S3 + CloudFront

### 1. S3 버킷 생성

```bash
# AWS CLI 설치 및 설정
aws configure

# S3 버킷 생성
aws s3 mb s3://your-website-bucket

# 정적 웹사이트 호스팅 활성화
aws s3 website s3://your-website-bucket \
  --index-document index.html \
  --error-document 404.html
```

### 2. 빌드 파일 업로드

```bash
# 빌드
npm run build

# S3에 업로드
aws s3 sync out/ s3://your-website-bucket --delete

# 퍼블릭 읽기 권한 설정
aws s3api put-bucket-policy \
  --bucket your-website-bucket \
  --policy file://bucket-policy.json
```

**bucket-policy.json:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-website-bucket/*"
    }
  ]
}
```

### 3. CloudFront 배포

```bash
# CloudFront 배포 생성
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

## 🟣 GitHub Pages

### 1. GitHub Actions 설정

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
          NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
          NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 2. Repository 설정

1. GitHub 리포지토리의 Settings > Pages
2. Source: "Deploy from a branch"
3. Branch: "gh-pages" 선택

## 🐳 Docker 배포

### 1. Dockerfile 생성

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  ryuin-website:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_EMAILJS_SERVICE_ID=${EMAILJS_SERVICE_ID}
      - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=${EMAILJS_TEMPLATE_ID}
      - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=${EMAILJS_PUBLIC_KEY}
      - NEXT_PUBLIC_GA_MEASUREMENT_ID=${GA_MEASUREMENT_ID}
    restart: unless-stopped
```

### 3. 배포 명령어

```bash
# 이미지 빌드
docker build -t ryuin-website .

# 컨테이너 실행
docker run -p 3000:3000 ryuin-website

# Docker Compose 사용
docker-compose up -d
```

## 🌐 도메인 설정

### DNS 설정

**A 레코드 (IP 기반):**
```
Type: A
Name: @
Value: [서버 IP 주소]
TTL: 3600
```

**CNAME 레코드 (도메인 기반):**
```
Type: CNAME
Name: www
Value: your-site.vercel.app
TTL: 3600
```

### SSL 인증서

대부분의 플랫폼에서 자동 SSL 제공:
- **Vercel**: 자동 SSL (Let's Encrypt)
- **Netlify**: 자동 SSL (Let's Encrypt)
- **CloudFront**: AWS Certificate Manager

## ⚡ 배포 최적화

### 성능 최적화

```typescript
// next.config.ts
const nextConfig = {
  // 이미지 최적화
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // 압축 활성화
  compress: true,

  // 번들 분석
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },

  // 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### CDN 설정

```javascript
// 정적 자산 CDN 설정
const CDN_URL = 'https://cdn.your-domain.com';

const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' ? CDN_URL : '',
};
```

### 환경별 설정

```javascript
// 환경별 설정 분리
const configs = {
  development: {
    assetPrefix: '',
    basePath: '',
  },
  production: {
    assetPrefix: 'https://cdn.your-domain.com',
    basePath: '',
  },
};

const nextConfig = configs[process.env.NODE_ENV] || configs.development;
```

## 🔍 배포 후 확인사항

### 성능 체크

```bash
# Lighthouse 성능 측정
npm install -g lighthouse
lighthouse https://your-domain.com --output html

# PageSpeed Insights 확인
# https://pagespeed.web.dev/

# GTmetrix 성능 분석
# https://gtmetrix.com/
```

### SEO 확인

- Google Search Console 등록
- sitemap.xml 제출
- robots.txt 확인
- 메타태그 검증
- 구조화된 데이터 테스트

### 모니터링 설정

```javascript
// 에러 모니터링 (Sentry 예시)
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## 🚨 트러블슈팅

### 자주 발생하는 문제들

**1. 빌드 실패**
```bash
# 캐시 정리
rm -rf .next node_modules
npm install
npm run build
```

**2. 환경 변수 인식 안됨**
- `NEXT_PUBLIC_` 접두사 확인
- 플랫폼별 환경 변수 설정 확인
- 빌드 시점에 환경 변수 주입 확인

**3. 정적 파일 404 에러**
- `next.config.ts`의 `assetPrefix` 설정 확인
- CDN 경로 설정 확인
- 파일 경로 대소문자 확인

**4. 라우팅 문제**
- SPA 모드에서 새로고침 시 404
- 서버 리다이렉션 설정 필요
- `trailingSlash` 설정 확인

## 📞 배포 지원

배포 관련 문의사항이 있으시면:

- **기술 지원**: deploy@ryuin.studio
- **긴급 지원**: [GitHub Issues](https://github.com/ryuin/ryuin-website/issues)
- **배포 가이드**: [GitHub Wiki](https://github.com/ryuin/ryuin-website/wiki)

---

**Deploy with Confidence! 🚀** 