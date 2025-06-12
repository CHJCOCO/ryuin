# 문의하기 기능 설정 가이드

이 가이드는 EmailJS와 AWS S3를 연동한 문의하기 기능을 설정하는 방법을 안내합니다.

## 1. 환경변수 설정

`.env.local` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가하세요:

```env
# ==============================================
# 실제 환경 변수 설정
# 아래 값들을 실제 서비스에서 발급받은 값으로 변경하세요
# ==============================================

# 사이트 기본 설정
NEXT_PUBLIC_SITE_URL=https://ryuin.studio
NEXT_PUBLIC_SITE_NAME=ryuin

# 이메일 서비스 설정 (EmailJS)
# https://emailjs.com 에서 발급받은 값들로 변경하세요
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here

# AWS S3 설정 (파일 업로드용)
# AWS 콘솔에서 발급받은 값들로 변경하세요
NEXT_PUBLIC_AWS_REGION=ap-northeast-2
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
NEXT_PUBLIC_AWS_S3_BUCKET_NAME=your_s3_bucket_name_here

# 연락처 정보
NEXT_PUBLIC_CONTACT_EMAIL=contact@ryuin.studio
NEXT_PUBLIC_CONTACT_PHONE=010-1234-5678
NEXT_PUBLIC_BUSINESS_ADDRESS=서울특별시 강남구
NEXT_PUBLIC_BUSINESS_HOURS=평일 09:00 - 18:00

# 분석 도구 설정
NEXT_PUBLIC_GA_MEASUREMENT_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id_here

# 소셜 미디어 링크
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/ryuin.studio
NEXT_PUBLIC_GITHUB_URL=https://github.com/ryuin
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/ryuin
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/ryuin_studio

# 개발 환경 설정
NODE_ENV=development
```

## 2. EmailJS 설정

### 2.1 EmailJS 계정 생성
1. [EmailJS](https://emailjs.com) 사이트에 가입합니다.
2. 새 서비스를 생성합니다 (Gmail, Outlook 등).
3. 이메일 템플릿을 생성합니다.

### 2.2 이메일 템플릿 생성
EmailJS 대시보드에서 새 템플릿을 생성하고 다음 변수들을 사용하세요:

```html
<!-- 이메일 템플릿 예시 -->
<h2>새로운 프로젝트 문의</h2>

<h3>기본 정보</h3>
<p><strong>회사명:</strong> {{company_name}}</p>
<p><strong>담당자명:</strong> {{contact_person}}</p>
<p><strong>연락처:</strong> {{phone}}</p>
<p><strong>이메일:</strong> {{email}}</p>

<h3>프로젝트 정보</h3>
<p><strong>필요 서비스:</strong> {{services}}</p>
<p><strong>예산:</strong> {{budget}}</p>

<h3>벤치마킹 사이트</h3>
<p><strong>사이트 1:</strong> {{benchmark1}}</p>
<p><strong>사이트 2:</strong> {{benchmark2}}</p>
<p><strong>사이트 3:</strong> {{benchmark3}}</p>

<h3>프로젝트 설명</h3>
<p>{{project_description}}</p>

<h3>첨부 파일</h3>
<p>{{file_urls}}</p>

<hr>
<p><small>전송 시간: {{sent_at}}</small></p>
```

### 2.3 환경변수 설정
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: 서비스 ID
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: 템플릿 ID  
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: 공개 키

## 3. AWS S3 설정

### 3.1 S3 버킷 생성
1. AWS 콘솔에 로그인합니다.
2. S3 서비스로 이동합니다.
3. 새 버킷을 생성합니다.
4. 퍼블릭 읽기 권한을 설정합니다 (파일 다운로드용).

### 3.2 IAM 사용자 생성
1. IAM 서비스로 이동합니다.
2. 새 사용자를 생성합니다.
3. S3 관련 권한을 부여합니다:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

### 3.3 환경변수 설정
- `NEXT_PUBLIC_AWS_REGION`: AWS 리전 (예: ap-northeast-2)
- `NEXT_PUBLIC_AWS_ACCESS_KEY_ID`: IAM 사용자 액세스 키
- `NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY`: IAM 사용자 시크릿 키
- `NEXT_PUBLIC_AWS_S3_BUCKET_NAME`: S3 버킷 이름

## 4. 보안 고려사항

⚠️ **중요**: 클라이언트 사이드에서 AWS 자격 증명을 사용하는 것은 보안상 위험할 수 있습니다. 프로덕션 환경에서는 다음 중 하나를 고려하세요:

### 4.1 권장 방법: 서버사이드 업로드
- Next.js API 라우트를 사용해 서버에서 파일 업로드 처리
- 클라이언트에는 AWS 자격 증명 노출 안함

### 4.2 대안: Presigned URL 사용
- 서버에서 Presigned URL 생성
- 클라이언트는 해당 URL로 직접 업로드

### 4.3 최소 권한 원칙
- IAM 사용자에게 최소한의 권한만 부여
- 특정 버킷과 폴더에만 접근 허용

## 5. 테스트

1. 개발 서버를 시작합니다:
```bash
npm run dev
```

2. 문의하기 폼을 테스트합니다:
   - 모든 필수 필드 입력
   - 파일 첨부 (선택사항)
   - 제출 버튼 클릭

3. 확인사항:
   - 콘솔에 파일 업로드 로그 확인
   - 이메일 수신 확인
   - S3 버킷에 파일 업로드 확인

## 6. 문제 해결

### 6.1 EmailJS 오류
- Service ID, Template ID, Public Key 확인
- 이메일 서비스 연결 상태 확인
- 브라우저 콘솔에서 오류 메시지 확인

### 6.2 S3 업로드 오류
- AWS 자격 증명 확인
- S3 버킷 권한 설정 확인
- 파일 크기 및 형식 제한 확인
- CORS 설정 확인

### 6.3 CORS 설정 (S3)
S3 버킷에 다음 CORS 설정을 추가하세요:
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["PUT", "POST", "GET"],
        "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
        "ExposeHeaders": []
    }
]
```

## 7. 추가 기능

- 파일 업로드 진행률 표시
- 다중 파일 선택 지원
- 파일 미리보기 기능
- 이메일 템플릿 커스터마이징
- 스팸 방지 기능 (reCAPTCHA 등)

이제 문의하기 기능이 완전히 설정되었습니다! 🎉 