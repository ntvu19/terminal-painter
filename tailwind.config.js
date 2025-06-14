/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#1a1a1a',
        'terminal-green': '#00ff00',
        'terminal-red': '#ff0000',
      }
    },
  },
  plugins: [],
} 