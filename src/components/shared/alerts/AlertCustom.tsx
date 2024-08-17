import { Alert, Snackbar } from "@mui/material";
import { AlertCustomProps } from "./AlertCustomProps";
import { useEffect, useState } from "react";
import { useThemeStore } from "../../../util/context/useThemeStore";

export const AlertCustom = (props: AlertCustomProps) => {
  const { openToast, setOpenToast, variante, msg } = props;
  const { tema } = useThemeStore();
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  const [positionY, setPositionY] = useState<"top" | "bottom">(
    widthWindow > 500 ? "bottom" : "top"
  );
  const [positionX, setPositionX] = useState<"right" | "center">("right");
  const [widthAlert, setWidthAlert] = useState<string>("40vw");

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidthWindow(window.innerWidth);
      setPositionY(widthWindow > 670 ? "bottom" : "top");
      setPositionX(widthWindow > 500 ? "right" : "center");
      setWidthAlert(widthWindow > 500 ? "40vw" : "80vw");
    })
  });

  return (
    <Snackbar
      open={openToast}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: positionY, horizontal: positionX }}
    >
      <Alert
        severity={variante}
        onClose={handleClose}
        variant={tema === "light" ? "filled" : "outlined"}
        sx={{ width: widthAlert, fontWeight: "bold", minWidth: "300px" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};
