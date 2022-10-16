/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#35485d',
        primaryLight: '#adbed0',
        secondary: '#FF9000',
        light: '#ecf0f1',
      }
    },
  },
  plugins: [],
}
