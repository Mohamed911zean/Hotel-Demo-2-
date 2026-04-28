'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Ornament, HorizontalDivider } from '@/components/animated-elements'
import { useTranslations } from 'next-intl'
import { Chatbot } from '@/components/chatbot'

export default function ContactPage() {
  const t = useTranslations('contactPage')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

  return (
    <div className="bg-background">
      <Navbar />
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-dark-card to-background">
        <motion.div className="max-w-7xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-6xl md:text-7xl text-white mb-6 tracking-tight">{t('title')}</h1>
          <div className="flex justify-center mb-6"><Ornament align="center" width={64} /></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-16" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <h2 className="font-serif text-3xl text-white mb-8">{t('formTitle')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-foreground text-sm font-semibold mb-2">{t('name')}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('namePlaceholder')} className="w-full bg-transparent border border-gold-border text-foreground px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">{t('email')}</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('emailPlaceholder')} className="w-full bg-transparent border border-gold-border text-foreground px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600" required />
                  </div>
                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">{t('phone')}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('phonePlaceholder')} className="w-full bg-transparent border border-gold-border text-foreground px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-foreground text-sm font-semibold mb-2">{t('subject')}</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-[#0a0a0a] border border-gold-border text-foreground px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors" required>
                    <option value="">{t('selectSubject')}</option>
                    <option value="reservation">{t('reservation')}</option>
                    <option value="general">{t('general')}</option>
                    <option value="event">{t('event')}</option>
                    <option value="feedback">{t('feedback')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-foreground text-sm font-semibold mb-2">{t('message')}</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t('messagePlaceholder')} rows={6} className="w-full bg-transparent border border-gold-border text-foreground px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600 resize-none" required />
                </div>
                <motion.button type="submit" className="w-full bg-gold text-background font-semibold py-3 rounded-sm hover:bg-gold/90 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {t('send')}
                </motion.button>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <h2 className="font-serif text-3xl text-white mb-8">{t('infoTitle')}</h2>
              <motion.div className="p-6 bg-dark-card border border-gold-border rounded-sm hover:border-gold transition-all duration-300" whileHover={{ scale: 1.02 }}>
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">{t('addressLabel')}</h3>
                    <p className="text-gray-400">174 El Tahrir, Bab Al Louq<br />Cairo, Egypt</p>
                  </div>
                </div>
              </motion.div>
              <motion.div className="p-6 bg-dark-card border border-gold-border rounded-sm hover:border-gold transition-all duration-300" whileHover={{ scale: 1.02 }}>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">{t('phoneLabel')}</h3>
                    <p className="text-gray-400">
                      {t('main')}: <a href="tel:+201507550617" className="text-gold hover:text-gold/80">+20 15 07550617</a><br />
                      {t('reservations')}: <a href="tel:+201507550617" className="text-gold hover:text-gold/80">+20 15 07550617</a>
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div className="p-6 bg-dark-card border border-gold-border rounded-sm hover:border-gold transition-all duration-300" whileHover={{ scale: 1.02 }}>
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">{t('emailLabel')}</h3>
                    <p className="text-gray-400">
                      {t('concierge')}: <a href="mailto:concierge@cairocrystalhouse.com" className="text-gold hover:text-gold/80">concierge@cairocrystalhouse.com</a><br />
                      {t('reservations')}: <a href="mailto:reservations@cairocrystalhouse.com" className="text-gold hover:text-gold/80">reservations@cairocrystalhouse.com</a>
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div className="p-6 bg-dark-card border border-gold-border rounded-sm hover:border-gold transition-all duration-300" whileHover={{ scale: 1.02 }}>
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">{t('hoursLabel')}</h3>
                    <p className="text-gray-400">
                      {t('concierge')}: 24/7<br />
                      {t('frontDesk')}<br />
                      {t('dining')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <HorizontalDivider />
      <Footer />
      <Chatbot />
    </div>
  )
}