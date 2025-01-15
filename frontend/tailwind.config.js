/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      //colours project
      colors: {
        primary: "#2B85FF",
        secondary: "#EF863E"
      },
    },
  },
  plugins: [],
};
