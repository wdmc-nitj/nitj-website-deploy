/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "public\\diia\\Rankings\\index.html",
    "public\\diia\\MOUs\\index.html"
  ],
  theme: {
    extend: {
      colors:{
      darkPurple: 'hsla(242, 83%, 7%, 1)',
      accent: 'hsla(201, 96%, 32%)',
      lightPurple: 'hsla(242, 83%, 98%)',
      accentOrange: 'hsla(12, 87%, 56%, 1)'
      },
      transitionDuration: {
        '0':'0ms',
        '400': '200ms', 
      },
      transitionTimingFunction: {
        'in-out-expo': 'linear', 
      },
      transitionProperty: {
        'all': 'all', 
      },
      gridTemplateColumns: {
        'custom-grid': '1.6fr 1fr',
        'custom-grid-2':'1fr 1.6fr'
      },boxShadow:{
        'custom-shadow':'inset 0px 0px 20px rgba(255, 255, 255, 0.2686)'
      },
      screens: {
        'xsm': '320px', 
      }
    },
  },
  plugins: [],
}

