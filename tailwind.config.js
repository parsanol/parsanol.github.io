/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#047036',
          600: '#046f36',
          700: '#035c2c',
          800: '#024a23',
          900: '#01391a',
        },
        accent: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#c89358',
          600: '#b8845e',
        },
        cream: {
          300: '#fef3c7',
          400: '#fde68a',
          500: '#efc38f',
          600: '#d4a574',
        },
        rust: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        ruby: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-logo': 'linear-gradient(135deg, #047036 0%, #0f61aa 50%, #046f36 100%)',
        'gradient-logo-dark': 'linear-gradient(135deg, #4ade80 0%, #60a5fa 50%, #22c55e 100%)',
      },
    },
  },
  plugins: [],
}
