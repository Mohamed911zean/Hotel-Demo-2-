import {HeroSection} from '@/components/hero-section' 
import Navbar  from '@/components/navbar'
import { Chatbot } from '@/components/chatbot'
import { FeaturedRooms } from '@/components/featured-rooms'
import { AmenitiesSection } from '@/components/amenities-section'
import ReviewsCarousel  from '@/components/reviews-carousel'
import { Footer } from '@/components/footer'
import Marquee from '@/components/marquee'
import {MapSection} from '@/components/map-section'
import { useTranslations } from 'next-intl'
import { 
  FadeUp, 
  HighlightText,
  Ornament,
  HorizontalDivider
} from "@/components/animated-elements";


export default function Home() {
  const t = useTranslations()
  return (
    <main className="bg-background">
      <Navbar />
      <HeroSection  />
      <Marquee />

 {/* ── INTRO / HIGHLIGHT TEXT ───── */}
      <section style={{ padding: "8rem 2rem", backgroundColor: "#0a0a0a", textAlign: "center" }}>
        <div style={{ marginTop: "2rem", fontFamily: "inherit", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.2, fontWeight: 300 }}>          <FadeUp>
            <span className="gold-label">{t('vision.label')}</span>
            <Ornament />
          </FadeUp>
          <div style={{ marginTop: "2rem", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.2, fontWeight: 300 }}>
            <HighlightText 
              text={t('vision.text')}
              highlightColor="#c49b5b"
            />
          </div>
        </div>
      </section>

      <HorizontalDivider />
      <FeaturedRooms />
      <HorizontalDivider />
      <AmenitiesSection />
      <HorizontalDivider />
      <ReviewsCarousel />
      <HorizontalDivider />
      <MapSection />
      <Footer />
      <Chatbot />
    </main>
  )
}
