import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--panel-rgb) / <alpha-value>)",
        paper: "rgb(var(--surface-rgb) / <alpha-value>)",
        primary: "rgb(var(--text-rgb) / <alpha-value>)",
        line: "rgb(var(--border-rgb) / 0.72)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "on-ink": "rgb(var(--panel-text-rgb) / <alpha-value>)",
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
