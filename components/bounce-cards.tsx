"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface BounceGalleryProps {
  images: string[];
}

export default function BounceCards({ images }: BounceGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(2); // الصورة اللي في النص
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // حساب الستايلات بناءً على مكان الصورة بالنسبة للصورة النشطة
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    
    // إخفاء الصور البعيدة جداً
    if (Math.abs(diff) > 2) {
      return { scale: 0, opacity: 0, x: diff > 0 ? 300 : -300, zIndex: 0 };
    }

    if (diff === 0) {
      // الصورة اللي في النص (Active)
      return { scale: 1, opacity: 1, x: 0, rotate: 0, zIndex: 50 };
    } else if (diff === 1) {
      // يمين أولى
      return { scale: 0.85, opacity: 0.8, x: 140, rotate: 6, zIndex: 40 };
    } else if (diff === -1) {
      // شمال أولى
      return { scale: 0.85, opacity: 0.8, x: -140, rotate: -6, zIndex: 40 };
    } else if (diff === 2) {
      // يمين تانية
      return { scale: 0.7, opacity: 0.5, x: 240, rotate: 12, zIndex: 30 };
    } else if (diff === -2) {
      // شمال تانية
      return { scale: 0.7, opacity: 0.5, x: -240, rotate: -12, zIndex: 30 };
    }
  };

  const nextSlide = () => {
    if (currentIndex < images.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const openFullScreen = (src: string) => {
    setSelectedImage(src);
    setIsFullScreen(true);
    document.body.style.overflow = "hidden"; // منع سكرول الصفحة
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="relative w-full flex flex-col items-center justify-center pt-10 pb-20">
        
        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className="relative flex items-center justify-center w-full max-w-[800px] h-[400px] md:h-[500px] overflow-hidden"
        >
          {images.map((src, idx) => {
            const style = getCardStyle(idx);
            
            return (
              <motion.div
                key={idx}
                className="absolute w-[200px] md:w-[280px] aspect-[3/4] rounded-sm overflow-hidden border border-[#c49b5b]/40 cursor-pointer group bg-[#050505]"
                initial={false}
                animate={{
                  x: style?.x,
                  scale: style?.scale,
                  opacity: style?.opacity,
                  rotate: style?.rotate,
                  zIndex: style?.zIndex,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  boxShadow: idx === currentIndex ? "0 20px 40px rgba(0,0,0,0.6)" : "0 10px 20px rgba(0,0,0,0.4)",
                }}
                onClick={() => {
                  if (idx === currentIndex) {
                    openFullScreen(src);
                  } else {
                    setCurrentIndex(idx);
                  }
                }}
              >
                <Image 
                  src={src} 
                  alt={`Gallery image ${idx + 1}`} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  sizes="(max-width: 768px) 200px, 280px"
                />
                
                {/* Full Screen Icon Hover Effect (Only on Active Card) */}
                {idx === currentIndex && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="text-[#c49b5b] w-10 h-10" strokeWidth={1.5} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Controllers */}
        <div className="flex items-center gap-8 mt-10">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-4 rounded-full border border-[#c49b5b]/30 text-[#c49b5b] hover:bg-[#c49b5b] hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#c49b5b] transition-all duration-300"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          
          <span className="font-sans text-xs tracking-[0.3em] text-white/50">
            {currentIndex + 1} / {images.length}
          </span>

          <button 
            onClick={nextSlide}
            disabled={currentIndex === images.length - 1}
            className="p-4 rounded-full border border-[#c49b5b]/30 text-[#c49b5b] hover:bg-[#c49b5b] hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#c49b5b] transition-all duration-300"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Full Screen Lightbox */}
      <AnimatePresence>
        {isFullScreen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={closeFullScreen}
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-[#c49b5b] transition-colors z-50"
            >
              <X size={32} strokeWidth={1.5} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full h-full max-w-5xl max-h-[85vh] rounded-sm overflow-hidden border border-white/10"
            >
              <Image 
                src={selectedImage}
                alt="Full screen image"
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}