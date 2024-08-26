import { createTheme, PaletteMode, Theme } from "@mui/material";

export const themeOptions = (theme: string): Theme => {
  const validModes: PaletteMode[] = ["light", "dark"];
  const mode: PaletteMode = validModes.includes(theme as PaletteMode) ? (theme as PaletteMode) : "light";
  return createTheme({
    palette: {
      mode,
      ...(theme === "dark"
        ? {
            primary: {
              main: "#1976d2",
            },
            secondary: {
              main: "#ff4081",
            },
            text: {
              primary: "#fff",
              secondary: "rgba(255, 255, 255, 0.7)",
              disabled: "rgba(255, 255, 255, 0.5)",
            },
            background: {
              default: "#121212",
              paper: "#121212",
            },
          }
        : {
            primary: {
              main: "#6976d2",
            },
            secondary: {
              main: "#d81b60",
            },
            text: {
              primary: "rgba(0, 0, 0, 0.87)",
              secondary: "rgba(0, 0, 0, 0.6)",
              disabled: "rgba(0, 0, 0, 0.38)",
            },
            background: {
              default: "#F5F5F5",
              paper: "#fff",
            },
          }),
    },
  });
};
