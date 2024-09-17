import { Box, Button, Typography } from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { ClasesCountRequest } from "../../../../util/interfaces/clases/ClasesCountInterface";
import { fetchCountClasesForCurso } from "../../../../util/shared/fetchCurso";
import { useQuery } from "@tanstack/react-query";
import { DashBoardCardSkeleton } from "../skeletons/cards/DashBoardCardSkeleton";

export const DashBoardCard = ({ url, idCurso }: PropsDashBoardCard) => {
  const cantClases = useQuery<ClasesCountRequest, Error>({
    queryKey: ["curso", idCurso],
    queryFn: () => fetchCountClasesForCurso(url, Number(idCurso)),
  });

  if (cantClases.isLoading) {
    return <DashBoardCardSkeleton />;
  }

  return (
    <>
      <Typography variant="h5" color={"text.primary"}>
        Total de clases dictadas
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", marginTop: "1.5rem" }}>
        <Typography color={"text.primary"} sx={{ marginBottom: "1rem", width: "100%", fontWeight: "bold", fontSize: "1.5rem" }}>
          {cantClases.data?.count}
        </Typography>
        <Button variant="contained" size="large" color="primary" sx={{ marginTop: "1rem", width: "100%", backgroundColor: "background.default" }}>
          <ControlPointIcon />
        Agregar clase
        </Button>
        <Button variant="contained" size="large" color="primary" sx={{ marginTop: "1rem", width: "100%", backgroundColor: "background.default" }}>
          <LibraryBooksIcon />
        Pasar Asistencia
        </Button>
      </Box>
    </>
  );
};

interface PropsDashBoardCard {
  url: string;
  idCurso: number;
}
