/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
    './componentes/**/.{html,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        khand: ["Khand", "sans-serif"],
        teko: ["Teko", "sans-serif"],
      },
    },
  },
  plugins: [],
}

