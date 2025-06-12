/**
 * 서버사이드 파일 업로드 유틸리티
 * 보안이 강화된 서버 업로드 방식
 */

export interface ServerUploadResult {
  success: boolean;
  url?: string;
  fileName?: string;
  fileSize?: number;
  key?: string;
  error?: string;
}

/**
 * 서버를 통해 파일을 S3에 업로드하는 함수
 * @param file 업로드할 파일
 * @param onProgress 업로드 진행률 콜백 (선택사항)
 * @returns 업로드 결과
 */
export const uploadFileToServer = async (
  file: File,
  onProgress?: (percent: number) => void
): Promise<ServerUploadResult> => {
  try {
    // FormData 생성
    const formData = new FormData();
    formData.append('file', file);

    // XMLHttpRequest를 사용하여 진행률 추적
    if (onProgress) {
      return uploadWithProgress(formData, onProgress);
    }

    // 일반 fetch 요청
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}: 업로드 실패`);
    }

    return result;

  } catch (error) {
    console.error('서버 업로드 오류:', error);
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.' 
    };
  }
};

/**
 * 진행률을 추적하는 업로드 함수
 * @param formData 업로드할 FormData
 * @param onProgress 진행률 콜백
 * @returns 업로드 결과
 */
const uploadWithProgress = (
  formData: FormData, 
  onProgress: (percent: number) => void
): Promise<ServerUploadResult> => {
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
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          const result = JSON.parse(xhr.responseText);
          resolve(result);
        } else {
          const errorResult = JSON.parse(xhr.responseText);
          resolve({
            success: false,
            error: errorResult.error || `HTTP ${xhr.status}: 업로드 실패`
          });
        }
      } catch {
        resolve({
          success: false,
          error: '응답 처리 중 오류가 발생했습니다.'
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
    
    // 요청 시작
    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  });
};

/**
 * 여러 파일을 순차적으로 서버에 업로드하는 함수
 * @param files 업로드할 파일 배열
 * @param onFileProgress 개별 파일 진행률 콜백
 * @param onTotalProgress 전체 진행률 콜백
 * @returns 업로드 결과 배열
 */
export const uploadMultipleFilesToServer = async (
  files: File[],
  onFileProgress?: (fileIndex: number, percent: number) => void,
  onTotalProgress?: (percent: number) => void
): Promise<ServerUploadResult[]> => {
  const results: ServerUploadResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      const result = await uploadFileToServer(file, (percent) => {
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
 * 파일 크기를 사람이 읽기 쉬운 형태로 변환
 * @param bytes 바이트 크기
 * @returns 포맷된 크기 문자열
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 파일 확장자 추출
 * @param fileName 파일명
 * @returns 확장자 (점 포함)
 */
export const getFileExtension = (fileName: string): string => {
  return '.' + fileName.split('.').pop()?.toLowerCase() || '';
};

/**
 * 파일이 이미지인지 확인
 * @param file 파일 객체
 * @returns 이미지 여부
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * 파일 업로드 상태 타입
 */
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

/**
 * 업로드 상태 관리를 위한 인터페이스
 */
export interface FileUploadState {
  file: File;
  status: UploadStatus;
  progress: number;
  result?: ServerUploadResult;
  error?: string;
} 