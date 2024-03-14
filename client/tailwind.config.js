/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fff8da',
        },
        secondary: {
          light: '#d9e7cb',
        },
        accent: {
          orange: '#ff9800',
        },
        button: {
          primary: '#386a1fc2',
          text_primary: '#ffffff',
          text_hover: '#000',
          hover: '#d9e7cb',
        },
      },
    },
  },
  plugins: [],
}
