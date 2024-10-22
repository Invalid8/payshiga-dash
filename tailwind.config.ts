import withMT from "@material-tailwind/react/utils/withMT";
import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(input|select).{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        subtext: "hsl(var(--subtext))", // Add subtext here if needed
      },
      fontFamily: {
        OjahDisplay: ["OjahDisplay", "sans-serif"],
        OjahDisplayBold: ["OjahDisplayBold", "sans-serif"],
        OjahDisplaySemiBold: ["OjahDisplaySemiBold", "sans-serif"],
      },
    },
  },
  plugins: [nextui()],
});
