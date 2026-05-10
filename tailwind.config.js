/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yt: {
          bg: '#0f0f0f',
          header: '#0f0f0f',
          sidebar: '#0f0f0f',
          text: '#f1f1f1',
          textSec: '#aaaaaa',
          hover: '#272727',
          border: '#3f3f3f',
        }
      }
    },
  },
  plugins: [],
}
