import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 서버사이드 환경 변수 확인 (클라이언트에 노출되지 않음)
    const isValid = !!(
      process.env.EMAILJS_SERVICE_ID && 
      process.env.EMAILJS_TEMPLATE_ID && 
      process.env.EMAILJS_PUBLIC_KEY
    );

    res.status(200).json({ isValid });

  } catch (error) {
    console.error('EmailJS 설정 확인 오류:', error);
    res.status(500).json({ isValid: false, message: 'Internal server error' });
  }
} 