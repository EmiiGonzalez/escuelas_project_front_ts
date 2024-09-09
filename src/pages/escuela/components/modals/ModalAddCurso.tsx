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
import { postCurso } from "../../util/postCurso";

export const ModalAddCurso = ({
  tema,
  open,
  handleClose,
  handleOpenToast,
  url,
  idEscuela,
  updateData,
}: PropsModalEditEscuela) => {
  const { string: cursoNombre, setString : setCursoNombre, setError : setErrorCurso, error : errorCurso } = useValid();
  const { string: materiaNombre, setString : setMateriaNombre, setError : setErrorMateria, error : errorMateria } = useValid();
  const cursoRef = useRef<HTMLInputElement>(null);
  const materiaRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: postCurso,
    onSuccess: () => {
      handleOpenToast("success", "Curso agregado con éxito");
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
    if (cursoNombre === "") {
      setErrorCurso({
        state: true,
        message: "Por favor, ingrese un curso",
      });
      if (cursoRef.current) {
        cursoRef.current.focus();
      }
      return;
    }

    if (materiaNombre === "") {
      setErrorMateria({
        state: true,
        message: "Por favor, ingrese una materia",
      });
      if (materiaRef.current) {
        materiaRef.current.focus();
      }
      return;
    }
    mutation.mutate({
      nombre: cursoNombre,
      url,
      idEscuela,
      materia: materiaNombre
    });
    setCursoNombre("");
    setMateriaNombre("");
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
            Agregar nuevo curso
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
              error={errorCurso.state}
              helperText={errorCurso.message}
              value={cursoNombre}
              autoComplete="off"
              onChange={(event) => {
                setCursoNombre(event.target.value);
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
              inputRef={materiaRef}
              id="outlined-basic"
              label="Materia"
              variant={tema === "light" ? "filled" : "outlined"}
              sx={{ width: "100%", mb: 2 }}
              error={errorMateria.state}
              helperText={errorMateria.message}
              value={materiaNombre}
              autoComplete="off"
              onChange={(event) => {
                setMateriaNombre(event.target.value);
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
  idEscuela: number;
  url: string;
  updateData: () => void;
}
