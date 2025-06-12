'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  MinusIcon 
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '안녕하세요! RYUIN에 오신 것을 환영합니다. 웹사이트 제작이나 디자인에 대해 궁금한 것이 있으시면 언제든 문의해주세요! 😊',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto responses based on user input
  const getAutoResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('가격') || message.includes('비용') || message.includes('견적')) {
      return '웹사이트 제작 비용은 프로젝트 규모와 기능에 따라 달라집니다. 기본 랜딩페이지는 200만원부터, 기업 웹사이트는 300만원부터 시작됩니다. 정확한 견적을 위해 상담을 신청해주시면 자세히 안내드리겠습니다! 📝';
    }
    
    if (message.includes('기간') || message.includes('시간') || message.includes('얼마나')) {
      return '일반적으로 기본 웹사이트는 2-3주, 복잡한 기능이 포함된 웹사이트는 4-6주 정도 소요됩니다. 프로젝트 시작 전 정확한 일정을 협의하여 진행합니다. ⏰';
    }
    
    if (message.includes('포트폴리오') || message.includes('작업물') || message.includes('사례')) {
      // Auto scroll to portfolio section after response
      setTimeout(() => {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
          portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2000);
      return '저희 포트폴리오는 웹사이트의 "포트폴리오" 섹션에서 확인하실 수 있습니다. 잠시 후 해당 섹션으로 이동해드릴게요! 🎨';
    }
    
    if (message.includes('상담') || message.includes('문의') || message.includes('연락')) {
      // Auto scroll to contact section after response
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2000);
      return '상담 신청은 웹사이트 하단의 "문의하기" 섹션을 통해 가능합니다. 잠시 후 해당 섹션으로 이동해드릴게요! 📞';
    }
    
    if (message.includes('안녕') || message.includes('hello') || message.includes('hi')) {
      return '안녕하세요! RYUIN 웹 스튜디오입니다. 어떤 도움이 필요하신가요? 웹사이트 제작, 디자인, 견적 등 무엇이든 문의해주세요! 😊';
    }
    
    if (message.includes('서비스') || message.includes('제공')) {
      // Auto scroll to services section after response
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2000);
      return '저희는 웹사이트 제작, 반응형 디자인, SEO 최적화, 유지보수 등 다양한 웹 관련 서비스를 제공합니다. 잠시 후 "서비스" 섹션으로 이동해드릴게요! 💻';
    }
    
    // Default response
    return '문의해주셔서 감사합니다! 더 자세한 상담을 원하시면 아래 "상담 신청" 버튼을 클릭하거나 직접 연락주세요. 빠른 시일 내에 답변드리겠습니다! 🚀';
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAutoResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          y: isOpen ? 100 : 0,
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto'
        }}
        transition={{ duration: 0.3 }}
      >
        <ChatBubbleLeftRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        <motion.div
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          1
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? 60 : 'auto'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 sm:bottom-4 sm:right-4 sm:inset-auto z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
            style={{ 
              width: '100%',
              maxWidth: '380px',
              height: isMinimized ? '60px' : 'calc(100vh - 2rem)',
              maxHeight: isMinimized ? '60px' : '500px'
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm">RYUIN 상담센터</h3>
                  <p className="text-xs text-blue-100">온라인</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <XMarkIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-xs p-2 sm:p-3 rounded-2xl ${
                          message.isUser
                            ? 'bg-blue-500 text-white rounded-br-sm'
                            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                        }`}
                      >
                        <p className="text-xs sm:text-sm break-words">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.isUser ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 p-2 sm:p-3 rounded-2xl rounded-bl-sm">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 sm:p-4 border-t border-gray-200 flex-shrink-0">
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="메시지를 입력하세요..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                      whileTap={{ scale: 0.95 }}
                    >
                      <PaperAirplaneIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    </motion.button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                    {[
                      { text: '견적 문의', message: '웹사이트 제작 견적이 궁금해요' },
                      { text: '포트폴리오 보기', message: '포트폴리오를 보여주세요' },
                      { text: '상담 신청', message: '상담을 신청하고 싶어요' }
                    ].map((action) => (
                      <button
                        key={action.text}
                        onClick={() => {
                          setInputText(action.message);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="text-xs bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {action.text}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget; 