/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark": "hsl(0deg 0% 8%)",
        "gray-secondary":"hsl(0deg 0% 20%)",
        "netflixRed":"#e50914"
      },
      animation: {
        "slide-rtl": "slide-rtl .4s ease-in-out",
      },
      keyframes: {
        "slide-rtl": {
          from: { "margin-right": "-90%" },
          to: { "margin-right": "0%" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
