'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function LocaleHtmlSetter() {
  const pathname = usePathname()

  useEffect(() => {
    // Extract locale from the first segment of the path e.g. /ar/rooms → 'ar'
    const locale = pathname.split('/')[1]
    const isArabic = locale === 'ar'
    document.documentElement.lang = locale || 'en'
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
  }, [pathname])

  return null
}