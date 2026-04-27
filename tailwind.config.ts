import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        foreground: '#f5f5f5',
        gold: '#c49b5b',
        'gold-light': 'rgba(196, 155, 91, 0.3)',
        'gold-border': 'rgba(196, 155, 91, 0.3)',
        'text-muted': '#a0a0a0',
        'dark-card': '#0f0f0f',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(196, 155, 91, 0.15)',
        'glow-gold-lg': '0 0 40px rgba(196, 155, 91, 0.2)',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}

export default config
