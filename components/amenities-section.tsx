'use client'

import { useEffect, useState } from 'react'
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

import { SectionHeader, Ornament } from './animated-elements'
import { useTranslations } from 'next-intl'

const AMENITY_KEYS = [
  { icon: Waves, key: 'spa' },
  { icon: Utensils, key: 'dining' },
  { icon: Dumbbell, key: 'fitness' },
  { icon: Shield, key: 'security' },
  { icon: Wifi, key: 'wifi' },
  { icon: Zap, key: 'smart' },
  { icon: Wine, key: 'wine' },
  { icon: Users, key: 'events' },
]

export function AmenitiesSection() {
  const t = useTranslations('amenities')
  const ta = useTranslations('amenity')

  const [active, setActive] = useState(0)

  /* auto move */
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % AMENITY_KEYS.length)
    }, 2200)

    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="amenities"
      className="relative overflow-hidden bg-background py-20 md:py-24 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto mb-14">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </div>

      {/* ================= DESKTOP ARC CAROUSEL ================= */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        <div className="relative h-[470px] overflow-hidden">
          {/* arc line */}
          <div className="absolute left-1/2 top-[70%] -translate-x-1/2 w-[92%] h-[230px] border-t border-gold/15 rounded-[100%]" />

          {AMENITY_KEYS.map(({ icon: Icon, key }, index) => {
            let offset = index - active

            if (offset < -4) offset += AMENITY_KEYS.length
            if (offset > 4) offset -= AMENITY_KEYS.length

            const visible = Math.abs(offset) <= 3

            const progress = (offset + 3) / 6 // 0 to 1

            const x = progress * 1080
            const y = Math.sin(progress * Math.PI) * -155

            const scale =
              offset === 0
                ? 1.06
                : Math.abs(offset) === 1
                ? 1
                : 0.92

            const opacity =
              Math.abs(offset) > 3 ? 0 : Math.abs(offset) === 3 ? 0.35 : 1

            const zIndex = 10 - Math.abs(offset)

            return (
              <motion.div
                key={key}
                className="absolute"
                animate={{
                  left: x,
                  top: `calc(70% + ${y}px)`,
                  scale,
                  opacity,
                }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  zIndex,
                  pointerEvents: visible ? 'auto' : 'none',
                }}
              >
                <AmenityCard
                  Icon={Icon}
                  title={ta(key as any)}
                  desc={ta(`${key}Desc` as any)}
                  active={offset === 0}
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ================= TABLET ================= */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-5 max-w-5xl mx-auto">
        {AMENITY_KEYS.map(({ icon: Icon, key }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <AmenityCard
              Icon={Icon}
              title={ta(key as any)}
              desc={ta(`${key}Desc` as any)}
            />
          </motion.div>
        ))}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="grid md:hidden gap-4 max-w-md mx-auto">
        {AMENITY_KEYS.map(({ icon: Icon, key }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: index % 2 === 0 ? -25 : 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={index % 2 === 0 ? 'mr-5' : 'ml-5'}
          >
            <AmenityCard
              Icon={Icon}
              title={ta(key as any)}
              desc={ta(`${key}Desc` as any)}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-14 md:mt-16 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Ornament align="center" width={70} />
      </motion.div>
    </section>
  )
}

/* ================= CARD ================= */

function AmenityCard({
  Icon,
  title,
  desc,
  active = false,
}: {
  Icon: any
  title: string
  desc: string
  active?: boolean
}) {
  return (
    <div
      className={`group w-[250px] rounded-2xl border backdrop-blur-xl px-5 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.22)] transition-all duration-500
      ${
        active
          ? 'border-gold/45 bg-dark-card/90'
          : 'border-gold-border/10 bg-dark-card/65'
      }
      hover:-translate-y-2 hover:border-gold/40`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-500
          ${active ? 'bg-gold/20' : 'bg-gold/10'}
          group-hover:scale-110`}
        >
          <Icon className="h-5 w-5 text-gold" />
        </div>

        <div className="flex-1">
          <h3 className="font-serif text-white text-sm xl:text-base group-hover:text-gold transition-colors">
            {title}
          </h3>

          <p className="mt-2 text-xs xl:text-sm leading-relaxed text-gray-400">
            {desc}
          </p>
        </div>
      </div>

      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-gold/35 to-transparent opacity-60" />
    </div>
  )
}