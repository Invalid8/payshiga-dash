/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        OjahDisplay: ["OjahDisplay", "sans-serif"],
        OjahDisplayBold: ["OjahDisplayBold", "sans-serif"],
        OjahDisplaySemiBold: ["OjahDisplaySemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
