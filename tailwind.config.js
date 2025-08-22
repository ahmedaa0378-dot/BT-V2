// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class", // <- enable dark mode via class
  theme: {
    extend: {
      colors: {
        // Modern fintech palette
        base: {
          // deep slate requested
          900: "#0f172a", // primary dark bg
          800: "#111827",
          700: "#1f2937",
          600: "#334155",
        },
        brand: {
          // bold gradient anchors (indigo -> violet)
          indigo: "#6366f1",
          violet: "#a855f7",
          // solid primary if you need one color
          500: "#7c3aed"
        },
        accent: {
          // cyan pops well on #0f172a
          500: "#06b6d4",
          600: "#0891b2"
        }
      },
      boxShadow: {
        soft: "0 8px 28px -12px rgb(0 0 0 / 0.25)"
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(99,102,241,0.45)" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 12px rgba(99,102,241,0)" },
          "100%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(99,102,241,0)" }
        }
      },
      animation: {
        pulseRing: "pulseRing 1.6s infinite"
      },
      backgroundImage: {
        "brand-grad":
          "linear-gradient(135deg, #6366f1 0%, #7c3aed 40%, #a855f7 100%)"
      }
    },
  },
  plugins: [],
} satisfies Config;
