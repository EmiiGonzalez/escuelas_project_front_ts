import { UseQueryResult } from "@tanstack/react-query";
import { AsistenciaStats } from "../../../../util/interfaces/asistencia/AsistenciaStats";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { AxiosError } from "axios";
import { Alert, Skeleton } from "@mui/material";

export const PieChartAsistenciaClase = ({ dataStats }: PropsPaperClase) => {
  const totalAsistencias = dataStats.data ? dataStats.data.reduce((sum, item) => sum + item.total, 0) : 0;

  if (dataStats.isLoading) {
    return <Skeleton variant="circular" height={150} />;
  }

  if (dataStats.isError || !dataStats.data) {
    if (dataStats.error instanceof AxiosError) {
      return (
        <Alert severity="error">
          {dataStats.error.response?.data.message
            ? dataStats.error.response?.data.message
            : dataStats.error?.message || "Ocurrió un error"}
        </Alert>
      );
    }
    return <Alert severity="error">Ocurrió un error al traer los datos</Alert>;
  }

  const data = dataStats.data.map((item) => ({
    label: item.asistio.toLowerCase()[0].toUpperCase() + item.asistio.slice(1).toLowerCase(),
    value: item.total,
  }));

  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 25,
          outerRadius: 50,
          paddingAngle: 2,
          cornerRadius: 4,
          arcLabel: (item) => `${Math.round((100 * item.value) / totalAsistencias)}%`,
          arcLabelMinAngle: 35,
          arcLabelRadius: "60%",
        },
      ]}
      sx={{
        userSelect: "none",
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
          fontSize: "0.8rem",
          textAlign: "center",
          userSelect: "none",
        },
      }}
      height={150}
    />
  );
};

interface PropsPaperClase {
  dataStats: UseQueryResult<AsistenciaStats[], Error>;
}
