/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        canvas: '#080b10',
        surface: '#10151d',
        'surface-soft': '#171d27',
        primary: '#9ec5ff',
        secondary: '#c8b6ff',
        muted: '#aab2c1',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
      boxShadow: {
        glow: '0 18px 55px rgba(77, 142, 255, 0.14)',
      },
    },
  },
  plugins: [],
};
