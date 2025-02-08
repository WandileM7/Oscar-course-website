/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f9faf5',
          100: '#f1f4e8',
          200: '#e0e7cc',
          300: '#c8d4a7',
          400: '#b0c182',
          500: '#98ad5d',
          600: '#808f4e',
          700: '#616c3b',
          800: '#414828',
          900: '#202414',
        },
      },
    },
  },
  plugins: [],
};