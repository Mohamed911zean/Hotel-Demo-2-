'use client'

import { Link } from '@/lib/navigation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from './animated-elements'
import { useTranslations } from 'next-intl'

const FEATURED_SUITES = [
  {
    id: 1,
    name: 'Royal Suite',
    description: 'Experience ultimate opulence with a private entrance, spa bath, and panoramic views',
    capacity: '2 Guests',
    image: '/suite-1.jpg',
  },
  {
    id: 2,
    name: 'Diamond Penthouse',
    description: 'Exclusive top-floor suite with private rooftop access and tailored concierge service',
    capacity: '4 Guests',
    image: '/suite-2.jpg',
  },
  {
    id: 3,
    name: 'Emerald Premier',
    description: 'Sophisticated contemporary design with private spa and floor-to-ceiling windows',
    capacity: '2 Guests',
    image: '/suite-3.jpg',
  },
  {
    id: 4,
    name: 'Sapphire Grand',
    description: 'Luxurious two-bedroom suite with private living spaces and exclusive amenities',
    capacity: '6 Guests',
    image: '/suite-4.jpg',
  },
]

export function FeaturedRooms() {
  const t = useTranslations('featuredRooms')
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
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {FEATURED_SUITES.map((suite) => (
            <motion.div
              key={suite.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <Link href={`/rooms/${suite.id}`}>
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-sm bg-dark-card h-80 md:h-96 mb-6">
                  <motion.img
                    src={suite.image}
                    alt={suite.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 border border-gold-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Suite Info */}
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors">
                    {suite.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {suite.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gold-border">
                    <span className="text-gold text-sm font-medium tracking-widest uppercase">
                      {suite.capacity}
                    </span>
                    <motion.div
                      className="flex items-center gap-2 text-gold"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-sm font-semibold">{t('discover')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Rooms CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/rooms"
            className="inline-flex items-center gap-3 px-8 py-3 border-2 border-gold text-gold hover:bg-gold/10 rounded-sm transition-all duration-300 font-semibold"
          >
            {t('exploreAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
