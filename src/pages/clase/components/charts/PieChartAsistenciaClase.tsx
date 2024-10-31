import { UseQueryResult } from "@tanstack/react-query";
import { AsistenciaStats } from "../../../../util/interfaces/asistencia/AsistenciaStats";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Alert, Skeleton } from "@mui/material";

export const PieChartAsistenciaClase = ({ dataStats }: PropsPaperClase) => {
  const [totalAsistencias, setTotalAsistencias] = useState<number>(0);
  useEffect(() => {
    if (dataStats.data) {
      dataStats.data.forEach((item) => {
        setTotalAsistencias((prev) => prev + item.total);
      });
    }
  }, [dataStats.data]);

  if (dataStats.isLoading) {
    return <Skeleton variant="circular" height={150} />;
  }

  if (dataStats.isError || !dataStats.data) {
    if (dataStats.error instanceof AxiosError) {
      return (
        <Alert severity="error">
          {dataStats.error.response?.data.message
            ? dataStats.error.response?.data.message
            : dataStats.error?.message || "Ocurrio un error"}
        </Alert>
      );
    }
    return <Alert severity="error">Ocurrio un error al traer los datos</Alert>;
  }

  const data = dataStats.data.map((item) => ({
    label: item.asistio.toLowerCase(),
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
          arcLabel: (item) => `${(100 * item.value) / totalAsistencias}%`,
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
