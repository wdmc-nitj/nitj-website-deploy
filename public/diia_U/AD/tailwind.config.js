/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./photogallery.html",
    // Add more paths if necessary
  ],
  theme: {
    extend: {
      colors: {
        nitjblue: '#0369A0',
        razorblue: '#0000EE',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        barlow: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
