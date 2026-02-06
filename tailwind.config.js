
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        dark: '#111111',
        light: '#F5F5F5',
        orange: {
          DEFAULT: '#E8590C',
          hover: '#C44908',
          light: '#FFF0E6',
        },
        gray: {
          DEFAULT: '#666666',
          light: '#E5E5E5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
}
