import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

export default withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        saira: ["var(--font-saira)"],
        bebas: ["var(--font-bebas)"],
      },
      colors: {
        dark: {
          "10": "#2e2f3f",
          "20": "#282936",
          "50": "#232430",
          "100": "#21222b",
          "200": "#1F2029",
          "250": "#20212b",
          "300": "#1c1d27",
        },
        light: {
          "100": "#F3F6FE",
          "200": "#ebeefa",
          // '200':'#F2F3F5'
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}) satisfies Config;
