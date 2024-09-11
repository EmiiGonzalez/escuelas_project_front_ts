import {
  AlertColor,
  Backdrop,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FormEvent, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { EscuelasRequest } from "../../../util/interfaces/escuelas/EscuelasRequest";
import { useValid } from "../../../util/hooks/useValid";
import { postEscuela } from "../util/postEscuela";
import { AxiosError } from "axios";
import { Box } from '@mui/material';

export const ModalAddEscuela = (props: PropsModalAddEscuela) => {
  const { tema, open, handleClose, handleOpenToast, updateData, url } = props;
  const { string, setString, setError, error } = useValid();
  const textRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: postEscuela,
    onSuccess: (data) => {
      handleOpenToast("success", "Escuela agregada con éxito");
      updateData(data);
      handleClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        handleOpenToast("error", error.response?.data.message ? error.response?.data.message : "Error al agregar la escuela");
      }
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    event.stopPropagation();
    if (string === "") {
      setError({
        state: true,
        message: "Por favor, ingrese una escuela",
      });
      if (textRef.current) {
        textRef.current.focus();
      }
      return;
    }
    mutation.mutate({
      nombre: string,
      url: url,
    });
    setString("");
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
              aria-hidden={false}
              inputRef={textRef}
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
              disabled={mutation.isPending} // Deshabilitar botón mientras se envía la solicitud
            >
              {mutation.isPending ? "Enviando..." : "Enviar"}
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
