/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stellar: {
          blue: '#08B5E5',
          dark: '#0C1117',
          gray: '#1C2127',
          light: '#F1F5F9',
        },
      },
    },
  },
  plugins: [],
}
