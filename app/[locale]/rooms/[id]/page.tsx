'use client'

import { use, useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/lib/navigation'
import Navbar from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HorizontalDivider, Ornament } from '@/components/animated-elements'
import { useTranslations } from 'next-intl'
import { Chatbot } from '@/components/chatbot'
import { ArrowLeft, Lock, ChevronUp, X } from 'lucide-react'

// (البيانات ROOMS زي ما هي بالظبط)
const ROOMS = [
  {
    id: '1',
    badge: 'Standard Luxury',
    name: 'Deluxe King Room',
    tagline: 'A spacious retreat featuring a king-sized bed and stunning city views.',
    description: 'The Deluxe King Room offers a perfect blend of comfort and style. Enjoy a restful night on our signature king bed, followed by a morning overlooking the vibrant city through expansive windows.',
    price: 250,
    guests: '2',
    size: '42m²',
    bedrooms: 1,
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=2000&q=85', '/gallery-1.jpg', '/gallery-2.jpg'],
    highlights: [
      { num: '01', title: 'Signature King Bed', desc: 'Experience unparalleled comfort with our custom-designed mattress and premium linens.' },
      { num: '02', title: 'Marble Bathroom', desc: 'Relax in a spa-inspired bathroom with a walk-in rainfall shower and luxury amenities.' },
      { num: '03', title: 'City View Windows', desc: 'Large windows provide natural light and a beautiful perspective of the city skyline.' },
    ],
    amenities: ['King Bed', 'High-Speed WiFi', 'Smart TV', 'Nespresso Machine', 'Mini Bar', '24H Room Service', 'Marble Bath'],
  },
  {
    id: '2',
    badge: 'Business Class',
    name: 'Executive Suite',
    tagline: 'Sophisticated living with a separate workspace and ergonomic design.',
    description: 'Our Executive Suite is tailored for the modern professional. With a separate living area and a dedicated workspace, it provides the ideal environment for both productivity and relaxation.',
    price: 450,
    guests: '2',
    size: '70m²',
    bedrooms: 1,
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=2000&q=85', '/gallery-3.jpg', '/gallery-4.jpg'],
    highlights: [
      { num: '01', title: 'Separate Living Area', desc: 'A spacious lounge area perfect for hosting small meetings or unwinding after work.' },
      { num: '02', title: 'Ergonomic Workspace', desc: 'A dedicated desk with an ergonomic chair and high-speed connectivity.' },
      { num: '03', title: 'Executive Lounge Access', desc: 'Includes access to our private lounge with complimentary breakfast and evening cocktails.' },
    ],
    amenities: ['Lounge Access', 'Work Desk', 'Separate Living Room', 'Premium WiFi', 'Smart Controls', 'Butler Service'],
  },
  {
    id: '3',
    badge: 'Superior Comfort',
    name: 'Premier Twin Room',
    tagline: 'Elegant and versatile accommodation for friends or family.',
    description: 'The Premier Twin Room features two comfortable twin beds and a modern design. It is the perfect choice for those traveling together who value both space and luxury.',
    price: 220,
    guests: '2',
    size: '45m²',
    bedrooms: 1,
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=2000&q=85', '/gallery-5.jpg', '/gallery-1.jpg'],
    highlights: [
      { num: '01', title: 'Twin Bed Setup', desc: 'Two high-quality twin beds designed for a restful and comfortable sleep.' },
      { num: '02', title: 'Modern Interior', desc: 'Sleek, contemporary design with warm lighting and comfortable seating.' },
      { num: '03', title: 'Spacious Layout', desc: 'Enough room to move comfortably and store luggage without feeling crowded.' },
    ],
    amenities: ['Twin Beds', 'Free WiFi', 'Flat Screen TV', 'Coffee Maker', 'In-room Safe', 'Luxury Toiletries'],
  },
  {
    id: '4',
    badge: 'Junior Collection',
    name: 'Junior Suite',
    tagline: 'A stylish open-plan suite with a comfortable seating area.',
    description: 'The Junior Suite offers a more expansive feel with its open-plan layout. It combines a bedroom and a seating area into one cohesive, luxury space.',
    price: 350,
    guests: '3',
    size: '55m²',
    bedrooms: 1,
    images: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=2000&q=85', '/gallery-2.jpg', '/gallery-3.jpg'],
    highlights: [
      { num: '01', title: 'Open-Plan Layout', desc: 'Seamlessly integrated sleeping and living areas for a spacious atmosphere.' },
      { num: '02', title: 'Extra Sofa Bed', desc: 'Includes a comfortable sofa that can be converted for a third guest.' },
      { num: '03', title: 'Enhanced Amenities', desc: 'Upgraded minibar selection and premium bathroom features.' },
    ],
    amenities: ['Sofa Seating', 'Mini Bar', 'Bath & Shower', 'Smart TV', 'WiFi', 'Bathrobes & Slippers'],
  },
  {
    id: '5',
    badge: 'Family Collection',
    name: 'Family Suite',
    tagline: 'Spacious two-bedroom accommodation for the whole family.',
    description: 'Designed with families in mind, this suite features two separate bedrooms and a shared living area, ensuring everyone has their own space while staying connected.',
    price: 550,
    guests: '4',
    size: '88m²',
    bedrooms: 2,
    images: ['/room_deluxe.jpg', '/gallery-4.jpg', '/gallery-5.jpg'],
    highlights: [
      { num: '01', title: 'Two Separate Bedrooms', desc: 'A master bedroom for parents and a second bedroom for children or guests.' },
      { num: '02', title: 'Large Living Space', desc: 'A central area where the family can gather for meals or movies.' },
      { num: '03', title: 'Child-Friendly Features', desc: 'Includes options for cribs, high chairs, and child-safe amenities.' },
    ],
    amenities: ['2 Bedrooms', 'Dining Table', 'Full Living Room', 'Multiple TVs', 'Kitchenette', 'Family Pack'],
  },
  {
    id: '6',
    badge: 'Essential Luxury',
    name: 'Superior Room',
    tagline: 'Cozy and modern, ideal for shorter stays and solo travelers.',
    description: 'Our Superior Room provides all the essentials of a luxury stay in a more compact and efficient footprint, without compromising on quality.',
    price: 180,
    guests: '2',
    size: '35m²',
    bedrooms: 1,
    images: ['/room_presidential.jpg', '/gallery-1.jpg', '/gallery-2.jpg'],
    highlights: [
      { num: '01', title: 'Compact Efficiency', desc: 'Everything you need in a smart, well-designed layout.' },
      { num: '02', title: 'Premium Bedding', desc: 'The same high-quality linens and mattress found in our larger suites.' },
      { num: '03', title: 'Central Location', desc: 'Located near hotel amenities for easy access to dining and spa.' },
    ],
    amenities: ['Queen Bed', 'WiFi', 'Workspace', 'Minibar', 'Safe', 'TV'],
  },
  {
    id: '7',
    badge: 'Outdoor Living',
    name: 'Terrace Suite',
    tagline: 'Features a private balcony with stunning panoramic views.',
    description: 'The Terrace Suite is for those who love the outdoors. Step out onto your private balcony to enjoy the fresh air and breathtaking views of the surroundings.',
    price: 500,
    guests: '2',
    size: '65m²',
    bedrooms: 1,
    images: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=2000&q=85', '/gallery-3.jpg', '/gallery-4.jpg'],
    highlights: [
      { num: '01', title: 'Private Balcony', desc: 'Equipped with comfortable seating and perfect for morning coffee or sunset drinks.' },
      { num: '02', title: 'Floor-to-Ceiling Glass', desc: 'Sliding doors that bring the outside view into your bedroom.' },
      { num: '03', title: 'Premium Sound System', desc: 'High-end speakers for enjoying your music both inside and on the terrace.' },
    ],
    amenities: ['Private Balcony', 'Outdoor Seating', 'Premium Sound', 'WiFi', 'Spa Access', 'Breakfast Included'],
  },
  {
    id: '8',
    badge: 'Professional Choice',
    name: 'Business Suite',
    tagline: 'Equipped with meeting space and high-speed connectivity.',
    description: 'The Business Suite is more than just a room; it’s a productivity hub. With a small meeting table and top-tier connectivity, it’s designed for the serious professional.',
    price: 400,
    guests: '2',
    size: '75m²',
    bedrooms: 1,
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=2000&q=85', '/gallery-5.jpg', '/gallery-1.jpg'],
    highlights: [
      { num: '01', title: 'Private Meeting Space', desc: 'A small table suitable for private discussions or focused work.' },
      { num: '02', title: 'Top-Tier Connectivity', desc: 'The fastest internet speeds available in the hotel, guaranteed.' },
      { num: '03', title: 'All-Day Refreshments', desc: 'Regular delivery of coffee, tea, and healthy snacks to your room.' },
    ],
    amenities: ['Meeting Table', 'Gigabit WiFi', 'Scanner/Printer', 'Nespresso', 'Safe', 'Desk'],
  },
]

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const t = useTranslations('roomDetail')
  const room = ROOMS.find(r => r.id === id)

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')
  const [nights, setNights] = useState(0)
  const [activeImg, setActiveImg] = useState(0)
  
  // State for mobile booking modal
  const [showMobileBooking, setShowMobileBooking] = useState(false)

  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const checkoutDate = new Date()
    checkoutDate.setDate(checkoutDate.getDate() + 3)
    setCheckIn(tomorrow.toISOString().split('T')[0])
    setCheckOut(checkoutDate.toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    if (checkIn && checkOut) {
      const n = Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
      setNights(n > 0 ? n : 0)
    }
  }, [checkIn, checkOut])

  // Prevent background scrolling when mobile booking modal is open
  useEffect(() => {
    if (showMobileBooking) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showMobileBooking])

  if (!room) notFound()

  const subtotal = nights * room.price
  const taxes = Math.round(subtotal * 0.14)
  const total = subtotal + taxes

  // Booking Form Component to avoid repetition
  const BookingForm = () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-sans text-[0.57rem] font-bold tracking-[0.18em] uppercase text-gray-400 block mb-1.5">
            {t('checkIn')}
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={e => setCheckIn(e.target.value)}
            className="w-full bg-transparent border border-[rgba(196,155,91,0.22)] text-white font-sans text-xs px-3 py-2.5 focus:outline-none focus:border-[rgba(196,155,91,0.6)] transition-colors [color-scheme:dark]"
          />
        </div>
        <div>
          <label className="font-sans text-[0.57rem] font-bold tracking-[0.18em] uppercase text-gray-400 block mb-1.5">
            {t('checkOut')}
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={e => setCheckOut(e.target.value)}
            className="w-full bg-transparent border border-[rgba(196,155,91,0.22)] text-white font-sans text-xs px-3 py-2.5 focus:outline-none focus:border-[rgba(196,155,91,0.6)] transition-colors [color-scheme:dark]"
          />
        </div>
      </div>

      <div>
        <label className="font-sans text-[0.57rem] font-bold tracking-[0.18em] uppercase text-gray-400 block mb-1.5">
          {t('guests')}
        </label>
        <select
          value={guests}
          onChange={e => setGuests(e.target.value)}
          className="w-full bg-[#0a0a0a] border border-[rgba(196,155,91,0.22)] text-white font-sans text-xs px-3 py-2.5 focus:outline-none focus:border-[rgba(196,155,91,0.6)] transition-colors"
        >
          <option value="1">{t('guestOption1')}</option>
          <option value="2">{t('guestOption2')}</option>
          <option value="3">{t('guestOption3')}</option>
          <option value="4">{t('guestOption4')}</option>
        </select>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-[rgba(196,155,91,0.15)] pt-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-sans text-xs text-gray-400">
            {nights > 0
              ? `${nights} night${nights > 1 ? 's' : ''} × $${room.price}`
              : 'Select dates'}
          </span>
          <span className="font-sans text-xs text-gray-400">
            {nights > 0 ? `$${subtotal.toLocaleString()}` : '—'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-sans text-xs text-gray-400">Taxes & fees (14%)</span>
          <span className="font-sans text-xs text-gray-400">
            {nights > 0 ? `$${taxes.toLocaleString()}` : '—'}
          </span>
        </div>
        <div className="border-t border-[rgba(196,155,91,0.15)] pt-2 flex justify-between items-center">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#c49b5b]">
            Total
          </span>
          <span className="font-serif text-lg text-[#c49b5b]">
            {nights > 0 ? `$${total.toLocaleString()}` : '—'}
          </span>
        </div>
      </div>

      {/* CTAs */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-[#c49b5b] text-black font-sans text-[0.62rem] font-black tracking-[0.22em] uppercase py-4 mt-2 hover:bg-white transition-all duration-300"
      >
        {t('reserveNow')}
      </motion.button>
      
      <div className="flex items-center justify-center gap-1.5">
        <Lock className="w-2.5 h-2.5 text-gray-500" />
        <span className="font-sans text-[0.6rem] text-gray-500">{t('secure')}</span>
      </div>
    </div>
  )

  return (
    <div className="bg-[#050505] min-h-screen relative pb-24 lg:pb-0">
      <Navbar />

      {/* Back Link */}
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-[#c49b5b] font-sans text-xs font-bold tracking-widest uppercase hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t('backToRooms')}
        </Link>
      </div>

      {/* Gallery */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] md:grid-rows-[260px_180px] gap-[3px] h-auto md:h-[443px]">
        <div className="md:row-span-2 relative overflow-hidden bg-[#111] h-[320px] md:h-auto">
          <motion.img
            key={activeImg}
            src={room.images[activeImg]}
            alt={room.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>
        {room.images.slice(1, 3).map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-[#111] h-[200px] md:h-auto cursor-pointer"
            onClick={() => setActiveImg(i + 1)}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
            {i === 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImg(0) }}
                className="absolute bottom-3 right-3 bg-[rgba(5,5,5,0.9)] border border-[rgba(196,155,91,0.4)] text-[#c49b5b] font-sans text-[0.58rem] font-bold tracking-widest uppercase px-3 py-1.5 hover:bg-[#c49b5b] hover:text-black transition-all"
              >
                + More Photos
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px]">

        {/* Left Column */}
        <div className="px-6 py-10 lg:border-r border-[rgba(196,155,91,0.15)]">
          <div className="gold-label mb-2">{room.badge}</div>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-normal tracking-tight mb-3">
            {room.name}
          </h1>
          <p className="font-sans text-sm text-gray-400 leading-relaxed mb-6 max-w-xl">
            {room.tagline}
          </p>

          <Ornament align="left" width={40} />

          {/* Stats */}
          <div className="grid grid-cols-4 border border-[rgba(196,155,91,0.18)] mt-6 mb-8">
            {[
              { val: room.guests, lbl: 'Guests' },
              { val: room.size, lbl: 'Suite Size' },
              { val: String(room.bedrooms), lbl: 'Bedrooms' },
              { val: '5★', lbl: 'Rating' },
            ].map((s, i) => (
              <div
                key={i}
                className={`py-4 px-2 text-center ${i < 3 ? 'border-r border-[rgba(196,155,91,0.18)]' : ''}`}
              >
                <div className="font-serif text-xl text-white mb-1">{s.val}</div>
                <div className="font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-[#777]">
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <SectionHeading>About this Suite</SectionHeading>
          <p className="font-sans text-sm text-gray-400 leading-[1.85] mb-8">{room.description}</p>

          {/* Highlights */}
          <SectionHeading>Suite Highlights</SectionHeading>
          <div className="flex flex-col gap-3 mb-8">
            {room.highlights.map((h) => (
              <div
                key={h.num}
                className="flex gap-4 items-start p-4 bg-[#0a0a0a] border border-[rgba(196,155,91,0.12)]"
              >
                <span className="font-serif text-2xl text-[rgba(196,155,91,0.2)] leading-none flex-shrink-0 w-8 text-right">
                  {h.num}
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-[#e0e0e0] mb-1">{h.title}</p>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <SectionHeading>In-Suite Amenities</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {room.amenities.map((a) => (
              <div
                key={a}
                className="flex items-center gap-3 px-3 py-2.5 bg-[#0a0a0a] border border-[rgba(196,155,91,0.12)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c49b5b] flex-shrink-0" />
                <span className="font-sans text-xs text-[#bbb]">{a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Sidebar (Desktop Only) */}
        <div className="hidden lg:block px-6 py-10 lg:px-7">
          <div className="sticky top-24 bg-[#080808] border border-[rgba(196,155,91,0.22)]">
            <div className="px-6 pt-5 pb-4 border-b border-[rgba(196,155,91,0.15)]">
              <p className="font-sans text-[0.57rem] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">
                {t('priceLabel')}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl text-[#c49b5b]">${room.price.toLocaleString()}</span>
                <span className="font-sans text-xs text-gray-500">{t('perNight')}</span>
              </div>
            </div>
            <div className="px-6 py-5">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>

      <HorizontalDivider />
      <Footer />
      <Chatbot />
      

      {/* ── MOBILE STICKY BOTTOM BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-xl border-t border-[rgba(196,155,91,0.2)] px-6 py-4 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div>
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.2em] uppercase text-gray-400 mb-0.5">
            {t('priceLabel')}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-xl text-[#c49b5b] leading-none">${room.price.toLocaleString()}</span>
            <span className="font-sans text-[0.65rem] text-gray-500">{t('perNight')}</span>
          </div>
        </div>
        <button 
          onClick={() => setShowMobileBooking(true)}
          className="bg-[#c49b5b] text-black font-sans text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-white transition-colors"
        >
          Book Now
        </button>
      </div>

      {/* ── MOBILE BOOKING MODAL (BOTTOM SHEET) ── */}
      <AnimatePresence>
        {showMobileBooking && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileBooking(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Bottom Sheet */}
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-[rgba(196,155,91,0.3)] rounded-t-2xl px-6 pt-6 pb-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-white">{room.name}</h3>
                  <p className="font-sans text-xs text-[#c49b5b] mt-1">${room.price} / night</p>
                </div>
                <button 
                  onClick={() => setShowMobileBooking(false)}
                  className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <BookingForm />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-sans text-[0.58rem] font-bold tracking-[0.22em] uppercase text-[#c49b5b] whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-[rgba(196,155,91,0.3)] to-transparent" />
    </div>
  )
}