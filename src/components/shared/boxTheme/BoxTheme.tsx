import { Fab, Fade, Zoom } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Box from "@mui/material/Box/Box";
import { useCallback } from "react";

/**
 * 
 */
export const BoxTheme = (props: BoxThemeProps) => {
  const { tema, setTema } = props;

  const handleClick = useCallback(() => {
    setTema(tema === "light" ? "dark" : "light");
  }, [setTema, tema]);

  return (
    <Box
      sx={{
        height: "10%",
        position: "absolute",
        top: "90%",
        right: "50%",
        zIndex: 1,
      }}
    >
      <Zoom in timeout={500}>
        <Fab
          onClick={handleClick}
          size="small"
          sx={{
            bgcolor: "primary.main",
            ":hover": { bgcolor: "primary.dark" },
          }}
        >
          <Fade in={tema === "dark"} timeout={500}>
            <WbSunnyIcon
              sx={{
                color: "yellow",
                display: tema === "dark" ? "block" : "none",
              }}
            />
          </Fade>
          <Fade in={tema === "light"} timeout={500}>
            <DarkModeIcon
              sx={{
                color: "dark",
                display: tema === "light" ? "block" : "none",
              }}
            />
          </Fade>
        </Fab>
      </Zoom>
    </Box>
  );
};

interface BoxThemeProps {
  tema: "light" | "dark";
  setTema: (tema: "light" | "dark") => void;
}