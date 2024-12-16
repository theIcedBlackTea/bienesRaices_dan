/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors: {
        background: '#ffffff', // Fondo principal
        formBackground: '#606C38', // Fondo formularios 
        primaryText: '#000000', // Texto principal
        bgg: '#e6dfd6',
        secondaryText: '#636363', // Textos secundarios
        action: '#BC6C25', // Botones de acción
        action2: '#f3a38a',
        hoverAction: '#FFFEF0', // Hover en botones
        success: '#4CAF50', // Mensajes de éxito
        error: '#FF5252', // Mensajes de error
      },
    },
  },
  plugins: [],
}
