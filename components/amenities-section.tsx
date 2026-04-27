'use client'

import { motion } from 'framer-motion'
import {
  Waves,
  Utensils,
  Dumbbell,
  Shield,
  Wifi,
  Zap,
  Wine,
  Users,
} from 'lucide-react'
import { SectionHeader } from './animated-elements'

const AMENITIES = [
  {
    icon: Waves,
    title: 'World-Class Spa',
    description: 'Rejuvenate with our signature treatments and wellness programs',
  },
  {
    icon: Utensils,
    title: 'Fine Dining',
    description: 'Michelin-starred culinary experiences across three restaurants',
  },
  {
    icon: Dumbbell,
    title: 'Fitness Center',
    description: 'State-of-the-art equipment and personal training services',
  },
  {
    icon: Shield,
    title: '24/7 Security',
    description: 'Advanced security systems and dedicated concierge service',
  },
  {
    icon: Wifi,
    title: 'High-Speed WiFi',
    description: 'Fiber optic connectivity throughout the hotel',
  },
  {
    icon: Zap,
    title: 'Smart Rooms',
    description: 'Intuitive automation for lighting, climate, and entertainment',
  },
  {
    icon: Wine,
    title: 'Wine Collection',
    description: 'Extensive cellar with rare vintages and sommelier service',
  },
  {
    icon: Users,
    title: 'Event Spaces',
    description: 'Versatile venues for conferences and celebrations',
  },
]

export function AmenitiesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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
    <section id="amenities" className="py-24 px-6 bg-dark-card">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Experience"
          title="World-Class Amenities"
          subtitle="From our signature spa to fine dining excellence, every detail is crafted for your comfort"
        />

        {/* Amenities Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {AMENITIES.map((amenity, index) => {
            const Icon = amenity.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-6 bg-background border border-gold-border rounded-sm hover:border-gold hover:shadow-glow-gold transition-all duration-300"
              >
                {/* Icon */}
                <motion.div
                  className="mb-4 text-gold"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon className="w-10 h-10" />
                </motion.div>

                {/* Title */}
                <h3 className="font-serif text-xl text-white mb-2 group-hover:text-gold transition-colors">
                  {amenity.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {amenity.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
