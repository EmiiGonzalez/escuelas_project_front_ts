import { useQuery } from "@tanstack/react-query";
import { CursosRequest } from "../../util/interfaces/cursos/CursoInterface";
import { fetchCurso } from "../../util/shared/fetchCurso";
import { useParams } from "react-router-dom";
import { AlertColor, Box, CircularProgress, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { CursoCard } from "./components/cards/CursoCard";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { CardGeneric } from "./components/cards/CardGeneric";
import { DashBoardCard } from "./components/cards/DashBoardCard";
import Grid from "@mui/material/Grid2";
import { ClasesListCard } from "./components/cards/ClasesListCard";
import { ClasesRequest } from "../../util/interfaces/clases/ClasesRequest";
import { fetchClases } from "../../util/shared/fetchClase";
import { ClasesListCardSkeleton } from "./components/skeletons/cards/ClasesListCardSkeleton";
import { SpeedDialCursoCustom } from "./components/speedDial/SpeedDialCursoCustom";
import { useThemeStore } from "../../util/context/useThemeStore";

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

  const [lastClase, setLastClase] = useState<number>(1);

  const listClases = useQuery<ClasesRequest[], Error>({
    queryKey: ["clases", id],
    queryFn: () => fetchClases(url, Number(id)),
  });

  useEffect(() => {
    if (listClases.data && listClases.data.length > 0) {
      const maxNumero = Math.max(
        ...listClases.data.map((clase) => clase.numeroDeClase)
      );
      setLastClase(maxNumero);
    }
  }, [listClases.data, setLastClase]);

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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box>
        <CursoCard curso={datosCurso.data} />
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ width: "100%" }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <CardGeneric
          children={
            <DashBoardCard
              lastClase={lastClase}
              url={url}
              idCurso={Number(id)}
              handleOpenToast={handleOpenToast}
              updateListClases={() => listClases.refetch()}
            />
          }
        />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        {listClases.isLoading && <ClasesListCardSkeleton />}
        {listClases.data && (
          <CardGeneric children={<ClasesListCard data={listClases.data} />} />
        )}
        </Grid>
      </Grid>
      <SpeedDialCursoCustom curso={datosCurso.data} handleOpenToast={handleOpenToast} setTema={setTema} tema={tema} updateDataCurso={() => datosCurso.refetch()} url={url}/>
    </Box>
  );
};

interface Props {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}
