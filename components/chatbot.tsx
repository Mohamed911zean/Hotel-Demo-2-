'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

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
    answer: 'Yes! We provide complimentary airport transfer service for all guests. Please inform us of your arrival details at booking.',
  },
  {
    question: 'What amenities are included?',
    answer: 'Royal Palace Hotel offers spa access, fine dining restaurants, fitness center, concierge service, and 24-hour room service for all guests.',
  },
  {
    question: 'Can I cancel my reservation?',
    answer: 'Cancellations can be made up to 48 hours before arrival for a full refund. Special rates may have different cancellation policies.',
  },
  {
    question: 'Do you have pet-friendly rooms?',
    answer: 'Yes, select suites are pet-friendly. A pet fee of $100 per stay applies. Please mention your pet when booking.',
  },
  {
    question: 'What is the WiFi situation?',
    answer: 'High-speed fiber optic WiFi is complimentary in all rooms and public areas throughout the hotel.',
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
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)

  const handleQuickQuestion = (question: string, answer: string) => {
    // Add user question
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date(),
    }

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answer,
      sender: 'bot',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
    setSelectedQuestion(question)
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
    setSelectedQuestion(null)
  }

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 p-4 bg-gold text-background rounded-full shadow-lg hover:shadow-glow-gold-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
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
          <motion.div
            className="fixed bottom-24 right-8 z-50 w-96 max-w-[calc(100vw-32px)] bg-dark-card border border-gold-border rounded-lg shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '600px' }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gold/20 to-gold/10 border-b border-gold-border p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-lg text-gold font-semibold">
                  Concierge Assistant
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gold transition-colors"
                  aria-label="Close chatbot"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-gold text-background rounded-br-none'
                          : 'bg-dark-card border border-gold-border text-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Quick Questions */}
            {selectedQuestion === null && (
              <div className="border-t border-gold-border p-4 bg-background/50 max-h-48 overflow-y-auto">
                <p className="text-xs text-gold mb-3 uppercase tracking-widest font-semibold">
                  Popular Questions
                </p>
                <div className="space-y-2">
                  {QUICK_QUESTIONS.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickQuestion(item.question, item.answer)}
                      className="w-full text-left text-xs px-3 py-2 rounded border border-gold-border hover:bg-gold/10 text-foreground transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      {item.question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-gold-border p-4 bg-background flex gap-2">
              {selectedQuestion !== null && (
                <button
                  onClick={handleClearChat}
                  className="text-xs text-gold hover:text-gold/80 transition-colors absolute top-2 right-2"
                >
                  Clear Chat
                </button>
              )}
              <input
                type="text"
                placeholder="Ask a question..."
                className="flex-1 bg-dark-card border border-gold-border rounded px-3 py-2 text-sm text-foreground placeholder-gray-600 focus:outline-none focus:border-gold transition-colors"
                disabled
              />
              <button
                className="p-2 bg-gold text-background rounded hover:bg-gold/90 transition-colors"
                disabled
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
