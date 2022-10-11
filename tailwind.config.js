/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,scss,vue}"],
  theme: {
    extend: {
      transitionProperty: {
        'w-h': 'width, height',
        text: 'font-size, line-height',
        opacity: 'opacity',
      },
      transitionDuration: {
        2000: '1500ms',
      },
      rotate: {
        360: '360deg',
      },
      spacing: {
        50: '12.5rem',
        62: '15.5rem',
        64: '16rem',
        120: '30rem',
      },
      fontSize: {
        0: '0rem',
      },
      keyframes: {
        wiggle: {
          '25%, 75%': { transform: 'rotate(-20deg)' },
          '50%': { transform: 'rotate(20deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s linear',
      },
      lineHeight: {
        0: '0rem',
      }
    },
  },
  plugins: [],
}