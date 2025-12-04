/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        profeco: {
          500: '#6d1d2e', // Un color similar al guinda oficial
          600: '#581624',
        }
      }
    },
  },
  plugins: [],
}

