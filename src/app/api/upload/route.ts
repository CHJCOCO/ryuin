import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// 서버에서만 사용되는 S3 클라이언트 (환경변수에 NEXT_PUBLIC_ 접두사 없음)
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// 허용된 파일 형식 (더 유연하게)
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
  'image/jpg',                            // JPG (대안)
  'image/png',                            // PNG
  'application/zip',                      // ZIP
  'application/x-zip-compressed',         // ZIP (대안)
  'application/octet-stream',             // 기타 바이너리 파일
  '',                                     // 빈 MIME 타입도 허용
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
    // FormData에서 파일 추출
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ 
        success: false,
        error: '파일이 선택되지 않았습니다.' 
      }, { status: 400 });
    }

    // 파일 정보 로깅
    const hasKorean = /[가-힣]/.test(file.name);
    console.log(`파일 업로드 시도: ${file.name} ${hasKorean ? '(한글포함)' : '(영문)'}, 크기: ${file.size}B, MIME: ${file.type}`);

    // 파일 크기 검증 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ 
        success: false,
        error: '파일 크기가 5MB를 초과합니다.' 
      }, { status: 400 });
    }

    // 파일 크기가 0인 경우
    if (file.size === 0) {
      return NextResponse.json({ 
        success: false,
        error: '빈 파일은 업로드할 수 없습니다.' 
      }, { status: 400 });
    }

    // 파일 확장자 검증
    if (!isValidFileExtension(file.name)) {
      return NextResponse.json({ 
        success: false,
        error: `허용되지 않은 파일 형식입니다. 허용 형식: ${allowedExtensions.join(', ')}` 
      }, { status: 400 });
    }

    // MIME 타입 검증 (더 유연하게, 확장자 우선)
    if (!isValidMimeType(file.type)) {
      console.warn(`MIME 타입 불일치 - 파일명: ${file.name}, MIME: ${file.type}, 하지만 확장자로 통과`);
      // MIME 타입이 맞지 않아도 확장자가 올바르면 통과
    }

    // AWS S3 설정 확인
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_S3_BUCKET_NAME) {
      console.error('AWS S3 환경변수가 설정되지 않았습니다.');
      console.error(`파일명: ${file.name}, 한글포함: ${hasKorean}`);
      console.error(`AWS_ACCESS_KEY_ID: ${process.env.AWS_ACCESS_KEY_ID ? '설정됨' : '없음'}`);
      console.error(`AWS_SECRET_ACCESS_KEY: ${process.env.AWS_SECRET_ACCESS_KEY ? '설정됨' : '없음'}`);
      console.error(`AWS_S3_BUCKET_NAME: ${process.env.AWS_S3_BUCKET_NAME ? '설정됨' : '없음'}`);
      return NextResponse.json({ 
        success: false,
        error: '서버 설정 오류입니다. 관리자에게 문의하세요.' 
      }, { status: 500 });
    }

    // 안전한 파일명 생성 (한글 파일명 처리)
    let safeName: string;
    let key: string;
    
    try {
      const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
      
      console.log(`파일명 처리 시작: ${file.name}`);
      
      safeName = file.name
        .replace(/[^a-zA-Z0-9가-힣.\-_]/g, '_') // 특수문자를 _로 변경
        .replace(/\s+/g, '_'); // 공백을 _로 변경
      
      console.log(`안전한 파일명: ${safeName}`);
      
      // UUID + 타임스탬프 + 안전한 원본 파일명
      const fileName = `${uuidv4()}_${timestamp}_${safeName}`;
      key = `contact-files/${fileName}`;
      
      console.log(`최종 S3 키: ${key}`);
    } catch (nameError) {
      console.error('파일명 처리 오류:', nameError);
      return NextResponse.json({ 
        success: false,
        error: '파일명 처리 중 오류가 발생했습니다.' 
      }, { status: 400 });
    }
    
    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    
    // S3 업로드 명령 생성
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type || 'application/octet-stream', // MIME 타입이 없으면 기본값 설정
      ContentDisposition: `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`,
      Metadata: {
        'original-name': Buffer.from(file.name, 'utf8').toString('base64'), // Base64로 인코딩
        'original-name-utf8': encodeURIComponent(file.name), // URL 인코딩
        'upload-timestamp': new Date().toISOString(),
        'file-size': file.size.toString(),
        'safe-filename': Buffer.from(safeName, 'utf8').toString('base64'), // Base64로 인코딩
      },
    });

    // S3에 파일 업로드
    await s3Client.send(command);
    
    // 업로드된 파일의 URL 생성
    const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'ap-northeast-2'}.amazonaws.com/${key}`;
    
    console.log(`파일 업로드 성공: ${file.name} -> ${key}`);
    console.log(`안전한 파일명: ${safeName}`);
    
    return NextResponse.json({ 
      success: true, 
      url,
      fileName: file.name,
      fileSize: file.size,
      key
    });
    
  } catch (error) {
    console.error('파일 업로드 오류:', error);
    
    // 구체적인 오류 메시지 제공
    let errorMessage = '파일 업로드 중 오류가 발생했습니다.';
    
    if (error instanceof Error) {
      if (error.message.includes('NoSuchBucket')) {
        errorMessage = 'S3 버킷을 찾을 수 없습니다.';
      } else if (error.message.includes('AccessDenied')) {
        errorMessage = 'S3 접근 권한이 없습니다.';
      } else if (error.message.includes('NetworkingError')) {
        errorMessage = '네트워크 연결 오류입니다.';
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