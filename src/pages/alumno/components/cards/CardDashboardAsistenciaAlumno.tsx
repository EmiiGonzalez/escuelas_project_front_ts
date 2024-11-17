import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { AlumnoRequest } from "../../../../util/interfaces/alumno/AlumnoRequest";
import { AsistenciaStats } from "../../../../util/interfaces/asistencia/AsistenciaStats";
import { PieChartAsistenciaAlumno } from "../charts/PieChartAsistenciaAlumno";


export const CardDashboardAsistenciaAlumno = ({
  datosAlumnos,
  datosStats
}: PropsCardDashboardAsistenciaAlumno) => {

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
            <CheckIcon sx={{ mr: 1 }} /> Dashboard de Asistencia del Alumno
          </Typography>
          <Divider sx={{ my: 2, width: "100%" }} component="div" />
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
                Estadisticas de Asistencia de {datosAlumnos.nombre}
              </Typography>
              <PieChartAsistenciaAlumno
                dataStats={datosStats}
              />
            </Box>
        </CardContent>
      </Card>
    </>
  );
};

interface PropsCardDashboardAsistenciaAlumno {
  datosAlumnos: AlumnoRequest
  datosStats: AsistenciaStats[]
}
