/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,js}"],
  theme: {
    extend: {
      colors:{
        bg_color: "#141416",
        card_bg: "#23262f"
      }
    },
  },
  plugins: [],
}