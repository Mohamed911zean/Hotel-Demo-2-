'use client'

import { motion } from 'framer-motion'
import Navbar  from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Ornament, HorizontalDivider } from '@/components/animated-elements'

const GALLERY_ITEMS = [
  { src: '/gallery-1.jpg', alt: 'Grand Lobby', category: 'Spaces' },
  { src: '/suite-1.jpg', alt: 'Royal Suite', category: 'Rooms' },
  { src: '/gallery-2.jpg', alt: 'Rooftop Pool', category: 'Wellness' },
  { src: '/suite-2.jpg', alt: 'Diamond Suite', category: 'Rooms' },
  { src: '/gallery-3.jpg', alt: 'Fine Dining', category: 'Culinary' },
  { src: '/suite-3.jpg', alt: 'Emerald Suite', category: 'Rooms' },
  { src: '/gallery-4.jpg', alt: 'Fitness Center', category: 'Wellness' },
  { src: '/suite-4.jpg', alt: 'Sapphire Suite', category: 'Rooms' },
  { src: '/gallery-5.jpg', alt: 'VIP Lounge', category: 'Spaces' },
]

export default function GalleryPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
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
            Gallery
          </h1>
          <div className="flex justify-center mb-6">
            <Ornament align="center" width={64} />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore the exquisite beauty and sophistication of Royal Palace Hotel through our carefully curated collection
          </p>
        </motion.div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {GALLERY_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-sm cursor-pointer ${
                  index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <motion.div className="absolute inset-0 border border-gold-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay Text */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <h3 className="font-serif text-2xl text-white mb-2">{item.alt}</h3>
                  <p className="text-gold text-sm font-semibold uppercase tracking-widest">
                    {item.category}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <HorizontalDivider />
      <Footer />
    </div>
  )
}
