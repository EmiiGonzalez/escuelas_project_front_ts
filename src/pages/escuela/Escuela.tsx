import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { EscuelaCard } from "./components/card/EscuelaCard";
import { fetchEscuela } from "../../util/shared/fetchEscuela";
import { EscuelasRequest } from "../../util/interfaces/escuelas/EscuelasRequest";
import { useQuery } from "@tanstack/react-query";
import { CursosRequest } from "../../util/interfaces/cursos/CursoInterface";
import { fetchCursos } from "../../util/shared/fetchCurso";
import { SpeedDialCustom } from "./components/speedDial/SpeedDialCustom";
import { AlertColor } from "@mui/material";
import { Box } from "@mui/material";
import { useThemeStore } from "../../util/context/useThemeStore";
import { CardCurso } from "./components/card/CardCurso";

export const Escuela = ({ url, handleOpenToast }: PropsEscuela) => {
  const { escuelaId, year } = useParams();
  const { tema, setTema } = useThemeStore();

  const datosEscuela = useQuery<EscuelasRequest, Error>({
    queryKey: ["escuela", escuelaId],
    queryFn: () => fetchEscuela(url, Number(escuelaId)),
  });

  const updateDataEscuela = () => {
    datosEscuela.refetch();
  };

  const updateDataCursos = () => {
    datosCursos.refetch();
  };

  const datosCursos = useQuery<CursosRequest[], Error>({
    queryKey: ["cursos", escuelaId, year],
    queryFn: () => fetchCursos(url, Number(escuelaId), Number(year)),
  });

  if (!escuelaId || !year || !datosEscuela.data || !datosCursos.data)
    return <CircularProgress />;

  if (datosEscuela.isLoading || datosCursos.isLoading)
    return <CircularProgress />;

  if (datosEscuela.error || datosCursos.error)
    handleOpenToast(
      "error",
      datosEscuela.error?.message
        ? datosEscuela.error?.message
        : "Error al cargar los cursos"
    );

  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", width: "100%" }}>
        <EscuelaCard datosEscuela={datosEscuela.data} />
        <Grid container spacing={3} justifyContent="center">
          {datosCursos.data?.map((course) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
              <CardCurso
                materia={course.materia}
                id={course.id}
                nombre={course.nombre}
                escuela={course.escuela}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <SpeedDialCustom
        escuela={datosEscuela.data}
        url={url}
        handleOpenToast={handleOpenToast}
        tema={tema}
        updateDataEscuela={updateDataEscuela}
        updateDataCursos={updateDataCursos}
        setTema={setTema}
      />
    </>
  );
};

interface PropsEscuela {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}
