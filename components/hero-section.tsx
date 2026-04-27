"use client";

import { FileText, ChevronDown, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link"; // ضفت الـ Link هنا

// استخدام صور الفندق الخاصة بك
const heroSlides = [
  {
    desktop: "/hotel_pool.jpg",
    mobile: "/hotel_pool.jpg",
  },
  {
    desktop: "/room_deluxe.jpg",
    mobile: "/room_deluxe.jpg",
  },
  {
    desktop: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2000&q=85",
    mobile: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2000&q=85",
  },
  {
    desktop: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=2000&q=85",
    mobile: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=2000&q=85",
  }
];

// شيلنا الـ Props خالص عشان ميعملش إيرور في page.tsx
export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000); // 4 ثواني عشان تدي إحساس أهدأ وأفخم

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden min-h-[100svh] bg-[#050505]"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => (
          <div key={i} className="absolute inset-0">
            {/* Desktop Background */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
              style={{
                backgroundImage: `url('${slide.desktop}')`,
                opacity: i === index ? 1 : 0,
                transform: i === index ? "scale(1)" : "scale(1.03)",
                transition: "opacity 1.5s ease-in-out, transform 8s ease-out",
              }}
            />
            {/* Mobile Background */}
            <div
              className="absolute inset-0 bg-cover bg-[position:center_15%] bg-no-repeat block md:hidden"
              style={{
                backgroundImage: `url('${slide.mobile}')`,
                opacity: i === index ? 1 : 0,
                transform: i === index ? "scale(1)" : "scale(1.03)",
                transition: "opacity 1.5s ease-in-out, transform 8s ease-out",
              }}
            />
          </div>
        ))}
      </div>

      {/* Overlay - تم تعديل الألوان لأسود متدرج يليق بالفخامة */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.9) 100%)",
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-5 max-w-4xl mx-auto transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ paddingTop: "90px" }}
      >

        {/* Badge */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm">
            <Star size={14} fill="currentColor" className="text-[#c49b5b]" />
            <span className="font-medium">5.0</span>
            <span className="opacity-70">Forbes Travel Guide Rating</span>
          </div>
        </div>

        {/* Title */}
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(3.4rem, 8vw, 6.2rem)",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Royal Palace
        </h1>

        <p
          className="font-serif"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            color: "#c49b5b",
            fontStyle: "italic",
            marginBottom: "1.5rem",
          }}
        >
          Hotel & Suites
        </p>

        <div className="w-16 h-[1px] bg-[#c49b5b]/50 mx-auto mb-8" />

        <p
          className="font-sans font-light"
          style={{
            maxWidth: "560px",
            margin: "0 auto 3rem",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          Where timeless elegance meets modern luxury. Experience uncompromised comfort, breathtaking city views, and flawless service.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* حولنا الزرار ده لـ Link بدل onClick */}
          <Link 
            href="/rooms"
            className="w-full sm:w-auto px-10 py-3.5 rounded-sm bg-[#c49b5b] hover:bg-white hover:text-black text-black transition-all duration-300 font-semibold tracking-wider uppercase text-sm"
          >
            Book Your Stay
          </Link>

          <Link 
            href="/gallery" 
            className="w-full sm:w-auto px-10 py-3.5 rounded-sm border border-[#c49b5b]/50 hover:bg-[#c49b5b]/10 text-white transition-all duration-300 font-medium flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
          >
            <FileText size={18} className="text-[#c49b5b]" />
            Explore Hotel
          </Link>
        </div>

        {/* حولنا الزرار ده لـ a tag عشان ينزل للصفحة لتحت بدل onClick */}
        <a
          href="#featured" // لو عندك قسم تحت اسمه id="featured" هينزله
          className="mt-16 flex flex-col items-center gap-2 mx-auto text-[0.65rem] uppercase tracking-[0.25em] text-white/50 hover:text-[#c49b5b] transition-colors"
        >
          Discover More
          <ChevronDown size={18} className="opacity-70 animate-bounce mt-1" />
        </a>
      </div>
    </section>
  );
}