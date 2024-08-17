import {create} from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark";

interface ThemeState {
  tema: ThemeMode;
  setTema: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      tema: "dark", // Valor inicial
      setTema: (mode: ThemeMode) => set({ tema: mode }),
    }),
    {
      name: "theme-storage", // nombre de la clave en localStorage
    }
  )
);
