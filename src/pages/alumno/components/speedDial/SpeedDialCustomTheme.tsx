import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ContrastIcon from '@mui/icons-material/Contrast';
import {  Box } from "@mui/material";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import { useThemeStore } from "../../../../util/context/useThemeStore";

export const SpeedDialCustomTheme = () => {
  const {
    open: openSpeedDial,
    handleOpen: handleOpenSpeedDial,
    handleClose: handleCloseSpeedDial,
  } = useHandleBoolean();

  const { tema, setTema } = useThemeStore();

  return (
    <Box sx={{ height: 320, flexGrow: 1 , position: "fixed", bottom: 0, right: 0}}>
      <SpeedDial
        ariaLabel="speedDial"
        sx={{ position: "absolute", bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
        onClick={() => handleOpenSpeedDial()}
        open={openSpeedDial}
        onClose={handleCloseSpeedDial}
      >
          <SpeedDialAction
            icon={<ContrastIcon />}
            tooltipTitle={"Cambiar Tema"}
            tooltipOpen
            sx={{ color: "primary.main", textWrap: "nowrap",}}
            onClick={() => setTema(tema === "light" ? "dark" : "light")}
          />
      </SpeedDial>
    </Box>
  );
};