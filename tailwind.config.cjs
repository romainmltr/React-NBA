/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#161616',
        darkgray: '#1E1E1E',
        darkgrayHover: '#383838',
        lightgray: '#303030',
        purple: '#776DD4',
      },
      backgroundImage : {
        'banner': "url('./src/assets/banner-nba.jpg')",
      },
    },
  },
  plugins: [],
}
