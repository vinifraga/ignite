/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      maxWidth: {
        app: '700px'
      },
      colors: {
        diego: '#8257e6'
      }
    },
  },
  plugins: [],
}
