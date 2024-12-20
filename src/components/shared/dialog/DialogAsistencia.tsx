import {
  AlertColor,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useIncremental } from "../../../util/hooks/useIncremental";
import { AsistenciaRecord } from "../../../util/interfaces/asistencia/AsistenciaResponse";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postAsistencia } from "../../../util/shared/postAsistencia";
import { AxiosError } from "axios";
import { AsistioEnum, convertStringToAsistioEnum } from "../../../util/interfaces/asistencia/AsistenciaPost";
import { AlumnoRequest } from "../../../util/interfaces/alumno/AlumnoRequest";

export const DialogAsistencia = ({
  open,
  handleClose,
  url,
  idClase,
  dataAlumnos,
  handleOpenToast,
  updateAlumnos,
  updateClase,
}: PropsDialogAsistencia) => {
  const {
    count: index,
    increment,
    decrement,
    reset,
  } = useIncremental(dataAlumnos.length);
  const [asistenciaRecord, setAsistenciaRecord] = useState<AsistenciaRecord[]>(
    []
  );

  const currentAlumno = dataAlumnos[index];

  const handleAttendance = (asistio: AsistioEnum) => {
    if (asistenciaRecord[index]) {
      asistenciaRecord[index].asistio = asistio;
      increment();
      return;
    }
    setAsistenciaRecord([
      ...asistenciaRecord,
      { id: currentAlumno.id, asistio },
    ]);
    increment();
  };

  const handlePrevious = () => {
    if (index > 0) {
      decrement();
    }
  };

  const onClose = () => {
    handleClose();
    setAsistenciaRecord([]);
    reset();
  };

  const mutation = useMutation({
    mutationFn: postAsistencia,
    onSuccess: () => {
      handleOpenToast("success", "Asistencia agregada con éxito");
      updateClase();
      updateAlumnos();
      handleClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        handleOpenToast("error", error.response?.data.message ? error.response?.data.message : "Error al agregar la escuela");
      }
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      url,
      id: idClase,
      asistencia: asistenciaRecord,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ minWidth: "20rem", width: "100vw" }}>
      <DialogTitle align="center" fontSize={"1.5rem"}>
        Pasar asistencia
      </DialogTitle>
      <DialogContent>
        {index < dataAlumnos.length ? (
          <>
            <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: "bold", mb: "1rem", borderBottom: "1px solid #f1f1f1", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" }}>
              Alumno: {currentAlumno.nombre}
            </Typography>
            <List>
              <ListItem sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "background.paper", color: "text.primary", borderRadius: "0.5rem", width: "100%" }}>
                <ListItemText primary="¿Asistió a clase?" sx={{ width: "55%" }} />
                <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", flexWrap: "nowrap", width: "45%" }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleAttendance(convertStringToAsistioEnum("PRESENTE"))}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleAttendance(convertStringToAsistioEnum("AUSENTE"))}
                  >
                    <CloseIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() => handleAttendance(convertStringToAsistioEnum("JUSTIFICADO"))}
                  >
                    <MedicalInformationIcon />
                  </IconButton>
                </Box>
              </ListItem>
            </List>
          </>
        ) : (
          <Typography variant="h6" gutterBottom align="center">
            No hay más alumnos
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handlePrevious}
          disabled={index === 0}
          startIcon={<ArrowBackIcon />}
        >
          Anterior
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={asistenciaRecord.length !== dataAlumnos.length}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface PropsDialogAsistencia {
  open: boolean;
  handleClose: () => void;
  url: string;
  dataAlumnos: AlumnoRequest[];
  idClase: number;
  updateAlumnos: () => void;
  updateClase: () => void;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}
