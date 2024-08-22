import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { EscuelaCard } from "./components/EscuelaCard";
import { fetchEscuela } from "../../util/shared/fetchEscuela";
import { EscuelasRequest } from "../../util/interfaces/escuelas/EscuelasRequest";
import { useQuery } from "@tanstack/react-query";
import { CursosRequest } from "../../util/interfaces/cursos/CursoInterface";
import { fetchCursos } from "../../util/shared/fetchCurso";
import { SpeedDialCustom } from "./components/speedDial/SpeedDialCustom";
import { AlertColor } from "@mui/material";
import { Box } from "@mui/material";
import { useThemeStore } from "../../util/context/useThemeStore";

export const Escuela = ({ url, handleOpenToast }: PropsEscuela) => {
  const { escuelaId, year } = useParams();
  const { tema } = useThemeStore();

  const datosEscuela = useQuery<EscuelasRequest, Error>({
    queryKey: ["escuela", escuelaId],
    queryFn: () => fetchEscuela(url, Number(escuelaId)),
  });

  const updateData = () => {
    datosEscuela.refetch();
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
      <Box sx={{ width: "100%" }}>
        <EscuelaCard datosEscuela={datosEscuela.data} tema={tema} />
        <ul>
          {datosCursos.data.map((c) => (
            <li key={c.id}>{c.nombre}</li>
          ))}
        </ul>
      </Box>
      <SpeedDialCustom escuela={datosEscuela.data} url={url} handleOpenToast={handleOpenToast} tema={tema} updateData={updateData} />
    </>
  );
};

interface PropsEscuela {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}
