import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { AlertCustomProps } from "./AlertCustomProps";

const Transition = (props: SlideProps) => {
  return <Slide {...props} direction="down" />;
};
export const AlertCustom = (props: AlertCustomProps) => {
  const { openToast, setOpenToast, variante, msg } = props;
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  return (
    <Snackbar
      open={openToast}
      autoHideDuration={3000}
      key={Transition.name}
      onClose={handleClose}
      TransitionComponent={Transition}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={variante}
        onClose={handleClose}
        variant={"filled"}
        sx={{ width: "100%", fontWeight: "bold", minWidth: "300px", maxWidth: "400px" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};
