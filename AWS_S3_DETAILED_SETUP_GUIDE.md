# AWS S3 파일 업로드 상세 설정 가이드

이 가이드는 문의하기 기능에서 파일 업로드를 위한 AWS S3 설정을 단계별로 자세히 설명합니다.

## 📋 목차
1. [AWS S3 버킷 생성 (상세)](#1-aws-s3-버킷-생성-상세)
2. [IAM 사용자 생성 및 권한 설정 (상세)](#2-iam-사용자-생성-및-권한-설정-상세)
3. [보안 고려사항 (상세)](#3-보안-고려사항-상세)
4. [서버사이드 업로드 구현](#4-서버사이드-업로드-구현)
5. [Presigned URL 방식 구현](#5-presigned-url-방식-구현)
6. [CORS 설정 상세](#6-cors-설정-상세)
7. [문제 해결 및 디버깅](#7-문제-해결-및-디버깅)

---

## 1. AWS S3 버킷 생성 (상세)

### 1.1 AWS 콘솔 접근
1. [AWS Management Console](https://aws.amazon.com/console/)에 로그인
2. **서비스** 메뉴에서 **S3** 검색 후 선택
3. **Amazon S3** 대시보드로 이동

### 1.2 버킷 생성 과정

#### Step 1: 기본 설정
1. **버킷 만들기** 버튼 클릭
2. **버킷 이름** 입력 (전 세계적으로 고유해야 함)
   ```
   예시: ryuin-contact-files-2024
   ```
3. **AWS 리전** 선택
   ```
   권장: 아시아 태평양(서울) ap-northeast-2
   ```

#### Step 2: 객체 소유권 설정
1. **객체 소유권** 섹션에서 **ACL 비활성화됨(권장)** 선택
2. 이는 버킷 소유자가 모든 객체를 완전히 제어하게 함

#### Step 3: 퍼블릭 액세스 차단 설정
⚠️ **중요**: 보안을 위해 다음과 같이 설정하세요:

**개발/테스트 환경:**
```
□ 새 퍼블릭 ACL을 통해 부여된 버킷 및 객체에 대한 퍼블릭 액세스 차단
□ 임의의 퍼블릭 ACL을 통해 부여된 버킷 및 객체에 대한 퍼블릭 액세스 차단
☑ 새 퍼블릭 버킷 또는 액세스 지점 정책을 통해 부여된 버킷 및 객체에 대한 퍼블릭 액세스 차단
☑ 임의의 퍼블릭 버킷 또는 액세스 지점 정책을 통해 부여된 버킷 및 객체에 대한 퍼블릭 액세스 차단
```

**프로덕션 환경 (권장):**
```
☑ 모든 퍼블릭 액세스 차단 (권장)
```

#### Step 4: 버킷 버전 관리
1. **버킷 버전 관리** 섹션
2. **비활성화** 선택 (비용 절약을 위해, 필요시 활성화)

#### Step 5: 기본 암호화
1. **기본 암호화** 섹션
2. **Amazon S3 관리형 키(SSE-S3)** 선택 (기본값)
3. **버킷 키** 활성화 (비용 절약)

#### Step 6: 고급 설정
1. **객체 잠금** - 비활성화 (일반적인 파일 업로드에는 불필요)
2. **버킷 만들기** 클릭으로 완료

---

## 2. IAM 사용자 생성 및 권한 설정 (상세)

### 2.1 IAM 서비스 접근
1. AWS 콘솔에서 **IAM** 서비스 검색 후 선택
2. 왼쪽 메뉴에서 **사용자** 클릭

### 2.2 새 사용자 생성

#### Step 1: 사용자 세부 정보
1. **사용자 생성** 버튼 클릭
2. **사용자 이름** 입력
   ```
   예시: ryuin-s3-uploader
   ```
3. **AWS Management Console에 대한 사용자 액세스 권한 제공** 체크 해제
   (프로그래매틱 액세스만 필요)

#### Step 2: 권한 설정
**옵션 1: 기존 정책 직접 연결**
1. **기존 정책 직접 연결** 선택
2. **AmazonS3FullAccess** 검색 (⚠️ 개발용만, 프로덕션에서는 권장하지 않음)

**옵션 2: 사용자 지정 정책 생성 (권장)**
1. **정책 직접 생성** 클릭
2. **JSON** 탭 선택
3. 다음 정책 입력:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ListBucketContents",
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": "arn:aws:s3:::ryuin-contact-files-2024"
        },
        {
            "Sid": "UploadAndReadFiles",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::ryuin-contact-files-2024/contact-files/*"
        }
    ]
}
```

4. **정책 이름** 입력: `RyuinS3ContactUploadPolicy`
5. **정책 생성** 클릭

#### Step 3: 액세스 키 생성
1. 생성된 사용자 클릭
2. **보안 자격 증명** 탭으로 이동
3. **액세스 키 생성** 클릭
4. **애플리케이션 외부에서 실행되는 코드** 선택
5. **다음** 클릭
6. **설명 태그** 입력 (선택사항): `Ryuin Contact File Upload`
7. **액세스 키 생성** 클릭
8. ⚠️ **중요**: **액세스 키 ID**와 **비밀 액세스 키**를 안전한 곳에 저장

---

## 3. 보안 고려사항 (상세)

### 3.1 현재 구현의 보안 위험

#### 🚨 클라이언트 사이드 위험요소
```typescript
// ❌ 위험: 클라이언트에 AWS 자격 증명 노출
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,    // 브라우저에 노출!
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY // 브라우저에 노출!
  },
});
```

#### 위험 요소 분석
1. **자격 증명 노출**: `NEXT_PUBLIC_` 접두사로 인해 브라우저에서 접근 가능
2. **무제한 업로드**: 악의적 사용자가 대량 파일 업로드 가능
3. **비용 증가**: 의도하지 않은 AWS 사용량 증가
4. **데이터 유출**: S3 버킷의 다른 파일에 접근 가능성

### 3.2 보안 레벨별 구현 방법

#### 🟥 레벨 1: 최소 보안 (현재 구현)
- **용도**: 개발/테스트 환경만
- **장점**: 구현 간단, 빠른 개발
- **단점**: 보안 위험 높음

#### 🟨 레벨 2: 제한된 권한
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::your-bucket/contact-files/*",
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-content-sha256": "UNSIGNED-PAYLOAD"
                },
                "NumericLessThan": {
                    "s3:content-length": "5242880"  // 5MB 제한
                }
            }
        }
    ]
}
```

#### 🟩 레벨 3: 서버사이드 업로드 (권장)
- **용도**: 프로덕션 환경
- **장점**: 완전한 보안, 세밀한 제어
- **단점**: 구현 복잡도 증가

#### 🟦 레벨 4: Presigned URL (균형)
- **용도**: 보안과 성능의 균형
- **장점**: 서버 부하 적음, 보안 양호
- **단점**: 중간 복잡도

---

## 4. 서버사이드 업로드 구현

### 4.1 API 라우트 생성

```typescript
// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// 서버에서만 사용되는 S3 클라이언트 (환경변수에 NEXT_PUBLIC_ 접두사 없음)
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    }

    // 파일 검증
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: '파일 크기가 5MB를 초과합니다.' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: '허용되지 않은 파일 형식입니다.' }, { status: 400 });
    }

    // 파일 업로드
    const fileName = `${uuidv4()}_${file.name}`;
    const key = `contact-files/${fileName}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type,
    });

    await s3Client.send(command);
    
    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    
    return NextResponse.json({ success: true, url });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: '업로드 실패' }, { status: 500 });
  }
}
```

### 4.2 클라이언트 수정

```typescript
// src/lib/upload.ts
export const uploadFileToServer = async (file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || '업로드 실패');
    }

    return { success: true, url: result.url };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '알 수 없는 오류' 
    };
  }
};
```

### 4.3 환경변수 (서버 전용)

```env
# .env.local (NEXT_PUBLIC_ 접두사 제거)
AWS_REGION=ap-northeast-2
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_S3_BUCKET_NAME=your_bucket_name
```

---

## 5. Presigned URL 방식 구현

### 5.1 Presigned URL API 생성

```typescript
// src/app/api/presigned-url/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, fileSize } = await request.json();

    // 파일 검증
    if (fileSize > 5 * 1024 * 1024) {
      return NextResponse.json({ error: '파일 크기가 5MB를 초과합니다.' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json({ error: '허용되지 않은 파일 형식입니다.' }, { status: 400 });
    }

    // Presigned URL 생성
    const key = `contact-files/${uuidv4()}_${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5분 유효

    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ 
      presignedUrl, 
      fileUrl, 
      key 
    });

  } catch (error) {
    console.error('Presigned URL error:', error);
    return NextResponse.json({ error: 'URL 생성 실패' }, { status: 500 });
  }
}
```

### 5.2 클라이언트 Presigned URL 사용

```typescript
// src/lib/presignedUpload.ts
export const uploadWithPresignedUrl = async (file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // 1. Presigned URL 요청
    const response = await fetch('/api/presigned-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      }),
    });

    if (!response.ok) {
      throw new Error('Presigned URL 생성 실패');
    }

    const { presignedUrl, fileUrl } = await response.json();

    // 2. 파일을 S3에 직접 업로드
    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('파일 업로드 실패');
    }

    return { success: true, url: fileUrl };

  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '알 수 없는 오류' 
    };
  }
};
```

---

## 6. CORS 설정 상세

### 6.1 S3 CORS 정책 설정

1. S3 버킷 선택
2. **권한** 탭 클릭
3. **CORS(Cross-origin resource sharing)** 섹션의 **편집** 클릭
4. 다음 JSON 입력:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
            "http://localhost:3000",
            "http://localhost:3001",
            "https://yourdomain.com",
            "https://www.yourdomain.com"
        ],
        "ExposeHeaders": [
            "ETag",
            "x-amz-version-id"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

### 6.2 CORS 설정 항목 설명

- **AllowedHeaders**: 클라이언트가 보낼 수 있는 헤더
- **AllowedMethods**: 허용되는 HTTP 메서드
- **AllowedOrigins**: 접근을 허용할 도메인 (개발/프로덕션 모두 포함)
- **ExposeHeaders**: 클라이언트가 접근할 수 있는 응답 헤더
- **MaxAgeSeconds**: 브라우저가 CORS 정보를 캐시하는 시간

---

## 7. 문제 해결 및 디버깅

### 7.1 일반적인 오류들

#### 🚨 AccessDenied 오류
```
Access Denied (Service: S3, Status Code: 403)
```

**해결 방법:**
1. IAM 사용자 권한 확인
2. 버킷 정책 확인
3. 퍼블릭 액세스 차단 설정 확인

#### 🚨 CORS 오류
```
CORS policy: No 'Access-Control-Allow-Origin' header
```

**해결 방법:**
1. S3 버킷 CORS 설정 확인
2. AllowedOrigins에 현재 도메인 추가
3. 브라우저 캐시 삭제

#### 🚨 파일 크기 오류
```
EntityTooLarge: Your proposed upload exceeds the maximum allowed size
```

**해결 방법:**
1. 파일 크기 제한 확인 (5MB)
2. 클라이언트 사이드 검증 추가
3. 서버 사이드 검증 강화

### 7.2 디버깅 도구

#### 브라우저 개발자 도구
```javascript
// 콘솔에서 환경변수 확인
console.log('AWS Region:', process.env.NEXT_PUBLIC_AWS_REGION);
console.log('Bucket Name:', process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME);
// ⚠️ 주의: 실제 키는 로그하지 마세요!
```

#### AWS CloudTrail 로그
1. AWS 콘솔에서 CloudTrail 서비스 이동
2. **이벤트 기록** 에서 S3 관련 API 호출 확인
3. 오류 원인 분석

### 7.3 성능 최적화

#### 파일 압축
```typescript
// 이미지 파일 압축 예시
const compressImage = (file: File, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }));
          }
        },
        file.type,
        quality
      );
    };
    
    img.src = URL.createObjectURL(file);
  });
};
```

#### 업로드 진행률 표시
```typescript
// XMLHttpRequest를 사용한 진행률 추적
const uploadWithProgress = (file: File, onProgress: (percent: number) => void): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        onProgress(percent);
      }
    });
    
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(new Error('Upload failed'));
      }
    };
    
    // ... 업로드 로직
  });
};
```

---

## 📝 체크리스트

업로드 기능 구현 후 다음 항목들을 확인하세요:

### 보안 체크리스트
- [ ] AWS 자격 증명이 클라이언트에 노출되지 않음
- [ ] IAM 사용자가 최소 권한만 보유
- [ ] S3 버킷 퍼블릭 액세스가 적절히 제한됨
- [ ] 파일 크기 및 형식 검증이 클라이언트/서버 양쪽에서 수행됨
- [ ] CORS 설정이 필요한 도메인만 허용

### 기능 체크리스트
- [ ] 파일 업로드 성공/실패 처리
- [ ] 진행률 표시 (선택사항)
- [ ] 에러 메시지 사용자 친화적 표시
- [ ] 업로드된 파일 URL 이메일에 포함
- [ ] 다양한 파일 형식 테스트

### 성능 체크리스트
- [ ] 대용량 파일 처리 테스트
- [ ] 동시 업로드 처리 테스트
- [ ] 네트워크 오류 시 재시도 로직
- [ ] 브라우저 호환성 테스트

이제 보안이 강화된 파일 업로드 시스템을 구축할 수 있습니다! 🚀 