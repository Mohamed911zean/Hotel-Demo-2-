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
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[60] p-4 bg-[#c49b5b] text-black rounded-full shadow-[0_4px_20px_rgba(196,155,91,0.4)] hover:bg-white transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>

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