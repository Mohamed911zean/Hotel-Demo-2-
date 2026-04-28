"use client";

import { useState } from "react";
import { Star, ExternalLink, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import { useTranslations } from "next-intl"; // 👈 استيراد الترجمة

import "swiper/css";
import "swiper/css/pagination";


interface GoogleReview {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatarInitial: string;
  avatarColor: string;
  googleMapsUrl: string | null;
  avatarUrl?: string;
  location?: string;
}

const googleReviews: GoogleReview[] = [
  {
    id: "r1",
    name: "Gcptelio",
    rating: 5,
    text: "An Unforgettable Stay – Feels Like Family ⭐Cairo Crystal Hotel is truly a hidden gem. When you arrive, the building entrance might look a bit old, but don’t let it fool you — the hotel on the 4th floor is brand new, modern, clean, and far better than many big hotels.The location is perfect: in a lively urban area, close to commercial streets, cafés, shops, and even a Greek university, which was very convenient for me.What made my stay unforgettable were the people. Ahmed, the owner’s son, welcomed me like a brother. We instantly connected and even spent the day together exploring the city. I can honestly say he’s one of the two people I trust the most in Egypt — the other is his father.Sameh, the owner, is a licensed tour guide and took me on an amazing, honest, high-quality tour to the Pyramids of Giza and the Grand Egyptian Museum. He told me, “Ask me anything you need,” and he truly meant it.The rooms are exactly like the photos: spotless, stylish, and very comfortable.As someone who works in hospitality in Greece, I can say with confidence: Ahmed and Sameh offer hospitality from the heart. They don’t just host you — they care about you.My 3 days here were unforgettable, and I’m already planning to return next year just to visit them again.Highly recommended. Don’t judge the entrance — the real magic starts on the 4th floor.",
    date: "March 2024",
    avatarInitial: "A",
    avatarColor: "#2563EB",
    googleMapsUrl: "https://maps.app.goo.gl/2rMMNPfcpA6pjeVt7", 
    location: "Cairo",
  },
  {
    id: "r2",
    name: "Roth James",
    rating: 5,
    text: "I really enjoyed my stay at Cairo Crystal Hotel in Downtown Cairo! The place is beautiful, cozy, and very comfortable. The atmosphere was amazing, and everything was clean and well organized. The staff were friendly and helpful, and the location is perfect — right in the heart of the city. I felt relaxed and happy during my stay. I highly recommend this hotel to anyone visiting Cairo! ",
    date: "January 2026",
    avatarInitial: "N",
    avatarColor: "#16A34A",
    googleMapsUrl: "https://maps.app.goo.gl/abmD6ybQECHaQskeA", 
    location: "New Cairo",
  },
  {
    id: "r3",
    name: "Liam Anderson",
    rating: 5,
    text: "I had a wonderful stay at Cairo Crystal Hotel in downtown Egypt. From the moment I arrived, I felt completely comfortable and welcomed. The hotel is truly luxurious — the rooms are beautifully designed, clean, and very well-maintained. The atmosphere is elegant, and the service was excellent throughout my stay. Whether you're visiting Cairo for business or vacation, I highly recommend Cairo Crystal Hotel for a comfortable and high-end experience.😊.",
    date: "November 2025",
    avatarInitial: "S",
    avatarColor: "#9333EA",
    googleMapsUrl: "https://maps.app.goo.gl/2WnpMgxCfRCbNEP6A", 
    location: "Zamalek",
  },
  {
    id: "r4",
    name: "Angelo Dias",
    rating: 5,
    text: "I stayed here for a night on my way to Luxor. The owners reached out to me via WhatsApp a week prior to my check-in to share their contact details, they asked me if I needed a pickup from the airport. As I was traveling with my family we need a rooms to fit 4 pax, while the luxury hotels were our preferred option, we were required to book two rooms. Instead at Cairo Crystal we were able to book one room with 3 beds, one queen and 2 single beds. The rooms were cleaned, and the owners and staff were very friendly. Even offering us the option of handling our luggage and staying back in their reception area till late night the next day to take our midnight bus..",
    date: "December 2025",
    avatarInitial: "K",
    avatarColor: "#EA580C",
    googleMapsUrl: "https://maps.app.goo.gl/bgsDWXXc6WAjg4mA7", 
    location: "Sheikh Zayed",
  },
  {
    id: "r5",
    name: "basboasa mohamed",
    rating: 5,
    text: "My stay at this hotel was truly wonderful. From the moment I arrived, I was welcomed with genuine warmth and professionalism. The staff went above and beyond to make sure I felt comfortable and cared for throughout my stay.The rooms were spotless, beautifully designed, and very cozy — every detail made me feel at home. The service was exceptional, and the atmosphere of the hotel carried a sense of calm and elegance.What I loved the most was the attention to detail, the kindness of the staff, and the peaceful environment that made my stay unforgettable. I left with a big smile and so many beautiful memories.I would definitely recommend this hotel to anyone looking for comfort, hospitality, and a truly delightful experience. 🌸✨.",
    date: "November 2025",
    avatarInitial: "L",
    avatarColor: "#0891B2",
    googleMapsUrl: "https://maps.app.goo.gl/V5NuxdknXWmUfzWe8", 
    location: "Maadi",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? "#c49b5b" : "none"}
          strokeWidth={1.5}
          style={{
            color: i < rating ? "#c49b5b" : "rgba(255,255,255,0.2)",
          }}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const t = useTranslations("reviews"); // 👈 استخدام الترجمة جوه الـ Card
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 200;
  const displayText = isLong && !expanded ? review.text.slice(0, 200) + "…" : review.text;

  return (
    <div
      className="flex flex-col h-full rounded-sm p-6 md:p-8 transition-all duration-300 relative group border border-white/10 bg-white/5 backdrop-blur-md"
      style={{
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
        transform: "translateZ(0)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#c49b5b";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255, 255, 255, 0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255, 255, 255, 0.1)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255, 255, 255, 0.05)";
      }}
    >
      {/* Decorative Quote Mark */}
      <div 
        className="absolute top-4 right-6 text-6xl font-serif text-white/5 opacity-50 group-hover:text-[#c49b5b] group-hover:opacity-20 transition-colors duration-300 pointer-events-none"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        "
      </div>

      {/* Google Maps logo + rating */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          {/* Google G icon */}
          <div
            className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 bg-white"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <StarRating rating={review.rating} />
        </div>
        <span className="text-[0.65rem] text-white/50 tracking-wider uppercase">
          {review.date}
        </span>
      </div>

      {/* Review text */}
      <p className="text-[0.95rem] text-white/80 leading-[1.75] font-serif font-light italic flex-1 mb-2 relative z-10">
        "{displayText}"
      </p>
      
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[0.7rem] text-[#c49b5b] hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 text-left mb-4 relative z-10 uppercase tracking-widest"
        >
          {expanded ? t("showLess") : t("readMore")} {/* 👈 ترجمة الأزرار */}
        </button>
      )}

      {/* Reviewer info */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          {review.avatarUrl ? (
            <img
              src={review.avatarUrl}
              alt={review.name}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-serif tracking-widest flex-shrink-0"
              style={{ background: review.avatarColor, fontSize: "0.9rem" }}
            >
              {review.avatarInitial}
            </div>
          )}
          <div>
            <p className="font-sans text-[0.85rem] font-semibold text-white tracking-wide">
              {review.name}
            </p>
            {review.location && (
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={10} className="text-white/40" />
                <span className="text-[0.65rem] text-white/40 uppercase tracking-wider">
                  {review.location}
                </span>
              </div>
            )}
          </div>
        </div>

        {review.googleMapsUrl ? (
          <a
            href={review.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors duration-200 text-[0.65rem] text-white/40 hover:text-[#c49b5b] uppercase tracking-wider"
          >
            {t("viewOnGoogle")} {/* 👈 ترجمة اللينك */}
            <ExternalLink size={10} />
          </a>
        ) : (
          <span className="text-[0.65rem] text-white/40 bg-white/5 px-2 py-1 rounded-full border border-white/10">
            {t("googleReview")} {/* 👈 ترجمة البادج */}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ReviewsCarousel() {
  const t = useTranslations("reviews"); // 👈 استيراد الترجمة للقسم الرئيسي
  
  const avgRating = (
    googleReviews.reduce((sum, r) => sum + r.rating, 0) / googleReviews.length
  ).toFixed(1);

  return (
    <section id="testimonials" className="py-[clamp(5rem,10vw,8rem)] bg-[#050505]">
      <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="text-[0.65rem] text-[#c49b5b] font-semibold tracking-[0.3em] uppercase block">
              {t("sectionLabel")} {/* 👈 ترجمة الـ Label */}
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-light text-white leading-tight mb-8">
            {t("sectionTitleFirstPart")} <em className="text-[#c49b5b] italic">{t("sectionTitleSecondPart")}</em> {/* 👈 ترجمة العنوان */}
          </h2>

          {/* Aggregate rating */}
          <div
            className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-5 gap-y-3 px-5 py-3.5 sm:py-3 rounded-sm mx-auto mt-2 max-w-[90vw] sm:max-w-max border border-[#c49b5b]/20 bg-[#c49b5b]/5 backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-[2rem] sm:text-[2.2rem] font-serif font-bold text-[#c49b5b] leading-none">
                  {avgRating}
                </p>
                <p className="text-[0.6rem] text-white/50 uppercase tracking-[0.12em] mt-[2px]">
                  {t("overallRating")} {/* 👈 ترجمة Overall */}
                </p>
              </div>

              <div className="w-[1px] h-[35px] bg-[#c49b5b]/20" />

              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#c49b5b" className="text-[#c49b5b]" />
                  ))}
                </div>
                <p className="whitespace-nowrap text-[0.7rem] text-white/60 tracking-wider">
                  {t("basedOn", { count: googleReviews.length })} {/* 👈 ترجمة "Based on X reviews" */}
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-[1px] h-[35px] bg-[#c49b5b]/20" />

            <div className="flex items-center justify-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t border-[#c49b5b]/20 sm:border-t-0">
              <svg viewBox="0 0 24 24" width="18" height="18" className="bg-white rounded-full">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="whitespace-nowrap text-[0.75rem] text-white font-medium tracking-[0.02em]">
                Google Maps
              </span>
            </div>
          </div>
        </div>

        {/* Unified Responsive Carousel */}
        <div className="w-full relative px-1 md:px-0 mt-8 md:mt-12">
          <style dangerouslySetInnerHTML={{__html: `
            .testimonials-swiper {
              padding-bottom: 4rem !important;
              padding-top: 1rem !important;
            }
            .swiper-pagination-bullet {
              background: rgba(196,155,91,0.2) !important;
              opacity: 1 !important;
              width: 8px !important;
              height: 8px !important;
              transition: all 0.3s ease !important;
            }
            .swiper-pagination-bullet-active {
              background: #c49b5b !important;
              width: 24px !important;
              border-radius: 8px !important;
              box-shadow: 0 0 10px rgba(196,155,91,0.4);
            }
          `}} />
          <Swiper
            modules={[Pagination, Autoplay, A11y]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              800: { slidesPerView: 2, spaceBetween: 24 },
              1100: { slidesPerView: 3, spaceBetween: 24 }
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: true }}
            grabCursor={true}
            className="testimonials-swiper h-auto"
          >
            {googleReviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Link to Google Maps page */}
        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps/place/cairo+crystal+hotel/@30.0448258,31.2564908,2412m/data=!3m1!1e3!4m17!1m5!2m4!1scairo+crystal+hotel!5m2!5m1!1s2026-05-19!3m10!1s0x145840c797a84b9d:0xe126a4e3b118d32d!5m3!1s2026-05-19!4m1!1i2!8m2!3d30.0448258!4d31.2384664!15sChNjYWlybyBjcnlzdGFsIGhvdGVskgEFaG90ZWzgAQA!16s%2Fg%2F11yjh2vxc3?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#c49b5b]/50 text-[#c49b5b] hover:bg-[#c49b5b] hover:text-black transition-all duration-300 rounded-sm font-sans text-[0.7rem] uppercase font-bold tracking-[0.2em]"
            id="google-maps-all-reviews-btn"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" className="bg-white rounded-full">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {t("seeAllReviews")} {/* 👈 ترجمة الزرار الرئيسي */}
            <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}