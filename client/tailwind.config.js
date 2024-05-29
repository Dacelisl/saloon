export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fffcf1',
        },
        secondary: {
          light: '#d9e7cb',
          dark: '#050620f2',
        },
        accent: {
          orange: '#ff9800',
        },

        button: {
          primary: '#386a1fc2',
          alert: '#e2354ac2',
          text_primary: '#ffffff',
          text_hover: '#000',
          hover: '#d9e7cb',
          hover_alert: '#e45b6cc2',
        },
      },
      boxShadow: {
        custom: '0 2px 0 #ff0ab2',
      },
    },
    screens: {
      sm: '320px',
      md: '375px',
      lg: '425px',
      xl: '768px',
      xxl: '1024px',
      xxxl: '1440px',
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
