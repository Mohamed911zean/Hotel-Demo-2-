'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import  Navbar  from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Ornament, HorizontalDivider } from '@/components/animated-elements'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-dark-card to-background">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-6xl md:text-7xl text-white mb-6 tracking-tight">
            Get in Touch
          </h1>
          <div className="flex justify-center mb-6">
            <Ornament align="center" width={64} />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our dedicated concierge team is available 24/7 to assist with your inquiries and reservations
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h2 className="font-serif text-3xl text-white mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-foreground text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-transparent border border-gold-border text-foreground px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-transparent border border-gold-border text-foreground px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (212) 555-1234"
                      className="w-full bg-transparent border border-gold-border text-foreground px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gold-border text-foreground px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="reservation">Room Reservation</option>
                    <option value="general">General Inquiry</option>
                    <option value="event">Event Planning</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-foreground text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="w-full bg-transparent border border-gold-border text-foreground px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600 resize-none"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gold text-background font-semibold py-3 rounded-sm hover:bg-gold/90 transition-colors shadow-glow-gold hover:shadow-glow-gold-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-white mb-8">Contact Information</h2>
              </div>

              {/* Location */}
              <motion.div
                className="p-6 bg-dark-card border border-gold-border rounded-sm hover:border-gold transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Address</h3>
                    <p className="text-gray-400">
                      Fifth Avenue at 57th Street
                      <br />
                      New York, NY 10019
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="p-6 bg-dark-card border border-gold-border rounded-sm hover:border-gold transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Telephone</h3>
                    <p className="text-gray-400">
                      Main: <a href="tel:+12125551234" className="text-gold hover:text-gold/80">+1 (212) 555-1234</a>
                      <br />
                      Reservations: <a href="tel:+12125551200" className="text-gold hover:text-gold/80">+1 (212) 555-1200</a>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                className="p-6 bg-dark-card border border-gold-border rounded-sm hover:border-gold transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Email</h3>
                    <p className="text-gray-400">
                      Concierge: <a href="mailto:concierge@royalpalace.com" className="text-gold hover:text-gold/80">concierge@royalpalace.com</a>
                      <br />
                      Reservations: <a href="mailto:reservations@royalpalace.com" className="text-gold hover:text-gold/80">reservations@royalpalace.com</a>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div
                className="p-6 bg-dark-card border border-gold-border rounded-sm hover:border-gold transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Hours of Operation</h3>
                    <p className="text-gray-400">
                      Concierge: 24/7
                      <br />
                      Front Desk: 24/7
                      <br />
                      Dining: 7:00 AM - 11:00 PM
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
    </div>
  )
}
