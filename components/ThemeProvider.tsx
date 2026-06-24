"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemeId = "paper" | "cobalt" | "inverse";

type ThemeOrigin = {
  x: number;
  y: number;
};

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId, origin?: ThemeOrigin) => void;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    update: () => void | Promise<void>
  ) => { finished: Promise<void> };
};

const THEME_STORAGE_KEY = "glenn-wee-theme-v1";
const THEME_IDS: ThemeId[] = ["paper", "cobalt", "inverse"];

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeId(value: string | undefined): value is ThemeId {
  return Boolean(value && THEME_IDS.includes(value as ThemeId));
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<ThemeId>("paper");

  useEffect(() => {
    const initialTheme = document.documentElement.dataset.theme;

    if (isThemeId(initialTheme)) {
      setThemeState(initialTheme);
    }
  }, []);

  const setTheme = useCallback((nextTheme: ThemeId, origin?: ThemeOrigin) => {
    const root = document.documentElement;

    if (root.dataset.theme === nextTheme) {
      setThemeState(nextTheme);
      return;
    }

    const applyTheme = () => {
      root.dataset.theme = nextTheme;
      root.style.colorScheme = nextTheme === "inverse" ? "dark" : "light";
      setThemeState(nextTheme);

      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // The selected theme still applies when storage is unavailable.
      }
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const transitionDocument = document as ViewTransitionDocument;

    if (prefersReducedMotion) {
      applyTheme();
      return;
    }

    if (!transitionDocument.startViewTransition) {
      root.classList.add("theme-crossfade");
      void root.offsetWidth;
      applyTheme();
      window.setTimeout(() => root.classList.remove("theme-crossfade"), 900);
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 37;
    root.style.setProperty("--theme-origin-x", `${x}px`);
    root.style.setProperty("--theme-origin-y", `${y}px`);

    const transition = transitionDocument.startViewTransition(applyTheme);
    void transition.finished.finally(() => {
      root.style.removeProperty("--theme-origin-x");
      root.style.removeProperty("--theme-origin-y");
    });
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
