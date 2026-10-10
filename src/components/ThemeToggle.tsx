import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import clsx from "clsx";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={clsx(
        "p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer flex items-center justify-center",
        className
      )}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 stroke-[1.8] transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 stroke-[1.8] transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;
