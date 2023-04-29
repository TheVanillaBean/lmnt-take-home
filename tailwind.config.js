/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nanum-gothic)'],
        mono: ['var(--font-open-sans)'],
      },
      fontSize: {
        '3xl': ['1.875rem', { lineHeight: '2.5rem' }],
      },
      colors: {
        lime: '#afc13d',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
