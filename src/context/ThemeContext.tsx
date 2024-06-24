"use client";
import { LocalStorageVariables } from "@/utils/constants";
import { createContext, useContext, useEffect, useState } from "react";

type ModeType = "light" | "dark";

interface Props {
  children: JSX.Element;
}

export const ThemeContext = createContext<{ theme: ModeType; toggleTheme: () => void }>({ theme: "light", toggleTheme: () => {} });

const getThemeModeFromLocalStorage = (): ModeType => {
  if (typeof window !== "undefined") {
    const mode = localStorage.getItem(LocalStorageVariables.ThemeMode);
    return (mode ?? "light") as ModeType;
  }
  return "light";
};
export const ThemeContextProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<"light" | "dark">(() => getThemeModeFromLocalStorage());

  useEffect(() => {
    if (
      localStorage.getItem(LocalStorageVariables.ThemeMode) === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(LocalStorageVariables.ThemeMode, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(LocalStorageVariables.ThemeMode, "light");
    }
  }, []);

  const toggleTheme = () => {
    setMode(prev => {
      const mode = prev === "dark" ? "light" : "dark";
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem(LocalStorageVariables.ThemeMode, "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem(LocalStorageVariables.ThemeMode, "light");
      }
      return mode;
    });
  };
  return <ThemeContext.Provider value={{ theme: mode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);
