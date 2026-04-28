'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Trash2 } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const QUICK_QUESTIONS = [
  {
    question: 'What are your check-in hours?',
    answer: 'Check-in is available from 3:00 PM. Early check-in may be available upon request and subject to availability.',
  },
  {
    question: 'Do you offer airport transportation?',
    answer: 'Yes! We provide complimentary airport transfer service in our luxury fleet. Please inform us of your arrival details.',
  },
  {
    question: 'What amenities are included?',
    answer: 'Royal Palace offers premium spa access, fine dining, infinity pool, concierge service, and 24/7 room service.'
  },
  {
    question: 'Can I cancel my reservation?',
    answer: 'Cancellations can be made up to 48 hours before arrival for a full refund.',
  },
  {
    question: 'Do you have pet-friendly suites?',
    answer: 'Yes, select suites are pet-friendly. A luxury pet fee applies. Please mention your pet when booking.',
  },
  {
    question: 'What is the WiFi situation?',
    answer: 'High-speed fiber optic WiFi is complimentary in all suites and public areas.',
  },
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to Royal Palace Hotel! How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // التمرير التلقائي لأسفل الشات لما رسالة جديدة تنضاف
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleQuickQuestion = (question: string, answer: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date(),
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answer,
      sender: 'bot',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Welcome to Royal Palace Hotel! How can I assist you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ])
  }

  return (
    <>
      {/* ── حاوية الأزرار العائمة (واتساب + شات بوت) ── */}
      {/* Container is placed at the bottom right */}
      <div className="mb-10 fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[60] flex items-center gap-4">
        
        {/* زرار الواتساب (على الشمال) */}
        <motion.a
          href="https://wa.me/201507550617?text=Hello%20Cairo%20Crystal%20Hotel,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20suite."
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 sm:p-4 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:bg-[#20b858] transition-colors duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contact on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.347-.272.273-1.04 1.015-1.04 2.474 0 1.46 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </motion.a>

        {/* زرار الشات بوت (على اليمين) */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3.5 sm:p-4 bg-[#c49b5b] text-black rounded-full shadow-[0_4px_20px_rgba(196,155,91,0.4)] hover:bg-white transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open chatbot"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Overlay (عشان يغمق الشاشة ورا الشات في الموبايل) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-[50] sm:hidden backdrop-blur-sm"
            />

            <motion.div
              className="fixed z-[55] flex flex-col bg-[#0a0a0a] shadow-2xl overflow-hidden border border-[#c49b5b]/20
                         bottom-0 left-0 right-0 w-full h-[85vh] rounded-t-2xl
                         sm:bottom-24 sm:right-8 sm:left-auto sm:w-[400px] sm:h-[600px] sm:rounded-xl"
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
              {/* Header */}
              <div className="bg-[#111] border-b border-[#c49b5b]/20 p-4 shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#c49b5b]/10 border border-[#c49b5b]/30 flex items-center justify-center text-[#c49b5b] font-serif text-sm">
                      RP
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-[#c49b5b] font-semibold leading-tight">
                        Concierge Assistant
                      </h3>
                      <p className="font-sans text-[0.65rem] text-white/50 uppercase tracking-widest">
                        Online
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearChat}
                      className="p-2 text-white/40 hover:text-[#c49b5b] transition-colors rounded-full hover:bg-white/5"
                      title="Clear Chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5 sm:hidden"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-[#c49b5b] text-black rounded-br-sm'
                            : 'bg-[#1a1a1a] border border-white/5 text-white/90 rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm font-sans leading-relaxed">{message.text}</p>
                        <span className={`text-[0.6rem] block mt-1 ${message.sender === 'user' ? 'text-black/60' : 'text-white/40'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} /> {/* نقطة التمرير التلقائي */}
              </div>

              {/* Quick Questions (Telegram Style Horizontal Scroll) */}
              <div className="bg-[#111] border-t border-[#c49b5b]/10 p-3 shrink-0">
                <p className="text-[0.65rem] text-white/40 mb-2 uppercase tracking-widest px-1">
                  Quick Replies
                </p>
                {/* إخفاء شريط التمرير باستخدام كلاسات مخصصة أو inline style */}
                <div 
                  className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-4 snap-x"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style dangerouslySetInnerHTML={{__html: `
                    .snap-x::-webkit-scrollbar { display: none; }
                  `}} />
                  {QUICK_QUESTIONS.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(item.question, item.answer)}
                      className="shrink-0 snap-start bg-[#1a1a1a] border border-[#c49b5b]/20 text-[#c49b5b] text-xs px-4 py-2 rounded-full hover:bg-[#c49b5b] hover:text-black transition-colors whitespace-nowrap"
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area (Visual Only) */}
              <div className="bg-[#0a0a0a] p-3 border-t border-white/5 flex gap-2 shrink-0">
                <input
                  type="text"
                  placeholder="Select a quick reply above..."
                  className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2 text-sm text-white/50 cursor-not-allowed focus:outline-none"
                  disabled
                />
                <button
                  className="p-2.5 bg-[#1a1a1a] border border-white/10 text-white/30 rounded-full cursor-not-allowed"
                  disabled
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}