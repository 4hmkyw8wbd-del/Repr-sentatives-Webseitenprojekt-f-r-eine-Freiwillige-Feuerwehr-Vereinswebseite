/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tiefes Navy als ruhiger, vertrauenswuerdiger Hintergrund
        navy: {
          950: '#070f1a',
          900: '#0b1b2b',
          800: '#102536',
          700: '#16314a',
        },
        // Anthrazit fuer Karten und Sektionsflaechen
        anthracite: {
          900: '#11161d',
          800: '#1a212b',
          700: '#232c38',
          600: '#2f3a48',
        },
        // Feuerwehr-Rot, gezielt als Akzent (nicht flaechig)
        fire: {
          600: '#c8102e',
          500: '#e11d2e',
          400: '#f0394a',
        },
        // Blaulicht / technische Akzente
        signal: {
          400: '#38bdf8',
          300: '#7dd3fc',
        },
        // Sparsames Gold fuer Highlights / Warnsymbolik
        gold: {
          400: '#f5c451',
        },
        offwhite: '#f4f6f8',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
