// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,jsx,ts,tsx,mdx}',
    './src/components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        bg: 'var(--bg)',
        navbar: 'var(--navbar)',
      },
      boxShadow: {
        glow: '0 0 24px #A259FF55, 0 0 48px #00FFFF33',
      },
      borderRadius: { '2xl': '1rem' },
    },
  },
  plugins: [],
};
