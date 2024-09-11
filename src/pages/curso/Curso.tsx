import { useQuery } from "@tanstack/react-query";
import { useThemeStore } from "../../util/context/useThemeStore";
import { CursosRequest } from "../../util/interfaces/cursos/CursoInterface";
import { fetchCurso } from "../../util/shared/fetchCurso";
import { useParams } from "react-router-dom";
import { AlertColor, Box, CircularProgress } from "@mui/material";
import { CursoCard } from "./components/cards/CursoCard";
import { AxiosError } from "axios";

export const Curso = ({ url, handleOpenToast }: Props) => {
  const { id } = useParams();
  const { tema, setTema } = useThemeStore();

  const datosCurso = useQuery<CursosRequest, Error>({
    queryKey: ["curso", id],
    queryFn: () => fetchCurso(url, Number(id)),
  });

  if (!id || datosCurso.isLoading) return <CircularProgress />;

  if (!datosCurso.data) {
    if (datosCurso.error instanceof AxiosError) {
      handleOpenToast(
        "error",
        datosCurso.error.response?.data.message
          ? datosCurso.error.response?.data.message
          : "Error al cargar el curso"
      );
    }
    return <Box sx={{ marginTop: "100px" }}>No se encontro el curso</Box>;
  }

  return (
    <>
      <CursoCard curso={datosCurso.data} />
    </>
  );
};

interface Props {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}
