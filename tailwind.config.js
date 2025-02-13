/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'pulse-brackets': {
          'from': {
            transform: 'scale(1)',
            opacity: '0.8',
          },
          'to': {
            transform: 'scale(0.8)',
            opacity: '0.5',
          },
        },
      },
      animation: {
        'pulse-brackets': 'pulse-brackets 0.4s alternate infinite ease-in-out',
        'pulse-brackets-delayed': 'pulse-brackets 0.4s alternate infinite ease-in-out 0.4s',
      },
    },
  },
  plugins: [],
};
