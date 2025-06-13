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
  messageId?: string;
}

/**
 * 서버사이드 API를 통해 안전하게 이메일을 전송하는 함수
 * @param data 이메일에 포함될 데이터
 * @returns 전송 결과
 */
export const sendContactEmailSecure = async (data: EmailData): Promise<EmailResult> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      messageId: result.messageId,
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
 * 환경 변수 노출 없이 EmailJS 설정 상태를 확인하는 함수
 * @returns 설정 유효성 여부 (서버에서 검증)
 */
export const checkEmailConfigSecure = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/check-email-config', {
      method: 'GET',
    });

    const result = await response.json();
    return result.isValid || false;

  } catch (error) {
    console.error('EmailJS 설정 확인 오류:', error);
    return false;
  }
}; 