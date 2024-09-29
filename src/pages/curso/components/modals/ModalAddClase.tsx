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
import { FormEvent, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useValid } from "../../../../util/hooks/useValid";
import { AxiosError } from "axios";
import { Box } from "@mui/material";
import { postClase } from "../../util/postClase";
import { useThemeStore } from "../../../../util/context/useThemeStore";
import { DatePicker } from "@mui/x-date-pickers";
import { styleModal } from "../../../../util/shared/styles/modal/modalStyle";
import dayjs, { Dayjs } from "dayjs";

export const ModalAddClase = ({
  open,
  handleClose,
  url,
  idCurso,
  updateData,
  handleOpenToast,
  lastClase,
  updateListClases,
}: PropsModalEditEscuela) => {
  const { tema } = useThemeStore();

  const {
    string: claseDescripcion,
    setString: setClaseDescripcion,
    setError: setErrorClase,
    error: errorClase,
  } = useValid();

  const [fecha, setFecha] = useState<Dayjs | null>(dayjs());

  const cursoRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: postClase,
    onSuccess: () => {
      handleOpenToast("success", "Clase agregado con éxito");
      updateData();
      updateListClases();
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

    if (!fecha) {
      mutation.mutate({
        url,
        idCurso,
        descripcion: claseDescripcion,
        numeroDeClase: lastClase ==  1 ? 1 : lastClase + 1,
      });
      setClaseDescripcion("");
      return;
    }

    mutation.mutate({
      url,
      idCurso,
      descripcion: claseDescripcion,
      fecha: dayjs(fecha).format("DD-MM-YYYY"),
      numeroDeClase: lastClase ==  1 ? 1 : lastClase + 1,
    });
    setClaseDescripcion("");
    setFecha(null);
  
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
              label="Tema de la Clase"
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
            <DatePicker label="Fecha de Clase" sx={{ width: "100%", mb: 2 }} 
            value={fecha}
            onChange={(date) => {setFecha(date)}}
            format="DD-MM-YYYY"
            localeText={{
              clearButtonLabel: 'Vider',
            }}/>
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
  updateListClases: () => void;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  lastClase: number;
}
