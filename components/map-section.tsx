'use client'

import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { Ornament } from './animated-elements'

export function MapSection() {
  const t = useTranslations('location')

  return (
    <section className="bg-[#050505] py-24 px-6">
      <div className="max-w-[1100px] mx-auto">

        <span className="gold-label block text-center mb-2">{t('label')}</span>
        <h2 className="font-serif text-5xl md:text-6xl text-white text-center font-normal tracking-tight">
          {t('title')}
        </h2>
        <div className="flex justify-center my-4">
          <Ornament align="center" width={48} />
        </div>
        <p className="font-sans text-sm text-gray-500 text-center max-w-md mx-auto mb-12 leading-relaxed">
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] border border-[rgba(196,155,91,0.22)]">

          {/* Map */}
          <div className="relative h-[300px] lg:h-[460px] bg-[#0a0a0a] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584198b6f4b553%3A0x2a6399b02d0d2783!2s174%20El%20Tahrir%2C%20Bab%20Al%20Louq%2C%20Cairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1680000000000!5m2!1sen!2seg"
              className="w-full h-full border-0"
              style={{ filter: 'grayscale(1) invert(1) contrast(0.82) brightness(0.68) sepia(0.15)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cairo Crystal House Location"
            />

            <div className="absolute top-4 left-4 bg-[rgba(5,5,5,0.93)] border border-[rgba(196,155,91,0.45)] px-3.5 py-2 flex items-center gap-2">
              <span className="w-[7px] h-[7px] rounded-full bg-[#c49b5b] animate-pulse flex-shrink-0" />
              <span className="font-sans text-[0.58rem] font-bold tracking-[0.22em] uppercase text-[#c49b5b]">
                {t('title')}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
              <a href="https://maps.google.com/?q=174+El+Tahrir+Bab+Al+Louq+Cairo" target="_blank" rel="noopener noreferrer"
                className="bg-[rgba(5,5,5,0.93)] border border-[rgba(196,155,91,0.38)] text-[#c49b5b] font-sans text-[0.58rem] font-bold tracking-[0.16em] uppercase px-3.5 py-2 hover:bg-[#c49b5b] hover:text-black transition-all duration-300">
                {t('openMaps')}
              </a>
              <a href="https://www.google.com/maps/dir//174+El+Tahrir,+Bab+Al+Louq,+Cairo,+Egypt" target="_blank" rel="noopener noreferrer"
                className="bg-[rgba(5,5,5,0.93)] border border-[rgba(196,155,91,0.38)] text-[#c49b5b] font-sans text-[0.58rem] font-bold tracking-[0.16em] uppercase px-3.5 py-2 hover:bg-[#c49b5b] hover:text-black transition-all duration-300">
                {t('directions')}
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-[#080808] border-t lg:border-t-0 lg:border-l border-[rgba(196,155,91,0.2)] p-7 flex flex-col gap-5">
            <div>
              <p className="font-serif text-xl text-white font-normal mb-1">{t('title')}</p>
              <p className="font-sans text-[0.6rem] tracking-[0.16em] uppercase text-gray-600">174 El Tahrir, Bab Al Louq · Cairo</p>
            </div>

            <div className="h-px bg-gradient-to-r from-[rgba(196,155,91,0.38)] to-transparent" />

            {[
              {
                icon: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>,
                label: t('addressLabel'),
                value: '174 El Tahrir, Apt 9, 4th Floor\nBab Al Louq, Cairo 4280120',
              },
              {
                icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
                label: t('hoursLabel'),
                value: '24 hours · 7 days a week',
              },
              {
                icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>,
                label: t('phoneLabel'),
                value: '+20 2 XXXX XXXX',
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex gap-3 items-start">
                <div className="w-[34px] h-[34px] border border-[rgba(196,155,91,0.28)] flex items-center justify-center flex-shrink-0">
                  <svg className="w-[14px] h-[14px] stroke-[#c49b5b] fill-none" strokeWidth={1.6} viewBox="0 0 24 24">{icon}</svg>
                </div>
                <div>
                  <p className="font-sans text-[0.57rem] font-bold tracking-[0.2em] uppercase text-[#c49b5b] mb-1">{label}</p>
                  <p className="font-sans text-[0.78rem] text-gray-400 leading-relaxed whitespace-pre-line">{value}</p>
                </div>
              </div>
            ))}

            <div className="h-px bg-gradient-to-r from-[rgba(196,155,91,0.38)] to-transparent" />

            {/* Nearby */}
            <div>
              <p className="font-sans text-[0.57rem] font-bold tracking-[0.2em] uppercase text-[#c49b5b] mb-3">{t('nearby')}</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { name: 'Tahrir Square', dist: '4 min walk' },
                  { name: 'Egyptian Museum', dist: '10 min walk' },
                  { name: 'Cairo Tower', dist: '1.8 km' },
                  { name: 'Cairo Airport', dist: '17 km · 36 min' },
                ].map((item) => (
                  <div key={item.name} className="bg-[#0f0f0f] border border-[rgba(196,155,91,0.12)] p-2.5">
                    <p className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.08em] text-gray-500 mb-0.5">{item.name}</p>
                    <p className="font-sans text-[0.68rem] text-[#c49b5b]">{item.dist}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2">
              <Link href="/rooms" className="block text-center bg-[#c49b5b] text-black font-sans text-[0.6rem] font-black tracking-[0.22em] uppercase py-3.5 hover:bg-white transition-all duration-300">
                {t('reserve')}
              </Link>
              <a href="https://www.google.com/maps/dir//174+El+Tahrir,+Bab+Al+Louq,+Cairo,+Egypt" target="_blank" rel="noopener noreferrer"
                className="block text-center border border-[rgba(196,155,91,0.38)] text-[#c49b5b] font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase py-2.5 hover:bg-[rgba(196,155,91,0.08)] hover:border-[#c49b5b] transition-all duration-300">
                {t('directions')} ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}