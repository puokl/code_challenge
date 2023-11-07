/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        "permanent-marker": ['"Permanent Marker"', "cursive"],
        changa: ["Changa", "sans-serif"],
        kalam: ["Kalam", "cursive"],
        short: ["Short Stack", "cursive"],
      },
    },
  },
  plugins: [],
};
