import {
  AlertColor,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FormEvent } from "react";
import { EscuelasRequest } from "../../../util/interfaces/escuelas/EscuelasRequest";
import { useValid } from "../../../util/hooks/useValid";
import { usePostEscuela } from "../../../util/hooks/crud/usePostEscuela";

export const ModalAddEscuela = (props: PropsModalAddEscuela) => {
  const { tema, open, handleClose, handleOpenToast, updateData, url } = props;
  const { string, setString, setError, error } = useValid();
  const { postEscuela, isLoading } = usePostEscuela(
    handleOpenToast,
    updateData
  );
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log("submit");
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "400px",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              color: "text.primary",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Agregar escuela
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Escuela"
              variant={tema === "light" ? "filled" : "outlined"}
              sx={{ width: "100%", mb: 2 }}
              error={error.state}
              helperText={error.message}
              autoComplete="off"
              value={string}
              onChange={(event) => {
                setString(event.target.value);
                setError({ state: false, message: "" });
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setError({
                    state: true,
                    message: "Por favor, ingrese una escuela",
                  });
                }
              }}
            />
            <Button
              sx={{ ml: 2 }}
              variant={tema === "light" ? "contained" : "outlined"}
              type="submit"
              color="success"
              endIcon={<SendIcon />}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

interface PropsModalAddEscuela {
  tema: "light" | "dark";
  open: boolean;
  handleClose: () => void;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  updateData: (d: EscuelasRequest) => void;
  url: string;
}
