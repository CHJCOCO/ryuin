'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpTrayIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { uploadMultipleFilesToServer, formatFileSize, isImageFile, type FileUploadState, type UploadStatus } from '@/lib/serverUpload';
import { sendContactEmail, initializeEmailJS, isEmailJSConfigValid } from '@/lib/emailjs';

interface FormData {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  services: string[];
  budget: string;
  benchmark1: string;
  benchmark2: string;
  benchmark3: string;
  projectDescription: string;
  privacyConsent: boolean;
}

const ContactSectionSecure = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileStates, setFileStates] = useState<FileUploadState[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: number]: number }>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  // EmailJS 초기화
  useEffect(() => {
    initializeEmailJS();
  }, []);

  const serviceOptions = [
    '홈페이지 제작',
    '쇼핑몰 제작',
    'SI/SM 개발',
    '이외의 웹/시스템 개발'
  ];

  const budgetOptions = [
    '예산을 선택해주세요 (필수)',
    '500만원 미만',
    '500만원 ~ 1,000만원',
    '1,000만원 ~ 3,000만원',
    '3,000만원 ~ 5,000만원',
    '5,000만원 이상',
    '협의 후 결정'
  ];

  const allowedExtensions = ['.hwp', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.jpg', '.jpeg', '.png', '.zip'];

  const handleFileUpload = (fileIndex: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // 파일 크기 검증 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 5MB 이하로 업로드해주세요.');
      return;
    }

    // 파일 형식 검증
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert('허용되지 않은 파일 형식입니다.\n허용 형식: ' + allowedExtensions.join(', '));
      return;
    }

    // 파일 상태 업데이트
    const newFileStates = [...fileStates];
    newFileStates[fileIndex] = {
      file,
      status: 'idle',
      progress: 0
    };
    setFileStates(newFileStates);
  };

  const removeFile = (fileIndex: number) => {
    const newFileStates = [...fileStates];
    newFileStates[fileIndex] = {
      file: new File([], ''),
      status: 'idle',
      progress: 0
    };
    setFileStates(newFileStates);
    
    // 진행률 상태도 제거
    const newProgress = { ...uploadProgress };
    delete newProgress[fileIndex];
    setUploadProgress(newProgress);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS 설정 확인
      if (!isEmailJSConfigValid()) {
        throw new Error('EmailJS 설정이 완료되지 않았습니다.');
      }

      let fileUrls: string[] = [];

      // 업로드할 파일들 수집
      const filesToUpload = fileStates
        .filter(state => state.file.size > 0)
        .map(state => state.file);

      // 파일이 있으면 서버에 업로드
      if (filesToUpload.length > 0) {
        console.log('파일 업로드 시작:', filesToUpload.map(f => f.name));
        
        // 파일 상태를 uploading으로 변경
        const updatedStates = fileStates.map(state => 
          state.file.size > 0 ? { ...state, status: 'uploading' as UploadStatus } : state
        );
        setFileStates(updatedStates);

        const uploadResults = await uploadMultipleFilesToServer(
          filesToUpload,
          (fileIndex, percent) => {
            // 개별 파일 진행률 업데이트
            setUploadProgress(prev => ({
              ...prev,
              [fileIndex]: percent
            }));
          },
          (totalPercent) => {
            // 전체 진행률 로깅
            console.log(`전체 업로드 진행률: ${totalPercent}%`);
          }
        );

        // 업로드 결과 처리
        const failedUploads = uploadResults.filter(result => !result.success);
        if (failedUploads.length > 0) {
          console.error('파일 업로드 실패:', failedUploads);
          
          // 실패한 파일들의 상태 업데이트
          const updatedStatesWithErrors = fileStates.map((state, index) => {
            const result = uploadResults[index];
            if (result && !result.success) {
              return { ...state, status: 'error' as UploadStatus, error: result.error };
            }
            return state;
          });
          setFileStates(updatedStatesWithErrors);
          
          throw new Error(`${failedUploads.length}개 파일 업로드에 실패했습니다.`);
        }

        // 성공한 업로드의 URL들 수집
        fileUrls = uploadResults
          .filter(result => result.success && result.url)
          .map(result => result.url!);

        // 성공한 파일들의 상태 업데이트
        const successStates = fileStates.map((state, index) => {
          const result = uploadResults[index];
          if (result && result.success) {
            return { ...state, status: 'success' as UploadStatus, result };
          }
          return state;
        });
        setFileStates(successStates);
        
        console.log('파일 업로드 완료:', fileUrls);
      }

      // 이메일 데이터 구성
      const emailData = {
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        phone: data.phone,
        email: data.email,
        services: data.services || [],
        budget: data.budget,
        benchmark1: data.benchmark1,
        benchmark2: data.benchmark2,
        benchmark3: data.benchmark3,
        projectDescription: data.projectDescription,
        fileUrls: fileUrls.length > 0 ? fileUrls : undefined,
      };

      // 이메일 전송
      const emailResult = await sendContactEmail(emailData);
      
      if (!emailResult.success) {
        throw new Error(emailResult.error || '이메일 전송에 실패했습니다.');
      }

      // 성공 처리
      setSubmitStatus('success');
      reset();
      setFileStates([]);
      setUploadProgress({});
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('문의 제출 오류:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 title-container">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black title-text gradient-text">
            CONTACT
          </h2>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          
        </motion.div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 p-6 bg-green-50 border border-green-200 rounded-2xl flex items-start space-x-4"
          >
            <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div className="text-green-800">
              <p 
                className="font-semibold text-lg"
                style={{
                  fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                문의가 성공적으로 접수되었습니다!
              </p>
              <p 
                className="text-sm mt-1"
                style={{
                  fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                빠른 시일 내에 검토 후 연락드리겠습니다. 감사합니다 :)
              </p>
            </div>
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-4"
          >
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="text-red-800">
              <p 
                className="font-semibold text-lg"
                style={{
                  fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                전송에 실패했습니다
              </p>
              <p 
                className="text-sm mt-1"
                style={{
                  fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                다시 시도해주시거나 이메일로 직접 연락해주세요.
              </p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
          {/* 프로젝트 문의 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-2xl font-bold text-gray-900 mb-12"
              style={{
                fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
              }}
            >
              프로젝트 문의
            </h3>
            
            {/* 기본 정보 - 2x2 그리드 */}
            <div className="space-y-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 회사명 */}
                <div>
                  <label 
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{
                      fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                    }}
                  >
                    회사명 <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    {...register('companyName', { required: '회사명을 입력해주세요.' })}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 bg-transparent text-lg placeholder-gray-400 transition-all duration-200"
                    placeholder="회사명을 입력해주세요"
                    aria-describedby={errors.companyName ? "companyName-error" : undefined}
                    aria-invalid={errors.companyName ? "true" : "false"}
                    aria-required="true"
                    style={{
                      fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                    }}
                  />
                  {errors.companyName && (
                    <p 
                      id="companyName-error"
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                      style={{
                        fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                      }}
                    >
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                {/* 담당자명 */}
                <div>
                  <label 
                    htmlFor="contactPerson"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{
                      fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                    }}
                  >
                    담당자명 <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    {...register('contactPerson', { required: '담당자명을 입력해주세요.' })}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 bg-transparent text-lg placeholder-gray-400 transition-all duration-200"
                    placeholder="담당자명을 입력해주세요"
                    aria-describedby={errors.contactPerson ? "contactPerson-error" : undefined}
                    aria-invalid={errors.contactPerson ? "true" : "false"}
                    aria-required="true"
                    style={{
                      fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                    }}
                  />
                  {errors.contactPerson && (
                    <p 
                      id="contactPerson-error"
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                      style={{
                        fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                      }}
                    >
                      {errors.contactPerson.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 연락처 */}
                <div>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', { required: '연락처를 입력해주세요.' })}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 bg-transparent text-lg placeholder-gray-400 transition-all duration-200"
                    placeholder="연락처"
                    style={{
                      fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                    }}
                  />
                  {errors.phone && (
                    <p 
                      className="mt-2 text-sm text-red-600"
                      style={{
                        fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                      }}
                    >
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* 이메일 */}
                <div>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: '이메일을 입력해주세요.',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: '올바른 이메일 형식을 입력해주세요.'
                      }
                    })}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 bg-transparent text-lg placeholder-gray-400 transition-all duration-200"
                    placeholder="이메일"
                    style={{
                      fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                    }}
                  />
                  {errors.email && (
                    <p 
                      className="mt-2 text-sm text-red-600"
                      style={{
                        fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                      }}
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 서비스 체크박스 */}
            <div>
              <p 
                className="text-gray-900 mb-6 text-lg"
                style={{
                  fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                어떤 서비스가 필요한가요? 아래 항목을 체크해주세요.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceOptions.map((service, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer py-2">
                    <input
                      type="checkbox"
                      value={service}
                      {...register('services')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span 
                      className="text-gray-700 text-base"
                      style={{
                        fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                      }}
                    >
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 프로젝트 정보 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 
              className="text-2xl font-bold text-gray-900 mb-12"
              style={{
                fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
              }}
            >
              프로젝트 정보
            </h3>

            {/* 예산 선택 */}
            <div className="mb-8">
              <select
                id="budget"
                {...register('budget')}
                className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 bg-transparent text-lg text-gray-600 transition-all duration-200"
                style={{
                  fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                {budgetOptions.map((budget, index) => (
                  <option key={index} value={index === 0 ? '' : budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>

            {/* 벤치마킹 사이트 */}
            <div className="mb-8 space-y-6">
              {[1, 2, 3].map((num) => (
                <input
                  key={num}
                  type="url"
                  {...register(`benchmark${num}` as keyof FormData)}
                  className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-gray-400 focus:ring-0 bg-transparent text-lg placeholder-gray-400 transition-all duration-200"
                  placeholder="벤치마킹 사이트를 입력해주세요."
                  style={{
                    fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                  }}
                />
              ))}
            </div>

            {/* 프로젝트 설명 */}
            <div className="mb-12">
              <textarea
                id="projectDescription"
                rows={8}
                {...register('projectDescription', { required: '프로젝트 설명을 입력해주세요.' })}
                className="w-full px-4 py-6 border-2 border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 transition-all duration-200 resize-none text-lg placeholder-gray-400"
                placeholder="프로젝트에 대하여 정리하신 내용이나 궁금하신 사항이 있으시면 작성해주세요.(필수)"
                style={{
                  fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              />
              {errors.projectDescription && (
                <p 
                  className="mt-2 text-sm text-red-600"
                  style={{
                    fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                  }}
                >
                  {errors.projectDescription.message}
                </p>
              )}
            </div>

            {/* 파일 첨부 - 개선된 버전 */}
            <div className="mb-12">
              <div className="space-y-4">
                {[0, 1, 2].map((fileIndex) => {
                  const fileState = fileStates[fileIndex];
                  const hasFile = fileState && fileState.file.size > 0;
                  const progress = uploadProgress[fileIndex] || 0;

                  return (
                    <div key={fileIndex} className="relative">
                      {!hasFile ? (
                        <div>
                          <input
                            type="file"
                            id={`file-${fileIndex}`}
                            onChange={(e) => handleFileUpload(fileIndex, e.target.files)}
                            className="hidden"
                            accept={allowedExtensions.join(',')}
                          />
                          <label
                            htmlFor={`file-${fileIndex}`}
                            className="flex items-center justify-between w-full px-0 py-4 border-0 border-b-2 border-gray-200 cursor-pointer hover:border-gray-400 transition-all duration-200"
                          >
                            <span 
                              className="text-lg text-gray-400"
                              style={{
                                fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                              }}
                            >
                              파일첨부 {fileIndex + 1}
                            </span>
                            <ArrowUpTrayIcon className="h-5 w-5 text-gray-400" />
                          </label>
                        </div>
                      ) : (
                        <div className="border-2 border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              {fileState.status === 'uploading' ? (
                                <CloudArrowUpIcon className="h-5 w-5 text-blue-500 animate-pulse" />
                              ) : fileState.status === 'success' ? (
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                              ) : fileState.status === 'error' ? (
                                <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                              ) : (
                                <ArrowUpTrayIcon className="h-5 w-5 text-gray-400" />
                              )}
                              <div>
                                <p 
                                  className="text-sm font-medium text-gray-900"
                                  style={{
                                    fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                                  }}
                                >
                                  {fileState.file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(fileState.file.size)}
                                  {isImageFile(fileState.file) && ' • 이미지'}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(fileIndex)}
                              className="text-red-500 hover:text-red-700 transition-colors text-sm"
                              style={{
                                fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                              }}
                            >
                              삭제
                            </button>
                          </div>
                          
                          {/* 업로드 진행률 */}
                          {fileState.status === 'uploading' && (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          )}
                          
                          {/* 오류 메시지 */}
                          {fileState.status === 'error' && fileState.error && (
                            <p className="text-xs text-red-600 mt-1">
                              {fileState.error}
                            </p>
                          )}
                          
                          {/* 성공 메시지 */}
                          {fileState.status === 'success' && (
                            <p className="text-xs text-green-600 mt-1">
                              업로드 완료
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                <p 
                  className="text-sm text-gray-400 mt-4"
                  style={{
                    fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                  }}
                >
                  5MB MAX HWP, DOC, DOCX, XLS, XLSX, PPT, PPTX, PDF, JPG, JPEG, PNG, ZIP
                </p>
              </div>
            </div>

            {/* 개인정보 수집 동의 */}
            <div className="mb-12">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('privacyConsent', { required: '개인정보처리방침에 동의해주세요.' })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                />
                <span 
                  className="text-gray-700 text-base"
                  style={{
                    fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                  }}
                >
                  개인정보처리방침에 동의합니다. 
                  <button type="button" className="text-blue-600 hover:underline ml-1">
                    ⓘ
                  </button>
                </span>
              </label>
              {errors.privacyConsent && (
                <p 
                  className="mt-2 text-sm text-red-600"
                  style={{
                    fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                  }}
                >
                  {errors.privacyConsent.message}
                </p>
              )}
            </div>

            {/* 문의하기 버튼 */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 text-white py-4 px-12 rounded-lg font-medium text-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                style={{
                  fontFamily: 'MaruBuri-Bold, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
                }}
              >
                {isSubmitting ? '전송 중...' : '문의하기'}
              </button>
            </div>
          </motion.div>
        </form>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #6b7280, #374151, #9ca3af);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradientShift 3s ease-in-out infinite;
        }

        .gradient-line {
          background: linear-gradient(90deg, #6b7280, #374151, #9ca3af, #6b7280);
          background-size: 200% 100%;
          animation: lineGradientShift 3s ease-in-out infinite;
        }

        .title-container {
          animation: fadeInUp 1s ease-out;
        }

        .title-text {
          animation: slideInLeft 0.8s ease-out;
        }

        .decorative-line {
          animation: expandLineRepeat 2s ease-in-out infinite;
          transform-origin: left center;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expandLineRepeat {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes lineGradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSectionSecure; 