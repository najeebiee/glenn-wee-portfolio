import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#ffffff",
        line: "#1f1f1f",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "Arial", "sans-serif"],
        sans: ["Satoshi", "Arial", "sans-serif"],
        satoshi: ["Satoshi", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
