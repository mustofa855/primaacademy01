const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./formulate.config.js', './src/**/*.{html,js}'],
  experimental: {
    applyComplexClasses: true,
  },
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        light: '#F7F8FB',
        primary: '#1476EB',
        'primary-shade': '#105CB7',
        secondary: '#ABCCEA',
        danger: '#F12D2D',
        'danger-shade': '#D80E0E',
        success: '#3EC8AC',
        'success-shade': '#2EA089',
        dark: '#222831',
        warning: '#FFA900',
        'warning-shade': '#C78400',
        orange: '#EE712B',
        primaryDark: '#222831',
        latar: '#F3F3F7',
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
