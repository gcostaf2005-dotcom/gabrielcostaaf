import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#08090a",
        foreground: "#e8e8e8",
        card: "#111213",
        border: "#1f2123",
        muted: "#737373",
        primary: "#5b8def",
        success: "#22c55e",
        danger: "#ef4444",
        warning: "#f59e0b",
        violet: "#8b5cf6",
      },
      fontFeatureSettings: {
        tabular: ["tnum", "lnum"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
