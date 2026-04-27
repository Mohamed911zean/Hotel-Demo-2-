'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar  from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight } from 'lucide-react'
import { Ornament, HorizontalDivider } from '@/components/animated-elements'

const ALL_ROOMS = [
  {
    id: 1,
    name: 'Royal Suite',
    description: 'Experience ultimate opulence with a private entrance, spa bath, and panoramic views',
    capacity: '2 Guests',
    size: '650 sqft',
    price: '$2,500',
    image: '/suite-1.jpg',
  },
  {
    id: 2,
    name: 'Diamond Penthouse',
    description: 'Exclusive top-floor suite with private rooftop access and tailored concierge service',
    capacity: '4 Guests',
    size: '1,200 sqft',
    price: '$4,500',
    image: '/suite-2.jpg',
  },
  {
    id: 3,
    name: 'Emerald Premier',
    description: 'Sophisticated contemporary design with private spa and floor-to-ceiling windows',
    capacity: '2 Guests',
    size: '700 sqft',
    price: '$2,800',
    image: '/suite-3.jpg',
  },
  {
    id: 4,
    name: 'Sapphire Grand',
    description: 'Luxurious two-bedroom suite with private living spaces and exclusive amenities',
    capacity: '6 Guests',
    size: '1,500 sqft',
    price: '$5,000',
    image: '/suite-4.jpg',
  },
]

export default function RoomsPage() {
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
            Our Collections
          </h1>
          <div className="flex justify-center mb-6">
            <Ornament align="center" width={64} />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our full range of meticulously designed luxury suites, each offering unparalleled elegance and bespoke service
          </p>
        </motion.div>
      </section>

      {/* Rooms Grid */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {ALL_ROOMS.map((room) => (
              <motion.div key={room.id} variants={itemVariants} className="group">
                <Link href={`/rooms/${room.id}`}>
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-sm bg-dark-card h-96 md:h-[450px] mb-6">
                    <motion.img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 border border-gold-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Room Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-3xl text-white group-hover:text-gold transition-colors mb-2">
                        {room.name}
                      </h3>
                      <p className="text-gray-400 text-base leading-relaxed">
                        {room.description}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gold-border">
                      <div>
                        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">
                          Capacity
                        </p>
                        <p className="text-foreground text-sm">{room.capacity}</p>
                      </div>
                      <div>
                        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">
                          Size
                        </p>
                        <p className="text-foreground text-sm">{room.size}</p>
                      </div>
                      <div>
                        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">
                          From
                        </p>
                        <p className="text-foreground text-sm">{room.price}/night</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.div
                      className="flex items-center gap-2 text-gold pt-4 font-semibold"
                      whileHover={{ x: 4 }}
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </Link>
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
