import {
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
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

export const AlumnosListCard = ({
  data,
}: AlumnosListCardProps) => {
  const navigate = useNavigate();

  const handleInfoAlumno = (id: number): void => {
    navigate("/alumno/" + id);
  };

  return (
    <>
      <Typography
        variant="h5"
        color={"text.primary"}
        sx={{ userSelect: "none", mb: 2 }}
      >
        Lista de alumnos
      </Typography>
      <TableContainer
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          backgroundColor: "rgba(0, 0, 0, .65)",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Telefono</TableCell>
              <TableCell align="center">Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((alumno: AlumnoRequest) => (
              <TableRow hover role="checkbox" key={alumno.id}>
                <TableCell
                  align="center"
                  sx={{ color: "primary.contrastText" }}
                >
                  {alumno.nombre}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "primary.contrastText" }}
                >
                  {alumno.telefono}
                </TableCell>
                <TableCell align="center">
                  <Box>
                    <IconButton
                      color="info"
                      aria-label="info"
                      onClick={() => handleInfoAlumno(alumno.id)}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

interface AlumnosListCardProps {
  data: AlumnoRequest[];
}
