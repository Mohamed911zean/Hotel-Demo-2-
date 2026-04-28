"use client";

import BounceGallery from "@/components/bounce-cards"; // 👈 استيراد المكون الجديد
import Image from "next/image";
import Navbar from "@/components/navbar";
import { Footer } from '@/components/footer'
import { Chatbot } from "@/components/chatbot"; 

const bounceImages = [
  "/hotel_pool.jpg",
  "/room_presidential.jpg",
  "/room_junior.jpg",
  "/room_deluxe.jpg",
  "/hotel_lobby.jpg",
  "/hotel_ballroom.jpg",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=80", 
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&q=80", 
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=80",
  "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?w=1400&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=80",
  "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=1400&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400&q=80",

];

const gridImages = [
  "/hotel_pool.jpg",
  "/room_presidential.jpg",
  "/room_junior.jpg",
  "/room_deluxe.jpg",
  "/hotel_lobby.jpg",
  "/hotel_ballroom.jpg",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=80", 
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&q=80", 
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=80",
  "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?w=1400&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=80",
  "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=1400&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400&q=80",

];

export default function GalleryPage() {
  return (
    <div className="bg-background">
    <Navbar />
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 overflow-hidden">
      
      {/* ── HEADER ── */}
      <div className="text-center px-5 max-w-3xl mx-auto mb-12">
        <span className="font-sans text-[0.65rem] text-[#c49b5b] font-semibold tracking-[0.3em] uppercase block mb-4">
          The Visual Journey
        </span>
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-white leading-tight mb-6">
          A Glimpse of <em className="text-[#c49b5b] italic">Elegance</em>
        </h1>
        <p className="font-sans text-sm text-white/60 font-light leading-relaxed tracking-wide">
          Immerse yourself in the breathtaking architecture, exquisite suites, and world-class amenities.
        </p>
      </div>

      {/* ── CAROUSEL HERO (NEW) ── */}
      <BounceGallery images={bounceImages} />

      {/* ── MASONRY GRID GALLERY ── */}
      <section className="max-w-[1320px] mx-auto px-5 mt-20">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="font-serif text-2xl text-white">Full Gallery</h2>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {gridImages.map((src, idx) => (
            <div 
              key={idx} 
              className="relative group break-inside-avoid overflow-hidden border border-white/5 rounded-sm bg-[#0a0a0a]"
            >
              <div className="relative w-full" style={{ aspectRatio: idx % 2 === 0 ? "3/4" : "4/3" }}>
                <Image
                  src={src}
                  alt={`Hotel gallery ${idx}`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-[#c49b5b] font-sans text-xs uppercase tracking-widest font-semibold">
                  View Detail
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
    <Footer />
    <Chatbot />
    </div>
  );
}