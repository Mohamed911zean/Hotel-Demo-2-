"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./language-switcher";
import Image from "next/image"; // 👈 ضروري عشان الـ Logo

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/" || /^\/(en|ar)\/?$/.test(pathname);
  const t = useTranslations("nav");
  
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // التحكم في شفافية النافبار مع السكرول
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // قفل المنيو عند تغيير الصفحة
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // منع سكرول الشاشة الخلفية لما المنيو مفتوح
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  const links = [
    { href: "/", label: t("home") },
    { href: "/rooms", label: t("rooms") },
    { href: "/gallery", label: t("gallery") },
    { href: "/contact", label: t("contact") },
  ];

  // النافبار شفاف فقط في الصفحة الرئيسية وبدون سكرول والمنيو مقفولة
  const isTransparent = isHome && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-500 ${
          isTransparent 
            ? "bg-transparent border-transparent py-6" 
            : "bg-[#050505]/95 backdrop-blur-md border-b border-[#c49b5b]/15 py-4"
        }`}
      >
        <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between">
          
          {/* ── 1. LOGO SECTION ── */}
          <Link href="/" className="flex items-center gap-3 relative z-[70] group">
            {/* أيقونة اللوجو (ظاهرة دايماً) */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-500 group-hover:scale-105">
              <Image 
                src="/logo-2.png" // تأكد من اسم الصورة ومسارها
                alt="Cairo Crystal Logo" 
                fill
                className="object-contain mix-blend-lighten" 
                priority
                sizes="(max-width: 768px) 48px, 56px"
              />
            </div>

            {/* النص (مخفي في الموبايل، ظاهر في الديسكتوب) */}
            <div className="hidden md:flex flex-col leading-none">
              <span className="font-serif text-[1.4rem] tracking-wide text-white">
                Cairo Crystal
              </span>
              <span className="font-sans text-[0.5rem] font-semibold tracking-[0.4em] text-[#c49b5b] uppercase mt-1">
                Hotel & Suites
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-sans text-[0.7rem] uppercase font-semibold tracking-[0.2em] transition-colors duration-300 ${
                  pathname === l.href || pathname.startsWith(l.href + "/") ? "text-[#c49b5b]" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-[70]">
            <LanguageSwitcher />
            <Link
              href="/rooms"
              className="hidden md:inline-block px-6 py-3 border border-[#c49b5b] text-[#c49b5b] font-sans text-[0.65rem] font-bold uppercase tracking-[0.25em] hover:bg-[#c49b5b] hover:text-black transition-all duration-300"
            >
              {t("reserve")}
            </Link>
            
            {/* زرار الهامبرجر لازم يفضل ظاهر فوق الشاشة السوداء */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-[#c49b5b] transition-transform duration-300 hover:scale-110 p-2 -mr-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              {open ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-[#050505] flex flex-col justify-center items-center px-6 md:hidden"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <span className="font-serif text-[25rem] text-[#c49b5b]">C</span>
            </div>

            <nav className="flex flex-col items-center gap-10 relative z-[56] w-full max-w-sm mt-10">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`font-serif text-[2.5rem] transition-colors duration-300 ${
                      pathname === l.href ? "text-[#c49b5b] italic" : "text-white hover:text-white/70"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="w-full mt-6"
              >
                <Link
                  href="/rooms"
                  onClick={() => setOpen(false)}
                  className="block w-full py-4 text-center bg-[#c49b5b] text-black font-sans text-sm font-bold tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(196,155,91,0.2)]"
                >
                  {t("bookNow")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}