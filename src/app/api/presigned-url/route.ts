import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// 서버에서만 사용되는 S3 클라이언트
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// 허용된 파일 형식
const allowedTypes = [
  'application/vnd.hancom.hwp',           // HWP
  'application/msword',                   // DOC
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'application/vnd.ms-excel',             // XLS
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
  'application/vnd.ms-powerpoint',        // PPT
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
  'application/pdf',                      // PDF
  'image/jpeg',                           // JPG, JPEG
  'image/png',                            // PNG
  'application/zip',                      // ZIP
];

// 허용된 파일 확장자
const allowedExtensions = ['.hwp', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.jpg', '.jpeg', '.png', '.zip'];

/**
 * 파일 확장자 검증
 */
const isValidFileExtension = (fileName: string): boolean => {
  const extension = '.' + fileName.split('.').pop()?.toLowerCase();
  return allowedExtensions.includes(extension);
};

/**
 * 파일 MIME 타입 검증
 */
const isValidMimeType = (mimeType: string): boolean => {
  return allowedTypes.includes(mimeType);
};

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, fileSize } = await request.json();

    // 입력값 검증
    if (!fileName || !fileType || typeof fileSize !== 'number') {
      return NextResponse.json({ 
        success: false,
        error: '파일 정보가 올바르지 않습니다.' 
      }, { status: 400 });
    }

    // 파일 크기 검증 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (fileSize > maxSize) {
      return NextResponse.json({ 
        success: false,
        error: '파일 크기가 5MB를 초과합니다.' 
      }, { status: 400 });
    }

    // 파일 크기가 0인 경우
    if (fileSize === 0) {
      return NextResponse.json({ 
        success: false,
        error: '빈 파일은 업로드할 수 없습니다.' 
      }, { status: 400 });
    }

    // 파일 확장자 검증
    if (!isValidFileExtension(fileName)) {
      return NextResponse.json({ 
        success: false,
        error: `허용되지 않은 파일 형식입니다. 허용 형식: ${allowedExtensions.join(', ')}` 
      }, { status: 400 });
    }

    // MIME 타입 검증
    if (!isValidMimeType(fileType)) {
      return NextResponse.json({ 
        success: false,
        error: '파일 형식이 올바르지 않습니다.' 
      }, { status: 400 });
    }

    // AWS S3 설정 확인
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_S3_BUCKET_NAME) {
      console.error('AWS S3 환경변수가 설정되지 않았습니다.');
      return NextResponse.json({ 
        success: false,
        error: '서버 설정 오류입니다. 관리자에게 문의하세요.' 
      }, { status: 500 });
    }

    // 고유한 파일명 생성
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
    const uniqueFileName = `${uuidv4()}_${timestamp}_${fileName}`;
    const key = `contact-files/${uniqueFileName}`;

    // Presigned URL 생성
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
      ContentLength: fileSize,
      ContentDisposition: `attachment; filename="${encodeURIComponent(fileName)}"`,
      Metadata: {
        'original-name': fileName,
        'upload-timestamp': new Date().toISOString(),
        'file-size': fileSize.toString(),
      },
    });

    // Presigned URL 생성 (5분 유효)
    const presignedUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 300 // 5분
    });

    // 업로드 완료 후 파일 접근 URL
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'ap-northeast-2'}.amazonaws.com/${key}`;

    console.log(`Presigned URL 생성 성공: ${fileName} -> ${key}`);

    return NextResponse.json({ 
      success: true,
      presignedUrl, 
      fileUrl, 
      key,
      expiresIn: 300 // 5분
    });

  } catch (error) {
    console.error('Presigned URL 생성 오류:', error);
    
    // 구체적인 오류 메시지 제공
    let errorMessage = 'Presigned URL 생성 중 오류가 발생했습니다.';
    
    if (error instanceof Error) {
      if (error.message.includes('NoSuchBucket')) {
        errorMessage = 'S3 버킷을 찾을 수 없습니다.';
      } else if (error.message.includes('AccessDenied')) {
        errorMessage = 'S3 접근 권한이 없습니다.';
      } else if (error.message.includes('InvalidBucketName')) {
        errorMessage = 'S3 버킷 이름이 올바르지 않습니다.';
      }
    }
    
    return NextResponse.json({ 
      success: false,
      error: errorMessage 
    }, { status: 500 });
  }
}

// OPTIONS 메서드 처리 (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 