/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors : {
        customBlue : '#0047AB'
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        
       },
    },
  },
  plugins: [require("daisyui"),
  require('flowbite/plugin'),
require('preline/plugin')
],
}