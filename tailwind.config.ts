import type { Config } from 'tailwindcss';

// CO3 Premium Liquid Shop — Design tokens.
// The entire visual language flows from these tokens so every component stays
// on-brand: deep teal foundation, cream canvas, gold for moments of luxury.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#005F68',
          dark: '#014851',
          deep: '#013A41',
        },
        cream: {
          DEFAULT: '#F4F0E6',
          warm: '#FFFDF8',
        },
        gold: {
          DEFAULT: '#D4A537',
          soft: '#E4C272',
          deep: '#B8862A',
        },
        ink: '#111111',
      },
      fontFamily: {
        // Wired up via next/font CSS variables in app/layout.tsx
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        script: ['var(--font-allura)', 'cursive'],
      },
      fontSize: {
        'fluid-hero': 'clamp(2.75rem, 7vw, 6.5rem)',
        'fluid-h2': 'clamp(2rem, 4.5vw, 3.75rem)',
        'fluid-h3': 'clamp(1.5rem, 3vw, 2.25rem)',
      },
      letterSpacing: {
        luxe: '0.35em',
        wide2: '0.18em',
      },
      maxWidth: {
        container: '1280px',
        prose2: '68ch',
      },
      boxShadow: {
        glass: '0 20px 60px -20px rgba(1, 72, 81, 0.35)',
        gold: '0 12px 40px -12px rgba(212, 165, 55, 0.45)',
        lift: '0 30px 80px -30px rgba(1, 58, 65, 0.5)',
      },
      backgroundImage: {
        'gold-shimmer':
          'linear-gradient(110deg, transparent 25%, rgba(228,194,114,0.55) 48%, rgba(255,253,248,0.9) 50%, rgba(228,194,114,0.55) 52%, transparent 75%)',
        'teal-radial':
          'radial-gradient(circle at 50% 0%, #016873 0%, #014851 45%, #013A41 100%)',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-120vh) scale(1.25)', opacity: '0' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '15%': { opacity: '0.35' },
          '100%': { transform: 'translateY(-160px) scaleX(2.2)', opacity: '0' },
        },
        slowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        'shimmer-slow': 'shimmer 6s linear infinite',
        steam: 'steam 5s ease-out infinite',
        'slow-spin': 'slowSpin 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
