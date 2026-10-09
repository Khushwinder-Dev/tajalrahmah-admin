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
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        primary: {
          50: "#f1f9fe",
          100: "#cfe2ff",
          200: "#bfe6f8",
          300: "#86d2f3",
          400: "#45bbeb",
          500: "#28ace2",
          600: "#1083b9",
          700: "#0e6996",
          800: "#10587c",
          900: "#134a67",
          950: "#0d2f44",
          initial: "#04161d", // Add this line instead of the separate definition
        },
      },
    },
  },
  plugins: [rtl()],
};

export default config;
