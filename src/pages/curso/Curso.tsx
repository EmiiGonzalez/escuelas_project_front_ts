import { useQuery } from "@tanstack/react-query";
import { useThemeStore } from "../../util/context/useThemeStore";
import { CursosRequest } from "../../util/interfaces/cursos/CursoInterface";
import { fetchCurso } from "../../util/shared/fetchCurso";
import { useParams } from "react-router-dom";
import { AlertColor, Box, CircularProgress } from "@mui/material";

export const Curso = ({ url, handleOpenToast } : Props) => {
    const { id } = useParams();
    const { tema, setTema } = useThemeStore();

    const datosCurso = useQuery<CursosRequest, Error>({
        queryKey: ["curso", id],
        queryFn: () => fetchCurso(url, Number(id)),
      });

    if (!id || !datosCurso.isLoading) return <CircularProgress />;

    console.log("curso", datosCurso.data);

  return (
    <>
    <Box>
    </Box>
    </>
  )
}

interface Props {
  url: string
  handleOpenToast: (variante: AlertColor, msg: string) => void
}