/**
 * Presigned URL을 사용한 파일 업로드 유틸리티
 * 보안과 성능의 균형을 맞춘 업로드 방식
 */

export interface PresignedUploadResult {
  success: boolean;
  url?: string;
  fileName?: string;
  fileSize?: number;
  key?: string;
  error?: string;
}

/**
 * Presigned URL을 사용하여 파일을 S3에 업로드하는 함수
 * @param file 업로드할 파일
 * @param onProgress 업로드 진행률 콜백 (선택사항)
 * @returns 업로드 결과
 */
export const uploadWithPresignedUrl = async (
  file: File,
  onProgress?: (percent: number) => void
): Promise<PresignedUploadResult> => {
  try {
    // 1단계: 서버에서 Presigned URL 요청
    const presignedResponse = await fetch('/api/presigned-url', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      }),
    });

    if (!presignedResponse.ok) {
      const errorData = await presignedResponse.json();
      throw new Error(errorData.error || 'Presigned URL 생성에 실패했습니다.');
    }

    const { presignedUrl, fileUrl, key } = await presignedResponse.json();

    // 2단계: Presigned URL을 사용하여 S3에 직접 업로드
    if (onProgress) {
      return uploadToS3WithProgress(presignedUrl, file, fileUrl, key, onProgress);
    } else {
      return uploadToS3(presignedUrl, file, fileUrl, key);
    }

  } catch (error) {
    console.error('Presigned URL 업로드 오류:', error);
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.' 
    };
  }
};

/**
 * S3에 파일을 직접 업로드 (진행률 추적 없음)
 */
const uploadToS3 = async (
  presignedUrl: string, 
  file: File, 
  fileUrl: string, 
  key: string
): Promise<PresignedUploadResult> => {
  const uploadResponse = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error(`S3 업로드 실패: ${uploadResponse.status} ${uploadResponse.statusText}`);
  }

  return { 
    success: true, 
    url: fileUrl,
    fileName: file.name,
    fileSize: file.size,
    key
  };
};

/**
 * S3에 파일을 직접 업로드 (진행률 추적 포함)
 */
const uploadToS3WithProgress = (
  presignedUrl: string, 
  file: File, 
  fileUrl: string, 
  key: string,
  onProgress: (percent: number) => void
): Promise<PresignedUploadResult> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    
    // 업로드 진행률 추적
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    });
    
    // 업로드 완료 처리
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({
          success: true, 
          url: fileUrl,
          fileName: file.name,
          fileSize: file.size,
          key
        });
      } else {
        resolve({
          success: false,
          error: `S3 업로드 실패: ${xhr.status} ${xhr.statusText}`
        });
      }
    });
    
    // 업로드 오류 처리
    xhr.addEventListener('error', () => {
      resolve({
        success: false,
        error: '네트워크 오류가 발생했습니다.'
      });
    });
    
    // 업로드 취소 처리
    xhr.addEventListener('abort', () => {
      resolve({
        success: false,
        error: '업로드가 취소되었습니다.'
      });
    });
    
    // S3 업로드 요청 시작
    xhr.open('PUT', presignedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
};

/**
 * 여러 파일을 Presigned URL로 업로드하는 함수
 * @param files 업로드할 파일 배열
 * @param onFileProgress 개별 파일 진행률 콜백
 * @param onTotalProgress 전체 진행률 콜백
 * @returns 업로드 결과 배열
 */
export const uploadMultipleWithPresignedUrl = async (
  files: File[],
  onFileProgress?: (fileIndex: number, percent: number) => void,
  onTotalProgress?: (percent: number) => void
): Promise<PresignedUploadResult[]> => {
  const results: PresignedUploadResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      const result = await uploadWithPresignedUrl(file, (percent) => {
        onFileProgress?.(i, percent);
        
        // 전체 진행률 계산
        if (onTotalProgress) {
          const totalPercent = Math.round(((i + percent / 100) / files.length) * 100);
          onTotalProgress(totalPercent);
        }
      });
      
      results.push(result);
      
    } catch (error) {
      results.push({
        success: false,
        error: error instanceof Error ? error.message : '업로드 실패'
      });
    }
  }
  
  return results;
};

/**
 * Presigned URL의 만료 시간을 확인하는 함수
 * @param presignedUrl Presigned URL
 * @returns 만료 여부
 */
export const isPresignedUrlExpired = (presignedUrl: string): boolean => {
  try {
    const url = new URL(presignedUrl);
    const expiresParam = url.searchParams.get('X-Amz-Expires');
    const dateParam = url.searchParams.get('X-Amz-Date');
    
    if (!expiresParam || !dateParam) {
      return true; // 매개변수가 없으면 만료된 것으로 간주
    }
    
    const expires = parseInt(expiresParam);
    const date = new Date(dateParam.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z'));
    const expirationTime = new Date(date.getTime() + expires * 1000);
    
    return new Date() > expirationTime;
  } catch {
    return true; // 파싱 오류 시 만료된 것으로 간주
  }
};

/**
 * 업로드 상태 관리를 위한 타입들
 */
export type PresignedUploadStatus = 'idle' | 'generating-url' | 'uploading' | 'success' | 'error';

export interface PresignedFileUploadState {
  file: File;
  status: PresignedUploadStatus;
  progress: number;
  presignedUrl?: string;
  result?: PresignedUploadResult;
  error?: string;
  expiresAt?: Date;
}

/**
 * 배치 업로드를 위한 헬퍼 함수
 * @param files 업로드할 파일들
 * @param batchSize 배치 크기 (기본값: 3)
 * @param onProgress 진행률 콜백
 * @returns 업로드 결과 배열
 */
export const uploadFilesInBatches = async (
  files: File[],
  batchSize: number = 3,
  onProgress?: (completed: number, total: number) => void
): Promise<PresignedUploadResult[]> => {
  const results: PresignedUploadResult[] = [];
  
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    
    // 배치 내 파일들을 병렬로 업로드
    const batchResults = await Promise.all(
      batch.map(file => uploadWithPresignedUrl(file))
    );
    
    results.push(...batchResults);
    
    // 진행률 업데이트
    if (onProgress) {
      onProgress(Math.min(i + batchSize, files.length), files.length);
    }
  }
  
  return results;
}; 