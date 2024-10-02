/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        'medium': 500,
        'semi-bold': 600,
        'bold': 700,
      },
      colors: {
        brandPrimary: '#FFAF1E',
        brandSecondary: '#7C93B0',

        accentColor: '#E13A33',
        textBlack: 'rgba(0, 0, 0, 0.80)',

        lightGray: '#F9FAFB',
        backgroundColor: '#FCFCFC',
        borderColor: '#F2F4F7',

        carouselTextColor: '#667085',
        formBackground: '#F9F9F9',

        accordionColor: '#9CAFC8',
        accordionTitle: '#626262',
        accordionContent: '#ADADAD',

        dropdown: '#F4F4F4',
        dropdownHover: '#E6E6E6'
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease-in-out forwards',
      },
      boxShadow: {
        'bottom': '0px 2px 6px 0px rgba(122, 122, 122, 0.08)',
        'carousel': '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
      },
      padding: {
        '21': '5.25rem',
      },
      lineHeight: {
        '122': '1.22',
        '129': '1.29',
      },
      backgroundImage: {
        'reward-gradient': 'linear-gradient(40deg, #FFC839 20.05%, #FFDA96 63.2%, #FA1 108.43%)',
      },
      backdropBlur: {
        'custom-blur': '10px',
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(216deg, rgba(255, 175, 30, 0.00) -22.41%, #FFAF1E 88.65%);',
        'green-gradient' : 'linear-gradient(205deg, rgba(131, 229, 67, 0.60) -0.35%, #56A621 97.63%);',
        'blue-gradient' : 'linear-gradient(214deg, rgba(91, 144, 248, 0.60) -8.94%, #125DC1 100%);',
        'red-gradient' : 'linear-gradient(214deg, rgba(225, 58, 51, 0.60) -14%, #E13A33 107.79%);'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.centered': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.centered-between': {
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center',
        },
        '.viewport': {
          width: '100vw',
          height: '100vh'
        },
        '.cover': {
          width: '100%',
          height: '100%'
        },
      });
    },
  ],
};