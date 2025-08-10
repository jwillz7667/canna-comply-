import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effdf3',
          100: '#dbfbE4',
          200: '#b7f6c9',
          300: '#83eda5',
          400: '#47de7d',
          500: '#20c65f',
          600: '#13a54e',
          700: '#118243',
          800: '#12673a',
          900: '#0f5433'
        }
      },
      boxShadow: {
        soft: '0 2px 10px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        xl2: '1rem'
      }
    }
  },
  plugins: [],
} satisfies Config


