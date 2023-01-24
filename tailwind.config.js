/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          "00": "#f7f7f7",
          50: "#ece8e6",
          100: "#e0dcd5",
          150: "#d4d4c4",
          200: "#c2c9b4",
          300: "#a3b29a",
          400: "#839c82",
          500: "#6c8674",
          600: "#60725d",
          700: "#585f4e",
          800: "#4b4a3f",
          900: "#37332f",
          1000: "#241f1f",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
