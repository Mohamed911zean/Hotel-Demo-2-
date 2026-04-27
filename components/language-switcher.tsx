'use client'

import { usePathname, useRouter } from '@/lib/navigation'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useState } from 'react'

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  function switchLocale(nextLocale: string) {
    if (nextLocale === locale) return
    // Use next-intl's router.replace to change locale
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
    setOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        disabled={isPending}
        className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-white/70 hover:text-[#c49b5b] transition-colors duration-300 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Switch language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{locale.toUpperCase()}</span>
      </motion.button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="absolute top-full right-0 mt-2 min-w-[80px] bg-[#0a0a0a] border border-[#c49b5b]/30 rounded-sm overflow-hidden z-50"
        >
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`w-full px-3 py-2 text-left text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                l.code === locale
                  ? 'text-[#c49b5b] bg-[#c49b5b]/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Click outside to close */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  )
}
