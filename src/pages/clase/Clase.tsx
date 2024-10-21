import { AlertColor, Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchClase } from "../../util/shared/fetchClase";
import { ClasesRequest } from "../../util/interfaces/clases/ClasesRequest";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { PaperClase } from "./components/paper/PaperClase";

export const Clase = ({ url, handleOpenToast }: PropsClase) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { id } = useParams();

  const datosCurso = useQuery<ClasesRequest, Error>({
    queryKey: ["clase-info", id],
    queryFn: () => fetchClase(url, Number(id)),
  });

  return (
    <motion.div style={{ minHeight: "100vh", width: "100%" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <Box
    sx={{
      width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
     <PaperClase url={url} handleOpenToast={handleOpenToast} datosCurso={datosCurso} /> 
    </Box>
    </motion.div>
  );
};

interface PropsClase {
  url: string;
  handleOpenToast: (variante: AlertColor, msg: string) => void;
}
