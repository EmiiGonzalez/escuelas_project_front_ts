import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { UseQueryResult } from "@tanstack/react-query";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";
import { useEffect, useState } from "react";
import { AlumnoRequest } from "../../../../util/interfaces/alumno/AlumnoRequest";
import { AsistenciaStats } from "../../../../util/interfaces/asistencia/AsistenciaStats";
import { PieChartAsistenciaClase } from "../charts/PieChartAsistenciaClase";

export const CardDashboardAsistencia = ({
  datosClase,
  handleOpenDialogAsistencia,
  datosStats,
}: PropsCardDashboardAsistencia) => {
  const [hasAsistencia, setHasAsistencia] = useState<boolean>(true);

  useEffect(() => {
    if (
      datosClase.data?.asistencia != null ||
      datosClase.data?.asistencia != undefined
    ) {
      setHasAsistencia(datosClase.data?.asistencia);
    }
  }, [datosClase.data?.asistencia]);

  const handleAsistencia = () => {
    handleOpenDialogAsistencia();
  };

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
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CheckIcon sx={{ mr: 1 }} /> Dashboard de Asistencia
          </Typography>
          <Divider sx={{ my: 2, width: "100%" }} component="div" />
          {hasAsistencia ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Typography sx={{ mb: 2 }}>
                Estadisticas de Asistencia de la Clase
              </Typography>
              <PieChartAsistenciaClase
                dataStats={datosStats}
              ></PieChartAsistenciaClase>
            </Box>
          ) : (
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
              height: "100%",
            }}>
              <Typography sx={{ mb: 2 }}>
                La asistencia aún no ha sido registrada para esta clase.
              </Typography>
              {!hasAsistencia && (
                <Button
                  startIcon={<CheckIcon />}
                  variant="outlined"
                  color={"success"}
                  sx={{ borderRadius: "20px" }}
                  onClick={handleAsistencia}
                >
                  {"Pasar Asistencia"}
                </Button>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

interface PropsCardDashboardAsistencia {
  datosClase: UseQueryResult<ClasesRequest, Error>;
  datosAlumnos: UseQueryResult<AlumnoRequest[], Error>;
  handleOpenDialogAsistencia: () => void;
  datosStats: UseQueryResult<AsistenciaStats[], Error>;
}
