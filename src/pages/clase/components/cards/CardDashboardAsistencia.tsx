import {
  Card,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { UseQueryResult } from "@tanstack/react-query";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";
import { AlumnoResponseDtoWithAsistencia } from "../../../../util/interfaces/alumno/AlumnoResponseDtoWithAsistencia";
import { useState } from "react";

export const CardDashboardAsistencia = ({
  datosClase,
  handleOpenDialogAsistencia,
}: PropsCardDashboardAsistencia) => {

  const [hasAsistencia, setHasAsistencia] = useState<boolean>(datosClase.data?.asistencia ? true : false);

  const handleAsistencia = () => {
    setHasAsistencia(true);
    handleOpenDialogAsistencia();
  }

  return (
    <>
      <Card
        elevation={3}
        sx={{
          height: "100%",
          borderRadius: "15px",
          p: 1,
          my: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CheckIcon sx={{ mr: 1 }} /> Dashboard de Asistencia
          </Typography>
          <Divider sx={{ my: 2 }} />
          {datosClase.data?.asistencia ? (
            <Typography sx={{ mb: 2 }}>
              La asistencia ya ha sido registrada para esta clase.
            </Typography>
          ) : (
            <Typography sx={{ mb: 2 }}>
              La asistencia aún no ha sido registrada para esta clase.
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          {hasAsistencia ? (
            <Button
              startIcon={<CheckIcon />}
              variant="outlined"
              color={"success"}
              sx={{ borderRadius: "20px" }}
              onClick={handleAsistencia}
            >
              {"Pasar Asistencia"}
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </>
  );
};

interface PropsCardDashboardAsistencia {
  datosClase: UseQueryResult<ClasesRequest, Error>;
  datosAlumnos: UseQueryResult<AlumnoResponseDtoWithAsistencia[], Error>;
  handleOpenDialogAsistencia: () => void;
}
