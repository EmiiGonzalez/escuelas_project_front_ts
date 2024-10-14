import {
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
import { AlumnoResponseDtoWithAsistencia } from "../../../../util/interfaces/alumno/AlumnoResponseDtoWithAsistencia";
import { useIncremental } from "../../../../util/hooks/useIncremental";
import { AsistenciaRecord } from "../../../../util/interfaces/asistencia/AsistenciaResponse";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

export const DialogAsistencia = ({
  open,
  handleClose,
  url,
  dataAlumnos,
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

  const handleAttendance = (asistio: boolean) => {
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

  const handleSubmit = () => {
    console.log(asistenciaRecord);
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
                <ListItemText primary="¿Asistió a clase?" sx={{ width: "60%" }} />
                <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap", width: "40%" }} >
                  <IconButton
                    color="primary"
                    onClick={() => handleAttendance(true)}
                    sx={{ width: "1.5rem", height: "1.5rem" }}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleAttendance(false)}
                  >
                    <CloseIcon />
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
  dataAlumnos: AlumnoResponseDtoWithAsistencia[];
}
