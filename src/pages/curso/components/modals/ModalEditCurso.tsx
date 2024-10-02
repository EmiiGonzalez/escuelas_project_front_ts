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
import { Box } from "@mui/material";
import { styleModal } from "../../../../util/shared/styles/modal/modalStyle";
import { CursosRequest } from "../../../../util/interfaces/cursos/CursoInterface";
import { putCurso } from "../../util/putCurso";
export const ModalEditCurso = ({
  tema,
  open,
  handleClose,
  handleOpenToast,
  url,
  curso,
  updateData
}: PropsModalEditEscuela) => {
  const {
    string: nombreCurso,
    setString: setNombreCurso,
    setError: setErrorCurso,
    error: errorCurso,
  } = useValid();
  const {
    string: nombreMateria,
    setString: setNombreMateria,
    setError: setErrorMateria,
    error: errorMateria,
  } = useValid();
  const nombreTextRef = useRef<HTMLInputElement>(null);
  const materiaTextRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNombreCurso(curso.nombre);
    setErrorCurso({ state: false, message: "" });
    setNombreMateria(curso.materia);
    setErrorMateria({ state: false, message: "" });
  }, [
    curso.nombre,
    curso.materia,
    setNombreCurso,
    setErrorCurso,
    setNombreMateria,
    setErrorMateria,
  ]);

  const mutation = useMutation({
    mutationFn: putCurso,
    onSuccess: () => {
      handleOpenToast("success", "Curso actualizada con éxito");
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
            : "Error al actualizar la escuela"
        );
      }
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    event.stopPropagation();
    if (nombreCurso === "") {
      setErrorCurso({
        state: true,
        message: "Por favor, ingrese un nombre de curso",
      });
      if (nombreTextRef.current) {
        nombreTextRef.current.focus();
      }
      return;
    }
    if (nombreMateria === "") {
      setErrorMateria({
        state: true,
        message: "Por favor, ingrese una materia",
      });
      if (materiaTextRef.current) {
        materiaTextRef.current.focus();
      }
      return;
    }

    mutation.mutate({
      nombre: nombreCurso,
      url,
      id: curso.id,
      materia: nombreMateria,
    });
    setNombreCurso("");
    setNombreMateria("");

    updateData();
    handleClose();
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
            Actualizar curso
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
              inputRef={nombreTextRef}
              id="outlined-basic"
              label="Nombre del curso"
              variant={tema === "light" ? "filled" : "outlined"}
              sx={{ width: "100%", mb: 2 }}
              error={errorCurso.state}
              helperText={errorCurso.message}
              value={nombreCurso}
              autoComplete="off"
              onChange={(event) => {
                setNombreCurso(event.target.value);
                setErrorCurso({ state: false, message: "" });
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setErrorCurso({
                    state: true,
                    message: "Por favor, ingrese el nombre del curso",
                  });
                }
              }}
            />
            <TextField
              aria-hidden={false}
              inputRef={materiaTextRef}
              id="outlined-basic"
              label="Nombre de la materia"
              variant={tema === "light" ? "filled" : "outlined"}
              sx={{ width: "100%", mb: 2 }}
              error={errorMateria.state}
              helperText={errorMateria.message}
              value={nombreMateria}
              autoComplete="off"
              onChange={(event) => {
                setNombreMateria(event.target.value);
                setErrorMateria({ state: false, message: "" });
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setErrorMateria({
                    state: true,
                    message: "Por favor, ingrese el nombre de la materia",
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
  curso: CursosRequest;
  url: string;
  updateData: () => void
}
