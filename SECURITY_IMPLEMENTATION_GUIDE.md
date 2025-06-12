# 보안 구현 방법 비교 가이드

이 가이드는 파일 업로드 기능의 보안 수준별 구현 방법을 비교하고 선택 기준을 제공합니다.

## 📊 구현 방법 비교

| 구분 | 클라이언트 직접 업로드 | 서버사이드 업로드 | Presigned URL |
|------|------------------|-----------------|---------------|
| **보안 수준** | 🟥 낮음 | 🟩 높음 | 🟨 중간 |
| **구현 난이도** | 🟩 쉬움 | 🟥 복잡 | 🟨 중간 |
| **서버 부하** | 🟩 없음 | 🟥 높음 | 🟩 없음 |
| **비용** | 🟨 중간 | 🟥 높음 | 🟩 낮음 |
| **제어 수준** | 🟥 제한적 | 🟩 완전 | 🟨 중간 |

## 🎯 선택 기준

### 개발/테스트 환경
- **클라이언트 직접 업로드** 권장
- 빠른 개발과 테스트에 적합
- 보안 위험은 있지만 개발 단계에서는 수용 가능

### 소규모 프로덕션
- **Presigned URL** 권장
- 보안과 성능의 균형
- 서버 리소스 절약

### 대규모 프로덕션
- **서버사이드 업로드** 권장
- 최고 수준의 보안
- 완전한 파일 제어 가능

## 🔄 현재 구현에서 서버사이드로 전환

### 1. 환경변수 변경

**기존 (클라이언트 노출):**
```env
NEXT_PUBLIC_AWS_REGION=ap-northeast-2
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your_access_key
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your_secret_key
NEXT_PUBLIC_AWS_S3_BUCKET_NAME=your_bucket
```

**변경 후 (서버 전용):**
```env
AWS_REGION=ap-northeast-2
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET_NAME=your_bucket
```

### 2. ContactSection 교체

**현재 파일 구조:**
```
src/features/contact/
├── ContactSection.tsx          # 현재 (클라이언트 업로드)
└── ContactSectionSecure.tsx    # 새로운 (서버 업로드)
```

**교체 방법:**
```typescript
// src/features/contact/index.ts 또는 사용하는 곳에서
// import ContactSection from './ContactSection';           // 기존
import ContactSection from './ContactSectionSecure';        // 새로운
```

### 3. 추가 기능

서버사이드 버전에 포함된 개선사항:
- ✅ 실시간 업로드 진행률 표시
- ✅ 파일별 상태 관리 (업로드 중, 성공, 실패)
- ✅ 더 나은 오류 처리
- ✅ 파일 크기 및 형식 표시
- ✅ 이미지 파일 감지
- ✅ 시각적 피드백 개선

## 🔐 보안 강화 옵션

### Level 1: 기본 서버사이드 (현재)
```typescript
// src/app/api/upload/route.ts
// 기본적인 파일 검증 및 업로드
```

### Level 2: 파일 스캔 추가
```typescript
// 바이러스 스캔, 악성 코드 검사
import { scanFile } from '@/lib/security';

const scanResult = await scanFile(file);
if (!scanResult.safe) {
  return NextResponse.json({ error: '보안 위험이 감지되었습니다.' });
}
```

### Level 3: 사용자 인증 추가
```typescript
// JWT 토큰 또는 세션 검증
import { verifyAuth } from '@/lib/auth';

const user = await verifyAuth(request);
if (!user) {
  return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
}
```

### Level 4: 업로드 제한 추가
```typescript
// IP별, 사용자별 업로드 제한
import { checkRateLimit } from '@/lib/rateLimit';

const rateLimitOk = await checkRateLimit(clientIP, user.id);
if (!rateLimitOk) {
  return NextResponse.json({ error: '업로드 한도를 초과했습니다.' }, { status: 429 });
}
```

## 🛠 추가 보안 조치

### 1. S3 버킷 정책 강화
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyPublicRead",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket/*",
      "Condition": {
        "StringNotEquals": {
          "aws:PrincipalServiceName": [
            "cloudfront.amazonaws.com"
          ]
        }
      }
    }
  ]
}
```

### 2. CloudFront 배포 설정
```typescript
// 파일 접근을 CloudFront를 통해서만 허용
const fileUrl = `https://your-cloudfront-domain.com/${key}`;
```

### 3. 파일 암호화
```typescript
// S3 업로드 시 KMS 키 사용
const command = new PutObjectCommand({
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Key: key,
  Body: new Uint8Array(arrayBuffer),
  ServerSideEncryption: 'aws:kms',
  SSEKMSKeyId: process.env.AWS_KMS_KEY_ID,
});
```

### 4. 파일 생명주기 관리
```typescript
// 일정 기간 후 파일 자동 삭제
const command = new PutObjectCommand({
  // ... 기존 설정
  Metadata: {
    'expiry-date': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30일 후
  }
});
```

## 📝 마이그레이션 체크리스트

### 환경 설정
- [ ] 환경변수에서 `NEXT_PUBLIC_` 접두사 제거
- [ ] 서버 전용 환경변수 설정 확인
- [ ] AWS IAM 권한 재검토

### 코드 변경
- [ ] API 라우트 구현 확인
- [ ] 클라이언트 업로드 함수 교체
- [ ] ContactSection 컴포넌트 교체
- [ ] 에러 처리 로직 확인

### 테스트
- [ ] 파일 업로드 기능 테스트
- [ ] 다양한 파일 형식 테스트
- [ ] 파일 크기 제한 테스트
- [ ] 오류 상황 테스트
- [ ] 진행률 표시 확인

### 모니터링
- [ ] AWS CloudWatch 로그 설정
- [ ] 업로드 성공률 모니터링
- [ ] 에러 발생률 추적
- [ ] 비용 모니터링 설정

## 🚀 성능 최적화

### 1. 동시 업로드 제한
```typescript
// 최대 3개 파일까지 동시 업로드
const concurrentUploads = Math.min(files.length, 3);
```

### 2. 파일 압축
```typescript
// 이미지 파일 자동 압축
if (isImageFile(file) && file.size > 1024 * 1024) { // 1MB 이상
  file = await compressImage(file, 0.8);
}
```

### 3. 청크 업로드
```typescript
// 대용량 파일을 청크 단위로 업로드
const chunkSize = 5 * 1024 * 1024; // 5MB 청크
if (file.size > chunkSize) {
  return uploadInChunks(file, chunkSize);
}
```

## 🔍 모니터링 및 로깅

### 업로드 메트릭
```typescript
// 업로드 성공률, 평균 시간 등 추적
const metrics = {
  uploadTime: Date.now() - startTime,
  fileSize: file.size,
  fileType: file.type,
  success: true
};

// 메트릭 수집 서비스로 전송
await sendMetrics(metrics);
```

### 보안 로그
```typescript
// 의심스러운 활동 로깅
if (file.size > 50 * 1024 * 1024) { // 50MB 이상
  await logSecurityEvent({
    type: 'LARGE_FILE_UPLOAD',
    ip: getClientIP(request),
    fileName: file.name,
    fileSize: file.size
  });
}
```

이제 보안이 크게 강화된 파일 업로드 시스템을 구축할 수 있습니다! 🔒 