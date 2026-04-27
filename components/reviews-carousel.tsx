'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { SectionHeader } from './animated-elements'

interface Review {
  id: number
  initials: string
  name: string
  rating: number
  quote: string
}

const REVIEWS: Review[] = [
  {
    id: 1,
    initials: 'EV',
    name: 'Eleanor Vanderbilt',
    rating: 5,
    quote:
      'An absolutely extraordinary experience. Every detail was perfection, from the moment I arrived until my departure. The service was impeccable and the ambiance simply unmatched.',
  },
  {
    id: 2,
    initials: 'JP',
    name: 'James Patterson',
    rating: 5,
    quote:
      'Royal Palace Hotel redefined luxury for me. The penthouse suite offered the most breathtaking views I have ever experienced, coupled with world-class service.',
  },
  {
    id: 3,
    initials: 'SM',
    name: 'Sophia Marcello',
    rating: 5,
    quote:
      'This hotel is a sanctuary of elegance. The spa treatments were transformative, and the dining experiences were absolutely culinary masterpieces.',
  },
  {
    id: 4,
    initials: 'DK',
    name: 'David Kensington',
    rating: 5,
    quote:
      'A truly remarkable property. The attention to detail and personalized service set Royal Palace apart from every other luxury hotel I have stayed at.',
  },
  {
    id: 5,
    initials: 'CI',
    name: 'Catherine Isabella',
    rating: 5,
    quote:
      'Pure sophistication and refinement. Every staff member anticipated our needs before we could even articulate them. A genuinely five-star experience.',
  },
]

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
    setAutoPlay(false)
  }

  const currentReview = REVIEWS[currentIndex]

  const getVisibleReviews = () => {
    const prev = REVIEWS[(currentIndex - 1 + REVIEWS.length) % REVIEWS.length]
    const next = REVIEWS[(currentIndex + 1) % REVIEWS.length]
    return { prev, current: currentReview, next }
  }

  const { prev, current, next } = getVisibleReviews()

  return (
    <section className="py-24 px-6 bg-dark-card">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Testimonials"
          title="Guest Testimonials"
          subtitle="Hear from our distinguished guests about their experiences at Royal Palace Hotel"
        />

        {/* Carousel Container */}
        <div className="relative">
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Previous Review (Dimmed) */}
            <motion.div
              className="p-8 bg-background border border-gold-border rounded-sm opacity-40 scale-95"
              animate={{ opacity: 0.4, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold text-background font-semibold flex items-center justify-center">
                  {prev.initials}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{prev.name}</p>
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-gold text-gold"
                        />
                      ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm italic line-clamp-4">
                &ldquo;{prev.quote}&rdquo;
              </p>
            </motion.div>

            {/* Active Review (Full Opacity) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="p-8 bg-background border-2 border-gold rounded-sm shadow-glow-gold"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Initials Badge */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold/80 text-background font-bold text-xl flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {current.initials}
                  </motion.div>
                  <div>
                    <p className="text-white font-serif text-lg">{current.name}</p>
                    <div className="flex gap-1 mt-2">
                      {Array(current.rating)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-gold text-gold"
                          />
                        ))}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <motion.p
                  className="text-foreground text-lg italic leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  &ldquo;{current.quote}&rdquo;
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Next Review (Dimmed) */}
            <motion.div
              className="p-8 bg-background border border-gold-border rounded-sm opacity-40 scale-95"
              animate={{ opacity: 0.4, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold text-background font-semibold flex items-center justify-center">
                  {next.initials}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{next.name}</p>
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-gold text-gold"
                        />
                      ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm italic line-clamp-4">
                &ldquo;{next.quote}&rdquo;
              </p>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8">
            <motion.button
              onClick={goToPrevious}
              className="p-3 bg-gold/10 border border-gold text-gold rounded-full hover:bg-gold/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Indicators */}
            <div className="flex gap-2">
              {REVIEWS.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setAutoPlay(false)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-gold w-8'
                      : 'bg-gold/30 w-2 hover:bg-gold/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={goToNext}
              className="p-3 bg-gold/10 border border-gold text-gold rounded-full hover:bg-gold/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Auto-play Indicator */}
          <motion.p
            className="text-center text-gray-500 text-xs mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {autoPlay ? 'Auto-playing reviews' : 'Click to resume auto-play'}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
