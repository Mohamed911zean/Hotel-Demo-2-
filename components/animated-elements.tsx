"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const ease = [0.22, 1, 0.36, 1];

/* ── Ornament / Divider ──────────────────────────────────── */
export function Ornament({ align = "center", width = 56 }: { align?: "left" | "center"; width?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: ease as any }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: "0.85rem",
        marginTop: "1rem",
      }}
    >
      <span
        style={{
          display: "block",
          width: `${width}px`,
          height: "1px",
          background: "linear-gradient(90deg, rgba(196,155,91,0.08), rgba(196,155,91,0.7))",
        }}
      />
      <span
        style={{
          color: "#c49b5b",
          fontSize: "0.7rem",
          lineHeight: 1,
          opacity: 0.9,
        }}
      >
        ✦
      </span>
      <span
        style={{
          display: "block",
          width: `${width}px`,
          height: "1px",
          background: "linear-gradient(90deg, rgba(196,155,91,0.7), rgba(196,155,91,0.08))",
        }}
      />
    </motion.div>
  );
}

/* ── Section Header ──────────────────────────────────────── */
interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({ label, title, subtitle, align = "center" }: SectionHeaderProps) {
  return (
    <motion.div
      className={align === "center" ? "text-center mb-16" : "mb-16"}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <span
        className="gold-label"
        style={{
          display: "block",
          fontFamily: "var(--font-sans)",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "1rem",
          textAlign: align,
        }}
      >
        {label}
      </span>
      <Ornament align={align} />
      <h2
        className="font-serif text-5xl md:text-6xl text-white mt-6 tracking-tight"
        style={{ textAlign: align }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-lg max-w-2xl mt-4" style={{ marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ── Horizontal Divider ──────────────────────────────────── */
export function HorizontalDivider() {
  return (
    <div className="relative h-[1px] w-full overflow-hidden my-0">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: ease as any }}
        style={{
          height: "1px",
          width: "100%",
          background: "linear-gradient(90deg, transparent 0%, rgba(196,155,91,0.3) 20%, rgba(196,155,91,0.5) 50%, rgba(196,155,91,0.3) 80%, transparent 100%)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}

/* ── Fade Up ─────────────────────────────────────────────── */
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeUp({ children, delay = 0, distance = 40, duration = 0.8, className, style }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: ease as any }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Fade In ─────────────────────────────────────────────── */
export function FadeIn({ children, delay = 0, duration = 0.8, className, style }: Omit<FadeUpProps, "distance">) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: ease as any }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Slide In ─────────────────────────────────────────────── */
interface SlideInProps extends Omit<FadeUpProps, "distance"> {
  direction?: "left" | "right";
}

export function SlideIn({ children, direction = "left", delay = 0, duration = 0.85, className, style, ...props }: SlideInProps) {
  const x = direction === "left" ? -60 : 60;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: ease as any }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── Scale In ─────────────────────────────────────────────── */
export function ScaleIn({ children, delay = 0, duration = 0.7, className, style }: Omit<FadeUpProps, "distance">) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: ease as any }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Rotate In ─────────────────────────────────────────────── */
export function RotateIn({ children, delay = 0, duration = 0.8, className, style }: Omit<FadeUpProps, "distance">) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -10 }}
      whileInView={{ opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: ease as any }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger Container ───────────────────────────────────── */
interface StaggerProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerContainer({ children, stagger = 0.1, delay = 0, className, style }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger Child ───────────────────────────────────────── */
export function StaggerChild({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: ease as any } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Gold Line Reveal ────────────────────────────────────── */
export function GoldLineReveal({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: ease as any }}
      style={{
        height: "1px",
        background: "#c49b5b",
        marginBottom: "0.75rem",
        width: "40px",
        opacity: 0.6,
      }}
    />
  );
}

/* ── Split Text Reveal ───────────────────────────────────── */
export function SplitTextReveal({ text, delay = 0, style, className }: { text: string; delay?: number; style?: React.CSSProperties; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap", ...style }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.25em" }}>
          <motion.span
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: ease as any } },
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

/* ── Highlight Text (Scroll Scrub) ───────────────────────── */
export function HighlightText({ text, style, highlightColor = "#ffffff", baseColor = "rgba(255,255,255,0.2)" }: { text: string; style?: React.CSSProperties; highlightColor?: string; baseColor?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll(".h-char");
    
    gsap.fromTo(
      chars,
      { color: baseColor },
      {
        color: highlightColor,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [baseColor, highlightColor]);
  return (
    <div ref={containerRef} style={{ display: "flex", flexWrap: "wrap", ...style }}>
      {text.split(" ").map((word, wordIndex) => (
        <div key={wordIndex} style={{ display: "inline-flex", marginRight: "0.25em" }}>
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className="h-char" style={{ color: baseColor }}>
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Parallax Scroll ─────────────────────────────────────── */
export function ParallaxScroll({ children, speed = 0.5, className, style }: { children: React.ReactNode; speed?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: `${50 * speed}%`,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [speed]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/* ── Blur Reveal on Scroll ───────────────────────────────── */
export function BlurReveal({ children, delay = 0, className, style }: Omit<FadeUpProps, "distance">) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: ease as any }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Number Counter ──────────────────────────────────────── */
export function NumberCounter({ 
  from = 0, 
  to = 100, 
  duration = 2.5, 
  delay = 0,
  suffix = "",
  className,
  style
}: { 
  from?: number; 
  to?: number; 
  duration?: number; 
  delay?: number;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const obj = { value: from };
    gsap.to(obj, {
      value: to,
      duration,
      delay,
      ease: "power2.out",
      onUpdate() {
        if (ref.current) {
          ref.current.textContent = Math.floor(obj.value) + suffix;
        }
      },
    });
  }, [from, to, duration, delay, suffix]);

  return <span ref={ref} className={className} style={style}>0{suffix}</span>;
}

/* ── Floating Animation ──────────────────────────────────── */
export function FloatingElement({ children, delay = 0, duration = 3, className, style }: Omit<FadeUpProps, "distance">) {
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Shimmer Effect ──────────────────────────────────────── */
export function ShimmerEffect({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ backgroundPosition: "200% center" }}
      animate={{ backgroundPosition: "-200% center" }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className={className}
      style={{
        backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(196,155,91,0.2) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}
