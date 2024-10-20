/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#343a40',
        success: '#28a745',
      },
      keyframes: {
        '0%': { opacity: '0' },
        '100%': {opacity: '1' },
      }
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out forwards',
    },
  },
  plugins: [],
};
