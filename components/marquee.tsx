'use client'

import { useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import gsap from 'gsap'

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('marquee')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const items = t.raw('items') as string[]

  useEffect(() => {
    if (!trackRef.current) return

    const tween = gsap.to(trackRef.current, {
      xPercent: isRTL ? 50 : -50,
      repeat: -1,
      duration: 28,
      ease: 'none',
    })

    return () => { tween.kill() }
  }, [isRTL])

  const repeated = [...items, ...items]

  return (
    <div style={{ backgroundColor: '#c49b5b', padding: '0.875rem 0', overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(0,0,0,0.15)' }}>
      <div ref={trackRef} style={{ display: 'flex', width: 'max-content', gap: 0, direction: 'ltr' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#000', padding: '0 2.5rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            {item}
            <span style={{ fontSize: '0.4rem', opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}