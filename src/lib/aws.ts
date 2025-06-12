import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// AWS S3 클라이언트 설정
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
  },
});

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * 파일을 S3에 업로드하는 함수
 * @param file 업로드할 파일
 * @param folder S3 내 폴더 경로 (선택사항)
 * @returns 업로드 결과 (성공 시 URL 포함)
 */
export const uploadFileToS3 = async (
  file: File,
  folder: string = 'contact-files'
): Promise<UploadResult> => {
  try {
    // 고유한 파일명 생성 (UUID + 원본 파일명)
    const fileName = `${uuidv4()}_${file.name}`;
    
    // S3 객체 키 생성
    const key = `${folder}/${fileName}`;
    
    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    
    // S3 업로드 명령 생성
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: key,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type,
      ContentDisposition: `attachment; filename="${file.name}"`,
    });
    
    // S3에 파일 업로드
    await s3Client.send(command);
    
    // 업로드된 파일의 URL 생성
    const url = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION || 'ap-northeast-2'}.amazonaws.com/${key}`;
    
    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error('S3 업로드 오류:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
};

/**
 * 여러 파일을 동시에 S3에 업로드하는 함수
 * @param files 업로드할 파일 배열
 * @param folder S3 내 폴더 경로 (선택사항)
 * @returns 업로드 결과 배열
 */
export const uploadMultipleFilesToS3 = async (
  files: File[],
  folder: string = 'contact-files'
): Promise<UploadResult[]> => {
  const uploadPromises = files.map(file => uploadFileToS3(file, folder));
  return Promise.all(uploadPromises);
};

/**
 * 허용된 파일 형식인지 확인하는 함수
 * @param file 확인할 파일
 * @param allowedExtensions 허용된 확장자 배열
 * @returns 허용 여부
 */
export const isAllowedFileType = (file: File, allowedExtensions: string[]): boolean => {
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  return allowedExtensions.includes(fileExtension);
};

/**
 * 파일 크기가 제한 범위 내인지 확인하는 함수
 * @param file 확인할 파일
 * @param maxSizeInMB 최대 크기 (MB)
 * @returns 크기 제한 준수 여부
 */
export const isFileSizeValid = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}; 