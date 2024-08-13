import { Alert, Snackbar } from "@mui/material";
import { AlertCustomProps } from "./AlertCustomProps";

export const AlertCustom = (props: AlertCustomProps) => {
  const { openToast, setOpenToast, variante, msg, tema } = props;

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  const widthWindow: number = window.innerWidth;
  const positionY: "top" | "bottom" = widthWindow > 500 ? "bottom" : "top";
  const positionX: "right" | "center" =
    positionY === "bottom" ? "right" : "center";
  const widthAlert: string = widthWindow > 500 ? `40vw` : "100%";

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
