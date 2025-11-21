import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, Language } from '../types';
import { sendChatMessage, resetChat } from '../services/geminiService';
import { translations } from '../translations';

interface ChatBotProps {
  lang: Language;
}

export const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    resetChat();
    setMessages([]);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await sendChatMessage(userMsg.text, lang);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-[320px] md:w-[380px] h-[500px] flex flex-col mb-4 border border-gray-100 animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#fcfbf9] rounded-t-lg">
            <h3 className="font-serif text-lg font-medium">{t.chat_header}</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcfbf9]">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-10 font-light italic px-8">
                {lang === 'zh-CN' ? "这里没有评判，只有倾听。" : "No judgment here, only listening."}
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-black text-white rounded-br-none' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
               <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex space-x-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-gray-100 bg-white rounded-b-lg">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chat_placeholder}
                className="w-full bg-gray-50 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-sm hover:shadow text-black disabled:opacity-30 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-black text-white shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center"
      >
        {isOpen ? (
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>
    </div>
  );
};
