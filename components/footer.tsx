'use client'

import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Ornament } from './animated-elements'

export function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="bg-background border-t border-gold-border relative">
      {/* Decorative top ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4">
        <Ornament align="center" width={40} />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-gold mb-4">{t('brand')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-widest text-sm">
              {t('navigation')}
            </h4>
            <ul className="space-y-2">
              {[
                { labelKey: 'home', href: '/' },
                { labelKey: 'rooms', href: '/rooms' },
                { labelKey: 'gallery', href: '/gallery' },
                { labelKey: 'contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-gold transition-colors text-sm">
                    {t(link.labelKey as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-widest text-sm">
              {t('services')}
            </h4>
            <ul className="space-y-2">
              {[
                'Fine Dining',
                'Spa & Wellness',
                'Concierge',
                'Event Planning',
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gold transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-widest text-sm">
              {t('contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{t('address')}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-gold" />
                <a href="https://wa.me/201507550617" className="hover:text-gold transition-colors">
                  +20 15 07550617
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-gold" />
                <a href="mailto:concierge@cairocrystalhouse.com" className="hover:text-gold transition-colors">
                  concierge@cairocrystalhouse.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">
              &copy; 2024 {t('brand')}. {t('rights')}
            </p>
            <div className="flex gap-6">
              {[
                { label: t('privacy'), href: '#' },
                { label: t('terms'), href: '#' },
                { label: t('cookies'), href: '#' },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-600 hover:text-gold transition-colors text-xs"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
