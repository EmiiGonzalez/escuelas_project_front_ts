import {
  AlertColor,
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
import { AsistenciaResponseWhitState } from "../../../../util/interfaces/asistencia/AsistenciaResponseWhitState";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useHandleBoolean } from "../../../../util/hooks/useHandleBoolean";

import { AsistioEnum } from "../../../../util/interfaces/asistencia/AsistenciaPost";
import { ModalEditAsistencia } from "../../../clase/components/modals/ModalEditAsistencia";
import { asistenciaMapColor } from "../../../clase/util/asistenciaUtils/asistenciaMapColor";
import { AsistenciaResponseDto } from "../../../../util/interfaces/asistencia/AsistenciaResponse";
import { AlumnoRequest } from "../../../../util/interfaces/alumno/AlumnoRequest";
import dayjs from "dayjs";

export const CardListAsistenciaAlumno = ({
  datosAsistencia,
  updateData,
  handleOpenToast,
  datosAlumno,
  url,
}: PropsCardAsistencia) => {
  const {
    open: openModalEdit,
    handleOpen: handleOpenModalEdit,
    handleClose: handleCloseModalEdit,
  } = useHandleBoolean();

  const [currentAsistencia, setCurrentAsistencia] =
    useState<AsistenciaResponseDto>({
      id: 0,
      claseNumero: 0,
      fecha: "",
      asistio: AsistioEnum.PRESENTE,
    });

  const [asistenciaRecord, setAsistenciaRecord] =
    useState<AsistenciaResponseWhitState>({
      id: currentAsistencia.id,
      asistio: currentAsistencia.asistio,
      alumno: datosAlumno.nombre,
    });

  useEffect(() => {
    if (currentAsistencia) {
      setAsistenciaRecord({
        id: currentAsistencia.id,
        asistio: currentAsistencia.asistio,
        alumno: datosAlumno.nombre,
      });
    }
  }, [currentAsistencia, datosAlumno.nombre]);

  return (
    <>
      <Card
        elevation={3}
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: "15px",
          p: 1,
          my: 2,
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
            <CheckIcon sx={{ mr: 1 }} /> Dashboard Lista clases
          </Typography>
          <Divider sx={{ my: 2, width: "100%" }} component="div" />
          <Typography
            variant="h5"
            color={"text.primary"}
            sx={{ userSelect: "none", mb: 2 }}
          >
            Lista de clases
          </Typography>
          <TableContainer
            sx={{
              width: "100%",
              overflow: "auto",
              backgroundColor: "rgba(0, 0, 0, .65)",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Clase numero</TableCell>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Asistencia</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datosAsistencia.map((asistencia: AsistenciaResponseDto) => (
                  <TableRow hover role="checkbox" key={asistencia.id}>
                    <TableCell
                      align="center"
                      sx={{ color: "primary.contrastText" }}
                    >
                      {asistencia.claseNumero}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "primary.contrastText" }}>
                      {dayjs(asistencia.fecha).format("DD-MM")}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: asistenciaMapColor(asistencia.asistio) }}
                    >
                      {asistencia.asistio}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setCurrentAsistencia(asistencia);
                          handleOpenModalEdit();
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <ModalEditAsistencia
        open={openModalEdit}
        datosAsistencia={asistenciaRecord}
        handleClose={handleCloseModalEdit}
        handleOpenToast={handleOpenToast}
        url={url}
        updateListAlumnos={updateData}
      />
    </>
  );
};

interface PropsCardAsistencia {
  datosAsistencia: AsistenciaResponseDto[];
  datosAlumno: AlumnoRequest;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
  url: string;
  updateData: () => void;
}
