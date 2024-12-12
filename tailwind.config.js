/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors: {
        negro: '#000000',
        blanco: '#FFFFFF',
        naranja: '#BC6C25',
        verde: '#606C38',
        beige: '#FFFEF0',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}

