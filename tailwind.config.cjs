/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'bannerNba': "url('src/assets/banner-nba.jpg')",

      }
    },
  },
  plugins: [],
}