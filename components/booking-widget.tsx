'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users } from 'lucide-react'

interface BookingWidgetProps {
  roomName: string
  pricePerNight: number
}

export function BookingWidget({ roomName, pricePerNight }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const totalPrice = nights > 0 ? nights * pricePerNight : pricePerNight

  return (
    <motion.div
      className="sticky top-8 bg-dark-card border border-gold-border rounded-sm p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="font-serif text-2xl text-white mb-6">Reserve {roomName}</h3>

      {/* Price Display */}
      <div className="mb-6 pb-6 border-b border-gold-border">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-gray-400">${pricePerNight}</span>
          <span className="text-gray-400 text-sm">per night</span>
        </div>
        {nights > 0 && (
          <div className="text-2xl font-serif text-gold">
            ${totalPrice.toLocaleString()}
            <span className="text-sm text-gray-400 ml-2 font-sans">for {nights} nights</span>
          </div>
        )}
      </div>

      {/* Check-in Date */}
      <div className="mb-4">
        <label className="block text-white text-sm mb-2 flex items-center gap-2">
          <Calendar size={16} className="text-gold" />
          Check-in
        </label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full bg-background border border-gray-600 text-white px-3 py-2 rounded-sm focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      {/* Check-out Date */}
      <div className="mb-4">
        <label className="block text-white text-sm mb-2 flex items-center gap-2">
          <Calendar size={16} className="text-gold" />
          Check-out
        </label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full bg-background border border-gray-600 text-white px-3 py-2 rounded-sm focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      {/* Guests */}
      <div className="mb-6">
        <label className="block text-white text-sm mb-2 flex items-center gap-2">
          <Users size={16} className="text-gold" />
          Guests
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full bg-background border border-gray-600 text-white px-3 py-2 rounded-sm focus:outline-none focus:border-gold transition-colors"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Guest' : 'Guests'}
            </option>
          ))}
        </select>
      </div>

      {/* Reserve Button */}
      <motion.button
        className="w-full bg-gold text-background font-serif text-lg py-3 rounded-sm mb-3 font-semibold hover:bg-gold/90 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Reserve Now
      </motion.button>

      {/* Ghost Button */}
      <motion.button
        className="w-full border border-gold text-gold font-serif text-lg py-3 rounded-sm font-semibold hover:bg-gold/10 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Request Information
      </motion.button>

      {/* Info Text */}
      <p className="text-gray-500 text-xs text-center mt-4">
        Free cancellation up to 7 days before arrival
      </p>
    </motion.div>
  )
}
