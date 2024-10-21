import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#343433",
        "50": "#effefb",
      },
      secondary: {
        DEFAULT: "#625BF6",
        "50": "#effefb",
      },
      subtext: "#99999C",
    },
    extend: {
      fontFamily: {
        OjahDisplay: ["OjahDisplay", "sans-serif"],
        OjahDisplayBold: ["OjahDisplayBold", "sans-serif"],
        OjahDisplaySemiBold: ["OjahDisplaySemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
});
