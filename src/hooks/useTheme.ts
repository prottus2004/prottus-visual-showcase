import { useCallback, useEffect, useState } from "react";

/**
 * Light/dark theme toggle.
 *
 * Default is LIGHT. The site renders light with no `dark` class on
 * <html>, so first-time visitors see no flash. Returning visitors who
 * previously chose dark get the class applied synchronously at module load
 * (below), before React mounts — also flash-free. The choice is persisted to
 * localStorage and re-applied on change.
 */
export type Theme = "light" | "dark";

const STORAGE_KEY = "prottus-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

// Restore the stored theme before first paint to avoid a flash for returning
// dark-mode visitors. Runs once when this module is first imported.
if (typeof window !== "undefined") {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") applyTheme("dark");
  } catch {
    /* localStorage unavailable — fall back to the default light theme. */
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    try {
      return (window.localStorage.getItem(STORAGE_KEY) as Theme) === "dark"
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore persistence failures */
    }
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return { theme, isDark: theme === "dark", toggle };
}