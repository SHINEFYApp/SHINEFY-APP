/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mainColor: '#DD9923',
      },
      fontSize: {
        'xs': '0.75',
        'sm': '0.875',
        'base': '1',
        'lg': '1.125',
        'xl': '1.25',
        '2xl': '1.5',
        '3xl': '1.875',
        '4xl': '2.25',
        '5xl': '3',
        '6xl': '4',
      },
    },
  },
  variants: {
    fontSize: ['responsive'],
  },
  plugins: [],
};
