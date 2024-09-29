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
  import { FormEvent, useEffect, useRef } from "react";
  import { useMutation } from "@tanstack/react-query";
  import { useValid } from "../../../../util/hooks/useValid";
  import { AxiosError } from "axios";
  import { Box } from '@mui/material';
import { putEscuela } from "../../util/putEscuela";
import { EscuelasRequest } from "../../../../util/interfaces/escuelas/EscuelasRequest";
import { styleModal } from "../../../../util/shared/styles/modal/modalStyle";
  
  export const ModalEditEscuela = ({ tema, open, handleClose, handleOpenToast, url, escuela, updateData } : PropsModalEditEscuela) => {
    const { string, setString, setError, error } = useValid();
    const textRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setString(escuela.nombre);
      setError({ state: false, message: "" });
    }, [ escuela.nombre, setString, setError ]);
  
    const mutation = useMutation({
      mutationFn: putEscuela,
      onSuccess: () => {
        handleOpenToast("success", "Escuela actualizada con éxito");
        updateData();
        handleClose();
      },
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          handleOpenToast("error", error.response?.data.message ? error.response?.data.message : "Error al actualizar la escuela");
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
        url,
        id: escuela.id,
      });
      setString("");
    }
  
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
          <Box sx={styleModal} component={"form"} onSubmit={handleSubmit}>
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
              Actualizar Escuela
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
                value={string}
                autoComplete="off"
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
  
  interface PropsModalEditEscuela {
    tema: "light" | "dark";
    open: boolean;
    handleClose: () => void;
    handleOpenToast: (variante: AlertColor, msg: string) => void;
    escuela: EscuelasRequest;
    url: string;
    updateData : () => void;
  }
  