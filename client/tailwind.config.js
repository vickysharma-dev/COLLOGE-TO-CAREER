/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bbd9fe',
          300: '#8cc2fd',
          400: '#56a0fb',
          500: '#2b7df6',
          600: '#1d5feb',
          700: '#1749d7',
          800: '#193cb0',
          900: '#19368b',
          950: '#132255',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#090d16'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
