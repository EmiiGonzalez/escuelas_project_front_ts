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
import { useValid } from "../../../../util/hooks/useValid";
import { AxiosError } from "axios";
import { Box } from "@mui/material";
import { postClase } from "../../util/postClase";

export const ModalAddClase = ({
  open,
  handleClose,
  url,
  idCurso,
  updateData,
}: PropsModalEditEscuela) => {

    
  const {
    string: claseDescripcion,
    setString: setClaseDescripcion,
    setError: setErrorClase,
    error: errorClase,
  } = useValid();

  const cursoRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: postClase,
    onSuccess: () => {
      handleOpenToast("success", "Clase agregado con éxito");
      updateData();
      handleClose();
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        handleOpenToast(
          "error",
          error.response?.data.message
            ? error.response?.data.message
            : "Error al agregar el curso"
        );
      }
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    event.stopPropagation();
    if (claseDescripcion === "") {
      setErrorClase({
        state: true,
        message: "Por favor, ingrese la descripción de la clase",
      });
      if (cursoRef.current) {
        cursoRef.current.focus();
      }
      return;
    }

    mutation.mutate({
      url,
      idCurso,
      descripcion: claseDescripcion,
    });
    setClaseDescripcion("");
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
            Agregar Clase
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
              inputRef={cursoRef}
              id="outlined-basic"
              label="Curso"
              variant={tema === "light" ? "filled" : "outlined"}
              sx={{ width: "100%", mb: 2 }}
              error={errorClase.state}
              helperText={errorClase.message}
              value={claseDescripcion}
              autoComplete="off"
              onChange={(event) => {
                setClaseDescripcion(event.target.value);
                setErrorClase({ state: false, message: "" });
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setErrorClase({
                    state: true,
                    message: "Por favor, ingrese la descripción de la clase",
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
  open: boolean;
  handleClose: () => void;
  idCurso: number;
  url: string;
  updateData: () => void;
}
