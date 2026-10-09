import type { Config } from "tailwindcss";
import rtl from "tailwindcss-rtl";
// import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Mona Sans",
          "Roboto",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "Mona Sans",
          "ui-monospace",
          "SFMono-Regular",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        brand: {
          50: "#f0faf9",
          100: "#c5f1ee",
          200: "#92e4de",
          300: "#55d1c9",
          400: "#23bdb4",
          500: "#01a9a0",
          600: "#008f87",
          700: "#01726d",
          800: "#055b57",
          900: "#074b48",
          950: "#012b2a",
        },
        primary: {
          DEFAULT: "#01a9a0",
          50: "#f0faf9",
          100: "#c5f1ee",
          200: "#92e4de",
          300: "#55d1c9",
          400: "#23bdb4",
          500: "#01a9a0",
          600: "#008f87",
          700: "#01726d",
          800: "#055b57",
          900: "#074b48",
          950: "#012b2a",
          initial: "#012b2a",
        },
      },
    },
  },
  plugins: [rtl()],
};

export default config;
