/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],

  theme: {
    fontFamily: {
      'violet-sans': ['Violet Sans', 'sans-serif']
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    },
    extend: {
      screens: {
        xs: '350px'
      },
      colors: {
        'black-main': '#151516',
        'black-darker': '#111212',
        'black-lighter': '#232326',
        'gray-main': '#a2acaf',
        'white-main': '#e5eef2',
        'light-blue-main': '#2d94c0',
        'light-blue-darker': '#166688',
        'light-blue-lighter': '#92c3d8',
        'blue-main': '#183157',
        'light-green-main': '#2ad24f',
        'tomato-main': '#d2482a',
        'red-main': 'c02d2d'
      }
    }
  },
  plugins: []
}
