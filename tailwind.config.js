/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        skyglass: {
          50: '#f1fbff',
          100: '#dff6ff',
          200: '#b9ecff',
          300: '#7bdbff',
          400: '#36c6f4',
          500: '#0eaee6',
          600: '#028cc4',
          700: '#04719f',
          800: '#0a5f83',
          900: '#0d506d',
        },
      },
      boxShadow: {
        glow: '0 24px 80px rgba(14, 174, 230, 0.2)',
        lift: '0 16px 40px rgba(2, 113, 159, 0.14)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
