/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '375px', // Extra small devices (small phones)
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['Space Mono', 'monospace'],
        'mono': ['Space Mono', 'monospace'], // Keep for backward compatibility
        'terminal': ['Space Mono', 'monospace'], // Keep for backward compatibility
        'pixel': ['Press Start 2P', 'VT323', 'Courier New', 'monospace'], // Keep for special cases
        generalsans: ['GeneralSans-Variable', 'sans-serif'], // Keep for backward compatibility
      },
      colors: {
        black: {
          DEFAULT: '#000',
          100: '#010103',
          200: '#0E0E10',
          300: '#1C1C21',
          500: '#3A3A49',
          600: '#1A1A1A',
        },
        white: {
          DEFAULT: '#FFFFFF',
          800: '#E4E4E6',
          700: '#D6D9E9',
          600: '#AFB0B6',
          500: '#62646C',
        },
      },
      backgroundImage: {
        terminal: "url('/assets/terminal.png')",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in forwards',
      }
    },
  },
  plugins: [],
};