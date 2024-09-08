/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      colors: {


        "graydark": "#0f0f10",
        "graymiddle": "#1f2937",
        "gray": "#374151",
        "graywhite": "#e6e6e6",
        "textcolor": "#e5d2d2"
  
  
      },
    },
  },
  plugins: [],
}

