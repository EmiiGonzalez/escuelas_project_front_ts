import {
  AlertColor,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AlumnoRequest } from "../../../../util/interfaces/alumno/AlumnoRequest";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalEditAlumno } from "../../../../components/shared/modal/ModalEditAlumno";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import { useState } from "react";

export const AlumnosListCard = ({
  url,
  data,
  handleOpenToast,
  updateAlumnos,
}: AlumnosListCardProps) => {

  const {open: openModalEdit, handleOpen: handleOpenModalEdit, handleClose: handleCloseModalEdit } = useHandleBoolean();

  const [ currentAlumno, setCurrentAlumno ] = useState<AlumnoRequest>({
    id: 0,
    nombre: "",
    telefono: ""});

  return (
    <>
      <Typography variant="h5" color={"text.primary"} sx={{userSelect: "none", mb: 2}}>Lista de alumnos</Typography>
      <TableContainer sx={{ width: "100%", overflow: "hidden", backgroundColor: "rgba(0, 0, 0, .65)" }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Telefono</TableCell>
            <TableCell align="center">Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((alumno: AlumnoRequest) => (
              <TableRow hover role="checkbox" key={alumno.id}>
                <TableCell align="center" sx={{ color: "primary.contrastText"}}>{alumno.nombre}</TableCell>
                <TableCell align="center" sx={{ color: "primary.contrastText"}}>{alumno.telefono}</TableCell>
                <TableCell align="center">
                 <Box>
                 <IconButton 
                    color="success" 
                    aria-label="editar"
                    onClick={() => {
                      setCurrentAlumno(alumno);
                      handleOpenModalEdit();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="borrar"
                    onClick={() => {
                      handleOpenToast("info", "En construccion");
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                 </Box>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <ModalEditAlumno
      alumnoData={currentAlumno!}
      open={openModalEdit}
      handleClose={handleCloseModalEdit}
      url={url}
      handleOpenToast={handleOpenToast}
      update={updateAlumnos}
      />
    </>
  );
};

interface AlumnosListCardProps {
  url: string;
  data: AlumnoRequest[];
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  updateAlumnos: () => void;
}
