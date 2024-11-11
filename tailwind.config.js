/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'], 
      },
      screens: {
        'xs': '320px', 
        'sm': '375px',
        'sml': '425px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
              
        
      },
    },
  },
  plugins: [],
}
