/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",   // primary
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e"
        },
        accent: {
          500: "#f97316"   // orange accents
        }
      },
      boxShadow: {
        soft: "0 6px 24px -12px rgb(0 0 0 / 0.15)"
      },
      borderRadius: {
        xl2: "1rem",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 rgba(14,165,233,0.6)" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 10px rgba(14,165,233,0)" },
          "100%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 rgba(14,165,233,0)" }
        }
      },
      animation: {
        pulseRing: "pulseRing 1.5s infinite"
      }
    },
  },
  plugins: [],
} satisfies Config;
