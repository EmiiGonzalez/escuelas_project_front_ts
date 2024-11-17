import { AsistenciaStats } from "../../../../util/interfaces/asistencia/AsistenciaStats";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";

export const PieChartAsistenciaAlumno = ({ dataStats }: PropsPieChartAsistenciaAlumno) => {
  const totalAsistencias = dataStats.reduce((sum, item) => sum + item.total, 0) || 0;

  const data = dataStats.map((item) => ({
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

interface PropsPieChartAsistenciaAlumno {
  dataStats: AsistenciaStats[];
}
