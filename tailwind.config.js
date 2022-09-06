/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        hina: ["Hina Mincho"],
        noto: ["Noto Serif JP"],
      },
    },
    screens: {
      sm: "768px",
      // => @media (min-width: 576px) { ... }

      md: "992px",
      // => @media (min-width: 960px) { ... }

      lg: "1200px",
      // => @media (min-width: 1440px) { ... }
    },
    fontFamily: {
      body: ["Rampart One"],
      sans: ["Rampart One"],
      // sans: ["Helvetica", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
