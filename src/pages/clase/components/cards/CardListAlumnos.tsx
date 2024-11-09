import {
  AlertColor,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { UseQueryResult } from "@tanstack/react-query";
import { AsistenciaResponseWhitState } from "../../../../util/interfaces/asistencia/AsistenciaResponseWhitState";
import { ClaseSkeleton } from "../skeleton/ClaseSkeleton";
import { useState } from "react";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";
import EditIcon from "@mui/icons-material/Edit";
import { ModalEditAsistencia } from "../modals/ModalEditAsistencia";
import { AsistioEnum } from "../../../../util/interfaces/asistencia/AsistenciaPost";
import { asistenciaMapColor } from "../../util/asistenciaUtils/asistenciaMapColor";

export const CardListAlumnos = ({
  datosAlumnos,
  updateData,
  handleOpenToast,
  url,
}: PropsCardListAlumnos) => {
  const {
    open: openModalEdit,
    handleOpen: handleOpenModalEdit,
    handleClose: handleCloseModalEdit,
  } = useHandleBoolean();

  const [currentAlumno, setCurrentAlumno] = useState<AsistenciaResponseWhitState>({
    id: 0,
    asistio: AsistioEnum.AUSENTE,
    alumno: "",
  });

  if (datosAlumnos.isLoading) {
    return <ClaseSkeleton />;
  }

  if (datosAlumnos.isError || !datosAlumnos.data) {
    return <div>Error</div>;
  }

  return (
    <>
      <Card
        elevation={3}
        sx={{
          height: "100%",
          width: "95%",
          borderRadius: "15px",
          p: 1,
          my: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CheckIcon sx={{ mr: 1 }} /> Dashboard Lista de Alumnos
          </Typography>
          <Divider sx={{ my: 2, width: "100%" }} component="div" />
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
              overflow: "hidden",
              backgroundColor: "rgba(0, 0, 0, .65)",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Asistencia</TableCell>
                  <TableCell align="center">Editar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datosAlumnos.data.map(
                  (asistencia: AsistenciaResponseWhitState) => (
                    <TableRow hover role="checkbox" key={asistencia.id}>
                      <TableCell
                        align="center"
                        sx={{ color: "primary.contrastText" }}
                      >
                        {asistencia.alumno}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: asistenciaMapColor(asistencia.asistio) }}
                      >
                        {asistencia.asistio}
                      </TableCell>
                      <TableCell align="center">
                        <Box>
                          <IconButton
                            color="success"
                            aria-label="editar"
                            onClick={() => {
                              setCurrentAlumno(asistencia);
                              handleOpenModalEdit();
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <ModalEditAsistencia
        open={openModalEdit}
        datosAsistencia={currentAlumno}
        handleClose={handleCloseModalEdit}
        handleOpenToast={handleOpenToast}
        url={url}
        updateListAlumnos={updateData}
        />
    </>
  );
};

interface PropsCardListAlumnos {
  datosAlumnos: UseQueryResult<AsistenciaResponseWhitState[], Error>;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  url: string;
  updateData: () => void;
}
