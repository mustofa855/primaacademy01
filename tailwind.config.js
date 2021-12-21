const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./formulate.config.js'],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        light: '#F7F8FB',
        primary: '#1476EB',
        'primary-shade': '#105CB7',
        secondary: '#ABCCEA',
        danger: '#F12D2D',
        success: '#00AD7C',
        dark: '#222831',
        orange: '#EE712B',
        primaryDark: '#222831',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  mode: 'jit',
  apply: {
    kbtn: {
      color: '',
      '@apply':
        'py-2 px-4 font-semibold !text-light-500 rounded-lg my-4 mx-1 shadow-lg transition duration-300 ease-out',
      '&:hover': {
        '@apply': 'bg-green-700',
      },
    },
  },
}
