// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html', 
    // Add other file paths if needed 
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#007BFF', 
        'background': '#E6F3FB', 
      },
      fontFamily: {
        'primary': ['sans-serif'], 
      },
      
      // 🎨 Animation Setup for Infinite Scroll
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          // The calculation: 16 cards * (256px width + 16px gap) = 4352px
          '100%': { transform: 'translateX(-4352px)' }, 
        },
      },
      animation: {
        // 'scroll-left' name, 60s duration for a slow scroll, linear, infinite loop
        'scroll-left': 'scroll-left 60s linear infinite', 
      },
      // ------------------------------------------
    },
  },
  plugins: [],
}