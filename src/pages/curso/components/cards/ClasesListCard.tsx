import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import { fetchClases } from "../../../../util/shared/fetchClase";
import { ClasesRequest } from "../../../../util/interfaces/clases/ClasesRequest";
import { useQuery } from "@tanstack/react-query";
import { ClasesListCardSkeleton } from "../skeletons/cards/ClasesListCardSkeleton";

export const ClasesListCard = ({ url, idCurso }: ClasesListCardProps) => {
  const listClases = useQuery<ClasesRequest[], Error>({
    queryKey: ["curso", idCurso],
    queryFn: () => fetchClases(url, Number(idCurso)),
  });

  if (listClases.isLoading) {
    return <ClasesListCardSkeleton />;
  }

  if (listClases.error) {
    console.log(listClases.error);
  }

  return (
    <>
      <Typography variant="h5" color={"text.primary"}>
        Total de clases dictadas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          marginTop: "1.5rem",
        }}
      >
        {listClases.data?.length > 0 ? (
          listClases.data?.map((clase) => (
            <Typography
              color={"text.primary"}
              sx={{
                marginBottom: "1rem",
                width: "100%",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              {clase.contenido}
            </Typography>
          ))
        ) : (
          <Typography
            color={"text.primary"}
            sx={{
              marginBottom: "1rem",
              width: "100%",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            No se ha dictado ninguna clase
          </Typography>
        )}
      </Box>
    </>
  );
};

interface ClasesListCardProps {
  url: string;
  idCurso: number;
}
