import { NextApiRequest, NextApiResponse } from 'next';
import emailjs from '@emailjs/nodejs';

// 서버사이드 환경 변수 (NEXT_PUBLIC_ 접두사 없음)
const EMAILJS_CONFIG = {
  serviceId: process.env.EMAILJS_SERVICE_ID || '',
  templateId: process.env.EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
  privateKey: process.env.EMAILJS_PRIVATE_KEY || '',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // CORS 및 Origin 검증
    const origin = req.headers.origin;
    const allowedOrigins = [
      'https://yourdomain.com',
      'https://www.yourdomain.com',
      'http://localhost:3000', // 개발용
    ];

    if (!origin || !allowedOrigins.includes(origin)) {
      return res.status(403).json({ message: 'Forbidden origin' });
    }

    // Rate limiting (간단한 구현)
    // 실제로는 Redis나 데이터베이스를 사용해야 함
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // EmailJS 설정 검증
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      return res.status(500).json({ message: 'EmailJS configuration incomplete' });
    }

    // 요청 데이터 검증
    const {
      companyName,
      contactPerson,
      phone,
      email,
      services,
      budget,
      benchmark1,
      benchmark2,
      benchmark3,
      projectDescription,
      fileUrls
    } = req.body;

    // 입력값 검증
    if (!companyName || !contactPerson || !email || !projectDescription) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // 템플릿 파라미터 구성
    const templateParams = {
      company_name: companyName,
      contact_person: contactPerson,
      phone: phone || '',
      email,
      services: services?.join(', ') || '선택된 서비스 없음',
      budget: budget || '예산 미선택',
      benchmark1: benchmark1 || '없음',
      benchmark2: benchmark2 || '없음',
      benchmark3: benchmark3 || '없음',
      project_description: projectDescription,
      file_urls: fileUrls?.length > 0 
        ? fileUrls.map((url: string, index: number) => `첨부파일 ${index + 1}: ${url}`).join('\n\n')
        : '첨부파일 없음',
      file_count: fileUrls?.length || 0,
      to_email: process.env.CONTACT_EMAIL || 'contact@ryuin.studio',
      sent_at: new Date().toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      client_ip: clientIP,
    };

    // EmailJS로 이메일 전송
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      {
        publicKey: EMAILJS_CONFIG.publicKey,
        privateKey: EMAILJS_CONFIG.privateKey,
      }
    );

    console.log('Email sent successfully:', response);

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: response.text 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : 'Internal server error'
    });
  }
} 