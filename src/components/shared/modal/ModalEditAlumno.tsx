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
import { AxiosError } from "axios";
import { Box } from "@mui/material";
import { useValid } from "../../../util/hooks/useValid";
import { useThemeStore } from "../../../util/context/useThemeStore";
import { putAlumno } from "../../../util/shared/putAlumno";
import { styleModal } from "../../../util/shared/styles/modal/modalStyle";
import { AlumnoRequest } from "../../../util/interfaces/alumno/AlumnoRequest";

export const ModalEditAlumno = ({
  open,
  handleClose,
  url,
  alumnoData,
  handleOpenToast,
  update
}: PropsModalEditEscuela) => {
  const { tema } = useThemeStore();

  const {
    string: alumno,
    setString: setAlumno,
    setError: setErrorAlumno,
    error: errorAlumno,
  } = useValid();
  const {
    string: telefono,
    setString: setTelefono,
    setError: setErrorTelefono,
    error: errorTelefono,
  } = useValid();

  useEffect(() => {
    setAlumno(alumnoData.nombre)
    setTelefono(alumnoData.telefono);
  }, [
    alumnoData,
    setAlumno,
    setTelefono
  ]);

  const alumnoRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: putAlumno,
    onSuccess: () => {
      handleOpenToast("success", "Alumno editado con éxito");
      update();
      handleClose();
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        handleOpenToast(
          "error",
          error.response?.data.message
            ? error.response?.data.message
            : "Error al editar el alumno"
        );
      }
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    event.stopPropagation();
    if (
      !alumno.trim().match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,40}$/)
    ) {
      setErrorAlumno({
        state: true,
        message: "Por favor, ingrese un nombre de alumno",
      });
      if (alumnoRef.current) {
        alumnoRef.current.focus();
      }
      return;
    }

    if (telefono === "" || !telefono.match(
      /^\+?\d{0,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    )) {
      setErrorTelefono({
        state: true,
        message: "Por favor, ingrese un telefono",
      });
      if (telefonoRef.current) {
        telefonoRef.current.focus();
      }
      return;
    }

    mutation.mutate({
      url,
      idAlumno: alumnoData.id,
      alumno,
      telefono,
    });
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
            id="add-alumno-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              color: "text.primary",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Editar Alumno
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
              inputRef={alumnoRef}
              label="Nombre y Apellido"
              variant={tema === "light" ? "filled" : "outlined"}
              sx={{ width: "100%", mb: 2 }}
              error={errorAlumno.state}
              helperText={errorAlumno.message}
              value={alumno}
              autoComplete="off"
              onChange={(event) => {
                setAlumno(event.target.value);
                setErrorAlumno({ state: false, message: "" });
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setErrorAlumno({
                    state: true,
                    message: "Por favor, ingrese un nombre de alumno valido",
                  });
                }

                if (!e.target.value.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,40}$/)) {
                  setErrorAlumno({
                    state: true,
                    message: "Por favor, ingrese un nombre de alumno valido",
                  });
                }
              }}
            />
            <TextField
              aria-hidden={false}
              inputRef={telefonoRef}
              label="Teléfono de Contacto"
              variant={tema === "light" ? "filled" : "outlined"}
              sx={{ width: "100%", mb: 2 }}
              error={errorTelefono.state}
              helperText={errorTelefono.message}
              value={telefono}
              autoComplete="off"
              onChange={(event) => {
                setTelefono(event.target.value);
                setErrorTelefono({ state: false, message: "" });
              }}
              onBlur={(e) => {
                if (e.target.value.trim() === "")
                  setErrorTelefono({
                    state: true,
                    message: "Por favor, ingrese un numero de telefono valido",
                  });
                if (
                  !e.target.value.match(
                    /^\+?\d{0,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
                  )
                ) {
                  setErrorTelefono({
                    state: true,
                    message: "Por favor, ingrese un numero de telefono valido",
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
  alumnoData: AlumnoRequest;
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  update: () => void;
}
