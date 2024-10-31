import { UseQueryResult } from "@tanstack/react-query";
import { AsistenciaStats } from "../../../../util/interfaces/asistencia/AsistenciaStats";
import { PieChart } from "@mui/x-charts";

export const PieChartAsistenciaClase = ({ dataStats }: PropsPaperClase) => {
  if (dataStats.isLoading) {
    return <div>Loading...</div>;
  }

  if (dataStats.isError || !dataStats.data) {
    return <div>Error</div>;
  }

  const data = dataStats.data.map((item) => ({
    label: item.asistio,
    value: item.total,
  }));

  return (
    <PieChart
    series={[
      {data}
    ]}
    height={100}
    />
  );
};

interface PropsPaperClase {
  dataStats: UseQueryResult<AsistenciaStats[], Error>;
}
