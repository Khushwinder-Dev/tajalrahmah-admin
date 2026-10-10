import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      if (localStorage.theme) return localStorage.theme;
      if (document.documentElement.classList.contains("dark")) return "dark";
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-mantine-color-scheme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-mantine-color-scheme", "light");
    }
    localStorage.theme = theme;
  }, [theme]);

  // Sync across components and tabs
  useEffect(() => {
    const handleStorage = () => {
      if (localStorage.theme && localStorage.theme !== theme) {
        setTheme(localStorage.theme);
      }
    };
    const handleCustom = () => {
      const current =
        localStorage.theme ||
        (document.documentElement.classList.contains("dark") ? "dark" : "light");
      setTheme(current);
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("theme-change", handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("theme-change", handleCustom);
    };
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.theme = nextTheme;
    const root = window.document.documentElement;
    if (nextTheme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-mantine-color-scheme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-mantine-color-scheme", "light");
    }
    window.dispatchEvent(new Event("theme-change"));
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };
};
