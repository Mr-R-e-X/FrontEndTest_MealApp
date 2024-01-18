/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        fontFamily: {
            Inter: ["Inter", "sans-serif"],
            Prata: ["Prata", "serif"],
            Stylish: ["Stylish", "serif"],
            Ubuntu: ["Ubuntu", "sans-serif"]
           }
      },
    },
    plugins: [],
  }