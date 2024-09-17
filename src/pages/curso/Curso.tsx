import { useQuery } from "@tanstack/react-query";
import { useThemeStore } from "../../util/context/useThemeStore";
import { CursosRequest } from "../../util/interfaces/cursos/CursoInterface";
import { fetchCurso } from "../../util/shared/fetchCurso";
import { useParams } from "react-router-dom";
import { AlertColor, Box, CircularProgress, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { CursoCard } from "./components/cards/CursoCard";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { CardGeneric } from "./components/cards/CardGeneric";
import { DashBoardCard } from "./components/cards/DashBoardCard";

export const Curso = ({ url, handleOpenToast }: Props) => {
  const { id } = useParams();
  const { tema, setTema } = useThemeStore();

  const datosCurso = useQuery<CursosRequest, Error>({
    queryKey: ["curso", id],
    queryFn: () => fetchCurso(url, Number(id)),
  });

  useEffect(() => {
    if (!datosCurso.data && datosCurso.error instanceof AxiosError) {
      handleOpenToast(
        "error",
        datosCurso.error.response?.data.message
          ? datosCurso.error.response?.data.message
          : "Error al cargar el curso"
      );
    }
  }, [datosCurso.data, datosCurso.error, handleOpenToast]);

  if (!id || datosCurso.isLoading) return <CircularProgress />;

  if (!datosCurso.data) {
    return (
      <Box>
        <ReportProblemIcon sx={{ color: "red" }} />
        <Typography>Curso con ID {id} no encontrado</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column",  alignItems: "center", minHeight: "100vh" }}>
      <Box>
        <CursoCard curso={datosCurso.data} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <CardGeneric children={<DashBoardCard url={url} idCurso={Number(id)}/>} />
      </Box>
    </Box>
  );
};

interface Props {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}
