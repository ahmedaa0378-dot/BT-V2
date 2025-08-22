import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("bt-theme") as Theme | null;
    if (saved) return saved;
    // use system preference on first load
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.backgroundColor = "#0f172a";
    } else {
      root.classList.remove("dark");
      root.style.backgroundColor = "#ffffff";
    }
    localStorage.setItem("bt-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
