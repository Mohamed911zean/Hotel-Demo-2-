'use client'

import { motion } from 'framer-motion'
import { Link } from '@/lib/navigation'
import Navbar from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight } from 'lucide-react'
import { Ornament, HorizontalDivider } from '@/components/animated-elements'
import { useTranslations } from 'next-intl'
import { Chatbot } from '@/components/chatbot'

const ALL_ROOMS = [
  { 
    id: 1, 
    nameKey: 'Deluxe King Room', 
    description: 'A spacious room featuring a king-sized bed, marble bathroom, and stunning city views', 
    capacity: '2', 
    size: '450 sqft', 
    price: '$250', 
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=2000&q=85' 
  },
  { 
    id: 2, 
    nameKey: 'Executive Suite', 
    description: 'Designed for business and comfort, featuring a separate living area and ergonomic workspace', 
    capacity: '2', 
    size: '750 sqft', 
    price: '$450', 
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=2000&q=85' 
  },
  { 
    id: 3, 
    nameKey: 'Premier Twin Room', 
    description: 'Elegant room with two twin beds, perfect for friends or family traveling together', 
    capacity: '2', 
    size: '480 sqft', 
    price: '$220', 
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=2000&q=85' 
  },
  { 
    id: 4, 
    nameKey: 'Junior Suite', 
    description: 'A stylish open-plan suite with a comfortable seating area and premium amenities', 
    capacity: '3', 
    size: '600 sqft', 
    price: '$350', 
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=2000&q=85' 
  },
  { 
    id: 5, 
    nameKey: 'Family Suite', 
    description: 'Spacious accommodation with two bedrooms and a shared living space for the whole family', 
    capacity: '4', 
    size: '950 sqft', 
    price: '$550', 
    image: '/room_deluxe.jpg' 
  },
  { 
    id: 6, 
    nameKey: 'Superior Room', 
    description: 'A cozy and modern room equipped with everything needed for a relaxing stay', 
    capacity: '2', 
    size: '380 sqft', 
    price: '$180', 
    image: '/room_presidential.jpg' 
  },
  { 
    id: 7, 
    nameKey: 'Terrace Suite', 
    description: 'Features a private balcony with panoramic views, ideal for evening relaxation', 
    capacity: '2', 
    size: '700 sqft', 
    price: '$500', 
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=2000&q=85' 
  },
  { 
    id: 8, 
    nameKey: 'Business Suite', 
    description: 'Includes a dedicated meeting space and high-speed connectivity for professionals', 
    capacity: '2', 
    size: '800 sqft', 
    price: '$400', 
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=2000&q=85' 
  }
]

export default function RoomsPage() {
  const t = useTranslations('roomsPage')
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
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10" variants={containerVariants} initial="hidden" animate="visible">
            {ALL_ROOMS.map((room) => (
              <motion.div key={room.id} variants={itemVariants} className="group">
                <Link href={`/rooms/${room.id}`}>
                  <div className="relative overflow-hidden rounded-sm bg-dark-card h-96 md:h-[450px] mb-6">
                    <motion.img src={room.image} alt={room.nameKey} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 border border-gold-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-3xl text-white group-hover:text-gold transition-colors mb-2">{room.nameKey}</h3>
                      <p className="text-gray-400 text-base leading-relaxed">{room.description}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gold-border">
                      <div>
                        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">{t('capacity')}</p>
                        <p className="text-foreground text-sm">{room.capacity}</p>
                      </div>
                      <div>
                        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">{t('size')}</p>
                        <p className="text-foreground text-sm">{room.size}</p>
                      </div>
                      <div>
                        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">{t('from')}</p>
                        <p className="text-foreground text-sm">{room.price}{t('perNight')}</p>
                      </div>
                    </div>
                    <motion.div className="flex items-center gap-2 text-gold pt-4 font-semibold" whileHover={{ x: 4 }}>
                      <span>{t('viewDetails')}</span>
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
      <Chatbot />
    </div>
  )
}