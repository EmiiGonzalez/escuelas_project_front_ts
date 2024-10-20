import { AlertColor, Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchClase } from "../../util/shared/fetchClase";
import { ClasesRequest } from "../../util/interfaces/clases/ClasesRequest";
import { useQuery } from "@tanstack/react-query";

export const Clase = ({ url, handleOpenToast }: PropsClase) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { id } = useParams();

  const datosCurso = useQuery<ClasesRequest, Error>({
    queryKey: ["clase-info", id],
    queryFn: () => fetchClase(url, Number(id)),
  });

  console.log(datosCurso.data);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    ></Box>
  );
};

interface PropsClase {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}
