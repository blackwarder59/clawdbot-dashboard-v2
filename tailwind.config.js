/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0e1a',
          panel: '#1a2332',
          accent: '#2563eb',
          text: '#e2e8f0',
        },
        light: {
          bg: '#f8fafc',
          panel: '#ffffff',
          accent: '#1e40af',
          text: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}
