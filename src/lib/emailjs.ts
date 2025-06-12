import emailjs from '@emailjs/browser';

// EmailJS 설정
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

export interface EmailData {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  services: string[];
  budget: string;
  benchmark1?: string;
  benchmark2?: string;
  benchmark3?: string;
  projectDescription: string;
  fileUrls?: string[];
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

/**
 * 문의 이메일을 전송하는 함수
 * @param data 이메일에 포함될 데이터
 * @returns 전송 결과
 */
export const sendContactEmail = async (data: EmailData): Promise<EmailResult> => {
  try {
    // EmailJS 설정이 완료되었는지 확인
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      throw new Error('EmailJS 설정이 완료되지 않았습니다. 환경변수를 확인해주세요.');
    }

    // 이메일 템플릿에 전달할 매개변수 구성
    const templateParams = {
      // 기본 정보
      company_name: data.companyName,
      contact_person: data.contactPerson,
      phone: data.phone,
      email: data.email,
      
      // 서비스 정보
      services: data.services.length > 0 ? data.services.join(', ') : '선택된 서비스 없음',
      budget: data.budget || '예산 미선택',
      
      // 벤치마킹 사이트
      benchmark1: data.benchmark1 || '없음',
      benchmark2: data.benchmark2 || '없음',
      benchmark3: data.benchmark3 || '없음',
      
      // 프로젝트 설명
      project_description: data.projectDescription,
      
      // 첨부 파일 URL들 (더 보기 좋게 포맷)
      file_urls: data.fileUrls && data.fileUrls.length > 0 
        ? data.fileUrls.map((url, index) => `첨부파일 ${index + 1}: ${url}`).join('\n\n')
        : '첨부파일 없음',
      
      // 첨부 파일 개수
      file_count: data.fileUrls ? data.fileUrls.length : 0,
      
      // 수신자 이메일 (템플릿에서 사용)
      to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@ryuin.studio',
      
      // 전송 시간
      sent_at: new Date().toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };

    // EmailJS를 통해 이메일 전송
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('이메일 전송 성공:', response);
    
    return {
      success: true,
    };
    
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
};

/**
 * EmailJS 초기화 함수 (필요한 경우)
 */
export const initializeEmailJS = () => {
  if (EMAILJS_CONFIG.publicKey) {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }
};

/**
 * EmailJS 설정이 유효한지 확인하는 함수
 * @returns 설정 유효성 여부
 */
export const isEmailJSConfigValid = (): boolean => {
  return !!(
    EMAILJS_CONFIG.serviceId && 
    EMAILJS_CONFIG.templateId && 
    EMAILJS_CONFIG.publicKey
  );
}; 