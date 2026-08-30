import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#FDFBF7',
          dark: '#1C1917',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#292524',
        },
        accent: {
          DEFAULT: '#EA580C',
          amber: '#D97706',
          dark: '#FB923C',
        },
        ink: {
          DEFAULT: '#1C1917',
          dark: '#FDFBF7',
        },
        muted: {
          DEFAULT: '#78716C',
          dark: '#A8A29E',
        },
        border: {
          DEFAULT: '#EEE8DD',
          dark: '#3F3A36',
        },
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'Tajawal', 'Readex Pro', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px -2px rgba(28, 25, 23, 0.08), 0 1px 3px -1px rgba(28, 25, 23, 0.06)',
        soft: '0 4px 20px -4px rgba(28, 25, 23, 0.10)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'toast-in': {
          '0%': { transform: 'translateY(-12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.28s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'toast-in': 'toast-in 0.25s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
